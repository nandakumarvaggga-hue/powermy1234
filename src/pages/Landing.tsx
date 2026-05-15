import { motion, useScroll, useTransform } from 'framer-motion';
import { Zap, ArrowRight, Trophy, Flame, TrendingUp, Sparkles } from 'lucide-react';
import { useRef } from 'react';
import TierBadge from '../components/TierBadge';
import AnimatedScore from '../components/AnimatedScore';
import { TIER_CONFIG, CATEGORY_CONFIG } from '../lib/config/tier-config';
import type { Tier, Category } from '../lib/types';

interface LandingProps {
  onNavigate: (page: string) => void;
}

const MOCK_TRENDING = [
  { id: '1', image: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?w=400&h=400&fit=crop', score: 87432, tier: 'SS-TIER' as Tier, category: 'fitness' as Category },
  { id: '2', image: 'https://images.pexels.com/photos/574070/pexels-photo-574070.jpeg?w=400&h=400&fit=crop', score: 74221, tier: 'S-TIER' as Tier, category: 'setups' as Category },
  { id: '3', image: 'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?w=400&h=400&fit=crop', score: 62105, tier: 'S-TIER' as Tier, category: 'rides' as Category },
  { id: '4', image: 'https://images.pexels.com/photos/2769274/pexels-photo-2769274.jpeg?w=400&h=400&fit=crop', score: 45882, tier: 'A-TIER' as Tier, category: 'drip' as Category },
  { id: '5', image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?w=400&h=400&fit=crop', score: 96741, tier: 'SS-TIER' as Tier, category: 'pets' as Category },
  { id: '6', image: 'https://images.pexels.com/photos/2346216/pexels-photo-2346216.jpeg?w=400&h=400&fit=crop', score: 100000, tier: 'LIMITLESS' as Tier, category: 'wildcard' as Category },
];

const MOCK_LEADERBOARD = [
  { rank: 1, username: 'ULTRAVIOLET_X', score: 99821, tier: 'SSS-TIER' as Tier },
  { rank: 2, username: 'APEX_ENTITY', score: 97403, tier: 'SSS-TIER' as Tier },
  { rank: 3, username: 'THE_HARBINGER', score: 95210, tier: 'SS-TIER' as Tier },
  { rank: 4, username: 'NEON_GHOST_7', score: 89334, tier: 'SS-TIER' as Tier },
  { rank: 5, username: 'CRIMSONWAVE', score: 84991, tier: 'S-TIER' as Tier },
];

const TIER_SHOWCASE = [
  { tier: 'D-TIER' as Tier },
  { tier: 'C-TIER' as Tier },
  { tier: 'B-TIER' as Tier },
  { tier: 'A-TIER' as Tier },
  { tier: 'S-TIER' as Tier },
  { tier: 'SS-TIER' as Tier },
  { tier: 'SSS-TIER' as Tier },
  { tier: 'LIMITLESS' as Tier },
];

export default function Landing({ onNavigate }: LandingProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* HERO */}
      <motion.section
        ref={heroRef}
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-14"
      >
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-amber-500/[0.03] blur-[150px] pointer-events-none" />

        <div className="relative z-10 text-center max-w-4xl mx-auto space-y-10">
          {/* Logo mark */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', damping: 15, stiffness: 100, delay: 0.1 }}
            className="mx-auto w-20 h-20 bg-amber-500 rounded-2xl flex items-center justify-center shadow-[0_0_80px_rgba(245,158,11,0.4)]"
          >
            <Zap size={42} className="text-black fill-black" />
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h1 className="text-7xl md:text-[10rem] font-black tracking-tight leading-[0.85]">
              POWER
              <span className="text-amber-400">LVL</span>
            </h1>
            <p className="mt-6 text-zinc-500 text-sm md:text-base tracking-[0.35em] font-light">
              EVERYTHING HAS A POWER LEVEL.
            </p>
          </motion.div>

          {/* Taglines */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="space-y-3"
          >
            <p className="text-2xl md:text-4xl font-black text-white">What&apos;s yours?</p>
            <p className="text-zinc-600 text-xs tracking-[0.4em]">SCAN. RANK. DOMINATE.</p>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <button
              onClick={() => onNavigate('scanner')}
              className="group flex items-center gap-3 bg-amber-500 hover:bg-amber-400 text-black font-black text-sm tracking-widest px-10 py-5 rounded-lg transition-all duration-300 shadow-[0_0_50px_rgba(245,158,11,0.3)] hover:shadow-[0_0_80px_rgba(245,158,11,0.5)]"
            >
              <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
              SCAN YOUR POWER
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => onNavigate('feed')}
              className="text-zinc-500 hover:text-white text-sm tracking-widest font-bold transition-colors px-6 py-4"
            >
              VIEW FEED
            </button>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="flex items-center justify-center gap-10 pt-6"
          >
            {[
              { label: 'SCANS TODAY', value: '12,441' },
              { label: 'TOP SCORE', value: '99,821' },
              { label: 'ACTIVE', value: '3.2K' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-xl font-black text-white score-display">{stat.value}</div>
                <div className="text-[9px] text-zinc-600 tracking-[0.25em] mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-px h-10 bg-gradient-to-b from-amber-400 to-transparent"
          />
        </motion.div>
      </motion.section>

      {/* TRENDING SCANS */}
      <section className="py-28 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-12"
          >
            <Flame size={18} className="text-amber-400" />
            <span className="text-[10px] font-bold tracking-[0.4em] text-zinc-500">TRENDING SCANS</span>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {MOCK_TRENDING.map((item, i) => {
              const tierConfig = TIER_CONFIG[item.tier];
              const catConfig = CATEGORY_CONFIG[item.category];
              const isLimitless = item.tier === 'LIMITLESS';
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ scale: 1.04, y: -4 }}
                  className="group cursor-pointer"
                  onClick={() => onNavigate('scanner')}
                >
                  <div className={`relative aspect-square rounded-xl overflow-hidden bg-zinc-900 border transition-all duration-300 ${
                    isLimitless 
                      ? 'border-amber-400/40 shadow-[0_0_30px_rgba(245,158,11,0.2)]' 
                      : 'border-white/5 group-hover:border-white/15'
                  }`}>
                    <img
                      src={item.image}
                      alt="Scan"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                    
                    <div className="absolute bottom-2.5 left-2.5 right-2.5">
                      <div className={`text-lg font-black ${tierConfig.color} tabular-nums score-display leading-none`}>
                        <AnimatedScore score={item.score} duration={800} />
                      </div>
                      <div className="mt-1.5 flex items-center gap-1.5">
                        <TierBadge tier={item.tier} size="sm" />
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${catConfig.borderColor} ${catConfig.color}`}>
                          {catConfig.emoji}
                        </span>
                      </div>
                    </div>

                    {/* Corner accent */}
                    <div className={`absolute top-2 right-2 w-4 h-4 border-t border-r ${isLimitless ? 'border-amber-400/60' : 'border-amber-500/30'}`} />
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-10 text-center"
          >
            <button
              onClick={() => onNavigate('feed')}
              className="text-zinc-500 hover:text-amber-400 text-xs tracking-[0.3em] font-bold transition-colors"
            >
              VIEW ALL SCANS →
            </button>
          </motion.div>
        </div>
      </section>

      {/* TIER SHOWCASE */}
      <section className="py-28 px-4 bg-zinc-950/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">POWER TIERS</h2>
            <p className="text-zinc-600 mt-4 text-sm tracking-[0.3em]">WHERE DO YOU RANK?</p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
            {TIER_SHOWCASE.map((item, i) => {
              const config = TIER_CONFIG[item.tier];
              const isLimitless = item.tier === 'LIMITLESS';
              return (
                <motion.div
                  key={item.tier}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className={`relative p-4 rounded-xl border text-center transition-all duration-200 ${config.borderColor} ${
                    isLimitless 
                      ? 'bg-gradient-to-br from-amber-950/80 to-orange-950/80 shadow-[0_0_40px_rgba(245,158,11,0.15)]' 
                      : 'bg-zinc-900/80'
                  }`}
                >
                  {isLimitless && (
                    <div className="absolute inset-0 rounded-xl bg-amber-500/5 animate-pulse" />
                  )}
                  <div className={`text-base md:text-lg font-black ${config.color} relative z-10`}>
                    {isLimitless && <span className="mr-1">◆</span>}
                    {config.label}
                  </div>
                  <div className="text-zinc-600 text-[9px] mt-1.5 tracking-widest">{config.range}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* LEADERBOARD PREVIEW */}
      <section className="py-28 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-12"
          >
            <Trophy size={18} className="text-amber-400" />
            <span className="text-[10px] font-bold tracking-[0.4em] text-zinc-500">GLOBAL LEADERBOARD</span>
          </motion.div>

          <div className="space-y-2">
            {MOCK_LEADERBOARD.map((entry, i) => {
              const tierConfig = TIER_CONFIG[entry.tier];
              const rankColors = ['text-amber-400', 'text-zinc-300', 'text-amber-700', 'text-zinc-500', 'text-zinc-600'];
              return (
                <motion.div
                  key={entry.rank}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-4 p-4 bg-zinc-900/60 border border-white/5 rounded-xl hover:border-white/10 transition-all group cursor-pointer"
                >
                  <span className={`text-lg font-black w-7 text-center ${rankColors[i] || 'text-zinc-600'}`}>
                    {entry.rank}
                  </span>
                  
                  <div className="w-9 h-9 bg-zinc-800 rounded-lg flex items-center justify-center border border-white/5 flex-shrink-0 group-hover:border-amber-500/30 transition-colors">
                    <Zap size={14} className="text-amber-400" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm tracking-wide text-white truncate">{entry.username}</div>
                    <TierBadge tier={entry.tier} size="sm" />
                  </div>
                  
                  <div className={`text-lg font-black ${tierConfig.color} tabular-nums score-display`}>
                    <AnimatedScore score={entry.score} duration={1000} />
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-10 text-center"
          >
            <button
              onClick={() => onNavigate('leaderboard')}
              className="text-zinc-500 hover:text-amber-400 text-xs tracking-[0.3em] font-bold transition-colors"
            >
              FULL LEADERBOARD →
            </button>
          </motion.div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-36 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-950/10 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-amber-500/[0.04] blur-[120px] pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 space-y-8"
        >
          <p className="text-zinc-500 text-xs tracking-[0.4em]">YOUR AURA CAN&apos;T HIDE.</p>
          <h2 className="text-4xl md:text-6xl font-black">WHAT&apos;S YOUR LEVEL?</h2>
          <button
            onClick={() => onNavigate('scanner')}
            className="inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-400 text-black font-black text-sm tracking-widest px-12 py-6 rounded-lg transition-all duration-300 shadow-[0_0_80px_rgba(245,158,11,0.3)] hover:shadow-[0_0_120px_rgba(245,158,11,0.5)]"
          >
            <TrendingUp size={18} />
            START SCANNING
          </button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-amber-500 rounded flex items-center justify-center">
              <Zap size={10} className="text-black fill-black" />
            </div>
            <span className="font-black text-[10px] tracking-widest text-zinc-500">POWERLVL</span>
          </div>
          <p className="text-[10px] text-zinc-700 tracking-widest">
            EVERYTHING HAS A POWER LEVEL.
          </p>
        </div>
      </footer>
    </div>
  );
}
