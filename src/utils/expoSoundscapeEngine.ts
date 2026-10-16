// High-Fidelity Procedural Acoustic Soundscape Engine for Taiwan Design Expo 2026
// Generates warm organic pads, flowing water stream with crystal droplets, and ethereal pentatonic wind chimes

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
    chimeIntervalMs: 3800,
    // Low wooden xylophone / warm temple chime
    bellScale: [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50],
  },
  twilight_haven: {
    id: 'twilight_haven',
    name: { zh: '仲夏夜光・星夜流光', en: 'Twilight Confluence & Starry Haven' },
    desc: { zh: '傍晚展場燈火點亮時的寧靜氛圍，水霧與星光流轉的沉浸體驗', en: 'Tranquil twilight ambiance with mist, subtle nocturnal chirps, and starry warmth.' },
    icon: '🌌',
    // A♭ Major 7: Ab2, Eb3, C4, G4, Bb4
    padChord: [103.83, 155.56, 261.63, 392.00, 466.16],
    waterFilterFreq: 450,
    chimeIntervalMs: 2600,
    // Ethereal Celestia notes
    bellScale: [415.30, 466.16, 523.25, 622.25, 698.46, 830.61, 932.33, 1046.50],
  }
};

class ExpoSoundscapeEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;

  // Spatial Hall Reverb / Diffusion Delay Nodes
  private reverbSendGain: GainNode | null = null;
  private delayNodeL: DelayNode | null = null;
  private delayNodeR: DelayNode | null = null;

  // Sub-busses
  private padGain: GainNode | null = null;
  private waterGain: GainNode | null = null;
  private chimeGain: GainNode | null = null;

  // Active oscillators & stream sources
  private padOscs: { osc: OscillatorNode; gain: GainNode; lfo: OscillatorNode }[] = [];
  private noiseNode: AudioBufferSourceNode | null = null;
  private noiseFilter: BiquadFilterNode | null = null;
  private noiseLfo: OscillatorNode | null = null;

  private chimeTimer: ReturnType<typeof setTimeout> | null = null;
  private dropletTimer: ReturnType<typeof setTimeout> | null = null;
  private currentMood: SoundscapeMood = 'water_breeze';
  private volume: number = 0.75;
  private active: boolean = false;

  constructor() {
    // Setup lazy unlock on first user click anywhere in the window
    if (typeof window !== 'undefined') {
      const unlockAudio = () => {
        if (this.ctx && this.ctx.state === 'suspended') {
          this.ctx.resume().catch(() => {});
        }
        window.removeEventListener('pointerdown', unlockAudio);
        window.removeEventListener('keydown', unlockAudio);
      };
      window.addEventListener('pointerdown', unlockAudio, { passive: true, once: true });
      window.addEventListener('keydown', unlockAudio, { passive: true, once: true });
    }
  }

  public async ensureAudioContext(): Promise<AudioContext> {
    if (!this.ctx || this.ctx.state === 'closed') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      try {
        await this.ctx.resume();
      } catch (err) {
        console.warn('AudioContext resume pending user interaction', err);
      }
    }

    if (!this.masterGain && this.ctx) {
      this.setupMasterChain(this.ctx);
    }

    return this.ctx;
  }

  private setupMasterChain(ctx: AudioContext) {
    const master = ctx.createGain();
    master.gain.setValueAtTime(this.volume, ctx.currentTime);

    // Dynamic Limiter/Compressor to prevent digital clipping
    const compressor = ctx.createDynamicsCompressor();
    compressor.threshold.setValueAtTime(-12, ctx.currentTime);
    compressor.knee.setValueAtTime(24, ctx.currentTime);
    compressor.ratio.setValueAtTime(6, ctx.currentTime);
    compressor.attack.setValueAtTime(0.003, ctx.currentTime);
    compressor.release.setValueAtTime(0.25, ctx.currentTime);

    // Spectrum Analyser for real-time visual waves
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 64;
    analyser.smoothingTimeConstant = 0.85;

    master.connect(compressor);
    compressor.connect(analyser);
    analyser.connect(ctx.destination);

    this.masterGain = master;
    this.analyser = analyser;

    // Sub-gains
    this.padGain = ctx.createGain();
    this.padGain.gain.setValueAtTime(0.42, ctx.currentTime);
    this.padGain.connect(master);

    this.waterGain = ctx.createGain();
    this.waterGain.gain.setValueAtTime(0.35, ctx.currentTime);
    this.waterGain.connect(master);

    this.chimeGain = ctx.createGain();
    this.chimeGain.gain.setValueAtTime(0.65, ctx.currentTime);
    this.chimeGain.connect(master);

    // 🌟 Spatial Stereo Hall Reverb / Diffusion Delay Network
    const delayL = ctx.createDelay();
    delayL.delayTime.setValueAtTime(0.26, ctx.currentTime); // 260ms left
    const delayR = ctx.createDelay();
    delayR.delayTime.setValueAtTime(0.39, ctx.currentTime); // 390ms right

    const feedbackL = ctx.createGain();
    feedbackL.gain.setValueAtTime(0.38, ctx.currentTime);
    const feedbackR = ctx.createGain();
    feedbackR.gain.setValueAtTime(0.35, ctx.currentTime);

    const dampFilter = ctx.createBiquadFilter();
    dampFilter.type = 'lowpass';
    dampFilter.frequency.setValueAtTime(2400, ctx.currentTime);

    const reverbSend = ctx.createGain();
    reverbSend.gain.setValueAtTime(0.48, ctx.currentTime);

    // Cross-feed delay network
    reverbSend.connect(delayL);
    reverbSend.connect(delayR);

    delayL.connect(dampFilter);
    dampFilter.connect(feedbackL);
    feedbackL.connect(delayR);

    delayR.connect(feedbackR);
    feedbackR.connect(delayL);

    delayL.connect(master);
    delayR.connect(master);

    this.reverbSendGain = reverbSend;
    this.delayNodeL = delayL;
    this.delayNodeR = delayR;
  }

  // Pink noise algorithm with warm low-end boost for natural water/wind
  private createWaterNoiseBuffer(ctx: AudioContext): AudioBuffer {
    const bufferSize = ctx.sampleRate * 4;
    const buffer = ctx.createBuffer(2, bufferSize, ctx.sampleRate);
    for (let channel = 0; channel < 2; channel++) {
      const output = buffer.getChannelData(channel);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.12;
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
      const ctx = await this.ensureAudioContext();
      this.currentMood = mood;
      const config = SOUNDSCAPE_MOODS[mood];

      if (this.masterGain) {
        this.masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
        this.masterGain.gain.exponentialRampToValueAtTime(this.volume, ctx.currentTime + 1.0);
      }

      // 1. Build Ambient Chord Pad
      this.startPad(ctx, config.padChord);

      // 2. Build Water Stream / Lake Ripples
      this.startWaterStream(ctx, config.waterFilterFreq);

      // 3. Start Generative Chime Loop
      this.active = true;
      this.scheduleNextChime();
      this.scheduleNextDroplet();

      // Ring an immediate welcoming crystal chime
      this.triggerChime(config.bellScale[2]);
    } catch (e) {
      console.warn('Failed to start ambient soundscape:', e);
      this.active = false;
    }
  }

  private startPad(ctx: AudioContext, chordFreqs: number[]) {
    this.stopPad();

    chordFreqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      // Mix sine & triangle for warm acoustic tone
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';

      // Subtle organic detuning for natural warmth & shimmer
      const detuneCents = (Math.random() - 0.5) * 10;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.detune.setValueAtTime(detuneCents, ctx.currentTime);

      // Warm low-pass filter
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(500 + (idx * 110), ctx.currentTime);
      filter.Q.setValueAtTime(1.4, ctx.currentTime);

      // Organic breathing LFO (slow breathing swell)
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(0.1 + idx * 0.04, ctx.currentTime);
      lfoGain.gain.setValueAtTime(0.06, ctx.currentTime);
      lfo.connect(oscGain.gain);
      lfo.start();

      oscGain.gain.setValueAtTime(0.24 / chordFreqs.length, ctx.currentTime);

      osc.connect(filter);
      filter.connect(oscGain);
      if (this.padGain) {
        oscGain.connect(this.padGain);
      }
      if (this.reverbSendGain) {
        oscGain.connect(this.reverbSendGain);
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
    bandpass.Q.setValueAtTime(2.2, ctx.currentTime);

    // LFO gently sweeps water frequency like incoming gentle lake ripples
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.16, ctx.currentTime); // ~6.2s wave period
    lfoGain.gain.setValueAtTime(centerFreq * 0.42, ctx.currentTime);

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

  // Trigger natural organic water droplet ripple (💧 水波漣漪)
  public async triggerWaterDroplet() {
    try {
      const ctx = await this.ensureAudioContext();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Chirp down from ~1600Hz to 800Hz in 90ms (pure water droplet effect)
      const baseFreq = 1200 + Math.random() * 500;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.58, now + 0.12);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

      osc.connect(gain);
      if (this.waterGain) {
        gain.connect(this.waterGain);
      } else if (this.masterGain) {
        gain.connect(this.masterGain);
      }

      if (this.reverbSendGain) {
        gain.connect(this.reverbSendGain);
      }

      osc.start(now);
      osc.stop(now + 0.38);
    } catch {}
  }

  // Trigger high-fidelity Crystalline Pentatonic Bell / Wind Chime (✨ 水晶風鈴)
  public async triggerChime(freqOverride?: number) {
    try {
      const ctx = await this.ensureAudioContext();
      const config = SOUNDSCAPE_MOODS[this.currentMood];
      const freq = freqOverride || config.bellScale[Math.floor(Math.random() * config.bellScale.length)];

      const now = ctx.currentTime;

      // Mode 1: Fundamental Sine (Singing pitch)
      const osc1 = ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(freq, now);

      // Mode 2: Inharmonic Tibetan Bell Overtone (~2.756x)
      const osc2 = ctx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(freq * 2.756, now);

      // Mode 3: Sparkling Crystal Shimmer (~5.404x)
      const osc3 = ctx.createOscillator();
      osc3.type = 'sine';
      osc3.frequency.setValueAtTime(freq * 5.404, now);

      // Mode 4: Initial metallic hammer strike transient (~8.933x)
      const oscStrike = ctx.createOscillator();
      oscStrike.type = 'triangle';
      oscStrike.frequency.setValueAtTime(freq * 8.933, now);

      // Individual Envelopes
      const gainMain = ctx.createGain();
      gainMain.gain.setValueAtTime(0.001, now);
      gainMain.gain.linearRampToValueAtTime(0.38, now + 0.012);
      gainMain.gain.exponentialRampToValueAtTime(0.0001, now + 3.6);

      const gainOvertone = ctx.createGain();
      gainOvertone.gain.setValueAtTime(0.001, now);
      gainOvertone.gain.linearRampToValueAtTime(0.22, now + 0.008);
      gainOvertone.gain.exponentialRampToValueAtTime(0.0001, now + 2.4);

      const gainShimmer = ctx.createGain();
      gainShimmer.gain.setValueAtTime(0.001, now);
      gainShimmer.gain.linearRampToValueAtTime(0.14, now + 0.006);
      gainShimmer.gain.exponentialRampToValueAtTime(0.0001, now + 1.6);

      const gainStrike = ctx.createGain();
      gainStrike.gain.setValueAtTime(0.001, now);
      gainStrike.gain.linearRampToValueAtTime(0.28, now + 0.004);
      gainStrike.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

      // Shimmer Bandpass Filter for pristine crystal bell tone
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(freq * 1.8, now);
      filter.Q.setValueAtTime(3.0, now);

      osc1.connect(gainMain);
      osc2.connect(gainOvertone);
      osc3.connect(gainShimmer);
      oscStrike.connect(gainStrike);

      // Connect to chime output
      const chimeMixer = ctx.createGain();
      chimeMixer.gain.setValueAtTime(1.0, now);

      gainMain.connect(chimeMixer);
      gainOvertone.connect(chimeMixer);
      gainShimmer.connect(filter);
      filter.connect(chimeMixer);
      gainStrike.connect(chimeMixer);

      if (this.chimeGain) {
        chimeMixer.connect(this.chimeGain);
      } else if (this.masterGain) {
        chimeMixer.connect(this.masterGain);
      }

      // Send to spatial hall reverb for ethereal resonance
      if (this.reverbSendGain) {
        chimeMixer.connect(this.reverbSendGain);
      }

      osc1.start(now);
      osc2.start(now);
      osc3.start(now);
      oscStrike.start(now);

      osc1.stop(now + 3.8);
      osc2.stop(now + 2.6);
      osc3.stop(now + 1.8);
      oscStrike.stop(now + 0.2);
    } catch (e) {
      console.warn('Failed to play chime bell:', e);
    }
  }

  private scheduleNextChime() {
    if (!this.active) return;
    const config = SOUNDSCAPE_MOODS[this.currentMood];
    const jitter = (Math.random() - 0.5) * 1000;
    const delay = Math.max(1600, config.chimeIntervalMs + jitter);

    this.chimeTimer = setTimeout(() => {
      if (this.active) {
        // 35% chance to play a dual-chime breeze flutter
        this.triggerChime();
        if (Math.random() < 0.35) {
          setTimeout(() => {
            if (this.active) {
              const secondScale = config.bellScale;
              this.triggerChime(secondScale[Math.floor(Math.random() * secondScale.length)]);
            }
          }, 240);
        }
        this.scheduleNextChime();
      }
    }, delay);
  }

  private scheduleNextDroplet() {
    if (!this.active) return;
    // Water droplets every 3-6 seconds
    const delay = 3200 + Math.random() * 3800;
    this.dropletTimer = setTimeout(() => {
      if (this.active) {
        this.triggerWaterDroplet();
        this.scheduleNextDroplet();
      }
    }, delay);
  }

  public setMood(mood: SoundscapeMood) {
    this.currentMood = mood;
    if (!this.active || !this.ctx) return;
    const config = SOUNDSCAPE_MOODS[mood];

    this.startPad(this.ctx, config.padChord);
    this.startWaterStream(this.ctx, config.waterFilterFreq);
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
    if (this.dropletTimer) {
      clearTimeout(this.dropletTimer);
      this.dropletTimer = null;
    }

    if (this.masterGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.linearRampToValueAtTime(0.001, now + 0.6);
      setTimeout(() => {
        this.stopPad();
        this.stopWaterStream();
      }, 650);
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
    if (this.analyser && (this.active || this.ctx?.state === 'running')) {
      (this.analyser.getByteFrequencyData as (arr: Uint8Array) => void)(dataArray);
    } else {
      dataArray.fill(0);
    }
  }
}

export const expoSoundscape = new ExpoSoundscapeEngine();
