export type Tier =
  | 'D-TIER'
  | 'C-TIER'
  | 'B-TIER'
  | 'A-TIER'
  | 'S-TIER'
  | 'SS-TIER'
  | 'SSS-TIER'
  | 'LIMITLESS';

export type Category = 'fitness' | 'setups' | 'rides' | 'drip' | 'pets' | 'wildcard';

export type StatFormat = 'number' | 'percent' | 'grade';

export interface StatDefinition {
  label: string;
  format: StatFormat;
}

export interface Attributes {
  aura: number;
  power: number;
  status: number;
  threat: number;
}

export interface Scan {
  id: string;
  user_id: string | null;
  image_url: string;
  score: number;
  tier: Tier;
  commentary: string;
  attributes: Attributes;
  category?: Category;
  category_attributes?: Record<string, number>;
  is_public: boolean;
  likes: number;
  share_count?: number;
  view_count?: number;
  created_at: string;
  profiles?: {
    username: string;
    avatar_url: string;
  } | null;
}

export interface Profile {
  id: string;
  username: string;
  avatar_url: string;
  total_scans: number;
  highest_score: number;
  created_at: string;
}

export const TIER_CONFIG: Record<Tier, {
  color: string;
  bgColor: string;
  borderColor: string;
  glowColor: string;
  label: string;
  range: string;
  description: string;
  badge: string;
}> = {
  'D-TIER': {
    color: 'text-zinc-400',
    bgColor: 'bg-zinc-800/60',
    borderColor: 'border-zinc-600',
    glowColor: 'rgba(113,113,122,0.3)',
    label: 'D-TIER',
    range: '0 – 4,999',
    badge: 'D',
    description: 'Not great. Not terrible. But mostly terrible.',
  },
  'C-TIER': {
    color: 'text-sky-400',
    bgColor: 'bg-sky-950/60',
    borderColor: 'border-sky-700',
    glowColor: 'rgba(56,189,248,0.3)',
    label: 'C-TIER',
    range: '5,000 – 19,999',
    badge: 'C',
    description: 'Showing signs of life. We\'re watching.',
  },
  'B-TIER': {
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-950/60',
    borderColor: 'border-emerald-700',
    glowColor: 'rgba(52,211,153,0.3)',
    label: 'B-TIER',
    range: '20,000 – 39,999',
    badge: 'B',
    description: 'Actually decent. Respect.',
  },
  'A-TIER': {
    color: 'text-amber-400',
    bgColor: 'bg-amber-950/60',
    borderColor: 'border-amber-600',
    glowColor: 'rgba(245,158,11,0.3)',
    label: 'A-TIER',
    range: '40,000 – 59,999',
    badge: 'A',
    description: 'Dangerous energy in the room.',
  },
  'S-TIER': {
    color: 'text-orange-400',
    bgColor: 'bg-orange-950/60',
    borderColor: 'border-orange-500',
    glowColor: 'rgba(251,146,60,0.4)',
    label: 'S-TIER',
    range: '60,000 – 79,999',
    badge: 'S',
    description: 'This aura is causing problems.',
  },
  'SS-TIER': {
    color: 'text-rose-400',
    bgColor: 'bg-rose-950/60',
    borderColor: 'border-rose-500',
    glowColor: 'rgba(251,113,133,0.4)',
    label: 'SS-TIER',
    range: '80,000 – 94,999',
    badge: 'SS',
    description: 'Bro hit SS-TIER. Back up.',
  },
  'SSS-TIER': {
    color: 'text-violet-300',
    bgColor: 'bg-violet-950/60',
    borderColor: 'border-violet-400',
    glowColor: 'rgba(167,139,250,0.5)',
    label: 'SSS-TIER',
    range: '95,000 – 99,999',
    badge: 'SSS',
    description: 'SSS readings confirmed. Document this.',
  },
  'LIMITLESS': {
    color: 'text-amber-300',
    bgColor: 'bg-gradient-to-br from-amber-950 to-orange-950',
    borderColor: 'border-amber-400',
    glowColor: 'rgba(253,224,71,0.6)',
    label: 'LIMITLESS',
    range: '100,000',
    badge: '∞',
    description: 'The algorithm broke. We rebuilt it. It broke again.',
  },
};

export function getTier(score: number): Tier {
  if (score >= 100000) return 'LIMITLESS';
  if (score >= 95000) return 'SSS-TIER';
  if (score >= 80000) return 'SS-TIER';
  if (score >= 60000) return 'S-TIER';
  if (score >= 40000) return 'A-TIER';
  if (score >= 20000) return 'B-TIER';
  if (score >= 5000) return 'C-TIER';
  return 'D-TIER';
}

export const CATEGORY_STATS: Record<Category, StatDefinition[]> = {
  setups: [
    { label: 'PROCESSING POWER', format: 'number' },
    { label: 'LOCK-IN RATE', format: 'percent' },
    { label: 'BUILD QUALITY', format: 'grade' },
    { label: 'THREAT OUTPUT', format: 'number' },
    { label: 'RGB STABILITY', format: 'percent' },
  ],
  fitness: [
    { label: 'POWER OUTPUT', format: 'number' },
    { label: 'DISCIPLINE INDEX', format: 'number' },
    { label: 'STAMINA CORE', format: 'number' },
    { label: 'AURA LEVEL', format: 'number' },
    { label: 'THREAT RATING', format: 'percent' },
  ],
  drip: [
    { label: 'RIZZ LEVEL', format: 'number' },
    { label: 'STYLE SYNC', format: 'percent' },
    { label: 'FLEX VALUE', format: 'number' },
    { label: 'TREND ENERGY', format: 'percent' },
    { label: 'AURA OUTPUT', format: 'number' },
  ],
  pets: [
    { label: 'MENACE LEVEL', format: 'number' },
    { label: 'CHAOS INDEX', format: 'percent' },
    { label: 'DIVINE ENERGY', format: 'number' },
    { label: 'BRAIN ACTIVITY', format: 'grade' },
    { label: 'AURA OUTPUT', format: 'number' },
  ],
  rides: [
    { label: 'HORSEPOWER AURA', format: 'number' },
    { label: 'DOMINANCE OUTPUT', format: 'number' },
    { label: 'STREET PRESENCE', format: 'percent' },
    { label: 'THREAT LEVEL', format: 'number' },
    { label: 'ENGINE ENERGY', format: 'number' },
  ],
  wildcard: [
    { label: 'AURA', format: 'number' },
    { label: 'POWER', format: 'number' },
    { label: 'STATUS', format: 'grade' },
    { label: 'THREAT', format: 'number' },
  ],
};

export const CATEGORIES: Record<Category, {
  label: string;
  emoji: string;
  color: string;
  bgColor: string;
  borderColor: string;
  description: string;
  attributes: string[];
}> = {
  fitness: {
    label: 'FITNESS',
    emoji: '💪',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-950',
    borderColor: 'border-emerald-700',
    description: 'Physical power and discipline.',
    attributes: ['power_output', 'discipline_index', 'stamina_core', 'aura_level', 'threat_rating'],
  },
  setups: {
    label: 'SETUPS',
    emoji: '🖥️',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-950',
    borderColor: 'border-cyan-700',
    description: 'Tech dominance and focus.',
    attributes: ['processing_power', 'lock_in_rate', 'build_quality', 'threat_output', 'rgb_stability'],
  },
  rides: {
    label: 'RIDES',
    emoji: '🚗',
    color: 'text-orange-400',
    bgColor: 'bg-orange-950',
    borderColor: 'border-orange-700',
    description: 'Raw threat and dominance.',
    attributes: ['horsepower_aura', 'dominance_output', 'street_presence', 'threat_level', 'engine_energy'],
  },
  drip: {
    label: 'DRIP',
    emoji: '👟',
    color: 'text-pink-400',
    bgColor: 'bg-pink-950',
    borderColor: 'border-pink-700',
    description: 'Style and presence.',
    attributes: ['rizz_level', 'style_sync', 'flex_value', 'trend_energy', 'aura_output'],
  },
  pets: {
    label: 'PETS',
    emoji: '🐾',
    color: 'text-amber-400',
    bgColor: 'bg-amber-950',
    borderColor: 'border-amber-700',
    description: 'Chaotic divine entities.',
    attributes: ['menace_level', 'chaos_index', 'divine_energy', 'brain_activity', 'aura_output'],
  },
  wildcard: {
    label: 'WILDCARD',
    emoji: '⚡',
    color: 'text-amber-400',
    bgColor: 'bg-amber-900',
    borderColor: 'border-amber-700',
    description: 'Anything. Everything.',
    attributes: ['aura', 'power', 'status', 'threat'],
  },
};

export function formatStatValue(value: number, format: StatFormat): string {
  if (format === 'percent') {
    return `${value}%`;
  }
  if (format === 'grade') {
    if (value >= 97) return 'S+';
    if (value >= 90) return 'S';
    if (value >= 80) return 'A+';
    if (value >= 70) return 'A';
    if (value >= 60) return 'B+';
    if (value >= 50) return 'B';
    if (value >= 35) return 'C';
    return 'D';
  }
  // number format — scale to look impressive
  const scaled = value * 97 + Math.round(value * 2.3);
  return scaled.toLocaleString('en-US');
}
