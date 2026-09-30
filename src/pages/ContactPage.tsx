import React, { useState } from 'react';
import { api } from '../services/api';
import { useSettings } from '../context/SettingsContext';
import { SEO } from '../components/common/SEO';
import { Mail, Phone, MapPin, MessageSquare, CheckCircle2, ArrowRight } from 'lucide-react';

interface ContactPageProps {
  onNavigate: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const { settings } = useSettings();

  // Inspect URL parameters for pre-selected service/industry/topic
  const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const initialService = searchParams?.get('service') || '';
  const initialIndustry = searchParams?.get('industry') || '';

  const defaultTopic = initialService || (initialIndustry ? `${initialIndustry} Vertical Inquiry` : 'General Inquiry');
  const defaultMessage = initialService
    ? `Hi Nexora team, I would like to learn more about your "${initialService}" service and discuss how we can work together.`
    : initialIndustry
    ? `Hi Nexora team, I am reaching out regarding our needs in the ${initialIndustry} sector. We would like to discuss a digital project with you.`
    : '';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: defaultTopic,
    message: defaultMessage,
  });

  // Keep form synchronized if service or industry parameter changes
  React.useEffect(() => {
    if (initialService) {
      setFormData(prev => ({
        ...prev,
        projectType: initialService,
        message: prev.message || `Hi Nexora team, I would like to learn more about your "${initialService}" service and discuss how we can work together.`,
      }));
    } else if (initialIndustry) {
      setFormData(prev => ({
        ...prev,
        projectType: `${initialIndustry} Vertical Inquiry`,
        message: prev.message || `Hi Nexora team, I am reaching out regarding our needs in the ${initialIndustry} sector. We would like to discuss a digital project with you.`,
      }));
    }
  }, [initialService, initialIndustry]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await api.submitLead(formData);
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Failed to submit inquiry. Please try again or email us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="Contact Nexora Studio — Direct Inquiries"
        description="Get in touch with Nexora Studio in San Francisco. Email, phone, or schedule a strategic project discussion."
        canonicalPath="/contact"
      />

      <div className="pt-32 pb-20 bg-transparent min-h-screen relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Studio Contact Information */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <div className="text-xs uppercase tracking-widest text-blue-500 font-semibold mb-3">
                  Direct Inquiries
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white font-display mb-4">
                  Let’s Talk About Your Project
                </h1>
                <p className="text-base text-[#A1A1AA] leading-relaxed">
                  Whether you have an immediate RFP, a product architecture question, or want to explore our studio availability, we respond within 24 hours.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">
                <a
                  href={`mailto:${settings?.email || 'mohammadaliomega@gmail.com'}`}
                  className="p-5 rounded-xl bg-[#111111] border border-[#27272A] flex items-center gap-4 hover:border-zinc-700 transition-colors group"
                >
                  <div className="p-3 rounded-lg bg-[#171717] text-blue-500 group-hover:text-blue-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Direct Email</div>
                    <div className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">
                      {settings?.email || 'mohammadaliomega@gmail.com'}
                    </div>
                  </div>
                </a>

                {settings?.phone && (
                  <a
                    href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
                    className="p-5 rounded-xl bg-[#111111] border border-[#27272A] flex items-center gap-4 hover:border-zinc-700 transition-colors group"
                  >
                    <div className="p-3 rounded-lg bg-[#171717] text-blue-500 group-hover:text-blue-400">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Phone</div>
                      <div className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">
                        {settings.phone}
                      </div>
                    </div>
                  </a>
                )}

                {settings?.whatsapp && (
                  <a
                    href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-5 rounded-xl bg-[#111111] border border-[#27272A] flex items-center gap-4 hover:border-zinc-700 transition-colors group"
                  >
                    <div className="p-3 rounded-lg bg-[#171717] text-emerald-400 group-hover:text-emerald-300">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">WhatsApp Chat</div>
                      <div className="text-sm font-medium text-white group-hover:text-emerald-400 transition-colors">
                        Quick Chat on WhatsApp
                      </div>
                    </div>
                  </a>
                )}

                <div className="p-5 rounded-xl bg-[#111111] border border-[#27272A] flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-[#171717] text-blue-500">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Studio Headquarters</div>
                    <div className="text-sm font-medium text-white">
                      {settings?.address || '548 Market St, Suite 7210, San Francisco, CA 94104'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Start A Project Callout */}
              <div className="p-6 rounded-xl bg-blue-950/20 border border-blue-900/40">
                <h2 className="text-sm font-bold text-white mb-1">
                  Have a specific project with budget and timeline?
                </h2>
                <p className="text-xs text-zinc-400 mb-4">
                  Use our interactive project builder to configure services and request a detailed estimate.
                </p>
                <button
                  onClick={() => onNavigate('/start-a-project')}
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-400 hover:text-blue-300"
                >
                  <span>Launch Project Scoper</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right: Direct Inquiry Form */}
            <div className="lg:col-span-7 bg-[#111111] border border-[#27272A] p-8 sm:p-10 rounded-2xl">
              {submitted ? (
                <div className="py-16 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-blue-950/60 border border-blue-500/50 flex items-center justify-center mx-auto text-blue-400">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h2 className="text-2xl font-bold text-white font-display">Inquiry Received</h2>
                  <p className="text-sm text-[#A1A1AA] max-w-md mx-auto">
                    Thank you for reaching out. We have logged your message into our pipeline and a studio director will review your details and respond within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        company: '',
                        projectType: 'General Inquiry',
                        message: '',
                      });
                    }}
                    className="mt-4 px-5 py-2.5 bg-[#171717] hover:bg-[#202020] text-zinc-300 border border-[#27272A] rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white font-display mb-1">
                      Send a Message
                    </h2>
                    <p className="text-xs text-zinc-400">
                      Fill out the form below and we will get back to you promptly.
                    </p>
                  </div>

                  {error && (
                    <div className="p-4 bg-red-950/50 border border-red-800 text-red-300 text-xs rounded-lg">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Elena Vance"
                        className="w-full bg-[#171717] border border-[#27272A] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="elena@company.com"
                        className="w-full bg-[#171717] border border-[#27272A] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                        Company / Organization
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Acme Innovations"
                        className="w-full bg-[#171717] border border-[#27272A] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                        Inquiry Topic
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full bg-[#171717] border border-[#27272A] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                      >
                        {initialService && (
                          <option value={initialService}>{initialService}</option>
                        )}
                        {initialIndustry && (
                          <option value={`${initialIndustry} Vertical Inquiry`}>
                            {initialIndustry} Vertical
                          </option>
                        )}
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Website Design & Development">Website Design & Development</option>
                        <option value="UI/UX & Product Design">UI/UX & Product Design</option>
                        <option value="E-commerce & Store Development">E-commerce & Store Development</option>
                        <option value="Branding & Visual Design">Branding & Visual Design</option>
                        <option value="SaaS & Web Applications">SaaS & Web Applications</option>
                        <option value="SEO & Performance Optimization">SEO & Performance Optimization</option>
                        <option value="Partnership / Studio Collaboration">Partnership / Collaboration</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Briefly describe what you're trying to build or achieve..."
                      className="w-full bg-[#171717] border border-[#27272A] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? 'Transmitting Message...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
