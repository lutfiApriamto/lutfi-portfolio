import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const IntroScreen = ({ onComplete }) => {
  // Penambahan fase untuk memisahkan sesi secara presisi
  // "draw-icon" -> "reveal-text" -> "reveal-line" -> "reveal-portfolio" -> "exit"
  const [phase, setPhase] = useState("draw-icon");

  useEffect(() => {
    // Inject Google Font 'Outfit'
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Outfit:wght@200;400;700;900&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    // TIMELINE ANIMASI (DURASI JAUH LEBIH PANJANG & SINEMATIK)
    
    // Sesi 1: 0s - 2.0s -> Menggambar Ikon SVG
    const t1 = setTimeout(() => setPhase("reveal-text"), 2000);
    
    // Sesi 2: 2.0s - 4.5s -> Memunculkan Nama Besar Anda
    const t2 = setTimeout(() => setPhase("reveal-line"), 4500);
    
    // Sesi 3: 4.5s - 6.0s -> Menggambar Garis Pembatas Minimalis
    const t3 = setTimeout(() => setPhase("reveal-portfolio"), 6000);
    
    // Sesi 4: 6.0s - 8.5s -> Memunculkan Teks "PORTFOLIO" secara Elegan
    const t4 = setTimeout(() => setPhase("exit"), 8500);
    
    // Sesi 5: 8.5s - 9.7s -> Seluruh Layar Transisi Keluar
    const t5 = setTimeout(() => onComplete(), 9700);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [onComplete]);

  const smoothEase = [0.76, 0, 0.24, 1];

  const strokeStyle = {
    color: "transparent",
    WebkitTextStroke: "1px rgba(245, 245, 247, 0.8)",
  };

  // Cek status fase untuk mempermudah pembacaan kondisi
  const isTextVisible = phase !== "draw-icon";
  const isLineVisible = phase === "reveal-line" || phase === "reveal-portfolio" || phase === "exit";
  const isPortfolioVisible = phase === "reveal-portfolio" || phase === "exit";

  return (
    <AnimatePresence>
      {phase !== "complete" && (
        <motion.div
          key="cinematic-sequenced-intro"
          className="fixed inset-0 z-9999 flex flex-col items-center justify-center overflow-hidden bg-[#050505]"
          animate={phase === "exit" ? { y: "100%", opacity: 0 } : { y: "0%", opacity: 1 }}
          transition={{ duration: 1.2, ease: smoothEase }}
        >
          <div className="relative flex flex-col items-center justify-center w-full px-4 md:px-12">
            
            {/* SESI 1: ASET GRAFIS (SVG WIREFRAME) */}
            <motion.div
              animate={{
                scale: phase === "draw-icon" ? 1 : 0.4,
                y: phase === "draw-icon" ? 0 : -40,
                opacity: phase === "exit" ? 0 : 1,
              }}
              transition={{ duration: 1.2, ease: smoothEase }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
            >
              <svg 
                viewBox="0 0 100 100" 
                className="w-32 h-32 md:w-44 md:h-44"
                style={{ overflow: "visible" }}
              >
                <motion.circle
                  cx="50" cy="50" r="48"
                  stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" fill="none"
                  initial={{ pathLength: 0, rotate: -90 }}
                  animate={{ pathLength: 1, rotate: 0 }}
                  transition={{ duration: 1.8, ease: smoothEase }}
                />
                <motion.path
                  d="M50 5 L95 50 L50 95 L5 50 Z"
                  stroke="rgba(255,255,255,0.8)" strokeWidth="1" fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.8, delay: 0.2, ease: smoothEase }}
                />
                <motion.path
                  d="M50 20 L80 50 L50 80 L20 50 Z"
                  stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.8, delay: 0.4, ease: smoothEase }}
                />
              </svg>
            </motion.div>

            {/* SESI 2: TYPOGRAPHY KINETIK (NAMA LENGKAP) */}
            <div className="relative z-10 flex flex-col items-center justify-center w-full select-none pointer-events-none mt-20 md:mt-28">
              
              {/* Muhammad */}
              <div className="overflow-hidden w-full flex justify-center">
                <motion.h1
                  initial={{ y: "105%", opacity: 0 }}
                  animate={
                    phase === "exit" 
                      ? { y: "-30%", opacity: 0 } 
                      : isTextVisible 
                        ? { y: "0%", opacity: 1 } 
                        : { y: "105%", opacity: 0 }
                  }
                  transition={{ duration: 1.2, ease: smoothEase }}
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "clamp(38px, 10vw, 120px)",
                    fontWeight: 900,
                    lineHeight: 0.85,
                    letterSpacing: "0.01em",
                    ...strokeStyle
                  }}
                  className="uppercase text-center"
                >
                  Muhammad
                </motion.h1>
              </div>

              {/* Lutfi */}
              <div className="overflow-hidden w-full flex justify-center">
                <motion.h1
                  initial={{ y: "105%", opacity: 0 }}
                  animate={
                    phase === "exit" 
                      ? { y: "-30%", opacity: 0 } 
                      : isTextVisible 
                        ? { y: "0%", opacity: 1 } 
                        : { y: "105%", opacity: 0 }
                  }
                  transition={{ duration: 1.2, ease: smoothEase, delay: 0.1 }}
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "clamp(38px, 10vw, 120px)",
                    fontWeight: 900,
                    lineHeight: 0.85,
                    letterSpacing: "0.01em",
                    color: "#F5F5F7",
                  }}
                  className="uppercase text-center relative z-10"
                >
                  Lutfi
                </motion.h1>
              </div>

              {/* Apriamto */}
              <div className="overflow-hidden w-full flex justify-center">
                <motion.h1
                  initial={{ y: "105%", opacity: 0 }}
                  animate={
                    phase === "exit" 
                      ? { y: "-30%", opacity: 0 } 
                      : isTextVisible 
                        ? { y: "0%", opacity: 1 } 
                        : { y: "105%", opacity: 0 }
                  }
                  transition={{ duration: 1.2, ease: smoothEase, delay: 0.2 }}
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "clamp(38px, 10vw, 120px)",
                    fontWeight: 900,
                    lineHeight: 0.85,
                    letterSpacing: "0.01em",
                    ...strokeStyle
                  }}
                  className="uppercase text-center"
                >
                  Apriamto
                </motion.h1>
              </div>

            </div>

            {/* SESI 3: LINES ANIMATION (GARIS PEMBATAS) */}
            <div className="relative w-[140px] md:w-[200px] h-[1px] mt-8 md:mt-10 overflow-hidden">
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={
                  phase === "exit"
                    ? { scaleX: 1, opacity: 0 }
                    : isLineVisible 
                      ? { scaleX: 1, opacity: 1 } 
                      : { scaleX: 0, opacity: 0 }
                }
                transition={{ duration: 1.3, ease: smoothEase }}
                className="w-full h-full bg-white/20 origin-center"
              />
            </div>

            {/* SESI 4: TEXT "PORTFOLIO" */}
            <div className="overflow-hidden mt-4 md:mt-5 h-7 flex items-center justify-center">
              <motion.p
                initial={{ y: "100%", opacity: 0, letterSpacing: "0.2em" }}
                animate={
                  phase === "exit"
                    ? { y: "-100%", opacity: 0 }
                    : isPortfolioVisible
                      ? { y: "0%", opacity: 0.5, letterSpacing: "0.6em" }
                      : { y: "100%", opacity: 0, letterSpacing: "0.2em" }
                }
                transition={{ duration: 1.4, ease: smoothEase }}
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "clamp(11px, 2.5vw, 14px)",
                  fontWeight: 400,
                  color: "#F5F5F7",
                  marginRight: "-0.6em" // Kompensasi perataan tengah sempurna akibat letter-spacing
                }}
                className="uppercase text-center select-none default-tracking"
              >
                Portfolio
              </motion.p>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroScreen;