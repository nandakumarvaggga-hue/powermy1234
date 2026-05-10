import { motion } from 'framer-motion';
import { Zap, BarChart2, User, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface NavProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

export default function Nav({ activePage, onNavigate }: NavProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { id: 'scanner', label: 'SCAN' },
    { id: 'feed', label: 'FEED' },
    { id: 'leaderboard', label: 'RANKS' },
    { id: 'profile', label: 'PROFILE' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-2 group"
        >
          <div className="w-7 h-7 bg-amber-500 rounded-sm flex items-center justify-center">
            <Zap size={14} className="text-black fill-black" />
          </div>
          <span className="font-black text-white tracking-widest text-sm">POWERLVL</span>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className={`px-4 py-2 text-xs font-bold tracking-widest transition-colors rounded-sm ${
                activePage === link.id
                  ? 'text-amber-400 bg-amber-500/10'
                  : 'text-zinc-500 hover:text-white'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-zinc-400 hover:text-white transition-colors"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden border-t border-white/5 bg-black/95"
        >
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => { onNavigate(link.id); setMenuOpen(false); }}
              className={`w-full text-left px-6 py-4 text-xs font-bold tracking-widest transition-colors ${
                activePage === link.id ? 'text-amber-400' : 'text-zinc-400'
              }`}
            >
              {link.label}
            </button>
          ))}
        </motion.div>
      )}
    </nav>
  );
}
