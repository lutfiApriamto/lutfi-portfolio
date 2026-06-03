import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView, useSpring } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";

const Counter = ({ value, suffix = "", isInView }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = parseInt(value);
    const duration = 1800;
    const step = Math.ceil(end / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, value]);
  return <>{count}{suffix}</>;
};

const StatCard = ({ value, suffix, label, delay, isInView, isDark }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    className="flex flex-col items-center md:items-start gap-1 px-6 py-5 rounded-sm border transition-colors duration-500"
    style={{
      borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
      backgroundColor: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
    }}
  >
    <span
      className="text-4xl md:text-5xl font-black tabular-nums leading-none"
      style={{
        fontFamily: "'Space Grotesk', sans-serif",
        color: isDark ? "#C8FF00" : "#2563EB",
      }}
    >
      <Counter value={value} suffix={suffix} isInView={isInView} />
    </span>
    <span
      className="text-xs font-bold uppercase tracking-[0.18em] mt-1"
      style={{
        fontFamily: "'Space Grotesk', sans-serif",
        color: isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)",
      }}
    >
      {label}
    </span>
  </motion.div>
);

const SkillTag = ({ label, delay, isInView, isDark }) => (
  <motion.span
    initial={{ opacity: 0, scale: 0.88 }}
    animate={isInView ? { opacity: 1, scale: 1 } : {}}
    transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    className="inline-flex items-center px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] rounded-sm border transition-colors duration-500"
    style={{
      fontFamily: "'Space Grotesk', sans-serif",
      borderColor: isDark ? "rgba(200,255,0,0.18)" : "rgba(37,99,235,0.18)",
      backgroundColor: isDark ? "rgba(200,255,0,0.05)" : "rgba(37,99,235,0.04)",
      color: isDark ? "rgba(200,255,0,0.8)" : "rgba(37,99,235,0.8)",
    }}
  >
    {label}
  </motion.span>
);

const AboutSection = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const navigate = useNavigate();

  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const orb1Y = useTransform(scrollYProgress, [0, 1], ["20%", "-25%"]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], ["-10%", "40%"]);
  const orb3Y = useTransform(scrollYProgress, [0, 1], ["10%", "-20%"]);

  const gridY = useTransform(scrollYProgress, [0, 1], ["0px", "40px"]);
  const smoothGridY = useSpring(gridY, { stiffness: 60, damping: 20 });

  // Content parallax (subtle upward drift)
  const contentY = useTransform(scrollYProgress, [0, 1], ["30px", "-30px"]);
  const smoothContentY = useSpring(contentY, { stiffness: 80, damping: 25 });

  // InView untuk trigger animasi
  const isInView = useInView(contentRef, { once: true, margin: "-100px" });

  const skills = [
    "React.js", "Next.js", "Node.js", "Express.js",
    "MongoDB", "JavaScript", "Tailwind CSS", "Chakra UI",
    "Zustand", "REST API", "Git", "Figma",
  ];

  const stats = [
    { value: "8", suffix: "+", label: "Projects Shipped" },
    { value: "3", suffix: "+", label: "Years Building" },
    { value: "10", suffix: "+", label: "Tech Mastered" },
    { value: "2", suffix: "×", label: "IP Rights Acquired" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden py-28 md:py-40 transition-colors duration-500"
      style={{
        backgroundColor: isDark ? "#050505" : "#FAF9F6",
        color: isDark ? "#f0f0f0" : "#171717",
      }}
    >
      {/* ── INJECTED KEYFRAMES ── */}
      <style>{`
        @keyframes about-orb-a {
          0%, 100% { transform: translate(-50%, -50%) translate(0px, 0px) scale(1); }
          40% { transform: translate(-50%, -50%) translate(25px, -35px) scale(1.06); }
          70% { transform: translate(-50%, -50%) translate(-15px, 15px) scale(0.96); }
        }
        @keyframes about-orb-b {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(-30px, 30px) scale(1.1); }
        }
        @keyframes about-grid-drift {
          0% { background-position: 0 0; }
          100% { background-position: 40px 40px; }
        }
      `}</style>

      {/* ── PARALLAX BACKGROUND ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">

        {/* Moving grid */}
        <motion.div
          className="absolute inset-0"
          style={{ y: smoothGridY }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: isDark
                ? "linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)"
                : "linear-gradient(to right, rgba(0,0,0,0.025) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.025) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
              animation: "about-grid-drift 18s linear infinite",
            }}
          />
          {/* Cross pattern */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cpath d='M40 38v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z' fill='%23000000' fill-rule='nonzero'/%3E%3C/g%3E%3C/svg%3E")`,
              filter: isDark ? "invert(1) opacity(0.03)" : "invert(0) opacity(0.04)",
            }}
          />
        </motion.div>

        {/* Orb 1 — center-left, lime/blue */}
        <motion.div
          className="absolute rounded-full"
          style={{
            y: orb1Y,
            top: "40%",
            left: "20%",
            width: "50vw",
            height: "50vw",
            maxWidth: 640,
            maxHeight: 640,
            backgroundColor: isDark ? "rgba(200, 255, 0, 0.05)" : "rgba(163, 230, 53, 0.10)",
            filter: "blur(100px)",
            willChange: "transform",
            animation: "about-orb-a 13s ease-in-out infinite",
          }}
        />

        {/* Orb 2 — top-right */}
        <motion.div
          className="absolute rounded-full"
          style={{
            y: orb2Y,
            top: "10%",
            right: "10%",
            width: "35vw",
            height: "35vw",
            maxWidth: 480,
            maxHeight: 480,
            backgroundColor: isDark ? "rgba(0, 242, 254, 0.025)" : "rgba(59, 130, 246, 0.06)",
            filter: "blur(90px)",
            willChange: "transform",
            animation: "about-orb-b 16s 2s ease-in-out infinite",
          }}
        />

        {/* Orb 3 — bottom-right */}
        <motion.div
          className="absolute rounded-full"
          style={{
            y: orb3Y,
            bottom: "5%",
            right: "25%",
            width: "30vw",
            height: "30vw",
            maxWidth: 400,
            maxHeight: 400,
            backgroundColor: isDark ? "rgba(163, 230, 53, 0.03)" : "rgba(234, 179, 8, 0.04)",
            filter: "blur(110px)",
            willChange: "transform",
          }}
        />

        {/* Concentric rings */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full border transition-colors duration-500"
          style={{ borderColor: isDark ? "rgba(200,255,0,0.025)" : "rgba(59,130,246,0.04)" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55vw] h-[55vw] max-w-[560px] max-h-[560px] rounded-full border transition-colors duration-500"
          style={{ borderColor: isDark ? "rgba(200,255,0,0.02)" : "rgba(59,130,246,0.025)" }}
        />

        {/* Top separator fade */}
        <div
          className="absolute inset-x-0 top-0 h-32 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to bottom, ${isDark ? "#050505" : "#FAF9F6"}, transparent)`,
          }}
        />
        {/* Bottom separator fade */}
        <div
          className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to top, ${isDark ? "#050505" : "#FAF9F6"}, transparent)`,
          }}
        />
      </div>

      {/* ── MAIN CONTENT ── */}
      <motion.div
        ref={contentRef}
        style={{ y: smoothContentY }}
        className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col items-start gap-16"
      >
        {/* ── SECTION LABEL ── */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-4"
        >
          <div
            className="w-8 h-[2px] transition-colors duration-500"
            style={{ backgroundColor: isDark ? "#C8FF00" : "#2563EB" }}
          />
          <span
            className="text-[10px] font-bold uppercase tracking-[0.3em] transition-colors duration-500"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              color: isDark ? "#C8FF00" : "#2563EB",
            }}
          >
            About
          </span>
        </motion.div>

        {/* ── HEADLINE ── */}
        <div className="flex flex-col gap-3 w-full">
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              animate={isInView ? { y: "0%" } : {}}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(2.8rem,8vw,6rem)] font-black uppercase tracking-tight leading-[0.9]"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                color: isDark ? "#ffffff" : "#171717",
              }}
            >
              BUILDER BY
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              animate={isInView ? { y: "0%" } : {}}
              transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(2.8rem,8vw,6rem)] font-black uppercase tracking-tight leading-[0.9]"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                WebkitTextStroke: isDark ? "1.5px rgba(255,255,255,0.15)" : "1.5px rgba(0,0,0,0.15)",
                color: "transparent",
              }}
            >
              NATURE.
            </motion.h2>
          </div>
        </div>

        {/* ── BODY + TAGS ── */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">

          {/* LEFT — Bio */}
          <div className="flex flex-col gap-6">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-base md:text-lg leading-relaxed"
              style={{
                fontFamily: "'Inter', sans-serif",
                color: isDark ? "#94a3b8" : "#525252",
              }}
            >
              Saya adalah{" "}
              <span style={{ color: isDark ? "#ffffff" : "#171717", fontWeight: 600 }}>
                Muhammad Lutfi Apriamto
              </span>
              , seorang Full-Stack Web Developer lulusan Ilmu Komputer Universitas Gunadarma dengan IPK 3.71. Saat ini saya sedang menjalani internship sebagai{" "}
              <span style={{ color: isDark ? "#C8FF00" : "#2563EB", fontWeight: 600 }}>
                Frontend Engineer di ParagonCorp
              </span>
              , berkontribusi pada sistem manufacturing execution berbasis React.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="text-base md:text-lg leading-relaxed"
              style={{
                fontFamily: "'Inter', sans-serif",
                color: isDark ? "#94a3b8" : "#525252",
              }}
            >
              Spesialisasi saya ada di{" "}
              <span style={{ color: isDark ? "#ffffff" : "#171717", fontWeight: 500 }}>
                MERN stack
              </span>{" "}
              — dari merancang arsitektur backend yang scalable, hingga membangun antarmuka yang responsif dan performan. Saya percaya kode yang baik bukan hanya yang berjalan, tapi yang mudah dipahami dan dikembangkan.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="mt-2"
            >
              <button
                onClick={() => navigate("/about")}
                className="group flex items-center gap-2 px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer rounded-sm"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  backgroundColor: isDark ? "#ffffff" : "#171717",
                  color: isDark ? "#050505" : "#ffffff",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = isDark ? "#C8FF00" : "#2563EB";
                  e.currentTarget.style.color = isDark ? "#050505" : "#ffffff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = isDark ? "#ffffff" : "#171717";
                  e.currentTarget.style.color = isDark ? "#050505" : "#ffffff";
                }}
              >
                Let's see who am i
                <FiArrowUpRight
                  size={15}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                />
              </button>
            </motion.div>
          </div>

          {/* RIGHT — Skills + Stats */}
          <div className="flex flex-col gap-8">

            {/* Skill tags */}
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="text-[10px] font-bold uppercase tracking-[0.25em] mb-4"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)",
                }}
              >
                Stack & Tools
              </motion.p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <SkillTag
                    key={skill}
                    label={skill}
                    delay={0.38 + i * 0.04}
                    isInView={isInView}
                    isDark={isDark}
                  />
                ))}
              </div>
            </div>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-px origin-left transition-colors duration-500"
              style={{ backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" }}
            />

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat, i) => (
                <StatCard
                  key={stat.label}
                  {...stat}
                  delay={0.55 + i * 0.1}
                  isInView={isInView}
                  isDark={isDark}
                />
              ))}
            </div>

          </div>
        </div>

        {/* ── BOTTOM ACCENT LINE ── */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-px origin-left transition-colors duration-500"
          style={{ backgroundColor: isDark ? "rgba(200,255,0,0.12)" : "rgba(37,99,235,0.1)" }}
        />
      </motion.div>
    </section>
  );
};

export default AboutSection;