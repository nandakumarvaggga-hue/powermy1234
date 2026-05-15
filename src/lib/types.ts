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
  description?: string;
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

export const TIER_CONFIG: Record<Tier, { color: string; bgColor: string; borderColor: string; label: string; range: string; description: string }> = {
  'D-TIER': {
    color: 'text-slate-300',
    bgColor: 'bg-slate-900/80',
    borderColor: 'border-slate-700',
    label: 'D-TIER',
    range: '0 – 12,499',
    description: 'The journey begins.',
  },
  'C-TIER': {
    color: 'text-blue-400',
    bgColor: 'bg-blue-950/80',
    borderColor: 'border-blue-800',
    label: 'C-TIER',
    range: '12,500 – 24,999',
    description: 'Climbing the ranks.',
  },
  'B-TIER': {
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-950/80',
    borderColor: 'border-cyan-800',
    label: 'B-TIER',
    range: '25,000 – 37,499',
    description: 'Respectable. Competitive.',
  },
  'A-TIER': {
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-950/80',
    borderColor: 'border-emerald-800',
    label: 'A-TIER',
    range: '37,500 – 49,999',
    description: 'Elite status achieved.',
  },
  'S-TIER': {
    color: 'text-amber-400',
    bgColor: 'bg-amber-950/80',
    borderColor: 'border-amber-700',
    label: 'S-TIER',
    range: '50,000 – 74,999',
    description: 'Extremely rare.',
  },
  'SS-TIER': {
    color: 'text-orange-400',
    bgColor: 'bg-orange-950/80',
    borderColor: 'border-orange-700',
    label: 'SS-TIER',
    range: '75,000 – 89,999',
    description: 'Legendary dominance.',
  },
  'SSS-TIER': {
    color: 'text-rose-400',
    bgColor: 'bg-gradient-to-br from-rose-950/90 to-pink-950/90',
    borderColor: 'border-rose-600',
    label: 'SSS-TIER',
    range: '90,000 – 99,999',
    description: 'One in a billion.',
  },
  LIMITLESS: {
    color: 'text-amber-300',
    bgColor: 'bg-gradient-to-br from-amber-950/90 to-orange-950/90',
    borderColor: 'border-amber-500',
    label: 'LIMITLESS',
    range: '100,000+',
    description: 'Beyond measurement.',
  },
};

export function getTier(score: number): Tier {
  if (score >= 100000) return 'LIMITLESS';
  if (score >= 90000) return 'SSS-TIER';
  if (score >= 75000) return 'SS-TIER';
  if (score >= 50000) return 'S-TIER';
  if (score >= 37500) return 'A-TIER';
  if (score >= 25000) return 'B-TIER';
  if (score >= 12500) return 'C-TIER';
  return 'D-TIER';
}

export const CATEGORIES: Record<Category, { label: string; emoji: string; color: string; bgColor: string; borderColor: string; description: string; attributes: string[] }> = {
  setups: {
    label: 'SETUP',
    emoji: '🖥',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-950/80',
    borderColor: 'border-cyan-800',
    description: 'Processing power and productivity.',
    attributes: ['processing_power', 'lock_in_rate', 'build_quality', 'threat_output', 'rgb_stability'],
  },
  fitness: {
    label: 'FITNESS',
    emoji: '💪',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-950/80',
    borderColor: 'border-emerald-800',
    description: 'Strength and discipline.',
    attributes: ['power_output', 'discipline_index', 'stamina_core', 'aura_level', 'threat_rating'],
  },
  rides: {
    label: 'RIDES',
    emoji: '🚗',
    color: 'text-orange-400',
    bgColor: 'bg-orange-950/80',
    borderColor: 'border-orange-800',
    description: 'Dominance and presence.',
    attributes: ['horsepower_aura', 'dominance_output', 'street_presence', 'threat_level', 'engine_energy'],
  },
  drip: {
    label: 'DRIP',
    emoji: '👟',
    color: 'text-pink-400',
    bgColor: 'bg-pink-950/80',
    borderColor: 'border-pink-800',
    description: 'Style and social appeal.',
    attributes: ['rizz_level', 'style_sync', 'flex_value', 'trend_energy', 'aura_output'],
  },
  pets: {
    label: 'PETS',
    emoji: '🐾',
    color: 'text-amber-400',
    bgColor: 'bg-amber-950/80',
    borderColor: 'border-amber-800',
    description: 'Chaos and divine energy.',
    attributes: ['menace_level', 'chaos_index', 'divine_energy', 'brain_activity', 'aura_output'],
  },
  wildcard: {
    label: 'WILDCARD',
    emoji: '⚡',
    color: 'text-amber-400',
    bgColor: 'bg-amber-900/80',
    borderColor: 'border-amber-700',
    description: 'Anything. Everything.',
    attributes: ['aura', 'power', 'status', 'threat'],
  },
};

// Migration function for backwards compatibility with old tier system
export function migrateLegacyTier(oldTier: string): Tier {
  const legacyMap: Record<string, Tier> = {
    'DORMANT': 'D-TIER',
    'SPARKING': 'C-TIER',
    'RISING': 'B-TIER',
    'CHARGED': 'A-TIER',
    'VOLATILE': 'S-TIER',
    'SINGULAR': 'SS-TIER',
    'LIMITLESS': 'LIMITLESS',
  };
  return legacyMap[oldTier] || 'D-TIER';
}
