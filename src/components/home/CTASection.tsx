import React from 'react';
import { ArrowUpRight, Clock, ShieldCheck, MessageSquare, Sparkles } from 'lucide-react';

interface CTASectionProps {
  onNavigate: (path: string) => void;
  ctaText?: string;
  title?: string;
  subtitle?: string;
}

export const CTASection: React.FC<CTASectionProps> = ({
  onNavigate,
  ctaText = "LET'S CONNECT",
  title = "Experience our process firsthand. Let's connect.",
  subtitle = "Book an initial 30–minute discovery session with our senior engineers and product designers. We'll map your technical requirements with zero ambiguity.",
}) => {
  return (
    <section className="py-20 md:py-28 bg-[#08090E] relative overflow-hidden border-t border-[#1E2330]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative w-full group">
          {/* Outer Ambient Glow Effect (Static + Hover Boost) */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-blue-500/15 to-indigo-600/20 rounded-[28px] blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          {/* Main Card Container */}
          <div className="relative overflow-hidden rounded-[24px] border border-[#1E3A8A]/70 group-hover:border-[#3B82F6] bg-gradient-to-br from-[#060B16] via-[#091122] to-[#0A142A] group-hover:from-[#080E1C] group-hover:via-[#0B152B] group-hover:to-[#0D1832] p-8 sm:p-12 lg:p-14 shadow-2xl shadow-[#040711]/90 group-hover:shadow-[0_24px_70px_-15px_rgba(29,78,216,0.4)] transition-all duration-500">
            
            {/* Static Background Ambient Nebula Glows */}
            <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[550px] h-[360px] bg-gradient-to-l from-blue-600/35 via-blue-500/20 to-transparent rounded-full blur-[85px] pointer-events-none group-hover:scale-105 group-hover:from-blue-600/50 group-hover:via-blue-500/30 transition-all duration-700" />
            <div className="absolute -bottom-24 -left-24 w-[380px] h-[380px] bg-gradient-to-tr from-blue-700/20 via-indigo-600/10 to-transparent rounded-full blur-[90px] pointer-events-none group-hover:scale-105 group-hover:bg-blue-600/25 transition-all duration-700" />
            
            {/* Subtle Blueprint Mesh Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1E293B18_1px,transparent_1px),linear-gradient(to_bottom,#1E293B18_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none" />

            {/* Content Layout */}
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-14">
              {/* Left Content Area */}
              <div className="max-w-2xl text-left">
                {/* Pill Badge */}
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#0D182E]/90 border border-[#1E3A8A]/70 shadow-sm shadow-blue-950/50 mb-6">
                  <Sparkles className="w-3.5 h-3.5 text-[#3B82F6]" />
                  <span className="text-[11px] font-bold text-[#3B82F6] uppercase tracking-wider">PREDICTABLE EXCELLENCE</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                  <span className="text-[11px] font-normal text-[#94A3B8]">Now Booking Next Quarter</span>
                </div>

                {/* Headline */}
                <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-bold tracking-tight text-white font-display leading-[1.12] mb-4 text-balance">
                  {title}
                </h2>

                {/* Subtitle */}
                <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed mb-8 font-normal max-w-xl">
                  {subtitle}
                </p>

                {/* Trust Indicators */}
                <div className="flex flex-wrap items-center gap-y-2.5 gap-x-7 text-xs text-[#94A3B8] pt-6 border-t border-[#182640]/80">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#3B82F6] shrink-0" />
                    <span>&lt; 24h Response SLA</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#3B82F6] shrink-0" />
                    <span>Strict NDA Protected</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-[#3B82F6] shrink-0" />
                    <span>Direct Principal Access</span>
                  </div>
                </div>
              </div>

              {/* Right Action Trigger Buttons */}
              <div className="flex flex-col sm:flex-row lg:flex-col shrink-0 gap-3.5 w-full sm:w-auto lg:min-w-[240px]">
                {/* Primary Action Button */}
                <button
                  type="button"
                  onClick={() => onNavigate('/contact')}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white bg-[#1D68FE] hover:bg-[#2B72FF] active:bg-blue-700 transition-all duration-200 rounded-xl shadow-[0_8px_25px_-4px_rgba(29,104,254,0.55)] hover:shadow-[0_12px_32px_-2px_rgba(29,104,254,0.75)] hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 cursor-pointer text-center group/btn"
                >
                  <span>{ctaText}</span>
                  <ArrowUpRight className="w-4 h-4 text-white group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>

                {/* Secondary Action Button */}
                <button
                  type="button"
                  onClick={() => onNavigate('/process')}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-xs sm:text-sm font-medium tracking-wide text-zinc-200 hover:text-white bg-[#0C1220]/90 hover:bg-[#121B30] border border-[#1E2B45] hover:border-[#3B82F6]/60 transition-all duration-200 rounded-xl hover:-translate-y-0.5 cursor-pointer text-center"
                >
                  <span>Explore Engagement Models</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
