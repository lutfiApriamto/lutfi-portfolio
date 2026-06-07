import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence, useSpring, useMotionValue, useTransform } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import {
  SiReact, SiNextdotjs, SiTypescript, SiJavascript,
  SiNodedotjs, SiExpress, SiMongodb, SiPostgresql,
  SiMysql, SiGo, SiPython, SiPhp, SiSupabase,
  SiTailwindcss, SiBootstrap, SiChakraui, SiFramer,
  SiHtml5, SiCss, SiGit, SiGitlab, SiVercel,
  SiPostman, SiFigma, SiVite,
} from "react-icons/si";

// ── TECH STACK DATA ──
const getTechStack = (isDark) => [
  { name: "React",         icon: SiReact,       color: "#61DAFB" },
  { name: "Next.js",       icon: SiNextdotjs,   color: isDark ? "#ffffff" : "#000000" },
  { name: "TypeScript",    icon: SiTypescript,  color: "#3178C6" },
  { name: "JavaScript",    icon: SiJavascript,  color: "#F7DF1E" },
  { name: "Node.js",       icon: SiNodedotjs,   color: "#339933" },
  { name: "Express",       icon: SiExpress,     color: isDark ? "#ffffff" : "#000000" },
  { name: "MongoDB",       icon: SiMongodb,     color: "#47A248" },
  { name: "PostgreSQL",    icon: SiPostgresql,  color: "#336791" },
  { name: "MySQL",         icon: SiMysql,       color: "#4479A1" },
  { name: "Golang",        icon: SiGo,          color: "#00ADD8" },
  { name: "Python",        icon: SiPython,      color: "#3776AB" },
  { name: "PHP",           icon: SiPhp,         color: "#777BB4" },
  { name: "Supabase",      icon: SiSupabase,    color: "#3ECF8E" },
  { name: "Tailwind",      icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Bootstrap",     icon: SiBootstrap,   color: "#7952B3" },
  { name: "Chakra UI",     icon: SiChakraui,    color: "#319795" },
  { name: "Framer Motion", icon: SiFramer,      color: "#0055FF" },
  { name: "HTML5",         icon: SiHtml5,       color: "#E34F26" },
  { name: "CSS3",          icon: SiCss,        color: "#1572B6" },
  { name: "Git",           icon: SiGit,         color: "#F05032" },
  { name: "GitLab",        icon: SiGitlab,      color: "#FC6D26" },
  { name: "Vercel",        icon: SiVercel,      color: isDark ? "#ffffff" : "#000000" },
  { name: "Postman",       icon: SiPostman,     color: "#FF6C37" },
  { name: "Figma",         icon: SiFigma,       color: "#F24E1E" },
  { name: "Vite",          icon: SiVite,        color: "#9e17ff" },
];

// ── PRESETS ──
const PRESETS = {
  frontend: ["React", "JavaScript", "Tailwind", "HTML5", "CSS3", "Vite", "Figma", "Git", "Framer Motion", "Vercel"],
  backend:  ["Node.js", "Express", "MongoDB", "Git", "Postman", "Supabase"],
  fullstack: ["React", "JavaScript", "Node.js", "Express", "MongoDB", "Tailwind", "HTML5", "CSS3", "Git", "Vite"],
};

// ── SCORING ENGINE ──
const calculateScore = (selected) => {
  const s = new Set(selected);

  // ── COHERENCE CHECK ──
  const hasFrontendCore  = s.has("React") && (s.has("JavaScript") || s.has("Tailwind"));
  const hasBackendCore   = s.has("Node.js") && s.has("Express");
  const hasFullstackCore = hasFrontendCore && hasBackendCore;

  if (selected.length === 0) {
    return { score: 0, role: null, label: "", status: "idle", valid: false };
  }

  // Only tools, no code/framework = incoherent
  const codeStacks = ["React","Next.js","TypeScript","JavaScript","Node.js","Express",
    "MongoDB","PostgreSQL","MySQL","Golang","Python","PHP","Supabase","Tailwind",
    "Bootstrap","Chakra UI","HTML5","CSS3"];
  const hasAnyCodeStack = codeStacks.some(t => s.has(t));

  if (!hasAnyCodeStack || (!hasFrontendCore && !hasBackendCore)) {
    return {
      score: 0,
      role: "Incoherent Stack",
      label: "Stack Mismatch",
      status: "invalid",
      valid: false,
    };
  }

  // ── ROLE DETECTION ──
  const frontendScore = (() => {
    if (!hasFrontendCore) return 0;
    let score = 55;

    // Core additions
    if (s.has("React"))          score += 8;
    if (s.has("JavaScript"))     score += 6;
    if (s.has("Tailwind"))       score += 6;
    if (s.has("TypeScript"))     score += 3;
    if (s.has("HTML5"))          score += 2;
    if (s.has("CSS3"))           score += 2;
    if (s.has("Vite"))           score += 2;
    if (s.has("Figma"))          score += 2;
    if (s.has("Git"))            score += 2;
    if (s.has("Framer Motion"))  score += 2;
    if (s.has("Next.js"))        score += 2;
    if (s.has("Vercel"))         score += 1;

    // Penalties
    if (s.has("Bootstrap"))      score -= 3;
    if (s.has("Chakra UI"))      score -= 2;

    // Penalties for backend tools in frontend context
    if (s.has("Python"))         score -= 8;
    if (s.has("Golang"))         score -= 8;
    if (s.has("PostgreSQL"))     score -= 3;
    if (s.has("MySQL"))          score -= 3;

    return Math.min(92.5, Math.max(0, score));
  })();

  const backendScore = (() => {
    if (!hasBackendCore) return 0;
    let score = 55;

    if (s.has("Node.js"))        score += 8;
    if (s.has("Express"))        score += 8;
    if (s.has("MongoDB"))        score += 8;
    if (s.has("Git"))            score += 2;
    if (s.has("Postman"))        score += 2;
    if (s.has("Supabase"))       score += 2;
    if (s.has("TypeScript"))     score += 2;

    // Penalties
    if (s.has("Python"))         score -= 14;
    if (s.has("Golang"))         score -= 14;
    if (s.has("PostgreSQL"))     score -= 6;
    if (s.has("MySQL"))          score -= 6;

    return Math.min(85, Math.max(0, score));
  })();

  const fullstackScore = (() => {
    if (!hasFullstackCore) return 0;
    let score = 50;

    if (s.has("React"))          score += 6;
    if (s.has("JavaScript"))     score += 4;
    if (s.has("Node.js"))        score += 6;
    if (s.has("Express"))        score += 6;
    if (s.has("MongoDB"))        score += 6;
    if (s.has("Tailwind"))       score += 3;
    if (s.has("Git"))            score += 2;
    if (s.has("Vite"))           score += 1;

    if (s.has("Python"))         score -= 10;
    if (s.has("Golang"))         score -= 10;
    if (s.has("PostgreSQL"))     score -= 4;
    if (s.has("MySQL"))          score -= 4;

    return Math.min(80, Math.max(0, score));
  })();

  // ── ROLE WINNER ──
  let role, score, label;

  if (hasFullstackCore && frontendScore > 80 && backendScore > 70) {
    // Both strong — fullstack
    score = fullstackScore;
    role  = "Full Stack MERN Developer";
    label = "Analyzing for Full Stack";
  } else if (frontendScore >= backendScore) {
    score = frontendScore;
    role  = "Frontend Developer";
    label = "Analyzing for Frontend";
  } else {
    score = backendScore;
    role  = "Backend Developer";
    label = "Analyzing for Backend";
  }

  // ── STATUS TEXT ──
  let status;
  const rounded = Math.round(score * 10) / 10;
  if (rounded >= 85)      status = "perfect";
  else if (rounded >= 70) status = "strong";
  else if (rounded >= 50) status = "good";
  else                    status = "partial";

  return { score: rounded, role, label, status, valid: true };
};

const STATUS_CONFIG = {
  idle:    { text: "Select your stack to begin",              color: "#6b7280" },
  perfect: { text: "Perfect Match for Your Team! (Highly Recommended)", color: "#22c55e" },
  strong:  { text: "Strong Fit (Solid Core Capabilities)",   color: "#84cc16" },
  good:    { text: "Good Overlap (With Room to Adapt)",       color: "#eab308" },
  partial: { text: "Partial Match (Let's discuss alternatives)", color: "#f97316" },
  invalid: { text: "Incoherent Combination / Stack Mismatch", color: "#ef4444" },
};

// ── CIRCULAR GAUGE ──
const CircularGauge = ({ score, status, isDark }) => {
  const radius    = 70;
  const stroke    = 7;
  const normalised = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalised;

  const springScore = useSpring(0, { stiffness: 60, damping: 18 });

  useEffect(() => {
    springScore.set(score);
  }, [score, springScore]);

  const dashOffset = useTransform(springScore, (v) =>
    circumference - (v / 100) * circumference
  );

  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.idle;

  return (
    <div className="relative flex items-center justify-center" style={{ width: 170, height: 170 }}>
      {/* Track */}
      <svg width="170" height="170" className="absolute inset-0 -rotate-90">
        <circle
          cx="85" cy="85" r={normalised}
          fill="none"
          stroke={isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}
          strokeWidth={stroke}
        />
        <motion.circle
          cx="85" cy="85" r={normalised}
          fill="none"
          stroke={cfg.color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          style={{ strokeDashoffset: dashOffset }}
        />
      </svg>

      {/* Center text */}
      <div className="relative flex flex-col items-center justify-center z-10">
        <motion.span
          key={score}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl font-black tabular-nums leading-none"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            color: cfg.color,
          }}
        >
          {score}
          <span className="text-xl">%</span>
        </motion.span>
      </div>
    </div>
  );
};

// ── TECH BADGE ──
const TechBadge = ({ tech, active, onClick, isDark }) => {
  const Icon = tech.icon;
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.93 }}
      className="relative flex flex-col items-center gap-1.5 px-3 py-2.5 rounded-xl border transition-all duration-300 cursor-pointer select-none"
      style={{
        backgroundColor: active
          ? `${tech.color}18`
          : isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
        borderColor: active
          ? `${tech.color}60`
          : isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)",
        boxShadow: active ? `0 0 16px ${tech.color}20` : "none",
      }}
    >
      <Icon
        size={22}
        style={{
          color: active ? tech.color : isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.2)",
          transition: "color 0.2s ease",
          filter: active ? `drop-shadow(0 0 6px ${tech.color}60)` : "none",
        }}
      />
      <span
        className="text-[9px] font-mono font-bold uppercase tracking-wider text-center leading-none"
        style={{
          color: active
            ? tech.color
            : isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.28)",
          transition: "color 0.2s ease",
        }}
      >
        {tech.name}
      </span>

      {active && (
        <motion.div
          layoutId={`active-${tech.name}`}
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{ border: `1.5px solid ${tech.color}50` }}
        />
      )}
    </motion.button>
  );
};

// ── MAIN COMPONENT ──
const SkillMatchCalculator = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [selected, setSelected] = useState([]);
  const [activePreset, setActivePreset] = useState(null);
  const techStack = useMemo(() => getTechStack(isDark), [isDark]);

  const result = useMemo(() => calculateScore(selected), [selected]);

  const toggleTech = (name) => {
    setActivePreset(null);
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((t) => t !== name) : [...prev, name]
    );
  };

  const applyPreset = (presetKey) => {
    setActivePreset(presetKey);
    setSelected(PRESETS[presetKey]);
  };

  const reset = () => {
    setSelected([]);
    setActivePreset(null);
  };

  const cfg = STATUS_CONFIG[result.status] || STATUS_CONFIG.idle;

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.04 } },
  };
  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section
      className="relative w-full py-24 md:py-36 px-5 md:px-10 lg:px-20 transition-colors duration-500"
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
        className="absolute top-0 inset-x-5 md:inset-x-10 lg:inset-x-20 h-px origin-left"
        style={{ backgroundColor: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-start mb-10 md:mb-14 gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-8 h-[2px]" style={{ backgroundColor: isDark ? "#C8FF00" : "#2563EB" }} />
            <span
              className="text-[10px] font-bold uppercase tracking-[0.3em]"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: isDark ? "#C8FF00" : "#2563EB" }}
            >
              Interactive Tool
            </span>
          </div>

          <p
            className="max-w-lg text-sm md:text-base leading-relaxed"
            style={{ fontFamily: "'Inter', sans-serif", color: isDark ? "#94a3b8" : "#525252" }}
          >
            Select the tech stack your project needs. I'll tell you how well my skills match your requirements in real time.
          </p>
        </motion.div>

        {/* ── BENTO GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">

          {/* ── LEFT: CONTROL PANEL ── */}
          <div className="lg:col-span-7 flex flex-col gap-6">

            {/* Quick Presets */}
            <div
              className="flex flex-col gap-4 p-5 rounded-2xl border"
              style={{
                backgroundColor: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
                borderColor: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)",
              }}
            >
              <span
                className="text-[10px] font-mono font-bold uppercase tracking-[0.2em]"
                style={{ color: isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)" }}
              >
                Quick Presets
              </span>
              <div className="flex flex-wrap gap-3">
                {[
                  { key: "frontend",  label: "Frontend Dev",    },
                  { key: "backend",   label: "Backend Dev",     },
                  { key: "fullstack", label: "Full Stack MERN", },
                ].map((preset) => (
                  <button
                    key={preset.key}
                    onClick={() => applyPreset(preset.key)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg border text-xs font-bold uppercase tracking-wider transition-all duration-300"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      backgroundColor: activePreset === preset.key
                        ? isDark ? "rgba(200,255,0,0.1)" : "rgba(37,99,235,0.1)"
                        : "transparent",
                      borderColor: activePreset === preset.key
                        ? isDark ? "#C8FF00" : "#2563EB"
                        : isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)",
                      color: activePreset === preset.key
                        ? isDark ? "#C8FF00" : "#2563EB"
                        : isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)",
                    }}
                  >
                    {preset.label}
                  </button>
                ))}

                {selected.length > 0 && (
                  <button
                    onClick={reset}
                    className="flex items-center gap-1.5 px-3 py-2.5 rounded-lg border text-xs font-bold uppercase tracking-wider transition-all duration-300"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
                      color: isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)",
                    }}
                  >
                    Reset ✕
                  </button>
                )}
              </div>
            </div>

            {/* Skill Pool */}
            <div
              className="flex flex-col gap-4 p-5 rounded-2xl border"
              style={{
                backgroundColor: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
                borderColor: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)",
              }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="text-[10px] font-mono font-bold uppercase tracking-[0.2em]"
                  style={{ color: isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)" }}
                >
                  Skill Pool — Click to toggle
                </span>
                <span
                  className="text-[10px] font-mono"
                  style={{ color: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)" }}
                >
                  {selected.length}/{techStack.length} selected
                </span>
              </div>

              <motion.div
                className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2.5"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {techStack.map((tech) => (
                  <motion.div key={tech.name} variants={badgeVariants}>
                    <TechBadge
                      tech={tech}
                      active={selected.includes(tech.name)}
                      onClick={() => toggleTech(tech.name)}
                      isDark={isDark}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* ── RIGHT: SCORECARD ── */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <motion.div
              className="flex flex-col items-center gap-6 p-7 rounded-2xl border"
              style={{
                backgroundColor: isDark ? "rgba(12,12,12,0.9)" : "rgba(255,255,255,0.9)",
                borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
                backdropFilter: "blur(20px)",
              }}
              layout
            >
              {/* Role label */}
              <AnimatePresence mode="wait">
                <motion.span
                  key={result.label || "idle"}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.3 }}
                  className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-center"
                  style={{
                    color: result.valid
                      ? isDark ? "#C8FF00" : "#2563EB"
                      : isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.25)",
                  }}
                >
                  {result.label || "Awaiting Stack Selection"}
                </motion.span>
              </AnimatePresence>

              {/* Gauge */}
              <CircularGauge score={result.score} status={result.status} isDark={isDark} />

              {/* Role name */}
              <AnimatePresence mode="wait">
                <motion.h3
                  key={result.role || "none"}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.35 }}
                  className="text-xl font-black uppercase tracking-tight text-center"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    color: isDark ? "#ffffff" : "#171717",
                  }}
                >
                  {result.role || "—"}
                </motion.h3>
              </AnimatePresence>

              {/* Status text */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={result.status}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="text-xs text-center leading-relaxed px-2"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    color: cfg.color,
                  }}
                >
                  {cfg.text}
                </motion.p>
              </AnimatePresence>

              {/* Divider */}
              <div
                className="w-full h-px"
                style={{ backgroundColor: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)" }}
              />

              {/* Active stack chips */}
              {selected.length > 0 && (
                <div className="w-full flex flex-col gap-2">
                  <span
                    className="text-[9px] font-mono uppercase tracking-[0.2em]"
                    style={{ color: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)" }}
                  >
                    Active Stack
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selected.map((name) => {
                      const tech = getTechStack(isDark).find((t) => t.name === name);
                      if (!tech) return null;
                      return (
                        <span
                          key={name}
                          className="text-[9px] font-mono px-2 py-1 rounded-md"
                          style={{
                            backgroundColor: `${tech.color}18`,
                            color: tech.color,
                            border: `1px solid ${tech.color}40`,
                          }}
                        >
                          {name}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* CTA */}
              <a
                href="mailto:lutfiapriamto12@gmail.com"
                className="group w-full flex items-center justify-center gap-2.5 py-4 rounded-xl font-mono text-xs font-bold uppercase tracking-[0.18em] transition-all duration-300"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  backgroundColor: isDark ? "#C8FF00" : "#2563EB",
                  color: isDark ? "#050505" : "#ffffff",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = isDark ? "#d4ff33" : "#1d4ed8";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = isDark
                    ? "0 8px 24px rgba(200,255,0,0.25)"
                    : "0 8px 24px rgba(37,99,235,0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = isDark ? "#C8FF00" : "#2563EB";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                Let's Work Together
                <span className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillMatchCalculator;