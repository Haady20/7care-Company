import { Routes, Route } from "react-router-dom";
import ClientPage from "./pages/ClientPage";
import LandingPage from "./pages/LandingPage";
import AdminPage from "./pages/control-987/AdminPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      {/* <Route path="/" element={<ClientPage />} /> */}
      {/* <Route path="/control-987" element={<AdminPage />} /> */}
    </Routes>
  );
}

export default App;
