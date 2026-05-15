import { motion } from 'framer-motion';
import { ANIMATION_PRESETS } from '../lib/utils/animations';

interface AttributeBarProps {
  label: string;
  value: number;
  color?: string;
  delay?: number;
}

const ATTR_COLORS: Record<string, string> = {
  // Global core stats
  AURA: 'bg-amber-500',
  POWER: 'bg-red-500',
  STATUS: 'bg-violet-400',
  THREAT: 'bg-rose-500',
  
  // Setup category
  'PROCESSING POWER': 'bg-cyan-400',
  'LOCK-IN RATE': 'bg-sky-400',
  'BUILD QUALITY': 'bg-emerald-500',
  'THREAT OUTPUT': 'bg-rose-400',
  'RGB STABILITY': 'bg-pink-400',
  
  // Fitness category
  'POWER OUTPUT': 'bg-red-500',
  'DISCIPLINE INDEX': 'bg-emerald-400',
  'STAMINA CORE': 'bg-orange-500',
  'AURA LEVEL': 'bg-amber-400',
  'THREAT RATING': 'bg-rose-400',
  
  // Drip category
  'RIZZ LEVEL': 'bg-pink-400',
  'STYLE SYNC': 'bg-cyan-400',
  'FLEX VALUE': 'bg-violet-400',
  'TREND ENERGY': 'bg-purple-400',
  'AURA OUTPUT': 'bg-amber-500',
  
  // Pets category
  'MENACE LEVEL': 'bg-orange-500',
  'CHAOS INDEX': 'bg-orange-400',
  'DIVINE ENERGY': 'bg-amber-300',
  'BRAIN ACTIVITY': 'bg-cyan-400',
  
  // Rides category
  'HORSEPOWER AURA': 'bg-orange-500',
  'DOMINANCE OUTPUT': 'bg-rose-500',
  'STREET PRESENCE': 'bg-red-500',
  'THREAT LEVEL': 'bg-rose-400',
  'ENGINE ENERGY': 'bg-orange-400',
  
  // Legacy attributes for compatibility
  DRIP: 'bg-cyan-400',
  DISCIPLINE: 'bg-emerald-400',
  INTENSITY: 'bg-rose-400',
  PHYSIQUE: 'bg-emerald-500',
  FOCUS: 'bg-cyan-400',
  RARITY: 'bg-violet-400',
  PRODUCTIVITY: 'bg-sky-400',
  'CHAOS ENERGY': 'bg-orange-500',
  CHAOS: 'bg-orange-500',
  PRESENCE: 'bg-amber-400',
  INTIMIDATION: 'bg-rose-500',
  DOMINANCE: 'bg-rose-400',
  MENACE: 'bg-orange-400',
  INTELLIGENCE: 'bg-cyan-400',
  'DIVINE AURA': 'bg-amber-300',
};

export default function AttributeBar({ label, value, delay = 0 }: AttributeBarProps) {
  const barColor = ATTR_COLORS[label] || 'bg-amber-500';
  
  // Determine format based on attribute type
  const getFormattedValue = () => {
    // Percentage-based stats
    if (label.includes('RATE') || label.includes('SYNC') || label.includes('STABILITY')) {
      return `${value}%`;
    }
    // Grade-based stats (converted from 0-100 to letter grades)
    if (label === 'BUILD QUALITY') {
      if (value >= 95) return 'SSS';
      if (value >= 85) return 'SS';
      if (value >= 75) return 'S';
      if (value >= 65) return 'A';
      if (value >= 50) return 'B';
      if (value >= 35) return 'C';
      return 'D';
    }
    // Index-based stats (out of 10)
    if (label.includes('INDEX') || label.includes('RATING')) {
      return `${(value / 10).toFixed(1)}/10`;
    }
    // Default: raw number
    return value.toString();
  };
  
  // Determine glow based on value
  const getGlow = () => {
    if (value >= 90) return 'shadow-[0_0_12px_rgba(245,158,11,0.4)]';
    if (value >= 75) return 'shadow-[0_0_8px_rgba(245,158,11,0.25)]';
    return '';
  };

  return (
    <motion.div 
      className="space-y-2"
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3, ease: 'easeOut' }}
    >
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold tracking-[0.2em] text-zinc-500">{label}</span>
        <motion.span 
          initial={{ opacity: 0, x: 4 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: delay + 0.2, duration: 0.3 }}
          className={`text-xs font-black tabular-nums transition-colors duration-300 ${value >= 90 ? 'text-amber-400' : value >= 75 ? 'text-amber-500' : 'text-white'}`}
        >
          {getFormattedValue()}
        </motion.span>
      </div>
      <div className="h-2 bg-zinc-800/80 rounded-full overflow-hidden backdrop-blur-sm">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, delay: delay + 0.1, ease: [0.34, 1.56, 0.64, 1] }}
          className={`h-full rounded-full ${barColor} ${getGlow()} transition-shadow duration-300`}
        />
      </div>
    </motion.div>
  );
}
