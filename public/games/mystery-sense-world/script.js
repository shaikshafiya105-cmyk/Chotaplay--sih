/**
 * ============================================================
 * CHOTAPLAY — JOHN'S SENSES DETECTIVE
 * CORE JAVASCRIPT GAME ENGINE (Vanilla JS)
 * ============================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ============================================================
   * 1. AUDIO SYNTHESIZER & SPEECH ENGINE (Safe & Standalone)
   * ============================================================ */
  class AudioManager {
    constructor() {
      this.ctx = null;
      this.isMuted = false;
      this.speechSynth = window.speechSynthesis || null;
      this.currentVoice = null;
      this.initVoices();
    }

    initAudioContext() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
    }

    initVoices() {
      if (!this.speechSynth) return;
      const setVoice = () => {
        try {
          const voices = this.speechSynth.getVoices();
          // Find friendly English voice
          this.currentVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Child') || v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Zira'))) || voices.find(v => v.lang.startsWith('en')) || voices[0] || null;
        } catch (e) {
          this.currentVoice = null;
        }
      };
      setVoice();
      if (this.speechSynth.onvoiceschanged !== undefined) {
        this.speechSynth.onvoiceschanged = setVoice;
      }
    }

    toggleMute() {
      this.isMuted = !this.isMuted;
      if (this.isMuted && this.speechSynth) {
        this.speechSynth.cancel();
      }
      return this.isMuted;
    }

    // Play synthesized notes & sound effects using Web Audio API
    playTone(freq, type = 'sine', duration = 0.2, gainVal = 0.15, delay = 0) {
      if (this.isMuted) return;
      try {
        this.initAudioContext();
        if (!this.ctx) return;

        setTimeout(() => {
          try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

            gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start();
            osc.stop(this.ctx.currentTime + duration);
          } catch (err) {}
        }, delay * 1000);
      } catch (e) {}
    }

    // Sound FX Library
    playPop() {
      this.playTone(520, 'sine', 0.12, 0.2);
    }

    playSparkle() {
      const notes = [587.33, 739.99, 880, 1046.5, 1174.66, 1318.51];
      notes.forEach((note, i) => this.playTone(note, 'triangle', 0.25, 0.12, i * 0.06));
    }

    playSuccess() {
      const chord = [523.25, 659.25, 783.99, 1046.5];
      chord.forEach((note, i) => this.playTone(note, 'sine', 0.5, 0.18, i * 0.08));
    }

    playFanfare() {
      const fanfare = [
        { f: 523.25, d: 0.15, t: 0 },
        { f: 523.25, d: 0.15, t: 0.15 },
        { f: 523.25, d: 0.15, t: 0.3 },
        { f: 659.25, d: 0.4,  t: 0.45 },
        { f: 523.25, d: 0.2,  t: 0.9 },
        { f: 659.25, d: 0.2,  t: 1.1 },
        { f: 783.99, d: 0.6,  t: 1.3 },
        { f: 1046.5, d: 0.9,  t: 1.8 }
      ];
      fanfare.forEach(item => this.playTone(item.f, 'triangle', item.d, 0.22, item.t));
    }

    // Animal & Object sound synthesizers
    playCatSound() {
      if (this.isMuted) return;
      this.initAudioContext();
      if (!this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        
        // Meow glide: 440Hz -> 880Hz -> 550Hz
        const now = this.ctx.currentTime;
        osc.frequency.setValueAtTime(450, now);
        osc.frequency.exponentialRampToValueAtTime(850, now + 0.25);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.6);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.2, now + 0.15);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.7);
      } catch (e) {}
    }

    playDogSound() {
      if (this.isMuted) return;
      this.initAudioContext();
      if (!this.ctx) return;
      try {
        const now = this.ctx.currentTime;
        [0, 0.2].forEach(delay => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(320, now + delay);
          osc.frequency.exponentialRampToValueAtTime(140, now + delay + 0.12);

          gain.gain.setValueAtTime(0.25, now + delay);
          gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.14);

          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now + delay);
          osc.stop(now + delay + 0.15);
        });
      } catch (e) {}
    }

    playCarSound() {
      if (this.isMuted) return;
      this.initAudioContext();
      if (!this.ctx) return;
      try {
        const now = this.ctx.currentTime;
        [0, 0.18].forEach(delay => {
          const osc1 = this.ctx.createOscillator();
          const osc2 = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc1.type = 'sawtooth';
          osc2.type = 'sawtooth';
          osc1.frequency.setValueAtTime(440, now + delay);
          osc2.frequency.setValueAtTime(554.37, now + delay);

          gain.gain.setValueAtTime(0.12, now + delay);
          gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.14);

          osc1.connect(gain);
          osc2.connect(gain);
          gain.connect(this.ctx.destination);
          osc1.start(now + delay);
          osc2.start(now + delay);
          osc1.stop(now + delay + 0.15);
          osc2.stop(now + delay + 0.15);
        });
      } catch (e) {}
    }

    playSourSound() {
      if (this.isMuted) return;
      this.initAudioContext();
      if (!this.ctx) return;
      try {
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(900, now);
        osc.frequency.exponentialRampToValueAtTime(260, now + 0.4);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.5);
      } catch (e) {}
    }

    playSweetSound() {
      this.playTone(659.25, 'sine', 0.2, 0.15, 0);
      this.playTone(880.00, 'sine', 0.25, 0.18, 0.1);
      this.playTone(1174.66, 'sine', 0.35, 0.2, 0.2);
    }

    playSoftSound() {
      this.playTone(320, 'sine', 0.28, 0.18);
    }

    playHardSound() {
      this.playTone(800, 'triangle', 0.08, 0.25);
    }

    // Voice Narration (SpeechSynthesis) with fallback
    speak(text, onEndCallback = null) {
      if (this.isMuted || !this.speechSynth) {
        if (onEndCallback) setTimeout(onEndCallback, 1500);
        return;
      }

      try {
        this.speechSynth.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.92;
        utterance.pitch = 1.15;
        if (this.currentVoice) utterance.voice = this.currentVoice;

        let called = false;
        const finish = () => {
          if (!called && onEndCallback) {
            called = true;
            onEndCallback();
          }
        };

        utterance.onend = finish;
        utterance.onerror = finish;
        // Fallback safety timeout in case onend never triggers
        setTimeout(finish, Math.max(2000, text.length * 90));

        this.speechSynth.speak(utterance);
      } catch (err) {
        if (onEndCallback) setTimeout(onEndCallback, 1200);
      }
    }
  }

  /* ============================================================
   * 2. PARTICLE ENGINE (Canvas Confetti, Stars, Sparkles)
   * ============================================================ */
  class ParticleEngine {
    constructor(canvasId) {
      this.canvas = document.getElementById(canvasId);
      this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
      this.particles = [];
      this.animId = null;

      if (this.canvas) {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.startLoop();
      }
    }

    resize() {
      if (!this.canvas) return;
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }

    addSparkles(x, y, count = 18, colorTheme = 'gold') {
      const colors = colorTheme === 'gold' 
        ? ['#FDE047', '#F59E0B', '#FFF9A6', '#FFFFFF']
        : ['#38BDF8', '#F472B6', '#34D399', '#FBBF24', '#A78BFA'];

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 6;
        this.particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 4 + Math.random() * 8,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          decay: 0.02 + Math.random() * 0.03,
          isStar: Math.random() > 0.4
        });
      }
    }

    addConfettiBurst(count = 70) {
      if (!this.canvas) return;
      const colors = ['#EF4444', '#3B82F6', '#10B981', '#F59E0B', '#EC4899', '#8B5CF6', '#FBBF24'];
      for (let i = 0; i < count; i++) {
        this.particles.push({
          x: Math.random() * this.canvas.width,
          y: -10,
          vx: -2 + Math.random() * 4,
          vy: 2 + Math.random() * 5,
          size: 6 + Math.random() * 8,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          decay: 0.005 + Math.random() * 0.008,
          isConfetti: true,
          rotation: Math.random() * 360,
          rotSpeed: -5 + Math.random() * 10
        });
      }
    }

    startLoop() {
      const update = () => {
        if (!this.ctx || !this.canvas) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = this.particles.length - 1; i >= 0; i--) {
          const p = this.particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= p.decay;

          if (p.isConfetti) {
            p.rotation += p.rotSpeed;
          }

          if (p.alpha <= 0) {
            this.particles.splice(i, 1);
            continue;
          }

          this.ctx.save();
          this.ctx.globalAlpha = Math.max(0, p.alpha);
          this.ctx.fillStyle = p.color;

          if (p.isConfetti) {
            this.ctx.translate(p.x, p.y);
            this.ctx.rotate((p.rotation * Math.PI) / 180);
            this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.6);
          } else if (p.isStar) {
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
            this.ctx.fill();
          } else {
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
            this.ctx.fill();
          }
          this.ctx.restore();
        }

        this.animId = requestAnimationFrame(update);
      };
      this.animId = requestAnimationFrame(update);
    }
  }

  /* ============================================================
   * 3. SENSES GAME MANAGER (State Machine & Logic)
   * ============================================================ */
  class SensesGame {
    constructor() {
      this.audio = new AudioManager();
      this.particles = new ParticleEngine('particle-canvas');

      // Game States
      this.currentSceneId = 'intro';
      this.lastSpokenText = "Let's become Sense Detectives!";
      this.unlockedSenses = {
        sight: false,
        hearing: false,
        smell: false,
        taste: false,
        touch: false
      };

      // Taste & Touch state trackers
      this.tastedLemon = false;
      this.tastedCandy = false;
      this.feltTeddy = false;
      this.feltRock = false;

      // DOM Cache
      this.cacheDOM();
      this.bindEvents();
      this.init();
    }

    cacheDOM() {
      // Header
      this.powersHud = document.getElementById('powers-hud');
      this.slots = {
        sight: document.getElementById('slot-sight'),
        hearing: document.getElementById('slot-hearing'),
        smell: document.getElementById('slot-smell'),
        taste: document.getElementById('slot-taste'),
        touch: document.getElementById('slot-touch')
      };
      this.btnRepeatVoice = document.getElementById('btn-repeat-voice');
      this.btnAudioToggle = document.getElementById('btn-audio-toggle');
      this.audioIcon = document.getElementById('audio-icon');
      this.btnRestart = document.getElementById('btn-restart');

      // Stage & BG
      this.stageBg = document.getElementById('stage-bg');
      this.johnChar = document.getElementById('john-character');
      this.johnDialogBubble = document.getElementById('john-dialog-bubble');
      this.johnDialogText = document.getElementById('john-dialog-text');
      this.johnEmotion = document.getElementById('john-emotion-bubble');

      this.starChar = document.getElementById('star-character');
      this.starDialogBubble = document.getElementById('star-dialog-bubble');
      this.starDialogText = document.getElementById('star-dialog-text');

      // Scenes
      this.scenes = {
        intro: document.getElementById('scene-intro'),
        sight: document.getElementById('scene-sight'),
        hearing: document.getElementById('scene-hearing'),
        smell: document.getElementById('scene-smell'),
        taste: document.getElementById('scene-taste'),
        touch: document.getElementById('scene-touch'),
        final_wow: document.getElementById('scene-final-wow'),
        freeplay: document.getElementById('scene-freeplay')
      };

      // Specific Scene Elements
      this.btnStartGame = document.getElementById('btn-start-game');
      this.introOrbsContainer = document.getElementById('intro-orbs');

      // Sight
      this.sightItems = document.querySelectorAll('#sight-garden .clickable-item');

      // Hearing
      this.hearingSoundBox = document.getElementById('hearing-sound-box');
      this.hearingChoices = document.querySelectorAll('.hearing-choice');

      // Smell
      this.smellChoices = document.querySelectorAll('.smell-choice');

      // Taste
      this.tasteItemLemon = document.getElementById('taste-item-lemon');
      this.tasteItemCandy = document.getElementById('taste-item-candy');
      this.tasteStatusText = document.getElementById('taste-status-text');

      // Touch
      this.touchChest = document.getElementById('touch-chest');
      this.touchItemTeddy = document.getElementById('touch-item-teddy');
      this.touchItemRock = document.getElementById('touch-item-rock');
      this.touchStatusText = document.getElementById('touch-status-text');

      // Final WOW & Freeplay
      this.convergenceStage = document.getElementById('convergence-stage');
      this.masterBadge = document.getElementById('master-badge');
      this.btnEnterFreeplay = document.getElementById('btn-enter-freeplay');
      this.freeplayPods = document.querySelectorAll('.freeplay-pod');
      this.btnReplayAdventure = document.getElementById('btn-replay-adventure');

      // Toast
      this.toast = document.getElementById('celebration-toast');
      this.toastTitle = document.getElementById('toast-title');
      this.toastMessage = document.getElementById('toast-message');
    }

    bindEvents() {
      // Audio & Utility Controls
      this.btnAudioToggle.addEventListener('click', () => {
        const isMuted = this.audio.toggleMute();
        this.audioIcon.textContent = isMuted ? '🔇' : '🎵';
        this.showToast(isMuted ? 'Sound Muted' : 'Sound On', '🔊 Audio settings updated');
      });

      this.btnRepeatVoice.addEventListener('click', () => {
        this.audio.playPop();
        if (this.lastSpokenText) {
          this.audio.speak(this.lastSpokenText);
        }
      });

      this.btnRestart.addEventListener('click', () => {
        this.audio.playPop();
        this.restartGame();
      });

      // Little Star companion click interaction
      this.starChar.addEventListener('click', (e) => {
        this.audio.playSparkle();
        const rect = this.starChar.getBoundingClientRect();
        this.particles.addSparkles(rect.left + rect.width / 2, rect.top + rect.height / 2, 16, 'rainbow');
        this.starSpeak("I'm Little Star! Let's explore together! ⭐");
      });

      // Start Game Mission
      this.btnStartGame.addEventListener('click', () => {
        this.startMission();
      });

      // Sight Scene Events
      this.sightItems.forEach(item => {
        item.addEventListener('click', (e) => this.handleSightChoice(item, e));
      });

      // Hearing Scene Events
      this.hearingSoundBox.addEventListener('click', () => {
        this.audio.playCatSound();
        const rect = this.hearingSoundBox.getBoundingClientRect();
        this.particles.addSparkles(rect.left + rect.width / 2, rect.top + rect.height / 2, 12, 'blue');
      });
      this.hearingChoices.forEach(choice => {
        choice.addEventListener('click', (e) => this.handleHearingChoice(choice, e));
      });

      // Smell Scene Events
      this.smellChoices.forEach(choice => {
        choice.addEventListener('click', (e) => this.handleSmellChoice(choice, e));
      });

      // Taste Scene Events
      this.tasteItemLemon.addEventListener('click', (e) => this.handleTasteChoice('lemon', e));
      this.tasteItemCandy.addEventListener('click', (e) => this.handleTasteChoice('candy', e));

      // Touch Scene Events
      if (this.touchChest) {
        this.touchChest.addEventListener('click', () => {
          this.audio.playSparkle();
          this.starSpeak("Reach in and feel the teddy or rock! ✋");
        });
      }
      this.touchItemTeddy.addEventListener('click', (e) => this.handleTouchChoice('teddy', e));
      this.touchItemRock.addEventListener('click', (e) => this.handleTouchChoice('rock', e));

      // Final WOW & Freeplay
      this.btnEnterFreeplay.addEventListener('click', () => {
        this.audio.playSuccess();
        this.switchScene('freeplay');
      });

      this.freeplayPods.forEach(pod => {
        pod.addEventListener('click', (e) => this.handleFreeplayPod(pod, e));
      });

      this.btnReplayAdventure.addEventListener('click', () => {
        this.audio.playPop();
        this.restartGame();
      });
    }

    init() {
      this.switchScene('intro');
      setTimeout(() => {
        this.johnSpeak("Oh no! My five sense powers are gone!", () => {
          setTimeout(() => {
            this.starSpeak("Let's become Sense Detectives!");
          }, 400);
        });
      }, 600);
    }

    /* --- Character Dialog & Expression Management --- */
    johnSpeak(text, callback = null) {
      this.lastSpokenText = text;
      this.johnDialogText.textContent = text;
      this.johnDialogBubble.classList.remove('hidden');
      this.audio.speak(text, () => {
        if (callback) callback();
      });
      setTimeout(() => {
        // Keep bubble visible for readability
      }, 3000);
    }

    starSpeak(text, callback = null) {
      this.lastSpokenText = text;
      this.starDialogText.textContent = text;
      this.starDialogBubble.classList.remove('hidden');
      this.audio.speak(text, () => {
        if (callback) callback();
      });
    }

    setJohnMood(moodClass, emotionEmoji = '') {
      this.johnChar.className = 'character-wrapper ' + moodClass;
      if (emotionEmoji) {
        this.johnEmotion.textContent = emotionEmoji;
        this.johnEmotion.classList.remove('hidden');
        setTimeout(() => {
          this.johnEmotion.classList.add('hidden');
        }, 2200);
      } else {
        this.johnEmotion.classList.add('hidden');
      }
    }

    showToast(title, message) {
      this.toastTitle.textContent = title;
      this.toastMessage.textContent = message;
      this.toast.classList.remove('hidden');
      setTimeout(() => {
        this.toast.classList.add('hidden');
      }, 2500);
    }

    /* --- Scene Transition Switcher --- */
    switchScene(sceneKey) {
      this.currentSceneId = sceneKey;
      Object.keys(this.scenes).forEach(k => {
        if (this.scenes[k]) {
          this.scenes[k].classList.remove('active');
        }
      });

      if (this.scenes[sceneKey]) {
        this.scenes[sceneKey].classList.add('active');
      }

      // Update background theme
      const bgMap = {
        intro: 'bg-room',
        sight: 'bg-garden',
        hearing: 'bg-dusk',
        smell: 'bg-smell',
        taste: 'bg-taste',
        touch: 'bg-touch',
        final_wow: 'bg-celebration',
        freeplay: 'bg-celebration'
      };
      this.stageBg.className = bgMap[sceneKey] || 'bg-room';

      // Update active slot highlight in HUD
      Object.keys(this.slots).forEach(k => {
        if (this.slots[k]) {
          this.slots[k].classList.remove('active-current');
        }
      });
      if (this.slots[sceneKey] && !this.unlockedSenses[sceneKey]) {
        this.slots[sceneKey].classList.add('active-current');
      }

      // Scene-specific entry hooks
      this.onSceneEnter(sceneKey);
    }

    onSceneEnter(sceneKey) {
      if (sceneKey === 'sight') {
        this.setJohnMood('john-idle');
        this.johnSpeak("I can see with my eyes! Can you find the RED apple?", () => {
          this.starSpeak("Tap on the red apple! 🍎");
        });
      } else if (sceneKey === 'hearing') {
        this.setJohnMood('john-listening', '👂');
        this.johnSpeak("Shhh... listen! Who made that sound?", () => {
          setTimeout(() => {
            this.audio.playCatSound();
          }, 300);
        });
      } else if (sceneKey === 'smell') {
        this.setJohnMood('john-smelling', '👃');
        this.johnSpeak("Hmm... what smells so sweet and fresh? Follow the scent!", () => {
          this.starSpeak("Follow the glowing rose petals! 🌹");
        });
      } else if (sceneKey === 'taste') {
        this.setJohnMood('john-idle', '👅');
        this.tastedLemon = false;
        this.tastedCandy = false;
        this.tasteStatusText.textContent = "👉 Tap each treat to see John's fun reaction!";
        this.johnSpeak("What does my tongue tell me? Let's taste both treats!");
      } else if (sceneKey === 'touch') {
        this.setJohnMood('john-idle', '✋');
        this.feltTeddy = false;
        this.feltRock = false;
        this.touchStatusText.textContent = "👉 Tap to feel both textures with your skin!";
        this.johnSpeak("I can't see what's inside! Can you reach in and feel it?");
      } else if (sceneKey === 'final_wow') {
        this.triggerFinalConvergence();
      } else if (sceneKey === 'freeplay') {
        this.setJohnMood('john-celebrating', '⭐');
        this.johnSpeak("I use my five senses every day! Tap anything to explore!");
      }
    }

    /* --- Unlock Power in HUD --- */
    unlockPower(senseKey, progressNum) {
      this.unlockedSenses[senseKey] = true;
      if (this.slots[senseKey]) {
        this.slots[senseKey].classList.remove('active-current');
        this.slots[senseKey].classList.add('unlocked');
      }

      this.audio.playSparkle();
      this.showToast(`✨ ${senseKey.toUpperCase()} POWER UNLOCKED!`, `Progress: ${progressNum} of 5 Senses Unlocked ⭐`);
      this.particles.addConfettiBurst(25);
    }

    /* ============================================================
     * SCENE 0: INTRO MISSION START
     * ============================================================ */
    startMission() {
      this.audio.playFanfare();
      this.introOrbsContainer.classList.add('orbs-flying');
      this.setJohnMood('john-happy', '✨');

      this.starSpeak("Here we go! Let's solve the Sight Mystery first!", () => {
        setTimeout(() => {
          this.switchScene('sight');
        }, 800);
      });
    }

    /* ============================================================
     * SCENE 1: SIGHT MECHANIC (Find the Red Apple)
     * ============================================================ */
    handleSightChoice(itemEl, event) {
      const isTarget = itemEl.classList.contains('target-sight');
      const rect = itemEl.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      if (isTarget) {
        // Correct Action
        this.audio.playSuccess();
        this.particles.addSparkles(cx, cy, 30, 'gold');
        this.setJohnMood('john-happy', '👀');

        // Animate apple moving toward John
        itemEl.classList.add('item-fly-to-john');
        const johnRect = this.johnChar.getBoundingClientRect();
        itemEl.style.top = `${johnRect.top + 40}px`;
        itemEl.style.left = `${johnRect.left + 50}px`;

        this.unlockPower('sight', 1);

        this.johnSpeak("I see with my eyes! Great job!", () => {
          this.starSpeak("Awesome detective work! Now for Hearing!", () => {
            setTimeout(() => {
              this.switchScene('hearing');
            }, 1000);
          });
        });
      } else {
        // Non-punitive gentle hint
        this.audio.playPop();
        this.particles.addSparkles(cx, cy, 10, 'rainbow');
        const itemName = itemEl.dataset.item;
        this.starSpeak(`That is a pretty ${itemName}! Look carefully for the RED apple! 🍎`);
      }
    }

    /* ============================================================
     * SCENE 2: HEARING MECHANIC (Listen & Identify Cat)
     * ============================================================ */
    handleHearingChoice(choiceEl, event) {
      const animal = choiceEl.dataset.animal;
      const rect = choiceEl.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      if (animal === 'cat') {
        // Correct Action
        this.audio.playCatSound();
        this.audio.playSuccess();
        this.particles.addSparkles(cx, cy, 30, 'rainbow');
        this.setJohnMood('john-happy', '👂');

        this.unlockPower('hearing', 2);

        this.johnSpeak("I hear with my ears! That was the friendly cat!", () => {
          this.starSpeak("Super ears! Next is the Smell Mystery!", () => {
            setTimeout(() => {
              this.switchScene('smell');
            }, 1000);
          });
        });
      } else if (animal === 'dog') {
        this.audio.playDogSound();
        this.starSpeak("That's a puppy barking 'Woof'! Listen again for the 'Meow' sound!");
      } else if (animal === 'car') {
        this.audio.playCarSound();
        this.starSpeak("That's a car honking 'Beep Beep'! Listen again for the sweet animal sound!");
      }
    }

    /* ============================================================
     * SCENE 3: SMELL MECHANIC (Visual Scent Wave to Flower)
     * ============================================================ */
    handleSmellChoice(choiceEl, event) {
      const smell = choiceEl.dataset.smell;
      const rect = choiceEl.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      if (smell === 'flower') {
        // Correct Action
        this.audio.playSuccess();
        this.particles.addSparkles(cx, cy, 35, 'rainbow');
        this.setJohnMood('john-smelling', '👃');

        this.unlockPower('smell', 3);

        this.johnSpeak("I smell with my nose! The sweet rose smells so fresh!", () => {
          this.starSpeak("Wonderful sniffing! Let's discover Taste!", () => {
            setTimeout(() => {
              this.switchScene('taste');
            }, 1000);
          });
        });
      } else if (smell === 'lemon') {
        this.audio.playPop();
        this.starSpeak("Mmm, lemon is zesty! But follow the floating flower petals! 🌸");
      } else if (smell === 'cookie') {
        this.audio.playPop();
        this.starSpeak("Warm cookies smell delicious! Look at the blooming sweet rose! 🌹");
      }
    }

    /* ============================================================
     * SCENE 4: TASTE MECHANIC (Sweet Candy vs Sour Lemon)
     * ============================================================ */
    handleTasteChoice(type, event) {
      const targetEl = type === 'lemon' ? this.tasteItemLemon : this.tasteItemCandy;
      const rect = targetEl.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const checkEl = targetEl.querySelector('.taste-badge-check');

      if (type === 'lemon') {
        this.tastedLemon = true;
        this.audio.playSourSound();
        this.particles.addSparkles(cx, cy, 20, 'gold');
        if (checkEl) checkEl.classList.remove('hidden');

        this.setJohnMood('john-sour', '😝');
        this.johnSpeak("Sour! The yellow lemon is super sour and tangy!");
      } else if (type === 'candy') {
        this.tastedCandy = true;
        this.audio.playSweetSound();
        this.particles.addSparkles(cx, cy, 25, 'rainbow');
        if (checkEl) checkEl.classList.remove('hidden');

        this.setJohnMood('john-happy', '😋');
        this.johnSpeak("Sweet! The lollipop is yummy and sugary sweet!");
      }

      // Check if both or at least one is tasted to unlock
      if (this.tastedLemon && this.tastedCandy) {
        this.tasteStatusText.textContent = "🎉 You tasted both Sweet and Sour!";
        setTimeout(() => {
          this.unlockPower('taste', 4);
          this.setJohnMood('john-happy', '👅');
          this.johnSpeak("I taste with my tongue! Sweet and sour are so fun!", () => {
            this.starSpeak("Yum! Only one sense left: Touch! ✋", () => {
              setTimeout(() => {
                this.switchScene('touch');
              }, 1000);
            });
          });
        }, 1200);
      } else {
        this.tasteStatusText.textContent = "👉 Great! Now tap the other treat too!";
      }
    }

    /* ============================================================
     * SCENE 5: TOUCH MECHANIC (Soft Teddy vs Hard Rock)
     * ============================================================ */
    handleTouchChoice(type, event) {
      const targetEl = type === 'teddy' ? this.touchItemTeddy : this.touchItemRock;
      const rect = targetEl.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const checkEl = targetEl.querySelector('.touch-badge-check');

      if (type === 'teddy') {
        this.feltTeddy = true;
        this.audio.playSoftSound();
        this.particles.addSparkles(cx, cy, 20, 'rainbow');
        if (checkEl) checkEl.classList.remove('hidden');

        this.setJohnMood('john-happy', '☁️');
        this.johnSpeak("Soft! The teddy bear is fluffy, soft, and cuddly!");
      } else if (type === 'rock') {
        this.feltRock = true;
        this.audio.playHardSound();
        this.particles.addSparkles(cx, cy, 20, 'gold');
        if (checkEl) checkEl.classList.remove('hidden');

        this.setJohnMood('john-happy', '💎');
        this.johnSpeak("Hard! The smooth rock is solid and sturdy!");
      }

      if (this.feltTeddy && this.feltRock) {
        this.touchStatusText.textContent = "🎉 You felt both Soft and Hard textures!";
        setTimeout(() => {
          this.unlockPower('touch', 5);
          this.setJohnMood('john-happy', '✋');
          this.johnSpeak("I feel with my skin! We found all five sense powers!", () => {
            this.starSpeak("Let's activate the Five Senses Power! ⭐", () => {
              setTimeout(() => {
                this.switchScene('final_wow');
              }, 1000);
            });
          });
        }, 1200);
      } else {
        this.touchStatusText.textContent = "👉 Great! Now reach in and feel the other texture!";
      }
    }

    /* ============================================================
     * SCENE 6: FINAL WOW CONVERGENCE MOMENT
     * ============================================================ */
    triggerFinalConvergence() {
      this.audio.playFanfare();
      this.setJohnMood('john-celebrating', '⭐');
      this.particles.addConfettiBurst(80);

      // Animate convergence
      setTimeout(() => {
        this.convergenceStage.classList.add('converging');
        this.audio.playSparkle();

        setTimeout(() => {
          this.masterBadge.classList.remove('hidden');
          this.audio.playSuccess();
          this.particles.addConfettiBurst(100);

          this.johnSpeak("We found them all! I use my five senses every day!", () => {
            this.starSpeak("You are an amazing Sense Detective! ⭐", () => {
              this.btnEnterFreeplay.classList.remove('hidden');
            });
          });
        }, 1800);
      }, 1000);
    }

    /* ============================================================
     * SCENE 7: FREE-PLAY PLAYGROUND WORLD
     * ============================================================ */
    handleFreeplayPod(podEl, event) {
      const sense = podEl.dataset.sense;
      const rect = podEl.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      this.audio.playSparkle();
      this.particles.addSparkles(cx, cy, 25, 'rainbow');

      if (sense === 'sight') {
        this.audio.playPop();
        this.setJohnMood('john-happy', '👀');
        this.johnSpeak("I can see bright rainbows and fluttering butterflies with my eyes!");
      } else if (sense === 'hearing') {
        this.audio.playTone(880, 'sine', 0.4, 0.2);
        this.setJohnMood('john-listening', '👂');
        this.johnSpeak("I can hear singing birds and ringing bells with my ears!");
      } else if (sense === 'smell') {
        this.audio.playPop();
        this.setJohnMood('john-smelling', '👃');
        this.johnSpeak("I can smell blooming roses and sweet berries with my nose!");
      } else if (sense === 'taste') {
        this.audio.playSweetSound();
        this.setJohnMood('john-happy', '👅');
        this.johnSpeak("I can taste yummy ice cream and juicy watermelon with my tongue!");
      } else if (sense === 'touch') {
        this.audio.playSoftSound();
        this.setJohnMood('john-happy', '✋');
        this.johnSpeak("I can feel soft fluffy bunnies and smooth balloons with my skin!");
      }
    }

    /* ============================================================
     * RESTART / RESET MISSION
     * ============================================================ */
    restartGame() {
      // Reset state
      this.unlockedSenses = {
        sight: false,
        hearing: false,
        smell: false,
        taste: false,
        touch: false
      };
      this.tastedLemon = false;
      this.tastedCandy = false;
      this.feltTeddy = false;
      this.feltRock = false;

      // Reset HUD slots
      Object.keys(this.slots).forEach(k => {
        if (this.slots[k]) {
          this.slots[k].className = 'power-slot';
        }
      });

      // Reset dynamic element classes
      if (this.introOrbsContainer) this.introOrbsContainer.classList.remove('orbs-flying');
      if (this.convergenceStage) this.convergenceStage.classList.remove('converging');
      if (this.masterBadge) this.masterBadge.classList.add('hidden');
      if (this.btnEnterFreeplay) this.btnEnterFreeplay.classList.add('hidden');

      document.querySelectorAll('.taste-badge-check, .touch-badge-check').forEach(el => el.classList.add('hidden'));
      document.querySelectorAll('.item-fly-to-john').forEach(el => {
        el.classList.remove('item-fly-to-john');
        el.style.top = '';
        el.style.left = '';
      });

      this.switchScene('intro');
      this.setJohnMood('john-idle');
      this.johnSpeak("Let's solve the Mystery of the Lost Senses again!");
    }
  }

  // Initialize the game engine
  window.sensesGame = new SensesGame();
});
