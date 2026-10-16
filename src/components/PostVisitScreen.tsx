import React, { useRef, useState, useEffect } from 'react';
import { CuratedJourney, Language, PersonaId, UserExpressionsMap } from '../types/expo';
import { PERSONAS, FLOWMOMO_AVATARS } from '../data/exhibitionData';
import { 
  Sparkles, 
  Download, 
  Share2, 
  Check, 
  ArrowLeft, 
  Bookmark, 
  RefreshCw,
  Award,
  CheckCircle2,
  Volume2,
  VolumeX,
  Printer,
  Copy,
  Layers,
  Compass,
  Radio,
  Camera,
  MapPin,
  ExternalLink,
  MessageCircleHeart,
  QrCode,
  PenLine,
  Filter,
  FileText,
  CheckCheck,
  MessageSquare
} from 'lucide-react';

// Pre-bundled high quality Expo imagery & IKEA Mascot
import flowmomoImg from '../assets/images/flowmomo_character_1791790478962.jpg';
import ikeaMomoImg from '../assets/images/ikea_momo_mascot_1792155183359.jpg';
import { IkeaMomoCharacter } from './IkeaMomoCharacter';
import { AreaExpressionItem } from './AreaExpressionItem';
import { SoundscapePlayerCard } from './SoundscapePlayerCard';
import { expoSoundscape } from '../utils/expoSoundscapeEngine';
import heroPavilionImg from '../assets/images/expo_hero_pavilion_1791790411519.jpg';
import interactiveLightImg from '../assets/images/expo_interactive_light_1791790446733.jpg';
import foodIdentityImg from '../assets/images/expo_food_identity_1791790428298.jpg';
import craftUrbanImg from '../assets/images/expo_craft_urban_1791790464927.jpg';
import industryTeamworkImg from '../assets/images/expo_industry_teamwork_1791791588435.jpg';
import taoyuanPovImg from '../assets/images/expo_taoyuan_pov_1791791600960.jpg';

interface PostVisitScreenProps {
  journey: CuratedJourney;
  language: Language;
  savedInsightIds: string[];
  visitedExhibitIds?: string[];
  userExpressions?: UserExpressionsMap;
  onSaveExpression?: (exhibitId: string, text: string, tag?: string) => void;
  onDeleteExpression?: (exhibitId: string) => void;
  onToggleVisited?: (exhibitId: string) => void;
  onBackToDashboard: () => void;
  onRestartJourney: () => void;
}

type SouvenirTab = 'card' | 'radar' | 'photos' | 'soundscape';

export const PostVisitScreen: React.FC<PostVisitScreenProps> = ({
  journey,
  language,
  savedInsightIds,
  visitedExhibitIds = [],
  userExpressions,
  onSaveExpression,
  onDeleteExpression,
  onToggleVisited,
  onBackToDashboard,
  onRestartJourney,
}) => {
  const [activeTab, setActiveTab] = useState<SouvenirTab>('card');
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyAllToast, setCopyAllToast] = useState(false);
  const [stopsFilter, setStopsFilter] = useState<'all' | 'expressed' | 'visited'>('all');
  const [internalExpressions, setInternalExpressions] = useState<UserExpressionsMap>(() => {
    if (userExpressions) return userExpressions;
    try {
      const saved = localStorage.getItem('expo2026_user_expressions');
      if (saved) return JSON.parse(saved);
    } catch {}
    return {};
  });

  const activeExpressions = userExpressions || internalExpressions;

  const handleSaveExp = (exhibitId: string, text: string, tag?: string) => {
    if (onSaveExpression) {
      onSaveExpression(exhibitId, text, tag);
    } else {
      setInternalExpressions(prev => {
        const next = { ...prev, [exhibitId]: { text, tag, updatedAt: Date.now() } };
        try { localStorage.setItem('expo2026_user_expressions', JSON.stringify(next)); } catch {}
        return next;
      });
    }
  };

  const handleDeleteExp = (exhibitId: string) => {
    if (onDeleteExpression) {
      onDeleteExpression(exhibitId);
    } else {
      setInternalExpressions(prev => {
        const next = { ...prev };
        delete next[exhibitId];
        try { localStorage.setItem('expo2026_user_expressions', JSON.stringify(next)); } catch {}
        return next;
      });
    }
  };

  // Expressed count for the curated route
  const expressedCount = journey.exhibits.filter(ex => Boolean(activeExpressions[ex.id]?.text?.trim())).length;
  const [characterMood, setCharacterMood] = useState<'inspired' | 'tectonic' | 'playful' | 'rooted' | 'global'>('inspired');
  const [mascotVisualMode, setMascotVisualMode] = useState<'vector' | 'manual'>('vector');

  const persona = PERSONAS.find(p => p.id === journey.personaId) || PERSONAS[0];
  const avatarInfo = FLOWMOMO_AVATARS[journey.personaId] || FLOWMOMO_AVATARS.first_timer;

  // Exhibits with saved insights or visited
  const visitedCount = journey.exhibits.filter(ex => visitedExhibitIds.includes(ex.id)).length;
  const unlockedExhibits = journey.exhibits.filter(ex => savedInsightIds.includes(ex.id) || visitedExhibitIds.includes(ex.id));
  const effectiveExhibits = unlockedExhibits.length > 0 ? unlockedExhibits : journey.exhibits.slice(0, 3);

  // Play synthesized crystal chime sound on character click
  const playMomoChime = () => {
    try {
      expoSoundscape.triggerChime();
    } catch {}
  };

  // Clean up soundscape on unmount
  useEffect(() => {
    return () => {
      try {
        expoSoundscape.stop();
      } catch {}
    };
  }, []);

  // Character quotes by mood (IKEA Manual Edition)
  const moodDialogues = {
    inspired: {
      zh: '「Hej！我是 MÖMÖ 桃桃！✨ 像 IKEA 組裝說明書一樣，我們用最純粹的極簡線條與好奇心，把青埔展區的靈感零件一步步拼裝進生活！來看看你的專屬觀展護照吧！」',
      en: '“Hej! I’m MÖMÖ! ✨ Just like an IKEA instruction manual, we assemble ideas piece by piece with clean lines and curiosity. Explore your personalized exhibition passport!”'
    },
    tectonic: {
      zh: '「六角板手準備好了嗎？🔧 在 A1 大跨距木構與 A6 循環材料中，每顆螺栓與卡榫都是嚴謹造物美學。不需任何多餘膠水，結構本身就是最好的設計！」',
      en: '“Got your hex key ready? 🔧 From A1 timber joints to A6 circular loops, every bolt and mortise is honest craft. No glue needed—pure structure!”'
    },
    playful: {
      zh: '「組立說明書第 3 步：把日常煩惱收進平整包裝盒，拿著彩色氣球跨過 A3 彩光天橋！保持簡單、保持微笑，就是最棒的設計哲學。」',
      en: '“Manual Step 3: Put worries in a flat-pack box and stroll across A3 Rainbow Bridge! Keep it simple, keep smiling—pure joyful design!”'
    },
    rooted: {
      zh: '「桃園的千塘水脈就像家裡最溫潤的原木餐桌，經得起歲月發酵。在 A10 水之道與 A7 市集裡，我們聽見了故土最厚實純粹的匠人手溫。」',
      en: '“Taoyuan’s water ponds are like a seasoned solid pine dining table—timeless and warm. In A10 and A7, we celebrate honest local craftsmanship.”'
    },
    global: {
      zh: '「從青埔出發，世界就是我們的客廳！在 A13 #桃園POV 裡，各國頂尖設計師帶來跨文化語彙，所有零件都緊密相扣、精彩共振。」',
      en: '“From Qingpu to the world: in A13 #TaoyuanPOV, international creators turn Taoyuan into a global living room where every piece fits seamlessly!”'
    }
  };

  // Cultural 5-axis Radar Scores (0 to 100) dynamically calculated based on visited exhibits
  const calculateRadarScores = () => {
    const codes = journey.exhibits.map(e => e.code);
    const visitedCodes = journey.exhibits.filter(e => visitedExhibitIds.includes(e.id) || savedInsightIds.includes(e.id)).map(e => e.code);

    const has = (code: string) => visitedCodes.includes(code) || codes.includes(code);

    return {
      flow: 65 + (has('A1') ? 20 : 0) + (has('A10') ? 15 : 0),      // 水文流動感知
      tectonics: 60 + (has('A6') ? 20 : 0) + (has('A8') ? 20 : 0), // 構造物性美學
      market: 55 + (has('A7') ? 25 : 0) + (has('A11') ? 20 : 0),   // 常民市集共鳴
      smart: 50 + (has('A9') ? 25 : 0) + (has('A14') ? 25 : 0),    // 智慧演算前瞻
      global: 60 + (has('A13') ? 25 : 0) + (has('A2') ? 15 : 0),   // 國際視角對話
    };
  };

  const radarScores = calculateRadarScores();

  // Exhibit photos gallery
  const galleryItems = [
    { code: 'A1', title: { zh: '桃園流', en: 'TaoYuan in Flow' }, img: heroPavilionImg, tag: { zh: '主題核心', en: 'Core Theme' } },
    { code: 'A3', title: { zh: '匯流之橋', en: 'Bridge of Confluence' }, img: interactiveLightImg, tag: { zh: '玩美流', en: 'Light Bridge' } },
    { code: 'A7', title: { zh: '好市有戲', en: 'Good Market, Good Show' }, img: foodIdentityImg, tag: { zh: '賣動流', en: 'Market Living' } },
    { code: 'A8', title: { zh: '24HR 運轉全世界', en: '24HR Taoyuan Teamwork' }, img: industryTeamworkImg, tag: { zh: '智造流', en: '24HR Global' } },
    { code: 'A6', title: { zh: '桃〇計畫－未來循環園', en: 'TAOPIA Circular Park' }, img: craftUrbanImg, tag: { zh: '永續流', en: 'Circular Future' } },
    { code: 'A13', title: { zh: '#桃園POV', en: '#TaoyuanPOV' }, img: taoyuanPovImg, tag: { zh: '國際流', en: 'Global POV' } },
  ];

  // Copy all area expressions to clipboard
  const handleCopyAllExpressions = () => {
    const lines = [
      language === 'en' 
        ? `【Taiwan Design Expo 2026 · Curated Stops Cultural Perspectives】`
        : `【2026 台灣設計展 · 專屬動線已造訪站點與文化觀點手記】`,
      language === 'en' 
        ? `Curator Persona: ${persona.name[language]} · MÖMÖ Mascot: ${avatarInfo.name[language]}`
        : `觀展角色：${persona.name[language]} · 桃桃化身：${avatarInfo.name[language]}`,
      `==================================================`,
    ];

    journey.exhibits.forEach((ex, idx) => {
      const exp = activeExpressions[ex.id];
      const isVisited = visitedExhibitIds.includes(ex.id) || savedInsightIds.includes(ex.id);
      lines.push(`\n[${idx + 1}] ${ex.code} ${ex.title[language]} (${ex.subFlowTheme[language]}) - ${isVisited ? '✓ 已造訪' : '○ 預定動線'}`);
      lines.push(`  官方核心策展觀點: "${ex.oneSentenceTakeaway[language]}"`);
      if (exp?.text) {
        lines.push(`  ✍️ 我的展區觀點 [${exp.tag || '心得'}]: "${exp.text}"`);
      } else {
        lines.push(`  ✍️ 我的展區觀點: (尚未記錄)`);
      }
    });

    lines.push(`\n==================================================`);
    lines.push(language === 'en' ? `Generated by Taiwan Design Expo 2026 Area 1 Digital Passport` : `2026 台灣設計展 青埔展區 Area 1 專屬數位護照生成`);

    navigator.clipboard.writeText(lines.join('\n'));
    setCopyAllToast(true);
    setTimeout(() => setCopyAllToast(false), 2500);
  };

  // Generate 9:16 Instagram Story PNG on HTML5 Canvas
  const handleDownloadStoryCard = () => {
    setDownloading(true);
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1920;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      setDownloading(false);
      return;
    }

    // Canvas Background: Vibrant Pink Expo Palette
    const bgGradient = ctx.createLinearGradient(0, 0, 1080, 1920);
    bgGradient.addColorStop(0, '#FFF5F8');
    bgGradient.addColorStop(0.3, '#FDF2F8');
    bgGradient.addColorStop(0.7, '#FCE7F3');
    bgGradient.addColorStop(1, '#FFE4EF');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, 1080, 1920);

    // Decorative Pink Header Banner
    const bannerGrad = ctx.createLinearGradient(0, 0, 1080, 0);
    bannerGrad.addColorStop(0, '#E4007F');
    bannerGrad.addColorStop(0.5, '#FF2D78');
    bannerGrad.addColorStop(1, '#FF65A3');
    ctx.fillStyle = bannerGrad;
    ctx.fillRect(0, 0, 1080, 180);

    // Expo Wordmark in Banner
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 44px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('TAIWAN DESIGN EXPO 2026', 540, 90);

    ctx.font = '28px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('青埔展區 AREA 1 · 桃園會展中心 MESSE TAOYUAN', 540, 140);

    // Decorative Card Container
    ctx.fillStyle = '#FFFFFF';
    ctx.shadowColor = 'rgba(228, 0, 127, 0.18)';
    ctx.shadowBlur = 40;
    ctx.shadowOffsetY = 15;
    ctx.roundRect ? ctx.roundRect(80, 230, 920, 1540, 40) : ctx.fillRect(80, 230, 920, 1540);
    ctx.fill();
    ctx.shadowColor = 'transparent';

    // Pink Card Border
    ctx.strokeStyle = '#FCE7F3';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Persona Archetype Pill
    ctx.fillStyle = '#FDF2F8';
    ctx.roundRect ? ctx.roundRect(340, 270, 400, 52, 26) : ctx.fillRect(340, 270, 400, 52);
    ctx.fill();
    ctx.strokeStyle = '#E4007F';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#E4007F';
    ctx.font = 'bold 24px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`OFFICIAL CURATOR PASSPORT`, 540, 305);

    // Persona Headline
    ctx.fillStyle = '#1C1917';
    ctx.font = 'bold 60px "Cormorant Garamond", Georgia, serif';
    ctx.fillText(persona.name[language], 540, 395);

    ctx.fillStyle = '#E4007F';
    ctx.font = 'bold 32px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`MÖMÖ · 桃桃: ${avatarInfo.name[language]}`, 540, 450);

    // Draw Momo Avatar Image (IKEA Manual Line-Art Edition)
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = ikeaMomoImg;
    img.onload = () => {
      // Pink glowing avatar ring
      ctx.save();
      ctx.beginPath();
      ctx.arc(540, 680, 170, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(img, 370, 510, 340, 340);
      ctx.restore();

      // Hot Pink Border Ring
      ctx.strokeStyle = '#E4007F';
      ctx.lineWidth = 10;
      ctx.beginPath();
      ctx.arc(540, 680, 170, 0, Math.PI * 2);
      ctx.stroke();

      // Archetype Badge Text
      ctx.fillStyle = '#4B5563';
      ctx.font = '26px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${avatarInfo.badgeText[language]}`, 540, 900);

      // Stat Counters Ribbon
      ctx.fillStyle = '#FFF5F8';
      ctx.roundRect ? ctx.roundRect(140, 940, 800, 100, 24) : ctx.fillRect(140, 940, 800, 100);
      ctx.fill();
      ctx.strokeStyle = '#FCE7F3';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#E4007F';
      ctx.font = 'bold 36px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${visitedCount} / ${journey.exhibits.length}`, 300, 1000);
      ctx.fillStyle = '#6B7280';
      ctx.font = '22px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('STOPS VISITED (已造訪)', 300, 1030);

      ctx.fillStyle = '#E4007F';
      ctx.font = 'bold 36px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(`${savedInsightIds.length}`, 740, 1000);
      ctx.fillStyle = '#6B7280';
      ctx.font = '22px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('INSIGHTS SAVED (已收錄)', 740, 1030);

      // Section Title: Curated Highlights
      ctx.fillStyle = '#E4007F';
      ctx.font = 'bold 28px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(`CULTURAL HIGHLIGHTS & KEY TAKEAWAYS`, 140, 1100);

      // List 3 top takeaways & user expressions
      let yPos = 1170;
      effectiveExhibits.slice(0, 3).forEach((ex, idx) => {
        // Number badge
        ctx.fillStyle = '#E4007F';
        ctx.beginPath();
        ctx.arc(170, yPos - 10, 22, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 22px "Plus Jakarta Sans", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`${idx + 1}`, 170, yPos - 2);

        // Title
        ctx.textAlign = 'left';
        ctx.fillStyle = '#111827';
        ctx.font = 'bold 30px "Plus Jakarta Sans", sans-serif';
        ctx.fillText(`${ex.code} ${ex.title[language]}`, 210, yPos);

        // User Expression or Curatorial Takeaway
        const userExp = activeExpressions[ex.id]?.text;
        if (userExp) {
          ctx.fillStyle = '#E4007F';
          ctx.font = 'bold italic 22px "Plus Jakarta Sans", sans-serif';
          ctx.fillText(`✍️ 我的觀點: "${userExp.substring(0, 32)}${userExp.length > 32 ? '...' : ''}"`, 210, yPos + 40);
        } else {
          ctx.fillStyle = '#4B5563';
          ctx.font = 'italic 24px "Plus Jakarta Sans", sans-serif';
          const takeawayStr = `"${ex.oneSentenceTakeaway[language].substring(0, 48)}..."`;
          ctx.fillText(takeawayStr, 210, yPos + 40);
        }

        yPos += 130;
      });

      // Bottom Barcode & Serial Number
      ctx.fillStyle = '#F3F4F6';
      ctx.fillRect(140, 1580, 800, 130);

      ctx.fillStyle = '#111827';
      ctx.font = 'bold 24px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('||| | ||||| || |||| ||| |||| | ||||| ||| || |', 540, 1630);
      ctx.font = '20px monospace';
      ctx.fillText('TYN-EXPO-2026-AREA1-CURATOR-PASS #38291', 540, 1670);

      // Footer
      ctx.textAlign = 'center';
      ctx.fillStyle = '#9CA3AF';
      ctx.font = '24px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('Share on Instagram Stories · #TaiwanDesignExpo #桃MOMO', 540, 1840);

      // Trigger download
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `Taiwan-Design-Expo-Recap-${journey.personaId}.png`;
      link.href = dataUrl;
      link.click();
      setDownloading(false);
    };

    img.onerror = () => {
      setDownloading(false);
    };
  };

  const handleShare = async () => {
    const textToShare = language === 'en'
      ? `I completed my Taiwan Design Expo curated journey at Area 1 (Messe Taoyuan)! My companion mascot is Tao MOMO (${avatarInfo.name.en}) with ${visitedCount} stops visited.`
      : `我在 2026 台灣設計展（青埔展區·桃園會展中心）解鎖了專屬動線！我的展覽化身是「${avatarInfo.name.zh}」，已探索 ${visitedCount} 個展位。`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Taiwan Design Expo 2026 · 專屬旅程回顧',
          text: textToShare,
          url: window.location.href,
        });
      } catch {
        navigator.clipboard.writeText(textToShare);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } else {
      navigator.clipboard.writeText(textToShare);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen pb-24 pt-4 px-4 max-w-xl mx-auto w-full space-y-6">
      {/* Top Editorial Nav Strip */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToDashboard}
          className="min-h-[44px] px-3 text-xs font-semibold text-stone-700 hover:text-[#E4007F] transition-colors flex items-center gap-1.5 cursor-pointer bg-white/70 hover:bg-pink-50 border border-pink-200/60 rounded-xl"
        >
          <ArrowLeft className="w-4 h-4 text-[#E4007F]" />
          <span>{language === 'en' ? 'Back to Journey Route' : '返回篇章動線'}</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Ambient Soundscape Toggle */}
          <button
            onClick={() => {
              if (activeTab !== 'soundscape') {
                setActiveTab('soundscape');
                if (!expoSoundscape.isPlaying()) {
                  expoSoundscape.start();
                }
              } else {
                if (expoSoundscape.isPlaying()) {
                  expoSoundscape.stop();
                } else {
                  expoSoundscape.start();
                }
              }
            }}
            className={`min-h-[44px] px-3 text-xs font-medium rounded-xl border transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'soundscape'
                ? 'bg-[#E4007F] text-white border-[#E4007F] shadow-sm shadow-pink-300'
                : 'bg-white/80 text-stone-700 border-pink-200 hover:bg-pink-50'
            }`}
            title={language === 'en' ? 'Immersive Exhibition Soundscape' : '展場沉浸聲景'}
          >
            <Volume2 className={`w-3.5 h-3.5 ${activeTab === 'soundscape' ? 'animate-pulse' : ''}`} />
            <span className="hidden xs:inline">
              {language === 'en' ? 'Soundscape' : '展場聲景'}
            </span>
          </button>

          <button
            onClick={onRestartJourney}
            className="min-h-[44px] px-3 text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors flex items-center gap-1.5 cursor-pointer bg-white/80 border border-stone-200 rounded-xl"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">{language === 'en' ? 'New Journey' : '重新策展'}</span>
          </button>
        </div>
      </div>

      {/* Main Title & Editorial Header with Pink Theme */}
      <div className="space-y-1.5 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100/70 border border-pink-200 text-[#E4007F] text-xs font-bold tracking-wider uppercase">
          <Sparkles className="w-3.5 h-3.5 text-[#E4007F]" />
          <span>{language === 'en' ? 'Personal Exhibition Souvenir Passport' : '青埔展區 Area 1 · 數位紀念護照'}</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900">
          {language === 'en'
            ? 'Your Taoyuan Design Expo Journey Recap'
            : '你的台灣設計展專屬旅程回顧'}
        </h1>

        <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed">
          {language === 'en'
            ? 'An immersive synthesis of your cultural resonances, memory stamps, and companion mascot Tao MOMO.'
            : '凝結你在桃園會展中心的每一次驚喜共鳴、展位打卡章印與專屬化身 桃 MOMO。'}
        </p>
      </div>

      {/* ======================================================== */}
      {/* THE OFFICIAL CHARACTER: MÖMÖ · 桃桃 (IKEA STYLE MANUAL)   */}
      {/* ======================================================== */}
      <section className="relative rounded-3xl border-2 border-stone-800 bg-[#FFFDF9] shadow-[5px_5px_0px_#1C1917] overflow-hidden transition-all">
        {/* Top IKEA Manual Style Blueprint Header Bar */}
        <div className="bg-stone-900 text-white px-4 py-2 flex items-center justify-between border-b-2 border-stone-800 flex-wrap gap-2 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="bg-[#E4007F] text-white px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase">
              IKEA MANUAL
            </span>
            <span className="font-bold tracking-wider text-stone-100">
              MÖMÖ · SAMLINGSGUIDE
            </span>
            <span className="text-stone-400 hidden xs:inline">
              · 桃桃觀展組立指南
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-stone-400">
            <span>ART.NR: 2026.09.24</span>
            <span className="text-pink-400">·</span>
            <span>14 DELAR (STOPS)</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-5">
            {/* Mascot Visual Display with Mode Switcher */}
            <div className="flex flex-col items-center gap-2 shrink-0">
              <div 
                onClick={() => {
                  playMomoChime();
                  setCharacterMood(prev => prev === 'inspired' ? 'tectonic' : prev === 'tectonic' ? 'playful' : prev === 'playful' ? 'rooted' : 'inspired');
                }}
                className="group relative cursor-pointer"
                title={language === 'en' ? 'Click Momo to switch mood & hear chime!' : '點擊 MÖMÖ 聽風鈴聲與切換手持工具！'}
              >
                {/* Clean IKEA Framed Box */}
                <div className="w-36 h-36 rounded-2xl border-2 border-stone-800 bg-white p-2 flex items-center justify-center shadow-[3px_3px_0px_#1C1917] group-hover:shadow-[4px_4px_0px_#E4007F] group-hover:-translate-y-0.5 transition-all">
                  {mascotVisualMode === 'vector' ? (
                    <IkeaMomoCharacter
                      mood={characterMood}
                      size="md"
                      className="w-full h-full"
                    />
                  ) : (
                    <img
                      src={ikeaMomoImg}
                      alt="IKEA Style MÖMÖ Mascot"
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>

                {/* Click hint badge */}
                <div className="absolute -bottom-2 -right-2 bg-[#E4007F] text-white p-1.5 rounded-full border-2 border-stone-800 shadow-sm group-hover:scale-110 transition-transform">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Visual Mode Toggle: Vector vs Manual Image */}
              <div className="inline-flex rounded-lg border border-stone-300 p-0.5 bg-stone-100 text-[11px] font-mono">
                <button
                  type="button"
                  onClick={() => setMascotVisualMode('vector')}
                  className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
                    mascotVisualMode === 'vector'
                      ? 'bg-stone-900 text-white font-bold'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {language === 'en' ? 'Vector' : '向量互動'}
                </button>
                <button
                  type="button"
                  onClick={() => setMascotVisualMode('manual')}
                  className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
                    mascotVisualMode === 'manual'
                      ? 'bg-stone-900 text-white font-bold'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {language === 'en' ? 'Manual Art' : '手冊插畫'}
                </button>
              </div>
            </div>

            {/* Mascot Interactive Speech Bubble & Assembly Instructions */}
            <div className="flex-1 min-w-0 space-y-3 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded bg-stone-900 text-white text-[11px] font-mono font-bold">
                  MODELL: MÖMÖ-2026
                </span>
                <span className="font-serif text-lg font-bold text-stone-900">
                  {avatarInfo.name[language]}
                </span>
                <span className="text-xs text-stone-500 font-mono hidden xs:inline">
                  · {avatarInfo.archetype[language]}
                </span>
              </div>

              {/* IKEA Instruction Speech Box with Monoline Border */}
              <div className="relative p-3.5 rounded-xl bg-white border-2 border-stone-800 shadow-[2px_2px_0px_#1C1917] text-xs text-stone-800 leading-relaxed font-sans">
                <p className="font-medium">
                  {moodDialogues[characterMood][language]}
                </p>
                <div className="text-[10px] text-[#E4007F] font-mono font-bold pt-1.5 flex items-center justify-center sm:justify-start gap-1">
                  <span>KLICK!</span>
                  <span className="text-stone-500 font-normal">
                    {language === 'en' ? 'Tap Momo above to hear special chime & change tools!' : '點擊上方 MÖMÖ 聽專屬風鈴聲與切換工具！'}
                  </span>
                </div>
              </div>

              {/* Mood selector buttons (IKEA Style) */}
              <div className="flex items-center justify-center sm:justify-start gap-1.5 flex-wrap pt-0.5">
                {(['inspired', 'tectonic', 'playful', 'rooted'] as const).map(m => (
                  <button
                    key={m}
                    onClick={() => {
                      setCharacterMood(m);
                      playMomoChime();
                    }}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all cursor-pointer border ${
                      characterMood === m
                        ? 'bg-[#E4007F] text-white border-stone-900 font-bold shadow-[2px_2px_0px_#1C1917]'
                        : 'bg-white hover:bg-pink-50 text-stone-700 border-stone-300'
                    }`}
                  >
                    {m === 'inspired' ? '🌸 靈感漫遊' : m === 'tectonic' ? '🔧 六角板手' : m === 'playful' ? '🎈 彩光童心' : '🍵 千塘風土'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* IKEA 3-Step Assembly Guide Strip */}
          <div className="pt-3 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
            <div className="p-2.5 rounded-xl bg-stone-100/80 border border-stone-200 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-stone-900 text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                1
              </span>
              <div className="min-w-0">
                <div className="font-bold text-stone-900">PLANERA · 規劃</div>
                <div className="text-[10px] text-stone-500 truncate">循 14 展位專屬動線</div>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-stone-100/80 border border-stone-200 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-stone-900 text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                2
              </span>
              <div className="min-w-0">
                <div className="font-bold text-stone-900">MONTERA · 組裝</div>
                <div className="text-[10px] text-stone-500 truncate">六角板手鎖定核心洞見</div>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-pink-100/70 border border-pink-300 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#E4007F] text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                3
              </span>
              <div className="min-w-0">
                <div className="font-bold text-[#E4007F]">NJUT · 匯出</div>
                <div className="text-[10px] text-stone-600 truncate">領取全息護照卡</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4 IMMERSIVE SOUVENIR TABS: Card / Radar / Photos / Sound */}
      {/* ======================================================== */}
      <div className="grid grid-cols-4 gap-1.5 p-1.5 bg-pink-100/60 rounded-2xl border border-pink-200/70">
        <button
          onClick={() => setActiveTab('card')}
          className={`min-h-[44px] px-2 py-1.5 text-xs font-semibold rounded-xl transition-all flex flex-col sm:flex-row items-center justify-center gap-1 cursor-pointer ${
            activeTab === 'card'
              ? 'bg-gradient-to-r from-[#E4007F] to-[#FF2D78] text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-white/60'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span className="truncate">{language === 'en' ? 'Card' : '全息票卡'}</span>
        </button>

        <button
          onClick={() => setActiveTab('radar')}
          className={`min-h-[44px] px-2 py-1.5 text-xs font-semibold rounded-xl transition-all flex flex-col sm:flex-row items-center justify-center gap-1 cursor-pointer ${
            activeTab === 'radar'
              ? 'bg-gradient-to-r from-[#E4007F] to-[#FF2D78] text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-white/60'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span className="truncate">{language === 'en' ? 'Radar' : '性格雷達'}</span>
        </button>

        <button
          onClick={() => setActiveTab('photos')}
          className={`min-h-[44px] px-2 py-1.5 text-xs font-semibold rounded-xl transition-all flex flex-col sm:flex-row items-center justify-center gap-1 cursor-pointer ${
            activeTab === 'photos'
              ? 'bg-gradient-to-r from-[#E4007F] to-[#FF2D78] text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-white/60'
          }`}
        >
          <Camera className="w-3.5 h-3.5" />
          <span className="truncate">{language === 'en' ? 'Photos' : '記憶膠囊'}</span>
        </button>

        <button
          onClick={() => setActiveTab('soundscape')}
          className={`min-h-[44px] px-2 py-1.5 text-xs font-semibold rounded-xl transition-all flex flex-col sm:flex-row items-center justify-center gap-1 cursor-pointer ${
            activeTab === 'soundscape'
              ? 'bg-gradient-to-r from-[#E4007F] to-[#FF2D78] text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-white/60'
          }`}
        >
          <Radio className="w-3.5 h-3.5" />
          <span className="truncate">{language === 'en' ? 'Sound' : '展場聲景'}</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* TAB 1: 🎴 HOLOGRAPHIC 3D COLLECTOR CARD                  */}
      {/* ======================================================== */}
      {activeTab === 'card' && (
        <div className="space-y-5 animate-in fade-in duration-200">
          <div className="holographic-card rounded-3xl p-6 sm:p-7 shadow-xl space-y-6">
            {/* Top Pass Ribbon */}
            <div className="flex items-center justify-between border-b border-pink-200/80 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E4007F] shadow-[0_0_8px_rgba(228,0,127,0.7)] animate-pulse" />
                <span className="text-xs font-bold tracking-wider text-stone-900 uppercase">
                  TAIWAN DESIGN EXPO 2026
                </span>
              </div>

              <div className="text-[11px] font-mono font-bold text-[#E4007F] bg-pink-100/80 px-2 py-0.5 rounded">
                AREA 1 · MESSE TAOYUAN
              </div>
            </div>

            {/* Character & Visitor Persona Synthesis */}
            <div className="text-center space-y-3">
              <div className="relative w-36 h-36 mx-auto rounded-full p-1 bg-gradient-to-tr from-[#E4007F] via-[#FF2D78] to-[#FF65A3] shadow-md">
                <div className="w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center p-1">
                  <img
                    src={ikeaMomoImg}
                    alt={avatarInfo.name[language]}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-[#E4007F] text-white p-2 rounded-full shadow-md">
                  <Sparkles className="w-4 h-4" />
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-[#E4007F] tracking-wider uppercase">
                  {avatarInfo.archetype[language]}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                  {persona.name[language]} · {avatarInfo.name[language]}
                </h2>
                <p className="text-xs text-stone-600 max-w-sm mx-auto mt-1 leading-relaxed">
                  {avatarInfo.description[language]}
                </p>
              </div>

              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#E4007F] bg-pink-50 border border-pink-200 px-3 py-1 rounded-full">
                <span>{avatarInfo.badgeText[language]}</span>
              </div>
            </div>

            {/* Cultural Insights, Visited Counter & Area Expressions Editor */}
            <div className="bg-white/90 rounded-3xl p-5 sm:p-6 border border-pink-200/90 shadow-sm space-y-4">
              {/* Header Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-pink-100">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E4007F] animate-pulse" />
                    <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-[#E4007F]" />
                      <span>{language === 'en' ? 'Curated Stops & Cultural Perspectives' : '專屬動線已造訪站點與文化觀點'}</span>
                    </h3>
                  </div>
                  <p className="text-xs text-stone-500">
                    {language === 'en' 
                      ? 'Every part (A1, A2, etc.) is open for you to write what you want to express in that area.'
                      : '各展區（A1、A2 等）皆可自由書寫你的文化觀點、心得感悟或想對策展人表達的話。'}
                  </p>
                </div>

                {/* Counters */}
                <div className="flex items-center gap-2 shrink-0">
                  <div className="text-xs font-mono font-bold text-[#E4007F] bg-pink-50 border border-pink-200 px-2.5 py-1 rounded-full flex items-center gap-1">
                    <PenLine className="w-3 h-3" />
                    <span>{expressedCount} / {journey.exhibits.length} {language === 'en' ? 'Expressed' : '站已留觀點'}</span>
                  </div>
                  <div className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Check className="w-3 h-3 stroke-[3]" />
                    <span>{visitedCount} / {journey.exhibits.length} {language === 'en' ? 'Visited' : '站已造訪'}</span>
                  </div>
                </div>
              </div>

              {/* Filter Tabs & Copy All Notes Action Bar */}
              <div className="flex items-center justify-between gap-2 flex-wrap pt-1">
                <div className="flex items-center gap-1.5 p-1 bg-pink-50/70 border border-pink-200/80 rounded-xl">
                  <button
                    onClick={() => setStopsFilter('all')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      stopsFilter === 'all'
                        ? 'bg-[#E4007F] text-white font-bold shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {language === 'en' ? `All Parts (${journey.exhibits.length})` : `全部站點 (${journey.exhibits.length})`}
                  </button>
                  <button
                    onClick={() => setStopsFilter('expressed')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1 ${
                      stopsFilter === 'expressed'
                        ? 'bg-[#E4007F] text-white font-bold shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    <PenLine className="w-3 h-3" />
                    <span>{language === 'en' ? `Expressed (${expressedCount})` : `已寫觀點 (${expressedCount})`}</span>
                  </button>
                  <button
                    onClick={() => setStopsFilter('visited')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1 ${
                      stopsFilter === 'visited'
                        ? 'bg-[#E4007F] text-white font-bold shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    <Check className="w-3 h-3 stroke-[3]" />
                    <span>{language === 'en' ? `Visited (${visitedCount})` : `已造訪 (${visitedCount})`}</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyAllExpressions}
                    className="px-3 py-1.5 rounded-xl border border-pink-200 bg-white hover:bg-pink-50 text-stone-700 hover:text-[#E4007F] text-xs font-medium transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
                    title={language === 'en' ? 'Export all your notes' : '匯出複製全部筆記'}
                  >
                    {copyAllToast ? <CheckCheck className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#E4007F]" />}
                    <span>{copyAllToast ? (language === 'en' ? 'Copied to Clipboard!' : '已複製全展區手記！') : (language === 'en' ? 'Copy All Notes' : '複製全部展區筆記')}</span>
                  </button>
                </div>
              </div>

              {/* List of Area Stops with Expression Editors */}
              <div className="space-y-3 pt-1">
                {(() => {
                  const filtered = journey.exhibits.filter(ex => {
                    if (stopsFilter === 'expressed') {
                      return Boolean(activeExpressions[ex.id]?.text?.trim());
                    }
                    if (stopsFilter === 'visited') {
                      return visitedExhibitIds.includes(ex.id) || savedInsightIds.includes(ex.id);
                    }
                    return true;
                  });

                  if (filtered.length === 0) {
                    return (
                      <div className="p-8 text-center bg-pink-50/30 rounded-2xl border border-dashed border-pink-200 space-y-2">
                        <p className="text-xs text-stone-500">
                          {stopsFilter === 'expressed'
                            ? (language === 'en' ? 'No area expressions written yet. Click on any stop in "All Parts" to write!' : '尚未撰寫任何展區觀點。切換至「全部站點」即可自由書寫！')
                            : (language === 'en' ? 'No visited stops in this filter yet.' : '此篩選條件下尚無展點。')}
                        </p>
                        <button
                          onClick={() => setStopsFilter('all')}
                          className="text-xs font-bold text-[#E4007F] underline underline-offset-4 cursor-pointer"
                        >
                          {language === 'en' ? 'View All Parts' : '查看全部展區站點'}
                        </button>
                      </div>
                    );
                  }

                  return filtered.map((ex, i) => {
                    const isSaved = savedInsightIds.includes(ex.id);
                    const isVisited = visitedExhibitIds.includes(ex.id) || isSaved;
                    return (
                      <AreaExpressionItem
                        key={ex.id}
                        exhibit={ex}
                        index={i}
                        language={language}
                        isVisited={isVisited}
                        isSaved={isSaved}
                        expression={activeExpressions[ex.id]}
                        onSaveExpression={handleSaveExp}
                        onDeleteExpression={handleDeleteExp}
                        onToggleVisited={onToggleVisited}
                        defaultExpanded={ex.id === 'exhibit_a1' && !activeExpressions[ex.id]}
                      />
                    );
                  });
                })()}
              </div>

              {/* Bottom Notice */}
              <div className="pt-2 text-center text-[11px] text-stone-400 flex items-center justify-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#E4007F]" />
                <span>
                  {language === 'en' 
                    ? 'All written expressions are dynamically embedded into your souvenir Instagram Story card.'
                    : '你在各展區書寫的心得與觀點，將即時印製於專屬 9:16 IG 限動紀念圖卡中。'}
                </span>
              </div>
            </div>

            {/* Collector Barcode & Ticket Number */}
            <div className="pt-2 border-t border-pink-200/80 flex items-center justify-between text-xs text-stone-500 font-mono">
              <div>
                <span className="text-[10px] block text-stone-400">PASSPORT SERIAL</span>
                <span className="font-bold text-stone-800">TYN-2026-AREA1-{journey.personaId.toUpperCase()}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] block text-stone-400">DATE VALIDITY</span>
                <span className="font-bold text-[#E4007F]">09/24 - 10/11</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: 🧭 CULTURAL SENSORY RADAR                         */}
      {/* ======================================================== */}
      {activeTab === 'radar' && (
        <div className="bg-white rounded-3xl border border-pink-200 p-6 shadow-xl space-y-6 animate-in fade-in duration-200">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold text-[#E4007F] uppercase tracking-wider">
              {language === 'en' ? 'Cultural Sensory Radar' : '文化性格五感雷達分析'}
            </span>
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              {language === 'en' ? 'Your Taoyuan Confluence Traits' : '你的展覽共鳴幾何圖譜'}
            </h2>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              {language === 'en'
                ? 'Calculated dynamically from your visited pavilions and saved cultural insights.'
                : '根據你在青埔展區所造訪的展點與收錄觀點，即時演算生成的五維度設計心靈圖譜。'}
            </p>
          </div>

          {/* SVG Radar Chart (Pentagon) */}
          <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
            <svg viewBox="0 0 300 300" className="w-full h-full overflow-visible">
              {/* Concentric pentagons */}
              {[0.25, 0.5, 0.75, 1].map((scale, i) => {
                const r = 100 * scale;
                const points = [0, 1, 2, 3, 4].map(idx => {
                  const angle = (Math.PI * 2 / 5) * idx - Math.PI / 2;
                  return `${150 + r * Math.cos(angle)},${150 + r * Math.sin(angle)}`;
                }).join(' ');
                return (
                  <polygon
                    key={i}
                    points={points}
                    fill={i === 3 ? '#FFF5F8' : 'none'}
                    stroke="#FCE7F3"
                    strokeWidth="1.5"
                  />
                );
              })}

              {/* Axis lines */}
              {[0, 1, 2, 3, 4].map(idx => {
                const angle = (Math.PI * 2 / 5) * idx - Math.PI / 2;
                const x2 = 150 + 100 * Math.cos(angle);
                const y2 = 150 + 100 * Math.sin(angle);
                return (
                  <line
                    key={idx}
                    x1="150"
                    y1="150"
                    x2={x2}
                    y2={y2}
                    stroke="#FBCFE8"
                    strokeWidth="1"
                  />
                );
              })}

              {/* Data Polygon */}
              {(() => {
                const values = [
                  radarScores.flow / 100,
                  radarScores.tectonics / 100,
                  radarScores.market / 100,
                  radarScores.smart / 100,
                  radarScores.global / 100,
                ];
                const points = values.map((val, idx) => {
                  const r = 100 * val;
                  const angle = (Math.PI * 2 / 5) * idx - Math.PI / 2;
                  return `${150 + r * Math.cos(angle)},${150 + r * Math.sin(angle)}`;
                }).join(' ');

                return (
                  <>
                    <polygon
                      points={points}
                      fill="rgba(228, 0, 127, 0.25)"
                      stroke="#E4007F"
                      strokeWidth="2.5"
                    />
                    {values.map((val, idx) => {
                      const r = 100 * val;
                      const angle = (Math.PI * 2 / 5) * idx - Math.PI / 2;
                      const cx = 150 + r * Math.cos(angle);
                      const cy = 150 + r * Math.sin(angle);
                      return (
                        <circle
                          key={idx}
                          cx={cx}
                          cy={cy}
                          r="4"
                          fill="#E4007F"
                          stroke="#FFFFFF"
                          strokeWidth="2"
                        />
                      );
                    })}
                  </>
                );
              })()}

              {/* Axis Labels */}
              <text x="150" y="32" textAnchor="middle" className="text-[11px] font-bold fill-[#E4007F]">水文流動 (Flow)</text>
              <text x="270" y="125" textAnchor="start" className="text-[11px] font-bold fill-stone-700">構造物性 (Tectonics)</text>
              <text x="220" y="275" textAnchor="start" className="text-[11px] font-bold fill-stone-700">常民市集 (Market)</text>
              <text x="80" y="275" textAnchor="end" className="text-[11px] font-bold fill-stone-700">智慧前瞻 (Smart)</text>
              <text x="30" y="125" textAnchor="end" className="text-[11px] font-bold fill-stone-700">國際對話 (Global)</text>
            </svg>
          </div>

          {/* Breakdown description cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
            <div className="p-3 rounded-xl bg-pink-50/60 border border-pink-200/80 text-center">
              <span className="font-mono text-xs font-bold text-[#E4007F] block">{radarScores.flow}%</span>
              <span className="text-[11px] text-stone-700 font-medium">水文流動感知</span>
            </div>
            <div className="p-3 rounded-xl bg-pink-50/60 border border-pink-200/80 text-center">
              <span className="font-mono text-xs font-bold text-[#E4007F] block">{radarScores.tectonics}%</span>
              <span className="text-[11px] text-stone-700 font-medium">構造物性美學</span>
            </div>
            <div className="p-3 rounded-xl bg-pink-50/60 border border-pink-200/80 text-center">
              <span className="font-mono text-xs font-bold text-[#E4007F] block">{radarScores.market}%</span>
              <span className="text-[11px] text-stone-700 font-medium">常民市集共鳴</span>
            </div>
            <div className="p-3 rounded-xl bg-pink-50/60 border border-pink-200/80 text-center">
              <span className="font-mono text-xs font-bold text-[#E4007F] block">{radarScores.smart}%</span>
              <span className="text-[11px] text-stone-700 font-medium">智慧演算前瞻</span>
            </div>
            <div className="p-3 rounded-xl bg-pink-50/60 border border-pink-200/80 text-center">
              <span className="font-mono text-xs font-bold text-[#E4007F] block">{radarScores.global}%</span>
              <span className="text-[11px] text-stone-700 font-medium">國際視角對話</span>
            </div>
            <div className="p-3 rounded-xl bg-gradient-to-tr from-[#E4007F] to-[#FF2D78] text-white text-center flex flex-col justify-center">
              <span className="font-mono text-xs font-bold block">{avatarInfo.name.zh}</span>
              <span className="text-[10px] text-pink-100">核心設計化身</span>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: 📸 EXHIBITION MEMORY PHOTOWALL & PASSPORT STAMPS */}
      {/* ======================================================== */}
      {activeTab === 'photos' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-pink-200 p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  {language === 'en' ? 'Exhibition Polaroid Memories' : '展場時光記憶膠囊'}
                </h3>
                <p className="text-xs text-stone-500">
                  {language === 'en' ? 'Captured moments with official verification seals' : '蓋上 2026 台灣設計展官方認證鋼印紀念'}
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-[#E4007F] bg-pink-50 px-2.5 py-1 rounded-full border border-pink-200">
                {galleryItems.length} Moments
              </span>
            </div>

            {/* Photowall Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              {galleryItems.map((item, idx) => {
                const isVisited = visitedExhibitIds.some(id => id.includes(item.code.toLowerCase()));
                return (
                  <div
                    key={idx}
                    className="group relative bg-stone-50 p-2.5 rounded-2xl border border-stone-200 hover:border-pink-300 transition-all shadow-xs"
                  >
                    {/* Photo with aspect 16:9 */}
                    <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-stone-200">
                      <img
                        src={item.img}
                        alt={item.title[language]}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 left-2 bg-black/60 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-xs">
                        {item.code} · {item.tag[language]}
                      </div>

                      {/* Official Red Expo Stamp Seal Overlay */}
                      <div className="absolute bottom-2 right-2 border-2 border-rose-600/90 text-rose-600 bg-white/90 px-2 py-0.5 rounded-md font-mono text-[9px] font-bold uppercase tracking-wider rotate-[-6deg] shadow-xs">
                        ★ TAOYUAN 2026 印
                      </div>
                    </div>

                    <div className="pt-2 px-1 flex items-center justify-between">
                      <span className="font-serif text-sm font-bold text-stone-900">
                        {item.code} {item.title[language]}
                      </span>
                      <span className="text-[11px] text-[#E4007F] font-mono font-medium">
                        09/24-10/11
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 4: 🎧 TAOYUAN AMBIENT SOUNDSCAPE                     */}
      {/* ======================================================== */}
      {activeTab === 'soundscape' && (
        <SoundscapePlayerCard language={language} />
      )}

      {/* ======================================================== */}
      {/* ACTION CONTROLS: Download PNG / Share / Print            */}
      {/* ======================================================== */}
      <div className="space-y-3 pt-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {/* Instagram Story Download */}
          <button
            onClick={handleDownloadStoryCard}
            disabled={downloading}
            className="min-h-[48px] px-4 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#E4007F] via-[#FF2D78] to-[#FF65A3] hover:from-[#C9006F] hover:to-[#E4007F] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-pink-400/40 active:scale-[0.98]"
          >
            <Download className="w-4 h-4" />
            <span>
              {downloading
                ? (language === 'en' ? 'Generating 9:16 Story...' : '生成限動圖卡中...')
                : (language === 'en' ? 'Save 9:16 Story Card (PNG)' : '下載 9:16 限動圖卡 (PNG)')}
            </span>
          </button>

          {/* Social Share / Copy Link */}
          <button
            onClick={handleShare}
            className="min-h-[48px] px-4 py-3 rounded-xl font-semibold text-sm text-stone-800 bg-white hover:bg-pink-50 border border-pink-200/80 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] shadow-xs"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700 font-bold">{language === 'en' ? 'Copied to Clipboard' : '已複製分享文字'}</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-[#E4007F]" />
                <span>{language === 'en' ? 'Share Story Link' : '分享至社群平台'}</span>
              </>
            )}
          </button>
        </div>

        {/* Print Souvenir Option */}
        <div className="flex items-center justify-center gap-4 text-xs text-stone-500 pt-1">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1 hover:text-[#E4007F] transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Print Physical Souvenir Pass' : '列印紙本紀念護照'}</span>
          </button>

          <span>·</span>

          <span className="font-mono text-stone-400">
            Taiwan Design Expo 2026 · Taoyuan Flow
          </span>
        </div>
      </div>
    </div>
  );
};
