import React from 'react';
import { Target, Zap, Users, Compass, ArrowUpRight } from 'lucide-react';

export const PrinciplesSection: React.FC = () => {
  const principles = [
    {
      num: '01',
      title: 'Strategy First',
      description: 'We understand the business economics, audience personas, and market positioning before designing a single screen.',
      icon: Target,
    },
    {
      num: '02',
      title: 'Built for Performance',
      description: 'Every website is engineered around usability, instant responsiveness, sub-second speed, and technical search visibility.',
      icon: Zap,
    },
    {
      num: '03',
      title: 'One Team',
      description: 'Strategy, design, development, and growth under one roof. No outsourced handoffs, lost context, or finger-pointing.',
      icon: Users,
    },
    {
      num: '04',
      title: 'Customer Focused',
      description: 'Every interface decision is evaluated against real human behavior, conversion frictionless paths, and long-term business goals.',
      icon: Compass,
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#08090E] border-b border-[#1E2330]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="text-xs uppercase tracking-widest text-blue-400 font-semibold mb-3">
              Why Work With Us
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-display">
              Core Principles of Our Practice
            </h2>
          </div>
          <p className="text-[#94A3B8] max-w-md text-sm sm:text-base leading-relaxed">
            We don’t rely on bloated agency hierarchies. We operate as a high-discipline, agile studio delivering work that commands respect.
          </p>
        </div>

        {/* 4 Core Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {principles.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.num}
                className="group cursor-pointer bg-[#0D1017] border border-[#1E2330] p-6 sm:p-7 rounded-xl transition-all duration-300 ease-out flex flex-col justify-between shadow-lg shadow-black/20 hover:border-blue-500 hover:bg-[#0E1526] hover:shadow-xl hover:shadow-blue-950/40 hover:-translate-y-0.5"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono font-semibold text-[#64748B] group-hover:text-blue-400 transition-colors">
                      {item.num}
                    </span>
                    <div className="p-2.5 rounded-lg bg-[#121622] border border-[#1E2330] text-[#94A3B8] group-hover:text-blue-400 group-hover:border-blue-500/50 group-hover:bg-blue-950/40 transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2.5 group-hover:text-blue-400 transition-colors font-display">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#94A3B8] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-[#1E2330] flex items-center justify-between text-xs text-[#64748B] group-hover:text-blue-400 transition-colors">
                  <span>Explore principle</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
