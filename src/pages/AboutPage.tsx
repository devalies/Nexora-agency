import React, { useState, useEffect } from 'react';
import { TeamMember } from '../types';
import { api } from '../services/api';
import { SEO } from '../components/common/SEO';
import { CTASection } from '../components/home/CTASection';
import { MapPin, Mail, Linkedin } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    api
      .getTeam('active')
      .then((data) => {
        setTeam(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load team:', err);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <SEO
        title="About Nexora Studio — Digital Design & Engineering"
        description="Learn about Nexora, an independent digital studio founded on craftsmanship, technical precision, and direct client collaboration."
        canonicalPath="/about"
      />

      <div className="pt-32 pb-20 bg-[#050505] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="max-w-3xl mb-16">
            <div className="text-xs uppercase tracking-widest text-zinc-400 font-semibold mb-3">
              About the Studio
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white font-display mb-6">
              A Tight-Knit Studio Built for High-Impact Digital Work
            </h1>
            <p className="text-lg text-zinc-400 leading-relaxed">
              Nexora was established with a singular conviction: ambitious businesses shouldn't have to navigate bureaucratic agency layers, junior staff handoffs, or bloated timelines to get world-class digital products built.
            </p>
          </div>

          {/* Studio Philosophy Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-y border-[#1A1A1A] mb-20">
            <div>
              <div className="text-xs font-mono text-zinc-400 font-semibold mb-2">01 / PRINCIPLE</div>
              <h2 className="text-xl font-bold text-white mb-3 font-display">Craft Over Scale</h2>
              <p className="text-sm text-zinc-400 leading-relaxed">
                We deliberately limit the number of active engagements we take on at any given time. This guarantees that your project receives deep, uninterrupted strategic and engineering attention.
              </p>
            </div>

            <div>
              <div className="text-xs font-mono text-zinc-400 font-semibold mb-2">02 / PRINCIPLE</div>
              <h2 className="text-xl font-bold text-white mb-3 font-display">Engineers Who Design</h2>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Our designers understand browser capabilities and responsive CSS; our engineers obsess over typography, micro-interactions, and visual harmony. The result is seamless execution without friction.
              </p>
            </div>

            <div>
              <div className="text-xs font-mono text-zinc-400 font-semibold mb-2">03 / PRINCIPLE</div>
              <h2 className="text-xl font-bold text-white mb-3 font-display">Radical Transparency</h2>
              <p className="text-sm text-zinc-400 leading-relaxed">
                No buzzwords, no opaque markups, and no fabricated metrics. We share work in progress early and often, treating our clients as direct co-creators in the studio.
              </p>
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-20">
            <div className="max-w-2xl mb-12">
              <div className="text-xs uppercase tracking-widest text-zinc-400 font-semibold mb-2">
                Core Leadership
              </div>
              <h2 className="text-3xl font-bold text-white font-display mb-3">
                The People Behind Your Product
              </h2>
              <p className="text-sm text-zinc-400">
                Experienced digital practitioners leading design, engineering, and digital growth directly on every engagement.
              </p>
            </div>

            {isLoading ? (
              <div className="py-12 text-zinc-500">Loading team...</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {team.map((member) => (
                  <div
                    key={member.id}
                    className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl overflow-hidden group flex flex-col justify-between shadow-xl shadow-black/40"
                  >
                    <div>
                      <div className="aspect-[4/5] overflow-hidden bg-[#141414] relative">
                        <img
                          src={member.photo}
                          alt={member.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="text-lg font-bold text-white font-display mb-0.5">
                          {member.name}
                        </h3>
                        <div className="text-xs text-zinc-300 font-medium mb-3">
                          {member.position}
                        </div>
                        <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
                          {member.bio}
                        </p>
                      </div>
                    </div>

                    <div className="p-5 pt-0 flex items-center gap-3">
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded bg-[#141414] text-zinc-400 hover:text-white transition-colors border border-[#1A1A1A]"
                          aria-label={`${member.name} LinkedIn`}
                        >
                          <Linkedin className="w-4 h-4" />
                        </a>
                      )}
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="p-2 rounded bg-[#141414] text-zinc-400 hover:text-white transition-colors border border-[#1A1A1A]"
                          aria-label={`Email ${member.name}`}
                        >
                          <Mail className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Location & Studio Physical Details */}
          <div className="bg-[#111111] border border-[#27272A] rounded-xl p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-blue-400 font-semibold mb-2">
                <MapPin className="w-4 h-4" />
                <span>San Francisco Studio</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-1">
                548 Market St, Suite 7210, San Francisco, CA 94104
              </h3>
              <p className="text-xs text-[#A1A1AA]">
                Available for in-person collaborative sprint sessions and worldwide asynchronous remote delivery.
              </p>
            </div>

            <button
              onClick={() => onNavigate('/start-a-project')}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-colors"
            >
              Partner With Us
            </button>
          </div>
        </div>

        <div className="mt-20">
          <CTASection onNavigate={onNavigate} />
        </div>
      </div>
    </>
  );
};
