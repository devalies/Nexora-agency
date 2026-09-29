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

      <div className="pt-32 pb-20 bg-[#0A0A0A] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="max-w-3xl mb-16">
            <div className="text-xs uppercase tracking-widest text-blue-500 font-semibold mb-3">
              Methodology
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white font-display mb-6">
              A Disciplined Process Delivering Predictable Excellence
            </h1>
            <p className="text-lg text-[#A1A1AA] leading-relaxed">
              We replace agency ambiguity with a transparent four-stage collaboration framework engineered to keep projects on schedule, within budget, and aligned with measurable business outcomes.
            </p>
          </div>

          {/* Detailed 4 Phases */}
          <div className="space-y-10">
            {phases.map((phase) => {
              const Icon = phase.icon;
              return (
                <div
                  key={phase.step}
                  className="bg-[#111111] border border-[#27272A] rounded-xl p-8 sm:p-10 hover:border-zinc-700 transition-all"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-5">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-3xl font-mono font-bold text-blue-500">
                          {phase.step}
                        </span>
                        <div className="p-2 rounded bg-[#171717] border border-[#27272A] text-zinc-300">
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>

                      <h2 className="text-2xl font-bold text-white mb-2 font-display">
                        {phase.title}
                      </h2>
                      <p className="text-xs font-semibold text-blue-400 mb-3 uppercase tracking-wide">
                        {phase.subtitle}
                      </p>
                      {phase.format && (
                        <div className="inline-block px-3 py-1 rounded bg-[#171717] border border-[#27272A] text-xs font-mono text-zinc-300 mb-4">
                          {phase.format}
                        </div>
                      )}
                      <p className="text-sm text-[#A1A1AA] leading-relaxed">
                        {phase.description}
                      </p>
                    </div>

                    <div className="lg:col-span-7 bg-[#0E0E0E] p-6 rounded-lg border border-[#27272A]/70">
                      <div className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
                        Key Deliverables
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {phase.deliverables.map((deliv, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-2.5 text-xs text-zinc-300 bg-[#141414] p-3 rounded border border-[#27272A]/50"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                            <span>{deliv}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Studio Collaboration Standards */}
          <div className="mt-20 pt-16 border-t border-[#27272A]">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 font-display">
              How We Communicate & Collaborate
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#111111] border border-[#27272A] p-6 rounded-xl">
                <MessageSquare className="w-6 h-6 text-blue-500 mb-4" />
                <h3 className="text-base font-bold text-white mb-2">Direct Slack & Loom</h3>
                <p className="text-xs text-[#A1A1AA] leading-relaxed">
                  No junior account managers. You communicate directly with the lead designers and engineers building your system.
                </p>
              </div>

              <div className="bg-[#111111] border border-[#27272A] p-6 rounded-xl">
                <Clock className="w-6 h-6 text-blue-500 mb-4" />
                <h3 className="text-base font-bold text-white mb-2">Weekly Sprint Demos</h3>
                <p className="text-xs text-[#A1A1AA] leading-relaxed">
                  Every 7 days, we deliver working staging previews with clickable updates and clear milestone tracking.
                </p>
              </div>

              <div className="bg-[#111111] border border-[#27272A] p-6 rounded-xl">
                <ShieldCheck className="w-6 h-6 text-blue-500 mb-4" />
                <h3 className="text-base font-bold text-white mb-2">Fixed-Price Clarity</h3>
                <p className="text-xs text-[#A1A1AA] leading-relaxed">
                  We scope thoroughly upfront and guarantee fixed deliverables so you never receive unexpected surprise invoices.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20">
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
