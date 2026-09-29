import React from 'react';
import { Industry } from '../../types';
import { ArrowUpRight } from 'lucide-react';

interface IndustriesSectionProps {
  industries: Industry[];
  onNavigate: (path: string) => void;
}

export const IndustriesSection: React.FC<IndustriesSectionProps> = ({ industries, onNavigate }) => {
  return (
    <section className="py-20 md:py-28 bg-[#050505] border-b border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="text-xs uppercase tracking-widest text-zinc-400 font-semibold mb-3">
              Sector Expertise
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-display">
              Tailored for Specialized Verticals
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/industries')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-300 hover:text-white group cursor-pointer"
          >
            <span>View All Industries</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-zinc-300 group-hover:text-white" />
          </button>
        </div>

        {/* 4x2 Grid of Industries */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {industries.map((ind) => (
            <div
              key={ind.id}
              onClick={() => onNavigate(`/contact?industry=${encodeURIComponent(ind.name)}`)}
              className="group cursor-pointer bg-[#0D0D0D] border border-[#1A1A1A] p-6 rounded-xl hover:border-zinc-700 hover:bg-[#121212] transition-all flex flex-col justify-between shadow-lg shadow-black/30"
            >
              <div>
                <h3 className="text-base font-bold text-white mb-2 group-hover:text-zinc-200 transition-colors font-display">
                  {ind.name}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
                  {ind.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#1A1A1A] flex items-center justify-between text-xs text-zinc-500 group-hover:text-zinc-300">
                <span>Explore vertical</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
