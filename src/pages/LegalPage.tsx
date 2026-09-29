import React from 'react';
import { SEO } from '../components/common/SEO';
import { useSettings } from '../context/SettingsContext';

interface LegalPageProps {
  type: 'privacy' | 'terms';
  onNavigate: (path: string) => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ type, onNavigate }) => {
  const { settings } = useSettings();
  const isPrivacy = type === 'privacy';

  return (
    <>
      <SEO
        title={isPrivacy ? 'Privacy Policy' : 'Terms & Conditions'}
        description={`Legal terms and privacy commitments for ${settings?.agencyName || 'Nexora Studio'}.`}
        canonicalPath={isPrivacy ? '/privacy-policy' : '/terms'}
      />

      <div className="pt-32 pb-20 bg-[#050505] min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs uppercase tracking-widest text-zinc-400 font-semibold mb-3">
            Legal & Compliance
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-display mb-8">
            {isPrivacy ? 'Privacy Policy' : 'Terms & Conditions of Service'}
          </h1>
          <div className="text-xs text-zinc-500 mb-10 pb-4 border-b border-[#1A1A1A]">
            Last Updated: January 1, 2026 · Nexora Studio LLC
          </div>

          <div className="prose prose-invert max-w-none text-zinc-300 space-y-6 text-sm sm:text-base leading-relaxed">
            {isPrivacy ? (
              <>
                <p>
                  At Nexora Studio (&quot;Nexora&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), we take your personal privacy and proprietary business information with the utmost seriousness. This Privacy Policy details how we collect, handle, and safeguard data when you visit our website or submit project inquiries.
                </p>

                <h2 className="text-xl font-bold text-white mt-8 mb-4">1. Information We Collect</h2>
                <p>
                  When you submit a project inquiry or contact form on our website, we may collect your name, work email address, company name, website URL, estimated budget, project timelines, and any descriptive details you voluntarily provide.
                </p>

                <h2 className="text-xl font-bold text-white mt-8 mb-4">2. How We Use Information</h2>
                <p>
                  We use collected information strictly to:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-zinc-400">
                  <li>Review your project requirements and prepare scoping estimates.</li>
                  <li>Schedule strategic discovery calls and respond to your direct messages.</li>
                  <li>Perform essential website performance monitoring and security auditing.</li>
                </ul>
                <p>
                  We never sell, rent, or trade your contact or project information to third-party data brokers or marketing networks.
                </p>

                <h2 className="text-xl font-bold text-white mt-8 mb-4">3. Data Security & Storage</h2>
                <p>
                  All project inquiries and client communications are stored in secure, encrypted cloud environments. Access is restricted exclusively to authorized studio principals.
                </p>

                <h2 className="text-xl font-bold text-white mt-8 mb-4">4. Contact & Inquiries</h2>
                <p>
                  For questions regarding this policy or to request deletion of your submitted information, contact us directly at{' '}
                  <a href={`mailto:${settings?.email || 'mohammadaliomega@gmail.com'}`} className="text-blue-400 underline">
                    {settings?.email || 'mohammadaliomega@gmail.com'}
                  </a>.
                </p>
              </>
            ) : (
              <>
                <p>
                  Welcome to Nexora Studio. By accessing our website or contracting our design and engineering services, you agree to comply with and be bound by the following terms and conditions.
                </p>

                <h2 className="text-xl font-bold text-white mt-8 mb-4">1. Scope of Engagements</h2>
                <p>
                  All client design, development, and consulting projects are executed under mutually executed Statements of Work (SOW) or Master Services Agreements (MSA) detailing specific deliverables, milestone schedules, and payment schedules.
                </p>

                <h2 className="text-xl font-bold text-white mt-8 mb-4">2. Intellectual Property Rights</h2>
                <p>
                  Upon final payment of all agreed invoice fees for a given engagement, full worldwide ownership of custom design assets, source code repositories, and branding deliverables transfers entirely to the client.
                </p>

                <h2 className="text-xl font-bold text-white mt-8 mb-4">3. Concept Work & Portfolio Rights</h2>
                <p>
                  Certain projects featured on our website represent studio concept architectures, redesign explorations, or research prototypes developed by our team to demonstrate engineering capabilities. Nexora reserves the right to showcase approved client case studies in its studio portfolio unless explicitly prohibited by a formal Non-Disclosure Agreement (NDA).
                </p>

                <h2 className="text-xl font-bold text-white mt-8 mb-4">4. Limitation of Liability</h2>
                <p>
                  In no event shall Nexora Studio be liable for indirect, incidental, or consequential damages resulting from website downtime or third-party cloud hosting disruptions beyond our direct control.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
