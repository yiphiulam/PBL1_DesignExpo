import React from 'react';
import { Language, PersonaId } from '../types/expo';
import { PERSONAS } from '../data/exhibitionData';
import { Languages, Compass, Sparkles, RefreshCw } from 'lucide-react';

interface HeaderProps {
  language: Language;
  onToggleLanguage: () => void;
  currentScreen: 'onboarding' | 'dashboard' | 'post_visit';
  onNavigate: (screen: 'onboarding' | 'dashboard' | 'post_visit') => void;
  selectedPersonaId: PersonaId;
  savedInsightsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onToggleLanguage,
  currentScreen,
  onNavigate,
  selectedPersonaId,
  savedInsightsCount,
}) => {
  const currentPersona = PERSONAS.find(p => p.id === selectedPersonaId) || PERSONAS[0];

  return (
    <header className="sticky top-0 z-40 bg-[#FFF5F8]/92 backdrop-blur-md border-b border-pink-200/80 transition-colors">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => onNavigate('dashboard')}
          className="text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 rounded-sm"
          title="Taiwan Design Expo"
        >
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E4007F] shadow-[0_0_8px_rgba(228,0,127,0.6)] animate-pulse" aria-hidden="true" />
            <span className="font-serif text-lg font-bold tracking-tight text-stone-900 group-hover:text-[#E4007F] transition-colors whitespace-nowrap shrink-0">
              {language === 'en' ? 'TAIWAN DESIGN EXPO' : '台灣設計展'}
            </span>
          </div>
        </button>

        {/* Zone 2: Nav items / Contextual Status */}
        <div className="hidden sm:flex items-center gap-5 text-xs text-stone-600">
          {currentScreen !== 'onboarding' && (
            <button
              onClick={() => onNavigate('dashboard')}
              className={`hover:text-[#E4007F] transition-colors whitespace-nowrap shrink-0 ${
                currentScreen === 'dashboard' ? 'font-bold text-[#E4007F] underline underline-offset-4 decoration-[#E4007F] decoration-2' : ''
              }`}
            >
              {language === 'en' ? 'Curated Route' : '策展動線'}
            </button>
          )}

          {currentScreen !== 'onboarding' && (
            <button
              onClick={() => onNavigate('post_visit')}
              className={`hover:text-[#E4007F] transition-colors whitespace-nowrap shrink-0 ${
                currentScreen === 'post_visit' ? 'font-bold text-[#E4007F] underline underline-offset-4 decoration-[#E4007F] decoration-2' : ''
              }`}
            >
              {language === 'en' ? 'Takeaway Souvenir' : '觀展回顧'}
            </button>
          )}

          {currentScreen !== 'onboarding' && (
            <div className="text-pink-300 select-none">/</div>
          )}

          {currentScreen !== 'onboarding' && (
            <span className="text-stone-500 truncate max-w-[140px] font-medium">
              {currentPersona.name[language]}
            </span>
          )}
        </div>

        {/* Zone 3: Actions (Language toggle + Mode switch) */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onToggleLanguage}
            className="min-h-[38px] px-2.5 py-1 text-xs font-medium text-stone-700 hover:text-stone-950 bg-pink-100/60 hover:bg-pink-150 border border-pink-200/60 rounded-md transition-colors flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 cursor-pointer"
            title={language === 'en' ? 'Switch to Traditional Chinese' : '切換為英文'}
            aria-label="Toggle language"
          >
            <Languages className="w-3.5 h-3.5 text-[#E4007F]" />
            <span className="whitespace-nowrap font-medium">
              {language === 'en' ? '繁中' : 'EN'}
            </span>
          </button>

          {currentScreen !== 'onboarding' && (
            <button
              onClick={() => onNavigate('onboarding')}
              className="min-h-[38px] px-2.5 py-1 text-xs text-stone-600 hover:text-stone-900 bg-transparent hover:bg-pink-100/60 rounded-md transition-colors flex items-center gap-1 cursor-pointer"
              title={language === 'en' ? 'Re-curate route' : '重新策展'}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden xs:inline whitespace-nowrap">{language === 'en' ? 'Filter' : '重設'}</span>
            </button>
          )}

          {currentScreen === 'dashboard' && (
            <button
              onClick={() => onNavigate('post_visit')}
              className="min-h-[38px] px-3.5 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-[#E4007F] to-[#FF2D78] hover:from-[#C9006F] hover:to-[#E4007F] rounded-md transition-all shadow-sm shadow-pink-300/60 flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Souvenir' : '紀念卡'}</span>
              {savedInsightsCount > 0 && (
                <span className="bg-white/25 text-white rounded-full px-1.5 text-[10px] tabular-nums font-mono font-bold">
                  {savedInsightsCount}
                </span>
              )}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};


