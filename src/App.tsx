import { HashRouter, Routes, Route } from "react-router-dom";
import AppLinkPage from "./pages/AppLinkPage";
import { useEffect } from "react";

function RootRedirect() {
  useEffect(() => {
    const savedSlug = localStorage.getItem("clientSlug");
    if (savedSlug) {
      window.location.hash = `#/app/${savedSlug}`;
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