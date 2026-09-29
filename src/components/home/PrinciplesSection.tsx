import React from 'react';
import { Target, Zap, Users, Compass } from 'lucide-react';

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
    <section className="py-20 md:py-28 bg-[#050505] border-b border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="text-xs uppercase tracking-widest text-zinc-400 font-semibold mb-3">
              Why Work With Us
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-display">
              Core Principles of Our Practice
            </h2>
          </div>
          <p className="text-zinc-400 max-w-md text-sm sm:text-base leading-relaxed">
            We don’t rely on bloated agency hierarchies. We operate as a high-discipline, agile studio delivering work that commands respect.
          </p>
        </div>

        {/* 4 Core Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {principles.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.num}
                className="bg-[#0D0D0D] border border-[#1A1A1A] p-7 rounded-xl hover:border-zinc-700 hover:bg-[#121212] transition-all group flex flex-col justify-between shadow-lg shadow-black/30"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-xs font-mono font-semibold text-zinc-400">
                      {item.num}
                    </span>
                    <div className="p-2.5 rounded-lg bg-[#141414] border border-[#1A1A1A] text-zinc-400 group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-zinc-200 transition-colors font-display">
                    {item.title}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
