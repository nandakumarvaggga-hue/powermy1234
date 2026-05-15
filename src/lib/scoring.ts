import type { Attributes, Tier, Category } from './types';
import { getTier, CATEGORIES } from './types';

// Commentary - dramatic, intense, slightly arrogant, meme-aware
const COMMENTARIES: Record<Tier, string[]> = {
  'D-TIER': [
    "The reading is... concerning. Not zero. But close.",
    "Power level detected. Barely. Our sensors almost missed this entirely.",
    "The energy is present. It's just in hibernation mode.",
    "Not a threat. Not yet. But also not nothing.",
    "Everyone starts somewhere. This is that somewhere.",
  ],
  'C-TIER': [
    "Something is waking up here. We're watching.",
    "Early signals of a real power source. Keep going.",
    "The climb is beginning. Potential detected.",
    "Scouter caught something interesting. Don't get comfortable.",
    "This is the beginning of something real.",
  ],
  'B-TIER': [
    "The climb is real. This isn't average anymore.",
    "Power is actively building. We can feel it from here.",
    "Above the noise. Rising fast. Competitors should worry.",
    "This caught our attention. That's rare.",
    "Legitimately impressive. The trajectory continues.",
  ],
  'A-TIER': [
    "This radiates elite potential.",
    "The energy here is genuinely threatening.",
    "Our systems are registering something serious.",
    "Whatever this is, it's fully charged and dangerous.",
    "High-level readings. This demands respect.",
    "Elite status confirmed. Dominance evident.",
  ],
  'S-TIER': [
    "This aura has impressed our hardened systems.",
    "Elite. Dangerous. Absolutely formidable. Proceed with caution.",
    "Our equipment is straining to measure this.",
    "Few things register this high. This is one of them.",
    "The power is substantial. We recommend distance.",
    "Peak performance materialized. We're documenting this.",
  ],
  'SS-TIER': [
    "One of one. The data confirms it. Legendary status.",
    "There is no comparison point. This is singular by definition.",
    "Our leaderboards needed to be rewritten for this.",
    "We've scanned millions. This is objectively different.",
    "The universe acknowledged this scan. That's not normal.",
    "This is what legendary performance looks like. Archived.",
  ],
  'SSS-TIER': [
    "The limits break. We had to rebuild the systems.",
    "MAXIMUM READING APPROACHING. THE SCALE TREMBLES.",
    "Beyond normal parameters. Beyond standard measurement.",
    "This should not exist according to known performance.",
    "The algorithm struggled. We forced it to compute anyway.",
    "You've transcended conventional limits. Congratulations.",
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
    power: randomBetween(15, 100),
    status: randomBetween(15, 100),
    threat: randomBetween(15, 100),
  };
}

function attributesToScore(attrs: Attributes): number {
  const weights = {
    aura: 0.25,
    power: 0.25,
    status: 0.25,
    threat: 0.25,
  };

  const weighted =
    attrs.aura * weights.aura +
    attrs.power * weights.power +
    attrs.status * weights.status +
    attrs.threat * weights.threat;

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
