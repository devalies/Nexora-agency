import React from 'react';
import { Service } from '../../types';
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

        {/* Services Grid (Asymmetric Bento/Clean Cards with High-Res Brand Media) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Layout;
            const benefitsList: string[] = service.benefits ? JSON.parse(service.benefits) : [];
            const serviceImage = service.featuredImage || '/src/assets/images/hero_studio_cinematic_1790149853210.jpg';

            return (
              <div
                key={service.id}
                onClick={() => onNavigate(`/services/${service.slug}`)}
                className="bg-[#0D1017] border border-[#1E2330] rounded-xl hover:border-blue-500/50 hover:bg-[#111520] transition-all cursor-pointer group flex flex-col justify-between shadow-lg shadow-black/30 overflow-hidden"
              >
                {/* Visual Media Header */}
                <div className="relative h-44 w-full overflow-hidden bg-zinc-950 border-b border-[#1E2330]">
                  <img
                    src={serviceImage}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1017] via-[#0D1017]/40 to-transparent" />
                  
                  {/* Floating Icon Pill */}
                  <div className="absolute bottom-3 left-4 flex items-center gap-2.5">
                    <div className="p-2.5 rounded-lg bg-[#141926]/90 backdrop-blur-md border border-[#1E2330] text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-md">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <span className="absolute top-3 right-3 text-xs font-mono text-zinc-300 font-semibold bg-black/60 backdrop-blur-md px-2 py-0.5 rounded border border-white/10">
                    0{index + 1}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2.5 group-hover:text-blue-400 transition-colors font-display">
                      {service.title}
                    </h3>
                    <p className="text-sm text-[#A1A1AA] leading-relaxed mb-5 line-clamp-2">
                      {service.shortDesc}
                    </p>

                    {/* Bullet Benefits preview */}
                    {benefitsList.length > 0 && (
                      <ul className="space-y-1.5 border-t border-[#27272A]/70 pt-3.5 mb-5">
                        {benefitsList.slice(0, 2).map((b, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-zinc-400">
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-400 pt-2 group-hover:text-blue-300 border-t border-[#1E2330]/50">
                    <span>Explore Breakdown</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
