"use client";

import { motion } from 'framer-motion';
import { Flame, Clock, TrendingUp, Heart, Zap, MessageCircle, Share2 } from 'lucide-react';
import { useState } from 'react';
import TierBadge from '../components/TierBadge';
import AnimatedScore from '../components/AnimatedScore';
import { TIER_CONFIG, CATEGORY_CONFIG } from '../lib/config/tier-config';
import type { Tier, Category } from '../lib/types';

interface FeedProps {
  onNavigate: (page: string) => void;
}

const MOCK_FEED = [
  {
    id: '1',
    image: 'https://images.pexels.com/photos/574070/pexels-photo-574070.jpeg?w=600&h=600&fit=crop',
    score: 87432,
    tier: 'SS-TIER' as Tier,
    commentary: 'This setup radiates elite instability.',
    username: 'CODE_NEXUS',
    category: 'setups' as Category,
    likes: 1204,
    comments: 89,
    timeAgo: '2m ago',
    description: 'Rate my battlestation',
  },
  {
    id: '2',
    image: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?w=600&h=600&fit=crop',
    score: 74221,
    tier: 'S-TIER' as Tier,
    commentary: 'Unstable. Dangerous. Absolutely elite.',
    username: 'IRONVEIL_PRO',
    category: 'fitness' as Category,
    likes: 891,
    comments: 56,
    timeAgo: '8m ago',
    description: 'Post-workout pump',
  },
  {
    id: '3',
    image: 'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?w=600&h=600&fit=crop',
    score: 62105,
    tier: 'S-TIER' as Tier,
    commentary: 'The energy here is genuinely threatening.',
    username: 'DOMINANCE_EDGE',
    category: 'rides' as Category,
    likes: 733,
    comments: 42,
    timeAgo: '15m ago',
    description: 'New whip',
  },
  {
    id: '4',
    image: 'https://images.pexels.com/photos/2769274/pexels-photo-2769274.jpeg?w=600&h=600&fit=crop',
    score: 45882,
    tier: 'A-TIER' as Tier,
    commentary: 'High-level readings. This demands respect.',
    username: 'PRESENCE_UNLOCKED',
    category: 'drip' as Category,
    likes: 512,
    comments: 31,
    timeAgo: '22m ago',
    description: 'Street fit check',
  },
  {
    id: '5',
    image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?w=600&h=600&fit=crop',
    score: 96741,
    tier: 'SS-TIER' as Tier,
    commentary: 'One of one. The data confirms it.',
    username: 'CHAOS_DEITY',
    category: 'pets' as Category,
    likes: 2103,
    comments: 134,
    timeAgo: '31m ago',
    description: 'My menace of a dog',
  },
  {
    id: '6',
    image: 'https://images.pexels.com/photos/2346216/pexels-photo-2346216.jpeg?w=600&h=600&fit=crop',
    score: 100000,
    tier: 'LIMITLESS' as Tier,
    commentary: 'The scouter exploded. We had to rebuild it.',
    username: 'ABSOLUTE_POWER',
    category: 'wildcard' as Category,
    likes: 4892,
    comments: 312,
    timeAgo: '45m ago',
    description: 'Beyond measurement',
  },
];

type FilterType = 'hot' | 'new' | 'top';

export default function Feed({ onNavigate }: FeedProps) {
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
      <div className="max-w-2xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-black tracking-tight mb-2">Feed</h1>
          <p className="text-zinc-500 text-sm">Global power unleashed.</p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex gap-1 mb-6 bg-zinc-900/50 border border-white/5 p-1 rounded-xl"
        >
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`flex items-center gap-2 flex-1 justify-center py-2.5 rounded-lg text-xs font-bold tracking-widest transition-all ${
                filter === f.id
                  ? 'bg-amber-500 text-black shadow-[0_0_20px_rgba(245,158,11,0.2)]'
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
          <div className="text-[10px] text-zinc-500 tracking-[0.3em] mb-3 font-bold">FILTER BY CATEGORY</div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {(['all', 'setups', 'fitness', 'rides', 'drip', 'pets', 'wildcard'] as const).map((cat) => {
              const isAll = cat === 'all';
              const config = isAll ? null : CATEGORY_CONFIG[cat as Category];
              const isSelected = categoryFilter === cat;

              return (
                <motion.button
                  key={cat}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setCategoryFilter(cat as Category | 'all')}
                  className={`px-4 py-2.5 rounded-lg font-bold text-xs tracking-widest transition-all whitespace-nowrap flex-shrink-0 border ${
                    isSelected
                      ? isAll
                        ? 'bg-amber-500 text-black border-amber-500'
                        : `${config!.bgColor} ${config!.color} ${config!.borderColor}`
                      : 'bg-zinc-900/60 text-zinc-500 border-zinc-800 hover:border-zinc-600 hover:text-zinc-300'
                  }`}
                >
                  {isAll ? '✦ ALL' : `${config!.emoji} ${config!.label}`}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Feed */}
        <div className="space-y-4">
          {filteredFeed.map((post, i) => {
            const tierConfig = TIER_CONFIG[post.tier];
            const categoryConfig = CATEGORY_CONFIG[post.category];
            const isLiked = likedIds.has(post.id);
            const isLimitless = post.tier === 'LIMITLESS';

            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className={`group bg-zinc-950 border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isLimitless 
                    ? 'border-amber-500/30 shadow-[0_0_40px_rgba(245,158,11,0.1)]' 
                    : 'border-white/5 hover:border-white/10'
                }`}
              >
                {/* Header */}
                <div className="flex items-center gap-3 p-4 pb-3">
                  <div className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center border border-white/5 flex-shrink-0">
                    <Zap size={16} className="text-amber-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm tracking-wide truncate">{post.username}</span>
                      <TierBadge tier={post.tier} size="sm" />
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`text-[10px] font-bold ${categoryConfig.color}`}>
                        {categoryConfig.emoji} {categoryConfig.label}
                      </span>
                      <span className="text-zinc-600 text-[10px]">·</span>
                      <span className="text-zinc-600 text-[10px]">{post.timeAgo}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                {post.description && (
                  <p className="px-4 pb-3 text-sm text-zinc-300">{post.description}</p>
                )}

                {/* Image */}
                <div className="relative overflow-hidden bg-zinc-900">
                  <img
                    src={post.image}
                    alt="Scan"
                    className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

                  {/* Score overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                    >
                      <div 
                        className={`text-4xl md:text-5xl font-black ${tierConfig.color} leading-none score-display`}
                        style={{
                          textShadow: isLimitless 
                            ? '0 0 40px rgba(245, 158, 11, 0.6)' 
                            : '0 0 20px rgba(0,0,0,0.8)'
                        }}
                      >
                        <AnimatedScore score={post.score} duration={1000} />
                      </div>
                    </motion.div>
                  </div>

                  {/* Corner accents */}
                  <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-amber-500/40" />
                  <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-amber-500/40" />
                </div>

                {/* Commentary */}
                <div className="p-4 pt-3">
                  <p className={`text-sm ${tierConfig.color} italic leading-relaxed`}>
                    "{post.commentary}"
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between px-4 pb-4 pt-1 border-t border-white/5">
                  <div className="flex items-center gap-4">
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
                        <Heart size={16} className={isLiked ? 'fill-current' : ''} />
                      </motion.div>
                      {(post.likes + (isLiked ? 1 : 0)).toLocaleString()}
                    </button>
                    <button className="flex items-center gap-1.5 text-xs font-bold text-zinc-500 hover:text-white transition-colors">
                      <MessageCircle size={16} />
                      {post.comments}
                    </button>
                    <button className="flex items-center gap-1.5 text-xs font-bold text-zinc-500 hover:text-amber-400 transition-colors">
                      <Share2 size={16} />
                    </button>
                  </div>
                  <span className={`text-[10px] ${tierConfig.color} font-bold tracking-widest`}>
                    {tierConfig.label}
                  </span>
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
            className="text-center py-20"
          >
            <p className="text-zinc-600 text-sm tracking-widest">No scans in this category yet.</p>
          </motion.div>
        )}

        {/* Load more */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <button className="text-zinc-500 hover:text-amber-400 text-xs tracking-[0.3em] font-bold transition-colors px-8 py-4 border border-zinc-800 hover:border-amber-500/30 rounded-xl">
            LOAD MORE
          </button>
        </motion.div>

        {/* Floating CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="fixed bottom-6 right-6 z-40"
        >
          <button
            onClick={() => onNavigate('scanner')}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-black text-xs tracking-widest px-5 py-3.5 rounded-xl transition-all shadow-[0_0_40px_rgba(245,158,11,0.4)] hover:shadow-[0_0_60px_rgba(245,158,11,0.6)]"
          >
            <Zap size={14} className="fill-black" />
            SCAN
          </button>
        </motion.div>
      </div>
    </div>
  );
}
