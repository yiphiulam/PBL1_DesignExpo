import React, { useState, useEffect } from 'react';
import { ExhibitItem, Language, PersonaId, UserAreaExpression } from '../types/expo';
import { PERSONAS } from '../data/exhibitionData';
import { 
  X, 
  Play, 
  Pause, 
  Volume2, 
  Languages, 
  Bookmark, 
  Check, 
  Sparkles, 
  Eye, 
  Ear, 
  HandMetal, 
  Footprints, 
  Share2, 
  Quote, 
  FileText,
  ThumbsUp,
  PenLine,
  MessageSquare,
  Trash2
} from 'lucide-react';

interface ExhibitModalProps {
  exhibit: ExhibitItem | null;
  onClose: () => void;
  language: Language;
  onToggleLanguage: () => void;
  selectedPersonaId: PersonaId;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  pollAnswer: string | undefined;
  onVotePoll: (exhibitId: string, optionId: string) => void;
  isPlayingAudio: boolean;
  onToggleAudio: (exhibitId: string) => void;
  expression?: UserAreaExpression;
  onSaveExpression?: (exhibitId: string, text: string, tag?: string) => void;
  onDeleteExpression?: (exhibitId: string) => void;
}

export const ExhibitModal: React.FC<ExhibitModalProps> = ({
  exhibit,
  onClose,
  language,
  onToggleLanguage,
  selectedPersonaId,
  isSaved,
  onToggleSave,
  pollAnswer,
  onVotePoll,
  isPlayingAudio,
  onToggleAudio,
  expression,
  onSaveExpression,
  onDeleteExpression,
}) => {
  const [showTranscript, setShowTranscript] = useState(false);
  const [audioPlaybackRate, setAudioPlaybackRate] = useState<1 | 1.25>(1);
  const [audioProgress, setAudioProgress] = useState(25);
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [noteText, setNoteText] = useState(expression?.text || '');
  const [noteTag, setNoteTag] = useState(expression?.tag || (language === 'en' ? '💭 Reflection' : '💭 心得感悟'));
  const [savedNoteToast, setSavedNoteToast] = useState(false);

  useEffect(() => {
    setNoteText(expression?.text || '');
    setNoteTag(expression?.tag || (language === 'en' ? '💭 Reflection' : '💭 心得感悟'));
  }, [expression, language]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlayingAudio) {
      interval = setInterval(() => {
        setAudioProgress(prev => (prev >= 100 ? 0 : prev + 2 * audioPlaybackRate));
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlayingAudio, audioPlaybackRate]);

  if (!exhibit) return null;

  const persona = PERSONAS.find(p => p.id === selectedPersonaId) || PERSONAS[0];
  const personaTakeaway = exhibit.whyItMattersByPersona[selectedPersonaId]?.[language];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl w-full max-w-xl max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200 relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header inside modal */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-5 py-3.5 border-b border-stone-100 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-stone-500 font-medium truncate">
            <span className="font-mono font-bold text-stone-900 bg-stone-100 px-1.5 py-0.5 rounded">{exhibit.code}</span>
            <span aria-hidden="true">·</span>
            <span className="truncate">{exhibit.venueFloor[language]}</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Multilingual Toggle */}
            <button
              onClick={onToggleLanguage}
              className="min-h-[38px] px-2.5 py-1 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-md transition-colors flex items-center gap-1 cursor-pointer"
              title="Toggle language"
            >
              <Languages className="w-3.5 h-3.5 text-stone-500" />
              <span>{language === 'en' ? '繁中' : 'EN'}</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="min-h-[44px] min-w-[44px] rounded-full flex items-center justify-center text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-6">
          {/* Main Visual Image */}
          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-stone-100 border border-stone-200/80">
            <img
              src={exhibit.image}
              alt={exhibit.title[language]}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            {/* Category text watermark */}
            <div className="absolute bottom-3 left-4 text-white">
              <span className="text-[11px] uppercase tracking-wider text-white/80 font-medium">
                {exhibit.thematicCategory}
              </span>
              <p className="text-sm font-semibold drop-shadow-xs">
                {exhibit.venueName[language]}
              </p>
            </div>
          </div>

          {/* Exhibition Title & 1-Sentence Takeaway */}
          <div className="space-y-3">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
              {exhibit.title[language]}
            </h1>

            {/* Key Takeaway Highlight Banner */}
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-stone-200">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#D9532F] uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'Key Takeaway in 1 Sentence' : '一言核心亮點'}</span>
              </div>
              <p className="text-base font-semibold text-stone-900 leading-snug">
                "{exhibit.oneSentenceTakeaway[language]}"
              </p>
            </div>
          </div>

          {/* Audio Guide Player Section (Prompt Requirement) */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-stone-900 text-white flex items-center justify-center">
                  <Volume2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h2 className="text-xs font-semibold text-stone-900">
                    {language === 'en' ? 'Official Curatorial Audio Guide' : '官方策展語音導覽'}
                  </h2>
                  <p className="text-[11px] text-stone-500 font-mono">
                    {exhibit.audioDuration} · {language === 'en' ? 'Bilingual Voice Track' : '雙語專業原聲'}
                  </p>
                </div>
              </div>

              {/* Speed toggle */}
              <button
                onClick={() => setAudioPlaybackRate(prev => (prev === 1 ? 1.25 : 1))}
                className="text-[11px] font-mono font-medium px-2 py-1 bg-white border border-stone-200 rounded-md text-stone-600 hover:text-stone-900 cursor-pointer"
              >
                {audioPlaybackRate}x
              </button>
            </div>

            {/* Playback Controls & Waveform Simulation */}
            <div className="flex items-center gap-3 pt-1">
              <button
                onClick={() => onToggleAudio(exhibit.id)}
                className="min-h-[44px] min-w-[44px] rounded-full bg-gradient-to-r from-[#E4007F] to-[#FF2D78] hover:from-[#C9006F] hover:to-[#E4007F] text-white flex items-center justify-center transition-transform active:scale-95 shadow-md shadow-pink-300/40 cursor-pointer shrink-0"
                aria-label={isPlayingAudio ? 'Pause Audio Guide' : 'Play Audio Guide'}
              >
                {isPlayingAudio ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
              </button>

              {/* Waveform Scrubber bar */}
              <div className="flex-1 space-y-1">
                <div 
                  className="h-7 bg-white rounded-lg border border-pink-200/80 px-2 flex items-center gap-1 cursor-pointer overflow-hidden"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    setAudioProgress(Math.round((clickX / rect.width) * 100));
                  }}
                >
                  {/* Waveform bars */}
                  {[40, 70, 30, 90, 60, 85, 45, 100, 75, 50, 80, 65, 95, 40, 60, 85, 30, 70, 55, 90].map((h, i) => {
                    const isPlayed = (i / 20) * 100 <= audioProgress;
                    return (
                      <span
                        key={i}
                        className={`flex-1 rounded-full transition-colors ${
                          isPlayed ? 'bg-[#E4007F]' : 'bg-pink-100'
                        }`}
                        style={{ height: `${h}%` }}
                      />
                    );
                  })}
                </div>

                <div className="flex justify-between text-[10px] text-stone-400 font-mono">
                  <span>{isPlayingAudio ? 'Playing' : 'Ready'}</span>
                  <span>{exhibit.audioDuration}</span>
                </div>
              </div>
            </div>

            {/* Transcript Toggle */}
            <div className="pt-1">
              <button
                onClick={() => setShowTranscript(prev => !prev)}
                className="text-xs text-stone-500 hover:text-stone-900 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <FileText className="w-3 h-3" />
                <span>
                  {showTranscript 
                    ? (language === 'en' ? 'Hide Transcript' : '收合逐字稿')
                    : (language === 'en' ? 'Read Full Transcript' : '閱讀語音逐字稿')}
                </span>
              </button>

              {showTranscript && (
                <div className="mt-2 p-3 bg-white rounded-xl border border-stone-200 text-xs text-stone-700 leading-relaxed animate-in fade-in duration-150">
                  {exhibit.audioTranscript[language]}
                </div>
              )}
            </div>
          </div>

          {/* HIGHLIGHT QUOTE BOX: "Why this matters to you" (Prompt Requirement) */}
          <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/90 relative overflow-hidden">
            <Quote className="w-10 h-10 text-amber-200/80 absolute -bottom-1 -right-1 pointer-events-none" />

            <div className="relative z-10 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#D97706] uppercase tracking-wider">
                <span>{language === 'en' ? 'Why This Matters to You' : '為什麼這件事與你切身相關'}</span>
                <span aria-hidden="true">·</span>
                <span className="text-stone-600 normal-case">{persona.name[language]}</span>
              </div>

              <blockquote className="font-serif text-base sm:text-lg text-stone-900 italic font-medium leading-relaxed">
                "{personaTakeaway}"
              </blockquote>
            </div>
          </div>

          {/* Official Exhibition Intro & Booth Details */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2.5">
            <div className="flex items-center justify-between text-xs text-stone-600 flex-wrap gap-2 pb-2 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-white bg-[#E4007F] px-2 py-0.5 rounded text-[11px]">
                  {language === 'en' ? `Booth: ${exhibit.code}` : `展位編號：${exhibit.code}`}
                </span>
                <span className="font-bold text-stone-900">{exhibit.subFlowTheme[language]}</span>
              </div>
              <div className="flex items-center gap-2 font-mono text-[11px] text-stone-500">
                <span>{language === 'en' ? `Dates: ${exhibit.dates}` : `展覽時間：${exhibit.dates}`}</span>
                <span>·</span>
                <span>{exhibit.venueFloor[language]}</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
                {language === 'en' ? 'Official Exhibition Statement' : '官方展覽簡介'}
              </span>
              <p className="text-sm text-stone-700 leading-relaxed font-sans">
                {exhibit.officialDescription[language]}
              </p>
            </div>
          </div>

          {/* Curatorial Story (Low-barrier interpretation) */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
              {language === 'en' ? 'Curatorial Background' : '策展論述脈絡'}
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              {exhibit.curatorialStory[language]}
            </p>
          </div>

          {/* Sensory Focal Points (Look / Listen / Touch) */}
          <div className="space-y-2.5">
            <h2 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
              {language === 'en' ? 'Sensory Focal Points' : '展場五感指引'}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="p-3 bg-pink-50/40 rounded-xl border border-pink-200/60 flex items-start gap-2.5">
                <Eye className="w-4 h-4 text-[#E4007F] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-semibold text-stone-900 block">{language === 'en' ? 'Look' : '眼見'}</span>
                  <span className="text-stone-600">{exhibit.sensoryFocus.look[language]}</span>
                </div>
              </div>

              <div className="p-3 bg-emerald-50/40 rounded-xl border border-emerald-200/60 flex items-start gap-2.5">
                <Ear className="w-4 h-4 text-[#2E6F56] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-semibold text-stone-900 block">{language === 'en' ? 'Listen' : '耳聽'}</span>
                  <span className="text-stone-600">{exhibit.sensoryFocus.listen[language]}</span>
                </div>
              </div>

              <div className="p-3 bg-amber-50/40 rounded-xl border border-amber-200/60 flex items-start gap-2.5">
                <HandMetal className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-semibold text-stone-900 block">{language === 'en' ? 'Touch & Taste' : '觸覺與風味'}</span>
                  <span className="text-stone-600">{exhibit.sensoryFocus.touchOrTaste[language]}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Element: Micro-Poll (Prompt Requirement) */}
          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-900">
                <ThumbsUp className="w-3.5 h-3.5 text-[#E4007F]" />
                <span>{language === 'en' ? 'Visitor Cultural Resonance Poll' : '展間共鳴微調查'}</span>
              </div>
              <span className="text-[11px] text-stone-400">
                {language === 'en' ? 'Anonymous & Instant' : '即時匿名互動'}
              </span>
            </div>

            <p className="text-xs text-stone-700 font-medium">
              {exhibit.microPoll.question[language]}
            </p>

            <div className="space-y-2">
              {exhibit.microPoll.options.map(opt => {
                const isSelected = pollAnswer === opt.id;
                const totalVotes = opt.initialVotes + (isSelected ? 1 : 0);
                return (
                  <button
                    key={opt.id}
                    onClick={() => onVotePoll(exhibit.id, opt.id)}
                    className={`w-full min-h-[44px] text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between gap-3 cursor-pointer ${
                      isSelected
                        ? 'border-[#E4007F] bg-pink-50/60 ring-1 ring-[#E4007F] font-semibold text-stone-900'
                        : 'border-stone-200 bg-white hover:bg-stone-100/50 text-stone-700'
                    }`}
                  >
                    <span className="flex-1">{opt.label[language]}</span>
                    <span className="font-mono text-stone-400 text-[11px] tabular-nums">
                      {totalVotes} {language === 'en' ? 'votes' : '票'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* User's Area Expression Section (What you want to express in this area) */}
          <div className="p-4 bg-gradient-to-br from-pink-50/80 to-rose-50/50 rounded-2xl border border-pink-200/90 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#E4007F]">
                <PenLine className="w-3.5 h-3.5" />
                <span>{language === 'en' ? `What You Want to Express at ${exhibit.code}` : `寫下你在 ${exhibit.code} 的觀點與心得表達`}</span>
              </div>
              <span className="text-[10px] text-stone-400">
                {language === 'en' ? 'Preserved in your Expo Passport' : '收錄至個人展覽護照'}
              </span>
            </div>

            {expression?.text && !isEditingNote ? (
              <div className="bg-white rounded-xl p-3 border border-pink-200 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#E4007F] bg-pink-100 px-2 py-0.5 rounded-full">
                    {expression.tag || (language === 'en' ? '💭 Reflection' : '💭 心得感悟')}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setIsEditingNote(true)}
                      className="text-stone-400 hover:text-[#E4007F] text-xs p-1 rounded hover:bg-pink-50 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <PenLine className="w-3 h-3" />
                      <span className="text-[10px]">{language === 'en' ? 'Edit' : '修改'}</span>
                    </button>
                    {onDeleteExpression && (
                      <button
                        onClick={() => onDeleteExpression(exhibit.id)}
                        className="text-stone-400 hover:text-red-600 text-xs p-1 rounded hover:bg-red-50 transition-colors cursor-pointer"
                        title={language === 'en' ? 'Delete expression' : '清除筆記'}
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
                <p className="text-xs text-stone-800 leading-relaxed pl-2 border-l-2 border-[#E4007F] font-medium whitespace-pre-wrap">
                  "{expression.text}"
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <textarea
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  maxLength={300}
                  rows={2}
                  placeholder={
                    language === 'en'
                      ? `Write what you want to express at ${exhibit.code} (e.g. key inspiration, curatorial feedback, structural awe)...`
                      : `寫下你在 ${exhibit.code} 最深刻的文化觸動、想對策展人說的話或在地反思...`
                  }
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-200 focus:border-[#E4007F] focus:ring-1 focus:ring-[#E4007F] outline-none bg-white text-stone-900 leading-relaxed font-sans"
                />
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] text-stone-400 font-mono">{noteText.length}/300</span>
                  <div className="flex items-center gap-2">
                    {isEditingNote && (
                      <button
                        type="button"
                        onClick={() => {
                          setNoteText(expression?.text || '');
                          setIsEditingNote(false);
                        }}
                        className="text-xs text-stone-500 hover:text-stone-700 px-2.5 py-1 rounded cursor-pointer"
                      >
                        {language === 'en' ? 'Cancel' : '取消'}
                      </button>
                    )}
                    <button
                      type="button"
                      disabled={!noteText.trim()}
                      onClick={() => {
                        if (noteText.trim() && onSaveExpression) {
                          onSaveExpression(exhibit.id, noteText.trim(), noteTag);
                          setIsEditingNote(false);
                          setSavedNoteToast(true);
                          setTimeout(() => setSavedNoteToast(false), 2000);
                        }
                      }}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-lg text-white transition-all flex items-center gap-1 cursor-pointer ${
                        noteText.trim()
                          ? 'bg-[#E4007F] hover:bg-[#C9006F] shadow-sm'
                          : 'bg-stone-300 cursor-not-allowed'
                      }`}
                    >
                      <Check className="w-3 h-3 stroke-[3]" />
                      <span>{language === 'en' ? 'Save Note' : '儲存此展心得'}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {savedNoteToast && (
              <div className="text-[11px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-200 px-2.5 py-1 rounded-md flex items-center gap-1">
                <Check className="w-3 h-3 stroke-[3]" />
                <span>{language === 'en' ? 'Saved to your personal pass!' : '已成功儲存至你的專屬展覽護照！'}</span>
              </div>
            )}
          </div>
        </div>

        {/* Modal Sticky Bottom Action */}
        <div className="sticky bottom-0 z-20 bg-white/95 backdrop-blur-md px-5 py-3 border-t border-stone-200 flex items-center justify-between gap-3">
          <div className="flex items-center gap-1 text-xs text-stone-500">
            <Footprints className="w-3.5 h-3.5 text-stone-400" />
            <span>{exhibit.bufferWalkMinutes} {language === 'en' ? 'min walk · Next pavilion' : '分鐘步程至下個展點'}</span>
          </div>

          <button
            onClick={() => onToggleSave(exhibit.id)}
            className={`min-h-[48px] px-5 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-xs active:scale-[0.98] ${
              isSaved
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
                : 'bg-gradient-to-r from-[#E4007F] to-[#FF2D78] hover:from-[#C9006F] hover:to-[#E4007F] text-white shadow-pink-300/40'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
            <span>
              {isSaved
                ? (language === 'en' ? 'Insight Saved in Ledger' : '已收藏至觀展筆記')
                : (language === 'en' ? 'Save Key Insight' : '收藏此展核心觀點')}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
