/**
 * RIYA'S NUMBER SPACE MISSION 🚀 - CHOTAPLAY
 * Complete Child-Friendly Educational Game Engine (Numbers 1-20)
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. DATA DEFINITIONS: 20 NUMBER MISSIONS
     ========================================================================== */
  const NUMBER_NAMES = [
    "ZERO", "ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX", "SEVEN", "EIGHT", "NINE", "TEN",
    "ELEVEN", "TWELVE", "THIRTEEN", "FOURTEEN", "FIFTEEN", "SIXTEEN", "SEVENTEEN", "EIGHTEEN", "NINETEEN", "TWENTY"
  ];

  const NUMBER_MISSIONS = [
    {
      number: 1,
      name: "ONE",
      mechanic: "star-catch",
      targetCount: 1,
      instruction: "Tap the floating star to collect Star Energy!",
      completeMessage: "One shining star collected!",
      badge: "⭐"
    },
    {
      number: 2,
      name: "TWO",
      mechanic: "star-catch",
      targetCount: 2,
      instruction: "Let's catch two bright stars!",
      completeMessage: "Two stars collected! Great job!",
      badge: "⭐"
    },
    {
      number: 3,
      name: "THREE",
      mechanic: "star-catch",
      targetCount: 3,
      instruction: "Find and collect three golden stars!",
      completeMessage: "Three stars! The spaceship is warming up!",
      badge: "⭐"
    },
    {
      number: 4,
      name: "FOUR",
      mechanic: "planet-orbit",
      targetCount: 4,
      instruction: "Place four colorful planets into orbit!",
      completeMessage: "Four planets orbiting beautifully!",
      badge: "🪐"
    },
    {
      number: 5,
      name: "FIVE",
      mechanic: "planet-orbit",
      targetCount: 5,
      instruction: "Can you send five planets around the sun?",
      completeMessage: "Five planets dancing in space!",
      badge: "🪐"
    },
    {
      number: 6,
      name: "SIX",
      mechanic: "star-catch",
      targetCount: 6,
      instruction: "Catch six twinkling cosmic stars!",
      completeMessage: "Six stars! Look at that magical sparkle!",
      badge: "⭐"
    },
    {
      number: 7,
      name: "SEVEN",
      mechanic: "alien-crystals",
      targetCount: 7,
      instruction: "Feed seven energy crystals to our alien friend Pip!",
      completeMessage: "Seven crystals! Pip is so happy!",
      badge: "💎"
    },
    {
      number: 8,
      name: "EIGHT",
      mechanic: "alien-crystals",
      targetCount: 8,
      instruction: "Pip needs eight glowing energy crystals!",
      completeMessage: "Eight crystals! Pip's tummy is glowing!",
      badge: "💎"
    },
    {
      number: 9,
      name: "NINE",
      mechanic: "planet-orbit",
      targetCount: 9,
      instruction: "Place nine magic planets into the cosmic rings!",
      completeMessage: "Nine planets! A wonderful solar system!",
      badge: "🪐"
    },
    {
      number: 10,
      name: "TEN",
      mechanic: "fuel-matrix",
      targetCount: 10,
      instruction: "Insert ten plasma fuel cells into the rocket core!",
      completeMessage: "Ten fuel cells! Halfway to twenty!",
      badge: "⚡"
    },
    {
      number: 11,
      name: "ELEVEN",
      mechanic: "star-catch",
      targetCount: 11,
      instruction: "Collect eleven floating star energies!",
      completeMessage: "Eleven stars powered into the ship!",
      badge: "⭐"
    },
    {
      number: 12,
      name: "TWELVE",
      mechanic: "star-path",
      targetCount: 12,
      instruction: "Connect the stars from 1 to 12 in order!",
      completeMessage: "Twelve stars connected in a glowing path!",
      badge: "✨"
    },
    {
      number: 13,
      name: "THIRTEEN",
      mechanic: "alien-crystals",
      targetCount: 13,
      instruction: "Give Pip thirteen super-charged space crystals!",
      completeMessage: "Thirteen crystals! Super cosmic power!",
      badge: "💎"
    },
    {
      number: 14,
      name: "FOURTEEN",
      mechanic: "planet-orbit",
      targetCount: 14,
      instruction: "Send fourteen spinning planets into orbit!",
      completeMessage: "Fourteen planets orbiting in harmony!",
      badge: "🪐"
    },
    {
      number: 15,
      name: "FIFTEEN",
      mechanic: "fuel-matrix",
      targetCount: 15,
      instruction: "Power the rocket with fifteen plasma cells!",
      completeMessage: "Fifteen cells locked! The engines are humming!",
      badge: "⚡"
    },
    {
      number: 16,
      name: "SIXTEEN",
      mechanic: "star-catch",
      targetCount: 16,
      instruction: "Catch sixteen sparkling stars in space!",
      completeMessage: "Sixteen stars collected! Almost ready for launch!",
      badge: "⭐"
    },
    {
      number: 17,
      name: "SEVENTEEN",
      mechanic: "alien-crystals",
      targetCount: 17,
      instruction: "Pip needs seventeen magical crystal gems!",
      completeMessage: "Seventeen crystals! Pip loves you!",
      badge: "💎"
    },
    {
      number: 18,
      name: "EIGHTEEN",
      mechanic: "fuel-matrix",
      targetCount: 18,
      instruction: "Fill eighteen plasma slots for super boost!",
      completeMessage: "Eighteen cells ready! Full power imminent!",
      badge: "⚡"
    },
    {
      number: 19,
      name: "NINETEEN",
      mechanic: "star-path",
      targetCount: 19,
      instruction: "Connect all nineteen stars to unlock Hyperspace!",
      completeMessage: "Nineteen stars! One more to twenty!",
      badge: "✨"
    },
    {
      number: 20,
      name: "TWENTY",
      mechanic: "space-train",
      targetCount: 20,
      instruction: "Load all twenty cosmic cargo stars onto the Space Train!",
      completeMessage: "Twenty stars! The ultimate space journey is ready!",
      badge: "👑"
    }
  ];

  /* ==========================================================================
     2. AUDIO SYNTHESIZER & SPEECH ENGINE (100% RELIABLE OFFLINE)
     ========================================================================== */
  class SoundEngine {
    constructor() {
      this.ctx = null;
      this.soundEnabled = true;
      this.musicEnabled = false;
      this.musicOsc = null;
      this.musicInterval = null;
      this.speechSynth = window.speechSynthesis || null;
      this.voices = [];

      if (this.speechSynth) {
        this.loadVoices();
        if (speechSynthesis.onvoiceschanged !== undefined) {
          speechSynthesis.onvoiceschanged = () => this.loadVoices();
        }
      }
    }

    initContext() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    loadVoices() {
      if (!this.speechSynth) return;
      this.voices = this.speechSynth.getVoices().filter(v => v.lang.startsWith('en'));
    }

    playPop() {
      if (!this.soundEnabled) return;
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.1);

      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
    }

    playStarChime(step = 1) {
      if (!this.soundEnabled) return;
      this.initContext();
      if (!this.ctx) return;

      // Pentatonic musical scale: C, D, E, G, A, C...
      const scale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99, 880.00, 1046.50];
      const freq = scale[(step - 1) % scale.length] * (1 + Math.floor((step - 1) / scale.length) * 0.5);

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.4);
    }

    playSnap() {
      if (!this.soundEnabled) return;
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(520, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1400, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    }

    playFanfare() {
      if (!this.soundEnabled) return;
      this.initContext();
      if (!this.ctx) return;

      const notes = [523.25, 659.25, 783.99, 1046.50]; // C Major arpeggio
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

          gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.6);

          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start();
          osc.stop(this.ctx.currentTime + 0.6);
        }, idx * 120);
      });
    }

    speak(text, onEnd) {
      if (!this.speechSynth) {
        if (onEnd) onEnd();
        return;
      }

      this.speechSynth.cancel(); // cancel previous

      const utter = new SpeechSynthesisUtterance(text);
      utter.rate = 0.95; // child-friendly pacing
      utter.pitch = 1.25; // warm, cheerful child/friend pitch

      // Choose female / cheerful voice if available
      const preferred = this.voices.find(v => v.name.includes('Female') || v.name.includes('Samantha') || v.name.includes('Zira') || v.name.includes('Google US English'));
      if (preferred) {
        utter.voice = preferred;
      }

      if (onEnd) {
        utter.onend = onEnd;
      }

      try {
        this.speechSynth.speak(utter);
      } catch (e) {
        console.warn('Speech synthesis error:', e);
      }
    }

    toggleMusic() {
      this.initContext();
      this.musicEnabled = !this.musicEnabled;

      if (this.musicEnabled) {
        this.startBGM();
      } else {
        this.stopBGM();
      }
      return this.musicEnabled;
    }

    startBGM() {
      if (!this.ctx || this.musicInterval) return;
      const melody = [523.25, 659.25, 783.99, 659.25, 880.00, 783.99, 659.25, 523.25];
      let step = 0;

      this.musicInterval = setInterval(() => {
        if (!this.musicEnabled || !this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(melody[step % melody.length], this.ctx.currentTime);

        gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.45);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.45);
        step++;
      }, 500);
    }

    stopBGM() {
      if (this.musicInterval) {
        clearInterval(this.musicInterval);
        this.musicInterval = null;
      }
    }
  }

  /* ==========================================================================
     3. DEEP SPACE PARTICLE ENGINE (CANVAS 2D)
     ========================================================================== */
  class SpaceBackground {
    constructor(canvasId) {
      this.canvas = document.getElementById(canvasId);
      this.ctx = this.canvas.getContext('2d');
      this.stars = [];
      this.shootingStars = [];
      this.resize();
      this.initStars();
      window.addEventListener('resize', () => this.resize());
      this.animate();
    }

    resize() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }

    initStars() {
      this.stars = [];
      const numStars = Math.floor((this.canvas.width * this.canvas.height) / 3500);
      for (let i = 0; i < numStars; i++) {
        this.stars.push({
          x: Math.random() * this.canvas.width,
          y: Math.random() * this.canvas.height,
          radius: Math.random() * 1.8 + 0.5,
          alpha: Math.random(),
          speed: Math.random() * 0.02 + 0.005,
          color: ['#ffffff', '#ffe066', '#80f2ff', '#ff80ab'][Math.floor(Math.random() * 4)]
        });
      }
    }

    addShootingStar() {
      if (this.shootingStars.length < 2 && Math.random() < 0.015) {
        this.shootingStars.push({
          x: Math.random() * this.canvas.width,
          y: Math.random() * (this.canvas.height * 0.5),
          len: Math.random() * 80 + 40,
          speed: Math.random() * 8 + 6,
          angle: Math.PI / 4,
          life: 1
        });
      }
    }

    animate() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // Render Twinkling Stars
      this.stars.forEach(star => {
        star.alpha += star.speed;
        const currentAlpha = Math.abs(Math.sin(star.alpha));

        this.ctx.save();
        this.ctx.fillStyle = star.color;
        this.ctx.globalAlpha = currentAlpha * 0.8 + 0.2;
        this.ctx.beginPath();
        this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.restore();
      });

      // Render Shooting Stars
      this.addShootingStar();
      for (let i = this.shootingStars.length - 1; i >= 0; i--) {
        const s = this.shootingStars[i];
        this.ctx.save();
        this.ctx.strokeStyle = '#ffe066';
        this.ctx.lineWidth = 2;
        this.ctx.globalAlpha = s.life;
        this.ctx.beginPath();
        this.ctx.moveTo(s.x, s.y);
        this.ctx.lineTo(s.x - Math.cos(s.angle) * s.len, s.y - Math.sin(s.angle) * s.len);
        this.ctx.stroke();
        this.ctx.restore();

        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.life -= 0.02;

        if (s.life <= 0 || s.x > this.canvas.width || s.y > this.canvas.height) {
          this.shootingStars.splice(i, 1);
        }
      }

      requestAnimationFrame(() => this.animate());
    }
  }

  /* ==========================================================================
     4. GAME ENGINE & MISSION CONTROLLER
     ========================================================================== */
  class SpaceMissionGame {
    constructor() {
      this.audio = new SoundEngine();
      this.bg = new SpaceBackground('space-canvas');

      this.currentMissionIndex = 0; // 0 to 19 (numbers 1 to 20)
      this.collectedInMission = 0;
      this.completedNumbers = new Set();
      this.isTransitioning = false;

      // DOM Elements
      this.dom = {
        app: document.getElementById('game-app'),
        currentNumDisplay: document.getElementById('current-number-display'),
        currentNumName: document.getElementById('current-number-name'),
        quantityMeter: document.getElementById('quantity-meter'),
        speechText: document.getElementById('speech-text'),
        speechBubble: document.getElementById('speech-bubble'),
        riyaAvatar: document.getElementById('riya-avatar'),
        littleStarAvatar: document.getElementById('little-star-avatar'),
        spaceshipImg: document.getElementById('spaceship-img'),
        corePercent: document.getElementById('core-percent'),
        starEnergyCount: document.getElementById('star-energy-count'),
        missionContent: document.getElementById('mission-content'),
        particleOverlay: document.getElementById('particle-overlay'),
        currentCountText: document.getElementById('current-count-text'),
        countProgressFill: document.getElementById('count-progress-fill'),
        footerHint: document.getElementById('footer-hint'),
        navNumberLabel: document.getElementById('nav-number-label'),
        prevNumberBtn: document.getElementById('prev-number-btn'),
        nextNumberBtn: document.getElementById('next-number-btn'),
        repeatVoiceBtn: document.getElementById('repeat-voice-btn'),
        bubbleListenBtn: document.getElementById('bubble-listen-btn'),
        musicToggleBtn: document.getElementById('music-toggle-btn'),
        musicIcon: document.getElementById('music-icon'),
        startModal: document.getElementById('start-modal'),
        startGameBtn: document.getElementById('start-game-btn'),
        constellationBtn: document.getElementById('constellation-btn'),
        constellationModal: document.getElementById('constellation-modal'),
        closeConstellationBtn: document.getElementById('close-constellation-btn'),
        constellationNodesContainer: document.getElementById('constellation-nodes-container'),
        constellationSvg: document.getElementById('constellation-svg'),
        constellationGaugeFill: document.getElementById('constellation-gauge-fill'),
        constellationStatusText: document.getElementById('constellation-status-text'),
        navDrawerBtn: document.getElementById('nav-drawer-btn'),
        missionDrawer: document.getElementById('mission-drawer'),
        closeDrawerBtn: document.getElementById('close-drawer-btn'),
        numberGridSelector: document.getElementById('number-grid-selector'),
        levelCompleteBanner: document.getElementById('level-complete-banner'),
        celebrateNumBadge: document.getElementById('celebrate-num-badge'),
        celebrateTitle: document.getElementById('celebrate-title'),
        celebrateSubtitle: document.getElementById('celebrate-subtitle'),
        celebrateStarsBurst: document.getElementById('celebrate-stars-burst'),
        grandFinaleModal: document.getElementById('grand-finale-modal'),
        finaleNumbersGrid: document.getElementById('finale-numbers-grid'),
        replayGameBtn: document.getElementById('replay-game-btn'),
        exploreFreelyBtn: document.getElementById('explore-freely-btn')
      };

      this.initEvents();
      this.initConstellationMap();
      this.initMissionSelectorGrid();
    }

    /* INITIALIZE DOM LISTENERS */
    initEvents() {
      this.dom.startGameBtn.addEventListener('click', () => {
        this.audio.initContext();
        this.audio.playPop();
        this.dom.startModal.classList.remove('active');
        this.loadMission(0);
      });

      this.dom.repeatVoiceBtn.addEventListener('click', () => this.speakCurrentInstruction());
      this.dom.bubbleListenBtn.addEventListener('click', () => this.speakCurrentInstruction());

      this.dom.riyaAvatar.addEventListener('click', () => {
        this.audio.playPop();
        this.audio.speak("Hi astronaut friend! Let's power up our spaceship!");
        this.showSpeech("Hi astronaut friend! Let's power up our spaceship!");
      });

      this.dom.littleStarAvatar.addEventListener('click', () => {
        this.audio.playStarChime(5);
        this.audio.speak("Twinkle twinkle! You're doing great!");
        this.showSpeech("Twinkle twinkle! You're doing great!");
      });

      this.dom.musicToggleBtn.addEventListener('click', () => {
        const active = this.audio.toggleMusic();
        this.dom.musicIcon.textContent = active ? '🔊' : '🎵';
      });

      this.dom.prevNumberBtn.addEventListener('click', () => {
        if (this.currentMissionIndex > 0) {
          this.loadMission(this.currentMissionIndex - 1);
        }
      });

      this.dom.nextNumberBtn.addEventListener('click', () => {
        if (this.currentMissionIndex < NUMBER_MISSIONS.length - 1) {
          this.loadMission(this.currentMissionIndex + 1);
        }
      });

      this.dom.constellationBtn.addEventListener('click', () => {
        this.audio.playPop();
        this.updateConstellationView();
        this.dom.constellationModal.classList.add('active');
      });

      this.dom.closeConstellationBtn.addEventListener('click', () => {
        this.dom.constellationModal.classList.remove('active');
      });

      this.dom.navDrawerBtn.addEventListener('click', () => {
        this.audio.playPop();
        this.updateMissionDrawer();
        this.dom.missionDrawer.classList.add('active');
      });

      this.dom.closeDrawerBtn.addEventListener('click', () => {
        this.dom.missionDrawer.classList.remove('active');
      });

      this.dom.replayGameBtn.addEventListener('click', () => {
        this.dom.grandFinaleModal.classList.remove('active');
        this.completedNumbers.clear();
        this.loadMission(0);
      });

      this.dom.exploreFreelyBtn.addEventListener('click', () => {
        this.dom.grandFinaleModal.classList.remove('active');
        this.dom.missionDrawer.classList.add('active');
      });
    }

    /* LOAD SPECIFIC NUMBER MISSION (0-indexed: 0 = Number 1) */
    loadMission(index) {
      this.currentMissionIndex = index;
      this.collectedInMission = 0;
      this.isTransitioning = false;

      const mission = NUMBER_MISSIONS[index];

      // Update HUD
      this.dom.currentNumDisplay.textContent = mission.number;
      this.dom.currentNumName.textContent = mission.name;
      this.dom.navNumberLabel.textContent = `Number ${mission.number} of 20`;
      this.dom.starEnergyCount.textContent = `${this.completedNumbers.size}/20`;
      this.dom.corePercent.textContent = `${Math.round((this.completedNumbers.size / 20) * 100)}%`;

      this.updateQuantityMeter();
      this.updateFooterProgress();

      // Show Speech & Voice
      this.showSpeech(mission.instruction);
      this.speakCurrentInstruction();

      // Render Mechanic View
      this.renderMissionContent(mission);
    }

    speakCurrentInstruction() {
      const mission = NUMBER_MISSIONS[this.currentMissionIndex];
      const spokenText = `${mission.name}! ${mission.instruction}`;
      this.audio.speak(spokenText);
    }

    showSpeech(text) {
      this.dom.speechText.textContent = text;
      this.dom.speechBubble.classList.remove('pulse-hint');
      void this.dom.speechBubble.offsetWidth;
      this.dom.speechBubble.classList.add('pulse-hint');
    }

    /* QUANTITY METER IN HUD */
    updateQuantityMeter() {
      const mission = NUMBER_MISSIONS[this.currentMissionIndex];
      this.dom.quantityMeter.innerHTML = '';

      for (let i = 1; i <= mission.targetCount; i++) {
        const dot = document.createElement('span');
        dot.className = `q-dot ${i <= this.collectedInMission ? 'filled' : 'empty'}`;
        dot.textContent = mission.badge;
        this.dom.quantityMeter.appendChild(dot);
      }
    }

    updateFooterProgress() {
      const mission = NUMBER_MISSIONS[this.currentMissionIndex];
      this.dom.currentCountText.textContent = `${this.collectedInMission} / ${mission.targetCount}`;
      const pct = (this.collectedInMission / mission.targetCount) * 100;
      this.dom.countProgressFill.style.width = `${pct}%`;
      this.dom.footerHint.textContent = mission.instruction;
    }

    /* ON OBJECT COLLECTED / INCREMENTED */
    collectItem(x, y) {
      if (this.isTransitioning) return;

      const mission = NUMBER_MISSIONS[this.currentMissionIndex];
      this.collectedInMission++;

      // Voice count number: "1", "2", "3"...
      const spokenNumber = NUMBER_NAMES[this.collectedInMission];
      this.audio.playStarChime(this.collectedInMission);
      this.audio.speak(spokenNumber);

      // Create Particle Sparkles
      this.createSparkleBurst(x, y);

      // Update UI
      this.updateQuantityMeter();
      this.updateFooterProgress();
      this.showSpeech(`${spokenNumber}! (${this.collectedInMission} of ${mission.targetCount})`);

      // Check Mission Completion
      if (this.collectedInMission >= mission.targetCount) {
        this.handleMissionComplete();
      }
    }

    /* HANDLE MISSION SUCCESS */
    handleMissionComplete() {
      this.isTransitioning = true;
      const mission = NUMBER_MISSIONS[this.currentMissionIndex];
      this.completedNumbers.add(mission.number);

      // Play Fanfare & Celebration Voice
      this.audio.playFanfare();
      const victorySpeech = `Great job! ${mission.name}! ${mission.completeMessage}`;
      setTimeout(() => {
        this.audio.speak(victorySpeech);
      }, 500);

      // Show Banner
      this.dom.celebrateNumBadge.textContent = `${mission.badge} ${mission.number}`;
      this.dom.celebrateTitle.textContent = `${mission.name}!`;
      this.dom.celebrateSubtitle.textContent = mission.completeMessage;
      this.dom.levelCompleteBanner.classList.add('active');

      // Update Constellation Stats
      this.dom.starEnergyCount.textContent = `${this.completedNumbers.size}/20`;
      this.dom.corePercent.textContent = `${Math.round((this.completedNumbers.size / 20) * 100)}%`;

      setTimeout(() => {
        this.dom.levelCompleteBanner.classList.remove('active');

        // Check if finished final Number 20
        if (mission.number === 20 || this.completedNumbers.size === 20) {
          this.triggerGrandFinale();
        } else {
          // Transition smoothly to next number
          this.loadMission(this.currentMissionIndex + 1);
        }
      }, 2600);
    }

    /* ==========================================================================
       5. RENDER MECHANICS
       ========================================================================== */
    renderMissionContent(mission) {
      this.dom.missionContent.innerHTML = '';

      switch (mission.mechanic) {
        case 'star-catch':
          this.renderStarCatchMechanic(mission);
          break;
        case 'planet-orbit':
          this.renderPlanetOrbitMechanic(mission);
          break;
        case 'alien-crystals':
          this.renderAlienCrystalsMechanic(mission);
          break;
        case 'fuel-matrix':
          this.renderFuelMatrixMechanic(mission);
          break;
        case 'star-path':
          this.renderStarPathMechanic(mission);
          break;
        case 'space-train':
          this.renderSpaceTrainMechanic(mission);
          break;
        default:
          this.renderStarCatchMechanic(mission);
      }
    }

    /* MECHANIC A: FLOATING COSMIC STARS */
    renderStarCatchMechanic(mission) {
      const container = document.createElement('div');
      container.className = 'star-field-mechanic';

      const starEmojis = ['⭐', '🌟', '✨', '💫'];

      for (let i = 0; i < mission.targetCount; i++) {
        const star = document.createElement('div');
        star.className = 'cosmic-star-item float-anim';
        star.textContent = starEmojis[i % starEmojis.length];

        // Random organic distribution across play area
        const top = 15 + Math.random() * 65;
        const left = 10 + Math.random() * 80;
        star.style.top = `${top}%`;
        star.style.left = `${left}%`;
        star.style.animationDelay = `${(i * 0.2).toFixed(2)}s`;

        star.addEventListener('click', (e) => {
          if (star.classList.contains('collected')) return;
          star.classList.add('collected');
          const rect = star.getBoundingClientRect();
          this.collectItem(rect.left + rect.width / 2, rect.top + rect.height / 2);
        });

        container.appendChild(star);
      }

      this.dom.missionContent.appendChild(container);
    }

    /* MECHANIC B: PLANET ORBITS */
    renderPlanetOrbitMechanic(mission) {
      const container = document.createElement('div');
      container.className = 'planet-orbit-mechanic';

      // Central Cosmic Sun
      const sun = document.createElement('div');
      sun.className = 'central-cosmic-sun';
      sun.textContent = '☀️';
      container.appendChild(sun);

      // Orbit Track & Slots
      const rings = document.createElement('div');
      rings.className = 'orbit-rings-container orbiting-active';

      const planetEmojis = ['🪐', '🌍', '🌕', '🔴', '🟣', '🔵', '🟠', '🟢', '💎'];
      const radius = Math.min(180, 70 + mission.targetCount * 8);

      for (let i = 0; i < mission.targetCount; i++) {
        const angle = (i / mission.targetCount) * (Math.PI * 2);
        const slot = document.createElement('div');
        slot.className = 'orbit-slot';
        slot.dataset.index = i;

        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        slot.style.transform = `translate(${x}px, ${y}px)`;

        rings.appendChild(slot);
      }
      container.appendChild(rings);

      // Planet Tray (Bottom)
      const tray = document.createElement('div');
      tray.className = 'planet-tray';

      for (let i = 0; i < mission.targetCount; i++) {
        const planetItem = document.createElement('div');
        planetItem.className = 'tray-planet-item';
        planetItem.textContent = planetEmojis[i % planetEmojis.length];

        planetItem.addEventListener('click', (e) => {
          if (planetItem.classList.contains('used')) return;
          planetItem.classList.add('used');

          const unfilledSlot = rings.querySelector(`.orbit-slot:not(.filled)`);
          if (unfilledSlot) {
            unfilledSlot.classList.add('filled');
            unfilledSlot.textContent = planetItem.textContent;
            const rect = planetItem.getBoundingClientRect();
            this.collectItem(rect.left + rect.width / 2, rect.top + rect.height / 2);
          }
        });

        tray.appendChild(planetItem);
      }
      container.appendChild(tray);

      this.dom.missionContent.appendChild(container);
    }

    /* MECHANIC C: ALIEN CRYSTAL FEEDER */
    renderAlienCrystalsMechanic(mission) {
      const container = document.createElement('div');
      container.className = 'alien-feeder-mechanic';

      // Alien Character Box
      const alienBox = document.createElement('div');
      alienBox.className = 'alien-creature-box';
      alienBox.innerHTML = `
        <div class="alien-avatar-big" id="alien-pip">👽</div>
        <div class="alien-energy-pod">
          <span>Pip's Energy:</span>
          <span class="pod-meter" id="pod-meter">0 / ${mission.targetCount} 💎</span>
        </div>
      `;
      container.appendChild(alienBox);

      // Crystals Grid
      const crystalsGrid = document.createElement('div');
      crystalsGrid.className = 'crystals-container';

      const gems = ['💎', '🔮', '✨', '🔷', '🔶', '💖'];
      for (let i = 0; i < mission.targetCount; i++) {
        const gem = document.createElement('div');
        gem.className = 'crystal-item float-anim';
        gem.textContent = gems[i % gems.length];
        gem.style.animationDelay = `${(i * 0.15).toFixed(2)}s`;

        gem.addEventListener('click', (e) => {
          if (gem.classList.contains('fed')) return;
          gem.classList.add('fed');

          const podMeter = document.getElementById('pod-meter');
          if (podMeter) {
            podMeter.textContent = `${this.collectedInMission + 1} / ${mission.targetCount} 💎`;
          }

          const pip = document.getElementById('alien-pip');
          if (pip) {
            pip.style.transform = 'scale(1.2) rotate(10deg)';
            setTimeout(() => { pip.style.transform = 'scale(1)'; }, 300);
          }

          const rect = gem.getBoundingClientRect();
          this.collectItem(rect.left + rect.width / 2, rect.top + rect.height / 2);
        });

        crystalsGrid.appendChild(gem);
      }
      container.appendChild(crystalsGrid);

      this.dom.missionContent.appendChild(container);
    }

    /* MECHANIC D: ROCKET FUEL MATRIX */
    renderFuelMatrixMechanic(mission) {
      const container = document.createElement('div');
      container.className = 'fuel-matrix-mechanic';

      // Core Rocket Panel
      const panel = document.createElement('div');
      panel.className = 'rocket-core-panel';
      panel.innerHTML = `<div class="core-title">🚀 PLASMA POWER MATRIX (${mission.targetCount})</div>`;

      const cols = mission.targetCount === 18 ? 6 : 5;

      const slotsGrid = document.createElement('div');
      slotsGrid.className = 'fuel-slots-grid';
      slotsGrid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

      for (let i = 0; i < mission.targetCount; i++) {
        const slot = document.createElement('div');
        slot.className = 'fuel-slot';
        slot.dataset.index = i;
        slot.textContent = '⚡';
        slotsGrid.appendChild(slot);
      }
      panel.appendChild(slotsGrid);
      container.appendChild(panel);

      // Fuel Rods Depot
      const depot = document.createElement('div');
      depot.className = 'fuel-cells-depot';
      depot.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

      for (let i = 0; i < mission.targetCount; i++) {
        const cell = document.createElement('div');
        cell.className = 'fuel-cell-chip';
        cell.textContent = '🔋';

        cell.addEventListener('click', (e) => {
          if (cell.classList.contains('inserted')) return;
          cell.classList.add('inserted');

          const emptySlot = slotsGrid.querySelector('.fuel-slot:not(.filled)');
          if (emptySlot) {
            emptySlot.classList.add('filled');
            emptySlot.textContent = '⚡';
            this.audio.playSnap();
            const rect = cell.getBoundingClientRect();
            this.collectItem(rect.left + rect.width / 2, rect.top + rect.height / 2);
          }
        });

        depot.appendChild(cell);
      }
      container.appendChild(depot);

      this.dom.missionContent.appendChild(container);
    }

    /* MECHANIC E: NUMBER STAR PATH */
    renderStarPathMechanic(mission) {
      const container = document.createElement('div');
      container.className = 'star-path-mechanic';

      const pathCanvas = document.createElement('canvas');
      pathCanvas.className = 'path-canvas-layer';
      container.appendChild(pathCanvas);

      // Positions arranged in a magical wave or constellation arc
      const nodes = [];
      const nodeElements = [];

      for (let i = 1; i <= mission.targetCount; i++) {
        const node = document.createElement('div');
        node.className = `path-star-node ${i === 1 ? 'active-next' : ''}`;
        node.textContent = i;
        node.dataset.step = i;

        // Position nodes in an organic winding curve
        const progress = (i - 1) / (mission.targetCount - 1);
        const left = 8 + progress * 80;
        const top = 20 + Math.sin(progress * Math.PI * 2.5) * 28 + 25;

        node.style.left = `${left}%`;
        node.style.top = `${top}%`;

        node.addEventListener('click', (e) => {
          const currentStep = this.collectedInMission + 1;
          if (i !== currentStep) {
            // Gentle encouragement
            this.audio.playPop();
            this.audio.speak(`Let's find number ${NUMBER_NAMES[currentStep]}!`);
            this.showSpeech(`Look for number ${currentStep}! ⭐`);
            return;
          }

          node.classList.remove('active-next');
          node.classList.add('connected');

          const nextNode = container.querySelector(`.path-star-node[data-step="${i + 1}"]`);
          if (nextNode) {
            nextNode.classList.add('active-next');
          }

          const rect = node.getBoundingClientRect();
          this.collectItem(rect.left + rect.width / 2, rect.top + rect.height / 2);
        });

        container.appendChild(node);
      }

      this.dom.missionContent.appendChild(container);
    }

    /* MECHANIC F: SPACE TRAIN CARGO (NUMBER 20 SUPER MISSION) */
    renderSpaceTrainMechanic(mission) {
      const container = document.createElement('div');
      container.className = 'space-train-mechanic';

      // Train Track Area
      const track = document.createElement('div');
      track.className = 'train-track-area';

      const locomotive = document.createElement('div');
      locomotive.className = 'train-locomotive';
      locomotive.textContent = '🚂';
      track.appendChild(locomotive);

      const wagonsList = document.createElement('div');
      wagonsList.className = 'train-wagons-list';

      for (let i = 0; i < mission.targetCount; i++) {
        const wagon = document.createElement('div');
        wagon.className = 'train-wagon';
        wagon.textContent = `${i + 1}`;
        wagonsList.appendChild(wagon);
      }
      track.appendChild(wagonsList);
      container.appendChild(track);

      // Cargo Dispatch Zone
      const dispatch = document.createElement('div');
      dispatch.className = 'cargo-dispatch-zone';

      for (let i = 0; i < mission.targetCount; i++) {
        const crate = document.createElement('div');
        crate.className = 'cargo-crate';
        crate.textContent = '⭐';

        crate.addEventListener('click', (e) => {
          if (crate.classList.contains('loaded')) return;
          crate.classList.add('loaded');

          const emptyWagon = wagonsList.querySelector('.train-wagon:not(.loaded)');
          if (emptyWagon) {
            emptyWagon.classList.add('loaded');
            emptyWagon.textContent = '🌟';
            const rect = crate.getBoundingClientRect();
            this.collectItem(rect.left + rect.width / 2, rect.top + rect.height / 2);
          }
        });

        dispatch.appendChild(crate);
      }
      container.appendChild(dispatch);

      this.dom.missionContent.appendChild(container);
    }

    /* ==========================================================================
       6. CONSTELLATION MAP & QUICK DRAWER
       ========================================================================== */
    initConstellationMap() {
      this.dom.constellationNodesContainer.innerHTML = '';

      // 20 star positions formed in a friendly Rocket / Galaxy shape
      const starPositions = [
        {x: 400, y: 50},  // 1 (Rocket tip)
        {x: 370, y: 100}, // 2
        {x: 430, y: 100}, // 3
        {x: 350, y: 160}, // 4
        {x: 450, y: 160}, // 5
        {x: 320, y: 220}, // 6
        {x: 400, y: 220}, // 7
        {x: 480, y: 220}, // 8
        {x: 280, y: 280}, // 9 (Left Wing)
        {x: 360, y: 280}, // 10
        {x: 440, y: 280}, // 11
        {x: 520, y: 280}, // 12 (Right Wing)
        {x: 240, y: 340}, // 13
        {x: 340, y: 340}, // 14
        {x: 460, y: 340}, // 15
        {x: 560, y: 340}, // 16
        {x: 320, y: 400}, // 17 (Thruster Left)
        {x: 400, y: 400}, // 18 (Thruster Center)
        {x: 480, y: 400}, // 19 (Thruster Right)
        {x: 400, y: 430}  // 20 (Hyperspace Flame)
      ];

      starPositions.forEach((pos, idx) => {
        const starNode = document.createElement('div');
        starNode.className = 'constellation-star-node';
        starNode.style.left = `${(pos.x / 800) * 100}%`;
        starNode.style.top = `${(pos.y / 450) * 100}%`;
        starNode.textContent = idx + 1;
        starNode.dataset.number = idx + 1;

        starNode.addEventListener('click', () => {
          this.dom.constellationModal.classList.remove('active');
          this.loadMission(idx);
        });

        this.dom.constellationNodesContainer.appendChild(starNode);
      });
    }

    updateConstellationView() {
      const nodes = this.dom.constellationNodesContainer.querySelectorAll('.constellation-star-node');
      nodes.forEach((node, idx) => {
        const num = idx + 1;
        if (this.completedNumbers.has(num)) {
          node.classList.add('lit');
        } else {
          node.classList.remove('lit');
        }
      });

      const count = this.completedNumbers.size;
      const pct = (count / 20) * 100;
      this.dom.constellationGaugeFill.style.width = `${pct}%`;
      this.dom.constellationStatusText.textContent = `${count} of 20 Stars Powered Up!`;
    }

    initMissionSelectorGrid() {
      this.dom.numberGridSelector.innerHTML = '';

      for (let i = 1; i <= 20; i++) {
        const btn = document.createElement('button');
        btn.className = 'num-grid-btn';
        btn.innerHTML = `<span>${i}</span><span style="font-size:0.75rem;">${NUMBER_MISSIONS[i - 1].badge}</span>`;

        btn.addEventListener('click', () => {
          this.dom.missionDrawer.classList.remove('active');
          this.loadMission(i - 1);
        });

        this.dom.numberGridSelector.appendChild(btn);
      }
    }

    updateMissionDrawer() {
      const btns = this.dom.numberGridSelector.querySelectorAll('.num-grid-btn');
      btns.forEach((btn, idx) => {
        const num = idx + 1;
        btn.classList.remove('current', 'completed');
        if (num === NUMBER_MISSIONS[this.currentMissionIndex].number) {
          btn.classList.add('current');
        } else if (this.completedNumbers.has(num)) {
          btn.classList.add('completed');
        }
      });
    }

    /* ==========================================================================
       7. GRAND FINALE CELEBRATION (NUMBER 20 COMPLETION)
       ========================================================================== */
    triggerGrandFinale() {
      this.dom.grandFinaleModal.classList.add('active');
      this.audio.playFanfare();

      // Render 1 to 20 badges roll
      this.dom.finaleNumbersGrid.innerHTML = '';
      for (let i = 1; i <= 20; i++) {
        const badge = document.createElement('div');
        badge.className = 'roll-num-badge';
        badge.textContent = i;
        this.dom.finaleNumbersGrid.appendChild(badge);
      }

      // Voice roll call
      this.audio.speak("We did it! Twenty stars! We counted all the way to twenty! The spaceship is ready for Hyperspace!", () => {
        this.audio.speak("You are a Number Space Hero!");
      });
    }

    /* PARTICLE BURST */
    createSparkleBurst(x, y) {
      for (let i = 0; i < 12; i++) {
        const p = document.createElement('div');
        p.style.position = 'fixed';
        p.style.left = `${x}px`;
        p.style.top = `${y}px`;
        p.style.fontSize = '1.4rem';
        p.style.pointerEvents = 'none';
        p.style.zIndex = '999';
        p.textContent = ['✨', '⭐', '💫', '🎉'][Math.floor(Math.random() * 4)];

        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 90 + 30;
        const dx = Math.cos(angle) * speed;
        const dy = Math.sin(angle) * speed;

        p.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        document.body.appendChild(p);

        requestAnimationFrame(() => {
          p.style.transform = `translate(${dx}px, ${dy}px) scale(0)`;
          p.style.opacity = '0';
        });

        setTimeout(() => p.remove(), 600);
      }
    }
  }

  // Launch Game Engine Instance
  window.spaceMissionApp = new SpaceMissionGame();
});
