import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/auth/LoginPage";
import Dashboard from "./pages/Dashboard";
import Dashboard2 from "./components/dashboard/Dashboard2";
import Form from "./pages/Form/Form";
import Home from "./pages/Home/Home";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      {/* main login/landing page */}
      <Route path="/" element={<LoginPage />} />

      {/* /login should also work */}
      <Route path="/login" element={<LoginPage />} />

      {/* protected dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* catch-all: redirect unknown paths back to / */}
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path="/dashboard2" element={<Dashboard2 />} />
      <Route path="/form" element={
        <Form />
        } />

        <Route
        path="/home"
        element={
            <Home />
        }
        />

    </Routes>
  );
}
