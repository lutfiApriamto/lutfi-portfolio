import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { FiArrowDown, FiDownload, FiArrowUpRight } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";

import { 
  SiReact, SiNodedotjs, SiMongodb, SiExpress, SiTailwindcss, 
  SiFramer, SiGit, SiTypescript, SiSupabase, SiGitlab, 
  SiChakraui, SiNextdotjs, SiJavascript, SiGo, SiFigma, 
  SiHtml5, SiCss, SiPhp, SiPython, SiVercel, SiPostman 
} from "react-icons/si";

// === SUB-KOMPONEN DEKORASI MENGAMBANG (FLOATING DECORATION) ===
// Menggunakan Pure CSS Animation agar performa rendering tetap halus di device low-end
const FloatingDecoration = ({ icon: Icon, delay, className, color, isDark }) => {
  return (
    <div
      className={`absolute flex items-center justify-center w-11 h-11 sm:w-14 sm:h-14 rounded-full border backdrop-blur-lg transition-colors duration-500 z-20 ${className}`}
      style={{
        animation: `heroFloat 6s ease-in-out infinite`,
        animationDelay: `${delay}s`,
        willChange: 'transform',
        backgroundColor: isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(255, 255, 255, 0.7)",
        borderColor: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)",
        boxShadow: isDark 
          ? `0 10px 30px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.1)` 
          : `0 10px 30px rgba(0,0,0,0.04), inset 0 1px 1px rgba(255,255,255,0.9)`,
      }}
    >
      <Icon size={20} style={{ color: color }} className="opacity-85 drop-shadow-sm" />
    </div>
  );
};

const Hero = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // 1. Mouse Tracking Terintegrasi dengan Background
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  // 2. Data Tech Stack (Untuk Marquee Run)
  const techStack = [
    { name: "React", icon: SiReact, color: "#61DAFB" },
    { name: "Next.js", icon: SiNextdotjs, color: isDark ? "#ffffff" : "#000000" },
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
    { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
    { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
    { name: "Express", icon: SiExpress, color: isDark ? "#ffffff" : "#000000" },
    { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
    { name: "Golang", icon: SiGo, color: "#00ADD8" },
    { name: "Python", icon: SiPython, color: "#3776AB" },
    { name: "PHP", icon: SiPhp, color: "#777BB4" },
    { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
    { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
    { name: "Chakra UI", icon: SiChakraui, color: "#319795" },
    { name: "Framer Motion", icon: SiFramer, color: "#0055FF" },
    { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
    { name: "CSS3", icon: SiCss, color: "#1572B6" },
    { name: "Git", icon: SiGit, color: "#F05032" },
    { name: "GitLab", icon: SiGitlab, color: "#FC6D26" },
    { name: "Vercel", icon: SiVercel, color: isDark ? "#ffffff" : "#000000" },
    { name: "Postman", icon: SiPostman, color: "#FF6C37" },
    { name: "Figma", icon: SiFigma, color: "#F24E1E" },
  ];

  const duplicatedTechStack = [...techStack, ...techStack, ...techStack];

  // 3. Konfigurasi Entrance Animasi Framer Motion (Staggered)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  // 4. Pengaturan Warna Dinamis Berdasarkan Tema
  const strokeClass = isDark ? "text-outline-dark" : "text-outline-light";
  const crossFilter = isDark ? "invert(1) opacity(0.04)" : "invert(0) opacity(0.05)";

  return (
    <section 
      className="relative w-full overflow-hidden flex flex-col transition-colors duration-500 select-none"
      style={{ 
        backgroundColor: isDark ? "#050505" : "#FAF9F6",
        color: isDark ? "#f0f0f0" : "#171717",
      }}
    >
      {/* ── HIGH-PERFORMANCE INJECTED CSS ANIMATIONS ── */}
      <style>{`
        .font-space { fontFamily: 'Space Grotesk', sans-serif; }
        .font-inter { fontFamily: 'Inter', sans-serif; }

        /* Text Outline Effects */
        .text-outline-dark { -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.15); color: transparent; }
        .text-outline-light { -webkit-text-stroke: 1.5px rgba(0, 0, 0, 0.15); color: transparent; }

        /* Background Keyframes & Floating Object Keyframe */
        @keyframes gridMove {
          0% { background-position: 0 0; }
          100% { background-position: 40px 40px; }
        }
        @keyframes heroFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-14px) rotate(4deg); }
        }
        @keyframes orbFloat1 {
          0%, 100% { transform: translate(-50%, -50%) translate(0px, 0px) scale(1); }
          33% { transform: translate(-50%, -50%) translate(30px, -50px) scale(1.08); }
          66% { transform: translate(-50%, -50%) translate(-20px, 20px) scale(0.95); }
        }
        @keyframes orbFloat2 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(-40px, 40px) scale(1.12); }
        }
        @keyframes orbFloat3 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(50px, -30px) scale(1.05); }
        }
        @keyframes customMarquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-33.33%, 0, 0); }
        }

        .animate-grid-scroll { animation: gridMove 16s linear infinite; }
        .animate-orb-1 { animation: orbFloat1 12s ease-in-out infinite; }
        .animate-orb-2 { animation: orbFloat2 14s ease-in-out infinite; }
        .animate-orb-3 { animation: orbFloat3 16s ease-in-out infinite; }
        .animate-pure-marquee { animation: customMarquee 45s linear infinite; }
        .marquee-wrapper:hover .animate-pure-marquee { animation-play-state: paused; }
      `}</style>
      
      {/* ── ADAPTIVE BACKGROUND ENGINEERING ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        
        {/* 1. Base Moving Grid Overlay */}
        <div 
          className="absolute inset-0 animate-grid-scroll"
          style={{
            backgroundImage: isDark
              ? 'linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)'
              : 'linear-gradient(to right, rgba(0,0,0,0.025) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.025) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />

        {/* 2. Plus/Cross Engineering Pattern Overlay */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M40 38v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z' fill='%23000000' fill-rule='nonzero'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundPosition: 'center center',
            filter: crossFilter
          }}
        />

        {/* 3. Concentric Structural Rings */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] h-[85vw] max-w-[850px] max-h-[850px] rounded-full border transition-colors duration-500" 
          style={{ borderColor: isDark ? "rgba(200,255,0,0.03)" : "rgba(59,130,246,0.04)" }}
        />
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[65vw] h-[65vw] max-w-[650px] max-h-[650px] rounded-full border transition-colors duration-500" 
          style={{ borderColor: isDark ? "rgba(200,255,0,0.02)" : "rgba(59,130,246,0.03)" }}
        />

        {/* 4. Interactive Mouse Spotlight Glow */}
        <div 
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: isDark 
              ? `radial-gradient(500px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(200, 255, 0, 0.04), transparent 50%)`
              : `radial-gradient(500px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.04), transparent 50%)`
          }}
        />

        {/* 5. Fluid Ambient Organic Orbs (Hardware Accelerated Blur) */}
        <div 
          className="absolute top-1/2 left-1/2 w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] rounded-full blur-[100px] lg:blur-[140px] animate-orb-1 transition-colors duration-500"
          style={{ 
            backgroundColor: isDark ? "rgba(200, 255, 0, 0.05)" : "rgba(163, 230, 53, 0.12)",
            willChange: 'transform'
          }}
        />
        <div 
          className="absolute top-1/4 right-[15%] w-[35vw] h-[35vw] max-w-[500px] max-h-[500px] rounded-full blur-[90px] lg:blur-[120px] animate-orb-2 transition-colors duration-500"
          style={{ 
            backgroundColor: isDark ? "rgba(0, 242, 254, 0.03)" : "rgba(59, 130, 246, 0.06)",
            willChange: 'transform'
          }}
        />
        <div 
          className="absolute bottom-[15%] left-[15%] w-[40vw] h-[40vw] max-w-[550px] max-h-[550px] rounded-full blur-[110px] lg:blur-[130px] animate-orb-3 transition-colors duration-500"
          style={{ 
            backgroundColor: isDark ? "rgba(163, 230, 53, 0.03)" : "rgba(234, 179, 8, 0.04)",
            willChange: 'transform'
          }}
        />

        {/* 6. Smooth Radial Vignette & Bottom Blending */}
        <div 
          className="absolute inset-0 opacity-80 transition-colors duration-500" 
          style={{ backgroundImage: `radial-gradient(circle at center, transparent 0%, ${isDark ? '#050505' : '#FAF9F6'} 100%)` }}
        />
        <div 
          className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-transparent to-transparent"
          style={{ backgroundImage: `linear-gradient(to top, ${isDark ? '#050505' : '#FAF9F6'}, transparent)` }}
        />
      </div>

      {/* ── BAGIAN 1: CONTENT TYPOGRAPHY HUB ── */}
      <div className="relative z-10 w-full min-h-screen flex flex-col justify-center items-center text-center px-6 md:px-12 lg:px-24">
        
        {/* Modern Live Status Badge - HIGH FIDELITY CYBER X-RAY CAPSULE EFFECT */}
        <div 
          className="mb-8 flex items-center gap-3 px-5 py-2.5 rounded-full border backdrop-blur-xl transition-all duration-500 select-none"
          style={{
            // Background lebih pekat agar body capsule terlihat nyata
            backgroundColor: isDark 
              ? "rgba(200, 255, 0, 0.10)" 
              : "rgba(37, 99, 235, 0.10)",
            // Border lebih solid & terang
            borderColor: isDark 
              ? "rgba(200, 255, 0, 0.65)" 
              : "rgba(37, 99, 235, 0.55)",
            // 3 layer shadow: outer glow kuat + inner top highlight (glass effect) + inner bottom shadow
            boxShadow: isDark 
              ? `0 0 18px rgba(200, 255, 0, 0.45),
                0 0 50px rgba(200, 255, 0, 0.18),
                inset 0 1.5px 0px rgba(255, 255, 255, 0.30),
                inset 0 -1.5px 0px rgba(0, 0, 0, 0.35)` 
              : `0 0 18px rgba(37, 99, 235, 0.35),
                0 0 45px rgba(37, 99, 235, 0.12),
                inset 0 1.5px 0px rgba(255, 255, 255, 0.85),
                inset 0 -1.5px 0px rgba(37, 99, 235, 0.20)`,
          }}
        >
          {/* Core Status Dot Glow */}
          <div 
            className="w-2 h-2 rounded-full animate-pulse shadow-[0_0_12px_currentColor]" 
            style={{ color: isDark ? "#C8FF00" : "#2563EB", backgroundColor: "currentColor" }}
          />
          
          {/* Type Animation - FIXED: Force remount via key={theme} */}
          <TypeAnimation
            key={theme}
            sequence={[
              "MUHAMMAD LUTFI APRIAMTO", 3000,
              "FULL-STACK WEB DEVELOPER", 3000,
              "MERN STACK ARCHITECT", 3000,
            ]}
            wrapper="span"
            speed={60}
            repeat={Infinity}
            className="text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase transition-colors duration-500 font-mono"
            style={{ 
              fontFamily: "'Space Grotesk', sans-serif",
              color: isDark ? "#C8FF00" : "#2563EB" 
            }}
          />
        </div>

        {/* Massive Clear Typography Container with Floating Elements */}
        <div className="relative w-full max-w-[100rem] flex flex-col items-center">
          
          {/* ── DEKORASI MENGAMBANG (Kiri & Kanan) Berdasarkan Ikon Stack Lu ── */}
          {/* Sisi Kiri */}
          <FloatingDecoration icon={SiReact} delay={0} className="left-0 md:left-6 lg:left-24 top-0" color="#61DAFB" isDark={isDark} />
          <FloatingDecoration icon={SiNodedotjs} delay={1.5} className="left-4 md:left-16 lg:left-40 bottom-12 hidden sm:flex" color="#339933" isDark={isDark} />
          
          {/* Sisi Kanan */}
          <FloatingDecoration icon={SiTypescript} delay={0.7} className="right-0 md:right-6 lg:right-24 top-8" color="#3178C6" isDark={isDark} />
          <FloatingDecoration icon={SiMongodb} delay={2.2} className="right-4 md:right-16 lg:right-40 -bottom-4 hidden sm:flex" color="#47A248" isDark={isDark} />

          {/* Core Architecture Headline Text */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full flex flex-col items-center z-10"
          >
            <motion.h1 
              variants={itemVariants} 
              className="text-[13vw] md:text-[8vw] font-black uppercase tracking-tight leading-[0.9] w-full"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: isDark ? "#ffffff" : "#171717" }}
            >
              FULL-STACK
            </motion.h1>
            
            <motion.h1 
              variants={itemVariants} 
              className={`text-[13vw] md:text-[8vw] font-black uppercase tracking-tight leading-[0.9] mt-2 mb-8 w-full ${strokeClass}`}
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              DEVELOPER
            </motion.h1>
            
            {/* Engineering-focused Slogan */}
            <motion.h2 
              variants={itemVariants}
              className="text-lg md:text-2xl lg:text-3xl font-bold tracking-tight mb-4 flex items-center justify-center gap-2 flex-wrap transition-colors duration-500"
              style={{ 
                fontFamily: "'Space Grotesk', sans-serif",
                color: isDark ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.8)"
              }}
            >
              Architecting High-Performance{" "}
              <span 
                className="px-2.5 py-0.5 rounded-md ring-1 transition-all duration-500"
                style={{ 
                  backgroundColor: isDark ? "rgba(200, 255, 0, 0.1)" : "rgba(59, 130, 246, 0.08)",
                  borderColor: isDark ? "rgba(200, 255, 0, 0.2)" : "rgba(59, 130, 246, 0.15)",
                  color: isDark ? "#C8FF00" : "#3B82F6"
                }}
              >
                Digital Ecosystems
              </span>
              <span style={{ color: isDark ? "#C8FF00" : "#3B82F6" }}>.</span>
            </motion.h2>

            {/* Clean Engineering Paragraph */}
            <motion.p 
              variants={itemVariants} 
              className="max-w-2xl text-sm md:text-base lg:text-lg leading-relaxed font-normal transition-colors duration-300 mb-8"
              style={{ color: isDark ? "#94a3b8" : "#525252", fontFamily: "'Inter', sans-serif" }}
            >
              I engineering scalable architectures and intuitive interfaces. Specializing in frontend and backend system integrations using the modern MERN stack ecosystem.
            </motion.p>

            {/* ── BUTTON CTA INTERAKTIF (VIEW PROJECTS & DOWNLOAD CV PLACEHOLDER) ── */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap items-center justify-center gap-4 z-30"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {/* Primary CTA: View Work */}
              <button
                onClick={() => document.getElementById('projects-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="group flex items-center gap-2 px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer rounded-sm"
                style={{
                  backgroundColor: isDark ? "#ffffff" : "#171717",
                  color: isDark ? "#050505" : "#ffffff",
                }}
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

              {/* Secondary CTA: Download CV (Placeholder Link) */}
              <a
                href="#download-cv-placeholder"
                onClick={(e) => {
                  e.preventDefault();
                  alert("CV Download Handler Triggered!");
                }}
                className="group flex items-center gap-2 bg-transparent px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 border rounded-sm"
                style={{
                  borderColor: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)",
                  color: isDark ? "#ffffff" : "#171717",
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

      {/* ── BAGIAN 2: QUICK LINKS & SCROLL INDICATOR ── */}
      <div 
        className="relative z-10 w-full px-6 md:px-12 lg:px-24 xl:px-32 py-8 md:py-12 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-8 border-t transition-colors duration-500"
        style={{ 
          borderColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
          fontFamily: "'Space Grotesk', sans-serif"
        }}
      >
        {/* Social Links */}
        <div className="flex flex-row flex-wrap justify-center items-center gap-8 md:gap-10 text-xs font-bold tracking-[0.2em] uppercase">
          {[
            { label: 'LinkedIn', url: 'https://www.linkedin.com/in/lutfi-apriamto-3a9383312/', hoverClass: 'hover:text-[#0A66C2]' },
            { label: 'GitHub', url: 'https://github.com/lutfiApriamto', hoverClass: isDark ? 'hover:text-white' : 'hover:text-black' },
            { label: 'Instagram', url: 'https://www.instagram.com/lutfiamto/', hoverClass: isDark ? 'hover:text-[#E1306C]' : 'hover:text-[#E1306C]' }
          ].map((link) => (
            <a 
              key={link.label} 
              href={link.url} 
              target="_blank"
              className={`relative group transition-colors duration-300 text-neutral-400 ${link.hoverClass}`}
            >
              {link.label}
              <span className="absolute left-0 -bottom-1.5 w-0 h-[1.5px] bg-current transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="flex items-center gap-4 text-xs tracking-widest uppercase font-bold text-neutral-400 cursor-pointer group">
          <span className={isDark ? "group-hover:text-white transition-colors" : "group-hover:text-black transition-colors"}>
            Scroll to explore
          </span>
          <div 
            className="w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300"
            style={{ 
              borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
            }}
          >
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <FiArrowDown size={14} className={isDark ? "group-hover:text-white text-neutral-400" : "group-hover:text-black text-neutral-400"} />
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── BAGIAN 3: MARQUEE TECH STACK ── */}
      <div 
        className="marquee-wrapper relative z-10 w-full border-t py-6 md:py-7 overflow-hidden select-none transition-colors duration-500"
        style={{ 
          borderColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
          backgroundColor: isDark ? "#030303" : "#F5F5F3",
          fontFamily: "'Space Grotesk', sans-serif"
        }}
      >
        {/* Masking Gradient Edge Effect */}
        <div 
          className="absolute inset-0 z-20 pointer-events-none w-full" 
          style={{
            background: isDark
              ? "linear-gradient(to right, #030303, transparent 15%, transparent 85%, #030303)"
              : "linear-gradient(to right, #F5F5F3, transparent 15%, transparent 85%, #F5F5F3)"
          }}
        />
        
        {/* Pure CSS Marquee Core Track */}
        <div className="animate-pure-marquee flex items-center gap-16 md:gap-24 w-max">
          {duplicatedTechStack.map((tech, index) => {
            const Icon = tech.icon;
            return (
              <div 
                key={index} 
                className="flex items-center gap-3.5 transition-transform duration-300 hover:scale-110 cursor-default"
              >
                <Icon 
                  size={24} 
                  style={{ color: tech.color }} 
                  className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]"
                />
                <span 
                  className="text-xs font-bold tracking-widest uppercase transition-colors duration-300"
                  style={{ color: isDark ? "#a3a3a3" : "#525252" }}
                >
                  {tech.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
};

export default Hero;