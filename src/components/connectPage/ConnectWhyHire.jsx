import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useTheme } from "../../context/ThemeContext";
import { Code2, Zap, Users, RefreshCw, PackageCheck, Lightbulb } from 'lucide-react';

// ── DATA ──
const reasons = [
  {
    id: 1,
    num: '01',
    icon: Code2,
    title: "I Ship, Not Just Code",
    body: "I don't just write code — I deliver working products. From architecture to deployment, I own the full cycle and make sure things actually land.",
    tag: "Ownership",
  },
  {
    id: 2,
    num: '02',
    icon: Zap,
    title: "Fast Learner, Zero Drama",
    body: "New stack? Unfamiliar domain? Give me a few days. I adapt quickly, ask the right questions, and never let pride get in the way of progress.",
    tag: "Adaptability",
  },
  {
    id: 3,
    num: '03',
    icon: Users,
    title: "I Speak Human Too",
    body: "I've mentored 60–90 students per class and worked cross-functionally with teams. Technical depth without communication skills is half the job.",
    tag: "Communication",
  },
  {
    id: 4,
    num: '04',
    icon: RefreshCw,
    title: "Clean Code is Non-Negotiable",
    body: "Readable, modular, maintainable — not just for me, but for whoever touches the codebase next. I write code like I'll be reading it 6 months later.",
    tag: "Code Quality",
  },
  {
    id: 5,
    num: '05',
    icon: PackageCheck,
    title: "Proven Track Record",
    body: "8+ shipped projects, 2 registered IP rights, and real-world production experience at ParagonCorp. Not portfolio projects — actual systems in use.",
    tag: "Experience",
  },
  {
    id: 6,
    num: '06',
    icon: Lightbulb,
    title: "I Think Before I Build",
    body: "Every feature starts with a question: does this actually solve the problem? I bring product thinking to engineering — not just execution.",
    tag: "Thinking",
  },
];

// ── REASON ROW ──
const ReasonRow = ({ reason, index, isDark, isInView }) => {
  const [hovered, setHovered] = useState(false);
  const Icon = reason.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
      animate={isInView
        ? { opacity: 1, y: 0, filter: "blur(0px)" }
        : { opacity: 0, y: 32, filter: "blur(8px)" }
      }
      transition={{ duration: 0.7, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col sm:flex-row sm:items-start gap-6 py-8 border-b cursor-default transition-all duration-400"
      style={{
        borderColor: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)",
        borderLeft: `2px solid ${hovered
          ? isDark ? "#C8FF00" : "#2563EB"
          : "transparent"
        }`,
        paddingLeft: hovered ? "20px" : "0px",
        backgroundColor: hovered
          ? isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.015)"
          : "transparent",
        transition: "all 0.4s ease",
      }}
    >
      {/* Left: num + icon */}
      <div className="flex items-center gap-4 sm:flex-col sm:items-start sm:gap-3 sm:w-16 flex-shrink-0">
        <span
          className="text-xs font-mono transition-colors duration-300"
          style={{
            color: hovered
              ? isDark ? "#C8FF00" : "#2563EB"
              : isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)",
          }}
        >
          {reason.num}
        </span>
        <div
          className="w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-300"
          style={{
            backgroundColor: hovered
              ? isDark ? "rgba(200,255,0,0.12)" : "rgba(37,99,235,0.1)"
              : isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
            color: hovered
              ? isDark ? "#C8FF00" : "#2563EB"
              : isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.3)",
          }}
        >
          <Icon size={16} strokeWidth={2} />
        </div>
      </div>

      {/* Middle: title + body */}
      <div className="flex flex-col gap-2 flex-1">
        <h3
          className="text-base md:text-lg font-black uppercase tracking-tight transition-colors duration-300"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            color: hovered
              ? isDark ? "#ffffff" : "#171717"
              : isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.55)",
          }}
        >
          {reason.title}
        </h3>

        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: hovered ? 1 : 0, height: hovered ? "auto" : 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="text-sm leading-relaxed overflow-hidden"
          style={{
            fontFamily: "'Inter', sans-serif",
            color: isDark ? "#94a3b8" : "#525252",
          }}
        >
          {reason.body}
        </motion.p>
      </div>

      {/* Right: tag + arrow */}
      <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-4 flex-shrink-0">
        <span
          className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] px-2 py-1 rounded-sm transition-all duration-300"
          style={{
            backgroundColor: hovered
              ? isDark ? "rgba(200,255,0,0.1)" : "rgba(37,99,235,0.08)"
              : isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
            color: hovered
              ? isDark ? "#C8FF00" : "#2563EB"
              : isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.25)",
          }}
        >
          {reason.tag}
        </span>

        <motion.span
          animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -6 }}
          transition={{ duration: 0.25 }}
          className="text-xs"
          style={{ color: isDark ? "#C8FF00" : "#2563EB" }}
        >
          ↗
        </motion.span>
      </div>
    </motion.div>
  );
};

// ── MAIN COMPONENT ──
const ConnectWhyHire = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const sectionRef = useRef(null);
  const headerRef  = useRef(null);
  const listRef    = useRef(null);

  const isHeaderInView = useInView(headerRef, { once: false, margin: "-100px" });
  const isListInView   = useInView(listRef,   { once: false, margin: "-60px"  });

  // Parallax bg
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgX = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);

  // Header scroll reveal
  const { scrollYProgress: hScroll } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center", "end start"],
  });
  const headerOpacity = useTransform(hScroll, [0, 0.18, 0.72, 1], [0, 1, 1, 0]);
  const headerY       = useTransform(hScroll, [0, 0.18, 0.72, 1], [50, 0, 0, -30]);
  const headerBlur    = useTransform(hScroll, [0, 0.18, 0.72, 1],
    ["blur(12px)", "blur(0px)", "blur(0px)", "blur(8px)"]
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
        className="absolute top-1/2 right-0 -translate-y-1/2 pointer-events-none select-none whitespace-nowrap z-0"
        aria-hidden
      >
        <span
          style={{
            fontSize: "clamp(5rem, 16vw, 18rem)",
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 900,
            letterSpacing: "-0.04em",
            color: isDark ? "rgba(255,255,255,0.025)" : "rgba(0,0,0,0.03)",
          }}
        >
          WHY ME
        </span>
      </motion.div>

      {/* ── TOP BORDER ── */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 inset-x-6 md:inset-x-12 lg:inset-x-24 h-px origin-left"
        style={{ backgroundColor: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)" }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* ── HEADER ── */}
        <motion.div
          ref={headerRef}
          style={{ opacity: headerOpacity, y: headerY, filter: headerBlur }}
          className="flex flex-col items-start mb-16 md:mb-24 gap-6"
        >
          {/* Label */}
          <div className="flex items-center gap-4">
            <div className="w-8 h-[2px]" style={{ backgroundColor: isDark ? "#C8FF00" : "#2563EB" }} />
            <span
              className="text-[10px] font-bold uppercase tracking-[0.3em]"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: isDark ? "#C8FF00" : "#2563EB" }}
            >
              The Case For Me
            </span>
          </div>

          {/* Headline */}
          <div className="flex flex-col gap-0">
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "110%" }}
                animate={isHeaderInView ? { y: "0%" } : { y: "110%" }}
                transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
                className="text-[clamp(2.8rem,8vw,7rem)] font-black uppercase tracking-tight leading-[0.88]"
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: isDark ? "#ffffff" : "#171717" }}
              >
                WHY YOU
              </motion.h2>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "110%" }}
                animate={isHeaderInView ? { y: "0%" } : { y: "110%" }}
                transition={{ duration: 0.95, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="text-[clamp(2.8rem,8vw,7rem)] font-black uppercase tracking-tight leading-[0.88]"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  WebkitTextStroke: isDark ? "1.5px rgba(255,255,255,0.18)" : "1.5px rgba(0,0,0,0.18)",
                  color: "transparent",
                }}
              >
                SHOULD HIRE
              </motion.h2>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "110%" }}
                animate={isHeaderInView ? { y: "0%" } : { y: "110%" }}
                transition={{ duration: 0.95, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
                className="text-[clamp(2.8rem,8vw,7rem)] font-black uppercase tracking-tight leading-[0.88]"
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: isDark ? "#C8FF00" : "#2563EB" }}
              >
                ME.
              </motion.h2>
            </div>
          </div>

          {/* Sub description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-md text-sm md:text-base leading-relaxed"
            style={{ fontFamily: "'Inter', sans-serif", color: isDark ? "#94a3b8" : "#525252" }}
          >
            Not because I'm perfect — but because I bring more than just syntax. Here's what you're actually getting.
          </motion.p>
        </motion.div>

        {/* ── REASON LIST ── */}
        <div
          ref={listRef}
          className="flex flex-col border-t"
          style={{ borderColor: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)" }}
        >
          {reasons.map((reason, i) => (
            <ReasonRow
              key={reason.id}
              reason={reason}
              index={i}
              isDark={isDark}
              isInView={isListInView}
            />
          ))}
        </div>

        {/* ── CLOSING LINE ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.6 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 md:mt-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <p
            className="text-xs md:text-sm leading-relaxed max-w-sm"
            style={{ fontFamily: "'Inter', sans-serif", color: isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)" }}
          >
            Still not convinced? That's fair. Let's just talk — no commitment, no pressure.
          </p>

          <a
            href="mailto:lutfiapriamto12@gmail.com"
            className="group flex items-center gap-2.5 text-xs font-mono font-bold uppercase tracking-[0.2em] transition-colors duration-300"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              color: isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = isDark ? "#C8FF00" : "#2563EB";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)";
            }}
          >
            Drop me an email
            <span className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ConnectWhyHire;