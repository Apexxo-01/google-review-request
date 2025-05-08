import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AppLinkPage = () => {
  const { clientSlug } = useParams<{ clientSlug: string }>();
  const navigate = useNavigate();
  const [reviewUrl, setReviewUrl] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem("clientSlug", clientSlug || "");
    if (!clientSlug) {
      navigate("/404");
      return;
    }

    // simulate webhook or database lookup
    const links: Record<string, string> = {
      "smith-hvac": "https://example.com/smith-hvac-review-form",
      "plumb-pros": "https://example.com/plumb-pros-review-form"
    };

    const formUrl = links[clientSlug] || null;
    setReviewUrl(formUrl);

    const timeout = setTimeout(() => {
      if (formUrl) {
        window.location.href = formUrl;
      }
    }, 5000);

    return () => clearTimeout(timeout);
  }, [clientSlug, navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "2rem", fontFamily: "Arial", fontSize: "1.2rem" }}>
      <p>Preparing your app for <strong>{clientSlug}</strong>...</p>
      <p>You will be redirected shortly.</p>
    </div>
  );
};

export default AppLinkPage;