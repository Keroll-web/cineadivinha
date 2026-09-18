export type Genre = 
  | 'terror' 
  | 'comedia' 
  | 'drama' 
  | 'animacao' 
  | 'romance' 
  | 'suspense' 
  | 'todos';

export interface GenreInfo {
  id: Genre;
  name: string;
  icon: string;
  description: string;
  color: string;
  bgGradient: string;
}

export interface Movie {
  id: string;
  title: string;
  originalTitle?: string;
  genre: Genre;
  year: number;
  director: string;
  cast: string[];
  posterUrl: string;
  hints: {
    level: 1 | 2 | 3 | 4;
    type: 'emoji' | 'info' | 'quote' | 'synopsis';
    content: string;
  }[];
  synopsis: string;
  options: string[]; // 4 multiple choice options
}

export type WardrobeCategory = 'head' | 'eyes' | 'outfit' | 'hand' | 'aura';
export type ItemRarity = 'comum' | 'raro' | 'epico' | 'lendario';

export interface WardrobeItem {
  id: string;
  name: string;
  category: WardrobeCategory;
  requiredLevel: number;
  requiredPoints: number;
  description: string;
  rarity: ItemRarity;
  color: string;
  icon: string;
}

export interface AvatarConfig {
  skinTone: string;
  hairStyle: string;
  hairColor: string;
  headItem: string | null;
  eyeItem: string | null;
  outfitItem: string | null;
  handItem: string | null;
  auraItem: string | null;
  expression: 'happy' | 'cool' | 'shocked' | 'surprised' | 'splatted';
}

export interface PlayerProfile {
  id: string;
  name: string;
  totalPoints: number;
  level: number;
  tomatoesReceivedTotal: number;
  correctAnswersTotal: number;
  matchesPlayed: number;
  unlockedItemIds: string[];
  avatar: AvatarConfig;
}

export interface RoomPlayer {
  id: string;
  name: string;
  avatar: AvatarConfig;
  score: number;
  tomatoes: number;
  isHost: boolean;
  isReady: boolean;
  isBot?: boolean;
  hasAnswered: boolean;
  lastAnswerCorrect?: boolean | null;
  connected: boolean;
}

export type GameStatus = 'lobby' | 'countdown' | 'playing' | 'round_result' | 'game_over';

export interface GameRoundState {
  roundNumber: number;
  totalRounds: number;
  movieId: string;
  movieGenre: Genre;
  revealedHintsCount: number;
  timeLeft: number;
  options: string[];
  // Hidden from client during round to prevent cheating
  answeredPlayers: {
    playerId: string;
    isCorrect: boolean;
    pointsAwarded: number;
    timeSeconds: number;
  }[];
  roundWinnerId?: string | null;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  time: string;
  type?: 'chat' | 'system' | 'splat' | 'correct';
}

export interface RoomState {
  code: string;
  genre: Genre;
  maxPlayers: number;
  status: GameStatus;
  hostId: string;
  players: RoomPlayer[];
  round: GameRoundState | null;
  messages: ChatMessage[];
  createdAt: number;
}

export interface TomatoSplatEvent {
  id: string;
  targetPlayerId: string;
  targetPlayerName: string;
  intensity: 'normal' | 'mega';
  x?: number;
  y?: number;
}
