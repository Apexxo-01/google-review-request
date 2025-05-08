import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getClientLinkBySlug } from "../services/makeService";

const AppLinkPage = () => {
  const { clientSlug } = useParams<{ clientSlug: string }>();
  const navigate = useNavigate();
  const [clientData, setClientData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [installable, setInstallable] = useState(false);

  useEffect(() => {
    if (!clientSlug) return;

    async function fetchData() {
      try {
        const data = await getClientLinkBySlug(clientSlug);
        if (!data || !data.reviewFormUrl) {
          navigate("/404");
          return;
        }
        setClientData(data);
      } catch (error) {
        console.error("Fetch error:", error);
        navigate("/404");
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, [clientSlug, navigate]);

  const installApp = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === "accepted") {
          console.log("App installed");
        }
        setDeferredPrompt(null);
      });
    }
  };

  const openForm = () => {
    if (clientData?.reviewFormUrl) {
      window.location.href = clientData.reviewFormUrl;
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ textAlign: "center", marginTop: "2rem", fontFamily: "Arial", fontSize: "1.2rem" }}>
      <h1>{clientData?.clientName}</h1>
      {installable && (
        <button
          onClick={installApp}
          style={{
            padding: "1rem 2rem",
            backgroundColor: "#fff",
            borderRadius: "8px",
            border: "1px solid #042f5f",
            marginBottom: "1rem",
            fontWeight: "bold"
          }}
        >
          Install App
        </button>
      )}
      <br />
      <button
        onClick={openForm}
        style={{
          padding: "1rem 2rem",
          fontSize: "16px",
          backgroundColor: "#02ceff",
          color: "#042f5f",
          border: "none",
          borderRadius: "8px",
          fontWeight: "bold"
        }}
      >
        Open Review Form
      </button>
    </div>
  );
};

export default AppLinkPage;