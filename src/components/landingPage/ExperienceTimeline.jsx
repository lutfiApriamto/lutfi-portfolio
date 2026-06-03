import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useTheme } from "../../context/ThemeContext";

// ── DATA EXPERIENCES (full english) ──
const experiences = [
  {
    id: 1,
    role: "Software Engineer (Front-End) Intern",
    company: "Paragon Technology and Innovation (ParagonCorp)",
    period: "Nov 2025 - Present",
    logo: "/img/brand/paragon.png",
    details: [
      "Spearheaded the revamping and migration of core manufacturing features from legacy systems to a modern scalable platform using React.js, Zustand, Chakra UI, and TanStack.",
      "Optimized critical modules, performed bug fixes, and improved code maintainability through modular and reusable front-end components.",
      "Collaborated within a professional Git workflow alongside mentors and senior engineers through rigorous code reviews."
    ]
  },
  {
    id: 2,
    role: "Full Stack Engineer (Project Base)",
    company: "Community Service Institution, Gunadarma University",
    period: "Aug 2025 - Nov 2025",
    logo: "/img/brand/gunadarma.png",
    details: [
      "Delivered two full-stack web applications (E-commerce & Waste Management) using the MERN Stack and Vite.js/Tailwind CSS for community empowerment initiatives.",
      "Contributed to a 30% increase in sales reach for local ornamental fish businesses through an e-commerce platform.",
      "Built a waste bank digitalization system (Bank Sampah) used by 10+ branches in Rawa Panjang village."
    ]
  },
  {
    id: 3,
    role: "Laboratory Assistant",
    company: "Gunadarma Computerization Development Institute (LEPKOM)",
    period: "Sep 2024 - Nov 2025",
    logo: "/img/brand/lepkom.png",
    details: [
      "Instructed and mentored 3 classes of 60–90 students in intermediate-level programming focusing on Java, Go, and PHP.",
      "Designed digital learning materials and led an 8-person team as Field Coordinator for new assistant open recruitment.",
      "Developed a web-based candidate assessment application using the MERN stack to accelerate grade recapitulation."
    ]
  },
  {
    id: 4,
    role: "Full Stack Engineer",
    company: "Digital of Thinking",
    period: "Apr 2024 - Aug 2025",
    logo: "/img/brand/dot.png",
    details: [
      "Developed 8+ corporate and UMKM company profile websites using WordPress, measurably increasing online exposure and credibility.",
      "Built a scalable and user-friendly property transaction platform contributing to a measurable increase in property sales.",
      "Designed and deployed a full-stack distribution monitoring application (MERN) covering 10 schools, accelerating reporting efficiency."
    ]
  }
];

// ── PARALLAX MARQUEE ROWS CONFIG ──
const marqueeRows = [
  { text: "APRIAMTO'S WORLD", direction: 1,  speed: 60 },
  { text: "CREATIVE DESIGN",  direction: -1, speed: 50 },
  { text: "MODERN WEBSITE",   direction: 1,  speed: 70 },
  { text: "FULL STACK DEV",   direction: -1, speed: 55 },
  { text: "MERN ARCHITECT",   direction: 1,  speed: 65 },
];

// ── MARQUEE ROW with scroll-driven parallax ──
const MarqueeRow = ({ text, direction, speed, scrollYProgress, isDark, rowIndex, totalRows }) => {
  // Each row gets a different parallax range so they move at different speeds
  const start = rowIndex / totalRows;
  const end   = (rowIndex + 1) / totalRows;
  const xRange = direction > 0
    ? [`${-10 + rowIndex * 3}%`, `${5 + rowIndex * 2}%`]
    : [`${5 + rowIndex * 2}%`,  `${-10 + rowIndex * 3}%`];

  const x = useTransform(scrollYProgress, [0, 1], xRange);
  const repeated = Array(12).fill(text).join(` · `);

  return (
    <motion.div
      className="whitespace-nowrap font-black uppercase tracking-tighter leading-none select-none pointer-events-none"
      style={{
        x,
        fontSize: "clamp(3rem, 7vw, 8rem)",
        color: isDark ? "rgba(255,255,255,0.028)" : "rgba(0,0,0,0.035)",
        fontFamily: "'Space Grotesk', sans-serif",
        lineHeight: 1.05,
      }}
    >
      {repeated}
    </motion.div>
  );
};

// ── GLITCH CARD ──
const TimelineCard = ({ exp, index, isDark }) => {
  const cardRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center", "end start"]
  });

  // Opacity: fade in → solid → fade out (repeat on scroll)
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.75, 1], [0, 1, 1, 0]);
  // Subtle vertical parallax
  const yShift  = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const isEven = index % 2 === 0;

  return (
    <div ref={cardRef} className="relative w-full min-h-[60vh] flex items-center my-8 md:my-0">

      {/* Milestone dot */}
      <div
        className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-4 z-20 transition-colors duration-500"
        style={{
          backgroundColor: isDark ? "#050505" : "#FAF9F6",
          borderColor:     isDark ? "#C8FF00" : "#2563EB",
        }}
      />

      {/* Card wrapper */}
      <motion.div
        style={{ opacity, y: yShift }}
        className={`relative w-full md:w-[calc(50%-32px)] ml-12 md:ml-0 ${
          isEven ? "md:mr-auto md:text-right" : "md:ml-auto text-left"
        }`}
      >
        {/* ── GLITCH LAYERS ── */}
        {/* Red ghost */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none z-0"
          style={{
            backgroundColor: isDark ? "rgba(20,20,20,0.6)" : "rgba(255,255,255,0.8)",
          }}
          initial={{ x: 0, opacity: 0 }}
          whileInView={{
            x: [0, -6, 4, -3, 0],
            opacity: [0, 0.4, 0.2, 0.3, 0],
          }}
          transition={{ duration: 0.6, ease: "linear", times: [0, 0.2, 0.5, 0.8, 1] }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <div className="w-full h-full rounded-2xl" style={{ backgroundColor: "rgba(255,0,60,0.08)" }} />
        </motion.div>

        {/* Cyan ghost */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none z-0"
          initial={{ x: 0, opacity: 0 }}
          whileInView={{
            x: [0, 6, -4, 3, 0],
            opacity: [0, 0.4, 0.2, 0.3, 0],
          }}
          transition={{ duration: 0.6, ease: "linear", times: [0, 0.2, 0.5, 0.8, 1], delay: 0.05 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <div className="w-full h-full rounded-2xl" style={{ backgroundColor: "rgba(0,255,220,0.08)" }} />
        </motion.div>

        {/* ── MAIN CARD ── */}
        <motion.div
          className="relative z-10 p-6 md:p-8 rounded-2xl border transition-all duration-500 shadow-sm backdrop-blur-md"
          style={{
            backgroundColor: isDark ? "rgba(20,20,20,0.6)" : "rgba(255,255,255,0.8)",
            borderColor:     isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
          }}
          initial={{ opacity: 0, filter: "blur(10px) contrast(1.5) brightness(2)", x: isEven ? -40 : 40 }}
          whileInView={{ opacity: 1, filter: "blur(0px) contrast(1) brightness(1)", x: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: false, amount: 0.3 }}
        >
          {/* Header */}
          <div className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4 ${
            isEven ? "md:flex-row-reverse md:justify-start" : "justify-start"
          }`}>
            <img
              src={exp.logo}
              alt={exp.company}
              className="w-12 h-12 object-contain rounded-lg p-1 bg-white shadow-inner"
            />
            <div>
              <h4 className="text-xl font-bold tracking-tight" style={{ color: isDark ? "#ffffff" : "#171717" }}>
                {exp.role}
              </h4>
              <p className="text-sm font-semibold" style={{ color: isDark ? "#C8FF00" : "#2563EB" }}>
                {exp.company}
              </p>
              <span className="text-xs font-mono opacity-60 block mt-0.5">
                {exp.period}
              </span>
            </div>
          </div>

          {/* Details */}
          <ul className="space-y-2 text-sm text-left opacity-80 leading-relaxed list-none">
            {exp.details.map((detail, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span
                  className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: isDark ? "#C8FF00" : "#2563EB" }}
                />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </div>
  );
};

// ── MAIN COMPONENT ──
const ExperienceTimeline = () => {
  const containerRef = useRef(null);
  const headerRef    = useRef(null);
  const { theme }    = useTheme();
  const isDark       = theme === "dark";

  // Overall scroll for milestone line + marquee parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });
  const lineScaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  // Header scroll for fade-in / fade-out
  const { scrollYProgress: headerProgress } = useScroll({
    target: headerRef,
    offset: ["start end", "center center", "end start"],
  });
  const headerOpacity = useTransform(headerProgress, [0, 0.25, 0.65, 1], [0, 1, 1, 0]);
  const headerY       = useTransform(headerProgress, [0, 0.25, 0.65, 1], [40, 0, 0, -40]);
  const headerBlur    = useTransform(headerProgress, [0, 0.25, 0.65, 1], [
    "blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"
  ]);

  // Separate scroll progress for marquee (whole section)
  const { scrollYProgress: marqueeProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={containerRef}
      className="relative w-full py-24 px-6 md:px-12 lg:px-24 overflow-hidden transition-colors duration-500"
      style={{
        backgroundColor: isDark ? "#050505" : "#FAF9F6",
        color:           isDark ? "#f0f0f0" : "#171717",
      }}
    >
      {/* ── BACKGROUND MARQUEE WATERMARK ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex flex-col justify-around py-8">
        {marqueeRows.map((row, i) => (
          <MarqueeRow
            key={i}
            text={row.text}
            direction={row.direction}
            speed={row.speed}
            scrollYProgress={marqueeProgress}
            isDark={isDark}
            rowIndex={i}
            totalRows={marqueeRows.length}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── HEADER with scroll-driven fade in/out ── */}
        <motion.div
          ref={headerRef}
          style={{ opacity: headerOpacity, y: headerY, filter: headerBlur }}
          className="text-center md:text-left mb-20 md:mb-32"
        >
          <motion.p
            className="text-xs font-mono uppercase tracking-widest opacity-60 mb-2"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            My Journey
          </motion.p>
          <motion.h2
            className="text-4xl md:text-5xl font-black uppercase tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Professional{" "}
            <span style={{ color: isDark ? "#C8FF00" : "#2563EB" }}>Experience</span>
          </motion.h2>
        </motion.div>

        {/* ── TIMELINE GRID ── */}
        <div className="relative w-full">

          {/* Background line */}
          <div
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 z-0 opacity-20"
            style={{ backgroundColor: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)" }}
          />

          {/* Active scroll line */}
          <motion.div
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 z-10 origin-top"
            style={{
              scaleY:          lineScaleY,
              backgroundColor: isDark ? "#C8FF00" : "#2563EB",
            }}
          />

          {/* Cards */}
          <div className="flex flex-col w-full relative z-10">
            {experiences.map((exp, index) => (
              <TimelineCard key={exp.id} exp={exp} index={index} isDark={isDark} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceTimeline;