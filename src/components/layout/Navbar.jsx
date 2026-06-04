import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { Link, useLocation } from "react-router-dom";
import { FiGithub, FiLinkedin, FiInstagram } from "react-icons/fi";

const menuItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Songs", href: "/songs" },
];

const socialLinks = [
  { 
    name: "github",
    icon: FiGithub, 
    url: "https://github.com/lutfiApriamto",
    hoverColorDark: "#ffffff",
    hoverColorLight: "#171515",
    glowDark: "rgba(255, 255, 255, 0.3)",
    glowLight: "rgba(23, 21, 21, 0.2)"
  },
  { 
    name: "linkedin",
    icon: FiLinkedin, 
    url: "https://www.linkedin.com/in/lutfi-apriamto-3a9383312/",
    hoverColorDark: "#0A66C2",
    hoverColorLight: "#0A66C2",
    glowDark: "rgba(10, 102, 194, 0.4)",
    glowLight: "rgba(10, 102, 194, 0.3)"
  },
  { 
    name: "instagram",
    icon: FiInstagram, 
    url: "https://www.instagram.com/lutfiamto/",
    hoverColorDark: "#E1306C", 
    hoverColorLight: "#E1306C",
    glowDark: "rgba(225, 48, 108, 0.4)",
    glowLight: "rgba(225, 48, 108, 0.3)"
  },
];

const premiumEase = [0.16, 1, 0.3, 1];

// ============================================
// COMPONENT: PREMIUM EXPAND BUTTON
// ============================================
const ExpandButton = ({ onClick, children, isDark, ariaLabel }) => {
  const [hovered, setHovered] = useState(false);

  const defaultBg = isDark ? "#050505" : "#ffffff";
  const hoverBg = isDark ? "#ffffff" : "#050505";
  const defaultIconColor = isDark ? "#ffffff" : "#050505";
  const hoverIconColor = isDark ? "#050505" : "#ffffff";
  const borderColor = isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)";

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileTap={{ scale: 0.95 }}
      aria-label={ariaLabel}
      className="relative flex items-center justify-center rounded-full overflow-hidden outline-none select-none"
      style={{
        width: 68,
        height: 68,
        background: defaultBg,
        border: `1px solid ${borderColor}`,
      }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: hovered ? 1.05 : 0 }}
        transition={{ duration: 0.6, ease: premiumEase }}
        className="absolute w-[101%] h-[101%] rounded-full pointer-events-none"
        style={{ background: hoverBg }}
      />
      <motion.div
        animate={{ color: hovered ? hoverIconColor : defaultIconColor }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="relative z-10 flex items-center justify-center w-full h-full"
      >
        {children}
      </motion.div>
    </motion.button>
  );
};

// ============================================
// COMPONENT: HAMBURGER BUTTON
// ============================================
const HamburgerButton = ({ isOpen, onClick, isDark }) => {
  return (
    <ExpandButton onClick={onClick} isDark={isDark} ariaLabel="Toggle Menu">
      <div className="flex flex-col items-center justify-center gap-1.25 w-full h-full relative">
        <motion.span
          animate={{
            y: isOpen ? 7 : 0,
            rotate: isOpen ? 45 : 0,
            width: isOpen ? "22px" : "24px"
          }}
          transition={{ duration: 0.5, ease: premiumEase }}
          className="h-0.5 rounded-full bg-current"
        />
        <motion.span
          animate={{
            opacity: isOpen ? 0 : 1,
            x: isOpen ? 8 : 0,
          }}
          transition={{ duration: 0.4, ease: premiumEase }}
          className="w-24px h-0.5 rounded-full bg-current"
          style={{ width: "24px" }}
        />
        <motion.span
          animate={{
            y: isOpen ? -7 : 0,
            rotate: isOpen ? -45 : 0,
            width: isOpen ? "22px" : "24px"
          }}
          transition={{ duration: 0.5, ease: premiumEase }}
          className="h-0.5 rounded-full bg-current"
        />
      </div>
    </ExpandButton>
  );
};

// ============================================
// COMPONENT: THEME TOGGLE
// ============================================
const ThemeToggle = ({ isDark, onToggle }) => {
  return (
    <ExpandButton onClick={onToggle} isDark={isDark} ariaLabel="Toggle Theme">
      <AnimatePresence mode="wait">
        {isDark ? (
          <motion.svg
            key="sun"
            initial={{ opacity: 0, rotate: -60, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 60, scale: 0.6 }}
            transition={{ duration: 0.4, ease: premiumEase }}
            width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </motion.svg>
        ) : (
          <motion.svg
            key="moon"
            initial={{ opacity: 0, rotate: 60, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -60, scale: 0.6 }}
            transition={{ duration: 0.4, ease: premiumEase }}
            width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </motion.svg>
        )}
      </AnimatePresence>
    </ExpandButton>
  );
};

const BrandLogo = ({ isDark }) => {
  return (
    <Link to="/" className="hidden md:block">
      <motion.div
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        className="group relative cursor-pointer select-none"
      >
        <span
          className="text-lg md:text-xl font-black tracking-[0.35em]"
          style={{
            color: isDark ? "#ffffff" : "#050505",
          }}
        >
          LUTFI
        </span>

        <motion.div
          className="absolute left-0 -bottom-1 h-[2px] w-full origin-left"
          style={{
            backgroundColor: isDark ? "#ffffff" : "#050505",
          }}
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.35 }}
        />
      </motion.div>
    </Link>
  );
};

// ============================================
// COMPONENT: FULLSCREEN MENU
// ============================================
const FullscreenMenu = ({ isOpen, onClose, isDark }) => {
  const location = useLocation();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [hoveredSocial, setHoveredSocial] = useState(null);

  const menuBgDark = "radial-gradient(circle at center, #1a1a1a 0%, #050505 100%)";
  const menuBgLight = "radial-gradient(circle at center, #ffffff 0%, #f0f0f0 100%)";
  
  const background = isDark ? menuBgDark : menuBgLight;
  const textColor = isDark ? "#FFFFFF" : "#0A0A0A";

  const menuVariants = {
    closed: { y: "-100%", transition: { duration: 0.7, ease: premiumEase } },
    open: { y: "0%", transition: { duration: 0.8, ease: premiumEase } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={menuVariants}
          initial="closed"
          animate="open"
          exit="closed"
          className="fixed inset-0 z-[9990] flex flex-col justify-center items-center"
          style={{ background, color: textColor }}
        >
          <nav className="flex flex-col items-center justify-center gap-4 md:gap-6 text-center select-none w-full">
            {menuItems.map((item, i) => {
              const isActive = location.pathname === item.href;
              const isAnyItemHovered = hoveredIndex !== null;
              const isThisItemHovered = hoveredIndex === i;

              let itemOpacity = 1;
              if (isAnyItemHovered) {
                itemOpacity = isThisItemHovered ? 1 : 0.25;
              } else if (!isActive) {
                itemOpacity = 0.4;
              }

              return (
                <div key={item.label} className="relative py-2 w-full max-w-2xl px-4">
                  <Link
                    to={item.href}
                    onClick={onClose}
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="relative inline-block text-[12vw] md:text-[6vw] font-bold tracking-tight uppercase leading-none transition-opacity duration-300 outline-none"
                    style={{ opacity: itemOpacity }}
                  >
                    {item.label}
                    <motion.span
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: isThisItemHovered ? 1 : 0 }}
                      transition={{ duration: 0.4, ease: premiumEase }}
                      className="absolute left-0 right-0 top-[52%] h-0.75 md:h-1.25 bg-current origin-left pointer-events-none"
                    />
                  </Link>
                </div>
              );
            })}
          </nav>

          <div className="absolute bottom-8 left-6 right-6 md:bottom-10 md:left-16 md:right-16 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-center md:text-left text-[10px] md:text-[11px] font-medium tracking-[0.2em] uppercase opacity-60">
              <span className="hidden md:inline">ID</span>
              <span className="hidden md:inline opacity-40">•</span>
              <span>MUHAMMAD LUTFI APRIAMTO © 2026</span>
            </div>

            <div className="flex items-center gap-5">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                const isHovered = hoveredSocial === index;
                
                let accentColor = "currentColor";
                let shadowGlow = "none";
                let borderColor = "transparent";

                if (isHovered) {
                  accentColor = isDark ? social.hoverColorDark : social.hoverColorLight;
                  borderColor = accentColor;
                  shadowGlow = `0 4px 15px ${isDark ? social.glowDark : social.glowLight}`;
                }

                return (
                  <motion.a 
                    key={index} 
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full border border-transparent relative overflow-hidden flex items-center justify-center"
                    onMouseEnter={() => setHoveredSocial(index)}
                    onMouseLeave={() => setHoveredSocial(null)}
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0.6 }}
                    animate={{ 
                      opacity: 1,
                      borderColor: borderColor,
                      boxShadow: shadowGlow,
                      color: isHovered ? accentColor : "inherit"
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Icon size={20} />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ============================================
// COMPONENT: MAIN NAVBAR
// ============================================
const Navbar = ({ wasIntroShown }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [isOpen]);

  const bounceTransition = {
    type: "spring",
    damping: 11,     
    stiffness: 120,  
    mass: 1,         
  };

  const delayOffset = wasIntroShown ? 0.45 : 0;

  // ============================================
  // LOGIKA TRANSISI TEMA YANG SANGAT HALUS
  // ============================================
  const handleThemeToggle = () => {
    // Mengecek apakah browser mendukung View Transitions API
    if (!document.startViewTransition) {
      // Fallback untuk browser lama: langsung ubah tema (akan ditangani oleh CSS transition biasa)
      toggleTheme();
      return;
    }

    // Menggunakan API bawaan browser untuk melakukan crossfade sempurna 
    // antara DOM sebelum berubah tema dan sesudah berubah tema.
    document.startViewTransition(() => {
      toggleTheme();
    });
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[9999] p-4 md:p-10 flex justify-between items-center pointer-events-none">
        <motion.div
          initial={{ y: -160, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ...bounceTransition, delay: delayOffset }}
          className="pointer-events-auto"
        >
          <BrandLogo isDark={isDark} />
        </motion.div>
        {/* Tombol Tema */}
      <div className="flex justify-center items-center gap-x-3">
        <motion.div
          initial={{ y: -160, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ...bounceTransition, delay: delayOffset }}
          className="pointer-events-auto"
        >
          <ThemeToggle isDark={isDark} onToggle={handleThemeToggle} />
        </motion.div>

        {/* Tombol Hamburger */}
        <motion.div
          initial={{ y: -160, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ...bounceTransition, delay: delayOffset + 0.15 }}
          className="pointer-events-auto"
        >
          <HamburgerButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} isDark={isDark} />
        </motion.div>
      </div>

      </div>

      <FullscreenMenu isOpen={isOpen} onClose={() => setIsOpen(false)} isDark={isDark} />
    </>
  );
};

export default Navbar;