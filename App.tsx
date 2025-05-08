import { HashRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AppLinkPage from "./pages/AppLinkPage";

function RootRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const savedSlug = localStorage.getItem("clientSlug");
    if (savedSlug) {
      navigate(`/app/${savedSlug}`);
    }
  }, [navigate]);

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