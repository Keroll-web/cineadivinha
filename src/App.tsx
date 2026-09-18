import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { LobbyView } from './components/LobbyView';
import { GameView } from './components/GameView';
import { TomatoSplat } from './components/TomatoSplat';
import { WardrobeModal } from './components/WardrobeModal';
import { LevelUpModal } from './components/LevelUpModal';
import { CreditsModal } from './components/CreditsModal';
import { GameOverModal } from './components/GameOverModal';
import { 
  PlayerProfile, RoomState, Genre, WardrobeItem, Movie 
} from './types';
import { playerStorage } from './services/storage';
import { socketClient } from './services/socket';
import { sound } from './services/sound';
import { getUnlockedItemForLevel } from './data/wardrobe';

export default function App() {
  // Player persistence & profile
  const [profile, setProfile] = useState<PlayerProfile>(() => playerStorage.getProfile());
  const [room, setRoom] = useState<RoomState | null>(null);
  const [revealedMovie, setRevealedMovie] = useState<Movie | null>(null);

  // Modals & Overlays
  const [isWardrobeOpen, setIsWardrobeOpen] = useState(false);
  const [isCreditsOpen, setIsCreditsOpen] = useState(false);
  const [levelUpData, setLevelUpData] = useState<{
    isOpen: boolean;
    newLevel: number;
    unlockedItem: WardrobeItem | null;
  }>({
    isOpen: false,
    newLevel: 1,
    unlockedItem: null,
  });

  // Tomato Splat State
  const [tomatoActive, setTomatoActive] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Trigger tomato splat animation
  const triggerTomatoSplat = useCallback(() => {
    sound.playTomatoSplat();
    setTomatoActive(true);

    // Update player profile statistics
    setProfile((prev) => {
      const updated = {
        ...prev,
        tomatoesReceivedTotal: (prev.tomatoesReceivedTotal || 0) + 1,
      };
      playerStorage.saveProfile(updated);
      return updated;
    });
  }, []);

  // Award points & check level up (10 points per hit, level up every 30 points)
  const awardPoints = useCallback((points: number) => {
    setProfile((prev) => {
      const newTotal = prev.totalPoints + points;
      const oldLevel = prev.level;
      const newLevel = Math.floor(newTotal / 30) + 1;

      let unlockedItemIds = [...prev.unlockedItemIds];
      let newItem: WardrobeItem | null = null;

      if (newLevel > oldLevel) {
        // Find newly unlocked item for the new level
        newItem = getUnlockedItemForLevel(newLevel);
        if (newItem && !unlockedItemIds.includes(newItem.id)) {
          unlockedItemIds.push(newItem.id);
        }

        setLevelUpData({
          isOpen: true,
          newLevel,
          unlockedItem: newItem,
        });
      }

      const updated: PlayerProfile = {
        ...prev,
        totalPoints: newTotal,
        level: newLevel,
        correctAnswersTotal: prev.correctAnswersTotal + 1,
        unlockedItemIds,
      };

      playerStorage.saveProfile(updated);
      return updated;
    });
  }, []);

  // Initialize socket listeners
  useEffect(() => {
    socketClient.connect();

    const unsubRoom = socketClient.on('ROOM_STATE', (incomingRoom: RoomState) => {
      setRoom(incomingRoom);
      if ((incomingRoom as any).revealedMovie) {
        setRevealedMovie((incomingRoom as any).revealedMovie);
      } else if (incomingRoom.status === 'playing') {
        setRevealedMovie(null);
      }
    });

    const unsubTick = socketClient.on('ROUND_TICK', (data: { timeLeft: number }) => {
      setRoom((prev) => {
        if (!prev || !prev.round) return prev;
        return {
          ...prev,
          round: {
            ...prev.round,
            timeLeft: data.timeLeft,
          },
        };
      });
    });

    const unsubGuess = socketClient.on('GUESS_RESULT', (data: { playerId: string; isCorrect: boolean; pointsAwarded: number }) => {
      if (data.playerId === profile.id) {
        if (data.isCorrect) {
          sound.playCorrect();
          awardPoints(data.pointsAwarded || 10);
        }
      }
    });

    const unsubTomato = socketClient.on('TOMATO_SPLAT', (data: { targetPlayerId: string; targetPlayerName: string }) => {
      if (data.targetPlayerId === profile.id) {
        triggerTomatoSplat();
      }
    });

    return () => {
      unsubRoom();
      unsubTick();
      unsubGuess();
      unsubTomato();
    };
  }, [profile.id, awardPoints, triggerTomatoSplat]);

  // Handle Room Actions
  const handleCreateRoom = (genre: Genre, maxPlayers: number) => {
    socketClient.send('CREATE_ROOM', {
      playerId: profile.id,
      playerName: profile.name,
      avatar: profile.avatar,
      genre,
      maxPlayers,
    });
  };

  const handleJoinRoom = (code: string) => {
    socketClient.send('JOIN_ROOM', {
      code,
      playerId: profile.id,
      playerName: profile.name,
      avatar: profile.avatar,
    });
  };

  const handleAddBot = () => {
    if (!room) return;
    socketClient.send('ADD_BOT', { code: room.code });
  };

  const handleStartGame = () => {
    if (!room) return;
    socketClient.send('START_GAME', { code: room.code });
  };

  const handleLeaveRoom = () => {
    sound.playClick();
    setRoom(null);
    setRevealedMovie(null);
  };

  const handleSubmitGuess = (guessTitle: string) => {
    if (!room) return;
    socketClient.send('SUBMIT_GUESS', {
      code: room.code,
      playerId: profile.id,
      guessTitle,
    });
  };

  const handleSendChat = (text: string) => {
    if (!room) return;
    socketClient.send('SEND_CHAT', {
      code: room.code,
      senderId: profile.id,
      senderName: profile.name,
      text,
    });
  };

  const handleProfileUpdate = (updated: PlayerProfile) => {
    setProfile(updated);
    playerStorage.saveProfile(updated);
  };

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sound.setEnabled(next);
  };

  const isGameActive =
    room && (room.status === 'playing' || room.status === 'round_result');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-pink-500 selection:text-white relative overflow-x-hidden">
      {/* Top Fixed / Sticky Navigation Bar */}
      <Navbar
        profile={profile}
        onOpenWardrobe={() => setIsWardrobeOpen(true)}
        onOpenCredits={() => setIsCreditsOpen(true)}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {isGameActive ? (
          <GameView
            room={room}
            profile={profile}
            revealedMovie={revealedMovie}
            onSubmitGuess={handleSubmitGuess}
            onTriggerTomato={() => triggerTomatoSplat()}
          />
        ) : (
          <LobbyView
            profile={profile}
            room={room}
            onCreateRoom={handleCreateRoom}
            onJoinRoom={handleJoinRoom}
            onAddBot={handleAddBot}
            onStartGame={handleStartGame}
            onLeaveRoom={handleLeaveRoom}
            onSendChat={handleSendChat}
            onOpenWardrobe={() => setIsWardrobeOpen(true)}
          />
        )}
      </main>

      {/* Footer with Creator Attribution & Info */}
      <footer className="w-full border-t border-slate-900 bg-slate-950/90 py-6 px-4 text-center text-xs text-slate-500">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-400">CineAdivinha</span>
            <span>•</span>
            <span>Jogo de Cinema, Moda & Multijogador</span>
          </div>

          <div className="text-slate-400">
            Criado e Desenvolvido por{' '}
            <button
              onClick={() => setIsCreditsOpen(true)}
              className="font-bold text-pink-400 hover:text-pink-300 underline underline-offset-2 decoration-pink-500/40 hover:decoration-pink-400 transition"
            >
              Giovana Germano Botelho
            </button>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-slate-500">
            <span>10 Pts / Acerto</span>
            <span>•</span>
            <span>30 Pts / Nível</span>
            <span>•</span>
            <span>Tomatada no Erro 🍅</span>
          </div>
        </div>
      </footer>

      {/* Modals and Overlays */}
      <WardrobeModal
        isOpen={isWardrobeOpen}
        onClose={() => setIsWardrobeOpen(false)}
        profile={profile}
        onProfileUpdate={handleProfileUpdate}
      />

      <CreditsModal
        isOpen={isCreditsOpen}
        onClose={() => setIsCreditsOpen(false)}
      />

      <LevelUpModal
        isOpen={levelUpData.isOpen}
        newLevel={levelUpData.newLevel}
        unlockedItem={levelUpData.unlockedItem}
        onClose={() => setLevelUpData((prev) => ({ ...prev, isOpen: false }))}
        onOpenWardrobe={() => {
          setLevelUpData((prev) => ({ ...prev, isOpen: false }));
          setIsWardrobeOpen(true);
        }}
      />

      {room && room.status === 'game_over' && (
        <GameOverModal
          room={room}
          profile={profile}
          onRematch={() => handleStartGame()}
          onBackToLobby={() => handleLeaveRoom()}
          onOpenWardrobe={() => setIsWardrobeOpen(true)}
        />
      )}

      {/* Screen Tomato Splat Feedback */}
      <TomatoSplat
        active={tomatoActive}
        onComplete={() => setTomatoActive(false)}
      />
    </div>
  );
}
