import { Routes, Route, Navigate } from "react-router-dom";
import ClientPage from "./pages/Client/ClientPage";
import LandingPage from "./pages/Landing/LandingPage";
import AdminPage from "./pages/control-987/AdminPage";

function App() {
  return (
    <Routes>
      {/* default route so visiting "/" shows the landing page */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/client" element={<ClientPage />} />
      <Route path="/control-987" element={<AdminPage />} />
      {/* catch-all: redirect unknown routes to landing */}
      <Route path="*" element={<Navigate to="/landing" replace />} />
    </Routes>
  );
}

export default App;
