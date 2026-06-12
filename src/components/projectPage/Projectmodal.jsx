import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from "../../context/ThemeContext";
import { ExternalLink, X, Lock } from 'lucide-react';
import { FiGithub } from 'react-icons/fi';
import {NeonText} from '../reusable/NeonText';


// ── TOOLTIP WRAPPER ──
const DisabledTooltip = ({ children, isDark }) => (
  <div className="relative group">
    {children}
    <div
      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 px-3 py-2 rounded-lg text-[10px] font-mono uppercase tracking-[0.12em] whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
      style={{
        backgroundColor: isDark ? "rgba(30,30,30,0.95)" : "rgba(240,240,240,0.97)",
        color: isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.5)",
        border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
        backdropFilter: "blur(8px)",
        boxShadow: isDark ? "0 4px 20px rgba(0,0,0,0.4)" : "0 4px 20px rgba(0,0,0,0.08)",
      }}
    >
      Not available for this project
      <div
        className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0"
        style={{
          borderLeft: "5px solid transparent",
          borderRight: "5px solid transparent",
          borderTop: `5px solid ${isDark ? "rgba(30,30,30,0.95)" : "rgba(240,240,240,0.97)"}`,
        }}
      />
    </div>
  </div>
);

// ── TECH BADGE ──
const TechBadge = ({ label, isDark }) => (
  <span
    className="px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-[0.14em] rounded-sm"
    style={{
      backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
      color: isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.5)",
      border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)"}`,
    }}
  >
    {label}
  </span>
);

// ── MAIN MODAL ──
const ProjectModal = ({ project, onClose }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const scrollRef = useRef(null);

  useEffect(() => {
    // ── 1. Stop Lenis + cancel RAF ──
    if (window.__lenisStop) {
      window.__lenisStop();
    } else {
      // Fallback kalau __lenisStop belum ada
      window.__lenis?.stop();
    }

    // ── 2. Lock body scroll (double insurance) ──
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow    = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    // ── 3. ESC to close ──
    const onKeyDown = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      // ── Resume Lenis + RAF ──
      if (window.__lenisStart) {
        window.__lenisStart();
      } else {
        window.__lenis?.start();
      }

      document.body.style.overflow    = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);

  if (!project) return null;

  const canDemo = project.viewDemo && project.demoURL;
  const canRepo = project.viewRepo && project.urlRepo;

  return (
    /*
      z-[10000] — di atas Navbar (z-[9999]) dan FullscreenMenu (z-[9990])
      Ini yang memastikan modal selalu tampil paling atas
    */
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-0 md:p-6 lg:p-10">

      {/* BACKDROP — pointer-events-none, tidak bisa diklik */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundColor: "rgba(0,0,0,0.80)", backdropFilter: "blur(6px)" }}
      />

      {/* MODAL PANEL */}
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full h-full md:h-auto md:max-h-[90vh] max-w-5xl flex flex-col md:rounded-2xl overflow-hidden shadow-2xl"
        style={{
          backgroundColor: isDark ? "#0e0e0e" : "#FAF9F6",
          border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
          color: isDark ? "#f0f0f0" : "#171717",
        }}
      >
        {/* STICKY HEADER — hanya category + year, tanpa tombol close */}
        <div
          className="sticky top-0 z-20 flex items-center px-6 md:px-10 py-4 border-b flex-shrink-0"
          style={{
            backgroundColor: isDark ? "rgba(14,14,14,0.92)" : "rgba(250,249,246,0.92)",
            borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div className="flex items-center gap-3">
            <span
              className="text-[9px] font-mono font-bold uppercase tracking-[0.22em]"
              style={{ color: isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)" }}
            >
              {project.category}
            </span>
            <span style={{ color: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)" }}>·</span>
            <span
              className="text-[9px] font-mono font-bold uppercase tracking-[0.22em]"
              style={{ color: isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)" }}
            >
              {project.year}
            </span>
          </div>
        </div>

        {/* SCROLLABLE BODY — hanya area ini yang bisa di-scroll */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto overscroll-contain"
          // Pastikan scroll hanya di dalam modal
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          {/* Hero title + summary */}
          <div className="px-6 md:px-10 pt-8 md:pt-12 pb-8 text-center flex flex-col items-center">
            <h2
              className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[0.9] mb-4"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {project.title.split(' ').map((word, i, arr) => 
                i === arr.length - 1 ? (
                  <NeonText key={i} text={word} />
                ) : (
                  <span key={i}>{word} </span>
                )
              )}
            </h2>
            <p
              className="text-sm md:text-base leading-relaxed max-w-2xl"
              style={{ color: isDark ? "#94a3b8" : "#525252", fontFamily: "'Inter', sans-serif" }}
            >
              {project.summary}
            </p>
          </div>

          {/* Hero image */}
          <div className="px-6 md:px-10 pb-10">
            <div
              className="w-full rounded-xl overflow-hidden border"
              style={{
                aspectRatio: "16/9",
                borderColor: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)",
                backgroundColor: isDark ? "#0a0a0a" : "#f1f5f9",
              }}
            >
              <img
                src={project.heroImage || project.thumbnail}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Key Features + Outcome grid */}
          <div className="px-6 md:px-10 pb-10">
            <div
              className="border-t pt-8 md:pt-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16"
              style={{ borderColor: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)" }}
            >
              {/* Key Features */}
              <div className="flex flex-col gap-5">
                <h4
                  className="text-[9px] font-mono font-bold uppercase tracking-[0.25em] flex items-center gap-3"
                  style={{ color: isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)" }}
                >
                  <span className="w-6 h-px" style={{ backgroundColor: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)" }} />
                  Key Features
                </h4>
                <ul className="flex flex-col gap-3.5">
                  {project.keyFeatures?.map((feat, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm leading-relaxed">
                      <span
                        className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: isDark ? "#C8FF00" : "#2563EB" }}
                      />
                      <span style={{ color: isDark ? "#94a3b8" : "#525252", fontFamily: "'Inter', sans-serif" }}>
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Outcome & Impact */}
              <div className="flex flex-col gap-5">
                <h4
                  className="text-[9px] font-mono font-bold uppercase tracking-[0.25em] flex items-center gap-3"
                  style={{ color: isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)" }}
                >
                  <span className="w-6 h-px" style={{ backgroundColor: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)" }} />
                  Outcome & Impact
                </h4>
                <ul className="flex flex-col gap-3.5">
                  {project.outComeImpact?.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm leading-relaxed">
                      <span
                        className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: isDark ? "#C8FF00" : "#2563EB" }}
                      />
                      <span style={{ color: isDark ? "#94a3b8" : "#525252", fontFamily: "'Inter', sans-serif" }}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Tech Stack */}
            <div
              className="mt-8 md:mt-10 pt-8 border-t"
              style={{ borderColor: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)" }}
            >
              <h4
                className="text-[9px] font-mono font-bold uppercase tracking-[0.25em] flex items-center gap-3 mb-4"
                style={{ color: isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)" }}
              >
                <span className="w-6 h-px" style={{ backgroundColor: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)" }} />
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tags?.map((tag) => (
                  <TechBadge key={tag} label={tag} isDark={isDark} />
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div
              className="mt-8 md:mt-10 pt-8 border-t flex flex-wrap items-center gap-3"
              style={{ borderColor: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)" }}
            >
              {/* Live Demo */}
              {canDemo ? (
                <a
                  href={project.demoURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-wider px-6 py-3.5 rounded-full transition-all duration-200 hover:scale-105"
                  style={{
                    backgroundColor: isDark ? "#C8FF00" : "#2563EB",
                    color: isDark ? "#050505" : "#ffffff",
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  <ExternalLink size={13} /> Live Demo
                </a>
              ) : (
                <DisabledTooltip isDark={isDark}>
                  <button
                    disabled
                    className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-wider px-6 py-3.5 rounded-full cursor-not-allowed select-none"
                    style={{
                      backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
                      color: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)",
                      border: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
                      fontFamily: "'Space Grotesk', sans-serif",
                    }}
                  >
                    <Lock size={12} /> Live Demo
                  </button>
                </DisabledTooltip>
              )}

              {/* View Repository */}
              {canRepo ? (
                <a
                  href={project.urlRepo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-wider px-6 py-3.5 rounded-full border transition-all duration-200 hover:scale-105"
                  style={{
                    borderColor: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)",
                    color: isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.65)",
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = isDark ? "#C8FF00" : "#2563EB";
                    e.currentTarget.style.color = isDark ? "#C8FF00" : "#2563EB";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)";
                    e.currentTarget.style.color = isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.65)";
                  }}
                >
                  <FiGithub size={13} /> View Repository
                </a>
              ) : (
                <DisabledTooltip isDark={isDark}>
                  <button
                    disabled
                    className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-wider px-6 py-3.5 rounded-full cursor-not-allowed select-none border"
                    style={{
                      borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
                      color: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)",
                      fontFamily: "'Space Grotesk', sans-serif",
                    }}
                  >
                    <Lock size={12} /> View Repository
                  </button>
                </DisabledTooltip>
              )}

              {/* Close — full width, paling bawah */}
              <button
                onClick={onClose}
                className="w-full flex items-center justify-center gap-2 text-[10px] font-mono font-bold uppercase tracking-wider px-6 py-4 rounded-full border transition-all duration-300 mt-2"
                style={{
                  borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
                  color: isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)",
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)";
                  e.currentTarget.style.color = isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.55)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)";
                }}
              >
                <X size={13} /> Close this project
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// ── WRAPPER ──
const ProjectModalWrapper = ({ project, onClose }) => (
  <AnimatePresence>
    {project && (
      <ProjectModal project={project} onClose={onClose} />
    )}
  </AnimatePresence>
);

export default ProjectModalWrapper;