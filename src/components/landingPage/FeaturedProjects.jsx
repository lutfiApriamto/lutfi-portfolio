import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, ArrowRight } from 'lucide-react';
import { FiGithub } from 'react-icons/fi';
import BorderGlow from './BorderGlow';
import { useTheme } from "../../context/ThemeContext";
import { Link } from 'react-router-dom';
import { projectDataHome } from '@/lib/const';

const ProjectCard = ({ project, isDark, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Menentukan warna background frame box berdasarkan tema & mode gelap/terang
  const getBgColor = () => {
    if (project.themeColor === 'green') {
      return isDark ? "#00ff2f" : "#26fc4d"; // Hijau pekat studio vs Hijau soft pastel
    }
    return isDark ? "#45cdff" : "#1c55ff"; // Biru slate gelap vs Biru soft pastel
  };

  return (
    <motion.div
      onClick={onClick}
      className="cursor-pointer w-full flex flex-col group"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* ── INTERFACES CONTAINER BINGKAI (MENGGUNAKAN BORDERGLOW LU) ── */}
      <BorderGlow
        edgeSensitivity={38}
        glowColor={isDark ? "75 100 50" : "220 90 50"}
        backgroundColor={getBgColor()} // Menggunakan background warna bertema dinamis
        borderRadius={28}
        glowRadius={isDark ? 45 : 35}
        glowIntensity={isDark ? 1.8 : 1.3}
        colors={isDark ? ['#C8FF00', '#00F0FF', '#7000FF'] : ['#2563EB', '#38bdf8', '#ec4899']}
        animated={true}
        infiniteGlow={true}
        className="w-full lg:h-[65vh] h-[35vh]" // Sizing disesuaikan agar proporsi layar pas
      >
        <div
          className="relative w-full h-full overflow-hidden rounded-[27px] p-6 sm:p-8 md:p-12 flex items-center justify-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Inner Image Wrapper (Efek Bezel Layar Gadget) */}
          <div
            className="w-full h-full overflow-hidden rounded-xl shadow-xl border"
            style={{
              borderColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
            }}
          >
            <img 
              src={project.imgurl} 
              alt={project.title}
              className="w-full h-full object-fill"
              style={{
                transform: isHovered ? "scale(1.04)" : "scale(1)",
                transition: "transform 0.6s ease",
              }}
            />
          </div>

          {/* Minimal Hover Overlay (Hanya memunculkan tombol View Details secara clean) */}
          <div
            className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] rounded-[27px]"
            style={{
              opacity: isHovered ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
          >
            <button
              className="flex items-center gap-2 px-6 py-3 rounded-full font-mono text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(0,0,0,0.5)]"
              style={{
                backgroundColor: isDark ? "#C8FF00" : "#2563EB",
                color: isDark ? "#050505" : "#ffffff",
                transform: isHovered ? "translateY(0)" : "translateY(24px)",
                transition: "transform 0.5s ease 0.07s",
              }}
            >
              View Details
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </BorderGlow>

      {/* ── METADATA KONTEN DI LUAR BOX (Persis Seperti image_e4b3a8.jpg) ── */}
      <div className="mt-4 flex justify-between items-start px-1">
        <div className="space-y-1">
          <h3 className="text-xl md:text-2xl font-bold tracking-tight">
            {project.title}
          </h3>
          <p className="text-xs font-mono uppercase tracking-widest opacity-50">
            {project.category}
          </p>
        </div>

        {/* Badge Tahun */}
        <div 
          className="text-xs font-mono px-3 py-1 border rounded-full opacity-50 whitespace-nowrap"
          style={{ borderColor: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)" }}
        >
          {project.year}
        </div>
      </div>
    </motion.div>
  );
};

const FeaturedProjects = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [selectedProject, setSelectedProject] = useState(null);

  const headerRef = useRef(null);
  const { scrollYProgress: headerScroll } = useScroll({
    target: headerRef,
    offset: ["start end", "end start"]
  });
  const headerOpacity = useTransform(headerScroll, [0, 0.25, 0.5, 0.75], [0, 1, 1, 0]);
  const headerY       = useTransform(headerScroll, [0, 0.25, 0.5, 0.75], [50, 0, 0, -50]);

  const containerVariants = {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.25 } }
  };
  const cardVariants = {
    hidden:  { opacity: 0, y: 60, filter: "blur(10px)" },
    visible: { opacity: 1, y: 0,  filter: "blur(0px)", transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section
      className="relative w-full py-24 px-6 md:px-12 lg:px-24 transition-colors duration-500 overflow-hidden"
      style={{ backgroundColor: isDark ? "#050505" : "#FAF9F6", color: isDark ? "#f0f0f0" : "#171717" }}
    >
      <div className="max-w-full mx-auto">

        {/* Header */}
        <motion.div
          ref={headerRef}
          style={{ opacity: headerOpacity, y: headerY }}
          className="mb-20 md:mb-32 text-center md:text-left"
        >
          <p className="text-xs font-mono uppercase tracking-widest opacity-60 mb-2">Selected Work</p>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight">
            Featured <span style={{ color: isDark ? "#C8FF00" : "#2563EB" }}>Projects</span>
          </h2>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
          // Diubah sedikit dari gap-10 ke gap-y-20 agar teks ke card bawahnya memiliki ruang bernapas yang ideal
          className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-20 md:gap-x-16 md:gap-y-24"
        >
          {projectDataHome.map((project) => (
            <motion.div key={project.id} variants={cardVariants}>
              <ProjectCard
                project={project}
                isDark={isDark}
                onClick={() => setSelectedProject(project)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Explore More Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center mt-20 md:mt-28"
        >
          <Link
            to={'/projects'}
            className="group relative flex items-center gap-3 px-8 py-4 md:px-10 md:py-5 font-mono text-xs md:text-sm font-bold uppercase tracking-[0.2em] overflow-hidden transition-all duration-500"
            style={{
              border: `1.5px solid ${isDark ? "rgba(200,255,0,0.4)" : "rgba(37,99,235,0.4)"}`,
              color: isDark ? "#C8FF00" : "#2563EB",
              borderRadius: "2px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = isDark ? "#C8FF00" : "#2563EB";
              e.currentTarget.style.boxShadow = isDark
                ? "0 0 24px rgba(200,255,0,0.3), inset 0 0 24px rgba(200,255,0,0.06)"
                : "0 0 24px rgba(37,99,235,0.25), inset 0 0 24px rgba(37,99,235,0.06)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = isDark ? "rgba(200,255,0,0.4)" : "rgba(37,99,235,0.4)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <span
              className="absolute inset-0 -z-10 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] -translate-x-full group-hover:translate-x-0"
              style={{ backgroundColor: isDark ? "rgba(200,255,0,0.07)" : "rgba(37,99,235,0.06)" }}
            />

            <span className="relative z-10 transition-colors duration-300"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Explore More Projects
            </span>

            <span className="relative z-10 flex items-center overflow-hidden w-5 h-5">
              <svg
                className="absolute transition-all duration-300 ease-out group-hover:translate-x-6 group-hover:opacity-0"
                width="16" height="16" viewBox="0 0 16 16" fill="none"
              >
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <svg
                className="absolute transition-all duration-300 ease-out -translate-x-6 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                width="16" height="16" viewBox="0 0 16 16" fill="none"
              >
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>

            <span className="absolute top-0 left-0 w-2 h-2 border-t border-l transition-all duration-300 group-hover:w-3 group-hover:h-3"
              style={{ borderColor: isDark ? "#C8FF00" : "#2563EB" }}
            />
            <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r transition-all duration-300 group-hover:w-3 group-hover:h-3"
              style={{ borderColor: isDark ? "#C8FF00" : "#2563EB" }}
            />
          </Link>
        </motion.div>
      </div>

      {/* Modal Detail */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-md">
            <div className="absolute inset-0 cursor-pointer" onClick={() => setSelectedProject(null)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1,    y: 0  }}
              exit={{    opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl rounded-[32px] overflow-hidden z-10 shadow-2xl border flex flex-col max-h-[90vh]"
              style={{
                backgroundColor: isDark ? "#121212" : "#ffffff",
                borderColor:     isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
                color:           isDark ? "#f0f0f0" : "#171717",
              }}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 p-2 rounded-full border transition-transform hover:scale-110 z-20 backdrop-blur-sm"
                style={{
                  backgroundColor: isDark ? "rgba(20,20,20,0.8)" : "rgba(241,245,249,0.8)",
                  borderColor:     isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
                }}
              >
                <X size={18} />
              </button>

              <div className="p-8 md:p-12 overflow-y-auto space-y-8">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest opacity-60">{selectedProject.category}</span>
                  <h3 className="text-3xl md:text-5xl font-black tracking-tight mt-2 mb-6">{selectedProject.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs font-mono px-4 py-1.5 rounded-full font-bold shadow-sm"
                        style={{
                          backgroundColor: isDark ? "rgba(200,255,0,0.1)"  : "rgba(37,99,235,0.1)",
                          color:           isDark ? "#C8FF00"               : "#2563EB",
                          border: `1px solid ${isDark ? "rgba(200,255,0,0.2)" : "rgba(37,99,235,0.2)"}`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* ── GAMBAR DETAIL DI DALAM MODAL ── */}
                <div
                  className="w-full h-[30vh] md:h-[45vh] rounded-3xl overflow-hidden border"
                  style={{
                    backgroundColor: isDark ? "#0a0a0a" : "#f8fafc",
                    borderColor:     isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
                  }}
                >
                  <img 
                    src={selectedProject.imgurl} 
                    alt={selectedProject.title} 
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-4">
                  <h4 className="font-mono text-xs uppercase tracking-widest opacity-60">Project Highlights</h4>
                  <ul className="space-y-4 text-sm md:text-base leading-relaxed list-none pl-1">
                    {selectedProject.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-4">
                        <span className="mt-2.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: isDark ? "#C8FF00" : "#2563EB" }} />
                        <span className="opacity-90">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  className="flex items-center gap-4 pt-6 border-t"
                  style={{ borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)" }}
                >
                  <button
                    className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider px-6 py-4 rounded-full font-bold hover:scale-105 transition-transform"
                    style={{
                      backgroundColor: isDark ? "#ffffff" : "#171717",
                      color:           isDark ? "#050505" : "#ffffff",
                    }}
                  >
                    <ExternalLink size={16} /> Live Demo
                  </button>
                  <button
                    className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider px-6 py-4 rounded-full border font-bold transition-colors"
                    style={{
                      borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
                      color:       isDark ? "#ffffff" : "#171717",
                    }}
                  >
                    <FiGithub size={16} /> Source Code
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default FeaturedProjects;