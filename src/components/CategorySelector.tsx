import { motion } from 'framer-motion';
import type { Category } from '../lib/types';
import { CATEGORIES } from '../lib/types';

interface CategorySelectorProps {
  selected: Category;
  onSelect: (category: Category) => void;
}

export default function CategorySelector({ selected, onSelect }: CategorySelectorProps) {
  // Order with setups first (flagship category)
  const categories: Category[] = ['setups', 'fitness', 'rides', 'drip', 'pets', 'wildcard'];

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((cat) => {
        const config = CATEGORIES[cat];
        const isSelected = selected === cat;
        const isSetups = cat === 'setups';

        return (
          <motion.button
            key={cat}
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelect(cat)}
            className={`
              flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs tracking-widest 
              transition-all whitespace-nowrap flex-shrink-0 border
              ${isSelected
                ? `${config.bgColor} ${config.color} ${config.borderColor} shadow-lg`
                : isSetups
                  ? 'bg-zinc-900/80 text-zinc-300 border-zinc-700 hover:border-cyan-700/50 hover:text-cyan-400'
                  : 'bg-zinc-900/60 text-zinc-500 border-zinc-800 hover:border-zinc-600 hover:text-zinc-300'
              }
            `}
          >
            <span className="text-base">{config.emoji}</span>
            <span>{config.label}</span>
            {isSetups && !isSelected && (
              <span className="text-[8px] text-cyan-500/70 tracking-wider">POPULAR</span>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
