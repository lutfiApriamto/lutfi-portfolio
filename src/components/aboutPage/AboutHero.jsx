import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ProfileCard from './ProfileCard';

const AboutHero = () => {
  const sectionRef = useRef(null);

  // ── Scroll parallax — sama persis seperti ProjectsHero ──
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const heroY   = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // ── Animasi (tidak diubah) ──
  const fadeInVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/*
        Hanya ini yang ditambahkan:
        wrapper motion.div dengan scroll-driven y parallax + opacity fade
        persis seperti ProjectsHero. Semua konten di dalamnya tidak diubah.
      */}
      <motion.div
        style={{ y: heroY, opacity }}
        className="w-full pt-28 pb-16 px-6 md:px-12 lg:px-24 mx-auto"
      >
        {/* Grid Layout dengan Framer Motion */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full relative z-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {/* Kolom Kiri: Teks & Call to Action (CTA) */}
          <motion.div
            className="lg:col-span-7 flex flex-col items-start justify-center gap-6 order-2 lg:order-1 text-left"
            variants={fadeInVariants}
          >
            {/* Badge Status */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100/80 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-700/50 text-indigo-700 dark:text-indigo-300 text-sm font-semibold tracking-wide">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
              </span>
              Available for New Opportunities
            </div>
            {/* Semboyan / Headline (H1) */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 dark:text-white leading-[1.15]">
              Crafting <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-500 dark:from-indigo-400 dark:to-blue-400">Aesthetics</span>, <br />
              Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-blue-400 dark:to-cyan-400">Performance.</span>
            </h1>
            {/* Deskripsi (P) */}
            <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-2xl">
              Hi, I'm <strong className="text-neutral-900 dark:text-white font-semibold">Muhammad Lutfi Apriamto</strong>,
              a Computer Science graduate from Gunadarma University in Bekasi. I'm passionate about building interactive and scalable digital interfaces, particularly exploring the <strong className="text-neutral-900 dark:text-white font-semibold">MERN Stack</strong> ecosystem.
              Let's turn complex ideas into seamless, visually appealing web experiences.
            </p>
            {/* CTA Button: Download CV */}
            <div className="mt-4 flex">
              <a
                href="https://drive.google.com/file/d/1c8J_eKqAVW6TT48LawfQt6T1NZS2xzLd/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-semibold rounded-xl overflow-hidden transition-all duration-300 active:scale-95 hover:shadow-2xl hover:shadow-neutral-900/20 dark:hover:shadow-white/20"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Download CV
                  <svg className="w-5 h-5 transition-transform group-hover:translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-neutral-800 to-neutral-900 dark:from-gray-100 dark:to-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </a>
            </div>
          </motion.div>

          {/* Kolom Kanan: Profile Card Component */}
          <motion.div
            className="lg:col-span-5 flex justify-center items-center order-1 lg:order-2 w-full"
            variants={fadeInVariants}
          >
            <div className="w-full max-w-[260px] sm:max-w-[320px] lg:max-w-[380px] mx-auto transform transition-all duration-500 hover:scale-[1.02]">
              <ProfileCard
                name="M. Lutfi Apriamto"
                title="Website Developer"
                handle="lutfiapriamto"
                status="Online"
                contactText="Contact Me"
                avatarUrl="/img/profile/lutfi.jpeg"
                showUserInfo={true}
                enableTilt={true}
                enableMobileTilt={false}
                onContactClick={() => window.open('mailto:email-lu-disini@gmail.com', '_blank')}
                behindGlowColor="rgba(99, 102, 241, 0.35)"
                innerGradient="linear-gradient(145deg, rgba(15,23,42,0.85) 0%, rgba(49,46,129,0.3) 100%)"
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Ornamen Glow Background */}
      <div className="absolute top-1/4 -right-1/4 w-[400px] h-[400px] bg-indigo-500/10 dark:bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 -left-1/4 w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-[150px] pointer-events-none"></div>
    </section>
  );
};

export default AboutHero;