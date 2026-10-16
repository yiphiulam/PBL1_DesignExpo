import React from 'react';

interface IkeaMomoCharacterProps {
  mood?: 'inspired' | 'tectonic' | 'playful' | 'rooted' | 'global';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showManualBubble?: boolean;
  bubbleText?: string;
  onClick?: () => void;
  className?: string;
}

export const IkeaMomoCharacter: React.FC<IkeaMomoCharacterProps> = ({
  mood = 'inspired',
  size = 'md',
  showManualBubble = false,
  bubbleText,
  onClick,
  className = '',
}) => {
  const sizeMap = {
    sm: 'w-16 h-16',
    md: 'w-28 h-28',
    lg: 'w-40 h-40',
    xl: 'w-56 h-56',
  };

  return (
    <div
      onClick={onClick}
      className={`relative inline-flex flex-col items-center select-none ${onClick ? 'cursor-pointer group' : ''} ${className}`}
    >
      {/* Optional IKEA Instruction Manual Speech Callout */}
      {showManualBubble && bubbleText && (
        <div className="mb-2 relative bg-white border-2 border-stone-800 rounded-2xl px-3 py-1.5 shadow-[3px_3px_0px_#1C1917] text-stone-900 text-xs font-mono font-medium max-w-xs text-center animate-bounce-short">
          <span>{bubbleText}</span>
          {/* Arrow */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-x-6 border-x-transparent border-t-8 border-t-stone-800" />
          <div className="absolute -bottom-[6px] left-1/2 -translate-x-1/2 w-0 h-0 border-x-[5px] border-x-transparent border-t-[6px] border-t-white" />
        </div>
      )}

      {/* Vector Line-Art IKEA Style Momo */}
      <div className={`relative ${sizeMap[size]} transition-transform duration-200 group-hover:scale-105 group-active:scale-95`}>
        <svg
          viewBox="0 0 240 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
        >
          {/* IKEA Manual Style Grid or Dashed Guide in Background (subtle) */}
          <circle cx="120" cy="120" r="105" fill="#FFF5F8" stroke="#FCE7F3" strokeWidth="2" strokeDasharray="4 4" />

          {/* Leaves at the top */}
          <g>
            {/* Stem */}
            <path
              d="M120 48 C120 32, 126 25, 132 20"
              stroke="#1C1917"
              strokeWidth="5"
              strokeLinecap="round"
            />
            {/* Green Leaf */}
            <path
              d="M124 38 C135 22, 160 22, 156 42 C152 54, 132 50, 124 38 Z"
              fill="#65A30D"
              stroke="#1C1917"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            {/* Small secondary leaf */}
            <path
              d="M116 42 C106 30, 92 34, 96 46 C100 52, 112 50, 116 42 Z"
              fill="#84CC16"
              stroke="#1C1917"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
          </g>

          {/* Legs (Simple IKEA stickman tubular legs) */}
          <path
            d="M98 175 L98 215 C98 222, 80 222, 80 222"
            stroke="#1C1917"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M142 175 L142 215 C142 222, 160 222, 160 222"
            stroke="#1C1917"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Peach Body (桃) with Classic Cleft */}
          {/* Symmetrical rounded heart-like peach contour */}
          <path
            d="M120 62 
               C145 42, 202 60, 202 118 
               C202 165, 148 188, 120 188 
               C92 188, 38 165, 38 118 
               C38 60, 95 42, 120 62 Z"
            fill="#FFA69E"
            stroke="#1C1917"
            strokeWidth="5.5"
            strokeLinejoin="round"
          />

          {/* Peach Top Cleft Line */}
          <path
            d="M120 62 C125 78, 130 92, 128 102"
            stroke="#1C1917"
            strokeWidth="4.5"
            strokeLinecap="round"
          />

          {/* Rosy Cheeks */}
          <ellipse cx="78" cy="132" rx="9" ry="6" fill="#FF6584" opacity="0.65" />
          <ellipse cx="162" cy="132" rx="9" ry="6" fill="#FF6584" opacity="0.65" />

          {/* Minimalist IKEA Face (Two dots & simple warm line curve) */}
          {mood === 'playful' ? (
            /* Winking playful eyes */
            <g>
              <circle cx="95" cy="120" r="4.5" fill="#1C1917" />
              <path d="M140 120 Q147 114 154 120" stroke="#1C1917" strokeWidth="4.5" strokeLinecap="round" />
            </g>
          ) : (
            /* Classic friendly IKEA eyes */
            <g>
              <circle cx="95" cy="120" r="4.5" fill="#1C1917" />
              <circle cx="145" cy="120" r="4.5" fill="#1C1917" />
            </g>
          )}

          {/* Mouth */}
          <path
            d={
              mood === 'playful'
                ? "M110 134 Q120 148 130 134"
                : mood === 'tectonic'
                ? "M112 135 Q120 144 128 135"
                : "M110 132 Q120 143 130 132"
            }
            stroke="#1C1917"
            strokeWidth="4.5"
            strokeLinecap="round"
          />

          {/* Left Arm: Holding Tool based on mood */}
          {mood === 'tectonic' ? (
            /* Holding Iconic IKEA Allen Hex Wrench (六角板手) */
            <g>
              {/* Arm extending left */}
              <path
                d="M56 138 C42 145, 36 156, 44 165 C48 168, 54 164, 56 158"
                stroke="#1C1917"
                strokeWidth="4.5"
                strokeLinecap="round"
                fill="none"
              />
              {/* Classic IKEA Hex Allen Key */}
              <path
                d="M32 125 L48 125 L48 185"
                stroke="#1C1917"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M32 125 L48 125 L48 185"
                stroke="#E5E7EB"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          ) : mood === 'playful' ? (
            /* Waving arm */
            <g>
              <path
                d="M54 135 C38 120, 32 98, 44 92 C48 90, 56 102, 58 116"
                stroke="#1C1917"
                strokeWidth="4.5"
                strokeLinecap="round"
                fill="none"
              />
              {/* Little pink sparkle */}
              <path
                d="M32 80 L36 86 L42 86 L37 90 L39 96 L34 92 L29 96 L31 90 L26 86 L32 86 Z"
                fill="#E4007F"
              />
            </g>
          ) : (
            /* Holding IKEA Pencil or Guidebook */
            <g>
              <path
                d="M54 138 C42 144, 40 156, 48 160 C54 162, 58 152, 58 145"
                stroke="#1C1917"
                strokeWidth="4.5"
                strokeLinecap="round"
                fill="none"
              />
              {/* Short stubby IKEA wooden pencil */}
              <path
                d="M36 172 L50 144"
                stroke="#1C1917"
                strokeWidth="6"
                strokeLinecap="round"
              />
              <path
                d="M36 172 L50 144"
                stroke="#FBBF24"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </g>
          )}

          {/* Right Arm: Holding Expo Map or Blueprint */}
          <g>
            <path
              d="M184 138 C198 145, 202 156, 194 162 C188 166, 182 154, 180 146"
              stroke="#1C1917"
              strokeWidth="4.5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Folded Exhibition Map / Manual Sheet */}
            <g transform="translate(186, 136) rotate(12)">
              <rect
                x="0"
                y="0"
                width="34"
                height="44"
                rx="3"
                fill="#FFFFFF"
                stroke="#1C1917"
                strokeWidth="3.5"
              />
              {/* Map lines */}
              <line x1="6" y1="10" x2="28" y2="10" stroke="#E4007F" strokeWidth="2.5" />
              <line x1="6" y1="18" x2="24" y2="18" stroke="#1C1917" strokeWidth="2" strokeDasharray="2 2" />
              <line x1="6" y1="26" x2="28" y2="26" stroke="#1C1917" strokeWidth="2" />
              <line x1="6" y1="34" x2="18" y2="34" stroke="#1C1917" strokeWidth="2" />
              {/* Tiny north arrow */}
              <path d="M26 32 L26 38 M24 34 L26 32 L28 34" stroke="#1C1917" strokeWidth="1.5" strokeLinecap="round" />
            </g>
          </g>
        </svg>

        {/* Small IKEA-style instruction label at corner */}
        <div className="absolute -bottom-1 -right-2 bg-white border border-stone-800 rounded px-1.5 py-0.5 shadow-[1.5px_1.5px_0px_#1C1917] text-[9px] font-mono font-bold text-stone-900 tracking-tight">
          MÖMÖ
        </div>
      </div>
    </div>
  );
};

export function getIkeaMomoSvgString(mood: string = 'inspired'): string {
  const isPlayful = mood === 'playful';
  const isTectonic = mood === 'tectonic';

  const toolPart = isTectonic
    ? `<g>
        <path d="M56 138 C42 145, 36 156, 44 165 C48 168, 54 164, 56 158" stroke="#1C1917" stroke-width="4.5" stroke-linecap="round" fill="none"/>
        <path d="M32 125 L48 125 L48 185" stroke="#1C1917" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M32 125 L48 125 L48 185" stroke="#E5E7EB" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
      </g>`
    : isPlayful
    ? `<g>
        <path d="M54 135 C38 120, 32 98, 44 92 C48 90, 56 102, 58 116" stroke="#1C1917" stroke-width="4.5" stroke-linecap="round" fill="none"/>
        <path d="M32 80 L36 86 L42 86 L37 90 L39 96 L34 92 L29 96 L31 90 L26 86 L32 86 Z" fill="#E4007F"/>
      </g>`
    : `<g>
        <path d="M54 138 C42 144, 40 156, 48 160 C54 162, 58 152, 58 145" stroke="#1C1917" stroke-width="4.5" stroke-linecap="round" fill="none"/>
        <path d="M36 172 L50 144" stroke="#1C1917" stroke-width="6" stroke-linecap="round"/>
        <path d="M36 172 L50 144" stroke="#FBBF24" stroke-width="3" stroke-linecap="round"/>
      </g>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="340" height="340" fill="none">
    <circle cx="120" cy="120" r="105" fill="#FFF5F8" stroke="#FCE7F3" stroke-width="2" stroke-dasharray="4 4" />
    <g>
      <path d="M120 48 C120 32, 126 25, 132 20" stroke="#1C1917" stroke-width="5" stroke-linecap="round"/>
      <path d="M124 38 C135 22, 160 22, 156 42 C152 54, 132 50, 124 38 Z" fill="#65A30D" stroke="#1C1917" stroke-width="4" stroke-linejoin="round"/>
      <path d="M116 42 C106 30, 92 34, 96 46 C100 52, 112 50, 116 42 Z" fill="#84CC16" stroke="#1C1917" stroke-width="3.5" stroke-linejoin="round"/>
    </g>
    <path d="M98 175 L98 215 C98 222, 80 222, 80 222" stroke="#1C1917" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M142 175 L142 215 C142 222, 160 222, 160 222" stroke="#1C1917" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M120 62 C145 42, 202 60, 202 118 C202 165, 148 188, 120 188 C92 188, 38 165, 38 118 C38 60, 95 42, 120 62 Z" fill="#FFA69E" stroke="#1C1917" stroke-width="5.5" stroke-linejoin="round"/>
    <path d="M120 62 C125 78, 130 92, 128 102" stroke="#1C1917" stroke-width="4.5" stroke-linecap="round"/>
    <ellipse cx="78" cy="132" rx="9" ry="6" fill="#FF6584" opacity="0.65" />
    <ellipse cx="162" cy="132" rx="9" ry="6" fill="#FF6584" opacity="0.65" />
    ${isPlayful
      ? `<g><circle cx="95" cy="120" r="4.5" fill="#1C1917"/><path d="M140 120 Q147 114 154 120" stroke="#1C1917" stroke-width="4.5" stroke-linecap="round"/></g>`
      : `<g><circle cx="95" cy="120" r="4.5" fill="#1C1917"/><circle cx="145" cy="120" r="4.5" fill="#1C1917"/></g>`
    }
    <path d="${isPlayful ? 'M110 134 Q120 148 130 134' : isTectonic ? 'M112 135 Q120 144 128 135' : 'M110 132 Q120 143 130 132'}" stroke="#1C1917" stroke-width="4.5" stroke-linecap="round"/>
    ${toolPart}
    <g>
      <path d="M184 138 C198 145, 202 156, 194 162 C188 166, 182 154, 180 146" stroke="#1C1917" stroke-width="4.5" stroke-linecap="round" fill="none"/>
      <g transform="translate(186, 136) rotate(12)">
        <rect x="0" y="0" width="34" height="44" rx="3" fill="#FFFFFF" stroke="#1C1917" stroke-width="3.5"/>
        <line x1="6" y1="10" x2="28" y2="10" stroke="#E4007F" stroke-width="2.5"/>
        <line x1="6" y1="18" x2="24" y2="18" stroke="#1C1917" stroke-width="2" stroke-dasharray="2 2"/>
        <line x1="6" y1="26" x2="28" y2="26" stroke="#1C1917" stroke-width="2"/>
        <line x1="6" y1="34" x2="18" y2="34" stroke="#1C1917" stroke-width="2"/>
      </g>
    </g>
  </svg>`;
}

export function getIkeaMomoDataUrl(mood: string = 'inspired'): string {
  const svg = getIkeaMomoSvgString(mood);
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
