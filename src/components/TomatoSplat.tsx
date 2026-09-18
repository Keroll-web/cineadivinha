import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { sound } from '../services/sound';

interface TomatoSplatProps {
  active: boolean;
  onComplete?: () => void;
  message?: string;
}

export const TomatoSplat: React.FC<TomatoSplatProps> = ({
  active,
  onComplete,
  message = 'ERRROU! VOCÊ RECEBEU UM TOMATE!',
}) => {
  const [phase, setPhase] = useState<'idle' | 'flying' | 'splat' | 'sliding'>('idle');

  useEffect(() => {
    if (!active) {
      setPhase('idle');
      return;
    }

    // Trigger flight
    setPhase('flying');
    sound.playClick();

    // Impact splat at 350ms
    const timerImpact = setTimeout(() => {
      setPhase('splat');
      sound.playTomatoSplat();
    }, 350);

    // Slide down at 800ms
    const timerSlide = setTimeout(() => {
      setPhase('sliding');
    }, 850);

    // Fade out and cleanup
    const timerCleanup = setTimeout(() => {
      setPhase('idle');
      if (onComplete) onComplete();
    }, 2800);

    return () => {
      clearTimeout(timerImpact);
      clearTimeout(timerSlide);
      clearTimeout(timerCleanup);
    };
  }, [active, onComplete]);

  if (!active && phase === 'idle') return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center overflow-hidden">
      {/* Background impact flash */}
      <AnimatePresence>
        {(phase === 'splat' || phase === 'sliding') && (
          <motion.div
            initial={{ opacity: 0.35 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-red-600/30"
          />
        )}
      </AnimatePresence>

      {/* 1. Tomato Flying from distance */}
      {phase === 'flying' && (
        <motion.div
          initial={{ scale: 0.1, y: 350, opacity: 0.8, rotate: -40 }}
          animate={{ scale: 2.2, y: 0, opacity: 1, rotate: 180 }}
          transition={{ duration: 0.35, ease: 'easeIn' }}
          className="relative w-28 h-28 flex items-center justify-center filter drop-shadow-2xl"
        >
          <span className="text-8xl select-none filter drop-shadow-lg">🍅</span>
        </motion.div>
      )}

      {/* 2. Splat Impact & Sauce Dripping */}
      {(phase === 'splat' || phase === 'sliding') && (
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{
            scale: phase === 'splat' ? [0.6, 1.25, 1] : 1,
            opacity: 1,
            y: phase === 'sliding' ? 80 : 0,
          }}
          transition={{
            scale: { duration: 0.25, ease: 'backOut' },
            y: { duration: 1.8, ease: 'easeInOut' },
            opacity: { duration: 0.4 },
          }}
          className="relative flex flex-col items-center justify-center max-w-lg w-full px-4"
        >
          {/* Main Splat Sauce SVG */}
          <div className="relative w-72 h-72 sm:w-96 sm:h-96 filter drop-shadow-2xl">
            <svg viewBox="0 0 400 400" className="w-full h-full overflow-visible">
              <defs>
                <radialGradient id="splatRed" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="60%" stopColor="#dc2626" />
                  <stop offset="100%" stopColor="#991b1b" />
                </radialGradient>
                <filter id="sauceGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Main gooey blast */}
              <path
                d="M 200 120 
                   C 230 90, 280 110, 290 140 
                   C 320 130, 360 170, 340 210 
                   C 370 240, 350 290, 310 300 
                   C 320 340, 270 360, 240 330 
                   C 210 370, 160 360, 150 320 
                   C 110 340, 80 290, 100 250 
                   C 60 230, 70 170, 110 160 
                   C 100 120, 150 90, 200 120 Z"
                fill="url(#splatRed)"
                filter="url(#sauceGlow)"
              />

              {/* Satellite drops */}
              <circle cx="80" cy="110" r="14" fill="#dc2626" />
              <circle cx="60" cy="190" r="10" fill="#ef4444" />
              <circle cx="330" cy="110" r="12" fill="#b91c1c" />
              <circle cx="360" cy="180" r="9" fill="#dc2626" />
              <circle cx="120" cy="370" r="11" fill="#991b1b" />
              <circle cx="280" cy="380" r="13" fill="#dc2626" />
              <circle cx="330" cy="330" r="8" fill="#ef4444" />

              {/* Dripping sauce fingers running down screen */}
              <path
                d="M 160 310 C 160 360, 155 400, 158 440 C 160 450, 170 450, 168 440 C 166 390, 172 350, 175 310 Z"
                fill="#b91c1c"
              />
              <path
                d="M 230 320 C 235 380, 230 430, 234 490 C 236 500, 246 500, 244 490 C 242 420, 248 370, 248 320 Z"
                fill="#991b1b"
              />
              <path
                d="M 290 290 C 295 340, 290 390, 294 430 C 296 440, 304 440, 302 430 C 300 380, 304 330, 302 290 Z"
                fill="#dc2626"
              />

              {/* Yellow seeds floating in puree */}
              <ellipse cx="180" cy="180" rx="6" ry="3" fill="#fef08a" transform="rotate(25 180 180)" />
              <ellipse cx="230" cy="200" rx="7" ry="3" fill="#fef08a" transform="rotate(-35 230 200)" />
              <ellipse cx="200" cy="260" rx="6" ry="3.5" fill="#fde047" transform="rotate(60 200 260)" />
              <ellipse cx="150" cy="230" rx="5" ry="3" fill="#fef08a" transform="rotate(-15 150 230)" />
              <ellipse cx="260" cy="250" rx="6" ry="3" fill="#fde047" transform="rotate(40 260 250)" />

              {/* Green tomato stem cap tossed on glass */}
              <path
                d="M 200 190 
                   L 190 170 L 198 175 L 205 160 L 208 175 L 222 170 L 212 182 L 225 195 L 210 192 L 208 208 L 200 195 Z"
                fill="#16a34a"
                stroke="#14532d"
                strokeWidth="1.5"
              />
              <circle cx="204" cy="180" r="3" fill="#86efac" />
            </svg>
          </div>

          {/* Bold Comic Banner Message */}
          <motion.div
            initial={{ scale: 0.5, rotate: -6, opacity: 0 }}
            animate={{ scale: [0.5, 1.15, 1], rotate: -3, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="absolute -bottom-8 sm:-bottom-12 bg-slate-950/95 border-4 border-rose-500 text-white px-6 py-3 rounded-2xl shadow-[0_10px_35px_rgba(244,63,94,0.6)] flex items-center gap-3"
          >
            <span className="text-3xl sm:text-4xl animate-bounce">🍅</span>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-black tracking-wider text-rose-400 uppercase font-sans">
                SPLAAAAT!
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-200">
                {message}
              </div>
            </div>
            <span className="text-3xl sm:text-4xl animate-bounce">🍅</span>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};
