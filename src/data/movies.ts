import { Genre, GenreInfo, Movie } from '../types';

export const GENRES: GenreInfo[] = [
  {
    id: 'todos',
    name: 'Todos os Gêneros',
    icon: 'Clapperboard',
    description: 'Desafio supremo misturando clássicos e lançamentos de todos os tipos!',
    color: 'from-pink-500 to-rose-600',
    bgGradient: 'bg-gradient-to-br from-pink-500/20 via-slate-900 to-teal-500/20',
  },
  {
    id: 'terror',
    name: 'Terror',
    icon: 'Ghost',
    description: 'Sustos, assombrações e mistérios arrepiantes para quem tem coragem.',
    color: 'from-purple-600 to-rose-700',
    bgGradient: 'bg-gradient-to-br from-purple-900/30 via-slate-950 to-rose-950/30',
  },
  {
    id: 'comedia',
    name: 'Comédia',
    icon: 'Smile',
    description: 'Gargalhadas garantidas com os maiores sucessos do humor mundial e nacional.',
    color: 'from-amber-400 to-pink-500',
    bgGradient: 'bg-gradient-to-br from-amber-500/20 via-slate-900 to-pink-500/20',
  },
  {
    id: 'drama',
    name: 'Drama',
    icon: 'HeartHandshake',
    description: 'Histórias profundas, emocionantes e atuações inesquecíveis que marcaram época.',
    color: 'from-blue-500 to-indigo-700',
    bgGradient: 'bg-gradient-to-br from-blue-900/30 via-slate-900 to-slate-950',
  },
  {
    id: 'animacao',
    name: 'Animação',
    icon: 'Sparkles',
    description: 'Mundos mágicos da Pixar, Disney, Ghibli e sucessos para todas as idades.',
    color: 'from-teal-400 to-cyan-600',
    bgGradient: 'bg-gradient-to-br from-teal-500/20 via-slate-900 to-cyan-500/20',
  },
  {
    id: 'romance',
    name: 'Romance',
    icon: 'Heart',
    description: 'Paixões arrebatadoras, encontros do destino e casais inesquecíveis da telona.',
    color: 'from-pink-500 to-rose-400',
    bgGradient: 'bg-gradient-to-br from-pink-500/20 via-slate-900 to-rose-500/20',
  },
  {
    id: 'suspense',
    name: 'Suspense',
    icon: 'Eye',
    description: 'Plot twists eletrizantes, investigações policiais e finais de tirar o fôlego.',
    color: 'from-emerald-500 to-teal-700',
    bgGradient: 'bg-gradient-to-br from-emerald-900/30 via-slate-950 to-teal-900/30',
  },
];

export const MOVIES_DATABASE: Movie[] = [
  // --- TERROR ---
  {
    id: 'terror_1',
    title: 'O Iluminado',
    originalTitle: 'The Shining',
    genre: 'terror',
    year: 1980,
    director: 'Stanley Kubrick',
    cast: ['Jack Nicholson', 'Shelley Duvall', 'Danny Lloyd'],
    posterUrl: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?auto=format&fit=crop&w=800&q=80',
    synopsis: 'Um escritor aceita um emprego como zelador de inverno em um hotel isolado nas montanhas, onde forças sombrias começam a influenciar sua sanidade.',
    hints: [
      { level: 1, type: 'emoji', content: '🏨 🪓 ❄️ 🚪 👯‍♀️ 🥃' },
      { level: 2, type: 'info', content: 'Lançado em 1980, dirigido pelo lendário Stanley Kubrick com base na obra de Stephen King.' },
      { level: 3, type: 'quote', content: 'Frase icônica: "Aqui está Johnny!" (Here\'s Johnny!) e o mistério do quarto 237.' },
      { level: 4, type: 'synopsis', content: 'O protagonista Jack Torrance enlouquece no isolado Hotel Overlook durante uma nevasca histórica.' }
    ],
    options: ['O Iluminado', 'Psicose', 'O Exorcista', 'Carrie, a Estranha']
  },
  {
    id: 'terror_2',
    title: 'Corra!',
    originalTitle: 'Get Out',
    genre: 'terror',
    year: 2017,
    director: 'Jordan Peele',
    cast: ['Daniel Kaluuya', 'Allison Williams', 'Bradley Whitford'],
    posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    synopsis: 'Um jovem negro visita a misteriosa propriedade da família da namorada branca e descobre uma trama perturbadora.',
    hints: [
      { level: 1, type: 'emoji', content: '☕ 🥄 🦌 👁️ 🏃‍♂️ 🫖' },
      { level: 2, type: 'info', content: 'Lançado em 2017, vencedor do Oscar de Melhor Roteiro Original dirigido por Jordan Peele.' },
      { level: 3, type: 'quote', content: 'O som hipnótico da colher batendo na xícara de chá faz o protagonista afundar no "Lugar Submerso".' },
      { level: 4, type: 'synopsis', content: 'Chris viaja para conhecer os pais de sua namorada Rose Armitage e percebe comportamentos bizarros da comunidade.' }
    ],
    options: ['Corra!', 'Nós', 'Hereditário', 'O Homem Invisível']
  },
  {
    id: 'terror_3',
    title: 'Invocação do Mal',
    originalTitle: 'The Conjuring',
    genre: 'terror',
    year: 2013,
    director: 'James Wan',
    cast: ['Vera Farmiga', 'Patrick Wilson', 'Lili Taylor'],
    posterUrl: 'https://images.unsplash.com/photo-1481349518771-20055b2a7b24?auto=format&fit=crop&w=800&q=80',
    synopsis: 'Os investigadores paranormais Ed e Lorraine Warren ajudam uma família aterrorizada por uma presença demoníaca em sua fazenda.',
    hints: [
      { level: 1, type: 'emoji', content: '🕯️ 👧 🪆 👏 👻 🏚️' },
      { level: 2, type: 'info', content: 'Lançado em 2013, iniciou um dos maiores universos cinematográficos de terror moderno dirigido por James Wan.' },
      { level: 3, type: 'quote', content: 'O jogo do esconde-esconde com palmas no porão escuro e a boneca Annabelle no museu dos investigadores.' },
      { level: 4, type: 'synopsis', content: 'Baseado nos arquivos reais dos demonologistas Ed e Lorraine Warren ajudando a família Perron em Rhode Island.' }
    ],
    options: ['Invocação do Mal', 'Sobrenatural', 'Annabelle', 'O Exorcismo de Emily Rose']
  },
  {
    id: 'terror_4',
    title: 'Pânico',
    originalTitle: 'Scream',
    genre: 'terror',
    year: 1996,
    director: 'Wes Craven',
    cast: ['Neve Campbell', 'Courteney Cox', 'David Arquette'],
    posterUrl: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&w=800&q=80',
    synopsis: 'Um assassino mascarado aterroriza a cidade de Woodsboro, interrogando suas vítimas sobre regras de filmes de terror.',
    hints: [
      { level: 1, type: 'emoji', content: '📞 😱 🔪 🍿 🎭 🩸' },
      { level: 2, type: 'info', content: 'Lançado em 1996, dirigido pelo mestre Wes Craven, revitalizou o gênero slasher nos anos 90.' },
      { level: 3, type: 'quote', content: 'Frase icônica ao telefone: "Qual é o seu filme de terror favorito?"' },
      { level: 4, type: 'synopsis', content: 'A máscara Ghostface persegue a jovem Sidney Prescott enquanto desafia clichês cinematográficos.' }
    ],
    options: ['Pânico', 'Halloween', 'Sexta-Feira 13', 'A Hora do Pesadelo']
  },
  {
    id: 'terror_5',
    title: 'Hereditário',
    originalTitle: 'Hereditary',
    genre: 'terror',
    year: 2018,
    director: 'Ari Aster',
    cast: ['Toni Collette', 'Alex Wolff', 'Milly Shapiro'],
    posterUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    synopsis: 'Após a morte da matriarca, uma família enlutada desvenda segredos terríveis e sobrenaturais sobre sua ancestralidade.',
    hints: [
      { level: 1, type: 'emoji', content: '🏠 🚗 🥜 👑 🕯️ 👵' },
      { level: 2, type: 'info', content: 'Lançado em 2018 pela A24, estreou a aclamada carreira do diretor Ari Aster com atuação sublime de Toni Collette.' },
      { level: 3, type: 'quote', content: 'Um som característico de estalo de língua com a boca e miniaturas sinistras de casas de boneca.' },
      { level: 4, type: 'synopsis', content: 'A trágica família Graham enfrenta um culto satânico centrado na figura do demônio Paimon.' }
    ],
    options: ['Hereditário', 'Midsommar', 'A Bruxa', 'O Babadook']
  },

  // --- COMÉDIA ---
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
      { level: 4, type: 'synopsis', content: 'Os irmãos agentes Marcus e Kevin Copeland se passam por Brittany e Tiffany Wilson.' }
    ],
    options: ['As Branquelas', 'O Máskara', 'Vovó... Zona', 'Todo Mundo em Pânico']
  },
  {
    id: 'comedia_2',
    title: 'Minha Mãe É uma Peça',
    originalTitle: 'Minha Mãe É uma Peça',
    genre: 'comedia',
    year: 2013,
    director: 'André Pellenz',
    cast: ['Paulo Gustavo', 'Mariana Xavier', 'Rodrigo Pandolfo'],
    posterUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    synopsis: 'Dona Hermínia é uma mulher de meia-idade divorciada que descobre que os filhos a acham chata e resolve sair de casa.',
    hints: [
      { level: 1, type: 'emoji', content: '👵 🧕 📱 👠 🗣️ 🍲' },
      { level: 2, type: 'info', content: 'Sucesso absoluto do cinema nacional estrelado e criado pelo saudoso Paulo Gustavo em 2013.' },
      { level: 3, type: 'quote', content: '"Juliano! Marcelina! Eu passei a vida inteira me dedicando a essas crianças!" com os bobes no cabelo.' },
      { level: 4, type: 'synopsis', content: 'Dona Hermínia vai se refugiar na casa da tia Zélia para desabafar sobre a ingratidão dos filhos.' }
    ],
    options: ['Minha Mãe É uma Peça', 'Até que a Sorte nos Separe', 'Os Farofeiros', 'Tô Ryca']
  },
  {
    id: 'comedia_3',
    title: 'Se Beber, Não Case!',
    originalTitle: 'The Hangover',
    genre: 'comedia',
    year: 2009,
    director: 'Todd Phillips',
    cast: ['Bradley Cooper', 'Ed Helms', 'Zach Galifianakis'],
    posterUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
    synopsis: 'Três amigos acordam de uma despedida de solteiro em Las Vegas sem memória da noite anterior e sem o noivo.',
    hints: [
      { level: 1, type: 'emoji', content: '🎰 🐅 👶 🦷 🍾 🕶️' },
      { level: 2, type: 'info', content: 'Comédia de 2009 dirigida por Todd Phillips ambientada na loucura de Las Vegas.' },
      { level: 3, type: 'quote', content: 'Acordam na suíte do hotel com um tigre no banheiro, um dente arrancado e um bebê no armário.' },
      { level: 4, type: 'synopsis', content: 'Phil, Stu e Alan precisam achar Doug antes da cerimônia de casamento começar.' }
    ],
    options: ['Se Beber, Não Case!', 'Gente Grande', 'Superbad', 'Vizinhos']
  },
  {
    id: 'comedia_4',
    title: 'O Auto da Compadecida',
    originalTitle: 'O Auto da Compadecida',
    genre: 'comedia',
    year: 2000,
    director: 'Guel Arraes',
    cast: ['Matheus Nachtergaele', 'Selton Mello', 'Fernanda Montenegro'],
    posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    synopsis: 'As aventuras hilárias dos sertanejos João Grilo e Chicó que enganam a todos no sertão da Paraíba até prestarem contas no juízo final.',
    hints: [
      { level: 1, type: 'emoji', content: '🌵 🍞 🐕 🥖 ⚖️ 🍞' },
      { level: 2, type: 'info', content: 'Clássico imortal da cultura brasileira lançado em 2000 adaptado da obra-prima de Ariano Suassuna.' },
      { level: 3, type: 'quote', content: 'Bordão eterno: "Não sei, só sei que foi assim!" e o testamento do cachorro benzeu.' },
      { level: 4, type: 'synopsis', content: 'João Grilo e Chicó lidam com o Major Antônio Morais, o bispo, Severino de Aracaju e a aparição de Nossa Senhora.' }
    ],
    options: ['O Auto da Compadecida', 'Lisbela e o Prisioneiro', 'Central do Brasil', 'Bacurau']
  },
  {
    id: 'comedia_5',
    title: 'O Máskara',
    originalTitle: 'The Mask',
    genre: 'comedia',
    year: 1994,
    director: 'Chuck Russell',
    cast: ['Jim Carrey', 'Cameron Diaz', 'Peter Greene'],
    posterUrl: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&w=800&q=80',
    synopsis: 'Um bancário tímido encontra uma antiga máscara nórdica que o transforma em um personagem de desenho animado hiperativo e travesso.',
    hints: [
      { level: 1, type: 'emoji', content: '🎭 🟢 💛 🐕 💃 🎷' },
      { level: 2, type: 'info', content: 'Sucesso de 1994 que catapultou Jim Carrey e marcou a estreia triunfal de Cameron Diaz.' },
      { level: 3, type: 'quote', content: 'Frase célebre: "Demais!" (Smokin\'!) e o terno amarelo berrante no clube Coco Bongo.' },
      { level: 4, type: 'synopsis', content: 'Stanley Ipkiss e seu cãozinho Milo usam os poderes do deus nórdico Loki.' }
    ],
    options: ['O Máskara', 'Debi & Lóide', 'Ace Ventura', 'Click']
  },

  // --- DRAMA ---
  {
    id: 'drama_1',
    title: 'O Show de Truman',
    originalTitle: 'The Truman Show',
    genre: 'drama',
    year: 1998,
    director: 'Peter Weir',
    cast: ['Jim Carrey', 'Laura Linney', 'Ed Harris'],
    posterUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80',
    synopsis: 'Um vendedor de seguros descobre aos poucos que toda a sua vida é, na verdade, um reality show televisionado 24 horas por dia para o planeta inteiro.',
    hints: [
      { level: 1, type: 'emoji', content: '🎥 ☀️ ⛵ 🚪 🌧️ 📺' },
      { level: 2, type: 'info', content: 'Lançado em 1998, aclamado drama existencial com atuação dramática espetacular de Jim Carrey.' },
      { level: 3, type: 'quote', content: '"Caso eu não os veja mais: bom dia, boa tarde e boa noite!" diante da porta de saída do céu cenográfico.' },
      { level: 4, type: 'synopsis', content: 'Truman Burbank tenta escapar da ilha fictícia de Seahaven construída pelo produtor Christof.' }
    ],
    options: ['O Show de Truman', 'Brilho Eterno de uma Mente Sem Lembranças', 'Clube da Luta', 'Forrest Gump']
  },
  {
    id: 'drama_2',
    title: 'Um Sonho de Liberdade',
    originalTitle: 'The Shawshank Redemption',
    genre: 'drama',
    year: 1994,
    director: 'Frank Darabont',
    cast: ['Tim Robbins', 'Morgan Freeman', 'Bob Gunton'],
    posterUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80',
    synopsis: 'Um banqueiro condenado injustamente por homicídio passa décadas em uma penitenciária mantendo viva a esperança e a amizade.',
    hints: [
      { level: 1, type: 'emoji', content: '⛓️ 🔨 🌧️ ♟️ 📖 🏖️' },
      { level: 2, type: 'info', content: 'Filme número 1 de todos os tempos no ranking do IMDb, lançado em 1994 e baseado em Stephen King.' },
      { level: 3, type: 'quote', content: 'Um martelinho de geologia escondido dentro de uma Bíblia e um pôster de Rita Hayworth na parede da cela.' },
      { level: 4, type: 'synopsis', content: 'Andy Dufresne planeja pacientemente sua fuga para encontrar o amigo Red em Zihuatanejo.' }
    ],
    options: ['Um Sonho de Liberdade', 'À Espera de um Milagre', 'O Poderoso Chefão', 'Pulp Fiction']
  },
  {
    id: 'drama_3',
    title: 'À Procura da Felicidade',
    originalTitle: 'The Pursuit of Happyness',
    genre: 'drama',
    year: 2006,
    director: 'Gabriele Muccino',
    cast: ['Will Smith', 'Jaden Smith', 'Thandiwe Newton'],
    posterUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=800&q=80',
    synopsis: 'Um pai solteiro luta contra o desabrigo e as dívidas enquanto faz um estágio não remunerado como corretor da bolsa.',
    hints: [
      { level: 1, type: 'emoji', content: '💼 🧩 🚊 👨‍👦 🪙 🏢' },
      { level: 2, type: 'info', content: 'Emocionante biografia de 2006 estrelada por Will Smith ao lado de seu filho real Jaden Smith.' },
      { level: 3, type: 'quote', content: '"Nunca deixe ninguém dizer que você não pode fazer algo. Se você tem um sonho, tem que protegê-lo."' },
      { level: 4, type: 'synopsis', content: 'Chris Gardner monta o Cubo Mágico no táxi e dorme no banheiro do metrô com o filho pequeno.' }
    ],
    options: ['À Procura da Felicidade', 'Sete Vidas', 'Beleza Americana', 'Menina de Ouro']
  },
  {
    id: 'drama_4',
    title: 'Central do Brasil',
    originalTitle: 'Central do Brasil',
    genre: 'drama',
    year: 1998,
    director: 'Walter Salles',
    cast: ['Fernanda Montenegro', 'Vinícius de Oliveira', 'Marília Pêra'],
    posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    synopsis: 'Uma ex-professora amargurada que escreve cartas na estação de trem acompanha um menino órfão pelo sertão à procura do pai.',
    hints: [
      { level: 1, type: 'emoji', content: '✉️ 🚂 👦 👵 🌵 🚌' },
      { level: 2, type: 'info', content: 'Obra-prima brasileira de 1998 que rendeu a Fernanda Montenegro indicação histórica ao Oscar de Melhor Atriz.' },
      { level: 3, type: 'quote', content: '"Tenho medo de você se esquecer de mim..." na tocante carta final no ônibus voltando para o Rio.' },
      { level: 4, type: 'synopsis', content: 'Dora ajuda o pequeno Josué a cruzar o Nordeste para encontrar seus irmãos Moisés e Isaías.' }
    ],
    options: ['Central do Brasil', 'Cidade de Deus', 'Que Horas Ela Volta?', 'Aquarius']
  },
  {
    id: 'drama_5',
    title: 'Oppenheimer',
    originalTitle: 'Oppenheimer',
    genre: 'drama',
    year: 2023,
    director: 'Christopher Nolan',
    cast: ['Cillian Murphy', 'Robert Downey Jr.', 'Emily Blunt'],
    posterUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    synopsis: 'A história da criação do Projeto Manhattan e o dilema ético do físico teórico apelidado de pai da bomba atômica.',
    hints: [
      { level: 1, type: 'emoji', content: '☢️ 💣 🎩 🍎 ⏳ 🧪' },
      { level: 2, type: 'info', content: 'Vencedor de 7 Oscars em 2024, dirigido com maestria por Christopher Nolan com Cillian Murphy.' },
      { level: 3, type: 'quote', content: '"Agora me tornei a Morte, a destruidora de mundos." citando os textos sagrados hindus.' },
      { level: 4, type: 'synopsis', content: 'O teste Trinity no deserto de Los Alamos e o posterior julgamento político liderado por Lewis Strauss.' }
    ],
    options: ['Oppenheimer', 'O Jogo da Imitação', 'Dunkirk', 'Interestelar']
  },

  // --- ANIMAÇÃO ---
  {
    id: 'animacao_1',
    title: 'A Viagem de Chihiro',
    originalTitle: 'Spirited Away',
    genre: 'animacao',
    year: 2001,
    director: 'Hayao Miyazaki',
    cast: ['Rumi Hiiragi', 'Miyu Irino', 'Mari Natsuki'],
    posterUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
    synopsis: 'Uma menina mimada de 10 anos entra no mundo dos espíritos onde seus pais são transformados em porcos e precisa trabalhar em uma casa de banhos.',
    hints: [
      { level: 1, type: 'emoji', content: '🐉 ♨️ 🐷 🍙 🚂 🎭' },
      { level: 2, type: 'info', content: 'Produção do Studio Ghibli dirigida por Hayao Miyazaki, único anime a vencer o Oscar de Melhor Animação.' },
      { level: 3, type: 'quote', content: 'O dragão branco Haku que na verdade é o espírito do rio Kohaku, e o espírito Sem Rosto.' },
      { level: 4, type: 'synopsis', content: 'A bruxa Yubaba rouba o nome da protagonista, apelidando-a de "Sen" na casa de banhos mágicos.' }
    ],
    options: ['A Viagem de Chihiro', 'Meu Amigo Totoro', 'O Castelo Animado', 'Princesa Mononoke']
  },
  {
    id: 'animacao_2',
    title: 'Viva: A Vida É uma Festa',
    originalTitle: 'Coco',
    genre: 'animacao',
    year: 2017,
    director: 'Lee Unkrich',
    cast: ['Anthony Gonzalez', 'Gael García Bernal', 'Benjamin Bratt'],
    posterUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    synopsis: 'Um menino mexicano apaixonado por música vai parar na Terra dos Mortos durante o Dia dos Mortos para desvendar o mistério de sua família.',
    hints: [
      { level: 1, type: 'emoji', content: '🎸 💀 🏵️ 🐕 👟 🕯️' },
      { level: 2, type: 'info', content: 'Aclamada animação da Pixar de 2017 vencedora do Oscar com a canção "Lembre de Mim" (Remember Me).' },
      { level: 3, type: 'quote', content: 'A ponte de pétalas de calêndula brilhantes e a bisavó idosa que se emociona com a canção de ninar.' },
      { level: 4, type: 'synopsis', content: 'O garoto Miguel Rivera sonha em ser músico como Ernesto de la Cruz, desafiando a proibição de sapatos da família.' }
    ],
    options: ['Viva: A Vida É uma Festa', 'Festa no Céu', 'Encanto', 'Moana']
  },
  {
    id: 'animacao_3',
    title: 'Toy Story',
    originalTitle: 'Toy Story',
    genre: 'animacao',
    year: 1995,
    director: 'John Lasseter',
    cast: ['Tom Hanks', 'Tim Allen', 'Don Rickles'],
    posterUrl: 'https://images.unsplash.com/photo-1558679908-541bcf1249ff?auto=format&fit=crop&w=800&q=80',
    synopsis: 'Um boneco caubói tem seu posto de brinquedo favorito ameaçado quando seu dono ganha um moderno patrulheiro espacial.',
    hints: [
      { level: 1, type: 'emoji', content: '🤠 🚀 🦖 🥔 🐕 📦' },
      { level: 2, type: 'info', content: 'O primeiro longa-metragem totalmente feito em computação gráfica da história, lançado pela Pixar em 1995.' },
      { level: 3, type: 'quote', content: 'Frases lendárias: "Tem uma cobra na minha bota!" e "Ao infinito e além!".' },
      { level: 4, type: 'synopsis', content: 'Woody e Buzz Lightyear precisam fugir da casa do vizinho destruidor de brinquedos Sid Phillips.' }
    ],
    options: ['Toy Story', 'Monstros S.A.', 'Vida de Inseto', 'Os Incríveis']
  },
  {
    id: 'animacao_4',
    title: 'Homem-Aranha no Aranhaverso',
    originalTitle: 'Spider-Man: Into the Spider-Verse',
    genre: 'animacao',
    year: 2018,
    director: 'Bob Persichetti, Peter Ramsey',
    cast: ['Shameik Moore', 'Jake Johnson', 'Hailee Steinfeld'],
    posterUrl: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=800&q=80',
    synopsis: 'O jovem Miles Morales é picado por uma aranha radioativa e precisa liderar heróis de diferentes dimensões para salvar a realidade.',
    hints: [
      { level: 1, type: 'emoji', content: '🕷️ 🎨 👟 🎧 🌌 🐷' },
      { level: 2, type: 'info', content: 'Revolucionou a estética da animação 3D com estilo de história em quadrinhos em 2018, ganhando o Oscar.' },
      { level: 3, type: 'quote', content: 'Trilha sonora marcante com "Sunflower" de Post Malone e o salto de fé sobre os arranha-céus de Nova York.' },
      { level: 4, type: 'synopsis', content: 'Miles Morales treina com um Peter B. Parker decadente e conhece Gwen Stacy e Porco-Aranha.' }
    ],
    options: ['Homem-Aranha no Aranhaverso', 'Operação Big Hero', 'Megamente', 'Como Treinar o Seu Dragão']
  },
  {
    id: 'animacao_5',
    title: 'Shrek',
    originalTitle: 'Shrek',
    genre: 'animacao',
    year: 2001,
    director: 'Andrew Adamson, Vicky Jenson',
    cast: ['Mike Myers', 'Eddie Murphy', 'Cameron Diaz'],
    posterUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80',
    synopsis: 'Um ogro que ama a solidão de seu pântano faz um acordo para resgatar uma princesa prisioneira guardada por um dragão.',
    hints: [
      { level: 1, type: 'emoji', content: '🟢 🧅 🫏 🏰 🐉 👑' },
      { level: 2, type: 'info', content: 'Primeiro vencedor da história do Oscar de Melhor Filme de Animação em 2002 pela DreamWorks.' },
      { level: 3, type: 'quote', content: '"Os ogros são como cebolas: têm camadas!" e o Burro cantando "I\'m a Believer".' },
      { level: 4, type: 'synopsis', content: 'O protagonista vai buscar a princesa Fiona para o tirano e baixinho Lord Farquaad de Duloc.' }
    ],
    options: ['Shrek', 'Gato de Botas', 'Madagascar', 'A Era do Gelo']
  },

  // --- ROMANCE ---
  {
    id: 'romance_1',
    title: 'Titanic',
    originalTitle: 'Titanic',
    genre: 'romance',
    year: 1997,
    director: 'James Cameron',
    cast: ['Leonardo DiCaprio', 'Kate Winslet', 'Billy Zane'],
    posterUrl: 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?auto=format&fit=crop&w=800&q=80',
    synopsis: 'Um jovem artista sem dinheiro e uma jovem aristocrata noiva se apaixonam a bordo do navio de luxo mais famoso da história.',
    hints: [
      { level: 1, type: 'emoji', content: '🚢 🧊 💎 🎨 🎻 🌊' },
      { level: 2, type: 'info', content: 'Venceu 11 Oscars em 1998, dirigido por James Cameron e com a canção "My Heart Will Go On" de Celine Dion.' },
      { level: 3, type: 'quote', content: 'Cena icônica na proa do navio: "Eu sou o rei do mundo!" e o desenho no papel com o colar Coração do Oceano.' },
      { level: 4, type: 'synopsis', content: 'O romance proibido de Jack Dawson e Rose DeWitt Bukater durante a viagem inaugural de Southampton a Nova York.' }
    ],
    options: ['Titanic', 'Diário de uma Paixão', 'Ghost: Do Outro Lado da Vida', 'Um Amor para Recordar']
  },
  {
    id: 'romance_2',
    title: 'La La Land: Cantando Estações',
    originalTitle: 'La La Land',
    genre: 'romance',
    year: 2016,
    director: 'Damien Chazelle',
    cast: ['Ryan Gosling', 'Emma Stone', 'John Legend'],
    posterUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    synopsis: 'Um pianista de jazz dedicado e uma aspirante a atriz se apaixonam em Los Angeles enquanto perseguem seus maiores sonhos profissionais.',
    hints: [
      { level: 1, type: 'emoji', content: '🎹 💃 🌆 🎷 💛 🎭' },
      { level: 2, type: 'info', content: 'Musical romântico de 2016 dirigido por Damien Chazelle que igualou o recorde de 14 indicações ao Oscar.' },
      { level: 3, type: 'quote', content: 'A dança mágica com sapatos de sapateado na colina com vista para as luzes noturnas de Los Angeles.' },
      { level: 4, type: 'synopsis', content: 'Sebastian sonha em abrir seu próprio clube de jazz e Mia enfrenta rejeições em testes de elenco.' }
    ],
    options: ['La La Land: Cantando Estações', 'O Rei do Show', 'Moulin Rouge!', 'Nasce uma Estrela']
  },
  {
    id: 'romance_3',
    title: '10 Coisas Que Eu Odeio em Você',
    originalTitle: '10 Things I Hate About You',
    genre: 'romance',
    year: 1999,
    director: 'Gil Junger',
    cast: ['Heath Ledger', 'Julia Stiles', 'Joseph Gordon-Levitt'],
    posterUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
    synopsis: 'Um garoto bonito é pago para namorar uma jovem rebelde e geniosa para que a irmã mais nova possa ir ao baile do colégio.',
    hints: [
      { level: 1, type: 'emoji', content: '🎸 🎤 📄 ⚽ 🛹 💔' },
      { level: 2, type: 'info', content: 'Clássico adolescente de 1999 inspirado livremente na peça "A Megera Domada" de William Shakespeare.' },
      { level: 3, type: 'quote', content: 'Heath Ledger canta "Can\'t Take My Eyes Off You" na arquibancada do estádio da escola com a banda marcial.' },
      { level: 4, type: 'synopsis', content: 'Kat Stratford lê um poema emocionante na sala de aula que termina com "eu odeio o fato de não conseguir te odiar".' }
    ],
    options: ['10 Coisas Que Eu Odeio em Você', 'Ela é Demais', 'As Patricinhas de Beverly Hills', 'A Barraca do Beijo']
  },
  {
    id: 'romance_4',
    title: 'Como Eu Era Antes de Você',
    originalTitle: 'Me Before You',
    genre: 'romance',
    year: 2016,
    director: 'Thea Sharrock',
    cast: ['Emilia Clarke', 'Sam Claflin', 'Janet McTeer'],
    posterUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
    synopsis: 'Uma jovem alegre de cidade pequena é contratada para cuidar de um homem tetraplégico rico e cínico, transformando a vida de ambos.',
    hints: [
      { level: 1, type: 'emoji', content: '🐝 🦽 🏰 👠 🧣 ☕' },
      { level: 2, type: 'info', content: 'Sucesso de bilheteria de 2016 adaptado do romance comovente de Jojo Moyes.' },
      { level: 3, type: 'quote', content: 'A famosa meia-calça de abelhinha listrada de amarelo e preto que a protagonista ganha de aniversário.' },
      { level: 4, type: 'synopsis', content: 'Louisa Clark tenta reacender a vontade de viver de Will Traynor após um grave acidente.' }
    ],
    options: ['Como Eu Era Antes de Você', 'A Culpa é das Estrelas', 'Simplesmente Acontece', 'Querido John']
  },
  {
    id: 'romance_5',
    title: 'Brilho Eterno de uma Mente Sem Lembranças',
    originalTitle: 'Eternal Sunshine of the Spotless Mind',
    genre: 'romance',
    year: 2004,
    director: 'Michel Gondry',
    cast: ['Jim Carrey', 'Kate Winslet', 'Kirsten Dunst'],
    posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    synopsis: 'Após um término doloroso, um homem decide passar por um procedimento experimental para apagar todas as memórias de sua ex-namorada.',
    hints: [
      { level: 1, type: 'emoji', content: '🧠 🧊 🧡 🌊 🚂 💭' },
      { level: 2, type: 'info', content: 'Vencedor do Oscar de Melhor Roteiro Original em 2005 escrito por Charlie Kaufman e dirigido por Michel Gondry.' },
      { level: 3, type: 'quote', content: 'A protagonista muda constantemente a cor do cabelo (azul, verde, laranja tangerine) e se deitam no lago congelado.' },
      { level: 4, type: 'synopsis', content: 'Joel Barish percebe que ainda ama Clementine Kruczynski enquanto suas lembranças estão sendo apagadas na mente.' }
    ],
    options: ['Brilho Eterno de uma Mente Sem Lembranças', 'Her', 'Questão de Tempo', 'Antes do Amanhecer']
  },

  // --- SUSPENSE ---
  {
    id: 'suspense_1',
    title: 'O Sexto Sentido',
    originalTitle: 'The Sixth Sense',
    genre: 'suspense',
    year: 1999,
    director: 'M. Night Shyamalan',
    cast: ['Bruce Willis', 'Haley Joel Osment', 'Toni Collette'],
    posterUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    synopsis: 'Um psicólogo infantil dedicado atende um garoto assustado que afirma ser capaz de ver e se comunicar com pessoas mortas.',
    hints: [
      { level: 1, type: 'emoji', content: '👻 👦 🩺 🥶 💍 🚪' },
      { level: 2, type: 'info', content: 'Lançado em 1999, consagrou o diretor M. Night Shyamalan com um dos plot twists mais famosos da história.' },
      { level: 3, type: 'quote', content: 'Frase que parou o mundo: "Eu vejo gente morta... com que frequência? O tempo todo."' },
      { level: 4, type: 'synopsis', content: 'O Dr. Malcolm Crowe descobre no clímax a verdade chocante sobre seu próprio estado após a aliança cair no chão.' }
    ],
    options: ['O Sexto Sentido', 'Os Outros', 'Corpo Fechado', 'Sinais']
  },
  {
    id: 'suspense_2',
    title: 'Ilha do Medo',
    originalTitle: 'Shutter Island',
    genre: 'suspense',
    year: 2010,
    director: 'Martin Scorsese',
    cast: ['Leonardo DiCaprio', 'Mark Ruffalo', 'Ben Kingsley'],
    posterUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=800&q=80',
    synopsis: 'Em 1954, um delegado federal investiga o desaparecimento inexplicável de uma paciente em um hospital psiquiátrico para criminosos em uma ilha isolada.',
    hints: [
      { level: 1, type: 'emoji', content: '🏝️ 🏥 ⛈️ 💊 🌊 🕯️' },
      { level: 2, type: 'info', content: 'Suspense psicológico angustiante de 2010 dirigido por Martin Scorsese estrelado por Leonardo DiCaprio.' },
      { level: 3, type: 'quote', content: '"O que seria pior: viver como um monstro ou morrer como um homem bom?" próximo ao farol.' },
      { level: 4, type: 'synopsis', content: 'Teddy Daniels investiga a paciente Rachel Solando no complexo Ashecliffe e descobre a regra dos 4.' }
    ],
    options: ['Ilha do Medo', 'Garota Exemplar', 'Amnésia', 'Seven: Os Sete Crimes Capitais']
  },
  {
    id: 'suspense_3',
    title: 'Garota Exemplar',
    originalTitle: 'Gone Girl',
    genre: 'suspense',
    year: 2014,
    director: 'David Fincher',
    cast: ['Ben Affleck', 'Rosamund Pike', 'Neil Patrick Harris'],
    posterUrl: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&w=800&q=80',
    synopsis: 'No dia do quinto aniversário de casamento, uma mulher desaparece e seu marido se torna o principal suspeito sob a mira da mídia.',
    hints: [
      { level: 1, type: 'emoji', content: '👱‍♀️ 🩸 📝 💍 📺 🍷' },
      { level: 2, type: 'info', content: 'Adaptação dirigida pelo mestre David Fincher em 2014 baseada no best-seller de Gillian Flynn.' },
      { level: 3, type: 'quote', content: 'O famoso monólogo da "Garota Legal" (Cool Girl) e a caça ao tesouro anual com envelopes lacrados.' },
      { level: 4, type: 'synopsis', content: 'Nick Dunne tenta provar sua inocência enquanto o plano genial e diabólico de Amy Dunne se desdobra.' }
    ],
    options: ['Garota Exemplar', 'A Garota no Trem', 'Zodíaco', 'Os Homens que Não Amavam as Mulheres']
  },
  {
    id: 'suspense_4',
    title: 'Parasita',
    originalTitle: 'Gisaengchung',
    genre: 'suspense',
    year: 2019,
    director: 'Bong Joon-ho',
    cast: ['Song Kang-ho', 'Lee Sun-kyun', 'Cho Yeo-jeong'],
    posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    synopsis: 'Uma família pobre se infiltra aos poucos nos empregos da luxuosa mansão de uma família rica, até que um segredo no porão vem à tona.',
    hints: [
      { level: 1, type: 'emoji', content: '🍑 🪨 🍜 🌧️ 🛖 ⛺' },
      { level: 2, type: 'info', content: 'Histórico vencedor de 4 Oscars em 2020 incluindo Melhor Filme, dirigido pelo sul-coreano Bong Joon-ho.' },
      { level: 3, type: 'quote', content: 'A pedra da prosperidade, o macarrão "Ram-don" com bife caro e a alergia mortal a pêssego.' },
      { level: 4, type: 'synopsis', content: 'A família Kim trama para demitir os funcionários da família Park para assumirem seus lugares na moderna residência.' }
    ],
    options: ['Parasita', 'Oldboy', 'Decisão de Partir', 'Invasão Zumbi']
  },
  {
    id: 'suspense_5',
    title: 'Seven: Os Sete Crimes Capitais',
    originalTitle: 'Se7en',
    genre: 'suspense',
    year: 1995,
    director: 'David Fincher',
    cast: ['Brad Pitt', 'Morgan Freeman', 'Kevin Spacey'],
    posterUrl: 'https://images.unsplash.com/photo-1481349518771-20055b2a7b24?auto=format&fit=crop&w=800&q=80',
    synopsis: 'Dois detetives de homicídios investigam uma série de assassinatos brutais cometidos por um criminoso meticuloso baseado nos pecados capitais.',
    hints: [
      { level: 1, type: 'emoji', content: '📦 🌧️ 🔦 ⚖️ 📖 🪓' },
      { level: 2, type: 'info', content: 'Obra sombria neo-noir de 1995 com direção estilizada e chuvosa de David Fincher.' },
      { level: 3, type: 'quote', content: 'Grito desesperado no deserto: "O que tem na caixa?!" ("What\'s in the box?!").' },
      { level: 4, type: 'synopsis', content: 'Os detetives Somerset e Mills caçam o assassino John Doe que prega Gula, Ganância, Preguiça, Luxúria, Orgulho, Inveja e Ira.' }
    ],
    options: ['Seven: Os Sete Crimes Capitais', 'O Silêncio dos Inocentes', 'Zodíaco', 'Os Suspeitos']
  }
];

export function getMoviesByGenre(genre: Genre): Movie[] {
  if (genre === 'todos') {
    return [...MOVIES_DATABASE];
  }
  return MOVIES_DATABASE.filter(m => m.genre === genre);
}

export function getRandomMovie(genre: Genre, excludeIds: string[] = []): Movie {
  const available = getMoviesByGenre(genre).filter(m => !excludeIds.includes(m.id));
  const list = available.length > 0 ? available : getMoviesByGenre(genre);
  const randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex] || MOVIES_DATABASE[0];
}
