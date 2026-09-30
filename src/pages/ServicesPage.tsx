import React, { useState, useEffect } from 'react';
import { Service } from '../types';
import { api } from '../services/api';
import { safeJsonParse } from '../utils/json';
import { SEO } from '../components/common/SEO';
import { CTASection } from '../components/home/CTASection';
import { ArrowUpRight, CheckCircle2, Layout, ShoppingBag, Layers, Sparkles, Code2, TrendingUp, ShieldCheck } from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (path: string) => void;
}

const iconMap: Record<string, any> = {
  Layout,
  ShoppingBag,
  Layers,
  Sparkles,
  Code2,
  TrendingUp,
  ShieldCheck,
};

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    api
      .getServices('published')
      .then((data) => {
        setServices(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load services:', err);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <SEO
        title="Services & Studio Capabilities"
        description="Comprehensive website design, full-stack engineering, UI/UX, e-commerce, SaaS development, and digital growth services."
        canonicalPath="/services"
      />

      <div className="pt-32 pb-20 bg-[#08090E] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="max-w-3xl mb-16">
            <div className="text-xs uppercase tracking-widest text-blue-400 font-semibold mb-3">
              Capabilities
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white font-display mb-6">
              Engineering Digital Products That Deliver Tangible Value
            </h1>
            <p className="text-lg text-[#94A3B8] leading-relaxed">
              We specialize in the intersection of thoughtful design systems and robust web engineering. Every service is structured to drive conversion and long-term brand equity.
            </p>
          </div>

          {/* Detailed Services Listing */}
          {isLoading ? (
            <div className="py-24 text-center text-zinc-500">Loading capabilities...</div>
          ) : (
            <div className="space-y-12">
              {services.map((service, index) => {
                const Icon = iconMap[service.icon] || Layout;
                const benefits: string[] = safeJsonParse(service.benefits, []);
                const processSteps: string[] = safeJsonParse(service.processSteps, []);

                return (
                  <div key={service.id} className="relative w-full group">
                    {/* Outer Ambient Glow Effect (Hover Boost) */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-blue-500/15 to-indigo-600/20 rounded-[28px] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                    {/* Main Card Container */}
                    <div className="relative overflow-hidden rounded-[24px] border border-[#1E3A8A]/50 group-hover:border-[#3B82F6] bg-gradient-to-br from-[#060B16] via-[#091122] to-[#0A142A] group-hover:from-[#080E1C] group-hover:via-[#0B152B] group-hover:to-[#0D1832] p-8 sm:p-10 lg:p-12 shadow-2xl shadow-[#040711]/90 group-hover:shadow-[0_24px_70px_-15px_rgba(29,78,216,0.35)] group-hover:-translate-y-1 transition-all duration-500">
                      {/* Static & Hover Background Ambient Nebula Glows */}
                      <div className="absolute top-0 right-0 w-[450px] h-[320px] bg-gradient-to-bl from-blue-600/20 via-blue-500/10 to-transparent rounded-full blur-[80px] pointer-events-none group-hover:scale-110 group-hover:from-blue-600/35 group-hover:via-blue-500/20 transition-all duration-700" />
                      <div className="absolute -bottom-16 -left-16 w-[320px] h-[320px] bg-gradient-to-tr from-blue-700/15 via-indigo-600/10 to-transparent rounded-full blur-[80px] pointer-events-none group-hover:scale-110 group-hover:bg-blue-600/20 transition-all duration-700" />

                      {/* Subtle Blueprint Mesh Grid */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1E293B18_1px,transparent_1px),linear-gradient(to_bottom,#1E293B18_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none" />

                      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* Left: Title & Concept */}
                        <div className="lg:col-span-5">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 rounded-xl bg-[#141926] border border-[#1E2330] text-blue-400 group-hover:border-blue-500/60 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                              <Icon className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-mono font-semibold text-[#64748B] group-hover:text-blue-400 transition-colors">
                              0{index + 1}
                            </span>
                          </div>

                          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 font-display group-hover:text-blue-300 transition-colors">
                            {service.title}
                          </h2>

                          <p className="text-base text-[#94A3B8] leading-relaxed mb-6 font-normal">
                            {service.fullDesc || service.shortDesc}
                          </p>

                          <div className="flex items-center gap-4">
                            <button
                              onClick={() => onNavigate(`/services/${service.slug}`)}
                              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-400 hover:text-blue-300 group/btn transition-colors cursor-pointer"
                            >
                              <span>Detailed Breakdown</span>
                              <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                            </button>
                            <span className="text-zinc-700">·</span>
                            <button
                              onClick={() => onNavigate('/start-a-project')}
                              className="text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors cursor-pointer"
                            >
                              Inquire for this
                            </button>
                          </div>
                        </div>

                        {/* Right: Key Deliverables & Process */}
                        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 bg-[#090D18]/90 p-6 sm:p-8 rounded-2xl border border-[#1E2330] group-hover:border-[#1E3A8A]/60 transition-colors duration-300">
                          {/* Benefits / Deliverables */}
                          <div>
                            <div className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
                              Deliverables & Value
                            </div>
                            <ul className="space-y-3">
                              {benefits.map((b, i) => (
                                <li key={i} className="flex items-start gap-2.5 text-xs text-zinc-300 bg-[#0E1424] p-3 rounded-lg border border-[#1E2330] group-hover:border-blue-500/30 transition-colors">
                                  <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                                  <span>{b}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Process Phases */}
                          <div>
                            <div className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
                              Execution Phases
                            </div>
                            <ul className="space-y-3">
                              {processSteps.map((step, i) => (
                                <li key={i} className="flex items-start gap-2.5 text-xs text-zinc-400 bg-[#0E1424] p-3 rounded-lg border border-[#1E2330] group-hover:border-blue-500/30 transition-colors">
                                  <span className="font-mono text-blue-400 font-semibold">{i + 1}.</span>
                                  <span>{step}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
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
