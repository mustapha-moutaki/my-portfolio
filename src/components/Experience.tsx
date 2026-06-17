import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, ArrowUpRight } from 'lucide-react';
// Assuming ScrollReveal is in the same directory or adjust the path accordingly
import ScrollReveal from './ScrollReveal';

const experiences = [
  {
    role: 'Full-Stack Java/Spring Boot & React Developer',
    company: 'Alexsys Solutions',
    location: 'Casablanca',
    period: 'April 2025 — Present',
    type: 'Full-time',
    current: true,
    accent: '#4fffb0',
    description: [
      'Development of AlexIS (Intelligent Support), a centralized platform for managing customer support tickets.',
      'Implementation of an intelligent automatic assignment engine to optimize ticket processing and distribution.',
    ],
    tags: ['Spring Boot', 'React', 'JWT', 'PostgreSQL', 'Docker'],
  },
  {
    role: 'Full-Stack Developer',
    company: 'Digital Partnership Group',
    location: 'Casablanca',
    period: 'May 2025 — July 2025',
    type: 'Internship',
    current: false,
    accent: '#00d4ff',
    description: [
      'Development of full-stack web applications with PHP/Laravel, Next.js, and React following Agile methodologies.',
      'Design of secure RESTful APIs and optimization of back-end and front-end performance.',
    ],
    tags: ['Laravel', 'Next.js', 'React', 'RESTful API', 'Agile'],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="experience" className="relative py-32">
      {/* Background Glow */}
      <div
        className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(0,212,255,0.4) 0%, transparent 70%)', filter: 'blur(80px)' }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="section-divider mb-4" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: '#4fffb0' }}>
              Career
            </span>
          </motion.div>

          {/* Title with GSAP Scroll Reveal */}
          <ScrollReveal
            baseOpacity={0}
            baseRotation={0}
            blurStrength={10}
            containerClassName="!my-0"
            textClassName="font-display text-4xl lg:text-5xl font-bold text-white mt-3 !leading-[1.1]"
          >
            Work experience
          </ScrollReveal>

          {/* Description with GSAP Scroll Reveal */}
          <ScrollReveal
            baseOpacity={0.2}
            baseRotation={2}
            blurStrength={5}
            containerClassName="!my-2"
            textClassName="text-gray-400 text-lg max-w-xl !leading-relaxed"
          >
            Building real-world software solutions across enterprise and startup environments.
          </ScrollReveal>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="relative"
        >
          {/* Timeline line */}
          <div
            className="absolute left-6 top-0 bottom-0 w-px hidden md:block"
            style={{ background: 'linear-gradient(to bottom, rgba(79,255,176,0.4), rgba(79,255,176,0.05))' }}
          />

          <div className="space-y-6">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="relative md:pl-20"
              >
                {/* Timeline dot */}
                <div className="absolute left-[18px] top-8 hidden md:flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ delay: 0.2 + i * 0.15, type: 'spring', stiffness: 400 }}
                    className="w-5 h-5 rounded-full border-2 flex items-center justify-center z-10"
                    style={{
                      background: exp.current ? exp.accent : '#1a1a1a',
                      borderColor: exp.accent,
                      boxShadow: exp.current ? `0 0 12px ${exp.accent}60` : 'none',
                    }}
                  >
                    {exp.current && <div className="w-2 h-2 rounded-full" style={{ background: '#090909' }} />}
                  </motion.div>
                </div>

                {/* Card */}
                <motion.div
                  whileHover={{ y: -3, boxShadow: `0 16px 48px rgba(0,0,0,0.4), 0 0 0 1px ${exp.accent}20` }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className="group rounded-3xl p-8"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
                  }}
                >
                  {/* ... Rest of your card content remains exactly the same ... */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                    <div className="flex items-start gap-4">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                        style={{ background: `${exp.accent}12`, border: `1px solid ${exp.accent}25` }}
                      >
                        <Briefcase size={20} style={{ color: exp.accent }} strokeWidth={1.8} />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-xl text-white leading-snug">{exp.role}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm font-semibold" style={{ color: exp.accent }}>{exp.company}</span>
                          <span className="text-gray-600">·</span>
                          <span className="text-sm text-gray-500">{exp.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-start sm:items-end gap-2 flex-shrink-0">
                      <span className="text-sm text-gray-400 font-medium">{exp.period}</span>
                      <span
                        className="text-xs font-semibold px-3 py-1 rounded-full"
                        style={{
                          background: exp.current ? `${exp.accent}12` : 'rgba(255,255,255,0.05)',
                          border: `1px solid ${exp.current ? `${exp.accent}25` : 'rgba(255,255,255,0.08)'}`,
                          color: exp.current ? exp.accent : 'rgba(255,255,255,0.4)',
                        }}
                      >
                        {exp.type}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-2.5 mb-6">
                    {exp.description.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 text-gray-400 text-sm leading-relaxed">
                        <div
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5"
                          style={{ background: exp.accent }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium"
                        style={{
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          color: 'rgba(255,255,255,0.45)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <ArrowUpRight size={16} style={{ color: exp.accent }} />
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}