"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';

interface ScannerRevealProps {
  phase: 'idle' | 'locked' | 'scanning' | 'counting' | 'calibrating' | 'surging' | 'reveal' | 'result';
  imageUrl: string;
  displayScore: number;
  finalScore: number;
  systemText: string;
}

const SCAN_MESSAGES = [
  'ANALYZING ENERGY',
  'CALIBRATING AURA',
  'THREAT INDEX RISING',
  'CHAOS SIGNATURE DETECTED',
  'POWER SURGE DETECTED',
  'MEASURING DOMINANCE',
  'QUANTIFYING PRESENCE',
];

export default function ScannerReveal({
  phase,
  imageUrl,
  displayScore,
  finalScore,
  systemText,
}: ScannerRevealProps) {
  const [scanMessage, setScanMessage] = useState(SCAN_MESSAGES[0]);
  const [scanLineOffset, setScanLineOffset] = useState(0);

  // Rotate scan messages during scanning phase
  useEffect(() => {
    if (phase === 'scanning') {
      const interval = setInterval(() => {
        setScanMessage(SCAN_MESSAGES[Math.floor(Math.random() * SCAN_MESSAGES.length)]);
      }, 400);
      return () => clearInterval(interval);
    }
  }, [phase]);

  // Animate scan line position
  useEffect(() => {
    if (phase === 'scanning') {
      const interval = setInterval(() => {
        setScanLineOffset(prev => (prev + 1) % 100);
      }, 16);
      return () => clearInterval(interval);
    }
  }, [phase]);

  const formatNumber = (n: number) => n.toLocaleString('en-US');

  const hudId = useMemo(() => Math.random().toString(36).slice(2, 8).toUpperCase(), []);

  return (
    <div className="relative aspect-video rounded-2xl overflow-hidden bg-zinc-950 border border-amber-500/30 scanner-hud">
      {/* Image */}
      <img
        src={imageUrl}
        alt="Scanning"
        className="w-full h-full object-cover"
      />

      {/* HUD Corner Brackets */}
      {['top-3 left-3', 'top-3 right-3', 'bottom-3 left-3', 'bottom-3 right-3'].map((pos, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 + i * 0.05 }}
          className={`absolute ${pos} w-8 h-8 border-amber-400/60 ${
            i === 0 ? 'border-t-2 border-l-2' :
            i === 1 ? 'border-t-2 border-r-2' :
            i === 2 ? 'border-b-2 border-l-2' :
            'border-b-2 border-r-2'
          }`}
        />
      ))}

      {/* HUD Labels */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute top-4 right-4 text-[9px] text-amber-400/50 tracking-widest font-mono"
      >
        PWR_{hudId}
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute bottom-4 left-4 text-[9px] text-amber-400/50 tracking-widest font-mono flex items-center gap-2"
      >
        <span className={`w-1.5 h-1.5 rounded-full ${phase === 'scanning' || phase === 'counting' ? 'bg-amber-400 animate-pulse' : 'bg-amber-400/30'}`} />
        {phase === 'locked' ? 'TARGET LOCKED' :
         phase === 'scanning' ? 'SCANNING...' :
         phase === 'counting' ? 'ANALYZING' :
         phase === 'calibrating' ? 'CALIBRATING' :
         phase === 'surging' ? 'POWER SURGE' :
         phase === 'reveal' ? 'FINALIZING' : 'PROCESSING'}
      </motion.div>

      {/* PHASE 2: Scan Lines */}
      <AnimatePresence>
        {phase === 'scanning' && (
          <>
            {/* Primary scan line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 overflow-hidden"
            >
              <motion.div
                animate={{ top: ['0%', '100%'] }}
                transition={{ repeat: Infinity, duration: 0.9, ease: 'linear' }}
                className="absolute left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-amber-400 to-transparent"
                style={{
                  boxShadow: '0 0 40px 8px rgba(245, 158, 11, 0.6), 0 0 80px 16px rgba(245, 158, 11, 0.3)'
                }}
              />
              {/* Secondary scan line */}
              <motion.div
                animate={{ top: ['100%', '0%'] }}
                transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
                className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
              />
            </motion.div>

            {/* Scan overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-amber-500/5 animate-pulse" />

            {/* Scan message */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <div className="bg-black/60 backdrop-blur-sm px-4 py-2 rounded-lg border border-amber-500/30">
                <div className="text-[10px] text-amber-400 tracking-[0.3em] font-bold animate-pulse">
                  {scanMessage}
                </div>
              </div>
            </motion.div>

            {/* Grid overlay */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: 'linear-gradient(rgba(245,158,11,1) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,1) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }} />
          </>
        )}
      </AnimatePresence>

      {/* PHASE 3: Counting - Numbers fluctuating dramatically */}
      <AnimatePresence>
        {phase === 'counting' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 flex items-center justify-center"
          >
            <div className="text-center">
              <motion.div
                animate={{ scale: [1, 1.02, 1], opacity: [1, 0.8, 1] }}
                transition={{ repeat: Infinity, duration: 0.15 }}
                className="relative"
              >
                <div 
                  className="text-7xl md:text-8xl font-black text-amber-400 tabular-nums score-display"
                  style={{
                    textShadow: '0 0 40px rgba(245, 158, 11, 0.8), 0 0 80px rgba(245, 158, 11, 0.4)'
                  }}
                >
                  {formatNumber(displayScore)}
                </div>
              </motion.div>
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 0.5 }}
                className="text-xs text-amber-400/70 tracking-[0.3em] mt-4 font-bold"
              >
                READING POWER LEVEL...
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PHASE 4: Calibrating */}
      <AnimatePresence>
        {phase === 'calibrating' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 flex items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div 
                className="text-6xl md:text-7xl font-black text-amber-400 mb-4 score-display"
                style={{
                  textShadow: '0 0 30px rgba(245, 158, 11, 0.6)'
                }}
              >
                {formatNumber(finalScore)}
              </div>
              <motion.div
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ repeat: Infinity, duration: 0.6 }}
                className="text-xs text-amber-400 tracking-[0.25em] font-bold"
              >
                {systemText}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PHASE 5: Surging - Energy building */}
      <AnimatePresence>
        {phase === 'surging' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          >
            {/* Intense gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-amber-500/30 via-orange-500/20 to-black/70" />
            
            {/* Energy particles */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ y: '100%', x: `${Math.random() * 100}%`, opacity: 0 }}
                  animate={{ y: '-100%', opacity: [0, 1, 0] }}
                  transition={{
                    duration: 1 + Math.random() * 0.5,
                    repeat: Infinity,
                    delay: Math.random() * 0.5,
                  }}
                  className="absolute w-1 h-8 bg-gradient-to-t from-amber-500 to-transparent"
                  style={{ left: `${(i / 12) * 100}%` }}
                />
              ))}
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.05, 1], y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 0.4 }}
                className="text-center"
              >
                <div 
                  className="text-5xl md:text-6xl font-black text-amber-300 mb-4 score-display"
                  style={{
                    textShadow: '0 0 50px rgba(245, 158, 11, 1), 0 0 100px rgba(245, 158, 11, 0.5)'
                  }}
                >
                  {formatNumber(finalScore)}
                </div>
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ repeat: Infinity, duration: 0.3 }}
                  className="text-xs text-amber-400 tracking-[0.25em] font-black"
                >
                  {systemText}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PHASE 6: Reveal flash + impact */}
      <AnimatePresence>
        {phase === 'reveal' && (
          <>
            {/* White flash */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.5, 1, 0] }}
              transition={{ duration: 0.5, times: [0, 0.15, 0.3, 0.45, 1] }}
              className="absolute inset-0 bg-white z-10"
            />
            
            {/* Expanding border */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1.1, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 border-4 border-amber-400 rounded-2xl"
            />

            {/* Screen shake container is handled by parent */}
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
