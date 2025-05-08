import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AppLinkPage = () => {
  const { clientSlug } = useParams<{ clientSlug: string }>();
  const [reviewUrl, setReviewUrl] = useState<string | null>(null);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstall, setShowInstall] = useState(false);

  useEffect(() => {
    localStorage.setItem("clientSlug", clientSlug || "");

    const links: Record<string, string> = {
      "smith-hvac": "https://example.com/smith-hvac-review-form"
    };

    const formUrl = links[clientSlug || ""] || null;
    setReviewUrl(formUrl);

    const timeout = setTimeout(() => {
      if (formUrl) {
        window.location.href = formUrl;
      }
    }, 5000);

    return () => clearTimeout(timeout);
  }, [clientSlug]);

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
      deferredPrompt.userChoice.then(() => {
        setDeferredPrompt(null);
        setShowInstall(false);
      });
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <p>Preparing your app for <strong>{clientSlug}</strong>...</p>
      {showInstall && (
        <button onClick={handleInstall} style={{ marginTop: "20px" }}>
          Install this app
        </button>
      )}
    </div>
  );
};

export default AppLinkPage;