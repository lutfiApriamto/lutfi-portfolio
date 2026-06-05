import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, useAnimation } from 'framer-motion';
import { useTheme } from "../../context/ThemeContext";
import { ArrowDown } from 'lucide-react';

// ── CONTACT METHODS ──
const contacts = [
  {
    label: "Email",
    value: "lutfiapriamto12@gmail.com",
    href: "mailto:lutfiapriamto12@gmail.com",
    short: "Send a mail",
  },
  {
    label: "LinkedIn",
    value: "lutfi-apriamto",
    href: "https://www.linkedin.com/in/lutfi-apriamto-3a9383312/",
    short: "Connect",
  },
  {
    label: "GitHub",
    value: "lutfiApriamto",
    href: "https://github.com/lutfiApriamto",
    short: "Follow",
  },
  {
    label: "Instagram",
    value: "@lutfiamto",
    href: "https://www.instagram.com/lutfiamto/",
    short: "Follow",
  },
];

// ── ANIMATED CURSOR FOLLOWER ──
const CursorFollower = ({ isDark }) => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const leave = () => setVisible(false);
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseleave', leave);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-50 rounded-full"
      animate={{
        x: pos.x - 4,
        y: pos.y - 4,
        opacity: visible ? 1 : 0,
        scale: visible ? 1 : 0,
      }}
      transition={{ type: "spring", damping: 30, stiffness: 400, mass: 0.3 }}
      style={{
        width: 8,
        height: 8,
        backgroundColor: isDark ? "#C8FF00" : "#2563EB",
      }}
    />
  );
};

// ── MAIN COMPONENT ──
const ConnectHero = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const isInView = useInView(contentRef, { once: false, margin: "-80px" });

  // Mouse spotlight
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const move = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  // Scroll parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY  = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const bgY       = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity   = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Header reveal
  const { scrollYProgress: hScroll } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center", "end start"],
  });
  const headerOpacity = useTransform(hScroll, [0, 0.15, 0.75, 1], [0, 1, 1, 0]);
  const headerBlur    = useTransform(hScroll, [0, 0.15, 0.75, 1],
    ["blur(12px)", "blur(0px)", "blur(0px)", "blur(8px)"]
  );

  return (
    <>
      <CursorFollower isDark={isDark} />

      <section
        ref={sectionRef}
        className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden transition-colors duration-500"
        style={{
          backgroundColor: isDark ? "#050505" : "#FAF9F6",
          color: isDark ? "#f0f0f0" : "#171717",
        }}
      >
        {/* ── INJECTED CSS ── */}
        <style>{`
          @keyframes heroFloat {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50%       { transform: translateY(-8px) rotate(1deg); }
          }
          @keyframes statusPulse {
            0%, 100% { opacity: 1; }
            50%       { opacity: 0.4; }
          }
        `}</style>

        {/* ── MOUSE SPOTLIGHT ── */}
        <div
          className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-500"
          style={{
            background: isDark
              ? `radial-gradient(600px circle at ${mouse.x}px ${mouse.y}px, rgba(200,255,0,0.04), transparent 50%)`
              : `radial-gradient(600px circle at ${mouse.x}px ${mouse.y}px, rgba(37,99,235,0.04), transparent 50%)`,
          }}
        />

        {/* ── BACKGROUND GRID ── */}
        <motion.div
          style={{ y: bgY }}
          className="absolute inset-0 pointer-events-none z-0"
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: isDark
                ? 'linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)'
                : 'linear-gradient(to right, rgba(0,0,0,0.025) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.025) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
        </motion.div>

        {/* ── MAIN CONTENT ── */}
        <motion.div
          ref={contentRef}
          style={{ y: contentY, opacity }}
          className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 lg:px-24 pt-32 pb-24 flex flex-col gap-12 md:gap-16"
        >
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3"
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{
                backgroundColor: "#22c55e",
                animation: "statusPulse 2s ease-in-out infinite",
              }}
            />
            <span
              className="text-[10px] font-mono font-bold uppercase tracking-[0.25em]"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                color: isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.35)",
              }}
            >
              Available — Open to new opportunities
            </span>
          </motion.div>

          {/* ── EDITORIAL HEADLINE with inline avatar ── */}
          <div className="flex flex-col gap-1">

            {/* Line 1 */}
            <div className="overflow-hidden pt-7">
              <motion.div
                initial={{ y: "110%" }}
                animate={isInView ? { y: "0%" } : { y: "110%" }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center flex-wrap gap-x-5 gap-y-2"
              >
                <span
                  className="text-[clamp(3rem,9vw,8rem)] font-black uppercase tracking-tight leading-[0.88]"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", color: isDark ? "#ffffff" : "#171717" }}
                >
                  SAY
                </span>
                <span
                  className="text-[clamp(3rem,9vw,8rem)] font-black uppercase tracking-tight leading-[0.88]"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", color: isDark ? "#ffffff" : "#171717" }}
                >
                  HELLO
                </span>

                {/* ── INLINE AVATAR ── */}
                <div
                  className="relative flex-shrink-0"
                  style={{
                    width: "clamp(3.5rem, 8vw, 7rem)",
                    height: "clamp(3.5rem, 8vw, 7rem)",
                    animation: "heroFloat 5s ease-in-out infinite",
                  }}
                >
                  {/* Avatar ring */}
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: isDark
                        ? "conic-gradient(#C8FF00, #00F0FF, #7000FF, #C8FF00)"
                        : "conic-gradient(#2563EB, #38bdf8, #ec4899, #2563EB)",
                      padding: "2px",
                    }}
                  >
                    <div
                      className="w-full h-full rounded-full overflow-hidden"
                      style={{ backgroundColor: isDark ? "#050505" : "#FAF9F6" }}
                    >
                      <img
                        src="/img/profile/lutfi.jpeg"
                        alt="Lutfi Apriamto"
                        className="w-full h-full object-cover rounded-full"
                        onError={(e) => {
                          // Fallback: initials
                          e.target.style.display = 'none';
                          e.target.parentNode.style.background = isDark ? "#1a1a1a" : "#e5e7eb";
                          e.target.parentNode.innerHTML = `<span style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;font-family:'Space Grotesk',sans-serif;font-weight:900;font-size:clamp(1rem,3vw,2.5rem);color:${isDark ? '#C8FF00' : '#2563EB'}">LA</span>`;
                        }}
                      />
                    </div>
                  </div>
                </div>

                <span
                  className="text-[clamp(3rem,9vw,8rem)] font-black uppercase tracking-tight leading-[0.88]"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", color: isDark ? "#ffffff" : "#171717" }}
                >
                  TO
                </span>
              </motion.div>
            </div>

            {/* Line 2 — outline */}
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: "110%" }}
                animate={isInView ? { y: "0%" } : { y: "110%" }}
                transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <span
                  className="text-[clamp(3rem,9vw,8rem)] font-black uppercase tracking-tight leading-[0.88]"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    WebkitTextStroke: isDark ? "1.5px rgba(255,255,255,0.18)" : "1.5px rgba(0,0,0,0.18)",
                    color: "transparent",
                  }}
                >
                  LUTFI.
                </span>
              </motion.div>
            </div>
          </div>

          {/* ── BOTTOM ROW: description + contact list ── */}
          <div className="flex flex-col md:flex-row items-start justify-between gap-12 md:gap-16">

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-sm text-sm md:text-base leading-relaxed"
              style={{ fontFamily: "'Inter', sans-serif", color: isDark ? "#94a3b8" : "#525252" }}
            >
              Whether it's a project, a collab, or just a conversation — I'm reachable. Pick your channel below and let's start something.
            </motion.p>

            {/* Contact list */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-0 w-full md:max-w-xs border-t"
              style={{ borderColor: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)" }}
            >
              {contacts.map((c, i) => (
                <ContactRow key={c.label} contact={c} index={i} isDark={isDark} isInView={isInView} />
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* ── SCROLL INDICATOR ── */}
        <motion.div
          style={{ opacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        >
          <span
            className="text-[9px] font-mono uppercase tracking-[0.25em]"
            style={{ color: isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.25)" }}
          >
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ArrowDown
              size={14}
              style={{ color: isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.25)" }}
            />
          </motion.div>
        </motion.div>
      </section>
    </>
  );
};

// ── CONTACT ROW ──
const ContactRow = ({ contact, index, isDark, isInView }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={contact.href}
      target={contact.label !== "Email" ? "_blank" : undefined}
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: 20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
      transition={{ duration: 0.5, delay: 0.5 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center justify-between py-4 border-b transition-all duration-300"
      style={{
        borderColor: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)",
        borderLeft: `2px solid ${hovered ? (isDark ? "#C8FF00" : "#2563EB") : "transparent"}`,
        paddingLeft: hovered ? "12px" : "0px",
        backgroundColor: hovered
          ? isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.015)"
          : "transparent",
      }}
    >
      <div className="flex flex-col gap-0.5">
        <span
          className="text-[10px] font-mono uppercase tracking-[0.2em] transition-colors duration-300"
          style={{
            color: hovered
              ? isDark ? "#C8FF00" : "#2563EB"
              : isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)",
          }}
        >
          {contact.label}
        </span>
        <span
          className="text-sm font-bold transition-colors duration-300"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            color: hovered
              ? isDark ? "#ffffff" : "#171717"
              : isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.5)",
          }}
        >
          {contact.value}
        </span>
      </div>

      <motion.span
        animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -8 }}
        transition={{ duration: 0.25 }}
        className="text-xs font-mono uppercase tracking-widest"
        style={{ color: isDark ? "#C8FF00" : "#2563EB" }}
      >
        {contact.short} ↗
      </motion.span>
    </motion.a>
  );
};

export default ConnectHero;