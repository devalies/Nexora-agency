import React from 'react';

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
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* 3D Folded Origami Ribbon 'N' Mark */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 hover:scale-105"
        aria-label="Nexora logo mark"
      >
        <defs>
          {/* Main Diagonal Fold Gradient */}
          <linearGradient id="nexora_diag" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="40%" stopColor="#D4D4D8" />
            <stop offset="100%" stopColor="#71717A" />
          </linearGradient>

          {/* Left Vertical Ribbon Gradient */}
          <linearGradient id="nexora_left" x1="15" y1="90" x2="35" y2="20" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#3F3F46" />
            <stop offset="60%" stopColor="#71717A" />
            <stop offset="100%" stopColor="#A1A1AA" />
          </linearGradient>

          {/* Right Vertical Ribbon Gradient */}
          <linearGradient id="nexora_right" x1="65" y1="10" x2="85" y2="90" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#E4E4E7" />
            <stop offset="50%" stopColor="#A1A1AA" />
            <stop offset="100%" stopColor="#27272A" />
          </linearGradient>

          {/* Ambient Inner Shadow / Fold Depth */}
          <linearGradient id="nexora_shadow" x1="40" y1="35" x2="55" y2="55" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#09090B" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#09090B" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Left vertical folding wing */}
        <path
          d="M18 78V34C18 27.37 23.37 22 30 22C33.5 22 36.6 23.5 38.8 25.9L18 78Z"
          fill="url(#nexora_left)"
        />

        {/* Dynamic Folded Diagonal Ribbon */}
        <path
          d="M26 22L76 74C80 78 84 75 84 69V28C84 24.69 81.31 22 78 22H64L32 60L26 22Z"
          fill="url(#nexora_diag)"
        />

        {/* Left folded shadow tuck */}
        <path
          d="M18 78C18 80.5 20.5 82 23 80.5L46 62L34 50L18 78Z"
          fill="#18181B"
        />

        {/* Right vertical folding stem */}
        <path
          d="M82 24V68C82 74.63 76.63 80 70 80C66.5 80 63.4 78.5 61.2 76.1L82 24Z"
          fill="url(#nexora_right)"
        />

        {/* Soft center fold accent */}
        <path
          d="M38 25L62 75L50 63L30 38L38 25Z"
          fill="url(#nexora_shadow)"
        />
      </svg>

      {/* Typography */}
      {variant !== 'mark' && (
        <div className="flex flex-col justify-center">
          <div className="flex items-center tracking-[0.22em] font-extrabold text-white text-lg leading-none uppercase font-display">
            <span>NEXOR</span>
            <span className="text-zinc-400">A</span>
          </div>

          {(showTagline || variant === 'full') && (
            <div className="text-[7.5px] uppercase tracking-[0.32em] text-zinc-400 mt-1 font-medium whitespace-nowrap">
              <span>Website Design</span>
              <span className="text-zinc-500 mx-1">·</span>
              <span>Development</span>
              <span className="text-zinc-500 mx-1">·</span>
              <span>Growth</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
