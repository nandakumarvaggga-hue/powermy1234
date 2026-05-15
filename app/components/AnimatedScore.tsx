"use client";

import { useEffect, useState } from 'react';
import { formatScore } from '../lib/scoring';

interface AnimatedScoreProps {
  score: number;
  className?: string;
  duration?: number;
  onComplete?: () => void;
}

export default function AnimatedScore({
  score,
  className = '',
  duration = 1200,
  onComplete
}: AnimatedScoreProps) {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    let animFrame: number;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth ease-out curve
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayScore(Math.round(score * eased));

      if (progress < 1) {
        animFrame = requestAnimationFrame(animate);
      } else {
        setDisplayScore(score);
        onComplete?.();
      }
    };

    animFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame);
  }, [score, duration, onComplete]);

  return (
    <span className={className}>
      {formatScore(displayScore)}
    </span>
  );
}
