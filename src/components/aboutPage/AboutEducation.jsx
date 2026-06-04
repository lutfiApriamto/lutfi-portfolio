import React from 'react';
import { motion } from 'framer-motion';

const AboutEducation = () => {
  // Variasi animasi untuk container (Stagger effect)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // Variasi animasi untuk setiap kartu (Fade Up & Scale)
  const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.95, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  // Icon SVG untuk Otomotif (Mechanical)
  const MechanicalIcon = () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );

  // Icon SVG untuk Ilmu Komputer (Digital)
  const DigitalIcon = () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  );

  return (
    <section className="relative w-full py-24 px-6 md:px-12 lg:px-24 max-w-[1440px] mx-auto overflow-hidden">
      
      {/* Header Section */}
      <motion.div 
        className="flex flex-col items-center text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <span className="text-xs font-bold tracking-widest text-indigo-500 dark:text-indigo-400 uppercase bg-indigo-500/5 dark:bg-indigo-400/10 px-4 py-1.5 rounded-full mb-4 border border-indigo-500/10 dark:border-indigo-400/20">
          The Journey
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white">
          Educational Evolution
        </h2>
        <p className="mt-4 text-neutral-600 dark:text-neutral-400 max-w-2xl text-sm sm:text-base">
          From mastering physical precision to engineering digital architectures. A journey of transforming logical problem-solving into scalable web experiences.
        </p>
      </motion.div>

      {/* Grid Layout Container */}
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 relative z-10 max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.15 }} // Animasi terpicu berkali-kali saat di-scroll
      >
        
        {/* Card 01: SMK Negeri 4 Jakarta */}
        <motion.div 
          variants={cardVariants}
          className="group relative overflow-hidden rounded-3xl bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 p-8 sm:p-10 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/10 dark:hover:shadow-cyan-900/20"
        >
          {/* Watermark Number */}
          <div className="absolute -right-6 -bottom-10 text-[180px] font-black text-neutral-50 dark:text-neutral-800/50 leading-none select-none transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-3">
            01
          </div>
          
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center justify-between mb-8">
              <div className="p-3 rounded-2xl bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-100 dark:border-cyan-500/20">
                <MechanicalIcon />
              </div>
              <span className="text-sm font-semibold tracking-wider text-neutral-400 dark:text-neutral-500 uppercase">
                2018 — 2021
              </span>
            </div>

            <div className="mt-auto">
              <h4 className="text-sm font-bold text-cyan-500 dark:text-cyan-400 mb-2 uppercase tracking-wide">
                The Foundation
              </h4>
              <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white mb-2 leading-tight">
                Automotive Engineering
              </h3>
              <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-6 flex items-center gap-2">
                SMK Negeri 4 Jakarta
                <span className="w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-600"></span>
                Jakarta, ID
              </p>
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed text-sm sm:text-base">
                Developed a rigorous structural mindset. Mastering mechanical precision, systemic diagnostics, and logic-based troubleshooting—skills that seamlessly transitioned into the foundation of my software engineering logic.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Card 02: Universitas Gunadarma */}
        <motion.div 
          variants={cardVariants}
          className="group relative overflow-hidden rounded-3xl bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 p-8 sm:p-10 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-900/20 lg:translate-y-12"
        >
          {/* Watermark Number */}
          <div className="absolute -right-6 -bottom-10 text-[180px] font-black text-neutral-50 dark:text-neutral-800/50 leading-none select-none transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-3">
            02
          </div>
          
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center justify-between mb-8">
              <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-500/20">
                <DigitalIcon />
              </div>
              <span className="text-sm font-semibold tracking-wider text-neutral-400 dark:text-neutral-500 uppercase">
                2021 — 2025
              </span>
            </div>

            <div className="mt-auto">
              <h4 className="text-sm font-bold text-indigo-500 dark:text-indigo-400 mb-2 uppercase tracking-wide">
                The Refinement
              </h4>
              <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white mb-2 leading-tight">
                Computer Science
              </h3>
              <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-6 flex items-center gap-2">
                Gunadarma University
                <span className="w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-600"></span>
                Bekasi, ID
              </p>
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed text-sm sm:text-base">
                Translated physical precision into digital architecture. Deeply immersed in Web Development, focusing on creating scalable, interactive, and high-performance applications within the MERN stack ecosystem.
              </p>
            </div>
          </div>
        </motion.div>

      </motion.div>

      {/* Ornamen Ambient Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[300px] h-[300px] bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
    </section>
  );
};

export default AboutEducation;