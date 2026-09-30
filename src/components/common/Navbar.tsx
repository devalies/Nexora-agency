import React, { useState, useEffect } from 'react';
import { NexoraLogo } from './NexoraLogo';
import { useSettings } from '../../context/SettingsContext';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const { navigation, settings } = useSettings();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter out CTA items, Work links, and Insights links from the middle nav zone
  const navList = Array.isArray(navigation) ? navigation : [];
  const visibleNavLinks = [
    { id: 'nav_home', label: 'Home', url: '/', isVisible: true, displayOrder: 0, isCta: false },
    ...navList
      .filter(item => item.isVisible && !item.isCta && item.url !== '/work' && item.url !== '/insights' && item.url !== '/about' && item.url !== '/')
      .sort((a, b) => a.displayOrder - b.displayOrder),
  ];

  const ctaItem = navList.find(item => item.isCta) || {
    label: settings?.primaryCtaText || 'Start a Project',
    url: '/start-a-project',
  };

  const handleLinkClick = (e: React.MouseEvent, url: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(url);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#08090E]/90 backdrop-blur-md border-b border-[#1E2330]/90 py-3.5 shadow-xl shadow-[#040508]/60'
          : 'bg-transparent border-b border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-11">
          {/* Zone 1: Single text element Brand mark (Top Bar Contract compliant) */}
          <a
            href="/"
            onClick={(e) => handleLinkClick(e, '/')}
            className="flex items-center gap-2.5 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md"
            aria-label="Nexora Homepage"
          >
            <NexoraLogo variant="header" iconSize={30} />
          </a>

          {/* Zone 2: 4-6 Clean text navigation links (Obsidian slate styling) */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#94A3B8]">
            {visibleNavLinks.map((item) => {
              const isActive = item.url === '/' 
                ? currentPath === '/' 
                : currentPath === item.url || currentPath.startsWith(item.url + '/');
              return (
                <a
                  key={item.id}
                  href={item.url}
                  onClick={(e) => handleLinkClick(e, item.url)}
                  className={`relative py-1 transition-colors whitespace-nowrap shrink-0 hover:text-white ${
                    isActive ? 'text-white font-semibold' : ''
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-500 rounded-full shadow-sm shadow-blue-500/50" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action */}
          <div className="hidden md:flex items-center">
            {/* Primary CTA Button */}
            <a
              href={ctaItem.url}
              onClick={(e) => handleLinkClick(e, ctaItem.url)}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 transition-all rounded-lg shadow-md shadow-blue-950/50 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              <span>{ctaItem.label}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Button & Mobile Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href="/start-a-project"
              onClick={(e) => handleLinkClick(e, '/start-a-project')}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-md"
            >
              Start
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-400 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Obsidian Slate Theme) */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0C0E14] border-b border-[#1E2330] px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top duration-200 shadow-2xl">
          {visibleNavLinks.map((item) => (
            <a
              key={item.id}
              href={item.url}
              onClick={(e) => handleLinkClick(e, item.url)}
              className={`block px-3 py-2 text-base font-medium rounded-lg transition-colors ${
                currentPath === item.url
                  ? 'text-white bg-[#151924]'
                  : 'text-[#94A3B8] hover:text-white hover:bg-[#151924]'
              }`}
            >
              {item.label}
            </a>
          ))}
          <div className="pt-3 border-t border-[#1E2330]">
            <a
              href="/start-a-project"
              onClick={(e) => handleLinkClick(e, '/start-a-project')}
              className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
            >
              <span>{settings?.primaryCtaText || 'Start a Project'}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
