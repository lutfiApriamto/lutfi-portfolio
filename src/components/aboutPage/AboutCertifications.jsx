import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Sesuaikan path ini dengan letak file const.js lu
import { certifData } from '@/lib/const'; 

const AboutCertifications = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedCert, setSelectedCert] = useState(null);

  // Helper untuk memisahkan kategori secara dinamis berdasarkan data lu
  const filteredData = certifData.filter((cert) => {
    const isHaki = cert.title.toLowerCase().includes('haki') || 
                   cert.title.toLowerCase().includes('ciptaan') ||
                   cert.organizer.toLowerCase().includes('kekayaan intelektual');
    
    if (activeFilter === 'haki') return isHaki;
    if (activeFilter === 'cert') return !isHaki;
    return true; // 'all'
  });

  // Konfigurasi Animasi Grid
  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  // Konfigurasi Animasi Kartu Galeri
  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } }
  };

  return (
    <section className="relative w-full py-24 px-6 md:px-12 lg:px-24 max-w-[1440px] mx-auto overflow-hidden">
      
      {/* Header Section */}
      <div className="flex flex-col items-center text-center mb-12">
        <span className="text-xs font-bold tracking-widest text-indigo-500 dark:text-[#C8FF00] uppercase bg-indigo-500/5 dark:bg-indigo-400/10 px-4 py-1.5 rounded-full mb-4 border border-indigo-500/10 dark:border-indigo-400/20">
          Exhibition
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white">
          Credentials Gallery
        </h2>
        <p className="mt-4 text-neutral-600 dark:text-neutral-400 max-w-2xl text-sm sm:text-base">
          A curated exhibition of professional verifications, academic milestones, and intellectual properties.
        </p>
      </div>

      {/* Filter Tabs Navigation */}
      <div className="flex justify-center items-center gap-2 mb-16 flex-wrap">
        {[
          { id: 'all', label: 'All Exhibition' },
          { id: 'cert', label: 'Certifications' },
          { id: 'haki', label: 'Intellectual Property (HAKI)' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id)}
            className={`relative px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-full transition-colors duration-300 ${
              activeFilter === tab.id
                ? 'text-indigo-600 dark:text-[#C8FF00]' // [REVISI] Menambahkan dark:text-neutral-900 agar kontras dengan bg putih
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            {activeFilter === tab.id && (
              <motion.div
                layoutId="activeTabGlow"
                className="absolute inset-0 bg-neutral-900 dark:bg-white rounded-full -z-10 shadow-lg shadow-neutral-900/10 dark:shadow-white/10"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Gallery Uniform Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 max-w-6xl mx-auto relative z-10"
        variants={gridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.05 }}
      >
        <AnimatePresence mode="popLayout">
          {filteredData.map((cert) => (
            <motion.div
              key={cert.id}
              layout
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              exit="exit"
              viewport={{ once: false, amount: 0.05 }}
              onClick={() => setSelectedCert(cert)}
              className="group flex flex-col cursor-pointer"
            >
              {/* Gallery Frame (Bingkai Karya Seni) */}
              {/* [REVISI] Mempertajam dark:border-neutral-700 menjadi dark:border-neutral-800 dan dark:bg-neutral-900/60 */}
              <div className="w-full aspect-[4/3] bg-neutral-100 dark:bg-neutral-900/60 border border-neutral-200/60 dark:border-neutral-800 rounded-2xl overflow-hidden p-6 flex items-center justify-center relative shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all duration-500 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] dark:group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] group-hover:border-neutral-300 dark:group-hover:border-neutral-600">
                
                {/* Thumbnail Image dengan Object Contain agar Rasio Asli Terjaga di dalam Bingkai */}
                <img 
                  src={cert.tumbnail} 
                  alt={cert.title} 
                  loading="lazy"
                  className="max-w-full max-h-full object-contain rounded-md shadow-md transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />

                {/* Glassmorphism Subtle Hover Overlay */}
                <div className="absolute inset-0 bg-neutral-950/0 dark:bg-neutral-950/0 group-hover:bg-neutral-950/40 backdrop-blur-[0px] group-hover:backdrop-blur-[2px] transition-all duration-500 flex items-center justify-center">
                  {/* [REVISI] Background overlay tombol view disesuaikan */}
                  <span className="px-4 py-2 rounded-xl bg-white/95 dark:bg-neutral-800/95 text-neutral-900 dark:text-white text-xs font-bold opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 shadow-xl border border-transparent dark:border-neutral-700">
                    View Exhibition
                  </span>
                </div>
              </div>

              {/* Gallery Label/Caption (Keterangan di bawah bingkai layaknya museum) */}
              <div className="mt-4 px-2 flex flex-col items-start text-left">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-bold tracking-wider uppercase text-indigo-600 dark:text-[#C8FF00]">
                    {cert.organizer}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-600"></span>
                  <span className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400">
                    {cert.year}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-neutral-800 dark:text-neutral-200 line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-[#C8FF00] transition-colors duration-300">
                  {cert.title}
                </h3>
              </div>

            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* LIGHTBOX MODAL PREVIEW (Immersive Experience) */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-neutral-950/80 backdrop-blur-md cursor-zoom-out"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              onClick={(e) => e.stopPropagation()} 
              className="relative max-w-4xl w-full bg-white dark:bg-neutral-900 rounded-3xl overflow-hidden shadow-2xl border border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row cursor-default max-h-[90vh] md:max-h-[80vh]"
            >
              
              {/* Sisi Kiri Modal: Tampilan Penuh Sertifikat */}
              <div className="flex-1 bg-neutral-100 dark:bg-neutral-950/50 p-6 flex items-center justify-center overflow-hidden min-h-[250px] md:min-h-0">
                <img 
                  src={selectedCert.tumbnail} 
                  alt={selectedCert.title} 
                  className="max-w-full max-h-[50vh] md:max-h-[70vh] object-contain rounded-lg shadow-lg"
                />
              </div>

              {/* Sisi Kanan Modal: Detail Dokumen */}
              <div className="w-full md:w-[320px] p-6 sm:p-8 flex flex-col justify-between border-t md:border-t-0 md:border-l border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-y-auto">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    {/* [REVISI] Mengganti bg-indigo-600 menjadi dark:bg-indigo-500 agar lebih vibrant di dark mode */}
                    <span className="px-2.5 py-1 text-[10px] font-bold text-white bg-indigo-600 dark:bg-indigo-500 rounded-md">
                      {selectedCert.year}
                    </span>
                    <span className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                      {selectedCert.organizer}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white leading-snug mb-4">
                    {selectedCert.title}
                  </h3>
                </div>

                {/* Action Buttons di dalam Modal */}
                <div className="flex flex-col gap-2 mt-6 md:mt-0">
                  <a 
                    href={selectedCert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-900 font-semibold text-xs sm:text-sm rounded-xl transition-all duration-300 text-center flex items-center justify-center gap-2 shadow-lg"
                  >
                    Verify Credential
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                  {/* [REVISI] Mempertajam visibilitas teks tombol close di dark mode */}
                  <button 
                    onClick={() => setSelectedCert(null)}
                    className="w-full py-3 px-4 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 font-medium text-xs sm:text-sm rounded-xl transition-all duration-300"
                  >
                    Close Preview
                  </button>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-indigo-500/[0.03] dark:bg-indigo-500/[0.05] rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-blue-500/[0.03] dark:bg-blue-500/[0.05] rounded-full blur-[130px] pointer-events-none -z-10" />

    </section>
  );
};

export default AboutCertifications;