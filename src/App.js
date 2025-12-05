import { Routes, Route } from "react-router-dom";
import ClientPage from "./pages/Client/ClientPage";
import LandingPage from "./pages/Landing/LandingPage";
import AdminPage from "./pages/control-987/AdminPage";

function App() {
  return (
    <Routes>
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/client" element={<ClientPage />} />
      <Route path="/control-987" element={<AdminPage />} />
    </Routes>
  );
}

export default App;
