import express from 'express';
import http from 'http';
import path from 'path';
import fs from 'fs';
import { WebSocketServer, WebSocket } from 'ws';
import { createServer as createViteServer } from 'vite';

const PORT = 3000;
const app = express();
app.use(express.json());

// Persistent data directory
const DATA_DIR = path.join(process.cwd(), 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// In-memory movie database for server-authoritative validation
interface ServerMovie {
  id: string;
  title: string;
  originalTitle?: string;
  genre: string;
  year: number;
  director: string;
  cast: string[];
  posterUrl: string;
  hints: { level: number; type: string; content: string }[];
  synopsis: string;
  options: string[];
}

const SERVER_MOVIES: ServerMovie[] = [
  // Terror
  {
    id: 'terror_1',
    title: 'O Iluminado',
    originalTitle: 'The Shining',
    genre: 'terror',
    year: 1980,
    director: 'Stanley Kubrick',
    cast: ['Jack Nicholson', 'Shelley Duvall'],
    posterUrl: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?auto=format&fit=crop&w=800&q=80',
    synopsis: 'Um escritor aceita um emprego como zelador de inverno em um hotel isolado nas montanhas, onde forças sombrias começam a influenciar sua sanidade.',
    hints: [
      { level: 1, type: 'emoji', content: '🏨 🪓 ❄️ 🚪 👯‍♀️ 🥃' },
      { level: 2, type: 'info', content: 'Lançado em 1980, dirigido pelo lendário Stanley Kubrick com base na obra de Stephen King.' },
      { level: 3, type: 'quote', content: 'Frase icônica: "Aqui está Johnny!" (Here\'s Johnny!) e o mistério do quarto 237.' },
      { level: 4, type: 'synopsis', content: 'O protagonista Jack Torrance enlouquece no isolado Hotel Overlook durante uma nevasca histórica.' },
    ],
    options: ['O Iluminado', 'Psicose', 'O Exorcista', 'Carrie, a Estranha'],
  },
  {
    id: 'terror_2',
    title: 'Corra!',
    originalTitle: 'Get Out',
    genre: 'terror',
    year: 2017,
    director: 'Jordan Peele',
    cast: ['Daniel Kaluuya', 'Allison Williams'],
    posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    synopsis: 'Um jovem negro visita a misteriosa propriedade da família da namorada branca e descobre uma trama perturbadora.',
    hints: [
      { level: 1, type: 'emoji', content: '☕ 🥄 🦌 👁️ 🏃‍♂️ 🫖' },
      { level: 2, type: 'info', content: 'Lançado em 2017, vencedor do Oscar de Melhor Roteiro Original dirigido por Jordan Peele.' },
      { level: 3, type: 'quote', content: 'O som hipnótico da colher batendo na xícara de chá faz o protagonista afundar no "Lugar Submerso".' },
      { level: 4, type: 'synopsis', content: 'Chris viaja para conhecer os pais de sua namorada Rose Armitage e percebe comportamentos bizarros da comunidade.' },
    ],
    options: ['Corra!', 'Nós', 'Hereditário', 'O Homem Invisível'],
  },
  {
    id: 'terror_3',
    title: 'Invocação do Mal',
    originalTitle: 'The Conjuring',
    genre: 'terror',
    year: 2013,
    director: 'James Wan',
    cast: ['Vera Farmiga', 'Patrick Wilson'],
    posterUrl: 'https://images.unsplash.com/photo-1481349518771-20055b2a7b24?auto=format&fit=crop&w=800&q=80',
    synopsis: 'Os investigadores paranormais Ed e Lorraine Warren ajudam uma família aterrorizada por uma presença demoníaca em sua fazenda.',
    hints: [
      { level: 1, type: 'emoji', content: '🕯️ 👧 🪆 👏 👻 🏚️' },
      { level: 2, type: 'info', content: 'Lançado em 2013, iniciou um dos maiores universos cinematográficos de terror moderno dirigido por James Wan.' },
      { level: 3, type: 'quote', content: 'O jogo do esconde-esconde com palmas no porão escuro e a boneca Annabelle no museu dos investigadores.' },
      { level: 4, type: 'synopsis', content: 'Baseado nos arquivos reais dos demonologistas Ed e Lorraine Warren ajudando a família Perron em Rhode Island.' },
    ],
    options: ['Invocação do Mal', 'Sobrenatural', 'Annabelle', 'O Exorcismo de Emily Rose'],
  },
  // Comédia
  {
    id: 'comedia_1',
    title: 'As Branquelas',
    originalTitle: 'White Chicks',
    genre: 'comedia',
    year: 2004,
    director: 'Keenen Ivory Wayans',
    cast: ['Shawn Wayans', 'Marlon Wayans', 'Terry Crews'],
    posterUrl: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80',
    synopsis: 'Dois agentes do FBI desastrados se disfarçam como jovens herdeiras ricas nos Hamptons para evitar um sequestro.',
    hints: [
      { level: 1, type: 'emoji', content: '👱‍♀️ 👱‍♀️ 🕶️ 🐶 💳 🚗' },
      { level: 2, type: 'info', content: 'Comédia clássica dos irmãos Wayans de 2004 com o hilário Latrell Spencer cantando no carro.' },
      { level: 3, type: 'quote', content: 'Música inesquecível: "Making my way downtown, walking fast..." (A Thousand Miles da Vanessa Carlton).' },
      { level: 4, type: 'synopsis', content: 'Os irmãos agentes Marcus e Kevin Copeland se passam por Brittany e Tiffany Wilson.' },
    ],
    options: ['As Branquelas', 'O Máskara', 'Vovó... Zona', 'Todo Mundo em Pânico'],
  },
  {
    id: 'comedia_2',
    title: 'Minha Mãe É uma Peça',
    originalTitle: 'Minha Mãe É uma Peça',
    genre: 'comedia',
    year: 2013,
    director: 'André Pellenz',
    cast: ['Paulo Gustavo', 'Mariana Xavier'],
    posterUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    synopsis: 'Dona Hermínia é uma mulher de meia-idade divorciada que descobre que os filhos a acham chata e resolve sair de casa.',
    hints: [
      { level: 1, type: 'emoji', content: '👵 🧕 📱 👠 🗣️ 🍲' },
      { level: 2, type: 'info', content: 'Sucesso absoluto do cinema nacional estrelado e criado pelo saudoso Paulo Gustavo em 2013.' },
      { level: 3, type: 'quote', content: '"Juliano! Marcelina! Eu passei a vida inteira me dedicando a essas crianças!" com os bobes no cabelo.' },
      { level: 4, type: 'synopsis', content: 'Dona Hermínia vai se refugiar na casa da tia Zélia para desabafar sobre a ingratidão dos filhos.' },
    ],
    options: ['Minha Mãe É uma Peça', 'Até que a Sorte nos Separe', 'Os Farofeiros', 'Tô Ryca'],
  },
  {
    id: 'comedia_4',
    title: 'O Auto da Compadecida',
    originalTitle: 'O Auto da Compadecida',
    genre: 'comedia',
    year: 2000,
    director: 'Guel Arraes',
    cast: ['Matheus Nachtergaele', 'Selton Mello'],
    posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    synopsis: 'As aventuras hilárias dos sertanejos João Grilo e Chicó que enganam a todos no sertão da Paraíba até prestarem contas no juízo final.',
    hints: [
      { level: 1, type: 'emoji', content: '🌵 🍞 🐕 🥖 ⚖️ 🍞' },
      { level: 2, type: 'info', content: 'Clássico imortal da cultura brasileira lançado em 2000 adaptado da obra-prima de Ariano Suassuna.' },
      { level: 3, type: 'quote', content: 'Bordão eterno: "Não sei, só sei que foi assim!" e o testamento do cachorro benzeu.' },
      { level: 4, type: 'synopsis', content: 'João Grilo e Chicó lidam com o Major Antônio Morais, o bispo, Severino de Aracaju e a aparição de Nossa Senhora.' },
    ],
    options: ['O Auto da Compadecida', 'Lisbela e o Prisioneiro', 'Central do Brasil', 'Bacurau'],
  },
  // Drama
  {
    id: 'drama_1',
    title: 'O Show de Truman',
    originalTitle: 'The Truman Show',
    genre: 'drama',
    year: 1998,
    director: 'Peter Weir',
    cast: ['Jim Carrey', 'Laura Linney'],
    posterUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80',
    synopsis: 'Um vendedor de seguros descobre aos poucos que toda a sua vida é, na verdade, um reality show televisionado 24 horas por dia.',
    hints: [
      { level: 1, type: 'emoji', content: '🎥 ☀️ ⛵ 🚪 🌧️ 📺' },
      { level: 2, type: 'info', content: 'Lançado em 1998, aclamado drama existencial com atuação dramática espetacular de Jim Carrey.' },
      { level: 3, type: 'quote', content: '"Caso eu não os veja mais: bom dia, boa tarde e boa noite!" diante da porta de saída do céu cenográfico.' },
      { level: 4, type: 'synopsis', content: 'Truman Burbank tenta escapar da ilha fictícia de Seahaven construída pelo produtor Christof.' },
    ],
    options: ['O Show de Truman', 'Brilho Eterno de uma Mente Sem Lembranças', 'Clube da Luta', 'Forrest Gump'],
  },
  {
    id: 'drama_4',
    title: 'Central do Brasil',
    originalTitle: 'Central do Brasil',
    genre: 'drama',
    year: 1998,
    director: 'Walter Salles',
    cast: ['Fernanda Montenegro', 'Vinícius de Oliveira'],
    posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    synopsis: 'Uma ex-professora amargurada que escreve cartas na estação de trem acompanha um menino órfão pelo sertão à procura do pai.',
    hints: [
      { level: 1, type: 'emoji', content: '✉️ 🚂 👦 👵 🌵 🚌' },
      { level: 2, type: 'info', content: 'Obra-prima brasileira de 1998 que rendeu a Fernanda Montenegro indicação histórica ao Oscar de Melhor Atriz.' },
      { level: 3, type: 'quote', content: '"Tenho medo de você se esquecer de mim..." na tocante carta final no ônibus voltando para o Rio.' },
      { level: 4, type: 'synopsis', content: 'Dora ajuda o pequeno Josué a cruzar o Nordeste para encontrar seus irmãos Moisés e Isaías.' },
    ],
    options: ['Central do Brasil', 'Cidade de Deus', 'Que Horas Ela Volta?', 'Aquarius'],
  },
  // Animação
  {
    id: 'animacao_1',
    title: 'A Viagem de Chihiro',
    originalTitle: 'Spirited Away',
    genre: 'animacao',
    year: 2001,
    director: 'Hayao Miyazaki',
    cast: ['Rumi Hiiragi', 'Miyu Irino'],
    posterUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
    synopsis: 'Uma menina mimada de 10 anos entra no mundo dos espíritos onde seus pais são transformados em porcos.',
    hints: [
      { level: 1, type: 'emoji', content: '🐉 ♨️ 🐷 🍙 🚂 🎭' },
      { level: 2, type: 'info', content: 'Produção do Studio Ghibli dirigida por Hayao Miyazaki, único anime a vencer o Oscar de Melhor Animação.' },
      { level: 3, type: 'quote', content: 'O dragão branco Haku que na verdade é o espírito do rio Kohaku, e o espírito Sem Rosto.' },
      { level: 4, type: 'synopsis', content: 'A bruxa Yubaba rouba o nome da protagonista, apelidando-a de "Sen" na casa de banhos mágicos.' },
    ],
    options: ['A Viagem de Chihiro', 'Meu Amigo Totoro', 'O Castelo Animado', 'Princesa Mononoke'],
  },
  {
    id: 'animacao_3',
    title: 'Toy Story',
    originalTitle: 'Toy Story',
    genre: 'animacao',
    year: 1995,
    director: 'John Lasseter',
    cast: ['Tom Hanks', 'Tim Allen'],
    posterUrl: 'https://images.unsplash.com/photo-1558679908-541bcf1249ff?auto=format&fit=crop&w=800&q=80',
    synopsis: 'Um boneco caubói tem seu posto de brinquedo favorito ameaçado quando seu dono ganha um moderno patrulheiro espacial.',
    hints: [
      { level: 1, type: 'emoji', content: '🤠 🚀 🦖 🥔 🐕 📦' },
      { level: 2, type: 'info', content: 'O primeiro longa-metragem totalmente feito em computação gráfica da história, lançado pela Pixar em 1995.' },
      { level: 3, type: 'quote', content: 'Frases lendárias: "Tem uma cobra na minha bota!" e "Ao infinito e além!".' },
      { level: 4, type: 'synopsis', content: 'Woody e Buzz Lightyear precisam fugir da casa do vizinho destruidor de brinquedos Sid Phillips.' },
    ],
    options: ['Toy Story', 'Monstros S.A.', 'Vida de Inseto', 'Os Incríveis'],
  },
  // Romance
  {
    id: 'romance_1',
    title: 'Titanic',
    originalTitle: 'Titanic',
    genre: 'romance',
    year: 1997,
    director: 'James Cameron',
    cast: ['Leonardo DiCaprio', 'Kate Winslet'],
    posterUrl: 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?auto=format&fit=crop&w=800&q=80',
    synopsis: 'Um jovem artista sem dinheiro e uma jovem aristocrata noiva se apaixonam a bordo do navio de luxo mais famoso da história.',
    hints: [
      { level: 1, type: 'emoji', content: '🚢 🧊 💎 🎨 🎻 🌊' },
      { level: 2, type: 'info', content: 'Venceu 11 Oscars em 1998, dirigido por James Cameron e com a canção "My Heart Will Go On" de Celine Dion.' },
      { level: 3, type: 'quote', content: 'Cena icônica na proa do navio: "Eu sou o rei do mundo!" e o desenho no papel com o colar Coração do Oceano.' },
      { level: 4, type: 'synopsis', content: 'O romance proibido de Jack Dawson e Rose DeWitt Bukater durante a viagem inaugural de Southampton a Nova York.' },
    ],
    options: ['Titanic', 'Diário de uma Paixão', 'Ghost: Do Outro Lado da Vida', 'Um Amor para Recordar'],
  },
  // Suspense
  {
    id: 'suspense_1',
    title: 'O Sexto Sentido',
    originalTitle: 'The Sixth Sense',
    genre: 'suspense',
    year: 1999,
    director: 'M. Night Shyamalan',
    cast: ['Bruce Willis', 'Haley Joel Osment'],
    posterUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    synopsis: 'Um psicólogo infantil dedicado atende um garoto assustado que afirma ser capaz de ver e se comunicar com pessoas mortas.',
    hints: [
      { level: 1, type: 'emoji', content: '👻 👦 🩺 🥶 💍 🚪' },
      { level: 2, type: 'info', content: 'Lançado em 1999, consagrou o diretor M. Night Shyamalan com um dos plot twists mais famosos da história.' },
      { level: 3, type: 'quote', content: 'Frase que parou o mundo: "Eu vejo gente morta... com que frequência? O tempo todo."' },
      { level: 4, type: 'synopsis', content: 'O Dr. Malcolm Crowe descobre no clímax a verdade chocante sobre seu próprio estado após a aliança cair no chão.' },
    ],
    options: ['O Sexto Sentido', 'Os Outros', 'Corpo Fechado', 'Sinais'],
  },
];

function getRandomMovieForGenre(genre: string, excludeIds: string[] = []): ServerMovie {
  const filtered = genre === 'todos' 
    ? SERVER_MOVIES 
    : SERVER_MOVIES.filter(m => m.genre === genre);
  
  const available = filtered.filter(m => !excludeIds.includes(m.id));
  const list = available.length > 0 ? available : (filtered.length > 0 ? filtered : SERVER_MOVIES);
  return list[Math.floor(Math.random() * list.length)];
}

// Room management
interface RoomPlayerState {
  id: string;
  name: string;
  avatar: any;
  score: number;
  tomatoes: number;
  isHost: boolean;
  isReady: boolean;
  isBot?: boolean;
  hasAnswered: boolean;
  lastAnswerCorrect?: boolean | null;
  connected: boolean;
  ws?: WebSocket;
}

interface ServerRoom {
  code: string;
  genre: string;
  maxPlayers: number;
  status: 'lobby' | 'countdown' | 'playing' | 'round_result' | 'game_over';
  hostId: string;
  players: RoomPlayerState[];
  currentMovie?: ServerMovie;
  roundNumber: number;
  totalRounds: number;
  revealedHintsCount: number;
  timeLeft: number;
  roundTimer?: NodeJS.Timeout;
  usedMovieIds: string[];
  messages: any[];
  createdAt: number;
}

const rooms = new Map<string, ServerRoom>();

function broadcastRoom(room: ServerRoom, eventType = 'ROOM_STATE', extraPayload: any = null) {
  const payload = extraPayload || {
    code: room.code,
    genre: room.genre,
    maxPlayers: room.maxPlayers,
    status: room.status,
    hostId: room.hostId,
    players: room.players.map(p => ({
      id: p.id,
      name: p.name,
      avatar: p.avatar,
      score: p.score,
      tomatoes: p.tomatoes,
      isHost: p.isHost,
      isReady: p.isReady,
      isBot: p.isBot,
      hasAnswered: p.hasAnswered,
      lastAnswerCorrect: p.lastAnswerCorrect,
      connected: p.connected,
    })),
    round: room.currentMovie ? {
      roundNumber: room.roundNumber,
      totalRounds: room.totalRounds,
      movieId: room.currentMovie.id,
      movieGenre: room.currentMovie.genre,
      revealedHintsCount: room.revealedHintsCount,
      timeLeft: room.timeLeft,
      options: room.currentMovie.options,
      answeredPlayers: [],
    } : null,
    messages: room.messages,
    createdAt: room.createdAt,
  };

  const msg = JSON.stringify({ type: eventType, payload });
  room.players.forEach(p => {
    if (p.ws && p.ws.readyState === WebSocket.OPEN) {
      try {
        p.ws.send(msg);
      } catch (err) {
        console.error('Failed to send WS message to player:', p.id, err);
      }
    }
  });
}

function startRound(room: ServerRoom) {
  if (room.roundTimer) clearInterval(room.roundTimer);

  const movie = getRandomMovieForGenre(room.genre, room.usedMovieIds);
  room.currentMovie = movie;
  room.usedMovieIds.push(movie.id);
  room.status = 'playing';
  room.revealedHintsCount = 1;
  room.timeLeft = 22;

  room.players.forEach(p => {
    p.hasAnswered = false;
    p.lastAnswerCorrect = null;
  });

  broadcastRoom(room);

  room.roundTimer = setInterval(() => {
    room.timeLeft -= 1;

    if (room.timeLeft === 17) room.revealedHintsCount = 2;
    if (room.timeLeft === 11) room.revealedHintsCount = 3;
    if (room.timeLeft === 5) room.revealedHintsCount = 4;

    // Simulate bot answers
    const unansweredBots = room.players.filter(p => p.isBot && !p.hasAnswered);
    if (unansweredBots.length > 0 && Math.random() < 0.25 && room.timeLeft < 16) {
      const bot = unansweredBots[0];
      const isCorrect = Math.random() > 0.45;
      const guess = isCorrect ? movie.title : (movie.options.find(o => o !== movie.title) || 'Filme Desconhecido');
      handleGuess(room, bot.id, guess);
    }

    if (room.timeLeft <= 0) {
      clearInterval(room.roundTimer!);
      endRound(room);
    } else {
      broadcastRoom(room, 'ROUND_TICK', { timeLeft: room.timeLeft });
    }
  }, 1000);
}

function handleGuess(room: ServerRoom, playerId: string, guessTitle: string) {
  const player = room.players.find(p => p.id === playerId);
  if (!player || player.hasAnswered || !room.currentMovie) return;

  player.hasAnswered = true;

  const normalize = (s: string) =>
    s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();

  const isCorrect = Boolean(
    normalize(guessTitle) === normalize(room.currentMovie.title) ||
    (room.currentMovie.originalTitle && normalize(guessTitle) === normalize(room.currentMovie.originalTitle))
  );

  player.lastAnswerCorrect = isCorrect;

  if (isCorrect) {
    player.score += 10;
    room.messages.push({
      id: 'msg_' + Date.now(),
      senderId: 'system',
      senderName: 'Sistema',
      text: `🎯 ${player.name} acertou o filme! (+10 pontos)`,
      time: new Date().toLocaleTimeString().slice(0, 5),
      type: 'correct',
    });

    broadcastRoom(room, 'GUESS_RESULT', { playerId, isCorrect: true, pointsAwarded: 10 });
  } else {
    player.tomatoes += 1;
    room.messages.push({
      id: 'msg_' + Date.now(),
      senderId: 'system',
      senderName: 'Sistema',
      text: `🍅 ${player.name} errou e levou uma tomatada na cara!`,
      time: new Date().toLocaleTimeString().slice(0, 5),
      type: 'splat',
    });

    broadcastRoom(room, 'TOMATO_SPLAT', {
      targetPlayerId: playerId,
      targetPlayerName: player.name,
    });

    broadcastRoom(room, 'GUESS_RESULT', { playerId, isCorrect: false, pointsAwarded: 0 });
  }

  // Check if all players answered
  const allAnswered = room.players.every(p => p.hasAnswered);
  if (allAnswered) {
    if (room.roundTimer) clearInterval(room.roundTimer);
    endRound(room);
  } else {
    broadcastRoom(room);
  }
}

function endRound(room: ServerRoom) {
  room.status = 'round_result';

  // Apply tomato to any player who did not answer
  room.players.forEach(p => {
    if (!p.hasAnswered) {
      p.tomatoes += 1;
      p.hasAnswered = true;
      p.lastAnswerCorrect = false;
      broadcastRoom(room, 'TOMATO_SPLAT', {
        targetPlayerId: p.id,
        targetPlayerName: p.name,
      });
    }
  });

  // Reveal full movie details in round_result
  broadcastRoom(room, 'ROOM_STATE', {
    code: room.code,
    genre: room.genre,
    maxPlayers: room.maxPlayers,
    status: room.status,
    hostId: room.hostId,
    players: room.players.map(p => ({
      id: p.id,
      name: p.name,
      avatar: p.avatar,
      score: p.score,
      tomatoes: p.tomatoes,
      isHost: p.isHost,
      isReady: p.isReady,
      isBot: p.isBot,
      hasAnswered: p.hasAnswered,
      lastAnswerCorrect: p.lastAnswerCorrect,
      connected: p.connected,
    })),
    round: {
      roundNumber: room.roundNumber,
      totalRounds: room.totalRounds,
      movieId: room.currentMovie?.id,
      movieGenre: room.currentMovie?.genre,
      revealedHintsCount: 4,
      timeLeft: 0,
      options: room.currentMovie?.options || [],
      answeredPlayers: [],
    },
    revealedMovie: room.currentMovie,
    messages: room.messages,
    createdAt: room.createdAt,
  });

  // Wait 5 seconds to transition to next round or game over
  setTimeout(() => {
    if (room.roundNumber >= room.totalRounds) {
      room.status = 'game_over';
      broadcastRoom(room);
    } else {
      room.roundNumber += 1;
      startRound(room);
    }
  }, 5000);
}

// REST API Endpoints
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    game: 'CineAdivinha: Filmes & Moda',
    creator: 'Giovana Germano Botelho',
    activeRooms: rooms.size,
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/rooms', (req, res) => {
  const list = Array.from(rooms.values()).map(r => ({
    code: r.code,
    genre: r.genre,
    playerCount: r.players.length,
    maxPlayers: r.maxPlayers,
    status: r.status,
    createdAt: r.createdAt,
  }));
  res.json(list);
});

async function startServer() {
  const server = http.createServer(app);
  const wss = new WebSocketServer({ server, path: '/ws' });

  wss.on('connection', (ws: WebSocket) => {
    let currentRoomCode: string | null = null;
    let currentPlayerId: string | null = null;

    ws.on('message', (rawData) => {
      try {
        const { type, payload } = JSON.parse(rawData.toString());

        if (type === 'CREATE_ROOM') {
          const code = 'CINE' + Math.floor(10 + Math.random() * 90);
          currentRoomCode = code;
          currentPlayerId = payload.playerId;

          const hostPlayer: RoomPlayerState = {
            id: payload.playerId,
            name: payload.playerName || 'Cineasta',
            avatar: payload.avatar,
            score: 0,
            tomatoes: 0,
            isHost: true,
            isReady: true,
            hasAnswered: false,
            connected: true,
            ws,
          };

          const newRoom: ServerRoom = {
            code,
            genre: payload.genre || 'todos',
            maxPlayers: payload.maxPlayers || 4,
            status: 'lobby',
            hostId: payload.playerId,
            players: [hostPlayer],
            roundNumber: 1,
            totalRounds: 5,
            revealedHintsCount: 1,
            timeLeft: 22,
            usedMovieIds: [],
            messages: [
              {
                id: 'msg_init',
                senderId: 'system',
                senderName: 'Sistema',
                text: `Sala ${code} aberta! Criada por Giovana Germano Botelho.`,
                time: new Date().toLocaleTimeString().slice(0, 5),
                type: 'system',
              },
            ],
            createdAt: Date.now(),
          };

          rooms.set(code, newRoom);
          broadcastRoom(newRoom);
        } else if (type === 'JOIN_ROOM') {
          const room = rooms.get(payload.code?.toUpperCase());
          if (!room) {
            ws.send(JSON.stringify({ type: 'ERROR', payload: { message: 'Sala não encontrada!' } }));
            return;
          }

          if (room.players.length >= room.maxPlayers) {
            ws.send(JSON.stringify({ type: 'ERROR', payload: { message: 'Sala cheia (máximo de 4 jogadores)!' } }));
            return;
          }

          currentRoomCode = room.code;
          currentPlayerId = payload.playerId;

          const player: RoomPlayerState = {
            id: payload.playerId,
            name: payload.playerName || 'Jogador',
            avatar: payload.avatar,
            score: 0,
            tomatoes: 0,
            isHost: false,
            isReady: true,
            hasAnswered: false,
            connected: true,
            ws,
          };

          room.players.push(player);
          room.messages.push({
            id: 'msg_' + Date.now(),
            senderId: 'system',
            senderName: 'Sistema',
            text: `${player.name} entrou na partida!`,
            time: new Date().toLocaleTimeString().slice(0, 5),
            type: 'system',
          });

          broadcastRoom(room);
        } else if (type === 'ADD_BOT') {
          if (!currentRoomCode) return;
          const room = rooms.get(currentRoomCode);
          if (!room || room.players.length >= room.maxPlayers) return;

          const botNames = ['PipocaBot', 'CineBot', 'OscarBot', 'SpielBot'];
          const used = room.players.map(p => p.name);
          const name = botNames.find(b => !used.includes(b)) || `Bot_${Math.floor(Math.random() * 99)}`;

          const bot: RoomPlayerState = {
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
              expression: 'cool',
            },
            score: 0,
            tomatoes: 0,
            isHost: false,
            isReady: true,
            isBot: true,
            hasAnswered: false,
            connected: true,
          };

          room.players.push(bot);
          room.messages.push({
            id: 'msg_' + Date.now(),
            senderId: 'system',
            senderName: 'Sistema',
            text: `${name} entrou na sala como bot de treino!`,
            time: new Date().toLocaleTimeString().slice(0, 5),
            type: 'system',
          });

          broadcastRoom(room);
        } else if (type === 'START_GAME') {
          if (!currentRoomCode) return;
          const room = rooms.get(currentRoomCode);
          if (!room) return;
          if (room.players.length < 2) {
            ws.send(JSON.stringify({ type: 'ERROR', payload: { message: 'Mínimo de 2 jogadores para iniciar a partida!' } }));
            return;
          }
          room.roundNumber = 1;
          room.usedMovieIds = [];
          startRound(room);
        } else if (type === 'SUBMIT_GUESS') {
          if (!currentRoomCode) return;
          const room = rooms.get(currentRoomCode);
          if (room) {
            handleGuess(room, payload.playerId, payload.guessTitle);
          }
        } else if (type === 'SEND_CHAT') {
          if (!currentRoomCode) return;
          const room = rooms.get(currentRoomCode);
          if (room && payload.text) {
            room.messages.push({
              id: 'msg_' + Date.now(),
              senderId: payload.senderId,
              senderName: payload.senderName,
              text: payload.text,
              time: new Date().toLocaleTimeString().slice(0, 5),
              type: 'chat',
            });
            broadcastRoom(room);
          }
        }
      } catch (err) {
        console.error('Failed to handle incoming WS message:', err);
      }
    });

    ws.on('close', () => {
      if (currentRoomCode && currentPlayerId) {
        const room = rooms.get(currentRoomCode);
        if (room) {
          const player = room.players.find(p => p.id === currentPlayerId);
          if (player) {
            player.connected = false;
            // If in lobby, remove player
            if (room.status === 'lobby') {
              room.players = room.players.filter(p => p.id !== currentPlayerId);
              if (room.players.length === 0) {
                rooms.delete(currentRoomCode);
              } else {
                if (room.hostId === currentPlayerId) {
                  room.hostId = room.players[0].id;
                  room.players[0].isHost = true;
                }
                broadcastRoom(room);
              }
            } else {
              broadcastRoom(room);
            }
          }
        }
      }
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  server.listen(PORT, '0.0.0.0', () => {
    console.log(`CineAdivinha server running on http://0.0.0.0:${PORT}`);
    console.log(`Developed by Giovana Germano Botelho`);
  });
}

startServer();
