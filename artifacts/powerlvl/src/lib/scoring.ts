import type { Attributes, Tier, Category } from './types';
import { getTier, CATEGORIES, CATEGORY_STATS } from './types';

const COMMENTARIES: Record<Tier, string[]> = {
  'D-TIER': [
    "Not great. Not terrible. But mostly terrible.",
    "The reading exists. That's about all we can say.",
    "Our sensors almost returned null. Almost.",
    "Power level confirmed. It's just very, very quiet.",
    "There's potential here. It's buried deep.",
  ],
  'C-TIER': [
    "Showing signs of life. We're watching.",
    "Something is activating. Don't get excited yet.",
    "The sparks are there. They need more fuel.",
    "Scouter picked something up. Interesting.",
    "Not embarrassing. That's an upgrade.",
  ],
  'B-TIER': [
    "Actually decent. Respect.",
    "This is legitimately above average. Noted.",
    "The energy here is real. We felt it.",
    "Above the noise. This caught our attention.",
    "B-TIER and rising. Keep going.",
  ],
  'A-TIER': [
    "Dangerous energy in the room.",
    "A-TIER detected. The air shifted.",
    "High-level readings. This demands respect.",
    "Whatever this is, it's fully charged.",
    "The aura here is genuinely threatening.",
  ],
  'S-TIER': [
    "This aura is causing problems.",
    "S-TIER confirmed. We had to recalibrate.",
    "Unstable. Dangerous. Absolutely elite.",
    "Few things read this high. This is one of them.",
    "The power is leaking. We advise distance.",
  ],
  'SS-TIER': [
    "Bro hit SS-TIER. Back up.",
    "SS-TIER readings. Our equipment is shaking.",
    "This is the kind of energy that ends careers.",
    "We've scanned millions. This is different.",
    "The leaderboard noticed. Everyone noticed.",
  ],
  'SSS-TIER': [
    "SSS readings confirmed. Document this.",
    "One of one. The data confirms it.",
    "There is no comparison point. This is SSS.",
    "Our leaderboards needed to be rewritten for this.",
    "The universe acknowledged this scan.",
  ],
  'LIMITLESS': [
    "The algorithm broke. We rebuilt it. It broke again.",
    "MAXIMUM READING ACHIEVED. MAXIMUM.",
    "Beyond the system. Beyond measurement. Beyond.",
    "This should not exist. And yet.",
    "The scouter exploded. We had to rebuild it.",
  ],
};

function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateAttributes(): Attributes {
  return {
    aura: randomBetween(10, 100),
    power: randomBetween(10, 100),
    status: randomBetween(10, 100),
    threat: randomBetween(10, 100),
  };
}

function attributesToScore(attrs: Attributes): number {
  const weights = {
    aura: 0.30,
    power: 0.30,
    status: 0.20,
    threat: 0.20,
  };

  const weighted =
    attrs.aura * weights.aura +
    attrs.power * weights.power +
    attrs.status * weights.status +
    attrs.threat * weights.threat;

  const normalized = weighted / 100;
  const curved = Math.pow(normalized, 1.4);
  const score = Math.round(curved * 100000);

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

  const catStats = CATEGORY_STATS[category];
  const categoryAttributes: Record<string, number> = {};
  catStats.forEach(stat => {
    const key = stat.label;
    if (stat.format === 'percent') {
      categoryAttributes[key] = randomBetween(30, 100);
    } else if (stat.format === 'grade') {
      categoryAttributes[key] = randomBetween(20, 100);
    } else {
      categoryAttributes[key] = randomBetween(15, 100);
    }
  });

  return { score, tier, commentary, attributes, category, categoryAttributes };
}

export function formatScore(score: number): string {
  return score.toLocaleString('en-US');
}

export function formatGlobalStat(value: number): string {
  const scaled = value * 97 + Math.round(value * 2.3);
  return scaled.toLocaleString('en-US');
}
