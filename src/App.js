import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage"
import ClientPage from "./pages/ClientPage";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/" element={<ClientPage />} />

<<<<<<< HEAD
=======
      <Route path="/" element={<LandingPage />} />
>>>>>>> b613287d326b786f74ef885a8c3b731927e60f67

      <Route path="/" element={<AdminPage />} />
    </Routes>
  );
}

export default App;
