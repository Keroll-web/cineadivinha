import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Sparkles, Lock, Check, Shirt, Eye, Crown, Hand, CircleDot, 
  Palette, User, Award, ArrowRight
} from 'lucide-react';
import { AvatarConfig, PlayerProfile, WardrobeCategory } from '../types';
import { WARDROBE_ITEMS, getLevelTitle, getNextUnlockableItem } from '../data/wardrobe';
import { AvatarDisplay } from './AvatarDisplay';
import { saveProfile } from '../services/storage';
import { sound } from '../services/sound';

interface WardrobeModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: PlayerProfile;
  onProfileUpdate: (updated: PlayerProfile) => void;
}

const SKIN_TONES = [
  { name: 'Claro', color: '#FDE68A' },
  { name: 'Médio Claro', color: '#FCD34D' },
  { name: 'Bronzeado', color: '#F59E0B' },
  { name: 'Moreno', color: '#D97706' },
  { name: 'Escuro', color: '#78350F' },
  { name: 'Fantasia Rosa', color: '#F472B6' },
];

const HAIR_COLORS = [
  { name: 'Castanho Escuro', color: '#451A03' },
  { name: 'Preto Noite', color: '#0F172A' },
  { name: 'Loiro Dourado', color: '#FACC15' },
  { name: 'Ruivo Fogo', color: '#EA580C' },
  { name: 'Rosa Choque', color: '#EC4899' },
  { name: 'Verde-Água Neon', color: '#14B8A6' },
];

const HAIR_STYLES = [
  { id: 'short', name: 'Curto Moderno' },
  { id: 'curly', name: 'Cacheado / Black' },
  { id: 'long', name: 'Longo Estrela' },
];

const EXPRESSIONS = [
  { id: 'happy', name: 'Alegre / Sorridente' },
  { id: 'cool', name: 'Confiante / VIP' },
];

export const WardrobeModal: React.FC<WardrobeModalProps> = ({
  isOpen,
  onClose,
  profile,
  onProfileUpdate,
}) => {
  const [activeTab, setActiveTab] = useState<WardrobeCategory | 'character'>('outfit');
  const [tempAvatar, setTempAvatar] = useState<AvatarConfig>({ ...profile.avatar });
  const [nameInput, setNameInput] = useState(profile.name);

  // Sync when opened
  React.useEffect(() => {
    if (isOpen) {
      setTempAvatar({ ...profile.avatar });
      setNameInput(profile.name);
    }
  }, [isOpen, profile]);

  if (!isOpen) return null;

  const currentPoints = profile.totalPoints || 0;
  const currentLevel = profile.level || 1;
  const nextItem = getNextUnlockableItem(currentPoints);
  const pointsInCurrentLevel = currentPoints % 30;
  const progressPercent = Math.min(100, Math.round((pointsInCurrentLevel / 30) * 100));

  const handleEquip = (category: WardrobeCategory, itemId: string) => {
    sound.playClick();
    const updated = { ...tempAvatar };
    if (category === 'head') updated.headItem = itemId;
    if (category === 'eyes') updated.eyeItem = itemId;
    if (category === 'outfit') updated.outfitItem = itemId;
    if (category === 'hand') updated.handItem = itemId;
    if (category === 'aura') updated.auraItem = itemId;
    setTempAvatar(updated);
  };

  const handleSave = () => {
    sound.playCorrect();
    const cleanName = nameInput.trim() || profile.name;
    const updatedProfile: PlayerProfile = {
      ...profile,
      name: cleanName,
      avatar: { ...tempAvatar },
    };
    saveProfile(updatedProfile);
    onProfileUpdate(updatedProfile);
    onClose();
  };

  const tabs: { id: WardrobeCategory | 'character'; label: string; icon: React.ReactNode }[] = [
    { id: 'character', label: 'Rosto & Cabelo', icon: <User className="w-4 h-4" /> },
    { id: 'outfit', label: 'Trajes', icon: <Shirt className="w-4 h-4" /> },
    { id: 'head', label: 'Chapéus', icon: <Crown className="w-4 h-4" /> },
    { id: 'eyes', label: 'Óculos', icon: <Eye className="w-4 h-4" /> },
    { id: 'hand', label: 'Mão', icon: <Hand className="w-4 h-4" /> },
    { id: 'aura', label: 'Efeitos', icon: <Sparkles className="w-4 h-4" /> },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 20 }}
        className="relative w-full max-w-4xl bg-slate-900 border-2 border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[90vh]"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 to-teal-400 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-pink-500/20">
              <Shirt className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                Guarda-Roupa da Estrela
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-400 font-bold border border-pink-500/30">
                  Nível {currentLevel}
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                {getLevelTitle(currentLevel)} • Desbloqueie novas roupas a cada 30 pontos!
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left Column: Avatar Live Preview & Level Stats */}
          <div className="md:col-span-5 flex flex-col items-center bg-slate-950/70 p-5 rounded-2xl border border-slate-800/80">
            {/* Player Name Edit */}
            <div className="w-full mb-3">
              <label className="text-xs font-semibold text-slate-400 mb-1 block">Nome do Jogador</label>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                maxLength={20}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm font-bold text-white focus:outline-none focus:border-teal-400 transition"
                placeholder="Seu nome no cinema..."
              />
            </div>

            {/* Avatar Render */}
            <div className="relative my-2 p-4 rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-slate-800 shadow-inner flex items-center justify-center">
              <AvatarDisplay avatar={tempAvatar} size="xl" showAura={true} />
            </div>

            {/* Level & Points Progress Tracker */}
            <div className="w-full mt-4 bg-slate-900/90 p-4 rounded-xl border border-slate-800">
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="font-bold text-teal-400 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" /> Nível {currentLevel}
                </span>
                <span className="text-slate-300 font-semibold">
                  {currentPoints} pontos acumulados
                </span>
              </div>

              {/* Progress bar to next 30-pts level */}
              <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-700/60 p-0.5">
                <motion.div
                  className="h-full bg-gradient-to-r from-pink-500 via-rose-400 to-teal-400 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>{pointsInCurrentLevel}/30 pts nesta fase</span>
                <span>Faltam {30 - pointsInCurrentLevel} pts p/ Nível {currentLevel + 1}</span>
              </div>

              {/* Next item hint */}
              {nextItem && (
                <div className="mt-3 pt-3 border-t border-slate-800 flex items-center gap-2.5 text-xs">
                  <div className="w-8 h-8 rounded-lg bg-slate-950 border border-slate-700 flex items-center justify-center text-amber-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] text-slate-400">Próximo desbloqueio:</div>
                    <div className="font-bold text-slate-200 truncate">{nextItem.name}</div>
                  </div>
                  <div className="text-xs font-bold text-pink-400">
                    {nextItem.requiredPoints} pts
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Wardrobe Category Tabs and Items Grid */}
          <div className="md:col-span-7 flex flex-col">
            {/* Category Navigation Pills */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 p-1 bg-slate-950/80 rounded-2xl border border-slate-800">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    sound.playClick();
                    setActiveTab(tab.id);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md shadow-pink-500/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Contents */}
            <div className="flex-1 overflow-y-auto pr-1">
              {activeTab === 'character' ? (
                /* Character Customization (Skin, Hair, Hair Color, Expression) */
                <div className="space-y-5 bg-slate-950/50 p-4 rounded-2xl border border-slate-800/80">
                  {/* Skin Tone */}
                  <div>
                    <label className="text-xs font-bold text-slate-300 mb-2 flex items-center gap-1.5">
                      <Palette className="w-3.5 h-3.5 text-teal-400" /> Tom de Pele
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {SKIN_TONES.map((st) => (
                        <button
                          key={st.color}
                          onClick={() => {
                            sound.playClick();
                            setTempAvatar({ ...tempAvatar, skinTone: st.color });
                          }}
                          className={`w-9 h-9 rounded-full border-2 transition-all flex items-center justify-center ${
                            tempAvatar.skinTone === st.color
                              ? 'border-teal-400 scale-110 shadow-lg shadow-teal-400/30 ring-2 ring-teal-400/40'
                              : 'border-slate-700 hover:scale-105'
                          }`}
                          style={{ backgroundColor: st.color }}
                          title={st.name}
                        >
                          {tempAvatar.skinTone === st.color && (
                            <Check className="w-4 h-4 text-slate-950 font-bold" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Hair Style */}
                  <div>
                    <label className="text-xs font-bold text-slate-300 mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-pink-400" /> Estilo de Penteado
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {HAIR_STYLES.map((hs) => (
                        <button
                          key={hs.id}
                          onClick={() => {
                            sound.playClick();
                            setTempAvatar({ ...tempAvatar, hairStyle: hs.id });
                          }}
                          className={`px-3 py-2.5 rounded-xl text-xs font-bold border transition ${
                            tempAvatar.hairStyle === hs.id
                              ? 'bg-pink-500/20 border-pink-500 text-pink-300'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          {hs.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Hair Color */}
                  <div>
                    <label className="text-xs font-bold text-slate-300 mb-2 flex items-center gap-1.5">
                      <Palette className="w-3.5 h-3.5 text-amber-400" /> Cor do Cabelo
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {HAIR_COLORS.map((hc) => (
                        <button
                          key={hc.color}
                          onClick={() => {
                            sound.playClick();
                            setTempAvatar({ ...tempAvatar, hairColor: hc.color });
                          }}
                          className={`w-9 h-9 rounded-full border-2 transition-all flex items-center justify-center ${
                            tempAvatar.hairColor === hc.color
                              ? 'border-pink-400 scale-110 shadow-lg shadow-pink-400/30 ring-2 ring-pink-400/40'
                              : 'border-slate-700 hover:scale-105'
                          }`}
                          style={{ backgroundColor: hc.color }}
                          title={hc.name}
                        >
                          {tempAvatar.hairColor === hc.color && (
                            <Check className="w-4 h-4 text-white font-bold" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Expression */}
                  <div>
                    <label className="text-xs font-bold text-slate-300 mb-2 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-teal-400" /> Expressão Facial
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {EXPRESSIONS.map((exp) => (
                        <button
                          key={exp.id}
                          onClick={() => {
                            sound.playClick();
                            setTempAvatar({ ...tempAvatar, expression: exp.id as 'happy' | 'cool' });
                          }}
                          className={`px-3 py-2 rounded-xl text-xs font-bold border transition ${
                            tempAvatar.expression === exp.id
                              ? 'bg-teal-500/20 border-teal-400 text-teal-300'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          {exp.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* Item Category Items Grid */
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {WARDROBE_ITEMS.filter((item) => item.category === activeTab).map((item) => {
                    const isUnlocked = currentPoints >= item.requiredPoints;
                    const isEquipped =
                      (activeTab === 'head' && tempAvatar.headItem === item.id) ||
                      (activeTab === 'eyes' && tempAvatar.eyeItem === item.id) ||
                      (activeTab === 'outfit' && tempAvatar.outfitItem === item.id) ||
                      (activeTab === 'hand' && tempAvatar.handItem === item.id) ||
                      (activeTab === 'aura' && tempAvatar.auraItem === item.id);

                    return (
                      <div
                        key={item.id}
                        className={`relative p-3.5 rounded-2xl border transition-all flex flex-col justify-between ${
                          isEquipped
                            ? 'bg-gradient-to-br from-pink-950/40 via-slate-900 to-teal-950/40 border-teal-400/80 shadow-lg shadow-teal-500/10'
                            : isUnlocked
                            ? 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                            : 'bg-slate-950/60 border-slate-800/60 opacity-70'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-1.5">
                              <span
                                className="w-2.5 h-2.5 rounded-full"
                                style={{ backgroundColor: item.color }}
                              />
                              <h4 className="text-sm font-bold text-white leading-tight">
                                {item.name}
                              </h4>
                            </div>
                            <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                              {item.description}
                            </p>
                          </div>

                          <span
                            className={`text-[10px] uppercase font-black px-2 py-0.5 rounded-md border ${
                              item.rarity === 'lendario'
                                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                : item.rarity === 'epico'
                                ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                                : item.rarity === 'raro'
                                ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                                : 'bg-slate-800 text-slate-400 border-slate-700'
                            }`}
                          >
                            {item.rarity}
                          </span>
                        </div>

                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800/80">
                          {isUnlocked ? (
                            <button
                              onClick={() => handleEquip(activeTab, item.id)}
                              className={`w-full py-1.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                                isEquipped
                                  ? 'bg-teal-500 text-slate-950 font-black shadow-md'
                                  : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                              }`}
                            >
                              {isEquipped ? (
                                <>
                                  <Check className="w-3.5 h-3.5" /> Equipado
                                </>
                              ) : (
                                'Equipar'
                              )}
                            </button>
                          ) : (
                            <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold w-full bg-slate-950/80 px-2.5 py-1.5 rounded-xl border border-slate-800">
                              <Lock className="w-3.5 h-3.5 shrink-0" />
                              <span>Nível {item.requiredLevel} ({item.requiredPoints} pts)</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-slate-950/80">
          <div className="text-xs text-slate-400 hidden sm:block">
            Seu avatar será exibido para todos os jogadores nas partidas online!
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-pink-500 via-rose-500 to-teal-400 text-white shadow-lg shadow-pink-500/25 hover:opacity-95 transition flex items-center gap-2"
            >
              <Check className="w-4 h-4" /> Salvar Estilo
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
