import { motion } from 'framer-motion';

interface AttributeBarProps {
  label: string;
  value: number;
  color?: string;
  delay?: number;
}

const ATTR_COLORS: Record<string, string> = {
  AURA: 'bg-amber-500',
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
  THREAT: 'bg-red-500',
  MENACE: 'bg-orange-400',
  INTELLIGENCE: 'bg-cyan-400',
  'DIVINE AURA': 'bg-amber-300',
};

export default function AttributeBar({ label, value, delay = 0 }: AttributeBarProps) {
  const barColor = ATTR_COLORS[label] || 'bg-amber-500';
  
  // Determine glow based on value
  const getGlow = () => {
    if (value >= 90) return 'shadow-[0_0_12px_rgba(245,158,11,0.4)]';
    if (value >= 75) return 'shadow-[0_0_8px_rgba(245,158,11,0.25)]';
    return '';
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold tracking-[0.2em] text-zinc-500">{label}</span>
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.3 }}
          className={`text-xs font-black tabular-nums ${value >= 90 ? 'text-amber-400' : value >= 75 ? 'text-amber-500' : 'text-white'}`}
        >
          {value}
        </motion.span>
      </div>
      <div className="h-2 bg-zinc-800/80 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
          className={`h-full rounded-full ${barColor} ${getGlow()}`}
        />
      </div>
    </div>
  );
}
