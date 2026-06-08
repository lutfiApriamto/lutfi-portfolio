import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useTheme } from "../../context/ThemeContext";
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import {NeonText} from '../reusable/NeonText';

const ProjectsCTA = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const isInView = useInView(contentRef, { once: false, margin: "-80px" });

  // Parallax bg text
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgX = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  // Scroll-driven header reveal
  const { scrollYProgress: hScroll } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center", "end start"],
  });
  const headerOpacity = useTransform(hScroll, [0, 0.2, 0.75, 1], [0, 1, 1, 0]);
  const headerY       = useTransform(hScroll, [0, 0.2, 0.75, 1], [50, 0, 0, -30]);
  const headerBlur    = useTransform(hScroll, [0, 0.2, 0.75, 1],
    ["blur(12px)", "blur(0px)", "blur(0px)", "blur(8px)"]
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-32 md:py-48 px-6 md:px-12 lg:px-24 overflow-hidden transition-colors duration-500"
      style={{
        backgroundColor: isDark ? "#050505" : "#FAF9F6",
        color: isDark ? "#f0f0f0" : "#171717",
      }}
    >
      {/* TOP BORDER */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 inset-x-6 md:inset-x-12 lg:inset-x-24 h-px origin-left"
        style={{ backgroundColor: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)" }}
      />

      {/* BG PARALLAX TEXT */}
      <motion.div
        style={{ x: bgX }}
        className="absolute top-1/2 left-0 -translate-y-1/2 pointer-events-none select-none whitespace-nowrap z-0"
        aria-hidden
      >
        <span
          style={{
            fontSize: "clamp(6rem, 20vw, 22rem)",
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 900,
            letterSpacing: "-0.04em",
            color: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.025)",
          }}
        >
          LET'S BUILD
        </span>
      </motion.div>

      {/* CONTENT */}
      <motion.div
        ref={contentRef}
        style={{ opacity: headerOpacity, y: headerY, filter: headerBlur }}
        className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center gap-10"
      >
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-4"
        >
          <div className="w-8 h-[2px]" style={{ backgroundColor: isDark ? "#C8FF00" : "#2563EB" }} />
          <span
            className="text-[10px] font-bold uppercase tracking-[0.3em]"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: isDark ? "#C8FF00" : "#2563EB" }}
          >
            What's Next
          </span>
          <div className="w-8 h-[2px]" style={{ backgroundColor: isDark ? "#C8FF00" : "#2563EB" }} />
        </motion.div>

        {/* Headline */}
        <div className="flex flex-col items-center gap-0">
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "110%" }}
              animate={isInView ? { y: "0%" } : { y: "110%" }}
              transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(3rem,10vw,9rem)] font-black uppercase tracking-tight leading-[0.85]"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: isDark ? "#ffffff" : "#171717" }}
            >
              GOT A
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "110%" }}
              animate={isInView ? { y: "0%" } : { y: "110%" }}
              transition={{ duration: 0.95, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(3rem,10vw,9rem)] font-black uppercase tracking-tight leading-[0.85]"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                WebkitTextStroke: isDark ? "2px rgba(255,255,255,0.18)" : "2px rgba(0,0,0,0.18)",
                color: "transparent",
              }}
            >
              <NeonText text="PROJECT." isDark={isDark} />
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "110%" }}
              animate={isInView ? { y: "0%" } : { y: "110%" }}
              transition={{ duration: 0.95, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(3rem,10vw,9rem)] font-black uppercase tracking-tight leading-[0.85]"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: isDark ? "#C8FF00" : "#2563EB" }}
            >
              IDEA?
            </motion.h2>
          </div>
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-lg text-base md:text-lg leading-relaxed"
          style={{ fontFamily: "'Inter', sans-serif", color: isDark ? "#94a3b8" : "#525252" }}
        >
          Whether it's a product, a platform, or just an idea on a napkin, let's turn it into something real. I'm available for freelance and full-time opportunities.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          {/* Primary — ke halaman Connect */}
          <button
            onClick={() => navigate('/connect')}
            className="group flex items-center gap-2.5 px-8 py-4 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 rounded-sm"
            style={{
              backgroundColor: isDark ? "#C8FF00" : "#2563EB",
              color: isDark ? "#050505" : "#ffffff",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = isDark ? "#d4ff33" : "#1d4ed8";
              e.currentTarget.style.boxShadow = isDark
                ? "0 8px 32px rgba(200,255,0,0.3)"
                : "0 8px 32px rgba(37,99,235,0.3)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = isDark ? "#C8FF00" : "#2563EB";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Let's Work Together
            <ArrowUpRight
              size={15}
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </button>

          {/* Secondary — email langsung */}
          <a
            href="mailto:lutfiapriamto12@gmail.com"
            className="group flex items-center gap-2.5 px-8 py-4 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 border rounded-sm"
            style={{
              borderColor: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)",
              color: isDark ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,0.6)",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = isDark ? "#C8FF00" : "#2563EB";
              e.currentTarget.style.color = isDark ? "#C8FF00" : "#2563EB";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)";
              e.currentTarget.style.color = isDark ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,0.6)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Drop an Email
            <ArrowUpRight
              size={15}
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </motion.div>

        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="flex items-center gap-2.5 px-4 py-2 rounded-full border"
          style={{
            backgroundColor: isDark ? "rgba(34,197,94,0.06)" : "rgba(34,197,94,0.06)",
            borderColor: "rgba(34,197,94,0.2)",
          }}
        >
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "#22c55e" }} />
          <span
            className="text-[10px] font-mono font-bold uppercase tracking-[0.2em]"
            style={{ color: "#22c55e" }}
          >
            Available for new opportunities
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ProjectsCTA;