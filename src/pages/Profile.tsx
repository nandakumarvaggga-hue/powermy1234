import { motion } from 'framer-motion';
import { Zap, Award, BarChart2, TrendingUp, Star, Trophy, Flame } from 'lucide-react';
import { useState } from 'react';
import TierBadge from '../components/TierBadge';
import CategorySelector from '../components/CategorySelector';
import AnimatedScore from '../components/AnimatedScore';
import { formatScore } from '../lib/scoring';
import { TIER_CONFIG, CATEGORIES } from '../lib/types';
import type { Tier, Category } from '../lib/types';

const MOCK_PROFILE = {
  username: 'SCANNER_USER',
  totalScans: 24,
  highestScore: 87432,
  tier: 'SINGULAR' as Tier,
  joinDate: 'JAN 2025',
  globalRank: 142,
};

const CATEGORY_STATS: Record<Category, { topScore: number; rank: number; scans: number }> = {
  setups: { topScore: 87432, rank: 28, scans: 8 },
  fitness: { topScore: 74221, rank: 142, scans: 4 },
  rides: { topScore: 62105, rank: 89, scans: 2 },
  drip: { topScore: 45882, rank: 456, scans: 3 },
  pets: { topScore: 96741, rank: 12, scans: 5 },
  wildcard: { topScore: 100000, rank: 1, scans: 2 },
};

const ACHIEVEMENTS = [
  { id: 'first_scan', label: 'First Scan', icon: Zap, unlocked: true },
  { id: 'volatile', label: 'Volatile Achieved', icon: Flame, unlocked: true },
  { id: 'singular', label: 'Singular Status', icon: Star, unlocked: true },
  { id: 'top_100', label: 'Top 100 Global', icon: Trophy, unlocked: false },
  { id: 'limitless', label: 'LIMITLESS', icon: Award, unlocked: false },
];

const MOCK_SCAN_HISTORY = [
  { id: '1', image: 'https://images.pexels.com/photos/574070/pexels-photo-574070.jpeg?w=300&h=300&fit=crop', score: 87432, tier: 'SINGULAR' as Tier, category: 'setups' as Category, timeAgo: '2h ago' },
  { id: '2', image: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?w=300&h=300&fit=crop', score: 74221, tier: 'VOLATILE' as Tier, category: 'fitness' as Category, timeAgo: '1d ago' },
  { id: '3', image: 'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?w=300&h=300&fit=crop', score: 62105, tier: 'VOLATILE' as Tier, category: 'rides' as Category, timeAgo: '2d ago' },
  { id: '4', image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?w=300&h=300&fit=crop', score: 96741, tier: 'SINGULAR' as Tier, category: 'pets' as Category, timeAgo: '3d ago' },
  { id: '5', image: 'https://images.pexels.com/photos/2769274/pexels-photo-2769274.jpeg?w=300&h=300&fit=crop', score: 45882, tier: 'CHARGED' as Tier, category: 'drip' as Category, timeAgo: '5d ago' },
  { id: '6', image: 'https://images.pexels.com/photos/2346216/pexels-photo-2346216.jpeg?w=300&h=300&fit=crop', score: 100000, tier: 'LIMITLESS' as Tier, category: 'wildcard' as Category, timeAgo: '1w ago' },
];

export default function Profile({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [selectedCategory, setSelectedCategory] = useState<Category>('setups');
  const categoryStats = CATEGORY_STATS[selectedCategory];
  const categoryConfig = CATEGORIES[selectedCategory];

  // Find best category
  const bestCategory = Object.entries(CATEGORY_STATS).reduce((best, [cat, stats]) => {
    return stats.topScore > (CATEGORY_STATS[best as Category]?.topScore || 0) ? cat : best;
  }, 'setups' as string) as Category;

  return (
    <div className="min-h-screen bg-black text-white pt-14">
      <div className="max-w-2xl mx-auto px-4 py-8 md:py-12">
        {/* Profile header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 12, stiffness: 150, delay: 0.1 }}
            className="mx-auto w-24 h-24 bg-gradient-to-br from-amber-500/20 to-amber-500/5 rounded-2xl border-2 border-amber-500/30 flex items-center justify-center mb-5 shadow-[0_0_60px_rgba(245,158,11,0.15)]"
          >
            <Zap size={40} className="text-amber-400" />
          </motion.div>
          <h1 className="text-2xl font-black tracking-wide">{MOCK_PROFILE.username}</h1>
          <p className="text-zinc-600 text-xs tracking-[0.3em] mt-1.5">SINCE {MOCK_PROFILE.joinDate}</p>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4"
          >
            <TierBadge tier={MOCK_PROFILE.tier} size="lg" />
          </motion.div>
        </motion.div>

        {/* Main stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-3 gap-3 mb-10"
        >
          {[
            { label: 'TOTAL SCANS', value: MOCK_PROFILE.totalScans.toString(), icon: <BarChart2 size={16} className="text-cyan-400" /> },
            { label: 'PEAK POWER', value: MOCK_PROFILE.highestScore, animated: true, icon: <TrendingUp size={16} className="text-amber-400" /> },
            { label: 'GLOBAL RANK', value: `#${MOCK_PROFILE.globalRank}`, icon: <Award size={16} className="text-rose-400" /> },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.06 }}
              className="bg-zinc-900/60 border border-white/5 rounded-xl p-4 text-center hover:border-white/10 transition-colors"
            >
              <div className="flex justify-center mb-2">{stat.icon}</div>
              <div className="text-xl font-black tabular-nums score-display">
                {stat.animated ? (
                  <AnimatedScore score={stat.value as number} duration={1000} />
                ) : (
                  stat.value
                )}
              </div>
              <div className="text-[9px] text-zinc-600 tracking-[0.25em] mt-1.5 font-bold">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mb-10"
        >
          <div className="text-[10px] text-zinc-500 tracking-[0.3em] mb-4 font-bold flex items-center gap-2">
            <Trophy size={12} className="text-amber-400" />
            ACHIEVEMENTS
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {ACHIEVEMENTS.map((achievement) => (
              <motion.div
                key={achievement.id}
                whileHover={{ scale: 1.05 }}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all ${
                  achievement.unlocked
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                    : 'bg-zinc-900/50 border-zinc-800 text-zinc-600'
                }`}
              >
                <achievement.icon size={14} />
                <span className="text-xs font-bold tracking-wide">{achievement.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Category specialization */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-6"
        >
          <div className="text-[10px] text-zinc-500 tracking-[0.3em] mb-3 font-bold flex items-center gap-2">
            <Star size={12} className="text-amber-400" />
            CATEGORY STATS
          </div>
          <CategorySelector selected={selectedCategory} onSelect={setSelectedCategory} />
        </motion.div>

        {/* Category stats card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          key={selectedCategory}
          className={`rounded-xl border p-5 mb-10 ${categoryConfig.borderColor} ${categoryConfig.bgColor}`}
        >
          <div className="flex items-start justify-between mb-5">
            <div>
              <div className={`text-xl font-black ${categoryConfig.color} mb-1.5`}>
                {categoryConfig.emoji} {categoryConfig.label}
              </div>
              <p className="text-zinc-400 text-sm">{categoryConfig.description}</p>
            </div>
            {bestCategory === selectedCategory && (
              <div className="bg-amber-500/20 border border-amber-500/30 px-2 py-1 rounded text-[10px] font-bold text-amber-400 tracking-widest">
                BEST
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-black/30 rounded-lg p-3 text-center">
              <div className={`text-lg font-black ${categoryConfig.color} tabular-nums score-display`}>
                <AnimatedScore score={categoryStats.topScore} duration={800} />
              </div>
              <div className="text-[9px] text-zinc-500 tracking-widest mt-1">TOP SCORE</div>
            </div>
            <div className="bg-black/30 rounded-lg p-3 text-center">
              <div className="text-lg font-black text-amber-400">#{categoryStats.rank}</div>
              <div className="text-[9px] text-zinc-500 tracking-widest mt-1">RANK</div>
            </div>
            <div className="bg-black/30 rounded-lg p-3 text-center">
              <div className="text-lg font-black text-cyan-400">{categoryStats.scans}</div>
              <div className="text-[9px] text-zinc-500 tracking-widest mt-1">SCANS</div>
            </div>
          </div>
        </motion.div>

        {/* Scan history */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-[10px] text-zinc-500 tracking-[0.3em] mb-4 font-bold flex items-center gap-2">
            <Flame size={12} className="text-amber-400" />
            SCAN HISTORY
          </div>
          <div className="grid grid-cols-3 gap-2 mb-8">
            {MOCK_SCAN_HISTORY.map((scan, i) => {
              const config = TIER_CONFIG[scan.tier];
              const catConfig = CATEGORIES[scan.category];
              const isLimitless = scan.tier === 'LIMITLESS';
              return (
                <motion.div
                  key={scan.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.55 + i * 0.05 }}
                  whileHover={{ scale: 1.04 }}
                  className={`relative aspect-square rounded-xl overflow-hidden group cursor-pointer border transition-all ${
                    isLimitless 
                      ? 'border-amber-400/40 shadow-[0_0_20px_rgba(245,158,11,0.2)]' 
                      : 'border-white/5 hover:border-white/15'
                  }`}
                >
                  <img 
                    src={scan.image} 
                    alt={`Scan ${scan.id}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                  {/* Score */}
                  <div className="absolute bottom-2 left-2 right-2">
                    <div 
                      className={`text-sm font-black ${config.color} leading-none score-display`}
                      style={{
                        textShadow: isLimitless ? '0 0 20px rgba(245, 158, 11, 0.6)' : '0 0 10px rgba(0,0,0,0.8)'
                      }}
                    >
                      {formatScore(scan.score)}
                    </div>
                    <div className="mt-1">
                      <TierBadge tier={scan.tier} size="sm" />
                    </div>
                  </div>

                  {/* Category badge */}
                  <div className="absolute top-2 right-2">
                    <span className={`text-base ${catConfig.color}`}>{catConfig.emoji}</span>
                  </div>

                  {/* Corner accent */}
                  <div className={`absolute top-2 left-2 w-3 h-3 border-t border-l ${isLimitless ? 'border-amber-400/60' : 'border-amber-500/30'}`} />
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center"
        >
          <button
            onClick={() => onNavigate('scanner')}
            className="inline-flex items-center gap-2.5 bg-amber-500 hover:bg-amber-400 text-black font-black text-sm tracking-widest px-10 py-5 rounded-xl transition-all shadow-[0_0_40px_rgba(245,158,11,0.25)] hover:shadow-[0_0_60px_rgba(245,158,11,0.4)]"
          >
            <Zap size={16} className="fill-black" />
            SCAN NEXT POWER
          </button>
        </motion.div>
      </div>
    </div>
  );
}
