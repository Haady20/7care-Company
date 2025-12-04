import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage"
import ClientPage from "./pages/ClientPage";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/" element={<ClientPage />} />


      <Route path="/" element={<AdminPage />} />
    </Routes>
  );
}

export default App;