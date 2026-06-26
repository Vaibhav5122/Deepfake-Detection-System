import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App";
import Hero from "./components/Hero";
import DetectionView from "./components/DetectionView";
import AboutPage from "./components/AboutPage";

export const AppRouting = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Hero />} />
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
          <Route path="about" element={<AboutPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouting;
