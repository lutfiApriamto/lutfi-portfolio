import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence, useScroll } from 'framer-motion';
import { useTheme } from "../../context/ThemeContext";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Send, User, Mail, FileText, MessageSquare } from 'lucide-react';

// ── TOAST CONFIG ──
export const toasterConfig = {
  position: "bottom-right",
  toastOptions: {
    duration: 4000,
    style: {
      fontFamily: "'Space Grotesk', sans-serif",
      fontSize: "12px",
      fontWeight: "700",
      letterSpacing: "0.05em",
      padding: "14px 18px",
      borderRadius: "10px",
      maxWidth: "380px",
    },
  },
};

// ── CUSTOM TOAST STYLES ──
const showLoadingToast = () =>
  toast.loading("Sending your message...", {
    style: {
      background: "#111111",
      color: "#f0f0f0",
      border: "1px solid #1f1f1f",
      fontFamily: "'Space Grotesk', sans-serif",
      fontSize: "12px",
      fontWeight: "700",
    },
    iconTheme: { primary: "#C8FF00", secondary: "#111111" },
  });

const showSuccessToast = (toastId) =>
  toast.success("Message sent! Check your inbox.", {
    id: toastId,
    style: {
      background: "#111111",
      color: "#f0f0f0",
      border: "1px solid rgba(34,197,94,0.3)",
      fontFamily: "'Space Grotesk', sans-serif",
      fontSize: "12px",
      fontWeight: "700",
    },
    iconTheme: { primary: "#22c55e", secondary: "#111111" },
    duration: 5000,
  });

const showErrorToast = (toastId, msg) =>
  toast.error(msg || "Failed to send. Please try again.", {
    id: toastId,
    style: {
      background: "#111111",
      color: "#f0f0f0",
      border: "1px solid rgba(239,68,68,0.3)",
      fontFamily: "'Space Grotesk', sans-serif",
      fontSize: "12px",
      fontWeight: "700",
    },
    iconTheme: { primary: "#ef4444", secondary: "#111111" },
    duration: 5000,
  });

// ── FORM FIELD ──
const FormField = ({ label, name, type = "text", placeholder, value, onChange, error, isDark, icon: Icon, multiline = false, rows = 5 }) => {
  const [focused, setFocused] = useState(false);

  const inputStyles = {
    backgroundColor: focused
      ? isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)"
      : isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
    borderColor: error
      ? "rgba(239,68,68,0.5)"
      : focused
        ? isDark ? "#C8FF00" : "#2563EB"
        : isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
    color: isDark ? "#f0f0f0" : "#171717",
    outline: "none",
    width: "100%",
    padding: "14px 16px 14px 44px",
    borderRadius: "10px",
    border: "1px solid",
    fontSize: "14px",
    fontFamily: "'Inter', sans-serif",
    transition: "all 0.3s ease",
    resize: multiline ? "vertical" : "none",
  };

  return (
    <div className="flex flex-col gap-2">
      <label
        className="text-[10px] font-bold uppercase tracking-[0.25em]"
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          color: error
            ? "#ef4444"
            : focused
              ? isDark ? "#C8FF00" : "#2563EB"
              : isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)",
          transition: "color 0.3s ease",
        }}
      >
        {label}
      </label>

      <div className="relative">
        {/* Icon */}
        <div
          className="absolute left-3.5 pointer-events-none"
          style={{
            top: multiline ? "14px" : "50%",
            transform: multiline ? "none" : "translateY(-50%)",
            color: error
              ? "#ef4444"
              : focused
                ? isDark ? "#C8FF00" : "#2563EB"
                : isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)",
            transition: "color 0.3s ease",
          }}
        >
          <Icon size={15} />
        </div>

        {multiline ? (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={placeholder}
            rows={rows}
            style={inputStyles}
          />
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={placeholder}
            style={inputStyles}
          />
        )}
      </div>

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="text-[11px] font-mono"
            style={{ color: "#ef4444" }}
          >
            ↑ {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

// ── MAIN COMPONENT ──
const ConnectForm = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-80px" });

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

// Scroll parallax for bg text
  const { scrollYProgress } = useScroll({
    target: sectionRef, 
    offset: ["start end", "end start"] 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // ── CLIENT VALIDATION ──
  const validate = () => {
    const newErrors = {};
    if (!form.name.trim())    newErrors.name    = "Name is required.";
    if (!form.email.trim())   newErrors.email   = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
                              newErrors.email   = "Enter a valid email address.";
    if (!form.subject.trim()) newErrors.subject = "Subject is required.";
    if (!form.message.trim()) newErrors.message = "Message cannot be empty.";
    else if (form.message.trim().length < 10)
                              newErrors.message = "Message too short (min 10 characters).";
    return newErrors;
  };

  // ── SUBMIT ──
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix the errors above.", {
        style: {
          background: isDark ? "#111111" : "#ffffff",
          color: isDark ? "#f0f0f0" : "#171717",
          border: `1px solid rgba(239,68,68,0.3)`,
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "12px",
          fontWeight: "700",
        },
        iconTheme: { primary: "#ef4444", secondary: isDark ? "#111111" : "#ffffff" },
      });
      return;
    }

    setLoading(true);
    const toastId = showLoadingToast();

    try {
      await axios.post(
        `${import.meta.env.VITE_BE_BASE_URL}/api/contact`,
        form,
        { withCredentials: true }
      );
      showSuccessToast(toastId);
      setSent(true);
      setForm({ name: "", email: "", subject: "", message: "" });
      setErrors({});
    } catch (err) {
      const msg = err?.response?.data?.message || "Something went wrong. Please try again.";
      showErrorToast(toastId, msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ── TOASTER ── */}
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 4000,
          style: {
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "12px",
            fontWeight: "700",
            padding: "14px 18px",
            borderRadius: "10px",
          },
        }}
      />

      <section
        ref={sectionRef}
        className="relative w-full py-24 md:py-36 px-6 md:px-12 lg:px-24 overflow-hidden transition-colors duration-500"
        style={{
          backgroundColor: isDark ? "#050505" : "#FAF9F6",
          color: isDark ? "#f0f0f0" : "#171717",
        }}
      >
        {/* TOP BORDER */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-0 inset-x-6 md:inset-x-12 lg:inset-x-24 h-px origin-left"
          style={{ backgroundColor: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)" }}
        />

        {/* BG TEXT */}
        <div
          className="absolute top-1/2 left-0 -translate-y-1/2 pointer-events-none select-none whitespace-nowrap z-0"
          aria-hidden
        >
          <span
            style={{
              fontSize: "clamp(5rem, 18vw, 20rem)",
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              color: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.025)",
            }}
          >
            CONTACT
          </span>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">

          {/* ── LEFT: INFO ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-8"
          >
            {/* Label */}
            <div className="flex items-center gap-4">
              <div className="w-8 h-[2px]" style={{ backgroundColor: isDark ? "#C8FF00" : "#2563EB" }} />
              <span
                className="text-[10px] font-bold uppercase tracking-[0.3em]"
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: isDark ? "#C8FF00" : "#2563EB" }}
              >
                Send a Message
              </span>
            </div>

            {/* Headline */}
            <div className="flex flex-col gap-0 overflow-hidden">
              <motion.h2
                initial={{ y: "110%" }}
                animate={isInView ? { y: "0%" } : { y: "110%" }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="text-[clamp(2.5rem,7vw,6rem)] font-black uppercase tracking-tight leading-[0.88]"
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: isDark ? "#ffffff" : "#171717" }}
              >
                DROP A
              </motion.h2>
              <motion.h2
                initial={{ y: "110%" }}
                animate={isInView ? { y: "0%" } : { y: "110%" }}
                transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="text-[clamp(2.5rem,7vw,6rem)] font-black uppercase tracking-tight leading-[0.88]"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  WebkitTextStroke: isDark ? "1.5px rgba(255,255,255,0.18)" : "1.5px rgba(0,0,0,0.18)",
                  color: "transparent",
                }}
              >
                LINE.
              </motion.h2>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-sm md:text-base leading-relaxed max-w-sm"
              style={{ fontFamily: "'Inter', sans-serif", color: isDark ? "#94a3b8" : "#525252" }}
            >
              Fill out the form and I'll get back to you within 1–2 business days. You'll also receive a confirmation to your inbox.
            </motion.p>

            {/* Info items */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.7, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-4 border-t pt-6"
              style={{ borderColor: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)" }}
            >
              {[
                { label: "Email", value: "lutfiapriamto12@gmail.com" },
                { label: "Response Time", value: "Within 1–2 business days" },
                { label: "Location", value: "Bekasi, Indonesia (UTC+7)" },
              ].map((item) => (
                <div key={item.label} className="flex flex-col gap-1">
                  <span
                    className="text-[9px] font-mono font-bold uppercase tracking-[0.2em]"
                    style={{ color: isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.25)" }}
                  >
                    {item.label}
                  </span>
                  <span
                    className="text-sm font-semibold"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      color: isDark ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,0.6)",
                    }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT: FORM ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <AnimatePresence mode="wait">
              {sent ? (
                // ── SUCCESS STATE ──
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-start gap-6 p-8 rounded-2xl border"
                  style={{
                    backgroundColor: isDark ? "rgba(12,12,12,0.9)" : "rgba(255,255,255,0.9)",
                    borderColor: isDark ? "rgba(34,197,94,0.25)" : "rgba(34,197,94,0.2)",
                    backdropFilter: "blur(20px)",
                  }}
                >
                  <div
                    className="flex items-center justify-center w-14 h-14 rounded-xl"
                    style={{ backgroundColor: "rgba(34,197,94,0.1)", color: "#22c55e" }}
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3
                      className="text-2xl font-black uppercase tracking-tight"
                      style={{ fontFamily: "'Space Grotesk', sans-serif", color: isDark ? "#ffffff" : "#171717" }}
                    >
                      Message Sent!
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ fontFamily: "'Inter', sans-serif", color: isDark ? "#94a3b8" : "#525252" }}
                    >
                      Check your inbox for a confirmation. I'll get back to you soon.
                    </p>
                  </div>
                  <button
                    onClick={() => setSent(false)}
                    className="text-xs font-mono font-bold uppercase tracking-[0.2em] transition-colors duration-300"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      color: isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = isDark ? "#C8FF00" : "#2563EB"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)"; }}
                  >
                    ← Send another message
                  </button>
                </motion.div>
              ) : (
                // ── FORM STATE ──
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  noValidate
                  className="flex flex-col gap-5 p-7 md:p-8 rounded-2xl border"
                  style={{
                    backgroundColor: isDark ? "rgba(12,12,12,0.9)" : "rgba(255,255,255,0.9)",
                    borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
                    backdropFilter: "blur(20px)",
                  }}
                >
                  <FormField
                    label="Full Name"
                    name="name"
                    placeholder="Muhammad Lutfi..."
                    value={form.name}
                    onChange={handleChange}
                    error={errors.name}
                    isDark={isDark}
                    icon={User}
                  />
                  <FormField
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    error={errors.email}
                    isDark={isDark}
                    icon={Mail}
                  />
                  <FormField
                    label="Subject"
                    name="subject"
                    placeholder="Project inquiry, collaboration..."
                    value={form.subject}
                    onChange={handleChange}
                    error={errors.subject}
                    isDark={isDark}
                    icon={FileText}
                  />
                  <FormField
                    label="Message"
                    name="message"
                    placeholder="Tell me about your project, idea, or just say hi..."
                    value={form.message}
                    onChange={handleChange}
                    error={errors.message}
                    isDark={isDark}
                    icon={MessageSquare}
                    multiline
                    rows={5}
                  />

                  {/* Submit button */}
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileTap={{ scale: loading ? 1 : 0.97 }}
                    className="group relative flex items-center justify-center gap-3 w-full py-4 rounded-xl font-mono text-xs font-bold uppercase tracking-[0.2em] overflow-hidden transition-all duration-300 mt-1"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      backgroundColor: loading
                        ? isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)"
                        : isDark ? "#C8FF00" : "#2563EB",
                      color: loading
                        ? isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)"
                        : isDark ? "#050505" : "#ffffff",
                      cursor: loading ? "not-allowed" : "pointer",
                    }}
                    onMouseEnter={(e) => {
                      if (!loading) {
                        e.currentTarget.style.backgroundColor = isDark ? "#d4ff33" : "#1d4ed8";
                        e.currentTarget.style.boxShadow = isDark
                          ? "0 8px 24px rgba(200,255,0,0.25)"
                          : "0 8px 24px rgba(37,99,235,0.25)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!loading) {
                        e.currentTarget.style.backgroundColor = isDark ? "#C8FF00" : "#2563EB";
                        e.currentTarget.style.boxShadow = "none";
                      }
                    }}
                  >
                    {loading ? (
                      <>
                        {/* Spinner */}
                        <svg
                          className="animate-spin"
                          width="16" height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send
                          size={14}
                          className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </>
                    )}
                  </motion.button>

                  <p
                    className="text-center text-[10px] font-mono"
                    style={{ color: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)" }}
                  >
                    You'll receive a confirmation email after sending.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ConnectForm;