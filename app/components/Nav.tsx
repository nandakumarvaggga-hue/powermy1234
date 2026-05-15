"use client";

import { motion } from 'framer-motion';
import { Zap, Menu, X, Scan, BarChart2, Trophy, User } from 'lucide-react';
import { useState } from 'react';

interface NavProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

export default function Nav({ activePage, onNavigate }: NavProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { id: 'scanner', label: 'SCAN', icon: Scan },
    { id: 'feed', label: 'FEED', icon: BarChart2 },
    { id: 'leaderboard', label: 'RANKS', icon: Trophy },
    { id: 'profile', label: 'PROFILE', icon: User },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-2.5 group"
        >
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.3)] group-hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] transition-shadow"
          >
            <Zap size={16} className="text-black fill-black" />
          </motion.div>
          <span className="font-black text-white tracking-widest text-sm hidden sm:block">POWERLVL</span>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = activePage === link.id;
            return (
              <motion.button
                key={link.id}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onNavigate(link.id)}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-bold tracking-widest transition-all rounded-lg ${
                  isActive
                    ? 'text-amber-400 bg-amber-500/10'
                    : 'text-zinc-500 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={14} className={isActive ? 'text-amber-400' : ''} />
                {link.label}
              </motion.button>
            );
          })}
        </div>

        {/* Mobile menu button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-zinc-400 hover:text-white transition-colors w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/5"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </motion.button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden border-t border-white/5 bg-black/95 backdrop-blur-xl"
        >
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = activePage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => { onNavigate(link.id); setMenuOpen(false); }}
                className={`w-full flex items-center gap-3 px-6 py-4 text-xs font-bold tracking-widest transition-colors border-b border-white/5 last:border-b-0 ${
                  isActive ? 'text-amber-400 bg-amber-500/5' : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={16} />
                {link.label}
              </button>
            );
          })}
        </motion.div>
      )}
    </nav>
  );
}
