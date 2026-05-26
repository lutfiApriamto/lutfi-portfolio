import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import IntroScreen from "./components/layout/IntroScreen";
import Home from "./pages/Home";

const App = () => {
  const [showIntro, setShowIntro] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem("intro_seen");
    if (!hasSeenIntro) {
      setShowIntro(true);
    } else {
      setIntroComplete(true);
    }
  }, []);

  const handleIntroComplete = () => {
    sessionStorage.setItem("intro_seen", "true");
    setShowIntro(false);
    setIntroComplete(true);
  };

  return (
    <>
      {/* Home selalu dirender di background */}
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>

      {/* Intro overlay di atas home */}
      {showIntro && <IntroScreen onComplete={handleIntroComplete} />}
    </>
  );
};

export default App;