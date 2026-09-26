/**
 * CHOTAPLAY — SAFETY HEROES
 * Preschool Safety Education Game (Ages 3–6)
 * "Think Safe. Stay Safe!"
 * Pure Vanilla JavaScript Game Engine
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. CHARACTER VECTOR ART FALLBACKS
  // =========================================================================

  const SVG_RIYA = `
  <svg viewBox="0 0 200 260" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <g id="riya-body">
      <path d="M 45 60 C 15 45, 10 90, 30 115 C 40 120, 55 100, 50 80 Z" fill="#4a2511"/>
      <path d="M 155 60 C 185 45, 190 90, 170 115 C 160 120, 145 100, 150 80 Z" fill="#4a2511"/>
      <circle cx="50" cy="65" r="9" fill="#ff7675"/>
      <circle cx="50" cy="65" r="4" fill="#ffeaa7"/>
      <circle cx="150" cy="65" r="9" fill="#74b9ff"/>
      <circle cx="150" cy="65" r="4" fill="#ffeaa7"/>
      <ellipse cx="100" cy="80" rx="46" ry="42" fill="#ffeaa7"/>
      <path d="M 58 70 C 70 45, 130 45, 142 70 C 135 60, 115 56, 100 58 C 85 56, 65 60, 58 70 Z" fill="#4a2511"/>
      <ellipse cx="82" cy="80" rx="6" ry="8" fill="#2d3436"/>
      <circle cx="80" cy="77" r="2.5" fill="#ffffff"/>
      <ellipse cx="118" cy="80" rx="6" ry="8" fill="#2d3436"/>
      <circle cx="116" cy="77" r="2.5" fill="#ffffff"/>
      <ellipse cx="72" cy="90" rx="7" ry="4" fill="#ff7675" opacity="0.6"/>
      <ellipse cx="128" cy="90" rx="7" ry="4" fill="#ff7675" opacity="0.6"/>
      <path d="M 90 92 Q 100 102 110 92" stroke="#d63031" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M 75 120 Q 100 115 125 120 L 155 195 Q 100 205 45 195 Z" fill="#ff758c"/>
      <circle cx="80" cy="150" r="4" fill="#ffffff" opacity="0.8"/>
      <circle cx="120" cy="155" r="4" fill="#ffffff" opacity="0.8"/>
      <circle cx="100" cy="175" r="4" fill="#ffffff" opacity="0.8"/>
      <path d="M 76 120 Q 100 132 124 120 Q 100 124 76 120 Z" fill="#ffffff"/>
      <path d="M 75 125 L 50 155" stroke="#ffeaa7" stroke-width="12" stroke-linecap="round"/>
      <path d="M 125 125 L 155 145" stroke="#ffeaa7" stroke-width="12" stroke-linecap="round"/>
      <rect x="80" y="195" width="12" height="35" fill="#ffeaa7" rx="6"/>
      <rect x="108" y="195" width="12" height="35" fill="#ffeaa7" rx="6"/>
      <ellipse cx="84" cy="235" rx="14" ry="9" fill="#ffffff"/>
      <ellipse cx="116" cy="235" rx="14" ry="9" fill="#ffffff"/>
    </g>
  </svg>`;

  const SVG_JOHN = `
  <svg viewBox="0 0 200 260" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <g id="john-body">
      <path d="M 52 70 C 45 40, 60 20, 90 22 C 105 15, 130 18, 145 35 C 160 45, 155 70, 148 78 Z" fill="#593019"/>
      <path d="M 85 20 L 98 8 L 110 20 L 125 10 L 135 25 Z" fill="#593019"/>
      <ellipse cx="100" cy="78" rx="44" ry="40" fill="#ffeaa7"/>
      <circle cx="56" cy="78" r="9" fill="#ffeaa7"/>
      <circle cx="144" cy="78" r="9" fill="#ffeaa7"/>
      <ellipse cx="80" cy="76" rx="6" ry="8" fill="#2d3436"/>
      <circle cx="78" cy="73" r="2.5" fill="#ffffff"/>
      <ellipse cx="120" cy="76" rx="6" ry="8" fill="#2d3436"/>
      <circle cx="118" cy="73" r="2.5" fill="#ffffff"/>
      <ellipse cx="72" cy="86" rx="6" ry="3.5" fill="#ff7675" opacity="0.6"/>
      <ellipse cx="128" cy="86" rx="6" ry="3.5" fill="#ff7675" opacity="0.6"/>
      <path d="M 88 88 Q 100 100 112 88" stroke="#d63031" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <path d="M 68 116 L 132 116 L 140 180 L 60 180 Z" fill="#226bbf" rx="8"/>
      <path d="M 68 120 L 45 155" stroke="#ffeaa7" stroke-width="12" stroke-linecap="round"/>
      <path d="M 132 120 L 155 155" stroke="#ffeaa7" stroke-width="12" stroke-linecap="round"/>
      <path d="M 64 178 L 136 178 L 130 210 L 105 210 L 100 190 L 95 210 L 70 210 Z" fill="#cca262"/>
      <rect x="76" y="210" width="12" height="24" fill="#ffeaa7" rx="5"/>
      <rect x="112" y="210" width="12" height="24" fill="#ffeaa7" rx="5"/>
      <ellipse cx="80" cy="238" rx="15" ry="9" fill="#0984e3"/>
      <ellipse cx="120" cy="238" rx="15" ry="9" fill="#0984e3"/>
    </g>
  </svg>`;

  const SVG_LITTLE_STAR = `
  <svg viewBox="0 0 160 160" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <g id="star-character">
      <polygon points="80,18 97,56 142,56 106,84 120,128 80,102 40,128 54,84 18,56 63,56"
               fill="#ffd152" stroke="#ffa502" stroke-width="4" stroke-linejoin="round"/>
      <ellipse cx="68" cy="74" rx="7" ry="9" fill="#2d3436"/>
      <circle cx="66" cy="70" r="3" fill="#ffffff"/>
      <ellipse cx="92" cy="74" rx="7" ry="9" fill="#2d3436"/>
      <circle cx="90" cy="70" r="3" fill="#ffffff"/>
      <ellipse cx="58" cy="84" rx="6" ry="3.5" fill="#ff7675" opacity="0.7"/>
      <ellipse cx="102" cy="84" rx="6" ry="3.5" fill="#ff7675" opacity="0.7"/>
      <path d="M 72 84 Q 80 94 88 84" stroke="#d63031" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <path d="M 45 78 Q 28 65 30 50" stroke="#ffd152" stroke-width="6" stroke-linecap="round" fill="none"/>
      <path d="M 115 78 Q 132 65 130 50" stroke="#ffd152" stroke-width="6" stroke-linecap="round" fill="none"/>
      <ellipse cx="68" cy="130" rx="7" ry="5" fill="#ffa502"/>
      <ellipse cx="92" cy="130" rx="7" ry="5" fill="#ffa502"/>
    </g>
  </svg>`;

  const SVG_HELPER_ADULT = `
  <svg viewBox="0 0 200 280" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <g id="helper-adult">
      <path d="M 60 70 C 50 30, 80 15, 100 15 C 120 15, 150 30, 140 70 C 145 95, 140 110, 135 120 C 130 90, 70 90, 65 120 Z" fill="#30336b"/>
      <ellipse cx="100" cy="75" rx="40" ry="38" fill="#ffeaa7"/>
      <ellipse cx="84" cy="72" rx="5" ry="6" fill="#2d3436"/>
      <circle cx="82" cy="70" r="2" fill="#ffffff"/>
      <ellipse cx="116" cy="72" rx="5" ry="6" fill="#2d3436"/>
      <circle cx="114" cy="70" r="2" fill="#ffffff"/>
      <ellipse cx="76" cy="80" rx="5" ry="3" fill="#ff7675" opacity="0.6"/>
      <ellipse cx="124" cy="80" rx="5" ry="3" fill="#ff7675" opacity="0.6"/>
      <path d="M 90 84 Q 100 94 110 84" stroke="#d63031" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M 65 110 L 135 110 L 145 220 L 55 220 Z" fill="#2ecc71" rx="10"/>
      <rect x="75" y="220" width="18" height="35" fill="#2c3e50"/>
      <rect x="107" y="220" width="18" height="35" fill="#2c3e50"/>
    </g>
  </svg>`;

  // =========================================================================
  // 2. PROCEDURAL SOUND & AUDIO SYNTHESIZER
  // =========================================================================

  class AudioManager {
    constructor() {
      this.ctx = null;
      this.isSoundEnabled = true;
      this.isVoiceEnabled = true;
      this.bgMusicTimer = null;
    }

    init() {
      try {
        if (!this.ctx) {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          if (AudioContext) {
            this.ctx = new AudioContext();
          }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
          this.ctx.resume();
        }
        if (this.isSoundEnabled && !this.bgMusicTimer) {
          this.startGentleMusic();
        }
      } catch (e) {
        console.warn('Web Audio init error:', e);
      }
    }

    playDing() {
      if (!this.isSoundEnabled || !this.ctx) return;
      try {
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(1046.5, now);
        osc.frequency.exponentialRampToValueAtTime(1567.98, now + 0.1);

        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.6);
      } catch (e) {}
    }

    playSparkle() {
      if (!this.isSoundEnabled || !this.ctx) return;
      try {
        const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51];
        notes.forEach((freq, idx) => {
          const now = this.ctx.currentTime + idx * 0.07;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now);

          gain.gain.setValueAtTime(0.18, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(now);
          osc.stop(now + 0.35);
        });
      } catch (e) {}
    }

    playBoing() {
      if (!this.isSoundEnabled || !this.ctx) return;
      try {
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(160, now + 0.3);

        gain.gain.setValueAtTime(0.22, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.35);
      } catch (e) {}
    }

    playSuccess() {
      if (!this.isSoundEnabled || !this.ctx) return;
      try {
        const chords = [523.25, 659.25, 783.99, 1046.5];
        chords.forEach((freq, idx) => {
          const now = this.ctx.currentTime + idx * 0.08;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now);

          gain.gain.setValueAtTime(0.24, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(now);
          osc.stop(now + 0.5);
        });
      } catch (e) {}
    }

    playCheer() {
      if (!this.isSoundEnabled || !this.ctx) return;
      try {
        const melody = [523.25, 659.25, 783.99, 1046.5, 1174.66, 1318.51, 1567.98];
        melody.forEach((freq, i) => {
          const now = this.ctx.currentTime + i * 0.08;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now);

          gain.gain.setValueAtTime(0.25, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(now);
          osc.stop(now + 0.7);
        });
      } catch (e) {}
    }

    playClick() {
      if (!this.isSoundEnabled || !this.ctx) return;
      try {
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(550, now);
        osc.frequency.exponentialRampToValueAtTime(250, now + 0.05);

        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.05);
      } catch (e) {}
    }

    startGentleMusic() {
      if (this.bgMusicTimer) return;
      const scale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25];
      this.bgMusicTimer = setInterval(() => {
        if (!this.isSoundEnabled || !this.ctx || this.ctx.state !== 'running') return;
        try {
          const now = this.ctx.currentTime;
          const note = scale[Math.floor(Math.random() * scale.length)];
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(note, now);

          gain.gain.setValueAtTime(0.03, now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.1);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(now);
          osc.stop(now + 1.1);
        } catch (e) {}
      }, 1000);
    }

    stopMusic() {
      if (this.bgMusicTimer) {
        clearInterval(this.bgMusicTimer);
        this.bgMusicTimer = null;
      }
    }

    speak(text) {
      if (!this.isVoiceEnabled || !('speechSynthesis' in window)) return;
      try {
        window.speechSynthesis.cancel();
        setTimeout(() => {
          try {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 0.95;
            utterance.pitch = 1.2;
            window.speechSynthesis.speak(utterance);
          } catch (e) {}
        }, 50);
      } catch (e) {}
    }
  }

  // =========================================================================
  // 3. MISSIONS DATA
  // =========================================================================

  const MISSIONS = [
    {
      id: 1,
      title: "Mission 1: Road Safety",
      rule: "Cross roads safely at the zebra crossing.",
      envClass: "env-road",
      chipIcon: "🚦",
      instruction: "Cars are moving on the road! What should Riya and John do?",
      dialogues: {
        intro: "Wait! What should we do?",
        safeReaction: "Safe crossing at the zebra crossing! ⭐",
        wrongOops: "Oops! Running across moving cars is not safe. Let's wait!"
      },
      choices: [
        {
          id: "unsafe",
          text: "RUN ACROSS",
          subtext: "Rush across moving cars",
          icon: "🏃💨",
          isSafe: false
        },
        {
          id: "safe",
          text: "WAIT AND CROSS AT ZEBRA CROSSING",
          subtext: "Stop, look both ways, cross safely",
          icon: "🦓🚸",
          isSafe: true
        }
      ],
      wow: {
        title: "Safe Road Crossing!",
        message: "Traffic stopped safely and the glowing zebra path guided them!"
      }
    },
    {
      id: 2,
      title: "Mission 2: Electric Safety",
      rule: "Do not touch electrical sockets.",
      envClass: "env-electric",
      chipIcon: "⚡",
      instruction: "An electrical socket is on the wall. Should John touch it?",
      dialogues: {
        intro: "Should we touch it?",
        safeReaction: "Electricity can be dangerous! Good job asking! ⭐",
        wrongOops: "Oops! Sockets have electricity. Never touch them!"
      },
      choices: [
        {
          id: "unsafe",
          text: "TOUCH SOCKET",
          subtext: "Put hands on the plug",
          icon: "🔌✋",
          isSafe: false
        },
        {
          id: "safe",
          text: "MOVE AWAY AND ASK AN ADULT",
          subtext: "Step back and get help",
          icon: "🛡️🙋",
          isSafe: true
        }
      ],
      wow: {
        title: "Safe Electric Zone!",
        message: "A glowing protective safety bubble covers the socket!"
      }
    },
    {
      id: 3,
      title: "Mission 3: Fire Safety",
      rule: "Stay away from hot stoves and flames.",
      envClass: "env-fire",
      chipIcon: "🔥",
      instruction: "The kitchen stove is hot and cooking! Is this safe to touch?",
      dialogues: {
        intro: "Is this safe to touch?",
        safeReaction: "Stay away from hot things! Ask an adult to cook! ⭐",
        wrongOops: "Oops! Stoves are very hot. Keep hands away safely!"
      },
      choices: [
        {
          id: "unsafe",
          text: "TOUCH IT",
          subtext: "Reach toward hot stove",
          icon: "🍲🖐️",
          isSafe: false
        },
        {
          id: "safe",
          text: "STAY AWAY AND ASK AN ADULT",
          subtext: "Step back behind the safe line",
          icon: "⚠️👨‍🍳",
          isSafe: true
        }
      ],
      wow: {
        title: "Stay Away Safe Zone!",
        message: "A bright yellow safety boundary protects the kitchen!"
      }
    },
    {
      id: 4,
      title: "Mission 4: Stranger Safety",
      rule: "Stay close to your trusted adult.",
      envClass: "env-stranger",
      chipIcon: "🤝",
      instruction: "An unknown person offers a toy in the park. What should we do?",
      dialogues: {
        intro: "What should we do?",
        safeReaction: "Stay with someone you trust! Super safe! ⭐",
        wrongOops: "Oops! Never go with someone you don't know."
      },
      choices: [
        {
          id: "unsafe",
          text: "GO WITH THEM",
          subtext: "Walk away from your adult",
          icon: "🚶‍♂️❓",
          isSafe: false
        },
        {
          id: "safe",
          text: "STAY WITH A TRUSTED ADULT",
          subtext: "Hold hands and stay close",
          icon: "👨‍👧‍👦💖",
          isSafe: true
        }
      ],
      wow: {
        title: "Glowing Safe Circle!",
        message: "A magical golden circle keeps everyone safe together!"
      }
    },
    {
      id: 5,
      title: "Mission 5: Water Safety",
      rule: "Never go near water without a trusted adult.",
      envClass: "env-water",
      chipIcon: "🏊",
      instruction: "The water is sparkling! Can John jump in all alone?",
      dialogues: {
        intro: "Can we go into the water alone?",
        safeReaction: "Water fun needs safety and an adult! ⭐",
        wrongOops: "Oops! Never go near deep water alone."
      },
      choices: [
        {
          id: "unsafe",
          text: "GO ALONE",
          subtext: "Jump into water by yourself",
          icon: "🌊💦",
          isSafe: false
        },
        {
          id: "safe",
          text: "STAY WITH A TRUSTED ADULT",
          subtext: "Wear floaties and wait for adult",
          icon: "🛟👨‍👧",
          isSafe: true
        }
      ],
      wow: {
        title: "Safe Pool Barrier!",
        message: "A glowing pool safety shield protects the water zone!"
      }
    },
    {
      id: 6,
      title: "Mission 6: Walking Safely",
      rule: "Walk carefully indoors using walking feet.",
      envClass: "env-walking",
      chipIcon: "🚶",
      instruction: "The school hallway is shiny! John wants to run super fast!",
      dialogues: {
        intro: "John! Slow down! What should we do?",
        safeReaction: "Walking feet! Walking is much safer! ⭐",
        wrongOops: "Oops! Running inside can make us slip. Walking feet!"
      },
      choices: [
        {
          id: "unsafe",
          text: "RUN",
          subtext: "Sprint fast on polished floor",
          icon: "🏃‍♂️💨",
          isSafe: false
        },
        {
          id: "safe",
          text: "WALK CAREFULLY",
          subtext: "Use safe walking feet together",
          icon: "👟👣",
          isSafe: true
        }
      ],
      wow: {
        title: "Safe Walk Corridor!",
        message: "Glowing green footprint trails guide safe walking!"
      }
    },
    {
      id: 7,
      title: "Mission 7: Emergency Help",
      rule: "Ask a trusted adult for help right away.",
      envClass: "env-emergency",
      chipIcon: "🛡️",
      instruction: "A small pretend emergency happened! Who can help us?",
      dialogues: {
        intro: "Who can help us?",
        safeReaction: "Ask a trusted adult for help! We are Safety Heroes! ⭐",
        wrongOops: "Oops! Don't hide. Always tell a trusted adult!"
      },
      choices: [
        {
          id: "unsafe",
          text: "HIDE",
          subtext: "Cover eyes and hide in corner",
          icon: "🙈📦",
          isSafe: false
        },
        {
          id: "safe",
          text: "TELL A TRUSTED ADULT",
          subtext: "Ask for help immediately",
          icon: "🗣️🦸‍♂️",
          isSafe: true
        }
      ],
      wow: {
        title: "Emergency Helper Hero!",
        message: "A glowing HELP beacon alerts trusted helpers immediately!"
      }
    }
  ];

  // =========================================================================
  // 4. GAME SYSTEM & STATE MACHINE
  // =========================================================================

  class SafetyHeroesGame {
    constructor() {
      this.audio = new AudioManager();
      this.currentMissionIndex = 0;
      this.earnedStars = 0;
      this.completedMissions = [];
      this.gameState = 'START';
      this.activeTimers = [];

      this.cacheDOM();
      this.injectSVGFallbacks();
      this.bindEvents();
      this.loadSavedProgress();
    }

    cacheDOM() {
      this.screenStart = document.getElementById('screen-start');
      this.screenMission = document.getElementById('screen-mission');
      this.screenFinale = document.getElementById('screen-finale');

      this.topBar = document.getElementById('top-bar');
      this.starCountBadge = document.getElementById('star-count-badge');
      this.starSlotsRow = document.getElementById('star-slots-row');
      this.btnSound = document.getElementById('btn-sound');
      this.soundIcon = document.getElementById('sound-icon');
      this.btnVoice = document.getElementById('btn-voice');
      this.voiceIcon = document.getElementById('voice-icon');
      this.btnTownMap = document.getElementById('btn-town-map');
      this.btnRestart = document.getElementById('btn-restart');

      this.btnStartGame = document.getElementById('btn-start-game');
      this.quickResumeBox = document.getElementById('quick-resume-box');
      this.btnResumeGame = document.getElementById('btn-resume-game');
      this.resumeMissionNum = document.getElementById('resume-mission-num');

      this.missionEnv = document.getElementById('mission-environment');
      this.envBackdrop = document.getElementById('env-backdrop-layer');
      this.envInteractive = document.getElementById('env-interactive-layer');
      this.envEffects = document.getElementById('env-effects-layer');

      this.actorRiya = document.getElementById('actor-riya');
      this.actorJohn = document.getElementById('actor-john');
      this.actorStar = document.getElementById('actor-star');
      this.actorHelper = document.getElementById('actor-helper');

      this.bubbleRiya = document.getElementById('bubble-riya');
      this.bubbleJohn = document.getElementById('bubble-john');
      this.bubbleStar = document.getElementById('bubble-star');
      this.bubbleHelper = document.getElementById('bubble-helper');

      this.missionChipIcon = document.getElementById('mission-chip-icon');
      this.missionChipTitle = document.getElementById('mission-chip-title');
      this.missionInstructionText = document.getElementById('mission-instruction-text');
      this.choicesContainer = document.getElementById('choices-container');

      this.wowOverlay = document.getElementById('wow-overlay');
      this.wowRuleTitle = document.getElementById('wow-rule-title');
      this.gentleThinkOverlay = document.getElementById('gentle-think-overlay');
      this.gentleMessageText = document.getElementById('gentle-message-text');
      this.gentleHintText = document.getElementById('gentle-hint-text');

      this.modalReward = document.getElementById('modal-reward');
      this.rewardSubtitleText = document.getElementById('reward-subtitle-text');
      this.rewardProgressFill = document.getElementById('reward-progress-fill');
      this.rewardStarsText = document.getElementById('reward-stars-text');
      this.btnNextMission = document.getElementById('btn-next-mission');

      this.modalTownMap = document.getElementById('modal-town-map');
      this.townGridZones = document.getElementById('town-grid-zones');
      this.btnCloseTown = document.getElementById('btn-close-town');

      this.confettiCanvas = document.getElementById('confetti-canvas');
      this.btnPlayAgain = document.getElementById('btn-play-again');
      this.btnPrintCert = document.getElementById('btn-print-cert');
    }

    injectSVGFallbacks() {
      const riyaFallbacks = document.querySelectorAll('.riya-avatar');
      riyaFallbacks.forEach(el => el.innerHTML = SVG_RIYA);

      const johnFallbacks = document.querySelectorAll('.john-avatar');
      johnFallbacks.forEach(el => el.innerHTML = SVG_JOHN);

      const starFallbacks = document.querySelectorAll('.star-avatar');
      starFallbacks.forEach(el => el.innerHTML = SVG_LITTLE_STAR);

      const helperSprites = document.querySelectorAll('.helper-sprite');
      helperSprites.forEach(el => el.innerHTML = SVG_HELPER_ADULT);
    }

    bindEvents() {
      const unlock = () => {
        this.audio.init();
        window.removeEventListener('click', unlock);
        window.removeEventListener('touchstart', unlock);
      };
      window.addEventListener('click', unlock);
      window.addEventListener('touchstart', unlock);

      this.btnStartGame.addEventListener('click', () => {
        this.audio.init();
        this.audio.playDing();
        this.startGame(0);
      });

      this.btnResumeGame.addEventListener('click', () => {
        this.audio.init();
        this.audio.playDing();
        this.startGame(this.currentMissionIndex);
      });

      this.btnSound.addEventListener('click', () => this.toggleSound());
      this.btnVoice.addEventListener('click', () => this.toggleVoice());
      this.btnTownMap.addEventListener('click', () => this.showTownMapModal());
      this.btnCloseTown.addEventListener('click', () => this.hideTownMapModal());
      this.btnRestart.addEventListener('click', () => this.returnToHome());

      this.btnNextMission.addEventListener('click', () => {
        this.audio.playClick();
        this.modalReward.classList.add('hidden');
        this.loadNextMission();
      });

      this.btnPlayAgain.addEventListener('click', () => {
        this.audio.playClick();
        this.resetAllProgress();
        this.startGame(0);
      });

      this.btnPrintCert.addEventListener('click', () => {
        this.audio.playSparkle();
        window.print();
      });
    }

    setSafeTimer(fn, delay) {
      const timer = setTimeout(() => {
        fn();
      }, delay);
      this.activeTimers.push(timer);
      return timer;
    }

    clearAllTimers() {
      this.activeTimers.forEach(t => clearTimeout(t));
      this.activeTimers = [];
    }

    loadSavedProgress() {
      try {
        const savedStars = localStorage.getItem('chotaplay_safety_stars');
        const savedMissions = localStorage.getItem('chotaplay_completed_missions');
        const savedCurrent = localStorage.getItem('chotaplay_current_mission');

        if (savedStars !== null) {
          this.earnedStars = parseInt(savedStars, 10) || 0;
        }
        if (savedMissions) {
          this.completedMissions = JSON.parse(savedMissions) || [];
        }
        if (savedCurrent !== null) {
          this.currentMissionIndex = parseInt(savedCurrent, 10) || 0;
          if (this.currentMissionIndex >= MISSIONS.length) {
            this.currentMissionIndex = 0;
          }
        }

        this.updateStarUI();

        if (this.earnedStars > 0 && this.earnedStars < 7) {
          this.quickResumeBox.classList.remove('hidden');
          this.resumeMissionNum.textContent = this.currentMissionIndex + 1;
        }
      } catch (e) {}
    }

    saveProgress() {
      try {
        localStorage.setItem('chotaplay_safety_stars', this.earnedStars.toString());
        localStorage.setItem('chotaplay_completed_missions', JSON.stringify(this.completedMissions));
        localStorage.setItem('chotaplay_current_mission', this.currentMissionIndex.toString());
      } catch (e) {}
    }

    resetAllProgress() {
      this.earnedStars = 0;
      this.completedMissions = [];
      this.currentMissionIndex = 0;
      this.saveProgress();
      this.updateStarUI();
      if (this.quickResumeBox) {
        this.quickResumeBox.classList.add('hidden');
      }
    }

    updateStarUI() {
      this.starCountBadge.textContent = `${this.earnedStars} / 7`;
      const slots = this.starSlotsRow.querySelectorAll('.star-slot');
      slots.forEach((slot, index) => {
        if (index < this.earnedStars) {
          slot.classList.add('earned');
        } else {
          slot.classList.remove('earned');
        }
      });
    }

    startGame(missionIndex = 0) {
      this.clearAllTimers();
      this.currentMissionIndex = missionIndex;
      this.showScreen(this.screenMission);
      this.topBar.classList.remove('hidden');
      this.startMission(this.currentMissionIndex);
    }

    returnToHome() {
      this.clearAllTimers();
      this.showScreen(this.screenStart);
      this.topBar.classList.add('hidden');
      this.gameState = 'START';
      if (this.earnedStars > 0 && this.earnedStars < 7) {
        this.quickResumeBox.classList.remove('hidden');
        this.resumeMissionNum.textContent = this.currentMissionIndex + 1;
      }
    }

    showScreen(targetScreen) {
      document.querySelectorAll('.screen-view').forEach(screen => {
        screen.classList.remove('active');
      });
      targetScreen.classList.add('active');
    }

    startMission(missionIndex) {
      this.clearAllTimers();
      const mission = MISSIONS[missionIndex];
      if (!mission) {
        this.completeGame();
        return;
      }

      this.gameState = 'SITUATION';

      // Scenery setup
      this.missionEnv.className = `mission-env-container ${mission.envClass}`;
      this.renderSceneryElements(mission);

      // Info pill
      this.missionChipIcon.textContent = mission.chipIcon;
      this.missionChipTitle.textContent = mission.title;
      this.missionInstructionText.textContent = mission.instruction;

      this.resetActors();

      this.audio.playDing();
      this.showSpeechBubble(this.bubbleStar, mission.dialogues.intro, 3500);
      this.audio.speak(mission.dialogues.intro);

      this.showChoices(mission);
    }

    resetActors() {
      this.actorHelper.classList.add('hidden');
      this.bubbleHelper.classList.remove('active');

      this.actorRiya.className = 'actor actor-riya idle';
      this.actorJohn.className = 'actor actor-john idle';
      this.actorStar.className = 'actor actor-star float-glow';

      this.actorRiya.style.transform = 'none';
      this.actorJohn.style.transform = 'none';

      this.bubbleRiya.classList.remove('active');
      this.bubbleJohn.classList.remove('active');
      this.bubbleStar.classList.remove('active');

      this.wowOverlay.classList.add('hidden');
      this.gentleThinkOverlay.classList.add('hidden');
      this.modalReward.classList.add('hidden');
    }

    renderSceneryElements(mission) {
      this.envBackdrop.innerHTML = '';
      this.envInteractive.innerHTML = '';
      this.envEffects.innerHTML = '';

      switch (mission.id) {
        case 1:
          this.envBackdrop.innerHTML = `
            <div style="position:absolute; bottom:140px; width:100%; height:100px; background:#485460;">
              <div style="display:flex; justify-content:space-around; width:100%; height:100%; align-items:center;">
                ${Array(10).fill('<div style="width:40px; height:65px; background:white; border-radius:5px;"></div>').join('')}
              </div>
            </div>
            <div id="traffic-light-post" style="position:absolute; right:12%; bottom:240px; background:#2f3542; padding:8px 12px; border-radius:16px; display:flex; flex-direction:column; gap:6px;">
              <div id="light-red" style="width:22px; height:22px; border-radius:50%; background:#ff4757; box-shadow:0 0 10px #ff4757;"></div>
              <div id="light-green" style="width:22px; height:22px; border-radius:50%; background:#4b4b4b;"></div>
            </div>
          `;
          this.envInteractive.innerHTML = `
            <div id="road-car" style="position:absolute; bottom:160px; left:62%; font-size:54px; transition:all 1s ease;">🚗</div>
          `;
          break;

        case 2:
          this.envBackdrop.innerHTML = `
            <div style="position:absolute; bottom:160px; right:16%; width:85px; height:105px; background:#f1f2f6; border-radius:16px; border:4px solid #ced6e0; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px;">
              <div style="display:flex; gap:12px;">
                <div style="width:8px; height:18px; background:#2f3542; border-radius:3px;"></div>
                <div style="width:8px; height:18px; background:#2f3542; border-radius:3px;"></div>
              </div>
              <div style="font-size:22px;">⚡</div>
            </div>
          `;
          break;

        case 3:
          this.envBackdrop.innerHTML = `
            <div style="position:absolute; bottom:145px; right:15%; width:140px; height:120px; background:#d2dae2; border-radius:20px 20px 0 0; border:4px solid #808e9b; display:flex; flex-direction:column; align-items:center; justify-content:center;">
              <div style="font-size:42px;">🍲</div>
              <div style="font-size:22px; animation:floatMini 1s infinite;">♨️</div>
            </div>
          `;
          break;

        case 4:
          this.envBackdrop.innerHTML = `
            <div style="position:absolute; bottom:180px; left:8%; font-size:70px;">🌳</div>
            <div style="position:absolute; bottom:160px; right:35%; font-size:60px;">🛝</div>
          `;
          this.envInteractive.innerHTML = `
            <div style="position:absolute; bottom:170px; right:10%; display:flex; flex-direction:column; align-items:center;">
              <div style="font-size:60px;">🚶‍♂️</div>
              <div style="background:white; padding:3px 10px; border-radius:10px; font-weight:800; font-size:13px; border:2px solid #ffd152;">🧸 Free Toy?</div>
            </div>
          `;
          break;

        case 5:
          this.envBackdrop.innerHTML = `
            <div style="position:absolute; bottom:80px; right:0; width:50%; height:160px; background:linear-gradient(180deg, #4bcffa 0%, #0abde3 100%); border-radius:24px 0 0 0; border-top:6px solid #00d2d3;">
              <div style="position:absolute; top:20px; left:20px; font-size:30px;">🛟</div>
              <div style="position:absolute; top:50px; right:30px; font-size:28px;">🌊</div>
            </div>
          `;
          break;

        case 6:
          this.envBackdrop.innerHTML = `
            <div style="position:absolute; bottom:180px; width:100%; display:flex; justify-content:space-around; font-size:48px; opacity:0.8;">
              <span>🚪</span>
              <span>🏫</span>
              <span>🚪</span>
            </div>
          `;
          break;

        case 7:
          this.envBackdrop.innerHTML = `
            <div style="position:absolute; bottom:160px; right:20%; font-size:56px;">
              🥛💦
            </div>
          `;
          break;
      }
    }

    showSpeechBubble(bubbleEl, text, duration = 3000) {
      const bubbleText = bubbleEl.querySelector('.bubble-text');
      if (bubbleText) bubbleText.textContent = text;
      bubbleEl.classList.add('active');

      if (duration > 0) {
        this.setSafeTimer(() => {
          bubbleEl.classList.remove('active');
        }, duration);
      }
    }

    showChoices(mission) {
      this.choicesContainer.innerHTML = '';
      mission.choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.className = 'choice-card';
        btn.innerHTML = `
          <div class="choice-icon-wrap">${choice.icon}</div>
          <div class="choice-label-wrap">
            <span class="choice-title">${choice.text}</span>
            <span class="choice-subtitle">${choice.subtext}</span>
          </div>
        `;
        btn.addEventListener('click', () => {
          this.handleChoice(choice, mission);
        });
        this.choicesContainer.appendChild(btn);
      });
    }

    handleChoice(choice, mission) {
      this.audio.playClick();
      const allButtons = this.choicesContainer.querySelectorAll('.choice-card');
      allButtons.forEach(b => b.classList.add('disabled'));

      // Safety timeout to guarantee buttons re-enable even if an animation is interrupted
      this.setSafeTimer(() => {
        allButtons.forEach(b => b.classList.remove('disabled'));
      }, 4000);

      if (choice.isSafe) {
        this.handleCorrectChoice(mission);
      } else {
        this.handleWrongChoice(mission, allButtons);
      }
    }

    handleWrongChoice(mission, buttons) {
      this.gameState = 'WRONG';
      this.audio.playBoing();

      this.actorJohn.classList.add('recoil');
      this.showSpeechBubble(this.bubbleJohn, "Oops! Let me think!", 2000);

      this.setSafeTimer(() => {
        this.actorStar.classList.add('float-glow');
        this.showSpeechBubble(this.bubbleStar, "Oops! Let's think safely.", 2200);
        this.audio.speak(mission.dialogues.wrongOops);

        this.gentleMessageText.textContent = "Oops! Let's think safely.";
        this.gentleHintText.textContent = mission.dialogues.wrongOops;
        this.gentleThinkOverlay.classList.remove('hidden');

        this.setSafeTimer(() => {
          this.gentleThinkOverlay.classList.add('hidden');
          this.actorJohn.classList.remove('recoil');
          buttons.forEach(b => b.classList.remove('disabled'));
          this.gameState = 'CHOICE';
        }, 2200);
      }, 600);
    }

    handleCorrectChoice(mission) {
      this.gameState = 'CORRECT';
      this.audio.playSuccess();
      this.playSafeAnimation(mission);
    }

    playSafeAnimation(mission) {
      switch (mission.id) {
        case 1:
          this.actorJohn.classList.add('looking');
          this.actorRiya.classList.add('looking');
          this.showSpeechBubble(this.bubbleRiya, "Look both ways!", 1500);
          this.audio.speak("Look both ways!");

          this.setSafeTimer(() => {
            const car = document.getElementById('road-car');
            if (car) car.style.transform = 'translateX(140px)';
            const lightGreen = document.getElementById('light-green');
            if (lightGreen) lightGreen.style.background = '#2ecc71';

            this.actorJohn.classList.remove('looking');
            this.actorRiya.classList.remove('looking');
            this.actorJohn.classList.add('walking');
            this.actorRiya.classList.add('walking');

            this.actorJohn.style.transform = 'translateX(80px)';
            this.actorRiya.style.transform = 'translateX(80px)';

            this.setSafeTimer(() => this.showWow(mission), 1200);
          }, 1500);
          break;

        case 2:
          this.actorJohn.classList.add('recoil');
          this.showSpeechBubble(this.bubbleJohn, "Step back safely!", 1500);

          this.setSafeTimer(() => {
            this.actorHelper.classList.remove('hidden');
            this.showSpeechBubble(this.bubbleHelper, "Good job asking an adult!", 1800);
            this.audio.speak("Good job asking an adult!");
            this.setSafeTimer(() => this.showWow(mission), 1400);
          }, 900);
          break;

        case 3:
          this.actorJohn.style.transform = 'translateX(-30px)';
          this.showSpeechBubble(this.bubbleRiya, "Stay away from hot stoves!", 1500);
          this.audio.speak("Stay away from hot stoves!");

          this.setSafeTimer(() => {
            this.actorHelper.classList.remove('hidden');
            this.showSpeechBubble(this.bubbleHelper, "Adults will cook safely!", 1800);
            this.setSafeTimer(() => this.showWow(mission), 1400);
          }, 900);
          break;

        case 4:
          this.actorJohn.style.transform = 'translateX(-50px)';
          this.actorHelper.classList.remove('hidden');
          this.showSpeechBubble(this.bubbleHelper, "Always stay with your family!", 1800);
          this.audio.speak("Always stay with someone you trust!");

          this.setSafeTimer(() => this.showWow(mission), 1400);
          break;

        case 5:
          this.actorJohn.style.transform = 'translateX(-40px)';
          this.actorHelper.classList.remove('hidden');
          this.showSpeechBubble(this.bubbleJohn, "I'll swim with my adult!", 1800);
          this.audio.speak("Water safety with an adult!");

          this.setSafeTimer(() => this.showWow(mission), 1400);
          break;

        case 6:
          this.actorJohn.classList.add('walking');
          this.actorRiya.classList.add('walking');
          this.showSpeechBubble(this.bubbleJohn, "Walking feet! So smooth!", 1800);
          this.audio.speak("Walking feet! Walking is safer!");

          this.setSafeTimer(() => this.showWow(mission), 1400);
          break;

        case 7:
          this.actorHelper.classList.remove('hidden');
          this.showSpeechBubble(this.bubbleRiya, "Helper, we need assistance!", 1600);
          this.audio.speak("Ask a trusted adult for help!");

          this.setSafeTimer(() => this.showWow(mission), 1400);
          break;
      }
    }

    showWow(mission) {
      this.gameState = 'WOW';
      this.audio.playSparkle();

      this.wowRuleTitle.textContent = mission.wow.title;
      this.wowOverlay.classList.remove('hidden');

      this.actorJohn.classList.add('celebrating');
      this.actorRiya.classList.add('celebrating');
      this.showSpeechBubble(this.bubbleStar, mission.dialogues.safeReaction, 2200);

      this.setSafeTimer(() => {
        this.giveReward(mission);
      }, 2000);
    }

    giveReward(mission) {
      this.gameState = 'REWARD';
      this.audio.playCheer();

      if (!this.completedMissions.includes(mission.id)) {
        this.completedMissions.push(mission.id);
        this.earnedStars = this.completedMissions.length;
      }

      this.saveProgress();
      this.updateStarUI();

      this.rewardSubtitleText.textContent = `You protected the town with: ${mission.rule}`;
      const percentage = (this.earnedStars / 7) * 100;
      this.rewardProgressFill.style.width = `${percentage}%`;
      this.rewardStarsText.textContent = `SAFETY STARS: ${this.earnedStars} / 7`;

      if (this.earnedStars >= 7) {
        this.btnNextMission.innerHTML = `<span>GRAND CELEBRATION 🏆</span>`;
      } else {
        this.btnNextMission.innerHTML = `<span>NEXT ADVENTURE ➡️</span>`;
      }

      this.modalReward.classList.remove('hidden');
    }

    loadNextMission() {
      this.currentMissionIndex++;
      if (this.currentMissionIndex >= MISSIONS.length) {
        this.completeGame();
      } else {
        this.startMission(this.currentMissionIndex);
      }
    }

    completeGame() {
      this.clearAllTimers();
      this.gameState = 'FINAL';
      this.showScreen(this.screenFinale);
      this.topBar.classList.remove('hidden');

      this.audio.playCheer();
      this.audio.speak("Safety Heroes! Think safe, stay safe!");

      this.startConfetti();
    }

    startConfetti() {
      const canvas = this.confettiCanvas;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const particles = [];
      const colors = ['#ff4757', '#2ed573', '#1e90ff', '#ffa502', '#9b59b6', '#ffffff'];

      for (let i = 0; i < 120; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height - canvas.height,
          size: Math.random() * 8 + 6,
          color: colors[Math.floor(Math.random() * colors.length)],
          vx: (Math.random() - 0.5) * 3,
          vy: Math.random() * 3 + 2.5,
          rot: Math.random() * 360,
          rotSpeed: (Math.random() - 0.5) * 6
        });
      }

      const animateConfetti = () => {
        if (this.gameState !== 'FINAL') return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
          p.x += p.vx;
          p.y += p.vy;
          p.rot += p.rotSpeed;

          if (p.y > canvas.height) {
            p.y = -20;
            p.x = Math.random() * canvas.width;
          }

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rot * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          ctx.restore();
        });

        requestAnimationFrame(animateConfetti);
      };

      requestAnimationFrame(animateConfetti);
    }

    showTownMapModal() {
      this.audio.playSparkle();
      this.townGridZones.innerHTML = '';

      MISSIONS.forEach((m, idx) => {
        const isSecured = this.completedMissions.includes(m.id);
        const card = document.createElement('div');
        card.className = `town-zone-card ${isSecured ? 'secured' : 'locked'}`;
        card.innerHTML = `
          <div class="zone-icon">${m.chipIcon}</div>
          <div class="zone-title">${m.title}</div>
          <span class="zone-status">${isSecured ? '⭐ Protected Zone' : '🔒 Unprotected'}</span>
        `;
        card.addEventListener('click', () => {
          this.hideTownMapModal();
          this.startGame(idx);
        });
        this.townGridZones.appendChild(card);
      });

      this.modalTownMap.classList.remove('hidden');
    }

    hideTownMapModal() {
      this.modalTownMap.classList.add('hidden');
    }

    toggleSound() {
      this.audio.isSoundEnabled = !this.audio.isSoundEnabled;
      if (this.audio.isSoundEnabled) {
        this.soundIcon.textContent = '🔊';
        this.audio.startGentleMusic();
        this.audio.playDing();
      } else {
        this.soundIcon.textContent = '🔇';
        this.audio.stopMusic();
      }
    }

    toggleVoice() {
      this.audio.isVoiceEnabled = !this.audio.isVoiceEnabled;
      if (this.audio.isVoiceEnabled) {
        this.voiceIcon.textContent = '🗣️';
        this.audio.speak("Voice narration turned on!");
      } else {
        this.voiceIcon.textContent = '🤐';
      }
    }
  }

  window.addEventListener('DOMContentLoaded', () => {
    window.chotaplayGame = new SafetyHeroesGame();
  });

})();
