"use client";

import { motion } from 'framer-motion';
import { Heart, Zap, Share2 } from 'lucide-react';
import type { Scan } from '../lib/types';
import { TIER_CONFIG } from '../lib/config/tier-config';
import TierBadge from './TierBadge';
import { formatScore } from '../lib/scoring';

interface ScanCardProps {
  scan: Scan;
  index?: number;
  onLike?: (scanId: string) => void;
}

export default function ScanCard({ scan, index = 0, onLike }: ScanCardProps) {
  const tierConfig = TIER_CONFIG[scan.tier];
  const isHighTier = ['S-TIER', 'SS-TIER', 'SSS-TIER', 'LIMITLESS'].includes(scan.tier);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -4 }}
      transition={{ delay: index * 0.06, duration: 0.4, type: 'spring', damping: 15, stiffness: 100 }}
      className="group h-full"
    >
      <div className={`
        relative h-full rounded-xl overflow-hidden
        backdrop-blur-xl glass-surface
        border border-zinc-700/50 group-hover:border-zinc-500/70
        transition-all duration-300 card-glow
        ${isHighTier ? 'ring-1 ring-offset-1 ring-amber-500/30 ring-offset-black/50' : ''}
      `}>
        {/* Premium glow background */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-cyan-500/5 pointer-events-none" />

        {/* Image Section */}
        <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-zinc-800 to-zinc-900">
          <img
            src={scan.image_url}
            alt="Scanned"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          
          {/* Scan line effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
          
          {/* High tier special effect */}
          {isHighTier && (
            <motion.div
              animate={{ opacity: [0, 0.6, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-transparent to-cyan-500/20 pointer-events-none"
            />
          )}

          {/* Score Badge - Premium positioning */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.06 + 0.2 }}
            className="absolute top-3 right-3"
          >
            <TierBadge tier={scan.tier} size="sm" animate />
          </motion.div>

          {/* Score Display - Bottom overlay */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06 + 0.15 }}
            className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/95 via-black/50 to-transparent"
          >
            <div className={`text-4xl font-black score-display ${tierConfig.color} drop-shadow-lg`}>
              {formatScore(scan.score)}
            </div>
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="p-4 space-y-3 flex flex-col flex-1">
          {/* Commentary */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.06 + 0.25 }}
            className="text-sm text-zinc-300 leading-relaxed line-clamp-2 italic font-medium"
          >
            &quot;{scan.commentary}&quot;
          </motion.p>

          {/* User info */}
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06 + 0.3 }}
            className="flex items-center gap-2.5 pt-1"
          >
            <div className="w-6 h-6 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center ring-1 ring-amber-400/50">
              <Zap size={12} className="text-white" />
            </div>
            <span className="text-xs font-semibold text-zinc-400">
              {scan.profiles?.username || 'Anonymous'}
            </span>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.06 + 0.35 }}
            className="flex items-center justify-between gap-2 pt-2 border-t border-zinc-700/50 mt-auto"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onLike?.(scan.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-all duration-200 btn-premium group/like"
            >
              <Heart size={14} className="group-hover/like:fill-rose-400 transition-all" />
              <span className="text-xs font-semibold">{scan.likes}</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 transition-all duration-200 btn-premium"
            >
              <Share2 size={14} />
              <span className="text-xs font-semibold hidden sm:inline">Share</span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
