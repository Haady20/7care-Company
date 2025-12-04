import { Routes, Route } from "react-router-dom";
import ClientPage from "./pages/ClientPage";
import LandingPage from "./pages/LandingPage";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ClientPage />} />
      {/* <Route path="/" element={<LandingPage />} /> */}
      {/* <Route path="/" element={<AdminPage />} /> */}
    </Routes>
  );
}

export default App;
