import React from 'react';
import { Testimonial } from '../../types';
import { Quote } from 'lucide-react';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  const visible = testimonials.filter((t) => t.status === 'published');
  if (visible.length === 0) return null;

  return (
    <section className="py-20 md:py-28 bg-[#0A0A0A] border-b border-[#27272A]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <div className="text-xs uppercase tracking-widest text-blue-500 font-semibold mb-3">
            Client Feedback
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-display">
            Direct Words From Partners
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {visible.map((item) => (
            <div
              key={item.id}
              className="bg-[#111111] border border-[#27272A] p-8 rounded-xl flex flex-col justify-between"
            >
              <div>
                <Quote className="w-8 h-8 text-blue-500/40 mb-5" />
                <p className="text-base sm:text-lg text-zinc-200 leading-relaxed font-normal mb-8">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-6 border-t border-[#27272A]/70 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-white">
                    {item.clientName}
                  </div>
                  <div className="text-xs text-zinc-400 mt-0.5">
                    {item.position} · <span className="text-zinc-300">{item.company}</span>
                  </div>
                </div>

                <div className="text-xs font-mono text-blue-400 bg-blue-950/40 border border-blue-900/40 px-2.5 py-1 rounded">
                  {item.projectTitle}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
