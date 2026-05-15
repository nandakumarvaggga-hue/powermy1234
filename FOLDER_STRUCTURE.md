# POWERLVL Project Structure

## Overview
This project uses a clean, scalable folder structure organized by feature and concern separation for easy maintenance and updates.

## Folder Structure

```
src/
├── components/
│   ├── ui/                 # Reusable UI components (buttons, cards, etc.)
│   ├── scanner/            # Scanner-specific components
│   ├── social/             # Social feed & sharing components
│   ├── shared/             # Shared utility components
│   ├── AttributeBar.tsx    # Attribute display bars
│   ├── TierBadge.tsx       # Tier display badge
│   └── ...
│
├── lib/
│   ├── config/
│   │   ├── tier-config.ts  # Tier system configuration (TIER_CONFIG, CATEGORY_CONFIG)
│   │   └── ...             # Other config files
│   ├── utils/
│   │   ├── animations.ts   # Smooth animation presets & easing functions
│   │   └── ...             # Other utilities
│   ├── types.ts            # TypeScript type definitions
│   ├── scoring.ts          # Scoring algorithm & commentary
│   └── supabase.ts         # Database integration
│
├── hooks/                  # Custom React hooks
│
├── pages/                  # Next.js pages
│   ├── Scanner.tsx
│   ├── Landing.tsx
│   ├── Feed.tsx
│   ├── Leaderboard.tsx
│   └── Profile.tsx
│
└── styles/                 # Global styles
```

## Configuration System

### Tier Configuration
All tier-related configurations are centralized in `lib/config/tier-config.ts`:

```typescript
// Importing tier and category configs
import { TIER_CONFIG, CATEGORY_CONFIG } from '../lib/config/tier-config';

// Access tier styling and metadata
const tierStyle = TIER_CONFIG['S-TIER'];
// Returns: { color, bgColor, borderColor, label, range, description }

// Access category-specific settings
const categoryStyle = CATEGORY_CONFIG['fitness'];
// Returns: { label, emoji, color, bgColor, borderColor, description, attributes }
```

### How to Update Tiers or Categories

1. **Modify tier ranges or styling**: Edit `src/lib/config/tier-config.ts` in the `TIER_CONFIG` object
2. **Update tier names**: Edit `src/lib/types.ts` and change the `Tier` type definition
3. **Update scoring thresholds**: Edit `src/lib/types.ts` in the `getTier()` function
4. **Add new categories**: Edit `src/lib/config/tier-config.ts` to add to `CATEGORY_CONFIG`

## Animation System

Smooth animations are centralized in `lib/utils/animations.ts` for consistency:

```typescript
import { ANIMATION_PRESETS, SMOOTH_TRANSITIONS, EASING } from '../lib/utils/animations';

// Use animation presets
<motion.div {...ANIMATION_PRESETS.slideUp}>
  Content
</motion.div>

// Use transition classes
<div className={SMOOTH_TRANSITIONS.normal}>
  Hover me
</div>
```

### Available Animation Presets
- `fadeIn` - Simple opacity fade
- `slideUp` - Slide up with fade
- `slideDown` - Slide down with fade
- `slideRight` - Slide right with fade
- `scaleIn` - Scale up from 0.95
- `pulse` - Continuous pulse effect
- `subtle` - Minimal fade
- `bounce` - Interactive bounce on hover/tap

## Key Files and Their Purpose

| File | Purpose |
|------|---------|
| `lib/config/tier-config.ts` | All tier and category styling/metadata |
| `lib/types.ts` | Core TypeScript types (Tier, Category, Scan, etc.) |
| `lib/scoring.ts` | Power level calculation and commentary generation |
| `lib/utils/animations.ts` | Reusable animation presets and transitions |
| `components/TierBadge.tsx` | Renders tier badges with smooth animations |
| `components/AttributeBar.tsx` | Displays attributes with formatted values |
| `components/ShareCard.tsx` | Social share card with HUD styling |

## Adding New Features

### Adding a New Component
1. Create in `components/` or appropriate subfolder
2. Import types from `lib/types.ts`
3. Import configs from `lib/config/tier-config.ts` as needed
4. Use animation presets from `lib/utils/animations.ts`

### Updating Tier Styling
1. Go to `lib/config/tier-config.ts`
2. Modify the `TIER_CONFIG` object for the tier you want to change
3. Changes automatically propagate to all components using `TIER_CONFIG`

### Modifying Animations
1. Update presets in `lib/utils/animations.ts`
2. All components using these presets get instant updates
3. Add new presets for new animation patterns

## Dependencies

- **framer-motion** - Animation library
- **lucide-react** - Icon library
- **typescript** - Type safety
- **tailwindcss** - Styling

## Notes

- No legacy tier names or migration functions remain
- All tier/category configs are in one central location for easy updates
- Animation system is consistent across all components
- New team members can quickly find configuration points to modify
