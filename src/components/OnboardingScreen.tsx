import React, { useState } from 'react';
import { PersonaId, InterestId, PaceId, Language } from '../types/expo';
import { PERSONAS, INTERESTS } from '../data/exhibitionData';
import { 
  Compass, 
  PenTool, 
  Users, 
  Home, 
  Sparkles, 
  Clock, 
  ArrowRight, 
  Check, 
  SlidersHorizontal,
  Flame,
  Zap,
  BookOpen
} from 'lucide-react';

interface OnboardingScreenProps {
  language: Language;
  selectedPersona: PersonaId;
  selectedInterest: InterestId;
  selectedPace: PaceId;
  onSelectPersona: (id: PersonaId) => void;
  onSelectInterest: (id: InterestId) => void;
  onSelectPace: (id: PaceId) => void;
  onGenerate: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  language,
  selectedPersona,
  selectedInterest,
  selectedPace,
  onSelectPersona,
  onSelectInterest,
  onSelectPace,
  onGenerate,
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  const getPersonaIcon = (id: PersonaId) => {
    switch (id) {
      case 'first_timer': return <Compass className="w-5 h-5" />;
      case 'design_student': return <PenTool className="w-5 h-5" />;
      case 'family': return <Users className="w-5 h-5" />;
      case 'local_resident': return <Home className="w-5 h-5" />;
      case 'cultural_hunter': return <Sparkles className="w-5 h-5" />;
      default: return <Compass className="w-5 h-5" />;
    }
  };

  const paces: Array<{ id: PaceId; label: { en: string; zh: string }; duration: { en: string; zh: string }; desc: { en: string; zh: string } }> = [
    {
      id: 'quick',
      label: { en: 'Quick Highlights', zh: '精華速覽' },
      duration: { en: '~65 mins · 3 Key Spots', zh: '約 65 分鐘 · 3 個核心展點' },
      desc: { en: 'Low-friction path with zero cognitive overload', zh: '節奏明快，直奔最具代表性展品' }
    },
    {
      id: 'moderate',
      label: { en: 'Balanced Walk', zh: '悠閒漫遊' },
      duration: { en: '~110 mins · 4 Curated Spots', zh: '約 110 分鐘 · 4 個精選展點' },
      desc: { en: 'Optimal balance of sensory rest and cultural depth', zh: '兼顧五感沉浸與體力餘裕的黃金動線' }
    },
    {
      id: 'deep',
      label: { en: 'Deep Narrative', zh: '深度策展' },
      duration: { en: '~150 mins · Complete Immersion', zh: '約 150 分鐘 · 全篇章沉浸' },
      desc: { en: 'Includes curatorial footnotes, audio guides, and maker interviews', zh: '完整解鎖策展論述、耳機導覽與匠師手稿' }
    }
  ];

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex flex-col justify-between py-6 px-4 max-w-xl mx-auto w-full">
      {/* Editorial Header */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#E4007F] font-bold">
          <span>{language === 'en' ? 'Area 1 · Qingpu · Messe Taoyuan' : '青埔展區 Area 1 · 桃園會展中心'}</span>
          <span aria-hidden="true" className="text-pink-300">·</span>
          <span className="text-stone-500 font-normal">2026 Taiwan Design Expo</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 leading-[1.15] text-balance">
          {language === 'en' 
            ? 'Discover Your Personal Story at Taiwan Design Expo'
            : '在台灣設計展 遇見屬於你的展覽敘事'}
        </h1>

        <p className="text-sm text-stone-600 leading-relaxed">
          {language === 'en'
            ? 'Move beyond sterile spatial maps. Answer 3 quick questions to generate a tailored cultural narrative with 1-sentence takeaways and digital souvenir.'
            : '告別迷宮般的展場地圖與資訊超載。透過三道直覺選擇，為你即時編排專屬篇章動線、核心金句與觀展數位紀念卡。'}
        </p>
      </div>

      {/* Step Indicator Tabs */}
      <div className="my-6">
        <div className="grid grid-cols-3 gap-2 p-1.5 bg-pink-100/50 rounded-xl border border-pink-200/50">
          <button
            onClick={() => setCurrentStep(1)}
            className={`min-h-[44px] px-2 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              currentStep === 1
                ? 'bg-gradient-to-r from-[#E4007F] to-[#FF2D78] text-white shadow-xs font-semibold'
                : 'text-stone-600 hover:text-stone-900 hover:bg-white/60'
            }`}
          >
            <span className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center border ${
              currentStep === 1 ? 'border-white/60 bg-white/20 text-white' : 'border-stone-300'
            }`}>1</span>
            <span className="truncate">{language === 'en' ? 'Persona' : '參訪角色'}</span>
          </button>

          <button
            onClick={() => setCurrentStep(2)}
            className={`min-h-[44px] px-2 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              currentStep === 2
                ? 'bg-gradient-to-r from-[#E4007F] to-[#FF2D78] text-white shadow-xs font-semibold'
                : 'text-stone-600 hover:text-stone-900 hover:bg-white/60'
            }`}
          >
            <span className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center border ${
              currentStep === 2 ? 'border-white/60 bg-white/20 text-white' : 'border-stone-300'
            }`}>2</span>
            <span className="truncate">{language === 'en' ? 'Interest' : '關注焦點'}</span>
          </button>

          <button
            onClick={() => setCurrentStep(3)}
            className={`min-h-[44px] px-2 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              currentStep === 3
                ? 'bg-gradient-to-r from-[#E4007F] to-[#FF2D78] text-white shadow-xs font-semibold'
                : 'text-stone-600 hover:text-stone-900 hover:bg-white/60'
            }`}
          >
            <span className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center border ${
              currentStep === 3 ? 'border-white/60 bg-white/20 text-white' : 'border-stone-300'
            }`}>3</span>
            <span className="truncate">{language === 'en' ? 'Pace' : '時間節奏'}</span>
          </button>
        </div>
      </div>

      {/* Step Content */}
      <div className="flex-1">
        {/* Step 1: Who are you visiting as? */}
        {currentStep === 1 && (
          <div className="space-y-3 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-1">
              <h2 className="text-sm font-semibold text-stone-900">
                {language === 'en' ? 'Step 1: Who are you visiting as?' : '步驟一：你以什麼身分走進展場？'}
              </h2>
              <span className="text-xs text-[#E4007F] font-medium">
                {language === 'en' ? 'Select 1 persona' : '選擇一個角色視角'}
              </span>
            </div>

            <div className="space-y-2.5">
              {PERSONAS.map((persona) => {
                const isSelected = selectedPersona === persona.id;
                return (
                  <button
                    key={persona.id}
                    onClick={() => {
                      onSelectPersona(persona.id);
                    }}
                    className={`w-full min-h-[56px] text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${
                      isSelected
                        ? 'border-[#E4007F] bg-pink-50/70 ring-1 ring-[#E4007F] shadow-xs'
                        : 'border-pink-200/60 bg-white hover:border-pink-300 hover:bg-pink-50/30'
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        isSelected ? 'bg-gradient-to-tr from-[#E4007F] to-[#FF65A3] text-white shadow-xs' : 'bg-pink-100/60 text-stone-700'
                      }`}
                    >
                      {getPersonaIcon(persona.id)}
                    </div>

                    <div className="flex-1 min-w-0 pr-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-stone-900">
                          {persona.name[language]}
                        </span>
                        <span className="text-[11px] text-[#E4007F] font-medium truncate hidden xs:inline">
                          · {persona.characterTitle[language]}
                        </span>
                      </div>
                      <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                        {persona.description[language]}
                      </p>
                    </div>

                    <div className="shrink-0 pt-1">
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          isSelected
                            ? 'border-[#E4007F] bg-[#E4007F] text-white'
                            : 'border-stone-300 text-transparent'
                        }`}
                      >
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: What interests you most? */}
        {currentStep === 2 && (
          <div className="space-y-3 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-1">
              <h2 className="text-sm font-semibold text-stone-900">
                {language === 'en' ? 'Step 2: What interests you most?' : '步驟二：這次你最想探尋的切角？'}
              </h2>
              <span className="text-xs text-stone-500">
                {language === 'en' ? 'Primary focus' : '核心主題'}
              </span>
            </div>

            <div className="space-y-2.5">
              {INTERESTS.map((interest) => {
                const isSelected = selectedInterest === interest.id;
                return (
                  <button
                    key={interest.id}
                    onClick={() => {
                      onSelectInterest(interest.id);
                    }}
                    className={`w-full min-h-[56px] text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${
                      isSelected
                        ? 'border-[#E4007F] bg-pink-50/70 ring-1 ring-[#E4007F] shadow-xs'
                        : 'border-pink-200/60 bg-white hover:border-pink-300 hover:bg-pink-50/30'
                    }`}
                  >
                    <div className="flex-1 min-w-0 pr-2">
                      <div className="text-sm font-semibold text-stone-900">
                        {interest.name[language]}
                      </div>
                      <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                        {interest.description[language]}
                      </p>
                    </div>

                    <div className="shrink-0 pt-1">
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          isSelected
                            ? 'border-[#E4007F] bg-[#E4007F] text-white'
                            : 'border-stone-300 text-transparent'
                        }`}
                      >
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 3: Pace & Time Budget */}
        {currentStep === 3 && (
          <div className="space-y-3 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-1">
              <h2 className="text-sm font-semibold text-stone-900">
                {language === 'en' ? 'Step 3: How much time do you have?' : '步驟三：你預計停留多久？'}
              </h2>
              <span className="text-xs text-[#E4007F] font-medium">
                {language === 'en' ? 'Pacing & depth' : '時間與體力'}
              </span>
            </div>

            <div className="space-y-2.5">
              {paces.map((pace) => {
                const isSelected = selectedPace === pace.id;
                return (
                  <button
                    key={pace.id}
                    onClick={() => {
                      onSelectPace(pace.id);
                    }}
                    className={`w-full min-h-[56px] text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${
                      isSelected
                        ? 'border-[#E4007F] bg-pink-50/70 ring-1 ring-[#E4007F] shadow-xs'
                        : 'border-pink-200/60 bg-white hover:border-pink-300 hover:bg-pink-50/30'
                    }`}
                  >
                    <div className="flex-1 min-w-0 pr-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-stone-900">
                          {pace.label[language]}
                        </span>
                        <span className="text-xs text-[#E4007F] font-mono font-medium">
                          {pace.duration[language]}
                        </span>
                      </div>
                      <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                        {pace.desc[language]}
                      </p>
                    </div>

                    <div className="shrink-0 pt-1">
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          isSelected
                            ? 'border-[#E4007F] bg-[#E4007F] text-white'
                            : 'border-stone-300 text-transparent'
                        }`}
                      >
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="pt-6 border-t border-pink-200/80 space-y-2">
        <div className="flex items-center justify-between gap-3">
          {currentStep > 1 ? (
            <button
              onClick={() => setCurrentStep((prev) => (prev - 1) as 1 | 2 | 3)}
              className="min-h-[48px] px-4 py-2.5 text-xs font-medium text-stone-700 bg-pink-100/60 hover:bg-pink-200/70 rounded-xl transition-colors cursor-pointer"
            >
              {language === 'en' ? 'Back' : '上一步'}
            </button>
          ) : (
            <div className="text-xs text-stone-500">
              <span>{language === 'en' ? 'Step 1 of 3' : '第 1 / 3 步'}</span>
            </div>
          )}

          {currentStep < 3 ? (
            <button
              onClick={() => setCurrentStep((prev) => (prev + 1) as 1 | 2 | 3)}
              className="min-h-[48px] px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#E4007F] to-[#FF2D78] hover:from-[#C9006F] hover:to-[#E4007F] rounded-xl transition-all shadow-sm shadow-pink-300/50 flex items-center gap-2 cursor-pointer ml-auto active:scale-98"
            >
              <span>{language === 'en' ? 'Continue' : '下一步'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onGenerate}
              className="min-h-[48px] px-6 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-[#E4007F] via-[#FF2D78] to-[#FF65A3] hover:from-[#C9006F] hover:to-[#E4007F] rounded-xl transition-all shadow-md shadow-pink-400/40 flex items-center gap-2 cursor-pointer ml-auto active:scale-[0.98]"
            >
              <Sparkles className="w-4 h-4" />
              <span>
                {language === 'en' ? 'Generate My Curated Journey' : '產生我的專屬策展動線'}
              </span>
            </button>
          )}
        </div>

        {/* Quiet footnote */}
        <p className="text-[11px] text-stone-400 text-center pt-2">
          {language === 'en'
            ? 'Web-accessible companion · No app store installation required'
            : '免下載 App · 隨開即用的展覽隨身指引'}
        </p>
      </div>
    </div>
  );
};
