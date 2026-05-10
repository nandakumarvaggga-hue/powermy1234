import type { Attributes, Tier, Category } from './types';
import { getTier, CATEGORIES } from './types';

const COMMENTARIES: Record<Tier, string[]> = {
  DORMANT: [
    "The reading is... disappointing. But potential exists.",
    "Power level detected. Barely.",
    "Our sensors almost missed this entirely.",
    "The energy is present. It's just very, very quiet.",
    "Not zero. But close.",
  ],
  SPARKING: [
    "Something is waking up here. We're watching.",
    "Early signals of a real power source.",
    "The sparks are there. Needs more fuel.",
    "Scouter caught something interesting. Keep going.",
    "This is the beginning of something.",
  ],
  RISING: [
    "The climb is real. This isn't average.",
    "Power is actively building. We can feel it.",
    "Above the noise. Rising fast.",
    "This caught our attention. That's rare.",
    "Legitimately impressive. The arc continues.",
  ],
  CHARGED: [
    "This setup radiates elite instability.",
    "The energy here is genuinely threatening.",
    "Our sensors are warming up. Uncomfortably.",
    "Whatever this is, it's fully charged.",
    "High-level readings. This demands respect.",
  ],
  VOLATILE: [
    "This aura has caused psychological damage.",
    "Unstable. Dangerous. Absolutely elite.",
    "Our equipment is struggling to contain the reading.",
    "Few things register this high. This is one of them.",
    "The power is leaking. We advise distance.",
  ],
  SINGULAR: [
    "One of one. The data confirms it.",
    "There is no comparison point. This is singular.",
    "Our leaderboards needed to be rewritten for this.",
    "We've scanned millions. This is different.",
    "The universe acknowledged this scan.",
  ],
  LIMITLESS: [
    "The scouter exploded. We had to rebuild it.",
    "MAXIMUM READING ACHIEVED. MAXIMUM.",
    "Beyond the system. Beyond measurement. Beyond.",
    "This should not exist. And yet.",
    "The algorithm refused to output a number. We forced it.",
  ],
};

function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateAttributes(): Attributes {
  return {
    aura: randomBetween(10, 100),
    drip: randomBetween(10, 100),
    discipline: randomBetween(10, 100),
    chaos_energy: randomBetween(10, 100),
    presence: randomBetween(10, 100),
    intimidation: randomBetween(10, 100),
    rarity: randomBetween(10, 100),
  };
}

function attributesToScore(attrs: Attributes): number {
  const weights = {
    aura: 0.18,
    drip: 0.14,
    discipline: 0.14,
    chaos_energy: 0.16,
    presence: 0.16,
    intimidation: 0.12,
    rarity: 0.10,
  };

  const weighted =
    attrs.aura * weights.aura +
    attrs.drip * weights.drip +
    attrs.discipline * weights.discipline +
    attrs.chaos_energy * weights.chaos_energy +
    attrs.presence * weights.presence +
    attrs.intimidation * weights.intimidation +
    attrs.rarity * weights.rarity;

  // Scale to 0-100000 with dramatic curve (most scores cluster in middle tiers)
  const normalized = weighted / 100;
  const curved = Math.pow(normalized, 1.4);
  const score = Math.round(curved * 100000);

  // Add small variance
  const variance = randomBetween(-2000, 2000);
  return Math.max(0, Math.min(100000, score + variance));
}

function pickCommentary(tier: Tier): string {
  const options = COMMENTARIES[tier];
  return options[Math.floor(Math.random() * options.length)];
}

export interface ScanResult {
  score: number;
  tier: Tier;
  commentary: string;
  attributes: Attributes;
  category: Category;
  categoryAttributes: Record<string, number>;
}

export function generateScanResult(category: Category = 'wildcard'): ScanResult {
  const attributes = generateAttributes();
  const score = attributesToScore(attributes);
  const tier = getTier(score);
  const commentary = pickCommentary(tier);

  // Generate category-specific attributes based on selected category
  const categoryConfig = CATEGORIES[category];
  const categoryAttributes: Record<string, number> = {};
  categoryConfig.attributes.forEach(attr => {
    categoryAttributes[attr] = randomBetween(10, 100);
  });

  return { score, tier, commentary, attributes, category, categoryAttributes };
}

export function formatScore(score: number): string {
  return score.toLocaleString('en-US');
}
