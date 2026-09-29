import React from 'react';
import { Project } from '../../types';
import { ArrowUpRight } from 'lucide-react';

interface FeaturedWorkSectionProps {
  projects: Project[];
  onNavigate: (path: string) => void;
}

export const FeaturedWorkSection: React.FC<FeaturedWorkSectionProps> = ({ projects, onNavigate }) => {
  const featured = projects.filter((p) => p.isFeatured && p.status === 'published');

  return (
    <section className="py-20 md:py-28 bg-[#0A0A0A] border-b border-[#27272A]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="text-xs uppercase tracking-widest text-blue-500 font-semibold mb-3">
              Selected Work
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-display">
              Recent Projects & Case Studies
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/work')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-300 hover:text-white group"
          >
            <span>View All Projects</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-blue-500" />
          </button>
        </div>

        {/* Projects Grid: 2-Column High Impact Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {featured.map((project) => {
            const tags: string[] = project.technologies ? JSON.parse(project.technologies) : [];

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
                  
                  {/* Subtle top indicator for Concept / Studio Case Study */}
                  {project.isConcept && (
                    <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded text-[11px] font-mono tracking-wider text-zinc-300 border border-zinc-700/60 uppercase">
                      Concept Work
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <div className="flex items-center gap-2 text-sm font-semibold text-white">
                      <span>Explore Case Study</span>
                      <ArrowUpRight className="w-4 h-4 text-blue-400" />
                    </div>
                  </div>
                </div>

                {/* Card Content & Metadata */}
                <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between">
                  <div>
                    {/* Unboxed Metadata Line (anti-pill compliant) */}
                    <div className="flex items-center gap-2 text-xs text-zinc-400 mb-2 font-medium">
                      <span>{project.industry}</span>
                      <span aria-hidden="true" className="text-zinc-600">·</span>
                      <span>{project.projectType}</span>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-2.5 group-hover:text-blue-400 transition-colors font-display">
                      {project.title}
                    </h3>

                    <p className="text-sm text-[#A1A1AA] leading-relaxed mb-6">
                      {project.shortDesc}
                    </p>
                  </div>

                  {/* Clean Tags with dot separators */}
                  {tags.length > 0 && (
                    <div className="pt-4 border-t border-[#27272A]/70 flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-400">
                      {tags.slice(0, 4).map((tech, idx) => (
                        <span key={tech}>
                          {tech}
                          {idx < Math.min(tags.length, 4) - 1 && (
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
      </div>
    </section>
  );
};
