import { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';

// ── GLITCH TEXT ──
// Usage: <GlitchText text="PURPOSE" />
// Props:
//   text      — string yang akan ditampilkan
//   isDark    — opsional, override theme (default: dari ThemeContext)
//   color     — opsional, warna teks utama (default: #C8FF00 dark / #2563EB light, sama seperti aslinya)
//   interval  — ms antar glitch (default: 4500)
//   duration  — ms durasi glitch aktif (default: 280)
export const GlitchText = ({
  text,
  isDark: isDarkProp,
  color,
  interval = 2500,
  duration = 130,
}) => {
  const { theme } = useTheme();
  const isDark = isDarkProp !== undefined ? isDarkProp : theme === 'dark';

  // Default color sama persis seperti di ProjectsHero asli
  const textColor = color !== undefined
    ? color
    : (isDark ? "#C8FF00" : "#2563EB");

  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), duration);
    }, interval);
    return () => clearInterval(id);
  }, [interval, duration]);

  return (
    <span
      className="relative inline-block"
      style={{ color: textColor }}
    >
      {text}
      {glitching && (
        <>
          {/* Layer 1 — cyan/pink */}
          <span
            className="absolute inset-0 pointer-events-none select-none"
            aria-hidden
            style={{
              color: isDark ? "#00F0FF" : "#ec4899",
              clipPath: "polygon(0 15%, 100% 15%, 100% 40%, 0 40%)",
              transform: "translateX(-3px)",
              opacity: 0.65,
            }}
          >
            {text}
          </span>
          {/* Layer 2 — lime/blue */}
          <span
            className="absolute inset-0 pointer-events-none select-none"
            aria-hidden
            style={{
              color: isDark ? "#C8FF00" : "#2563EB",
              clipPath: "polygon(0 60%, 100% 60%, 100% 82%, 0 82%)",
              transform: "translateX(3px)",
              opacity: 0.65,
            }}
          >
            {text}
          </span>
        </>
      )}
    </span>
  );
};

// ── NEON TEXT ──
// Usage: <NeonText text="WITH" />
// Stroke berwarna neon, isi transparan, flicker seperti neon sign
// Props:
//   text        — string yang akan ditampilkan
//   isDark      — opsional, override theme (default: dari ThemeContext)
//   strokeWidth — ketebalan stroke (default: "2px")
//   strokeColor — opsional, override warna stroke (default: #C8FF00 dark / #2563EB light)
//   shadow      — opsional, override textShadow
//   interval    — ms antar flicker (default: 5000)
//   className   — class tambahan untuk span
//   style       — style tambahan untuk span (di-merge, tidak replace)
export const NeonText = ({
  text,
  isDark: isDarkProp,
  strokeWidth = "2px",
  strokeColor,
  shadow,
  interval = 2000,
  className = "",
  style = {},
}) => {
  const { theme } = useTheme();
  const isDark = isDarkProp !== undefined ? isDarkProp : theme === 'dark';

  // Default stroke color sama persis seperti di ProjectsHero asli
  const resolvedStroke = strokeColor !== undefined
    ? strokeColor
    : (isDark ? "#C8FF00" : "#2563EB");

  // Default shadow sama persis seperti di ProjectsHero asli
  const resolvedShadow = shadow !== undefined
    ? shadow
    : (isDark
      ? "0 4px 24px rgba(0,0,0,0.4)"
      : "0 4px 24px rgba(0,0,0,0.08)");

  // Inject keyframes sekali saja
  useEffect(() => {
    const styleId = 'neon-flicker-keyframes';
    if (document.getElementById(styleId)) return;
    const styleEl = document.createElement('style');
    styleEl.id = styleId;
    // Sama persis dengan @keyframes di ProjectsHero asli
    styleEl.textContent = `
      @keyframes neonFlicker {
        0%, 100% { opacity: 1; }
        92%       { opacity: 1; }
        93%       { opacity: 0.4; }
        94%       { opacity: 1; }
        96%       { opacity: 0.6; }
        97%       { opacity: 1; }
      }
    `;
    document.head.appendChild(styleEl);
  }, []);

  return (
    <span
      className={`inline-block select-none ${className}`}
      style={{
        color: "transparent",
        WebkitTextStroke: `${strokeWidth} ${resolvedStroke}`,
        textShadow: resolvedShadow,
        animation: `neonFlicker ${interval}ms ease-in-out infinite`,
        display: "inline-block",
        ...style,
      }}
      aria-label={text}
    >
      {text}
    </span>
  );
};

export default { GlitchText, NeonText };