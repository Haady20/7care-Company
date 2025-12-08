// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ClientPage from './pages/Client/ClientPage';
import LandingPage from './pages/Landing/LandingPage';
import ClientForm from './pages/ClientForm';
import { AuthProvider } from './auth/AuthContext';
import PrivateRoute from './auth/PrivateRoute';
import Login from './pages/Login';
import AdminPage from './pages/control-987/AdminPage';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Root route */}
        <Route path="/" element={<LandingPage />} />

        {/* Optional alias if you still want /landing */}
        <Route path="/landing" element={<LandingPage />} />

        {/* Client page with qrToken param */}
        <Route path="/client/:qrToken" element={<ClientPage />} />

        {/* Protected block */}
        <Route element={<PrivateRoute />}>
          <Route path="/control-987" element={<AdminPage />} />
        </Route>

        {/* Client form (new) */}
        <Route path="/clients/new" element={<ClientForm />} />

        <Route path="*" element={<div style={{ padding: 24 }}>Home</div>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
