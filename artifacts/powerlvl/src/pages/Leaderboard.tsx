import { motion } from 'framer-motion';
import { Trophy, Crown, Zap, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import TierBadge from '../components/TierBadge';
import CategorySelector from '../components/CategorySelector';
import AnimatedScore from '../components/AnimatedScore';
import { formatScore } from '../lib/scoring';
import { TIER_CONFIG, CATEGORIES } from '../lib/types';
import type { Tier, Category } from '../lib/types';

const LEADERBOARD_DATA: Record<Category | 'global', Array<{ rank: number; username: string; score: number; tier: Tier; totalScans: number; spike: string }>> = {
  global: [
    { rank: 1, username: 'ULTRAVIOLET_X', score: 99821, tier: 'SINGULAR' as Tier, totalScans: 284, spike: '+12,440' },
    { rank: 2, username: 'APEX_ENTITY', score: 97403, tier: 'SINGULAR' as Tier, totalScans: 156, spike: '+8,221' },
    { rank: 3, username: 'THE_HARBINGER', score: 95210, tier: 'SINGULAR' as Tier, totalScans: 412, spike: '+5,103' },
    { rank: 4, username: 'NEON_GHOST_7', score: 89334, tier: 'SINGULAR' as Tier, totalScans: 98, spike: '+2,890' },
    { rank: 5, username: 'CRIMSONWAVE', score: 84991, tier: 'VOLATILE' as Tier, totalScans: 201, spike: '+1,442' },
  ],
  fitness: [
    { rank: 1, username: 'IRONVEIL_PRO', score: 94203, tier: 'SINGULAR' as Tier, totalScans: 128, spike: '+6,720' },
    { rank: 2, username: 'DISCIPLINE_X', score: 87441, tier: 'VOLATILE' as Tier, totalScans: 203, spike: '+4,103' },
    { rank: 3, username: 'BEAST_MODE_7', score: 79882, tier: 'VOLATILE' as Tier, totalScans: 87, spike: '+2,841' },
    { rank: 4, username: 'PEAK_FORM', score: 68220, tier: 'CHARGED' as Tier, totalScans: 134, spike: '+1,220' },
    { rank: 5, username: 'GRIND_ETERNAL', score: 61033, tier: 'CHARGED' as Tier, totalScans: 211, spike: '+890' },
  ],
  setups: [
    { rank: 1, username: 'CODE_NEXUS', score: 91203, tier: 'SINGULAR' as Tier, totalScans: 76, spike: '+7,403' },
    { rank: 2, username: 'CYBER_TITAN', score: 86441, tier: 'VOLATILE' as Tier, totalScans: 142, spike: '+5,221' },
    { rank: 3, username: 'FOCUS_MASTER', score: 74882, tier: 'VOLATILE' as Tier, totalScans: 93, spike: '+3,110' },
    { rank: 4, username: 'TECH_OVERLORD', score: 65220, tier: 'CHARGED' as Tier, totalScans: 201, spike: '+1,884' },
    { rank: 5, username: 'PRODUCTIVITY_GOD', score: 58103, tier: 'CHARGED' as Tier, totalScans: 167, spike: '+921' },
  ],
  rides: [
    { rank: 1, username: 'DOMINANCE_EDGE', score: 98441, tier: 'SINGULAR' as Tier, totalScans: 94, spike: '+8,881' },
    { rank: 2, username: 'THREAT_LEVEL_X', score: 92203, tier: 'SINGULAR' as Tier, totalScans: 156, spike: '+6,224' },
    { rank: 3, username: 'AURA_UNLEASHED', score: 84110, tier: 'VOLATILE' as Tier, totalScans: 201, spike: '+3,934' },
    { rank: 4, username: 'POWER_SURGE', score: 71882, tier: 'CHARGED' as Tier, totalScans: 128, spike: '+2,441' },
    { rank: 5, username: 'VELOCITY_PRIME', score: 63304, tier: 'CHARGED' as Tier, totalScans: 87, spike: '+1,103' },
  ],
  drip: [
    { rank: 1, username: 'PRESENCE_UNLOCKED', score: 93882, tier: 'SINGULAR' as Tier, totalScans: 167, spike: '+7,334' },
    { rank: 2, username: 'STYLE_INCARNATE', score: 88441, tier: 'VOLATILE' as Tier, totalScans: 201, spike: '+5,124' },
    { rank: 3, username: 'AURA_RADIANT', score: 79203, tier: 'VOLATILE' as Tier, totalScans: 143, spike: '+3,104' },
    { rank: 4, username: 'RARITY_FLEX', score: 68110, tier: 'CHARGED' as Tier, totalScans: 119, spike: '+2,032' },
    { rank: 5, username: 'ELEGANCE_X', score: 59882, tier: 'CHARGED' as Tier, totalScans: 91, spike: '+1,241' },
  ],
  pets: [
    { rank: 1, username: 'CHAOS_DEITY', score: 96110, tier: 'SINGULAR' as Tier, totalScans: 54, spike: '+9,103' },
    { rank: 2, username: 'MENACE_SUPREME', score: 90221, tier: 'VOLATILE' as Tier, totalScans: 87, spike: '+6,884' },
    { rank: 3, username: 'INTELLIGENCE_PEAK', score: 82334, tier: 'VOLATILE' as Tier, totalScans: 76, spike: '+4,221' },
    { rank: 4, username: 'DIVINE_PRESENCE', score: 74882, tier: 'VOLATILE' as Tier, totalScans: 123, spike: '+2,334' },
    { rank: 5, username: 'BEAST_ENERGY', score: 61044, tier: 'CHARGED' as Tier, totalScans: 201, spike: '+1,104' },
  ],
  wildcard: [
    { rank: 1, username: 'ABSOLUTE_POWER', score: 100000, tier: 'LIMITLESS' as Tier, totalScans: 412, spike: '+100,000' },
    { rank: 2, username: 'CHAOS_REIGNS', score: 97331, tier: 'SINGULAR' as Tier, totalScans: 284, spike: '+8,003' },
    { rank: 3, username: 'UNDEFINED_FORCE', score: 91224, tier: 'SINGULAR' as Tier, totalScans: 198, spike: '+5,441' },
    { rank: 4, username: 'PURE_ESSENCE', score: 84103, tier: 'VOLATILE' as Tier, totalScans: 156, spike: '+3,204' },
    { rank: 5, username: 'LIMITLESS_AURA', score: 76882, tier: 'VOLATILE' as Tier, totalScans: 92, spike: '+2,103' },
  ],
};

const TOP3_IMAGES: Record<Category | 'global', [string, string, string]> = {
  global: [
    'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?w=200&h=200&fit=crop',
    'https://images.pexels.com/photos/2346216/pexels-photo-2346216.jpeg?w=200&h=200&fit=crop',
    'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?w=200&h=200&fit=crop',
  ],
  fitness: [
    'https://images.pexels.com/photos/4164840/pexels-photo-4164840.jpeg?w=200&h=200&fit=crop',
    'https://images.pexels.com/photos/3945656/pexels-photo-3945656.jpeg?w=200&h=200&fit=crop',
    'https://images.pexels.com/photos/949587/pexels-photo-949587.jpeg?w=200&h=200&fit=crop',
  ],
  setups: [
    'https://images.pexels.com/photos/574070/pexels-photo-574070.jpeg?w=200&h=200&fit=crop',
    'https://images.pexels.com/photos/3945691/pexels-photo-3945691.jpeg?w=200&h=200&fit=crop',
    'https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg?w=200&h=200&fit=crop',
  ],
  rides: [
    'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?w=200&h=200&fit=crop',
    'https://images.pexels.com/photos/338391/hummingbird-bird-birds-338391.jpeg?w=200&h=200&fit=crop',
    'https://images.pexels.com/photos/4622210/pexels-photo-4622210.jpeg?w=200&h=200&fit=crop',
  ],
  drip: [
    'https://images.pexels.com/photos/2769274/pexels-photo-2769274.jpeg?w=200&h=200&fit=crop',
    'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?w=200&h=200&fit=crop',
    'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?w=200&h=200&fit=crop',
  ],
  pets: [
    'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?w=200&h=200&fit=crop',
    'https://images.pexels.com/photos/2317904/pexels-photo-2317904.jpeg?w=200&h=200&fit=crop',
    'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?w=200&h=200&fit=crop',
  ],
  wildcard: [
    'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?w=200&h=200&fit=crop',
    'https://images.pexels.com/photos/2346216/pexels-photo-2346216.jpeg?w=200&h=200&fit=crop',
    'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?w=200&h=200&fit=crop',
  ],
};

export default function Leaderboard() {
  const [category, setCategory] = useState<Category>('wildcard');
  const data = LEADERBOARD_DATA[category];
  const images = TOP3_IMAGES[category];
  const categoryConfig = CATEGORIES[category];
  const top3 = data.slice(0, 3);
  const rest = data.slice(3);

  return (
    <div className="min-h-screen bg-black text-white pt-14">
      <div className="max-w-2xl mx-auto px-4 py-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <Trophy size={18} className={categoryConfig.color} />
            <span className="text-[10px] text-zinc-500 tracking-[0.4em] font-bold">{categoryConfig.emoji} {categoryConfig.label} RANKINGS</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight">Leaderboard</h1>
        </motion.div>

        {/* Category selector */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-10"
        >
          <div className="text-xs text-zinc-500 tracking-widest mb-3 font-bold">SELECT CATEGORY</div>
          <CategorySelector selected={category} onSelect={setCategory} />
        </motion.div>

        {/* Top 3 podium */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-12"
        >
          <div className="flex items-end justify-center gap-3 mb-6">
            {/* 2nd */}
            <div className="text-center flex-1">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="relative mx-auto w-16 h-16 rounded-xl overflow-hidden border-2 border-zinc-400/40 mb-2"
              >
                <img src={images[1]} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent" />
                <div className="absolute bottom-1 right-1 w-5 h-5 bg-zinc-400 rounded-full flex items-center justify-center">
                  <span className="text-[9px] font-black text-black">2</span>
                </div>
              </motion.div>
              <div className="text-xs font-bold truncate text-zinc-300">{top3[1].username}</div>
              <div className={`text-sm font-black ${TIER_CONFIG[top3[1].tier].color} mb-1 tabular-nums`}>
                <AnimatedScore score={top3[1].score} duration={1000} />
              </div>
              <TierBadge tier={top3[1].tier} size="sm" />
            </div>

            {/* 1st */}
            <div className="text-center flex-1">
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', damping: 12 }}
                className="relative mx-auto w-24 h-24 rounded-xl overflow-hidden border-2 border-amber-400/60 mb-2 shadow-[0_0_40px_rgba(245,158,11,0.3)]"
              >
                <img src={images[0]} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute -top-1 left-1/2 -translate-x-1/2">
                  <Crown size={20} className="text-amber-400 drop-shadow-lg" />
                </div>
                <div className="absolute bottom-1 right-1 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center">
                  <span className="text-[9px] font-black text-black">1</span>
                </div>
              </motion.div>
              <div className="text-sm font-black text-white">{top3[0].username}</div>
              <div className={`text-xl font-black ${TIER_CONFIG[top3[0].tier].color} mb-1 tabular-nums`}>
                <AnimatedScore score={top3[0].score} duration={1200} />
              </div>
              <TierBadge tier={top3[0].tier} size="md" />
            </div>

            {/* 3rd */}
            <div className="text-center flex-1">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="relative mx-auto w-14 h-14 rounded-xl overflow-hidden border-2 border-amber-800/40 mb-2"
              >
                <img src={images[2]} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent" />
                <div className="absolute bottom-1 right-1 w-5 h-5 bg-amber-800 rounded-full flex items-center justify-center">
                  <span className="text-[9px] font-black text-black">3</span>
                </div>
              </motion.div>
              <div className="text-xs font-bold truncate text-zinc-400">{top3[2].username}</div>
              <div className={`text-sm font-black ${TIER_CONFIG[top3[2].tier].color} mb-1 tabular-nums`}>
                <AnimatedScore score={top3[2].score} duration={1100} />
              </div>
              <TierBadge tier={top3[2].tier} size="sm" />
            </div>
          </div>
        </motion.div>

        {/* Rest of leaderboard */}
        <div className="space-y-2">
          {rest.map((entry, i) => {
            const tierConfig = TIER_CONFIG[entry.tier];
            return (
              <motion.div
                key={entry.rank}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.05 }}
                className="flex items-center gap-4 p-4 bg-zinc-900/50 border border-white/5 rounded-xl hover:border-white/10 transition-colors group"
              >
                <span className="text-zinc-600 text-sm font-black w-6 text-center">{entry.rank}</span>

                <div className="w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center border border-white/10 flex-shrink-0">
                  <Zap size={12} className="text-amber-400" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm truncate">{entry.username}</span>
                    <TierBadge tier={entry.tier} size="sm" />
                  </div>
                  <div className="text-zinc-600 text-xs mt-0.5">{entry.totalScans} scans</div>
                </div>

                <div className="text-right flex-shrink-0">
                  <div className={`text-base font-black ${tierConfig.color} tabular-nums`}>
                    <AnimatedScore score={entry.score} duration={800} />
                  </div>
                  <div className="text-emerald-400 text-[10px] flex items-center justify-end gap-0.5">
                    <TrendingUp size={9} />
                    {entry.spike}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Claim rank */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-8 p-4 border border-dashed border-zinc-700 rounded-xl text-center text-zinc-600 text-xs tracking-widest"
        >
          👑 SCAN YOUR POWER TO CLAIM YOUR RANK IN {categoryConfig.label.toUpperCase()}
        </motion.div>
      </div>
    </div>
  );
}
