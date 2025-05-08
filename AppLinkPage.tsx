import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getClientLinkBySlug } from "../services/makeService";

const AppLinkPage = () => {
  const { clientSlug } = useParams<{ clientSlug: string }>();
  const navigate = useNavigate();
  const [clientData, setClientData] = useState<any>(null);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstall, setShowInstall] = useState(false);

  useEffect(() => {
    if (!clientSlug) return;

    localStorage.setItem("clientSlug", clientSlug);

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
      }
    }

    fetchData();

    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstall(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, [clientSlug, navigate]);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        console.log("App installed");
      }
      setDeferredPrompt(null);
      setShowInstall(false);
    }
  };

  useEffect(() => {
    if (clientData?.reviewFormUrl) {
      const timeout = setTimeout(() => {
        window.location.href = clientData.reviewFormUrl;
      }, 5000); // give 5s to allow install prompt
      return () => clearTimeout(timeout);
    }
  }, [clientData]);

  return (
    <div style={{ textAlign: "center", marginTop: "2rem", fontFamily: "Arial", fontSize: "1.2rem" }}>
      <p>Preparing your app...</p>
      <p>You will be redirected shortly.</p>
      {showInstall && (
        <button
          onClick={handleInstall}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#02ceff",
            color: "#042f5f",
            border: "none",
            borderRadius: "8px"
          }}
        >
          Install this app
        </button>
      )}
    </div>
  );
};

export default AppLinkPage;