import React, { useState, useEffect } from 'react';
import { SettingsProvider } from './context/SettingsContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';

// Public Pages
import { HomePage } from './pages/HomePage';
import { WorkPage } from './pages/WorkPage';
import { CaseStudyPage } from './pages/CaseStudyPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { ProcessPage } from './pages/ProcessPage';
import { AboutPage } from './pages/AboutPage';
import { IndustriesPage } from './pages/IndustriesPage';
import { IndustryDetailPage } from './pages/IndustryDetailPage';
import { InsightsPage } from './pages/InsightsPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { ContactPage } from './pages/ContactPage';
import { StartAProjectPage } from './pages/StartAProjectPage';
import { LegalPage } from './pages/LegalPage';

export function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    if (path === currentPath) return;
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Router Dispatcher
  const renderRoute = () => {
    // Public Routes
    if (currentPath === '/') {
      return <HomePage onNavigate={navigate} />;
    }

    if (currentPath === '/work') {
      return <WorkPage onNavigate={navigate} />;
    }

    if (currentPath.startsWith('/work/')) {
      const slug = currentPath.replace('/work/', '');
      return <CaseStudyPage slug={slug} onNavigate={navigate} />;
    }

    if (currentPath === '/services') {
      return <ServicesPage onNavigate={navigate} />;
    }

    if (currentPath.startsWith('/services/')) {
      const slug = currentPath.replace('/services/', '');
      return <ServiceDetailPage slug={slug} onNavigate={navigate} />;
    }

    if (currentPath === '/process') {
      return <ProcessPage onNavigate={navigate} />;
    }

    if (currentPath === '/about') {
      return <AboutPage onNavigate={navigate} />;
    }

    if (currentPath === '/industries') {
      return <IndustriesPage onNavigate={navigate} />;
    }

    if (currentPath.startsWith('/industries/')) {
      const slug = currentPath.replace('/industries/', '');
      return <IndustryDetailPage slug={slug} onNavigate={navigate} />;
    }

    if (currentPath === '/insights') {
      return <InsightsPage onNavigate={navigate} />;
    }

    if (currentPath.startsWith('/insights/')) {
      const slug = currentPath.replace('/insights/', '');
      return <ArticleDetailPage slug={slug} onNavigate={navigate} />;
    }

    if (currentPath === '/contact' || currentPath.startsWith('/contact?')) {
      return <ContactPage onNavigate={navigate} />;
    }

    if (currentPath === '/start-a-project') {
      return <StartAProjectPage onNavigate={navigate} />;
    }

    if (currentPath === '/privacy-policy') {
      return <LegalPage type="privacy" onNavigate={navigate} />;
    }

    if (currentPath === '/terms') {
      return <LegalPage type="terms" onNavigate={navigate} />;
    }

    // Default fallback to Home
    return <HomePage onNavigate={navigate} />;
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="nexora-theme">
      <SettingsProvider>
        <div className="min-h-screen bg-[#0A0A0A] text-zinc-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
          <Navbar currentPath={currentPath} onNavigate={navigate} />

          <main className="flex-1">
            {renderRoute()}
          </main>

          <Footer onNavigate={navigate} />
        </div>
      </SettingsProvider>
    </ThemeProvider>
  );
}

export default App;
