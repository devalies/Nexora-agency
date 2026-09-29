import React, { useState, useRef } from 'react';
import { ArrowUpRight, Laptop, Smartphone, Play, Pause, Volume2, VolumeX, Eye } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface HeroSectionProps {
  onNavigate: (path: string) => void;
  heroImage?: string;
}

// Curated stock showcase items matching company services
const SHOWCASE_ITEMS = [
  {
    id: 'studio-architect',
    title: 'Flagship Digital Studio & Web Architecture',
    category: 'Web Engineering',
    image: '/src/assets/images/hero_studio_cinematic_1790149853210.jpg',
    metric: '99.9% Uptime',
    tag: 'Full-Stack React & Next.js',
  },
  {
    id: 'fintech-platform',
    title: 'Finora Real-Time Analytics & Financial Suite',
    category: 'Fintech & SaaS',
    image: '/src/assets/images/fintech_platform_showcase_1790149866454.jpg',
    metric: '< 12ms Latency',
    tag: 'Enterprise UI/UX Systems',
  },
  {
    id: 'luxury-ecommerce',
    title: 'Veloce Luxury Horology Headless Storefront',
    category: 'E-commerce',
    image: '/src/assets/images/ecommerce_platform_showcase_1790149879417.jpg',
    metric: '3.4x Conversion',
    tag: 'Headless Shopify Engine',
  },
  {
    id: 'cloud-infrastructure',
    title: 'Cloudnest Distributed Cloud Control Plane',
    category: 'Cloud Systems',
    image: '/src/assets/images/devops_cloud_platform_1790149896238.jpg',
    metric: 'Sub-200ms Query',
    tag: 'DevOps & Microservices',
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigate,
  heroImage = '/src/assets/images/hero_studio_cinematic_1790149853210.jpg',
}) => {
  const { theme } = useTheme();
  const [activeDevice, setActiveDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [selectedShowcase, setSelectedShowcase] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      } else {
        videoRef.current.play();
        setIsVideoPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const currentItem = SHOWCASE_ITEMS[selectedShowcase];

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[#08090E] border-b border-[#1E2330]">
      {/* Background Video Layer */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="/src/assets/images/hero_studio_cinematic_1790149853210.jpg"
          className="w-full h-full object-cover opacity-20 transition-opacity duration-700 filter brightness-90 contrast-110"
        >
          {/* Tech digital network ambient video loop */}
          <source
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4"
            type="video/mp4"
          />
        </video>

        {/* Video Overlay Gradient Grids */}
        <div
          className={`absolute inset-0 transition-colors duration-300 ${
            theme === 'light'
              ? 'bg-gradient-to-b from-[#F8FAFC]/90 via-[#F8FAFC]/80 to-[#F8FAFC]'
              : 'bg-gradient-to-b from-[#08090E]/90 via-[#08090E]/80 to-[#08090E]'
          }`}
        />
        {/* Subtle dynamic grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1E233015_1px,transparent_1px),linear-gradient(to_bottom,#1E233015_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* Subtle background ambient mesh */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-blue-600/10 blur-[130px] pointer-events-none rounded-full z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10">
          <div className="max-w-3xl">
            {/* Studio Kicker / Strategic Identity */}
            <div className="flex items-center gap-2.5 text-xs uppercase tracking-widest text-[#94A3B8] font-semibold mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span>Independent Design & Engineering Studio</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span>San Francisco</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white font-display leading-[1.08] text-balance">
              We build digital experiences that move businesses forward.
            </h1>

            {/* Supporting Copy */}
            <p className="mt-6 text-lg sm:text-xl text-[#94A3B8] leading-relaxed max-w-2xl font-normal">
              Strategy, design, development and digital growth for ambitious businesses and brands. We partner closely with founders and teams to engineer high-velocity digital products.
            </p>

            {/* Action CTAs */}
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate('/services')}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 transition-all rounded-lg shadow-lg shadow-blue-950/40 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 cursor-pointer"
              >
                <span>Explore Services</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('/process')}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium tracking-wide text-zinc-200 bg-[#11141E] hover:bg-[#161B28] hover:text-white border border-[#1E2330] hover:border-zinc-600 transition-all rounded-lg whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 cursor-pointer"
              >
                <span>How We Work</span>
              </button>
            </div>
          </div>

          {/* Ambient Video Control Badge */}
          <div className="flex items-center gap-2.5 self-start lg:self-end bg-[#0D1017]/80 backdrop-blur-md border border-[#1E2330] px-3.5 py-2 rounded-full shadow-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs font-mono font-medium text-zinc-300">Studio Feed</span>
            <span className="text-zinc-700">|</span>
            <button
              onClick={toggleVideoPlay}
              className="text-zinc-400 hover:text-white transition-colors p-1"
              title={isVideoPlaying ? 'Pause ambient video' : 'Play ambient video'}
              aria-label="Toggle ambient video play state"
            >
              {isVideoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={toggleMute}
              className="text-zinc-400 hover:text-white transition-colors p-1"
              title={isMuted ? 'Unmute video sound' : 'Mute video sound'}
              aria-label="Toggle video mute"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Hero Visual Showcase Frame */}
        <div className="mt-8 lg:mt-12">
          {/* Stock Showcase Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 no-scrollbar mb-4">
            {SHOWCASE_ITEMS.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setSelectedShowcase(idx)}
                className={`px-4 py-2 rounded-lg text-xs font-medium border transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                  selectedShowcase === idx
                    ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-900/30'
                    : 'bg-[#0D1017] text-zinc-400 border-[#1E2330] hover:text-white hover:border-zinc-700'
                }`}
              >
                <span>{item.category}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                  selectedShowcase === idx ? 'bg-blue-700 text-white' : 'bg-[#141926] text-zinc-400'
                }`}>
                  {item.metric}
                </span>
              </button>
            ))}
          </div>

          <div className="bg-[#0D1017] border border-[#1E2330] rounded-xl overflow-hidden shadow-2xl shadow-[#040508]/80">
            {/* Mockup Frame Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#1E2330] bg-[#0A0D14]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="text-xs text-[#64748B] ml-2 font-mono hidden sm:inline">
                  nexora.studio / showcase / {currentItem.id}
                </span>
              </div>

              {/* Viewport toggle for desktop / mobile inspect */}
              <div className="flex items-center gap-1 bg-[#11141E] p-1 rounded-md border border-[#1E2330]">
                <button
                  onClick={() => setActiveDevice('desktop')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded transition-colors ${
                    activeDevice === 'desktop'
                      ? 'bg-blue-600 text-white'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                  aria-label="Desktop Preview"
                >
                  <Laptop className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Desktop</span>
                </button>
                <button
                  onClick={() => setActiveDevice('mobile')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded transition-colors ${
                    activeDevice === 'mobile'
                      ? 'bg-blue-600 text-white'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                  aria-label="Mobile Preview"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Mobile</span>
                </button>
              </div>
            </div>

            {/* Showcase Visual Frame */}
            <div className={`relative w-full bg-[#0A0A0A] overflow-hidden flex items-center justify-center p-3 sm:p-6 transition-all duration-300 ${
              activeDevice === 'desktop' ? 'aspect-[16/9] max-h-[580px]' : 'min-h-[460px] sm:min-h-[560px] py-6 sm:py-8'
            }`}>
              {activeDevice === 'desktop' ? (
                <div className="w-full h-full relative rounded-lg overflow-hidden group">
                  <img
                    src={currentItem.image}
                    alt={currentItem.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex items-end p-4 sm:p-8">
                    <div className="text-left max-w-xl">
                      <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-blue-600/90 text-white text-[11px] font-mono font-semibold uppercase tracking-wider mb-2">
                        <span>{currentItem.tag}</span>
                        <span>·</span>
                        <span>{currentItem.metric}</span>
                      </div>
                      <div className="text-lg sm:text-2xl font-bold text-white font-display">
                        {currentItem.title}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Responsive Mobile Phone Mockup */
                <div className="w-full max-w-[280px] sm:max-w-[320px] aspect-[9/19] max-h-[500px] sm:max-h-[560px] bg-black border-[6px] sm:border-[8px] border-zinc-800 rounded-[2.5rem] overflow-hidden shadow-2xl relative my-auto flex flex-col ring-1 ring-zinc-700/60">
                  {/* Dynamic Island / Speaker Notch */}
                  <div className="w-full pt-3 pb-1 flex justify-center bg-black shrink-0 relative z-20">
                    <div className="w-20 sm:w-24 h-4 bg-zinc-900 rounded-full border border-zinc-800 flex items-center justify-end px-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500/80 animate-pulse" />
                    </div>
                  </div>

                  {/* Mobile Screen App UI Simulation */}
                  <div className="relative w-full flex-1 overflow-y-auto no-scrollbar bg-[#0E0E0E] flex flex-col text-left">
                    {/* Simulated Mobile App Header */}
                    <div className="px-4 py-2.5 flex items-center justify-between border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur shrink-0 sticky top-0 z-10">
                      <span className="text-xs font-bold tracking-tight text-white font-display">NEXORA</span>
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                        {currentItem.category}
                      </span>
                    </div>

                    {/* Mobile Hero Graphic */}
                    <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-zinc-900">
                      <img
                        src={currentItem.image}
                        alt={currentItem.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                      <div className="absolute bottom-2.5 left-3 right-3">
                        <span className="text-[9px] uppercase tracking-wider text-blue-400 font-bold block">
                          {currentItem.tag}
                        </span>
                        <span className="text-xs font-bold text-white block truncate">
                          {currentItem.title}
                        </span>
                      </div>
                    </div>

                    {/* Mobile Content Skeleton & Metrics */}
                    <div className="p-3.5 space-y-3 flex-1">
                      <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-3">
                        <div className="flex items-center justify-between text-[11px] font-semibold text-zinc-300 mb-1.5">
                          <span>Live System Health</span>
                          <span className="text-emerald-400">{currentItem.metric}</span>
                        </div>
                        <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                          <div className="w-[92%] h-full bg-blue-500 rounded-full" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-zinc-900/70 border border-zinc-800/80 rounded-lg p-2.5">
                          <div className="text-[9px] uppercase tracking-wider text-zinc-400">Audited Score</div>
                          <div className="text-sm font-bold text-white mt-0.5">100 / 100</div>
                        </div>
                        <div className="bg-zinc-900/70 border border-zinc-800/80 rounded-lg p-2.5">
                          <div className="text-[9px] uppercase tracking-wider text-zinc-400">Response</div>
                          <div className="text-sm font-bold text-emerald-400 mt-0.5">&lt; 12ms</div>
                        </div>
                      </div>

                      <div className="pt-1">
                        <button
                          onClick={() => onNavigate('/services')}
                          className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-blue-900/30 cursor-pointer"
                        >
                          <span>Explore Capabilities</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Home Indicator Bar */}
                    <div className="w-full py-2 flex justify-center bg-black shrink-0">
                      <div className="w-28 h-1 bg-zinc-600 rounded-full" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

