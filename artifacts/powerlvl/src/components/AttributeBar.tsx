import { motion } from 'framer-motion';
import type { StatFormat } from '../lib/types';
import { formatStatValue } from '../lib/types';

interface AttributeBarProps {
  label: string;
  value: number;
  format?: StatFormat;
  delay?: number;
  color?: string;
}

const LABEL_COLORS: Record<string, string> = {
  'PROCESSING POWER': 'text-cyan-400',
  'LOCK-IN RATE': 'text-cyan-300',
  'BUILD QUALITY': 'text-cyan-400',
  'THREAT OUTPUT': 'text-rose-400',
  'RGB STABILITY': 'text-violet-400',
  'POWER OUTPUT': 'text-emerald-400',
  'DISCIPLINE INDEX': 'text-emerald-300',
  'STAMINA CORE': 'text-emerald-400',
  'AURA LEVEL': 'text-amber-400',
  'THREAT RATING': 'text-rose-400',
  'RIZZ LEVEL': 'text-pink-400',
  'STYLE SYNC': 'text-pink-300',
  'FLEX VALUE': 'text-pink-400',
  'TREND ENERGY': 'text-fuchsia-400',
  'AURA OUTPUT': 'text-amber-400',
  'MENACE LEVEL': 'text-rose-400',
  'CHAOS INDEX': 'text-orange-400',
  'DIVINE ENERGY': 'text-amber-300',
  'BRAIN ACTIVITY': 'text-cyan-400',
  'HORSEPOWER AURA': 'text-orange-400',
  'DOMINANCE OUTPUT': 'text-orange-300',
  'STREET PRESENCE': 'text-amber-400',
  'THREAT LEVEL': 'text-rose-400',
  'ENGINE ENERGY': 'text-orange-400',
  'AURA': 'text-amber-400',
  'POWER': 'text-rose-400',
  'STATUS': 'text-violet-400',
  'THREAT': 'text-orange-400',
};

const BAR_COLORS: Record<string, string> = {
  'PROCESSING POWER': 'bg-cyan-400',
  'LOCK-IN RATE': 'bg-cyan-300',
  'BUILD QUALITY': 'bg-cyan-400',
  'THREAT OUTPUT': 'bg-rose-500',
  'RGB STABILITY': 'bg-violet-500',
  'POWER OUTPUT': 'bg-emerald-400',
  'DISCIPLINE INDEX': 'bg-emerald-300',
  'STAMINA CORE': 'bg-emerald-500',
  'AURA LEVEL': 'bg-amber-400',
  'THREAT RATING': 'bg-rose-500',
  'RIZZ LEVEL': 'bg-pink-500',
  'STYLE SYNC': 'bg-pink-400',
  'FLEX VALUE': 'bg-fuchsia-500',
  'TREND ENERGY': 'bg-fuchsia-400',
  'AURA OUTPUT': 'bg-amber-400',
  'MENACE LEVEL': 'bg-rose-500',
  'CHAOS INDEX': 'bg-orange-500',
  'DIVINE ENERGY': 'bg-amber-400',
  'BRAIN ACTIVITY': 'bg-cyan-500',
  'HORSEPOWER AURA': 'bg-orange-500',
  'DOMINANCE OUTPUT': 'bg-orange-400',
  'STREET PRESENCE': 'bg-amber-500',
  'THREAT LEVEL': 'bg-rose-600',
  'ENGINE ENERGY': 'bg-orange-500',
  'AURA': 'bg-amber-500',
  'POWER': 'bg-rose-500',
  'STATUS': 'bg-violet-500',
  'THREAT': 'bg-orange-500',
};

const GRADE_COLORS: Record<string, string> = {
  'S+': 'text-amber-300',
  'S': 'text-amber-400',
  'A+': 'text-orange-400',
  'A': 'text-emerald-400',
  'B+': 'text-sky-400',
  'B': 'text-sky-500',
  'C': 'text-zinc-400',
  'D': 'text-zinc-500',
};

export default function AttributeBar({ label, value, format = 'number', delay = 0 }: AttributeBarProps) {
  const displayColor = LABEL_COLORS[label] || 'text-amber-400';
  const barColor = BAR_COLORS[label] || 'bg-amber-500';
  const displayValue = formatStatValue(value, format);
  const gradeColor = format === 'grade' ? (GRADE_COLORS[displayValue] || 'text-zinc-400') : '';

  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between gap-4">
        <div className="flex items-center gap-2 min-w-0">
          <div className={`w-1 h-3 rounded-full flex-shrink-0 ${barColor} opacity-80`} />
          <span className="text-[10px] font-bold tracking-[0.15em] text-zinc-500 uppercase truncate">{label}</span>
        </div>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.3 }}
          className={`font-black text-right flex-shrink-0 ${
            format === 'grade' ? `text-xl ${gradeColor}` :
            format === 'percent' ? `text-lg ${displayColor}` :
            `text-xl ${displayColor}`
          }`}
        >
          {displayValue}
        </motion.span>
      </div>
      {format !== 'grade' && (
        <div className="h-1 bg-zinc-900 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${value}%` }}
            transition={{ duration: 0.9, delay, ease: 'easeOut' }}
            className={`h-full rounded-full ${barColor} opacity-70`}
          />
        </div>
      )}
    </div>
  );
}
