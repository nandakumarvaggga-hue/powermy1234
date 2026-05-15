import { motion } from 'framer-motion';
import { Trophy, Crown, Zap, TrendingUp, Sparkles } from 'lucide-react';
import { useState } from 'react';
import TierBadge from '../components/TierBadge';
import CategorySelector from '../components/CategorySelector';
import AnimatedScore from '../components/AnimatedScore';
import { TIER_CONFIG, CATEGORY_CONFIG } from '../lib/config/tier-config';
import type { Tier, Category } from '../lib/types';

const LEADERBOARD_DATA: Record<Category, Array<{ rank: number; username: string; score: number; tier: Tier; totalScans: number; spike: string }>> = {
  setups: [
    { rank: 1, username: 'CODE_NEXUS', score: 97203, tier: 'SS-TIER' as Tier, totalScans: 76, spike: '+9,403' },
    { rank: 2, username: 'CYBER_TITAN', score: 91441, tier: 'SS-TIER' as Tier, totalScans: 142, spike: '+6,221' },
    { rank: 3, username: 'FOCUS_MASTER', score: 84882, tier: 'S-TIER' as Tier, totalScans: 93, spike: '+4,110' },
    { rank: 4, username: 'TECH_OVERLORD', score: 72220, tier: 'S-TIER' as Tier, totalScans: 201, spike: '+2,884' },
    { rank: 5, username: 'PRODUCTIVITY_GOD', score: 65103, tier: 'S-TIER' as Tier, totalScans: 167, spike: '+1,921' },
  ],
  fitness: [
    { rank: 1, username: 'IRONVEIL_PRO', score: 94203, tier: 'SS-TIER' as Tier, totalScans: 128, spike: '+6,720' },
    { rank: 2, username: 'DISCIPLINE_X', score: 87441, tier: 'SS-TIER' as Tier, totalScans: 203, spike: '+4,103' },
    { rank: 3, username: 'BEAST_MODE_7', score: 79882, tier: 'S-TIER' as Tier, totalScans: 87, spike: '+2,841' },
    { rank: 4, username: 'PEAK_FORM', score: 68220, tier: 'S-TIER' as Tier, totalScans: 134, spike: '+1,220' },
    { rank: 5, username: 'GRIND_ETERNAL', score: 61033, tier: 'S-TIER' as Tier, totalScans: 211, spike: '+890' },
  ],
  rides: [
    { rank: 1, username: 'DOMINANCE_EDGE', score: 98441, tier: 'SS-TIER' as Tier, totalScans: 94, spike: '+8,881' },
    { rank: 2, username: 'THREAT_LEVEL_X', score: 92203, tier: 'SS-TIER' as Tier, totalScans: 156, spike: '+6,224' },
    { rank: 3, username: 'AURA_UNLEASHED', score: 84110, tier: 'S-TIER' as Tier, totalScans: 201, spike: '+3,934' },
    { rank: 4, username: 'POWER_SURGE', score: 71882, tier: 'S-TIER' as Tier, totalScans: 128, spike: '+2,441' },
    { rank: 5, username: 'VELOCITY_PRIME', score: 63304, tier: 'S-TIER' as Tier, totalScans: 87, spike: '+1,103' },
  ],
  drip: [
    { rank: 1, username: 'PRESENCE_UNLOCKED', score: 93882, tier: 'SS-TIER' as Tier, totalScans: 167, spike: '+7,334' },
    { rank: 2, username: 'STYLE_INCARNATE', score: 88441, tier: 'SS-TIER' as Tier, totalScans: 201, spike: '+5,124' },
    { rank: 3, username: 'AURA_RADIANT', score: 79203, tier: 'S-TIER' as Tier, totalScans: 143, spike: '+3,104' },
    { rank: 4, username: 'RARITY_FLEX', score: 68110, tier: 'S-TIER' as Tier, totalScans: 119, spike: '+2,032' },
    { rank: 5, username: 'ELEGANCE_X', score: 59882, tier: 'A-TIER' as Tier, totalScans: 91, spike: '+1,241' },
  ],
  pets: [
    { rank: 1, username: 'CHAOS_DEITY', score: 96110, tier: 'SS-TIER' as Tier, totalScans: 54, spike: '+9,103' },
    { rank: 2, username: 'MENACE_SUPREME', score: 90221, tier: 'SS-TIER' as Tier, totalScans: 87, spike: '+6,884' },
    { rank: 3, username: 'INTELLIGENCE_PEAK', score: 82334, tier: 'S-TIER' as Tier, totalScans: 76, spike: '+4,221' },
    { rank: 4, username: 'DIVINE_PRESENCE', score: 74882, tier: 'S-TIER' as Tier, totalScans: 123, spike: '+2,334' },
    { rank: 5, username: 'BEAST_ENERGY', score: 61044, tier: 'S-TIER' as Tier, totalScans: 201, spike: '+1,104' },
  ],
  wildcard: [
    { rank: 1, username: 'ABSOLUTE_POWER', score: 100000, tier: 'LIMITLESS' as Tier, totalScans: 412, spike: '+100,000' },
    { rank: 2, username: 'CHAOS_REIGNS', score: 97331, tier: 'SS-TIER' as Tier, totalScans: 284, spike: '+8,003' },
    { rank: 3, username: 'UNDEFINED_FORCE', score: 91224, tier: 'SS-TIER' as Tier, totalScans: 198, spike: '+5,441' },
    { rank: 4, username: 'PURE_ESSENCE', score: 84103, tier: 'S-TIER' as Tier, totalScans: 156, spike: '+3,204' },
    { rank: 5, username: 'LIMITLESS_AURA', score: 76882, tier: 'S-TIER' as Tier, totalScans: 92, spike: '+2,103' },
  ],
};

const TOP3_IMAGES: Record<Category, [string, string, string]> = {
  setups: [
    'https://images.pexels.com/photos/574070/pexels-photo-574070.jpeg?w=200&h=200&fit=crop',
    'https://images.pexels.com/photos/3945691/pexels-photo-3945691.jpeg?w=200&h=200&fit=crop',
    'https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg?w=200&h=200&fit=crop',
  ],
  fitness: [
    'https://images.pexels.com/photos/4164840/pexels-photo-4164840.jpeg?w=200&h=200&fit=crop',
    'https://images.pexels.com/photos/3945656/pexels-photo-3945656.jpeg?w=200&h=200&fit=crop',
    'https://images.pexels.com/photos/949587/pexels-photo-949587.jpeg?w=200&h=200&fit=crop',
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
  const [category, setCategory] = useState<Category>('setups');
  const data = LEADERBOARD_DATA[category];
  const images = TOP3_IMAGES[category];
  const categoryConfig = CATEGORY_CONFIG[category];
  const top3 = data.slice(0, 3);
  const rest = data.slice(3);

  const isLimitlessTop = top3[0]?.tier === 'LIMITLESS';

  return (
    <div className="min-h-screen bg-black text-white pt-14">
      <div className="max-w-2xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <Trophy size={18} className={categoryConfig.color} />
            <span className="text-[10px] text-zinc-500 tracking-[0.4em] font-bold">
              {categoryConfig.emoji} {categoryConfig.label} RANKINGS
            </span>
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
          <div className="text-[10px] text-zinc-500 tracking-[0.3em] mb-3 font-bold">SELECT CATEGORY</div>
          <CategorySelector selected={category} onSelect={setCategory} />
        </motion.div>

        {/* Top 3 podium */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          key={category}
          className="mb-12"
        >
          <div className="flex items-end justify-center gap-3 mb-8">
            {/* 2nd Place */}
            <div className="text-center flex-1">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="relative mx-auto w-16 h-16 rounded-xl overflow-hidden border-2 border-zinc-400/40 mb-2"
              >
                <img src={images[1]} className="w-full h-full object-cover" alt="2nd place" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent" />
                <div className="absolute bottom-1 right-1 w-5 h-5 bg-zinc-400 rounded-full flex items-center justify-center">
                  <span className="text-[9px] font-black text-black">2</span>
                </div>
              </motion.div>
              <div className="text-xs font-bold truncate text-zinc-300">{top3[1]?.username}</div>
              <div className={`text-sm font-black ${TIER_CONFIG[top3[1]?.tier || 'D-TIER'].color} mb-1 tabular-nums score-display`}>
                <AnimatedScore score={top3[1]?.score || 0} duration={1000} />
              </div>
              <TierBadge tier={top3[1]?.tier || 'D-TIER'} size="sm" />
            </div>

            {/* 1st Place */}
            <div className="text-center flex-1">
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', damping: 12 }}
                className={`relative mx-auto w-24 h-24 rounded-xl overflow-hidden border-2 mb-2 ${
                  isLimitlessTop 
                    ? 'border-amber-400 shadow-[0_0_60px_rgba(245,158,11,0.4)]' 
                    : 'border-amber-400/60 shadow-[0_0_40px_rgba(245,158,11,0.25)]'
                }`}
              >
                <img src={images[0]} className="w-full h-full object-cover" alt="1st place" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute -top-0.5 left-1/2 -translate-x-1/2">
                  <Crown size={22} className="text-amber-400 drop-shadow-lg" />
                </div>
                <div className="absolute bottom-1 right-1 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center">
                  <span className="text-[9px] font-black text-black">1</span>
                </div>
              </motion.div>
              <div className="text-sm font-black text-white">{top3[0]?.username}</div>
              <div 
                className={`text-xl font-black ${TIER_CONFIG[top3[0]?.tier || 'D-TIER'].color} mb-1 tabular-nums score-display`}
                style={{
                  textShadow: isLimitlessTop ? '0 0 30px rgba(245, 158, 11, 0.5)' : undefined
                }}
              >
                <AnimatedScore score={top3[0]?.score || 0} duration={1200} />
              </div>
              <TierBadge tier={top3[0]?.tier || 'D-TIER'} size="md" />
            </div>

            {/* 3rd Place */}
            <div className="text-center flex-1">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="relative mx-auto w-14 h-14 rounded-xl overflow-hidden border-2 border-amber-800/40 mb-2"
              >
                <img src={images[2]} className="w-full h-full object-cover" alt="3rd place" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent" />
                <div className="absolute bottom-1 right-1 w-5 h-5 bg-amber-800 rounded-full flex items-center justify-center">
                  <span className="text-[9px] font-black text-black">3</span>
                </div>
              </motion.div>
              <div className="text-xs font-bold truncate text-zinc-400">{top3[2]?.username}</div>
              <div className={`text-sm font-black ${TIER_CONFIG[top3[2]?.tier || 'D-TIER'].color} mb-1 tabular-nums score-display`}>
                <AnimatedScore score={top3[2]?.score || 0} duration={1100} />
              </div>
              <TierBadge tier={top3[2]?.tier || 'D-TIER'} size="sm" />
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
                transition={{ delay: 0.4 + i * 0.06 }}
                whileHover={{ x: 4 }}
                className="flex items-center gap-4 p-4 bg-zinc-900/60 border border-white/5 rounded-xl hover:border-white/10 transition-all group cursor-pointer"
              >
                <span className="text-zinc-600 text-sm font-black w-6 text-center">{entry.rank}</span>

                <div className="w-9 h-9 bg-zinc-800 rounded-lg flex items-center justify-center border border-white/5 flex-shrink-0 group-hover:border-amber-500/30 transition-colors">
                  <Zap size={14} className="text-amber-400" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm truncate">{entry.username}</span>
                    <TierBadge tier={entry.tier} size="sm" />
                  </div>
                  <div className="text-zinc-600 text-[10px] mt-0.5 tracking-wide">{entry.totalScans} scans</div>
                </div>

                <div className="text-right flex-shrink-0">
                  <div className={`text-base font-black ${tierConfig.color} tabular-nums score-display`}>
                    <AnimatedScore score={entry.score} duration={800} />
                  </div>
                  <div className="text-emerald-400 text-[10px] flex items-center justify-end gap-0.5 font-bold">
                    <TrendingUp size={10} />
                    {entry.spike}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Category stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className={`mt-10 p-5 rounded-xl border ${categoryConfig.borderColor} ${categoryConfig.bgColor}`}
        >
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={14} className={categoryConfig.color} />
            <span className="text-xs font-bold tracking-widest text-zinc-400">
              {categoryConfig.label} CATEGORY STATS
            </span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className={`text-xl font-black ${categoryConfig.color}`}>
                {data.reduce((sum, e) => sum + e.totalScans, 0).toLocaleString()}
              </div>
              <div className="text-[10px] text-zinc-500 tracking-widest mt-1">TOTAL SCANS</div>
            </div>
            <div className="text-center">
              <div className={`text-xl font-black ${categoryConfig.color}`}>
                {Math.round(data.reduce((sum, e) => sum + e.score, 0) / data.length).toLocaleString()}
              </div>
              <div className="text-[10px] text-zinc-500 tracking-widest mt-1">AVG POWER</div>
            </div>
            <div className="text-center">
              <div className={`text-xl font-black ${categoryConfig.color}`}>
                {data.length}
              </div>
              <div className="text-[10px] text-zinc-500 tracking-widest mt-1">TOP USERS</div>
            </div>
          </div>
        </motion.div>

        {/* Claim rank CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 p-5 border border-dashed border-zinc-800 rounded-xl text-center"
        >
          <p className="text-zinc-600 text-xs tracking-[0.2em] mb-1">
            {categoryConfig.emoji} CLAIM YOUR RANK IN {categoryConfig.label.toUpperCase()}
          </p>
          <p className="text-zinc-700 text-[10px] tracking-widest">
            SCAN YOUR POWER TO ENTER THE LEADERBOARD
          </p>
        </motion.div>
      </div>
    </div>
  );
}
