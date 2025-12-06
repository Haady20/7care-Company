// App.js
import { Routes, Route } from "react-router-dom";
import ClientPage from "./pages/Client/ClientPage";
import LandingPage from "./pages/Landing/LandingPage";
import AdminPage from "./pages/control-987/AdminPage";
import ClientForm from "./pages/ClientForm";

function App() {
  return (
    <Routes>
      {/* Root route */}
      <Route path="/" element={<LandingPage />} />

      {/* Optional alias if you still want /landing */}
      <Route path="/landing" element={<LandingPage />} />

      {/* Client page with qrToken param */}
      <Route path="/client/:qrToken" element={<ClientPage />} />

  {/* Admin page */}
  <Route path="/control-987" element={<AdminPage />} />

  {/* Client form (new) */}
  <Route path="/clients/new" element={<ClientForm />} />
    </Routes>
  );
}

export default App;
