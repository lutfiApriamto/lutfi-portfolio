import { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useScroll, useTransform } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { FiDownload, FiArrowUpRight } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";
import { SiReact, SiNodedotjs, SiMongodb,SiTypescript } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import { GlitchText, NeonText } from '../reusable/NeonText';

// ── FLOATING DECORATION ──
const FloatingDecoration = ({ icon: Icon, delay, className, color, isDark }) => (
  <div
    className={`absolute flex items-center justify-center w-11 h-11 sm:w-14 sm:h-14 rounded-full border backdrop-blur-lg transition-colors duration-500 z-20 ${className}`}
    style={{
      animation: `heroFloat 6s ease-in-out infinite`,
      animationDelay: `${delay}s`,
      willChange: 'transform',
      backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.7)",
      borderColor:     isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
      boxShadow: isDark
        ? `0 10px 30px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.1)`
        : `0 10px 30px rgba(0,0,0,0.04), inset 0 1px 1px rgba(255,255,255,0.9)`,
    }}
  >
    <Icon size={20} style={{ color }} className="opacity-85 drop-shadow-sm" />
  </div>
);

const Hero = ({ isReady }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const controls = useAnimation();
  const navigate = useNavigate();

  // ── Scroll parallax ──
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const heroY   = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    if (isReady) controls.start("visible");
  }, [isReady, controls]);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const update = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", update);
    return () => window.removeEventListener("mousemove", update);
  }, []);

  const containerVariants = {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };
  const itemVariants = {
    hidden:  { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  };

  const strokeClass = isDark ? "text-outline-dark" : "text-outline-light";

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden flex flex-col transition-colors duration-500 select-none"
      style={{
        backgroundColor: isDark ? "#050505" : "#FAF9F6",
        color:           isDark ? "#f0f0f0" : "#171717",
      }}
    >
      {/* ── CSS ANIMATIONS ── */}
      <style>{`
        .text-outline-dark  { -webkit-text-stroke: 1.5px rgba(255,255,255,0.15); color: transparent; }
        .text-outline-light { -webkit-text-stroke: 1.5px rgba(0,0,0,0.15); color: transparent; }
        @keyframes gridMove {
          0%   { background-position: 0 0; }
          100% { background-position: 40px 40px; }
        }
        @keyframes heroFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50%       { transform: translateY(-14px) rotate(4deg); }
        }
        @keyframes orbFloat1 {
          0%, 100% { transform: translate(-50%,-50%) translate(0px,0px) scale(1); }
          33%       { transform: translate(-50%,-50%) translate(30px,-50px) scale(1.08); }
          66%       { transform: translate(-50%,-50%) translate(-20px,20px) scale(0.95); }
        }
        @keyframes orbFloat2 {
          0%, 100% { transform: translate(0px,0px) scale(1); }
          50%       { transform: translate(-40px,40px) scale(1.12); }
        }
        @keyframes orbFloat3 {
          0%, 100% { transform: translate(0px,0px) scale(1); }
          50%       { transform: translate(50px,-30px) scale(1.05); }
        }
        @keyframes customMarquee {
          0%   { transform: translate3d(0,0,0); }
          100% { transform: translate3d(-33.33%,0,0); }
        }
        .animate-grid-scroll  { animation: gridMove 16s linear infinite; }
        .animate-orb-1        { animation: orbFloat1 12s ease-in-out infinite; }
        .animate-orb-2        { animation: orbFloat2 14s ease-in-out infinite; }
        .animate-orb-3        { animation: orbFloat3 16s ease-in-out infinite; }
        .animate-pure-marquee { animation: customMarquee 45s linear infinite; }
        .marquee-wrapper:hover .animate-pure-marquee { animation-play-state: paused; }
      `}</style>

      {/* ── BACKGROUND ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Moving grid */}
        <div
          className="absolute inset-0 animate-grid-scroll"
          style={{
            backgroundImage: isDark
              ? 'linear-gradient(to right,rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,0.02) 1px,transparent 1px)'
              : 'linear-gradient(to right,rgba(0,0,0,0.025) 1px,transparent 1px),linear-gradient(to bottom,rgba(0,0,0,0.025) 1px,transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        {/* Mouse spotlight */}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: isDark
              ? `radial-gradient(500px circle at ${mousePosition.x}px ${mousePosition.y}px,rgba(200,255,0,0.04),transparent 50%)`
              : `radial-gradient(500px circle at ${mousePosition.x}px ${mousePosition.y}px,rgba(59,130,246,0.04),transparent 50%)`,
          }}
        />
        {/* Orbs */}
        <div
          className="absolute top-1/2 left-1/2 w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] rounded-full blur-[100px] lg:blur-[140px] animate-orb-1 transition-colors duration-500"
          style={{ backgroundColor: isDark ? "rgba(200,255,0,0.05)" : "rgba(163,230,53,0.12)", willChange: 'transform' }}
        />
        <div
          className="absolute top-1/4 right-[15%] w-[35vw] h-[35vw] max-w-[500px] max-h-[500px] rounded-full blur-[90px] lg:blur-[120px] animate-orb-2 transition-colors duration-500"
          style={{ backgroundColor: isDark ? "rgba(0,242,254,0.03)" : "rgba(59,130,246,0.06)", willChange: 'transform' }}
        />
        <div
          className="absolute bottom-[15%] left-[15%] w-[40vw] h-[40vw] max-w-[550px] max-h-[550px] rounded-full blur-[110px] lg:blur-[130px] animate-orb-3 transition-colors duration-500"
          style={{ backgroundColor: isDark ? "rgba(163,230,53,0.03)" : "rgba(234,179,8,0.04)", willChange: 'transform' }}
        />
        {/* Vignette */}
        <div
          className="absolute inset-0 opacity-80 transition-colors duration-500"
          style={{ backgroundImage: `radial-gradient(circle at center,transparent 0%,${isDark ? '#050505' : '#FAF9F6'} 100%)` }}
        />
        {/* Bottom fade */}
        <div
          className="absolute inset-x-0 bottom-0 h-32"
          style={{ backgroundImage: `linear-gradient(to top,${isDark ? '#050505' : '#FAF9F6'},transparent)` }}
        />
      </div>

      {/* ── KONTEN + SCROLL PARALLAX ── */}
      <motion.div
        style={{ y: heroY, opacity }}
        className="relative z-10 flex flex-col w-full"
      >
        {/* BAGIAN 1: TYPOGRAPHY HUB */}
        <div className="w-full min-h-screen flex flex-col justify-center items-center text-center px-6 md:px-12 lg:px-24">

          {/* Status Badge */}
          <div
            className="mb-8 flex items-center gap-3 px-5 py-2.5 rounded-full border backdrop-blur-xl transition-all duration-500 select-none"
            style={{
              backgroundColor: isDark ? "rgba(200,255,0,0.10)"  : "rgba(37,99,235,0.10)",
              borderColor:     isDark ? "rgba(200,255,0,0.65)"  : "rgba(37,99,235,0.55)",
              boxShadow: isDark
                ? `0 0 18px rgba(200,255,0,0.45),0 0 50px rgba(200,255,0,0.18),inset 0 1.5px 0px rgba(255,255,255,0.30),inset 0 -1.5px 0px rgba(0,0,0,0.35)`
                : `0 0 18px rgba(37,99,235,0.35),0 0 45px rgba(37,99,235,0.12),inset 0 1.5px 0px rgba(255,255,255,0.85),inset 0 -1.5px 0px rgba(37,99,235,0.20)`,
            }}
          >
            <div
              className="w-2 h-2 rounded-full animate-pulse shadow-[0_0_12px_currentColor]"
              style={{ color: isDark ? "#C8FF00" : "#2563EB", backgroundColor: "currentColor" }}
            />
            <TypeAnimation
              key={theme}
              sequence={[
                "FRONT END DEVELOPER",      3000,
                "BACK END DEVELOPER",       3000,
                "FULL-STACK WEB DEVELOPER", 3000,
                "MERN STACK ARCHITECT",     3000,
              ]}
              wrapper="span"
              speed={60}
              repeat={Infinity}
              className="text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase transition-colors duration-500 font-mono"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: isDark ? "#C8FF00" : "#2563EB" }}
            />
          </div>

          {/* Typography + Floating Icons */}
          <div className="relative w-full max-w-[100rem] flex flex-col items-center">
            <FloatingDecoration icon={SiReact}      delay={0}   className="left-0 md:left-6 lg:left-24 top-0"                    color="#61DAFB" isDark={isDark} />
            <FloatingDecoration icon={SiNodedotjs}  delay={1.5} className="left-4 md:left-16 lg:left-40 bottom-12 hidden sm:flex" color="#339933" isDark={isDark} />
            <FloatingDecoration icon={SiTypescript} delay={0.7} className="right-0 md:right-6 lg:right-24 top-8"                 color="#3178C6" isDark={isDark} />
            <FloatingDecoration icon={SiMongodb}    delay={2.2} className="right-4 md:right-16 lg:right-40 -bottom-4 hidden sm:flex" color="#47A248" isDark={isDark} />

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={controls}
              className="w-full flex flex-col items-center z-10"
            >
              <motion.h1
                variants={itemVariants}
                className="text-[13vw] md:text-[8vw] font-black uppercase tracking-tight leading-[0.9] w-full"
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: isDark ? "#ffffff" : "#171717" }}
              >
                Lutfi
              </motion.h1>

              <motion.h1
                variants={itemVariants}
                className={`text-[13vw] md:text-[8vw] font-black uppercase tracking-tight leading-[0.9] mt-2 mb-8 w-full ${strokeClass}`}

              >
                <NeonText text="APRIAMTO" isDark={isDark} />
              </motion.h1>

              <motion.h2
                variants={itemVariants}
                className="text-lg md:text-2xl lg:text-3xl font-bold tracking-tight mb-4 flex items-center justify-center gap-2 flex-wrap transition-colors duration-500"
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: isDark ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.8)" }}
              >
                Architecting High-Performance{" "}
                <span
                  className="px-2.5 py-0.5 rounded-md ring-1 transition-all duration-500"
                  style={{
                    backgroundColor: isDark ? "rgba(200,255,0,0.1)"  : "rgba(59,130,246,0.08)",
                    borderColor:     isDark ? "rgba(200,255,0,0.2)"  : "rgba(59,130,246,0.15)",
                    color:           isDark ? "#C8FF00" : "#3B82F6",
                  }}
                >
                  <GlitchText text="Digital Ecosystems" />
                </span>
                <span style={{ color: isDark ? "#C8FF00" : "#3B82F6" }}>.</span>
              </motion.h2>

              <motion.p
                variants={itemVariants}
                className="max-w-2xl text-sm md:text-base lg:text-lg leading-relaxed font-normal transition-colors duration-300 mb-8"
                style={{ color: isDark ? "#94a3b8" : "#525252", fontFamily: "'Inter', sans-serif" }}
              >
                I engineering scalable architectures and intuitive interfaces. Specializing in frontend and backend system integrations using the modern MERN stack ecosystem.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="flex flex-wrap items-center justify-center gap-4 z-30"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                <button
                  onClick={() => navigate('/projects')}
                  className="group flex items-center gap-2 px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer rounded-sm"
                  style={{ backgroundColor: isDark ? "#ffffff" : "#171717", color: isDark ? "#050505" : "#ffffff" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = isDark ? "#C8FF00" : "#2563EB";
                    e.currentTarget.style.color = isDark ? "#050505" : "#ffffff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = isDark ? "#ffffff" : "#171717";
                    e.currentTarget.style.color = isDark ? "#050505" : "#ffffff";
                  }}
                >
                  Start a Project
                  <FiArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                </button>

                <a
                  href="https://drive.google.com/file/d/1c8J_eKqAVW6TT48LawfQt6T1NZS2xzLd/view?usp=sharing"
                  target="_blank"
                  className="group flex items-center gap-2 bg-transparent px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 border rounded-sm"
                  style={{
                    borderColor: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)",
                    color:       isDark ? "#ffffff" : "#171717",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)";
                    e.currentTarget.style.borderColor = isDark ? "#C8FF00" : "#2563EB";
                    e.currentTarget.style.color = isDark ? "#C8FF00" : "#2563EB";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.borderColor = isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)";
                    e.currentTarget.style.color = isDark ? "#ffffff" : "#171717";
                  }}
                >
                  Download CV
                  <FiDownload size={14} className="group-hover:translate-y-0.5 transition-transform duration-200" />
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

    </section>
  );
};

export default Hero;