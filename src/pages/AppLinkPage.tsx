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

  useEffect(() => {
    if (clientData?.reviewFormUrl) {
      const timeout = setTimeout(() => {
        window.location.href = clientData.reviewFormUrl;
      }, 3000); // delay to allow PWA install prompt
      return () => clearTimeout(timeout);
    }
  }, [clientData]);

  return (
    <div style={{ textAlign: "center", marginTop: "2rem", fontFamily: "Arial", fontSize: "1.2rem" }}>
      <p>Preparing your app...</p>
      <p>You will be redirected shortly.</p>
    </div>
  );
};

export default AppLinkPage;