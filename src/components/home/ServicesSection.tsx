import React from 'react';
import { Service } from '../../types';
import { safeJsonParse } from '../../utils/json';
import { ArrowUpRight, CheckCircle2, Layout, ShoppingBag, Layers, Sparkles, Code2, TrendingUp } from 'lucide-react';

interface ServicesSectionProps {
  services: Service[];
  onNavigate: (path: string) => void;
}

const iconMap: Record<string, any> = {
  Layout,
  ShoppingBag,
  Layers,
  Sparkles,
  Code2,
  TrendingUp,
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({ services, onNavigate }) => {
  return (
    <section className="py-20 md:py-28 bg-[#08090E] border-b border-[#1E2330]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="text-xs uppercase tracking-widest text-blue-400 font-semibold mb-3">
              Capabilities
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-display">
              Services Built for Digital Scale
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/services')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-300 hover:text-white group cursor-pointer"
          >
            <span>Explore All Capabilities</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-blue-400" />
          </button>
        </div>

        {/* Services Grid (Asymmetric Bento/Clean Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(services || []).map((service, index) => {
            const Icon = iconMap[service.icon] || Layout;
            const benefitsList: string[] = safeJsonParse(service.benefits, []);

            return (
              <div
                key={service.id}
                onClick={() => onNavigate(`/contact?service=${encodeURIComponent(service.title)}`)}
                className="bg-[#0D1017] border border-[#1E2330] p-8 rounded-xl hover:border-blue-500/50 hover:bg-[#111520] transition-all cursor-pointer group flex flex-col justify-between shadow-lg shadow-black/30"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 rounded-lg bg-[#141926] border border-[#1E2330] text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono text-[#475569] font-semibold">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors font-display">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[#A1A1AA] leading-relaxed mb-6">
                    {service.shortDesc}
                  </p>

                  {/* Bullet Benefits preview */}
                  {benefitsList.length > 0 && (
                    <ul className="space-y-2 border-t border-[#27272A]/70 pt-4 mb-6">
                      {benefitsList.slice(0, 3).map((b, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-zinc-400">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-400 pt-2 group-hover:text-blue-300">
                  <span>Learn more</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
