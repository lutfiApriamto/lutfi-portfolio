import { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useTheme } from "../../context/ThemeContext";
import {
  SiReact, SiNodedotjs, SiMongodb, SiExpress, SiTailwindcss,
  SiFramer, SiGit, SiTypescript, SiSupabase, SiGitlab,
  SiChakraui, SiNextdotjs, SiJavascript, SiGo, SiFigma,
  SiHtml5, SiCss, SiPhp, SiPython, SiVercel, SiPostman,
  SiVite, SiPostgresql, SiMysql, SiBootstrap
} from "react-icons/si";
import { NeonText } from '../reusable/NeonText';

// ── DATA PER KATEGORI ──
const getCategories = (isDark) => [
  {
    key: "frontend",
    label: "Frontend",
    description: "Interface, styling, dan pengalaman pengguna",
    accent: isDark ? "#C8FF00" : "#2563EB",
    techs: [
      { name: "React",         icon: SiReact,       color: "#61DAFB", level: 95 },
      { name: "JavaScript",    icon: SiJavascript,  color: "#F7DF1E", level: 92 },
      { name: "TypeScript",    icon: SiTypescript,  color: "#3178C6", level: 72 },
      { name: "Next.js",       icon: SiNextdotjs,   color: isDark ? "#ffffff" : "#000000", level: 70 },
      { name: "Tailwind CSS",  icon: SiTailwindcss, color: "#06B6D4", level: 93 },
      { name: "Chakra UI",     icon: SiChakraui,    color: "#319795", level: 80 },
      { name: "Framer Motion", icon: SiFramer,      color: "#0055FF", level: 78 },
      { name: "HTML5",         icon: SiHtml5,       color: "#E34F26", level: 95 },
      { name: "CSS3",          icon: SiCss,        color: "#1572B6", level: 90 },
      { name: "Bootstrap",     icon: SiBootstrap,   color: "#7952B3", level: 75 },
      { name: "Vite",          icon: SiVite,        color: "#9e17ff", level: 88 },
      { name: "Figma",         icon: SiFigma,       color: "#F24E1E", level: 72 },
    ],
  },
  {
    key: "backend",
    label: "Backend",
    description: "Server, API, dan manajemen data",
    accent: isDark ? "#C8FF00" : "#2563EB",
    techs: [
      { name: "Node.js",    icon: SiNodedotjs,  color: "#339933", level: 85 },
      { name: "Express",    icon: SiExpress,    color: isDark ? "#ffffff" : "#333333", level: 85 },
      { name: "MongoDB",    icon: SiMongodb,    color: "#47A248", level: 83 },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#336791", level: 62 },
      { name: "MySQL",      icon: SiMysql,      color: "#4479A1", level: 65 },
      { name: "Supabase",   icon: SiSupabase,   color: "#3ECF8E", level: 72 },
      { name: "Python",     icon: SiPython,     color: "#3776AB", level: 55 },
      { name: "PHP",        icon: SiPhp,        color: "#777BB4", level: 60 },
      { name: "Golang",     icon: SiGo,         color: "#00ADD8", level: 45 },
    ],
  },
  {
    key: "tools",
    label: "Tools & DevOps",
    description: "Workflow, deployment, dan kolaborasi",
    accent: isDark ? "#C8FF00" : "#2563EB",
    techs: [
      { name: "Git",     icon: SiGit,    color: "#F05032", level: 88 },
      { name: "GitLab",  icon: SiGitlab, color: "#FC6D26", level: 80 },
      { name: "Vercel",  icon: SiVercel, color: isDark ? "#ffffff" : "#000000", level: 82 },
      { name: "Postman", icon: SiPostman, color: "#FF6C37", level: 85 },
    ],
  },
];

// ── LEVEL BAR ──
const LevelBar = ({ level, color, isInView, delay }) => (
  <div
    className="w-full h-px rounded-full overflow-hidden"
    style={{ backgroundColor: "rgba(128,128,128,0.15)" }}
  >
    <motion.div
      initial={{ scaleX: 0 }}
      animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className="h-full rounded-full origin-left"
      style={{
        width: `${level}%`,
        backgroundColor: color,
        opacity: 0.7,
      }}
    />
  </div>
);

// ── TECH ITEM ──
const TechItem = ({ tech, isDark, index, isInView }) => {
  const [hovered, setHovered] = useState(false);
  const Icon = tech.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: 0.05 + index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col gap-2.5 p-4 rounded-xl border transition-all duration-300 cursor-default"
      style={{
        backgroundColor: hovered
          ? `${tech.color}0e`
          : isDark ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.7)",
        borderColor: hovered
          ? `${tech.color}40`
          : isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)",
        boxShadow: hovered
          ? `0 4px 20px ${tech.color}18`
          : isDark ? "none" : "0 2px 8px rgba(0,0,0,0.03)",
      }}
    >
      {/* Icon + Name row */}
      <div className="flex items-center gap-2.5">
        <Icon
          size={20}
          style={{
            color: hovered ? tech.color : isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.38)",
            filter: hovered ? `drop-shadow(0 0 6px ${tech.color}70)` : "none",
            transition: "color 0.25s ease, filter 0.25s ease",
            flexShrink: 0,
          }}
        />
        <span
          className="text-[11px] font-mono font-bold uppercase tracking-[0.12em] truncate"
          style={{
            color: hovered
              ? isDark ? "#ffffff" : "#171717"
              : isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.5)",
            transition: "color 0.25s ease",
          }}
        >
          {tech.name}
        </span>

        {/* Level number — muncul saat hover */}
        <motion.span
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="ml-auto text-[9px] font-mono tabular-nums flex-shrink-0"
          style={{ color: tech.color }}
        >
          {tech.level}%
        </motion.span>
      </div>

      {/* Level bar */}
      <LevelBar
        level={tech.level}
        color={tech.color}
        isInView={isInView}
        delay={0.1 + index * 0.04}
      />
    </motion.div>
  );
};

// ── CATEGORY SECTION ──
const CategorySection = ({ category, isDark, sectionIndex, isInView }) => (
  <motion.div
    initial={{ opacity: 0, y: 32 }}
    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
    transition={{ duration: 0.7, delay: sectionIndex * 0.12, ease: [0.22, 1, 0.36, 1] }}
    className="flex flex-col gap-6"
  >
    {/* Category header */}
    <div className="flex flex-col gap-2 pb-4 border-b"
      style={{ borderColor: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)" }}
    >
      <div className="flex items-center gap-3">
        <div className="w-5 h-[2px]" style={{ backgroundColor: category.accent }} />
        <span
          className="text-[9px] font-mono font-bold uppercase tracking-[0.28em]"
          style={{ color: category.accent }}
        >
          {category.label}
        </span>
        <span
          className="ml-auto text-[9px] font-mono uppercase tracking-[0.15em]"
          style={{ color: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)" }}
        >
          {category.techs.length} tools
        </span>
      </div>
      <p
        className="text-[11px] leading-relaxed"
        style={{
          fontFamily: "'Inter', sans-serif",
          color: isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)",
        }}
      >
        {category.description}
      </p>
    </div>

    {/* Tech grid */}
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      {category.techs.map((tech, i) => (
        <TechItem
          key={tech.name}
          tech={tech}
          isDark={isDark}
          index={i}
          isInView={isInView}
        />
      ))}
    </div>
  </motion.div>
);

// ── MAIN ──
const AboutTechStack = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const sectionRef = useRef(null);
  const headerRef  = useRef(null);
  const gridRef    = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: false, margin: "-80px" });
  const isGridInView   = useInView(gridRef,   { once: false, margin: "-60px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgX = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);

  const categories = getCategories(isDark);
  const totalTechs = categories.reduce((acc, c) => acc + c.techs.length, 0);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 md:py-36 px-6 md:px-12 lg:px-24 overflow-hidden transition-colors duration-500"
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

      {/* BG TEXT */}
      <motion.div
        style={{ x: bgX }}
        className="absolute top-1/2 right-0 -translate-y-1/2 pointer-events-none select-none whitespace-nowrap z-0"
        aria-hidden
      >
        <span style={{
          fontSize: "clamp(5rem,14vw,16rem)",
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 900,
          letterSpacing: "-0.04em",
          color: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.025)",
        }}>
          HARD SKILLS
        </span>
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col gap-16">

        {/* HEADER */}
        <motion.div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="w-8 h-[2px]" style={{ backgroundColor: isDark ? "#C8FF00" : "#2563EB" }} />
              <span
                className="text-[10px] font-bold uppercase tracking-[0.3em]"
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: isDark ? "#C8FF00" : "#2563EB" }}
              >
                Hard Skills
              </span>
            </div>

            <div className="flex flex-col gap-0">
              <div className="overflow-hidden">
                <motion.h2
                  initial={{ y: "110%" }}
                  animate={isHeaderInView ? { y: "0%" } : { y: "110%" }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="text-[clamp(2.2rem,6vw,5.5rem)] font-black uppercase tracking-tight leading-[0.88]"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", color: isDark ? "#ffffff" : "#171717" }}
                >
                  TECH
                </motion.h2>
              </div>
              <div className="overflow-hidden">
                <motion.h2
                  initial={{ y: "110%" }}
                  animate={isHeaderInView ? { y: "0%" } : { y: "110%" }}
                  transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="text-[clamp(2.2rem,6vw,5.5rem)] font-black uppercase tracking-tight leading-[0.88]"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    WebkitTextStroke: isDark ? "1.5px rgba(255,255,255,0.15)" : "1.5px rgba(0,0,0,0.15)",
                    color: "transparent",
                  }}
                >
                  <NeonText text="Stack." isDark={isDark} />
                </motion.h2>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end gap-3">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="max-w-xs text-sm leading-relaxed md:text-right"
              style={{ fontFamily: "'Inter', sans-serif", color: isDark ? "#94a3b8" : "#525252" }}
            >
              Tools and technologies I use across frontend, backend, and development workflow.
            </motion.p>

            {/* Total count badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isHeaderInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border"
              style={{
                backgroundColor: isDark ? "rgba(200,255,0,0.06)" : "rgba(37,99,235,0.06)",
                borderColor: isDark ? "rgba(200,255,0,0.2)" : "rgba(37,99,235,0.2)",
              }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: isDark ? "#C8FF00" : "#2563EB" }}
              />
              <span
                className="text-[10px] font-mono font-bold uppercase tracking-[0.2em]"
                style={{ color: isDark ? "#C8FF00" : "#2563EB" }}
              >
                {totalTechs} Technologies
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* CATEGORIES GRID */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-8"
        >
          {categories.map((category, i) => (
            <CategorySection
              key={category.key}
              category={category}
              isDark={isDark}
              sectionIndex={i}
              isInView={isGridInView}
            />
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[10px] font-mono uppercase tracking-[0.2em] text-center"
          style={{ color: isDark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.18)" }}
        >
          Hover each cell to see proficiency level · Bars reflect confidence, not years
        </motion.p>
      </div>
    </section>
  );
};

export default AboutTechStack;