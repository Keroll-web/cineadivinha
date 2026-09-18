import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Users, Play, Plus, Copy, Check, ArrowRight, Sparkles, 
  Film, Ghost, Smile, HeartHandshake, Heart, Eye, Clapperboard, 
  MessageSquare, Send, ShieldAlert, Bot
} from 'lucide-react';
import { Genre, PlayerProfile, RoomState } from '../types';
import { GENRES } from '../data/movies';
import { AvatarDisplay } from './AvatarDisplay';
import { sound } from '../services/sound';

interface LobbyViewProps {
  profile: PlayerProfile;
  room: RoomState | null;
  onCreateRoom: (genre: Genre, maxPlayers: number) => void;
  onJoinRoom: (code: string) => void;
  onAddBot: () => void;
  onStartGame: () => void;
  onLeaveRoom: () => void;
  onSendChat: (text: string) => void;
  onOpenWardrobe: () => void;
}

export const LobbyView: React.FC<LobbyViewProps> = ({
  profile,
  room,
  onCreateRoom,
  onJoinRoom,
  onAddBot,
  onStartGame,
  onLeaveRoom,
  onSendChat,
  onOpenWardrobe,
}) => {
  const [selectedGenre, setSelectedGenre] = useState<Genre>('todos');
  const [maxPlayers, setMaxPlayers] = useState<number>(4);
  const [joinCodeInput, setJoinCodeInput] = useState('');
  const [copied, setCopied] = useState(false);
  const [chatInput, setChatInput] = useState('');

  const handleCopyCode = () => {
    if (!room) return;
    sound.playClick();
    navigator.clipboard.writeText(room.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    sound.playClick();
    onSendChat(chatInput.trim());
    setChatInput('');
  };

  // Icon mapping for genres
  const renderGenreIcon = (id: Genre) => {
    switch (id) {
      case 'terror': return <Ghost className="w-5 h-5" />;
      case 'comedia': return <Smile className="w-5 h-5" />;
      case 'drama': return <HeartHandshake className="w-5 h-5" />;
      case 'animacao': return <Sparkles className="w-5 h-5" />;
      case 'romance': return <Heart className="w-5 h-5" />;
      case 'suspense': return <Eye className="w-5 h-5" />;
      default: return <Clapperboard className="w-5 h-5" />;
    }
  };

  // If already inside a room, show the Room Waiting Lobby
  if (room) {
    const isHost = room.hostId === profile.id;
    const canStart = room.players.length >= 2;
    const activeGenreInfo = GENRES.find((g) => g.id === room.genre) || GENRES[0];

    return (
      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Room Header Banner */}
        <div className="relative rounded-3xl p-6 mb-6 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border-2 border-slate-800 shadow-2xl overflow-hidden">
          <div className="absolute -right-12 -top-12 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-12 -bottom-12 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs uppercase font-black px-2.5 py-1 rounded-lg bg-pink-500/20 text-pink-300 border border-pink-500/30">
                  Sala Privada
                </span>
                <span className="text-xs font-bold text-teal-400">
                  Gênero: {activeGenreInfo.name}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-3">
                Código da Sala:
                <span className="px-3 py-1 rounded-xl bg-slate-950 border-2 border-teal-400/80 font-mono text-teal-300 tracking-wider">
                  {room.code}
                </span>
                <button
                  onClick={handleCopyCode}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition text-xs flex items-center gap-1"
                  title="Copiar código da sala"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span className="hidden sm:inline font-bold">{copied ? 'Copiado!' : 'Copiar'}</span>
                </button>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Convide amigos compartilhando este código! Mínimo de 2 e máximo de 4 jogadores por partida.
              </p>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                onLeaveRoom();
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 text-slate-300 hover:text-rose-400 hover:bg-slate-750 transition"
            >
              Sair da Sala
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Players Grid (Slots 1 to 4) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-teal-400" />
                Jogadores Conectados ({room.players.length}/{room.maxPlayers})
              </h3>

              {room.players.length < room.maxPlayers && (
                <button
                  onClick={() => {
                    sound.playClick();
                    onAddBot();
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-500/15 hover:bg-teal-500/25 border border-teal-500/30 text-teal-300 text-xs font-bold transition"
                >
                  <Bot className="w-4 h-4" /> + Adicionar Bot de Treino
                </button>
              )}
            </div>

            {/* 4 Player Slots Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {Array.from({ length: room.maxPlayers }).map((_, idx) => {
                const player = room.players[idx];
                if (player) {
                  const isCurrent = player.id === profile.id;
                  return (
                    <motion.div
                      key={player.id}
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className={`relative p-4 rounded-2xl border-2 flex items-center gap-3 transition-all ${
                        isCurrent
                          ? 'bg-gradient-to-br from-slate-900 to-pink-950/40 border-pink-500/60 shadow-lg shadow-pink-500/10'
                          : 'bg-slate-900/90 border-slate-800'
                      }`}
                    >
                      {/* Avatar preview */}
                      <div className="relative">
                        <AvatarDisplay avatar={player.avatar} size="md" showAura={true} />
                        {player.isHost && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center text-[10px] font-black shadow">
                            👑
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-sm font-bold text-white truncate">
                            {player.name}
                          </h4>
                          {isCurrent && (
                            <span className="text-[10px] font-black uppercase px-1.5 py-0.2 rounded bg-pink-500/20 text-pink-400 border border-pink-500/30">
                              Você
                            </span>
                          )}
                          {player.isBot && (
                            <span className="text-[10px] font-bold uppercase px-1.5 py-0.2 rounded bg-slate-800 text-teal-300">
                              Bot
                            </span>
                          )}
                        </div>

                        <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-1">
                          <span className="text-teal-400 font-semibold">Pronto</span>
                          <span>•</span>
                          <span>{player.score || 0} pts</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                }

                // Empty Slot
                return (
                  <div
                    key={`empty_${idx}`}
                    className="p-4 rounded-2xl border-2 border-dashed border-slate-800 bg-slate-950/40 flex items-center justify-center text-center flex-col gap-2 min-h-[92px]"
                  >
                    <span className="text-xs text-slate-500 font-medium">
                      Vaga {idx + 1} Livre
                    </span>
                    <button
                      onClick={() => {
                        sound.playClick();
                        onAddBot();
                      }}
                      className="text-[11px] font-bold text-teal-400 hover:text-teal-300 flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Adicionar Bot
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Start Game Action */}
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-sm font-bold text-white">
                  {canStart ? 'Pronto para começar a sessão!' : 'Aguardando 2º jogador...'}
                </div>
                <div className="text-xs text-slate-400">
                  {canStart
                    ? `${room.players.length} jogadores prontos para adivinhar filmes.`
                    : 'Adicione um bot ou convide um amigo pelo código para liberar o início.'}
                </div>
              </div>

              {isHost ? (
                <button
                  onClick={() => {
                    sound.playCorrect();
                    onStartGame();
                  }}
                  disabled={!canStart}
                  className={`w-full sm:w-auto px-8 py-3.5 rounded-2xl font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-xl ${
                    canStart
                      ? 'bg-gradient-to-r from-pink-500 via-rose-500 to-teal-400 text-white shadow-pink-500/25 hover:opacity-95 hover:scale-105 active:scale-95'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <Play className="w-5 h-5 fill-current" /> Iniciar Partida
                </button>
              ) : (
                <div className="text-xs font-bold text-teal-400 bg-teal-500/10 border border-teal-500/20 px-4 py-2.5 rounded-xl flex items-center gap-2">
                  <Sparkles className="w-4 h-4 animate-spin duration-3000" />
                  Aguardando o anfitrião iniciar...
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Room Live Chat */}
          <div className="lg:col-span-5 flex flex-col h-80 sm:h-96 bg-slate-950/80 rounded-2xl border border-slate-800 overflow-hidden shadow-inner">
            <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between bg-slate-900/80">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <MessageSquare className="w-4 h-4 text-pink-400" />
                Chat da Sala
              </div>
              <span className="text-[10px] text-slate-400">Ao vivo</span>
            </div>

            {/* Messages Scroll */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2 text-xs">
              {room.messages.map((m) => (
                <div
                  key={m.id}
                  className={`p-2 rounded-xl leading-relaxed ${
                    m.type === 'system'
                      ? 'bg-slate-900/60 text-slate-400 italic border border-slate-800/60'
                      : m.type === 'correct'
                      ? 'bg-emerald-950/30 text-emerald-300 border border-emerald-500/30'
                      : m.type === 'splat'
                      ? 'bg-rose-950/40 text-rose-300 border border-rose-500/30'
                      : 'bg-slate-900 text-slate-200 border border-slate-800'
                  }`}
                >
                  {m.type !== 'system' && (
                    <span className="font-bold text-pink-400 mr-1.5">
                      {m.senderName}:
                    </span>
                  )}
                  <span>{m.text}</span>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendChatMessage} className="p-2 border-t border-slate-800 flex gap-2 bg-slate-900/60">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Mande uma mensagem..."
                maxLength={60}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-400"
              />
              <button
                type="submit"
                className="p-2 rounded-xl bg-teal-500 text-slate-950 font-bold hover:bg-teal-400 transition"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Initial Home Screen (Create Room, Join Room, Genre Selection)
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero Welcome & Cine Branding */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-pink-500/10 via-rose-500/10 to-teal-500/10 border border-pink-500/30 text-xs font-bold text-pink-300 mb-4 shadow-sm">
          <Film className="w-3.5 h-3.5 text-pink-400" />
          Adivinhação de Filmes • Moda & Avatares • Multijogador Online
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          Acerte o Filme, Ganhe Roupas e Fuja dos{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500">
            Tomates! 🍅
          </span>
        </h1>

        <p className="text-sm sm:text-base text-slate-300 mt-3">
          10 pontos por acerto! A cada 30 pontos você sobe de nível e desbloqueia roupas exclusivas para personalizar seu avatar. Jogue em salas de 2 a 4 pessoas em tempo real!
        </p>
      </div>

      {/* Main Mode Panels Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Create Game & Genre Selection */}
        <div className="lg:col-span-7 bg-slate-900/90 border-2 border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <Clapperboard className="w-5 h-5 text-pink-400" />
              1. Escolha o Gênero do Cinema
            </h3>
            <span className="text-xs text-slate-400">Variedade de filmes</span>
          </div>

          {/* Genre Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-6">
            {GENRES.map((g) => {
              const isSelected = selectedGenre === g.id;
              return (
                <button
                  key={g.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedGenre(g.id);
                  }}
                  className={`p-3 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between min-h-[90px] ${
                    isSelected
                      ? 'bg-gradient-to-br from-pink-950/40 via-slate-900 to-teal-950/40 border-teal-400 shadow-md shadow-teal-500/10 scale-[1.02]'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className={`p-1.5 rounded-xl text-white ${isSelected ? 'bg-teal-500 text-slate-950' : 'bg-slate-800'}`}>
                      {renderGenreIcon(g.id)}
                    </div>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
                    )}
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-white mt-2 leading-tight">
                      {g.name}
                    </h4>
                    <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                      {g.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Number of Players Choice (2 to 4) */}
          <div className="mb-6 pt-4 border-t border-slate-800">
            <label className="text-xs font-bold text-slate-300 mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-teal-400" /> Limite de Jogadores por Sala
              </span>
              <span className="text-pink-400 font-black">2 a 4 Jogadores</span>
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[2, 3, 4].map((num) => (
                <button
                  key={num}
                  onClick={() => {
                    sound.playClick();
                    setMaxPlayers(num);
                  }}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition ${
                    maxPlayers === num
                      ? 'bg-gradient-to-r from-pink-500 to-rose-500 border-pink-400 text-white shadow-md shadow-pink-500/20'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {num} Jogadores
                </button>
              ))}
            </div>
          </div>

          {/* Create Room Button */}
          <button
            onClick={() => {
              sound.playCorrect();
              onCreateRoom(selectedGenre, maxPlayers);
            }}
            className="w-full py-4 rounded-2xl font-black text-sm uppercase tracking-wider bg-gradient-to-r from-pink-500 via-rose-500 to-teal-400 text-white shadow-xl shadow-pink-500/25 hover:opacity-95 hover:scale-[1.01] active:scale-[0.99] transition flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" /> Criar Nova Sala Online
          </button>
        </div>

        {/* Right Column: Enter with Code + Avatar Quick Preview */}
        <div className="lg:col-span-5 space-y-6">
          {/* Join with Code Card */}
          <div className="bg-slate-900/90 border-2 border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur">
            <h3 className="text-lg font-black text-white flex items-center gap-2 mb-2">
              <ArrowRight className="w-5 h-5 text-teal-400" />
              Entrar em Sala Existente
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Recebeu um código de sala de um amigo? Digite abaixo:
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!joinCodeInput.trim()) return;
                sound.playClick();
                onJoinRoom(joinCodeInput.trim().toUpperCase());
              }}
              className="space-y-3"
            >
              <input
                type="text"
                value={joinCodeInput}
                onChange={(e) => setJoinCodeInput(e.target.value.toUpperCase())}
                placeholder="Ex: CINE24"
                maxLength={8}
                className="w-full bg-slate-950 border-2 border-slate-800 rounded-2xl px-4 py-3.5 text-center font-mono text-xl tracking-widest text-teal-300 font-black focus:outline-none focus:border-teal-400 transition"
              />

              <button
                type="submit"
                disabled={!joinCodeInput.trim()}
                className="w-full py-3.5 rounded-2xl font-black text-sm uppercase tracking-wider bg-teal-500 hover:bg-teal-400 text-slate-950 transition shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Entrar na Sala
              </button>
            </form>
          </div>

          {/* Player Style Showcase Card */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-pink-950/30 border-2 border-slate-800 rounded-3xl p-6 shadow-xl flex items-center gap-4">
            <div className="relative shrink-0">
              <AvatarDisplay avatar={profile.avatar} size="lg" showAura={true} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="text-[10px] uppercase font-black tracking-wider text-pink-400">
                Seu Personagem
              </div>
              <h4 className="text-base font-black text-white truncate">
                {profile.name}
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Nível {profile.level} • {profile.totalPoints} pontos acumulados
              </p>

              <button
                onClick={() => {
                  sound.playClick();
                  onOpenWardrobe();
                }}
                className="mt-3 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 text-xs font-bold transition flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" /> Personalizar Roupas
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
