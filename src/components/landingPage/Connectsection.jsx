import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useTheme } from "../../context/ThemeContext";

const ConnectSection = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax background text
  const bgTextX = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  // Header scroll-driven reveal
  const { scrollYProgress: headerProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center", "end start"],
  });
  const headerOpacity = useTransform(headerProgress, [0, 0.25, 0.7, 1], [0, 1, 1, 0]);
  const headerY       = useTransform(headerProgress, [0, 0.25, 0.7, 1], [60, 0, 0, -40]);
  const headerBlur    = useTransform(headerProgress, [0, 0.25, 0.7, 1], ["blur(12px)", "blur(0px)", "blur(0px)", "blur(8px)"]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-32 md:py-48 overflow-hidden transition-colors duration-500"
      style={{
        backgroundColor: isDark ? "#050505" : "#FAF9F6",
        color: isDark ? "#f0f0f0" : "#171717",
      }}
    >
      {/* ── INJECTED KEYFRAMES ── */}
      <style>{`
        @keyframes connect-line-grow {
          0%, 100% { transform: scaleX(1); opacity: 0.4; }
          50% { transform: scaleX(1.08); opacity: 0.8; }
        }
        @keyframes connect-dot-pulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.4); opacity: 1; }
        }
      `}</style>

      {/* ── BACKGROUND PARALLAX TEXT ── */}
      <motion.div
        className="absolute top-1/2 left-0 -translate-y-1/2 pointer-events-none select-none whitespace-nowrap font-black uppercase tracking-tighter z-0"
        style={{
          x: bgTextX,
          fontSize: "clamp(6rem, 20vw, 22rem)",
          color: isDark ? "rgba(255,255,255,0.025)" : "rgba(0,0,0,0.03)",
          fontFamily: "'Space Grotesk', sans-serif",
        }}
      >
        LET'S TALK
      </motion.div>

      {/* ── TOP SEPARATOR LINE ── */}
      <div className="absolute top-0 inset-x-0 flex items-center px-6 md:px-12 lg:px-24">
        <div
          className="w-full h-px transition-colors duration-500"
          style={{ backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" }}
        />
      </div>

      {/* ── MAIN CONTENT ── */}
      <motion.div
        style={{ opacity: headerOpacity, y: headerY, filter: headerBlur }}
        className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 lg:px-24 flex flex-col items-center text-center"
      >
        {/* Section label */}
        <div className="flex items-center gap-4 mb-10 md:mb-14">
          <div
            className="h-px w-8 transition-colors duration-500"
            style={{ backgroundColor: isDark ? "#C8FF00" : "#2563EB" }}
          />
          <span
            className="text-[10px] font-bold uppercase tracking-[0.3em] transition-colors duration-500"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              color: isDark ? "#C8FF00" : "#2563EB",
            }}
          >
            Get In Touch
          </span>
          <div
            className="h-px w-8 transition-colors duration-500"
            style={{ backgroundColor: isDark ? "#C8FF00" : "#2563EB" }}
          />
        </div>

        {/* Headline */}

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl text-base md:text-lg leading-relaxed mb-12 md:mb-16"
          style={{
            fontFamily: "'Inter', sans-serif",
            color: isDark ? "#94a3b8" : "#525252",
          }}
        >
          Whether you have a project in mind, want to collaborate, or just want to say hello, I'm always open to new opportunities and conversations.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
        >
          {/* Primary CTA */}
          <button
            onClick={() => navigate('/connect')}
            className="group relative flex items-center gap-3 px-8 py-4 md:px-10 md:py-5 font-mono text-xs md:text-sm font-bold uppercase tracking-[0.2em] overflow-hidden transition-all duration-500 rounded-sm"
            style={{
              backgroundColor: isDark ? "#ffffff" : "#171717",
              color: isDark ? "#050505" : "#ffffff",
              fontFamily: "'Space Grotesk', sans-serif",
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
            <ArrowUpRight
              size={16}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
            />
          </button>

          {/* Secondary CTA */}
          <button
            onClick={() => navigate('/about')}
            className="group relative flex items-center gap-3 px-8 py-4 md:px-10 md:py-5 font-mono text-xs md:text-sm font-bold uppercase tracking-[0.2em] overflow-hidden transition-all duration-500 border rounded-sm"
            style={{
              borderColor: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)",
              color: isDark ? "#ffffff" : "#171717",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = isDark ? "#C8FF00" : "#2563EB";
              e.currentTarget.style.color = isDark ? "#C8FF00" : "#2563EB";
              e.currentTarget.style.backgroundColor = isDark ? "rgba(200,255,0,0.05)" : "rgba(37,99,235,0.04)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)";
              e.currentTarget.style.color = isDark ? "#ffffff" : "#171717";
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            Say Hello
          </button>
        </motion.div>

        {/* ── DIVIDER ── */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-2xl h-px my-16 md:my-20 origin-center transition-colors duration-500"
          style={{ backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" }}
        />

        {/* ── SOCIAL LINKS ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-12"
        >
          {[
            { label: "LinkedIn", url: "https://www.linkedin.com/in/lutfi-apriamto-3a9383312/", accent: "#0A66C2" },
            { label: "GitHub",   url: "https://github.com/lutfiApriamto",                        accent: isDark ? "#ffffff" : "#171717" },
            { label: "Instagram",url: "https://www.instagram.com/lutfiamto/",                    accent: "#E1306C" },
            { label: "Email",    url: "mailto:lutfiapriamto12@gmail.com",                         accent: isDark ? "#C8FF00" : "#2563EB" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.url}
              target={link.label !== "Email" ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="group relative flex flex-col items-center gap-2 transition-all duration-300"
            >
              {/* Dot indicator */}
              <span
                className="w-1 h-1 rounded-full transition-all duration-300 group-hover:scale-150"
                style={{
                  backgroundColor: isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.2)",
                  animation: "connect-dot-pulse 3s ease-in-out infinite",
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
              <span
                className="text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-300"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = link.accent; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)"; }}
              >
                {link.label}
              </span>
              {/* Underline */}
              <span
                className="absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
                style={{ backgroundColor: link.accent }}
              />
            </a>
          ))}
        </motion.div>

        {/* ── AVAILABILITY STATUS ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-14 md:mt-16 flex items-center gap-3 px-5 py-2.5 rounded-full border transition-all duration-500"
          style={{
            borderColor: isDark ? "rgba(200,255,0,0.25)" : "rgba(37,99,235,0.2)",
            backgroundColor: isDark ? "rgba(200,255,0,0.05)" : "rgba(37,99,235,0.04)",
          }}
        >
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: isDark ? "#C8FF00" : "#2563EB" }}
          />
          <span
            className="text-[10px] font-bold uppercase tracking-[0.2em] transition-colors duration-500"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              color: isDark ? "#C8FF00" : "#2563EB",
            }}
          >
            Available for new opportunities
          </span>
        </motion.div>
      </motion.div>

      {/* ── BOTTOM SEPARATOR LINE ── */}
      <div className="absolute bottom-0 inset-x-0 flex items-center px-6 md:px-12 lg:px-24">
        <div
          className="w-full h-px transition-colors duration-500"
          style={{ backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" }}
        />
      </div>
    </section>
  );
};

export default ConnectSection;