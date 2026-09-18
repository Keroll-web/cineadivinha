import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles, Award, ArrowRight, Shirt } from 'lucide-react';
import { WardrobeItem } from '../types';
import { sound } from '../services/sound';
import { getLevelTitle } from '../data/wardrobe';

interface LevelUpModalProps {
  isOpen: boolean;
  newLevel: number;
  unlockedItem: WardrobeItem | null;
  onClose: () => void;
  onOpenWardrobe: () => void;
}

export const LevelUpModal: React.FC<LevelUpModalProps> = ({
  isOpen,
  newLevel,
  unlockedItem,
  onClose,
  onOpenWardrobe,
}) => {
  useEffect(() => {
    if (isOpen) {
      sound.playLevelUp();
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f43f5e', '#14b8a6', '#f59e0b', '#ec4899', '#38bdf8'],
        });
      } catch {
        // Canvas confetti fallback
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 30 }}
        className="relative w-full max-w-md bg-slate-900 border-2 border-amber-400/80 rounded-3xl shadow-[0_15px_50px_rgba(245,158,11,0.25)] p-6 text-center overflow-hidden"
      >
        {/* Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-gradient-to-b from-amber-400/20 to-transparent blur-xl pointer-events-none" />

        {/* Level Up Badge Icon */}
        <div className="relative mx-auto w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-500 via-rose-500 to-pink-500 p-1 shadow-xl shadow-rose-500/30 flex items-center justify-center mb-4">
          <div className="w-full h-full bg-slate-950 rounded-[22px] flex flex-col items-center justify-center">
            <Award className="w-8 h-8 text-amber-400 animate-bounce" />
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-300">
              Nível {newLevel}
            </span>
          </div>
        </div>

        <h2 className="text-2xl font-black text-white uppercase tracking-wide">
          Você Avançou de Fase!
        </h2>
        <p className="text-sm font-bold text-teal-400 mt-1">
          {getLevelTitle(newLevel)}
        </p>
        <p className="text-xs text-slate-400 mt-1">
          Parabéns! Você alcançou mais uma meta de 30 pontos e desbloqueou novidades exclusivas de moda!
        </p>

        {/* Unlocked Item Showcase */}
        {unlockedItem && (
          <div className="my-5 p-4 rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800 text-left flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-lg"
              style={{ backgroundColor: `${unlockedItem.color}25`, border: `2px solid ${unlockedItem.color}` }}
            >
              <Shirt className="w-7 h-7" style={{ color: unlockedItem.color }} />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-pink-500/20 text-pink-300 border border-pink-500/30">
                Novo Item Desbloqueado!
              </span>
              <h4 className="text-base font-bold text-white truncate mt-1">
                {unlockedItem.name}
              </h4>
              <p className="text-xs text-slate-400 line-clamp-1">
                {unlockedItem.description}
              </p>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-2.5 mt-2">
          <button
            onClick={() => {
              onClose();
              onOpenWardrobe();
            }}
            className="flex-1 py-3 px-4 rounded-xl font-black text-sm bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/30 hover:opacity-95 transition flex items-center justify-center gap-2"
          >
            <Shirt className="w-4 h-4" /> Equipar Agora
          </button>
          <button
            onClick={onClose}
            className="py-3 px-4 rounded-xl font-bold text-sm bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition"
          >
            Continuar Jogo
          </button>
        </div>
      </motion.div>
    </div>
  );
};
