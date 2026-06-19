import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import ClickSpark from './ClickSpark';

const projects = [
  {
    id: 1,
    title: 'AlexIS — Intelligent Support',
    description: 'A centralized platform for managing client tickets and feedback, featuring an intelligent smart auto-assignment engine to optimize support workflow.',
    tags: ['Spring Boot', 'React', 'JWT', 'Cloudinary', 'PostgreSQL', 'Docker', 'JUnit'],
    image: 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=800',
    accent: '#4fffb0',
    period: 'April 2025 — Present',
  },
  {
    id: 2,
    title: 'Medmanager',
    description: 'Medical management application with Java Spring Boot backend and Next.js frontend. Secure RESTful APIs, JWT authentication, and a dynamic, responsive user interface.',
    tags: ['Spring Boot', 'Next.js', 'JWT', 'Docker', 'CI/CD'],
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
    accent: '#00d4ff',
    period: 'Dec 2025 — May 2026',
  },
  {
    id: 3,
    title: 'Recar.ma',
    description: 'Real-world project: web application for car reservation and management. Features RESTful API integration and interactive dashboards to enhance the customer experience.',
    tags: ['React', 'Next.js', 'RESTful API'],
    image: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800',
    accent: '#f97316',
    period: 'May 2025 — July 2025',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

function ProjectCard({ project }: { project: typeof projects[0] }) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 250, damping: 22 }}
      className="group relative rounded-3xl overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow: '0 4px 30px rgba(0,0,0,0.3)',
      }}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(9,9,9,0) 0%, rgba(9,9,9,0.7) 100%)' }}
        />

        {/* Hover overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3"
          style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
        >
          
          <motion.a
            href="#"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-black"
            style={{ background: project.accent }}
          >
            
                  <span>
                    
                  </span>
            <ArrowUpRight size={14} strokeWidth={2.5} />
            Live Demo
        
          </motion.a>
           

           
          <motion.a
            href="https://github.com/mustapha-moutaki"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white"
            style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}
          >

            <Github size={14} strokeWidth={2} />
            Code

           
          </motion.a>
         
        </div>

        {/* Period badge */}
        <div
          className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium"
          style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)', color: '#aaa' }}
        >
          {project.period}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-display font-bold text-xl text-white leading-snug">
            {project.title}
          </h3>
          <motion.div
            whileHover={{ scale: 1.2, rotate: 45 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="flex-shrink-0 ml-2 w-8 h-8 rounded-lg flex items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: `${project.accent}20`, border: `1px solid ${project.accent}40` }}
          >
            <ArrowUpRight size={14} style={{ color: project.accent }} strokeWidth={2.5} />
          </motion.div>
        </div>

        <p className="text-sm text-gray-400 leading-relaxed mb-5">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-lg text-xs font-medium"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: 'rgba(255,255,255,0.5)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Accent bottom line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)` }}
      />
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="projects" className="relative py-32">
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-96 rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(79,255,176,0.3) 0%, transparent 70%)', filter: 'blur(100px)' }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6"
        >
          <div>
            <div className="section-divider mb-4" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: '#4fffb0' }}>
              Work
            </span>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mt-3">
              Selected projects
            </h2>
          </div>
          <motion.a
            href="https://github.com/mustapha-moutaki"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: 4 }}
            transition={{ type: 'spring', stiffness: 400 }}
            className="flex items-center gap-2 text-sm font-medium pb-1"
            style={{ color: '#4fffb0', borderBottom: '1px solid rgba(79,255,176,0.3)' }}
          >
            View all on GitHub
            <ArrowUpRight size={14} strokeWidth={2.5} />
          </motion.a>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
