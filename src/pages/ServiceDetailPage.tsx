import React, { useEffect, useState } from 'react';
import { Service, Project } from '../types';
import { api } from '../services/api';
import { safeJsonParse } from '../utils/json';
import { SEO } from '../components/common/SEO';
import { CTASection } from '../components/home/CTASection';
import { ArrowLeft, ArrowUpRight, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';

interface ServiceDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ slug, onNavigate }) => {
  const [service, setService] = useState<Service | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    setIsLoading(true);
    api
      .getServiceBySlug(slug)
      .then(async (data) => {
        setService(data);
        if (data.relatedProjectIds) {
          try {
            const all = await api.getProjects('published');
            const ids: string[] = safeJsonParse(data.relatedProjectIds, []);
            setRelatedProjects(all.filter((p) => ids.includes(p.id)));
          } catch {
            // ignore
          }
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load service:', err);
        setIsLoading(false);
      });
  }, [slug]);

  if (isLoading) {
    return (
      <div className="pt-40 pb-20 bg-[#0A0A0A] min-h-screen text-center text-zinc-500">
        Loading service details...
      </div>
    );
  }

  if (!service) {
    return (
      <div className="pt-40 pb-20 bg-[#0A0A0A] min-h-screen text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Service Not Found</h1>
        <button
          onClick={() => onNavigate('/services')}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Capabilities</span>
        </button>
      </div>
    );
  }

  const benefits: string[] = safeJsonParse(service.benefits, []);
  const processSteps: string[] = safeJsonParse(service.processSteps, []);

  const faqs = [
    {
      q: 'How long does a typical engagement take?',
      a: 'Depending on scope, brand sprints take 2–3 weeks, marketing web platforms require 4–8 weeks, and complex custom SaaS applications generally run 8–16 weeks with agile continuous delivery milestones.',
    },
    {
      q: 'Do you hand off full source code and design tokens?',
      a: 'Yes, 100%. You retain full, unencumbered ownership of all Figma files, GitHub repositories, database schemas, and intellectual property upon project completion.',
    },
    {
      q: 'What is your technology stack standard?',
      a: 'We specialize in TypeScript, modern React, Next.js, Node.js, Tailwind CSS, PostgreSQL, headless CMS architectures, and enterprise cloud hosting on GCP / AWS / Vercel.',
    },
  ];

  return (
    <>
      <SEO
        title={service.seoTitle || `${service.title} — Capabilities`}
        description={service.seoDescription || service.shortDesc}
        canonicalPath={`/services/${service.slug}`}
      />

      <div className="pt-32 pb-20 bg-[#0A0A0A] min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => onNavigate('/services')}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Capabilities</span>
          </button>

          <div className="mb-14">
            <div className="text-xs uppercase tracking-widest text-blue-500 font-semibold mb-3">
              Practice Area
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white font-display mb-6">
              {service.title}
            </h1>
            <p className="text-xl text-[#A1A1AA] leading-relaxed max-w-3xl">
              {service.fullDesc || service.shortDesc}
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6 font-display">
              What You Receive
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((b, i) => (
                <div
                  key={i}
                  className="bg-[#111111] border border-[#27272A] p-5 rounded-lg flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-white">{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Process Timeline */}
          {processSteps.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-white mb-6 font-display">
                Execution Workflow
              </h2>
              <div className="space-y-4">
                {processSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-6 bg-[#111111] border border-[#27272A] rounded-lg flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-mono font-bold text-blue-400">
                        PHASE 0{idx + 1}
                      </span>
                      <span className="text-sm font-semibold text-white">{step}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Projects */}
          {relatedProjects.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-white mb-6 font-display">
                Relevant Case Studies
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
                      <div className="text-xs text-blue-400 font-semibold mb-1">{p.industry}</div>
                      <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                        {p.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Service FAQ Accordion */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6 font-display">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="bg-[#111111] border border-[#27272A] rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left text-sm font-bold text-white hover:text-blue-400 transition-colors"
                  >
                    <span>{faq.q}</span>
                    {openFaq === i ? (
                      <ChevronUp className="w-4 h-4 text-zinc-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-zinc-400" />
                    )}
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-5 pt-1 text-sm text-[#A1A1AA] leading-relaxed border-t border-[#27272A]/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16">
          <CTASection onNavigate={onNavigate} />
        </div>
      </div>
    </>
  );
};
