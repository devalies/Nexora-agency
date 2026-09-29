import React, { useEffect, useState } from 'react';
import { Project } from '../types';
import { api } from '../services/api';
import { SEO } from '../components/common/SEO';
import { CTASection } from '../components/home/CTASection';
import { ArrowLeft, ArrowUpRight, CheckCircle2, Globe, Layers } from 'lucide-react';

interface CaseStudyPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const CaseStudyPage: React.FC<CaseStudyPageProps> = ({ slug, onNavigate }) => {
  const [project, setProject] = useState<Project | null>(null);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    Promise.all([api.getProjectBySlug(slug), api.getProjects('published')])
      .then(([proj, list]) => {
        setProject(proj);
        setAllProjects(list);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load project:', err);
        setError('Case study not found or unavailable.');
        setIsLoading(false);
      });
  }, [slug]);

  if (isLoading) {
    return (
      <div className="pt-40 pb-20 bg-[#050505] min-h-screen text-center text-zinc-500">
        Loading case study...
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="pt-40 pb-20 bg-[#050505] min-h-screen text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Case Study Not Found</h1>
        <p className="text-zinc-400 mb-6">The project case study you requested could not be located.</p>
        <button
          onClick={() => onNavigate('/work')}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black hover:bg-zinc-200 rounded-lg text-xs font-semibold uppercase tracking-wider cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Selected Work</span>
        </button>
      </div>
    );
  }

  const technologies: string[] = project.technologies ? JSON.parse(project.technologies) : [];
  const results: string[] = project.results ? JSON.parse(project.results) : [];
  const gallery: string[] = project.galleryImages ? JSON.parse(project.galleryImages) : [];

  // Find next project for footer navigation
  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const nextProject = currentIndex >= 0 && currentIndex < allProjects.length - 1
    ? allProjects[currentIndex + 1]
    : allProjects[0];

  return (
    <>
      <SEO
        title={project.seoTitle || `${project.title} — Case Study`}
        description={project.seoDescription || project.shortDesc}
        ogImage={project.coverImage}
        canonicalPath={`/work/${project.slug}`}
      />

      <article className="pt-32 pb-20 bg-[#050505] min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Link */}
          <button
            onClick={() => onNavigate('/work')}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-white mb-8 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Selected Work</span>
          </button>

          {/* Header Metadata */}
          <div className="mb-10">
            <div className="flex items-center gap-2.5 text-xs uppercase tracking-widest text-zinc-400 font-semibold mb-3">
              <span>{project.industry}</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span>{project.projectType}</span>
              {project.isConcept && (
                <>
                  <span aria-hidden="true" className="text-zinc-600">·</span>
                  <span className="text-zinc-300">Concept / Studio Architecture</span>
                </>
              )}
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white font-display mb-6">
              {project.title}
            </h1>

            <p className="text-xl text-zinc-400 leading-relaxed max-w-3xl">
              {project.shortDesc}
            </p>
          </div>

          {/* Project Spec Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-6 border-y border-[#1A1A1A] mb-12 text-sm">
            <div>
              <div className="text-xs uppercase tracking-wider text-zinc-500 mb-1">Client</div>
              <div className="font-semibold text-white">{project.clientName}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-zinc-500 mb-1">Discipline</div>
              <div className="font-semibold text-white">{project.projectType}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-zinc-500 mb-1">Sector</div>
              <div className="font-semibold text-white">{project.industry}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-zinc-500 mb-1">URL / Status</div>
              {project.projectUrl ? (
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-zinc-200 hover:text-white inline-flex items-center gap-1"
                >
                  <span>Live Preview</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              ) : (
                <div className="font-semibold text-zinc-400">Proprietary / Concept</div>
              )}
            </div>
          </div>

          {/* Hero Showcase Image */}
          <div className="rounded-xl overflow-hidden border border-[#1A1A1A] bg-[#0D0D0D] mb-16 shadow-2xl shadow-black/60">
            <img
              src={project.coverImage}
              alt={project.title}
              className="w-full h-auto object-cover max-h-[640px]"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Editorial Content Breakdown */}
          <div className="space-y-16">
            {/* The Challenge */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-xs uppercase tracking-widest text-zinc-400 font-semibold">
                01 / The Challenge
              </div>
              <div className="md:col-span-2">
                <p className="text-lg text-zinc-300 leading-relaxed font-normal">
                  {project.challenge || 'Every growing organization encounters technical bottlenecks when transitioning from early market fit to institutional velocity.'}
                </p>
              </div>
            </div>

            {/* The Strategy & Architecture */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-[#1A1A1A]">
              <div className="text-xs uppercase tracking-widest text-zinc-400 font-semibold">
                02 / Strategy & Build
              </div>
              <div className="md:col-span-2 space-y-4">
                <p className="text-lg text-zinc-300 leading-relaxed font-normal">
                  {project.solution || 'We architected a clean design system coupled with modern headless infrastructure to ensure instantaneous page loads and conversion fidelity.'}
                </p>
                <div className="text-sm text-zinc-400 leading-relaxed">
                  {project.fullCaseStudy}
                </div>
              </div>
            </div>

            {/* Results & Key Metrics */}
            {results.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-[#1A1A1A]">
                <div className="text-xs uppercase tracking-widest text-zinc-400 font-semibold">
                  03 / Key Outcomes
                </div>
                <div className="md:col-span-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {results.map((res, i) => (
                      <div
                        key={i}
                        className="p-5 rounded-lg bg-[#0D0D0D] border border-[#1A1A1A] flex items-start gap-3 shadow-lg shadow-black/30"
                      >
                        <CheckCircle2 className="w-5 h-5 text-zinc-300 shrink-0 mt-0.5" />
                        <span className="text-sm font-medium text-white">{res}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Technology Stack */}
            {technologies.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-[#1A1A1A]">
                <div className="text-xs uppercase tracking-widest text-zinc-400 font-semibold">
                  04 / Tech Stack
                </div>
                <div className="md:col-span-2 flex flex-wrap items-center gap-3">
                  {technologies.map((t) => (
                    <span
                      key={t}
                      className="px-3.5 py-1.5 rounded-md bg-[#141414] border border-[#1A1A1A] text-xs font-mono text-zinc-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Project Gallery */}
            {gallery.length > 0 && (
              <div className="pt-8 border-t border-[#1A1A1A]">
                <div className="text-xs uppercase tracking-widest text-zinc-400 font-semibold mb-6">
                  05 / Interface Exploration
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {gallery.map((imgUrl, idx) => (
                    <div
                      key={idx}
                      className="rounded-lg overflow-hidden border border-[#1A1A1A] bg-[#0D0D0D] shadow-lg shadow-black/30"
                    >
                      <img
                        src={imgUrl}
                        alt={`${project.title} Interface ${idx + 1}`}
                        className="w-full h-auto object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Next Case Study Preview */}
          {nextProject && nextProject.id !== project.id && (
            <div className="mt-20 pt-12 border-t border-[#1A1A1A]">
              <div className="text-xs uppercase tracking-wider text-zinc-500 mb-2">Next Case Study</div>
              <button
                onClick={() => onNavigate(`/work/${nextProject.slug}`)}
                className="group flex items-center justify-between w-full text-left p-6 rounded-xl bg-[#0D0D0D] border border-[#1A1A1A] hover:border-zinc-700 transition-all cursor-pointer shadow-xl shadow-black/30"
              >
                <div>
                  <div className="text-xs text-zinc-400 font-medium mb-1">{nextProject.industry}</div>
                  <div className="text-2xl font-bold text-white group-hover:text-zinc-200 transition-colors font-display">
                    {nextProject.title}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-[#141414] border border-[#1A1A1A] text-white group-hover:bg-white group-hover:text-black transition-colors">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </button>
            </div>
          )}
        </div>

        <div className="mt-20">
          <CTASection onNavigate={onNavigate} />
        </div>
      </article>
    </>
  );
};
