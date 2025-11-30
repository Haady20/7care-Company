import { Routes, Route } from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import ClientPage from "./pages/ClientPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AdminPage />} />

      {/* The :qrToken will come from the QR code URL, e.g.
          http://localhost:5173/client/b2b3456faebb8244
      */}
      <Route path="/client/:qrToken" element={<ClientPage />} />
    </Routes>
  );
}

export default App;
