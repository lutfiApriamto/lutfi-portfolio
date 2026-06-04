import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useTheme } from "../../context/ThemeContext";

// ── DATA ──
const stats = [
  {
    id: 1,
    number: 2,
    suffix: "+",
    label: "Years Building",
    sublabel: "Since 2024",
    description: "Started with curiosity, stayed for the craft.",
  },
  {
    id: 2,
    number: 10,
    suffix: "+",
    label: "Projects Shipped",
    sublabel: "End-to-end",
    description: "From idea to deployment, fully owned.",
  },
  {
    id: 3,
    number: 10,
    suffix: "+",
    label: "Tech Mastered",
    sublabel: "& Still Growing",
    description: "MERN, Next.js, Go, PHP, and beyond.",
  },
  {
    id: 4,
    number: 2,
    suffix: "×",
    label: "IP Rights Acquired",
    sublabel: "DIKTI SAINTEK",
    description: "Recognized work with official IP registration.",
  },
  {
    id: 5,
    number: 3,
    suffix: "",
    label: "Classes Instructed",
    sublabel: "60–90 Students Each",
    description: "Mentored Java, Go, and PHP at LEPKOM.",
  },
  {
    id: 6,
    number: 371,
    suffix: "",
    prefix: "",
    label: "GPA Score",
    sublabel: "out of 4.00",
    description: "Graduated from Gunadarma with distinction.",
    isGPA: true,
  },
];

// ── ANIMATED COUNTER ──
const useCounter = (target, isInView, duration = 1800, isGPA = false) => {
  const [count, setCount] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!isInView) {
      setCount(0);
      hasRun.current = false;
      return;
    }
    if (hasRun.current) return;
    hasRun.current = true;

    let startTime = null;
    const start = 0;
    const end = isGPA ? 371 : target;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Easing: ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(start + (end - start) * eased));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(end);
    };
    requestAnimationFrame(step);
  }, [isInView, target, duration, isGPA]);

  return count;
};

// ── STAT ITEM ──
const StatItem = ({ stat, index, isDark, isGridInView }) => {
  const [hovered, setHovered] = useState(false);
  const itemRef = useRef(null);
  const isInView = useInView(itemRef, { once: false, margin: "-60px" });
  const count = useCounter(stat.number, isInView, 1600 + index * 100, stat.isGPA);

  // Format display value
  const displayValue = stat.isGPA
    ? (count / 100).toFixed(2)
    : count;

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col gap-3 py-8 px-6 md:px-8 border-b cursor-default transition-all duration-400 group"
      style={{
        borderColor: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)",
        borderLeft: `2px solid ${hovered
          ? isDark ? "#C8FF00" : "#2563EB"
          : "transparent"
        }`,
        backgroundColor: hovered
          ? isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.015)"
          : "transparent",
      }}
    >
      {/* Subtle background glow on hover */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDark
            ? "radial-gradient(ellipse at 0% 50%, rgba(200,255,0,0.04), transparent 60%)"
            : "radial-gradient(ellipse at 0% 50%, rgba(37,99,235,0.04), transparent 60%)",
        }}
      />

      {/* Top row: sublabel + arrow */}
      <div className="flex items-center justify-between">
        <span
          className="text-[10px] font-mono uppercase tracking-[0.2em] transition-colors duration-300"
          style={{
            color: hovered
              ? isDark ? "#C8FF00" : "#2563EB"
              : isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.25)",
          }}
        >
          {stat.sublabel}
        </span>

        <motion.span
          animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -6 }}
          transition={{ duration: 0.3 }}
          style={{ color: isDark ? "#C8FF00" : "#2563EB", fontSize: "12px" }}
        >
          ↗
        </motion.span>
      </div>

      {/* Big number */}
      <div className="flex items-baseline gap-1">
        {stat.prefix && (
          <span
            className="text-3xl md:text-4xl font-black"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              color: isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.3)",
            }}
          >
            {stat.prefix}
          </span>
        )}
        <span
          className="text-5xl md:text-6xl lg:text-7xl font-black tabular-nums leading-none transition-colors duration-300"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            color: hovered
              ? isDark ? "#ffffff" : "#171717"
              : isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.65)",
          }}
        >
          {displayValue}
        </span>
        {stat.suffix && (
          <span
            className="text-2xl md:text-3xl font-black mb-1 transition-colors duration-300"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              color: hovered
                ? isDark ? "#C8FF00" : "#2563EB"
                : isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.25)",
            }}
          >
            {stat.suffix}
          </span>
        )}
      </div>

      {/* Label */}
      <h3
        className="text-sm md:text-base font-bold uppercase tracking-wider transition-colors duration-300"
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          color: hovered
            ? isDark ? "#ffffff" : "#171717"
            : isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)",
        }}
      >
        {stat.label}
      </h3>

      {/* Description — expand on hover */}
      <motion.p
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: hovered ? 1 : 0,
          height: hovered ? "auto" : 0,
        }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="text-xs leading-relaxed overflow-hidden"
        style={{
          fontFamily: "'Inter', sans-serif",
          color: isDark ? "#94a3b8" : "#525252",
        }}
      >
        {stat.description}
      </motion.p>
    </motion.div>
  );
};

// ── MAIN COMPONENT ──
const AboutStats = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const sectionRef = useRef(null);
  const headerRef  = useRef(null);
  const gridRef    = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: false, margin: "-100px" });
  const isGridInView   = useInView(gridRef,   { once: false, margin: "-80px"  });

  // Parallax bg text
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgX = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  // Header scroll reveal
  const { scrollYProgress: hScroll } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center", "end start"],
  });
  const headerOpacity = useTransform(hScroll, [0, 0.2, 0.7, 1], [0, 1, 1, 0]);
  const headerY       = useTransform(hScroll, [0, 0.2, 0.7, 1], [50, 0, 0, -30]);
  const headerBlur    = useTransform(hScroll, [0, 0.2, 0.7, 1],
    ["blur(10px)", "blur(0px)", "blur(0px)", "blur(6px)"]
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-28 md:py-40 px-6 md:px-12 lg:px-24 overflow-hidden transition-colors duration-500"
      style={{
        backgroundColor: isDark ? "#050505" : "#FAF9F6",
        color: isDark ? "#f0f0f0" : "#171717",
      }}
    >
      {/* ── BACKGROUND PARALLAX TEXT ── */}
      <motion.div
        style={{ x: bgX }}
        className="absolute top-1/2 right-0 -translate-y-1/2 pointer-events-none select-none whitespace-nowrap font-black uppercase tracking-tighter z-0"
        aria-hidden
      >
        <span
          style={{
            fontSize: "clamp(6rem, 18vw, 20rem)",
            color: isDark ? "rgba(255,255,255,0.025)" : "rgba(0,0,0,0.03)",
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          NUMBERS
        </span>
      </motion.div>

      {/* ── HEADER ── */}
      <motion.div
        ref={headerRef}
        style={{ opacity: headerOpacity, y: headerY, filter: headerBlur }}
        className="relative z-10 flex flex-col items-center text-center mb-16 md:mb-24"
      >
        {/* Label */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px w-8" style={{ backgroundColor: isDark ? "#C8FF00" : "#2563EB" }} />
          <span
            className="text-[10px] font-bold uppercase tracking-[0.3em]"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: isDark ? "#C8FF00" : "#2563EB" }}
          >
            By the Numbers
          </span>
          <div className="h-px w-8" style={{ backgroundColor: isDark ? "#C8FF00" : "#2563EB" }} />
        </div>

        {/* Headline */}
        <div className="overflow-hidden mb-1">
          <motion.h2
            initial={{ y: "110%" }}
            animate={isHeaderInView ? { y: "0%" } : { y: "110%" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(2.5rem,8vw,6rem)] font-black uppercase tracking-tight leading-[0.88]"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: isDark ? "#ffffff" : "#171717" }}
          >
            THINGS THAT
          </motion.h2>
        </div>
        <div className="overflow-hidden mb-8">
          <motion.h2
            initial={{ y: "110%" }}
            animate={isHeaderInView ? { y: "0%" } : { y: "110%" }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(2.5rem,8vw,6rem)] font-black uppercase tracking-tight leading-[0.88]"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              WebkitTextStroke: isDark ? "1.5px rgba(255,255,255,0.15)" : "1.5px rgba(0,0,0,0.15)",
              color: "transparent",
            }}
          >
            DEFINE ME
          </motion.h2>
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-lg text-sm md:text-base leading-relaxed"
          style={{ fontFamily: "'Inter', sans-serif", color: isDark ? "#94a3b8" : "#525252" }}
        >
          Numbers don't tell the whole story — but they're a honest starting point.
        </motion.p>
      </motion.div>

      {/* ── STATS GRID ── */}
      <div
        ref={gridRef}
        className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 max-w-5xl mx-auto border-t"
        style={{ borderColor: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)" }}
      >
        {stats.map((stat, i) => (
          <StatItem
            key={stat.id}
            stat={stat}
            index={i}
            isDark={isDark}
            isGridInView={isGridInView}
          />
        ))}
      </div>

      {/* ── BOTTOM DIVIDER ── */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-5xl mx-auto h-px mt-0 origin-left"
        style={{ backgroundColor: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)" }}
      />
    </section>
  );
};

export default AboutStats;