import React, { useEffect, useState } from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { PrinciplesSection } from '../components/home/PrinciplesSection';
import { ServicesSection } from '../components/home/ServicesSection';
import { ProcessSection } from '../components/home/ProcessSection';
import { CTASection } from '../components/home/CTASection';
import { SEO } from '../components/common/SEO';
import { api } from '../services/api';
import { Service } from '../types';
import { useSettings } from '../context/SettingsContext';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { settings } = useSettings();
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    api.getServices('published')
      .then((servData) => {
        setServices(Array.isArray(servData) ? servData : []);
      })
      .catch((err) => {
        console.error('Error fetching home data:', err);
        setServices([]);
      });
  }, []);

  return (
    <>
      <SEO
        title="Nexora — Digital Experience Design & Development Studio"
        description="We build digital experiences that move businesses forward. Strategy, UI/UX design, custom full-stack web development, and digital growth."
        canonicalPath="/"
      />

      <div className="flex flex-col min-h-screen">
        <HeroSection onNavigate={onNavigate} />
        <PrinciplesSection />
        <ServicesSection services={services} onNavigate={onNavigate} />
        <ProcessSection onNavigate={onNavigate} />
        <CTASection onNavigate={onNavigate} ctaText={settings?.primaryCtaText} />
      </div>
    </>
  );
};
