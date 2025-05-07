import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLinkPage from "./pages/AppLinkPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/app/:clientSlug" element={<AppLinkPage />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;