import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { GraduationCap, Award, X, ExternalLink, Download } from 'lucide-react';

const education = [
  {
    degree: 'Full-Stack Developer | Web Application Designer',
    institution: 'YOUCODE — UM6P',
    location: 'Youssoufia',
    period: 'October 2024 — Present',
    current: true,
    accent: '#4fffb0',
    description: 'Intensive full-stack development training covering Java Spring Boot, Angular, React, and modern web technologies. Focused on real-world project delivery and Agile methodologies.',
  },
  {
    degree: 'Physics, Electronics & Systems',
    institution: 'Ibn Zohr University — Faculty of Sciences',
    location: 'Agadir',
    period: 'August 2023 — May 2024',
    current: false,
    accent: '#00d4ff',
    description: 'Studies in physical sciences, electronics, and applied systems with a strong foundation in analytical thinking and problem-solving.',
  },
  {
    degree: 'Scientific Baccalaureate — Physics & Chemistry',
    institution: 'Lycée Idriss II',
    location: 'Tafraout',
    period: 'August 2022 — May 2023',
    current: false,
    accent: '#f97316',
    description: 'High school diploma in Sciences with specialization in Physics and Chemistry.',
  },
];

const certifications = [
  { name: 'Oracle Certified Associate, Java SE Programmer', issuer: 'Oracle', period: 'Jan 2026', accent: '#f89820', link: 'https://collection.cloudinary.com/df1wxfrxu/114d67d4a58773e3c9bb2cb69ad8ce97' },
  { name: 'Meta Back-End Developer Specialization', issuer: 'Meta', period: 'May 2025', accent: '#0668e1', link: 'https://collection.cloudinary.com/df1wxfrxu/da558b401981fbca4bb0e38d7b4fc693' },
  { name: 'Mastering Advanced Spring Boot: Microservices & System Design', issuer: 'BOORD INFINITY', period: 'Jan 2026', accent: '#4fffb0', link: 'https://collection.cloudinary.com/df1wxfrxu/351cf95d266f1f856d42b9d979683196' },
  { name: 'Deploying & Scaling Spring Boot Applications on AWS', issuer: 'BOORD INFINITY', period: 'Jan 2026', accent: '#ff9900', link: 'https://collection.cloudinary.com/df1wxfrxu/61d8f41705343f86ceaced2783cd1f8a' },
  { name: 'Career Development in English', issuer: 'Open Moocs USA', period: 'Sep 2022', accent: '#a78bfa', link: 'https://collection.cloudinary.com/df1wxfrxu/ab7ee6374462318c1a073e3c605cb5eb' },
  // Additional certifications to test the "See More" button
    { name: 'AI Career Essentials', issuer: 'ALX', period: 'Sep 2025', accent: '#a78bfa', link: 'https://collection.cloudinary.com/df1wxfrxu/1cbce9ede50a527279c96bec867d1886' },

  { name: 'Full-Stack Web Development', issuer: 'Coursera', period: 'Dec 2023', accent: '#0056D2', link: 'https://drive.google.com/...' },
  { name: 'PostgreSQL Advanced', issuer: 'Udemy', period: 'Aug 2023', accent: '#336791', link: 'https://drive.google.com/...' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

export default function Education() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter first 5 certifications for the main display
  const displayedCerts = certifications.slice(0, 5);
  const hasMore = certifications.length > 5;

  return (
    <section id="education" className="relative py-32">
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(79,255,176,0.4) 0%, transparent 70%)', filter: 'blur(80px)' }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <div className="section-divider mb-4" />
          <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: '#4fffb0' }}>
            Background
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mt-3">
            Education & certifications
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Education Section */}
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <h3
              className="text-xs font-semibold tracking-[0.18em] uppercase mb-8 flex items-center gap-3"
              style={{ color: 'rgba(255,255,255,0.35)' }}
            >
              <GraduationCap size={14} style={{ color: '#4fffb0' }} />
              Academic
            </h3>
            <div className="relative">
              <div
                className="absolute left-[9px] top-2 bottom-2 w-px"
                style={{ background: 'linear-gradient(to bottom, rgba(79,255,176,0.4), rgba(79,255,176,0.05))' }}
              />
              <div className="space-y-6">
                {education.map((edu, i) => (
                  <motion.div key={i} variants={itemVariants} className="relative pl-10">
                    <div
                      className="absolute left-0 top-4 w-5 h-5 rounded-full border-2 flex items-center justify-center"
                      style={{
                        background: edu.current ? edu.accent : '#1a1a1a',
                        borderColor: edu.accent,
                        boxShadow: edu.current ? `0 0 10px ${edu.accent}50` : 'none',
                      }}
                    >
                      {edu.current && <div className="w-2 h-2 rounded-full" style={{ background: '#090909' }} />}
                    </div>

                    <motion.div
                      whileHover={{ x: 3 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      className="p-6 rounded-2xl"
                      style={{
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid rgba(255,255,255,0.06)',
                      }}
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h4 className="font-display font-bold text-white text-base leading-snug">{edu.degree}</h4>
                      </div>
                      <p className="text-sm font-semibold mb-1" style={{ color: edu.accent }}>{edu.institution}</p>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs text-gray-500">{edu.location}</span>
                        <span className="text-gray-700">·</span>
                        <span className="text-xs text-gray-500">{edu.period}</span>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed">{edu.description}</p>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Certifications Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <h3
              className="text-xs font-semibold tracking-[0.18em] uppercase mb-8 flex items-center gap-3"
              style={{ color: 'rgba(255,255,255,0.35)' }}
            >
              <Award size={14} style={{ color: '#4fffb0' }} />
              Certifications
            </h3>
            <div className="space-y-4">
              {displayedCerts.map((cert, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  whileHover={{ x: 4, boxShadow: `0 8px 30px rgba(0,0,0,0.3), 0 0 0 1px ${cert.accent}20` }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className="flex items-start gap-4 p-5 rounded-2xl"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: `${cert.accent}12`, border: `1px solid ${cert.accent}25` }}
                  >
                    <Award size={16} style={{ color: cert.accent }} strokeWidth={1.8} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white leading-snug mb-1">{cert.name}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium" style={{ color: cert.accent }}>{cert.issuer}</span>
                      <span className="text-gray-700">·</span>
                      <span className="text-xs text-gray-500">{cert.period}</span>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* View All Button */}
              {hasMore && (
                <motion.button
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.05)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsModalOpen(true)}
                  className="w-full py-4 rounded-2xl border border-dashed border-gray-800 text-gray-400 text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors"
                >
                  View All Certifications
                  <ExternalLink size={14} />
                </motion.button>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Huge Modal Popup */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl max-h-[85vh] overflow-hidden rounded-3xl border border-white/10 bg-[#0c0c0c] shadow-2xl flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#4fffb0]/10 flex items-center justify-center">
                    <Award size={20} className="text-[#4fffb0]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Full Credentials</h3>
                    <p className="text-xs text-gray-500 uppercase tracking-tighter">Verified Certifications & Licenses</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 text-gray-400 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body - List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-3 custom-scrollbar">
                {certifications.map((cert, i) => (
                  <motion.a
                    key={i}
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="group flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] transition-all"
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                      style={{ background: `${cert.accent}12`, border: `1px solid ${cert.accent}20` }}
                    >
                      <Award size={22} style={{ color: cert.accent }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-white group-hover:text-[#4fffb0] transition-colors truncate">
                        {cert.name}
                      </h4>
                      <p className="text-xs text-gray-500 mt-0.5">{cert.issuer} • {cert.period}</p>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[10px] font-bold text-[#4fffb0] uppercase hidden sm:inline">View Drive</span>
                      <Download size={18} className="text-gray-400" />
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-white/[0.01] border-t border-white/5 text-center">
                <p className="text-[10px] text-gray-600 uppercase tracking-[0.2em]">
                  End of List • {certifications.length} Credentials
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </section>
  );
}