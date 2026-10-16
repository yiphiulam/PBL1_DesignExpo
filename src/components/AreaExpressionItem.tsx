import React, { useState } from 'react';
import { ExhibitItem, Language, UserAreaExpression } from '../types/expo';
import { 
  PenLine, 
  Check, 
  Trash2, 
  Sparkles, 
  Smile, 
  Compass, 
  Layers, 
  Bookmark, 
  MessageSquare,
  Quote,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface AreaExpressionItemProps {
  exhibit: ExhibitItem;
  index: number;
  language: Language;
  isVisited: boolean;
  isSaved: boolean;
  expression?: UserAreaExpression;
  onSaveExpression: (exhibitId: string, text: string, tag?: string) => void;
  onDeleteExpression: (exhibitId: string) => void;
  onToggleVisited?: (exhibitId: string) => void;
  defaultExpanded?: boolean;
}

// Tailored quick inspiration prompts per exhibit code (A1, A2, A3, ...)
const AREA_INSPIRATION_PROMPTS: Record<string, { zh: string[]; en: string[] }> = {
  A1: {
    zh: [
      '🌊 土地與水文在此流動匯聚的生命力太震撼',
      '🪵 大跨距原木弧線天棚與自然天光令人驚艷',
      '🛫 航線、埤塘與多元族群在青埔定錨的包容感'
    ],
    en: [
      '🌊 The flowing vitality of land and waterways is deeply moving',
      '🪵 The soaring timber canopy with daylight is breathtaking',
      '🛫 A powerful anchor where flight corridors and diverse people converge'
    ]
  },
  A2: {
    zh: [
      '🏙️ 2040 未來城市設計師互動讓我看見永續聚落',
      '🌿 綠色步道與生活聚落規劃兼具溫度與遠見',
      '✨ 親手觸控規劃街道光影的共創感很深刻'
    ],
    en: [
      '🏙️ Engaging 2040 civic planning with tangible human warmth',
      '🌿 Connected green corridors and livable intergenerational hamlets',
      '✨ Inspiring participatory co-creation of the urban future'
    ]
  },
  A3: {
    zh: [
      '🌉 彩色玻璃橋串聯北橫與珍珠海岸的五感魅力',
      '🎨 數位光影與自然香氛營造的沉浸氛圍太美',
      '✨ 真正感受到了桃園作為「匯流之都」的活力'
    ],
    en: [
      '🌉 Radiant stained-glass bridge linking coastal and mountain beauty',
      '🎨 Scent, light, and soundscape merge into an unforgettable passage',
      '✨ True embodiment of Taoyuan as the Capital of Confluence'
    ]
  },
  A4: {
    zh: [
      '🎨 跨界設計打開了對日常工藝的全新視角',
      '💡 不同專業領域激盪出意想不到的火花'
    ],
    en: [
      '🎨 Cross-disciplinary design redefining everyday craft perspectives',
      '💡 Brilliant synergy bridging creative boundaries'
    ]
  },
  A5: {
    zh: [
      '📈 看見地方產業透過設計轉型升級的價值',
      '💡 商業邏輯與文化美學在這裡找到了平衡'
    ],
    en: [
      '📈 The transformative power of design elevating local industry',
      '💡 Harmonizing commercial resilience with cultural identity'
    ]
  },
  A6: {
    zh: [
      '🌿 桃〇計畫的循環材料全生命週期思維讓人佩服',
      '♻️ 乾式組裝與百分之百可回收實踐了永續精神'
    ],
    en: [
      '🌿 TAOPIA circular material life-cycle thinking is remarkable',
      '♻️ Dry-assembly and demountable architecture for true net-zero'
    ]
  },
  A7: {
    zh: [
      '🥣 常民飲食與生活器皿中蘊含的深刻記憶',
      '✨ 熟悉的人情味被設計提煉得格外動人'
    ],
    en: [
      '🥣 Deeply moving memories embodied in everyday dining culture',
      '✨ Local warmth elevated through thoughtful curation'
    ]
  },
  A8: {
    zh: [
      '⚙️ 24HR 運轉全世界工業鏈的製造業震撼',
      '✈️ 默默守護全球航空與精密產業的職人精神'
    ],
    en: [
      '⚙️ The electrifying rhythm of Taoyuan driving global industry 24/7',
      '✈️ Unsung craftsmen and engineers powering global aerospace'
    ]
  },
  A9: {
    zh: [
      '💻 數據演算室將冷冰冰的代碼轉譯為流動詩意',
      '🤖 AI 與人類設計師在此開展的共生對話'
    ],
    en: [
      '💻 Data algorithm lab transforming cold code into poetic beauty',
      '🤖 Thought-provoking dialogue between artificial and human intelligence'
    ]
  },
  A10: {
    zh: [
      '🔥 青年設計師無畏常規的實驗力量感染力十足',
      '🚀 充滿野性與活力的次世代策展語言'
    ],
    en: [
      '🔥 Fearless youth experimentation breaking established rules',
      '🚀 Vibrant next-generation curatorial spirit'
    ]
  },
  A11: {
    zh: [
      '📐 幾何構圖與純粹留白帶來的沉靜節奏',
      '🤍 在喧囂展場中覓得一處能靜心呼吸的場所'
    ],
    en: [
      '📐 Pure geometry and intentional negative space creating serene rhythm',
      '🤍 A calm sanctuary to pause and reflect amidst expo energy'
    ]
  },
  A12: {
    zh: [
      '🌾 客家與原住民風土滋味的當代轉譯極具深度',
      '🍃 土地長出來的器皿讓人重拾對自然的敬畏'
    ],
    en: [
      '🌾 Deep contemporary translation of Hakka and Indigenous terroir',
      '🍃 Earth-rooted craft evoking reverence for the land'
    ]
  },
  A13: {
    zh: [
      '📷 #桃園POV 讓每位市民的視角都成為展覽主角',
      '🌆 多元視角拼貼出這座城市最真實的生命力'
    ],
    en: [
      '📷 #TaoyuanPOV makes every citizen’s gaze the protagonist',
      '🌆 A kaleidoscopic mosaic of the real living city'
    ]
  },
  A14: {
    zh: [
      '📚 在圖書館的自然採光中感受文字與思想的流動',
      '🌳 建築與知識交融的青埔永續公共客廳'
    ],
    en: [
      '📚 Sunlight through reading rooms inspiring the flow of thought',
      '🌳 Sustainable public civic salon in Qingpu library'
    ]
  }
};

const DEFAULT_PROMPTS = {
  zh: [
    '✨ 這個展區最觸動我心弦的細節是...',
    '💡 給策展團隊與設計師的一句共鳴回饋：',
    '🏛️ 這讓我對未來的桃園有了全新的想像：'
  ],
  en: [
    '✨ The most inspiring detail that caught my heart here was...',
    '💡 A message of resonance to the curatorial team:',
    '🏛️ This gave me a brand-new imagination for future Taoyuan:'
  ]
};

const PERSPECTIVE_TAGS = [
  { id: 'insight', zh: '💭 心得感悟', en: '💭 Reflection' },
  { id: 'spark', zh: '✨ 靈感觸發', en: '✨ Inspiration' },
  { id: 'tectonic', zh: '📐 工藝驚艷', en: '📐 Craft Detail' },
  { id: 'green', zh: '🌿 永續共鳴', en: '🌿 Eco Future' },
  { id: 'culture', zh: '🏛️ 在地文化', en: '🏛️ Terroir' },
  { id: 'global', zh: '🌏 國際視野', en: '🌏 Global POV' },
];

export const AreaExpressionItem: React.FC<AreaExpressionItemProps> = ({
  exhibit,
  index,
  language,
  isVisited,
  isSaved,
  expression,
  onSaveExpression,
  onDeleteExpression,
  onToggleVisited,
  defaultExpanded = false,
}) => {
  const [isEditing, setIsEditing] = useState(defaultExpanded && !expression);
  const [inputText, setInputText] = useState(expression?.text || '');
  const [selectedTag, setSelectedTag] = useState<string>(expression?.tag || PERSPECTIVE_TAGS[0].zh);
  const [isSavedAnimation, setIsSavedAnimation] = useState(false);

  const prompts = AREA_INSPIRATION_PROMPTS[exhibit.code]?.[language] || DEFAULT_PROMPTS[language];

  const handleSave = () => {
    if (!inputText.trim()) return;
    onSaveExpression(exhibit.id, inputText.trim(), selectedTag);
    setIsEditing(false);
    setIsSavedAnimation(true);
    setTimeout(() => setIsSavedAnimation(false), 2000);
  };

  const handleCancel = () => {
    setInputText(expression?.text || '');
    setSelectedTag(expression?.tag || PERSPECTIVE_TAGS[0].zh);
    setIsEditing(false);
  };

  const handleApplyPrompt = (promptText: string) => {
    // If empty or matches another prompt, replace; otherwise append
    if (!inputText.trim()) {
      setInputText(promptText);
    } else {
      setInputText(prev => `${prev} ${promptText}`);
    }
  };

  const hasExpression = Boolean(expression?.text?.trim());

  return (
    <div
      className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
        hasExpression
          ? 'bg-gradient-to-br from-pink-50/90 via-white to-pink-50/50 border-pink-300 shadow-sm'
          : isVisited
          ? 'bg-pink-50/40 border-pink-200/90'
          : 'bg-white border-stone-200/70'
      }`}
    >
      {/* Header Bar of the Exhibit Stop */}
      <div className="p-3.5 sm:p-4 flex items-start gap-3">
        {/* Number / Visited Status Button */}
        <button
          onClick={() => onToggleVisited && onToggleVisited(exhibit.id)}
          className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-all cursor-pointer ${
            hasExpression
              ? 'bg-[#E4007F] text-white shadow-[0_0_10px_rgba(228,0,127,0.4)]'
              : isVisited
              ? 'bg-[#E4007F] text-white'
              : 'bg-stone-100 hover:bg-stone-200 text-stone-500 border border-stone-200'
          }`}
          title={isVisited ? (language === 'en' ? 'Visited' : '已造訪') : (language === 'en' ? 'Mark as visited' : '標記造訪')}
        >
          {isVisited || hasExpression ? (
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          ) : (
            <span className="font-mono text-xs font-bold">{index + 1}</span>
          )}
        </button>

        {/* Content Body */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-xs px-2 py-0.5 rounded-md bg-[#E4007F] text-white shadow-xs">
                {exhibit.code}
              </span>
              <h4 className="font-semibold text-sm text-stone-900 truncate">
                {exhibit.title[language]}
              </h4>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-[11px] font-medium text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                {exhibit.subFlowTheme[language]}
              </span>
              {hasExpression && (
                <span className="text-[10px] font-bold text-[#E4007F] bg-pink-100 border border-pink-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <PenLine className="w-2.5 h-2.5" />
                  <span>{language === 'en' ? 'Expressed' : '已撰寫觀點'}</span>
                </span>
              )}
            </div>
          </div>

          {/* Curatorial One-Sentence Takeaway */}
          <div className="mt-1.5 flex items-start gap-1.5 text-xs text-stone-600 bg-white/70 p-2 rounded-lg border border-pink-100">
            <Quote className="w-3 h-3 text-[#E4007F] shrink-0 mt-0.5" />
            <p className="italic text-[11px] leading-relaxed">
              {exhibit.oneSentenceTakeaway[language]}
            </p>
          </div>

          {/* ======================================================== */}
          {/* USER'S EXPRESSED PERSPECTIVE DISPLAY (If Already Written) */}
          {/* ======================================================== */}
          {hasExpression && !isEditing && (
            <div className="mt-3 bg-white rounded-xl p-3 border border-pink-200 shadow-xs relative group animate-in fade-in duration-150">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#E4007F]">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{language === 'en' ? 'My Area Cultural Perspective:' : '我的展區文化觀點：'}</span>
                  {expression?.tag && (
                    <span className="font-normal text-[10px] bg-pink-50 text-stone-700 border border-pink-200 px-1.5 py-0.2 rounded-md ml-1">
                      {expression.tag}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-stone-400 hover:text-[#E4007F] p-1 rounded-md hover:bg-pink-50 transition-colors cursor-pointer text-xs flex items-center gap-1"
                    title={language === 'en' ? 'Edit my expression' : '編輯我的觀點'}
                  >
                    <PenLine className="w-3.5 h-3.5" />
                    <span className="text-[11px]">{language === 'en' ? 'Edit' : '修改'}</span>
                  </button>
                  <button
                    onClick={() => onDeleteExpression(exhibit.id)}
                    className="text-stone-400 hover:text-red-600 p-1 rounded-md hover:bg-red-50 transition-colors cursor-pointer"
                    title={language === 'en' ? 'Clear expression' : '清除筆記'}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* The Expressed Text */}
              <p className="text-xs sm:text-sm font-medium text-stone-800 leading-relaxed pl-2 border-l-2 border-[#E4007F] whitespace-pre-wrap">
                {expression?.text}
              </p>

              <div className="mt-2 flex items-center justify-between text-[10px] text-stone-400">
                <span>
                  {language === 'en' ? 'Saved to personal Expo Passport' : '已收錄至你的專屬展覽護照'}
                </span>
                <span>
                  {expression?.updatedAt ? new Date(expression.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                </span>
              </div>
            </div>
          )}

          {/* Button to Open Writing Box if NOT yet written and NOT editing */}
          {!hasExpression && !isEditing && (
            <div className="mt-2.5">
              <button
                onClick={() => setIsEditing(true)}
                className="w-full text-left py-2 px-3 rounded-xl border border-dashed border-pink-300 hover:border-[#E4007F] bg-white/80 hover:bg-pink-50/50 text-xs text-stone-600 hover:text-[#E4007F] transition-all flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-pink-100 group-hover:bg-[#E4007F] group-hover:text-white text-[#E4007F] flex items-center justify-center transition-colors">
                    <PenLine className="w-3 h-3" />
                  </span>
                  <span className="font-medium">
                    {language === 'en' 
                      ? `Write what you want to express at ${exhibit.code}...` 
                      : `寫下你在 ${exhibit.code} 的觀點、心得或想表達的話...`}
                  </span>
                </div>
                <span className="text-[11px] font-mono font-bold text-[#E4007F] opacity-0 group-hover:opacity-100 transition-opacity">
                  {language === 'en' ? '+ Write' : '+ 撰寫'}
                </span>
              </button>
            </div>
          )}

          {/* ======================================================== */}
          {/* INTERACTIVE WRITING DRAWER / EDITOR                     */}
          {/* ======================================================== */}
          {isEditing && (
            <div className="mt-3 bg-white rounded-2xl p-4 border-2 border-[#E4007F]/40 shadow-md space-y-3 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between border-b border-pink-100 pb-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-[#E4007F] text-white flex items-center justify-center">
                    <PenLine className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-stone-900">
                      {language === 'en' 
                        ? `Express Your POV at ${exhibit.code} · ${exhibit.title.en}`
                        : `在 ${exhibit.code} ${exhibit.title.zh} 寫下你的觀點表達`}
                    </h5>
                    <p className="text-[10px] text-stone-500">
                      {language === 'en'
                        ? 'Your thoughts will be preserved on your official Taiwan Design Expo souvenir card.'
                        : '你的想法將即時收錄在專屬全息紀念卡與限動分享圖中。'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleCancel}
                  className="text-stone-400 hover:text-stone-600 text-xs px-2 py-0.5 rounded cursor-pointer"
                >
                  {language === 'en' ? 'Cancel' : '取消'}
                </button>
              </div>

              {/* Quick Perspective Tag Selector */}
              <div>
                <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block mb-1">
                  {language === 'en' ? 'Perspective Theme Tag:' : '選擇觀點主軸標籤：'}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {PERSPECTIVE_TAGS.map(t => {
                    const isSelected = selectedTag === t.zh || selectedTag === t.en;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setSelectedTag(t[language])}
                        className={`text-[11px] px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#E4007F] text-white font-bold shadow-xs'
                            : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                        }`}
                      >
                        {t[language]}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Text Input Area */}
              <div className="relative">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  maxLength={300}
                  rows={3}
                  placeholder={
                    language === 'en'
                      ? `What touched or inspired you here? E.g., structural elegance, the water metaphor, cultural identity...`
                      : `寫下你在 ${exhibit.code} 最深刻的文化觸動、想對策展人說的話或在地反思...`
                  }
                  className="w-full text-xs sm:text-sm p-3 rounded-xl border border-stone-300 focus:border-[#E4007F] focus:ring-2 focus:ring-[#E4007F]/20 outline-none transition-all resize-none bg-stone-50/50 focus:bg-white text-stone-900 leading-relaxed font-sans"
                  autoFocus
                />
                <div className="flex justify-between items-center text-[10px] text-stone-400 mt-1">
                  <span>{language === 'en' ? 'Tip: Click inspiration chips below to fast-fill' : '💡 提示：點擊下方靈感靈光可快速帶入觀點'}</span>
                  <span className="font-mono">{inputText.length} / 300</span>
                </div>
              </div>

              {/* Quick Inspiration Chips */}
              <div className="space-y-1.5 pt-1 border-t border-pink-100">
                <span className="text-[10px] font-bold text-stone-500 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#E4007F]" />
                  <span>{language === 'en' ? 'Curatorial Inspiration Chips (Click to use):' : '展區靈感靈光（點擊直接採用或補充）：'}</span>
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {prompts.map((pText, pIdx) => (
                    <button
                      key={pIdx}
                      type="button"
                      onClick={() => handleApplyPrompt(pText)}
                      className="text-[11px] text-left px-2.5 py-1 rounded-lg bg-pink-50 hover:bg-pink-100 border border-pink-200 text-stone-800 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>{pText}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-pink-100">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-3 py-1.5 text-xs text-stone-600 hover:text-stone-900 rounded-lg cursor-pointer"
                >
                  {language === 'en' ? 'Cancel' : '暫不儲存'}
                </button>

                <button
                  type="button"
                  onClick={handleSave}
                  disabled={!inputText.trim()}
                  className={`px-4 py-2 rounded-xl text-xs font-bold text-white transition-all flex items-center gap-1.5 shadow-md cursor-pointer ${
                    inputText.trim()
                      ? 'bg-gradient-to-r from-[#E4007F] to-[#FF2D78] hover:from-[#C9006F] hover:to-[#E4007F] shadow-pink-300/40 active:scale-95'
                      : 'bg-stone-300 cursor-not-allowed shadow-none'
                  }`}
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>{language === 'en' ? 'Save Expression' : '儲存我的展區觀點'}</span>
                </button>
              </div>
            </div>
          )}

          {/* Saved feedback toast animation indicator */}
          {isSavedAnimation && (
            <div className="mt-2 text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              <span>{language === 'en' ? 'Expression recorded in your Expo Passport!' : '已成功儲存至你的專屬展覽護照！'}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
