export type Tier =
  | 'DORMANT'
  | 'SPARKING'
  | 'RISING'
  | 'CHARGED'
  | 'VOLATILE'
  | 'SINGULAR'
  | 'LIMITLESS';

export type Category = 'fitness' | 'setups' | 'rides' | 'drip' | 'pets' | 'wildcard';

export interface Attributes {
  aura: number;
  drip: number;
  discipline: number;
  chaos_energy: number;
  presence: number;
  intimidation: number;
  rarity: number;
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

export const TIER_CONFIG: Record<Tier, { color: string; bgColor: string; borderColor: string; label: string; range: string; description: string }> = {
  DORMANT: {
    color: 'text-zinc-400',
    bgColor: 'bg-zinc-800',
    borderColor: 'border-zinc-600',
    label: 'DORMANT',
    range: '0 – 999',
    description: 'The energy sleeps.',
  },
  SPARKING: {
    color: 'text-sky-400',
    bgColor: 'bg-sky-950',
    borderColor: 'border-sky-700',
    label: 'SPARKING',
    range: '1,000 – 9,999',
    description: 'Something stirs within.',
  },
  RISING: {
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-950',
    borderColor: 'border-emerald-700',
    label: 'RISING',
    range: '10,000 – 29,999',
    description: 'Power is awakening.',
  },
  CHARGED: {
    color: 'text-amber-400',
    bgColor: 'bg-amber-950',
    borderColor: 'border-amber-700',
    label: 'CHARGED',
    range: '30,000 – 59,999',
    description: 'Radiating dangerous energy.',
  },
  VOLATILE: {
    color: 'text-orange-400',
    bgColor: 'bg-orange-950',
    borderColor: 'border-orange-700',
    label: 'VOLATILE',
    range: '60,000 – 84,999',
    description: 'Unstable. Uncontrollable.',
  },
  SINGULAR: {
    color: 'text-rose-400',
    bgColor: 'bg-rose-950',
    borderColor: 'border-rose-700',
    label: 'SINGULAR',
    range: '85,000 – 99,999',
    description: 'One of a kind. Permanently.',
  },
  LIMITLESS: {
    color: 'text-amber-300',
    bgColor: 'bg-gradient-to-br from-amber-950 to-orange-950',
    borderColor: 'border-amber-400',
    label: 'LIMITLESS',
    range: '100,000',
    description: 'Beyond measurement.',
  },
};

export function getTier(score: number): Tier {
  if (score >= 100000) return 'LIMITLESS';
  if (score >= 85000) return 'SINGULAR';
  if (score >= 60000) return 'VOLATILE';
  if (score >= 30000) return 'CHARGED';
  if (score >= 10000) return 'RISING';
  if (score >= 1000) return 'SPARKING';
  return 'DORMANT';
}

export const CATEGORIES: Record<Category, { label: string; emoji: string; color: string; bgColor: string; borderColor: string; description: string; attributes: string[] }> = {
  fitness: {
    label: 'FITNESS',
    emoji: '💪',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-950',
    borderColor: 'border-emerald-700',
    description: 'Physical power and discipline.',
    attributes: ['discipline', 'intensity', 'physique', 'aura'],
  },
  setups: {
    label: 'SETUPS',
    emoji: '🖥',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-950',
    borderColor: 'border-cyan-700',
    description: 'Tech dominance and focus.',
    attributes: ['focus', 'rarity', 'productivity', 'chaos_energy'],
  },
  rides: {
    label: 'RIDES',
    emoji: '🚗',
    color: 'text-orange-400',
    bgColor: 'bg-orange-950',
    borderColor: 'border-orange-700',
    description: 'Raw threat and dominance.',
    attributes: ['dominance', 'threat', 'aura', 'rarity'],
  },
  drip: {
    label: 'DRIP',
    emoji: '👟',
    color: 'text-pink-400',
    bgColor: 'bg-pink-950',
    borderColor: 'border-pink-700',
    description: 'Style and presence.',
    attributes: ['presence', 'drip', 'aura', 'rarity'],
  },
  pets: {
    label: 'PETS',
    emoji: '🐾',
    color: 'text-amber-400',
    bgColor: 'bg-amber-950',
    borderColor: 'border-amber-700',
    description: 'Chaotic divine entities.',
    attributes: ['menace', 'chaos', 'intelligence', 'divine_aura'],
  },
  wildcard: {
    label: 'WILDCARD',
    emoji: '⚡',
    color: 'text-amber-400',
    bgColor: 'bg-amber-900',
    borderColor: 'border-amber-700',
    description: 'Anything. Everything.',
    attributes: ['aura', 'drip', 'discipline', 'chaos_energy'],
  },
};
