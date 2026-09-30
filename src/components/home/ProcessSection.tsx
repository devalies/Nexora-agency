import React from 'react';
import { MessageSquare, Search, Presentation, Rocket, ArrowUpRight } from 'lucide-react';

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
    <section className="py-20 md:py-28 bg-[#08090E] border-b border-[#1E2330]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-widest text-blue-400 font-semibold mb-3">
              Our Working Process
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-display mb-4">
              How We Work With You From Day One
            </h2>
            <p className="text-[#94A3B8] text-base leading-relaxed">
              Before committing to production, we walk you through a structured 4-phase collaboration
              process that guarantees total clarity, alignment, and predictability.
            </p>
          </div>

          {onNavigate && (
            <button
              onClick={() => onNavigate('/process')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-300 hover:text-white group cursor-pointer"
            >
              <span>Explore Process Details</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-blue-400" />
            </button>
          )}
        </div>

        {/* 4-Step Process Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                onClick={() => onNavigate?.('/process')}
                className="group cursor-pointer bg-[#0D1017] border border-[#1E2330] p-6 sm:p-7 rounded-xl transition-all duration-300 ease-out flex flex-col justify-between shadow-lg shadow-black/20 hover:border-blue-500 hover:bg-[#0E1526] hover:shadow-xl hover:shadow-blue-950/40 hover:-translate-y-0.5"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono font-semibold text-[#64748B] group-hover:text-blue-400 transition-colors">
                      {step.num}
                    </span>
                    <div className="p-2.5 rounded-lg bg-[#121622] border border-[#1E2330] text-[#94A3B8] group-hover:text-blue-400 group-hover:border-blue-500/50 group-hover:bg-blue-950/40 transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-1.5 group-hover:text-blue-400 transition-colors font-display">
                    {step.title}
                  </h3>
                  <p className="text-xs font-semibold text-blue-400/90 mb-3 uppercase tracking-wider">
                    {step.tagline}
                  </p>
                  <p className="text-sm text-[#94A3B8] leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#1E2330] flex items-center justify-between text-xs text-[#64748B] group-hover:text-blue-400 transition-colors">
                  <span className="truncate pr-2">Output: {step.deliverable}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

