import React, { useState, useEffect } from 'react';
import { BlogPost } from '../types';
import { api } from '../services/api';
import { SEO } from '../components/common/SEO';
import { CTASection } from '../components/home/CTASection';
import { ArrowUpRight } from 'lucide-react';

interface InsightsPageProps {
  onNavigate: (path: string) => void;
}

export const InsightsPage: React.FC<InsightsPageProps> = ({ onNavigate }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    api
      .getBlogPosts('published')
      .then((data) => {
        setPosts(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load blog posts:', err);
        setIsLoading(false);
      });
  }, []);

  const categories = ['All', 'Web Design', 'Full-Stack Engineering', 'Digital Growth', 'UI/UX Design'];

  const filteredPosts =
    activeCategory === 'All'
      ? posts
      : posts.filter((p) => p.category.toLowerCase().includes(activeCategory.toLowerCase()));

  return (
    <>
      <SEO
        title="Studio Insights & Articles"
        description="Deep dives on digital architecture, UI/UX systems, web performance, and growth engineering from the Nexora team."
        canonicalPath="/insights"
      />

      <div className="pt-32 pb-20 bg-[#0A0A0A] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="max-w-3xl mb-12">
            <div className="text-xs uppercase tracking-widest text-blue-500 font-semibold mb-3">
              Perspective
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white font-display mb-6">
              Studio Insights & Strategic Thinking
            </h1>
            <p className="text-lg text-[#A1A1AA] leading-relaxed">
              Essays and analyses on digital craft, front-end performance, conversion optimization, and modern product engineering.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 border-b border-[#27272A]/70 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  activeCategory === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-[#141414] text-zinc-400 hover:text-white hover:bg-[#1A1A1A] border border-[#27272A]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Articles Grid */}
          {isLoading ? (
            <div className="py-24 text-center text-zinc-500">Loading insights...</div>
          ) : filteredPosts.length === 0 ? (
            <div className="py-24 text-center text-zinc-500">No articles found in this category.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
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
                      <div className="flex items-center gap-2 text-xs text-zinc-400 mb-2.5">
                        <span>{post.category}</span>
                        <span aria-hidden="true" className="text-zinc-600">·</span>
                        <span>{post.readTime}</span>
                      </div>

                      <h2 className="text-xl font-bold text-white mb-2.5 group-hover:text-blue-400 transition-colors font-display line-clamp-2">
                        {post.title}
                      </h2>

                      <p className="text-xs text-[#A1A1AA] leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-3 border-t border-[#27272A]/50 flex items-center justify-between text-xs text-zinc-400 group-hover:text-blue-400">
                    <span>Read perspective</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        <div className="mt-20">
          <CTASection onNavigate={onNavigate} />
        </div>
      </div>
    </>
  );
};
