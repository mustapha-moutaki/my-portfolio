import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, MapPin, Layers, ArrowRight, Terminal, GitBranch, Phone } from 'lucide-react';

/* ─── GitHub-style contribution grid (simulated) ─── */
function ContributionGrid() {
  const weeks = 26;
  const days = 7;

  const seed = (w: number, d: number) => {
    const v = Math.sin(w * 13.7 + d * 7.3 + w * d * 0.4) * 43758.5453;
    return v - Math.floor(v);
  };

  const levelColor = (l: number) => {
    const colors = ['rgba(255,255,255,0.04)', 'rgba(79,255,176,0.2)', 'rgba(79,255,176,0.45)', 'rgba(79,255,176,0.7)', '#4fffb0'];
    return colors[l];
  };

  return (
    <div className="flex gap-[3px]">
      {Array.from({ length: weeks }).map((_, w) => (
        <div key={w} className="flex flex-col gap-[3px]">
          {Array.from({ length: days }).map((_, d) => {
            const r = seed(w, d);
            const level = r < 0.35 ? 0 : r < 0.55 ? 1 : r < 0.72 ? 2 : r < 0.87 ? 3 : 4;
            return (
              <div
                key={d}
                className="w-2.5 h-2.5 rounded-sm"
                style={{ background: levelColor(level) }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

/* ─── Tech stack mini icons ─── */
const techItems = [
  { label: 'Java', bg: '#f89820', text: 'J' },
  { label: 'Spring', bg: '#6db33f', text: 'S' },
  { label: 'Angular', bg: '#dd0031', text: 'A' },
  { label: 'React', bg: '#61dafb', text: 'R' },
  { label: 'TS', bg: '#3178c6', text: 'TS' },
  { label: 'Docker', bg: '#2496ed', text: 'D' },
  { label: 'PG', bg: '#336791', text: 'PG' },
  { label: 'Git', bg: '#f05032', text: 'G' },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

export default function BentoGrid() {
  return (
    <section id="bento" className="relative py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <div className="section-divider mb-4" />
          <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: '#4fffb0' }}>
            Overview
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mt-3">
            A glimpse into my world
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[minmax(140px,auto)]"
        >
          {/* Card 1: Location — spans 2 cols */}
          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.01, y: -2 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="relative rounded-3xl overflow-hidden sm:col-span-2 row-span-2"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              minHeight: '280px',
            }}
          >
            {/* Map-style bg */}
            <div
              className="absolute inset-0"
              style={{
                background: `
                  linear-gradient(rgba(9,9,9,0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(9,9,9,0.3) 1px, transparent 1px),
                  radial-gradient(ellipse at 50% 50%, rgba(0,100,160,0.25) 0%, rgba(9,9,9,0.8) 70%)
                `,
                backgroundSize: '28px 28px, 28px 28px, 100% 100%',
              }}
            />
            <div className="absolute inset-0 flex flex-col justify-between p-6">
              {/* Location badge */}
              <div
                className="self-start flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
                style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', color: '#ddd' }}
              >
                <MapPin size={12} style={{ color: '#4fffb0' }} />
                Location
              </div>

              {/* Center pin */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <motion.div
                    animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
                    className="absolute inset-0 rounded-full"
                    style={{ background: 'rgba(79,255,176,0.3)', width: 40, height: 40, margin: -10 }}
                  />
                  <div
                    className="w-5 h-5 rounded-full border-2"
                    style={{ background: '#4fffb0', borderColor: 'rgba(9,9,9,0.8)' }}
                  />
                </div>
              </div>

              {/* City label */}
              <div>
                <p className="font-display text-2xl font-bold text-white">Casablanca</p>
                <p className="text-sm text-gray-400 mt-0.5">Morocco · GMT+1</p>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Featured project */}
          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.02, y: -3 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="relative rounded-3xl overflow-hidden"
            style={{
              background: 'rgba(79,255,176,0.06)',
              border: '1px solid rgba(79,255,176,0.15)',
              minHeight: '140px',
            }}
          >
            <div className="p-6 h-full flex flex-col justify-between">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(79,255,176,0.12)', border: '1px solid rgba(79,255,176,0.2)' }}
              >
                <Terminal size={18} style={{ color: '#4fffb0' }} strokeWidth={1.8} />
              </div>
              <div>
                <p className="font-display font-bold text-white text-lg leading-snug">AlexIS</p>
                <p className="text-xs text-gray-400 mt-1">Intelligent Support Platform</p>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Availability */}
          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.02, y: -3 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="relative rounded-3xl overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              minHeight: '140px',
            }}
          >
            <div className="p-6 h-full flex flex-col justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full pulse-glow" style={{ background: '#4fffb0' }} />
                <span className="text-xs text-gray-400 font-medium">Status</span>
              </div>
              <div>
                <p className="font-display font-bold text-white text-lg">Open to work</p>
                <p className="text-xs text-gray-500 mt-1">Available from July 2025</p>
              </div>
            </div>
          </motion.div>

          {/* Card 4: Social links — 4 icons in a row */}
          <motion.div
            variants={cardVariants}
            className="sm:col-span-2 lg:col-span-1 flex gap-3 items-stretch"
          >
            {[
              { icon: Github, href: 'https://github.com/mustapha-moutaki', color: '#ffffff', bg: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.1)', glow: 'rgba(255,255,255,0.15)' },
              { icon: Linkedin, href: 'https://linkedin.com/in/mustapha-moutaki', color: '#0a66c2', bg: 'rgba(10,102,194,0.08)', border: 'rgba(10,102,194,0.2)', glow: 'rgba(10,102,194,0.25)' },
              { icon: Mail, href: 'mailto:mustaphaamoutaki@gmail.com', color: '#4fffb0', bg: 'rgba(79,255,176,0.06)', border: 'rgba(79,255,176,0.15)', glow: 'rgba(79,255,176,0.2)' },
              { icon: Phone, href: 'tel:+212650744504', color: '#f97316', bg: 'rgba(249,115,22,0.06)', border: 'rgba(249,115,22,0.15)', glow: 'rgba(249,115,22,0.2)' },
            ].map(({ icon: Icon, href, color, bg, border, glow }) => (
              <motion.a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, boxShadow: `0 14px 32px ${glow}`, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                className="flex-1 flex items-center justify-center rounded-2xl min-h-[60px]"
                style={{ background: bg, border: `1px solid ${border}` }}
              >
                <Icon size={20} style={{ color }} strokeWidth={1.8} />
              </motion.a>
            ))}
          </motion.div>

          {/* Card 5: "Discover more projects" */}
          <motion.a
            href="#projects"
            variants={cardVariants}
            whileHover={{ scale: 1.02, y: -3, boxShadow: '0 12px 40px rgba(79,255,176,0.12)' }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="rounded-3xl flex items-center justify-between px-6 cursor-pointer"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              minHeight: '60px',
            }}
            onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}
          >
            <span className="font-display font-semibold text-white text-sm">Discover more projects</span>
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(79,255,176,0.1)', border: '1px solid rgba(79,255,176,0.2)' }}
            >
              <ArrowRight size={14} style={{ color: '#4fffb0' }} strokeWidth={2.5} />
            </div>
          </motion.a>

          {/* Card 6: GitHub activity — spans 2 cols */}
          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.01, y: -2 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="rounded-3xl p-6 sm:col-span-2"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            <div className="flex items-center gap-2 mb-5">
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#aaa' }}
              >
                <Github size={12} />
                Github activity
              </div>
              <span className="text-xs text-gray-500 ml-auto">200+ contributions in the last year</span>
            </div>
            <div className="overflow-x-auto">
              <ContributionGrid />
            </div>
            <p className="text-xs text-gray-600 mt-4">Last pushed on {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
          </motion.div>

          {/* Card 7: Tech stack — spans 2 cols */}
          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.01, y: -2 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="rounded-3xl p-6 sm:col-span-2"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            <div className="flex items-center gap-2 mb-5">
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
                style={{ background: 'rgba(79,255,176,0.06)', border: '1px solid rgba(79,255,176,0.15)', color: '#4fffb0' }}
              >
                <Layers size={12} />
                Tech stack
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-5">
              {techItems.map((t) => (
                <motion.div
                  key={t.label}
                  whileHover={{ y: -3, scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold"
                  style={{ background: `${t.bg}22`, border: `1px solid ${t.bg}44`, color: t.bg }}
                  title={t.label}
                >
                  {t.text}
                </motion.div>
              ))}
            </div>
            <div>
              <p className="font-display font-semibold text-white text-sm">Tech stacks I'm familiar with</p>
              <p className="text-xs text-gray-500 mt-1">Primarily focused on Java/Spring & Angular ecosystem,<br />but always eager to explore and learn new technologies.</p>
            </div>
          </motion.div>

          {/* Card 8: Experience count */}
          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.02, y: -3 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="rounded-3xl p-6 flex flex-col justify-between"
            style={{
              background: 'rgba(79,255,176,0.04)',
              border: '1px solid rgba(79,255,176,0.1)',
            }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(79,255,176,0.1)', border: '1px solid rgba(79,255,176,0.2)' }}
            >
              <GitBranch size={18} style={{ color: '#4fffb0' }} strokeWidth={1.8} />
            </div>
            <div>
              <p className="font-display text-4xl font-bold text-gradient-accent">3+</p>
              <p className="text-xs text-gray-500 mt-1">Projects shipped</p>
            </div>
          </motion.div>

          {/* Card 9: Certifications count */}
          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.02, y: -3 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="rounded-3xl p-6 flex flex-col justify-between"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8">
                <path d="M12 15l-2 5 2-1 2 1-2-5zM8.5 9a3.5 3.5 0 1 0 7 0 3.5 3.5 0 0 0-7 0z" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M20 12a8 8 0 1 0-16 0 8 8 0 0 0 16 0z" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <p className="font-display text-4xl font-bold text-white">5</p>
              <p className="text-xs text-gray-500 mt-1">Certifications earned</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
