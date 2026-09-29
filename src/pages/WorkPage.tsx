import React, { useState, useEffect } from 'react';
import { Project } from '../types';
import { api } from '../services/api';
import { safeJsonParse } from '../utils/json';
import { SEO } from '../components/common/SEO';
import { CTASection } from '../components/home/CTASection';
import { WorkProcessSection } from '../components/work/WorkProcessSection';
import { ArrowUpRight, Workflow, Layers } from 'lucide-react';

interface WorkPageProps {
  onNavigate: (path: string) => void;
}

export const WorkPage: React.FC<WorkPageProps> = ({ onNavigate }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeTab, setActiveTab] = useState<'process' | 'concepts'>('process');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    api
      .getProjects('published')
      .then((data) => {
        setProjects(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load projects:', err);
        setIsLoading(false);
      });
  }, []);

  const categories = ['All', 'SaaS & Web App', 'E-commerce & DTC', 'Branding & Digital Design'];

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter(
          (p) =>
            p.projectType.toLowerCase().includes(activeCategory.toLowerCase()) ||
            p.industry.toLowerCase().includes(activeCategory.toLowerCase())
        );

  return (
    <>
      <SEO
        title="Our Work Process & Methodology | Nexora Studio"
        description="Discover how we work with clients through our structured 4-step process: initial connection, deep requirements analysis, research & presentation demo, and final briefing kickoff."
        canonicalPath="/work"
      />

      <div className="pt-32 pb-20 bg-[#0A0A0A] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="max-w-3xl mb-10">
            <div className="text-xs uppercase tracking-widest text-blue-500 font-semibold mb-3">
              Client Engagement & Demonstration
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white font-display mb-6">
              How We Work With You
            </h1>
            <p className="text-lg text-[#A1A1AA] leading-relaxed">
              We operate with absolute transparency before you commit to production. Explore our
              exact 4-step collaboration methodology and our architectural prototype explorations.
            </p>
          </div>

          {/* Section Mode Toggle (Process vs Concept Prototypes) */}
          <div className="flex items-center gap-3 pb-8 mb-12 border-b border-[#27272A]/70">
            <button
              onClick={() => setActiveTab('process')}
              className={`inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors ${
                activeTab === 'process'
                  ? 'bg-blue-600 text-white'
                  : 'bg-[#141414] text-zinc-400 hover:text-white hover:bg-[#1A1A1A] border border-[#27272A]'
              }`}
            >
              <Workflow className="w-4 h-4" />
              <span>4-Step Working Process</span>
            </button>

            <button
              onClick={() => setActiveTab('concepts')}
              className={`inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors ${
                activeTab === 'concepts'
                  ? 'bg-blue-600 text-white'
                  : 'bg-[#141414] text-zinc-400 hover:text-white hover:bg-[#1A1A1A] border border-[#27272A]'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Concept Prototypes ({projects.length})</span>
            </button>
          </div>

          {/* Tab 1: Detailed 4-Step Work Process Demonstration */}
          {activeTab === 'process' && (
            <div className="space-y-16">
              <WorkProcessSection onNavigate={onNavigate} />

              {/* Brief Concept Preview Strip below Process */}
              <div className="pt-12 border-t border-[#27272A]">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-zinc-500 font-semibold mb-2">
                      Proof of Technical Execution
                    </div>
                    <h3 className="text-2xl font-bold text-white font-display">
                      Studio Concept Studies & Prototypes
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1 max-w-xl">
                      Explore our self-initiated architectural case studies and functional prototypes
                      demonstrating our engineering standards across fintech, e-commerce, and SaaS.
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveTab('concepts')}
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-400 hover:text-blue-300 transition-colors shrink-0"
                  >
                    <span>View All Concept Studies</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {projects.slice(0, 2).map((project) => (
                    <div
                      key={project.id}
                      onClick={() => onNavigate(`/work/${project.slug}`)}
                      className="group cursor-pointer bg-[#111111] border border-[#27272A] rounded-xl overflow-hidden hover:border-zinc-700 transition-all flex flex-col justify-between"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden bg-[#171717]">
                        <img
                          src={project.coverImage}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2.5 py-0.5 rounded text-[10px] font-mono tracking-wider text-zinc-300 border border-zinc-700/60 uppercase">
                          Prototype
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="text-xs text-blue-400 font-mono mb-1">
                          {project.industry}
                        </div>
                        <h4 className="text-lg font-bold text-white font-display group-hover:text-blue-400 transition-colors">
                          {project.title}
                        </h4>
                        <p className="text-xs text-zinc-400 mt-2 line-clamp-2">
                          {project.shortDesc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Concept Prototypes & Case Studies Grid */}
          {activeTab === 'concepts' && (
            <div>
              {/* Category Filter Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                      activeCategory === cat
                        ? 'bg-blue-600 text-white'
                        : 'bg-[#141414] text-zinc-400 hover:text-white hover:bg-[#1A1A1A] border border-[#27272A]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Projects Grid */}
              {isLoading ? (
                <div className="py-24 text-center text-zinc-500">Loading portfolio cases...</div>
              ) : filteredProjects.length === 0 ? (
                <div className="py-24 text-center text-zinc-500">
                  No projects found in this category.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                  {filteredProjects.map((project) => {
                    const tags: string[] = safeJsonParse(project.technologies, []);

                    return (
                      <div
                        key={project.id}
                        onClick={() => onNavigate(`/work/${project.slug}`)}
                        className="group cursor-pointer flex flex-col bg-[#111111] border border-[#27272A] rounded-xl overflow-hidden hover:border-zinc-700 transition-all"
                      >
                        {/* Visual Cover Frame */}
                        <div className="relative aspect-[16/10] overflow-hidden bg-[#171717]">
                          <img
                            src={project.coverImage}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            referrerPolicy="no-referrer"
                          />

                          <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded text-[11px] font-mono tracking-wider text-zinc-300 border border-zinc-700/60 uppercase">
                            Concept Study
                          </div>

                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                            <div className="flex items-center gap-2 text-sm font-semibold text-white">
                              <span>View Architectural Breakdown</span>
                              <ArrowUpRight className="w-4 h-4 text-blue-400" />
                            </div>
                          </div>
                        </div>

                        {/* Metadata & Description */}
                        <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between">
                          <div>
                            <div className="flex items-center gap-2 text-xs text-zinc-400 mb-2 font-medium">
                              <span>{project.industry}</span>
                              <span aria-hidden="true" className="text-zinc-600">
                                ·
                              </span>
                              <span>{project.projectType}</span>
                            </div>

                            <h2 className="text-2xl font-bold text-white mb-2.5 group-hover:text-blue-400 transition-colors font-display">
                              {project.title}
                            </h2>

                            <p className="text-sm text-[#A1A1AA] leading-relaxed mb-6">
                              {project.shortDesc}
                            </p>
                          </div>

                          {/* Tech stack */}
                          {tags.length > 0 && (
                            <div className="pt-4 border-t border-[#27272A]/70 flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-400">
                              {tags.map((tech, idx) => (
                                <span key={tech}>
                                  {tech}
                                  {idx < tags.length - 1 && (
                                    <span className="text-zinc-600 ml-2">/</span>
                                  )}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
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

