import { AvatarConfig, PlayerProfile } from '../types';
import { getLevelFromPoints } from '../data/wardrobe';

const STORAGE_KEY = 'cinedesafio_player_profile';

const DEFAULT_AVATAR: AvatarConfig = {
  skinTone: '#FCD34D',
  hairStyle: 'short',
  hairColor: '#451A03',
  headItem: 'head_default',
  eyeItem: 'eyes_default',
  outfitItem: 'outfit_casual',
  handItem: 'hand_empty',
  auraItem: 'aura_none',
  expression: 'happy',
};

function generateInitialProfile(): PlayerProfile {
  const randomNum = Math.floor(100 + Math.random() * 900);
  const randomNames = ['Cineasta', 'Estrela', 'Diretor', 'Crítico', 'Pipoca', 'Roteirista'];
  const name = `${randomNames[Math.floor(Math.random() * randomNames.length)]}_${randomNum}`;

  return {
    id: 'user_' + Math.random().toString(36).substring(2, 9),
    name,
    totalPoints: 0,
    level: 1,
    tomatoesReceivedTotal: 0,
    correctAnswersTotal: 0,
    matchesPlayed: 0,
    unlockedItemIds: ['head_default', 'eyes_default', 'outfit_casual', 'hand_empty', 'aura_none'],
    avatar: { ...DEFAULT_AVATAR },
  };
}

export function loadProfile(): PlayerProfile {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Ensure level is synced with points
      parsed.level = getLevelFromPoints(parsed.totalPoints || 0);
      return parsed;
    }
  } catch (err) {
    console.error('Failed to parse saved profile:', err);
  }
  const initial = generateInitialProfile();
  saveProfile(initial);
  return initial;
}

export function saveProfile(profile: PlayerProfile): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    // Also broadcast to other tabs
    window.dispatchEvent(new CustomEvent('cine_profile_updated', { detail: profile }));
  } catch (err) {
    console.error('Failed to save profile:', err);
  }
}

export function awardPoints(pointsToAdd: number): {
  profile: PlayerProfile;
  leveledUp: boolean;
  previousLevel: number;
  newLevel: number;
} {
  const current = loadProfile();
  const oldLevel = current.level;
  const newPoints = current.totalPoints + pointsToAdd;
  const newLevel = getLevelFromPoints(newPoints);
  const leveledUp = newLevel > oldLevel;

  current.totalPoints = newPoints;
  current.level = newLevel;
  if (pointsToAdd > 0) {
    current.correctAnswersTotal += 1;
  }

  saveProfile(current);
  return {
    profile: current,
    leveledUp,
    previousLevel: oldLevel,
    newLevel,
  };
}

export function registerTomato(): PlayerProfile {
  const current = loadProfile();
  current.tomatoesReceivedTotal = (current.tomatoesReceivedTotal || 0) + 1;
  saveProfile(current);
  return current;
}

export function incrementMatchesPlayed(): PlayerProfile {
  const current = loadProfile();
  current.matchesPlayed = (current.matchesPlayed || 0) + 1;
  saveProfile(current);
  return current;
}

export const playerStorage = {
  getProfile: loadProfile,
  saveProfile,
  awardPoints,
  registerTomato,
  incrementMatchesPlayed,
};
