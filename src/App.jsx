import { useState, useEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import IntroScreen from "./components/layout/IntroScreen";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Lenis from 'lenis';
import ScrollToTop from "./components/layout/ScrollToTop";
import Connect from "./pages/Connect";
import Project from "./pages/Project";

const App = () => {
  const [showIntro, setShowIntro]                     = useState(false);
  const [introComplete, setIntroComplete]             = useState(false);
  const [initialRenderNoIntro, setInitialRenderNoIntro] = useState(false);

  // Simpan rafId agar bisa di-cancel saat modal buka
  const rafIdRef = useRef(null);

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem("intro_seen");
    if (!hasSeenIntro) {
      setShowIntro(true);
    } else {
      setIntroComplete(true);
      setInitialRenderNoIntro(true);
    }
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 2.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    window.__lenis = lenis;

    // ── RAF loop — disimpan di ref agar bisa di-cancel ──
    const raf = (time) => {
      lenis.raf(time);
      rafIdRef.current = requestAnimationFrame(raf);
    };
    rafIdRef.current = requestAnimationFrame(raf);

    // ── Expose pause/resume helper ke window ──
    // Modal bisa panggil window.__lenisStop() dan window.__lenisStart()
    window.__lenisStop = () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      lenis.stop();
    };

    window.__lenisStart = () => {
      lenis.start();
      // Restart RAF kalau belum jalan
      if (!rafIdRef.current) {
        const restart = (time) => {
          lenis.raf(time);
          rafIdRef.current = requestAnimationFrame(restart);
        };
        rafIdRef.current = requestAnimationFrame(restart);
      }
    };

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      lenis.destroy();
      window.__lenis      = null;
      window.__lenisStop  = null;
      window.__lenisStart = null;
    };
  }, []);

  const handleIntroComplete = () => {
    sessionStorage.setItem("intro_seen", "true");
    setShowIntro(false);
    setIntroComplete(true);
  };

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/"         element={<Home isReady={introComplete} />} />
        <Route path="/about"    element={<About />} />
        <Route path="/connect"  element={<Connect />} />
        <Route path="/projects" element={<Project />} />
      </Routes>
      {introComplete && <Navbar wasIntroShown={!initialRenderNoIntro} />}
      {showIntro && <IntroScreen onComplete={handleIntroComplete} />}
    </>
  );
};

export default App;