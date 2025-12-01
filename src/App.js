import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AdminPage from "./pages/AdminPage";
import ClientPage from "./pages/ClientPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route path="/admin" element={<AdminPage />} />

      {/* http://localhost:3000/client/1 */}
      <Route path="/client/:id" element={<ClientPage />} />
    </Routes>
  );
}

export default App;
