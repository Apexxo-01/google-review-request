import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import AppLinkPage from "./pages/AppLinkPage";
import { useEffect } from "react";

function RootRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
    const storedSlug = localStorage.getItem("clientSlug");
    if (storedSlug) {
      navigate(`/app/${storedSlug}`);
    }
  }, [navigate]);
  return <div>Loading...</div>;
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