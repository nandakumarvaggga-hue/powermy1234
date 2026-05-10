import { motion } from 'framer-motion';
import type { ScanResult } from '../lib/scoring';
import { formatScore } from '../lib/scoring';
import { TIER_CONFIG, CATEGORIES } from '../lib/types';

interface ShareCardProps {
  imageUrl: string;
  result: ScanResult;
  username?: string;
  description?: string;
}

export default function ShareCard({
  imageUrl,
  result,
  username = 'SCANNER',
  description = ''
}: ShareCardProps) {
  const tierConfig = TIER_CONFIG[result.tier];
  const categoryConfig = CATEGORIES[result.category];

  // Get top 4 attributes to display
  const displayAttrs = Object.entries(result.categoryAttributes)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 4);

  const isLimitless = result.tier === 'LIMITLESS';

  return (
    <div
      className="w-full max-w-[360px] mx-auto bg-black text-white overflow-hidden"
      style={{ aspectRatio: '9 / 16' }}
    >
      {/* Outer frame */}
      <div className="relative w-full h-full flex flex-col bg-gradient-to-b from-zinc-950 via-black to-zinc-950">
        {/* Subtle grid background */}
        <div 
          className="absolute inset-0 opacity-[0.015]" 
          style={{
            backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }} 
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full p-4">
          {/* Header: POWERLVL Logo */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 bg-amber-500 rounded flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-black fill-current">
                <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" />
              </svg>
            </div>
            <span className="font-black text-[10px] tracking-[0.2em] text-amber-400">POWERLVL</span>
          </div>

          {/* Image with HUD frame */}
          <div className="relative flex-1 min-h-0 mb-3 rounded-xl overflow-hidden border-2 border-amber-500/40">
            <img
              src={imageUrl}
              alt="Scan"
              className="w-full h-full object-cover"
            />
            
            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
            
            {/* Corner brackets */}
            {['top-2 left-2 border-t-2 border-l-2', 'top-2 right-2 border-t-2 border-r-2', 'bottom-2 left-2 border-b-2 border-l-2', 'bottom-2 right-2 border-b-2 border-r-2'].map((pos, i) => (
              <div key={i} className={`absolute ${pos} w-4 h-4 border-amber-400/70`} />
            ))}

            {/* Category badge */}
            <div className="absolute top-2.5 right-2.5 bg-black/80 backdrop-blur-sm px-2 py-1 rounded border border-white/10">
              <span className="text-[9px] font-black tracking-widest">
                {categoryConfig.emoji} {categoryConfig.label}
              </span>
            </div>

            {/* HUD ID */}
            <div className="absolute bottom-2.5 left-2.5">
              <span className="text-[8px] text-amber-400/50 font-mono tracking-wider">
                SCAN_{Math.random().toString(36).slice(2, 6).toUpperCase()}
              </span>
            </div>
          </div>

          {/* Score - HUGE and dominant */}
          <div className="mb-2">
            <div 
              className={`text-[56px] leading-none font-black ${tierConfig.color} score-display`}
              style={{
                textShadow: isLimitless 
                  ? '0 0 40px rgba(245, 158, 11, 0.6)' 
                  : undefined
              }}
            >
              {formatScore(result.score)}
            </div>
          </div>

          {/* Tier Badge */}
          <div className="mb-3">
            <div 
              className={`inline-flex items-center px-3 py-1.5 rounded font-black text-xs tracking-[0.15em] border ${tierConfig.borderColor} ${tierConfig.color} ${isLimitless ? 'bg-gradient-to-r from-amber-950/80 to-orange-950/80' : tierConfig.bgColor}`}
            >
              {isLimitless && <span className="mr-1.5 text-amber-400">◆</span>}
              {tierConfig.label}
            </div>
          </div>

          {/* Accent line */}
          <div className="h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent mb-3" />

          {/* Description if provided */}
          {description && (
            <p className="text-[11px] text-zinc-300 mb-2 line-clamp-1 italic">
              "{description}"
            </p>
          )}

          {/* Commentary */}
          <p className="text-xs text-zinc-300 leading-relaxed mb-3 line-clamp-2 italic">
            "{result.commentary}"
          </p>

          {/* Attributes Grid - Compact */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mb-3">
            {displayAttrs.map(([key, val]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-[9px] text-zinc-500 font-bold tracking-wider uppercase">
                  {key.replace(/_/g, ' ').slice(0, 8)}
                </span>
                <span className={`text-[10px] font-black ${tierConfig.color}`}>{val}</span>
              </div>
            ))}
          </div>

          {/* Footer divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent mb-2" />

          {/* Footer */}
          <div className="text-center space-y-0.5 mt-auto">
            <div className="text-[9px] text-zinc-500 tracking-widest font-semibold">
              @{username.toUpperCase()}
            </div>
            <div className="text-[10px] text-zinc-600 tracking-wide">
              Everything has a power level.
            </div>
          </div>
        </div>

        {/* Subtle glow effect for high tiers */}
        {(result.tier === 'SINGULAR' || result.tier === 'LIMITLESS') && (
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at center, ${isLimitless ? 'rgba(245, 158, 11, 0.08)' : 'rgba(251, 113, 133, 0.05)'} 0%, transparent 70%)`
            }}
          />
        )}
      </div>
    </div>
  );
}
