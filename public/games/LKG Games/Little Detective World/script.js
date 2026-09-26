/**
 * JOHN'S MAGIC COMPARISON LAND - CHOTAPLAY
 * Complete Vanilla JavaScript ES6+ Game Engine
 */

(function () {
  'use strict';

  /* ===================================================================
     1. AUDIO SYNTHESIZER (Web Audio API - Zero Dependencies)
     =================================================================== */
  class SoundEngine {
    constructor() {
      this.ctx = null;
      this.isMuted = false;
      this.isMusicPlaying = false;
      this.musicTimer = null;
    }

    init() {
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

    toggleMute() {
      this.isMuted = !this.isMuted;
      if (this.isMuted) {
        this.stopBGM();
      } else {
        this.startBGM();
      }
      return !this.isMuted;
    }

    playTap() {
      if (this.isMuted) return;
      this.init();
      if (!this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.09);
      } catch (e) {
        console.warn('Audio tap error', e);
      }
    }

    playSuccess() {
      if (this.isMuted) return;
      this.init();
      if (!this.ctx) return;
      try {
        const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
        notes.forEach((freq, i) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, this.ctx.currentTime + i * 0.1);
          gain.gain.setValueAtTime(0, this.ctx.currentTime + i * 0.1);
          gain.gain.linearRampToValueAtTime(0.3, this.ctx.currentTime + i * 0.1 + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + i * 0.1 + 0.35);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(this.ctx.currentTime + i * 0.1);
          osc.stop(this.ctx.currentTime + i * 0.1 + 0.36);
        });
      } catch (e) {
        console.warn('Audio success error', e);
      }
    }

    playGrow() {
      if (this.isMuted) return;
      this.init();
      if (!this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(220, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(587.33, this.ctx.currentTime + 0.4);
        gain.gain.setValueAtTime(0.35, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.45);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.45);
      } catch (e) {
        console.warn('Audio grow error', e);
      }
    }

    playShrink() {
      if (this.isMuted) return;
      this.init();
      if (!this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(260, this.ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.3);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.3);
      } catch (e) {
        console.warn('Audio shrink error', e);
      }
    }

    playSparkle() {
      if (this.isMuted) return;
      this.init();
      if (!this.ctx) return;
      try {
        const pitches = [1046.5, 1318.5, 1567.98, 2093.0];
        pitches.forEach((freq, i) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, this.ctx.currentTime + i * 0.06);
          gain.gain.setValueAtTime(0.15, this.ctx.currentTime + i * 0.06);
          gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + i * 0.06 + 0.2);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(this.ctx.currentTime + i * 0.06);
          osc.stop(this.ctx.currentTime + i * 0.06 + 0.2);
        });
      } catch (e) {
        console.warn('Audio sparkle error', e);
      }
    }

    playCelebration() {
      if (this.isMuted) return;
      this.init();
      if (!this.ctx) return;
      try {
        const chords = [
          [523.25, 659.25, 783.99],       // C Major
          [587.33, 739.99, 880.00],       // D Major
          [659.25, 830.61, 987.77],       // E Major
          [783.99, 987.77, 1174.66, 1567.98] // G Grand
        ];
        chords.forEach((chord, step) => {
          chord.forEach(freq => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime + step * 0.25);
            gain.gain.setValueAtTime(0.15, this.ctx.currentTime + step * 0.25);
            gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + step * 0.25 + 0.5);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(this.ctx.currentTime + step * 0.25);
            osc.stop(this.ctx.currentTime + step * 0.25 + 0.5);
          });
        });
      } catch (e) {
        console.warn('Audio celebration error', e);
      }
    }

    startBGM() {
      if (this.isMuted || this.isMusicPlaying) return;
      this.init();
      if (!this.ctx) return;
      this.isMusicPlaying = true;
      const melody = [523.25, 659.25, 587.33, 783.99, 659.25, 523.25, 587.33, 392.0];
      let step = 0;

      const playNextTone = () => {
        if (!this.isMusicPlaying || this.isMuted || !this.ctx) return;
        try {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(melody[step % melody.length], this.ctx.currentTime);
          gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.6);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start();
          osc.stop(this.ctx.currentTime + 0.65);
          step++;
          this.musicTimer = setTimeout(playNextTone, 800);
        } catch (e) {
          console.warn('BGM error', e);
        }
      };
      playNextTone();
    }

    stopBGM() {
      this.isMusicPlaying = false;
      if (this.musicTimer) {
        clearTimeout(this.musicTimer);
        this.musicTimer = null;
      }
    }
  }

  /* ===================================================================
     2. VOICE & SPEECH SYNTHESIS ENGINE
     =================================================================== */
  class VoiceEngine {
    constructor() {
      this.synth = window.speechSynthesis || null;
      this.currentUtterance = null;
      this.lastSpokenText = '';
      this.dialogueBanner = document.getElementById('dialogue-banner');
      this.dialogueText = document.getElementById('dialogue-text');
      this.speakerAvatar = document.getElementById('dialogue-speaker-avatar');
    }

    speak(text, speaker = 'star', onEnd = null) {
      this.lastSpokenText = text;
      this.showDialogue(text, speaker);

      if (!this.synth) {
        if (onEnd) setTimeout(onEnd, 1500);
        return;
      }

      try {
        this.synth.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.92;
        utterance.pitch = speaker === 'john' ? 1.2 : 1.35; // Cheerful friendly pitch

        const voices = this.synth.getVoices ? this.synth.getVoices() : [];
        if (voices.length > 0) {
          const childFriendly = voices.find(v => (v.name.includes('Female') || v.name.includes('Zira') || v.name.includes('Samantha') || v.name.includes('Natural') || v.name.includes('Google US English')) && v.lang.startsWith('en'));
          if (childFriendly) {
            utterance.voice = childFriendly;
          }
        }

        utterance.onend = () => {
          if (onEnd) onEnd();
        };

        utterance.onerror = () => {
          if (onEnd) onEnd();
        };

        this.synth.speak(utterance);
      } catch (err) {
        console.warn('SpeechSynthesis error:', err);
        if (onEnd) setTimeout(onEnd, 1200);
      }
    }

    repeatLast() {
      if (this.lastSpokenText) {
        this.speak(this.lastSpokenText);
      }
    }

    showDialogue(text, speaker = 'star') {
      if (!this.dialogueBanner || !this.dialogueText) return;
      this.dialogueBanner.classList.remove('hidden');
      this.speakerAvatar.textContent = speaker === 'john' ? '👦' : '⭐';
      this.dialogueText.textContent = text;
    }

    hideDialogue() {
      if (this.dialogueBanner) {
        this.dialogueBanner.classList.add('hidden');
      }
    }
  }

  /* ===================================================================
     3. AMBIENT PARTICLE & CELEBRATION CANVAS
     =================================================================== */
  class ParticleEngine {
    constructor() {
      this.canvas = document.getElementById('magic-canvas');
      this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
      this.particles = [];
      this.confetti = [];
      this.width = window.innerWidth;
      this.height = window.innerHeight;

      if (this.canvas) {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.initAmbientParticles();
        this.render = this.render.bind(this);
        requestAnimationFrame(this.render);
      }
    }

    resize() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.canvas.width = this.width;
      this.canvas.height = this.height;
    }

    initAmbientParticles() {
      const count = Math.min(40, Math.floor(this.width / 25));
      for (let i = 0; i < count; i++) {
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          size: Math.random() * 4 + 2,
          speedY: Math.random() * 0.6 + 0.2,
          speedX: (Math.random() - 0.5) * 0.4,
          opacity: Math.random() * 0.6 + 0.3,
          color: ['#FFD54F', '#81D4FA', '#FF80AB', '#B39DDB', '#FFFFFF'][Math.floor(Math.random() * 5)]
        });
      }
    }

    burstConfetti(originX = this.width / 2, originY = this.height / 3, count = 70) {
      const colors = ['#FF1744', '#FFEA00', '#00E676', '#00E5FF', '#D500F9', '#FF9100'];
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 12 + 4;
        this.confetti.push({
          x: originX,
          y: originY,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity - 3,
          gravity: 0.3,
          rotation: Math.random() * 360,
          rotSpeed: (Math.random() - 0.5) * 15,
          size: Math.random() * 10 + 6,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: 1
        });
      }
    }

    render() {
      if (!this.ctx) return;
      this.ctx.clearRect(0, 0, this.width, this.height);

      // Render Ambient Soft Sparkles
      for (let p of this.particles) {
        p.y -= p.speedY;
        p.x += p.speedX;
        if (p.y < -10) {
          p.y = this.height + 10;
          p.x = Math.random() * this.width;
        }
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        this.ctx.fillStyle = p.color;
        this.ctx.globalAlpha = p.opacity;
        this.ctx.fill();
      }

      // Render Confetti
      for (let i = this.confetti.length - 1; i >= 0; i--) {
        const c = this.confetti[i];
        c.x += c.vx;
        c.y += c.vy;
        c.vy += c.gravity;
        c.vx *= 0.98;
        c.rotation += c.rotSpeed;
        c.life -= 0.012;

        if (c.life <= 0 || c.y > this.height + 20) {
          this.confetti.splice(i, 1);
          continue;
        }

        this.ctx.save();
        this.ctx.translate(c.x, c.y);
        this.ctx.rotate((c.rotation * Math.PI) / 180);
        this.ctx.fillStyle = c.color;
        this.ctx.globalAlpha = Math.max(0, c.life);
        this.ctx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size * 0.6);
        this.ctx.restore();
      }

      this.ctx.globalAlpha = 1;
      requestAnimationFrame(this.render);
    }
  }

  /* ===================================================================
     4. GAME STATE & MASTER CONTROLLER
     =================================================================== */
  class ComparisonGame {
    constructor() {
      this.audio = new SoundEngine();
      this.voice = new VoiceEngine();
      this.particles = new ParticleEngine();

      this.currentArea = 'opening';
      this.completedAreas = new Set();
      this.magicPower = 0;
      this.gameCompleted = false;

      // Area Sub-states
      this.area1Step = 0; // 0 = ask big, 1 = ask small, 2 = scale view
      this.area2Step = 0; // 0 = ask tall, 1 = ask short
      this.area3Step = 0; // 0 = ask more, 1 = ask less
      this.area4Round = 0; // 0 = round 1, 1 = round 2
      this.area5Step = 0; // 0 = diff animal, 1 = diff fruit, 2 = small item, 3 = big item
      this.machineChallengeIndex = 0;

      this.setupDOMReferences();
      this.bindEvents();
      this.initOpeningScene();
    }

    setupDOMReferences() {
      this.scenes = {
        opening: document.getElementById('scene-opening'),
        map: document.getElementById('scene-map'),
        area1: document.getElementById('scene-area1'),
        area2: document.getElementById('scene-area2'),
        area3: document.getElementById('scene-area3'),
        area4: document.getElementById('scene-area4'),
        area5: document.getElementById('scene-area5'),
        machine: document.getElementById('scene-machine'),
        celebration: document.getElementById('scene-celebration')
      };

      this.hud = {
        powerHud: document.getElementById('power-hud'),
        btnMap: document.getElementById('btn-map'),
        btnVoiceRepeat: document.getElementById('btn-voice-repeat'),
        btnSoundToggle: document.getElementById('btn-sound-toggle'),
        soundIcon: document.getElementById('sound-icon'),
        dialogueSoundBtn: document.getElementById('dialogue-sound-btn'),
        bolts: [
          document.getElementById('bolt-1'),
          document.getElementById('bolt-2'),
          document.getElementById('bolt-3'),
          document.getElementById('bolt-4'),
          document.getElementById('bolt-5')
        ]
      };

      this.modal = {
        box: document.getElementById('reward-modal'),
        title: document.getElementById('reward-title'),
        message: document.getElementById('reward-message'),
        btnNext: document.getElementById('btn-next-area')
      };
    }

    bindEvents() {
      // Audio / Voice Repeat
      this.hud.btnSoundToggle.addEventListener('click', () => {
        const soundOn = this.audio.toggleMute();
        this.hud.soundIcon.textContent = soundOn ? '🎵' : '🔇';
      });

      this.hud.btnVoiceRepeat.addEventListener('click', () => {
        this.audio.playTap();
        this.voice.repeatLast();
      });

      this.hud.dialogueSoundBtn.addEventListener('click', () => {
        this.audio.playTap();
        this.voice.repeatLast();
      });

      this.hud.btnMap.addEventListener('click', () => {
        this.audio.playTap();
        this.showMap();
      });

      // Opening Start
      document.getElementById('btn-start-game').addEventListener('click', () => {
        this.audio.init();
        this.audio.playTap();
        this.audio.startBGM();
        this.showMap();
      });

      // Map Island Navigation
      document.querySelectorAll('.map-island').forEach(island => {
        island.addEventListener('click', () => {
          const area = island.dataset.area;
          if (island.classList.contains('locked')) {
            this.audio.playTap();
            this.voice.speak('Complete the 5 worlds first to unlock the Magic Machine!', 'star');
            return;
          }
          this.audio.playTap();
          this.enterArea(area);
        });
      });

      // Reward Modal Button
      this.modal.btnNext.addEventListener('click', () => {
        this.audio.playTap();
        this.modal.box.classList.add('hidden');
        this.showMap();
      });

      // Free Play Restart
      document.getElementById('btn-play-again').addEventListener('click', () => {
        this.audio.playSuccess();
        this.showMap();
      });

      this.bindArea1Events();
      this.bindArea2Events();
      this.bindArea3Events();
      this.bindArea4Events();
      this.bindArea5Events();
      this.bindFreePlayEvents();
    }

    /* ===================================================================
       SCENE ROUTING & POWER HUD
       =================================================================== */
    switchScene(sceneKey) {
      Object.keys(this.scenes).forEach(key => {
        if (this.scenes[key]) {
          this.scenes[key].classList.add('hidden');
          this.scenes[key].classList.remove('active');
        }
      });
      if (this.scenes[sceneKey]) {
        this.scenes[sceneKey].classList.remove('hidden');
        this.scenes[sceneKey].classList.add('active');
      }
      this.currentArea = sceneKey;

      if (sceneKey === 'opening') {
        this.hud.btnMap.classList.add('hidden');
        this.hud.powerHud.classList.add('hidden');
      } else {
        this.hud.btnMap.classList.remove('hidden');
        this.hud.powerHud.classList.remove('hidden');
      }

      this.updatePowerHUD();
    }

    updatePowerHUD() {
      this.hud.bolts.forEach((bolt, idx) => {
        if (idx < this.magicPower) {
          bolt.classList.add('active');
        } else {
          bolt.classList.remove('active');
        }
      });

      // Unlock machine if 5 areas completed
      const machineCard = document.getElementById('map-island-machine');
      const badgeMachine = document.getElementById('badge-machine');
      if (this.completedAreas.size >= 5 && machineCard) {
        machineCard.classList.remove('locked');
        badgeMachine.textContent = '⭐';
      }
    }

    addMagicPower() {
      if (this.magicPower < 5) {
        this.magicPower++;
        this.updatePowerHUD();
        this.particles.burstConfetti(window.innerWidth / 2, 80, 40);
      }
    }

    showReward(title, message, callback) {
      this.audio.playCelebration();
      this.particles.burstConfetti(window.innerWidth / 2, window.innerHeight / 2, 80);
      this.modal.title.textContent = title;
      this.modal.message.textContent = message;
      this.modal.box.classList.remove('hidden');
      this.voice.speak(`${title}! ${message}`, 'star');
    }

    /* ===================================================================
       SCENE 0: OPENING
       =================================================================== */
    initOpeningScene() {
      this.switchScene('opening');
      setTimeout(() => {
        this.voice.speak("Welcome to Comparison Land! Let's explore!", 'star');
      }, 500);
    }

    /* ===================================================================
       SCENE 1: MAGIC MAP
       =================================================================== */
    showMap() {
      this.switchScene('map');
      this.voice.speak('Choose where to explore! Tap an island!', 'star');

      // Update completed badge checkmarks on map
      ['area1', 'area2', 'area3', 'area4', 'area5'].forEach((areaId, index) => {
        const island = document.getElementById(`map-island-${index + 1}`);
        const badge = document.getElementById(`badge-${index + 1}`);
        if (this.completedAreas.has(areaId) && island && badge) {
          island.classList.add('completed');
          badge.textContent = '✅';
        }
      });
    }

    enterArea(areaKey) {
      this.switchScene(areaKey);
      switch (areaKey) {
        case 'area1': this.startArea1(); break;
        case 'area2': this.startArea2(); break;
        case 'area3': this.startArea3(); break;
        case 'area4': this.startArea4(); break;
        case 'area5': this.startArea5(); break;
        case 'machine': this.startMachine(); break;
      }
    }

    /* ===================================================================
       AREA 1: BIG & SMALL (Magic Grow Machine)
       =================================================================== */
    bindArea1Events() {
      const bigApple = document.getElementById('apple-big');
      const smallApple = document.getElementById('apple-small');

      bigApple.addEventListener('click', () => {
        if (this.area1Step === 0) {
          this.handleArea1BigCorrect(bigApple);
        } else if (this.area1Step === 1) {
          this.audio.playTap();
          this.voice.speak('That is the BIG apple! Can you tap the SMALL apple?', 'star');
        }
      });

      smallApple.addEventListener('click', () => {
        if (this.area1Step === 1) {
          this.handleArea1SmallCorrect(smallApple);
        } else if (this.area1Step === 0) {
          this.audio.playTap();
          this.voice.speak('That is the SMALL apple! Can you tap the BIG apple?', 'star');
        }
      });
    }

    startArea1() {
      this.area1Step = 0;
      document.getElementById('area1-targets').classList.remove('hidden');
      document.getElementById('area1-scale-view').classList.add('hidden');
      document.getElementById('label-big').classList.add('hidden');
      document.getElementById('label-small').classList.add('hidden');

      const bigApple = document.getElementById('apple-big');
      const smallApple = document.getElementById('apple-small');
      bigApple.classList.remove('glow', 'grow');
      smallApple.classList.remove('glow', 'shrink');

      this.voice.speak('Look carefully! Which apple is BIG?', 'star');
    }

    handleArea1BigCorrect(el) {
      this.audio.playGrow();
      this.audio.playSparkle();
      this.particles.burstConfetti(el.getBoundingClientRect().x + 100, el.getBoundingClientRect().y + 100, 30);
      el.classList.add('glow', 'grow');
      document.getElementById('label-big').classList.remove('hidden');

      this.voice.speak('BIG! Great job! Now, which apple is SMALL?', 'john', () => {
        this.area1Step = 1;
      });
    }

    handleArea1SmallCorrect(el) {
      this.audio.playShrink();
      this.audio.playSparkle();
      this.particles.burstConfetti(el.getBoundingClientRect().x + 50, el.getBoundingClientRect().y + 50, 30);
      el.classList.add('glow', 'shrink');
      document.getElementById('label-small').classList.remove('hidden');

      this.voice.speak('SMALL! Fantastic!', 'john', () => {
        this.showArea1ScaleMoment();
      });
    }

    showArea1ScaleMoment() {
      this.area1Step = 2;
      setTimeout(() => {
        document.getElementById('area1-targets').classList.add('hidden');
        const scaleView = document.getElementById('area1-scale-view');
        scaleView.classList.remove('hidden');
        this.audio.playCelebration();
        this.voice.speak('Look at the Magic Scale! Big and Small balance together!', 'star', () => {
          setTimeout(() => {
            this.completedAreas.add('area1');
            this.addMagicPower();
            this.showReward('GREAT COMPARING!', 'You learned BIG and SMALL! ⭐');
          }, 1500);
        });
      }, 900);
    }

    /* ===================================================================
       AREA 2: TALL & SHORT (Magic Tree Garden)
       =================================================================== */
    bindArea2Events() {
      const tallTree = document.getElementById('tree-tall');
      const shortTree = document.getElementById('tree-short');

      tallTree.addEventListener('click', () => {
        if (this.area2Step === 0) {
          this.handleArea2TallCorrect(tallTree);
        } else if (this.area2Step === 1) {
          this.audio.playTap();
          this.voice.speak('That tree is TALL! Which tree is SHORT?', 'star');
        }
      });

      shortTree.addEventListener('click', () => {
        if (this.area2Step === 1) {
          this.handleArea2ShortCorrect(shortTree);
        } else if (this.area2Step === 0) {
          this.audio.playTap();
          this.voice.speak('That tree is SHORT! Which tree is TALL?', 'star');
        }
      });
    }

    startArea2() {
      this.area2Step = 0;
      const tallTree = document.getElementById('tree-tall');
      const shortTree = document.getElementById('tree-short');
      tallTree.classList.remove('glow', 'grow', 'celebrate');
      shortTree.classList.remove('glow', 'celebrate');
      document.getElementById('label-tall').classList.add('hidden');
      document.getElementById('label-short').classList.add('hidden');
      document.getElementById('tall-meter').classList.add('hidden');
      document.getElementById('short-meter').classList.add('hidden');

      this.voice.speak('Which tree is TALL?', 'star');
    }

    handleArea2TallCorrect(el) {
      this.audio.playGrow();
      this.audio.playSparkle();
      el.classList.add('glow', 'celebrate');
      document.getElementById('tall-meter').classList.remove('hidden');
      document.getElementById('label-tall').classList.remove('hidden');
      this.particles.burstConfetti(el.getBoundingClientRect().x + 80, el.getBoundingClientRect().y + 100, 30);

      this.voice.speak('TALL! Wow! Now, which tree is SHORT?', 'john', () => {
        this.area2Step = 1;
      });
    }

    handleArea2ShortCorrect(el) {
      this.audio.playSparkle();
      el.classList.add('glow', 'celebrate');
      document.getElementById('short-meter').classList.remove('hidden');
      document.getElementById('label-short').classList.remove('hidden');
      this.particles.burstConfetti(el.getBoundingClientRect().x + 50, el.getBoundingClientRect().y + 50, 30);

      this.voice.speak('SHORT! Awesome discovery!', 'john', () => {
        setTimeout(() => {
          this.completedAreas.add('area2');
          this.addMagicPower();
          this.showReward('SUPER DISCOVERY!', 'You learned TALL and SHORT! 🌲🌱');
        }, 1200);
      });
    }

    /* ===================================================================
       AREA 3: MORE & LESS (Comparison Planets)
       =================================================================== */
    bindArea3Events() {
      const planetMore = document.getElementById('planet-more');
      const planetLess = document.getElementById('planet-less');

      planetMore.addEventListener('click', () => {
        if (this.area3Step === 0) {
          this.handleArea3MoreCorrect(planetMore);
        } else if (this.area3Step === 1) {
          this.audio.playTap();
          this.voice.speak('This planet has MORE! Which planet has LESS?', 'star');
        }
      });

      planetLess.addEventListener('click', () => {
        if (this.area3Step === 1) {
          this.handleArea3LessCorrect(planetLess);
        } else if (this.area3Step === 0) {
          this.audio.playTap();
          this.voice.speak('This planet has LESS! Which planet has MORE?', 'star');
        }
      });
    }

    startArea3() {
      this.area3Step = 0;
      const pMore = document.getElementById('planet-more');
      const pLess = document.getElementById('planet-less');
      pMore.classList.remove('glow', 'grow');
      pLess.classList.remove('glow', 'grow');
      document.getElementById('label-more').classList.add('hidden');
      document.getElementById('label-less').classList.add('hidden');

      this.voice.speak('Which planet has MORE apples?', 'star');
    }

    handleArea3MoreCorrect(el) {
      this.audio.playSuccess();
      el.classList.add('glow', 'grow');
      document.getElementById('label-more').classList.remove('hidden');
      this.particles.burstConfetti(el.getBoundingClientRect().x + 120, el.getBoundingClientRect().y + 120, 35);

      this.voice.speak('MORE! There are so many! Now, which planet has LESS?', 'john', () => {
        this.area3Step = 1;
      });
    }

    handleArea3LessCorrect(el) {
      this.audio.playSparkle();
      el.classList.add('glow');
      document.getElementById('label-less').classList.remove('hidden');
      this.particles.burstConfetti(el.getBoundingClientRect().x + 120, el.getBoundingClientRect().y + 120, 30);

      this.voice.speak('LESS! Just a few apples!', 'john', () => {
        setTimeout(() => {
          this.completedAreas.add('area3');
          this.addMagicPower();
          this.showReward('PLANET EXPLORER!', 'You learned MORE and LESS! 🪐');
        }, 1200);
      });
    }

    /* ===================================================================
       AREA 4: DIFFERENT (Difference Detective)
       =================================================================== */
    bindArea4Events() {
      // Bound dynamically inside renderArea4Round
    }

    startArea4() {
      this.area4Round = 0;
      this.renderArea4Round();
    }

    renderArea4Round() {
      const gridLeft = document.getElementById('grid-left');
      const gridRight = document.getElementById('grid-right');
      gridLeft.innerHTML = '';
      gridRight.innerHTML = '';

      const puzzles = [
        {
          itemsA: ['🌳', '🐦', '☀️', '🌸'],
          itemsB: ['🌳', '🐦', '🌙', '🌸'],
          diffIndex: 2,
          diffName: 'Moon 🌙'
        },
        {
          itemsA: ['🐘', '🦁', '🐵', '🐸'],
          itemsB: ['🐘', '🦁', '🐵', '🦋'],
          diffIndex: 3,
          diffName: 'Butterfly 🦋'
        }
      ];

      const current = puzzles[this.area4Round];

      current.itemsA.forEach((emoji, idx) => {
        const item = document.createElement('div');
        item.className = 'puzzle-item';
        item.textContent = emoji;
        gridLeft.appendChild(item);
      });

      current.itemsB.forEach((emoji, idx) => {
        const item = document.createElement('div');
        item.className = 'puzzle-item';
        item.textContent = emoji;

        if (idx === current.diffIndex) {
          item.classList.add('target-diff');
          item.addEventListener('click', () => {
            this.handleArea4DiffFound(item, current.diffName);
          });
        } else {
          item.addEventListener('click', () => {
            this.audio.playTap();
            this.voice.speak('Those look the same! Look for what is DIFFERENT!', 'star');
          });
        }

        gridRight.appendChild(item);
      });

      this.voice.speak('Can you find what is DIFFERENT in Picture 2?', 'star');
    }

    handleArea4DiffFound(el, diffName) {
      this.audio.playSuccess();
      el.classList.add('correct', 'glow');
      this.particles.burstConfetti(el.getBoundingClientRect().x + 40, el.getBoundingClientRect().y + 40, 35);

      this.voice.speak(`You found the difference! ${diffName}!`, 'john', () => {
        if (this.area4Round === 0) {
          this.area4Round = 1;
          setTimeout(() => this.renderArea4Round(), 1200);
        } else {
          setTimeout(() => {
            this.completedAreas.add('area4');
            this.addMagicPower();
            this.showReward('DETECTIVE MASTER!', 'You found the DIFFERENT objects! 🔍');
          }, 1200);
        }
      });
    }

    /* ===================================================================
       AREA 5: CLASSIFICATION (Small & Different)
       =================================================================== */
    bindArea5Events() {
      // Injected dynamically in renderArea5Step
    }

    startArea5() {
      this.area5Step = 0;
      this.renderArea5Step();
    }

    renderArea5Step() {
      const container = document.getElementById('area5-trio');
      const title = document.getElementById('area5-title');
      container.innerHTML = '';

      const steps = [
        {
          title: 'Which one is DIFFERENT?',
          voice: 'Which animal is DIFFERENT?',
          items: [
            { img: 'assets/elephant.svg', alt: 'Elephant', isCorrect: false },
            { img: 'assets/elephant.svg', alt: 'Elephant', isCorrect: false },
            { img: 'assets/mouse.svg', alt: 'Mouse', isCorrect: true, label: 'Mouse is different!' }
          ]
        },
        {
          title: 'Which fruit is DIFFERENT?',
          voice: 'Which one is DIFFERENT?',
          items: [
            { img: 'assets/apple.svg', alt: 'Apple', isCorrect: false },
            { img: 'assets/banana.svg', alt: 'Banana', isCorrect: true, label: 'Banana is different!' },
            { img: 'assets/apple.svg', alt: 'Apple', isCorrect: false }
          ]
        },
        {
          title: 'Which one is SMALL?',
          voice: 'Which one is SMALL?',
          items: [
            { img: 'assets/elephant.svg', alt: 'Big Elephant', isCorrect: false, scale: 'scale-big' },
            { img: 'assets/elephant.svg', alt: 'Big Elephant', isCorrect: false, scale: 'scale-big' },
            { img: 'assets/elephant.svg', alt: 'Small Elephant', isCorrect: true, scale: 'scale-small', label: 'SMALL!' }
          ]
        },
        {
          title: 'Which one is BIG?',
          voice: 'Which one is BIG?',
          items: [
            { img: 'assets/apple.svg', alt: 'Small Apple', isCorrect: false, scale: 'scale-small' },
            { img: 'assets/apple.svg', alt: 'Big Apple', isCorrect: true, scale: 'scale-big', label: 'BIG!' },
            { img: 'assets/apple.svg', alt: 'Small Apple', isCorrect: false, scale: 'scale-small' }
          ]
        }
      ];

      const current = steps[this.area5Step];
      title.textContent = current.title;

      current.items.forEach((item, idx) => {
        const card = document.createElement('div');
        card.className = `trio-card ${item.scale || ''}`;
        card.tabIndex = 0;
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', item.alt);

        const img = document.createElement('img');
        img.src = item.img;
        img.alt = item.alt;
        img.className = 'trio-img';
        card.appendChild(img);

        card.addEventListener('click', () => {
          if (item.isCorrect) {
            this.handleArea5Correct(card, item.label);
          } else {
            this.audio.playTap();
            this.voice.speak('Look closely! Try finding the other one!', 'star');
          }
        });

        container.appendChild(card);
      });

      this.voice.speak(current.voice, 'star');
    }

    handleArea5Correct(card, labelText) {
      this.audio.playSuccess();
      card.classList.add('correct', 'glow');
      this.particles.burstConfetti(card.getBoundingClientRect().x + 70, card.getBoundingClientRect().y + 70, 35);

      this.voice.speak(labelText, 'john', () => {
        if (this.area5Step < 3) {
          this.area5Step++;
          setTimeout(() => this.renderArea5Step(), 1200);
        } else {
          setTimeout(() => {
            this.completedAreas.add('area5');
            this.addMagicPower();
            this.showReward('CLASSIFICATION HERO!', 'You learned SMALL and DIFFERENT! 🧩');
          }, 1200);
        }
      });
    }

    /* ===================================================================
       FINAL: MAGIC COMPARISON MACHINE ⚡
       =================================================================== */
    startMachine() {
      this.machineChallengeIndex = 0;
      this.magicPower = 0;
      this.updatePowerHUD();
      this.renderMachineChallenge();
    }

    renderMachineChallenge() {
      const promptText = document.getElementById('machine-question-text');
      const container = document.getElementById('machine-items-container');
      container.innerHTML = '';

      const challenges = [
        {
          question: 'Which is BIG?',
          voice: 'Which is BIG?',
          choices: [
            { type: 'img', src: 'assets/elephant.svg', isCorrect: true, label: 'BIG!' },
            { type: 'img', src: 'assets/mouse.svg', isCorrect: false, label: 'Small' }
          ]
        },
        {
          question: 'Which is TALL?',
          voice: 'Which is TALL?',
          choices: [
            { type: 'img', src: 'assets/tree-tall.svg', isCorrect: true, label: 'TALL!' },
            { type: 'img', src: 'assets/tree-short.svg', isCorrect: false, label: 'Short' }
          ]
        },
        {
          question: 'Which has MORE?',
          voice: 'Which has MORE?',
          choices: [
            { type: 'emoji', text: '🍎🍎🍎🍎', isCorrect: true, label: 'MORE!' },
            { type: 'emoji', text: '🍎🍎', isCorrect: false, label: 'Less' }
          ]
        },
        {
          question: 'Which is DIFFERENT?',
          voice: 'Which is DIFFERENT?',
          choices: [
            { type: 'emoji', text: '🌸', isCorrect: false },
            { type: 'emoji', text: '🌸', isCorrect: false },
            { type: 'emoji', text: '🌻', isCorrect: true, label: 'DIFFERENT!' }
          ]
        },
        {
          question: 'Which is SMALL?',
          voice: 'Which is SMALL?',
          choices: [
            { type: 'img', src: 'assets/apple.svg', isCorrect: true, scale: 'scale-small', label: 'SMALL!' },
            { type: 'img', src: 'assets/apple.svg', isCorrect: false, scale: 'scale-big', label: 'Big' }
          ]
        }
      ];

      const current = challenges[this.machineChallengeIndex];
      promptText.textContent = current.question;

      current.choices.forEach(choice => {
        const btn = document.createElement('div');
        btn.className = `mach-choice ${choice.scale || ''}`;

        if (choice.type === 'img') {
          const img = document.createElement('img');
          img.src = choice.src;
          img.className = 'mach-choice-img';
          btn.appendChild(img);
        } else {
          const span = document.createElement('span');
          span.className = 'mach-choice-icon';
          span.textContent = choice.text;
          btn.appendChild(span);
        }

        btn.addEventListener('click', () => {
          if (choice.isCorrect) {
            this.handleMachineCorrect(btn, choice.label);
          } else {
            this.audio.playTap();
            this.voice.speak('Look again carefully!', 'star');
          }
        });

        container.appendChild(btn);
      });

      this.voice.speak(current.voice, 'star');
    }

    handleMachineCorrect(btn, label) {
      this.audio.playSuccess();
      btn.classList.add('correct', 'glow');
      this.addMagicPower();

      this.voice.speak(label, 'john', () => {
        if (this.machineChallengeIndex < 4) {
          this.machineChallengeIndex++;
          setTimeout(() => this.renderMachineChallenge(), 1000);
        } else {
          // Machine is at FULL POWER!
          setTimeout(() => {
            this.triggerFinalCelebration();
          }, 800);
        }
      });
    }

    /* ===================================================================
       FINAL WOW CELEBRATION & CONCEPT REINFORCEMENT
       =================================================================== */
    triggerFinalCelebration() {
      this.switchScene('celebration');
      this.audio.playCelebration();
      this.particles.burstConfetti(window.innerWidth / 2, window.innerHeight / 3, 120);

      this.voice.speak('COMPARISON MASTER! You did it John and Little Star are celebrating!', 'star', () => {
        this.runSequentialConceptReview();
      });
    }

    runSequentialConceptReview() {
      const pairs = [
        { id: 'review-pair-1', text: 'Big and small!' },
        { id: 'review-pair-2', text: 'Tall and short!' },
        { id: 'review-pair-3', text: 'More and less!' },
        { id: 'review-pair-4', text: 'Same and different!' }
      ];

      let step = 0;
      const showNextCard = () => {
        if (step >= pairs.length) {
          this.voice.speak('You are a Comparison Explorer! Great job!', 'john');
          return;
        }

        pairs.forEach((p, idx) => {
          const el = document.getElementById(p.id);
          if (el) {
            if (idx === step) {
              el.classList.remove('hidden');
              el.classList.add('active');
            } else {
              el.classList.add('hidden');
              el.classList.remove('active');
            }
          }
        });

        this.voice.speak(pairs[step].text, 'star', () => {
          step++;
          setTimeout(showNextCard, 1600);
        });
      };

      setTimeout(showNextCard, 1000);
    }

    /* ===================================================================
       FREE PLAY SANDBOX INTERACTIONS
       =================================================================== */
    bindFreePlayEvents() {
      const john = document.getElementById('fp-john');
      const star = document.getElementById('fp-star');
      const treeTall = document.getElementById('fp-tree-tall');
      const treeShort = document.getElementById('fp-tree-short');
      const apple = document.getElementById('fp-apple');

      john.addEventListener('click', () => {
        this.audio.playSuccess();
        john.classList.add('celebrate');
        this.particles.burstConfetti(john.getBoundingClientRect().x + 50, john.getBoundingClientRect().y + 50, 30);
        this.voice.speak("Yay! I love comparing!", 'john');
        setTimeout(() => john.classList.remove('celebrate'), 1000);
      });

      star.addEventListener('click', () => {
        this.audio.playSparkle();
        star.classList.add('celebrate');
        this.particles.burstConfetti(star.getBoundingClientRect().x + 40, star.getBoundingClientRect().y + 40, 25);
        this.voice.speak("Sparkle sparkle! You are a star!", 'star');
        setTimeout(() => star.classList.remove('celebrate'), 1000);
      });

      treeTall.addEventListener('click', () => {
        this.audio.playGrow();
        treeTall.classList.toggle('grow');
        this.voice.speak("Tall tree stretches up high!", 'star');
      });

      treeShort.addEventListener('click', () => {
        this.audio.playSparkle();
        treeShort.classList.add('celebrate');
        this.voice.speak("Short tree hops happily!", 'star');
        setTimeout(() => treeShort.classList.remove('celebrate'), 800);
      });

      let appleState = false;
      apple.addEventListener('click', () => {
        appleState = !appleState;
        if (appleState) {
          this.audio.playGrow();
          apple.classList.add('grow');
          apple.classList.remove('shrink');
          this.voice.speak("Big Apple!", 'john');
        } else {
          this.audio.playShrink();
          apple.classList.add('shrink');
          apple.classList.remove('grow');
          this.voice.speak("Small Apple!", 'john');
        }
      });
    }
  }

  // Initialize Game on DOM Load
  document.addEventListener('DOMContentLoaded', () => {
    window.gameInstance = new ComparisonGame();
  });
})();
