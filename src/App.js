import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage"
import ClientPage from "./pages/ClientPage";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ClientPage />} />
       {/* <Route path="/" element={<LandingPage />} /> */}
      {/* <Route path="/" element={<AdminPage />} /> */}

      {/* The :qrToken will come from the QR code URL, e.g.
          http://localhost:5173/client/b2b3456faebb8244
      */}
    </Routes>
  );
}

export default App;