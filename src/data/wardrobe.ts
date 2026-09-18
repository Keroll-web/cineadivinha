import { WardrobeItem } from '../types';

export const WARDROBE_ITEMS: WardrobeItem[] = [
  // --- CABEÇA / CHAPÉUS ---
  {
    id: 'head_default',
    name: 'Cabelo Natural',
    category: 'head',
    requiredLevel: 1,
    requiredPoints: 0,
    description: 'Estilo clean sem cobertura na cabeça.',
    rarity: 'comum',
    color: '#64748B',
    icon: 'Sparkles',
  },
  {
    id: 'head_director_beret',
    name: 'Boina de Diretor',
    category: 'head',
    requiredLevel: 2,
    requiredPoints: 30,
    description: 'A clássica boina de veludo dos grandes cineastas europeus.',
    rarity: 'comum',
    color: '#1E293B',
    icon: 'GraduationCap',
  },
  {
    id: 'head_star_tiara',
    name: 'Tiara Estrela de Gala',
    category: 'head',
    requiredLevel: 2,
    requiredPoints: 30,
    description: 'Brilho de strass para quem nasceu para os holofotes.',
    rarity: 'raro',
    color: '#EC4899',
    icon: 'Crown',
  },
  {
    id: 'head_cowboy',
    name: 'Chapéu Faroeste Vintage',
    category: 'head',
    requiredLevel: 3,
    requiredPoints: 60,
    description: 'Inspirado nos clássicos de faroeste e duelos ao pôr do sol.',
    rarity: 'raro',
    color: '#B45309',
    icon: 'Compass',
  },
  {
    id: 'head_top_hat',
    name: 'Cartola Mágica de Estreia',
    category: 'head',
    requiredLevel: 4,
    requiredPoints: 90,
    description: 'Elegância máxima para as noites mais requintadas do tapete vermelho.',
    rarity: 'epico',
    color: '#0F172A',
    icon: 'Sparkles',
  },
  {
    id: 'head_royal_crown',
    name: 'Coroa da Sétima Arte',
    category: 'head',
    requiredLevel: 5,
    requiredPoints: 120,
    description: 'Forjada em ouro e rubis para os verdadeiros monarcas do cinema.',
    rarity: 'lendario',
    color: '#F59E0B',
    icon: 'Crown',
  },

  // --- OLHOS / ACESSÓRIOS ROSTO ---
  {
    id: 'eyes_default',
    name: 'Sem Acessório',
    category: 'eyes',
    requiredLevel: 1,
    requiredPoints: 0,
    description: 'Olhar límpido e natural.',
    rarity: 'comum',
    color: '#64748B',
    icon: 'Eye',
  },
  {
    id: 'eyes_3d_glasses',
    name: 'Óculos 3D Clássicos',
    category: 'eyes',
    requiredLevel: 2,
    requiredPoints: 30,
    description: 'Lentes azul e vermelha retrô para sentir o cinema saltar da tela!',
    rarity: 'comum',
    color: '#F43F5E',
    icon: 'Glasses',
  },
  {
    id: 'eyes_vip_shades',
    name: 'Óculos Escuros VIP',
    category: 'eyes',
    requiredLevel: 3,
    requiredPoints: 60,
    description: 'Para fugir dos flashes dos paparazzi com muito charme.',
    rarity: 'raro',
    color: '#0284C7',
    icon: 'Glasses',
  },
  {
    id: 'eyes_masquerade',
    name: 'Máscara Enigmática Veneziana',
    category: 'eyes',
    requiredLevel: 4,
    requiredPoints: 90,
    description: 'Mistério puro digno dos maiores thrillers psicológicos.',
    rarity: 'epico',
    color: '#A855F7',
    icon: 'EyeOff',
  },
  {
    id: 'eyes_cyber_visor',
    name: 'Visor Holográfico Sci-Fi',
    category: 'eyes',
    requiredLevel: 6,
    requiredPoints: 150,
    description: 'Tecnologia do futuro direto das telas de ficção científica.',
    rarity: 'lendario',
    color: '#14B8A6',
    icon: 'Monitor',
  },

  // --- ROUPAS / TRAJES ---
  {
    id: 'outfit_casual',
    name: 'Camiseta Pipoca Pop',
    category: 'outfit',
    requiredLevel: 1,
    requiredPoints: 0,
    description: 'Confortável e despojada com estampa temática de cinema.',
    rarity: 'comum',
    color: '#14B8A6',
    icon: 'Shirt',
  },
  {
    id: 'outfit_leather_jacket',
    name: 'Jaqueta de Couro Rebelde',
    category: 'outfit',
    requiredLevel: 2,
    requiredPoints: 30,
    description: 'Estilo anos 80 para acelerar pelas estradas cinematográficas.',
    rarity: 'raro',
    color: '#334155',
    icon: 'Shirt',
  },
  {
    id: 'outfit_pink_glamour',
    name: 'Vestido Gala Rosa Choque',
    category: 'outfit',
    requiredLevel: 3,
    requiredPoints: 60,
    description: 'Alta costura vibrante com caimento deslumbrante de premiere.',
    rarity: 'epico',
    color: '#F43F5E',
    icon: 'Flame',
  },
  {
    id: 'outfit_black_tuxedo',
    name: 'Smoking do Oscar',
    category: 'outfit',
    requiredLevel: 4,
    requiredPoints: 90,
    description: 'Lapela de cetim preto e gravata borboleta inconfundível.',
    rarity: 'epico',
    color: '#0F172A',
    icon: 'Award',
  },
  {
    id: 'outfit_superhero_suit',
    name: 'Traje Heroico Dourado & Teal',
    category: 'outfit',
    requiredLevel: 5,
    requiredPoints: 120,
    description: 'Armadura reluzente feita para salvar o universo no clímax da batalha.',
    rarity: 'lendario',
    color: '#2DD4BF',
    icon: 'Shield',
  },

  // --- MÃO / ACESSÓRIOS ---
  {
    id: 'hand_empty',
    name: 'Mãos Livres',
    category: 'hand',
    requiredLevel: 1,
    requiredPoints: 0,
    description: 'Pronto para aplaudir.',
    rarity: 'comum',
    color: '#64748B',
    icon: 'Hand',
  },
  {
    id: 'hand_popcorn',
    name: 'Balde de Pipoca Caramelizada',
    category: 'hand',
    requiredLevel: 2,
    requiredPoints: 30,
    description: 'Impossível assistir a uma sessão sem ela.',
    rarity: 'comum',
    color: '#FBBF24',
    icon: 'Coffee',
  },
  {
    id: 'hand_clapperboard',
    name: 'Claquete Profissional "Ação!"',
    category: 'hand',
    requiredLevel: 3,
    requiredPoints: 60,
    description: 'O som mais marcante do set de gravação: Cena 1, Tomada 1!',
    rarity: 'raro',
    color: '#1E293B',
    icon: 'Film',
  },
  {
    id: 'hand_oscar_trophy',
    name: 'Estatueta de Ouro da Academia',
    category: 'hand',
    requiredLevel: 4,
    requiredPoints: 90,
    description: 'O troféu mais cobiçado de toda a indústria cinematográfica.',
    rarity: 'epico',
    color: '#F59E0B',
    icon: 'Trophy',
  },
  {
    id: 'hand_golden_mic',
    name: 'Microfone Retrô de Apresentador',
    category: 'hand',
    requiredLevel: 5,
    requiredPoints: 120,
    description: 'Para discursos de agradecimento que arrancam lágrimas.',
    rarity: 'lendario',
    color: '#EC4899',
    icon: 'Mic',
  },

  // --- AURA / EFEITOS ESPECIAIS ---
  {
    id: 'aura_none',
    name: 'Sem Efeito',
    category: 'aura',
    requiredLevel: 1,
    requiredPoints: 0,
    description: 'Nenhum efeito especial ao redor.',
    rarity: 'comum',
    color: '#64748B',
    icon: 'CircleOff',
  },
  {
    id: 'aura_hollywood_stars',
    name: 'Chuva de Estrelas Douradas',
    category: 'aura',
    requiredLevel: 3,
    requiredPoints: 60,
    description: 'Partículas brilhantes que circundam seus passos.',
    rarity: 'raro',
    color: '#FBBF24',
    icon: 'Sparkles',
  },
  {
    id: 'aura_neon_spotlight',
    name: 'Holofote Rosa & Teal Neon',
    category: 'aura',
    requiredLevel: 4,
    requiredPoints: 90,
    description: 'Um feixe de luz vibrante que segue o protagonista da cena.',
    rarity: 'epico',
    color: '#F43F5E',
    icon: 'Sun',
  },
  {
    id: 'aura_cosmic_reel',
    name: 'Rolo de Filme Cósmico Flutuante',
    category: 'aura',
    requiredLevel: 6,
    requiredPoints: 150,
    description: 'Fita cinematográfica de 35mm brilhando em energia turquesa.',
    rarity: 'lendario',
    color: '#2DD4BF',
    icon: 'Disc',
  },
];

export function getUnlockedItems(totalPoints: number): WardrobeItem[] {
  return WARDROBE_ITEMS.filter(item => totalPoints >= item.requiredPoints);
}

export function getNextUnlockableItem(totalPoints: number): WardrobeItem | null {
  const locked = WARDROBE_ITEMS.filter(item => totalPoints < item.requiredPoints);
  if (locked.length === 0) return null;
  return locked.sort((a, b) => a.requiredPoints - b.requiredPoints)[0];
}

export function getLevelFromPoints(points: number): number {
  return Math.floor(points / 30) + 1;
}

export function getLevelTitle(level: number): string {
  if (level === 1) return 'Figurante de Cinema';
  if (level === 2) return 'Cinemaníaco Fiel';
  if (level === 3) return 'Crítico de Cinema';
  if (level === 4) return 'Estrela do Tapete Vermelho';
  if (level === 5) return 'Mestre Cineasta';
  if (level === 6) return 'Ícone de Hollywood';
  return 'Lenda da 7ª Arte';
}

export function getUnlockedItemForLevel(level: number): WardrobeItem | null {
  const items = WARDROBE_ITEMS.filter((i) => i.requiredLevel === level && i.requiredPoints > 0);
  return items.length > 0 ? items[0] : null;
}
