import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useAnimation } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useTheme } from "../../context/ThemeContext";

// ── ANIMATION VARIANTS ──
const slideRightVariants = {
  hidden: { 
    opacity: 0, 
    x: -50, 
    filter: "blur(12px)" 
  },
  visible: { 
    opacity: 1, 
    x: 0, 
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  },
  exit: {
    opacity: 0,
    x: -30,
    filter: "blur(8px)",
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
};

const slideLeftVariants = {
  hidden: { 
    opacity: 0, 
    x: 50, 
    filter: "blur(12px)" 
  },
  visible: { 
    opacity: 1, 
    x: 0, 
    filter: "blur(0px)",
    transition: { duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }
  },
  exit: {
    opacity: 0,
    x: 30,
    filter: "blur(8px)",
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
};

const AboutPreview = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // ── Animation controls (untuk repeat) ──
  const leftControls = useAnimation();
  const rightControls = useAnimation();

  // ── IntersectionObserver: trigger setiap masuk & keluar ──
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.25 } // trigger saat 25% section terlihat
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // ── Setiap isVisible berubah, jalankan animasi yang sesuai ──
  useEffect(() => {
    if (isVisible) {
      leftControls.start("visible");
      rightControls.start("visible");
    } else {
      leftControls.start("exit");
      rightControls.start("exit");
    }
  }, [isVisible, leftControls, rightControls]);

  // ── Parallax background text ──
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const xTransform = useTransform(scrollYProgress, [0, 1], ["-5%", "15%"]);

  return (
    <section
      
      ref={containerRef}
      className="relative w-full py-24 md:py-32 overflow-hidden flex items-center justify-center transition-colors duration-500"
      style={{
        backgroundColor: isDark ? "#050505" : "#FAF9F6",
        color: isDark ? "#f0f0f0" : "#171717",
      }}
    >
      {/* ── BACKGROUND PARALLAX TEXT ── */}
      <motion.div
        className="absolute top-1/2 left-0 -translate-y-1/2 z-0 font-black tracking-tighter whitespace-nowrap pointer-events-none select-none"
        style={{
          x: xTransform,
          fontSize: "clamp(8rem, 25vw, 30rem)",
          color: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.04)",
          fontFamily: "'Space Grotesk', sans-serif",
        }}
      >
        LUTFI
      </motion.div>

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex flex-col md:flex-row items-start justify-between gap-12 md:gap-24">

        {/* SISI KIRI */}
        <motion.div
          variants={slideRightVariants}
          initial="hidden"
          animate={leftControls}
          className="flex-1 flex flex-col items-start w-full"
        >
          <span
            className="text-sm md:text-base italic mb-4 transition-colors duration-300"
            style={{ color: isDark ? "#94a3b8" : "#525252", fontFamily: "'Inter', sans-serif" }}
          >
            Who I Am
          </span>

          <h2
            className="text-6xl md:text-7xl font-black uppercase leading-[0.9] tracking-tight mb-2"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            I'm <br />
            <span style={{ color: isDark ? "#ffffff" : "#171717" }}>LUTFI</span>
          </h2>

          <h3
            className="text-lg md:text-2xl font-bold uppercase tracking-widest mb-10"
            style={{
              color: isDark ? "#C8FF00" : "#3B82F6",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            Fullstack Web Developer
          </h3>

          <button
            onClick={() => navigate('/about')}
            className="group flex items-center gap-2 px-8 py-4 rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-xl"
            style={{
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
            <ArrowUpRight
              size={18}
              className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200"
            />
          </button>
        </motion.div>

        {/* SISI KANAN */}
        <motion.div
          variants={slideLeftVariants}
          initial="hidden"
          animate={rightControls}
          className="flex-1 w-full flex flex-col justify-center mt-6 md:mt-0"
        >
          <p
          id="about-section"
            className="text-base md:text-lg leading-relaxed font-normal transition-colors duration-300 text-justify"
            style={{ color: isDark ? "#e2e8f0" : "#333333", fontFamily: "'Inter', sans-serif" }}
          >
            I'm a fresh
            graduate with a degree in Computer Science from Universitas Gunadarma. I am deeply
            passionate about web development, problem-solving, and continuously exploring the latest
            technology trends.
            <br /><br />
            I specialize in architecting dynamic, scalable, and interactive digital ecosystems. I
            have robust experience with modern technologies, particularly focusing on the{" "}
            <span
              className="font-semibold transition-colors duration-300"
              style={{ color: isDark ? "#C8FF00" : "#3B82F6" }}
            >
              MERN stack
            </span>{" "}
            among others. Let's connect and collaborate on building something extraordinary together!
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default AboutPreview;