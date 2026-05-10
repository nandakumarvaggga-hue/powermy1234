import type { Attributes, Tier, Category } from './types';
import { getTier, CATEGORIES } from './types';

// Commentary - dramatic, intense, slightly arrogant, meme-aware
const COMMENTARIES: Record<Tier, string[]> = {
  DORMANT: [
    "The reading is... concerning. Not zero. But close.",
    "Power level detected. Barely. Our sensors almost missed this entirely.",
    "The energy is present. It's just in hibernation mode.",
    "Not a threat. Not yet. But also not nothing.",
    "Your aura suggests dangerous levels of room temperature energy.",
  ],
  SPARKING: [
    "Something is waking up here. We're watching.",
    "Early signals of a real power source. Keep going.",
    "The sparks are there. Needs more fuel though.",
    "Scouter caught something interesting. Don't get comfortable.",
    "This is the beginning of something. Or the end. We'll see.",
  ],
  RISING: [
    "The climb is real. This isn't average anymore.",
    "Power is actively building. We can feel it from here.",
    "Above the noise. Rising fast. Competitors should worry.",
    "This caught our attention. That's rare.",
    "Legitimately impressive. The arc continues.",
  ],
  CHARGED: [
    "This setup radiates elite instability.",
    "The energy here is genuinely threatening.",
    "Our sensors are warming up. Uncomfortably.",
    "Whatever this is, it's fully charged and dangerous.",
    "High-level readings. This demands respect.",
    "Your aura suggests dangerous levels of caffeine dependency.",
  ],
  VOLATILE: [
    "This aura has caused psychological damage to our systems.",
    "Unstable. Dangerous. Absolutely elite. Proceed with caution.",
    "Our equipment is struggling to contain this reading.",
    "Few things register this high. This is one of them.",
    "The power is leaking. We advise significant distance.",
    "This room has survived multiple all-nighters. We can tell.",
  ],
  SINGULAR: [
    "One of one. The data confirms it. No duplicates exist.",
    "There is no comparison point. This is singular by definition.",
    "Our leaderboards needed to be rewritten for this.",
    "We've scanned millions. This is objectively different.",
    "The universe acknowledged this scan. That's not normal.",
    "This is what peak performance looks like. Documented.",
  ],
  LIMITLESS: [
    "The scouter exploded. We had to rebuild the entire system.",
    "MAXIMUM READING ACHIEVED. THE LIMIT WAS A LIE.",
    "Beyond the system. Beyond measurement. Beyond comprehension.",
    "This should not exist according to physics. And yet.",
    "The algorithm refused to output a number. We forced it anyway.",
    "You broke the scale. We're sending you the repair bill.",
  ],
};

function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateAttributes(): Attributes {
  return {
    aura: randomBetween(15, 100),
    drip: randomBetween(15, 100),
    discipline: randomBetween(15, 100),
    chaos_energy: randomBetween(15, 100),
    presence: randomBetween(15, 100),
    intimidation: randomBetween(15, 100),
    rarity: randomBetween(15, 100),
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

  // Scale to 0-100000 with dramatic curve
  // Most scores cluster in middle tiers, with rare high/low outliers
  const normalized = weighted / 100;
  const curved = Math.pow(normalized, 1.3);
  const score = Math.round(curved * 100000);

  // Add variance
  const variance = randomBetween(-3000, 3000);
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

  // Generate category-specific attributes
  const categoryConfig = CATEGORIES[category];
  const categoryAttributes: Record<string, number> = {};
  categoryConfig.attributes.forEach(attr => {
    categoryAttributes[attr] = randomBetween(20, 100);
  });

  return { score, tier, commentary, attributes, category, categoryAttributes };
}

export function formatScore(score: number): string {
  return score.toLocaleString('en-US');
}
