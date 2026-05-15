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
