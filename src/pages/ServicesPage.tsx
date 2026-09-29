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

      <div className="pt-32 pb-20 bg-[#0A0A0A] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="max-w-3xl mb-16">
            <div className="text-xs uppercase tracking-widest text-blue-500 font-semibold mb-3">
              Capabilities
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white font-display mb-6">
              Engineering Digital Products That Deliver Tangible Value
            </h1>
            <p className="text-lg text-[#A1A1AA] leading-relaxed">
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
                  <div
                    key={service.id}
                    className="bg-[#111111] border border-[#27272A] rounded-xl p-8 sm:p-10 hover:border-zinc-700 transition-all"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                      {/* Left: Title & Concept */}
                      <div className="lg:col-span-5">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-3 rounded-lg bg-[#171717] border border-[#27272A] text-blue-500">
                            <Icon className="w-6 h-6" />
                          </div>
                          <span className="text-xs font-mono font-semibold text-zinc-500">
                            0{index + 1}
                          </span>
                        </div>

                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 font-display">
                          {service.title}
                        </h2>

                        <p className="text-base text-[#A1A1AA] leading-relaxed mb-6">
                          {service.fullDesc || service.shortDesc}
                        </p>

                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => onNavigate(`/services/${service.slug}`)}
                            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-400 hover:text-blue-300"
                          >
                            <span>Detailed Breakdown</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-zinc-700">·</span>
                          <button
                            onClick={() => onNavigate('/start-a-project')}
                            className="text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-white"
                          >
                            Inquire for this
                          </button>
                        </div>
                      </div>

                      {/* Right: Key Deliverables & Process */}
                      <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 bg-[#0E0E0E] p-6 sm:p-8 rounded-lg border border-[#27272A]/70">
                        {/* Benefits / Deliverables */}
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
                            Deliverables & Value
                          </div>
                          <ul className="space-y-3">
                            {benefits.map((b, i) => (
                              <li key={i} className="flex items-start gap-2.5 text-xs text-zinc-300">
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
                              <li key={i} className="flex items-start gap-2.5 text-xs text-zinc-400">
                                <span className="font-mono text-blue-400 font-semibold">{i + 1}.</span>
                                <span>{step}</span>
                              </li>
                            ))}
                          </ul>
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
