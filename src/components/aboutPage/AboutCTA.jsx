import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useTheme } from "../../context/ThemeContext";

const AboutCTA = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const isInView = useInView(contentRef, { once: false, margin: "-120px" });
  const [hovered, setHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgX    = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  const bgOpac = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const { scrollYProgress: hScroll } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center", "end start"],
  });
  const sectionOpacity = useTransform(hScroll, [0, 0.2, 0.75, 1], [0, 1, 1, 0]);
  const sectionY       = useTransform(hScroll, [0, 0.2, 0.75, 1], [60, 0, 0, -40]);
  const sectionBlur    = useTransform(hScroll, [0, 0.2, 0.75, 1],
    ["blur(12px)", "blur(0px)", "blur(0px)", "blur(8px)"]
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-40 md:py-56 px-6 md:px-12 lg:px-24 overflow-hidden transition-colors duration-500"
      style={{
        backgroundColor: isDark ? "#050505" : "#FAF9F6",
        color: isDark ? "#f0f0f0" : "#171717",
      }}
    >
      {/* TOP BORDER */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 inset-x-6 md:inset-x-12 lg:inset-x-24 h-px origin-left"
        style={{ backgroundColor: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)" }}
      />

      {/* BACKGROUND GIANT TEXT */}
      <motion.div
        style={{ x: bgX, opacity: bgOpac }}
        className="absolute top-1/2 left-0 -translate-y-1/2 pointer-events-none select-none whitespace-nowrap z-0"
        aria-hidden
      >
        <span
          style={{
            fontSize: "clamp(5rem, 20vw, 24rem)",
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 900,
            letterSpacing: "-0.04em",
            color: isDark ? "rgba(255,255,255,0.025)" : "rgba(0,0,0,0.03)",
          }}
        >
          CONNECT
        </span>
      </motion.div>

      {/* MAIN CONTENT */}
      <motion.div
        ref={contentRef}
        style={{ opacity: sectionOpacity, y: sectionY, filter: sectionBlur }}
        className="relative z-10 max-w-5xl mx-auto flex flex-col gap-16 md:gap-20"
      >
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-4"
        >
          <div className="w-8 h-[2px]" style={{ backgroundColor: isDark ? "#C8FF00" : "#2563EB" }} />
          <span
            className="text-[10px] font-bold uppercase tracking-[0.3em]"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: isDark ? "#C8FF00" : "#2563EB" }}
          >
            Now You Know
          </span>
        </motion.div>

        {/* BIG HEADLINE */}
        <div className="flex flex-col gap-0">
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "110%" }}
              animate={isInView ? { y: "0%" } : { y: "110%" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(3.5rem,10vw,9rem)] font-black uppercase tracking-tight leading-[0.88]"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: isDark ? "#ffffff" : "#171717" }}
            >
              I KNOW WHAT
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "110%" }}
              animate={isInView ? { y: "0%" } : { y: "110%" }}
              transition={{ duration: 1, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(3.5rem,10vw,9rem)] font-black uppercase tracking-tight leading-[0.88]"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                WebkitTextStroke: isDark ? "1.5px rgba(255,255,255,0.18)" : "1.5px rgba(0,0,0,0.18)",
                color: "transparent",
              }}
            >
              I CAN DO.
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "110%" }}
              animate={isInView ? { y: "0%" } : { y: "110%" }}
              transition={{ duration: 1, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(3.5rem,10vw,9rem)] font-black uppercase tracking-tight leading-[0.88]"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: isDark ? "#C8FF00" : "#2563EB" }}
            >
              DO YOU?
            </motion.h2>
          </div>
        </div>

        {/* BOTTOM ROW */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10 md:gap-16">

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xs text-sm leading-relaxed"
            style={{ fontFamily: "'Inter', sans-serif", color: isDark ? "#94a3b8" : "#525252" }}
          >
            If you've made it this far — you already know enough. The next move is yours.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="flex-shrink-0"
          >
            <button
              onClick={() => navigate('/connect')}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              className="group relative flex items-center gap-3 px-8 py-5 md:px-10 md:py-6 font-mono text-xs md:text-sm font-bold uppercase tracking-[0.2em] overflow-hidden rounded-sm transition-all duration-500"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                backgroundColor: isDark ? "#ffffff" : "#171717",
                color: isDark ? "#050505" : "#ffffff",
                boxShadow: hovered
                  ? isDark ? "0 0 40px rgba(200,255,0,0.25)" : "0 0 40px rgba(37,99,235,0.2)"
                  : "none",
              }}
            >
              {/* Sliding fill */}
              <motion.span
                animate={{ x: hovered ? "0%" : "-101%" }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 z-0"
                style={{ backgroundColor: isDark ? "#C8FF00" : "#2563EB" }}
              />
              <span className="relative z-10">Let's Connect</span>
              <ArrowUpRight
                size={16}
                className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutCTA;