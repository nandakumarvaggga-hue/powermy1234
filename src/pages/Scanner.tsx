import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Camera, Zap, Share2, RotateCcw, Download, Sparkles } from 'lucide-react';
import { useState, useRef, useCallback } from 'react';
import html2canvas from 'html2canvas';
import TierBadge from '../components/TierBadge';
import AttributeBar from '../components/AttributeBar';
import CategorySelector from '../components/CategorySelector';
import ShareCard from '../components/ShareCard';
import ScannerReveal from '../components/ScannerReveal';
import { generateScanResult, formatScore } from '../lib/scoring';
import { TIER_CONFIG, CATEGORIES } from '../lib/types';
import type { ScanResult } from '../lib/scoring';
import type { Category } from '../lib/types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

type Phase = 'idle' | 'locked' | 'scanning' | 'counting' | 'calibrating' | 'surging' | 'reveal' | 'result';

const CALIBRATION_TEXTS = ['CALIBRATING AURA', 'ANALYZING PRESENCE', 'MEASURING CHAOS', 'THREAT INDEX RISING'];
const SYSTEM_TEXTS = ['THREAT DETECTED', 'ENERGY SURGING', 'POWER CASCADING', 'SYSTEM OVERWHELMED', 'ANOMALY DETECTED'];

export default function Scanner() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [displayScore, setDisplayScore] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [category, setCategory] = useState<Category>('setups');
  const [systemText, setSystemText] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);
  const [description, setDescription] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const shareCardRef = useRef<HTMLDivElement>(null);

  const runScanAnimation = useCallback(async (scanResult: ScanResult) => {
    // PHASE 1: Target locked
    setPhase('locked');
    await new Promise(r => setTimeout(r, 500));

    // PHASE 2: Scan lines sweep
    setPhase('scanning');
    await new Promise(r => setTimeout(r, 1800));

    // PHASE 3: Numbers counting dramatically
    setPhase('counting');
    const target = scanResult.score;
    const startTime = Date.now();
    const countDuration = 2000;

    await new Promise<void>(resolve => {
      const tick = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / countDuration, 1);

        if (progress < 1) {
          // More dramatic fluctuation
          const base = Math.round(target * Math.pow(progress, 0.5));
          const volatility = (1 - progress) * 0.4;
          const noise = Math.round((Math.random() - 0.5) * target * volatility);
          const overshoot = progress > 0.7 ? Math.round((Math.random() - 0.3) * target * 0.15) : 0;
          setDisplayScore(Math.max(0, Math.min(target * 1.2, base + noise + overshoot)));
          requestAnimationFrame(tick);
        } else {
          setDisplayScore(target);
          resolve();
        }
      };
      requestAnimationFrame(tick);
    });

    // PHASE 4: Calibrating
    setPhase('calibrating');
    setSystemText(CALIBRATION_TEXTS[Math.floor(Math.random() * CALIBRATION_TEXTS.length)]);
    await new Promise(r => setTimeout(r, 1000));

    // PHASE 5: Energy surging
    setPhase('surging');
    setSystemText(SYSTEM_TEXTS[Math.floor(Math.random() * SYSTEM_TEXTS.length)]);
    await new Promise(r => setTimeout(r, 900));

    // PHASE 6: Flash + Impact + Shake
    setPhase('reveal');
    setIsShaking(true);
    await new Promise(r => setTimeout(r, 150));
    setIsShaking(false);
    await new Promise(r => setTimeout(r, 450));

    // PHASE 7: Result
    setPhase('result');

    // Save to Supabase if configured
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('scans').insert({
          image_url: imageUrl,
          score: scanResult.score,
          tier: scanResult.tier,
          commentary: scanResult.commentary,
          attributes: scanResult.attributes,
          category: scanResult.category,
          category_attributes: scanResult.categoryAttributes,
          is_public: true,
        });
      } catch (err) {
        // Non-critical: ignore save errors
      }
    }
  }, [imageUrl]);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) return;
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    const scanResult = generateScanResult(category);
    setResult(scanResult);
    setDisplayScore(0);
    setSystemText('');
    runScanAnimation(scanResult);
  }, [category, runScanAnimation]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleReset = () => {
    setPhase('idle');
    setImageUrl(null);
    setResult(null);
    setDisplayScore(0);
    setSystemText('');
    setShowShareModal(false);
    setDescription('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleShare = async () => {
    if (!shareCardRef.current) return;
    try {
      const canvas = await html2canvas(shareCardRef.current, {
        backgroundColor: '#000000',
        scale: 2,
        useCORS: true,
      });
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `powerlvl-${result?.tier.toLowerCase()}-${Date.now()}.png`;
      link.click();
    } catch (err) {
      console.error('Share failed:', err);
    }
  };

  const tierConfig = result ? TIER_CONFIG[result.tier] : null;
  const categoryConfig = result ? CATEGORIES[result.category] : null;
  const isLimitless = result?.tier === 'LIMITLESS';

  return (
    <div className="min-h-screen bg-black text-white pt-14">
      <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <p className="text-[10px] text-zinc-600 tracking-[0.4em] mb-2 uppercase font-medium">Scanner v3.0</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">
            Scan Your Power
          </h1>
          <p className="text-zinc-500 text-sm max-w-md mx-auto">
            Upload anything. Select your category. Measure your dominance.
          </p>
        </motion.div>

        {/* Category selector - only show in idle */}
        {phase === 'idle' && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <div className="text-[10px] text-zinc-500 tracking-[0.3em] mb-3 font-bold">SELECT CATEGORY</div>
              <CategorySelector selected={category} onSelect={setCategory} />
            </motion.div>

            {/* Description input */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8"
            >
              <label className="text-[10px] text-zinc-500 tracking-[0.3em] mb-2 font-bold block">
                DESCRIBE YOUR SCAN (OPTIONAL)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value.slice(0, 80))}
                placeholder="e.g., Rate my battlestation, College setup, Custom PC build..."
                className="w-full bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all resize-none"
                rows={2}
              />
              <div className="text-[10px] text-zinc-600 mt-1.5 tracking-wide">
                {description.length}/80 characters
              </div>
            </motion.div>
          </>
        )}

        {/* Scanner Frame */}
        <AnimatePresence mode="wait">
          {phase === 'idle' && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative cursor-pointer border-2 border-dashed rounded-2xl aspect-video flex flex-col items-center justify-center gap-5 transition-all duration-300 ${
                  isDragging
                    ? 'border-amber-400 bg-amber-500/5'
                    : 'border-zinc-800 hover:border-zinc-600 bg-zinc-950/50'
                }`}
              >
                {/* Subtle grid */}
                <div className="absolute inset-0 opacity-[0.02] rounded-2xl overflow-hidden" style={{
                  backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }} />

                {/* Corner brackets */}
                {['top-4 left-4', 'top-4 right-4', 'bottom-4 left-4', 'bottom-4 right-4'].map((pos, i) => (
                  <div key={i} className={`absolute ${pos} w-6 h-6 border-amber-500/30 ${
                    i === 0 ? 'border-t-2 border-l-2' :
                    i === 1 ? 'border-t-2 border-r-2' :
                    i === 2 ? 'border-b-2 border-l-2' :
                    'border-b-2 border-r-2'
                  }`} />
                ))}

                <motion.div
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                  className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center border border-amber-500/30"
                >
                  <Zap size={28} className="text-amber-400" />
                </motion.div>

                <div className="text-center space-y-2">
                  <p className="font-black text-lg tracking-wide">DROP IMAGE HERE</p>
                  <p className="text-zinc-500 text-sm">or tap to select</p>
                </div>

                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 bg-zinc-800/80 hover:bg-zinc-700 px-5 py-2.5 rounded-lg text-xs font-bold tracking-widest transition-all border border-zinc-700">
                    <Upload size={14} />
                    UPLOAD
                  </button>
                  <button className="flex items-center gap-2 bg-zinc-800/80 hover:bg-zinc-700 px-5 py-2.5 rounded-lg text-xs font-bold tracking-widest transition-all border border-zinc-700">
                    <Camera size={14} />
                    CAMERA
                  </button>
                </div>

                <p className="text-zinc-600 text-[10px] tracking-[0.2em]">
                  PHOTOS · OBJECTS · PEOPLE · PETS · OUTFITS · SETUPS · VEHICLES
                </p>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleInputChange}
                className="hidden"
              />
            </motion.div>
          )}

          {/* Scanning phases */}
          {(phase !== 'idle' && phase !== 'result') && imageUrl && (
            <motion.div
              key="scanning"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className={isShaking ? 'animate-shake' : ''}
            >
              <ScannerReveal
                phase={phase}
                imageUrl={imageUrl}
                displayScore={displayScore}
                finalScore={result?.score || 0}
                systemText={systemText}
              />
            </motion.div>
          )}

          {/* Result screen */}
          {phase === 'result' && result && imageUrl && tierConfig && categoryConfig && (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-5"
            >
              {/* Main result card */}
              <motion.div 
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 20 }}
                className="relative rounded-2xl overflow-hidden border border-white/10 card-glow"
              >
                <div className="relative aspect-video">
                  <img
                    src={imageUrl}
                    alt="Result"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                  {/* Corner brackets */}
                  {['top-3 left-3', 'top-3 right-3', 'bottom-3 left-3', 'bottom-3 right-3'].map((pos, i) => (
                    <div key={i} className={`absolute ${pos} w-5 h-5 border-amber-400/50 ${
                      i === 0 ? 'border-t border-l' :
                      i === 1 ? 'border-t border-r' :
                      i === 2 ? 'border-b border-l' :
                      'border-b border-r'
                    }`} />
                  ))}

                  {/* Score slam */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <motion.div
                      initial={{ scale: 1.5, opacity: 0, y: 20 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      transition={{ type: 'spring', damping: 12, stiffness: 150, delay: 0.1 }}
                    >
                      <div 
                        className={`text-5xl md:text-7xl font-black ${tierConfig.color} leading-none score-display`}
                        style={{
                          textShadow: isLimitless 
                            ? '0 0 60px rgba(245, 158, 11, 0.8), 0 0 120px rgba(245, 158, 11, 0.4)' 
                            : '0 0 30px rgba(0,0,0,0.8)'
                        }}
                      >
                        {formatScore(result.score)}
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.35 }}
                      className="mt-3 flex items-center gap-2.5"
                    >
                      <TierBadge tier={result.tier} size="md" animate />
                      <span className={`text-xs font-bold tracking-widest ${categoryConfig.color} flex items-center gap-1.5`}>
                        <span className="text-base">{categoryConfig.emoji}</span>
                        {categoryConfig.label}
                      </span>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Commentary */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className={`p-5 rounded-xl border ${tierConfig.borderColor} bg-zinc-900/60`}
              >
                <p className={`text-base leading-relaxed ${tierConfig.color} font-medium italic`}>
                  "{result.commentary}"
                </p>
                <p className="text-zinc-600 text-[10px] mt-3 tracking-[0.3em]">— POWERLVL SYSTEM</p>
              </motion.div>

              {/* Category-specific attributes */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                className="bg-zinc-900/50 border border-white/5 rounded-xl p-5 space-y-4"
              >
                <div className="text-[10px] text-zinc-500 tracking-[0.3em] font-bold flex items-center gap-2">
                  <Sparkles size={12} className={categoryConfig.color} />
                  {categoryConfig.emoji} {categoryConfig.label.toUpperCase()} ATTRIBUTES
                </div>
                {Object.entries(result.categoryAttributes).map(([key, value], i) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.65 + i * 0.08 }}
                  >
                    <AttributeBar
                      label={key.replace(/_/g, ' ').toUpperCase()}
                      value={value}
                      delay={0}
                    />
                  </motion.div>
                ))}
              </motion.div>

              {/* Actions */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="flex gap-3"
              >
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 flex-1 justify-center bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-sm tracking-widest py-4 rounded-xl transition-all border border-zinc-800"
                >
                  <RotateCcw size={14} />
                  SCAN AGAIN
                </button>
                <button
                  onClick={() => setShowShareModal(true)}
                  className="flex items-center gap-2 flex-1 justify-center bg-amber-500 hover:bg-amber-400 text-black font-black text-sm tracking-widest py-4 rounded-xl transition-all shadow-[0_0_40px_rgba(245,158,11,0.25)] hover:shadow-[0_0_60px_rgba(245,158,11,0.4)]"
                >
                  <Share2 size={14} />
                  SHARE
                </button>
              </motion.div>

              {/* Tier description */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="text-center text-zinc-600 text-xs tracking-[0.2em] pt-2"
              >
                {tierConfig.description.toUpperCase()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Share modal */}
        <AnimatePresence>
          {showShareModal && result && imageUrl && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowShareModal(false)}
              className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 max-w-sm w-full max-h-[90vh] overflow-y-auto"
              >
                <h2 className="text-lg font-black tracking-wide mb-4 text-center">SHARE YOUR POWER</h2>
                
                <div ref={shareCardRef} className="mb-5 bg-black rounded-xl overflow-hidden">
                  <ShareCard
                    imageUrl={imageUrl}
                    result={result}
                    username="POWERLVL_USER"
                    description={description}
                  />
                </div>
                
                <button
                  onClick={handleShare}
                  className="w-full flex items-center gap-2 justify-center bg-amber-500 hover:bg-amber-400 text-black font-black text-sm tracking-widest py-3.5 rounded-xl transition-all shadow-[0_0_30px_rgba(245,158,11,0.2)]"
                >
                  <Download size={14} />
                  DOWNLOAD CARD
                </button>
                
                <button
                  onClick={() => setShowShareModal(false)}
                  className="w-full mt-3 text-zinc-500 hover:text-white text-sm font-bold tracking-widest py-2.5 transition-colors"
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
