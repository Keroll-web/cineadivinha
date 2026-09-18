import React from 'react';
import { Film, Shirt, Volume2, VolumeX, HelpCircle, Trophy, Sparkles } from 'lucide-react';
import { PlayerProfile } from '../types';
import { AvatarDisplay } from './AvatarDisplay';
import { sound } from '../services/sound';

interface NavbarProps {
  profile: PlayerProfile;
  onOpenWardrobe: () => void;
  onOpenCredits: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  onOpenWardrobe,
  onOpenCredits,
  soundEnabled,
  onToggleSound,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/85 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-2">
        {/* Brand & Creator Attribution */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-pink-500 via-rose-500 to-teal-400 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-pink-500/20 shrink-0">
            <Film className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-400 to-teal-300 font-sans">
                CineAdivinha
              </h1>
              <span className="hidden sm:inline-block text-[10px] uppercase font-black px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20">
                Filmes & Moda
              </span>
            </div>
            <div className="text-[11px] text-slate-400 flex items-center gap-1">
              <span>Criado por</span>
              <button
                onClick={onOpenCredits}
                className="font-bold text-pink-400 hover:text-pink-300 underline underline-offset-2 decoration-pink-500/40 hover:decoration-pink-400 transition"
              >
                Giovana Germano Botelho
              </button>
            </div>
          </div>
        </div>

        {/* Right Action Controls: Wardrobe Button, Points, Audio, Credits */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Wardrobe / Avatar quick button */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenWardrobe();
            }}
            className="flex items-center gap-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-2xl bg-slate-900 border border-slate-800 hover:border-pink-500/50 hover:bg-slate-850 transition group shadow-sm"
          >
            <AvatarDisplay avatar={profile.avatar} size="sm" showAura={false} />
            <div className="text-left hidden xs:block">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Shirt className="w-3 h-3 text-pink-400 group-hover:rotate-12 transition-transform" />
                Guarda-Roupa
              </div>
              <div className="text-xs font-black text-white flex items-center gap-1">
                <span>Nível {profile.level}</span>
                <span className="text-pink-400">• {profile.totalPoints} pts</span>
              </div>
            </div>
          </button>

          {/* Tomato Counter Badge */}
          <div
            title="Tomates recebidos por erros"
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 font-bold"
          >
            <span className="text-base">🍅</span>
            <span>{profile.tomatoesReceivedTotal || 0}</span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              onToggleSound();
            }}
            title={soundEnabled ? 'Silenciar Áudio' : 'Ativar Efeitos Sonoros'}
            className={`p-2 sm:p-2.5 rounded-xl border transition ${
              soundEnabled
                ? 'bg-slate-900 border-slate-800 text-teal-400 hover:text-teal-300 hover:border-teal-500/40'
                : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-400'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" /> : <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>

          {/* Credits / Info Modal Button */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenCredits();
            }}
            title="Sobre o Jogo & Créditos"
            className="p-2 sm:p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition"
          >
            <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
