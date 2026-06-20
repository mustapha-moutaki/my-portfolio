import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowLeft, Tag, Share2 } from "lucide-react";
import { posts } from "../../../data/BlogsData";
import { Helmet } from "react-helmet-async";

export default function BlogPost() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#090909]">
        <div className="text-center">
          <h2 className="text-2xl text-white font-bold mb-4">Post not found</h2>
          <Link to="/blogs" className="text-[#4FFEB0] hover:underline">Return to blog</Link>
        </div>
      </div>
    );
  }

  return (
    <>

    <Helmet>
  <title>{post.title}</title>

  <meta
    name="description"
    content={post.excerpt}
  />

  <link
    rel="canonical"
    href={`https://moutaki.tech/blog/${post.slug}`}
  />
</Helmet>

    <div className="min-h-screen bg-[#090909] text-white pb-20">
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] rounded-full opacity-[0.03] blur-[120px]"
          style={{ background: "#4FFEB0" }}
        />
      </div>

      <main className="relative pt-32 px-6 lg:px-12 max-w-4xl mx-auto">
        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#4FFEB0] transition-colors mb-12 group"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            Back to articles
          </Link>
        </motion.div>

        {/* Header Section */}
        <header className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3 py-1 rounded-full bg-[#4FFEB0]/10 border border-[#4FFEB0]/30 text-[#4FFEB0] text-[11px] font-bold uppercase tracking-wider mb-6">
              {post.category}
            </span>
            
            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight mb-8">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-[#4FFEB0]" />
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-[#4FFEB0]" />
                {post.readTime}
              </div>
              <button className="flex items-center gap-2 hover:text-white transition-colors ml-auto">
                <Share2 size={16} />
                Share
              </button>
            </div>
          </motion.div>
        </header>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative aspect-[16/9] rounded-3xl overflow-hidden border border-white/10 mb-16"
        >
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Content Area */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="prose prose-invert prose-emerald max-w-none"
        >
          {/* Excerpt as a Lead Paragraph */}
          <p className="text-xl text-gray-300 leading-relaxed font-medium mb-8">
            {post.excerpt}
          </p>

          {/* Body Content Placeholder - Since only excerpt is in data */}
          <div className="text-gray-400 leading-relaxed space-y-6">
            <p>
              In this article, we dive deep into the implementation details and architectural choices
              behind {post.title}. Building scalable solutions requires a mix of robust backend logic
              and seamless frontend integration.
            </p>
            <p>
              As a developer working with modern stacks, focusing on performance and user experience 
              is paramount. Below are some of the key takeaways from this implementation.
            </p>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-16 pt-8 border-t border-white/10">
              <div className="flex items-center gap-3 flex-wrap">
                <Tag size={16} className="text-[#4FFEB0]" />
                {  post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium px-3 py-1 rounded-md bg-white/[0.03] border border-white/10 text-gray-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.article>

        {/* Footer CTA */}
        <footer className="mt-20 p-8 rounded-3xl border border-[#4FFEB0]/20 bg-[#4FFEB0]/5 text-center">
          <h4 className="text-white font-bold mb-2">Enjoyed this post?</h4>
          <p className="text-gray-400 text-sm mb-6">Subscribe to the newsletter to get more insights.</p>
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#4FFEB0] text-black font-bold text-sm hover:scale-105 transition-transform"
          >
            View all articles
          </Link>
        </footer>
      </main>
    </div>
    </>
  );
}