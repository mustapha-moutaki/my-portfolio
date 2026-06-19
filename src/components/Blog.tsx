import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, PenLine } from 'lucide-react';
import { posts } from '../data/BlogsData';
import { Link } from 'react-router-dom';
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Blog() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="blog" className="relative py-32">
      <div
        className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(79,255,176,0.3) 0%, transparent 70%)', filter: 'blur(80px)' }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6"
            style={{ background: 'rgba(79,255,176,0.08)', border: '1px solid rgba(79,255,176,0.15)', color: '#4fffb0' }}
          >
            <PenLine size={11} />
            Blog
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-white leading-tight max-w-lg">
                Learning, Building, and Documenting
              </h2>
              <p className="text-gray-400 mt-4 max-w-xl leading-relaxed">
                Insights and experiences from my journey as a developer — exploring ideas,
                overcoming challenges, and sharing lessons learned along the way.
              </p>
            </div>

             <Link 
              to={`/blogs/`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block"
            >
            <motion.a
              whileHover={{ scale: 1.03, boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-semibold text-white"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
              }}
            >
             
              View all articles
              <ArrowRight size={14} strokeWidth={2.5} />
            </motion.a>
            </Link>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="mb-8" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }} />

        {/* Post list */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="space-y-0"
        >
          {posts.map((post, i) => (
            <motion.div key={post.id} variants={itemVariants}>
              <motion.div
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
                transition={{ duration: 0.2 }}
                className="group flex flex-col sm:flex-row gap-6 py-8 px-6 rounded-2xl -mx-6 cursor-pointer"
              >
                {/* Thumbnail */}
                <div className="flex-shrink-0 w-full sm:w-44 h-32 sm:h-28 rounded-2xl overflow-hidden">
                  <motion.img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    {/* Meta */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs text-gray-500">{post.date}</span>
                      <span className="text-gray-700">·</span>
                      <span className="text-xs text-gray-500">{post.readTime}</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display font-bold text-xl text-white group-hover:text-gradient-accent transition-colors duration-300 leading-snug mb-2">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-4">
                    <Link
                    to={`/blogs/${post.slug}`}
                     target="_blank" 
                      rel="noopener noreferrer" 
                      className="block"
                    >
                    <motion.div
                      className="flex items-center gap-2 text-sm font-medium"
                      style={{ color: '#4fffb0' }}
                      whileHover={{ x: 3 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      Read more
                      <ArrowRight size={13} strokeWidth={2.5} />
                    </motion.div>
                    </Link>
                    <div className="flex gap-2">
                    {post.tags && post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  </div>
                </div>
              </motion.div>

              {/* Divider between posts */}
              {i < posts.length - 1 && (
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }} />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
