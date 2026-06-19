import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { BlogPost } from "../../../data/BlogsData";

interface FeaturedBlogProps {
  post: BlogPost;
}

export default function FeaturedBlog({ post }: FeaturedBlogProps) {
  return (
    <motion.a
      href={`/blogs/${post.slug}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
      className="group relative grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-white/[0.07] bg-white/[0.02] backdrop-blur-sm transition-colors duration-300 hover:border-[#4FFEB0]/30"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
        style={{ boxShadow: "0 0 60px -10px rgba(79,254,176,0.2)" }}
      />

      <div className="relative h-72 lg:h-full min-h-[320px] overflow-hidden">
        <img
          src={post.coverImage}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/10 to-transparent lg:bg-gradient-to-r" />
      </div>

      <div className="relative flex flex-col justify-center p-8 lg:p-12">
        <span className="w-fit text-[11px] font-medium tracking-wide uppercase px-3 py-1 rounded-full bg-[#4FFEB0]/10 border border-[#4FFEB0]/30 text-[#4FFEB0] mb-5">
          Featured · {post.category}
        </span>

        <h2 className="font-display font-bold text-white text-2xl sm:text-3xl leading-tight mb-4 max-w-md transition-colors duration-300 group-hover:text-[#4FFEB0]">
          {post.title}
        </h2>

        <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-6 max-w-md">
          {post.excerpt}
        </p>

        <div className="flex items-center gap-4">
          <span className="text-xs text-gray-500">
            {new Date(post.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}{" "}
            · {post.readTime}
          </span>
        </div>

        <span className="inline-flex items-center gap-2 mt-8 w-fit text-sm font-semibold px-5 py-2.5 rounded-full bg-[#4FFEB0] text-black transition-transform duration-300 group-hover:gap-3">
          Read Blog
          <ArrowUpRight size={16} />
        </span>
      </div>
    </motion.a>
  );
}