import React, { useState } from 'react';
import { ArrowUpRight, ArrowDown, Laptop, Smartphone } from 'lucide-react';
import defaultHeroShowcase from '../../assets/images/hero_nexora_showcase_1790138540390.jpg';

interface HeroSectionProps {
  onNavigate: (path: string) => void;
  heroImage?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigate,
  heroImage = defaultHeroShowcase,
}) => {
  const [activeDevice, setActiveDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [imgError, setImgError] = useState(false);

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[#08090E] border-b border-[#1E2330]">
      {/* Subtle background ambient mesh */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-blue-600/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl">
          {/* Studio Kicker / Strategic Identity (Compliant unboxed metadata) */}
          <div className="flex items-center gap-2.5 text-xs uppercase tracking-widest text-[#94A3B8] font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span>Independent Design & Engineering Studio</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span>San Francisco</span>
          </div>

          {/* Headline - Editorial and Confident */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white font-display leading-[1.08] text-balance">
            We build digital experiences that move businesses forward.
          </h1>

          {/* Supporting Copy */}
          <p className="mt-6 text-lg sm:text-xl text-[#94A3B8] leading-relaxed max-w-2xl font-normal">
            Strategy, design, development and digital growth for ambitious businesses and brands. We partner closely with founders and teams to engineer high-velocity digital products.
          </p>

          {/* Action CTAs */}
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <button
              onClick={() => onNavigate('/services')}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 transition-all rounded-lg shadow-lg shadow-blue-950/40 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 cursor-pointer"
            >
              <span>Explore Services</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('/process')}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium tracking-wide text-zinc-200 bg-[#11141E] hover:bg-[#161B28] hover:text-white border border-[#1E2330] hover:border-zinc-600 transition-all rounded-lg whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 cursor-pointer"
            >
              <span>How We Work</span>
            </button>
          </div>
        </div>

        {/* Hero Visual Mockup Container (No fake AI illustrations, real agency work presentation) */}
        <div className="mt-14 lg:mt-20">
          <div className="bg-[#0D1017] border border-[#1E2330] rounded-xl overflow-hidden shadow-2xl shadow-[#040508]/80">
            {/* Mockup Frame Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#1E2330] bg-[#0A0D14]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                <span className="text-xs text-[#64748B] ml-2 font-mono hidden sm:inline">
                  nexora.studio / agency-preview
                </span>
              </div>

              {/* Viewport toggle for desktop / mobile inspect */}
              <div className="flex items-center gap-1 bg-[#11141E] p-1 rounded-md border border-[#1E2330]">
                <button
                  onClick={() => setActiveDevice('desktop')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded transition-colors ${
                    activeDevice === 'desktop'
                      ? 'bg-blue-600 text-white'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                  aria-label="Desktop Preview"
                >
                  <Laptop className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Desktop</span>
                </button>
                <button
                  onClick={() => setActiveDevice('mobile')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded transition-colors ${
                    activeDevice === 'mobile'
                      ? 'bg-blue-600 text-white'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                  aria-label="Mobile Preview"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Mobile</span>
                </button>
              </div>
            </div>

            {/* Showcase Visual Frame */}
            <div className={`relative w-full bg-[#0A0A0A] overflow-hidden flex items-center justify-center p-3 sm:p-6 transition-all duration-300 ${
              activeDevice === 'desktop' ? 'aspect-[16/9] max-h-[580px]' : 'min-h-[460px] sm:min-h-[560px] py-6 sm:py-8'
            }`}>
              {activeDevice === 'desktop' ? (
                <div className="w-full h-full relative rounded-lg overflow-hidden group bg-gradient-to-br from-zinc-900 to-black">
                  {!imgError ? (
                    <img
                      src={heroImage || defaultHeroShowcase}
                      alt="Nexora Digital Experience Showcase"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                      referrerPolicy="no-referrer"
                      onError={() => setImgError(true)}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-[#0D1117] text-center border border-zinc-800">
                      <div className="w-16 h-16 rounded-2xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4 shadow-inner">
                        <Laptop className="w-8 h-8" />
                      </div>
                      <h4 className="text-xl font-bold text-white mb-2 font-display">
                        High-Performance Digital Architecture
                      </h4>
                      <p className="text-sm text-zinc-400 max-w-md">
                        Custom interactive user interfaces, headless microservices, and enterprise-grade performance built for high velocity.
                      </p>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4 sm:p-6 pointer-events-none">
                    <div className="text-left">
                      <div className="text-xs uppercase tracking-widest text-blue-400 font-semibold mb-1">
                        Featured Systems
                      </div>
                      <div className="text-base sm:text-lg font-bold text-white">
                        Full-Stack Digital Platform Architectures
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Responsive Mobile Phone Mockup */
                <div className="w-full max-w-[280px] sm:max-w-[320px] aspect-[9/19] max-h-[500px] sm:max-h-[560px] bg-black border-[6px] sm:border-[8px] border-zinc-800 rounded-[2.5rem] overflow-hidden shadow-2xl relative my-auto flex flex-col ring-1 ring-zinc-700/60">
                  {/* Dynamic Island / Speaker Notch */}
                  <div className="w-full pt-3 pb-1 flex justify-center bg-black shrink-0 relative z-20">
                    <div className="w-20 sm:w-24 h-4 bg-zinc-900 rounded-full border border-zinc-800 flex items-center justify-end px-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500/80 animate-pulse" />
                    </div>
                  </div>

                  {/* Mobile Screen App UI Simulation with real content & hero graphic */}
                  <div className="relative w-full flex-1 overflow-y-auto no-scrollbar bg-[#0E0E0E] flex flex-col text-left">
                    {/* Simulated Mobile App Header */}
                    <div className="px-4 py-2.5 flex items-center justify-between border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur shrink-0 sticky top-0 z-10">
                      <span className="text-xs font-bold tracking-tight text-white font-display">NEXORA</span>
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">Studio</span>
                    </div>

                    {/* Mobile Hero Graphic */}
                    <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-zinc-900">
                      <img
                        src={heroImage || defaultHeroShowcase}
                        alt="Nexora Mobile Experience Preview"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                      <div className="absolute bottom-2.5 left-3 right-3">
                        <span className="text-[9px] uppercase tracking-wider text-blue-400 font-bold block">Mobile Responsive</span>
                        <span className="text-xs font-bold text-white block truncate">Adaptive High-Performance Engine</span>
                      </div>
                    </div>

                    {/* Mobile Content Skeleton & Metrics */}
                    <div className="p-3.5 space-y-3 flex-1">
                      <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-3">
                        <div className="flex items-center justify-between text-[11px] font-semibold text-zinc-300 mb-1.5">
                          <span>Real-time Interaction</span>
                          <span className="text-emerald-400">99.8%</span>
                        </div>
                        <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                          <div className="w-[88%] h-full bg-blue-500 rounded-full" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-zinc-900/70 border border-zinc-800/80 rounded-lg p-2.5">
                          <div className="text-[9px] uppercase tracking-wider text-zinc-400">Lighthouse</div>
                          <div className="text-sm font-bold text-white mt-0.5">100 / 100</div>
                        </div>
                        <div className="bg-zinc-900/70 border border-zinc-800/80 rounded-lg p-2.5">
                          <div className="text-[9px] uppercase tracking-wider text-zinc-400">Touch Response</div>
                          <div className="text-sm font-bold text-emerald-400 mt-0.5">&lt; 12ms</div>
                        </div>
                      </div>

                      <div className="pt-1">
                        <button
                          onClick={() => onNavigate('/services')}
                          className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-blue-900/30"
                        >
                          <span>Explore Capabilities</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Home Indicator Bar */}
                    <div className="w-full py-2 flex justify-center bg-black shrink-0">
                      <div className="w-28 h-1 bg-zinc-600 rounded-full" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
