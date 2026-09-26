/**
 * ChotaPlay Audio Engine
 * Combines Web Speech API (Voice Prompts & Words) and Web Audio API (Procedural SFX)
 * 100% Offline-capable, zero external latency.
 */

class AudioEngine {
  constructor() {
    this.audioCtx = null;
    this.speechSynth = window.speechSynthesis;
    this.isMuted = false;
    this.selectedVoice = null;
    this.initSpeechVoices();
  }

  initAudioContext() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  initSpeechVoices() {
    if (!this.speechSynth) return;
    const loadVoices = () => {
      const voices = this.speechSynth.getVoices();
      // Look for natural English voices (Indian, British, US English)
      this.selectedVoice = voices.find(v => v.lang.includes('en-IN')) ||
                           voices.find(v => v.name.includes('Natural') && v.lang.startsWith('en')) ||
                           voices.find(v => v.name.includes('Google') && v.lang.startsWith('en')) ||
                           voices.find(v => v.lang.startsWith('en')) ||
                           voices[0] || null;
    };
    loadVoices();
    if (this.speechSynth.onvoiceschanged !== undefined) {
      this.speechSynth.onvoiceschanged = loadVoices;
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted && this.speechSynth) {
      this.speechSynth.cancel();
    }
    return this.isMuted;
  }

  speak(text, onEnd = null) {
    if (this.isMuted || !this.speechSynth) {
      if (onEnd) setTimeout(onEnd, 600);
      return;
    }

    this.speechSynth.cancel(); // cancel any active speech

    const utterance = new SpeechSynthesisUtterance(text);
    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
    }
    utterance.rate = 0.88; // Slightly slower, clear for preschool / classroom
    utterance.pitch = 1.08; // Friendly, warm tone
    utterance.lang = 'en-US';

    if (onEnd) {
      utterance.onend = () => onEnd();
      utterance.onerror = () => onEnd();
    }

    this.speechSynth.speak(utterance);
  }

  stopSpeech() {
    if (this.speechSynth) {
      this.speechSynth.cancel();
    }
  }

  // --- Procedural Sound Effects via Web Audio API ---

  playPop() {
    if (this.isMuted) return;
    this.initAudioContext();
    if (!this.audioCtx) return;

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    const now = this.audioCtx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.08);
  }

  playSnap() {
    if (this.isMuted) return;
    this.initAudioContext();
    if (!this.audioCtx) return;

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    const now = this.audioCtx.currentTime;

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.05);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.06);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.06);
  }

  playSparkle() {
    if (this.isMuted) return;
    this.initAudioContext();
    if (!this.audioCtx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
    notes.forEach((freq, idx) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      const startTime = this.audioCtx.currentTime + idx * 0.06;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.18, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.3);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.3);
    });
  }

  playFanfare() {
    if (this.isMuted) return;
    this.initAudioContext();
    if (!this.audioCtx) return;

    const chord = [
      { freq: 440.0, delay: 0.00, dur: 0.12 }, // A4
      { freq: 554.37, delay: 0.10, dur: 0.12 }, // C#5
      { freq: 659.25, delay: 0.20, dur: 0.14 }, // E5
      { freq: 880.0, delay: 0.32, dur: 0.50 }   // A5 high celebration
    ];

    chord.forEach(item => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      const startTime = this.audioCtx.currentTime + item.delay;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(item.freq, startTime);

      gain.gain.setValueAtTime(0.28, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + item.dur);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(startTime);
      osc.stop(startTime + item.dur);
    });
  }

  playGentleTryAgain() {
    if (this.isMuted) return;
    this.initAudioContext();
    if (!this.audioCtx) return;

    const notes = [440, 370]; // Friendly, gentle downward tone
    notes.forEach((freq, idx) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      const startTime = this.audioCtx.currentTime + idx * 0.12;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.2, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.22);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.22);
    });
  }

  playSwoosh() {
    if (this.isMuted) return;
    this.initAudioContext();
    if (!this.audioCtx) return;

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    const now = this.audioCtx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(260, now);
    osc.frequency.exponentialRampToValueAtTime(680, now + 0.2);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.25);
  }
}

export const audio = new AudioEngine();
