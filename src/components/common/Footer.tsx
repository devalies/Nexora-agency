import React from 'react';
import { NexoraLogo } from './NexoraLogo';
import { useSettings } from '../../context/SettingsContext';
import { ArrowUpRight, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { settings, navigation } = useSettings();

  const handleLink = (e: React.MouseEvent, url: string) => {
    e.preventDefault();
    onNavigate(url);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = settings?.socialLinks
    ? JSON.parse(settings.socialLinks)
    : {};

  return (
    <footer className="bg-[#08090E] border-t border-[#1E2330] pt-16 pb-12 text-[#94A3B8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-[#1E2330]">
          {/* Column 1: Agency Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <NexoraLogo variant="full" showTagline={true} iconSize={36} />
            <p className="text-sm leading-relaxed max-w-sm text-zinc-400 mt-4">
              {settings?.footerText ||
                'Nexora is a digital design and development studio helping ambitious businesses turn ideas into useful, high-performing digital experiences.'}
            </p>
            
            {/* Direct Studio Contacts */}
            <div className="pt-2 space-y-2 text-xs text-zinc-400">
              <a
                href={`mailto:${settings?.email || 'mohammadaliomega@gmail.com'}`}
                className="flex items-center gap-2.5 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-blue-500" />
                <span>{settings?.email || 'mohammadaliomega@gmail.com'}</span>
              </a>
              {settings?.phone && (
                <a
                  href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
                  className="flex items-center gap-2.5 hover:text-white transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-blue-500" />
                  <span>{settings.phone}</span>
                </a>
              )}
              {settings?.address && (
                <div className="flex items-start gap-2.5 text-zinc-400">
                  <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                  <span>{settings.address}</span>
                </div>
              )}
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Navigation
            </div>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="/"
                  onClick={(e) => handleLink(e, '/')}
                  className="hover:text-white transition-colors flex items-center justify-between group"
                >
                  <span>Home</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-blue-400" />
                </a>
              </li>
              {navigation
                .filter((item) => item.isVisible && item.url !== '/work' && item.url !== '/insights' && item.url !== '/')
                .map((item) => (
                  <li key={item.id}>
                    <a
                      href={item.url}
                      onClick={(e) => handleLink(e, item.url)}
                      className="hover:text-white transition-colors flex items-center justify-between group"
                    >
                      <span>{item.label}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-blue-400" />
                    </a>
                  </li>
                ))}
            </ul>
          </div>

          {/* Column 3: Core Disciplines */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Services
            </div>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="/services/website-design-development"
                  onClick={(e) => handleLink(e, '/services/website-design-development')}
                  className="hover:text-white transition-colors"
                >
                  Web Design & Dev
                </a>
              </li>
              <li>
                <a
                  href="/services/ecommerce-development"
                  onClick={(e) => handleLink(e, '/services/ecommerce-development')}
                  className="hover:text-white transition-colors"
                >
                  E-commerce
                </a>
              </li>
              <li>
                <a
                  href="/services/ui-ux-product-design"
                  onClick={(e) => handleLink(e, '/services/ui-ux-product-design')}
                  className="hover:text-white transition-colors"
                >
                  UI/UX & Product
                </a>
              </li>
              <li>
                <a
                  href="/services/branding-visual-design"
                  onClick={(e) => handleLink(e, '/services/branding-visual-design')}
                  className="hover:text-white transition-colors"
                >
                  Branding & Visuals
                </a>
              </li>
              <li>
                <a
                  href="/services/saas-web-applications"
                  onClick={(e) => handleLink(e, '/services/saas-web-applications')}
                  className="hover:text-white transition-colors"
                >
                  SaaS & Applications
                </a>
              </li>
              <li>
                <a
                  href="/services/seo-digital-growth"
                  onClick={(e) => handleLink(e, '/services/seo-digital-growth')}
                  className="hover:text-white transition-colors"
                >
                  SEO & Digital Growth
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Key Sectors & Social */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Industries
            </div>
            <ul className="space-y-2.5 text-sm mb-6">
              <li>
                <a
                  href="/industries/saas-technology"
                  onClick={(e) => handleLink(e, '/industries/saas-technology')}
                  className="hover:text-white transition-colors"
                >
                  SaaS & Tech
                </a>
              </li>
              <li>
                <a
                  href="/industries/ecommerce-retail"
                  onClick={(e) => handleLink(e, '/industries/ecommerce-retail')}
                  className="hover:text-white transition-colors"
                >
                  E-commerce & DTC
                </a>
              </li>
              <li>
                <a
                  href="/industries/real-estate-architecture"
                  onClick={(e) => handleLink(e, '/industries/real-estate-architecture')}
                  className="hover:text-white transition-colors"
                >
                  Architecture & Real Estate
                </a>
              </li>
              <li>
                <a
                  href="/industries/finance-capital"
                  onClick={(e) => handleLink(e, '/industries/finance-capital')}
                  className="hover:text-white transition-colors"
                >
                  Finance & Capital
                </a>
              </li>
            </ul>

            <div className="text-xs font-semibold uppercase tracking-wider text-white mb-3">
              Connect
            </div>
            <div className="flex items-center gap-3 text-sm">
              {socialLinks.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
              )}
              {socialLinks.twitter && (
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  X / Twitter
                </a>
              )}
              {socialLinks.github && (
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  GitHub
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Legal & Admin Link */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            {settings?.copyrightText || '© 2026 Nexora Studio. All rights reserved.'}
          </div>
          <div className="flex items-center gap-6">
            <a
              href="/privacy-policy"
              onClick={(e) => handleLink(e, '/privacy-policy')}
              className="hover:text-zinc-400 transition-colors"
            >
              Privacy Policy
            </a>
            <span>·</span>
            <a
              href="/terms"
              onClick={(e) => handleLink(e, '/terms')}
              className="hover:text-zinc-400 transition-colors"
            >
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
