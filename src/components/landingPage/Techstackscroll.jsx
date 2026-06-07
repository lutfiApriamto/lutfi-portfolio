import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useTheme } from "../../context/ThemeContext";
import {
  SiReact, SiNodedotjs, SiMongodb, SiExpress, SiTailwindcss,
  SiFramer, SiGit, SiTypescript, SiSupabase, SiGitlab,
  SiChakraui, SiNextdotjs, SiJavascript, SiGo, SiFigma,
  SiHtml5, SiCss, SiPhp, SiPython, SiVercel, SiPostman,
  SiVite, SiPostgresql, SiMysql, SiBootstrap
} from "react-icons/si";
import { NeonText } from '../reusable/NeonText';

const getTechStack = (isDark) => [
  // front end
  { name: "React",         icon: SiReact,       color: "#61DAFB" },
  { name: "JavaScript",    icon: SiJavascript,  color: "#F7DF1E" },
  { name: "TypeScript",    icon: SiTypescript,  color: "#3178C6" },
  { name: "Tailwind",      icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Chakra UI",     icon: SiChakraui,    color: "#319795" },
  { name: "HTML5",         icon: SiHtml5,       color: "#E34F26" },
  { name: "CSS3",          icon: SiCss,        color: "#1572B6" },
  { name: "Vite",          icon: SiVite,        color: "#9e17ff" },
  { name: "Figma",         icon: SiFigma,       color: "#F24E1E" },
  { name: "Framer",        icon: SiFramer,      color: "#0055FF" },
  { name: "Bootstrap",     icon: SiBootstrap,   color: "#7952B3" },
  // Back end
  { name: "Postman",       icon: SiPostman,     color: "#FF6C37" },
  { name: "MongoDB",       icon: SiMongodb,     color: "#47A248" },
  { name: "Express",       icon: SiExpress,     color: isDark ? "#ffffff" : "#333333" },
  { name: "JavaScript",    icon: SiJavascript,  color: "#F7DF1E" },
  { name: "Node.js",       icon: SiNodedotjs,   color: "#339933" },
// others
  { name: "GitLab",        icon: SiGitlab,      color: "#FC6D26" },
  { name: "PHP",           icon: SiPhp,         color: "#777BB4" },
  { name: "PostgreSQL",    icon: SiPostgresql,  color: "#336791" },
  { name: "MySQL",         icon: SiMysql,       color: "#4479A1" },
  { name: "Golang",        icon: SiGo,          color: "#00ADD8" },
  { name: "Vercel",        icon: SiVercel,      color: isDark ? "#ffffff" : "#000000" },
  { name: "Git",           icon: SiGit,         color: "#F05032" },
  { name: "Next.js",       icon: SiNextdotjs,   color: isDark ? "#ffffff" : "#000000" },
  { name: "Python",        icon: SiPython,      color: "#3776AB" },
  { name: "Supabase",      icon: SiSupabase,    color: "#3ECF8E" },
];

// ── DRAGGABLE PILL ──
const TechPill = ({ tech, isDark }) => {
  const [hovered, setHovered] = useState(false);
  const Icon = tech.icon;

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex-shrink-0 flex items-center gap-2.5 px-4 py-2.5 rounded-full border cursor-grab active:cursor-grabbing transition-all duration-300 select-none"
      style={{
        backgroundColor: hovered
          ? `${tech.color}12`
          : isDark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.8)",
        borderColor: hovered
          ? `${tech.color}50`
          : isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)",
        boxShadow: hovered
          ? `0 0 20px ${tech.color}25`
          : isDark ? "none" : "0 2px 8px rgba(0,0,0,0.04)",
        backdropFilter: "blur(8px)",
      }}
    >
      <Icon
        size={16}
        style={{
          color: hovered ? tech.color : isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.38)",
          transition: "color 0.25s ease",
          filter: hovered ? `drop-shadow(0 0 4px ${tech.color}70)` : "none",
        }}
      />
      <span
        className="text-[11px] font-mono font-bold uppercase tracking-[0.14em] whitespace-nowrap"
        style={{
          color: hovered
            ? tech.color
            : isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.38)",
          transition: "color 0.25s ease",
        }}
      >
        {tech.name}
      </span>
    </motion.div>
  );
};

// ── SCROLLABLE ROW ──
const ScrollRow = ({ techs, isDark, label, direction = 1 }) => {
  const rowRef    = useRef(null);
  const isDragging = useRef(false);
  const startX    = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - rowRef.current.offsetLeft;
    scrollLeft.current = rowRef.current.scrollLeft;
    rowRef.current.style.cursor = 'grabbing';
  };
  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x    = e.pageX - rowRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    rowRef.current.scrollLeft = scrollLeft.current - walk;
  };
  const onMouseUp = () => {
    isDragging.current = false;
    rowRef.current.style.cursor = 'grab';
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Row label */}
      <span
        className="text-[9px] font-mono font-bold uppercase tracking-[0.25em] px-1"
        style={{ color: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)" }}
      >
        {label}
      </span>

      {/* Scrollable track */}
      <div className="relative">
        {/* Left fade */}
        <div
          className="absolute left-0 top-0 bottom-0 w-12 z-10 pointer-events-none"
          style={{
            background: isDark
              ? "linear-gradient(to right, #050505, transparent)"
              : "linear-gradient(to right, #FAF9F6, transparent)",
          }}
        />
        {/* Right fade + arrow hint */}
        <div
          className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none flex items-center justify-end pr-2"
          style={{
            background: isDark
              ? "linear-gradient(to left, #050505 40%, transparent)"
              : "linear-gradient(to left, #FAF9F6 40%, transparent)",
          }}
        >
          <span
            className="text-[10px]"
            style={{ color: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)" }}
          >
            →
          </span>
        </div>

        <div
          ref={rowRef}
          className="flex gap-2.5 overflow-x-auto pb-1"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            cursor: 'grab',
            WebkitOverflowScrolling: 'touch',
          }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          {/* Left spacer */}
          <div className="flex-shrink-0 w-2" />
          {techs.map((tech) => (
            <TechPill key={tech.name} tech={tech} isDark={isDark} />
          ))}
          {/* Right spacer */}
          <div className="flex-shrink-0 w-8" />
        </div>
      </div>
    </div>
  );
};

// ── MAIN ──
const TechStackScroll = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const sectionRef = useRef(null);
  const headerRef  = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: false, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgX = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);

  const techStack = getTechStack(isDark);

  // Bagi jadi 3 row
  const row1 = techStack.slice(0, 11);
  const row2 = techStack.slice(11, 16);
  const row3 = techStack.slice(16,26);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 overflow-hidden transition-colors duration-500"
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
          fontSize: "clamp(5rem,16vw,18rem)",
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 900,
          letterSpacing: "-0.04em",
          color: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.025)",
        }}>
          STACK
        </span>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24">

        {/* HEADER */}
        <motion.div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 md:mb-16"
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="w-8 h-[2px]" style={{ backgroundColor: isDark ? "#C8FF00" : "#2563EB" }} />
              <span
                className="text-[10px] font-bold uppercase tracking-[0.3em]"
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: isDark ? "#C8FF00" : "#2563EB" }}
              >
                Tech Stack
              </span>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "110%" }}
                animate={isHeaderInView ? { y: "0%" } : { y: "110%" }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="text-[clamp(2.2rem,6vw,5.5rem)] font-black uppercase tracking-tight leading-[0.88]"
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: isDark ? "#ffffff" : "#171717" }}
              >
                TOOLS I
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
                
                <NeonText text="WORK WITH." />
              </motion.h2>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-xs text-sm leading-relaxed md:text-right"
            style={{ fontFamily: "'Inter', sans-serif", color: isDark ? "#94a3b8" : "#525252" }}
          >
            Drag or swipe each row to explore the full stack.
          </motion.p>
        </motion.div>

        {/* ROWS */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-5"
        >
          <ScrollRow techs={row1} isDark={isDark} label="Frontend & Framework" />
          <ScrollRow techs={row2} isDark={isDark} label="Backend & Database" />
          <ScrollRow techs={row3} isDark={isDark} label="Tools & Others" />
        </motion.div>

        {/* Bottom count */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center gap-3 mt-10"
        >
          <div className="w-8 h-[2px]" style={{ backgroundColor: isDark ? "#C8FF00" : "#2563EB" }} />
          <span
            className="text-[10px] font-mono uppercase tracking-[0.25em]"
            style={{ color: isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.25)" }}
          >
            {techStack.length} technologies in total
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default TechStackScroll;