import React from 'react';
import { MessageSquare, Search, Presentation, Rocket, ArrowRight } from 'lucide-react';

interface ProcessSectionProps {
  onNavigate?: (path: string) => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onNavigate }) => {
  const steps = [
    {
      num: '01',
      title: 'Connect & Discuss',
      tagline: 'Initial conversation & vision alignment.',
      description:
        'First, we connect with you directly to discuss the project vision, core business goals, target timeline, and specific challenges you want to solve.',
      icon: MessageSquare,
      deliverable: 'Discovery brief & scope alignment',
    },
    {
      num: '02',
      title: 'Get Inside Requirements',
      tagline: 'Deep technical & functional investigation.',
      description:
        'We get deep inside the requirements — unpacking technical constraints, user journeys, data schemas, integrations, and audience expectations.',
      icon: Search,
      deliverable: 'Requirements matrix & flow map',
    },
    {
      num: '03',
      title: 'Research & Live Demo',
      tagline: 'Presentation meeting & interactive prototype.',
      description:
        'We research your market and book a presentation meeting to demonstrate the project concepts, wireframes, and execution roadmap before production.',
      icon: Presentation,
      deliverable: 'Custom presentation deck & prototype',
    },
    {
      num: '04',
      title: 'Final Briefing & Kickoff',
      tagline: 'Scope lock & agile production sprints.',
      description:
        'After the final briefing and alignment on milestones, we move forward with the project into active development sprints with weekly demos.',
      icon: Rocket,
      deliverable: 'Sprint board, staging environment & build',
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#050505] border-b border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-widest text-zinc-400 font-semibold mb-3">
              Our Working Process
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-display mb-4">
              How We Work With You From Day One
            </h2>
            <p className="text-zinc-400 text-base leading-relaxed">
              Before committing to production, we walk you through a structured 4-phase collaboration
              process that guarantees total clarity, alignment, and predictability.
            </p>
          </div>

          {onNavigate && (
            <button
              onClick={() => onNavigate('/process')}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-300 hover:text-white transition-colors shrink-0 cursor-pointer"
            >
              <span>Explore Process Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* 4-Step Process Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="bg-[#0D0D0D] border border-[#1A1A1A] p-7 rounded-xl flex flex-col justify-between hover:border-zinc-700 hover:bg-[#121212] transition-all group relative overflow-hidden shadow-lg shadow-black/30"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-bold font-mono text-zinc-400 group-hover:text-white transition-colors">
                      {step.num}
                    </span>
                    <div className="p-2.5 rounded-lg bg-[#141414] border border-[#1A1A1A] text-zinc-400 group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 font-display">
                    {step.title}
                  </h3>
                  <p className="text-xs font-semibold text-zinc-400 mb-3 uppercase tracking-wide">
                    {step.tagline}
                  </p>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#1A1A1A] text-[11px] font-mono text-zinc-500">
                  <span className="text-zinc-600 mr-1.5">Output:</span>
                  <span className="text-zinc-300">{step.deliverable}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

