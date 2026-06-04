import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView, useAnimation, AnimatePresence } from 'framer-motion';
import { useTheme } from "../../context/ThemeContext";

// ── DATA ──
const traits = [
  {
    id: 1,
    keyword: "Adaptive",
    emoji: "⚡",
    description: "Quickly adjusting to new tech stacks, team dynamics, and project requirements without losing momentum.",
    level: 92,
  },
  {
    id: 2,
    keyword: "Collaborative",
    emoji: "🤝",
    description: "Thriving in team environments — from pair programming to cross-functional syncs with designers and PMs.",
    level: 88,
  },
  {
    id: 3,
    keyword: "Critical Thinker",
    emoji: "🧠",
    description: "Breaking down complex problems into manageable parts and finding elegant, scalable solutions.",
    level: 90,
  },
  {
    id: 4,
    keyword: "Problem Solver",
    emoji: "🔧",
    description: "Turning ambiguous bugs and undefined requirements into clear, actionable development tasks.",
    level: 94,
  },
  {
    id: 5,
    keyword: "Committed",
    emoji: "🎯",
    description: "Seeing every project through — delivering on time, maintaining quality, and owning outcomes.",
    level: 96,
  },
  {
    id: 6,
    keyword: "Communicator",
    emoji: "💬",
    description: "Translating technical complexity into clear language for both developers and non-technical stakeholders.",
    level: 85,
  },
];

// ── FLOATING KEYWORD TAG ──
const FloatingTag = ({ keyword, emoji, index, isDark, isInView }) => {
  const positions = [
    { top: '8%',  left: '5%'  },
    { top: '5%',  right: '8%' },
    { top: '35%', left: '2%'  },
    { top: '30%', right: '3%' },
    { top: '65%', left: '6%'  },
    { top: '68%', right: '5%' },
  ];
  const pos = positions[index] || { top: `${index * 15}%`, left: '5%' };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, y: 20 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.7, y: 20 }}
      transition={{ duration: 0.6, delay: 0.1 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="absolute hidden lg:flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-sm cursor-default select-none"
      style={{
        ...pos,
        backgroundColor: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
        borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)",
        animation: `floatTag ${3.5 + index * 0.4}s ease-in-out infinite`,
        animationDelay: `${index * 0.5}s`,
      }}
    >
      <span className="text-sm">{emoji}</span>
      <span
        className="text-[10px] font-bold uppercase tracking-[0.15em]"
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.4)",
        }}
      >
        {keyword}
      </span>
    </motion.div>
  );
};

// ── TRAIT CARD ──
// ── TRAIT CARD — NEW DESIGN ──
const TraitCard = ({ trait, index, isDark }) => {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: false, margin: "-80px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
      animate={isInView
        ? { opacity: 1, y: 0, filter: "blur(0px)" }
        : { opacity: 0, y: 40, filter: "blur(8px)" }
      }
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col justify-between p-6 md:p-8 border-b cursor-default overflow-hidden transition-all duration-500 group"
      style={{
        borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
        // Tambah border kiri saat hover
        borderLeft: `2px solid ${hovered
          ? isDark ? "#C8FF00" : "#2563EB"
          : "transparent"
        }`,
        paddingLeft: "2rem",
        backgroundColor: hovered
          ? isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.015)"
          : "transparent",
        transition: "all 0.4s ease",
      }}
    >
      {/* Nomor index kecil + keyword */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-baseline gap-4">
          {/* Nomor */}
          <span
            className="text-xs font-mono transition-colors duration-300"
            style={{
              color: hovered
                ? isDark ? "#C8FF00" : "#2563EB"
                : isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)",
            }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>

          {/* Keyword */}
          <h3
            className="text-xl md:text-2xl font-black uppercase tracking-tight leading-none transition-colors duration-300"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              color: hovered
                ? isDark ? "#ffffff" : "#171717"
                : isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.45)",
            }}
          >
            {trait.keyword}
          </h3>
        </div>

        {/* Arrow icon — muncul saat hover */}
        <motion.span
          animate={{
            opacity: hovered ? 1 : 0,
            x: hovered ? 0 : -8,
          }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-xs mt-1 flex-shrink-0"
          style={{ color: isDark ? "#C8FF00" : "#2563EB" }}
        >
          ↗
        </motion.span>
      </div>

      {/* Description — muncul smooth saat hover */}
      <motion.p
        animate={{
          opacity: hovered ? 1 : 0,
          height: hovered ? "auto" : 0,
          marginTop: hovered ? 0 : 0,
        }}
        initial={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="text-xs md:text-sm leading-relaxed overflow-hidden"
        style={{
          fontFamily: "'Inter', sans-serif",
          color: isDark ? "#94a3b8" : "#525252",
        }}
      >
        {trait.description}
      </motion.p>
    </motion.div>
  );
};

// ── MAIN COMPONENT ──
const AboutSoftSkills = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const sectionRef = useRef(null);
  const headerRef  = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: false, margin: "-100px" });

  // Parallax bg text
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgX = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  // Header scroll reveal
  const { scrollYProgress: hScroll } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center", "end start"],
  });
  const headerOpacity = useTransform(hScroll, [0, 0.2, 0.7, 1], [0, 1, 1, 0]);
  const headerY       = useTransform(hScroll, [0, 0.2, 0.7, 1], [50, 0, 0, -30]);
  const headerBlur    = useTransform(hScroll, [0, 0.2, 0.7, 1], ["blur(10px)", "blur(0px)", "blur(0px)", "blur(6px)"]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-28 md:py-40 px-6 md:px-12 lg:px-24 overflow-hidden transition-colors duration-500"
      style={{
        backgroundColor: isDark ? "#050505" : "#FAF9F6",
        color: isDark ? "#f0f0f0" : "#171717",
      }}
    >
      {/* ── KEYFRAMES ── */}
      <style>{`
        @keyframes floatTag {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
      `}</style>

      {/* ── BACKGROUND PARALLAX TEXT ── */}
      <motion.div
        style={{ x: bgX }}
        className="absolute top-1/2 left-0 -translate-y-1/2 pointer-events-none select-none whitespace-nowrap font-black uppercase tracking-tighter z-0"
        aria-hidden
      >
        <span
          style={{
            fontSize: "clamp(6rem, 18vw, 20rem)",
            color: isDark ? "rgba(255,255,255,0.025)" : "rgba(0,0,0,0.03)",
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          SOFT SKILLS
        </span>
      </motion.div>

      {/* ── FLOATING TAGS (desktop only) ── */}
      {traits.map((t, i) => (
        <FloatingTag
          key={t.id}
          keyword={t.keyword}
          emoji={t.emoji}
          index={i}
          isDark={isDark}
          isInView={isHeaderInView}
        />
      ))}

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
            Beyond the Code
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
            THE HUMAN
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
            SIDE OF ME
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
          Great software isn't just about code — it's about the person behind it. These are the traits that shape how I work, collaborate, and grow.
        </motion.p>
      </motion.div>

      {/* ── TRAIT CARDS GRID ── */}
      <div 
          className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-0 max-w-4xl mx-auto border-t"
          style={{ borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)" }}
        >
        {traits.map((trait, i) => (
          <TraitCard key={trait.id} trait={trait} index={i} isDark={isDark} />
        ))}
      </div>

      {/* ── BOTTOM QUOTE ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.6 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col items-center text-center mt-20 md:mt-28"
      >
        <div
          className="h-px w-16 mb-8 transition-colors duration-500"
          style={{ backgroundColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)" }}
        />
        <blockquote
          className="max-w-2xl text-lg md:text-2xl font-black uppercase tracking-tight leading-tight"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            color: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)",
          }}
        >
          "Code is craft. Character is the foundation."
        </blockquote>
      </motion.div>
    </section>
  );
};

export default AboutSoftSkills;