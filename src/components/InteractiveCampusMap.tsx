import React, { useState } from 'react';
import { ExhibitItem, Language, PersonaId } from '../types/expo';
import { 
  Footprints, 
  Headphones, 
  Bookmark, 
  Check, 
  ArrowRight, 
  RotateCcw, 
  MapPin, 
  Sparkles,
  Info,
  Clock,
  Compass,
  Layers,
  Utensils,
  PlusCircle,
  HelpCircle
} from 'lucide-react';

interface InteractiveCampusMapProps {
  curatedExhibits: ExhibitItem[];
  allExhibits: ExhibitItem[];
  selectedExhibit: ExhibitItem | null;
  onSelectExhibit: (exhibit: ExhibitItem) => void;
  onOpenInterpretation: (exhibit: ExhibitItem) => void;
  savedInsightIds: string[];
  onToggleSaveInsight: (id: string) => void;
  visitedIds?: string[];
  onToggleVisited?: (id: string) => void;
  language: Language;
  personaId: PersonaId;
}

export const InteractiveCampusMap: React.FC<InteractiveCampusMapProps> = ({
  curatedExhibits,
  allExhibits,
  selectedExhibit,
  onSelectExhibit,
  onOpenInterpretation,
  savedInsightIds,
  onToggleSaveInsight,
  visitedIds,
  onToggleVisited,
  language,
  personaId,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [activePinId, setActivePinId] = useState<string>(
    selectedExhibit ? selectedExhibit.id : curatedExhibits[0]?.id || allExhibits[0]?.id
  );

  const activeExhibit = allExhibits.find(e => e.id === activePinId) || curatedExhibits[0] || allExhibits[0];

  // Exact coordinates matching the official 青埔展區 Floor Plan (image.png)
  // Scaled on 1000 x 800 SVG canvas
  const getOfficialCoords = (code: string): { x: number; y: number } => {
    switch (code) {
      case 'A11': return { x: 272, y: 130 };
      case 'A13': return { x: 420, y: 165 };
      case 'A10': return { x: 250, y: 240 };
      case 'A12': return { x: 400, y: 240 };
      case 'A9':  return { x: 270, y: 350 };
      case 'A1':  return { x: 415, y: 355 };
      case 'A8':  return { x: 270, y: 500 };
      case 'A2':  return { x: 422, y: 475 };
      case 'A7':  return { x: 297, y: 610 };
      case 'A3':  return { x: 422, y: 590 };
      case 'A6':  return { x: 250, y: 685 };
      case 'A5':  return { x: 355, y: 685 };
      case 'A4':  return { x: 450, y: 685 };
      case 'A14': return { x: 800, y: 120 };
      default:    return { x: 415, y: 355 };
    }
  };

  // Generate smooth SVG polyline connecting the visitor's curated route in exact sequence
  const pathD = curatedExhibits
    .map((ex, idx) => {
      const pt = getOfficialCoords(ex.code);
      return `${idx === 0 ? 'M' : 'L'} ${pt.x} ${pt.y}`;
    })
    .join(' ');

  const totalWalkMinutes = curatedExhibits.reduce((sum, ex) => sum + ex.bufferWalkMinutes, 0);

  return (
    <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs transition-all space-y-3">
      {/* Official Map Header Ribbon (Matching Qingpu Area Branding) */}
      <div className="bg-[#E4007F] text-white p-4 pb-3 flex items-center justify-between gap-3 flex-wrap">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold tracking-wider text-lg sm:text-xl font-sans">
              青埔展區
            </span>
            <span className="text-white/60 font-light">|</span>
            <span className="font-sans font-light tracking-wide text-base sm:text-lg">
              Qingpu Area
            </span>
          </div>
          <p className="text-[11px] text-white/80 mt-0.5">
            {language === 'en' 
              ? 'Messe Taoyuan · Official 1F & GF Architectural Spatial Plan' 
              : '桃園會展中心 1F / GF 官方展場平面配置圖'}
          </p>
        </div>

        {/* Route Stats Badge */}
        <div className="bg-white/15 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs flex items-center gap-2 border border-white/20">
          <Sparkles className="w-3.5 h-3.5 text-white" />
          <span className="font-medium">
            {curatedExhibits.length} {language === 'en' ? 'Curated Stops' : '個專屬站點'}
          </span>
          <span className="text-white/40">·</span>
          <span className="font-mono text-white/90">~{totalWalkMinutes} min</span>
        </div>
      </div>

      {/* SVG Canvas Map Container */}
      <div className="relative w-full aspect-[1/1] sm:aspect-[10/8] bg-[#F7F7F7] overflow-hidden select-none touch-pan-x touch-pan-y border-b border-stone-100">
        <svg
          viewBox="0 0 1000 800"
          className="w-full h-full transition-transform duration-300"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <defs>
            {/* Soft grid background pattern */}
            <pattern id="qingpuGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ECECEC" strokeWidth="0.8" />
            </pattern>

            {/* Glowing filter for curated route line */}
            <filter id="routeGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#E4007F" floodOpacity="0.45" />
            </filter>
          </defs>

          {/* Background grid */}
          <rect width="1000" height="800" fill="url(#qingpuGrid)" />

          {/* Surrounding Road Name Labels (Matching Official Map) */}
          {/* Top: 環溪一街 */}
          <text x="490" y="38" textAnchor="middle" fill="#4B5563" fontSize="14" fontWeight="bold" letterSpacing="2">
            環溪一街 (Huanxi 1st St.)
          </text>

          {/* Left: 永園路 */}
          <text
            x="36"
            y="410"
            textAnchor="middle"
            fill="#4B5563"
            fontSize="14"
            fontWeight="bold"
            letterSpacing="3"
            transform="rotate(-90, 36, 410)"
          >
            永園路 (Yongyuan Rd.)
          </text>

          {/* Right: 領航北路一段 */}
          <text
            x="964"
            y="410"
            textAnchor="middle"
            fill="#4B5563"
            fontSize="14"
            fontWeight="bold"
            letterSpacing="3"
            transform="rotate(90, 964, 410)"
          >
            領航北路一段 (Linghang N. Rd.)
          </text>

          {/* Bottom: 文康路 */}
          <text x="490" y="780" textAnchor="middle" fill="#4B5563" fontSize="14" fontWeight="bold" letterSpacing="2">
            文康路 (Wenkang Rd.)
          </text>

          {/* ======================================================== */}
          {/* BUILDING 1: 展覽館 1F (Left Structure) */}
          {/* ======================================================== */}
          {/* 1F Building Shell */}
          <rect
            x="180"
            y="65"
            width="335"
            height="675"
            rx="8"
            fill="#FFFFFF"
            stroke="#D1D5DB"
            strokeWidth="3"
          />

          {/* 1F Header Badge */}
          <rect x="180" y="65" width="100" height="24" rx="4" fill="#0F172A" />
          <text x="230" y="81" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">
            展覽館 1F
          </text>

          {/* D4 設計食堂 Badge on Top of 1F */}
          <g transform="translate(290, 68)">
            <rect x="0" y="0" width="36" height="20" rx="10" fill="#00B4D8" />
            <text x="18" y="14" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">D4</text>
            <circle cx="48" cy="10" r="9" fill="#0F172A" />
            <path d="M 46 6 L 46 14 M 48 6 L 48 14 M 50 6 L 50 14" stroke="#FFFFFF" strokeWidth="1.2" />
          </g>

          {/* Pavilion Room Rectangles inside 1F */}
          {/* Room A11 (Top Left) */}
          <rect x="195" y="98" width="150" height="92" rx="4" fill="#E5E7EB" stroke="#D1D5DB" strokeWidth="1.5" />

          {/* Room D6 & Room A13 (Top Right) */}
          <rect x="355" y="98" width="95" height="42" rx="4" fill="#E5E7EB" stroke="#D1D5DB" strokeWidth="1.5" />
          <text x="402" y="124" textAnchor="middle" fill="#0096C7" fontSize="12" fontWeight="bold">D6</text>
          
          <rect x="355" y="145" width="115" height="52" rx="4" fill="#E5E7EB" stroke="#D1D5DB" strokeWidth="1.5" />

          {/* Room A10 & Room A12 (Upper Mid Row) */}
          <rect x="195" y="205" width="105" height="68" rx="4" fill="#E5E7EB" stroke="#D1D5DB" strokeWidth="1.5" />
          <rect x="315" y="205" width="155" height="68" rx="4" fill="#E5E7EB" stroke="#D1D5DB" strokeWidth="1.5" />

          {/* Room A9 & Room A1 (Center Row) */}
          <rect x="195" y="285" width="145" height="125" rx="4" fill="#E5E7EB" stroke="#D1D5DB" strokeWidth="1.5" />
          <rect x="360" y="285" width="95" height="135" rx="4" fill="#E5E7EB" stroke="#D1D5DB" strokeWidth="1.5" />

          {/* Room A8 & Room A2 (Lower Mid Row) */}
          <rect x="195" y="420" width="145" height="135" rx="4" fill="#E5E7EB" stroke="#D1D5DB" strokeWidth="1.5" />
          <rect x="360" y="430" width="110" height="85" rx="4" fill="#E5E7EB" stroke="#D1D5DB" strokeWidth="1.5" />

          {/* Room A7 & Room A3 (Lower Row) */}
          <rect x="195" y="565" width="48" height="50" rx="4" fill="#E5E7EB" stroke="#D1D5DB" strokeWidth="1.5" />
          <rect x="248" y="565" width="92" height="50" rx="4" fill="#E5E7EB" stroke="#D1D5DB" strokeWidth="1.5" />
          <rect x="360" y="525" width="110" height="90" rx="4" fill="#E5E7EB" stroke="#D1D5DB" strokeWidth="1.5" />

          {/* Rooms along 文康路 (Bottom Row): A6, A5, A4 */}
          <rect x="195" y="625" width="105" height="65" rx="4" fill="#E5E7EB" stroke="#D1D5DB" strokeWidth="1.5" />
          <rect x="305" y="625" width="75" height="65" rx="4" fill="#E5E7EB" stroke="#D1D5DB" strokeWidth="1.5" />
          <rect x="385" y="625" width="90" height="65" rx="4" fill="#E5E7EB" stroke="#D1D5DB" strokeWidth="1.5" />

          {/* Facilities along West Edge (永園路 Side) */}
          {/* Restroom 1 */}
          <g transform="translate(145, 230)">
            <rect x="0" y="0" width="35" height="42" rx="6" fill="#E5E7EB" stroke="#9CA3AF" />
            <circle cx="17.5" cy="15" r="4" fill="#1F2937" />
            <path d="M 17.5 19 L 17.5 32 M 13 24 L 22 24" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
            <text x="17.5" y="38" textAnchor="middle" fill="#4B5563" fontSize="8" fontWeight="bold">WC</text>
          </g>

          {/* Restroom 2 */}
          <g transform="translate(145, 490)">
            <rect x="0" y="0" width="35" height="42" rx="6" fill="#E5E7EB" stroke="#9CA3AF" />
            <circle cx="17.5" cy="15" r="4" fill="#1F2937" />
            <path d="M 17.5 19 L 17.5 32 M 13 24 L 22 24" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
            <text x="17.5" y="38" textAnchor="middle" fill="#4B5563" fontSize="8" fontWeight="bold">WC</text>
          </g>

          {/* ======================================================== */}
          {/* CENTRAL STAIRCASE / CORRIDOR TO 1F */}
          {/* ======================================================== */}
          {/* Staircase to 1F indicator */}
          <g transform="translate(500, 85)">
            <rect x="0" y="0" width="105" height="95" rx="4" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
            <path d="M 80 15 L 80 85 M 88 15 L 88 85 M 96 15 L 96 85" stroke="#CBD5E1" strokeWidth="2" />
            <text x="36" y="45" fill="#1E293B" fontSize="12" fontWeight="bold">往</text>
            <text x="36" y="65" fill="#1E293B" fontSize="12" fontWeight="bold">展覽館 1F</text>
          </g>

          {/* Corridor Icons in Center (+ 醫護站, i 服務站, 🛗 電梯) */}
          {/* Medical Station (+) */}
          <g transform="translate(515, 380)">
            <circle cx="12" cy="12" r="13" fill="#1E293B" />
            <path d="M 12 6 L 12 18 M 6 12 L 18 12" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />
          </g>

          {/* Info Station (i) */}
          <g transform="translate(515, 465)">
            <circle cx="12" cy="12" r="13" fill="#1E293B" />
            <text x="12" y="17" textAnchor="middle" fill="#FFFFFF" fontSize="14" fontWeight="bold" fontFamily="serif">i</text>
          </g>

          {/* Elevator (🛗) */}
          <g transform="translate(515, 545)">
            <rect x="0" y="0" width="24" height="24" rx="4" fill="#1E293B" />
            <path d="M 6 8 L 12 3 L 18 8 M 6 16 L 12 21 L 18 16" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </g>

          {/* ======================================================== */}
          {/* BUILDING 2: 展覽館 GF (Right Structure) */}
          {/* ======================================================== */}
          <rect
            x="530"
            y="265"
            width="295"
            height="375"
            rx="8"
            fill="#FFFFFF"
            stroke="#D1D5DB"
            strokeWidth="3"
          />

          {/* Rooms inside GF */}
          <rect x="560" y="280" width="40" height="45" rx="4" fill="#E5E7EB" stroke="#D1D5DB" />
          <rect x="605" y="280" width="65" height="45" rx="4" fill="#E5E7EB" stroke="#D1D5DB" />
          <rect x="675" y="280" width="45" height="45" rx="4" fill="#E5E7EB" stroke="#D1D5DB" />
          <rect x="725" y="280" width="80" height="45" rx="4" fill="#E5E7EB" stroke="#D1D5DB" />
          
          <rect x="625" y="335" width="180" height="85" rx="4" fill="#E5E7EB" stroke="#D1D5DB" />
          <rect x="560" y="335" width="45" height="85" rx="4" fill="#E5E7EB" stroke="#D1D5DB" />
          {/* GF Restroom */}
          <circle cx="582" cy="370" r="4" fill="#1F2937" />
          <path d="M 582 374 L 582 387 M 578 379 L 586 379" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />

          {/* D1 & D3 Cultural Commercial Zone */}
          <rect x="635" y="445" width="140" height="85" rx="4" fill="#E5E7EB" stroke="#D1D5DB" />
          <g transform="translate(660, 470)">
            <rect x="0" y="0" width="34" height="20" rx="10" fill="#00B4D8" />
            <text x="17" y="14" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">D1</text>
          </g>
          <g transform="translate(710, 470)">
            <rect x="0" y="0" width="34" height="20" rx="10" fill="#00B4D8" />
            <text x="17" y="14" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">D3</text>
          </g>

          {/* Info Station in GF */}
          <g transform="translate(635, 555)">
            <circle cx="12" cy="12" r="13" fill="#1E293B" />
            <text x="12" y="17" textAnchor="middle" fill="#FFFFFF" fontSize="14" fontWeight="bold" fontFamily="serif">i</text>
          </g>

          {/* Stairs in GF */}
          <g transform="translate(635, 595)">
            <rect x="0" y="0" width="80" height="20" fill="none" stroke="#CBD5E1" strokeWidth="1.5" />
            <path d="M 10 0 L 10 20 M 20 0 L 20 20 M 30 0 L 30 20 M 40 0 L 40 20 M 50 0 L 50 20 M 60 0 L 60 20 M 70 0 L 70 20" stroke="#CBD5E1" strokeWidth="1.5" />
          </g>

          {/* Main GF Entrance Arrow & Label */}
          <g transform="translate(605, 640)">
            <rect x="0" y="0" width="130" height="32" rx="4" fill="#E4007F" />
            <path d="M 65 8 L 55 20 L 75 20 Z" fill="#FFFFFF" />
          </g>
          <rect x="750" y="618" width="105" height="24" rx="4" fill="#0F172A" />
          <text x="802" y="634" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">
            展覽館 GF
          </text>

          {/* Arrow pointing to A14 outside (Top-Right) */}
          <g>
            <path
              d="M 400 65 L 400 48 L 670 48 L 670 120 L 740 120"
              fill="none"
              stroke="#E4007F"
              strokeWidth="2.5"
              strokeDasharray="6 4"
            />
            {/* Arrowhead */}
            <path d="M 735 115 L 745 120 L 735 125 Z" fill="#E4007F" />
            <text x="755" y="125" fill="#E4007F" fontSize="14" fontWeight="bold">往</text>
          </g>

          {/* ======================================================== */}
          {/* CURATED ROUTE SEQUENCE POLYLINE */}
          {/* ======================================================== */}
          {curatedExhibits.length > 1 && (
            <g className="pointer-events-none">
              {/* Outer white path backdrop */}
              <path
                d={pathD}
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="12"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Main glowing curated route line in brand magenta */}
              <path
                d={pathD}
                fill="none"
                stroke="#E4007F"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="8 6"
                filter="url(#routeGlow)"
              />
            </g>
          )}

          {/* ======================================================== */}
          {/* ALL 14 EXHIBIT PINS (Matching Droplet Pin Icon in Map) */}
          {/* ======================================================== */}
          {allExhibits.map((exhibit) => {
            const pt = getOfficialCoords(exhibit.code);
            const curatedIdx = curatedExhibits.findIndex(e => e.id === exhibit.id);
            const isCurated = curatedIdx !== -1;
            const isSelected = activePinId === exhibit.id;
            const isSaved = savedInsightIds.includes(exhibit.id);
            const isVisited = visitedIds?.includes(exhibit.id) || isSaved;

            return (
              <g
                key={exhibit.id}
                transform={`translate(${pt.x}, ${pt.y})`}
                className="cursor-pointer transition-all duration-200 group"
                onClick={() => {
                  setActivePinId(exhibit.id);
                  onSelectExhibit(exhibit);
                }}
              >
                {/* Active Selection Pulse Ring */}
                {isSelected && (
                  <circle
                    r="34"
                    fill="#E4007F"
                    opacity="0.25"
                    className="animate-ping"
                  />
                )}

                {/* Droplet pin shape (the official icon style) */}
                <path
                  d="M 0 -22 C 12 -22 22 -12 22 0 C 22 13 0 28 0 28 C 0 28 -22 13 -22 0 C -22 -12 -12 -22 0 -22 Z"
                  fill={
                    isVisited
                      ? '#2E6F56'
                      : isSelected
                      ? '#E4007F'
                      : isCurated
                      ? '#E4007F'
                      : '#9CA3AF'
                  }
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                  filter="drop-shadow(0px 3px 5px rgba(0,0,0,0.25))"
                />

                {/* Pin Center: Official Code A1, A2, etc. */}
                {isVisited ? (
                  <path
                    d="M -5 -2 L -1 2 L 6 -5"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ) : (
                  <text
                    x="0"
                    y="3"
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontSize={exhibit.code.length > 2 ? "10" : "11"}
                    fontWeight="bold"
                    fontFamily="sans-serif"
                  >
                    {exhibit.code}
                  </text>
                )}

                {/* Sequence Badge if along the curated path */}
                {isCurated && (
                  <g transform="translate(14, -18)">
                    <circle r="9" fill="#1C1917" stroke="#FFFFFF" strokeWidth="1.5" />
                    <text
                      x="0"
                      y="3.5"
                      textAnchor="middle"
                      fill="#FFFFFF"
                      fontSize="9"
                      fontWeight="bold"
                      fontFamily="monospace"
                    >
                      {curatedIdx + 1}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>

        {/* Map Float Controls */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10 bg-white/95 backdrop-blur-md rounded-xl p-1 border border-stone-200 shadow-sm">
          <button
            onClick={() => setZoomLevel(prev => Math.min(prev + 0.2, 1.8))}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-700 hover:bg-stone-100 font-bold text-sm cursor-pointer"
            title="Zoom in"
          >
            +
          </button>
          <button
            onClick={() => setZoomLevel(prev => Math.max(prev - 0.2, 0.9))}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-700 hover:bg-stone-100 font-bold text-sm cursor-pointer"
            title="Zoom out"
          >
            -
          </button>
          <button
            onClick={() => setZoomLevel(1)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-700 hover:bg-stone-100 cursor-pointer"
            title="Reset map view"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Official Facilities Legend Bar at bottom (Matching image.png legend) */}
        <div className="absolute bottom-2 left-2 right-2 bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl border border-stone-200 text-[10px] text-stone-600 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="flex items-center gap-1">
              <span className="w-3.5 h-3.5 rounded-full bg-[#00B4D8] text-white flex items-center justify-center text-[9px] font-bold">🍴</span>
              <span>設計食堂 (D4)</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3.5 h-3.5 rounded-full bg-[#1E293B] text-white flex items-center justify-center text-[9px] font-bold">i</span>
              <span>服務站</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3.5 h-3.5 rounded-full bg-[#1E293B] text-white flex items-center justify-center text-[9px] font-bold">+</span>
              <span>醫護站</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3.5 h-3.5 rounded-full bg-[#1E293B] text-white flex items-center justify-center text-[9px] font-bold">WC</span>
              <span>廁所</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3.5 h-3.5 rounded-full bg-[#1E293B] text-white flex items-center justify-center text-[9px] font-bold">🛗</span>
              <span>電梯</span>
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-stone-500 text-[10px]">
            <span>1F / GF 平面</span>
            <span>·</span>
            <span>往 A14 科技分館 3F</span>
          </div>
        </div>
      </div>

      {/* Interactive Bottom Detail Card for currently selected pin */}
      {activeExhibit && (
        <div className="p-4 pt-1 space-y-3 animate-in fade-in duration-150">
          <div 
            onClick={() => onOpenInterpretation(activeExhibit)}
            className="bg-[#FAF8F5] rounded-2xl p-4 border border-stone-200 hover:border-[#E4007F]/50 transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center gap-4 group"
          >
            {/* Visual Thumbnail */}
            <div className="w-full sm:w-28 h-24 rounded-xl overflow-hidden bg-stone-200 shrink-0 relative">
              <img
                src={activeExhibit.image}
                alt={activeExhibit.title[language]}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-2 left-2 bg-[#E4007F] text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                {activeExhibit.code} · {activeExhibit.subFlowTheme[language]}
              </span>
            </div>

            {/* Content summary */}
            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex items-center gap-2 text-xs text-stone-500">
                <span className="font-semibold text-stone-900">{activeExhibit.venueFloor[language]}</span>
                <span>·</span>
                <span className="font-mono text-[#E4007F] font-medium">{activeExhibit.dates}</span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Footprints className="w-3 h-3" />
                  {activeExhibit.bufferWalkMinutes} {language === 'en' ? 'min walk' : '分鐘步程'}
                </span>
              </div>

              <h3 className="font-serif text-base font-bold text-stone-900 group-hover:text-[#E4007F] transition-colors truncate">
                {activeExhibit.code} {activeExhibit.title[language]}
              </h3>

              <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                "{activeExhibit.oneSentenceTakeaway[language]}"
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-200">
              <div className="flex items-center gap-1.5">
                {onToggleVisited && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleVisited(activeExhibit.id);
                    }}
                    className={`min-h-[40px] px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1 cursor-pointer ${
                      visitedIds?.includes(activeExhibit.id)
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
                    }`}
                    title={visitedIds?.includes(activeExhibit.id) ? (language === 'en' ? 'Visited' : '已造訪') : (language === 'en' ? 'Mark visited' : '標記造訪')}
                  >
                    <Check className={`w-3.5 h-3.5 ${visitedIds?.includes(activeExhibit.id) ? 'stroke-[2.5]' : 'text-stone-400'}`} />
                    <span>
                      {visitedIds?.includes(activeExhibit.id)
                        ? (language === 'en' ? 'Visited' : '已訪')
                        : (language === 'en' ? 'Check' : '打卡')}
                    </span>
                  </button>
                )}

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleSaveInsight(activeExhibit.id);
                  }}
                  className={`min-h-[40px] px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                    savedInsightIds.includes(activeExhibit.id)
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
                  }`}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${savedInsightIds.includes(activeExhibit.id) ? 'fill-emerald-800' : ''}`} />
                  <span>
                    {savedInsightIds.includes(activeExhibit.id) 
                      ? (language === 'en' ? 'Saved' : '已收錄') 
                      : (language === 'en' ? 'Save' : '收錄')}
                  </span>
                </button>
              </div>

              <button
                onClick={() => onOpenInterpretation(activeExhibit)}
                className="min-h-[40px] px-3.5 py-1.5 bg-[#E4007F] hover:bg-[#c2006c] text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 cursor-pointer active:scale-95"
              >
                <span>{language === 'en' ? 'Explore Stop' : '進入解讀'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
