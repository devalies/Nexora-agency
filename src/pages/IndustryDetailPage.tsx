import React, { useEffect, useState } from 'react';
import { Industry, Project } from '../types';
import { api } from '../services/api';
import { safeJsonParse } from '../utils/json';
import { SEO } from '../components/common/SEO';
import { CTASection } from '../components/home/CTASection';
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface IndustryDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const IndustryDetailPage: React.FC<IndustryDetailPageProps> = ({ slug, onNavigate }) => {
  const [industry, setIndustry] = useState<Industry | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    api
      .getIndustryBySlug(slug)
      .then(async (ind) => {
        setIndustry(ind);
        if (ind.relatedProjectIds) {
          try {
            const all = await api.getProjects('published');
            const ids: string[] = safeJsonParse(ind.relatedProjectIds, []);
            setRelatedProjects(all.filter((p) => ids.includes(p.id)));
          } catch {
            // ignore
          }
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load industry:', err);
        setIsLoading(false);
      });
  }, [slug]);

  if (isLoading) {
    return (
      <div className="pt-40 pb-20 bg-transparent min-h-screen text-center text-zinc-500">
        Loading sector framework...
      </div>
    );
  }

  if (!industry) {
    return (
      <div className="pt-40 pb-20 bg-transparent min-h-screen text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Industry Not Found</h1>
        <button
          onClick={() => onNavigate('/industries')}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Industries</span>
        </button>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={industry.seoTitle || `${industry.name} — Industry Practice`}
        description={industry.seoDescription || industry.description}
        canonicalPath={`/industries/${industry.slug}`}
      />

      <div className="pt-32 pb-20 bg-transparent min-h-screen relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => onNavigate('/industries')}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Sectors</span>
          </button>

          <div className="mb-14">
            <div className="text-xs uppercase tracking-widest text-blue-500 font-semibold mb-3">
              Specialized Vertical
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white font-display mb-6">
              {industry.name}
            </h1>
            <p className="text-xl text-[#A1A1AA] leading-relaxed max-w-3xl">
              {industry.description}
            </p>
          </div>

          {/* Core Strategic Focus for this vertical */}
          <div className="bg-[#111111] border border-[#27272A] rounded-xl p-8 mb-16">
            <h2 className="text-2xl font-bold text-white mb-6 font-display">
              Sector Delivery Focus
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-white">Trust & Credibility Architecture</div>
                  <div className="text-xs text-zinc-400 mt-1">Establishing high authority and visual restraint for sophisticated decision makers.</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-white">High-Velocity Lead Conversion</div>
                  <div className="text-xs text-zinc-400 mt-1">Multi-step qualification pipelines tailored to sector buyer cycles.</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-white">Strict Compliance & Accessibility</div>
                  <div className="text-xs text-zinc-400 mt-1">WCAG AA compliance, GDPR/CCPA readiness, and fast caching layers.</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-white">Scalable Headless Content</div>
                  <div className="text-xs text-zinc-400 mt-1">Enabling marketing teams to publish case studies, reports, and landing pages seamlessly.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Case Studies */}
          {relatedProjects.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-white mb-6 font-display">
                Featured {industry.name} Case Studies
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedProjects.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => onNavigate(`/work/${p.slug}`)}
                    className="group cursor-pointer bg-[#111111] border border-[#27272A] rounded-xl overflow-hidden hover:border-zinc-700 transition-all"
                  >
                    <div className="aspect-[16/10] overflow-hidden bg-[#171717]">
                      <img
                        src={p.coverImage}
                        alt={p.title}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="p-6">
                      <div className="text-xs text-blue-400 font-semibold mb-1">{p.projectType}</div>
                      <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                        {p.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-16">
          <CTASection onNavigate={onNavigate} />
        </div>
      </div>
    </>
  );
};
