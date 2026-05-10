import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Camera, Zap, Share2, RotateCcw, Download } from 'lucide-react';
import { useState, useRef, useCallback } from 'react';
import html2canvas from 'html2canvas';
import TierBadge from '../components/TierBadge';
import AttributeBar from '../components/AttributeBar';
import CategorySelector from '../components/CategorySelector';
import ShareCard from '../components/ShareCard';
import { generateScanResult, formatScore } from '../lib/scoring';
import { TIER_CONFIG, CATEGORIES } from '../lib/types';
import type { ScanResult } from '../lib/scoring';
import type { Category } from '../lib/types';
import { supabase } from '../lib/supabase';

type Phase = 'idle' | 'locked' | 'scanning' | 'counting' | 'calibrating' | 'surging' | 'reveal' | 'result';

const CALIBRATION_TEXTS = ['CALIBRATING AURA', 'ANALYZING PRESENCE', 'MEASURING CHAOS'];
const SYSTEM_TEXTS = ['THREAT DETECTED', 'ENERGY SURGING', 'POWER CASCADING', 'SYSTEM OVERWHELMED'];

export default function Scanner() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [displayScore, setDisplayScore] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [category, setCategory] = useState<Category>('wildcard');
  const [systemText, setSystemText] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);
  const [description, setDescription] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const shareCardRef = useRef<HTMLDivElement>(null);

  const runScanAnimation = useCallback(async (scanResult: ScanResult) => {
    // PHASE 1: locked (image in frame)
    setPhase('locked');
    await new Promise(r => setTimeout(r, 600));

    // PHASE 2: scan lines
    setPhase('scanning');
    await new Promise(r => setTimeout(r, 1600));

    // PHASE 3: counting
    setPhase('counting');
    const target = scanResult.score;
    const startTime = Date.now();
    const countDuration = 1800;

    await new Promise<void>(resolve => {
      const tick = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / countDuration, 1);

        if (progress < 1) {
          const base = Math.round(target * Math.pow(progress, 0.6));
          const noise = Math.round((Math.random() - 0.5) * target * 0.35 * (1 - progress));
          setDisplayScore(Math.max(0, Math.min(target * 1.15, base + noise)));
          requestAnimationFrame(tick);
        } else {
          setDisplayScore(target);
          resolve();
        }
      };
      requestAnimationFrame(tick);
    });

    // PHASE 4: calibrating text appears
    setPhase('calibrating');
    setSystemText(CALIBRATION_TEXTS[Math.floor(Math.random() * CALIBRATION_TEXTS.length)]);
    await new Promise(r => setTimeout(r, 1200));

    // PHASE 5: system text
    setPhase('surging');
    setSystemText(SYSTEM_TEXTS[Math.floor(Math.random() * SYSTEM_TEXTS.length)]);
    await new Promise(r => setTimeout(r, 800));

    // PHASE 6: flash + impact
    setPhase('reveal');
    await new Promise(r => setTimeout(r, 600));

    // PHASE 7: result
    setPhase('result');

    // Save to Supabase
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

  return (
    <div className="min-h-screen bg-black text-white pt-14">
      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <p className="text-[10px] text-zinc-600 tracking-[0.4em] mb-2 uppercase">Scanner v3.0</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Scan Your Power</h1>
          <p className="text-zinc-400 text-sm">Upload anything. Select your category. Measure your dominance.</p>
        </motion.div>

        {/* Category selector */}
        {phase === 'idle' && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="text-xs text-zinc-500 tracking-widest mb-3 font-bold">SELECT CATEGORY</div>
              <CategorySelector selected={category} onSelect={setCategory} />
            </motion.div>

            {/* Description input - Optional */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8"
            >
              <label className="text-xs text-zinc-500 tracking-widest mb-2 font-bold block">
                DESCRIBE YOUR SCAN (OPTIONAL)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value.slice(0, 80))}
                placeholder="e.g., My college dorm setup, Gym transformation, Custom PC build, Street fit..."
                className="w-full bg-zinc-900/50 border border-zinc-700 hover:border-zinc-600 rounded-lg px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-colors resize-none"
                rows={2}
              />
              <div className="text-[10px] text-zinc-600 mt-1.5">
                {description.length}/80 — Helps contextualize your scan
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
                className={`relative cursor-pointer border-2 border-dashed rounded-2xl aspect-video flex flex-col items-center justify-center gap-6 transition-all duration-300 ${
                  isDragging
                    ? 'border-amber-400 bg-amber-500/5'
                    : 'border-zinc-700 hover:border-zinc-500 bg-zinc-950/40'
                }`}
              >
                {/* Corner brackets */}
                {['top-4 left-4', 'top-4 right-4', 'bottom-4 left-4', 'bottom-4 right-4'].map((pos, i) => (
                  <div key={i} className={`absolute ${pos} w-6 h-6 border-amber-500/40 ${
                    i === 0 ? 'border-t-2 border-l-2' :
                    i === 1 ? 'border-t-2 border-r-2' :
                    i === 2 ? 'border-b-2 border-l-2' :
                    'border-b-2 border-r-2'
                  }`} />
                ))}

                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-14 h-14 bg-amber-500/10 rounded-full flex items-center justify-center border border-amber-500/30"
                >
                  <Zap size={24} className="text-amber-400" />
                </motion.div>

                <div className="text-center space-y-2">
                  <p className="font-black text-lg tracking-wide">DROP IMAGE HERE</p>
                  <p className="text-zinc-500 text-sm">or tap to select</p>
                </div>

                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 bg-zinc-800/60 hover:bg-zinc-700 px-4 py-2.5 rounded-lg text-xs font-bold transition-colors">
                    <Upload size={14} />
                    UPLOAD
                  </button>
                  <button className="flex items-center gap-2 bg-zinc-800/60 hover:bg-zinc-700 px-4 py-2.5 rounded-lg text-xs font-bold transition-colors">
                    <Camera size={14} />
                    CAMERA
                  </button>
                </div>

                <p className="text-zinc-600 text-xs tracking-widest">
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

          {(phase !== 'idle' && phase !== 'result') && imageUrl && (
            <motion.div
              key="scanning"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-zinc-900 border border-amber-500/30">
                <img
                  src={imageUrl}
                  alt="Scanning"
                  className="w-full h-full object-cover"
                />

                {/* Scan overlay - Phase 2 */}
                {phase === 'scanning' && (
                  <div className="absolute inset-0">
                    <motion.div
                      animate={{ top: ['0%', '100%'] }}
                      transition={{ repeat: Infinity, duration: 0.9, ease: 'linear' }}
                      className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_30px_rgba(245,158,11,0.8)]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 via-transparent to-amber-500/10 animate-pulse" />
                  </div>
                )}

                {/* Counting phase - PHASE 3 */}
                {phase === 'counting' && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <motion.div
                      animate={{ opacity: [1, 0.6, 1], scale: [1, 1.08, 1] }}
                      transition={{ repeat: Infinity, duration: 0.2 }}
                      className="text-center"
                    >
                      <div className="text-7xl font-black text-amber-400 tabular-nums drop-shadow-[0_0_20px_rgba(245,158,11,0.6)]">
                        {formatScore(displayScore)}
                      </div>
                      <div className="text-xs text-amber-400/60 tracking-widest mt-3 animate-pulse">
                        READING POWER LEVEL...
                      </div>
                    </motion.div>
                  </div>
                )}

                {/* Calibrating phase - PHASE 4 */}
                {phase === 'calibrating' && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center"
                    >
                      <div className="text-6xl font-black text-amber-400 mb-3">{formatScore(result?.score || 0)}</div>
                      <div className="text-xs text-amber-400 tracking-[0.2em] animate-pulse">
                        {systemText}
                      </div>
                    </motion.div>
                  </div>
                )}

                {/* Surging phase - PHASE 5 */}
                {phase === 'surging' && (
                  <div className="absolute inset-0 bg-gradient-to-b from-amber-500/30 to-black/60 flex items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center"
                    >
                      <div className="text-5xl font-black text-amber-300 mb-4 drop-shadow-lg">{formatScore(result?.score || 0)}</div>
                      <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6 }}
                        className="text-xs text-amber-400 tracking-[0.2em] font-bold"
                      >
                        {systemText}
                      </motion.div>
                    </motion.div>
                  </div>
                )}

                {/* Reveal flash - PHASE 6 */}
                {phase === 'reveal' && (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 0.7, 1, 0] }}
                      transition={{ duration: 0.6, times: [0, 0.2, 0.4, 0.6, 1] }}
                      className="absolute inset-0 bg-white"
                    />
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1.2, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0 border-4 border-amber-400"
                    />
                  </>
                )}

                {/* Corner brackets */}
                {['top-3 left-3', 'top-3 right-3', 'bottom-3 left-3', 'bottom-3 right-3'].map((pos, i) => (
                  <div key={i} className={`absolute ${pos} w-8 h-8 border-amber-400/40 ${
                    i === 0 ? 'border-t-2 border-l-2' :
                    i === 1 ? 'border-t-2 border-r-2' :
                    i === 2 ? 'border-b-2 border-l-2' :
                    'border-b-2 border-r-2'
                  }`} />
                ))}

                {/* HUD labels */}
                <div className="absolute top-4 right-4 text-[9px] text-amber-400/50 tracking-widest font-mono">
                  PWR_LVL_{Math.random().toString(36).slice(2, 8).toUpperCase()}
                </div>
                <div className="absolute bottom-4 left-4 text-[9px] text-amber-400/50 tracking-widest font-mono">
                  {phase === 'locked' ? 'LOCKED' : phase === 'scanning' ? 'SCANNING' : phase === 'counting' ? 'ANALYZING' : 'PROCESSING'}
                </div>
              </div>
            </motion.div>
          )}

          {/* PHASE 8: Result screen */}
          {phase === 'result' && result && imageUrl && tierConfig && categoryConfig && (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              {/* Main result image */}
              <div className="relative rounded-2xl overflow-hidden border border-white/10">
                <div className="relative aspect-video">
                  <img
                    src={imageUrl}
                    alt="Result"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

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
                      initial={{ scale: 1.8, opacity: 0, y: 20 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      transition={{ type: 'spring', damping: 12, stiffness: 160, delay: 0.1 }}
                    >
                      <div className={`text-5xl md:text-6xl font-black ${tierConfig.color} leading-none drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]`}>
                        {formatScore(result.score)}
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.35 }}
                      className="mt-3 flex items-center gap-2"
                    >
                      <TierBadge tier={result.tier} size="md" animate />
                      <span className={`text-xs font-bold tracking-widest ${categoryConfig.color}`}>
                        {categoryConfig.emoji} {categoryConfig.label}
                      </span>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Commentary */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className={`p-4 rounded-lg border ${tierConfig.borderColor} bg-zinc-900/50`}
              >
                <p className={`text-sm leading-relaxed ${tierConfig.color} font-medium`}>
                  "{result.commentary}"
                </p>
                <p className="text-zinc-600 text-xs mt-2 tracking-widest">— POWERLVL SYSTEM</p>
              </motion.div>

              {/* Category-specific attributes */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                className="bg-zinc-900/50 border border-white/5 rounded-xl p-5 space-y-4"
              >
                <div className="text-[10px] text-zinc-500 tracking-[0.3em] font-bold mb-4">
                  {categoryConfig.emoji} {categoryConfig.label.toUpperCase()} STATS
                </div>
                {Object.entries(result.categoryAttributes).map(([key, value], i) => (
                  <AttributeBar
                    key={key}
                    label={key.toUpperCase()}
                    value={value}
                    delay={0.65 + i * 0.06}
                  />
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
                  className="flex items-center gap-2 flex-1 justify-center bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-sm tracking-widest py-3.5 rounded-lg transition-colors"
                >
                  <RotateCcw size={14} />
                  SCAN AGAIN
                </button>
                <button
                  onClick={() => setShowShareModal(true)}
                  className="flex items-center gap-2 flex-1 justify-center bg-amber-500 hover:bg-amber-400 text-black font-black text-sm tracking-widest py-3.5 rounded-lg transition-all shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:shadow-[0_0_40px_rgba(245,158,11,0.5)]"
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
                className="text-center text-zinc-600 text-xs tracking-widest pt-2"
              >
                {tierConfig.description.toUpperCase()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Share modal */}
        <AnimatePresence>
          {showShareModal && result && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowShareModal(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-zinc-900 border border-white/10 rounded-2xl p-6 max-w-sm w-full"
              >
                <h2 className="text-lg font-black tracking-wide mb-4">SHARE YOUR POWER</h2>
                <div ref={shareCardRef} className="mb-6 bg-black rounded-lg overflow-hidden">
                  <ShareCard
                    imageUrl={imageUrl}
                    result={result}
                    username="POWERLVL_USER"
                    description={description}
                  />
                </div>
                <button
                  onClick={handleShare}
                  className="w-full flex items-center gap-2 justify-center bg-amber-500 hover:bg-amber-400 text-black font-black text-sm tracking-widest py-3 rounded-lg transition-all"
                >
                  <Download size={14} />
                  DOWNLOAD CARD
                </button>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="w-full mt-3 text-zinc-500 hover:text-white text-sm font-bold tracking-widest py-2 transition-colors"
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
