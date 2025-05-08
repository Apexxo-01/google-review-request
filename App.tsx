import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import AppLinkPage from "./pages/AppLinkPage";
import { useEffect } from "react";

function RootRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
    const storedSlug = localStorage.getItem("clientSlug");
    if (storedSlug) {
      navigate(`/app/${storedSlug}`);
    } else {
      navigate("/404");
    }
  }, [navigate]);
  return <div>Loading app...</div>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootRedirect />} />
        <Route path="/app/:clientSlug" element={<AppLinkPage />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;