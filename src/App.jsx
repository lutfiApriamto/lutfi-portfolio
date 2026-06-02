import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import IntroScreen from "./components/layout/IntroScreen";
import Navbar from "./components/layout/Navbar";
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
      <Routes>
        <Route path="/" element={<Home isReady={introComplete} />} />
      </Routes>

      {introComplete && <Navbar />}
      {showIntro && <IntroScreen onComplete={handleIntroComplete} />}
    </>
  );
};

export default App;