import { motion } from 'framer-motion';
import type { Tier } from '../lib/types';
import { TIER_CONFIG } from '../lib/types';

interface TierBadgeProps {
  tier: Tier;
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
}

const TIER_STYLES: Record<Tier, { gradient?: string; pulse?: boolean; shimmer?: boolean }> = {
  'D-TIER': {},
  'C-TIER': {},
  'B-TIER': {},
  'A-TIER': { shimmer: true },
  'S-TIER': { shimmer: true },
  'SS-TIER': { shimmer: true, pulse: true },
  'SSS-TIER': { gradient: 'from-violet-400 via-pink-400 to-violet-300', pulse: true, shimmer: true },
  'LIMITLESS': { gradient: 'from-amber-300 via-yellow-200 to-amber-300', pulse: true, shimmer: true },
};

export default function TierBadge({ tier, size = 'md', animate = false }: TierBadgeProps) {
  const config = TIER_CONFIG[tier];
  const style = TIER_STYLES[tier];

  const sizeClasses = {
    sm: 'text-[9px] px-2 py-0.5 tracking-[0.12em] gap-0.5',
    md: 'text-[11px] px-3 py-1 tracking-[0.15em] gap-1',
    lg: 'text-sm px-4 py-1.5 tracking-[0.18em] gap-1.5',
  };

  const badgeSizes = {
    sm: 'w-3.5 h-3.5 text-[7px]',
    md: 'w-4 h-4 text-[9px]',
    lg: 'w-5 h-5 text-[10px]',
  };

  const isLimitless = tier === 'LIMITLESS';
  const isSSS = tier === 'SSS-TIER';

  return (
    <motion.div
      initial={animate ? { scale: 0, opacity: 0 } : false}
      animate={animate ? { scale: 1, opacity: 1 } : false}
      transition={{ type: 'spring', damping: 12, stiffness: 200 }}
      className={`relative inline-flex items-center font-black border rounded-sm overflow-hidden ${sizeClasses[size]} ${config.color} ${config.borderColor} ${isLimitless || isSSS ? '' : config.bgColor}`}
      style={isLimitless ? {
        background: 'linear-gradient(135deg, #451a03 0%, #78350f 50%, #451a03 100%)',
        boxShadow: `0 0 12px ${config.glowColor}`,
      } : isSSS ? {
        background: 'linear-gradient(135deg, #2e1065 0%, #4c1d95 50%, #2e1065 100%)',
        boxShadow: `0 0 12px ${config.glowColor}`,
      } : style.pulse ? {
        boxShadow: `0 0 8px ${config.glowColor}`,
      } : {}}
    >
      {/* Shimmer overlay for high tiers */}
      {style.shimmer && (
        <motion.div
          animate={{ x: ['-100%', '200%'] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'linear', repeatDelay: 1.5 }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none"
        />
      )}

      {/* Badge symbol box */}
      <div className={`relative z-10 flex items-center justify-center rounded-[2px] font-black ${badgeSizes[size]} ${
        isLimitless ? 'bg-amber-400/30 text-amber-200' :
        isSSS ? 'bg-violet-400/30 text-violet-200' :
        tier === 'SS-TIER' ? 'bg-rose-500/20 text-rose-300' :
        tier === 'S-TIER' ? 'bg-orange-500/20 text-orange-300' :
        'bg-white/10 text-current'
      }`}>
        {config.badge}
      </div>

      <span className={`relative z-10 font-black ${
        isLimitless ? 'bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 bg-clip-text text-transparent' :
        isSSS ? 'bg-gradient-to-r from-violet-300 via-pink-200 to-violet-300 bg-clip-text text-transparent' : ''
      }`}>
        {config.label}
      </span>
    </motion.div>
  );
}
