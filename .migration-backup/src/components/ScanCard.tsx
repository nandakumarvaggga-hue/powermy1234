import { motion } from 'framer-motion';
import { Heart, Zap } from 'lucide-react';
import type { Scan } from '../lib/types';
import { TIER_CONFIG } from '../lib/types';
import TierBadge from './TierBadge';
import { formatScore } from '../lib/scoring';

interface ScanCardProps {
  scan: Scan;
  index?: number;
  onLike?: (scanId: string) => void;
}

export default function ScanCard({ scan, index = 0, onLike }: ScanCardProps) {
  const tierConfig = TIER_CONFIG[scan.tier];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group bg-zinc-900 border border-white/5 rounded-lg overflow-hidden hover:border-white/10 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-zinc-800">
        <img
          src={scan.image_url}
          alt="Scanned"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Score overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-3">
          <div className={`text-2xl font-black ${tierConfig.color}`}>
            {formatScore(scan.score)}
          </div>
          <TierBadge tier={scan.tier} size="sm" />
        </div>
      </div>

      {/* Content */}
      <div className="p-3 space-y-2">
        <p className="text-zinc-400 text-xs leading-relaxed line-clamp-2">{scan.commentary}</p>
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 bg-zinc-700 rounded-full flex items-center justify-center">
              <Zap size={10} className="text-amber-400" />
            </div>
            <span className="text-zinc-500 text-xs">
              {scan.profiles?.username || 'Anonymous'}
            </span>
          </div>
          <button
            onClick={() => onLike?.(scan.id)}
            className="flex items-center gap-1 text-zinc-500 hover:text-rose-400 transition-colors"
          >
            <Heart size={13} />
            <span className="text-xs">{scan.likes}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
