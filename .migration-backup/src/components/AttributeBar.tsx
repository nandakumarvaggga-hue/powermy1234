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
  'CHAOS ENERGY': 'bg-orange-500',
  PRESENCE: 'bg-amber-400',
  INTIMIDATION: 'bg-rose-500',
  RARITY: 'bg-violet-400',
};

export default function AttributeBar({ label, value, delay = 0 }: AttributeBarProps) {
  const barColor = ATTR_COLORS[label] || 'bg-amber-500';

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold tracking-widest text-zinc-400">{label}</span>
        <span className="text-xs font-black text-white">{value}</span>
      </div>
      <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, delay, ease: 'easeOut' }}
          className={`h-full rounded-full ${barColor}`}
        />
      </div>
    </div>
  );
}
