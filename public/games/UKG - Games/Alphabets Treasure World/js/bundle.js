/**
 * ChotaPlay Word World - Complete Standalone Bundle
 * Works 100% offline & directly via file:/// with ZERO CORS restrictions!
 */

(function() {
  'use strict';

  // ==========================================
  // 1. ALPHABET DATA (A-Z Fixed Associations)
  // ==========================================
  /**
 * ChotaPlay - LKG Alphabet Adventure Data
 * Fixed A-Z Associations as per educational requirements
 */
const ALPHABET_DATA = [
  { id: 'A', letter: 'A', association: 'Apple', image: 'apple.webp', speech: 'A. A for Apple.', color: '#FF4D4D', bgGlow: 'rgba(255, 77, 77, 0.4)' },
  { id: 'B', letter: 'B', association: 'Ball', image: 'ball.webp', speech: 'B. B for Ball.', color: '#3A86FF', bgGlow: 'rgba(58, 134, 255, 0.4)' },
  { id: 'C', letter: 'C', association: 'Cat', image: 'cat.webp', speech: 'C. C for Cat.', color: '#FFBE0B', bgGlow: 'rgba(255, 190, 11, 0.4)' },
  { id: 'D', letter: 'D', association: 'Dog', image: 'dog.webp', speech: 'D. D for Dog.', color: '#FB5607', bgGlow: 'rgba(251, 86, 7, 0.4)' },
  { id: 'E', letter: 'E', association: 'Elephant', image: 'elephant.webp', speech: 'E. E for Elephant.', color: '#8338EC', bgGlow: 'rgba(131, 56, 236, 0.4)' },
  { id: 'F', letter: 'F', association: 'Fish', image: 'fish.webp', speech: 'F. F for Fish.', color: '#06D6A0', bgGlow: 'rgba(6, 214, 160, 0.4)' },
  { id: 'G', letter: 'G', association: 'Grapes', image: 'grapes.webp', speech: 'G. G for Grapes.', color: '#7209B7', bgGlow: 'rgba(114, 9, 183, 0.4)' },
  { id: 'H', letter: 'H', association: 'Hen', image: 'hen.webp', speech: 'H. H for Hen.', color: '#E76F51', bgGlow: 'rgba(231, 111, 81, 0.4)' },
  { id: 'I', letter: 'I', association: 'Ice Cream', image: 'ice cream.webp', speech: 'I. I for Ice Cream.', color: '#FF70A6', bgGlow: 'rgba(255, 112, 166, 0.4)' },
  { id: 'J', letter: 'J', association: 'Jug', image: 'jug.webp', speech: 'J. J for Jug.', color: '#2A9D8F', bgGlow: 'rgba(42, 157, 143, 0.4)' },
  { id: 'K', letter: 'K', association: 'Kite', image: 'kite.webp', speech: 'K. K for Kite.', color: '#E63946', bgGlow: 'rgba(230, 57, 70, 0.4)' },
  { id: 'L', letter: 'L', association: 'Lion', image: 'lion.webp', speech: 'L. L for Lion.', color: '#F4A261', bgGlow: 'rgba(244, 162, 97, 0.4)' },
  { id: 'M', letter: 'M', association: 'Mango', image: 'mango.webp', speech: 'M. M for Mango.', color: '#FFB703', bgGlow: 'rgba(255, 183, 3, 0.4)' },
  { id: 'N', letter: 'N', association: 'Nest', image: 'nest.webp', speech: 'N. N for Nest.', color: '#9C6644', bgGlow: 'rgba(156, 102, 68, 0.4)' },
  { id: 'O', letter: 'O', association: 'Orange', image: 'orange.webp', speech: 'O. O for Orange.', color: '#FB8500', bgGlow: 'rgba(251, 133, 0, 0.4)' },
  { id: 'P', letter: 'P', association: 'Parrot', image: 'parrot.webp', speech: 'P. P for Parrot.', color: '#52B788', bgGlow: 'rgba(82, 183, 136, 0.4)' },
  { id: 'Q', letter: 'Q', association: 'Quilt', image: 'quilt.webp', speech: 'Q. Q for Quilt.', color: '#4361EE', bgGlow: 'rgba(67, 97, 238, 0.4)' },
  { id: 'R', letter: 'R', association: 'Rabbit', image: 'rabbit.webp', speech: 'R. R for Rabbit.', color: '#F72585', bgGlow: 'rgba(247, 37, 133, 0.4)' },
  { id: 'S', letter: 'S', association: 'Sun', image: 'sun.webp', speech: 'S. S for Sun.', color: '#FFD166', bgGlow: 'rgba(255, 209, 102, 0.4)' },
  { id: 'T', letter: 'T', association: 'Tiger', image: 'tiger.webp', speech: 'T. T for Tiger.', color: '#F77F00', bgGlow: 'rgba(247, 127, 0, 0.4)' },
  { id: 'U', letter: 'U', association: 'Umbrella', image: 'umbrella.webp', speech: 'U. U for Umbrella.', color: '#4CC9F0', bgGlow: 'rgba(76, 201, 240, 0.4)' },
  { id: 'V', letter: 'V', association: 'Van', image: 'van.webp', speech: 'V. V for Van.', color: '#3D5A80', bgGlow: 'rgba(61, 90, 128, 0.4)' },
  { id: 'W', letter: 'W', association: 'Watch', image: 'watch.webp', speech: 'W. W for Watch.', color: '#9B5DE5', bgGlow: 'rgba(155, 93, 229, 0.4)' },
  { id: 'X', letter: 'X', association: 'Xylophone', image: 'Xylophone.webp', speech: 'X. X for Xylophone.', color: '#F15BB5', bgGlow: 'rgba(241, 91, 181, 0.4)' },
  { id: 'Y', letter: 'Y', association: 'Yo-yo', image: 'yoyo.webp', speech: 'Y. Y for Yo-yo.', color: '#00BBF9', bgGlow: 'rgba(0, 187, 249, 0.4)' },
  { id: 'Z', letter: 'Z', association: 'Zebra', image: 'zebra.webp', speech: 'Z. Z for Zebra.', color: '#2B2D42', bgGlow: 'rgba(43, 45, 66, 0.4)' }
];


  // ==========================================
  // 2. WORD DATA (UKG & Class 1)
  // ==========================================
  /**
 * ChotaPlay - UKG & Class 1 Word Datasets
 * Level 1 (2-3 letters), Level 2 (4 letters), Level 3 (5+ letters)
 */
const WORD_DATA = {
  level1: [
    { id: 'w1_cat', word: 'CAT', letters: ['C', 'A', 'T'], difficulty: 1, image: 'cat.webp', speech: 'Cat.', category: 'Animals', themeColor: '#FFBE0B' },
    { id: 'w1_dog', word: 'DOG', letters: ['D', 'O', 'G'], difficulty: 1, image: 'dog.webp', speech: 'Dog.', category: 'Animals', themeColor: '#FB5607' },
    { id: 'w1_sun', word: 'SUN', letters: ['S', 'U', 'N'], difficulty: 1, image: 'sun.webp', speech: 'Sun.', category: 'Nature', themeColor: '#FFD166' },
    { id: 'w1_hen', word: 'HEN', letters: ['H', 'E', 'N'], difficulty: 1, image: 'hen.webp', speech: 'Hen.', category: 'Birds', themeColor: '#E76F51' },
    { id: 'w1_jug', word: 'JUG', letters: ['J', 'U', 'G'], difficulty: 1, image: 'jug.webp', speech: 'Jug.', category: 'Objects', themeColor: '#2A9D8F' },
    { id: 'w1_van', word: 'VAN', letters: ['V', 'A', 'N'], difficulty: 1, image: 'van.webp', speech: 'Van.', category: 'Vehicles', themeColor: '#3D5A80' }
  ],
  level2: [
    { id: 'w2_fish', word: 'FISH', letters: ['F', 'I', 'S', 'H'], difficulty: 2, image: 'fish.webp', speech: 'Fish.', category: 'Animals', themeColor: '#06D6A0' },
    { id: 'w2_lion', word: 'LION', letters: ['L', 'I', 'O', 'N'], difficulty: 2, image: 'lion.webp', speech: 'Lion.', category: 'Animals', themeColor: '#F4A261' },
    { id: 'w2_kite', word: 'KITE', letters: ['K', 'I', 'T', 'E'], difficulty: 2, image: 'kite.webp', speech: 'Kite.', category: 'Toys', themeColor: '#E63946' },
    { id: 'w2_nest', word: 'NEST', letters: ['N', 'E', 'S', 'T'], difficulty: 2, image: 'nest.webp', speech: 'Nest.', category: 'Nature', themeColor: '#9C6644' },
    { id: 'w2_ball', word: 'BALL', letters: ['B', 'A', 'L', 'L'], difficulty: 2, image: 'ball.webp', speech: 'Ball.', category: 'Toys', themeColor: '#3A86FF' },
    { id: 'w2_yoyo', word: 'YOYO', letters: ['Y', 'O', 'Y', 'O'], difficulty: 2, image: 'yoyo.webp', speech: 'Yo-yo.', category: 'Toys', themeColor: '#00BBF9' }
  ],
  level3: [
    { id: 'w3_apple', word: 'APPLE', letters: ['A', 'P', 'P', 'L', 'E'], difficulty: 3, image: 'apple.webp', speech: 'Apple.', category: 'Fruits', themeColor: '#FF4D4D' },
    { id: 'w3_mango', word: 'MANGO', letters: ['M', 'A', 'N', 'G', 'O'], difficulty: 3, image: 'mango.webp', speech: 'Mango.', category: 'Fruits', themeColor: '#FFB703' },
    { id: 'w3_tiger', word: 'TIGER', letters: ['T', 'I', 'G', 'E', 'R'], difficulty: 3, image: 'tiger.webp', speech: 'Tiger.', category: 'Animals', themeColor: '#F77F00' },
    { id: 'w3_zebra', word: 'ZEBRA', letters: ['Z', 'E', 'B', 'R', 'A'], difficulty: 3, image: 'zebra.webp', speech: 'Zebra.', category: 'Animals', themeColor: '#2B2D42' },
    { id: 'w3_grapes', word: 'GRAPES', letters: ['G', 'R', 'A', 'P', 'E', 'S'], difficulty: 3, image: 'grapes.webp', speech: 'Grapes.', category: 'Fruits', themeColor: '#7209B7' },
    { id: 'w3_orange', word: 'ORANGE', letters: ['O', 'R', 'A', 'N', 'G', 'E'], difficulty: 3, image: 'orange.webp', speech: 'Orange.', category: 'Fruits', themeColor: '#FB8500' },
    { id: 'w3_parrot', word: 'PARROT', letters: ['P', 'A', 'R', 'R', 'O', 'T'], difficulty: 3, image: 'parrot.webp', speech: 'Parrot.', category: 'Birds', themeColor: '#52B788' },
    { id: 'w3_rabbit', word: 'RABBIT', letters: ['R', 'A', 'B', 'B', 'I', 'T'], difficulty: 3, image: 'rabbit.webp', speech: 'Rabbit.', category: 'Animals', themeColor: '#F72585' },
    { id: 'w3_quilt', word: 'QUILT', letters: ['Q', 'U', 'I', 'L', 'T'], difficulty: 3, image: 'quilt.webp', speech: 'Quilt.', category: 'Objects', themeColor: '#4361EE' },
    { id: 'w3_watch', word: 'WATCH', letters: ['W', 'A', 'T', 'C', 'H'], difficulty: 3, image: 'watch.webp', speech: 'Watch.', category: 'Objects', themeColor: '#9B5DE5' }
  ]
};
const ALL_WORDS = [
  ...WORD_DATA.level1,
  ...WORD_DATA.level2,
  ...WORD_DATA.level3
];


  // ==========================================
  // 3. AUDIO ENGINE (Speech + Procedural SFX)
  // ==========================================
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
const audio = new AudioEngine();


  // ==========================================
  // 4. PARTICLE & CELEBRATION ENGINE
  // ==========================================
  /**
 * ChotaPlay Particle & Celebration Engine
 * Handles full-screen magical sparkles, confetti bursts, and living word star trails.
 */

class ParticleEngine {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.animationId = null;
  }

  init(canvasElement) {
    this.canvas = canvasElement;
    this.ctx = this.canvas.getContext('2d');
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createSparkle(x, y, count = 25, colorList = ['#FFD166', '#06D6A0', '#118AB2', '#EF476F', '#FFBE0B', '#8338EC']) {
    if (!this.canvas) return;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 6;
      this.particles.push({
        x: x || this.canvas.width / 2,
        y: y || this.canvas.height / 2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 3 + Math.random() * 6,
        color: colorList[Math.floor(Math.random() * colorList.length)],
        alpha: 1,
        decay: 0.015 + Math.random() * 0.02,
        type: 'sparkle',
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 10
      });
    }
    this.startLoop();
  }

  createConfetti(count = 60) {
    if (!this.canvas) return;
    const colors = ['#FF4D4D', '#3A86FF', '#FFBE0B', '#06D6A0', '#8338EC', '#FB5607', '#FF70A6'];
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: -20 - Math.random() * 100,
        vx: (Math.random() - 0.5) * 4,
        vy: 3 + Math.random() * 5,
        width: 8 + Math.random() * 10,
        height: 12 + Math.random() * 12,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        decay: 0.006 + Math.random() * 0.006,
        type: 'confetti',
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 12
      });
    }
    this.startLoop();
  }

  startLoop() {
    if (this.animationId) return;
    const render = () => {
      if (!this.ctx || !this.canvas) return;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;
        p.rotation += p.rotSpeed || 0;

        if (p.type === 'confetti') {
          p.vy += 0.05; // gravity
        }

        if (p.alpha <= 0) {
          this.particles.splice(i, 1);
          continue;
        }

        this.ctx.save();
        this.ctx.globalAlpha = Math.max(0, p.alpha);
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate((p.rotation * Math.PI) / 180);

        if (p.type === 'sparkle') {
          this.ctx.fillStyle = p.color;
          this.ctx.beginPath();
          // Draw 4-point star
          const s = p.size;
          this.ctx.moveTo(0, -s * 1.6);
          this.ctx.lineTo(s * 0.4, -s * 0.4);
          this.ctx.lineTo(s * 1.6, 0);
          this.ctx.lineTo(s * 0.4, s * 0.4);
          this.ctx.lineTo(0, s * 1.6);
          this.ctx.lineTo(-s * 0.4, s * 0.4);
          this.ctx.lineTo(-s * 1.6, 0);
          this.ctx.lineTo(-s * 0.4, -s * 0.4);
          this.ctx.closePath();
          this.ctx.fill();
        } else if (p.type === 'confetti') {
          this.ctx.fillStyle = p.color;
          this.ctx.fillRect(-p.width / 2, -p.height / 2, p.width, p.height);
        }

        this.ctx.restore();
      }

      if (this.particles.length > 0) {
        this.animationId = requestAnimationFrame(render);
      } else {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.animationId = null;
      }
    };
    this.animationId = requestAnimationFrame(render);
  }
}
const particles = new ParticleEngine();


  // ==========================================
  // 5. LKG GAME CONTROLLER
  // ==========================================
  /**
 * ChotaPlay - LKG Alphabet Adventure Game Controller
 * Educational Focus: Letter Recognition (A-Z) & Fixed Associations
 */
class LKGGame {
  constructor(container, onUpdateProgress, initialState = null) {
    this.container = container;
    this.onUpdateProgress = onUpdateProgress;
    this.currentIndex = (initialState && typeof initialState.currentIndex === 'number' && initialState.currentIndex >= 0 && initialState.currentIndex < ALPHABET_DATA.length) ? initialState.currentIndex : 0;
    this.difficulty = initialState?.difficulty || 'beginner'; // 'beginner' (3), 'intermediate' (6), 'advanced' (10)
    this.completedLetters = new Set(initialState?.completedLetters || []);
    this.isInteracting = false;
    this.timers = [];
  }

  setTimer(fn, delay) {
    const id = setTimeout(() => {
      this.timers = this.timers.filter(t => t !== id);
      fn();
    }, delay);
    this.timers.push(id);
    return id;
  }

  clearAllTimers() {
    this.timers.forEach(id => clearTimeout(id));
    this.timers = [];
  }

  destroy() {
    this.clearAllTimers();
    this.isInteracting = false;
    audio.stopSpeech();
  }

  getState() {
    return {
      currentIndex: this.currentIndex,
      difficulty: this.difficulty,
      completedLetters: Array.from(this.completedLetters)
    };
  }

  init() {
    this.render();
    if (this.currentIndex >= ALPHABET_DATA.length) this.currentIndex = 0;
    this.loadLetter(this.currentIndex);
  }

  setDifficulty(level) {
    this.difficulty = level;
    this.loadLetter(this.currentIndex);
  }

  render() {
    this.container.innerHTML = `
      <div class="lkg-stage">
        <!-- Top Prompt Banner -->
        <div class="lkg-prompt-banner">
          <div class="prompt-text">Find the Letter</div>
          <div class="target-letter-badge" id="lkgTargetLetter">A</div>
          <div class="difficulty-pills">
            <button class="diff-btn ${this.difficulty === 'beginner' ? 'active' : ''}" data-diff="beginner">3 Options</button>
            <button class="diff-btn ${this.difficulty === 'intermediate' ? 'active' : ''}" data-diff="intermediate">6 Options</button>
            <button class="diff-btn ${this.difficulty === 'advanced' ? 'active' : ''}" data-diff="advanced">10 Options</button>
          </div>
        </div>

        <!-- Central Interactive Arena -->
        <div class="lkg-arena" id="lkgArena">
          <div class="lkg-letter-grid" id="lkgLetterGrid"></div>
          <div class="lkg-discovery-modal" id="lkgDiscoveryModal" style="display: none;"></div>
        </div>

        <!-- Mascot Character Guide -->
        <div class="mascot-companion">
          <div class="mascot-img-container">
            <img src="assets/characters/chotu.png" alt="Chotu" class="mascot-avatar" id="mascotAvatar" onerror="this.style.display='none'">
          </div>
          <div class="mascot-speech-bubble" id="mascotSpeech">
            Can you find <strong>A</strong>?
          </div>
        </div>
      </div>
    `;

    // Difficulty toggle listeners
    this.container.querySelectorAll('.diff-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.container.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        this.setDifficulty(e.target.dataset.diff);
      });
    });
  }

  loadLetter(index) {
    this.clearAllTimers();
    this.currentIndex = index;
    const current = ALPHABET_DATA[this.currentIndex];
    this.isInteracting = false;

    // Update prompt
    const targetBadge = document.getElementById('lkgTargetLetter');
    if (targetBadge) {
      targetBadge.textContent = current.letter;
      targetBadge.style.background = `linear-gradient(135deg, ${current.color} 0%, #FFA07A 100%)`;
    }

    // Update Mascot Speech
    this.updateMascot(`Can you find <strong style="color: ${current.color}">${current.letter}</strong>?`);

    // Hide discovery modal
    const discoveryModal = document.getElementById('lkgDiscoveryModal');
    if (discoveryModal) discoveryModal.style.display = 'none';

    // Generate distractors based on difficulty
    const count = this.difficulty === 'beginner' ? 3 : this.difficulty === 'intermediate' ? 6 : 10;
    const options = this.generateOptions(current.letter, count);

    // Render Grid
    const grid = document.getElementById('lkgLetterGrid');
    if (grid) {
      grid.style.display = 'flex';
      grid.innerHTML = '';
      options.forEach(letter => {
        const bubble = document.createElement('button');
        bubble.className = 'letter-bubble';
        bubble.textContent = letter;
        bubble.setAttribute('aria-label', `Letter ${letter}`);
        bubble.addEventListener('click', () => this.handleLetterClick(letter, bubble));
        grid.appendChild(bubble);
      });
    }

    // Voice prompt
    audio.speak(`Can you find ${current.letter}?`);

    // Notify parent of progress
    if (this.onUpdateProgress) {
      this.onUpdateProgress({
        current: this.currentIndex + 1,
        total: ALPHABET_DATA.length,
        title: `${current.letter} — ${current.association}`,
        completed: this.completedLetters.has(current.id)
      });
    }
  }

  generateOptions(correctLetter, totalCount) {
    const allLetters = ALPHABET_DATA.map(d => d.letter).filter(l => l !== correctLetter);
    // Shuffle distractors
    const shuffled = [...allLetters].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, totalCount - 1);
    selected.push(correctLetter);
    // Shuffle final set
    return selected.sort(() => 0.5 - Math.random());
  }

  handleLetterClick(clickedLetter, bubbleElement) {
    if (this.isInteracting) return;
    const current = ALPHABET_DATA[this.currentIndex];

    if (clickedLetter === current.letter) {
      this.handleCorrectAnswer(bubbleElement, current);
    } else {
      this.handleWrongAnswer(bubbleElement);
    }
  }

  handleCorrectAnswer(bubbleElement, item) {
    this.isInteracting = true;
    this.completedLetters.add(item.id);

    // Audio SFX & Voice
    audio.playSparkle();
    audio.playFanfare();

    // Bubble visual celebration
    bubbleElement.classList.add('correct-hit');
    const rect = bubbleElement.getBoundingClientRect();
    particles.createSparkle(rect.left + rect.width / 2, rect.top + rect.height / 2, 35);
    particles.createConfetti(45);

    this.updateMascot(`Super! <strong>${item.letter} for ${item.association}</strong>! 🎉`);

    // Show discovery scene after brief delay
    this.setTimer(() => {
      const grid = document.getElementById('lkgLetterGrid');
      const discoveryModal = document.getElementById('lkgDiscoveryModal');
      if (grid) grid.style.display = 'none';

      if (discoveryModal) {
        discoveryModal.style.display = 'flex';
        discoveryModal.innerHTML = `
          <div class="discovery-card" style="border-color: ${item.color}">
            <div class="discovery-object-container">
              <img src="assets/objects/${item.image}" alt="${item.association}" class="discovery-real-image" onerror="this.src='WORD WORLD/${item.image}'">
            </div>
            <div class="discovery-heading">
              <span class="discovery-letter-highlight" style="color: ${item.color}">${item.letter}</span> for 
              <span class="discovery-association-word">${item.association}</span>
            </div>
          </div>
        `;
      }

      // Speak Letter and Association clearly
      audio.speak(`${item.letter}! ${item.letter} for ${item.association}.`);

      // Update progress
      if (this.onUpdateProgress) {
        this.onUpdateProgress({
          current: this.currentIndex + 1,
          total: ALPHABET_DATA.length,
          title: `${item.letter} — ${item.association}`,
          completed: true
        });
      }
    }, 800);
  }

  handleWrongAnswer(bubbleElement) {
    audio.playGentleTryAgain();
    bubbleElement.classList.add('wobble-error');
    this.updateMascot(`Try again! You can do it! 😊`);
    audio.speak("Try again.");

    this.setTimer(() => {
      if (bubbleElement) bubbleElement.classList.remove('wobble-error');
    }, 600);
  }

  updateMascot(text) {
    const speech = document.getElementById('mascotSpeech');
    if (speech) {
      speech.innerHTML = text;
    }
  }

  // Teacher Controls
  repeat() {
    this.loadLetter(this.currentIndex);
  }

  next() {
    if (this.currentIndex < ALPHABET_DATA.length - 1) {
      this.loadLetter(this.currentIndex + 1);
    } else {
      this.loadLetter(0); // Loop or wrap
    }
  }

  previous() {
    if (this.currentIndex > 0) {
      this.loadLetter(this.currentIndex - 1);
    }
  }

  jumpTo(index) {
    if (index >= 0 && index < ALPHABET_DATA.length) {
      this.loadLetter(index);
    }
  }

  getDataset() {
    return ALPHABET_DATA.map((d, i) => ({
      index: i,
      label: d.letter,
      sub: d.association,
      completed: this.completedLetters.has(d.id)
    }));
  }
}


  // ==========================================
  // 6. UKG GAME CONTROLLER
  // ==========================================
  /**
 * ChotaPlay - UKG Word Builder Game Controller
 * Educational Focus: Letter Combination & Living Word Transformation
 */
class UKGGame {
  constructor(container, onUpdateProgress, initialState = null) {
    this.container = container;
    this.onUpdateProgress = onUpdateProgress;
    this.currentLevel = initialState?.currentLevel || 'level1';
    this.currentIndex = (initialState && typeof initialState.currentIndex === 'number' && initialState.currentIndex >= 0) ? initialState.currentIndex : 0;
    this.completedWords = new Set(initialState?.completedWords || []);
    this.stageState = 'separated'; // 'separated', 'combining', 'transformed', 'revealed'
    this.isAnimating = false;
    this.timers = [];
  }

  setTimer(fn, delay) {
    const id = setTimeout(() => {
      this.timers = this.timers.filter(t => t !== id);
      fn();
    }, delay);
    this.timers.push(id);
    return id;
  }

  clearAllTimers() {
    this.timers.forEach(id => clearTimeout(id));
    this.timers = [];
  }

  destroy() {
    this.clearAllTimers();
    this.isAnimating = false;
    audio.stopSpeech();
  }

  getState() {
    return {
      currentLevel: this.currentLevel,
      currentIndex: this.currentIndex,
      completedWords: Array.from(this.completedWords)
    };
  }

  init() {
    this.render();
    const list = this.getCurrentList();
    if (this.currentIndex >= list.length) this.currentIndex = 0;
    this.loadWord(this.currentIndex);
  }

  getCurrentList() {
    return WORD_DATA[this.currentLevel] || WORD_DATA.level1;
  }

  setLevel(level) {
    this.currentLevel = level;
    this.currentIndex = 0;
    this.loadWord(0);
  }

  render() {
    this.container.innerHTML = `
      <div class="ukg-stage">
        <!-- UKG Prompt Banner -->
        <div class="ukg-prompt-banner">
          <div class="prompt-text">Word Builder</div>
          <div class="ukg-level-pills">
            <button class="ukg-level-btn ${this.currentLevel === 'level1' ? 'active' : ''}" data-lvl="level1">Level 1 (3 Letters)</button>
            <button class="ukg-level-btn ${this.currentLevel === 'level2' ? 'active' : ''}" data-lvl="level2">Level 2 (4 Letters)</button>
            <button class="ukg-level-btn ${this.currentLevel === 'level3' ? 'active' : ''}" data-lvl="level3">Level 3 (5+ Letters)</button>
          </div>
        </div>

        <!-- Central Interactive Arena -->
        <div class="ukg-arena" id="ukgArena">
          <div id="ukgActiveScene"></div>
        </div>

        <!-- Mascot Character Guide -->
        <div class="mascot-companion">
          <div class="mascot-img-container">
            <img src="assets/characters/chotu.png" alt="Chotu" class="mascot-avatar" onerror="this.style.display='none'">
          </div>
          <div class="mascot-speech-bubble" id="ukgMascotSpeech">
            What word can we make?
          </div>
        </div>
      </div>
    `;

    // Level selector listeners
    this.container.querySelectorAll('.ukg-level-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.container.querySelectorAll('.ukg-level-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        this.setLevel(e.target.dataset.lvl);
      });
    });
  }

  loadWord(index) {
    this.clearAllTimers();
    const list = this.getCurrentList();
    if (index < 0 || index >= list.length) index = 0;
    this.currentIndex = index;
    const current = list[this.currentIndex];
    this.stageState = 'separated';
    this.isAnimating = false;

    this.updateMascot(`What word can we make with these letters? 🤔`);

    // Render separated letter tiles
    const arena = document.getElementById('ukgActiveScene');
    if (arena) {
      arena.innerHTML = `
        <div class="ukg-letters-row" id="ukgLettersRow">
          ${current.letters.map((letter, i) => `
            <div class="ukg-letter-tile" style="animation: popIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.1}s both;">
              ${letter}
            </div>
          `).join('')}
        </div>
        <button class="btn-combine-action" id="btnCombineWord">
          <span>✨ Combine Letters!</span>
        </button>
      `;

      const combineBtn = document.getElementById('btnCombineWord');
      if (combineBtn) {
        combineBtn.addEventListener('click', () => this.runWordTransformation());
      }
    }

    // Voice prompt: spell each letter then ask
    const letterSpeech = current.letters.join(', ');
    audio.speak(`${letterSpeech}. What word can we make?`);

    // Progress update
    if (this.onUpdateProgress) {
      this.onUpdateProgress({
        current: this.currentIndex + 1,
        total: list.length,
        title: `${current.word} (${this.currentLevel.toUpperCase()})`,
        completed: this.completedWords.has(current.id)
      });
    }
  }

  runWordTransformation() {
    if (this.isAnimating) return;
    this.isAnimating = true;
    const list = this.getCurrentList();
    const current = list[this.currentIndex];

    const combineBtn = document.getElementById('btnCombineWord');
    if (combineBtn) combineBtn.style.display = 'none';

    const lettersRow = document.getElementById('ukgLettersRow');
    if (lettersRow) {
      lettersRow.classList.add('combining');
    }

    // Sound: Letter slide & swoosh
    audio.playSwoosh();
    this.updateMascot(`Watch the letters come alive! ✨`);

    // Step 2: Morph into Living Word Sculpture
    this.setTimer(() => {
      audio.playSparkle();
      const arena = document.getElementById('ukgActiveScene');
      if (arena) {
        arena.innerHTML = `
          <div class="ukg-living-word-box">
            <div class="living-letters-sculpture">
              ${current.letters.map(l => `<span>${l}</span>`).join('')}
            </div>
          </div>
        `;
      }

      // Sparkles at the center
      const arenaRect = arena ? arena.getBoundingClientRect() : null;
      if (arenaRect) {
        particles.createSparkle(arenaRect.left + arenaRect.width / 2, arenaRect.top + arenaRect.height / 2, 40);
      }

      // Step 3: Real Object appears and spelling displays
      this.setTimer(() => {
        this.completedWords.add(current.id);
        audio.playFanfare();
        particles.createConfetti(50);

        if (arena) {
          arena.innerHTML = `
            <div class="ukg-real-object-scene">
              <div class="ukg-object-glow-wrap">
                <img src="assets/objects/${current.image}" alt="${current.word}" class="ukg-real-image" onerror="this.src='WORD WORLD/${current.image}'">
              </div>
              <div class="ukg-spelling-display">
                ${current.word}
              </div>
            </div>
          `;
        }

        this.updateMascot(`Awesome! The letters made <strong>${current.word}</strong>! 🌟`);
        audio.speak(`${current.speech}`);
        this.isAnimating = false;

        // Progress update
        if (this.onUpdateProgress) {
          this.onUpdateProgress({
            current: this.currentIndex + 1,
            total: list.length,
            title: `${current.word} (${this.currentLevel.toUpperCase()})`,
            completed: true
          });
        }
      }, 1600);
    }, 1000);
  }

  updateMascot(text) {
    const speech = document.getElementById('ukgMascotSpeech');
    if (speech) {
      speech.innerHTML = text;
    }
  }

  // Teacher Controls
  repeat() {
    this.loadWord(this.currentIndex);
  }

  next() {
    const list = this.getCurrentList();
    if (this.currentIndex < list.length - 1) {
      this.loadWord(this.currentIndex + 1);
    } else {
      this.loadWord(0);
    }
  }

  previous() {
    if (this.currentIndex > 0) {
      this.loadWord(this.currentIndex - 1);
    }
  }

  jumpTo(index) {
    const list = this.getCurrentList();
    if (index >= 0 && index < list.length) {
      this.loadWord(index);
    }
  }

  getDataset() {
    const list = this.getCurrentList();
    return list.map((d, i) => ({
      index: i,
      label: d.word,
      sub: `Level ${d.difficulty}`,
      completed: this.completedWords.has(d.id)
    }));
  }
}


  // ==========================================
  // 7. CLASS 1 GAME CONTROLLER
  // ==========================================
  /**
 * ChotaPlay - Class 1 Jumbled Word Adventure Game Controller
 * Educational Focus: Letter Order, Spelling & Jumbled Resolution
 */
class Class1Game {
  constructor(container, onUpdateProgress, initialState = null) {
    this.container = container;
    this.onUpdateProgress = onUpdateProgress;
    this.currentLevel = initialState?.currentLevel || 'level1';
    this.currentIndex = (initialState && typeof initialState.currentIndex === 'number' && initialState.currentIndex >= 0) ? initialState.currentIndex : 0;
    this.completedWords = new Set(initialState?.completedWords || []);
    this.slots = [];
    this.jumbledTiles = [];
    this.isSolved = false;
    this.timers = [];
  }

  setTimer(fn, delay) {
    const id = setTimeout(() => {
      this.timers = this.timers.filter(t => t !== id);
      fn();
    }, delay);
    this.timers.push(id);
    return id;
  }

  clearAllTimers() {
    this.timers.forEach(id => clearTimeout(id));
    this.timers = [];
  }

  destroy() {
    this.clearAllTimers();
    this.isSolved = false;
    audio.stopSpeech();
  }

  init() {
    this.render();
    const list = this.getCurrentList();
    if (this.currentIndex >= list.length) this.currentIndex = 0;
    this.loadWord(this.currentIndex, true);
  }

  getCurrentList() {
    return WORD_DATA[this.currentLevel] || WORD_DATA.level1;
  }

  setLevel(level) {
    this.currentLevel = level;
    this.currentIndex = 0;
    this.loadWord(0, true);
  }

  render() {
    this.container.innerHTML = `
      <div class="class1-stage">
        <!-- Class 1 Prompt Banner -->
        <div class="class1-prompt-banner">
          <div class="prompt-text">Jumbled Word Adventure</div>
          <div class="ukg-level-pills">
            <button class="ukg-level-btn ${this.currentLevel === 'level1' ? 'active' : ''}" data-lvl="level1">Level 1 (3 Letters)</button>
            <button class="ukg-level-btn ${this.currentLevel === 'level2' ? 'active' : ''}" data-lvl="level2">Level 2 (4 Letters)</button>
            <button class="ukg-level-btn ${this.currentLevel === 'level3' ? 'active' : ''}" data-lvl="level3">Level 3 (5+ Letters)</button>
          </div>
        </div>

        <!-- Central Interactive Arena -->
        <div class="class1-arena" id="class1Arena">
          <!-- Clue Image -->
          <div class="clue-visual-wrap" id="class1ClueWrap"></div>

          <!-- Answer Drop Slots -->
          <div class="target-slots-row" id="class1SlotsRow"></div>

          <!-- Jumbled Letters to Arrange -->
          <div class="jumbled-tiles-row" id="class1JumbledRow"></div>
        </div>

        <!-- Bottom Dock: Mascot Sentence on Left, Action Buttons on Right -->
        <div class="class1-bottom-dock">
          <!-- Mascot Character Guide & Sentence -->
          <div class="mascot-companion">
            <div class="mascot-img-container">
              <img src="assets/characters/chotu.png" alt="Chotu" class="mascot-avatar" onerror="this.style.display='none'">
            </div>
            <div class="mascot-speech-bubble" id="class1MascotSpeech">
              What is this? Can you make the word?
            </div>
          </div>

          <!-- Action Controls to the Right Side -->
          <div class="class1-action-row" id="class1ActionRow">
            <button class="btn-check-word" id="btnCheckOrder">Check Spelling ✨</button>
            <button class="btn-reset-tiles" id="btnResetJumble">Reset Tiles ↺</button>
          </div>
        </div>
      </div>
    `;

    // Level selector listeners
    this.container.querySelectorAll('.ukg-level-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.container.querySelectorAll('.ukg-level-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        this.setLevel(e.target.dataset.lvl);
      });
    });

    const btnCheck = document.getElementById('btnCheckOrder');
    if (btnCheck) btnCheck.addEventListener('click', () => this.validateAnswer());

    const btnReset = document.getElementById('btnResetJumble');
    if (btnReset) btnReset.addEventListener('click', () => this.resetTilesToJumble());
  }

  loadWord(index, speakPrompt = true) {
    this.clearAllTimers();
    const list = this.getCurrentList();
    if (index < 0 || index >= list.length) index = 0;
    this.currentIndex = index;
    const current = list[this.currentIndex];
    this.isSolved = false;

    // Set Clue Image
    const clueWrap = document.getElementById('class1ClueWrap');
    if (clueWrap) {
      clueWrap.innerHTML = `
        <img src="assets/objects/${current.image}" alt="Clue" class="clue-image" id="clueImg" onerror="this.src='WORD WORLD/${current.image}'">
      `;
    }

    // Generate Jumbled Order (guaranteed jumble !== word)
    const jumbledLetters = this.generateJumble(current.letters);

    this.slots = new Array(current.letters.length).fill(null);
    this.jumbledTiles = jumbledLetters.map((char, idx) => ({ id: `tile_${idx}`, char, placedInSlot: null }));

    this.renderSlotsAndTiles();

    this.updateMascot(`What is this? Can you arrange the letters to spell it? 🤔`);
    if (speakPrompt) {
      audio.speak(`What is this? Can you make the word?`);
    }

    // Progress update
    if (this.onUpdateProgress) {
      this.onUpdateProgress({
        current: this.currentIndex + 1,
        total: list.length,
        title: `${current.word} (${this.currentLevel.toUpperCase()})`,
        completed: this.completedWords.has(current.id),
        state: this.getState()
      });
    }
  }

  getState() {
    return {
      currentLevel: this.currentLevel,
      currentIndex: this.currentIndex,
      completedWords: Array.from(this.completedWords)
    };
  }

  generateJumble(letters) {
    const original = letters.join('');
    let jumbled = [...letters];

    if (letters.length <= 1) return jumbled;

    let attempts = 0;
    while (attempts < 20) {
      jumbled = [...letters].sort(() => 0.5 - Math.random());
      if (jumbled.join('') !== original) {
        return jumbled;
      }
      attempts++;
    }

    // Fallback swap if random didn't change
    if (jumbled.join('') === original) {
      const temp = jumbled[0];
      jumbled[0] = jumbled[1];
      jumbled[1] = temp;
    }
    return jumbled;
  }

  renderSlotsAndTiles() {
    const current = this.getCurrentList()[this.currentIndex];
    const slotsRow = document.getElementById('class1SlotsRow');
    const jumbledRow = document.getElementById('class1JumbledRow');

    if (!slotsRow || !jumbledRow) return;

    // Render Slots
    slotsRow.innerHTML = '';
    current.letters.forEach((_, slotIdx) => {
      const slotEl = document.createElement('div');
      slotEl.className = 'letter-slot';
      slotEl.dataset.slotIndex = slotIdx;

      // Handle Drag Over / Drop
      slotEl.addEventListener('dragover', (e) => {
        e.preventDefault();
        slotEl.classList.add('drag-over');
      });
      slotEl.addEventListener('dragleave', () => {
        slotEl.classList.remove('drag-over');
      });
      slotEl.addEventListener('drop', (e) => {
        e.preventDefault();
        slotEl.classList.remove('drag-over');
        const tileId = e.dataTransfer.getData('text/plain');
        this.placeTileInSlot(tileId, slotIdx);
      });

      // Handle Tap/Click on slot to remove tile
      slotEl.addEventListener('click', () => {
        const tile = this.jumbledTiles.find(t => t.placedInSlot === slotIdx);
        if (tile) {
          tile.placedInSlot = null;
          audio.playPop();
          this.renderSlotsAndTiles();
        }
      });

      // Check if slot has tile placed
      const placedTile = this.jumbledTiles.find(t => t.placedInSlot === slotIdx);
      if (placedTile) {
        slotEl.classList.add('filled');
        slotEl.textContent = placedTile.char;
        slotEl.style.fontSize = '56px';
        slotEl.style.fontWeight = '900';
        slotEl.style.fontFamily = 'var(--font-display)';
        slotEl.style.color = 'var(--color-navy)';
      }

      slotsRow.appendChild(slotEl);
    });

    // Render Jumbled Tiles Pool
    jumbledRow.innerHTML = '';
    this.jumbledTiles.forEach((tile) => {
      if (tile.placedInSlot !== null) return; // already in slot

      const tileEl = document.createElement('div');
      tileEl.className = 'draggable-letter-tile';
      tileEl.textContent = tile.char;
      tileEl.draggable = true;
      tileEl.id = tile.id;

      // Drag events
      tileEl.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', tile.id);
        tileEl.classList.add('dragging');
      });
      tileEl.addEventListener('dragend', () => {
        tileEl.classList.remove('dragging');
      });

      // Tap/Click to auto-place into first empty slot
      tileEl.addEventListener('click', () => {
        const firstEmptySlot = this.findFirstEmptySlot();
        if (firstEmptySlot !== -1) {
          this.placeTileInSlot(tile.id, firstEmptySlot);
        }
      });

      jumbledRow.appendChild(tileEl);
    });
  }

  findFirstEmptySlot() {
    const totalSlots = this.getCurrentList()[this.currentIndex].letters.length;
    for (let i = 0; i < totalSlots; i++) {
      if (!this.jumbledTiles.some(t => t.placedInSlot === i)) {
        return i;
      }
    }
    return -1;
  }

  placeTileInSlot(tileId, slotIndex) {
    if (this.isSolved) return;
    const tile = this.jumbledTiles.find(t => t.id === tileId);
    if (!tile) return;

    // Check if slot already occupied
    const occupiedTile = this.jumbledTiles.find(t => t.placedInSlot === slotIndex);
    if (occupiedTile) {
      occupiedTile.placedInSlot = tile.placedInSlot; // swap slots
    }

    tile.placedInSlot = slotIndex;
    audio.playSnap();
    this.renderSlotsAndTiles();
  }

  resetTilesToJumble() {
    if (this.isSolved) return;
    audio.playPop();
    this.jumbledTiles.forEach(t => t.placedInSlot = null);
    this.renderSlotsAndTiles();
  }

  validateAnswer() {
    if (this.isSolved) return;
    const current = this.getCurrentList()[this.currentIndex];
    const totalSlots = current.letters.length;

    // Check if all slots filled
    const entered = [];
    for (let i = 0; i < totalSlots; i++) {
      const tile = this.jumbledTiles.find(t => t.placedInSlot === i);
      if (!tile) {
        this.updateMascot("Fill all letter slots first! 😊");
        audio.speak("Fill all letter slots first.");
        return;
      }
      entered.push(tile.char);
    }

    const enteredWord = entered.join('');
    if (enteredWord === current.word) {
      this.handleCorrectAnswer(current);
    } else {
      this.handleWrongAnswer();
    }
  }

  handleCorrectAnswer(current) {
    this.isSolved = true;
    this.completedWords.add(current.id);

    audio.playSparkle();
    audio.playFanfare();

    // Visual celebration on slots
    const slotElements = document.querySelectorAll('.letter-slot');
    slotElements.forEach(s => s.classList.add('slot-snap-correct'));

    const clueWrap = document.getElementById('class1ClueWrap');
    if (clueWrap) {
      const rect = clueWrap.getBoundingClientRect();
      particles.createSparkle(rect.left + rect.width / 2, rect.top + rect.height / 2, 45);
    }
    particles.createConfetti(60);

    this.updateMascot(`Brilliant! You solved <strong>${current.word}</strong>! 🎉✨`);
    audio.speak(`${current.word}. ${current.speech}`);

    // Progress update
    if (this.onUpdateProgress) {
      this.onUpdateProgress({
        current: this.currentIndex + 1,
        total: this.getCurrentList().length,
        title: `${current.word} (${this.currentLevel.toUpperCase()})`,
        completed: true
      });
    }
  }

  handleWrongAnswer() {
    audio.playGentleTryAgain();
    const slotElements = document.querySelectorAll('.letter-slot');
    slotElements.forEach(s => s.classList.add('slot-wobble-error'));

    this.updateMascot(`Almost! Try again. You can do it! 🌟`);
    audio.speak("Almost! Try again.");

    this.setTimer(() => {
      slotElements.forEach(s => s.classList.remove('slot-wobble-error'));
    }, 600);
  }

  updateMascot(text) {
    const speech = document.getElementById('class1MascotSpeech');
    if (speech) {
      speech.innerHTML = text;
    }
  }

  // Teacher Controls
  repeat() {
    this.loadWord(this.currentIndex);
  }

  next() {
    const list = this.getCurrentList();
    if (this.currentIndex < list.length - 1) {
      this.loadWord(this.currentIndex + 1);
    } else {
      this.loadWord(0);
    }
  }

  previous() {
    if (this.currentIndex > 0) {
      this.loadWord(this.currentIndex - 1);
    }
  }

  jumpTo(index) {
    const list = this.getCurrentList();
    if (index >= 0 && index < list.length) {
      this.loadWord(index);
    }
  }

  getDataset() {
    const list = this.getCurrentList();
    return list.map((d, i) => ({
      index: i,
      label: d.word,
      sub: `Level ${d.difficulty}`,
      completed: this.completedWords.has(d.id)
    }));
  }
}


  // ==========================================
  // 8. MASTER ROUTING & TEACHER CONTROLLER
  // ==========================================
  /**
 * ChotaPlay Master Classroom Suite
 * Routing, Teacher Navigation Bar, Fullscreen, Audio & Drawer Controller
 */







class ChotaPlayApp {
  constructor() {
    this.currentMode = 'hub'; // 'hub', 'lkg', 'ukg', 'class1'
    this.activeGameInstance = null;
    this.savedStates = this.loadSavedStates();
    this.initDOM();
    this.initEvents();
  }

  loadSavedStates() {
    try {
      const stored = localStorage.getItem('chotaplay_saved_states');
      return stored ? JSON.parse(stored) : { lkg: null, ukg: null, class1: null };
    } catch (e) {
      return { lkg: null, ukg: null, class1: null };
    }
  }

  saveCurrentGameState() {
    if (this.activeGameInstance && this.activeGameInstance.getState && this.currentMode !== 'hub') {
      const state = this.activeGameInstance.getState();
      this.savedStates[this.currentMode] = state;
      try {
        localStorage.setItem('chotaplay_saved_states', JSON.stringify(this.savedStates));
      } catch (e) {}
    }
  }

  initDOM() {
    // Particle Canvas
    const canvas = document.getElementById('particlesCanvas');
    if (canvas) particles.init(canvas);

    this.viewport = document.getElementById('gameViewport');
    this.teacherBar = document.getElementById('teacherControlBar');
    this.gradeBadge = document.getElementById('headerGradeBadge');
    this.progressTitle = document.getElementById('teacherProgressTitle');
    this.drawerModal = document.getElementById('drawerBackdrop');
    this.drawerGrid = document.getElementById('drawerGrid');
    this.drawerTitle = document.getElementById('drawerTitle');

    // Controls
    this.btnPrev = document.getElementById('btnTeacherPrev');
    this.btnRepeat = document.getElementById('btnTeacherRepeat');
    this.btnNext = document.getElementById('btnTeacherNext');
    this.btnDrawer = document.getElementById('btnToggleDrawer');
    this.btnTeacherExit = document.getElementById('btnTeacherExit');
    this.btnSound = document.getElementById('btnToggleSound');
    this.btnFullscreen = document.getElementById('btnToggleFullscreen');
    this.btnCloseDrawer = document.getElementById('btnCloseDrawer');
    this.btnHome = document.getElementById('btnBrandHome');
    this.btnQuitGame = document.getElementById('btnQuitGame');

    this.showHub();
  }

  initEvents() {
    // Brand Home click (Top-left ChotaPlay Word World badge)
    if (this.btnHome) {
      this.btnHome.addEventListener('click', () => {
        audio.playPop();
        this.showHub();
      });
    }

    // Top-right Quit Game Button
    if (this.btnQuitGame) {
      this.btnQuitGame.addEventListener('click', () => {
        audio.playPop();
        this.showHub();
      });
    }

    // Bottom Teacher Bar Exit Button
    if (this.btnTeacherExit) {
      this.btnTeacherExit.addEventListener('click', () => {
        audio.playPop();
        this.showHub();
      });
    }

    // Teacher Bar controls
    if (this.btnPrev) {
      this.btnPrev.addEventListener('click', () => {
        audio.playPop();
        if (this.activeGameInstance && this.activeGameInstance.previous) {
          this.activeGameInstance.previous();
        }
      });
    }

    if (this.btnRepeat) {
      this.btnRepeat.addEventListener('click', () => {
        audio.playPop();
        if (this.activeGameInstance && this.activeGameInstance.repeat) {
          this.activeGameInstance.repeat();
        }
      });
    }

    if (this.btnNext) {
      this.btnNext.addEventListener('click', () => {
        audio.playPop();
        if (this.activeGameInstance && this.activeGameInstance.next) {
          this.activeGameInstance.next();
        }
      });
    }

    // Drawer Jumper
    if (this.btnDrawer) {
      this.btnDrawer.addEventListener('click', () => this.openDrawer());
    }
    if (this.btnCloseDrawer) {
      this.btnCloseDrawer.addEventListener('click', () => this.closeDrawer());
    }
    if (this.drawerModal) {
      this.drawerModal.addEventListener('click', (e) => {
        if (e.target === this.drawerModal) this.closeDrawer();
      });
    }

    // Audio Mute toggle
    if (this.btnSound) {
      this.btnSound.addEventListener('click', () => {
        const isMuted = audio.toggleMute();
        this.btnSound.innerHTML = isMuted ? '🔇' : '🔊';
        this.btnSound.setAttribute('title', isMuted ? 'Unmute Audio' : 'Mute Audio');
      });
    }

    // Fullscreen toggle
    if (this.btnFullscreen) {
      this.btnFullscreen.addEventListener('click', () => this.toggleFullscreen());
    }

    // Keyboard shortcuts for Teacher
    window.addEventListener('keydown', (e) => {
      if (this.currentMode === 'hub') return;
      if (e.key === 'ArrowLeft') {
        if (this.activeGameInstance) this.activeGameInstance.previous();
      } else if (e.key === 'ArrowRight') {
        if (this.activeGameInstance) this.activeGameInstance.next();
      } else if (e.key === ' ' || e.key === 'Enter') {
        if (e.target.tagName !== 'BUTTON' && this.activeGameInstance) {
          this.activeGameInstance.repeat();
        }
      } else if (e.key === 'f' || e.key === 'F') {
        this.toggleFullscreen();
      } else if (e.key === 'Escape') {
        if (this.drawerModal && this.drawerModal.classList.contains('active')) {
          this.closeDrawer();
        } else {
          this.showHub();
        }
      }
    });
    // Unload hook to ensure state is saved
    window.addEventListener('beforeunload', () => this.saveCurrentGameState());
  }

  showHub() {
    this.saveCurrentGameState();

    if (this.activeGameInstance && this.activeGameInstance.destroy) {
      this.activeGameInstance.destroy();
    }
    this.activeGameInstance = null;
    this.currentMode = 'hub';
    audio.stopSpeech();

    if (this.teacherBar) this.teacherBar.style.display = 'none';
    if (this.gradeBadge) this.gradeBadge.style.display = 'none';
    if (this.btnQuitGame) this.btnQuitGame.style.display = 'none';

    // Format LKG resume info
    let lkgResumeLabel = 'Start Adventure →';
    let lkgSubtext = 'SEE → HEAR → FIND → DISCOVER<br>Master all 26 uppercase letters & real associations.';
    if (this.savedStates.lkg && typeof this.savedStates.lkg.currentIndex === 'number') {
      const idx = this.savedStates.lkg.currentIndex;
      const item = ALPHABET_DATA[idx] || ALPHABET_DATA[0];
      lkgResumeLabel = `Continue Letter ${item.letter} ➔`;
      lkgSubtext = `Saved: <strong>${item.letter} for ${item.association}</strong> (${idx + 1} / 26)<br>Click to continue where you left off!`;
    }

    // Format UKG resume info
    let ukgResumeLabel = 'Start Building →';
    let ukgSubtext = 'LETTERS COME ALIVE!<br>Combine letters to physically morph into living objects.';
    if (this.savedStates.ukg && typeof this.savedStates.ukg.currentIndex === 'number') {
      const lvl = this.savedStates.ukg.currentLevel || 'level1';
      const list = WORD_DATA[lvl] || WORD_DATA.level1;
      const idx = this.savedStates.ukg.currentIndex;
      const item = list[idx] || list[0];
      ukgResumeLabel = `Continue ${item.word} ➔`;
      ukgSubtext = `Saved: <strong>${item.word}</strong> (${lvl.toUpperCase()}, ${idx + 1} / ${list.length})<br>Click to continue building!`;
    }

    // Format Class 1 resume info
    let class1ResumeLabel = 'Start Jumble →';
    let class1Subtext = 'CLUE → THINK → ARRANGE<br>Drag and solve jumbled letters with interactive feedback.';
    if (this.savedStates.class1 && typeof this.savedStates.class1.currentIndex === 'number') {
      const lvl = this.savedStates.class1.currentLevel || 'level1';
      const list = WORD_DATA[lvl] || WORD_DATA.level1;
      const idx = this.savedStates.class1.currentIndex;
      const item = list[idx] || list[0];
      class1ResumeLabel = `Continue ${item.word} ➔`;
      class1Subtext = `Saved: <strong>${item.word}</strong> (${lvl.toUpperCase()}, ${idx + 1} / ${list.length})<br>Click to continue solving!`;
    }

    this.viewport.innerHTML = `
      <div class="hub-container">
        <div class="hub-hero">
          <div class="hub-badge">🌟 CLASSROOM INTERACTIVE SUITE</div>
          <h1 class="hub-title">CHOTAPLAY WORD WORLD</h1>
          <p class="hub-subtitle">Magical letter recognition, word building & spelling for early learners</p>
        </div>

        <div class="hub-cards-grid">
          <!-- LKG Card -->
          <div class="grade-card lkg-card" id="cardLKG">
            <span class="card-grade-badge">LKG / Preschool</span>
            <div class="card-icon-art">A</div>
            <h2 class="card-game-title">Alphabet Adventure</h2>
            <p class="card-pedagogy">${lkgSubtext}</p>
            <button class="card-play-btn" id="btnPlayLKG"><span>${lkgResumeLabel}</span></button>
          </div>

          <!-- UKG Card -->
          <div class="grade-card ukg-card" id="cardUKG">
            <span class="card-grade-badge">UKG / Kindergarten</span>
            <div class="card-icon-art">CAT</div>
            <h2 class="card-game-title">Word Builder</h2>
            <p class="card-pedagogy">${ukgSubtext}</p>
            <button class="card-play-btn" id="btnPlayUKG"><span>${ukgResumeLabel}</span></button>
          </div>

          <!-- Class 1 Card -->
          <div class="grade-card class1-card" id="cardClass1">
            <span class="card-grade-badge">Class 1 / Primary</span>
            <div class="card-icon-art">🔤</div>
            <h2 class="card-game-title">Jumbled Word Adventure</h2>
            <p class="card-pedagogy">${class1Subtext}</p>
            <button class="card-play-btn" id="btnPlayClass1"><span>${class1ResumeLabel}</span></button>
          </div>
        </div>
      </div>
    `;

    document.getElementById('cardLKG').addEventListener('click', () => this.launchGame('lkg'));
    document.getElementById('cardUKG').addEventListener('click', () => this.launchGame('ukg'));
    document.getElementById('cardClass1').addEventListener('click', () => this.launchGame('class1'));
  }

  launchGame(mode) {
    this.saveCurrentGameState();

    if (this.activeGameInstance && this.activeGameInstance.destroy) {
      this.activeGameInstance.destroy();
    }

    this.currentMode = mode;
    audio.playPop();
    audio.stopSpeech();

    if (this.teacherBar) this.teacherBar.style.display = 'flex';
    if (this.btnQuitGame) this.btnQuitGame.style.display = 'inline-flex';
    if (this.gradeBadge) {
      this.gradeBadge.style.display = 'inline-block';
      this.gradeBadge.textContent = mode.toUpperCase();
    }

    this.viewport.innerHTML = `<div id="gameHost" style="width: 100%; height: 100%;"></div>`;
    const host = document.getElementById('gameHost');

    const updateProgress = (info) => {
      if (this.progressTitle) {
        this.progressTitle.innerHTML = `<strong>${info.title}</strong> <span style="font-size:15px; color:#64748B;">(${info.current} / ${info.total})</span>`;
      }
      this.saveCurrentGameState();
    };

    const savedState = this.savedStates[mode] || null;

    if (mode === 'lkg') {
      this.activeGameInstance = new LKGGame(host, updateProgress, savedState);
    } else if (mode === 'ukg') {
      this.activeGameInstance = new UKGGame(host, updateProgress, savedState);
    } else if (mode === 'class1') {
      this.activeGameInstance = new Class1Game(host, updateProgress, savedState);
    }

    if (this.activeGameInstance) {
      this.activeGameInstance.init();
    }
  }

  openDrawer() {
    if (!this.activeGameInstance || !this.activeGameInstance.getDataset) return;
    const data = this.activeGameInstance.getDataset();

    if (this.drawerTitle) {
      this.drawerTitle.textContent = this.currentMode === 'lkg' ? 'Direct Alphabet Jump (A-Z)' : 'Select Word Lesson';
    }

    if (this.drawerGrid) {
      this.drawerGrid.innerHTML = '';
      data.forEach(item => {
        const tile = document.createElement('div');
        tile.className = `drawer-tile ${item.completed ? 'completed' : ''} ${item.index === this.activeGameInstance.currentIndex ? 'active' : ''}`;
        tile.innerHTML = `
          <span>${item.label}</span>
          <span class="sub">${item.sub}</span>
        `;
        tile.addEventListener('click', () => {
          audio.playPop();
          this.activeGameInstance.jumpTo(item.index);
          this.closeDrawer();
        });
        this.drawerGrid.appendChild(tile);
      });
    }

    if (this.drawerModal) {
      this.drawerModal.classList.add('active');
    }
  }

  closeDrawer() {
    if (this.drawerModal) {
      this.drawerModal.classList.remove('active');
    }
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      if (this.btnFullscreen) this.btnFullscreen.innerHTML = '⛶';
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        if (this.btnFullscreen) this.btnFullscreen.innerHTML = '⛶';
      }
    }
  }
}

// Bootstrap
document.addEventListener('DOMContentLoaded', () => {
  window.chotaApp = new ChotaPlayApp();
});


})();
