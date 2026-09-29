import React from 'react';
import { BlogPost } from '../../types';
import { ArrowUpRight } from 'lucide-react';

interface InsightsPreviewSectionProps {
  posts: BlogPost[];
  onNavigate: (path: string) => void;
}

export const InsightsPreviewSection: React.FC<InsightsPreviewSectionProps> = ({
  posts,
  onNavigate,
}) => {
  const published = posts.filter((p) => p.status === 'published').slice(0, 3);
  if (published.length === 0) return null;

  return (
    <section className="py-20 md:py-28 bg-[#0A0A0A] border-b border-[#27272A]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="text-xs uppercase tracking-widest text-blue-500 font-semibold mb-3">
              Studio Insights
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-display">
              Thinking on Design, Engineering & Growth
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/insights')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-300 hover:text-white group"
          >
            <span>View All Insights</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-blue-500" />
          </button>
        </div>

        {/* 3-Column Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {published.map((post) => (
            <article
              key={post.id}
              onClick={() => onNavigate(`/insights/${post.slug}`)}
              className="group cursor-pointer bg-[#111111] border border-[#27272A] rounded-xl overflow-hidden hover:border-zinc-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-[#171717]">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="p-6">
                  {/* Unboxed metadata line */}
                  <div className="flex items-center gap-2 text-xs text-zinc-400 mb-2.5">
                    <span>{post.category}</span>
                    <span aria-hidden="true" className="text-zinc-600">·</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2.5 group-hover:text-blue-400 transition-colors line-clamp-2 font-display">
                    {post.title}
                  </h3>

                  <p className="text-xs text-[#A1A1AA] leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-[#27272A]/50 flex items-center justify-between text-xs text-zinc-400 group-hover:text-blue-400">
                <span>Read article</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
