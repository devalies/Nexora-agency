import React from 'react';
import { Industry } from '../../types';
import { ArrowUpRight } from 'lucide-react';

interface IndustriesSectionProps {
  industries: Industry[];
  onNavigate: (path: string) => void;
}

export const IndustriesSection: React.FC<IndustriesSectionProps> = ({ industries, onNavigate }) => {
  return (
    <section className="py-20 md:py-28 bg-[#08090E] border-b border-[#1E2330]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="text-xs uppercase tracking-widest text-blue-400 font-semibold mb-3">
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
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-blue-400" />
          </button>
        </div>

        {/* 4x2 Grid of Industries */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {(industries || []).map((ind) => (
            <div
              key={ind.id}
              onClick={() => onNavigate(`/contact?industry=${encodeURIComponent(ind.name)}`)}
              className="group cursor-pointer bg-[#0D1017] border border-[#1E2330] p-6 rounded-xl hover:border-blue-500 hover:bg-[#0E1526] hover:shadow-xl hover:shadow-blue-950/40 hover:-translate-y-0.5 transition-all duration-300 ease-out flex flex-col justify-between shadow-lg shadow-black/20"
            >
              <div>
                <h3 className="text-base font-bold text-white mb-2 group-hover:text-blue-400 transition-colors font-display">
                  {ind.name}
                </h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed line-clamp-3">
                  {ind.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#1E2330] flex items-center justify-between text-xs text-[#64748B] group-hover:text-blue-400 transition-colors">
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
