"use client";

import { motion } from 'framer-motion';
import type { Tier } from '../lib/types';
import { TIER_CONFIG } from '../lib/config/tier-config';

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
      initial={animate ? { scale: 0.5, opacity: 0, rotateZ: -15 } : false}
      animate={animate ? { scale: 1, opacity: 1, rotateZ: 0 } : false}
      whileHover={{ scale: 1.08, y: -2 }}
      transition={animate ? { type: 'spring', damping: 10, stiffness: 300, duration: 0.6 } : { duration: 0.2 }}
      className={`
        inline-flex items-center gap-1.5 font-black border rounded-lg px-3.5 py-1.5 tracking-wider
        transition-all duration-300 cursor-default relative group
        ${sizeClasses[size]} 
        ${config.color} 
        ${config.borderColor} 
        ${isLimitless ? 'bg-gradient-to-r from-amber-950/90 to-orange-950/90 shadow-[0_0_20px_rgba(245,158,11,0.3)]' : config.bgColor}
        ${isSSST ? 'shadow-[0_0_16px_rgba(251,113,133,0.25)]' : ''}
        ${isSST ? 'shadow-[0_0_14px_rgba(251,146,60,0.2)]' : ''}
        ${isST ? 'shadow-[0_0_12px_rgba(251,191,36,0.15)]' : ''}
        hover:shadow-lg
      `}
    >
      {isLimitless && (
        <motion.span 
          animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
          className="text-base"
        >
          ◆
        </motion.span>
      )}
      {isSSST && (
        <motion.span 
          animate={{ opacity: [0.7, 1, 0.7], rotate: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.4 }}
          className="text-base"
        >
          ★
        </motion.span>
      )}
      <span className="tier-label">{config.label}</span>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileHover={{ opacity: 1, scale: 1 }}
        className="absolute inset-0 rounded-lg bg-gradient-to-r from-amber-500/10 to-cyan-500/10 pointer-events-none"
      />
    </motion.div>
  );
}
