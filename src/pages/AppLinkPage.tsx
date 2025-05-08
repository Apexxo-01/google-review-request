import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getClientLinkBySlug } from "../services/makeService";

const AppLinkPage = () => {
  const { clientSlug } = useParams<{ clientSlug: string }>();
  const navigate = useNavigate();
  const [clientData, setClientData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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
        configureManifest(data);
      } catch (error) {
        console.error("Fetch error:", error);
        navigate("/404");
      } finally {
        setLoading(false);
      }
    }

    function configureManifest(data: any) {
      const manifest = {
        name: `${data.clientName} Review App`,
        short_name: data.clientName,
        start_url: window.location.href,
        display: "standalone",
        background_color: "#042f5f",
        theme_color: "#042f5f",
        icons: [
          { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "/icon-512.png", sizes: "512x512", type: "image/png" }
        ]
      };
      const stringManifest = JSON.stringify(manifest);
      const blob = new Blob([stringManifest], { type: "application/json" });
      const manifestURL = URL.createObjectURL(blob);
      const link = document.createElement("link");
      link.rel = "manifest";
      link.href = manifestURL;
      document.head.appendChild(link);
    }

    fetchData();
  }, [clientSlug, navigate]);

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h1>{clientData?.clientName}</h1>
      <button
        style={{
          padding: "1rem 2rem",
          fontSize: "16px",
          backgroundColor: "#02ceff",
          color: "#042f5f",
          border: "none",
          borderRadius: "8px"
        }}
        onClick={() => window.open(clientData.reviewFormUrl, "_blank")}
      >
        Open Review Form
      </button>
    </div>
  );
};

export default AppLinkPage;