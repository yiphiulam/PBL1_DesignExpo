// High-Fidelity Procedural Soundscape Engine for Taiwan Design Expo 2026
// Generates warm organic pads, flowing water ripples, gentle wind, and crystalline pentatonic bells using Web Audio API

export type SoundscapeMood = 'water_breeze' | 'crystal_chimes' | 'timber_resonance' | 'twilight_haven';

export interface SoundscapeMoodConfig {
  id: SoundscapeMood;
  name: { zh: string; en: string };
  desc: { zh: string; en: string };
  icon: string;
  padChord: number[]; // frequencies in Hz
  waterFilterFreq: number; // Hz
  chimeIntervalMs: number;
  bellScale: number[]; // pentatonic chime notes
}

export const SOUNDSCAPE_MOODS: Record<SoundscapeMood, SoundscapeMoodConfig> = {
  water_breeze: {
    id: 'water_breeze',
    name: { zh: '千塘水波・微風流動', en: 'Pond Water & Gentle Breeze' },
    desc: { zh: '千座埤塘的輕柔水聲、原木棧道微風與舒緩大和弦', en: 'Gentle water ripples, fresh breeze through timber ramps, and soft harmonic pads.' },
    icon: '🌊',
    // F Major 9 warm pad: F3, C4, E4, G4, A4
    padChord: [174.61, 261.63, 329.63, 392.00, 440.00],
    waterFilterFreq: 520,
    chimeIntervalMs: 3200,
    // F Major Pentatonic / Lydian bells
    bellScale: [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50, 1174.66],
  },
  crystal_chimes: {
    id: 'crystal_chimes',
    name: { zh: '青埔晨光・水晶風鈴', en: 'Morning Light & Wind Chimes' },
    desc: { zh: '大會天棚迎風飄揚的水晶風鈴，清脆通透、淨化心靈', en: 'Crystalline wind chimes swaying in morning breezes under the expo canopy.' },
    icon: '✨',
    // D Major 9: D3, A3, F#4, C#5, E5
    padChord: [146.83, 220.00, 369.99, 554.37, 659.25],
    waterFilterFreq: 750,
    chimeIntervalMs: 2200,
    // D Pentatonic Chimes: D5, E5, F#5, A5, B5, D6, E6
    bellScale: [587.33, 659.25, 739.99, 880.00, 987.77, 1174.66, 1318.51],
  },
  timber_resonance: {
    id: 'timber_resonance',
    name: { zh: '大跨距木構・深邃共鳴', en: 'Timber Tectonics & Warm Resonance' },
    desc: { zh: 'A1 展館原木弧肋的溫潤共振，低頻沉穩包容，營造安居定錨感', en: 'Deep cedarwood acoustic resonances and low grounding drones for inner calm.' },
    icon: '🪵',
    // C Add 9 / Am7 warm wooden voicing: C3, G3, D4, E4, G4
    padChord: [130.81, 196.00, 293.66, 329.63, 392.00],
    waterFilterFreq: 380,
    chimeIntervalMs: 4000,
    // Low wooden xylophone / temple chime
    bellScale: [261.63, 329.63, 392.00, 523.25, 659.25, 783.99],
  },
  twilight_haven: {
    id: 'twilight_haven',
    name: { zh: '仲夏夜光・星夜流光', en: 'Twilight Confluence & Starry Haven' },
    desc: { zh: '傍晚展場燈火點亮時的寧靜氛圍，水霧與星光流轉的沉浸體驗', en: 'Tranquil twilight ambiance with mist, subtle nocturnal chirps, and starry warmth.' },
    icon: '🌌',
    // A♭ Major 7: Ab2, Eb3, C4, G4, Bb4
    padChord: [103.83, 155.56, 261.63, 392.00, 466.16],
    waterFilterFreq: 450,
    chimeIntervalMs: 2800,
    // Ethereal Celestia notes
    bellScale: [415.30, 466.16, 523.25, 622.25, 698.46, 830.61, 932.33, 1046.50],
  }
};

class ExpoSoundscapeEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  private padGain: GainNode | null = null;
  private waterGain: GainNode | null = null;
  private chimeGain: GainNode | null = null;

  // Active oscillators & nodes
  private padOscs: { osc: OscillatorNode; gain: GainNode; lfo: OscillatorNode }[] = [];
  private noiseNode: AudioBufferSourceNode | null = null;
  private noiseFilter: BiquadFilterNode | null = null;
  private noiseLfo: OscillatorNode | null = null;

  private chimeTimer: ReturnType<typeof setTimeout> | null = null;
  private currentMood: SoundscapeMood = 'water_breeze';
  private volume: number = 0.65;
  private active: boolean = false;

  private initContext(): AudioContext {
    if (!this.ctx || this.ctx.state === 'closed') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Generate pink/brown noise buffer for natural flowing water & wind
  private createWaterNoiseBuffer(ctx: AudioContext): AudioBuffer {
    const bufferSize = ctx.sampleRate * 4; // 4 seconds looping buffer
    const buffer = ctx.createBuffer(2, bufferSize, ctx.sampleRate);
    for (let channel = 0; channel < 2; channel++) {
      const output = buffer.getChannelData(channel);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        // Pink noise filter algorithm (Paul Kellet)
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.045;
        b6 = white * 0.115926;
      }
    }
    return buffer;
  }

  public async start(mood: SoundscapeMood = 'water_breeze') {
    if (this.active) {
      this.setMood(mood);
      return;
    }

    try {
      const ctx = this.initContext();
      this.currentMood = mood;
      const config = SOUNDSCAPE_MOODS[mood];

      // Master Chain
      const master = ctx.createGain();
      master.gain.setValueAtTime(0.001, ctx.currentTime);
      master.gain.exponentialRampToValueAtTime(this.volume, ctx.currentTime + 1.2);

      // Analyser Node for visualizer
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 64;
      analyser.smoothingTimeConstant = 0.8;

      master.connect(analyser);
      analyser.connect(ctx.destination);

      this.masterGain = master;
      this.analyser = analyser;

      // Sub-gains
      this.padGain = ctx.createGain();
      this.padGain.gain.setValueAtTime(0.35, ctx.currentTime);
      this.padGain.connect(master);

      this.waterGain = ctx.createGain();
      this.waterGain.gain.setValueAtTime(0.22, ctx.currentTime);
      this.waterGain.connect(master);

      this.chimeGain = ctx.createGain();
      this.chimeGain.gain.setValueAtTime(0.45, ctx.currentTime);
      this.chimeGain.connect(master);

      // 1. Build Ambient Chord Pad
      this.startPad(ctx, config.padChord);

      // 2. Build Water Stream / Lake Ripples
      this.startWaterStream(ctx, config.waterFilterFreq);

      // 3. Start Generative Chime Loop
      this.active = true;
      this.scheduleNextChime();
    } catch (e) {
      console.warn('Failed to start ambient soundscape:', e);
      this.active = false;
    }
  }

  private startPad(ctx: AudioContext, chordFreqs: number[]) {
    this.stopPad();

    chordFreqs.forEach((freq, idx) => {
      // Warm low-pass filtered oscillator
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      // Soft waveform: pure sine or warm triangle
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      // Subtle organic detuning for natural chorus shimmer
      const detuneCents = (Math.random() - 0.5) * 8;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.detune.setValueAtTime(detuneCents, ctx.currentTime);

      // Warm low-pass filter (removes any harsh top-end)
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450 + (idx * 90), ctx.currentTime);
      filter.Q.setValueAtTime(1.2, ctx.currentTime);

      // Slow organic breathing LFO
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(0.12 + idx * 0.05, ctx.currentTime);
      lfoGain.gain.setValueAtTime(0.04, ctx.currentTime);
      lfo.connect(oscGain.gain);
      lfo.start();

      oscGain.gain.setValueAtTime(0.18 / chordFreqs.length, ctx.currentTime);

      osc.connect(filter);
      filter.connect(oscGain);
      if (this.padGain) {
        oscGain.connect(this.padGain);
      }

      osc.start();
      this.padOscs.push({ osc, gain: oscGain, lfo });
    });
  }

  private stopPad() {
    this.padOscs.forEach(({ osc, lfo }) => {
      try {
        osc.stop();
        lfo.stop();
      } catch {}
    });
    this.padOscs = [];
  }

  private startWaterStream(ctx: AudioContext, centerFreq: number) {
    this.stopWaterStream();

    const buffer = this.createWaterNoiseBuffer(ctx);
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = buffer;
    noiseSource.loop = true;

    // Dual-stage filtering for realistic water flow / breeze
    const bandpass = ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.setValueAtTime(centerFreq, ctx.currentTime);
    bandpass.Q.setValueAtTime(1.8, ctx.currentTime);

    // LFO gently sweeps water frequency like incoming gentle lake ripples
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.18, ctx.currentTime); // 5.5 second ripple cycle
    lfoGain.gain.setValueAtTime(centerFreq * 0.35, ctx.currentTime);

    lfo.connect(bandpass.frequency);
    lfo.start();

    noiseSource.connect(bandpass);
    if (this.waterGain) {
      bandpass.connect(this.waterGain);
    }

    noiseSource.start();

    this.noiseNode = noiseSource;
    this.noiseFilter = bandpass;
    this.noiseLfo = lfo;
  }

  private stopWaterStream() {
    if (this.noiseNode) {
      try { this.noiseNode.stop(); } catch {}
      this.noiseNode = null;
    }
    if (this.noiseLfo) {
      try { this.noiseLfo.stop(); } catch {}
      this.noiseLfo = null;
    }
  }

  // Trigger a single crystalline pentatonic bell / water droplet
  public triggerChime(freqOverride?: number) {
    if (!this.ctx || this.ctx.state === 'closed') return;
    const ctx = this.ctx;
    const config = SOUNDSCAPE_MOODS[this.currentMood];

    const freq = freqOverride || config.bellScale[Math.floor(Math.random() * config.bellScale.length)];

    const now = ctx.currentTime;
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator(); // harmonic shimmer
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    // Pure crystal bell: fundamental sine + 2nd harmonic
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);

    osc2.type = 'sine';
    // Harmonic overtone (2.76x or 3x for Tibetan bell / crystal chime feel)
    osc2.frequency.setValueAtTime(freq * 2.76, now);

    // Shimmer bandpass
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(freq * 1.5, now);
    filter.Q.setValueAtTime(2.5, now);

    // Bell envelope: instant crystalline attack, long exponential shimmer decay
    gainNode.gain.setValueAtTime(0.001, now);
    gainNode.gain.linearRampToValueAtTime(0.16, now + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);

    osc1.connect(gainNode);
    osc2.connect(filter);
    filter.connect(gainNode);

    if (this.chimeGain) {
      gainNode.connect(this.chimeGain);
    } else if (this.masterGain) {
      gainNode.connect(this.masterGain);
    }

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 3.0);
    osc2.stop(now + 3.0);
  }

  private scheduleNextChime() {
    if (!this.active) return;
    const config = SOUNDSCAPE_MOODS[this.currentMood];
    // Slightly jitter interval for organic natural breeze feel
    const jitter = (Math.random() - 0.5) * 1200;
    const delay = Math.max(1400, config.chimeIntervalMs + jitter);

    this.chimeTimer = setTimeout(() => {
      if (this.active) {
        this.triggerChime();
        this.scheduleNextChime();
      }
    }, delay);
  }

  public setMood(mood: SoundscapeMood) {
    this.currentMood = mood;
    if (!this.active || !this.ctx) return;
    const config = SOUNDSCAPE_MOODS[mood];

    // Smoothly re-voice pad and water stream
    this.startPad(this.ctx, config.padChord);
    this.startWaterStream(this.ctx, config.waterFilterFreq);
    // Ring an immediate celebratory bell in the new key
    this.triggerChime(config.bellScale[config.bellScale.length - 2]);
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  public stop() {
    this.active = false;
    if (this.chimeTimer) {
      clearTimeout(this.chimeTimer);
      this.chimeTimer = null;
    }

    if (this.masterGain && this.ctx) {
      const now = this.ctx.currentTime;
      // Smooth fade-out over 0.8s (zero pops or harsh clicks)
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.linearRampToValueAtTime(0.001, now + 0.8);
      setTimeout(() => {
        this.stopPad();
        this.stopWaterStream();
        if (this.ctx && this.ctx.state !== 'closed') {
          this.ctx.close();
        }
        this.ctx = null;
        this.masterGain = null;
      }, 850);
    } else {
      this.stopPad();
      this.stopWaterStream();
    }
  }

  public isPlaying(): boolean {
    return this.active;
  }

  public getCurrentMood(): SoundscapeMood {
    return this.currentMood;
  }

  public getVolume(): number {
    return this.volume;
  }

  public getAnalyserData(dataArray: Uint8Array): void {
    if (this.analyser && this.active) {
      // Cast for TypeScript lib compatibility with AnalyserNode
      (this.analyser.getByteFrequencyData as (arr: Uint8Array) => void)(dataArray);
    } else {
      dataArray.fill(0);
    }
  }
}

export const expoSoundscape = new ExpoSoundscapeEngine();
