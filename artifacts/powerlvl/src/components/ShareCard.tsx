import { motion } from 'framer-motion';
import type { ScanResult } from '../lib/scoring';
import type { Category } from '../lib/types';
import { formatScore } from '../lib/scoring';
import { TIER_CONFIG, CATEGORIES } from '../lib/types';
import TierBadge from './TierBadge';

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

  // Dominant attributes to display
  const displayAttrs = Object.entries(result.categoryAttributes)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-sm mx-auto bg-black text-white overflow-hidden"
      style={{ aspectRatio: '9 / 16' }}
    >
      {/* Outer frame */}
      <div className="relative w-full h-full flex flex-col bg-gradient-to-b from-zinc-900 to-black p-4 border border-white/10">
        {/* Background grid - subtle */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

        {/* Content stack */}
        <div className="relative z-10 flex flex-col h-full justify-between">
          {/* Top: POWERLVL Logo */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-2 mb-2"
          >
            <div className="w-5 h-5 bg-amber-500 rounded-sm flex items-center justify-center">
              <span className="text-black font-black text-[10px]">⚡</span>
            </div>
            <span className="font-black text-[9px] tracking-[0.15em] text-amber-400">POWERLVL</span>
          </motion.div>

          {/* Middle: Image with premium HUD frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 }}
            className="flex-1 mb-3 rounded-lg overflow-hidden border-2 border-amber-500/50 relative"
          >
            <img
              src={imageUrl}
              alt="Scan"
              className="w-full h-full object-cover"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />

            {/* Corner brackets - premium scanner aesthetic */}
            {[
              'top-2 left-2 border-t-2 border-l-2',
              'top-2 right-2 border-t-2 border-r-2',
              'bottom-2 left-2 border-b-2 border-l-2',
              'bottom-2 right-2 border-b-2 border-r-2',
            ].map((pos, i) => (
              <div
                key={i}
                className={`absolute ${pos} w-3 h-3 border-amber-400/60`}
              />
            ))}

            {/* Category label - top right */}
            <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded border border-white/10">
              <span className="text-[8px] font-black tracking-widest">
                {categoryConfig.emoji} {categoryConfig.label}
              </span>
            </div>
          </motion.div>

          {/* Score Block - HUGE and Dominant */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring', damping: 15 }}
            className="mb-1.5"
          >
            <div className={`text-6xl font-black ${tierConfig.color} leading-none drop-shadow-lg`}>
              {formatScore(result.score)}
            </div>
          </motion.div>

          {/* Tier Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-2"
          >
            <TierBadge tier={result.tier} size="md" />
          </motion.div>

          {/* Category highlight line */}
          <div className={`h-px bg-gradient-to-r from-transparent via-${categoryConfig.color.split('-')[1]}-500 to-transparent mb-2.5`} />

          {/* Description - if provided */}
          {description && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="mb-2 text-[11px] text-zinc-300 italic leading-snug line-clamp-2"
            >
              "{description}"
            </motion.div>
          )}

          {/* Commentary */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-2.5 text-xs text-zinc-300 italic leading-tight"
          >
            "{result.commentary}"
          </motion.div>

          {/* Attributes Grid - compact */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="space-y-1 mb-2.5"
          >
            {displayAttrs.map(([key, val], i) => (
              <div key={key} className="flex items-center justify-between text-[10px]">
                <span className="text-zinc-500 font-semibold tracking-wider">
                  {key.toUpperCase().slice(0, 6)}
                </span>
                <div className="flex-1 h-px bg-zinc-800 mx-2" />
                <span className={`font-black ${tierConfig.color}`}>{val}</span>
              </div>
            ))}
          </motion.div>

          {/* Footer divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent mb-2" />

          {/* Footer: User + Tagline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center space-y-1"
          >
            <div className="text-[9px] text-zinc-500 tracking-widest font-semibold">
              @{username.toUpperCase()}
            </div>
            <div className="text-[10px] text-zinc-600 font-light tracking-wide">
              Everything has a power level.
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
