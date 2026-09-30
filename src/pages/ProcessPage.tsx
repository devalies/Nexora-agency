import React from 'react';
import { SEO } from '../components/common/SEO';
import { LetsConnectBar } from '../components/common/LetsConnectBar';
import { Compass, Lightbulb, PenTool, Terminal, Rocket, LineChart, ShieldCheck, MessageSquare, Clock } from 'lucide-react';

interface ProcessPageProps {
  onNavigate: (path: string) => void;
}

export const ProcessPage: React.FC<ProcessPageProps> = ({ onNavigate }) => {
  const phases = [
    {
      step: '01',
      title: 'Connect & Discuss',
      subtitle: 'First conversation & high-level vision alignment',
      description: 'First, we connect directly with you to discuss the project idea, core business goals, target audience, and key commercial challenges. We assess mutual fit and establish project boundaries.',
      format: '30–45 Minute Video Discovery Call',
      deliverables: [
        'Initial discovery brief & scope outline',
        'Stakeholder alignment checklist',
        'Project timeline & feasibility overview',
        'Mutual Non-Disclosure Agreement (NDA)',
      ],
      icon: MessageSquare,
    },
    {
      step: '02',
      title: 'Get Inside the Requirements',
      subtitle: 'Deep technical, UX, and functional specification audit',
      description: 'We immerse ourselves into your requirements. We analyze data schemas, user personas, third-party API dependencies, CMS requirements, and design expectations with zero ambiguity.',
      format: 'Deep-Dive Requirements Audit & Synthesis',
      deliverables: [
        'Comprehensive Requirements Traceability Matrix',
        'Primary user journey flows & edge-case map',
        'Technical stack & infrastructure recommendation',
        'Feature prioritization & MVP vs Phase 2 scope',
      ],
      icon: Compass,
    },
    {
      step: '03',
      title: 'Research & Live Presentation Demo',
      subtitle: 'Market analysis & tailored demonstration meeting',
      description: 'We research your competitor landscape, craft tailored architecture wireframes, and book a dedicated presentation meeting to demonstrate the project concepts, prototypes, and execution plan.',
      format: '60-Minute Interactive Demonstration & Strategy Meeting',
      deliverables: [
        'Custom presentation deck with competitor benchmarks',
        'Interactive wireframe & UI layout prototypes',
        'System architecture & data schema diagram',
        'Transparent milestone roadmap and fixed investment pricing',
      ],
      icon: Lightbulb,
    },
    {
      step: '04',
      title: 'Final Briefing & Kickoff',
      subtitle: 'Final alignment, agreement lock, and development sprints',
      description: 'After integrating your feedback from the demonstration meeting, we conduct the final briefing, lock the deliverables and milestone dates, and immediately move forward into active production sprints.',
      format: 'Sprint Kickoff Alignment & Staging Environment Launch',
      deliverables: [
        'Final signed Statement of Work (SOW)',
        'Private Slack / communication channel onboarding',
        'Live staging preview environment credentials',
        'Weekly sprint cadence & demo schedule',
      ],
      icon: Rocket,
    },
  ];

  return (
    <>
      <SEO
        title="Our Process & Methodology"
        description="Discover how Nexora guides projects from initial discovery and strategy through bespoke design, clean full-stack engineering, and launch."
        canonicalPath="/process"
      />

      <div className="pt-32 pb-20 bg-[#08090E] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="max-w-3xl mb-16">
            <div className="text-xs uppercase tracking-widest text-blue-400 font-semibold mb-3">
              Methodology
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white font-display mb-6">
              A Disciplined Process Delivering Predictable Excellence
            </h1>
            <p className="text-lg text-[#94A3B8] leading-relaxed">
              We replace agency ambiguity with a transparent four-stage collaboration framework engineered to keep projects on schedule, within budget, and aligned with measurable business outcomes.
            </p>
          </div>

          {/* Detailed 4 Phases */}
          <div className="space-y-10">
            {phases.map((phase) => {
              const Icon = phase.icon;
              return (
                <div key={phase.step} className="relative w-full group">
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
                      <div className="lg:col-span-5">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-3xl font-mono font-bold text-blue-500">
                            {phase.step}
                          </span>
                          <div className="p-2 rounded-lg bg-[#141926] border border-[#1E2330] text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                            <Icon className="w-5 h-5" />
                          </div>
                        </div>

                        <h2 className="text-2xl font-bold text-white mb-2 font-display group-hover:text-blue-300 transition-colors">
                          {phase.title}
                        </h2>
                        <p className="text-xs font-semibold text-blue-400 mb-3 uppercase tracking-wide">
                          {phase.subtitle}
                        </p>
                        {phase.format && (
                          <div className="inline-block px-3 py-1 rounded bg-[#141926] border border-[#1E2330] text-xs font-mono text-blue-300 mb-4">
                            {phase.format}
                          </div>
                        )}
                        <p className="text-sm text-[#94A3B8] leading-relaxed">
                          {phase.description}
                        </p>
                      </div>

                      <div className="lg:col-span-7 bg-[#090D18]/90 p-6 sm:p-8 rounded-2xl border border-[#1E2330] group-hover:border-[#1E3A8A]/60 transition-colors duration-300">
                        <div className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
                          Key Deliverables
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {phase.deliverables.map((deliv, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-2.5 text-xs text-zinc-300 bg-[#0E1424] p-3 rounded-lg border border-[#1E2330] group-hover:border-blue-500/30 transition-colors"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                              <span>{deliv}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Studio Collaboration Standards */}
          <div className="mt-20 pt-16 border-t border-[#1E2330]">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 font-display">
              How We Communicate & Collaborate
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#0D1017] border border-[#1E2330] p-6 rounded-xl hover:border-blue-500/50 hover:bg-[#0E1526] transition-all">
                <MessageSquare className="w-6 h-6 text-blue-500 mb-4" />
                <h3 className="text-base font-bold text-white mb-2">Direct Slack & Loom</h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  No junior account managers. You communicate directly with the lead designers and engineers building your system.
                </p>
              </div>

              <div className="bg-[#0D1017] border border-[#1E2330] p-6 rounded-xl hover:border-blue-500/50 hover:bg-[#0E1526] transition-all">
                <Clock className="w-6 h-6 text-blue-500 mb-4" />
                <h3 className="text-base font-bold text-white mb-2">Weekly Sprint Demos</h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  Every 7 days, we deliver working staging previews with clickable updates and clear milestone tracking.
                </p>
              </div>

              <div className="bg-[#0D1017] border border-[#1E2330] p-6 rounded-xl hover:border-blue-500/50 hover:bg-[#0E1526] transition-all">
                <ShieldCheck className="w-6 h-6 text-blue-500 mb-4" />
                <h3 className="text-base font-bold text-white mb-2">Fixed-Price Clarity</h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  We scope thoroughly upfront and guarantee fixed deliverables so you never receive unexpected surprise invoices.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <LetsConnectBar
            onNavigate={onNavigate}
            title="Experience our process firsthand. Let's connect."
            subtitle="Book an initial 30-minute discovery session with our senior engineers and product designers. We'll map your technical requirements with zero ambiguity."
            badge="Predictable Excellence"
            primaryButtonText="Let's Connect"
            secondaryButtonText="Explore Engagement Models"
          />
        </div>
      </div>
    </>
  );
};
