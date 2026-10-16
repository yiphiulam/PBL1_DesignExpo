import React, { useState } from 'react';
import { CuratedJourney, ExhibitItem, ExhibitMode, Language, PersonaId } from '../types/expo';
import { PERSONAS, ALL_AREA1_EXHIBITS } from '../data/exhibitionData';
import { InteractiveCampusMap } from './InteractiveCampusMap';
import { 
  Footprints, 
  Headphones, 
  Bookmark, 
  Check, 
  ArrowRight, 
  Compass, 
  Sparkles, 
  Clock, 
  RotateCcw, 
  CheckCircle2, 
  GitBranch,
  MapPin,
  ExternalLink,
  Layers,
  Map as MapIcon
} from 'lucide-react';

interface MainDashboardProps {
  journey: CuratedJourney;
  language: Language;
  exhibitMode: ExhibitMode;
  onToggleExhibitMode: (mode: ExhibitMode) => void;
  savedInsightIds: string[];
  onToggleSaveInsight: (exhibitId: string) => void;
  visitedIds?: string[];
  onToggleVisited?: (exhibitId: string) => void;
  onSelectExhibit: (exhibit: ExhibitItem) => void;
  onNavigateToPostVisit: () => void;
  onReCurate: () => void;
  activeAudioExhibitId: string | null;
  isPlayingAudio: boolean;
  onToggleAudio: (exhibitId: string) => void;
}

export const MainDashboard: React.FC<MainDashboardProps> = ({
  journey,
  language,
  exhibitMode,
  onToggleExhibitMode,
  savedInsightIds,
  onToggleSaveInsight,
  visitedIds,
  onToggleVisited,
  onSelectExhibit,
  onNavigateToPostVisit,
  onReCurate,
  activeAudioExhibitId,
  isPlayingAudio,
  onToggleAudio,
}) => {
  const [internalVisitedIds, setInternalVisitedIds] = useState<string[]>(['exhibit_a1']);
  const [viewScope, setViewScope] = useState<'curated' | 'all'>('curated');
  const [displayMode, setDisplayMode] = useState<'stream' | 'map'>('stream');
  const [mapFocusedExhibit, setMapFocusedExhibit] = useState<ExhibitItem | null>(journey.exhibits[0] || null);

  const effectiveVisitedIds = visitedIds ?? internalVisitedIds;

  const persona = PERSONAS.find(p => p.id === journey.personaId) || PERSONAS[0];
  const currentExhibits = viewScope === 'curated' ? journey.exhibits : ALL_AREA1_EXHIBITS;

  const toggleVisited = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (onToggleVisited) {
      onToggleVisited(id);
    } else {
      setInternalVisitedIds(prev => 
        prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
      );
    }
  };

  const handleSaveClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleSaveInsight(id);
    if (!effectiveVisitedIds.includes(id)) {
      toggleVisited(id);
    }
  };

  const handleAudioClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleAudio(id);
  };

  const handleOpenOnMap = (exhibit: ExhibitItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setMapFocusedExhibit(exhibit);
    setDisplayMode('map');
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  // Route Progress Metrics
  const visitedCuratedExhibits = journey.exhibits.filter(ex => effectiveVisitedIds.includes(ex.id));
  const visitedCuratedCount = visitedCuratedExhibits.length;
  const totalCuratedCount = journey.exhibits.length;
  const progressPercent = totalCuratedCount > 0 ? Math.round((visitedCuratedCount / totalCuratedCount) * 100) : 0;
  
  const unvisitedCuratedExhibits = journey.exhibits.filter(ex => !effectiveVisitedIds.includes(ex.id));
  const nextUpExhibit = unvisitedCuratedExhibits[0] || null;
  const remainingWalkMinutes = unvisitedCuratedExhibits.reduce((sum, ex) => sum + ex.bufferWalkMinutes, 0);
  const savedInCuratedCount = journey.exhibits.filter(ex => savedInsightIds.includes(ex.id)).length;
  const isCompleted = visitedCuratedCount === totalCuratedCount && totalCuratedCount > 0;

  const handleStopNodeClick = (exhibit: ExhibitItem) => {
    setMapFocusedExhibit(exhibit);
    if (displayMode === 'map') {
      window.scrollTo({ top: 120, behavior: 'smooth' });
    } else {
      const cardEl = document.getElementById(`exhibit-card-${exhibit.id}`);
      if (cardEl) {
        cardEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        onSelectExhibit(exhibit);
      }
    }
  };

  return (
    <div className="min-h-screen pb-28 pt-4 px-4 max-w-2xl mx-auto w-full">
      {/* Official Area 1 Header Ribbon */}
      <div className="mb-3 flex items-center justify-between text-xs text-stone-500 bg-stone-100/80 px-3 py-2 rounded-xl border border-stone-200/60">
        <div className="flex items-center gap-1.5 font-medium text-stone-700">
          <MapPin className="w-3.5 h-3.5 text-[#D9532F]" />
          <span>{journey.areaName[language]}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-stone-500 font-mono">
            {language === 'en' ? 'Messe Taoyuan' : '桃園會展中心'}
          </span>
          <span className="text-pink-300">·</span>
          <a
            href="https://designexpo.org.tw/designexpo/zh-TW/area/1"
            target="_blank"
            rel="noreferrer"
            className="text-[11px] text-[#E4007F] hover:underline flex items-center gap-0.5 font-medium"
            title="Official Area 1 Website"
          >
            <span>{language === 'en' ? 'Official Site' : '官網專頁'}</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </div>
      </div>

      {/* Top Section: Personal Narrative Card */}
      <section className="bg-white rounded-2xl border border-pink-200/70 p-5 shadow-xs transition-all relative overflow-hidden">
        <div className="absolute top-0 right-0 w-36 h-36 bg-pink-50/60 rounded-bl-full -z-0 pointer-events-none" />

        <div className="relative z-10 space-y-3">
          {/* Unboxed Metadata */}
          <div className="flex items-center gap-2 text-xs text-stone-500 font-medium flex-wrap">
            <span className="text-stone-900 font-semibold">{persona.name[language]}</span>
            <span aria-hidden="true" className="text-pink-300">·</span>
            <span>{journey.exhibits.length} {language === 'en' ? 'Curated Stops' : '個精選展點'}</span>
            <span aria-hidden="true" className="text-pink-300">·</span>
            <span className="font-mono tabular-nums">~{journey.estimatedTotalMinutes} {language === 'en' ? 'mins' : '分鐘'}</span>
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 leading-snug">
            {journey.title[language]}
          </h1>

          <p className="text-sm text-stone-600 leading-relaxed">
            {journey.curatorialPremise[language]}
          </p>

          {/* Persona focus badge & quick actions */}
          <div className="pt-2 flex items-center justify-between border-t border-pink-100 flex-wrap gap-2 text-xs">
            <div className="flex items-center gap-1.5 text-stone-700">
              <span className="w-2 h-2 rounded-full bg-[#E4007F] shadow-[0_0_6px_rgba(228,0,127,0.5)]" />
              <span className="font-medium">{language === 'en' ? 'Storyline Lens:' : '專屬動線視角：'}</span>
              <span className="text-[#E4007F] font-semibold">{persona.characterTitle[language]}</span>
            </div>

            <button
              onClick={onReCurate}
              className="text-stone-500 hover:text-stone-900 transition-colors flex items-center gap-1 underline underline-offset-2 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{language === 'en' ? 'Switch persona' : '調整角色與節奏'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Visual Progress Indicator (Curated Route Visit Tracker) */}
      <section className="mt-4 bg-white rounded-2xl border border-stone-200/90 p-4 sm:p-5 shadow-xs transition-all space-y-3.5">
        {/* Top Header Row: Counter & Percentage */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
              isCompleted ? 'bg-emerald-100 text-emerald-800' : 'bg-[#E4007F]/10 text-[#E4007F]'
            }`}>
              {isCompleted ? <Sparkles className="w-4 h-4" /> : <Footprints className="w-4 h-4" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm text-stone-900 font-sans">
                  {language === 'en' ? 'Curated Route Progress' : '專屬動線參訪進度'}
                </span>
                <span className="text-stone-300">·</span>
                <span className="text-xs text-stone-500 font-medium">
                  {persona.name[language]}
                </span>
              </div>
              <div className="text-xs text-stone-500 flex items-center gap-1.5 mt-0.5">
                <span className="font-mono font-bold text-stone-900 text-sm">
                  {visitedCuratedCount}
                </span>
                <span className="font-mono text-stone-400">/</span>
                <span className="font-mono font-medium text-stone-600">
                  {totalCuratedCount} {language === 'en' ? 'stops visited' : '站已造訪'}
                </span>
                <span className="text-stone-300">·</span>
                <span className="font-mono text-stone-500 text-[11px]">
                  {savedInCuratedCount} {language === 'en' ? 'insights saved' : '則觀點已收錄'}
                </span>
              </div>
            </div>
          </div>

          {/* Dynamic Percentage Badge */}
          <div className="flex items-center gap-2">
            <div className={`px-3 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 transition-colors ${
              isCompleted 
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                : 'bg-[#E4007F]/10 text-[#E4007F] border border-[#E4007F]/20'
            }`}>
              {isCompleted && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              <span>{progressPercent}%</span>
              <span className="text-[10px] font-sans font-medium">
                {isCompleted ? (language === 'en' ? 'Completed' : '已完成') : (language === 'en' ? 'Visited' : '進行中')}
              </span>
            </div>
          </div>
        </div>

        {/* Continuous Segmented Animated Progress Bar */}
        <div className="space-y-1">
          <div className="w-full h-3 bg-stone-100 rounded-full overflow-hidden p-0.5 border border-stone-200/80 relative">
            <div 
              className={`h-full rounded-full transition-all duration-700 ease-out ${
                isCompleted
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 shadow-xs'
                  : 'bg-gradient-to-r from-[#E4007F] via-[#D9532F] to-emerald-500 shadow-xs'
              }`}
              style={{ width: `${Math.max(progressPercent, totalCuratedCount > 0 && visitedCuratedCount > 0 ? 5 : 0)}%` }}
            />
          </div>
        </div>

        {/* Interactive Stepper Nodes: Sequential Stop Indicators */}
        <div className="space-y-1.5 pt-0.5">
          <div className="flex items-center justify-between text-[11px] text-stone-500">
            <span className="font-medium text-stone-600">
              {language === 'en' ? 'Curated Route Stops in Sequence:' : '按動線順序瀏覽展位：'}
            </span>
            <span className="text-[10px] text-stone-400">
              {language === 'en' ? 'Tap stop to view / check' : '點擊展位可快速切換定位'}
            </span>
          </div>

          {/* Stepper Node Scrollable Strip */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1.5 pt-1 -mx-1 px-1 select-none">
            {journey.exhibits.map((ex, idx) => {
              const isVisited = effectiveVisitedIds.includes(ex.id);
              const isCurrentOrNext = !isVisited && (idx === 0 || effectiveVisitedIds.includes(journey.exhibits[idx - 1].id));

              return (
                <div key={ex.id} className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => handleStopNodeClick(ex)}
                    className={`group relative min-h-[38px] px-2.5 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 cursor-pointer text-xs ${
                      isVisited
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-900 hover:bg-emerald-100/70'
                        : isCurrentOrNext
                        ? 'bg-[#FAF8F5] border-[#E4007F] text-[#E4007F] ring-2 ring-[#E4007F]/20 font-bold'
                        : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
                    }`}
                    title={`${ex.code} ${ex.title[language]} · ${isVisited ? (language === 'en' ? 'Visited' : '已參訪') : (language === 'en' ? 'Tap to view' : '點擊查看')}`}
                  >
                    {/* Circle badge with check or number */}
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[10px] font-bold shrink-0 transition-colors ${
                      isVisited
                        ? 'bg-emerald-600 text-white'
                        : isCurrentOrNext
                        ? 'bg-[#E4007F] text-white animate-pulse'
                        : 'bg-stone-200 text-stone-700'
                    }`}>
                      {isVisited ? <Check className="w-3 h-3 stroke-[3]" /> : idx + 1}
                    </span>

                    {/* Booth Code & Name */}
                    <span className="font-mono font-bold">{ex.code}</span>
                    <span className="text-[11px] max-w-[80px] sm:max-w-[100px] truncate">
                      {ex.title[language]}
                    </span>

                    {/* Quick check toggle mini-button on node */}
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleVisited(ex.id, e);
                      }}
                      className={`w-4 h-4 rounded flex items-center justify-center transition-colors hover:scale-110 ${
                        isVisited 
                          ? 'text-emerald-700 hover:text-emerald-900' 
                          : 'text-stone-300 hover:text-[#E4007F]'
                      }`}
                      title={isVisited ? (language === 'en' ? 'Unmark' : '取消打卡') : (language === 'en' ? 'Mark visited' : '標記造訪')}
                    >
                      <CheckCircle2 className={`w-3.5 h-3.5 ${isVisited ? 'fill-emerald-100 text-emerald-700' : ''}`} />
                    </span>
                  </button>

                  {/* Connecting Arrow between stops */}
                  {idx < journey.exhibits.length - 1 && (
                    <span className="text-stone-300 text-xs font-mono">→</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Dynamic Contextual Footer: Next Stop OR Completion Celebration */}
        <div className="pt-2 border-t border-stone-100 text-xs flex items-center justify-between flex-wrap gap-2">
          {isCompleted ? (
            <div className="w-full bg-emerald-50/90 border border-emerald-200 rounded-xl p-3 flex items-center justify-between flex-wrap gap-2 animate-in fade-in">
              <div className="flex items-center gap-2">
                <span className="text-base">🎉</span>
                <div>
                  <p className="font-semibold text-emerald-900 text-xs">
                    {language === 'en' ? 'All Curated Stops Completed!' : '已完成全部專屬動線展位！'}
                  </p>
                  <p className="text-[11px] text-emerald-700">
                    {language === 'en' ? 'Ready to collect your personalized FLOWMOMO souvenir.' : '隨時可前往領取你的 FLOWMOMO 專屬數位紀念卡。'}
                  </p>
                </div>
              </div>
              <button
                onClick={onNavigateToPostVisit}
                className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-xs rounded-lg transition-colors flex items-center gap-1 cursor-pointer shadow-xs active:scale-95"
              >
                <span>{language === 'en' ? 'View Souvenir Card' : '查看數位紀念卡'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <>
              {/* Next stop advice */}
              <div className="flex items-center gap-2 text-stone-700">
                <span className="font-medium text-[#E4007F] flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5" />
                  <span>{language === 'en' ? 'Next Recommended Stop:' : '推薦下一站：'}</span>
                </span>
                {nextUpExhibit && (
                  <button
                    onClick={() => handleStopNodeClick(nextUpExhibit)}
                    className="font-semibold text-stone-900 hover:text-[#E4007F] underline underline-offset-2 transition-colors cursor-pointer"
                  >
                    {nextUpExhibit.code} {nextUpExhibit.title[language]}
                  </button>
                )}
              </div>

              {/* Time remaining & quick mark */}
              <div className="flex items-center gap-3 text-stone-500 font-mono text-[11px]">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-stone-400" />
                  <span>~{remainingWalkMinutes} {language === 'en' ? 'mins remaining' : '分鐘步程剩餘'}</span>
                </span>
                <span className="text-stone-300">·</span>
                <button
                  onClick={() => {
                    if (nextUpExhibit) toggleVisited(nextUpExhibit.id);
                  }}
                  className="text-[#E4007F] hover:underline font-sans cursor-pointer font-medium"
                >
                  {language === 'en' ? 'Check off next' : '快速打卡此站'}
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Main View Mode Selector (Timeline Cards vs Interactive Map) */}
      <div className="my-5 space-y-3">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          {/* Stream vs Map Primary View Toggle */}
          <div className="flex items-center gap-1 p-1 bg-pink-100/50 rounded-xl border border-pink-200/50">
            <button
              onClick={() => setDisplayMode('stream')}
              className={`min-h-[36px] px-3.5 py-1 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                displayMode === 'stream'
                  ? 'bg-gradient-to-r from-[#E4007F] to-[#FF2D78] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Card Stream' : '篇章卡片流'}</span>
            </button>

            <button
              onClick={() => setDisplayMode('map')}
              className={`min-h-[36px] px-3.5 py-1 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                displayMode === 'map'
                  ? 'bg-gradient-to-r from-[#E4007F] to-[#FF2D78] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <MapIcon className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Interactive Map' : '立體動線地圖'}</span>
              <span className={`px-1.5 py-0.2 rounded text-[10px] font-mono font-bold ${displayMode === 'map' ? 'bg-white/25 text-white' : 'bg-pink-200/60 text-stone-700'}`}>
                {journey.exhibits.length}
              </span>
            </button>
          </div>

          {/* Deep Dive vs Quick Highlights (applies to both modes) */}
          <div className="flex items-center p-1 bg-pink-100/50 rounded-lg border border-pink-200/50">
            <button
              onClick={() => onToggleExhibitMode('highlights')}
              className={`min-h-[32px] px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                exhibitMode === 'highlights'
                  ? 'bg-white text-[#E4007F] shadow-xs font-bold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {language === 'en' ? 'Quick' : '速覽'}
            </button>
            <button
              onClick={() => onToggleExhibitMode('deep_dive')}
              className={`min-h-[32px] px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                exhibitMode === 'deep_dive'
                  ? 'bg-white text-[#E4007F] shadow-xs font-bold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {language === 'en' ? 'Deep' : '深度'}
            </button>
          </div>
        </div>

        {/* Scope Subtitle Counter */}
        <div className="flex items-center justify-between text-xs text-stone-500 px-1">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewScope(viewScope === 'curated' ? 'all' : 'curated')}
              className="text-[#E4007F] hover:underline font-semibold cursor-pointer"
            >
              {viewScope === 'curated'
                ? (language === 'en' ? `Switch to All Area 1 (${ALL_AREA1_EXHIBITS.length})` : `切換為全展區目錄 (${ALL_AREA1_EXHIBITS.length})`)
                : (language === 'en' ? 'Switch to Curated Route' : '切換回專屬動線')}
            </button>
          </div>
          <div className="flex items-center gap-2 font-mono tabular-nums text-stone-500">
            <span className="flex items-center gap-1 text-emerald-800 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>{visitedCuratedCount} / {journey.exhibits.length} {language === 'en' ? 'visited' : '站已造訪'}</span>
            </span>
            <span className="text-stone-300">·</span>
            <span>
              {savedInsightIds.length} {language === 'en' ? 'insights' : '觀點'}
            </span>
          </div>
        </div>
      </div>

      {/* VIEW MODE 1: INTERACTIVE MAP VIEW */}
      {displayMode === 'map' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <InteractiveCampusMap
            curatedExhibits={journey.exhibits}
            allExhibits={ALL_AREA1_EXHIBITS}
            selectedExhibit={mapFocusedExhibit}
            onSelectExhibit={(ex) => setMapFocusedExhibit(ex)}
            onOpenInterpretation={onSelectExhibit}
            savedInsightIds={savedInsightIds}
            onToggleSaveInsight={onToggleSaveInsight}
            visitedIds={effectiveVisitedIds}
            onToggleVisited={toggleVisited}
            language={language}
            personaId={journey.personaId}
          />

          {/* Quick Route Stops Bar under map */}
          <div className="bg-white rounded-2xl border border-stone-200 p-4 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-stone-900 uppercase tracking-wider">
                {language === 'en' ? 'Sequence Along Curated Path' : '專屬動線參訪順序'}
              </span>
              <span className="text-stone-400 font-mono text-[11px]">
                {journey.exhibits.length} {language === 'en' ? 'Stops' : '站'}
              </span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5">
              {journey.exhibits.map((ex, idx) => {
                const isSelected = mapFocusedExhibit?.id === ex.id;
                const isSaved = savedInsightIds.includes(ex.id);
                const isVisited = effectiveVisitedIds.includes(ex.id) || isSaved;

                return (
                  <button
                    key={ex.id}
                    onClick={() => setMapFocusedExhibit(ex)}
                    className={`min-h-[44px] px-3 py-2 rounded-xl text-xs transition-all flex items-center gap-2 shrink-0 cursor-pointer border ${
                      isSelected
                        ? 'border-[#E4007F] bg-pink-50/70 ring-1 ring-[#E4007F]'
                        : 'border-pink-200/60 bg-white hover:bg-pink-50/40'
                    }`}
                  >
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[10px] font-bold ${
                        isVisited
                          ? 'bg-[#2E6F56] text-white'
                          : isSelected
                          ? 'bg-[#E4007F] text-white shadow-xs'
                          : 'bg-stone-200 text-stone-700'
                      }`}
                    >
                      {isVisited ? <Check className="w-3 h-3 stroke-[3]" /> : idx + 1}
                    </span>
                    <span className="font-bold text-stone-900 font-mono">{ex.code}</span>
                    <span className="text-stone-600 max-w-[120px] truncate">{ex.title[language]}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* VIEW MODE 2: TIMELINE CARD STREAM */}
      {displayMode === 'stream' && (
        <div className="space-y-6 relative before:absolute before:inset-y-3 before:left-[19px] before:w-[2px] before:bg-stone-200 before:-z-0 animate-in fade-in duration-200">
          {currentExhibits.map((exhibit, idx) => {
            const isSaved = savedInsightIds.includes(exhibit.id);
            const isVisited = effectiveVisitedIds.includes(exhibit.id);
            const isAudioActive = activeAudioExhibitId === exhibit.id && isPlayingAudio;
            const personaTakeaway = exhibit.whyItMattersByPersona[journey.personaId]?.[language];

            return (
              <div key={exhibit.id} className="relative z-10 pl-11 group">
                {/* Timeline Node with Official Code: A1, A3, A6, A7, A8, etc. */}
                <div
                  className={`absolute left-0 top-6 w-10 h-10 -ml-1 rounded-full border-2 flex items-center justify-center font-mono text-xs font-bold transition-all shadow-xs ${
                    isSaved || isVisited
                      ? 'border-[#2E6F56] bg-[#2E6F56] text-white'
                      : 'border-pink-200 bg-white text-stone-800 group-hover:border-[#E4007F]'
                  }`}
                >
                  {isSaved || isVisited ? (
                    <Check className="w-4 h-4 stroke-[2.5]" />
                  ) : (
                    <span>{exhibit.code}</span>
                  )}
                </div>

                {/* Exhibit Card */}
                <div 
                  id={`exhibit-card-${exhibit.id}`}
                  onClick={() => onSelectExhibit(exhibit)}
                  className={`rounded-2xl border transition-all overflow-hidden bg-white cursor-pointer hover:shadow-md hover:border-pink-300 ${
                    isSaved || isVisited ? 'border-emerald-200/90 ring-1 ring-emerald-600/10' : 'border-pink-200/60'
                  }`}
                >
                  {/* Visual Preview Thumbnail with aspect 16:9 */}
                  <div className="relative aspect-[16/9] w-full bg-stone-100 overflow-hidden">
                    <img
                      src={exhibit.image}
                      alt={exhibit.title[language]}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                    {/* Overlaid Venue Info with Area 1 tag */}
                    <div className="absolute bottom-3 left-3 right-3 text-white flex items-end justify-between">
                      <div>
                        <span className="text-[10px] font-mono uppercase bg-black/40 px-2 py-0.5 rounded text-white/90">
                          {exhibit.code} · {exhibit.venueFloor[language]}
                        </span>
                        <p className="text-xs font-semibold text-white drop-shadow-xs mt-1">
                          {exhibit.venueName[language]}
                        </p>
                      </div>
                    </div>

                    {/* Quick Map locator & Audio Guide buttons */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                      <button
                        onClick={(e) => handleOpenOnMap(exhibit, e)}
                        className="min-h-[44px] px-2.5 py-1 bg-white/90 hover:bg-white text-stone-800 rounded-full flex items-center gap-1 text-xs font-medium backdrop-blur-md shadow-md transition-all cursor-pointer"
                        title={language === 'en' ? 'View location on map' : '在地圖定位'}
                      >
                        <MapIcon className="w-3.5 h-3.5 text-[#E4007F]" />
                        <span className="hidden xs:inline">{language === 'en' ? 'Map' : '地圖'}</span>
                      </button>

                      <button
                        onClick={(e) => handleAudioClick(exhibit.id, e)}
                        className={`min-h-[44px] min-w-[44px] rounded-full flex items-center justify-center transition-all cursor-pointer backdrop-blur-md shadow-md ${
                          isAudioActive
                            ? 'bg-[#E4007F] text-white scale-105 shadow-pink-300'
                            : 'bg-white/90 text-stone-800 hover:bg-white hover:text-stone-950'
                        }`}
                        title={language === 'en' ? 'Play audio guide' : '播放語音導覽'}
                        aria-label={`Play audio guide for ${exhibit.title[language]}`}
                      >
                        <Headphones className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-4 space-y-3">
                    {/* Clean unboxed metadata: Low emphasis buffer time */}
                    <div className="flex items-center justify-between text-xs text-stone-500">
                      <div className="flex items-center gap-1.5">
                        <Footprints className="w-3.5 h-3.5 text-stone-400" />
                        <span>{exhibit.bufferWalkMinutes} {language === 'en' ? 'min walk' : '分鐘步行'}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono tabular-nums">{exhibit.distanceMeters}m</span>
                      </div>

                      <div className="flex items-center gap-1 font-mono text-stone-400">
                        <Clock className="w-3 h-3" />
                        <span>{exhibit.audioDuration}</span>
                      </div>
                    </div>

                    {/* Headline Title */}
                    <h2 className="font-serif text-lg font-bold text-stone-900 group-hover:text-[#E4007F] transition-colors leading-snug">
                      {exhibit.title[language]}
                    </h2>

                    {/* KEY TAKEAWAY IN 1 SENTENCE */}
                    <div className="p-3 bg-pink-50/40 rounded-xl border border-pink-200/60">
                      <div className="text-[11px] font-bold text-[#E4007F] uppercase tracking-wider mb-1 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        <span>{language === 'en' ? 'Key Takeaway in 1 Sentence' : '一言核心亮點'}</span>
                      </div>
                      <p className="text-sm font-medium text-stone-800 leading-snug">
                        "{exhibit.oneSentenceTakeaway[language]}"
                      </p>
                    </div>

                    {/* Deep Dive Mode Expanded Information */}
                    {exhibitMode === 'deep_dive' && (
                      <div className="pt-2 border-t border-stone-100 space-y-2 text-xs text-stone-600 animate-in fade-in duration-150">
                        <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-100 space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[10px] bg-[#E4007F] text-white px-1.5 py-0.5 rounded font-bold">
                              {language === 'en' ? `Booth ${exhibit.code}` : `展位：${exhibit.code}`}
                            </span>
                            <span className="font-semibold text-stone-800">{exhibit.subFlowTheme[language]}</span>
                            <span className="text-stone-400">·</span>
                            <span className="text-stone-500 font-mono text-[11px]">{exhibit.dates}</span>
                          </div>
                          <p className="text-stone-700 leading-relaxed pt-0.5">
                            {exhibit.officialDescription[language]}
                          </p>
                        </div>

                        <div>
                          <span className="font-semibold text-stone-900">{language === 'en' ? 'Curatorial Perspective: ' : '策展深度導讀：'}</span>
                          <span>{exhibit.curatorialStory[language]}</span>
                        </div>

                        {personaTakeaway && (
                          <div className="bg-amber-50/70 p-2.5 rounded-lg border border-amber-200/60 text-stone-800">
                            <span className="font-semibold text-[#D97706]">{language === 'en' ? 'Why It Matters to You: ' : '為你解析的文化切角：'}</span>
                            <span>{personaTakeaway}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Interactive Actions Strip */}
                    <div className="pt-2 flex items-center justify-between gap-2 border-t border-stone-100 text-xs">
                      <div className="flex items-center gap-2">
                        {/* Save Key Insight Toggle */}
                        <button
                          onClick={(e) => handleSaveClick(exhibit.id, e)}
                          className={`min-h-[44px] px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                            isSaved
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                          }`}
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-emerald-800' : ''}`} />
                          <span>
                            {isSaved 
                              ? (language === 'en' ? 'Insight Saved' : '已收錄觀點')
                              : (language === 'en' ? 'Save Insight' : '收錄觀點')}
                          </span>
                        </button>

                        {/* Mark Visited Checkbox */}
                        <button
                          onClick={(e) => toggleVisited(exhibit.id, e)}
                          className={`min-h-[44px] px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                            isVisited 
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold' 
                              : 'text-stone-600 hover:text-stone-900 bg-stone-50 hover:bg-stone-100 border border-stone-200'
                          }`}
                          title={language === 'en' ? 'Toggle visited status' : '切換造訪狀態'}
                        >
                          <CheckCircle2 className={`w-3.5 h-3.5 ${isVisited ? 'text-emerald-600 fill-emerald-100' : 'text-stone-400'}`} />
                          <span className="text-[11px]">
                            {isVisited ? (language === 'en' ? 'Visited' : '已造訪') : (language === 'en' ? 'Check In' : '打卡')}
                          </span>
                        </button>
                      </div>

                      {/* View Details CTA */}
                      <button
                        onClick={() => onSelectExhibit(exhibit)}
                        className="min-h-[44px] px-3 text-stone-700 hover:text-[#E4007F] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <span>{language === 'en' ? 'Full Interpretation' : '詳細解構'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Branching Path Alternative Callout */}
                  {exhibit.branchAlternative && (
                    <div className="bg-pink-50/40 px-4 py-2.5 border-t border-pink-100 flex items-start gap-2.5 text-xs text-stone-600">
                      <GitBranch className="w-3.5 h-3.5 text-[#E4007F] mt-0.5 shrink-0" />
                      <div className="min-w-0">
                        <span className="font-semibold text-stone-800">
                          {language === 'en' ? 'Side Path: ' : '支線推薦：'}
                          {exhibit.branchAlternative.title[language]}
                        </span>
                        <span className="text-stone-500 block text-[11px]">
                          {exhibit.branchAlternative.description[language]}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Floating Bottom Sticky Bar */}
      <aside aria-label="Journey Progress" className="fixed bottom-0 left-0 right-0 z-30 bg-[#FFF5F8]/95 backdrop-blur-md border-t border-pink-200/80 p-3 shadow-lg">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-xs text-stone-700 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-[#E4007F]" />
              <span className="truncate">
                {language === 'en' ? 'Area 1 Unlocked Insights' : '青埔展區已收錄觀點'}
              </span>
            </div>
            <div className="text-[11px] text-stone-500 font-mono">
              <span className="font-semibold text-stone-900">{savedInsightIds.length}</span> / {journey.exhibits.length} {language === 'en' ? 'takeaways' : '則核心觀點'}
            </div>
          </div>

          <button
            onClick={onNavigateToPostVisit}
            className="min-h-[48px] px-5 py-2.5 rounded-xl font-bold text-white bg-gradient-to-r from-[#E4007F] via-[#FF2D78] to-[#FF65A3] hover:from-[#C9006F] hover:to-[#E4007F] transition-all shadow-md shadow-pink-400/40 flex items-center gap-2 cursor-pointer active:scale-[0.98] shrink-0"
          >
            <span>{language === 'en' ? 'Generate Souvenir' : '領取紀念卡'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </aside>
    </div>
  );
};
