import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AppLinkPage = () => {
  const { clientSlug } = useParams<{ clientSlug: string }>();
  const navigate = useNavigate();
  const [reviewUrl, setReviewUrl] = useState<string | null>(null);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstall, setShowInstall] = useState(false);

  useEffect(() => {
    localStorage.setItem("clientSlug", clientSlug || "");
    if (!clientSlug) {
      navigate("/404");
      return;
    }

    // Simulated client links (replace with dynamic fetch if needed)
    const links: Record<string, string> = {
      "smith-hvac": "https://example.com/smith-hvac-review-form"
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

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstall(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === "accepted") {
          console.log("App installed");
        }
        setDeferredPrompt(null);
        setShowInstall(false);
      });
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "2rem", fontFamily: "Arial", fontSize: "1.2rem" }}>
      <p>Preparing your app for <strong>{clientSlug}</strong>...</p>
      {showInstall && (
        <button onClick={handleInstall} style={{ padding: "10px 20px", marginTop: "20px" }}>
          Install this app
        </button>
      )}
    </div>
  );
};

export default AppLinkPage;