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
    sm: 'text-[10px] px-2 py-0.5 tracking-widest',
    md: 'text-xs px-3 py-1 tracking-widest',
    lg: 'text-sm px-4 py-1.5 tracking-[0.2em]',
  };

  const isLimitless = tier === 'LIMITLESS';

  return (
    <motion.div
      initial={animate ? { scale: 0, opacity: 0 } : false}
      animate={animate ? { scale: 1, opacity: 1 } : false}
      transition={{ type: 'spring', damping: 12, stiffness: 200 }}
      className={`inline-flex items-center font-black border rounded-sm ${sizeClasses[size]} ${config.color} ${config.borderColor} ${isLimitless ? 'bg-gradient-to-r from-amber-950 to-orange-950' : config.bgColor}`}
    >
      {isLimitless && (
        <span className="mr-1.5 text-amber-400">◆</span>
      )}
      {config.label}
    </motion.div>
  );
}
