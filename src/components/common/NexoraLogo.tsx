import React, { useId } from 'react';

interface NexoraLogoProps {
  className?: string;
  variant?: 'full' | 'header' | 'mark';
  iconSize?: number;
  showTagline?: boolean;
}

export const NexoraLogo: React.FC<NexoraLogoProps> = ({
  className = '',
  variant = 'header',
  iconSize = 34,
  showTagline = false,
}) => {
  const rawId = useId();
  const uid = rawId.replace(/[^a-zA-Z0-9]/g, '_');

  const gradMain = `nexora_grad_main_${uid}`;
  const gradLeft = `nexora_grad_left_${uid}`;
  const gradRight = `nexora_grad_right_${uid}`;
  const glowFilter = `nexora_glow_${uid}`;

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* High-Impact Vibrant 3D Folded Nexora Icon */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 hover:scale-105 filter drop-shadow-[0_2px_12px_rgba(59,130,246,0.5)]"
        aria-label="Nexora logo"
      >
        <defs>
          {/* Main Diagonal Blade Gradient: Vibrant Cyan to Electric Royal Blue */}
          <linearGradient id={gradMain} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="50%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>

          {/* Left Wing Gradient: Electric Blue to Sky Accent */}
          <linearGradient id={gradLeft} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1D4ED8" />
            <stop offset="60%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#60A5FA" />
          </linearGradient>

          {/* Right Wing Gradient: Deep Vivid Cobalt to Light Cyan */}
          <linearGradient id={gradRight} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="60%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#1E40AF" />
          </linearGradient>

          {/* Subtle Glow Filter */}
          <filter id={glowFilter} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ambient Back Glow Ring */}
        <circle cx="20" cy="20" r="16" fill="#3B82F6" opacity="0.12" />

        {/* Left Vertical Folding Wing */}
        <path
          d="M7 32V14C7 10.686 9.686 8 13 8C14.8 8 16.4 8.8 17.5 10L7 32Z"
          fill={`url(#${gradLeft})`}
        />

        {/* Center Diagonal Folding Blade */}
        <path
          d="M11 8L31 30C33 32 33 34 31 34C29 34 27 33 25 31L7 11C7 9.3 8.3 8 10 8H11Z"
          fill={`url(#${gradMain})`}
        />

        {/* Main Ribbon Traverse */}
        <path
          d="M10 8H16L33 27V32C33 33.1 32.1 34 31 34L10 8Z"
          fill={`url(#${gradMain})`}
        />

        {/* Right Vertical Folding Wing */}
        <path
          d="M33 8V26C33 29.314 30.314 32 27 32C25.2 32 23.6 31.2 22.5 30L33 8Z"
          fill={`url(#${gradRight})`}
        />

        {/* Crisp Lighting Edge Specular */}
        <path
          d="M13 8L33 29"
          stroke="#93C5FD"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.85"
        />

        {/* Top-left Spark / Specular Highlight */}
        <circle cx="13" cy="8" r="1.5" fill="#FFFFFF" />
      </svg>

      {/* Typography */}
      {variant !== 'mark' && (
        <div className="flex flex-col justify-center">
          <div className="flex items-center tracking-[0.22em] font-extrabold text-white text-lg leading-none uppercase font-display">
            <span className="text-white">NEXOR</span>
            <span className="text-blue-500 font-black">A</span>
          </div>

          {(showTagline || variant === 'full') && (
            <div className="text-[7.5px] uppercase tracking-[0.32em] text-zinc-400 mt-1 font-medium whitespace-nowrap">
              <span>Website Design</span>
              <span className="text-blue-500 mx-1">·</span>
              <span>Development</span>
              <span className="text-blue-500 mx-1">·</span>
              <span>Growth</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
