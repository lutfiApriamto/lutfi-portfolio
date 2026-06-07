import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from "../../context/ThemeContext";
import { ArrowUpRight } from 'lucide-react';
import { projectDataHome } from '@/lib/const';
import ProjectModalWrapper from './Projectmodal';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GlitchText } from '../reusable/NeonText';

gsap.registerPlugin(ScrollTrigger);

// ── DESKTOP PROJECT CARD ──
const DesktopCard = ({ project, index, isDark, onClick }) => {
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') onClick(); }}
      className="group relative flex-shrink-0 overflow-hidden cursor-pointer"
      style={{
        width: "clamp(500px, 50vw, 800px)",
        height: "clamp(420px, 65vh, 680px)",
        borderRadius: "4px",
        border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      {/* Image */}
      <div className="absolute inset-0 overflow-hidden"
        style={{ backgroundColor: isDark ? "#0a0a0a" : "#f1f5f9" }}
      >
        <img
          draggable="false"
          src={project.thumbnail}
          alt={project.title}
          loading={index === 0 ? "eager" : "lazy"}
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 will-change-transform"
          style={{
            opacity: isDark ? 0.8 : 0.9,
            filter: "grayscale(30%)",
            transition: "transform 1s ease, opacity 0.5s ease, filter 0.5s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = "1";
            e.currentTarget.style.filter = "grayscale(0%)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = isDark ? "0.8" : "0.9";
            e.currentTarget.style.filter = "grayscale(30%)";
          }}
        />
      </div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)",
        }}
      />

      {/* Number */}
      <div className="absolute top-0 right-0 p-6">
        <span
          className="font-mono text-5xl font-light tracking-[0.18em] transition-colors duration-500"
          style={{ color: "rgba(255,255,255,0.15)" }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Info panel — slide up on hover */}
      <div
        className="absolute bottom-0 left-0 right-0 p-8 flex flex-col justify-end transition-transform duration-500 ease-out"
        style={{ transform: "translateY(4px)" }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(4px)"; }}
      >
        <div className="flex items-end justify-between gap-4">
          <div className="flex-1 min-w-0">
            {/* Category */}
            <div className="flex items-center gap-2 mb-2">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: isDark ? "#C8FF00" : "#C8FF00" }}
              />
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-white/70">
                {project.category}
              </span>
            </div>
            {/* Title */}
            <h3
              className="text-2xl md:text-3xl font-black uppercase text-white tracking-tight leading-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {project.title}
            </h3>
            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {project.tags?.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-[8px] font-mono uppercase tracking-[0.1em] px-2 py-0.5 rounded"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.5)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* FAB */}
          <div
            className="w-12 h-12 flex items-center justify-center rounded-full flex-shrink-0 transition-all duration-300"
            style={{
              backgroundColor: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.18)",
              color: "white",
            }}
          >
            <ArrowUpRight
              size={20}
              strokeWidth={2}
              className="transition-transform duration-300 group-hover:rotate-45"
            />
          </div>
        </div>
      </div>

      {/* Hover border accent */}
      <div
        className="absolute inset-0 rounded-sm pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          border: `1px solid ${isDark ? "rgba(200,255,0,0.35)" : "rgba(200,255,0,0.35)"}`,
          boxShadow: "0 0 30px rgba(200,255,0,0.08)",
        }}
      />
    </div>
  );
};

// ── MOBILE CARD ──
const MobileCard = ({ project, index, isDark, onClick }) => (
  <div
    onClick={onClick}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => { if (e.key === 'Enter') onClick(); }}
    data-project-index={index}
    className="group relative flex-shrink-0 snap-center overflow-hidden cursor-pointer active:scale-[0.98] transition-transform"
    style={{
      width: "92vw",
      height: "50vh",
      borderRadius: "8px",
      border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}`,
      backgroundColor: isDark ? "#0a0a0a" : "#f1f5f9",
      WebkitTapHighlightColor: 'transparent',
    }}
  >
    <div className="absolute inset-0 overflow-hidden">
      <img
        draggable="false"
        src={project.thumbnail}
        alt={project.title}
        loading={index === 0 ? "eager" : "lazy"}
        decoding="async"
        className="w-full h-full object-cover"
        style={{ opacity: 0.75 }}
      />
    </div>
    <div className="absolute inset-0"
      style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)" }}
    />
    <div className="absolute top-4 right-4">
      <span className="font-mono text-3xl font-light text-white/15 tracking-wider">
        {String(index + 1).padStart(2, "0")}
      </span>
    </div>
    <div className="absolute bottom-0 left-0 right-0 p-5">
      <div className="flex items-center gap-2 mb-1.5">
        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#C8FF00" }} />
        <span className="text-[9px] font-mono font-bold uppercase tracking-[0.16em] text-white/65">
          {project.category}
        </span>
      </div>
      <h3
        className="text-xl font-black uppercase text-white tracking-tight leading-tight"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        {project.title}
      </h3>
      <div className="mt-2 flex items-center gap-1.5 text-white/50">
        <span className="font-mono text-[9px] uppercase tracking-[0.14em] font-bold">View Project</span>
        <ArrowUpRight size={12} strokeWidth={2.5} />
      </div>
    </div>
  </div>
);

// ── MAIN ──
const ProjectsHorizontalScroll = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [isPinned, setIsPinned] = useState(true); // desktop = pinned, mobile = native

  const sectionRef    = useRef(null);
  const trackRef      = useRef(null);
  const mobileRef     = useRef(null);
  const activeRef     = useRef(0);

  const TOTAL = projectDataHome.length;

  // ── Detect desktop vs mobile ──
  useEffect(() => {
    const update = () => {
      const isMobile = window.innerWidth < 1024;
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setIsPinned(!isMobile && !reduceMotion);
    };
    update();
    let t;
    const onResize = () => { clearTimeout(t); t = setTimeout(update, 200); };
    window.addEventListener('resize', onResize, { passive: true });
    return () => { window.removeEventListener('resize', onResize); clearTimeout(t); };
  }, []);

  // ── Calc maxScroll (desktop only) ──
  const calcMaxScroll = useCallback(() => {
    if (!isPinned) { setMaxScroll(0); return; }
    const section = sectionRef.current;
    const track   = trackRef.current;
    if (!section || !track) return;
    const sectionW = section.getBoundingClientRect().width;
    const total    = track.scrollWidth - sectionW;
    const next     = Math.max(0, total);
    setMaxScroll((prev) => prev === next ? prev : next);
  }, [isPinned]);

  useEffect(() => {
    calcMaxScroll();
    const t1 = setTimeout(calcMaxScroll, 250);
    const t2 = setTimeout(calcMaxScroll, 900);
    let resizeT;
    const onResize = () => {
      clearTimeout(resizeT);
      resizeT = setTimeout(() => { calcMaxScroll(); ScrollTrigger.refresh(); }, 150);
    };
    window.addEventListener('resize', onResize, { passive: true });
    if (window.visualViewport) window.visualViewport.addEventListener('resize', onResize);
    let ro;
    if (typeof ResizeObserver !== 'undefined' && trackRef.current) {
      let roT;
      ro = new ResizeObserver(() => {
        clearTimeout(roT);
        roT = setTimeout(() => { calcMaxScroll(); ScrollTrigger.refresh(); }, 100);
      });
      ro.observe(trackRef.current);
    }
    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(resizeT);
      window.removeEventListener('resize', onResize);
      if (window.visualViewport) window.visualViewport.removeEventListener('resize', onResize);
      if (ro) ro.disconnect();
    };
  }, [calcMaxScroll, isPinned]);

  // ── Mobile: track active card by scroll ──
  useEffect(() => {
    if (isPinned) return;
    const container = mobileRef.current;
    if (!container) return;
    const update = () => {
      const cards = container.querySelectorAll('[data-project-index]');
      if (!cards.length) return;
      const center = container.scrollLeft + container.clientWidth / 2;
      let closest = 0, minDist = Infinity;
      cards.forEach((card) => {
        const idx  = Number(card.getAttribute('data-project-index') || 0);
        const dist = Math.abs((card.offsetLeft + card.clientWidth / 2) - center);
        if (dist < minDist) { minDist = dist; closest = idx; }
      });
      if (closest !== activeRef.current) {
        activeRef.current = closest;
        setActiveIndex(closest);
      }
    };
    update();
    container.addEventListener('scroll', update, { passive: true });
    return () => container.removeEventListener('scroll', update);
  }, [isPinned]);

  // ── GSAP ScrollTrigger (desktop) ──
  useEffect(() => {
    if (!isPinned || maxScroll <= 0) return;
    const section = sectionRef.current;
    const track   = trackRef.current;
    if (!section || !track) return;

    gsap.set(track, { x: 0 });
    activeRef.current = 0;
    setActiveIndex(0);

    // Lenis proxy
    const lenis = window.__lenis || window.lenisInstance;
    let usingLenis = false;
    if (lenis && typeof lenis.scrollTo === 'function') {
      usingLenis = true;
      ScrollTrigger.scrollerProxy(document.documentElement, {
        scrollTop(value) {
          if (arguments.length) lenis.scrollTo(value, { immediate: true });
          return lenis.scroll;
        },
        getBoundingClientRect() {
          return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
      });
      ScrollTrigger.defaults({ scroller: document.documentElement });
    }

    const setX = gsap.quickSetter(track, 'x', 'px');
    // Estimasi lebar per card untuk active index
    const cardW = maxScroll / Math.max(1, TOTAL - 1);

    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${maxScroll}`,
        pin: true,
        scrub: true,
        anticipatePin: 0.5,
        fastScrollEnd: false,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const current = self.progress * maxScroll;
          setX(-current);
          const nextIdx = Math.max(0, Math.min(TOTAL - 1, Math.floor(current / cardW)));
          if (nextIdx !== activeRef.current) {
            activeRef.current = nextIdx;
            setActiveIndex(nextIdx);
          }
        },
      });
      window.addEventListener('load', () => ScrollTrigger.refresh());
      return () => { st.kill(); };
    }, section);

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
      if (usingLenis) {
        ScrollTrigger.scrollerProxy(document.documentElement, null);
        ScrollTrigger.defaults({ scroller: window });
      }
    };
  }, [isPinned, maxScroll, TOTAL]);

  // ── MOBILE LAYOUT ──
  if (!isPinned) {
    return (
      <>
        <section
          ref={sectionRef}
          className="relative py-14 pb-20 transition-colors duration-500"
          style={{ backgroundColor: isDark ? "#050505" : "#FAF9F6" }}
        >
          {/* Header */}
          <div className="px-6 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-[2px]" style={{ backgroundColor: isDark ? "#C8FF00" : "#2563EB" }} />
              <span
                className="text-[9px] font-mono font-bold uppercase tracking-[0.28em]"
                style={{ color: isDark ? "#C8FF00" : "#2563EB", fontFamily: "'Space Grotesk', sans-serif" }}
              >
                All Projects
              </span>
            </div>
            <h2
              className="text-4xl font-black uppercase leading-[0.92] tracking-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: isDark ? "#ffffff" : "#171717" }}
            >
              Scroll to
            </h2>
            <h2
              className="text-4xl font-black uppercase leading-[0.92] tracking-tight"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                WebkitTextStroke: isDark ? "1.5px rgba(255,255,255,0.18)" : "1.5px rgba(0,0,0,0.18)",
                color: "transparent",
              }}
            >
              Explore.
            </h2>
            <p
              className="mt-3 text-sm leading-relaxed max-w-sm"
              style={{ fontFamily: "'Inter', sans-serif", color: isDark ? "#94a3b8" : "#525252" }}
            >
              Swipe to explore all projects.
            </p>
          </div>

          {/* Counter + dots */}
          <div className="px-6 mb-5 flex items-center justify-between">
            <span
              className="font-mono text-[10px] uppercase tracking-[0.16em]"
              style={{ color: isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.25)" }}
            >
              {String(activeIndex + 1).padStart(2, '0')} / {String(TOTAL).padStart(2, '0')}
            </span>
            <div className="flex gap-1.5">
              {projectDataHome.map((_, i) => (
                <div
                  key={i}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === activeIndex ? "24px" : "6px",
                    height: "6px",
                    backgroundColor: i === activeIndex
                      ? isDark ? "#C8FF00" : "#2563EB"
                      : isDark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.15)",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Mobile scrollable strip */}
          <div
            ref={mobileRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-6 pb-4"
            style={{
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {projectDataHome.map((project, i) => (
              <MobileCard
                key={project.id}
                project={project}
                index={i}
                isDark={isDark}
                onClick={() => setSelectedProject(project)}
              />
            ))}
            <div className="flex-shrink-0 w-2" />
          </div>
        </section>

        <ProjectModalWrapper project={selectedProject} onClose={() => setSelectedProject(null)} />
      </>
    );
  }

  // ── DESKTOP LAYOUT ──
  return (
    <>
      <section
        ref={sectionRef}
        className="relative overflow-hidden transition-colors duration-500"
        style={{
          height: "100vh",
          backgroundColor: isDark ? "#050505" : "#FAF9F6",
        }}
      >
        {/* TOP BORDER */}
        <div
          className="absolute top-0 left-0 right-0 h-px z-10"
          style={{ backgroundColor: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)" }}
        />

        {/* Section header — absolute top */}
        <div className="absolute top-0 left-0 right-0 z-20 flex items-center gap-4 px-16 py-8 pointer-events-none">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: isDark ? "#C8FF00" : "#2563EB" }} />
          <span
            className="font-mono text-[10px] font-bold uppercase tracking-[0.26em]"
            style={{ color: isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)" }}
          >
            All Projects
          </span>
          <div
            className="flex-1 h-px"
            style={{ backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" }}
          />
          <span
            className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]"
            style={{ color: isDark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.18)" }}
          >
            scroll ↓
          </span>
        </div>

        {/* Horizontal track */}
        <div className="flex w-full h-full items-center overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-12 px-24"
            style={{ width: 'max-content' }}
          >
            {/* Intro panel */}
            <div
              className="flex flex-col justify-center flex-shrink-0"
              style={{ width: "clamp(300px, 32vw, 480px)", height: "clamp(380px, 60vh, 620px)" }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-6 h-[2px]" style={{ backgroundColor: isDark ? "#C8FF00" : "#2563EB" }} />
                <span
                  className="text-[9px] font-bold uppercase tracking-[0.3em]"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", color: isDark ? "#C8FF00" : "#2563EB" }}
                >
                  Portfolio
                </span>
              </div>
              <h2
                className="font-black uppercase leading-[0.88] tracking-tight"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "clamp(3rem, 6vw, 6rem)",
                  color: isDark ? "#ffffff" : "#171717",
                }}
              >
                Scroll<br />
                <span >
                  <GlitchText text="to Explore" isDark={isDark} />
                </span>
              </h2>
              <p
                className="mt-6 text-sm leading-relaxed max-w-xs"
                style={{ fontFamily: "'Inter', sans-serif", color: isDark ? "#94a3b8" : "#525252" }}
              >
                Every project here was built end-to-end with real impact in mind.
              </p>
              <ArrowUpRight
                size={48}
                strokeWidth={1.5}
                className="mt-8"
                style={{ color: isDark ? "#C8FF00" : "#2563EB" }}
              />
            </div>

            {/* Project cards */}
            {projectDataHome.map((project, i) => (
              <DesktopCard
                key={project.id}
                project={project}
                index={i}
                isDark={isDark}
                onClick={() => setSelectedProject(project)}
              />
            ))}

            {/* End spacer */}
            <div className="flex-shrink-0 w-[8vw]" />
          </div>
        </div>

        {/* Bottom indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {projectDataHome.map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === activeIndex ? "28px" : "6px",
                height: "6px",
                backgroundColor: i === activeIndex
                  ? isDark ? "#C8FF00" : "#2563EB"
                  : isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)",
              }}
            />
          ))}
        </div>
      </section>

      <ProjectModalWrapper project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  );
};

export default ProjectsHorizontalScroll;