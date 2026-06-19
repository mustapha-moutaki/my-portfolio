import { useState } from 'react';
import { motion } from 'framer-motion';

import { 
  SiAngular, SiReact, SiNextdotjs, SiTypescript, SiReactivex, SiHtml5, SiCss, 
  SiJavascript, SiBootstrap, SiTailwindcss, SiSpring, SiSpringboot, SiSpringsecurity, 
  SiLaravel, SiPhp, SiHibernate, SiMysql, SiPostgresql, SiMongodb, SiJsonwebtokens, 
  SiKeycloak, SiJunit5, SiApachemaven, SiDocker, SiJenkins, SiElasticstack, 
  SiGrafana, SiPostman, SiLinux, SiGit, SiGithub, SiGitlab 
} from "react-icons/si";

import { 
  GitMerge, Settings, Monitor, Network, Layers, ShieldCheck, 
  Database, Boxes, Workflow, FastForward, Server
} from 'lucide-react';
import { FaAws, FaJava } from "react-icons/fa6"; 
import ClickSpark from './ClickSpark';


interface SkillItem {
  
  name: string;
  hoverName?: string; 
  color: string;
  bg: string;
  border: string;
  icon: React.ReactNode;
  
}


const S = 28; // icon size


const categories: { label: string; accent: string; skills: SkillItem[] }[] = [
  {
    label: 'Front-end',
    accent: '#61dafb',
    // skills: [
    

     skills: [
      { name: 'Angular', color: '#dd0031', bg: 'rgba(221,0,49,0.08)', border: 'rgba(221,0,49,0.2)', icon: <SiAngular size={S} /> },
      { name: 'React', color: '#61dafb', bg: 'rgba(97,218,251,0.08)', border: 'rgba(97,218,251,0.2)', icon: <SiReact size={S} /> },
      { name: 'NextJS', color: '#ffffff', bg: 'rgba(255,255,255,0.08)', border: 'rgba(255,255,255,0.2)', icon: <SiNextdotjs size={S} /> },
      { name: 'TypeScript', color: '#3178c6', bg: 'rgba(49,120,198,0.08)', border: 'rgba(49,120,198,0.2)', icon: <SiTypescript size={S} /> },
      { name: 'RxJS', color: '#e0348c', bg: 'rgba(224,52,140,0.08)', border: 'rgba(224,52,140,0.2)', icon: <SiReactivex size={S} /> },
      { name: 'HTML5', color: '#e34f26', bg: 'rgba(227,79,38,0.08)', border: 'rgba(227,79,38,0.2)', icon: <SiHtml5 size={S} /> },
      { name: 'CSS3', color: '#1572b6', bg: 'rgba(21,114,182,0.08)', border: 'rgba(21,114,182,0.2)', icon: <SiCss size={S} /> },
      { name: 'JavaScript', color: '#f7df1e', bg: 'rgba(247,223,30,0.08)', border: 'rgba(247,223,30,0.2)', icon: <SiJavascript size={S} /> },
      { name: 'Bootstrap', color: '#7952b3', bg: 'rgba(121,82,179,0.08)', border: 'rgba(121,82,179,0.2)', icon: <SiBootstrap size={S} /> },
      { name: 'Tailwind', color: '#38bdf8', bg: 'rgba(56,189,248,0.08)', border: 'rgba(56,189,248,0.2)', icon: <SiTailwindcss size={S} /> },
    ],
  },
  {
    label: 'Back-end',
    accent: '#6db33f',
    
    skills: [
      { name: 'Java', color: '#f89820', bg: 'rgba(248,152,32,0.08)', border: 'rgba(248,152,32,0.2)', icon: <FaJava size={S} /> },
      { name: 'Spring', color: '#6db33f', bg: 'rgba(109,179,63,0.08)', border: 'rgba(109,179,63,0.2)', icon: <SiSpring size={S} /> },
      { name: 'Spring Boot', color: '#6db33f', bg: 'rgba(109,179,63,0.08)', border: 'rgba(109,179,63,0.2)', icon: <SiSpringboot size={S} /> },
      { name: 'Laravel', color: '#ff2d20', bg: 'rgba(255,45,32,0.08)', border: 'rgba(255,45,32,0.2)', icon: <SiLaravel size={S} /> },
      { name: 'PHP', color: '#8892be', bg: 'rgba(136,146,190,0.08)', border: 'rgba(136,146,190,0.2)', icon: <SiPhp size={S} /> },
      { name: 'Spring MVC', color: '#6db33f', bg: 'rgba(109,179,63,0.06)', border: 'rgba(109,179,63,0.15)', icon: <Workflow size={S} /> },
      { name: 'Spring Data JPA', color: '#6db33f', bg: 'rgba(109,179,63,0.06)', border: 'rgba(109,179,63,0.12)', icon: <Database size={S} /> },
      { name: 'Spring Security', color: '#6db33f', bg: 'rgba(109,179,63,0.07)', border: 'rgba(109,179,63,0.15)', icon: <SiSpringsecurity size={S} /> },
      { name: 'Hibernate', color: '#59666c', bg: 'rgba(89,102,108,0.1)', border: 'rgba(89,102,108,0.2)', icon: <SiHibernate size={S} /> },
    ],
  },
  {
    label: 'Databases',
    accent: '#47a248',
   
    skills: [
      { name: 'MySQL', color: '#00758f', bg: 'rgba(0,117,143,0.08)', border: 'rgba(0,117,143,0.2)', icon: <SiMysql size={S} /> },
      { name: 'PostgreSQL', color: '#4a90d9', bg: 'rgba(74,144,217,0.08)', border: 'rgba(74,144,217,0.2)', icon: <SiPostgresql size={S} /> },
      { name: 'MongoDB', color: '#47a248', bg: 'rgba(71,162,72,0.08)', border: 'rgba(71,162,72,0.2)', icon: <SiMongodb size={S} /> },
    ],
  },
  {
    label: 'APIs & Architecture',
    accent: '#4fffb0',
   
    skills: [
      { name: 'DDD', hoverName: 'Domain Driven Design', color: '#6366f1', bg: 'rgba(99,102,241,0.07)', border: 'rgba(99,102,241,0.18)', icon: <Layers size={S} /> },
      { name: 'REST APIs', color: '#4fffb0', bg: 'rgba(79,255,176,0.07)', border: 'rgba(79,255,176,0.18)', icon: <Network size={S} /> },
      { name: 'Microservices', color: '#00d4ff', bg: 'rgba(0,212,255,0.07)', border: 'rgba(0,212,255,0.18)', icon: <Boxes size={S} /> },
      { name: 'API Gateway', color: '#f97316', bg: 'rgba(249,115,22,0.07)', border: 'rgba(249,115,22,0.18)', icon: <Monitor size={S} /> },
      { name: 'JWT Auth', color: '#d63aff', bg: 'rgba(214,58,255,0.07)', border: 'rgba(214,58,255,0.18)', icon: <SiJsonwebtokens size={S} /> },
      { name: 'Keycloak', color: '#2563eb', bg: 'rgba(37,99,235,0.07)', border: 'rgba(37,99,235,0.18)', icon: <SiKeycloak size={S} /> },
    ],
  },
  {
    label: 'Testing',
    accent: '#25a162',
  
     skills: [
      { name: 'JUnit', color: '#25a162', bg: 'rgba(37,161,98,0.08)', border: 'rgba(37,161,98,0.2)', icon: <SiJunit5 size={S} /> },
      { name: 'Mockito', color: '#78c97f', bg: 'rgba(120,201,127,0.07)', border: 'rgba(120,201,127,0.18)', icon: <ShieldCheck size={S} /> },
      { name: 'Jasmine', color: '#8a4182', bg: 'rgba(138,65,130,0.08)', border: 'rgba(138,65,130,0.2)', icon: <FastForward size={S} /> },
    ],
  },
  {
    label: 'Tools & DevOps',
    accent: '#2496ed',
 
  skills: [
      { name: 'Maven', color: '#c71a36', bg: 'rgba(199,26,54,0.08)', border: 'rgba(199,26,54,0.2)', icon: <SiApachemaven size={S} /> },
      { name: 'Docker', color: '#2496ed', bg: 'rgba(36,150,237,0.08)', border: 'rgba(36,150,237,0.2)', icon: <SiDocker size={S} /> },
      { name: 'Jenkins', color: '#d33833', bg: 'rgba(211,56,51,0.08)', border: 'rgba(211,56,51,0.2)', icon: <SiJenkins size={S} /> },
      { name: 'ELK Stack', color: '#facc15', bg: 'rgba(250,204,21,0.08)', border: 'rgba(250,204,21,0.2)', icon: <SiElasticstack size={S} /> },
      { name: 'Grafana', color: '#f97316', bg: 'rgba(249,115,22,0.08)', border: 'rgba(249,115,22,0.2)', icon: <SiGrafana size={S} /> },
      { name: 'Postman', color: '#ff6c37', bg: 'rgba(255,108,55,0.08)', border: 'rgba(255,108,55,0.2)', icon: <SiPostman size={S} /> },
      { name: 'Linux', color: '#fcc624', bg: 'rgba(252,198,36,0.08)', border: 'rgba(252,198,36,0.2)', icon: <SiLinux size={S} /> },
    ],
  },
  {
    label: 'Version Control',
    accent: '#f05032',
  
     skills: [
      { name: 'Git', color: '#f05032', bg: 'rgba(240,80,50,0.08)', border: 'rgba(240,80,50,0.2)', icon: <SiGit size={S} /> },
      { name: 'GitHub', color: '#ffffff', bg: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.12)', icon: <SiGithub size={S} /> },
      { name: 'GitLab', color: '#fc6d26', bg: 'rgba(252,109,38,0.08)', border: 'rgba(252,109,38,0.2)', icon: <SiGitlab size={S} /> },
    ],
  },
  {
  label: 'Cloud & Infrastructure',
  accent: '#ff9900',
  skills: [
      { name: 'AWS', color: '#ff9900', bg: 'rgba(255,153,0,0.08)', border: 'rgba(255,153,0,0.2)', icon: <FaAws size={S} />  },
      { name: 'EC2', color: '#ff9900', bg: 'rgba(255,153,0,0.08)', border: 'rgba(255,153,0,0.2)', icon: <Monitor size={S} /> },
      { name: 'S3', color: '#569a31', bg: 'rgba(86,154,49,0.08)', border: 'rgba(86,154,49,0.2)', icon: <Layers size={S} /> },
    
  ],
},
  {
    label: 'Methodologies',
    accent: '#a78bfa',
     skills: [
      { name: 'Agile', color: '#a78bfa', bg: 'rgba(167,139,250,0.08)', border: 'rgba(167,139,250,0.2)', icon: <Workflow size={S} /> },
      { name: 'Scrum', color: '#34d399', bg: 'rgba(52,211,153,0.08)', border: 'rgba(52,211,153,0.2)', icon: <GitMerge size={S} /> },
      { name: 'CI/CD', color: '#60a5fa', bg: 'rgba(96,165,250,0.08)', border: 'rgba(96,165,250,0.2)', icon: <Settings size={S} /> },
    ],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

function SkillCard({ skill }: { skill: SkillItem }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6, scale: 1.07 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      transition={{ type: 'spring', stiffness: 320, damping: 20 }}
      className="group relative flex flex-col items-center gap-3 p-4 rounded-2xl cursor-default"
      style={{
        background: skill.bg,
        border: `1px solid ${skill.border}`,
        boxShadow: '0 2px 12px rgba(0,0,0,0.18)',
      }}
    >
       <ClickSpark
  sparkColor="#ffffff"
  sparkSize={10}
  sparkRadius={15}
  sparkCount={8}
  duration={400}
>
     
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ boxShadow: `0 0 24px ${skill.color}38` }}
      />
      <div className="relative z-10" style={{ color: skill.color }}>
        {skill.icon}
      </div>
      <span
        className="relative z-10 text-[11px] font-medium text-center leading-tight transition-all duration-200"
        style={{ color: 'rgba(255,255,255,0.65)' }}
      >
        {isHovered && skill.hoverName ? skill.hoverName : skill.name}
      </span>
      </ClickSpark>
    </motion.div>
    
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-32">
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(0,212,255,0.4) 0%, transparent 70%)', filter: 'blur(80px)' }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4"
        >
          <div className="section-divider mb-4" />
          <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: '#4fffb0' }}>
            Expertise
          </span>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-3">
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white">
              Full tech stack
            </h2>

            {/* Pop!_OS badge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              whileHover={{ y: -3, boxShadow: '0 10px 28px rgba(72,185,199,0.2)' }}
              className="flex items-center gap-3 px-4 py-2.5 rounded-2xl self-start sm:self-auto"
              style={{ background: 'rgba(72,185,199,0.08)', border: '1px solid rgba(72,185,199,0.25)' }}
            >
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(72,185,199,0.18)' }}
              >
                <Server size={18} /> 
              </div>
              <div>
                <p className="text-xs font-semibold text-white leading-none mb-0.5">Pop!_OS</p>
                <p className="text-[10px]" style={{ color: 'rgba(72,185,199,0.7)' }}>Daily driver OS</p>
              </div>
            </motion.div>
          </div>
          <p className="text-gray-400 mt-4 max-w-xl">
            Technologies I use to build robust, scalable, and production-ready software across the full stack.
          </p>
        </motion.div>

        <div className="mt-12 space-y-12">
          {categories.map((category) => (
            <div key={category.label}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: category.accent }} />
                <h3
                  className="text-[11px] font-semibold tracking-[0.18em] uppercase"
                  style={{ color: 'rgba(255,255,255,0.38)' }}
                >
                  {category.label}
                </h3>
                <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.05)' }} />
              </div>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-9 gap-3"
              >
                {category.skills.map((skill) => (
                  <SkillCard key={skill.name} skill={skill} />
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}