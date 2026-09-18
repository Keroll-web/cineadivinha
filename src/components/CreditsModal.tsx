import React from 'react';
import { motion } from 'motion/react';
import { X, Film, Heart, Sparkles, Award, ShieldCheck, Gamepad2, Info } from 'lucide-react';

interface CreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreditsModal: React.FC<CreditsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-xl bg-slate-900 border-2 border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 to-teal-400 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-pink-500/20">
              <Film className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white">Créditos & Como Jogar</h2>
              <p className="text-xs text-slate-400">CineAdivinha: Jogo de Filmes & Moda</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[75vh]">
          {/* Creator Highlight Card */}
          <div className="relative p-5 rounded-2xl bg-gradient-to-br from-pink-950/50 via-slate-900 to-teal-950/40 border-2 border-pink-500/40 shadow-xl shadow-pink-500/10">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-pink-400 mb-1">
              <Sparkles className="w-4 h-4" /> Criadora & Desenvolvedora
            </div>
            <h3 className="text-2xl font-black text-white tracking-wide">
              Giovana Germano Botelho
            </h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Concebido e desenvolvido com paixão pelo cinema, design interativo, gamificação e experiência do usuário multijogador em tempo real.
            </p>
          </div>

          {/* Game Rules & Mechanics */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-teal-400 flex items-center gap-2">
              <Gamepad2 className="w-4 h-4" /> Regras do Jogo & Pontuação
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                <div className="font-bold text-white flex items-center gap-1.5 mb-1 text-sm">
                  <span className="text-emerald-400 font-black">+10 Pontos</span> por Acerto
                </div>
                <p className="text-slate-400 leading-snug">
                  Acerte o título do filme a partir das pistas reveladas (emojis, diretor, citações e sinopses).
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                <div className="font-bold text-white flex items-center gap-1.5 mb-1 text-sm">
                  <span className="text-pink-400 font-black">A cada 30 Pts</span> = Novo Nível
                </div>
                <p className="text-slate-400 leading-snug">
                  Avance de fase e desbloqueie roupas e acessórios cinematográficos para equipar no seu avatar!
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                <div className="font-bold text-white flex items-center gap-1.5 mb-1 text-sm">
                  <span className="text-rose-400 font-black">Tomatada na Tela! 🍅</span>
                </div>
                <p className="text-slate-400 leading-snug">
                  Se você errar ou o tempo esgotar, a plateia atira um tomate suculento que esmaga na sua tela!
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                <div className="font-bold text-white flex items-center gap-1.5 mb-1 text-sm">
                  <span className="text-teal-400 font-black">2 a 4 Jogadores</span> Online
                </div>
                <p className="text-slate-400 leading-snug">
                  Crie uma sala privada, compartilhe o código com amigos ou adicione bots de treino para jogar na hora!
                </p>
              </div>
            </div>
          </div>

          {/* Genres Info */}
          <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 text-xs">
            <h5 className="font-bold text-white mb-2 flex items-center gap-2">
              <Film className="w-4 h-4 text-pink-400" /> Gêneros de Cinema Inclusos
            </h5>
            <div className="flex flex-wrap gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-rose-500/10 text-rose-300 border border-rose-500/20 font-semibold">Terror</span>
              <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/20 font-semibold">Comédia</span>
              <span className="px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-300 border border-blue-500/20 font-semibold">Drama</span>
              <span className="px-2.5 py-1 rounded-lg bg-teal-500/10 text-teal-300 border border-teal-500/20 font-semibold">Animação</span>
              <span className="px-2.5 py-1 rounded-lg bg-pink-500/10 text-pink-300 border border-pink-500/20 font-semibold">Romance</span>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-semibold">Suspense</span>
              <span className="px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-semibold">Todos os Gêneros</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/70 text-center">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-teal-400 text-slate-950 font-bold hover:opacity-90 transition text-sm"
          >
            Entendido, vamos jogar!
          </button>
        </div>
      </motion.div>
    </div>
  );
};
