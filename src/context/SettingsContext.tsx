import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteSettings, NavigationItem } from '../types';
import { api } from '../services/api';

interface SettingsContextType {
  settings: SiteSettings | null;
  navigation: NavigationItem[];
  isLoading: boolean;
  refreshSettings: () => Promise<void>;
  refreshNavigation: () => Promise<void>;
  updateSettings: (newSettings: Partial<SiteSettings>) => Promise<void>;
}

const defaultSettings: SiteSettings = {
  id: 'settings_1',
  agencyName: 'Nexora',
  tagline: 'Website Design • Development • Digital Growth',
  logoUrl: '/assets/nexora-logo.svg',
  email: 'mohammadaliomega@gmail.com',
  phone: '+1 (415) 890-3420',
  whatsapp: '+14158903420',
  address: '548 Market St, Suite 7210, San Francisco, CA 94104',
  socialLinks: JSON.stringify({
    linkedin: 'https://linkedin.com/company/nexora-studio',
    twitter: 'https://twitter.com/nexora_studio',
    github: 'https://github.com/nexora-studio',
  }),
  footerText: 'Nexora is a digital design and development studio helping ambitious businesses turn ideas into useful, high-performing digital experiences.',
  copyrightText: '© 2026 Nexora Studio. All rights reserved.',
  primaryCtaText: 'Start a Project',
  defaultSeoTitle: 'Nexora — Digital Experience Design & Development Studio',
  defaultSeoDesc: 'Strategy, UI/UX design, custom full-stack web development, and digital growth for ambitious brands and fast-growing modern businesses.',
  defaultOgImage: '/uploads/hero_nexora_showcase_1790138540390.jpg',
  analyticsId: 'G-NEXORA2026',
  updatedAt: new Date().toISOString(),
};

const defaultNavigation: NavigationItem[] = [
  { id: 'nav_home', label: 'Home', url: '/', isVisible: true, displayOrder: 0, isCta: false },
  { id: 'nav_1', label: 'Work', url: '/work', isVisible: false, displayOrder: 1, isCta: false },
  { id: 'nav_2', label: 'Services', url: '/services', isVisible: true, displayOrder: 2, isCta: false },
  { id: 'nav_3', label: 'Process', url: '/process', isVisible: true, displayOrder: 3, isCta: false },
  { id: 'nav_4', label: 'About', url: '/about', isVisible: true, displayOrder: 4, isCta: false },
  { id: 'nav_5', label: 'Insights', url: '/insights', isVisible: false, displayOrder: 5, isCta: false },
  { id: 'nav_6', label: 'Contact', url: '/contact', isVisible: true, displayOrder: 6, isCta: false },
  { id: 'nav_7', label: 'Start a Project', url: '/start-a-project', isVisible: true, displayOrder: 7, isCta: true },
];

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SiteSettings | null>(defaultSettings);
  const [navigation, setNavigation] = useState<NavigationItem[]>(defaultNavigation);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const refreshSettings = async () => {
    try {
      const data = await api.getSettings();
      if (data) setSettings(data);
    } catch (err) {
      console.warn('Could not fetch settings from backend, using defaults:', err);
    }
  };

  const refreshNavigation = async () => {
    try {
      const items = await api.getNavigation();
      if (Array.isArray(items) && items.length > 0) {
        setNavigation(items);
      }
    } catch (err) {
      console.warn('Could not fetch navigation from backend, using defaults:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateSettings = async (newSettings: Partial<SiteSettings>) => {
    const updated = await api.updateSettings(newSettings);
    if (updated) setSettings(updated);
  };

  useEffect(() => {
    Promise.all([refreshSettings(), refreshNavigation()]).finally(() => {
      setIsLoading(false);
    });
  }, []);

  return (
    <SettingsContext.Provider
      value={{ settings, navigation, isLoading, refreshSettings, refreshNavigation, updateSettings }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings must be used within a SettingsProvider');
  return context;
};
