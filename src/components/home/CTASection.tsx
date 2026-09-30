import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface CTASectionProps {
  onNavigate: (path: string) => void;
  ctaText?: string;
}

export const CTASection: React.FC<CTASectionProps> = ({
  onNavigate,
  ctaText = 'Start a Project',
}) => {
  return (
    <section className="py-24 md:py-32 bg-[#08090E] relative overflow-hidden border-t border-[#1E2330]">
      {/* Background radial accent glow */}
      <div className="absolute inset-0 bg-blue-600/5 blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="text-xs uppercase tracking-widest text-blue-400 font-semibold mb-4">
          Initiate Engagement
        </div>

        <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white font-display mb-6">
          Have an idea worth building?
          <br />
          <span className="text-[#94A3B8]">Let’s create something that works.</span>
        </h2>

        <p className="text-base sm:text-lg text-[#94A3B8] max-w-xl mx-auto mb-10 leading-relaxed">
          Tell us about your objectives, timeline, and challenges. We’ll review your project scope and schedule a strategic consultation within 24 hours.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => onNavigate('/start-a-project')}
            className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 transition-all rounded-lg shadow-xl shadow-blue-950/40 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 cursor-pointer"
          >
            <span>{ctaText}</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onNavigate('/contact')}
            className="inline-flex items-center gap-2 px-7 py-4 text-sm font-medium tracking-wide text-zinc-300 bg-[#0D1017] hover:bg-[#121622] hover:text-white border border-[#1E2330] hover:border-zinc-600 transition-all rounded-lg whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 cursor-pointer"
          >
            <span>General Inquiry</span>
          </button>
        </div>
      </div>
    </section>
  );
};
