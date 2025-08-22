import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/auth/LoginPage";
import Dashboard from "./pages/Dashboard";
import Dashboard2 from "./components/dashboard/Dashboard2";
import Form from "./pages/Form/Form";
import Home from "./pages/Home/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import BPIBayanihanWelcome from "./pages/Signup/page1"
import BPIBayanihanPage2 from "./pages/Signup/page2"
import BPIBayanihanPage3 from "./pages/Signup/page3"
import BPIBayanihanPage4 from "./pages/Signup/page4"
import BPIBayanihanPage5 from "./pages/Signup/page5"
import BPIBayanihanPage6 from "./pages/Signup/page6"
import Home2 from "./pages/Home/home2"
import ResidentHome from "./pages/Home/resident"
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
        <Route path="/page1" element={<BPIBayanihanWelcome />} />
        <Route path="/page2" element={<BPIBayanihanPage2 />} />
        <Route path="/page3" element={<BPIBayanihanPage3 />} />
        <Route path="/page3" element={<BPIBayanihanPage3 />} />
        <Route path="/page4" element={<BPIBayanihanPage4 />} />
        <Route path="/page5" element={<BPIBayanihanPage5 />} />
        <Route path="/page6" element={<BPIBayanihanPage6 />} />
        <Route path="/home2" element={<Home2 />} />
        <Route path="/resident" element={<ResidentHome />} />


    </Routes>
  );
}
