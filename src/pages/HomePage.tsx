import React, { useEffect, useState } from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { ProcessSection } from '../components/home/ProcessSection';
import { IndustriesSection } from '../components/home/IndustriesSection';
import { CTASection } from '../components/home/CTASection';
import { SEO } from '../components/common/SEO';
import { api } from '../services/api';
import { Service, Industry } from '../types';
import { useSettings } from '../context/SettingsContext';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { settings } = useSettings();
  const [services, setServices] = useState<Service[]>([]);
  const [industries, setIndustries] = useState<Industry[]>([]);

  useScrollReveal();

  useEffect(() => {
    Promise.all([
      api.getServices('published'),
      api.getIndustries(),
    ])
      .then(([servData, indData]) => {
        setServices(servData);
        setIndustries(indData);
      })
      .catch((err) => {
        console.error('Error fetching home data:', err);
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
        <div className="scroll-reveal">
          <ProcessSection onNavigate={onNavigate} />
        </div>
        <div className="scroll-reveal">
          <IndustriesSection industries={industries} onNavigate={onNavigate} />
        </div>
        <div className="scroll-reveal">
          <CTASection onNavigate={onNavigate} ctaText={settings?.primaryCtaText} />
        </div>
      </div>
    </>
  );
};
