import { motion } from 'framer-motion';
import type { ScanResult } from '../lib/scoring';
import { formatScore } from '../lib/scoring';
import { TIER_CONFIG, CATEGORIES, CATEGORY_STATS, formatStatValue } from '../lib/types';
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
  const catStats = CATEGORY_STATS[result.category];

  const topStats = Object.entries(result.categoryAttributes)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-sm mx-auto bg-black text-white overflow-hidden"
      style={{ aspectRatio: '9 / 16' }}
    >
      <div className="relative w-full h-full flex flex-col bg-gradient-to-b from-zinc-950 to-black p-4 border border-white/10">
        {/* Background grid */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

        {/* Tier glow backdrop */}
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{ background: `radial-gradient(ellipse at 50% 80%, ${tierConfig.glowColor}, transparent 70%)` }}
        />

        <div className="relative z-10 flex flex-col h-full justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-2 mb-2"
          >
            <div className="w-5 h-5 bg-amber-500 rounded-sm flex items-center justify-center">
              <span className="text-black font-black text-[10px]">⚡</span>
            </div>
            <span className="font-black text-[9px] tracking-[0.2em] text-amber-400">POWERLVL</span>
          </motion.div>

          {/* Image with HUD frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 }}
            className="flex-1 mb-3 rounded-lg overflow-hidden relative"
            style={{ border: `2px solid`, borderColor: tierConfig.glowColor }}
          >
            <img src={imageUrl} alt="Scan" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/70" />

            {/* Corner brackets */}
            {[
              'top-2 left-2 border-t-2 border-l-2',
              'top-2 right-2 border-t-2 border-r-2',
              'bottom-2 left-2 border-b-2 border-l-2',
              'bottom-2 right-2 border-b-2 border-r-2',
            ].map((pos, i) => (
              <div key={i} className={`absolute ${pos} w-3 h-3`} style={{ borderColor: tierConfig.glowColor, opacity: 0.7 }} />
            ))}

            {/* Category label */}
            <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded border border-white/10">
              <span className="text-[8px] font-black tracking-widest">
                {categoryConfig.emoji} {categoryConfig.label}
              </span>
            </div>

            {/* HUD ID */}
            <div className="absolute bottom-2 left-2 text-[7px] font-mono tracking-widest opacity-40">
              PWR_SCAN_CONFIRMED
            </div>
          </motion.div>

          {/* Score — dominant centerpiece */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring', damping: 14 }}
            className="mb-1"
          >
            <div
              className="text-5xl font-black leading-none"
              style={{ color: tierConfig.glowColor, textShadow: `0 0 30px ${tierConfig.glowColor}` }}
            >
              {formatScore(result.score)}
            </div>
          </motion.div>

          {/* Tier badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.28 }}
            className="mb-2.5"
          >
            <TierBadge tier={result.tier} size="md" />
          </motion.div>

          {/* Divider with tier color */}
          <div className="h-px mb-2.5" style={{ background: `linear-gradient(to right, transparent, ${tierConfig.glowColor}, transparent)` }} />

          {/* Description */}
          {description && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.32 }}
              className="mb-2 text-[11px] text-zinc-300 italic leading-snug line-clamp-2"
            >
              "{description}"
            </motion.div>
          )}

          {/* Commentary */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.36 }}
            className="mb-3 text-[11px] text-zinc-400 italic leading-tight"
          >
            "{result.commentary}"
          </motion.div>

          {/* Top stats — large, cinematic */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.42 }}
            className="space-y-2 mb-3"
          >
            {topStats.map(([key, val]) => {
              const statDef = catStats.find(s => s.label === key);
              const format = statDef?.format || 'number';
              const displayVal = formatStatValue(val, format);

              return (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-[9px] font-bold tracking-widest text-zinc-600 truncate mr-2">
                    {key}
                  </span>
                  <span
                    className="font-black text-sm flex-shrink-0"
                    style={{ color: tierConfig.glowColor }}
                  >
                    {displayVal}
                  </span>
                </div>
              );
            })}
          </motion.div>

          {/* Global stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.48 }}
            className="grid grid-cols-4 gap-1 mb-3"
          >
            {(['AURA', 'POWER', 'STATUS', 'THREAT'] as const).map((stat, i) => {
              const raw = [result.attributes.aura, result.attributes.power, result.attributes.status, result.attributes.threat][i];
              const scaled = Math.round(raw * 97 + raw * 2.3);
              return (
                <div key={stat} className="bg-white/5 rounded p-1.5 text-center">
                  <div className="text-[10px] font-black text-white tabular-nums">{scaled.toLocaleString()}</div>
                  <div className="text-[7px] text-zinc-600 tracking-widest mt-0.5">{stat}</div>
                </div>
              );
            })}
          </motion.div>

          {/* Footer divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent mb-2" />

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.52 }}
            className="text-center space-y-0.5"
          >
            <div className="text-[9px] text-zinc-500 tracking-widest font-semibold">@{username.toUpperCase()}</div>
            <div className="text-[9px] text-zinc-700 tracking-wide">powerlvl.app — everything has a power level.</div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
