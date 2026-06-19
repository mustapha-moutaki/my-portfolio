import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import emailjs from "@emailjs/browser";
import toast from 'react-hot-toast';

const socials = [
  {
    icon: Github,
    label: 'GitHub',
    handle: 'github.com/mustapha-moutaki',
    href: 'https://github.com/mustapha-moutaki',
    color: '#ffffff',
    bg: 'rgba(255,255,255,0.06)',
    border: 'rgba(255,255,255,0.12)',
    glow: 'rgba(255,255,255,0.1)',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    handle: 'linkedin.com/in/mustapha-moutaki',
    href: 'https://www.linkedin.com/in/mustapha-moutaki-6528a2242/',
    color: '#0a66c2',
    bg: 'rgba(10,102,194,0.08)',
    border: 'rgba(10,102,194,0.2)',
    glow: 'rgba(10,102,194,0.25)',
  },
  {
    icon: Phone,
    label: 'Phone',
    handle: '+212 650 744 504',
    href: 'tel:+212650744504',
    color: '#4fffb0',
    bg: 'rgba(79,255,176,0.06)',
    border: 'rgba(79,255,176,0.15)',
    glow: 'rgba(79,255,176,0.2)',
  },
  {
    icon: Mail,
    label: 'Email',
    handle: 'mustaphaamoutaki@gmail.com',
    href: 'mailto:mustaphaamoutaki@gmail.com',
    color: '#f97316',
    bg: 'rgba(249,115,22,0.06)',
    border: 'rgba(249,115,22,0.15)',
    glow: 'rgba(249,115,22,0.2)',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

export default function Contact() {


  // email variables
  type FormState = {
  name: string;
  email: string;
  message: string;
};

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  // for email 
  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const formRef = useRef<HTMLFormElement | null>(null);
  



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setSending(true);

  if (!formRef.current)  {
  setSending(false);
  toast.error("Form error");
  return;
  }

  emailjs
    .sendForm(
      "service_2utkbp4",
      "template_hwqhyou",
      formRef.current,
      "qzi8WBVMJEZeAFMd7"
    )
    .then(() => {
      setSending(false);
      setSent(true);
      toast.success("Thanks for reaching out! I'll reply soon.");
      setFormState({
        name: "",
        email: "",
        message: "",
      });
    })
    .catch((error) => {
      console.log(error);
      setSending(false);
      toast.error("Operation Failed");

    });
};

  return (
    <section id="contact" className="relative py-32 pb-40">
      <div
        className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(79,255,176,0.5) 0%, transparent 70%)', filter: 'blur(80px)' }}
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
            Contact
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mt-3">
            Let's work together
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl">
            Have a project in mind or want to collaborate? I'd love to hear from you.
            I usually respond within 24 hours.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid lg:grid-cols-[1fr_1.2fr] gap-16"
        >
          {/* Left */}
          <div>
            {/* Contact info */}
            <motion.div variants={itemVariants} className="mb-10">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(79,255,176,0.08)', border: '1px solid rgba(79,255,176,0.15)' }}
                >
                  <MapPin size={16} style={{ color: '#4fffb0' }} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Location</p>
                  <p className="text-sm text-white">Casablanca, Morocco</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(79,255,176,0.08)', border: '1px solid rgba(79,255,176,0.15)' }}
                >
                  <Mail size={16} style={{ color: '#4fffb0' }} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Email</p>
                  <p className="text-sm text-white">mustaphaamoutaki@gmail.com</p>
                </div>
              </div>
            </motion.div>

            {/* Social links */}
            <motion.div variants={itemVariants}>
              <p className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-500 mb-4">
                Find me online
              </p>
              <div className="grid grid-cols-2 gap-3">
                {socials.map(({ icon: Icon, label, handle, href, color, bg, border, glow }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -4, boxShadow: `0 12px 30px ${glow}, 0 0 0 1px ${border}` }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    className="flex items-center gap-3 p-3.5 rounded-2xl"
                    style={{ background: bg, border: `1px solid ${border}` }}
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: bg, border: `1px solid ${border}` }}
                    >
                      <Icon size={16} style={{ color }} strokeWidth={1.8} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-white">{label}</p>
                      <p className="text-xs text-gray-500 truncate">{handle}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — Form */}
          <motion.div variants={itemVariants}>
            <div
              className="rounded-3xl p-8"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.07)',
                boxShadow: '0 8px 40px rgba(0,0,0,0.3)',
              }}
            >
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-16"
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                    style={{ background: 'rgba(79,255,176,0.1)', border: '1px solid rgba(79,255,176,0.3)' }}
                  >
                    <Send size={24} style={{ color: '#4fffb0' }} />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white mb-3">Message sent!</h3>
                  <p className="text-gray-400">Thank you for reaching out. I'll get back to you shortly.</p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-6 text-sm font-medium underline underline-offset-4"
                    style={{ color: '#4fffb0' }}
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form ref={formRef}  onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-2 tracking-wide">
                      Your Name
                    </label>
                    <input
                     name="from_name"
                      type="text"
                      value={formState.name}
                      onChange={e => setFormState(p => ({ ...p, name: e.target.value }))}
                      required
                      placeholder="Jane Smith"
                      className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-600 outline-none transition-all duration-200"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                      onFocus={e => (e.target.style.borderColor = 'rgba(79,255,176,0.4)')}
                      onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-2 tracking-wide">
                      Email Address
                    </label>
                    <input
                    name="from_email"
                      type="email"
                      value={formState.email}
                      onChange={e => setFormState(p => ({ ...p, email: e.target.value }))}
                      required
                      placeholder="jane@company.com"
                      className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-600 outline-none transition-all duration-200"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                      onFocus={e => (e.target.style.borderColor = 'rgba(79,255,176,0.4)')}
                      onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-2 tracking-wide">
                      Message
                    </label>
                    <textarea
                    name="message"
                      value={formState.message}
                      onChange={e => setFormState(p => ({ ...p, message: e.target.value }))}
                      required
                      rows={5}
                      placeholder="Tell me about your project..."
                      className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-600 outline-none transition-all duration-200 resize-none"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                      onFocus={e => (e.target.style.borderColor = 'rgba(79,255,176,0.4)')}
                      onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')}
                    />
                  </div>
                  <motion.button
                    type="submit"
                    disabled={sending}
                    whileHover={{ scale: 1.01, boxShadow: '0 8px 30px rgba(79,255,176,0.25)' }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    className="flex items-center justify-center gap-3 py-3.5 rounded-xl text-sm font-semibold text-black transition-all duration-200"
                    style={{ background: sending ? 'rgba(79,255,176,0.5)' : '#4fffb0' }}
                  >
                    {sending ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-4 h-4 rounded-full border-2 border-black/30 border-t-black"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={15} strokeWidth={2.5} />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
