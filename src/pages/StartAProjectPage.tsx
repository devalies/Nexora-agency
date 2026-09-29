import React, { useState } from 'react';
import { api } from '../services/api';
import { SEO } from '../components/common/SEO';
import { CheckCircle2, ArrowRight, ArrowLeft, Check, Sparkles } from 'lucide-react';

interface StartAProjectPageProps {
  onNavigate: (path: string) => void;
}

export const StartAProjectPage: React.FC<StartAProjectPageProps> = ({ onNavigate }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedLeadId, setSubmittedLeadId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    // Step 1
    servicesRequired: [] as string[],
    projectType: 'Website Design & Development',
    // Step 2
    budgetRange: '$15,000 – $30,000',
    timeline: '1–2 Months',
    // Step 3
    existingWebsite: '',
    competitors: '',
    message: '',
    // Step 4
    name: '',
    email: '',
    company: '',
    website: '',
    referralSource: 'Search / Web',
  });

  const availableServices = [
    { id: 'web_dev', label: 'Website Design & Development', desc: 'Custom marketing website or corporate platform' },
    { id: 'ui_ux', label: 'UI/UX & Product Design', desc: 'Design systems, wireframes, prototypes in Figma' },
    { id: 'ecommerce', label: 'E-commerce Platform', desc: 'Shopify Plus or headless modern storefront' },
    { id: 'branding', label: 'Branding & Visual Identity', desc: 'Logomark, typography guidelines, and brand system' },
    { id: 'saas_app', label: 'SaaS / Web Application', desc: 'Complex web app with database and authenticated portals' },
    { id: 'seo_growth', label: 'SEO & Performance Optimization', desc: 'Core Web Vitals tuning and technical organic ranking' },
  ];

  const budgetOptions = [
    '$5,000 – $15,000',
    '$15,000 – $30,000',
    '$30,000 – $60,000',
    '$60,000+',
  ];

  const timelineOptions = [
    'Immediate (< 1 Month)',
    '1–2 Months',
    '2–3 Months',
    'Flexible / Planning Phase',
  ];

  const toggleService = (label: string) => {
    setForm((prev) => {
      const exists = prev.servicesRequired.includes(label);
      const updated = exists
        ? prev.servicesRequired.filter((s) => s !== label)
        : [...prev.servicesRequired, label];
      return { ...prev, servicesRequired: updated };
    });
  };

  const handleNext = () => {
    if (currentStep === 1 && form.servicesRequired.length === 0) {
      setError('Please select at least one capability you require.');
      return;
    }
    setError(null);
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const handlePrev = () => {
    setError(null);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      setError('Please provide your name and work email.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await api.submitLead({
        name: form.name,
        email: form.email,
        company: form.company,
        website: form.website || form.existingWebsite,
        projectType: form.servicesRequired.join(', ') || form.projectType,
        budgetRange: form.budgetRange,
        timeline: form.timeline,
        message: form.message,
        referralSource: form.referralSource,
        servicesRequired: JSON.stringify(form.servicesRequired),
        existingWebsite: form.existingWebsite,
        competitors: form.competitors,
        status: 'new',
      });

      setSubmittedLeadId(res.leadId);
    } catch (err: any) {
      setError(err.message || 'Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="Start a Project — Scope & Proposal Request"
        description="Configure your digital design and development project requirements with Nexora Studio."
        canonicalPath="/start-a-project"
      />

      <div className="pt-32 pb-24 bg-[#050505] min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs uppercase tracking-widest text-zinc-400 font-semibold mb-3">
              Project Scoping
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white font-display mb-4">
              Let’s Build Something Exceptional
            </h1>
            <p className="text-base text-zinc-400">
              Complete our project builder to share your requirements. We’ll review your technical scope and schedule a strategic consultation within 24 hours.
            </p>
          </div>

          {submittedLeadId ? (
            /* Success confirmation screen */
            <div className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-2xl p-10 sm:p-14 text-center max-w-2xl mx-auto shadow-2xl shadow-black/60">
              <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center mx-auto text-white mb-6">
                <Check className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold text-white font-display mb-3">
                Project Scope Received
              </h2>
              <div className="text-xs font-mono text-zinc-300 bg-[#141414] border border-[#1A1A1A] inline-block px-3 py-1 rounded mb-4">
                Reference ID: {submittedLeadId}
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed mb-8">
                Thank you, <span className="text-white font-medium">{form.name}</span>. A studio director has received your project briefing for <span className="text-white font-medium">{form.company || 'your team'}</span>. We will review your requirements, prepare initial observations, and reach out via <span className="text-white font-medium">{form.email}</span> within 24 hours.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => onNavigate('/work')}
                  className="px-6 py-3 bg-white hover:bg-zinc-200 text-black rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shadow-lg shadow-white/5"
                >
                  Explore Selected Work
                </button>
                <button
                  onClick={() => onNavigate('/')}
                  className="px-6 py-3 bg-[#141414] hover:bg-[#1f1f1f] text-zinc-300 border border-[#1A1A1A] rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Return to Home
                </button>
              </div>
            </div>
          ) : (
            /* Multi-Step Interactive Form */
            <div className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-2xl p-6 sm:p-10 shadow-2xl shadow-black/50">
              {/* Stepper Progress Bar */}
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-[#1A1A1A]">
                {[
                  { step: 1, title: 'Services' },
                  { step: 2, title: 'Scope & Budget' },
                  { step: 3, title: 'Details' },
                  { step: 4, title: 'Contact' },
                ].map((s) => (
                  <div key={s.step} className="flex items-center gap-2">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-colors ${
                        currentStep === s.step
                          ? 'bg-white text-black'
                          : currentStep > s.step
                          ? 'bg-zinc-800 text-zinc-200 border border-zinc-700'
                          : 'bg-[#141414] text-zinc-500 border border-[#1A1A1A]'
                      }`}
                    >
                      {currentStep > s.step ? <Check className="w-3.5 h-3.5" /> : s.step}
                    </div>
                    <span
                      className={`text-xs font-medium hidden sm:inline ${
                        currentStep === s.step ? 'text-white' : 'text-zinc-500'
                      }`}
                    >
                      {s.title}
                    </span>
                  </div>
                ))}
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-950/40 border border-red-900/60 text-red-300 text-xs rounded-lg">
                  {error}
                </div>
              )}

              {/* STEP 1: Services Selection */}
              {currentStep === 1 && (
                <div>
                  <h2 className="text-xl font-bold text-white font-display mb-1">
                    What capabilities does your project require?
                  </h2>
                  <p className="text-xs text-zinc-400 mb-6">
                    Select all that apply to help us assess required skillsets.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {availableServices.map((service) => {
                      const isSelected = form.servicesRequired.includes(service.label);
                      return (
                        <div
                          key={service.id}
                          onClick={() => toggleService(service.label)}
                          className={`p-5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                            isSelected
                              ? 'bg-[#141414] border-zinc-400 text-white shadow-md shadow-white/5'
                              : 'bg-[#121212] border-[#1A1A1A] text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <span className="text-sm font-bold text-white font-display">
                              {service.label}
                            </span>
                            <div
                              className={`w-5 h-5 rounded flex items-center justify-center shrink-0 border ${
                                isSelected
                                  ? 'bg-white border-white text-black'
                                  : 'border-zinc-700 bg-black/40'
                              }`}
                            >
                              {isSelected && <Check className="w-3.5 h-3.5" />}
                            </div>
                          </div>
                          <p className="text-xs text-zinc-400 mt-2">
                            {service.desc}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 2: Budget & Timeline */}
              {currentStep === 2 && (
                <div>
                  <h2 className="text-xl font-bold text-white font-display mb-1">
                    What is your allocated budget and target timeline?
                  </h2>
                  <p className="text-xs text-zinc-400 mb-6">
                    Helps us evaluate architectural depth and scheduling availability.
                  </p>

                  <div className="mb-8">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-3">
                      Estimated Investment Budget
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {budgetOptions.map((b) => (
                        <button
                          type="button"
                          key={b}
                          onClick={() => setForm({ ...form, budgetRange: b })}
                          className={`p-4 rounded-xl text-xs font-semibold text-center border transition-all cursor-pointer ${
                            form.budgetRange === b
                              ? 'bg-white border-white text-black font-bold'
                              : 'bg-[#141414] border-[#1A1A1A] text-zinc-300 hover:border-zinc-700'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-3">
                      Target Deployment Timeline
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {timelineOptions.map((t) => (
                        <button
                          type="button"
                          key={t}
                          onClick={() => setForm({ ...form, timeline: t })}
                          className={`p-4 rounded-xl text-xs font-semibold text-left border transition-all cursor-pointer ${
                            form.timeline === t
                              ? 'bg-white border-white text-black font-bold'
                              : 'bg-[#141414] border-[#1A1A1A] text-zinc-300 hover:border-zinc-700'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Project Specifics */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-white font-display mb-1">
                      Tell us about your project specifics
                    </h2>
                    <p className="text-xs text-zinc-400 mb-6">
                      Context on your current presence and primary commercial goals.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                      Existing Website / Product URL (if applicable)
                    </label>
                    <input
                      type="url"
                      value={form.existingWebsite}
                      onChange={(e) => setForm({ ...form, existingWebsite: e.target.value })}
                      placeholder="https://yourbrand.com"
                      className="w-full bg-[#141414] border border-[#1A1A1A] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-zinc-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                      Primary Objectives & Key Challenges
                    </label>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="What are the main problems with your current site? What specific goals are you looking to achieve (e.g. increase signups, elevate brand perception, modern mobile experience)?"
                      className="w-full bg-[#141414] border border-[#1A1A1A] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-zinc-500 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                      Benchmark Inspirations or Competitors (optional)
                    </label>
                    <input
                      type="text"
                      value={form.competitors}
                      onChange={(e) => setForm({ ...form, competitors: e.target.value })}
                      placeholder="e.g. Stripe, Linear, Apple, Vercel"
                      className="w-full bg-[#141414] border border-[#1A1A1A] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-zinc-500"
                    />
                  </div>
                </div>
              )}

              {/* STEP 4: Contact & Submission */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-white font-display mb-1">
                      Who should we send our strategic review to?
                    </h2>
                    <p className="text-xs text-zinc-400 mb-6">
                      Direct contact details for scheduling our discovery consultation.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Marcus Shaw"
                        className="w-full bg-[#141414] border border-[#1A1A1A] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-zinc-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="marcus@company.com"
                        className="w-full bg-[#141414] border border-[#1A1A1A] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-zinc-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        placeholder="Shaw Capital"
                        className="w-full bg-[#141414] border border-[#1A1A1A] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-zinc-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                        How did you hear about Nexora?
                      </label>
                      <select
                        value={form.referralSource}
                        onChange={(e) => setForm({ ...form, referralSource: e.target.value })}
                        className="w-full bg-[#141414] border border-[#1A1A1A] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-zinc-500"
                      >
                        <option value="Search / Web">Google / Organic Search</option>
                        <option value="Twitter / X">Twitter / X</option>
                        <option value="LinkedIn">LinkedIn</option>
                        <option value="Referral / Partner">Partner Referral</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Controls */}
              <div className="mt-10 pt-6 border-t border-[#1A1A1A] flex items-center justify-between">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#141414] hover:bg-[#1f1f1f] text-zinc-300 text-xs font-semibold uppercase tracking-wider border border-[#1A1A1A] transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Previous</span>
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white hover:bg-zinc-200 text-black text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shadow-lg shadow-white/5"
                  >
                    <span>Next Step</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-white hover:bg-zinc-200 text-black text-xs font-semibold uppercase tracking-wider transition-colors disabled:opacity-50 cursor-pointer shadow-lg shadow-white/5"
                  >
                    <span>{isSubmitting ? 'Transmitting Scope...' : 'Submit Project Brief'}</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
