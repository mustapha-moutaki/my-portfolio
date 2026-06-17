import { useState } from 'react';
import { motion } from 'framer-motion';
import { GitMerge, Settings, Monitor, Cpu, Network, Layers } from 'lucide-react';

interface SkillItem {
  name: string;
  hoverName?: string; // Added for the DDD requirement
  color: string;
  bg: string;
  border: string;
  icon: React.ReactNode;
}

const S = 28; // icon size

/* ─── Inline SVG icons ─── */
const icons = {
  Angular: <svg viewBox="0 0 32 32" width={S} height={S}><rect width="32" height="32" rx="5" fill="#1a0005"/><polygon points="16,4 5,8 7,22 16,28 25,22 27,8" fill="#dd0031"/><polygon points="16,4 16,28 25,22 27,8" fill="#c3002f" opacity="0.55"/><polygon points="16,8 10.5,22 12.5,22 13.8,18.5 18.2,18.5 19.5,22 21.5,22" fill="white"/><polygon points="16,12 14.5,17.5 17.5,17.5" fill="white"/></svg>,
  React: <svg viewBox="0 0 32 32" width={S} height={S}><rect width="32" height="32" rx="5" fill="#111"/><circle cx="16" cy="16" r="2.4" fill="#61dafb"/><ellipse cx="16" cy="16" rx="10" ry="3.8" stroke="#61dafb" strokeWidth="1.2" fill="none"/><ellipse cx="16" cy="16" rx="10" ry="3.8" stroke="#61dafb" strokeWidth="1.2" fill="none" transform="rotate(60 16 16)"/><ellipse cx="16" cy="16" rx="10" ry="3.8" stroke="#61dafb" strokeWidth="1.2" fill="none" transform="rotate(120 16 16)"/></svg>,
  NextJS: <svg viewBox="0 0 32 32" width={S} height={S}><rect width="32" height="32" rx="5" fill="#000"/><path d="M22.5 10.5L13.8 21.7l-.8-2.2-4.5-6h-1.5v13h2.2v-8.8l7.5 10.3h1.8v-13h-2.2v7z" fill="white"/></svg>,
  TypeScript: <svg viewBox="0 0 32 32" width={S} height={S}><rect width="32" height="32" rx="5" fill="#3178c6"/><path d="M18.8 18.5v1.5c.4.2.9.3 1.4.3.5 0 .9-.1 1.3-.3.4-.2.6-.4.8-.8.2-.3.3-.7.3-1.2 0-.4-.1-.8-.3-1.1-.2-.3-.4-.5-.7-.7-.3-.2-.7-.4-1.1-.5-.4-.1-.7-.3-.9-.4-.2-.1-.3-.3-.3-.5 0-.2.1-.3.2-.4.2-.1.4-.2.6-.2.2 0 .4.1.6.2.2.1.3.2.5.3l1-1.2c-.2-.2-.5-.4-.8-.5-.4-.1-.8-.2-1.2-.2-.5 0-.9.1-1.2.3-.4.2-.6.4-.8.7-.2.3-.3.6-.3 1 0 .6.2 1.1.5 1.5.4.3.9.6 1.5.8.4.1.7.3.9.4.2.2.3.4.3.6 0 .2-.1.4-.3.5-.2.1-.4.2-.7.2-.3 0-.6-.1-.9-.2-.2-.1-.4-.3-.6-.5zM13.5 14h2.4v7.5H17V14h2.4v-1.5h-6V14z" fill="white"/></svg>,
  RxJS: <svg viewBox="0 0 32 32" width={S} height={S}><rect width="32" height="32" rx="5" fill="#14001c"/><circle cx="16" cy="16" r="8" stroke="#e0348c" strokeWidth="1.4" fill="none"/><circle cx="16" cy="16" r="4" stroke="#e0348c" strokeWidth="1.2" fill="none"/><line x1="16" y1="8" x2="16" y2="12" stroke="#e0348c" strokeWidth="1.4"/><line x1="16" y1="20" x2="16" y2="24" stroke="#e0348c" strokeWidth="1.4"/><line x1="8" y1="16" x2="12" y2="16" stroke="#e0348c" strokeWidth="1.4"/><line x1="20" y1="16" x2="24" y2="16" stroke="#e0348c" strokeWidth="1.4"/></svg>,
  HTML5: <svg viewBox="0 0 32 32" width={S} height={S}><rect width="32" height="32" rx="5" fill="#1a0a00"/><path d="M8 6l1.8 20L16 28l6.2-2L24 6H8z" fill="#e34f26"/><path d="M16 26.2V7.8h6.5l-1.3 16.5L16 26.2z" fill="#ef652a"/><path d="M16 13h-3.8l.25 2.8H16v2.9h-3.5l.3 2.8 3.2 1 3.2-1 .4-4.5H16V13zM12.5 10H16v2.8h-3.3l-.2-2.8z" fill="white"/></svg>,
  CSS3: <svg viewBox="0 0 32 32" width={S} height={S}><rect width="32" height="32" rx="5" fill="#00081a"/><path d="M8 6l1.8 20L16 28l6.2-2L24 6H8z" fill="#1572b6"/><path d="M16 26.2V7.8h6.5l-1.3 16.5L16 26.2z" fill="#33a9dc"/><path d="M19.5 10.5H16v2.8h3.2l-.2 2H16v2.8h2.8l-.3 2.9-2.5.8-2.5-.8-.2-1.9H16l.1.9 1.9.5 1.9-.5.2-2.4H13l-.5-5.7H16v-1.4H12.7L12.5 10h7L19.5 10.5z" fill="white"/></svg>,
  JavaScript: <svg viewBox="0 0 32 32" width={S} height={S}><rect width="32" height="32" rx="5" fill="#f7df1e"/><path d="M11 24c.6 1 1.3 1.7 2.8 1.7 1.6 0 2.5-.8 2.5-2.3V14h-2.2v9.4c0 .6-.3 1-.8 1-.5 0-.8-.3-1.1-.8L11 24zm7.5-.3c.7 1.1 1.7 1.9 3.4 1.9 1.8 0 3.1-.9 3.1-2.7 0-1.5-.9-2.2-2.5-2.9l-.5-.2c-.8-.4-1.1-.6-1.1-1.2 0-.5.4-.8.9-.8.6 0 1 .3 1.4.8l1.7-1c-.7-1.1-1.7-1.6-3.1-1.6-1.9 0-3 1.1-3 2.7 0 1.5.9 2.3 2.3 2.9l.5.2c.9.4 1.4.7 1.4 1.4 0 .6-.5 1-1.2 1-.9 0-1.4-.5-1.8-1.1l-2 1.1.5-.5z" fill="#333"/></svg>,
  Bootstrap: <svg viewBox="0 0 32 32" width={S} height={S}><rect width="32" height="32" rx="5" fill="#7952b3" opacity="0.15"/><rect x="3" y="3" width="26" height="26" rx="5" fill="#7952b3"/><text x="16" y="23" textAnchor="middle" fontSize="18" fontWeight="bold" fill="white" fontFamily="serif">B</text></svg>,
  Tailwind: <svg viewBox="0 0 32 32" width={S} height={S}><rect width="32" height="32" rx="5" fill="#0f172a"/><path d="M10 17.5c.7-3 2.5-4.5 5-4.5 3.7 0 4.1 2.8 5.8 3.2 1.3.3 2.4-.2 2.9-1.9C23 17 21.3 18.8 18.8 18.8c-3.7 0-4.1-2.8-5.8-3.2-1.3-.3-2.4.3-3 1.9z" fill="#38bdf8"/><path d="M7 21c.7-3 2.5-4.5 5-4.5 3.7 0 4.1 2.8 5.8 3.2 1.3.3 2.4-.2 2.9-1.9-.7 2.7-2.4 4.1-4.9 4.1-3.7 0-4.1-2.7-5.8-3.2-1.3-.3-2.4.3-3 1.9v.4z" fill="#38bdf8" opacity="0.65"/></svg>,
  Java: <svg viewBox="0 0 32 32" width={S} height={S}><rect width="32" height="32" rx="5" fill="#111"/><path d="M13 21.5c0 0 -1.2.7.8.9 2.4.3 3.6.2 6.2-.2 0 0 .7.4 1.6.8C14.8 25.6 6.5 22.7 13 21.5zM12.2 18.8c0 0 -1.3.9 0.7 1.1 2.5.3 4.4.3 7.7-.4 0 0 .5.5 1.2.7C13 22.1 5.5 20 12.2 18.8z" fill="#f89820"/><path d="M17.5 12.5c1.8 2.1.4 4-.4 4.8C19 14.8 18.5 12 14 9c0 0 2.2 1.7 3.5 3.5zM20.7 23.5c0 0 .9.8-1 1.4-3.5 1.1-14.6.7-13-.6 1-1 5.2-.5 5.2-.5 0 0-5.8-1.3-6.3.1C5 25.3 14.8 27 22 25.1c1.7-.4 1.7-1.6.7-1.6z" fill="#f89820"/><path d="M14 6s3 3-2.9 7.6c-4.8 3.7-1.1 5.8 0 8.2C8.7 19 7.5 17.2 8 15.5 8.8 13 16.5 12.5 14 6z" fill="#f89820"/><path d="M13.6 25.6c0 0 .7.6-.8.9C9.4 27.3 3.5 27 3.9 26c.3-.7 2.1-1 3.3-1.1 0 0-3.4-.5-3.7.2 0 0-.6 2.2 7.5 2.2C13.4 27.3 14.8 26.5 13.6 25.6z" fill="#f89820"/></svg>,
  Spring: <svg viewBox="0 0 32 32" width={S} height={S}><rect width="32" height="32" rx="5" fill="#0a1500"/><circle cx="16" cy="16" r="9" fill="none" stroke="#6db33f" strokeWidth="1.5"/><path d="M13.5 11.5c2.5-4.5 8-3.5 8 2s-5.5 7.5-5.5 7.5" stroke="#6db33f" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>,
  'Spring Boot': <svg viewBox="0 0 32 32" width={S} height={S}><rect width="32" height="32" rx="5" fill="#0a1500"/><circle cx="16" cy="16" r="9" fill="none" stroke="#6db33f" strokeWidth="1.5"/><path d="M13.5 11.5c2.5-4.5 8-3.5 8 2s-5.5 7.5-5.5 7.5" stroke="#6db33f" strokeWidth="1.5" fill="none" strokeLinecap="round"/><circle cx="16" cy="21" r="1.3" fill="#6db33f"/></svg>,
  Laravel: <svg viewBox="0 0 32 32" width={S} height={S}><rect width="32" height="32" rx="5" fill="#1a0200"/><path d="M27.5 8.3L21.2 6l-5.7 3.3-6.1-2.3L4 9.5v5.7l5.4 3.1v6.2l6.1 2.3 6.1-2.3v-6.2l5.9-3.1V8.3z" fill="none" stroke="#ff2d20" strokeWidth="1"/><path d="M9.4 15.2l6.1 3.5v6.2M15.5 18.7V9.3M9.4 9.5l6.1 3.5 6.1-3.5M21.6 15.2l-6.1 3.5" stroke="#ff2d20" strokeWidth="1" fill="none"/></svg>,
  PHP: <svg viewBox="0 0 32 32" width={S} height={S}><rect width="32" height="32" rx="5" fill="#120018"/><ellipse cx="16" cy="16" rx="13" ry="7" fill="none" stroke="#8892be" strokeWidth="1.2"/><text x="16" y="20" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#8892be" fontFamily="monospace">PHP</text></svg>,
  'Spring MVC': <svg viewBox="0 0 32 32" width={S} height={S}><rect width="32" height="32" rx="5" fill="#0a1500"/><path d="M10 22L16 9l6 13H10z" fill="none" stroke="#6db33f" strokeWidth="1.5"/><line x1="12" y1="17.5" x2="20" y2="17.5" stroke="#6db33f" strokeWidth="1.2"/></svg>,
  'Spring Data JPA': <svg viewBox="0 0 32 32" width={S} height={S}><rect width="32" height="32" rx="5" fill="#0a1500"/><ellipse cx="16" cy="12" rx="8" ry="3.5" fill="none" stroke="#6db33f" strokeWidth="1.3"/><path d="M8 12v8c0 2 3.6 3.5 8 3.5s8-1.5 8-3.5v-8" stroke="#6db33f" strokeWidth="1.3" fill="none"/><line x1="8" y1="16" x2="24" y2="16" stroke="#6db33f" strokeWidth="0.8" strokeDasharray="2 2"/></svg>,
  'Spring Security': <svg viewBox="0 0 32 32" width={S} height={S}><rect width="32" height="32" rx="5" fill="#0a1500"/><path d="M16 5L8 8.5v7c0 5.2 3.4 9.8 8 11.5 4.6-1.7 8-6.3 8-11.5v-7L16 5z" fill="none" stroke="#6db33f" strokeWidth="1.4"/><path d="M12.5 16l2.5 2.5 4.5-4.5" stroke="#6db33f" strokeWidth="1.6" strokeLinecap="round" fill="none"/></svg>,
  Hibernate: <svg viewBox="0 0 32 32" width={S} height={S}><rect width="32" height="32" rx="5" fill="#111"/><path d="M7 8h4l3 8 3-8h4l-5 16h-4z" fill="#59666c"/></svg>,
  MySQL: <svg viewBox="0 0 32 32" width={S} height={S}><rect width="32" height="32" rx="5" fill="#0a1520"/><path d="M6 22c4-2 8-10 14-10s6 5 10 3" stroke="#00758f" strokeWidth="2" fill="none" strokeLinecap="round"/><ellipse cx="16" cy="11" rx="8" ry="2.5" fill="#00758f" opacity="0.7"/></svg>,
  PostgreSQL: <svg viewBox="0 0 32 32" width={S} height={S}><rect width="32" height="32" rx="5" fill="#0a102a"/><ellipse cx="16" cy="10" rx="8" ry="3" fill="#4a90d9"/><rect x="8" y="10" width="16" height="10" fill="#336791"/><ellipse cx="16" cy="20" rx="8" ry="3" fill="#4a90d9"/><path d="M20 14.5c0 2.2-1.8 4-4 4s-4-1.8-4-4" stroke="white" strokeWidth="1.2" fill="none" opacity="0.5"/></svg>,
  MongoDB: <svg viewBox="0 0 32 32" width={S} height={S}><rect width="32" height="32" rx="5" fill="#0a1500"/><path d="M16 5c-1.2 4.5-5.5 8-5.5 13 0 3.5 2.4 6.5 5.5 6.5s5.5-3 5.5-6.5C21.5 13 17.2 9.5 16 5z" fill="#47a248"/><rect x="15.2" y="18" width="1.6" height="9" rx="0.8" fill="#9ccc6f"/></svg>,
  JWT: <svg viewBox="0 0 32 32" width={S} height={S}><rect width="32" height="32" rx="5" fill="#110018"/><circle cx="16" cy="16" r="2" fill="#d63aff"/><path d="M16 6v6M16 20v6M6 16h6M20 16h6" stroke="#d63aff" strokeWidth="1.5" strokeLinecap="round"/><path d="M9 9l4 4M19 19l4 4M9 23l4-4M19 13l4-4" stroke="#d63aff" strokeWidth="1" strokeLinecap="round" opacity="0.5"/></svg>,
  JUnit: <svg viewBox="0 0 32 32" width={S} height={S}><rect width="32" height="32" rx="5" fill="#001a0a"/><circle cx="16" cy="16" r="8" fill="none" stroke="#25a162" strokeWidth="1.4"/><path d="M12 16l3 3 5-5" stroke="#25a162" strokeWidth="1.8" strokeLinecap="round" fill="none"/></svg>,
  Mockito: <svg viewBox="0 0 32 32" width={S} height={S}><rect width="32" height="32" rx="5" fill="#001a00"/><path d="M8 24V12l8-5 8 5v12l-8 4-8-4z" fill="none" stroke="#78c97f" strokeWidth="1.3"/><path d="M8 12l8 5 8-5M16 17v7" stroke="#78c97f" strokeWidth="1.2" fill="none"/></svg>,
  Jasmine: <svg viewBox="0 0 32 32" width={S} height={S}><rect width="32" height="32" rx="5" fill="#100018"/><circle cx="16" cy="16" r="6" fill="#8a4182" opacity="0.7"/><circle cx="16" cy="10" r="2" fill="#8a4182"/><circle cx="22" cy="13" r="2" fill="#8a4182"/><circle cx="22" cy="19" r="2" fill="#8a4182"/><circle cx="16" cy="22" r="2" fill="#8a4182"/><circle cx="10" cy="19" r="2" fill="#8a4182"/><circle cx="10" cy="13" r="2" fill="#8a4182"/></svg>,
  Maven: <svg viewBox="0 0 32 32" width={S} height={S}><rect width="32" height="32" rx="5" fill="#1a0005"/><path d="M8 8h5l3 10 3-10h5l-5 16h-6z" fill="#c71a36"/></svg>,
  Docker: <svg viewBox="0 0 32 32" width={S} height={S}><rect width="32" height="32" rx="5" fill="#0d1117"/><path d="M9.5 14.5h3v3h-3v-3zm3.5 0h3v3h-3v-3zm3.5 0h3v3h-3v-3zm-7-3h3v3h-3v-3zm3.5 0h3v3h-3v-3zm3.5 0h3v3h-3v-3zm3.5 3.5h2.5v3h-2.5v-3z" fill="#2496ed"/><path d="M25.8 15.7c-.3-.3-1.1-.5-1.9-.4-.2-.8-.7-1.5-1.5-1.8l-.3-.1-.2.3c-.2.4-.3 1-.2 1.4-.1 0-.2.1-.3.2-.3.2-.5.5-.7.9H8c-.1.3-.2.8-.1 1.2.2 1 .8 1.8 1.7 2.3.5.3 1.1.5 1.7.6.3.1.6.1.9.1h1c-.2.4-.2.8 0 1.2h3.5c.2-.4.2-.9 0-1.3h.5c.3 0 .7-.1 1-.2.4-.2.7-.5.9-1 .7-.1 1.3-.4 1.7-.9.7-.7.8-1.6.8-1.7v-.2z" fill="#2496ed"/></svg>,
  Jenkins: <svg viewBox="0 0 32 32" width={S} height={S}><rect width="32" height="32" rx="5" fill="#1a0000"/><circle cx="16" cy="13.5" r="6.5" fill="none" stroke="#d33833" strokeWidth="1.4"/><circle cx="16" cy="13.5" r="2.5" fill="#d33833" opacity="0.7"/><rect x="15.2" y="19" width="1.6" height="7" rx="0.8" fill="#d33833"/></svg>,
  Postman: <svg viewBox="0 0 32 32" width={S} height={S}><rect width="32" height="32" rx="5" fill="#1a0d00"/><circle cx="16" cy="16" r="9" fill="#ff6c37" opacity="0.15"/><circle cx="16" cy="16" r="9" fill="none" stroke="#ff6c37" strokeWidth="1.3"/><path d="M12 16h8M16 12l4 4-4 4" stroke="#ff6c37" strokeWidth="1.5" strokeLinecap="round" fill="none"/></svg>,
  Linux: <svg viewBox="0 0 32 32" width={S} height={S}><rect width="32" height="32" rx="5" fill="#1a1400"/><ellipse cx="16" cy="13" rx="5.5" ry="7" fill="none" stroke="#fcc624" strokeWidth="1.3"/><circle cx="13.5" cy="12" r="1.2" fill="#fcc624"/><circle cx="18.5" cy="12" r="1.2" fill="#fcc624"/><path d="M13.5 15.5c0 0 1.2 1.5 2.5 1.5s2.5-1.5 2.5-1.5" stroke="#fcc624" strokeWidth="1" fill="none" strokeLinecap="round"/><path d="M11 20c.5-1 1.5-2 2-3M21 20c-.5-1-1.5-2-2-3M11 20l-2 4h4.5M21 20l2 4h-4.5" stroke="#fcc624" strokeWidth="1.2" fill="none" strokeLinecap="round"/></svg>,
  Git: <svg viewBox="0 0 32 32" width={S} height={S}><rect width="32" height="32" rx="5" fill="#1a0a00"/><path d="M26 14.8L17 5.8c-.8-.8-2-.8-2.8 0l-2 2 2.5 2.5c.6-.2 1.4 0 1.9.6.5.5.7 1.3.5 2l2.4 2.4c.7-.2 1.5 0 1.9.5.8.8.8 2 0 2.8-.8.8-2 .8-2.8 0-.6-.6-.7-1.4-.5-2.1l-2.2-2.2v5.8c.4.2.9.6 1.1 1.1.8.8.8 2 0 2.8-.8.8-2 .8-2.8 0-.8-.8-.8-2 0-2.8.3-.3.7-.5 1.1-.6V14.4c-.4-.1-.8-.3-1.1-.6-.6-.6-.7-1.4-.5-2.1L11 9.5l-5.5 5.5c-.8.8-.8 2 0 2.8l9 9c.8.8 2 .8 2.8 0l8.7-8.7c.8-.7.8-2 0-2.3z" fill="#f05032"/></svg>,
  GitHub: <svg viewBox="0 0 32 32" width={S} height={S}><rect width="32" height="32" rx="5" fill="#111"/><path d="M16 6C10.47 6 6 10.5 6 16c0 4.4 2.87 8.2 6.84 9.5.5.1.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.04 1.53 1.04.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.26-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.38.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48C23.13 24.2 26 20.4 26 16 26 10.5 21.52 6 16 6z" fill="#ccc"/></svg>,
  GitLab: <svg viewBox="0 0 32 32" width={S} height={S}><rect width="32" height="32" rx="5" fill="#1a0d00"/><path d="M16 26L6 16.2l2.2-6.7 2.2 6.7H21.6l2.2-6.7L26 16.2z" fill="#fc6d26"/><path d="M16 26L10.4 16.2H21.6z" fill="#fca326"/><path d="M10.4 16.2L8.2 9.5l-2 5.8z" fill="#e24329" opacity="0.8"/><path d="M21.6 16.2L23.8 9.5l2 5.8z" fill="#e24329" opacity="0.8"/></svg>,
  Keycloak: <svg viewBox="0 0 32 32" width={S} height={S}><rect width="32" height="32" rx="5" fill="#001529"/><path d="M16 8l-8 5v11h16V13l-8-5zm0 5a2.5 2.5 0 110 5 2.5 2.5 0 010-5zm3 9h-6v-1.5h1.5V18h3v2.5H19V22z" fill="#44b6c3"/></svg>,
  
  ELK: <svg viewBox="0 0 32 32" width={S} height={S}><rect width="32" height="32" rx="5" fill="#0d1117"/><path d="M16 10a6 6 0 00-6 6h12a6 6 0 00-6-6z" fill="#00bfb3"/><path d="M10 16a6 6 0 006 6v-6H10z" fill="#fec514"/><path d="M22 16a6 6 0 00-6 6v-6h6z" fill="#e05a9b"/></svg>,
  
  Grafana: <svg viewBox="0 0 32 32" width={S} height={S}><rect width="32" height="32" rx="5" fill="#1a1100"/><path d="M16 8c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 13c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5z" fill="#f99d1c" opacity="0.3"/><path d="M16 11a5 5 0 00-5 5h2a3 3 0 013-3v-2zm0 10a5 5 0 005-5h-2a3 3 0 01-3 3v2z" fill="#f99d1c"/></svg>,
};

const categories: { label: string; accent: string; skills: SkillItem[] }[] = [
  {
    label: 'Front-end',
    accent: '#61dafb',
    skills: [
      { name: 'Angular', color: '#dd0031', bg: 'rgba(221,0,49,0.08)', border: 'rgba(221,0,49,0.2)', icon: icons.Angular },
      { name: 'React', color: '#61dafb', bg: 'rgba(97,218,251,0.08)', border: 'rgba(97,218,251,0.2)', icon: icons.React },
      { name: 'NextJS', color: '#ffffff', bg: 'rgba(255,255,255,0.08)', border: 'rgba(255,255,255,0.2)', icon: icons.NextJS },
      { name: 'TypeScript', color: '#3178c6', bg: 'rgba(49,120,198,0.08)', border: 'rgba(49,120,198,0.2)', icon: icons.TypeScript },
      { name: 'RxJS', color: '#e0348c', bg: 'rgba(224,52,140,0.08)', border: 'rgba(224,52,140,0.2)', icon: icons.RxJS },
      { name: 'HTML5', color: '#e34f26', bg: 'rgba(227,79,38,0.08)', border: 'rgba(227,79,38,0.2)', icon: icons.HTML5 },
      { name: 'CSS3', color: '#1572b6', bg: 'rgba(21,114,182,0.08)', border: 'rgba(21,114,182,0.2)', icon: icons.CSS3 },
      { name: 'JavaScript', color: '#f7df1e', bg: 'rgba(247,223,30,0.08)', border: 'rgba(247,223,30,0.2)', icon: icons.JavaScript },
      { name: 'Bootstrap', color: '#7952b3', bg: 'rgba(121,82,179,0.08)', border: 'rgba(121,82,179,0.2)', icon: icons.Bootstrap },
      { name: 'Tailwind', color: '#38bdf8', bg: 'rgba(56,189,248,0.08)', border: 'rgba(56,189,248,0.2)', icon: icons.Tailwind },
    ],
  },
  {
    label: 'Back-end',
    accent: '#6db33f',
    skills: [
      { name: 'Java', color: '#f89820', bg: 'rgba(248,152,32,0.08)', border: 'rgba(248,152,32,0.2)', icon: icons.Java },
      { name: 'Spring', color: '#6db33f', bg: 'rgba(109,179,63,0.08)', border: 'rgba(109,179,63,0.2)', icon: icons.Spring },
      { name: 'Spring Boot', color: '#6db33f', bg: 'rgba(109,179,63,0.08)', border: 'rgba(109,179,63,0.2)', icon: icons['Spring Boot'] },
      { name: 'Laravel', color: '#ff2d20', bg: 'rgba(255,45,32,0.08)', border: 'rgba(255,45,32,0.2)', icon: icons.Laravel },
      { name: 'PHP', color: '#8892be', bg: 'rgba(136,146,190,0.08)', border: 'rgba(136,146,190,0.2)', icon: icons.PHP },
      { name: 'Spring MVC', color: '#6db33f', bg: 'rgba(109,179,63,0.06)', border: 'rgba(109,179,63,0.15)', icon: icons['Spring MVC'] },
      { name: 'Spring Data JPA', color: '#6db33f', bg: 'rgba(109,179,63,0.06)', border: 'rgba(109,179,63,0.12)', icon: icons['Spring Data JPA'] },
      { name: 'Spring Security', color: '#6db33f', bg: 'rgba(109,179,63,0.07)', border: 'rgba(109,179,63,0.15)', icon: icons['Spring Security'] },
      { name: 'Hibernate', color: '#59666c', bg: 'rgba(89,102,108,0.1)', border: 'rgba(89,102,108,0.2)', icon: icons.Hibernate },
    ],
  },
  {
    label: 'Databases',
    accent: '#47a248',
    skills: [
      { name: 'MySQL', color: '#00758f', bg: 'rgba(0,117,143,0.08)', border: 'rgba(0,117,143,0.2)', icon: icons.MySQL },
      { name: 'PostgreSQL', color: '#4a90d9', bg: 'rgba(74,144,217,0.08)', border: 'rgba(74,144,217,0.2)', icon: icons.PostgreSQL },
      { name: 'MongoDB', color: '#47a248', bg: 'rgba(71,162,72,0.08)', border: 'rgba(71,162,72,0.2)', icon: icons.MongoDB },
    ],
  },
  {
    label: 'APIs & Architecture',
    accent: '#4fffb0',
    skills: [
      { name: 'DDD', hoverName: 'Domain Driven Design', color: '#6366f1', bg: 'rgba(99,102,241,0.07)', border: 'rgba(99,102,241,0.18)', icon: <Layers size={S} strokeWidth={1.5} /> },
      { name: 'REST APIs', color: '#4fffb0', bg: 'rgba(79,255,176,0.07)', border: 'rgba(79,255,176,0.18)', icon: <Network size={S} strokeWidth={1.5} /> },
      { name: 'Microservices', color: '#00d4ff', bg: 'rgba(0,212,255,0.07)', border: 'rgba(0,212,255,0.18)', icon: <Settings size={S} strokeWidth={1.5} /> },
      { name: 'API Gateway', color: '#f97316', bg: 'rgba(249,115,22,0.07)', border: 'rgba(249,115,22,0.18)', icon: <Monitor size={S} strokeWidth={1.5} /> },
      { name: 'JWT Auth', color: '#d63aff', bg: 'rgba(214,58,255,0.07)', border: 'rgba(214,58,255,0.18)', icon: icons.JWT },
      { name: 'Keycloak', color: '#2563eb', bg: 'rgba(37,99,235,0.07)', border: 'rgba(37,99,235,0.18)', icon: icons.Keycloak },
    ],
  },
  {
    label: 'Testing',
    accent: '#25a162',
    skills: [
      { name: 'JUnit', color: '#25a162', bg: 'rgba(37,161,98,0.08)', border: 'rgba(37,161,98,0.2)', icon: icons.JUnit },
      { name: 'Mockito', color: '#78c97f', bg: 'rgba(120,201,127,0.07)', border: 'rgba(120,201,127,0.18)', icon: icons.Mockito },
      { name: 'Jasmine', color: '#8a4182', bg: 'rgba(138,65,130,0.08)', border: 'rgba(138,65,130,0.2)', icon: icons.Jasmine },
    ],
  },
  {
    label: 'Tools & DevOps',
    accent: '#2496ed',
    skills: [
      { name: 'Maven', color: '#c71a36', bg: 'rgba(199,26,54,0.08)', border: 'rgba(199,26,54,0.2)', icon: icons.Maven },
      { name: 'Docker', color: '#2496ed', bg: 'rgba(36,150,237,0.08)', border: 'rgba(36,150,237,0.2)', icon: icons.Docker },
      { name: 'Jenkins', color: '#d33833', bg: 'rgba(211,56,51,0.08)', border: 'rgba(211,56,51,0.2)', icon: icons.Jenkins },
       { name: 'ELK Stack', color: '#facc15', bg: 'rgba(250,204,21,0.08)', border: 'rgba(250,204,21,0.2)', icon: icons.ELK },
  { name: 'Grafana', color: '#f97316', bg: 'rgba(249,115,22,0.08)', border: 'rgba(249,115,22,0.2)', icon: icons.Grafana },
      { name: 'Postman', color: '#ff6c37', bg: 'rgba(255,108,55,0.08)', border: 'rgba(255,108,55,0.2)', icon: icons.Postman },
      { name: 'Linux', color: '#fcc624', bg: 'rgba(252,198,36,0.08)', border: 'rgba(252,198,36,0.2)', icon: icons.Linux },
    ],
  },
  {
    label: 'Version Control',
    accent: '#f05032',
    skills: [
      { name: 'Git', color: '#f05032', bg: 'rgba(240,80,50,0.08)', border: 'rgba(240,80,50,0.2)', icon: icons.Git },
      { name: 'GitHub', color: '#ffffff', bg: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.12)', icon: icons.GitHub },
      { name: 'GitLab', color: '#fc6d26', bg: 'rgba(252,109,38,0.08)', border: 'rgba(252,109,38,0.2)', icon: icons.GitLab },
    ],
  },
  {
  label: 'Cloud & Infrastructure',
  accent: '#ff9900',
  skills: [
    {
      name: 'AWS',
      color: '#ff9900',
      bg: 'rgba(255,153,0,0.08)',
      border: 'rgba(255,153,0,0.2)',
      icon: <Cpu size={S} strokeWidth={1.5} />,
    },
    {
      name: 'EC2',
      color: '#ff9900',
      bg: 'rgba(255,153,0,0.08)',
      border: 'rgba(255,153,0,0.2)',
      icon: <Monitor size={S} strokeWidth={1.5} />,
    },
    {
      name: 'S3',
      color: '#569a31',
      bg: 'rgba(86,154,49,0.08)',
      border: 'rgba(86,154,49,0.2)',
      icon: <Layers size={S} strokeWidth={1.5} />,
    },
  ],
},
  {
    label: 'Methodologies',
    accent: '#a78bfa',
    skills: [
      { name: 'Agile', color: '#a78bfa', bg: 'rgba(167,139,250,0.08)', border: 'rgba(167,139,250,0.2)', icon: <GitMerge size={S} strokeWidth={1.5} /> },
      { name: 'Scrum', color: '#34d399', bg: 'rgba(52,211,153,0.08)', border: 'rgba(52,211,153,0.2)', icon: <Cpu size={S} strokeWidth={1.5} /> },
      { name: 'CI/CD', color: '#60a5fa', bg: 'rgba(96,165,250,0.08)', border: 'rgba(96,165,250,0.2)', icon: <Monitor size={S} strokeWidth={1.5} /> },
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
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="#48b9c7" strokeWidth="1.8" />
                  <path d="M12 7v5l3 3" stroke="#48b9c7" strokeWidth="1.8" strokeLinecap="round" />
                  <circle cx="12" cy="12" r="1.5" fill="#48b9c7" />
                </svg>
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