import { HashRouter, Routes, Route } from "react-router-dom";
import AppLinkPage from "./pages/AppLinkPage";
import { useEffect } from "react";

function RootRedirect() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const slugFromUrl = urlParams.get('client');

    if (slugFromUrl) {
      localStorage.setItem("clientSlug", slugFromUrl);
      window.location.hash = `#/app/${slugFromUrl}`;
    } else {
      const savedSlug = localStorage.getItem("clientSlug");
      if (savedSlug) {
        window.location.hash = `#/app/${savedSlug}`;
      } else {
        console.log("No client slug found.");
      }
    }
  }, []);

  return <div>Loading app...</div>;
}

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<RootRedirect />} />
        <Route path="/app/:clientSlug" element={<AppLinkPage />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </HashRouter>
  );
}

export default App;
