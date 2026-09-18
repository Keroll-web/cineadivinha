import React from 'react';
import { AvatarConfig } from '../types';

interface AvatarDisplayProps {
  avatar: AvatarConfig;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showAura?: boolean;
  className?: string;
  isHitWithTomato?: boolean;
}

export const AvatarDisplay: React.FC<AvatarDisplayProps> = ({
  avatar,
  size = 'md',
  showAura = true,
  className = '',
  isHitWithTomato = false,
}) => {
  const sizeMap = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-28 h-28',
    xl: 'w-44 h-44',
  };

  const skin = avatar?.skinTone || '#FCD34D';
  const hair = avatar?.hairColor || '#451A03';
  const headItem = avatar?.headItem || 'head_default';
  const eyeItem = avatar?.eyeItem || 'eyes_default';
  const outfit = avatar?.outfitItem || 'outfit_casual';
  const hand = avatar?.handItem || 'hand_empty';
  const aura = showAura ? (avatar?.auraItem || 'aura_none') : 'aura_none';

  return (
    <div className={`relative flex items-center justify-center select-none ${sizeMap[size]} ${className}`}>
      {/* Aura background glow/particles */}
      {aura === 'aura_hollywood_stars' && (
        <div className="absolute inset-0 -m-2 rounded-full border border-amber-400/40 bg-amber-400/10 animate-pulse" />
      )}
      {aura === 'aura_neon_spotlight' && (
        <div className="absolute inset-0 -m-3 rounded-full bg-gradient-to-tr from-pink-500/20 via-teal-400/20 to-transparent blur-md animate-spin duration-10000" />
      )}
      {aura === 'aura_cosmic_reel' && (
        <div className="absolute inset-0 -m-2 rounded-full border-2 border-dashed border-teal-400/50 animate-spin duration-7000" />
      )}

      {/* Main SVG Avatar Canvas */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-md overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="tuxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
          <linearGradient id="dressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f43f5e" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
          <linearGradient id="heroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0d9488" />
            <stop offset="100%" stopColor="#2dd4bf" />
          </linearGradient>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>

        {/* 1. Body & Neck */}
        <path d="M 45 60 L 45 70 L 55 70 L 55 60 Z" fill={skin} />

        {/* 2. Outfit Base */}
        {outfit === 'outfit_casual' && (
          <g>
            {/* Teal cinema t-shirt */}
            <path d="M 30 70 C 30 65 40 64 50 64 C 60 64 70 65 70 70 L 75 95 C 75 97 73 98 70 98 L 30 98 C 27 98 25 97 25 95 Z" fill="#0d9488" />
            {/* Popcorn badge */}
            <rect x="44" y="74" width="12" height="14" rx="2" fill="#fef08a" stroke="#ef4444" strokeWidth="1" />
            <circle cx="50" cy="74" r="3" fill="#fef08a" />
          </g>
        )}

        {outfit === 'outfit_leather_jacket' && (
          <g>
            {/* Leather jacket */}
            <path d="M 28 68 C 28 64 38 64 50 64 C 62 64 72 64 72 68 L 76 96 L 24 96 Z" fill="#1e293b" />
            {/* Zippers and silver collar */}
            <path d="M 42 66 L 50 82 L 58 66" fill="none" stroke="#94a3b8" strokeWidth="2.5" />
            <path d="M 50 82 L 50 96" stroke="#94a3b8" strokeWidth="2" strokeDasharray="1,1" />
            <polygon points="35,66 43,76 34,76" fill="#334155" />
            <polygon points="65,66 57,76 66,76" fill="#334155" />
          </g>
        )}

        {outfit === 'outfit_pink_glamour' && (
          <g>
            {/* Pink premiere gala dress */}
            <path d="M 32 68 C 36 64 44 65 50 65 C 56 65 64 64 68 68 L 78 98 L 22 98 Z" fill="url(#dressGrad)" />
            {/* Sparkle jewels on collar */}
            <circle cx="44" cy="70" r="1.5" fill="#fdf2f8" />
            <circle cx="50" cy="72" r="2" fill="#fff" />
            <circle cx="56" cy="70" r="1.5" fill="#fdf2f8" />
          </g>
        )}

        {outfit === 'outfit_black_tuxedo' && (
          <g>
            {/* Black Tuxedo */}
            <path d="M 28 68 C 30 64 40 64 50 64 C 60 64 70 64 72 68 L 76 98 L 24 98 Z" fill="url(#tuxGrad)" />
            {/* White shirt insert */}
            <polygon points="44,65 56,65 50,84" fill="#ffffff" />
            {/* Black Bowtie */}
            <polygon points="46,67 54,67 50,70" fill="#0f172a" />
            <polygon points="46,73 54,73 50,70" fill="#0f172a" />
            <circle cx="50" cy="70" r="1.2" fill="#e2e8f0" />
            {/* Lapels */}
            <polygon points="34,68 45,82 40,84 30,72" fill="#334155" />
            <polygon points="66,68 55,82 60,84 70,72" fill="#334155" />
          </g>
        )}

        {outfit === 'outfit_superhero_suit' && (
          <g>
            {/* Superhero Armor */}
            <path d="M 28 68 C 30 64 40 63 50 63 C 60 63 70 64 72 68 L 76 98 L 24 98 Z" fill="url(#heroGrad)" />
            {/* Golden chest emblem */}
            <polygon points="50,68 58,74 55,83 45,83 42,74" fill="url(#goldGrad)" />
            <circle cx="50" cy="76" r="3" fill="#0f172a" />
            {/* Shoulder pads */}
            <ellipse cx="28" cy="68" rx="6" ry="3" fill="#0f766e" />
            <ellipse cx="72" cy="68" rx="6" ry="3" fill="#0f766e" />
          </g>
        )}

        {/* 3. Head Base */}
        <ellipse cx="50" cy="42" rx="18" ry="21" fill={skin} />

        {/* Ears */}
        <circle cx="31" cy="43" r="3.5" fill={skin} />
        <circle cx="69" cy="43" r="3.5" fill={skin} />

        {/* 4. Hair Base */}
        {avatar?.hairStyle === 'curly' ? (
          <g fill={hair}>
            <circle cx="36" cy="28" r="8" />
            <circle cx="48" cy="24" r="8" />
            <circle cx="60" cy="27" r="8" />
            <circle cx="66" cy="36" r="6" />
            <circle cx="34" cy="36" r="6" />
          </g>
        ) : avatar?.hairStyle === 'long' ? (
          <g fill={hair}>
            <path d="M 32 35 C 32 20 68 20 68 35 C 70 45 74 60 72 65 C 70 60 66 42 66 38 C 60 27 40 27 34 38 C 34 42 30 60 28 65 C 26 60 30 45 32 35 Z" />
          </g>
        ) : (
          /* Short / standard slick hair */
          <path d="M 32 38 C 32 22 68 22 68 38 C 68 28 62 25 50 25 C 38 25 32 28 32 38 Z" fill={hair} />
        )}

        {/* 5. Face Details: Eyes, Eyebrows, Mouth */}
        {isHitWithTomato || avatar?.expression === 'splatted' ? (
          <g>
            {/* Splatted sad eyes 'X' */}
            <path d="M 40 37 L 46 43 M 46 37 L 40 43" stroke="#be123c" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 54 37 L 60 43 M 60 37 L 54 43" stroke="#be123c" strokeWidth="2.5" strokeLinecap="round" />
            {/* Wavy disappointed mouth */}
            <path d="M 44 53 Q 50 48 56 53" fill="none" stroke="#be123c" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        ) : (
          <g>
            {/* Eyebrows */}
            <path d="M 40 34 Q 44 32 47 34" fill="none" stroke={hair} strokeWidth="1.8" strokeLinecap="round" />
            <path d="M 53 34 Q 56 32 60 34" fill="none" stroke={hair} strokeWidth="1.8" strokeLinecap="round" />

            {/* Eyes */}
            <circle cx="43" cy="39" r="2.5" fill="#0f172a" />
            <circle cx="57" cy="39" r="2.5" fill="#0f172a" />
            {/* Eye light reflections */}
            <circle cx="44" cy="38" r="0.8" fill="#ffffff" />
            <circle cx="58" cy="38" r="0.8" fill="#ffffff" />

            {/* Cheeks blush */}
            <circle cx="38" cy="46" r="3" fill="#f43f5e" opacity="0.3" />
            <circle cx="62" cy="46" r="3" fill="#f43f5e" opacity="0.3" />

            {/* Mouth */}
            {avatar?.expression === 'cool' ? (
              <path d="M 46 51 Q 52 53 56 49" fill="none" stroke="#713f12" strokeWidth="2" strokeLinecap="round" />
            ) : (
              /* Happy smile */
              <path d="M 44 49 Q 50 55 56 49" fill="none" stroke="#713f12" strokeWidth="2.2" strokeLinecap="round" />
            )}
          </g>
        )}

        {/* 6. Eye Item (Glasses / Masks) */}
        {eyeItem === 'eyes_3d_glasses' && (
          <g>
            {/* 3D glasses frame */}
            <rect x="35" y="34" width="13" height="11" rx="2" fill="#3b82f6" opacity="0.75" stroke="#ffffff" strokeWidth="1.5" />
            <rect x="52" y="34" width="13" height="11" rx="2" fill="#ef4444" opacity="0.75" stroke="#ffffff" strokeWidth="1.5" />
            <line x1="48" y1="38" x2="52" y2="38" stroke="#ffffff" strokeWidth="2" />
            <line x1="35" y1="37" x2="31" y2="37" stroke="#ffffff" strokeWidth="1.5" />
            <line x1="65" y1="37" x2="69" y2="37" stroke="#ffffff" strokeWidth="1.5" />
          </g>
        )}

        {eyeItem === 'eyes_vip_shades' && (
          <g>
            {/* VIP Black Sunglasses */}
            <polygon points="34,35 48,35 46,46 36,46" fill="#090d16" stroke="#fbbf24" strokeWidth="0.8" />
            <polygon points="52,35 66,35 64,46 54,46" fill="#090d16" stroke="#fbbf24" strokeWidth="0.8" />
            <line x1="48" y1="37" x2="52" y2="37" stroke="#fbbf24" strokeWidth="1.5" />
            {/* Sun glare streak */}
            <line x1="38" y1="37" x2="43" y2="44" stroke="#ffffff" strokeWidth="0.8" opacity="0.6" />
            <line x1="56" y1="37" x2="61" y2="44" stroke="#ffffff" strokeWidth="0.8" opacity="0.6" />
          </g>
        )}

        {eyeItem === 'eyes_masquerade' && (
          <g>
            {/* Venetian Masquerade Mask */}
            <path d="M 32 39 C 32 30 46 33 50 37 C 54 33 68 30 68 39 C 68 45 56 46 50 42 C 44 46 32 45 32 39 Z" fill="#7e22ce" stroke="#f59e0b" strokeWidth="1.2" />
            <circle cx="43" cy="38" r="3" fill="#0f172a" />
            <circle cx="57" cy="38" r="3" fill="#0f172a" />
          </g>
        )}

        {eyeItem === 'eyes_cyber_visor' && (
          <g>
            {/* Cyberpunk Sci-Fi Visor */}
            <path d="M 33 36 L 67 36 L 65 44 L 35 44 Z" fill="#0d9488" opacity="0.85" stroke="#2dd4bf" strokeWidth="1.5" />
            <line x1="36" y1="40" x2="64" y2="40" stroke="#f0fdfa" strokeWidth="1" strokeDasharray="2,1" />
          </g>
        )}

        {/* 7. Head Item (Hats / Tiaras / Crowns) */}
        {headItem === 'head_director_beret' && (
          <g>
            {/* Director French Beret */}
            <ellipse cx="50" cy="24" rx="22" ry="7" fill="#0f172a" transform="rotate(-8 50 24)" />
            <circle cx="49" cy="18" r="2" fill="#0f172a" />
          </g>
        )}

        {headItem === 'head_star_tiara' && (
          <g>
            {/* Hollywood Star Tiara */}
            <path d="M 36 26 L 40 18 L 45 24 L 50 14 L 55 24 L 60 18 L 64 26 Z" fill="url(#goldGrad)" stroke="#f43f5e" strokeWidth="0.8" />
            <circle cx="50" cy="14" r="2" fill="#f43f5e" />
            <circle cx="40" cy="18" r="1.5" fill="#f43f5e" />
            <circle cx="60" cy="18" r="1.5" fill="#f43f5e" />
          </g>
        )}

        {headItem === 'head_cowboy' && (
          <g>
            {/* Western Cowboy Hat */}
            <ellipse cx="50" cy="27" rx="26" ry="6" fill="#78350f" />
            <path d="M 38 26 C 38 15 42 12 50 14 C 58 12 62 15 62 26 Z" fill="#92400e" />
            <rect x="40" y="24" width="20" height="2.5" fill="#f59e0b" />
          </g>
        )}

        {headItem === 'head_top_hat' && (
          <g>
            {/* Premiere Top Hat */}
            <ellipse cx="50" cy="26" rx="21" ry="5" fill="#020617" />
            <path d="M 39 25 L 41 8 L 59 8 L 61 25 Z" fill="#0f172a" />
            <rect x="40" y="21" width="20" height="3" fill="#f43f5e" />
          </g>
        )}

        {headItem === 'head_royal_crown' && (
          <g>
            {/* Golden Cinema Crown */}
            <path d="M 34 26 L 35 14 L 42 22 L 50 10 L 58 22 L 65 14 L 66 26 Z" fill="url(#goldGrad)" stroke="#b45309" strokeWidth="1" />
            <circle cx="50" cy="10" r="2.5" fill="#ef4444" />
            <circle cx="35" cy="14" r="2" fill="#3b82f6" />
            <circle cx="65" cy="14" r="2" fill="#10b981" />
            <rect x="36" y="24" width="28" height="3" fill="#b45309" rx="1" />
          </g>
        )}

        {/* 8. Hand Item */}
        {hand === 'hand_popcorn' && (
          <g transform="translate(68, 70) scale(0.65)">
            {/* Popcorn Bucket */}
            <polygon points="5,15 25,15 22,40 8,40" fill="#f8fafc" stroke="#ef4444" strokeWidth="2" />
            <line x1="10" y1="15" x2="11" y2="40" stroke="#ef4444" strokeWidth="2" />
            <line x1="15" y1="15" x2="15" y2="40" stroke="#ef4444" strokeWidth="2" />
            <line x1="20" y1="15" x2="19" y2="40" stroke="#ef4444" strokeWidth="2" />
            {/* Popcorn kerns popping */}
            <circle cx="9" cy="12" r="3.5" fill="#fde047" />
            <circle cx="15" cy="10" r="4" fill="#fef08a" />
            <circle cx="21" cy="12" r="3.5" fill="#fde047" />
            <circle cx="12" cy="7" r="3" fill="#fef08a" />
            <circle cx="18" cy="8" r="3" fill="#fde047" />
          </g>
        )}

        {hand === 'hand_clapperboard' && (
          <g transform="translate(68, 70) scale(0.7)">
            {/* Clapperboard */}
            <rect x="5" y="15" width="30" height="24" rx="2" fill="#0f172a" />
            <rect x="5" y="6" width="30" height="8" rx="1" fill="#0f172a" />
            {/* Diagonal stripes */}
            <line x1="8" y1="6" x2="14" y2="14" stroke="#ffffff" strokeWidth="2" />
            <line x1="16" y1="6" x2="22" y2="14" stroke="#ffffff" strokeWidth="2" />
            <line x1="24" y1="6" x2="30" y2="14" stroke="#ffffff" strokeWidth="2" />
            <text x="8" y="27" fill="#f8fafc" fontSize="6" fontFamily="sans-serif" fontWeight="bold">PROD</text>
            <text x="8" y="34" fill="#38bdf8" fontSize="5" fontFamily="sans-serif">SCENE 1</text>
          </g>
        )}

        {hand === 'hand_oscar_trophy' && (
          <g transform="translate(70, 64) scale(0.7)">
            {/* Oscar Statuette */}
            <ellipse cx="15" cy="40" rx="7" ry="2.5" fill="#0f172a" />
            <rect x="12" y="35" width="6" height="5" fill="#78350f" />
            <ellipse cx="15" cy="30" rx="3" ry="5" fill="url(#goldGrad)" />
            <circle cx="15" cy="18" r="3" fill="url(#goldGrad)" />
            <line x1="15" y1="21" x2="15" y2="35" stroke="#f59e0b" strokeWidth="4" />
            {/* Trophy glow star */}
            <circle cx="15" cy="18" r="4.5" fill="#fef08a" opacity="0.4" />
          </g>
        )}

        {hand === 'hand_golden_mic' && (
          <g transform="translate(70, 68) scale(0.7)">
            {/* Golden Mic */}
            <rect x="13" y="16" width="6" height="9" rx="3" fill="url(#goldGrad)" stroke="#b45309" strokeWidth="1" />
            <line x1="16" y1="25" x2="16" y2="38" stroke="#94a3b8" strokeWidth="2.5" />
            <line x1="12" y1="38" x2="20" y2="38" stroke="#64748B" strokeWidth="2" />
          </g>
        )}

        {/* 9. Tomato splat sauce overlay if hit */}
        {(isHitWithTomato || avatar?.expression === 'splatted') && (
          <g className="animate-in fade-in duration-300">
            {/* Tomato blotch on face */}
            <path
              d="M 40 38 Q 44 32 50 34 Q 58 33 60 40 Q 64 48 57 52 Q 52 56 46 53 Q 37 50 40 38 Z"
              fill="#dc2626"
              opacity="0.92"
            />
            {/* Dripping juice */}
            <path d="M 44 51 Q 43 62 45 66 Q 47 62 46 52 Z" fill="#b91c1c" />
            <path d="M 54 52 Q 55 64 53 69 Q 52 64 53 52 Z" fill="#b91c1c" />
            {/* Yellow seeds */}
            <circle cx="47" cy="42" r="1.2" fill="#fef08a" />
            <circle cx="53" cy="45" r="1.4" fill="#fde047" />
            <circle cx="45" cy="48" r="1" fill="#fef08a" />
            {/* Green tomato stem leaf */}
            <path d="M 49 33 Q 48 28 44 30 Q 47 32 49 33 Z" fill="#15803d" />
            <path d="M 51 33 Q 54 28 56 31 Q 53 33 51 33 Z" fill="#15803d" />
          </g>
        )}
      </svg>
    </div>
  );
};
