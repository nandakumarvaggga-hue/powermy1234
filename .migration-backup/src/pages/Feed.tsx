import { motion } from 'framer-motion';
import { Flame, Clock, TrendingUp, Heart, Zap } from 'lucide-react';
import { useState } from 'react';
import TierBadge from '../components/TierBadge';
import CategorySelector from '../components/CategorySelector';
import AnimatedScore from '../components/AnimatedScore';
import { formatScore } from '../lib/scoring';
import { TIER_CONFIG, CATEGORIES } from '../lib/types';
import type { Tier, Category } from '../lib/types';

const MOCK_FEED = [
  {
    id: '1',
    image: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?w=600&h=600&fit=crop',
    score: 87432,
    tier: 'SINGULAR' as Tier,
    commentary: 'This aura has caused psychological damage.',
    username: 'ULTRAVIOLET_X',
    category: 'fitness' as Category,
    likes: 1204,
    timeAgo: '2m ago',
  },
  {
    id: '2',
    image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?w=600&h=600&fit=crop',
    score: 74221,
    tier: 'VOLATILE' as Tier,
    commentary: 'Unstable. Dangerous. Absolutely elite.',
    username: 'APEX_ENTITY',
    category: 'setups' as Category,
    likes: 891,
    timeAgo: '8m ago',
  },
  {
    id: '3',
    image: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?w=600&h=600&fit=crop',
    score: 62105,
    tier: 'VOLATILE' as Tier,
    commentary: 'The energy here is genuinely threatening.',
    username: 'THE_HARBINGER',
    category: 'rides' as Category,
    likes: 733,
    timeAgo: '15m ago',
  },
  {
    id: '4',
    image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?w=600&h=600&fit=crop',
    score: 45882,
    tier: 'CHARGED' as Tier,
    commentary: 'This setup radiates elite instability.',
    username: 'NEON_GHOST_7',
    category: 'drip' as Category,
    likes: 512,
    timeAgo: '22m ago',
  },
  {
    id: '5',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?w=600&h=600&fit=crop',
    score: 38654,
    tier: 'CHARGED' as Tier,
    commentary: 'High-level readings. This demands respect.',
    username: 'CRIMSONWAVE',
    category: 'pets' as Category,
    likes: 401,
    timeAgo: '31m ago',
  },
  {
    id: '6',
    image: 'https://images.pexels.com/photos/2346216/pexels-photo-2346216.jpeg?w=600&h=600&fit=crop',
    score: 96741,
    tier: 'SINGULAR' as Tier,
    commentary: 'One of one. The data confirms it.',
    username: 'STORMCODE',
    category: 'wildcard' as Category,
    likes: 2103,
    timeAgo: '45m ago',
  },
];

type FilterType = 'hot' | 'new' | 'top';

export default function Feed() {
  const [filter, setFilter] = useState<FilterType>('hot');
  const [categoryFilter, setCategoryFilter] = useState<Category | 'all'>('all');
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());

  const handleLike = (id: string) => {
    setLikedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filteredFeed = categoryFilter === 'all'
    ? MOCK_FEED
    : MOCK_FEED.filter(post => post.category === categoryFilter);

  const filters: { id: FilterType; label: string; icon: React.ReactNode }[] = [
    { id: 'hot', label: 'HOT', icon: <Flame size={13} /> },
    { id: 'new', label: 'NEW', icon: <Clock size={13} /> },
    { id: 'top', label: 'TOP', icon: <TrendingUp size={13} /> },
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-14">
      <div className="max-w-2xl mx-auto px-4 py-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-black tracking-tight mb-1">Feed</h1>
          <p className="text-zinc-400 text-sm">Global power unleashed.</p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex gap-1 mb-6 bg-zinc-900/50 border border-white/5 p-1 rounded-lg"
        >
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`flex items-center gap-2 flex-1 justify-center py-2 rounded-md text-xs font-bold tracking-widest transition-all ${
                filter === f.id
                  ? 'bg-amber-500 text-black'
                  : 'text-zinc-500 hover:text-white'
              }`}
            >
              {f.icon}
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="mb-8"
        >
          <div className="text-xs text-zinc-500 tracking-widest mb-3 font-bold">FILTER BY CATEGORY</div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {['all', 'fitness', 'setups', 'rides', 'drip', 'pets', 'wildcard'].map((cat) => {
              const isAll = cat === 'all';
              const config = isAll ? null : CATEGORIES[cat as Category];
              const isSelected = categoryFilter === cat;

              return (
                <motion.button
                  key={cat}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCategoryFilter(cat as any)}
                  className={`px-3.5 py-2 rounded-lg font-bold text-xs tracking-widest transition-all whitespace-nowrap flex-shrink-0 ${
                    isSelected
                      ? isAll
                        ? 'bg-amber-500 text-black'
                        : `${config!.bgColor} ${config!.color} border border-current/40`
                      : 'bg-zinc-800 text-zinc-400 border border-zinc-700 hover:border-zinc-600'
                  }`}
                >
                  {isAll ? '✦ ALL' : `${config!.emoji} ${config!.label}`}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Feed grid - masonry-like */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredFeed.map((post, i) => {
            const tierConfig = TIER_CONFIG[post.tier];
            const categoryConfig = CATEGORIES[post.category];
            const isLiked = likedIds.has(post.id);

            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="group bg-zinc-900 border border-white/5 rounded-xl overflow-hidden hover:border-white/10 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative overflow-hidden bg-zinc-800">
                  <img
                    src={post.image}
                    alt="Scan"
                    className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  {/* Score + Tier */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="absolute bottom-3 left-3"
                  >
                    <div className={`text-3xl font-black ${tierConfig.color} leading-none drop-shadow-[0_0_10px_rgba(0,0,0,0.8)] tabular-nums`}>
                      <AnimatedScore score={post.score} duration={800} />
                    </div>
                    <div className="mt-1.5 flex items-center gap-1.5">
                      <TierBadge tier={post.tier} size="sm" />
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${categoryConfig.borderColor} ${categoryConfig.color}`}>
                        {categoryConfig.emoji}
                      </span>
                    </div>
                  </motion.div>

                  {/* Corner accent */}
                  <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-amber-500/40" />
                </div>

                {/* Info */}
                <div className="p-3.5 space-y-2.5">
                  {/* Username + Time */}
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-zinc-800 rounded-full flex items-center justify-center flex-shrink-0">
                      <Zap size={11} className="text-amber-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold tracking-wide truncate">{post.username}</div>
                      <div className="text-zinc-600 text-[10px]">{post.timeAgo}</div>
                    </div>
                  </div>

                  {/* Commentary */}
                  <p className="text-xs text-zinc-300 leading-relaxed line-clamp-2">"{post.commentary}"</p>

                  {/* Like button */}
                  <div className="flex items-center justify-between pt-1 border-t border-white/5">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-1.5 text-xs font-bold transition-colors ${
                        isLiked ? 'text-rose-400' : 'text-zinc-500 hover:text-rose-400'
                      }`}
                    >
                      <motion.div
                        whileTap={{ scale: 1.4 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                      >
                        <Heart size={13} className={isLiked ? 'fill-current' : ''} />
                      </motion.div>
                      {post.likes + (isLiked ? 1 : 0)}
                    </button>
                    <span className={`text-[10px] ${tierConfig.color} font-bold`}>
                      {tierConfig.label}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Empty state */}
        {filteredFeed.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-zinc-600 text-sm">No scans in this category yet.</p>
          </motion.div>
        )}

        {/* Load more */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-10 text-center"
        >
          <button className="text-zinc-500 hover:text-amber-400 text-xs tracking-widest font-bold transition-colors px-6 py-3 border border-zinc-800 hover:border-zinc-600 rounded-lg">
            LOAD MORE
          </button>
        </motion.div>
      </div>
    </div>
  );
}
