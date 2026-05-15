# Quick Reference Guide

## Import Cheat Sheet

### Importing Tier Configs
```typescript
import { TIER_CONFIG, CATEGORY_CONFIG } from '../lib/config/tier-config';

// Usage
const tierStyle = TIER_CONFIG['S-TIER'];
const categoryStyle = CATEGORY_CONFIG['fitness'];
```

### Importing Types
```typescript
import type { Tier, Category, Scan, Attributes } from '../lib/types';
import { getTier } from '../lib/types';
```

### Importing Utilities
```typescript
import { ANIMATION_PRESETS, SMOOTH_TRANSITIONS, EASING } from '../lib/utils/animations';
```

### Importing Scoring
```typescript
import { generateScan, formatScore } from '../lib/scoring';
```

## Common Tasks

### 1. Display a Tier Badge
```typescript
import TierBadge from '../components/TierBadge';

<TierBadge tier="S-TIER" size="md" animate />
```

### 2. Display an Attribute Bar
```typescript
import AttributeBar from '../components/AttributeBar';

<AttributeBar label="POWER OUTPUT" value={85} delay={0} />
```

### 3. Get Tier from Score
```typescript
import { getTier } from '../lib/types';

const tier = getTier(75000); // Returns 'SS-TIER'
```

### 4. Use Smooth Animations
```typescript
import { motion } from 'framer-motion';
import { ANIMATION_PRESETS } from '../lib/utils/animations';

<motion.div {...ANIMATION_PRESETS.slideUp}>
  Content
</motion.div>
```

### 5. Access Category Info
```typescript
import { CATEGORY_CONFIG } from '../lib/config/tier-config';

const config = CATEGORY_CONFIG['setups'];
console.log(config.label);    // 'SETUP'
console.log(config.emoji);    // '🖥'
console.log(config.color);    // 'text-cyan-400'
```

## File Paths at a Glance

```
Need to change...                        Go to...
─────────────────────────────────────────────────────────
Tier colors/ranges/styling              lib/config/tier-config.ts
Tier names or scoring thresholds         lib/types.ts
Category names or styling                lib/config/tier-config.ts
Animation patterns                       lib/utils/animations.ts
Power level calculation                  lib/scoring.ts
Tier display component                   components/TierBadge.tsx
Attribute bars                           components/AttributeBar.tsx
Category selector                        components/CategorySelector.tsx
```

## Tier System Reference

### Tier Ranges
```
D-TIER:     0 - 12,499
C-TIER:     12,500 - 24,999
B-TIER:     25,000 - 37,499
A-TIER:     37,500 - 49,999
S-TIER:     50,000 - 74,999
SS-TIER:    75,000 - 89,999
SSS-TIER:   90,000 - 99,999
LIMITLESS:  100,000+
```

### Core Attributes
```
AURA    - Presence and magnetism
POWER   - Raw capability
STATUS  - Recognition and standing
THREAT  - Dominance level
```

### Categories
```
SETUP       - Tech dominance
FITNESS     - Physical power
RIDES       - Automotive presence
DRIP        - Style and fashion
PETS        - Chaotic energy
WILDCARD    - Anything
```

## Color Classes for Tiers

```
D-TIER:     text-slate-300
C-TIER:     text-blue-400
B-TIER:     text-cyan-400
A-TIER:     text-emerald-400
S-TIER:     text-amber-400
SS-TIER:    text-orange-400
SSS-TIER:   text-rose-400
LIMITLESS:  text-amber-300
```

## Animation Presets

```
ANIMATION_PRESETS.fadeIn       - Simple fade
ANIMATION_PRESETS.slideUp      - Slide up + fade
ANIMATION_PRESETS.slideDown    - Slide down + fade
ANIMATION_PRESETS.slideRight   - Slide right + fade
ANIMATION_PRESETS.scaleIn      - Scale from 0.95
ANIMATION_PRESETS.pulse        - Continuous pulse
ANIMATION_PRESETS.subtle       - Minimal fade
ANIMATION_PRESETS.bounce       - Hover/tap bounce
```

## Smooth Transition Classes

```
transition-smooth          - Default smooth transition
transition-smooth-fast     - Quick 0.2s transition
transition-smooth-slow     - Slow 0.5s transition
transition-color-smooth    - Color + background transitions
transition-transform-smooth - Transform transitions
```

## Easing Functions

```
EASING.smooth    - Professional cubic bezier
EASING.bounce    - Bouncy elastic feel
EASING.sharp     - Quick and precise
```

## Common Patterns

### Smooth Button with Tier Color
```tsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className={`${TIER_CONFIG['S-TIER'].color} transition-smooth`}
>
  Action
</motion.button>
```

### Animated List of Items
```tsx
{items.map((item, i) => (
  <motion.div
    key={item.id}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: i * 0.1 }}
  >
    {item.name}
  </motion.div>
))}
```

### Category Badge with Styling
```tsx
const config = CATEGORY_CONFIG['fitness'];
<div className={`${config.bgColor} ${config.borderColor} border rounded-lg p-3`}>
  <span className={config.color}>{config.label}</span>
</div>
```

---

**Last Updated:** May 15, 2026
**Version:** Clean & Organized
