import { motion } from 'framer-motion';
import type { Category } from '../lib/types';
import { CATEGORIES } from '../lib/types';

interface CategorySelectorProps {
  selected: Category;
  onSelect: (category: Category) => void;
}

export default function CategorySelector({ selected, onSelect }: CategorySelectorProps) {
  const categories: Category[] = ['fitness', 'setups', 'rides', 'drip', 'pets', 'wildcard'];

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((cat) => {
        const config = CATEGORIES[cat];
        const isSelected = selected === cat;

        return (
          <motion.button
            key={cat}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(cat)}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg font-bold text-xs tracking-widest transition-all whitespace-nowrap flex-shrink-0 ${
              isSelected
                ? `${config.bgColor} ${config.color} border border-current/40`
                : 'bg-zinc-800 text-zinc-400 border border-zinc-700 hover:border-zinc-600 hover:text-zinc-300'
            }`}
          >
            <span className="text-base">{config.emoji}</span>
            {config.label}
          </motion.button>
        );
      })}
    </div>
  );
}
