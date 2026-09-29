import React, { useEffect, useState } from 'react';
import { BlogPost } from '../types';
import { api } from '../services/api';
import { SEO } from '../components/common/SEO';
import { CTASection } from '../components/home/CTASection';
import { ArrowLeft, Clock, User, Calendar } from 'lucide-react';

interface ArticleDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({ slug, onNavigate }) => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    api
      .getBlogPostBySlug(slug)
      .then((data) => {
        setPost(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load article:', err);
        setIsLoading(false);
      });
  }, [slug]);

  if (isLoading) {
    return (
      <div className="pt-40 pb-20 bg-[#0A0A0A] min-h-screen text-center text-zinc-500">
        Loading article...
      </div>
    );
  }

  if (!post) {
    return (
      <div className="pt-40 pb-20 bg-[#0A0A0A] min-h-screen text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Article Not Found</h1>
        <button
          onClick={() => onNavigate('/insights')}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Insights</span>
        </button>
      </div>
    );
  }

  const tags: string[] = post.tags ? JSON.parse(post.tags) : [];

  return (
    <>
      <SEO
        title={post.seoTitle || post.title}
        description={post.seoDescription || post.excerpt}
        ogImage={post.coverImage}
        canonicalPath={`/insights/${post.slug}`}
      />

      <article className="pt-32 pb-20 bg-[#0A0A0A] min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => onNavigate('/insights')}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Insights</span>
          </button>

          <div className="mb-10">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-blue-500 font-semibold mb-3">
              <span>{post.category}</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span>{post.readTime}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-display mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Author Byline */}
            <div className="flex items-center gap-4 py-4 border-y border-[#27272A] text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-blue-500" />
                <span className="text-white font-medium">{post.authorName}</span>
                <span>({post.authorRole})</span>
              </div>
              <span className="text-zinc-600">·</span>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
            </div>
          </div>

          {/* Cover Image */}
          <div className="rounded-xl overflow-hidden border border-[#27272A] mb-12 bg-[#111111]">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-auto object-cover max-h-[500px]"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Article Body */}
          <div className="prose prose-invert prose-blue max-w-none space-y-6 text-zinc-300 leading-relaxed text-base sm:text-lg">
            <p className="text-xl text-zinc-200 font-medium leading-relaxed">
              {post.excerpt}
            </p>
            
            <div className="text-zinc-300 space-y-4 whitespace-pre-line text-base leading-relaxed">
              {post.content}
            </div>
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="pt-8 mt-12 border-t border-[#27272A] flex flex-wrap items-center gap-2">
              <span className="text-xs uppercase tracking-wider text-zinc-500 mr-2">Tags:</span>
              {tags.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded bg-[#171717] border border-[#27272A] text-xs text-zinc-300"
                >
                  #{t}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="mt-20">
          <CTASection onNavigate={onNavigate} />
        </div>
      </article>
    </>
  );
};
