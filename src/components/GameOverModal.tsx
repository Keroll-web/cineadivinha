import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Trophy, Award, Shirt, ArrowRight, RotateCcw } from 'lucide-react';
import { RoomState, PlayerProfile } from '../types';
import { AvatarDisplay } from './AvatarDisplay';
import { sound } from '../services/sound';

interface GameOverModalProps {
  room: RoomState;
  profile: PlayerProfile;
  onRematch: () => void;
  onBackToLobby: () => void;
  onOpenWardrobe: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  room,
  profile,
  onRematch,
  onBackToLobby,
  onOpenWardrobe,
}) => {
  const sortedPlayers = [...room.players].sort((a, b) => b.score - a.score);
  const winner = sortedPlayers[0];
  const isWinner = winner?.id === profile.id;

  useEffect(() => {
    sound.playLevelUp();
    try {
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#f43f5e', '#14b8a6', '#f59e0b', '#ec4899', '#3b82f6'],
      });
    } catch {
      // Confetti fallback
    }
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.85, opacity: 0, y: 30 }}
        className="relative w-full max-w-2xl bg-slate-900 border-2 border-slate-700/90 rounded-3xl shadow-2xl p-6 sm:p-8 text-center my-auto overflow-hidden"
      >
        {/* Top ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-gradient-to-b from-amber-400/20 via-pink-500/15 to-transparent blur-2xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-black uppercase mb-3">
          <Trophy className="w-4 h-4 text-amber-400" /> Fim de Sessão Cinematográfica!
        </div>

        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          {isWinner ? 'Você Foi o Grande Vencedor! 🏆' : `${winner?.name} Venceu a Partida! 🎬`}
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Todos os pontos acumulados foram somados ao seu perfil permanente.
        </p>

        {/* Podium Display (Top 3) */}
        <div className="my-8 flex items-end justify-center gap-3 sm:gap-6 pt-4">
          {/* 2nd Place */}
          {sortedPlayers[1] && (
            <div className="flex flex-col items-center flex-1 max-w-[130px]">
              <div className="mb-2 scale-90">
                <AvatarDisplay avatar={sortedPlayers[1].avatar} size="md" showAura={false} />
              </div>
              <div className="w-full bg-slate-800 border border-slate-700 rounded-t-2xl p-3 flex flex-col items-center justify-center min-h-[95px]">
                <span className="text-xl">🥈</span>
                <span className="text-xs font-bold text-slate-200 truncate w-full text-center">
                  {sortedPlayers[1].name}
                </span>
                <span className="text-xs font-black text-teal-400">
                  {sortedPlayers[1].score} pts
                </span>
              </div>
            </div>
          )}

          {/* 1st Place (Winner) */}
          {sortedPlayers[0] && (
            <div className="flex flex-col items-center flex-1 max-w-[150px] -mt-6">
              <div className="mb-2 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-2xl">👑</div>
                <AvatarDisplay avatar={sortedPlayers[0].avatar} size="lg" showAura={true} />
              </div>
              <div className="w-full bg-gradient-to-b from-amber-500/20 to-slate-800 border-2 border-amber-400/80 rounded-t-2xl p-4 flex flex-col items-center justify-center min-h-[125px] shadow-lg shadow-amber-500/10">
                <span className="text-2xl">🥇</span>
                <span className="text-sm font-black text-white truncate w-full text-center mt-1">
                  {sortedPlayers[0].name}
                </span>
                <span className="text-sm font-black text-amber-300">
                  {sortedPlayers[0].score} pts
                </span>
                <span className="text-[10px] font-bold text-rose-400 mt-1">
                  🍅 {sortedPlayers[0].tomatoes} tomates
                </span>
              </div>
            </div>
          )}

          {/* 3rd Place */}
          {sortedPlayers[2] && (
            <div className="flex flex-col items-center flex-1 max-w-[130px]">
              <div className="mb-2 scale-90">
                <AvatarDisplay avatar={sortedPlayers[2].avatar} size="md" showAura={false} />
              </div>
              <div className="w-full bg-slate-800/80 border border-slate-700 rounded-t-2xl p-3 flex flex-col items-center justify-center min-h-[75px]">
                <span className="text-lg">🥉</span>
                <span className="text-xs font-bold text-slate-300 truncate w-full text-center">
                  {sortedPlayers[2].name}
                </span>
                <span className="text-xs font-black text-teal-400">
                  {sortedPlayers[2].score} pts
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => {
              sound.playClick();
              onRematch();
            }}
            className="py-3.5 px-6 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-teal-400 text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-pink-500/25 hover:opacity-95 transition flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" /> Jogar Novamente
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onOpenWardrobe();
            }}
            className="py-3.5 px-6 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-teal-300 font-bold text-sm transition flex items-center justify-center gap-2"
          >
            <Shirt className="w-4 h-4" /> Ver Roupas Desbloqueadas
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onBackToLobby();
            }}
            className="py-3.5 px-6 rounded-2xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition text-sm font-semibold"
          >
            Voltar ao Menu
          </button>
        </div>
      </motion.div>
    </div>
  );
};
