import React, { useEffect, useState } from 'react';
import { Industry } from '../types';
import { api } from '../services/api';
import { SEO } from '../components/common/SEO';
import { CTASection } from '../components/home/CTASection';
import { ArrowUpRight } from 'lucide-react';

interface IndustriesPageProps {
  onNavigate: (path: string) => void;
}

export const IndustriesPage: React.FC<IndustriesPageProps> = ({ onNavigate }) => {
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    api
      .getIndustries()
      .then((data) => {
        setIndustries(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load industries:', err);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <SEO
        title="Specialized Industries & Sectors"
        description="Explore how Nexora delivers digital design and engineering solutions tailored for SaaS, e-commerce, real estate, and finance."
        canonicalPath="/industries"
      />

      <div className="pt-32 pb-20 bg-transparent min-h-screen relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="max-w-3xl mb-16">
            <div className="text-xs uppercase tracking-widest text-blue-500 font-semibold mb-3">
              Sector Expertise
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white font-display mb-6">
              Tailored Architecture for High-Demand Industries
            </h1>
            <p className="text-lg text-[#A1A1AA] leading-relaxed">
              Every vertical presents distinct compliance, conversion patterns, and audience expectations. We apply deep domain understanding to craft bespoke digital experiences.
            </p>
          </div>

          {isLoading ? (
            <div className="py-24 text-center text-zinc-500">Loading industry sectors...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {industries.map((ind) => (
                <div
                  key={ind.id}
                  onClick={() => onNavigate(`/industries/${ind.slug}`)}
                  className="bg-[#111111] border border-[#27272A] p-8 rounded-xl hover:border-zinc-700 hover:bg-[#141414] transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <h2 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors font-display">
                      {ind.name}
                    </h2>
                    <p className="text-sm text-[#A1A1AA] leading-relaxed mb-6">
                      {ind.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#27272A]/60 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-blue-400">
                    <span>View Sector Framework</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-20">
          <CTASection onNavigate={onNavigate} />
        </div>
      </div>
    </>
  );
};
