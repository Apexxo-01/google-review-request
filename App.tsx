import { HashRouter, Routes, Route } from "react-router-dom";
import AppLinkPage from "./pages/AppLinkPage";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<div>Loading app...</div>} />
        <Route path="/app/:clientSlug" element={<AppLinkPage />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </HashRouter>
  );
}

export default App;