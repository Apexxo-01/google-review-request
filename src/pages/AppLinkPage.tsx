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
      } catch (error) {
        console.error("Fetch error:", error);
        navigate("/404");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [clientSlug, navigate]);

  useEffect(() => {
    if (clientData?.reviewFormUrl) {
      const timeout = setTimeout(() => {
        window.location.href = clientData.reviewFormUrl;
      }, 3000);
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