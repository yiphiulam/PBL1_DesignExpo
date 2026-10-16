import React, { useRef, useState, useEffect } from 'react';
import { CuratedJourney, Language, PersonaId } from '../types/expo';
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
  QrCode
} from 'lucide-react';

// Pre-bundled high quality Expo imagery
import flowmomoImg from '../assets/images/flowmomo_character_1791790478962.jpg';
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
  onBackToDashboard: () => void;
  onRestartJourney: () => void;
}

type SouvenirTab = 'card' | 'radar' | 'photos' | 'soundscape';

export const PostVisitScreen: React.FC<PostVisitScreenProps> = ({
  journey,
  language,
  savedInsightIds,
  visitedExhibitIds = [],
  onBackToDashboard,
  onRestartJourney,
}) => {
  const [activeTab, setActiveTab] = useState<SouvenirTab>('card');
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [characterMood, setCharacterMood] = useState<'inspired' | 'tectonic' | 'playful' | 'rooted' | 'global'>('inspired');
  const [isPlayingAmbience, setIsPlayingAmbience] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorNodesRef = useRef<OscillatorNode[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);

  const persona = PERSONAS.find(p => p.id === journey.personaId) || PERSONAS[0];
  const avatarInfo = FLOWMOMO_AVATARS[journey.personaId] || FLOWMOMO_AVATARS.first_timer;

  // Exhibits with saved insights or visited
  const visitedCount = journey.exhibits.filter(ex => visitedExhibitIds.includes(ex.id)).length;
  const unlockedExhibits = journey.exhibits.filter(ex => savedInsightIds.includes(ex.id) || visitedExhibitIds.includes(ex.id));
  const effectiveExhibits = unlockedExhibits.length > 0 ? unlockedExhibits : journey.exhibits.slice(0, 3);

  // Play synthesized melodic sparkle sound on character click
  const playMomoChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
        gain.gain.setValueAtTime(0.001, ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.08 + 0.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + idx * 0.08 + 0.6);
      });
    } catch {
      // Audio context restricted or muted
    }
  };

  // Ambient soundscape synthesis using Web Audio API
  const toggleAmbientSoundscape = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;

      if (isPlayingAmbience) {
        // Stop
        oscillatorNodesRef.current.forEach(osc => {
          try { osc.stop(); } catch {}
        });
        oscillatorNodesRef.current = [];
        if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
          audioContextRef.current.close();
        }
        audioContextRef.current = null;
        setIsPlayingAmbience(false);
      } else {
        // Start peaceful water / expo chime ambience
        const ctx = new AudioCtx();
        audioContextRef.current = ctx;
        const mainGain = ctx.createGain();
        mainGain.gain.setValueAtTime(0.08, ctx.currentTime);
        mainGain.connect(ctx.destination);
        gainNodeRef.current = mainGain;

        const chordFreqs = [220, 277.18, 329.63, 440, 554.37];
        const newOscs: OscillatorNode[] = [];

        chordFreqs.forEach((f, i) => {
          const osc = ctx.createOscillator();
          const pannerGain = ctx.createGain();
          osc.type = i % 2 === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(f, ctx.currentTime);

          // Subtle LFO modulation
          const lfo = ctx.createOscillator();
          const lfoGain = ctx.createGain();
          lfo.frequency.setValueAtTime(0.2 + i * 0.1, ctx.currentTime);
          lfoGain.gain.setValueAtTime(1.5, ctx.currentTime);
          lfo.connect(osc.frequency);
          lfo.start();

          pannerGain.gain.setValueAtTime(0.12 / chordFreqs.length, ctx.currentTime);
          osc.connect(pannerGain);
          pannerGain.connect(mainGain);
          osc.start();
          newOscs.push(osc);
        });

        oscillatorNodesRef.current = newOscs;
        setIsPlayingAmbience(true);
      }
    } catch {
      setIsPlayingAmbience(false);
    }
  };

  // Clean up sound on unmount
  useEffect(() => {
    return () => {
      try {
        oscillatorNodesRef.current.forEach(o => {
          try { o.stop(); } catch {}
        });
        if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
          audioContextRef.current.close();
        }
      } catch {}
    };
  }, []);

  // Character quotes by mood
  const moodDialogues = {
    inspired: {
      zh: '「嗨！我是桃 Momo！✨ 謝謝你今天與我在青埔展區漫步。我為你整理了這次專屬的觀展記憶卡與文化靈感護照，快來探索你的專屬設計師性格吧！」',
      en: '“Hi! I’m Tao Momo! ✨ Thank you for strolling through Area 1 with me today. Here is your personalized souvenir card and cultural radar—discover your unique designer archetype!”'
    },
    tectonic: {
      zh: '「在 A1 的大跨距木構與 A6 循環材料中，我感受到了造物者的嚴謹與溫度！你所記錄的每一個構造細節，都是未來城市的基石。」',
      en: '“Between A1 timber arches and A6 circular material loops, I felt the rigor and warmth of makers! Every structural insight you recorded builds tomorrow’s city.”'
    },
    playful: {
      zh: '「走過 A3 彩光天橋時，光影在地面跳舞的樣子太美了！希望這份數位紀念卡能為你的生活注入滿滿的色彩與童心！」',
      en: '“Walking across A3 Rainbow Bridge as light danced across the walkway was pure magic! May this souvenir infuse your life with playful color!”'
    },
    rooted: {
      zh: '「桃園不只是機場大門，更是千座埤塘滋養的故土。在 A10 的水文與 A7 的市集中，我們一起聽見了這座城市最深的心跳。」',
      en: '“Taoyuan is not just airport runways, but a home nourished by a thousand ponds. In A10’s waters and A7’s market, we heard the city’s deepest heartbeat.”'
    },
    global: {
      zh: '「在 A13 #桃園POV 裡，全世界頂尖設計師為這座城市寫下情書。帶著這些跨文化視野，我們都是流動中的世界公民！」',
      en: '“In A13 #TaoyuanPOV, international designers wrote love letters to Taoyuan. With these global perspectives, we are all citizens of flow!”'
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
    ctx.fillText(`FLOWMOMO: ${avatarInfo.name[language]}`, 540, 450);

    // Draw Momo Avatar Image
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = flowmomoImg;
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

      // List 3 top takeaways
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

        // One-sentence Takeaway
        ctx.fillStyle = '#4B5563';
        ctx.font = 'italic 24px "Plus Jakarta Sans", sans-serif';
        const takeawayStr = `"${ex.oneSentenceTakeaway[language].substring(0, 48)}..."`;
        ctx.fillText(takeawayStr, 210, yPos + 40);

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
            onClick={toggleAmbientSoundscape}
            className={`min-h-[44px] px-3 text-xs font-medium rounded-xl border transition-all flex items-center gap-1.5 cursor-pointer ${
              isPlayingAmbience
                ? 'bg-[#E4007F] text-white border-[#E4007F] shadow-sm shadow-pink-300'
                : 'bg-white/80 text-stone-700 border-pink-200 hover:bg-pink-50'
            }`}
            title={isPlayingAmbience ? 'Pause ambient exhibition sound' : 'Play ambient exhibition sound'}
          >
            {isPlayingAmbience ? <Volume2 className="w-3.5 h-3.5 animate-pulse" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden xs:inline">
              {isPlayingAmbience 
                ? (language === 'en' ? 'Ambience Playing' : '展場聲景播放中')
                : (language === 'en' ? 'Soundscape' : '展場聲景')}
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
      {/* THE OFFICIAL CHARACTER: 桃 MOMO (FLOWMOMO) LIVING MASCOT */}
      {/* ======================================================== */}
      <section className="relative rounded-3xl p-5 border border-pink-200/90 shadow-lg bg-gradient-to-b from-white via-pink-50/50 to-pink-100/40 overflow-hidden">
        {/* Soft pink blurred background glows */}
        <div className="absolute top-0 right-0 w-44 h-44 bg-pink-300/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-rose-200/30 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-5">
          {/* Animated Mascot Portrait with Hot Pink Aura */}
          <div 
            onClick={() => {
              playMomoChime();
              setCharacterMood(prev => prev === 'inspired' ? 'tectonic' : prev === 'tectonic' ? 'playful' : prev === 'playful' ? 'rooted' : 'inspired');
            }}
            className="group relative cursor-pointer shrink-0"
            title="點擊與 桃 MOMO 互動！"
          >
            {/* Pulsing Pink Radial Halo */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#E4007F] to-[#FF65A3] opacity-35 blur-md group-hover:opacity-60 transition-opacity animate-pulse" />

            {/* Mascot Avatar Ring */}
            <div className="relative w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-[#E4007F] via-[#FF2D78] to-[#FF65A3] shadow-md group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full rounded-full overflow-hidden bg-white">
                <img
                  src={flowmomoImg}
                  alt="桃 MOMO · Taiwan Design Expo Mascot"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Click to play sound badge */}
            <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-[#E4007F] to-[#FF2D78] text-white p-2 rounded-full shadow-md group-hover:scale-110 transition-transform">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>

          {/* Mascot Interactive Speech Bubble */}
          <div className="flex-1 min-w-0 space-y-2 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-[#E4007F] text-white text-[11px] font-mono font-bold shadow-xs">
                {language === 'en' ? 'Official Expo Guide' : '大會官方嚮導'}
              </span>
              <span className="font-serif text-lg font-bold text-stone-900">
                {avatarInfo.name[language]}
              </span>
              <span className="text-xs text-stone-500 font-medium hidden xs:inline">
                · {avatarInfo.archetype[language]}
              </span>
            </div>

            {/* Speech bubble */}
            <div className="relative p-3.5 rounded-2xl bg-white/90 border border-pink-200/80 shadow-xs text-xs text-stone-700 leading-relaxed">
              <p>
                {moodDialogues[characterMood][language]}
              </p>
              <div className="text-[10px] text-[#E4007F] font-medium pt-1.5 flex items-center justify-center sm:justify-start gap-1">
                <Sparkles className="w-3 h-3" />
                <span>{language === 'en' ? 'Tap Momo above to hear special chime & change mood!' : '點擊左方 桃 MOMO 聽專屬風鈴聲與不同心情！'}</span>
              </div>
            </div>

            {/* Mood selector buttons */}
            <div className="flex items-center justify-center sm:justify-start gap-1.5 flex-wrap pt-0.5">
              {(['inspired', 'tectonic', 'playful', 'rooted'] as const).map(m => (
                <button
                  key={m}
                  onClick={() => {
                    setCharacterMood(m);
                    playMomoChime();
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
                    characterMood === m
                      ? 'bg-[#E4007F] text-white font-bold shadow-xs'
                      : 'bg-white/80 hover:bg-pink-100/70 text-stone-600 border border-pink-200/50'
                  }`}
                >
                  {m === 'inspired' ? '🌸 靈感漫遊' : m === 'tectonic' ? '💡 構造美學' : m === 'playful' ? '🎈 彩光童心' : '🍵 千塘風土'}
                </button>
              ))}
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
                <div className="w-full h-full rounded-full overflow-hidden bg-white">
                  <img
                    src={flowmomoImg}
                    alt={avatarInfo.name[language]}
                    className="w-full h-full object-cover"
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

            {/* Cultural Insights & Visited Counter */}
            <div className="bg-white/80 rounded-2xl p-4 border border-pink-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900 uppercase tracking-wider">
                  <Award className="w-4 h-4 text-[#E4007F]" />
                  <span>{language === 'en' ? 'Curated Stops & Core Insights' : '專屬動線已造訪站點與文化觀點'}</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-800 tabular-nums">
                  <span>{visitedCount} / {journey.exhibits.length} {language === 'en' ? 'Visited' : '站已造訪'}</span>
                  <span className="text-pink-300">·</span>
                  <span className="text-[#E4007F]">{savedInsightIds.length} {language === 'en' ? 'Saved' : '則收錄'}</span>
                </div>
              </div>

              {/* List of Takeaways */}
              <div className="space-y-2.5">
                {journey.exhibits.map((ex, i) => {
                  const isSaved = savedInsightIds.includes(ex.id);
                  const isVisited = visitedExhibitIds.includes(ex.id) || isSaved;
                  return (
                    <div
                      key={ex.id}
                      className={`p-3 rounded-xl border text-xs transition-colors flex items-start gap-2.5 ${
                        isVisited
                          ? 'bg-pink-50/60 border-pink-200 text-stone-900'
                          : 'bg-white border-stone-200/70 text-stone-400'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                          isVisited
                            ? 'bg-[#E4007F] text-white'
                            : 'bg-stone-200 text-stone-500'
                        }`}
                      >
                        {isVisited ? (
                          <Check className="w-3 h-3 stroke-[3]" />
                        ) : (
                          <span className="font-mono text-[10px]">{i + 1}</span>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold truncate">
                            {ex.title[language]}
                          </span>
                          <span className="font-mono font-bold text-[11px] text-[#E4007F] shrink-0 ml-2">
                            {ex.code}
                          </span>
                        </div>
                        <p className={`text-[11px] mt-0.5 leading-snug ${isSaved || isVisited ? 'text-stone-700' : 'text-stone-400 italic'}`}>
                          "{ex.oneSentenceTakeaway[language]}"
                        </p>
                      </div>
                    </div>
                  );
                })}
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
        <div className="bg-white rounded-3xl border border-pink-200 p-6 shadow-xl space-y-5 animate-in fade-in duration-200 text-center">
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#E4007F] uppercase tracking-wider">
              {language === 'en' ? 'Sensory Audio Synthesis' : '展場環境聲景沉浸回顧'}
            </span>
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              {language === 'en' ? 'Sounds of Taoyuan in Flow' : '桃園匯流・展場共鳴環境音'}
            </h2>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              {language === 'en'
                ? 'Synthesized harmonized river ripples, parametric timber resonances, and ambient expo bells.'
                : '以純淨 Web Audio 演算法即時生成的千塘水波、大跨距木構風息與大會迎賓風鈴聲景。'}
            </p>
          </div>

          {/* Sound Visualizer Animation */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-pink-50 to-pink-100/50 border border-pink-200 space-y-4">
            <div className="flex items-center justify-center gap-1.5 h-16">
              {[30, 60, 95, 45, 80, 100, 70, 40, 85, 60, 90, 50, 75, 95, 40, 65].map((h, i) => (
                <span
                  key={i}
                  className={`w-2 rounded-full transition-all duration-300 ${
                    isPlayingAmbience
                      ? 'bg-gradient-to-t from-[#E4007F] to-[#FF65A3] animate-pulse'
                      : 'bg-pink-200'
                  }`}
                  style={{
                    height: isPlayingAmbience ? `${Math.max(20, (h * (0.6 + Math.random() * 0.4)))}%` : '20%',
                    animationDelay: `${i * 0.08}s`
                  }}
                />
              ))}
            </div>

            <button
              onClick={toggleAmbientSoundscape}
              className={`min-h-[50px] px-6 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer shadow-md ${
                isPlayingAmbience
                  ? 'bg-stone-900 text-white hover:bg-stone-800'
                  : 'bg-gradient-to-r from-[#E4007F] to-[#FF2D78] hover:from-[#C9006F] hover:to-[#E4007F] text-white shadow-pink-300/50'
              }`}
            >
              {isPlayingAmbience ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span>
                {isPlayingAmbience
                  ? (language === 'en' ? 'Pause Ambient Soundscape' : '暫停環境聲景播放')
                  : (language === 'en' ? 'Start Ambient Soundscape' : '播放展場沉浸聲景')}
              </span>
            </button>
          </div>
        </div>
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
