import { RoomState, PlayerProfile, Genre, ChatMessage, TomatoSplatEvent } from '../types';
import { getRandomMovie } from '../data/movies';

export type SocketEventCallback = (data: any) => void;

class GameSocketClient {
  private ws: WebSocket | null = null;
  private listeners: Map<string, Set<SocketEventCallback>> = new Map();
  private isConnecting: boolean = false;
  private localMode: boolean = false;
  private localRoom: RoomState | null = null;
  private localTimer: any = null;
  private localHintTimer: any = null;

  constructor() {
    // Lazy connect when needed
  }

  public connect(onOpen?: () => void) {
    if (this.ws && (this.ws.readyState === WebSocket.OPEN || this.ws.readyState === WebSocket.CONNECTING)) {
      if (this.ws.readyState === WebSocket.OPEN && onOpen) onOpen();
      return;
    }

    if (typeof window === 'undefined') return;

    this.isConnecting = true;
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const host = window.location.host;
    const wsUrl = `${protocol}//${host}/ws`;

    try {
      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        this.isConnecting = false;
        this.localMode = false;
        this.emit('connected', { status: 'online' });
        if (onOpen) onOpen();
      };

      this.ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);
          this.emit(msg.type, msg.payload);
        } catch (err) {
          console.error('Failed to parse WS message:', err);
        }
      };

      this.ws.onclose = () => {
        this.isConnecting = false;
        this.emit('disconnected', {});
      };

      this.ws.onerror = () => {
        this.isConnecting = false;
        // If websocket cannot connect (e.g. during some local preview builds), enable resilient fallback
        console.warn('WebSocket connection not available; switching to local server simulation');
        this.localMode = true;
        this.emit('connected', { status: 'fallback' });
        if (onOpen) onOpen();
      };
    } catch (e) {
      this.localMode = true;
      if (onOpen) onOpen();
    }
  }

  public on(event: string, callback: SocketEventCallback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(callback);
    return () => this.off(event, callback);
  }

  public off(event: string, callback: SocketEventCallback) {
    if (this.listeners.has(event)) {
      this.listeners.get(event)!.delete(callback);
    }
  }

  private emit(event: string, payload: any) {
    const handlers = this.listeners.get(event);
    if (handlers) {
      handlers.forEach((fn) => {
        try {
          fn(payload);
        } catch (err) {
          console.error('Error in socket event handler for', event, err);
        }
      });
    }
  }

  public send(type: string, payload: any) {
    if (!this.localMode && this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type, payload }));
    } else {
      this.handleLocalAction(type, payload);
    }
  }

  // --- LOCAL FALLBACK SIMULATION ENGINE (guarantees offline and rapid development testability) ---
  private handleLocalAction(type: string, payload: any) {
    if (type === 'CREATE_ROOM') {
      const code = 'CINE' + Math.floor(10 + Math.random() * 90);
      const hostPlayer = {
        id: payload.playerId,
        name: payload.playerName,
        avatar: payload.avatar,
        score: 0,
        tomatoes: 0,
        isHost: true,
        isReady: true,
        hasAnswered: false,
        connected: true,
      };

      this.localRoom = {
        code,
        genre: payload.genre || 'todos',
        maxPlayers: payload.maxPlayers || 4,
        status: 'lobby',
        hostId: payload.playerId,
        players: [hostPlayer],
        round: null,
        messages: [
          {
            id: 'msg_welcome',
            senderId: 'system',
            senderName: 'Sistema',
            text: `Sala ${code} criada com sucesso! Convide de 2 a 4 jogadores para a partida de cinema!`,
            time: new Date().toLocaleTimeString().slice(0, 5),
            type: 'system',
          },
        ],
        createdAt: Date.now(),
      };

      this.emit('ROOM_STATE', this.localRoom);
    } else if (type === 'ADD_BOT') {
      if (!this.localRoom) return;
      if (this.localRoom.players.length >= this.localRoom.maxPlayers) return;

      const botNames = ['PipocaBot', 'CineBot', 'OscarBot', 'SpielBot'];
      const availableNames = botNames.filter(
        (b) => !this.localRoom!.players.some((p) => p.name === b)
      );
      const name = availableNames[0] || `Bot_${Math.floor(Math.random() * 100)}`;

      const botPlayer = {
        id: 'bot_' + Math.random().toString(36).substring(2, 7),
        name,
        avatar: {
          skinTone: '#F59E0B',
          hairStyle: 'short',
          hairColor: '#0F172A',
          headItem: 'head_director_beret',
          eyeItem: 'eyes_3d_glasses',
          outfitItem: 'outfit_leather_jacket',
          handItem: 'hand_popcorn',
          auraItem: 'aura_none',
          expression: 'cool' as const,
        },
        score: 0,
        tomatoes: 0,
        isHost: false,
        isReady: true,
        isBot: true,
        hasAnswered: false,
        connected: true,
      };

      this.localRoom.players.push(botPlayer);
      this.localRoom.messages.push({
        id: 'msg_' + Date.now(),
        senderId: 'system',
        senderName: 'Sistema',
        text: `${name} entrou na sala!`,
        time: new Date().toLocaleTimeString().slice(0, 5),
        type: 'system',
      });

      this.emit('ROOM_STATE', this.localRoom);
    } else if (type === 'START_GAME') {
      if (!this.localRoom) return;
      this.startLocalRound(1);
    } else if (type === 'SUBMIT_GUESS') {
      this.processLocalGuess(payload.playerId, payload.guessTitle);
    } else if (type === 'SEND_CHAT') {
      if (!this.localRoom) return;
      this.localRoom.messages.push({
        id: 'msg_' + Date.now(),
        senderId: payload.senderId,
        senderName: payload.senderName,
        text: payload.text,
        time: new Date().toLocaleTimeString().slice(0, 5),
        type: 'chat',
      });
      this.emit('ROOM_STATE', this.localRoom);
    }
  }

  private startLocalRound(roundNumber: number) {
    if (!this.localRoom) return;
    const movie = getRandomMovie(this.localRoom.genre);

    this.localRoom.status = 'playing';
    this.localRoom.players.forEach((p) => {
      p.hasAnswered = false;
      p.lastAnswerCorrect = null;
    });

    this.localRoom.round = {
      roundNumber,
      totalRounds: 5,
      movieId: movie.id,
      movieGenre: movie.genre,
      revealedHintsCount: 1,
      timeLeft: 22,
      options: movie.options,
      answeredPlayers: [],
      roundWinnerId: null,
    };

    this.emit('ROOM_STATE', this.localRoom);

    // Progressive timer
    clearInterval(this.localTimer);
    this.localTimer = setInterval(() => {
      if (!this.localRoom || !this.localRoom.round || this.localRoom.status !== 'playing') {
        clearInterval(this.localTimer);
        return;
      }

      this.localRoom.round.timeLeft -= 1;

      // Reveal next hints at intervals
      if (this.localRoom.round.timeLeft === 17) this.localRoom.round.revealedHintsCount = 2;
      if (this.localRoom.round.timeLeft === 11) this.localRoom.round.revealedHintsCount = 3;
      if (this.localRoom.round.timeLeft === 5) this.localRoom.round.revealedHintsCount = 4;

      // Simulate bot answers
      const bots = this.localRoom.players.filter((p) => p.isBot && !p.hasAnswered);
      if (bots.length > 0 && Math.random() < 0.25 && this.localRoom.round.timeLeft < 16) {
        const bot = bots[0];
        const isCorrect = Math.random() > 0.45;
        const guess = isCorrect
          ? movie.title
          : movie.options.find((o) => o !== movie.title) || 'Outro Filme';
        this.processLocalGuess(bot.id, guess);
      }

      if (this.localRoom.round.timeLeft <= 0) {
        clearInterval(this.localTimer);
        this.endLocalRound(movie);
      } else {
        this.emit('ROUND_TICK', { timeLeft: this.localRoom.round.timeLeft });
      }
    }, 1000);
  }

  private processLocalGuess(playerId: string, guessTitle: string) {
    if (!this.localRoom || !this.localRoom.round) return;
    const player = this.localRoom.players.find((p) => p.id === playerId);
    if (!player || player.hasAnswered) return;

    const movie = getRandomMovie(this.localRoom.genre);
    // Find matching movie by id if available
    const activeMovie = movie; 

    const normalize = (s: string) =>
      s
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim();

    const isCorrect = Boolean(
      normalize(guessTitle) === normalize(activeMovie.title) ||
      (activeMovie.originalTitle && normalize(guessTitle) === normalize(activeMovie.originalTitle))
    );

    player.hasAnswered = true;
    player.lastAnswerCorrect = isCorrect;

    if (isCorrect) {
      player.score += 10;
      this.localRoom.round.answeredPlayers.push({
        playerId,
        isCorrect: true,
        pointsAwarded: 10,
        timeSeconds: 22 - this.localRoom.round.timeLeft,
      });

      this.localRoom.messages.push({
        id: 'msg_' + Date.now(),
        senderId: 'system',
        senderName: 'Sistema',
        text: `🎯 ${player.name} acertou o filme! (+10 pontos)`,
        time: new Date().toLocaleTimeString().slice(0, 5),
        type: 'correct',
      });

      this.emit('GUESS_RESULT', { playerId, isCorrect: true, pointsAwarded: 10 });
    } else {
      player.tomatoes += 1;
      this.localRoom.messages.push({
        id: 'msg_' + Date.now(),
        senderId: 'system',
        senderName: 'Sistema',
        text: `🍅 ${player.name} errou e levou uma tomatada na cara!`,
        time: new Date().toLocaleTimeString().slice(0, 5),
        type: 'splat',
      });

      this.emit('TOMATO_SPLAT', {
        targetPlayerId: playerId,
        targetPlayerName: player.name,
      });

      this.emit('GUESS_RESULT', { playerId, isCorrect: false, pointsAwarded: 0 });
    }

    // Check if everyone answered
    const allAnswered = this.localRoom.players.every((p) => p.hasAnswered);
    if (allAnswered) {
      clearInterval(this.localTimer);
      this.endLocalRound(activeMovie);
    } else {
      this.emit('ROOM_STATE', this.localRoom);
    }
  }

  private endLocalRound(movie: any) {
    if (!this.localRoom || !this.localRoom.round) return;
    this.localRoom.status = 'round_result';

    // Unanswered players get tomato
    this.localRoom.players.forEach((p) => {
      if (!p.hasAnswered) {
        p.tomatoes += 1;
        p.hasAnswered = true;
        p.lastAnswerCorrect = false;
        this.emit('TOMATO_SPLAT', {
          targetPlayerId: p.id,
          targetPlayerName: p.name,
        });
      }
    });

    this.emit('ROOM_STATE', {
      ...this.localRoom,
      revealedMovie: movie,
    });

    // Advance round after 5 seconds
    setTimeout(() => {
      if (!this.localRoom) return;
      const currentR = this.localRoom.round?.roundNumber || 1;
      if (currentR >= 5) {
        this.localRoom.status = 'game_over';
        this.emit('ROOM_STATE', this.localRoom);
      } else {
        this.startLocalRound(currentR + 1);
      }
    }, 5000);
  }
}

export const socketClient = new GameSocketClient();
