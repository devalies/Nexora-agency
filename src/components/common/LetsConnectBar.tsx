import React from 'react';
import { ArrowUpRight, MessageSquare, Sparkles, Clock, ShieldCheck } from 'lucide-react';

interface LetsConnectBarProps {
  onNavigate: (path: string) => void;
  title?: string;
  subtitle?: string;
  badge?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  serviceFocus?: string;
}

export const LetsConnectBar: React.FC<LetsConnectBarProps> = ({
  onNavigate,
  title = "Ready to build something exceptional? Let's connect.",
  subtitle = "Discuss your project scope, architecture, or timeline with our lead engineering & design team. We reply within 24 hours.",
  badge = "High-Velocity Partnership",
  primaryButtonText = "Let's Connect",
  secondaryButtonText = "Book a Discovery Call",
  serviceFocus,
}) => {
  const handlePrimaryClick = () => {
    if (serviceFocus) {
      onNavigate(`/contact?service=${encodeURIComponent(serviceFocus)}`);
    } else {
      onNavigate('/contact');
    }
  };

  const handleSecondaryClick = () => {
    onNavigate('/start-a-project');
  };

  return (
    <section className="relative overflow-hidden py-16 sm:py-20 bg-[#0A0D14] border-t border-b border-[#1E2330] lets-connect-bar">
      {/* Background Lighting & Grid Accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 max-w-5xl h-64 bg-blue-600/15 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1E233015_1px,transparent_1px),linear-gradient(to_bottom,#1E233015_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-r from-[#0E1320] via-[#111728] to-[#0E1320] border border-blue-500/30 hover:border-blue-500/50 rounded-2xl p-8 sm:p-12 lg:p-14 shadow-2xl shadow-blue-950/40 transition-all duration-300 relative overflow-hidden group">
          {/* Subtle Ambient Edge Glow */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12 relative z-10">
            {/* Left Content Area */}
            <div className="max-w-2xl text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-5">
                <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
                <span>{badge}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 ml-1" />
                <span className="text-[11px] font-normal text-zinc-400 capitalize tracking-normal">Now Booking Next Quarter</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-display leading-[1.15] mb-4 text-balance">
                {title}
              </h2>

              <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed mb-6 font-normal">
                {subtitle}
              </p>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-zinc-400 pt-2 border-t border-[#1E2330]">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>&lt; 24h Response SLA</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Strict NDA Protected</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Direct Principal Access</span>
                </div>
              </div>
            </div>

            {/* Right Action Trigger Buttons */}
            <div className="flex flex-col sm:flex-row lg:flex-col shrink-0 gap-3.5 w-full sm:w-auto lg:min-w-[240px]">
              <button
                type="button"
                onClick={handlePrimaryClick}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 transition-all duration-200 rounded-xl shadow-xl shadow-blue-600/30 hover:shadow-blue-600/40 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 cursor-pointer text-center group/btn"
              >
                <span className="btn-text-white">{primaryButtonText}</span>
                <ArrowUpRight className="w-4 h-4 text-white group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </button>

              <button
                type="button"
                onClick={handleSecondaryClick}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-medium tracking-wide text-zinc-200 hover:text-white dark:text-zinc-200 dark:hover:text-white bg-[#141926]/90 hover:bg-[#1C2336] border border-[#273248] hover:border-zinc-500 transition-all rounded-xl cursor-pointer text-center lets-connect-secondary-btn"
              >
                <span>{secondaryButtonText}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
