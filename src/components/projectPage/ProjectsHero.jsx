import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { useTheme } from "../../context/ThemeContext";
import { ArrowDown } from 'lucide-react';
import { GlitchText, NeonText } from '../reusable/NeonText';

// ── TICKER STRIP ──
const TickerStrip = ({ isDark }) => {
  const items = [
    "MERN Stack", "React.js", "Node.js", "MongoDB",
    "Full Stack", "Next.js", "Tailwind CSS", "REST API",
    "UI/UX", "Open Source", "Production Ready",
  ];
  const doubled = [...items, ...items];
  return (
    <div
      className="w-full overflow-hidden py-3 border-y"
      style={{
        borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
        backgroundColor: isDark ? "rgba(255,255,255,0.01)" : "rgba(0,0,0,0.01)",
      }}
    >
      <motion.div
        className="flex items-center gap-8 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, ease: "linear", repeat: Infinity }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-8 flex-shrink-0">
            <span
              className="text-[10px] font-mono font-bold uppercase tracking-[0.22em] whitespace-nowrap"
              style={{ color: isDark ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.22)" }}
            >
              {item}
            </span>
            <span
              className="w-1 h-1 rounded-full flex-shrink-0"
              style={{ backgroundColor: isDark ? "rgba(200,255,0,0.35)" : "rgba(37,99,235,0.35)" }}
            />
          </span>
        ))}
      </motion.div>
    </div>
  );
};

// ── FLOATING SIDE TAG ──
const SideTag = ({ children, side = "left", delay, isDark, isInView }) => (
  <motion.div
    initial={{ opacity: 0, x: side === "left" ? -20 : 20 }}
    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: side === "left" ? -20 : 20 }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    className="flex flex-col gap-1.5"
  >
    <span
      className="text-[9px] font-mono font-bold uppercase tracking-[0.25em]"
      style={{ color: isDark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.18)" }}
    >
      {children.label}
    </span>
    <span
      className="text-sm font-black uppercase tracking-tight"
      style={{
        fontFamily: "'Space Grotesk', sans-serif",
        color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)",
      }}
    >
      {children.value}
    </span>
  </motion.div>
);

// ── STAT PILL ──
const StatPill = ({ value, label, delay, isDark, isInView }) => (
  <motion.div
    initial={{ opacity: 0, y: 14, scale: 0.92 }}
    animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 14, scale: 0.92 }}
    transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    className="flex flex-col items-center gap-1 px-4 py-3 rounded-xl border backdrop-blur-sm"
    style={{
      backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
      borderColor: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)",
    }}
  >
    <span
      className="text-xl md:text-2xl font-black leading-none tabular-nums"
      style={{ fontFamily: "'Space Grotesk', sans-serif", color: isDark ? "#C8FF00" : "#2563EB" }}
    >
      {value}
    </span>
    <span
      className="text-[9px] font-mono font-bold uppercase tracking-[0.18em] text-center"
      style={{ color: isDark ? "rgba(255,255,255,0.28)" : "rgba(0,0,0,0.28)" }}
    >
      {label}
    </span>
  </motion.div>
);

// ── MAIN COMPONENT ──
const ProjectsHero = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const isInView = useInView(contentRef, { once: false, margin: "-80px" });

  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const move = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const heroY   = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const leftTags  = [
    { label: "Role",     value: "Full Stack Dev" },
    { label: "Stack",    value: "MERN " },
    { label: "Based in", value: "Indonesia" },
  ];
  const rightTags = [
    { label: "Projects",   value: "8 Shipped" },
    { label: "IP Rights",  value: "2 Acquired" },
    { label: "Experience", value: "3+ Years" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col overflow-hidden transition-colors duration-500"
      style={{
        backgroundColor: isDark ? "#050505" : "#FAF9F6",
        color: isDark ? "#f0f0f0" : "#171717",
      }}
    >
      <style>{`
        @keyframes orbDrift1 {
          0%, 100% { transform: translate(-50%, -50%) translate(0px, 0px) scale(1); }
          40% { transform: translate(-50%, -50%) translate(25px, -35px) scale(1.05); }
          70% { transform: translate(-50%, -50%) translate(-18px, 15px) scale(0.97); }
        }
        @keyframes orbDrift2 {
          0%, 100% { transform: translate(0px, 0px); }
          50% { transform: translate(-30px, 30px); }
        }
        
        @keyframes neonFlicker {
          0%, 100% { opacity: 1; }
          92%       { opacity: 1; }
          93%       { opacity: 0.4; }
          94%       { opacity: 1; }
          96%       { opacity: 0.6; }
          97%       { opacity: 1; }
        }

      `}</style>

      {/* ── MOUSE SPOTLIGHT ── */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: isDark
            ? `radial-gradient(600px circle at ${mouse.x}px ${mouse.y}px, rgba(200,255,0,0.04), transparent 50%)`
            : `radial-gradient(600px circle at ${mouse.x}px ${mouse.y}px, rgba(37,99,235,0.04), transparent 50%)`,
        }}
      />

      {/* ── BG LAYER ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: isDark
              ? 'linear-gradient(to right, rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.018) 1px, transparent 1px)'
              : 'linear-gradient(to right, rgba(0,0,0,0.022) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.022) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-[55vw] h-[55vw] max-w-[650px] max-h-[650px] rounded-full"
          style={{
            backgroundColor: isDark ? "rgba(200,255,0,0.05)" : "rgba(163,230,53,0.09)",
            filter: "blur(110px)",
            animation: "orbDrift1 14s ease-in-out infinite",
          }}
        />
        <div
          className="absolute top-[20%] right-[8%] w-[35vw] h-[35vw] max-w-[450px] max-h-[450px] rounded-full"
          style={{
            backgroundColor: isDark ? "rgba(0,242,254,0.025)" : "rgba(59,130,246,0.05)",
            filter: "blur(90px)",
            animation: "orbDrift2 18s ease-in-out infinite",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at center, transparent 0%, ${isDark ? '#050505' : '#FAF9F6'} 100%)`,
            opacity: 0.7,
          }}
        />
      </div>

      {/* ── MAIN CONTENT ── */}
      <motion.div
        ref={contentRef}
        style={{ y: heroY, opacity }}
        className="relative z-10 flex-1 flex flex-col"
      >
        {/* ── THREE-COLUMN LAYOUT ── */}
        <div className="flex-1 flex items-center">
          <div className="w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-14 grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 lg:gap-6 items-center pt-28 pb-12">

            {/* ── LEFT COLUMN — info tags ── */}
            <div className="hidden lg:flex flex-col justify-center gap-8 pl-4">
              {/* Section label */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-3"
              >
                <div className="w-6 h-[2px]" style={{ backgroundColor: isDark ? "#C8FF00" : "#2563EB" }} />
                <span
                  className="text-[9px] font-bold uppercase tracking-[0.3em]"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", color: isDark ? "#C8FF00" : "#2563EB" }}
                >
                  Selected Work
                </span>
              </motion.div>

              {/* Tags */}
              <div className="flex flex-col gap-6 border-l pl-5"
                style={{ borderColor: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)" }}
              >
                {leftTags.map((tag, i) => (
                  <SideTag key={tag.label} side="left" delay={0.15 + i * 0.1} isDark={isDark} isInView={isInView}>
                    {{ label: tag.label, value: tag.value }}
                  </SideTag>
                ))}
              </div>

              {/* Vertical label */}
              <motion.span
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-[8px] font-mono font-bold uppercase tracking-[0.4em] whitespace-nowrap mt-4"
                style={{
                  writingMode: "vertical-rl",
                  color: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
                }}
              >
                PORTFOLIO · 2024–2025
              </motion.span>
            </div>

            {/* ── CENTER COLUMN — main hero content ── */}
            <div className="flex flex-col items-center text-center gap-8">



              {/* Headline */}
              <div className="flex flex-col items-center gap-0">
                <div className="overflow-hidden">
                  <motion.h1
                    initial={{ y: "110%" }}
                    animate={isInView ? { y: "0%" } : { y: "110%" }}
                    transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
                    className="text-[clamp(2.8rem,7vw,6.5rem)] font-black uppercase tracking-tight leading-[0.88]"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", color: isDark ? "#ffffff" : "#171717" }}
                  >
                    BUILT
                  </motion.h1>
                </div>
                <div className="overflow-hidden">
                  <motion.h1
                    initial={{ y: "110%" }}
                    animate={isInView ? { y: "0%" } : { y: "110%" }}
                    transition={{ duration: 0.95, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className="text-[clamp(2.8rem,7vw,6.5rem)] font-black uppercase tracking-tight leading-[0.88]"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    <NeonText text="WITH" />
                  </motion.h1>
                </div>
                <div className="overflow-hidden">
                  <motion.h1
                    initial={{ y: "110%" }}
                    animate={isInView ? { y: "0%" } : { y: "110%" }}
                    transition={{ duration: 0.95, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
                    className="text-[clamp(2.8rem,7vw,6.5rem)] font-black uppercase tracking-tight leading-[0.88]"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", color: isDark ? "#C8FF00" : "#2563EB" }}
                  >
                    <GlitchText text="PURPOSE" isDark={isDark} />
                  </motion.h1>
                </div>
              </div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 0.7, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-xs text-sm leading-relaxed"
                style={{ fontFamily: "'Inter', sans-serif", color: isDark ? "#94a3b8" : "#525252" }}
              >
                Real problems, real solutions. Every project here was built end-to-end with intention.
              </motion.p>

              {/* Stats row — mobile only (desktop handled in right column) */}
              <div className="flex flex-wrap justify-center gap-2.5 lg:hidden">
                {[
                  { value: "8+",  label: "Projects" },
                  { value: "2×",  label: "IP Rights" },
                  { value: "2+",  label: "Years" },
                  { value: "10+", label: "Tech" },
                ].map((s, i) => (
                  <StatPill key={s.label} {...s} delay={0.5 + i * 0.07} isDark={isDark} isInView={isInView} />
                ))}
              </div>
            </div>

            {/* ── RIGHT COLUMN — stats + tags ── */}
            <div className="hidden lg:flex flex-col justify-center gap-8 pr-4 items-end">

              {/* Tags */}
              <div className="flex flex-col gap-6 border-r pr-5 items-end"
                style={{ borderColor: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)" }}
              >
                {rightTags.map((tag, i) => (
                  <SideTag key={tag.label} side="right" delay={0.3 + i * 0.1} isDark={isDark} isInView={isInView}>
                    {{ label: tag.label, value: tag.value }}
                  </SideTag>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── TICKER ── */}
        <TickerStrip isDark={isDark} />
      </motion.div>

      {/* ── SCROLL INDICATOR ── */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-14 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown size={14} style={{ color: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)" }} />
        </motion.div>
        <span
          className="text-[9px] font-mono uppercase tracking-[0.25em]"
          style={{ color: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)" }}
        >
          Scroll
        </span>
      </motion.div>

      {/* ── BOTTOM FADE ── */}
      <div
        className="absolute inset-x-0 bottom-0 h-20 pointer-events-none z-10"
        style={{ backgroundImage: `linear-gradient(to top, ${isDark ? '#050505' : '#FAF9F6'}, transparent)` }}
      />
    </section>
  );
};

export default ProjectsHero;