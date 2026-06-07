import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useTheme } from "../../context/ThemeContext";
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { FiGithub } from 'react-icons/fi';
import { GlitchText } from '../reusable/NeonText';

// ── DATA ──
const featured = [
  {
    id: 1,
    index: "01",
    category: "Manufacturing System",
    title: "FRO MES Feature Redevelopment",
    subtitle: "Production-grade manufacturing execution system",
    problem: "Legacy manufacturing modules were brittle, hard to maintain, and lacked real-time visibility causing delays in production tracking and data reporting.",
    solution: "Rebuilt core modules from scratch using a modern React architecture with Zustand for state and TanStack for data management, introducing real-time status tracking and bulk processing.",
    impact: [
      "Migrated 6+ legacy modules to scalable architecture",
      "Built real-time Status Storage with granular visualization",
      "Improved maintainability through modular component design",
    ],
    tags: ["React.js", "Zustand", "Chakra UI", "TanStack", "vite.JS"],
    year: "2025",
    type: "Internship Project",
    status: "Production",
    github: null,
    live: null,
  },
  {
    id: 2,
    index: "02",
    category: "EcoTech Platform",
    title: "Trash Management Digitalization",
    subtitle: "Waste bank system for Rawa Panjang Village",
    problem: "The waste bank program in Rawa Panjang managed 10+ branches using manual paper-based records causing data loss, slow reporting, and zero visibility across branches.",
    solution: "Built a full-stack digitalization platform with point-based transaction management, real-time tracking across all branches, and automated monthly Excel report exports.",
    impact: [
      "10+ branches actively using the system",
      "Registered Intellectual Property (DIKTI SAINTEK)",
      "Eliminated paper-based records entirely",
    ],
    tags: ["Vite.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    year: "2025",
    type: "Community Project",
    status: "Live",
    github: null,
    live: null,
  },
];

// ── TAG CHIP ──
const TagChip = ({ label, isDark }) => (
  <span
    className="text-[9px] font-mono font-bold uppercase tracking-[0.18em] px-2.5 py-1 rounded-md"
    style={{
      backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
      color: isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)",
      border: `1px solid ${isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`,
    }}
  >
    {label}
  </span>
);

// ── STATUS BADGE ──
const StatusBadge = ({ status, isDark }) => (
  <span
    className="flex items-center gap-1.5 text-[9px] font-mono font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full"
    style={{
      backgroundColor: status === "Production" || status === "Live"
        ? "rgba(34,197,94,0.08)"
        : "rgba(234,179,8,0.08)",
      color: status === "Production" || status === "Live"
        ? "#22c55e"
        : "#eab308",
      border: `1px solid ${status === "Production" || status === "Live"
        ? "rgba(34,197,94,0.2)"
        : "rgba(234,179,8,0.2)"}`,
    }}
  >
    <span
      className="w-1.5 h-1.5 rounded-full animate-pulse"
      style={{
        backgroundColor: status === "Production" || status === "Live"
          ? "#22c55e"
          : "#eab308",
      }}
    />
    {status}
  </span>
);

// ── CASE CARD ──
const CaseCard = ({ project, index, isDark }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: false, margin: "-80px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 48 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }}
      transition={{ duration: 0.85, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="w-full grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden border"
      style={{
        borderColor: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)",
        backgroundColor: isDark ? "rgba(12,12,12,0.8)" : "rgba(255,255,255,0.8)",
      }}
    >
      {/* ── VISUAL SIDE ── */}
      <div
        className={`relative flex flex-col justify-between p-8 md:p-10 min-h-[280px] md:min-h-[360px] ${
          isEven ? "lg:order-1" : "lg:order-2"
        }`}
        style={{
          background: isDark
            ? `linear-gradient(135deg, rgba(200,255,0,0.06) 0%, rgba(0,0,0,0) 60%)`
            : `linear-gradient(135deg, rgba(37,99,235,0.06) 0%, rgba(0,0,0,0) 60%)`,
          borderRight: isEven
            ? `1px solid ${isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`
            : "none",
          borderLeft: !isEven
            ? `1px solid ${isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`
            : "none",
        }}
      >
        {/* Top row */}
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-2">
            <span
              className="text-[9px] font-mono font-bold uppercase tracking-[0.25em]"
              style={{ color: isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.25)" }}
            >
              {project.category}
            </span>
            <StatusBadge status={project.status} isDark={isDark} />
          </div>
          <span
            className="text-5xl font-black leading-none tabular-nums"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              color: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
            }}
          >
            {project.index}
          </span>
        </div>

        {/* Center — big number + type */}
        <div className="flex flex-col gap-3">
          <span
            className="text-[10px] font-mono uppercase tracking-[0.2em]"
            style={{ color: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)" }}
          >
            {project.type} · {project.year}
          </span>

          {/* Impact numbers */}
          <div className="flex flex-wrap gap-3">
            {project.impact.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="flex items-start gap-2"
              >
                <span
                  className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0"
                  style={{ backgroundColor: isDark ? "#C8FF00" : "#2563EB" }}
                />
                <span
                  className="text-xs leading-relaxed"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)",
                  }}
                >
                  {item}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <TagChip key={tag} label={tag} isDark={isDark} />
          ))}
        </div>
      </div>

      {/* ── CONTENT SIDE ── */}
      <div
        className={`flex flex-col justify-between p-8 md:p-10 gap-8 ${
          isEven ? "lg:order-2" : "lg:order-1"
        }`}
      >
        {/* Header */}
        <div className="flex flex-col gap-4">
          <h3
            className="text-xl md:text-2xl font-black uppercase tracking-tight leading-tight"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              color: isDark ? "#ffffff" : "#171717",
            }}
          >
            {project.title}
          </h3>
          <p
            className="text-sm font-medium"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: isDark ? "#C8FF00" : "#2563EB",
            }}
          >
            {project.subtitle}
          </p>
        </div>

        {/* Problem → Solution */}
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <span
              className="text-[9px] font-mono font-bold uppercase tracking-[0.25em]"
              style={{ color: isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.25)" }}
            >
              The Problem
            </span>
            <p
              className="text-sm leading-relaxed"
              style={{
                fontFamily: "'Inter', sans-serif",
                color: isDark ? "#94a3b8" : "#525252",
              }}
            >
              {project.problem}
            </p>
          </div>

          <div
            className="w-full h-px"
            style={{ backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)" }}
          />

          <div className="flex flex-col gap-2">
            <span
              className="text-[9px] font-mono font-bold uppercase tracking-[0.25em]"
              style={{ color: isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.25)" }}
            >
              The Solution
            </span>
            <p
              className="text-sm leading-relaxed"
              style={{
                fontFamily: "'Inter', sans-serif",
                color: isDark ? "#94a3b8" : "#525252",
              }}
            >
              {project.solution}
            </p>
          </div>
        </div>

        {/* CTA row */}
        <div className="flex items-center gap-4 pt-2 border-t"
          style={{ borderColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)" }}
        >
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-[0.18em] transition-colors duration-300"
              style={{ color: isDark ? "#C8FF00" : "#2563EB" }}
            >
              <ExternalLink size={13} />
              Live Demo
              <ArrowUpRight
                size={13}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-[0.18em] transition-colors duration-300"
              style={{ color: isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = isDark ? "#ffffff" : "#171717"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)"; }}
            >
              <FiGithub size={13} />
              Source
            </a>
          )}
          {!project.live && !project.github && (
            <span
              className="text-[10px] font-mono uppercase tracking-[0.18em]"
              style={{ color: isDark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.18)" }}
            >
              Private / Internal Project
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// ── MAIN COMPONENT ──
const ProjectsFeatured = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: false, margin: "-100px" });

  // Parallax bg
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgX = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  // Header reveal
  const { scrollYProgress: hScroll } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center", "end start"],
  });
  const headerOpacity = useTransform(hScroll, [0, 0.2, 0.75, 1], [0, 1, 1, 0]);
  const headerY = useTransform(hScroll, [0, 0.2, 0.75, 1], [40, 0, 0, -30]);
  const headerBlur = useTransform(hScroll, [0, 0.2, 0.75, 1],
    ["blur(10px)", "blur(0px)", "blur(0px)", "blur(6px)"]
  );

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
        viewport={{ once: false, amount: 0.3 }}
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
            fontSize: "clamp(5rem, 16vw, 18rem)",
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 900,
            letterSpacing: "-0.04em",
            color: isDark ? "rgba(255,255,255,0.025)" : "rgba(0,0,0,0.03)",
          }}
        >
          FEATURED
        </span>
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col gap-16 md:gap-20">

        {/* HEADER */}
        <motion.div
          ref={headerRef}
          style={{ opacity: headerOpacity, y: headerY, filter: headerBlur }}
          className="flex flex-col gap-5"
        >
          {/* Label */}
          <div className="flex items-center gap-4">
            <div className="w-8 h-[2px]" style={{ backgroundColor: isDark ? "#C8FF00" : "#2563EB" }} />
            <span
              className="text-[10px] font-bold uppercase tracking-[0.3em]"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: isDark ? "#C8FF00" : "#2563EB" }}
            >
              Case Studies
            </span>
          </div>

          {/* Headline */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex flex-col gap-0">
              <div className="overflow-hidden">
                <motion.h2
                  initial={{ y: "110%" }}
                  animate={isHeaderInView ? { y: "0%" } : { y: "110%" }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="text-[clamp(2.5rem,7vw,6rem)] font-black uppercase tracking-tight leading-[0.88]"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", color: isDark ? "#ffffff" : "#171717" }}
                >
                  FEATURED
                </motion.h2>
              </div>
              <div className="overflow-hidden">
                <motion.h2
                  initial={{ y: "110%" }}
                  animate={isHeaderInView ? { y: "0%" } : { y: "110%" }}
                  transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="text-[clamp(2.5rem,7vw,6rem)] font-black uppercase tracking-tight leading-[0.88]"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  <GlitchText text="PROJECTS" />
                </motion.h2>
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-xs text-sm leading-relaxed md:text-right"
              style={{ fontFamily: "'Inter', sans-serif", color: isDark ? "#94a3b8" : "#525252" }}
            >
              Deep dives into the projects that shipped to production and made a real difference.
            </motion.p>
          </div>
        </motion.div>

        {/* CASE CARDS */}
        <div className="flex flex-col gap-8 md:gap-10">
          {featured.map((project, i) => (
            <CaseCard
              key={project.id}
              project={project}
              index={i}
              isDark={isDark}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsFeatured;