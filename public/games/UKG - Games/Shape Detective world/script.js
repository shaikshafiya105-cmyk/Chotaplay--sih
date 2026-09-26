/**
 * RIYA'S MAGIC SHAPE BUILDER - CHOTAPLAY UKG MATHEMATICS
 * High-Performance, Accessible, Voice-First Vanilla JavaScript Engine
 */

// ============================================================
// 1. PROCEDURAL WEB AUDIO SOUND ENGINE
// ============================================================
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playPop() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    const now = this.ctx.currentTime;

    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.09);
  }

  playChime() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const freqs = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    freqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      const now = this.ctx.currentTime + idx * 0.06;

      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.36);
    });
  }

  playSuccess() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const notes = [440, 554.37, 659.25, 880]; // A major arpeggio
    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      const time = this.ctx.currentTime + i * 0.08;

      osc.frequency.setValueAtTime(freq, time);
      gain.gain.setValueAtTime(0.25, time);
      gain.gain.exponentialRampToValueAtTime(0.01, time + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(time);
      osc.stop(time + 0.32);
    });
  }

  playSnap() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    const now = this.ctx.currentTime;

    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(1200, now + 0.1);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.13);
  }

  playRobotBeep() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'square';
    const now = this.ctx.currentTime;

    osc.frequency.setValueAtTime(350 + Math.random() * 400, now);
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.16);
  }

  playRocketRumble() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    // Procedural low-frequency engine rumble
    const bufferSize = this.ctx.sampleRate * 2.5;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(120, this.ctx.currentTime);
    filter.frequency.linearRampToValueAtTime(450, this.ctx.currentTime + 2.5);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.5, this.ctx.currentTime + 1.5);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 2.5);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(this.ctx.currentTime);
  }

  playFanfare() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const melody = [
      { f: 523.25, d: 0.15 },
      { f: 659.25, d: 0.15 },
      { f: 783.99, d: 0.2 },
      { f: 1046.5, d: 0.45 }
    ];

    let t = this.ctx.currentTime;
    melody.forEach((note) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';

      osc.frequency.setValueAtTime(note.f, t);
      gain.gain.setValueAtTime(0.3, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + note.d);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + note.d);
      t += note.d * 0.9;
    });
  }
}

// ============================================================
// 2. VOICE SPEECH SYNTHESIS ENGINE
// ============================================================
class VoiceSystem {
  constructor() {
    this.enabled = true;
    this.synth = window.speechSynthesis || null;
    this.currentText = '';
    this.currentSpeaker = 'Little Star';
  }

  speak(text, speaker = 'Little Star', callback = null) {
    this.currentText = text;
    this.currentSpeaker = speaker;

    // Update UI Speech Bubble
    const speakerEl = document.getElementById('speaker-name');
    const textEl = document.getElementById('speech-text');
    if (speakerEl) speakerEl.textContent = `${speaker}:`;
    if (textEl) textEl.textContent = text;

    // Animate Characters
    const riyaMouth = document.getElementById('riya-mouth');
    const starEl = document.getElementById('char-star');
    if (speaker === 'Riya') {
      document.getElementById('char-riya')?.classList.add('riya-happy');
      setTimeout(() => document.getElementById('char-riya')?.classList.remove('riya-happy'), 700);
    }

    if (!this.enabled || !this.synth) {
      if (callback) setTimeout(callback, 1200);
      return;
    }

    try {
      this.synth.cancel(); // Stop any overlapping utterance
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.92; // Warm and clear for UKG
      utterance.pitch = speaker === 'Little Star' ? 1.35 : 1.2; // Cheerful child-like pitch

      // Attempt to pick a gentle English voice if available
      const voices = this.synth.getVoices();
      const preferred = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Female') || v.name.includes('Google') || v.name.includes('Natural')));
      if (preferred) utterance.voice = preferred;

      utterance.onend = () => {
        if (callback) callback();
      };
      utterance.onerror = () => {
        if (callback) callback();
      };

      this.synth.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis error safely handled:', e);
      if (callback) setTimeout(callback, 1000);
    }
  }

  replay() {
    if (this.currentText) {
      this.speak(this.currentText, this.currentSpeaker);
    }
  }
}

// ============================================================
// 3. SHAPE REGISTRY & PROPERTIES
// ============================================================
const SHAPES = {
  circle: {
    id: 'circle',
    name: 'Circle',
    color: '#00b4d8',
    description: 'Round and smooth! It has 0 straight sides and 0 corners.',
    realWorld: { name: 'Soccer Ball', emoji: '⚽', desc: 'A round ball rolling on the grass!' },
    svg: `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="42" fill="#00b4d8" stroke="#0077b6" stroke-width="4"/></svg>`
  },
  square: {
    id: 'square',
    name: 'Square',
    color: '#70e000',
    description: '4 equal sides and 4 straight corners!',
    realWorld: { name: 'Gift Box', emoji: '🎁', desc: 'A square surprise present!' },
    svg: `<svg viewBox="0 0 100 100"><rect x="14" y="14" width="72" height="72" rx="8" fill="#70e000" stroke="#38b000" stroke-width="4"/></svg>`
  },
  triangle: {
    id: 'triangle',
    name: 'Triangle',
    color: '#ff9e00',
    description: '3 straight sides and 3 pointy corners!',
    realWorld: { name: 'Pizza Slice', emoji: '🍕', desc: 'A yummy triangular slice of pizza!' },
    svg: `<svg viewBox="0 0 100 100"><polygon points="50,14 88,86 12,86" fill="#ff9e00" stroke="#d00000" stroke-width="4"/></svg>`
  },
  rectangle: {
    id: 'rectangle',
    name: 'Rectangle',
    color: '#9d4edd',
    description: '4 sides: 2 long sides and 2 short sides!',
    realWorld: { name: 'House Door', emoji: '🚪', desc: 'A tall rectangle door to enter!' },
    svg: `<svg viewBox="0 0 100 100"><rect x="10" y="24" width="80" height="52" rx="8" fill="#9d4edd" stroke="#5a189a" stroke-width="4"/></svg>`
  },
  oval: {
    id: 'oval',
    name: 'Oval',
    color: '#ff4d6d',
    description: 'Like a stretched circle! Smooth with 0 corners.',
    realWorld: { name: 'Magic Egg', emoji: '🥚', desc: 'A smooth oval egg ready to hatch!' },
    svg: `<svg viewBox="0 0 100 100"><ellipse cx="50" cy="50" rx="44" ry="30" fill="#ff4d6d" stroke="#c9184a" stroke-width="4"/></svg>`
  },
  star: {
    id: 'star',
    name: 'Star',
    color: '#ffd166',
    description: '5 sparkling points shining bright!',
    realWorld: { name: 'Magic Star', emoji: '⭐', desc: 'A shining star in the magical night sky!' },
    svg: `<svg viewBox="0 0 100 100"><polygon points="50,10 62,38 92,38 67,58 77,88 50,70 23,88 33,58 8,38 38,38" fill="#ffd166" stroke="#f48c06" stroke-width="4"/></svg>`
  },
  heart: {
    id: 'heart',
    name: 'Heart',
    color: '#f72585',
    description: '2 round lobes meeting at 1 bottom point!',
    realWorld: { name: 'Heart Balloon', emoji: '🎈', desc: 'A flying pink heart balloon!' },
    svg: `<svg viewBox="0 0 100 100"><path d="M50,85 C50,85 15,60 15,35 C15,20 28,12 40,20 C46,25 50,32 50,32 C50,32 54,25 60,20 C72,12 85,20 85,35 C85,60 50,85 50,85 Z" fill="#f72585" stroke="#b5179e" stroke-width="4"/></svg>`
  },
  diamond: {
    id: 'diamond',
    name: 'Diamond',
    color: '#48cae4',
    description: '4 slanted equal sides standing on a point!',
    realWorld: { name: 'Flying Kite', emoji: '🪁', desc: 'A colorful kite soaring high in the wind!' },
    svg: `<svg viewBox="0 0 100 100"><polygon points="50,12 88,50 50,88 12,50" fill="#48cae4" stroke="#0077b6" stroke-width="4"/></svg>`
  }
};

// ============================================================
// 4. CONFETTI CELEBRATION SYSTEM
// ============================================================
class ConfettiSystem {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.particles = [];
    this.animId = null;

    if (this.canvas) {
      this.resize();
      window.addEventListener('resize', () => this.resize());
    }
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  burst(count = 60) {
    if (!this.canvas || !this.ctx) return;
    this.resize();
    const colors = ['#f72585', '#7209b7', '#3a0ca3', '#4361ee', '#4cc9f0', '#70e000', '#ffd166', '#ff9e00'];

    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: this.canvas.width / 2 + (Math.random() * 200 - 100),
        y: this.canvas.height / 2 + (Math.random() * 100 - 50),
        vx: (Math.random() - 0.5) * 14,
        vy: (Math.random() - 0.8) * 16,
        size: Math.random() * 10 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rSpeed: (Math.random() - 0.5) * 10,
        shape: Math.random() > 0.5 ? 'circle' : 'rect',
        opacity: 1
      });
    }

    if (!this.animId) {
      this.loop();
    }
  }

  loop() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.4; // Gravity
      p.rotation += p.rSpeed;
      p.opacity -= 0.012;

      if (p.opacity <= 0 || p.y > this.canvas.height + 50) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);
      this.ctx.globalAlpha = p.opacity;
      this.ctx.fillStyle = p.color;

      if (p.shape === 'circle') {
        this.ctx.beginPath();
        this.ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        this.ctx.fill();
      } else {
        this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      }
      this.ctx.restore();
    }

    if (this.particles.length > 0) {
      this.animId = requestAnimationFrame(() => this.loop());
    } else {
      this.animId = null;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
}

// ============================================================
// 5. CORE GAME CONTROLLER
// ============================================================
class MagicShapeGame {
  constructor() {
    this.sound = new SoundEngine();
    this.voice = new VoiceSystem();
    this.confetti = new ConfettiSystem('confetti-canvas');

    this.currentStage = 'intro';
    this.unlockedShapes = new Set();
    this.starsCount = 0;

    // Drag and Drop tracking
    this.dragItem = null;
    this.dragGhost = document.getElementById('drag-ghost');

    // Modules State
    this.huntState = { targetShape: 'circle', foundCount: 0, requiredCount: 3 };
    this.puzzleState = { currentLevel: 0, levels: [] };
    this.houseState = { placedParts: new Set(), totalParts: 7 };
    this.robotState = { placedParts: new Set(), totalParts: 10 };
    this.shadowState = { currentIdx: 0, sequence: ['circle', 'triangle', 'square', 'heart', 'star', 'diamond'] };
    this.sorterState = { sortedCount: 0, targetCount: 6 };
    this.rocketState = { placedParts: new Set(), totalParts: 6 };

    this.init();
  }

  init() {
    this.setupHeaderControls();
    this.setupStagesModal();
    this.setupSpeechReplay();
    this.setupUnifiedDragDrop();
    this.initPuzzlesData();

    // Unlock default shape inventory visual
    this.updateTrackerUI();

    // Start with Intro Scene
    this.showScene('intro');

    // Speech greetings
    setTimeout(() => {
      this.voice.speak("Oh no! The Shape Machine is broken! Let's find shapes and fix the world!", "Little Star");
    }, 600);
  }

  // Header & Controls
  setupHeaderControls() {
    const btnSound = document.getElementById('btn-sound');
    btnSound?.addEventListener('click', () => {
      this.sound.enabled = !this.sound.enabled;
      btnSound.classList.toggle('muted', !this.sound.enabled);
      btnSound.querySelector('.ctrl-icon').textContent = this.sound.enabled ? '🔊' : '🔇';
      this.sound.playPop();
    });

    const btnVoice = document.getElementById('btn-voice');
    btnVoice?.addEventListener('click', () => {
      this.voice.enabled = !this.voice.enabled;
      btnVoice.classList.toggle('muted', !this.voice.enabled);
      btnVoice.querySelector('.ctrl-icon').textContent = this.voice.enabled ? '🗣️' : '🤐';
      this.sound.playPop();
      if (this.voice.enabled) {
        this.voice.speak("Voice enabled!", "Riya");
      }
    });

    const btnStages = document.getElementById('btn-stages');
    const stagesModal = document.getElementById('stages-modal');
    const closeStages = document.getElementById('close-stages');

    btnStages?.addEventListener('click', () => {
      this.sound.playPop();
      stagesModal?.classList.remove('hidden');
    });

    closeStages?.addEventListener('click', () => {
      this.sound.playPop();
      stagesModal?.classList.add('hidden');
    });

    const btnFreeplay = document.getElementById('btn-freeplay');
    btnFreeplay?.addEventListener('click', () => {
      this.sound.playPop();
      this.showScene('freeplay');
    });

    // Start Adventure Button
    const btnStart = document.getElementById('btn-start-adventure');
    btnStart?.addEventListener('click', () => {
      this.sound.playSuccess();
      this.confetti.burst(40);
      this.voice.speak("Let's go! First, let's explore the Shape Toolbox!", "Riya", () => {
        this.showScene('toolbox');
      });
    });

    // Next Navigation buttons
    document.querySelectorAll('.nav-arrow-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const next = btn.getAttribute('data-next');
        if (next) {
          this.sound.playPop();
          this.showScene(next);
        }
      });
    });

    // Character tap triggers
    document.getElementById('char-star')?.addEventListener('click', () => {
      this.sound.playChime();
      this.voice.speak("I am Little Star! Together, we can build anything!", "Little Star");
    });

    document.getElementById('char-riya')?.addEventListener('click', () => {
      this.sound.playSuccess();
      this.voice.speak("Hi! I am Riya! I love discovering colorful shapes!", "Riya");
    });
  }

  setupStagesModal() {
    const stagesModal = document.getElementById('stages-modal');
    document.querySelectorAll('.stage-card').forEach(card => {
      card.addEventListener('click', () => {
        const stage = card.getAttribute('data-stage');
        if (stage) {
          this.sound.playPop();
          stagesModal?.classList.add('hidden');
          this.showScene(stage);
        }
      });
    });
  }

  setupSpeechReplay() {
    document.getElementById('btn-replay-voice')?.addEventListener('click', () => {
      this.sound.playPop();
      this.voice.replay();
    });
  }

  // Scene Switching System
  showScene(sceneId) {
    document.querySelectorAll('.scene').forEach(sc => sc.classList.remove('active'));
    const target = document.getElementById(`scene-${sceneId}`);
    if (!target) return;

    target.classList.add('active');
    this.currentStage = sceneId;

    // Update active highlight in stages grid
    document.querySelectorAll('.stage-card').forEach(c => {
      c.classList.toggle('current', c.getAttribute('data-stage') === sceneId);
    });

    // Initialize individual scene module
    switch (sceneId) {
      case 'intro':
        this.initIntroScene();
        break;
      case 'toolbox':
        this.initToolboxScene();
        break;
      case 'hunt':
        this.initHuntScene();
        break;
      case 'puzzle':
        this.initPuzzleScene();
        break;
      case 'house':
        this.initHouseScene();
        break;
      case 'robot':
        this.initRobotScene();
        break;
      case 'shadow':
        this.initShadowScene();
        break;
      case 'sorter':
        this.initSorterScene();
        break;
      case 'transform':
        this.initTransformScene();
        break;
      case 'rocket':
        this.initRocketScene();
        break;
      case 'restoration':
        this.initRestorationScene();
        break;
      case 'freeplay':
        this.initFreePlayScene();
        break;
    }
  }

  unlockShape(shapeKey) {
    if (!this.unlockedShapes.has(shapeKey)) {
      this.unlockedShapes.add(shapeKey);
      this.updateTrackerUI();
      this.sound.playSuccess();
      this.confetti.burst(30);
    }
  }

  updateTrackerUI() {
    document.querySelectorAll('.tracker-slot').forEach(slot => {
      const shape = slot.getAttribute('data-shape');
      if (this.unlockedShapes.has(shape)) {
        slot.classList.add('unlocked');
      }
    });
  }

  // ============================================================
  // MODULE 0: INTRO SCENE
  // ============================================================
  initIntroScene() {
    this.voice.speak("The Shape Machine is broken! We need to find shapes to repair the world!", "Little Star");
  }

  // ============================================================
  // MODULE 1: SHAPE TOOLBOX
  // ============================================================
  initToolboxScene() {
    const grid = document.getElementById('toolbox-grid');
    if (!grid) return;
    grid.innerHTML = '';

    Object.values(SHAPES).forEach(shape => {
      const card = document.createElement('div');
      card.className = 'shape-card';
      card.innerHTML = `
        <div class="shape-speak-badge">🔊</div>
        <div class="shape-card-svg">${shape.svg}</div>
        <h3>${shape.name}</h3>
        <p>${shape.description}</p>
      `;

      card.addEventListener('click', () => {
        this.sound.playPop();
        card.classList.add('active-tap');
        setTimeout(() => card.classList.remove('active-tap'), 600);
        this.unlockShape(shape.id);
        this.voice.speak(`${shape.name}! ${shape.description}`, 'Riya');
      });

      grid.appendChild(card);
    });

    this.voice.speak("Tap any shape to hear its magical name and superpowers!", "Little Star");
  }

  // ============================================================
  // MODULE 2: SHAPE HUNT (MAGICAL GARDEN)
  // ============================================================
  initHuntScene() {
    const stage = document.getElementById('garden-hunt-stage');
    const promptText = document.getElementById('hunt-prompt-text');
    const dotsContainer = document.getElementById('hunt-dots');
    if (!stage) return;

    this.huntState.foundCount = 0;
    const targetShapes = ['circle', 'triangle', 'star'];
    const currentTargetKey = targetShapes[Math.floor(Math.random() * targetShapes.length)];
    this.huntState.targetShape = currentTargetKey;
    const targetObj = SHAPES[currentTargetKey];

    if (promptText) promptText.textContent = `Can you find the ${targetObj.name.toUpperCase()}?`;

    // Render progress dots
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      for (let i = 0; i < this.huntState.requiredCount; i++) {
        const dot = document.createElement('div');
        dot.className = 'hunt-dot';
        dotsContainer.appendChild(dot);
      }
    }

    // Repeat button prompt
    document.getElementById('btn-repeat-hunt')?.addEventListener('click', () => {
      this.sound.playPop();
      this.voice.speak(`Can you find the ${targetObj.name}?`, 'Little Star');
    });

    // Populate garden with hiding elements and shapes
    stage.innerHTML = `
      <!-- Garden scenery SVGs -->
      <div class="hunt-scenery" style="position:absolute; inset:0; pointer-events:none;">
        <svg viewBox="0 0 800 400" style="width:100%; height:100%;" preserveAspectRatio="none">
          <!-- Hills & Ponds -->
          <ellipse cx="400" cy="420" rx="450" ry="180" fill="#86efac" />
          <ellipse cx="650" cy="280" rx="140" ry="60" fill="#38bdf8" opacity="0.8" />
          <ellipse cx="650" cy="280" rx="120" ry="45" fill="#0284c7" opacity="0.6" />
          <!-- Trees -->
          <rect x="120" y="160" width="30" height="120" rx="6" fill="#92400e" />
          <circle cx="135" cy="140" r="65" fill="#22c55e" />
          <circle cx="100" cy="160" r="45" fill="#16a34a" />
          <circle cx="170" cy="160" r="45" fill="#15803d" />
          <!-- Bush -->
          <ellipse cx="320" cy="300" rx="70" ry="40" fill="#16a34a" />
          <ellipse cx="500" cy="320" rx="80" ry="45" fill="#22c55e" />
        </svg>
      </div>
    `;

    // Generate random hidden shape elements
    const spawnPositions = [
      { top: '35%', left: '15%' },
      { top: '65%', left: '38%' },
      { top: '25%', left: '70%' },
      { top: '55%', left: '78%' },
      { top: '70%', left: '18%' },
      { top: '40%', left: '48%' }
    ];

    const shapeKeys = Object.keys(SHAPES);
    // Ensure target shape appears at least 3 times
    const pool = [currentTargetKey, currentTargetKey, currentTargetKey];
    while (pool.length < spawnPositions.length) {
      const randomKey = shapeKeys[Math.floor(Math.random() * shapeKeys.length)];
      if (randomKey !== currentTargetKey) pool.push(randomKey);
    }
    // Shuffle
    pool.sort(() => Math.random() - 0.5);

    spawnPositions.forEach((pos, idx) => {
      const sKey = pool[idx];
      const shape = SHAPES[sKey];
      const el = document.createElement('div');
      el.className = 'hunt-element';
      el.style.top = pos.top;
      el.style.left = pos.left;
      el.style.width = '64px';
      el.style.height = '64px';
      el.innerHTML = shape.svg;

      el.addEventListener('click', () => {
        if (sKey === this.huntState.targetShape) {
          // Correct shape found!
          this.sound.playChime();
          el.classList.add('found');
          this.huntState.foundCount++;
          this.unlockShape(sKey);

          // Update dots
          const dots = dotsContainer?.querySelectorAll('.hunt-dot');
          if (dots && dots[this.huntState.foundCount - 1]) {
            dots[this.huntState.foundCount - 1].classList.add('filled');
          }

          if (this.huntState.foundCount >= this.huntState.requiredCount) {
            this.sound.playSuccess();
            this.confetti.burst(50);
            this.voice.speak(`Super job! You found all the ${shape.name}s!`, 'Riya', () => {
              setTimeout(() => this.showScene('puzzle'), 1200);
            });
          } else {
            this.voice.speak(`Great! You found a ${shape.name}!`, 'Riya');
          }
        } else {
          // Gentle encouraging hint
          this.sound.playBoing();
          this.voice.speak(`That is a ${shape.name}. Look carefully for the ${targetObj.name}!`, 'Little Star');
        }
      });

      stage.appendChild(el);
    });

    this.voice.speak(`Can you find the ${targetObj.name}?`, 'Little Star');
  }

  // ============================================================
  // MODULE 3: SHAPE PUZZLE (OBJECT REPAIR)
  // ============================================================
  initPuzzlesData() {
    this.puzzleState.levels = [
      {
        title: 'Fix the Sailboat Sail!',
        missingShape: 'triangle',
        choices: ['circle', 'triangle', 'square'],
        targetHtml: `
          <svg viewBox="0 0 300 240" style="width:100%; height:100%;">
            <!-- Boat Hull -->
            <polygon points="50,180 250,180 220,220 80,220" fill="#b45309" stroke="#78350f" stroke-width="4" />
            <!-- Mast -->
            <rect x="145" y="40" width="10" height="140" fill="#d97706" />
            <!-- Missing Triangle Sail Slot -->
            <polygon points="160,50 250,170 160,170" fill="rgba(255,158,0,0.25)" stroke="#ff9e00" stroke-width="3" stroke-dasharray="6,6" class="puzzle-slot-target drop-target" data-accept="triangle" />
          </svg>
        `
      },
      {
        title: 'Fix the Car Wheels!',
        missingShape: 'circle',
        choices: ['square', 'circle', 'diamond'],
        targetHtml: `
          <svg viewBox="0 0 300 240" style="width:100%; height:100%;">
            <!-- Car Body -->
            <path d="M50,150 L80,100 L180,100 L210,130 L260,130 L260,170 L50,170 Z" fill="#ef4444" stroke="#b91c1c" stroke-width="4"/>
            <!-- Back wheel -->
            <circle cx="95" cy="175" r="28" fill="#1e293b" stroke="#64748b" stroke-width="6"/>
            <!-- Missing Front Wheel Slot -->
            <circle cx="215" cy="175" r="28" fill="rgba(0,180,216,0.25)" stroke="#00b4d8" stroke-width="3" stroke-dasharray="6,6" class="puzzle-slot-target drop-target" data-accept="circle" />
          </svg>
        `
      },
      {
        title: 'Fix the Flying Kite!',
        missingShape: 'diamond',
        choices: ['oval', 'rectangle', 'diamond'],
        targetHtml: `
          <svg viewBox="0 0 300 240" style="width:100%; height:100%;">
            <!-- Kite Tail & Bows -->
            <path d="M150,190 Q170,220 190,230" stroke="#f43f5e" stroke-width="3" fill="none"/>
            <!-- Missing Diamond Kite Body -->
            <polygon points="150,30 220,110 150,190 80,110" fill="rgba(72,202,228,0.25)" stroke="#48cae4" stroke-width="3" stroke-dasharray="6,6" class="puzzle-slot-target drop-target" data-accept="diamond" />
          </svg>
        `
      }
    ];
  }

  initPuzzleScene() {
    this.renderPuzzleLevel(this.puzzleState.currentLevel);
  }

  renderPuzzleLevel(idx) {
    const lvl = this.puzzleState.levels[idx];
    if (!lvl) return;

    const titleEl = document.getElementById('puzzle-title');
    const targetArea = document.getElementById('puzzle-target-area');
    const choicesTray = document.getElementById('puzzle-choices-tray');
    const pagination = document.getElementById('puzzle-pagination');

    if (titleEl) titleEl.textContent = `🧩 ${lvl.title}`;
    if (targetArea) targetArea.innerHTML = lvl.targetHtml;

    // Pagination
    if (pagination) {
      pagination.innerHTML = '';
      this.puzzleState.levels.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = `pag-dot ${i === idx ? 'active' : ''}`;
        pagination.appendChild(dot);
      });
    }

    // Choices
    if (choicesTray) {
      choicesTray.innerHTML = '';
      lvl.choices.forEach(shapeKey => {
        const shape = SHAPES[shapeKey];
        const item = document.createElement('div');
        item.className = 'puzzle-choice-item draggable-shape';
        item.setAttribute('data-shape', shapeKey);
        item.innerHTML = shape.svg;

        // Click-to-place support
        item.addEventListener('click', () => {
          this.handlePuzzleAnswer(shapeKey, lvl.missingShape);
        });

        choicesTray.appendChild(item);
      });
    }

    this.voice.speak(lvl.title, 'Little Star');
  }

  handlePuzzleAnswer(chosenShape, requiredShape) {
    if (chosenShape === requiredShape) {
      this.sound.playSnap();
      this.sound.playSuccess();
      this.confetti.burst(40);
      this.unlockShape(chosenShape);

      const target = document.querySelector('.puzzle-slot-target');
      if (target) {
        target.classList.add('filled');
        target.setAttribute('fill', SHAPES[chosenShape].color);
        target.removeAttribute('stroke-dasharray');
      }

      this.voice.speak(`Awesome! ${SHAPES[chosenShape].name} completes the puzzle!`, 'Riya', () => {
        if (this.puzzleState.currentLevel + 1 < this.puzzleState.levels.length) {
          this.puzzleState.currentLevel++;
          setTimeout(() => this.renderPuzzleLevel(this.puzzleState.currentLevel), 1200);
        } else {
          this.voice.speak("You solved all the shape puzzles! Let's build a house next!", "Little Star", () => {
            setTimeout(() => this.showScene('house'), 1200);
          });
        }
      });
    } else {
      this.sound.playBoing();
      this.voice.speak(`That is a ${SHAPES[chosenShape].name}. We need a ${SHAPES[requiredShape].name}!`, 'Little Star');
    }
  }

  // ============================================================
  // MODULE 4: HOUSE BUILDER
  // ============================================================
  initHouseScene() {
    this.houseState.placedParts.clear();
    const palette = document.getElementById('house-palette');
    if (!palette) return;

    palette.innerHTML = '';
    const houseShapes = ['circle', 'triangle', 'square', 'rectangle', 'heart', 'oval'];

    houseShapes.forEach(shapeKey => {
      const shape = SHAPES[shapeKey];
      const el = document.createElement('div');
      el.className = 'palette-shape draggable-shape';
      el.setAttribute('data-shape', shapeKey);
      el.innerHTML = shape.svg;

      // Click-to-auto-place support
      el.addEventListener('click', () => {
        this.tryAutoPlaceHouse(shapeKey);
      });

      palette.appendChild(el);
    });

    // Reset button
    document.getElementById('btn-reset-house')?.addEventListener('click', () => {
      this.sound.playPop();
      this.initHouseScene();
    });

    this.voice.speak("Let's build a magical house! Drag shapes to build the walls, roof, door, and windows!", "Riya");
  }

  tryAutoPlaceHouse(shapeKey) {
    const matchingZone = Array.from(document.querySelectorAll('#house-canvas .drop-target')).find(zone => {
      return zone.getAttribute('data-accept') === shapeKey && !this.houseState.placedParts.has(zone.getAttribute('data-part'));
    });

    if (matchingZone) {
      this.placeHousePart(matchingZone, shapeKey);
    } else {
      this.sound.playPop();
      this.voice.speak(`${SHAPES[shapeKey].name}!`, 'Little Star');
    }
  }

  placeHousePart(zone, shapeKey) {
    const part = zone.getAttribute('data-part');
    if (this.houseState.placedParts.has(part)) return;

    this.houseState.placedParts.add(part);
    zone.classList.add('filled');
    zone.innerHTML = SHAPES[shapeKey].svg;

    this.sound.playSnap();
    this.unlockShape(shapeKey);

    if (this.houseState.placedParts.size >= this.houseState.totalParts) {
      this.sound.playSuccess();
      this.confetti.burst(60);
      this.voice.speak("Look! We built a beautiful magical house! Let's build a robot next!", "Riya", () => {
        setTimeout(() => this.showScene('robot'), 1500);
      });
    } else {
      this.voice.speak(`${SHAPES[shapeKey].name}! Perfect!`, 'Little Star');
    }
  }

  // ============================================================
  // MODULE 5: ROBOT BUILDER
  // ============================================================
  initRobotScene() {
    this.robotState.placedParts.clear();
    const zone = document.getElementById('robot-assembly-zone');
    zone?.classList.remove('dancing');
    const palette = document.getElementById('robot-palette');
    if (!palette) return;

    palette.innerHTML = '';
    const robotShapes = ['triangle', 'square', 'circle', 'rectangle', 'heart'];

    robotShapes.forEach(shapeKey => {
      const shape = SHAPES[shapeKey];
      const el = document.createElement('div');
      el.className = 'palette-shape draggable-shape';
      el.setAttribute('data-shape', shapeKey);
      el.innerHTML = shape.svg;

      el.addEventListener('click', () => {
        this.tryAutoPlaceRobot(shapeKey);
      });

      palette.appendChild(el);
    });

    document.getElementById('btn-reset-robot')?.addEventListener('click', () => {
      this.sound.playPop();
      this.initRobotScene();
    });

    this.voice.speak("Let's build a shape robot! Fit all the parts to wake it up!", "Little Star");
  }

  tryAutoPlaceRobot(shapeKey) {
    const matchingZone = Array.from(document.querySelectorAll('#robot-assembly-zone .drop-target')).find(zone => {
      return zone.getAttribute('data-accept') === shapeKey && !this.robotState.placedParts.has(zone.getAttribute('data-part'));
    });

    if (matchingZone) {
      this.placeRobotPart(matchingZone, shapeKey);
    } else {
      this.sound.playPop();
      this.voice.speak(`${SHAPES[shapeKey].name}!`, 'Little Star');
    }
  }

  placeRobotPart(zone, shapeKey) {
    const part = zone.getAttribute('data-part');
    if (this.robotState.placedParts.has(part)) return;

    this.robotState.placedParts.add(part);
    zone.classList.add('filled');
    zone.innerHTML = SHAPES[shapeKey].svg;

    this.sound.playRobotBeep();
    this.unlockShape(shapeKey);

    if (this.robotState.placedParts.size >= this.robotState.totalParts) {
      this.sound.playSuccess();
      this.confetti.burst(60);
      document.getElementById('robot-assembly-zone')?.classList.add('dancing');
      this.voice.speak("Shape Robot is awake! Look at it dance!", "Riya", () => {
        setTimeout(() => this.showScene('shadow'), 2000);
      });
    } else {
      this.voice.speak(`${SHAPES[shapeKey].name}! Beep boop!`, 'Little Star');
    }
  }

  // ============================================================
  // MODULE 6: SHAPE SHADOW (SILHOUETTE PUZZLE)
  // ============================================================
  initShadowScene() {
    this.shadowState.currentIdx = 0;
    this.renderShadowStep();
  }

  renderShadowStep() {
    const targetKey = this.shadowState.sequence[this.shadowState.currentIdx];
    const targetObj = SHAPES[targetKey];
    const silhouette = document.getElementById('mystery-silhouette');
    const choices = document.getElementById('shadow-choices');
    const pagination = document.getElementById('shadow-pagination');

    if (!silhouette || !choices) return;

    silhouette.classList.remove('revealed');
    // Dark silhouette svg
    silhouette.innerHTML = targetObj.svg;
    const svgEl = silhouette.querySelector('svg');
    if (svgEl) {
      svgEl.querySelectorAll('circle, rect, polygon, path, ellipse').forEach(el => {
        el.setAttribute('fill', '#0f172a');
        el.setAttribute('stroke', '#475569');
      });
    }

    // Pagination
    if (pagination) {
      pagination.innerHTML = '';
      this.shadowState.sequence.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = `pag-dot ${i === this.shadowState.currentIdx ? 'active' : ''}`;
        pagination.appendChild(dot);
      });
    }

    // Generate 3 choices
    const allKeys = Object.keys(SHAPES);
    const choicePool = [targetKey];
    while (choicePool.length < 3) {
      const rand = allKeys[Math.floor(Math.random() * allKeys.length)];
      if (!choicePool.includes(rand)) choicePool.push(rand);
    }
    choicePool.sort(() => Math.random() - 0.5);

    choices.innerHTML = '';
    choicePool.forEach(sKey => {
      const shape = SHAPES[sKey];
      const card = document.createElement('div');
      card.className = 'shadow-choice-card';
      card.innerHTML = shape.svg;

      card.addEventListener('click', () => {
        if (sKey === targetKey) {
          // Correct!
          this.sound.playChime();
          this.sound.playSuccess();
          this.confetti.burst(35);
          this.unlockShape(sKey);

          silhouette.classList.add('revealed');
          silhouette.innerHTML = targetObj.svg;

          this.voice.speak(`${targetObj.name}! You revealed the shape!`, 'Riya', () => {
            if (this.shadowState.currentIdx + 1 < this.shadowState.sequence.length) {
              this.shadowState.currentIdx++;
              setTimeout(() => this.renderShadowStep(), 1200);
            } else {
              this.voice.speak("Master of Shadows! Let's play Shape Sorter next!", "Little Star", () => {
                setTimeout(() => this.showScene('sorter'), 1200);
              });
            }
          });
        } else {
          this.sound.playBoing();
          this.voice.speak(`That is a ${shape.name}. Look closely at the shadow!`, 'Little Star');
        }
      });

      choices.appendChild(card);
    });

    this.voice.speak("Which shape matches this glowing mystery shadow?", "Little Star");
  }

  // ============================================================
  // MODULE 7: SHAPE SORTER (BASKETS)
  // ============================================================
  initSorterScene() {
    this.sorterState.sortedCount = 0;
    this.updateSorterScore();

    const stream = document.getElementById('shapes-stream');
    const baskets = document.getElementById('sorter-baskets');
    if (!stream || !baskets) return;

    const targetShapes = ['circle', 'square', 'triangle'];

    // Render Baskets
    baskets.innerHTML = '';
    targetShapes.forEach(sKey => {
      const shape = SHAPES[sKey];
      const basket = document.createElement('div');
      basket.className = 'sorter-basket drop-target';
      basket.setAttribute('data-accept', sKey);
      basket.innerHTML = `
        <div class="sorter-basket-icon">${shape.svg}</div>
        <div class="sorter-basket-label">${shape.name} Basket</div>
      `;
      baskets.appendChild(basket);
    });

    // Populate Stream with 6 shapes
    stream.innerHTML = '';
    const pool = ['circle', 'square', 'triangle', 'circle', 'square', 'triangle'].sort(() => Math.random() - 0.5);

    pool.forEach(sKey => {
      const shape = SHAPES[sKey];
      const item = document.createElement('div');
      item.className = 'sorter-shape-item draggable-shape';
      item.setAttribute('data-shape', sKey);
      item.innerHTML = shape.svg;

      // Click to sort fallback
      item.addEventListener('click', () => {
        const basket = Array.from(document.querySelectorAll('.sorter-basket')).find(b => b.getAttribute('data-accept') === sKey);
        if (basket) {
          this.handleSorterDrop(item, basket, sKey);
        }
      });

      stream.appendChild(item);
    });

    this.voice.speak("Sort the floating shapes into the matching colored baskets!", "Little Star");
  }

  handleSorterDrop(itemEl, basketEl, shapeKey) {
    const accepted = basketEl.getAttribute('data-accept');
    if (accepted === shapeKey) {
      this.sound.playSnap();
      this.unlockShape(shapeKey);
      itemEl.remove();
      this.sorterState.sortedCount++;
      this.updateSorterScore();

      if (this.sorterState.sortedCount >= this.sorterState.targetCount) {
        this.sound.playSuccess();
        this.confetti.burst(50);
        this.voice.speak("All shapes sorted perfectly! Let's see real-world transformations!", "Riya", () => {
          setTimeout(() => this.showScene('transform'), 1500);
        });
      } else {
        this.voice.speak(`${SHAPES[shapeKey].name} sorted!`, 'Little Star');
      }
    } else {
      this.sound.playBoing();
      this.voice.speak(`That ${SHAPES[shapeKey].name} belongs in the ${SHAPES[shapeKey].name} basket!`, 'Little Star');
    }
  }

  updateSorterScore() {
    const counter = document.getElementById('sorter-counter');
    if (counter) counter.textContent = `Sorted: ${this.sorterState.sortedCount} / ${this.sorterState.targetCount}`;
  }

  // ============================================================
  // MODULE 8: REAL WORLD TRANSFORMATIONS
  // ============================================================
  initTransformScene() {
    const gallery = document.getElementById('transform-gallery');
    if (!gallery) return;

    gallery.innerHTML = '';
    Object.values(SHAPES).forEach(shape => {
      const card = document.createElement('div');
      card.className = 'transform-card';
      card.innerHTML = `
        <span class="magic-wand-badge">🪄</span>
        <div class="transform-visual">${shape.svg}</div>
        <div class="transform-names">
          <div class="transform-shape-name">${shape.name}</div>
          <div class="transform-arrow">⬇️ transforms into ⬇️</div>
          <div class="transform-real-name">${shape.realWorld.name}</div>
        </div>
      `;

      let isFlipped = false;
      card.addEventListener('click', () => {
        this.sound.playChime();
        this.unlockShape(shape.id);
        isFlipped = !isFlipped;
        card.classList.toggle('flipped', isFlipped);

        const visual = card.querySelector('.transform-visual');
        if (isFlipped) {
          visual.innerHTML = `<span class="real-emoji">${shape.realWorld.emoji}</span>`;
          this.voice.speak(`A ${shape.name} transforms into a ${shape.realWorld.name}! ${shape.realWorld.desc}`, 'Riya');
        } else {
          visual.innerHTML = shape.svg;
          this.voice.speak(`And it transforms back to a ${shape.name}!`, 'Little Star');
        }
      });

      gallery.appendChild(card);
    });

    this.voice.speak("Tap any card to transform the mathematical shape into a real-world object!", "Little Star");
  }

  // ============================================================
  // MODULE 9: ROCKET BUILDER & COSMIC BLAST OFF (WOW MOMENT)
  // ============================================================
  initRocketScene() {
    this.rocketState.placedParts.clear();
    const frame = document.getElementById('rocket-frame');
    const flame = document.getElementById('exhaust-flame');
    const launchBtn = document.getElementById('btn-launch-rocket');
    const countdown = document.getElementById('countdown-overlay');

    frame?.classList.remove('launching');
    flame?.classList.add('hidden');
    launchBtn?.classList.add('hidden');
    countdown?.classList.add('hidden');

    const palette = document.getElementById('rocket-palette');
    if (!palette) return;

    palette.innerHTML = '';
    const rocketShapes = ['triangle', 'rectangle', 'circle', 'oval'];

    rocketShapes.forEach(shapeKey => {
      const shape = SHAPES[shapeKey];
      const el = document.createElement('div');
      el.className = 'palette-shape draggable-shape';
      el.setAttribute('data-shape', shapeKey);
      el.innerHTML = shape.svg;

      el.addEventListener('click', () => {
        this.tryAutoPlaceRocket(shapeKey);
      });

      palette.appendChild(el);
    });

    // Launch Button Event
    launchBtn?.addEventListener('click', () => {
      this.triggerRocketLaunch();
    });

    this.voice.speak("Build the rocket using shapes so we can blast off into space!", "Riya");
  }

  tryAutoPlaceRocket(shapeKey) {
    const matchingZone = Array.from(document.querySelectorAll('#rocket-frame .drop-target')).find(zone => {
      return zone.getAttribute('data-accept') === shapeKey && !this.rocketState.placedParts.has(zone.getAttribute('data-part'));
    });

    if (matchingZone) {
      this.placeRocketPart(matchingZone, shapeKey);
    } else {
      this.sound.playPop();
      this.voice.speak(`${SHAPES[shapeKey].name}!`, 'Little Star');
    }
  }

  placeRocketPart(zone, shapeKey) {
    const part = zone.getAttribute('data-part');
    if (this.rocketState.placedParts.has(part)) return;

    this.rocketState.placedParts.add(part);
    zone.classList.add('filled');
    zone.innerHTML = SHAPES[shapeKey].svg;

    this.sound.playSnap();
    this.unlockShape(shapeKey);

    if (this.rocketState.placedParts.size >= this.rocketState.totalParts) {
      this.sound.playSuccess();
      document.getElementById('btn-launch-rocket')?.classList.remove('hidden');
      this.voice.speak("The rocket is ready for launch! Tap the LAUNCH button!", "Little Star");
    } else {
      this.voice.speak(`${SHAPES[shapeKey].name} placed!`, 'Little Star');
    }
  }

  triggerRocketLaunch() {
    const launchBtn = document.getElementById('btn-launch-rocket');
    const countdownOverlay = document.getElementById('countdown-overlay');
    const countNum = document.getElementById('countdown-number');
    const frame = document.getElementById('rocket-frame');
    const flame = document.getElementById('exhaust-flame');

    launchBtn?.classList.add('hidden');
    countdownOverlay?.classList.remove('hidden');

    let count = 3;
    if (countNum) countNum.textContent = count;
    this.sound.playPop();
    this.voice.speak("Three!", "Little Star");

    const timer = setInterval(() => {
      count--;
      if (count > 0) {
        if (countNum) countNum.textContent = count;
        this.sound.playPop();
        this.voice.speak(count === 2 ? "Two!" : "One!", "Little Star");
      } else {
        clearInterval(timer);
        if (countNum) countNum.textContent = "🚀 BLAST OFF!";
        countdownOverlay?.classList.add('hidden');

        // Blast off sequence
        flame?.classList.remove('hidden');
        this.sound.playRocketRumble();
        frame?.classList.add('launching');
        this.confetti.burst(100);
        this.voice.speak("Blast off! To infinity and the stars!", "Riya", () => {
          setTimeout(() => this.showScene('restoration'), 3000);
        });
      }
    }, 1000);
  }

  // ============================================================
  // MODULE 10: GRAND RESTORATION & DIPLOMA
  // ============================================================
  initRestorationScene() {
    this.sound.playFanfare();
    this.confetti.burst(120);

    // Populate all 8 restored slots
    const slots = document.getElementById('restored-slots');
    if (slots) {
      slots.innerHTML = '';
      Object.values(SHAPES).forEach(shape => {
        const d = document.createElement('div');
        d.style.display = 'inline-block';
        d.style.width = '36px';
        d.style.height = '36px';
        d.style.margin = '4px';
        d.innerHTML = shape.svg;
        slots.appendChild(d);
        this.unlockShape(shape.id);
      });
    }

    document.getElementById('btn-open-workshop')?.addEventListener('click', () => {
      this.sound.playPop();
      this.showScene('freeplay');
    });

    document.getElementById('btn-play-again')?.addEventListener('click', () => {
      this.sound.playPop();
      this.showScene('intro');
    });

    this.voice.speak("Hooray! The Shape Machine is fully repaired! The world is restored! You are a Master Shape Builder!", "Riya");
  }

  // ============================================================
  // MODULE 11: FREE PLAY WORKSHOP (SANDBOX STUDIO)
  // ============================================================
  initFreePlayScene() {
    const sandbox = document.getElementById('creative-sandbox');
    const colorSwatches = document.getElementById('color-swatches');
    let currentColor = '#ff4d6d';

    // Color Swatch Selection
    colorSwatches?.querySelectorAll('.swatch').forEach(swatch => {
      swatch.addEventListener('click', () => {
        colorSwatches.querySelectorAll('.swatch').forEach(s => s.classList.remove('active'));
        swatch.classList.add('active');
        currentColor = swatch.getAttribute('data-color') || '#ff4d6d';
        this.sound.playPop();
      });
    });

    // Stamp Buttons
    document.querySelectorAll('.workshop-shape-stamps .stamp-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const shapeKey = btn.getAttribute('data-shape');
        if (shapeKey && sandbox) {
          this.sound.playPop();
          this.spawnSandboxShape(shapeKey, currentColor, sandbox);
          this.voice.speak(SHAPES[shapeKey].name, 'Little Star');
        }
      });
    });

    // Template Selector
    document.querySelectorAll('.template-selector .tmpl-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.template-selector .tmpl-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const tmpl = btn.getAttribute('data-tmpl');
        this.sound.playPop();
        const watermark = document.getElementById('template-watermark');
        if (watermark) {
          const map = { blank: '', house: '🏡', robot: '🤖', rocket: '🚀', tree: '🌳', butterfly: '🦋' };
          watermark.textContent = map[tmpl] || '';
        }
      });
    });

    // Animate Dance Button
    document.getElementById('btn-workshop-animate')?.addEventListener('click', () => {
      this.sound.playSuccess();
      this.confetti.burst(40);
      sandbox?.querySelectorAll('.sandbox-shape').forEach(el => {
        el.style.animation = 'shapeBouncePop 0.8s ease infinite alternate';
        setTimeout(() => el.style.animation = '', 3000);
      });
      this.voice.speak("Dancing shapes!", "Riya");
    });

    // Clear Canvas
    document.getElementById('btn-workshop-clear')?.addEventListener('click', () => {
      this.sound.playPop();
      sandbox?.querySelectorAll('.sandbox-shape').forEach(el => el.remove());
    });

    this.voice.speak("Welcome to the Magic Shape Workshop! Tap any shape to add it, and create anything you want!", "Riya");
  }

  spawnSandboxShape(shapeKey, color, container) {
    const shape = SHAPES[shapeKey];
    const el = document.createElement('div');
    el.className = 'sandbox-shape';
    el.style.width = '80px';
    el.style.height = '80px';
    el.style.left = `${Math.random() * (container.clientWidth - 100) + 20}px`;
    el.style.top = `${Math.random() * (container.clientHeight - 100) + 20}px`;

    el.innerHTML = shape.svg;
    const svgShape = el.querySelector('circle, rect, polygon, path, ellipse');
    if (svgShape) {
      svgShape.setAttribute('fill', color);
    }

    // Draggable in sandbox
    let isDragging = false;
    let startX = 0, startY = 0;
    let initialLeft = 0, initialTop = 0;

    const onPointerDown = (e) => {
      isDragging = true;
      startX = e.clientX || (e.touches ? e.touches[0].clientX : 0);
      startY = e.clientY || (e.touches ? e.touches[0].clientY : 0);
      initialLeft = parseFloat(el.style.left) || 0;
      initialTop = parseFloat(el.style.top) || 0;
      el.setPointerCapture?.(e.pointerId);
      this.sound.playPop();
      e.stopPropagation();
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      const clientX = e.clientX || (e.touches ? e.touches[0].clientX : 0);
      const clientY = e.clientY || (e.touches ? e.touches[0].clientY : 0);
      el.style.left = `${initialLeft + (clientX - startX)}px`;
      el.style.top = `${initialTop + (clientY - startY)}px`;
    };

    const onPointerUp = (e) => {
      if (isDragging) {
        isDragging = false;
        el.releasePointerCapture?.(e.pointerId);
      }
    };

    el.addEventListener('pointerdown', onPointerDown);
    el.addEventListener('pointermove', onPointerMove);
    el.addEventListener('pointerup', onPointerUp);
    el.addEventListener('pointercancel', onPointerUp);

    container.appendChild(el);
  }

  // ============================================================
  // 6. UNIFIED POINTER DRAG & DROP ENGINE
  // ============================================================
  setupUnifiedDragDrop() {
    let currentDrag = null;
    let dragGhost = this.dragGhost;

    document.addEventListener('pointerdown', (e) => {
      const target = e.target.closest('.draggable-shape');
      if (!target) return;

      const shapeKey = target.getAttribute('data-shape');
      if (!shapeKey) return;

      currentDrag = {
        element: target,
        shapeKey: shapeKey,
        startX: e.clientX,
        startY: e.clientY
      };

      if (dragGhost) {
        dragGhost.innerHTML = SHAPES[shapeKey].svg;
        dragGhost.style.left = `${e.clientX}px`;
        dragGhost.style.top = `${e.clientY}px`;
        dragGhost.classList.remove('hidden');
      }

      this.sound.playPop();
    });

    document.addEventListener('pointermove', (e) => {
      if (!currentDrag || !dragGhost) return;
      dragGhost.style.left = `${e.clientX}px`;
      dragGhost.style.top = `${e.clientY}px`;

      // Highlight drop targets
      const elemBelow = document.elementFromPoint(e.clientX, e.clientY);
      const dropTarget = elemBelow?.closest('.drop-target');

      document.querySelectorAll('.drop-target').forEach(dt => dt.classList.remove('drag-over'));
      if (dropTarget) {
        dropTarget.classList.add('drag-over');
      }
    });

    document.addEventListener('pointerup', (e) => {
      if (!currentDrag) return;

      if (dragGhost) {
        dragGhost.classList.add('hidden');
      }

      const elemBelow = document.elementFromPoint(e.clientX, e.clientY);
      const dropTarget = elemBelow?.closest('.drop-target');

      if (dropTarget) {
        const accept = dropTarget.getAttribute('data-accept');
        const shapeKey = currentDrag.shapeKey;

        if (accept === shapeKey) {
          // Check current active scene and route to correct handler
          if (this.currentStage === 'puzzle') {
            this.handlePuzzleAnswer(shapeKey, accept);
          } else if (this.currentStage === 'house') {
            this.placeHousePart(dropTarget, shapeKey);
          } else if (this.currentStage === 'robot') {
            this.placeRobotPart(dropTarget, shapeKey);
          } else if (this.currentStage === 'sorter') {
            this.handleSorterDrop(currentDrag.element, dropTarget, shapeKey);
          } else if (this.currentStage === 'rocket') {
            this.placeRocketPart(dropTarget, shapeKey);
          }
        } else {
          this.sound.playBoing();
          this.voice.speak(`That is a ${SHAPES[shapeKey].name}. Try placing it in the matching spot!`, 'Little Star');
        }
      }

      document.querySelectorAll('.drop-target').forEach(dt => dt.classList.remove('drag-over'));
      currentDrag = null;
    });

    document.addEventListener('pointercancel', () => {
      if (dragGhost) dragGhost.classList.add('hidden');
      document.querySelectorAll('.drop-target').forEach(dt => dt.classList.remove('drag-over'));
      currentDrag = null;
    });
  }
}

// Instantiate Game on DOM Ready
window.addEventListener('DOMContentLoaded', () => {
  window.game = new MagicShapeGame();
});
