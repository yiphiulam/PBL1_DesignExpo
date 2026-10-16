import React, { useState, useEffect, useRef } from 'react';
import { 
  expoSoundscape, 
  SoundscapeMood, 
  SOUNDSCAPE_MOODS 
} from '../utils/expoSoundscapeEngine';
import { Language } from '../types/expo';
import { 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Music, 
  Sliders, 
  Play, 
  Pause,
  Waves,
  Wind,
  Compass
} from 'lucide-react';

interface SoundscapePlayerCardProps {
  language: Language;
}

export const SoundscapePlayerCard: React.FC<SoundscapePlayerCardProps> = ({ language }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentMood, setCurrentMood] = useState<SoundscapeMood>('water_breeze');
  const [volume, setVolume] = useState(0.65);
  const [activeChimeIndex, setActiveChimeIndex] = useState<number | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Sync state with soundscape engine
  useEffect(() => {
    setIsPlaying(expoSoundscape.isPlaying());
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  // Handle Play / Pause Toggle
  const handleTogglePlay = async () => {
    if (isPlaying) {
      expoSoundscape.stop();
      setIsPlaying(false);
    } else {
      await expoSoundscape.start(currentMood);
      expoSoundscape.setVolume(volume);
      setIsPlaying(true);
    }
  };

  // Handle Mood Switch
  const handleSelectMood = (mood: SoundscapeMood) => {
    setCurrentMood(mood);
    if (isPlaying) {
      expoSoundscape.setMood(mood);
    }
  };

  // Handle Volume Change
  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    expoSoundscape.setVolume(newVol);
  };

  // Play an interactive chime note
  const handleTriggerChime = (index?: number) => {
    const config = SOUNDSCAPE_MOODS[currentMood];
    if (index !== undefined && config.bellScale[index]) {
      expoSoundscape.triggerChime(config.bellScale[index]);
      setActiveChimeIndex(index);
      setTimeout(() => setActiveChimeIndex(null), 300);
    } else {
      expoSoundscape.triggerChime();
    }
  };

  // Real-time Visualizer Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dataArray = new Uint8Array(32);
    let wavePhase = 0;

    const render = () => {
      animFrameRef.current = requestAnimationFrame(render);
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // Background subtle glowing gradient
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, '#FFF5F8');
      bgGrad.addColorStop(1, '#FDF2F8');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      expoSoundscape.getAnalyserData(dataArray);

      // Draw flowing sine water waves
      wavePhase += isPlaying ? 0.04 : 0.01;

      // Draw 3 layered organic translucent waves
      const waveColors = [
        'rgba(228, 0, 127, 0.12)',
        'rgba(255, 101, 163, 0.18)',
        'rgba(228, 0, 127, 0.25)',
      ];

      waveColors.forEach((color, wIdx) => {
        ctx.beginPath();
        ctx.moveTo(0, height);
        const speedMultiplier = 1 + wIdx * 0.4;
        const amplitude = isPlaying ? 14 + wIdx * 6 : 4;
        const baseline = height * (0.62 + wIdx * 0.08);

        for (let x = 0; x <= width; x += 8) {
          const y = baseline + Math.sin(x * 0.02 + wavePhase * speedMultiplier) * amplitude;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
      });

      // Draw Dancing Pentatonic Frequency Bars in the center
      const barCount = 16;
      const barWidth = 6;
      const spacing = 7;
      const totalWidth = barCount * (barWidth + spacing);
      const startX = (width - totalWidth) / 2;

      for (let i = 0; i < barCount; i++) {
        const val = dataArray[i] || 0;
        const rawHeight = isPlaying ? (val / 255) * 50 + 8 : 4;
        const x = startX + i * (barWidth + spacing);
        const y = height * 0.48 - rawHeight / 2;

        const barGrad = ctx.createLinearGradient(0, y, 0, y + rawHeight);
        barGrad.addColorStop(0, '#E4007F');
        barGrad.addColorStop(1, '#FF65A3');
        ctx.fillStyle = barGrad;

        // Rounded bar
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(x, y, barWidth, rawHeight, 3);
        } else {
          ctx.rect(x, y, barWidth, rawHeight);
        }
        ctx.fill();
      }

      // Center Status Text
      ctx.fillStyle = isPlaying ? '#E4007F' : '#9CA3AF';
      ctx.font = 'bold 11px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      const statusText = isPlaying 
        ? (language === 'en' ? '• AMBIENT FLOW PLAYING •' : '• 展場沉浸聲景共鳴中 •')
        : (language === 'en' ? 'TAP PLAY TO IMMERSE' : '點擊下方播放沉浸聲景');
      ctx.fillText(statusText, width / 2, height * 0.88);
    };

    render();

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isPlaying, language]);

  const activeConfig = SOUNDSCAPE_MOODS[currentMood];

  return (
    <div className="bg-white rounded-3xl border border-pink-200 p-6 sm:p-7 shadow-xl space-y-6 animate-in fade-in duration-200">
      {/* Title Header */}
      <div className="text-center space-y-1.5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 border border-pink-200 text-[#E4007F] text-xs font-bold tracking-wider uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{language === 'en' ? 'Procedural Soundscape Synthesis' : '展場環境聲景沉浸回顧'}</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
          {language === 'en' ? 'Sounds of Taoyuan in Flow' : '桃園匯流・展場共鳴環境音'}
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 max-w-lg mx-auto leading-relaxed">
          {language === 'en'
            ? 'Acoustic procedural synthesis blending warm architectural timber resonances, lake breeze ripples, and crystalline pentatonic wind chimes.'
            : '融合千座埤塘的輕柔水聲、大跨距原木薄膜天棚共鳴與迎風水晶風鈴，為你的觀展之旅畫下最悠揚的心靈餘韻。'}
        </p>
      </div>

      {/* Visualizer Canvas & Chime Tap Area */}
      <div className="relative rounded-2xl overflow-hidden border-2 border-pink-200/90 shadow-inner group">
        <canvas
          ref={canvasRef}
          width={600}
          height={160}
          className="w-full h-36 sm:h-40 block cursor-pointer transition-transform active:scale-[0.99]"
          onClick={() => {
            if (!isPlaying) {
              handleTogglePlay();
            } else {
              handleTriggerChime();
            }
          }}
          title={language === 'en' ? 'Click to trigger chime ripple' : '點擊畫面敲響水波風鈴！'}
        />

        {/* Floating Quick Action Overlay */}
        <div className="absolute top-3 right-3 flex items-center gap-2">
          <span className="text-[10px] font-mono font-bold bg-white/90 text-[#E4007F] px-2 py-0.5 rounded-full border border-pink-200 backdrop-blur-xs flex items-center gap-1">
            <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-emerald-500 animate-ping' : 'bg-stone-300'}`} />
            <span>{isPlaying ? (language === 'en' ? 'SYNTHESIZING' : '立體聲生成中') : (language === 'en' ? 'STANDBY' : '待機中')}</span>
          </span>
        </div>

        <div className="absolute bottom-2 left-3 text-[10px] text-stone-400 font-mono hidden sm:block">
          <span>{language === 'en' ? 'Tip: Click screen to ring crystal chimes' : '💡 點擊水波畫面可即時敲響水晶風鈴'}</span>
        </div>
      </div>

      {/* 4 Curated Ambient Soundscape Presets */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-stone-800 flex items-center gap-1.5 uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5 text-[#E4007F]" />
            <span>{language === 'en' ? 'Select Soundscape Atmosphere:' : '選擇展場聲景氛圍：'}</span>
          </span>
          <span className="text-[11px] text-[#E4007F] font-medium">
            {activeConfig.name[language]}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {(Object.keys(SOUNDSCAPE_MOODS) as SoundscapeMood[]).map(moodKey => {
            const m = SOUNDSCAPE_MOODS[moodKey];
            const isSelected = currentMood === moodKey;
            return (
              <button
                key={moodKey}
                onClick={() => handleSelectMood(moodKey)}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                  isSelected
                    ? 'border-[#E4007F] bg-gradient-to-r from-pink-50 to-rose-50/70 shadow-sm ring-1 ring-[#E4007F]/40'
                    : 'border-stone-200/80 bg-white hover:bg-stone-50/70 hover:border-pink-200'
                }`}
              >
                <span className="text-2xl shrink-0 p-1 bg-white rounded-xl shadow-xs border border-pink-100">
                  {m.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-semibold text-xs text-stone-900 truncate">
                      {m.name[language]}
                    </span>
                    {isSelected && (
                      <span className="text-[9px] font-bold text-white bg-[#E4007F] px-1.5 py-0.2 rounded-full">
                        ACTIVE
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-stone-500 leading-snug mt-0.5 line-clamp-2">
                    {m.desc[language]}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Pentatonic Chime Bar (敲擊風鈴) */}
      <div className="bg-pink-50/60 rounded-2xl p-4 border border-pink-200/80 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-bold text-stone-800">
            <Music className="w-3.5 h-3.5 text-[#E4007F]" />
            <span>{language === 'en' ? 'Interactive Pentatonic Wind Chimes (Tap to play):' : '大會五聲音階水晶風鈴（點擊敲響演奏）：'}</span>
          </div>
          <span className="text-[11px] text-stone-400 font-mono">
            Pentatonic Scale
          </span>
        </div>

        <div className="grid grid-cols-7 gap-1.5">
          {activeConfig.bellScale.map((freq, idx) => {
            const noteNames = ['1 · Do', '2 · Re', '3 · Mi', '5 · Sol', '6 · La', 'i · 高Do', '2̇ · 高Re'];
            const isRinging = activeChimeIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => handleTriggerChime(idx)}
                className={`py-2 px-1 rounded-xl border text-center transition-all cursor-pointer select-none active:scale-95 ${
                  isRinging
                    ? 'bg-[#E4007F] text-white border-[#E4007F] shadow-md scale-105'
                    : 'bg-white hover:bg-pink-100/70 border-pink-200/80 text-stone-800'
                }`}
                title={`${Math.round(freq)} Hz`}
              >
                <span className="block text-[11px] font-bold">
                  {noteNames[idx % noteNames.length]}
                </span>
                <span className="block text-[9px] font-mono text-stone-400 mt-0.5">
                  {Math.round(freq)}Hz
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Master Audio Controls Bar: Play / Pause & Volume Slider */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-stone-50 border border-stone-200">
        {/* Play/Pause Button */}
        <button
          onClick={handleTogglePlay}
          className={`w-full sm:w-auto min-h-[50px] px-8 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-md ${
            isPlaying
              ? 'bg-stone-900 hover:bg-stone-800 text-white shadow-stone-400/40'
              : 'bg-gradient-to-r from-[#E4007F] via-[#FF2D78] to-[#FF65A3] hover:from-[#C9006F] hover:to-[#E4007F] text-white shadow-pink-400/50 hover:shadow-pink-400/70 active:scale-95'
          }`}
        >
          {isPlaying ? (
            <>
              <Pause className="w-4 h-4 fill-white" />
              <span>{language === 'en' ? 'Pause Ambient Soundscape' : '暫停環境聲景播放'}</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-white ml-0.5" />
              <span>{language === 'en' ? 'Start Ambient Soundscape' : '播放展場沉浸聲景'}</span>
            </>
          )}
        </button>

        {/* Volume Slider */}
        <div className="flex items-center gap-3 w-full sm:w-64">
          <button
            onClick={() => handleVolumeChange(volume === 0 ? 0.65 : 0)}
            className="text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
            title={volume === 0 ? 'Unmute' : 'Mute'}
          >
            {volume === 0 ? <VolumeX className="w-4 h-4 text-stone-400" /> : <Volume2 className="w-4 h-4 text-[#E4007F]" />}
          </button>

          <div className="flex-1 space-y-1">
            <div className="flex justify-between text-[10px] text-stone-500 font-mono">
              <span>{language === 'en' ? 'VOLUME' : '主音量'}</span>
              <span>{Math.round(volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#E4007F]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
