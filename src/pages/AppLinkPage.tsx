
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getClientLinkBySlug } from "@/services/makeService";

const AppLinkPage = () => {
  const { clientSlug } = useParams<{ clientSlug: string }>();
  const navigate = useNavigate();
  const [clientData, setClientData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!clientSlug) return;
    
    fetchData();
    
    async function fetchData() {
      try {
        const data = await getClientLinkBySlug(clientSlug);
        if (!data || !data.reviewFormUrl) {
          navigate("/not-found");
          return;
        }

        setClientData(data);
        configureManifest(data);
      } catch (err) {
        console.error("Error loading client data", err);
        navigate("/not-found");
      } finally {
        setLoading(false);
      }
    }

    function configureManifest(data: any) {
      const manifest = {
        name: \`\${data.clientName} Review App\`,
        short_name: data.clientName,
        start_url: window.location.href,
        display: "standalone",
        background_color: "#042f5f",
        theme_color: "#042f5f",
        icons: [
          {
            src: "/icon-512.png",
            sizes: "512x512",
            type: "image/png"
          },
          {
            src: "/icon-192.png",
            sizes: "192x192",
            type: "image/png"
          }
        ]
      };
      const stringManifest = JSON.stringify(manifest);
      const blob = new Blob([stringManifest], { type: "application/json" });
      const manifestURL = URL.createObjectURL(blob);
      let link = document.querySelector("link[rel='manifest']");
      if (link) link.setAttribute("href", manifestURL);
    }
  }, [clientSlug, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>{clientData?.clientName}</h1>
      <button
        onClick={() => {
          window.open(clientData.reviewFormUrl, "_blank");
        }}
        style={{
          padding: "1rem 2rem",
          fontSize: "1.2rem",
          backgroundColor: "#02ceff",
          color: "#042f5f",
          border: "none",
          borderRadius: "8px"
        }}
      >
        Open Review Form
      </button>
    </div>
  );
};

export default AppLinkPage;
