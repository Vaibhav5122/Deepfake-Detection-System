import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router";
import App from "./App";
import Hero from "./components/Hero";
import DetectionView from "./components/DetectionView";
import AboutPage from "./components/AboutPage";
import LoginView from "./components/LoginView";
import SignupView from "./components/SignupView";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export const AppRouting = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Hero />} />
          <Route path="login" element={<LoginView />} />
          <Route path="signup" element={<SignupView />} />
          <Route path="about" element={<AboutPage />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route
              path="image-detection"
              element={<DetectionView type="image-detection" />}
            />
            <Route
              path="video-detection"
              element={<DetectionView type="video-detection" />}
            />
            <Route
              path="audio-detection"
              element={<DetectionView type="audio-detection" />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouting;
