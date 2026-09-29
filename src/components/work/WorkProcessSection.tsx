import React, { useState } from 'react';
import {
  MessageSquare,
  Search,
  Presentation,
  Rocket,
  CheckCircle2,
  Calendar,
  Clock,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  FileText,
  ChevronRight,
} from 'lucide-react';

interface WorkProcessSectionProps {
  onNavigate: (path: string) => void;
}

export const WorkProcessSection: React.FC<WorkProcessSectionProps> = ({ onNavigate }) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      stepNumber: '01',
      title: 'Connect & Discuss',
      subtitle: 'Initial Discovery & Vision Alignment',
      summary:
        'First, we connect directly with you to discuss the vision, core goals, target audience, and business problems you are looking to solve.',
      meetingType: 'Introductory Discovery Call (30–45 Mins)',
      duration: 'Day 1',
      icon: MessageSquare,
      whatHappens: [
        'We listen to your background, product idea, and commercial targets.',
        'We identify the core problem statement, audience personas, and desired launch horizon.',
        'We review your existing brand, competitors, and technical environment.',
        'We execute mutual Non-Disclosure Agreements (NDAs) if required.',
      ],
      clientDeliverables: [
        'Discovery Summary Document',
        'High-Level Scope Outline',
        'Preliminary Feasibility Assessment',
      ],
      clientTakeaway:
        'A crystal-clear understanding of mutual fit, with zero sales pressure and zero obligation.',
    },
    {
      stepNumber: '02',
      title: 'Get Inside the Requirements',
      subtitle: 'Technical Audit & Deep-Dive Analysis',
      summary:
        'Next, we immerse ourselves inside your requirements — analyzing technical constraints, feature specifications, architecture, and user journeys.',
      meetingType: 'Requirements Workshop & Async Deep-Dive',
      duration: 'Days 2–4',
      icon: Search,
      whatHappens: [
        'We dissect functional specifications, user roles, integrations, and third-party APIs.',
        'We evaluate data schemas, hosting requirements, and security compliance constraints.',
        'We map out primary user flows and identify high-value conversion funnels.',
        'We uncover hidden edge-cases before design or coding begins.',
      ],
      clientDeliverables: [
        'Detailed Requirements Traceability Matrix (RTM)',
        'User Flow Scaffolding',
        'Integration & Tech Stack Recommendations',
      ],
      clientTakeaway:
        'Every ambiguous assumption is transformed into concrete, documented technical criteria.',
    },
    {
      stepNumber: '03',
      title: 'Research & Live Presentation',
      subtitle: 'Market Research & Demonstration Meeting',
      summary:
        'We conduct rigorous research on your space, develop an actionable strategy, and book a dedicated presentation meeting to demonstrate the project we propose to build.',
      meetingType: 'Live Demonstration & Strategy Meeting (60 Mins)',
      duration: 'Days 5–7',
      icon: Presentation,
      whatHappens: [
        'We present competitor benchmarking data and industry performance standards.',
        'We walk you through interactive wireframes, visual style concepts, and layout prototypes.',
        'We demonstrate the technical architecture and how the user experience will feel.',
        'We present an open milestone roadmap with transparent budget breakdown.',
      ],
      clientDeliverables: [
        'Custom Presentation Deck & Architectural Wireframes',
        'Interactive Prototype Walkthrough',
        'Milestone Schedule & Transparent Pricing Proposal',
      ],
      clientTakeaway:
        'You see tangible proofs of design and architecture tailored to your business before committing to production.',
    },
    {
      stepNumber: '04',
      title: 'Final Briefing & Kickoff',
      subtitle: 'Final Scope Approval & Sprints Kickoff',
      summary:
        'After integrating your feedback from the presentation, we conduct the final briefing, align on milestones, and immediately move forward into active development sprints.',
      meetingType: 'Sprint Kickoff & Alignment Meeting (30 Mins)',
      duration: 'Day 8+',
      icon: Rocket,
      whatHappens: [
        'We incorporate all feedback and refine the master project agreement.',
        'We establish sprint cadences, weekly demo dates, and direct communication channels.',
        'We provision development staging environments and project management dashboards.',
        'Design and engineering sprints commence at full velocity.',
      ],
      clientDeliverables: [
        'Final Signed Scope of Work & Milestone Schedule',
        'Private Slack / Discord Studio Channel Access',
        'Live Staging Link & Sprint Task Board Access',
      ],
      clientTakeaway:
        'Complete peace of mind with structured weekly milestones, continuous demos, and zero surprises.',
    },
  ];

  const currentStep = steps[activeStep];
  const StepIcon = currentStep.icon;

  return (
    <div className="space-y-12">
      {/* Introduction Card */}
      <div className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-2xl p-6 sm:p-10 relative overflow-hidden shadow-2xl shadow-black/50">
        <div className="max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Client Engagement Model</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-bold text-white font-display leading-tight mb-4">
            How We Work With You Before Writing a Single Line of Code
          </h2>

          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
            We don't believe in guessing or high-pressure pitches. Before moving into full-scale production,
            we guide every client through a structured 4-step collaborative journey — from the initial chat
            to deep requirements research, interactive demonstrations, and final sprint alignment.
          </p>
        </div>

        {/* 4 Step Progress Pills / Navigation Tabs */}
        <div className="mt-8 pt-8 border-t border-[#1A1A1A] grid grid-cols-2 md:grid-cols-4 gap-3">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStep === idx;
            return (
              <button
                key={step.stepNumber}
                onClick={() => setActiveStep(idx)}
                className={`text-left p-4 rounded-xl border transition-all flex flex-col justify-between cursor-pointer ${
                  isActive
                    ? 'bg-[#141414] border-zinc-400 shadow-lg shadow-white/5'
                    : 'bg-[#101010] border-[#1A1A1A] hover:border-zinc-700 hover:bg-[#141414]'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                      isActive
                        ? 'bg-white text-black'
                        : 'bg-[#18181B] text-zinc-400'
                    }`}
                  >
                    STEP {step.stepNumber}
                  </span>
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? 'text-white' : 'text-zinc-500'
                    }`}
                  />
                </div>
                <div>
                  <div
                    className={`text-sm font-bold font-display ${
                      isActive ? 'text-white' : 'text-zinc-300'
                    }`}
                  >
                    {step.title}
                  </div>
                  <div className="text-[11px] text-zinc-500 mt-0.5 line-clamp-1">
                    {step.duration}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Step Deep-Dive Showcase */}
      <div className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-2xl p-6 sm:p-10 relative overflow-hidden shadow-2xl shadow-black/50">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Stage Detail */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-3xl sm:text-4xl font-mono font-bold text-zinc-400">
                {currentStep.stepNumber}
              </span>
              <div className="p-2 rounded-lg bg-[#141414] border border-[#1A1A1A] text-zinc-300">
                <StepIcon className="w-5 h-5" />
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#141414] border border-[#1A1A1A] text-xs font-mono text-zinc-300">
                <Clock className="w-3.5 h-3.5 text-zinc-400" />
                <span>{currentStep.duration}</span>
              </div>
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
                {currentStep.title}
              </h3>
              <p className="text-xs font-semibold text-zinc-400 mt-1 uppercase tracking-wide">
                {currentStep.subtitle}
              </p>
              <p className="text-sm sm:text-base text-zinc-300 mt-3 leading-relaxed">
                {currentStep.summary}
              </p>
            </div>

            {/* Meeting Type Badge */}
            <div className="p-4 rounded-xl bg-[#141414] border border-[#1A1A1A] flex items-center gap-3">
              <Calendar className="w-5 h-5 text-zinc-300 shrink-0" />
              <div>
                <div className="text-[11px] uppercase tracking-wider text-zinc-400 font-semibold">
                  Meeting Format & Structure
                </div>
                <div className="text-xs sm:text-sm font-semibold text-white mt-0.5">
                  {currentStep.meetingType}
                </div>
              </div>
            </div>

            {/* What Happens During This Phase */}
            <div>
              <h4 className="text-xs uppercase tracking-wider text-zinc-400 font-semibold mb-3">
                What We Do in This Step
              </h4>
              <ul className="space-y-2.5">
                {currentStep.whatHappens.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Concrete Deliverables & Client Takeaway */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#080808] border border-[#1A1A1A] rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-zinc-400 font-semibold pb-3 border-b border-[#1A1A1A]">
                <FileText className="w-4 h-4 text-zinc-300" />
                <span>Concrete Tangible Outputs</span>
              </div>

              <div className="space-y-2">
                {currentStep.clientDeliverables.map((deliv, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#0D0D0D] border border-[#1A1A1A] rounded-lg text-xs font-mono text-zinc-200 flex items-center gap-2"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                    <span>{deliv}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-[#1A1A1A]">
                <div className="text-[11px] uppercase tracking-wider text-zinc-400 font-semibold mb-1.5 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>The Client Assurance</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed italic bg-[#0D0D0D] p-3 rounded-lg border border-[#1A1A1A]">
                  "{currentStep.clientTakeaway}"
                </p>
              </div>
            </div>

            {/* Quick Next/Prev Navigation */}
            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                disabled={activeStep === 0}
                onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                className="px-4 py-2 bg-[#141414] hover:bg-[#1f1f1f] disabled:opacity-30 border border-[#1A1A1A] rounded-lg text-xs font-semibold text-zinc-300 transition-colors cursor-pointer"
              >
                Previous Step
              </button>

              {activeStep < steps.length - 1 ? (
                <button
                  onClick={() => setActiveStep((prev) => Math.min(steps.length - 1, prev + 1))}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-zinc-200 text-black rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shadow-md shadow-white/5"
                >
                  <span>Next: Step {steps[activeStep + 1].stepNumber}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={() => onNavigate('/start-a-project')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-zinc-200 text-black rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shadow-md shadow-white/5"
                >
                  <span>Start Step 01 With Us</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Callout Action Banner */}
      <div className="p-6 sm:p-8 bg-[#0D0D0D] border border-[#1A1A1A] rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl shadow-black/40">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-white font-display">
            Ready to discuss your project?
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl">
            Book an initial 30-minute discovery conversation. We'll listen to your requirements,
            conduct preliminary research, and prepare a custom demonstration for you.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate('/start-a-project')}
            className="inline-flex items-center gap-2 px-5 py-3 bg-white hover:bg-zinc-200 text-black rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shadow-md shadow-white/5"
          >
            <span>Book Initial Discussion</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onNavigate('/contact')}
            className="px-4 py-3 bg-[#141414] hover:bg-[#1f1f1f] text-zinc-300 border border-[#1A1A1A] rounded-lg text-xs font-semibold tracking-wider transition-colors cursor-pointer"
          >
            Direct Inquiry
          </button>
        </div>
      </div>
    </div>
  );
};
