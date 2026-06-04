import React, { useRef, useEffect } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useAnimationFrame
} from 'framer-motion';
import { Network, Code2, Gauge, Rocket } from 'lucide-react';
import { useTheme } from "../../context/ThemeContext";

// --- DATA STEPS ---
const philosophySteps = [
  {
    id: 1,
    num: '01',
    title: 'Architecture',
    description: 'Planning scalable database structures, API routes, and component trees before writing a single line of code.',
    icon: <Network strokeWidth={2} className="w-6 h-6" />
  },
  {
    id: 2,
    num: '02',
    title: 'Development',
    description: 'Writing clean, modular, and maintainable code within the MERN stack ecosystem, prioritizing reusability.',
    icon: <Code2 strokeWidth={2} className="w-6 h-6" />
  },
  {
    id: 3,
    num: '03',
    title: 'Optimization',
    description: 'Refactoring state management, reducing render cycles, and ensuring the UI is highly responsive across devices.',
    icon: <Gauge strokeWidth={2} className="w-6 h-6" />
  },
  {
    id: 4,
    num: '04',
    title: 'Deployment',
    description: 'Implementing CI/CD pipelines, securing environments, and launching seamless web applications to production.',
    icon: <Rocket strokeWidth={2} className="w-6 h-6" />
  }
];

// --- HELPER WRAP ---
const wrap = (min, max, v) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

// --- PARALLAX TEXT ---
// POIN 4: baseVelocity dikecilkan drastis, smoothing lebih kuat
const ParallaxText = ({ children, baseVelocity = 1.5, stroke = false, isDark }) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const prevScrollY = useRef(0);
  const directionFactor = useRef(baseVelocity > 0 ? 1 : -1);

  // Track arah dari perubahan scrollY aktual, bukan velocity spring
  useEffect(() => {
    return scrollY.on("change", (latest) => {
      const diff = latest - prevScrollY.current;
      if (diff > 0) {
        // Scroll down → arah default
        directionFactor.current = baseVelocity > 0 ? 1 : -1;
      } else if (diff < 0) {
        // Scroll up → arah terbalik
        directionFactor.current = baseVelocity > 0 ? -1 : 1;
      }
      prevScrollY.current = latest;
    });
  }, [scrollY, baseVelocity]);

  useAnimationFrame((t, delta) => {
    const moveBy = directionFactor.current * Math.abs(baseVelocity) * (delta / 1000);
    baseX.set(baseX.get() + moveBy);
  });

  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  return (
    <div className="overflow-hidden m-0 whitespace-nowrap flex flex-nowrap">
      <motion.div className="flex whitespace-nowrap" style={{ x }}>
        {[1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className="block mr-12 text-[11vw] md:text-[9vw] font-black leading-none tracking-tighter"
            style={
              stroke
                ? {
                    WebkitTextFillColor: 'transparent',
                    WebkitTextStrokeWidth: '1.5px',
                    WebkitTextStrokeColor: isDark
                      ? 'rgba(255,255,255,0.07)'
                      : 'rgba(0,0,0,0.07)',
                  }
                : {
                    color: isDark
                      ? 'rgba(255,255,255,0.04)'
                      : 'rgba(0,0,0,0.04)',
                  }
            }
          >
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

// --- KOMPONEN UTAMA ---
const AboutPhilosophy = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section
      className="relative w-full py-24 px-6 md:px-12 lg:px-24 mx-auto overflow-hidden z-10 flex flex-col justify-center min-h-screen transition-colors duration-500"
      style={{
        backgroundColor: isDark ? "#050505" : "#FAF9F6",
        color: isDark ? "#f0f0f0" : "#171717",
      }}
    >

      {/* ── POIN 1 & 2: HEADER DI TENGAH dengan background text di belakangnya ── */}
      <div className="relative flex flex-col items-center text-center mb-20 md:mb-28 z-10">

        {/* POIN 2: Background scrolling text — tepat di belakang header, overlap ke bawah */}
        <div
          className="absolute pointer-events-none select-none overflow-hidden"
          style={{
            // Overlap ke bawah agar menyentuh area card
            top: '-10%',
            bottom: '-80px',
            left: '-6vw',
            right: '-6vw',
            display: 'flex',
            flexDirection: 'column',
            // POIN 2: gap antar baris diperkecil
            gap: '0px',
            justifyContent: 'center',
            zIndex: 0,
          }}
        >
          {/* POIN 3: Teks diganti lebih aesthetic */}
          <ParallaxText baseVelocity={1.5} isDark={isDark}>
            THINK · BUILD · SHIP · REPEAT ·
          </ParallaxText>
          <ParallaxText baseVelocity={-1.2} stroke isDark={isDark}>
            CLEAN CODE · BOLD IDEAS ·
          </ParallaxText>
        </div>

        {/* POIN 1: Label section */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 flex items-center gap-3"
        >
          <div
            className="h-px w-8 transition-colors duration-500"
            style={{ backgroundColor: isDark ? "#C8FF00" : "#2563EB" }}
          />
          <span
            className="text-[10px] md:text-xl font-bold uppercase tracking-[0.3em] transition-colors duration-500"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              color: isDark ? "#C8FF00" : "#2563EB",
            }}
          >
            Development Flow
          </span>
          <div
            className="h-px w-8 transition-colors duration-500"
            style={{ backgroundColor: isDark ? "#C8FF00" : "#2563EB" }}
          />
        </motion.div>

        {/* POIN 1: Headline di tengah */}

        <div className="overflow-hidden relative z-10 ">
          <motion.h2
            initial={{ y: "100%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.85, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              WebkitTextStroke: isDark ? "1.5px rgba(255,255,255,0.15)" : "1.5px rgba(0,0,0,0.15)",
              color: "transparent",
            }}
          >
            Philosophy
          </motion.h2>
        </div>

        {/* POIN 1: Deskripsi singkat */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 max-w-xl text-sm md:text-base leading-relaxed"
          style={{
            fontFamily: "'Inter', sans-serif",
            color: isDark ? "#94a3b8" : "#525252",
          }}
        >
          Every great product starts with a clear process. Here's how I approach building — from the first idea to the final deployment.
        </motion.p>
      </div>

      {/* ── GRID 4 KOLOM ── */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
      >
        {philosophySteps.map((step) => (
          <motion.div
            key={step.id}
            variants={cardVariants}
            className="group relative flex flex-col p-8 rounded-3xl backdrop-blur-md transition-all duration-500 hover:-translate-y-2"
            style={{
              // POIN 5: background card sesuai mode
              backgroundColor: isDark
                ? "rgba(20, 20, 20, 0.8)"
                : "rgba(255, 255, 255, 0.9)",
              border: `1px solid ${isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`,
              boxShadow: isDark
                ? "0 4px 24px rgba(0,0,0,0.3)"
                : "0 4px 24px rgba(0,0,0,0.06)",
            }}
            // POIN 5: hover border via onMouseEnter/Leave agar sesuai mode
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = isDark
                ? "rgba(200,255,0,0.3)"
                : "rgba(37,99,235,0.3)";
              e.currentTarget.style.boxShadow = isDark
                ? "0 20px 40px rgba(200,255,0,0.08)"
                : "0 20px 40px rgba(37,99,235,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = isDark
                ? "rgba(255,255,255,0.07)"
                : "rgba(0,0,0,0.07)";
              e.currentTarget.style.boxShadow = isDark
                ? "0 4px 24px rgba(0,0,0,0.3)"
                : "0 4px 24px rgba(0,0,0,0.06)";
            }}
          >
            {/* Icon */}
            <div className="mb-8">
              <div
                className="w-14 h-14 flex items-center justify-center rounded-2xl transition-colors duration-300 shadow-inner"
                style={{
                  backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
                  color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.4)",
                }}
                // POIN 5: icon hover sesuai mode
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = isDark ? "#C8FF00" : "#2563EB";
                  e.currentTarget.style.color = isDark ? "#050505" : "#ffffff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = isDark
                    ? "rgba(255,255,255,0.05)"
                    : "rgba(0,0,0,0.04)";
                  e.currentTarget.style.color = isDark
                    ? "rgba(255,255,255,0.5)"
                    : "rgba(0,0,0,0.4)";
                }}
              >
                {step.icon}
              </div>
            </div>

            {/* Nomor */}
            <div
              className="text-4xl font-black mb-2 transition-colors duration-300"
              style={{ color: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)" }}
            >
              {step.num}
            </div>

            {/* Judul */}
            <h3
              className="text-xl font-bold mb-3 transition-colors duration-500"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                color: isDark ? "#ffffff" : "#171717",
              }}
            >
              {step.title}
            </h3>

            {/* Deskripsi */}
            <p
              className="text-sm leading-relaxed transition-colors duration-500"
              style={{
                fontFamily: "'Inter', sans-serif",
                color: isDark ? "#94a3b8" : "#525252",
              }}
            >
              {step.description}
            </p>

            {/* POIN 5: Garis bawah dekoratif sesuai mode */}
            <div
              className="absolute bottom-0 left-8 right-8 h-[3px] rounded-t-full opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500"
              style={{
                background: isDark
                  ? "linear-gradient(to right, #C8FF00, #00F0FF)"
                  : "linear-gradient(to right, #2563EB, #38bdf8)",
              }}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default AboutPhilosophy;