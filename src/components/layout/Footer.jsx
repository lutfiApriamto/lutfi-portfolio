import { motion } from "framer-motion";
import { Mail, ArrowUpRight, MapPin } from "lucide-react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";

const Footer = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Fungsi untuk scroll smooth ke atas (Back to Top)
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Variasi Animasi Scroll Reveal (Staggered)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <footer
      className="w-full pt-24 pb-12 px-6 md:px-12 lg:px-24 border-t transition-colors duration-500 overflow-hidden"
      style={{
        backgroundColor: isDark ? "#050505" : "#FAF9F6",
        borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
        color: isDark ? "#f0f0f0" : "#171717",
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* ── BAGIAN ATAS: BIG CALL TO ACTION (CTA) ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-16 border-b"
          style={{ borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)" }}
        >
          <motion.div variants={itemVariants} className="max-w-xl">
            <span className="text-xs font-mono uppercase tracking-widest opacity-50 block mb-3">
              Have an idea?
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-none">
              Let's Build Something{" "}
              <span style={{ color: isDark ? "#C8FF00" : "#2563EB" }}>
                Extraordinary
              </span>
            </h2>
          </motion.div>

          {/* Tombol Kontak Utama */}
          <motion.div variants={itemVariants} className="flex items-start">
            <a
              href="mailto:lutfiapriamto12@gmail.com"
              className="group flex items-center gap-3 px-8 py-5 rounded-2xl border text-sm font-mono uppercase tracking-wider font-bold transition-all duration-300 hover:scale-105"
              style={{
                borderColor: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)",
                backgroundColor: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
              }}
            >
              Get In Touch
              <Mail
                size={16}
                className="transition-transform duration-300 group-hover:rotate-12"
                style={{ color: isDark ? "#C8FF00" : "#2563EB" }}
              />
            </a>
          </motion.div>
        </motion.div>

        {/* ── BAGIAN BAWAH: DIRECTORY, META INFO & COPYRIGHT ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-16 text-sm"
        >
          {/* Kolom 1: Profil & Status Ketersediaan */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-mono text-xs opacity-70">
                Available for Freelance & Full-time Roles
              </span>
            </div>
            <div className="flex items-center gap-2 opacity-60">
              <MapPin size={14} />
              <span className="font-sans">Bekasi, Indonesia</span>
            </div>
          </motion.div>

          {/* Kolom 2: Navigasi Internal Singkat */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap md:justify-center gap-x-8 gap-y-3 font-mono text-xs uppercase tracking-wider"
          >
            <a href="#about" className="opacity-60 hover:opacity-100 transition-opacity">
              About
            </a>
            <a href="#projects" className="opacity-60 hover:opacity-100 transition-opacity">
              Projects
            </a>
            <a href="#experience" className="opacity-60 hover:opacity-100 transition-opacity">
              Experience
            </a>
            <button
              onClick={scrollToTop}
              className="opacity-60 hover:opacity-100 transition-opacity flex items-center gap-1 text-left"
            >
              Back to Top <ArrowUpRight size={12} />
            </button>
          </motion.div>

          {/* Kolom 3: Social Media Links */}
          <motion.div
            variants={itemVariants}
            className="flex md:justify-end items-center gap-6"
          >
            <a
              href="https://github.com/lutfiApriamto"
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-full border transition-all duration-300 hover:-translate-y-1"
              style={{
                borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
                backgroundColor: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
              }}
            >
              <FiGithub size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/lutfi-apriamto-3a9383312/"
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-full border transition-all duration-300 hover:-translate-y-1"
              style={{
                borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
                backgroundColor: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
              }}
            >
              <FiLinkedin size={18} />
            </a>
          </motion.div>
        </motion.div>

        {/* ── FOOTNOTE / COPYRIGHT ── */}
        <div
          className="mt-16 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] tracking-widest uppercase opacity-40"
          style={{ borderColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)" }}
        >
          <p>© {new Date().getFullYear()} Lutfi Apriamto. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;