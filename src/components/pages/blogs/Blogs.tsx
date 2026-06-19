import { motion } from "framer-motion";
import { useState } from "react";
import { posts } from "../../../data/BlogsData";
import FeaturedBlog from "./Featuredblog";
// CHANGE: Import BlogCard instead of BlogPost for the grid
import BlogCard from "./BlogCard"; 

const categories = ["All", "Backend", "Frontend", "Architecture", "DevOps"];

export default function Blogs() {
  const [activeCategory, setActiveCategory] = useState("All");

  // Logic to separate the featured post from the rest
  const featuredPost = posts.find((p) => p.featured) ?? posts[0];
  
  // Logic to filter the posts based on category
  const filteredPosts = posts.filter((p) => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    // We keep all posts in the "All" view, or filter by category
    return matchesCategory;
  });

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(to bottom, #090909 0%, #0d0d0d 100%)",
      }}
    >
      {/* ---------- HERO ---------- */}
      <section className="relative pt-32 pb-20 px-6 lg:px-12 overflow-hidden">
        <div
          className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full opacity-[0.12] blur-[120px]"
          style={{ background: "#4FFEB0" }}
        />
        <div className="relative max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <span className="h-px w-8" style={{ background: "#4FFEB0" }} />
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-[#4FFEB0]">
              Writing
            </span>
            <span className="h-px w-8" style={{ background: "#4FFEB0" }} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-bold text-white text-4xl sm:text-5xl lg:text-6xl leading-tight mb-5"
          >
            Blog <span style={{ color: "#4FFEB0" }}>&amp;</span> Insights
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-gray-400 max-w-xl mx-auto leading-relaxed"
          >
            Articles, tutorials, and development experiences — notes from
            building backend systems, shipping frontend interfaces, and
            everything in between.
          </motion.p>
        </div>
      </section>

      {/* ---------- FEATURED ---------- */}
      <section className="px-6 lg:px-12 mb-20">
        <div className="max-w-7xl mx-auto">
          <FeaturedBlog post={featuredPost} />
        </div>
      </section>

      {/* ---------- LATEST ARTICLES ---------- */}
      <section className="px-6 lg:px-12 pb-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10"
          >
            <div>
              <p className="text-xs font-medium tracking-wide uppercase text-[#4FFEB0] mb-2">
                Latest
              </p>
              <h2 className="font-display font-bold text-white text-2xl sm:text-3xl">
                Recent Articles
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-xs font-medium px-4 py-2 rounded-full border transition-colors duration-300 ${
                    activeCategory === cat
                      ? "bg-[#4FFEB0] text-black border-[#4FFEB0]"
                      : "text-gray-400 border-white/10 hover:border-[#4FFEB0]/40 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => (
              <BlogCard key={post.slug} post={post} index={index} />
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <p className="text-center text-gray-500 py-16">
              No articles in this category yet.
            </p>
          )}
        </div>
      </section>

      {/* ---------- STATIC NEWSLETTER ---------- */}
      <section className="px-6 lg:px-12 pb-28">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative max-w-7xl mx-auto rounded-3xl overflow-hidden border border-white/[0.07] bg-white/[0.02] backdrop-blur-sm p-10 lg:p-14 text-center"
        >
          <div
            className="pointer-events-none absolute -bottom-24 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full opacity-[0.1] blur-[100px]"
            style={{ background: "#4FFEB0" }}
          />
          <p className="text-xs font-medium tracking-wide uppercase text-[#4FFEB0] mb-3">
            Stay in the loop
          </p>
          <h3 className="font-display font-bold text-white text-2xl sm:text-3xl mb-4 max-w-lg mx-auto">
            New articles, sent occasionally — never spam.
          </h3>
          <p className="text-sm text-gray-400 mb-8 max-w-md mx-auto">
            Drop your email and get notified when a new post goes live.
          </p>

          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="you@example.com"
              className="flex-1 px-5 py-3 rounded-full bg-white/[0.04] border border-white/10 text-sm text-white placeholder:text-gray-500 outline-none focus:border-[#4FFEB0]/50 transition-colors"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-[#4FFEB0] text-black text-sm font-semibold transition-transform duration-300 hover:scale-[1.03]"
            >
              Subscribe
            </button>
          </form>
        </motion.div>
      </section>
    </div>
  );
}