import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Clock, Award, Film, Sparkles, CheckCircle2, XCircle, 
  Send, Trophy, ArrowRight, Eye, ShieldAlert, Heart
} from 'lucide-react';
import { Movie, PlayerProfile, RoomState } from '../types';
import { MOVIES_DATABASE } from '../data/movies';
import { AvatarDisplay } from './AvatarDisplay';
import { sound } from '../services/sound';

interface GameViewProps {
  room: RoomState;
  profile: PlayerProfile;
  revealedMovie: Movie | null;
  onSubmitGuess: (guess: string) => void;
  onTriggerTomato: (targetPlayerId: string, playerName: string) => void;
}

export const GameView: React.FC<GameViewProps> = ({
  room,
  profile,
  revealedMovie,
  onSubmitGuess,
  onTriggerTomato,
}) => {
  const [typedGuess, setTypedGuess] = useState('');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const currentRound = room.round;
  const isPlaying = room.status === 'playing';
  const isRoundResult = room.status === 'round_result';

  // Find local player in room
  const localPlayer = room.players.find((p) => p.id === profile.id);
  const hasAnswered = localPlayer?.hasAnswered || false;
  const wasCorrect = localPlayer?.lastAnswerCorrect;

  // Retrieve current active movie data
  const currentMovie: Movie | undefined =
    revealedMovie ||
    MOVIES_DATABASE.find((m) => m.id === currentRound?.movieId) ||
    MOVIES_DATABASE[0];

  const revealedCount = currentRound?.revealedHintsCount || (isRoundResult ? 4 : 1);
  const timeLeft = currentRound?.timeLeft ?? 0;

  // Reset local state on new round
  useEffect(() => {
    if (isPlaying) {
      setSelectedOption(null);
      setTypedGuess('');
    }
  }, [currentRound?.roundNumber, isPlaying]);

  // Tick sound when time is running low
  useEffect(() => {
    if (isPlaying && timeLeft > 0 && timeLeft <= 5) {
      sound.playTick();
    }
  }, [timeLeft, isPlaying]);

  const handleOptionClick = (option: string) => {
    if (hasAnswered || !isPlaying) return;
    sound.playClick();
    setSelectedOption(option);
    onSubmitGuess(option);
  };

  const handleTypedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedGuess.trim() || hasAnswered || !isPlaying) return;
    sound.playClick();
    onSubmitGuess(typedGuess.trim());
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Top Game Bar: Round number, Genre, Timer */}
      <div className="bg-slate-900/90 border-2 border-slate-800 rounded-3xl p-4 sm:p-5 mb-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-600 flex items-center justify-center text-white font-black text-lg shadow-md shadow-pink-500/20">
            {currentRound?.roundNumber || 1}
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-pink-400">
              Rodada {currentRound?.roundNumber || 1} de {currentRound?.totalRounds || 5}
            </div>
            <h2 className="text-lg font-black text-white capitalize">
              Gênero: {room.genre === 'todos' ? 'Todos os Gêneros' : room.genre}
            </h2>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="flex items-center gap-3 bg-slate-950 px-5 py-2.5 rounded-2xl border border-slate-800">
          <Clock
            className={`w-5 h-5 ${
              timeLeft <= 5 ? 'text-rose-500 animate-bounce' : 'text-teal-400'
            }`}
          />
          <div className="text-right">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Tempo Restante</div>
            <div
              className={`text-2xl font-black font-mono leading-none ${
                timeLeft <= 5 ? 'text-rose-400' : 'text-teal-300'
              }`}
            >
              {timeLeft}s
            </div>
          </div>
        </div>

        {/* User Score Ticker */}
        <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-950 border border-slate-800 text-xs">
          <Award className="w-4 h-4 text-amber-400" />
          <span className="text-slate-400">Sua Pontuação:</span>
          <span className="font-black text-white">{localPlayer?.score || 0} pts</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Movie Mystery Clues & Poster Peek */}
        <div className="lg:col-span-8 space-y-6">
          {/* Mystery Movie Card */}
          <div className="relative rounded-3xl bg-slate-900 border-2 border-slate-800 overflow-hidden shadow-2xl p-6 sm:p-8">
            {/* Ambient Movie Backdrop Glow */}
            <div
              className="absolute inset-0 opacity-15 bg-cover bg-center filter blur-2xl pointer-events-none"
              style={{ backgroundImage: `url(${currentMovie?.posterUrl})` }}
            />

            <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
              {/* Poster Frame (Blurred while guessing, clear on round_result) */}
              <div className="relative w-36 h-52 sm:w-44 sm:h-64 rounded-2xl overflow-hidden shadow-2xl shrink-0 border-2 border-slate-700 bg-slate-950">
                <img
                  src={currentMovie?.posterUrl}
                  alt="Cartaz do Filme"
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover transition-all duration-700 ${
                    isRoundResult
                      ? 'filter-none scale-100'
                      : 'filter blur-md scale-110 brightness-75'
                  }`}
                />

                {!isRoundResult && (
                  <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm flex flex-col items-center justify-center p-3 text-center">
                    <Film className="w-8 h-8 text-pink-400 mb-2 animate-pulse" />
                    <span className="text-xs font-black text-white uppercase tracking-wider">
                      Filme Misterioso
                    </span>
                    <span className="text-[10px] text-slate-300 mt-1">
                      Pistas reveladas abaixo
                    </span>
                  </div>
                )}
              </div>

              {/* Mystery Movie Title and Hints */}
              <div className="flex-1 space-y-4 text-center sm:text-left">
                {isRoundResult ? (
                  <div className="animate-in fade-in duration-500">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-500/30 mb-2">
                      <CheckCircle2 className="w-4 h-4" /> Filme Revelado!
                    </div>
                    <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
                      {currentMovie?.title}
                    </h2>
                    {currentMovie?.originalTitle && (
                      <p className="text-sm text-slate-400 italic">
                        {currentMovie.originalTitle} ({currentMovie.year})
                      </p>
                    )}
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed line-clamp-3">
                      {currentMovie?.synopsis}
                    </p>
                  </div>
                ) : (
                  <div>
                    <span className="text-xs uppercase font-black px-2.5 py-1 rounded-md bg-teal-500/20 text-teal-300 border border-teal-500/30">
                      Qual é o Filme?
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white mt-2">
                      Adivinhe através das Pistas!
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Mais pistas se revelam conforme o cronômetro avança.
                    </p>
                  </div>
                )}

                {/* Progressive Clues List */}
                <div className="space-y-2.5 pt-2">
                  {currentMovie?.hints.map((hint, idx) => {
                    const isUnlocked = revealedCount >= hint.level || isRoundResult;
                    return (
                      <div
                        key={idx}
                        className={`p-3 rounded-2xl border transition-all ${
                          isUnlocked
                            ? 'bg-slate-950/80 border-slate-700 text-white shadow-sm'
                            : 'bg-slate-950/30 border-slate-800/40 text-slate-600 opacity-60'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[11px] font-bold mb-1">
                          <span className={isUnlocked ? 'text-pink-400' : 'text-slate-600'}>
                            Pista {hint.level}:{' '}
                            {hint.type === 'emoji'
                              ? 'Emojis Temáticos'
                              : hint.type === 'info'
                              ? 'Ano & Direção'
                              : hint.type === 'quote'
                              ? 'Citação Marcante'
                              : 'Sinopse Resumida'}
                          </span>
                          {!isUnlocked && (
                            <span className="text-[10px] text-slate-500">
                              Abre em {hint.level === 2 ? '17s' : hint.level === 3 ? '11s' : '5s'}
                            </span>
                          )}
                        </div>

                        {isUnlocked ? (
                          <div
                            className={`font-semibold ${
                              hint.type === 'emoji'
                                ? 'text-xl sm:text-2xl tracking-widest'
                                : 'text-xs text-slate-200'
                            }`}
                          >
                            {hint.content}
                          </div>
                        ) : (
                          <div className="text-xs text-slate-600 italic">
                            🔒 Pista bloqueada temporariamente...
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Answering Controls (Multiple Choice & Manual Text Input) */}
          {!isRoundResult ? (
            <div className="space-y-4">
              {/* Answer Status Message if answered */}
              {hasAnswered && (
                <div
                  className={`p-4 rounded-2xl border-2 flex items-center justify-center gap-2 font-bold text-sm ${
                    wasCorrect
                      ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                      : 'bg-rose-950/60 border-rose-500 text-rose-300'
                  }`}
                >
                  {wasCorrect ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      Você acertou! +10 pontos garantidos! Aguarde o fim da rodada.
                    </>
                  ) : (
                    <>
                      <span className="text-xl">🍅</span>
                      Você errou e levou um tomate! Aguarde a revelação do filme.
                    </>
                  )}
                </div>
              )}

              {/* 4 Multiple Choice Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(currentRound?.options || currentMovie?.options || []).map((option, idx) => {
                  const isSelected = selectedOption === option;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleOptionClick(option)}
                      disabled={hasAnswered}
                      className={`p-4 rounded-2xl border-2 text-left font-bold text-sm transition-all flex items-center justify-between ${
                        hasAnswered
                          ? isSelected
                            ? wasCorrect
                              ? 'bg-emerald-600/30 border-emerald-400 text-emerald-200'
                              : 'bg-rose-600/30 border-rose-400 text-rose-200'
                            : 'bg-slate-950/60 border-slate-800 text-slate-500'
                          : 'bg-slate-900 border-slate-800 text-white hover:border-teal-400 hover:bg-slate-850 active:scale-[0.98]'
                      }`}
                    >
                      <span className="truncate">{option}</span>
                      <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs text-slate-400 shrink-0 ml-2">
                        {String.fromCharCode(65 + idx)}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Or Manual Guess Typing for Pro Movie Buffs */}
              <form onSubmit={handleTypedSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={typedGuess}
                  onChange={(e) => setTypedGuess(e.target.value)}
                  placeholder="Ou digite o nome completo do filme..."
                  disabled={hasAnswered}
                  className="flex-1 bg-slate-900 border-2 border-slate-800 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-teal-400 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={hasAnswered || !typedGuess.trim()}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-teal-400 text-slate-950 font-black text-sm uppercase tracking-wider hover:opacity-95 transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
                >
                  <Send className="w-4 h-4" /> Chutar
                </button>
              </form>
            </div>
          ) : (
            /* Round Result Countdown */
            <div className="p-6 rounded-3xl bg-slate-900 border-2 border-slate-800 text-center space-y-2">
              <h4 className="text-xl font-black text-white">
                Próxima rodada iniciando em instantes...
              </h4>
              <p className="text-xs text-slate-400">
                Preparem-se para as próximas dicas de cinema!
              </p>
            </div>
          )}
        </div>

        {/* Right Column: Live Players Leaderboard with Avatars & Tomatoes */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-slate-900/90 border-2 border-slate-800 rounded-3xl p-5 shadow-xl">
            <h3 className="text-base font-black text-white mb-3 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              Placar da Partida ({room.players.length} Jogadores)
            </h3>

            <div className="space-y-3">
              {room.players
                .sort((a, b) => b.score - a.score)
                .map((player, rank) => {
                  const isCurrent = player.id === profile.id;
                  return (
                    <div
                      key={player.id}
                      className={`p-3 rounded-2xl border flex items-center gap-3 transition-all ${
                        isCurrent
                          ? 'bg-gradient-to-r from-slate-950 to-pink-950/30 border-pink-500/50 shadow'
                          : 'bg-slate-950/70 border-slate-800'
                      }`}
                    >
                      {/* Rank number */}
                      <span className="w-5 text-center font-black text-xs text-slate-400">
                        #{rank + 1}
                      </span>

                      {/* Avatar */}
                      <div className="relative">
                        <AvatarDisplay
                          avatar={player.avatar}
                          size="sm"
                          showAura={false}
                          isHitWithTomato={player.lastAnswerCorrect === false}
                        />
                      </div>

                      {/* Name & Stats */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-xs font-bold text-white truncate">
                            {player.name}
                          </h4>
                          {isCurrent && (
                            <span className="text-[9px] font-black uppercase px-1 py-0.2 rounded bg-pink-500/20 text-pink-400">
                              Você
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                          <span className="font-bold text-teal-400">{player.score} pts</span>
                          <span>•</span>
                          <span className="flex items-center text-rose-400 font-bold" title="Tomates recebidos">
                            🍅 {player.tomatoes}
                          </span>
                        </div>
                      </div>

                      {/* Answer Indicator */}
                      <div>
                        {player.hasAnswered ? (
                          player.lastAnswerCorrect ? (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-black border border-emerald-500/30">
                              Acertou!
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 text-[10px] font-black border border-rose-500/30">
                              Errou 🍅
                            </span>
                          )
                        ) : (
                          <span className="text-[10px] text-slate-500 italic">
                            Pensando...
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
