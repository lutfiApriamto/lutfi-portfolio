import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiDownload, FiArrowUpRight } from "react-icons/fi";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles"; // Menggunakan engine utama yang sudah lu install

const Hero = () => {
  const [particlesInit, setParticlesInit] = useState(false);

  // Inisialisasi engine TsParticles saat komponen dimuat
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // loadFull mengaktifkan semua fitur (shapes, lines, interactions)
      await loadFull(engine);
    }).then(() => {
      setParticlesInit(true);
    });
  }, []);

  // Kurva easing premium untuk transisi sinematik
  const smoothEase = [0.76, 0, 0.24, 1];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.4 },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0, opacity: 1,
      transition: { duration: 1.2, ease: smoothEase },
    },
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#050505] flex items-center justify-center select-none">
      
      {/* TS PARTICLES BACKGROUND */}
      {particlesInit && (
        <div className="absolute inset-0 z-0 w-full h-full pointer-events-auto">
          <Particles
            id="tsparticles"
            options={{
              background: {
                color: { value: "transparent" },
              },
              fpsLimit: 120,
              interactivity: {
                events: {
                  onHover: {
                    enable: true,
                    mode: "grab", // Garis akan menyedot/menghubung ke kursor lu
                  },
                },
                modes: {
                  grab: {
                    distance: 200,
                    links: { opacity: 0.5, color: "#06b6d4" }, // Warna cyan saat dihover
                  },
                },
              },
              particles: {
                color: { value: "#ffffff" },
                links: {
                  color: "#ffffff",
                  distance: 150,
                  enable: true,
                  opacity: 0.1, // Sangat tipis dan elegan di background
                  width: 1,
                },
                move: {
                  direction: "none",
                  enable: true,
                  outModes: { default: "out" },
                  random: false,
                  speed: 0.5, // Gerakan sangat lambat dan tenang
                  straight: false,
                },
                number: {
                  density: { enable: true, area: 800 },
                  value: 60, // Jumlah partikel, jangan terlalu padat biar nggak sumpek
                },
                opacity: { value: 0.3 },
                shape: { type: "circle" },
                size: { value: { min: 1, max: 2 } },
              },
              detectRetina: true,
            }}
            className="w-full h-full"
          />
        </div>
      )}

      {/* GRADIENT OVERLAY (Fading dari bawah biar smooth ke section berikutnya) */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#050505] via-transparent to-transparent pointer-events-none" />

      {/* HERO CONTENT CONTAINER */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-20 w-full max-w-7xl px-6 md:px-12 flex flex-col items-start justify-center"
      >
        {/* SUBTITLE / STATUS */}
        <motion.div variants={itemVariants} className="flex items-center gap-2 mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <p className="font-['Outfit'] text-xs md:text-sm tracking-[0.3em] uppercase text-white/40">
            Available for Opportunities
          </p>
        </motion.div>

        {/* MAIN BOLD TYPOGRAPHY */}
        <div className="overflow-hidden mb-2">
          <motion.h2 
            variants={itemVariants}
            className="font-['Outfit'] text-sm md:text-base tracking-[0.5em] uppercase text-white/50"
          >
            Software Engineer
          </motion.h2>
        </div>

        <div className="overflow-hidden mb-6">
          <motion.h1
            variants={itemVariants}
            className="font-['Outfit'] text-4xl md:text-7xl lg:text-8xl font-black text-[#F5F5F7] uppercase tracking-tight leading-none"
          >
            Crafting Scalable <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/70 to-white/30">
              Digital Solutions
            </span>
          </motion.h1>
        </div>

        {/* SHORT, POWERFUL BRIEF */}
        <div className="overflow-hidden max-w-2xl mb-10">
          <motion.p
            variants={itemVariants}
            className="font-['Outfit'] text-base md:text-lg text-white/60 font-light leading-relaxed tracking-wide"
          >
            Spesialisasi dalam membangun aplikasi web *end-to-end* yang responsif dan berkinerja tinggi menggunakan MERN Stack. Berpengalaman merombak sistem manufaktur korporat hingga mendigitalisasi solusi berdampak sosial.
          </motion.p>
        </div>

        {/* INTERACTIVE CALL TO ACTIONS (CTA) */}
        <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
          {/* Button Placeholder Download CV */}
          <a
            href="#download-cv"
            onClick={(e) => e.preventDefault()}
            className="group relative flex items-center gap-3 px-6 py-3.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white font-['Outfit'] text-sm font-medium tracking-wide overflow-hidden transition-all duration-300 hover:border-white/30"
          >
            <div className="absolute inset-0 w-full h-full bg-white scale-x-0 origin-left transition-transform duration-500 cubic-bezier(0.76, 0, 0.24, 1) group-hover:scale-x-100 z-0" />
            <FiDownload className="relative z-10 text-base transition-colors duration-300 group-hover:text-[#050505]" />
            <span className="relative z-10 transition-colors duration-300 group-hover:text-[#050505]">
              Download CV
            </span>
          </a>

          {/* Button View Projects */}
          <button className="group flex items-center gap-2 px-6 py-3.5 rounded-full text-white/60 font-['Outfit'] text-sm tracking-wide transition-all duration-300 hover:text-white">
            <span>Lihat Project</span>
            <FiArrowUpRight className="text-base transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
        </motion.div>

      </motion.div>

      {/* SCROLL INDICATOR MINIMALIS */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="font-['Outfit'] text-[10px] tracking-[0.4em] uppercase text-white">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
};

export default Hero;