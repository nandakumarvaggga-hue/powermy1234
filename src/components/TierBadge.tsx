import { motion } from 'framer-motion';
import type { Tier } from '../lib/types';
import { TIER_CONFIG } from '../lib/types';

interface TierBadgeProps {
  tier: Tier;
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
}

export default function TierBadge({ tier, size = 'md', animate = false }: TierBadgeProps) {
  const config = TIER_CONFIG[tier];

  const sizeClasses = {
    sm: 'text-[9px] px-2 py-0.5 tracking-[0.15em]',
    md: 'text-[10px] px-3 py-1 tracking-[0.15em]',
    lg: 'text-xs px-4 py-1.5 tracking-[0.2em]',
  };

  const isLimitless = tier === 'LIMITLESS';
  const isSSST = tier === 'SSS-TIER';
  const isSST = tier === 'SS-TIER';
  const isST = tier === 'S-TIER';

  return (
    <motion.div
      initial={animate ? { scale: 0, opacity: 0 } : false}
      animate={animate ? { scale: 1, opacity: 1 } : false}
      transition={{ type: 'spring', damping: 12, stiffness: 200 }}
      className={`
        inline-flex items-center font-black border rounded
        ${sizeClasses[size]} 
        ${config.color} 
        ${config.borderColor} 
        ${isLimitless ? 'bg-gradient-to-r from-amber-950/80 to-orange-950/80 shadow-[0_0_15px_rgba(245,158,11,0.2)]' : config.bgColor}
        ${isSSST ? 'shadow-[0_0_12px_rgba(251,113,133,0.2)]' : ''}
        ${isSST ? 'shadow-[0_0_10px_rgba(251,146,60,0.15)]' : ''}
        ${isST ? 'shadow-[0_0_8px_rgba(251,191,36,0.1)]' : ''}
      `}
    >
      {isLimitless && (
        <motion.span 
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="mr-1 text-amber-400"
        >
          ◆
        </motion.span>
      )}
      {isSSST && (
        <motion.span 
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
          className="mr-1 text-rose-400"
        >
          ★
        </motion.span>
      )}
      {config.label}
    </motion.div>
  );
}
