import { motion } from 'framer-motion';
import { Zap, Award, BarChart2, TrendingUp, Star } from 'lucide-react';
import { useState } from 'react';
import TierBadge from '../components/TierBadge';
import CategorySelector from '../components/CategorySelector';
import AnimatedScore from '../components/AnimatedScore';
import { formatScore } from '../lib/scoring';
import { TIER_CONFIG, CATEGORIES } from '../lib/types';
import type { Tier, Category } from '../lib/types';

const MOCK_PROFILE = {
  username: 'SCANNER_USER',
  totalScans: 14,
  highestScore: 87432,
  tier: 'SINGULAR' as Tier,
  joinDate: 'JAN 2025',
};

const CATEGORY_STATS: Record<Category, { topScore: number; rank: number; scans: number }> = {
  fitness: { topScore: 87432, rank: 142, scans: 4 },
  setups: { topScore: 74221, rank: 311, scans: 3 },
  rides: { topScore: 62105, rank: 89, scans: 2 },
  drip: { topScore: 45882, rank: 456, scans: 1 },
  pets: { topScore: 38654, rank: 712, scans: 3 },
  wildcard: { topScore: 96741, rank: 28, scans: 1 },
};

const MOCK_SCAN_HISTORY = [
  { id: '1', image: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?w=300&h=300&fit=crop', score: 87432, tier: 'SINGULAR' as Tier, category: 'fitness' as Category, timeAgo: '2h ago' },
  { id: '2', image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?w=300&h=300&fit=crop', score: 74221, tier: 'VOLATILE' as Tier, category: 'setups' as Category, timeAgo: '1d ago' },
  { id: '3', image: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?w=300&h=300&fit=crop', score: 62105, tier: 'VOLATILE' as Tier, category: 'rides' as Category, timeAgo: '2d ago' },
  { id: '4', image: 'https://images.pexels.com/photos/2346216/pexels-photo-2346216.jpeg?w=300&h=300&fit=crop', score: 96741, tier: 'SINGULAR' as Tier, category: 'wildcard' as Category, timeAgo: '3d ago' },
  { id: '5', image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?w=300&h=300&fit=crop', score: 45882, tier: 'CHARGED' as Tier, category: 'drip' as Category, timeAgo: '5d ago' },
  { id: '6', image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?w=300&h=300&fit=crop', score: 38654, tier: 'CHARGED' as Tier, category: 'pets' as Category, timeAgo: '1w ago' },
];

export default function Profile({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [selectedCategory, setSelectedCategory] = useState<Category>('fitness');
  const categoryStats = CATEGORY_STATS[selectedCategory];
  const categoryConfig = CATEGORIES[selectedCategory];

  return (
    <div className="min-h-screen bg-black text-white pt-14">
      <div className="max-w-2xl mx-auto px-4 py-10">
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
            className="mx-auto w-20 h-20 bg-gradient-to-br from-amber-500/30 to-amber-500/10 rounded-full border-2 border-amber-500/30 flex items-center justify-center mb-4 shadow-[0_0_40px_rgba(245,158,11,0.15)]"
          >
            <Zap size={32} className="text-amber-400" />
          </motion.div>
          <h1 className="text-2xl font-black tracking-wide">{MOCK_PROFILE.username}</h1>
          <p className="text-zinc-500 text-xs tracking-widest mt-1">SINCE {MOCK_PROFILE.joinDate}</p>
          <div className="mt-3">
            <TierBadge tier={MOCK_PROFILE.tier} size="md" />
          </div>
        </motion.div>

        {/* Main stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-3 gap-3 mb-10"
        >
          {[
            { label: 'TOTAL SCANS', value: MOCK_PROFILE.totalScans.toString(), animated: false, icon: <BarChart2 size={14} className="text-cyan-400" /> },
            { label: 'PEAK POWER', value: 87432, animated: true, icon: <TrendingUp size={14} className="text-amber-400" /> },
            { label: 'GLOBAL RANK', value: '#142', animated: false, icon: <Award size={14} className="text-rose-400" /> },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.06 }}
              className="bg-zinc-900/50 border border-white/5 rounded-xl p-4 text-center hover:border-white/10 transition-colors"
            >
              <div className="flex justify-center mb-2">{stat.icon}</div>
              <div className="text-lg font-black tabular-nums">
                {stat.animated ? (
                  <AnimatedScore score={stat.value as number} duration={1000} />
                ) : (
                  stat.value
                )}
              </div>
              <div className="text-[10px] text-zinc-600 tracking-widest mt-1 font-bold">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Category specialization */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mb-10"
        >
          <div className="text-xs text-zinc-500 tracking-widest mb-3 font-bold flex items-center gap-2">
            <Star size={12} className="text-amber-400" />
            CATEGORY SPECIALIZATION
          </div>
          <CategorySelector selected={selectedCategory} onSelect={setSelectedCategory} />
        </motion.div>

        {/* Category stats card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          key={selectedCategory}
          className={`bg-gradient-to-br ${categoryConfig.bgColor} border border-white/5 rounded-xl p-6 mb-10`}
        >
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className={`text-2xl font-black ${categoryConfig.color} mb-2`}>
                {categoryConfig.emoji} {categoryConfig.label}
              </div>
              <p className="text-zinc-400 text-sm">{categoryConfig.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-black/30 rounded-lg p-3 text-center">
              <div className={`text-lg font-black ${categoryConfig.color} tabular-nums`}>
                <AnimatedScore score={categoryStats.topScore} duration={1000} />
              </div>
              <div className="text-[10px] text-zinc-500 tracking-widest mt-1">TOP SCORE</div>
            </div>
            <div className="bg-black/30 rounded-lg p-3 text-center">
              <div className="text-lg font-black text-amber-400">#{categoryStats.rank}</div>
              <div className="text-[10px] text-zinc-500 tracking-widest mt-1">CATEGORY RANK</div>
            </div>
            <div className="bg-black/30 rounded-lg p-3 text-center">
              <div className="text-lg font-black text-cyan-400">{categoryStats.scans}</div>
              <div className="text-[10px] text-zinc-500 tracking-widest mt-1">SCANS</div>
            </div>
          </div>
        </motion.div>

        {/* Scan history */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-xs text-zinc-500 tracking-widest mb-4 font-bold">SCAN HISTORY</div>
          <div className="grid grid-cols-3 gap-2 mb-8">
            {MOCK_SCAN_HISTORY.map((scan, i) => {
              const config = TIER_CONFIG[scan.tier];
              const catConfig = CATEGORIES[scan.category];
              return (
                <motion.div
                  key={scan.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.55 + i * 0.05 }}
                  className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer"
                >
                  <img src={scan.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

                  {/* Score */}
                  <div className="absolute bottom-1.5 left-1.5 right-1.5">
                    <div className={`text-sm font-black ${config.color} leading-none drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]`}>
                      {formatScore(scan.score)}
                    </div>
                  </div>

                  {/* Category badge */}
                  <div className="absolute top-1.5 right-1.5">
                    <span className={`text-lg ${catConfig.color}`}>{catConfig.emoji}</span>
                  </div>
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
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-black text-sm tracking-widest px-8 py-4 rounded-lg transition-all shadow-[0_0_30px_rgba(245,158,11,0.2)] hover:shadow-[0_0_40px_rgba(245,158,11,0.4)]"
          >
            <Zap size={15} className="fill-black" />
            SCAN NEXT POWER
          </button>
        </motion.div>
      </div>
    </div>
  );
}
