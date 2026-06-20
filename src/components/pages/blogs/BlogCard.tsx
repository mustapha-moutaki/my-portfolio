import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { BlogPost } from "../../../data/BlogsData";

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export default function BlogCard({ post, index }: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      whileHover={{ y: -6 }}
      className="group relative rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm transition-colors duration-300 hover:border-[#4FFEB0]/30"
      style={{
        boxShadow: "0 0 0 rgba(79,254,176,0)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
        style={{ boxShadow: "0 0 36px -8px rgba(79,254,176,0.25)" }}
      />

      <a href={`/blogs/${post.slug}`} className="block">
        <div className="relative h-48 overflow-hidden">
          <img
            src={post.coverImage}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
          <span className="absolute top-4 left-4 text-[11px] font-medium tracking-wide uppercase px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-[#4FFEB0]/30 text-[#4FFEB0]">
            {post.category}
          </span>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
            <time>
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </time>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>

          <h3 className="font-display font-semibold text-white text-lg leading-snug mb-2 transition-colors duration-300 group-hover:text-[#4FFEB0]">
            {post.title}
          </h3>

          <p className="text-sm text-gray-400 leading-relaxed mb-5 line-clamp-2">
            {post.excerpt}
          </p>

          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-white/90 group-hover:text-[#4ffeb0] transition-colors duration-300">
           
                  Read more about
          
        
 <span className="text-[#4ffeb0]">
             {post.title.length > 20 ? post.title.slice(0, 20) + "..." : post.title} 
               </span>
            <ArrowUpRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        </div>
      </a>
    </motion.article>
  );
}