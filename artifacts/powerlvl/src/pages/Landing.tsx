import { motion, useScroll, useTransform } from 'framer-motion';
import { Zap, ArrowRight, Trophy, Flame, TrendingUp } from 'lucide-react';
import { useRef } from 'react';
import TierBadge from '../components/TierBadge';
import AnimatedScore from '../components/AnimatedScore';
import { formatScore } from '../lib/scoring';
import { CATEGORIES, TIER_CONFIG } from '../lib/types';
import type { Tier, Category } from '../lib/types';

interface LandingProps {
  onNavigate: (page: string) => void;
}

const MOCK_TRENDING = [
  { id: '1', image: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?w=400&h=400&fit=crop', score: 87432, tier: 'SS-TIER' as Tier, category: 'fitness' as Category, commentary: 'Bro hit SS-TIER. Back up.' },
  { id: '2', image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?w=400&h=400&fit=crop', score: 74221, tier: 'S-TIER' as Tier, category: 'setups' as Category, commentary: 'This aura is causing problems.' },
  { id: '3', image: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?w=400&h=400&fit=crop', score: 62105, tier: 'S-TIER' as Tier, category: 'rides' as Category, commentary: 'The threat level here is off the charts.' },
  { id: '4', image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?w=400&h=400&fit=crop', score: 45882, tier: 'A-TIER' as Tier, category: 'drip' as Category, commentary: 'Dangerous energy in the room.' },
  { id: '5', image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?w=400&h=400&fit=crop', score: 38654, tier: 'B-TIER' as Tier, category: 'pets' as Category, commentary: 'Actually decent. Respect.' },
  { id: '6', image: 'https://images.pexels.com/photos/2346216/pexels-photo-2346216.jpeg?w=400&h=400&fit=crop', score: 97441, tier: 'SSS-TIER' as Tier, category: 'wildcard' as Category, commentary: 'SSS readings confirmed. Document this.' },
];

const MOCK_LEADERBOARD = [
  { rank: 1, username: 'ULTRAVIOLET_X', score: 99821, tier: 'SSS-TIER' as Tier },
  { rank: 2, username: 'APEX_ENTITY', score: 97403, tier: 'SSS-TIER' as Tier },
  { rank: 3, username: 'THE_HARBINGER', score: 95210, tier: 'SSS-TIER' as Tier },
  { rank: 4, username: 'NEON_GHOST_7', score: 89334, tier: 'SS-TIER' as Tier },
  { rank: 5, username: 'CRIMSONWAVE', score: 84991, tier: 'SS-TIER' as Tier },
];

const TIER_SHOWCASE = [
  { tier: 'D-TIER' as Tier, score: 2412 },
  { tier: 'C-TIER' as Tier, score: 12821 },
  { tier: 'B-TIER' as Tier, score: 28440 },
  { tier: 'A-TIER' as Tier, score: 54320 },
  { tier: 'S-TIER' as Tier, score: 71882 },
  { tier: 'SS-TIER' as Tier, score: 91034 },
  { tier: 'SSS-TIER' as Tier, score: 98220 },
  { tier: 'LIMITLESS' as Tier, score: 100000 },
];

export default function Landing({ onNavigate }: LandingProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* HERO */}
      <motion.section
        ref={heroRef}
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-14"
      >
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />

        <div className="relative z-10 text-center max-w-3xl mx-auto space-y-8">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', damping: 15, stiffness: 120, delay: 0.1 }}
            className="mx-auto w-20 h-20 bg-amber-500 rounded-2xl flex items-center justify-center"
            style={{ boxShadow: '0 0 60px rgba(245,158,11,0.4)' }}
          >
            <Zap size={40} className="text-black fill-black" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h1 className="text-7xl md:text-9xl font-black tracking-tight leading-none">
              POWER<span className="text-amber-400">LVL</span>
            </h1>
            <p className="mt-4 text-zinc-400 text-lg tracking-[0.3em] font-light">
              EVERYTHING HAS A POWER LEVEL.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="space-y-2"
          >
            <p className="text-2xl md:text-3xl font-black text-white">What's yours?</p>
            <p className="text-zinc-600 text-sm tracking-widest">SCAN. RANK. DOMINATE.</p>
          </motion.div>

          {/* Quick tier preview */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75 }}
            className="flex items-center justify-center gap-2 flex-wrap"
          >
            {(['D-TIER', 'C-TIER', 'B-TIER', 'A-TIER', 'S-TIER', 'SS-TIER', 'SSS-TIER'] as Tier[]).map((tier, i) => (
              <motion.div
                key={tier}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.05 }}
              >
                <TierBadge tier={tier} size="sm" />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => onNavigate('scanner')}
              className="group flex items-center gap-3 bg-amber-500 hover:bg-amber-400 text-black font-black text-sm tracking-widest px-8 py-4 rounded-sm transition-all duration-200"
              style={{ boxShadow: '0 0 40px rgba(245,158,11,0.3)' }}
            >
              SCAN YOUR POWER
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => onNavigate('feed')}
              className="text-zinc-500 hover:text-white text-sm tracking-widest font-bold transition-colors px-4 py-4"
            >
              VIEW FEED
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex items-center justify-center gap-8 pt-4"
          >
            {[
              { label: 'SCANS TODAY', value: '12,441' },
              { label: 'HIGHEST AURA', value: '9,821' },
              { label: 'ACTIVE SCANNERS', value: '3.2K' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-lg font-black text-white">{stat.value}</div>
                <div className="text-[10px] text-zinc-600 tracking-widest">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-0.5 h-8 bg-gradient-to-b from-amber-400 to-transparent mx-auto"
          />
        </motion.div>
      </motion.section>

      {/* TRENDING SCANS */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-10"
          >
            <Flame size={18} className="text-amber-400" />
            <span className="text-xs font-bold tracking-[0.3em] text-zinc-500">TRENDING SCANS</span>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {MOCK_TRENDING.map((item, i) => {
              const tierConfig = TIER_CONFIG[item.tier];
              const catConfig = CATEGORIES[item.category];
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.03 }}
                  className="group cursor-pointer"
                  onClick={() => onNavigate('scanner')}
                >
                  <div className="relative aspect-square rounded-lg overflow-hidden bg-zinc-900 border border-white/5 group-hover:border-white/10 transition-colors">
                    <img src={item.image} alt="Scan" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                    <div className="absolute bottom-2 left-2 right-2">
                      <div className="text-base font-black tabular-nums" style={{ color: tierConfig.glowColor }}>
                        <AnimatedScore score={item.score} duration={600} />
                      </div>
                      <div className="mt-1">
                        <TierBadge tier={item.tier} size="sm" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <button
              onClick={() => onNavigate('feed')}
              className="text-zinc-600 hover:text-amber-400 text-xs tracking-widest font-bold transition-colors"
            >
              VIEW ALL SCANS →
            </button>
          </motion.div>
        </div>
      </section>

      {/* TIER SHOWCASE */}
      <section className="py-24 px-4 bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">TIER SYSTEM</h2>
            <p className="text-zinc-600 mt-3 text-sm tracking-widest">WHERE DO YOU RANK?</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
            {TIER_SHOWCASE.map((item, i) => {
              const config = TIER_CONFIG[item.tier];
              const isLimitless = item.tier === 'LIMITLESS';
              const isSSS = item.tier === 'SSS-TIER';
              return (
                <motion.div
                  key={item.tier}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="relative p-4 rounded-xl border text-center group hover:scale-105 transition-transform duration-200 overflow-hidden"
                  style={{
                    borderColor: `${config.glowColor}60`,
                    background: isLimitless
                      ? 'linear-gradient(135deg, #451a03, #78350f)'
                      : isSSS
                      ? 'linear-gradient(135deg, #2e1065, #4c1d95)'
                      : 'rgba(9,9,11,0.8)',
                    boxShadow: isLimitless || isSSS ? `0 0 20px ${config.glowColor}30` : 'none',
                  }}
                >
                  {(isLimitless || isSSS) && (
                    <div className="absolute inset-0 opacity-5 animate-pulse" style={{ background: config.glowColor }} />
                  )}
                  <div className={`text-2xl font-black relative z-10 ${config.badge === '∞' ? 'text-3xl' : ''}`} style={{ color: config.glowColor }}>
                    {config.badge}
                  </div>
                  <div className="text-[9px] tracking-widest mt-1 font-bold relative z-10" style={{ color: config.glowColor, opacity: 0.7 }}>
                    {config.label}
                  </div>
                  <div className="text-zinc-700 text-[8px] mt-0.5 tracking-wider">{config.range}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* GLOBAL STATS EXPLAINER */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">YOUR STATS</h2>
            <p className="text-zinc-600 mt-3 text-sm tracking-widest">MEASURED. RANKED. UNDENIABLE.</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'AURA', value: '9,821', color: 'text-amber-400', glow: 'rgba(245,158,11,0.3)', desc: 'Presence. Energy. Vibe.' },
              { label: 'POWER', value: '8,440', color: 'text-rose-400', glow: 'rgba(251,113,133,0.3)', desc: 'Intensity. Dominance.' },
              { label: 'STATUS', value: 'S+', color: 'text-violet-400', glow: 'rgba(167,139,250,0.3)', desc: 'Prestige. Rarity. Flex.' },
              { label: 'THREAT', value: '7,112', color: 'text-orange-400', glow: 'rgba(251,146,60,0.3)', desc: 'Intimidation. Menace.' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-zinc-950 border border-white/5 rounded-2xl p-5 text-center hover:border-white/10 transition-all"
                style={{ boxShadow: `0 0 30px ${stat.glow}` }}
              >
                <div className={`text-3xl font-black ${stat.color} tabular-nums`}>{stat.value}</div>
                <div className="text-xs font-black tracking-widest text-white mt-2">{stat.label}</div>
                <div className="text-[10px] text-zinc-600 mt-1">{stat.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LEADERBOARD PREVIEW */}
      <section className="py-24 px-4 bg-zinc-950">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-10"
          >
            <Trophy size={18} className="text-amber-400" />
            <span className="text-xs font-bold tracking-[0.3em] text-zinc-500">GLOBAL LEADERBOARD</span>
          </motion.div>

          <div className="space-y-2">
            {MOCK_LEADERBOARD.map((entry, i) => {
              const tierConfig = TIER_CONFIG[entry.tier];
              const rankColors = ['text-amber-400', 'text-zinc-300', 'text-amber-700'];
              return (
                <motion.div
                  key={entry.rank}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-4 p-4 bg-zinc-900/50 border border-white/5 rounded-xl hover:border-white/10 transition-colors"
                >
                  <span className={`text-lg font-black w-6 text-center ${rankColors[i] || 'text-zinc-600'}`}>
                    {entry.rank}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm tracking-wide text-white truncate">{entry.username}</div>
                    <TierBadge tier={entry.tier} size="sm" />
                  </div>
                  <div className="text-lg font-black tabular-nums" style={{ color: tierConfig.glowColor }}>
                    {formatScore(entry.score)}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <button
              onClick={() => onNavigate('leaderboard')}
              className="text-zinc-600 hover:text-amber-400 text-xs tracking-widest font-bold transition-colors"
            >
              FULL LEADERBOARD →
            </button>
          </motion.div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-32 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-950/10 to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 space-y-6"
        >
          <p className="text-zinc-600 text-sm tracking-[0.3em]">YOUR AURA CAN'T HIDE.</p>
          <h2 className="text-4xl md:text-6xl font-black">WHAT'S YOUR TIER?</h2>
          <button
            onClick={() => onNavigate('scanner')}
            className="inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-400 text-black font-black text-sm tracking-widest px-10 py-5 rounded-sm transition-all duration-200"
            style={{ boxShadow: '0 0 60px rgba(245,158,11,0.3)' }}
          >
            <TrendingUp size={16} />
            START SCANNING
          </button>
        </motion.div>
      </section>
    </div>
  );
}
