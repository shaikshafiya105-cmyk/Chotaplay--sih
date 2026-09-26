/**
 * CHOTAPLAY — RIYA'S CHOICE ADVENTURE
 * UKG Educational Decision Adventure Game (Age 4-6)
 * Core Game Engine, Web Speech Voice Narration, Web Audio Synthesizer,
 * SVG Characters & Interactive Mini-Games.
 */

(function() {
  'use strict';

  // =========================================================================
  // AUDIO SYNTHESIZER ENGINE (Web Audio API — Zero External Audio Files)
  // =========================================================================
  class SoundSynthesizer {
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

    playSparkle() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98]; // C Major arpeggio
      notes.forEach((freq, index) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + index * 0.08);

        gain.gain.setValueAtTime(0, now + index * 0.08);
        gain.gain.linearRampToValueAtTime(0.2, now + index * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.08 + 0.4);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + index * 0.08);
        osc.stop(now + index * 0.08 + 0.45);
      });
    }

    playCorrect() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const notes = [440, 554.37, 659.25, 880]; // A major chime
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.09);

        gain.gain.setValueAtTime(0, now + idx * 0.09);
        gain.gain.linearRampToValueAtTime(0.25, now + idx * 0.09 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.5);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.09);
        osc.stop(now + idx * 0.09 + 0.55);
      });
    }

    playGentleHint() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(329.63, now); // E4
      osc.frequency.exponentialRampToValueAtTime(261.63, now + 0.3); // C4 gentle soft glide

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.45);
    }

    playWaterSplash() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      for (let i = 0; i < 4; i++) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600 + Math.random() * 600, now + i * 0.06);
        gain.gain.setValueAtTime(0.12, now + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.15);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + i * 0.06);
        osc.stop(now + i * 0.06 + 0.18);
      }
    }

    playBubblePop() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.12);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.16);
    }

    playDogBark() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      [0, 0.16].forEach((timeOffset) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(320, now + timeOffset);
        osc.frequency.exponentialRampToValueAtTime(180, now + timeOffset + 0.12);

        gain.gain.setValueAtTime(0, now + timeOffset);
        gain.gain.linearRampToValueAtTime(0.15, now + timeOffset + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + timeOffset + 0.14);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + timeOffset);
        osc.stop(now + timeOffset + 0.16);
      });
    }

    playFanfare() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const notes = [
        { f: 523.25, t: 0, d: 0.18 },
        { f: 659.25, t: 0.18, d: 0.18 },
        { f: 783.99, t: 0.36, d: 0.18 },
        { f: 1046.50, t: 0.54, d: 0.6 }
      ];
      notes.forEach((item) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(item.f, now + item.t);

        gain.gain.setValueAtTime(0, now + item.t);
        gain.gain.linearRampToValueAtTime(0.3, now + item.t + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + item.t + item.d);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + item.t);
        osc.stop(now + item.t + item.d + 0.05);
      });
    }

    toggle() {
      this.enabled = !this.enabled;
      return this.enabled;
    }
  }

  // =========================================================================
  // VOICE SYNTHESIS ENGINE (Web Speech API)
  // =========================================================================
  class VoiceNarrator {
    constructor() {
      this.synth = window.speechSynthesis || null;
      this.lastSpokenText = "";
      this.isSpeaking = false;
      this.voice = null;
      this.initVoices();
    }

    initVoices() {
      if (!this.synth) return;
      const load = () => {
        const voices = this.synth.getVoices();
        // Look for a friendly, natural English voice
        this.voice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Female') || v.name.includes('Samantha') || v.name.includes('Zira') || v.name.includes('Google') || v.name.includes('Natural'))) || voices.find(v => v.lang.startsWith('en')) || null;
      };
      load();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = load;
      }
    }

    speak(text, onEnd) {
      this.lastSpokenText = text;
      if (!this.synth) {
        if (onEnd) onEnd();
        return;
      }

      try {
        this.synth.cancel(); // cancel any prior speech
        const utterance = new SpeechSynthesisUtterance(text);
        if (this.voice) {
          utterance.voice = this.voice;
        }
        utterance.rate = 0.92; // Clear, deliberate pace for UKG 4-6 year olds
        utterance.pitch = 1.15; // Friendly, warm cheerful tone
        utterance.volume = 1.0;

        utterance.onend = () => {
          this.isSpeaking = false;
          if (onEnd) onEnd();
        };
        utterance.onerror = () => {
          this.isSpeaking = false;
          if (onEnd) onEnd();
        };

        this.isSpeaking = true;
        this.synth.speak(utterance);
      } catch (e) {
        console.warn("Speech synthesis error fallback:", e);
        if (onEnd) onEnd();
      }
    }

    repeatLast() {
      if (this.lastSpokenText) {
        this.speak(this.lastSpokenText);
      }
    }

    stop() {
      if (this.synth) {
        this.synth.cancel();
      }
      this.isSpeaking = false;
    }
  }

  // =========================================================================
  // EXTRA CHARACTER SVG TEMPLATES (Teacher, Friendly Dog)
  // =========================================================================
  function getTeacherSVG() {
    return `
      <svg class="actor-svg" viewBox="0 0 200 320" width="100%" height="100%">
        <defs>
          <linearGradient id="teacherDress" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#26a69a"/>
            <stop offset="100%" stop-color="#00695c"/>
          </linearGradient>
          <linearGradient id="teacherHair" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#4e342e"/>
            <stop offset="100%" stop-color="#271d19"/>
          </linearGradient>
        </defs>
        <ellipse cx="100" cy="305" rx="50" ry="10" fill="rgba(0,0,0,0.18)"/>
        <!-- Legs & Shoes -->
        <rect x="80" y="240" width="16" height="50" rx="8" fill="#ffdfc4"/>
        <rect x="104" y="240" width="16" height="50" rx="8" fill="#ffdfc4"/>
        <path d="M 74 282 Q 90 280 98 282 Q 100 294 88 294 Q 74 294 74 282 Z" fill="#37474f"/>
        <path d="M 102 282 Q 118 280 126 282 Q 128 294 116 294 Q 102 294 102 282 Z" fill="#37474f"/>
        <!-- Saree/Dress -->
        <path d="M 70 140 L 130 140 L 140 245 L 60 245 Z" fill="url(#teacherDress)"/>
        <!-- Book in Hand -->
        <rect x="120" y="180" width="30" height="40" rx="4" fill="#ffb74d" stroke="#f57c00" stroke-width="2"/>
        <line x1="135" y1="180" x2="135" y2="220" stroke="#f57c00" stroke-width="2"/>
        <!-- Head & Hair -->
        <circle cx="100" cy="85" r="40" fill="#ffdfc4"/>
        <path d="M 60 80 Q 60 45 100 45 Q 140 45 140 80 Q 125 55 100 58 Q 75 55 60 80 Z" fill="url(#teacherHair)"/>
        <!-- Bun -->
        <circle cx="100" cy="40" r="16" fill="url(#teacherHair)"/>
        <!-- Glasses -->
        <circle cx="86" cy="84" r="10" fill="none" stroke="#d81b60" stroke-width="3"/>
        <circle cx="114" cy="84" r="10" fill="none" stroke="#d81b60" stroke-width="3"/>
        <line x1="96" y1="84" x2="104" y2="84" stroke="#d81b60" stroke-width="3"/>
        <!-- Eyes & Smile -->
        <circle cx="86" cy="84" r="3" fill="#24140D"/>
        <circle cx="114" cy="84" r="3" fill="#24140D"/>
        <circle cx="76" cy="94" r="6" fill="#ff8080" opacity="0.6"/>
        <circle cx="124" cy="94" r="6" fill="#ff8080" opacity="0.6"/>
        <path d="M 90 102 Q 100 114 110 102" fill="none" stroke="#8d2525" stroke-width="3" stroke-linecap="round"/>
      </svg>
    `;
  }

  function getDogSVG() {
    return `
      <svg class="actor-svg" viewBox="0 0 200 240" width="100%" height="100%">
        <defs>
          <linearGradient id="dogFur" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#ffb74d"/>
            <stop offset="100%" stop-color="#f57c00"/>
          </linearGradient>
        </defs>
        <ellipse cx="100" cy="225" rx="60" ry="12" fill="rgba(0,0,0,0.18)"/>
        <!-- Wagging Tail -->
        <g id="dog-tail" class="dog-tail">
          <path d="M 45 160 Q 20 130 30 110" fill="none" stroke="url(#dogFur)" stroke-width="16" stroke-linecap="round"/>
        </g>
        <!-- Body -->
        <ellipse cx="100" cy="170" rx="55" ry="40" fill="url(#dogFur)"/>
        <circle cx="100" cy="180" r="24" fill="#ffe0b2"/>
        <!-- Paws -->
        <ellipse cx="65" cy="210" rx="14" ry="10" fill="#f57c00"/>
        <ellipse cx="135" cy="210" rx="14" ry="10" fill="#f57c00"/>
        <ellipse cx="90" cy="214" rx="14" ry="10" fill="#f57c00"/>
        <ellipse cx="110" cy="214" rx="14" ry="10" fill="#f57c00"/>
        <!-- Collar -->
        <rect x="75" y="125" width="50" height="10" rx="5" fill="#e91e63"/>
        <circle cx="100" cy="135" r="5" fill="#ffd700"/>
        <!-- Head -->
        <circle cx="100" cy="90" r="40" fill="url(#dogFur)"/>
        <!-- Floppy Ears -->
        <path d="M 65 75 Q 40 95 50 125 Q 65 125 72 90" fill="#e65100"/>
        <path d="M 135 75 Q 160 95 150 125 Q 135 125 128 90" fill="#e65100"/>
        <!-- Snout -->
        <ellipse cx="100" cy="105" rx="20" ry="14" fill="#ffe0b2"/>
        <ellipse cx="100" cy="98" rx="8" ry="6" fill="#2d1300"/>
        <path d="M 94 106 Q 100 114 106 106" fill="none" stroke="#2d1300" stroke-width="2.5" stroke-linecap="round"/>
        <!-- Tongue -->
        <path id="dog-tongue" d="M 98 108 Q 100 122 104 108" fill="#ff4081"/>
        <!-- Eyes -->
        <circle cx="86" cy="85" r="5.5" fill="#2d1300"/>
        <circle cx="114" cy="85" r="5.5" fill="#2d1300"/>
        <circle cx="84" cy="83" r="2" fill="#fff"/>
        <circle cx="112" cy="83" r="2" fill="#fff"/>
      </svg>
    `;
  }

  // =========================================================================
  // SCENE DATA DEFINITIONS (10 Scenarios + Opening + Magic Door)
  // =========================================================================
  const SCENES = [
    // SCENE 0: OPENING SCENE
    {
      id: "opening",
      category: "WELCOME",
      title: "Riya's Choice Adventure",
      bgClass: "bg-magic",
      characters: { riya: "happy", star: "excited", john: "happy", extra: null },
      dialogue: {
        speaker: "Little Star",
        avatar: "⭐",
        text: "Welcome! Let's go on a Choice Adventure! Can you help us make the right choices?"
      },
      choices: [
        {
          id: "start",
          title: "START ADVENTURE! 🚀",
          desc: "Let's explore and make good choices!",
          icon: "🌟",
          isCorrect: true,
          action: "start_game"
        }
      ]
    },

    // GAME 1: SCHOOL CHOICE (DECISION PUZZLE)
    {
      id: "school_pencil",
      category: "DECISION PUZZLE",
      title: "School Choice: The Pencil",
      bgClass: "bg-classroom",
      characters: { riya: "think", star: "point", john: null, extra: { type: "teacher", name: "Teacher 👩‍🏫" } },
      dialogue: {
        speaker: "Little Star",
        avatar: "⭐",
        text: "Look, a pencil is lying on the floor! What should Riya do?"
      },
      choices: [
        {
          id: "pick_pencil",
          title: "Pick it up and give it to Teacher ✏️",
          desc: "Help keep our classroom tidy and care for our things!",
          icon: "✏️",
          isCorrect: true,
          voiceFeedback: "That's the right choice! Picking up the pencil helps everyone.",
          riyaAnim: "happy",
          teacherAnim: "happy"
        },
        {
          id: "throw_pencil",
          title: "Throw the pencil away ❌",
          desc: "Leave it on the floor or throw it.",
          icon: "🚫",
          isCorrect: false,
          gentleHint: "Let's think again! We should care for our classroom supplies.",
          voiceFeedback: "Let's think again. Who can we give the pencil to?"
        }
      ]
    },

    // GAME 2: CLEAN HANDS (INTERACTIVE SEQUENCE MINI-GAME)
    {
      id: "clean_hands",
      category: "INTERACTIVE SEQUENCE",
      title: "Clean Hands Before Eating",
      bgClass: "bg-kitchen-sink",
      characters: { riya: "think", star: "point", john: null, extra: null },
      interactiveType: "handwash",
      dialogue: {
        speaker: "Little Star",
        avatar: "⭐",
        text: "Riya is ready to eat delicious snacks. What should she do first?"
      },
      choices: [
        {
          id: "wash_hands",
          title: "Wash Hands with Soap 🧼",
          desc: "Keep our hands clean, healthy and fresh!",
          icon: "🧼",
          isCorrect: true,
          voiceFeedback: "Wash your hands! Let's do the 5 steps together!",
          startMiniGame: true
        },
        {
          id: "eat_dirty",
          title: "Eat without washing 🍎",
          desc: "Eat with germs on hands.",
          icon: "🦠",
          isCorrect: false,
          gentleHint: "Washing hands keeps germs away before we eat!",
          voiceFeedback: "Let's think again. Clean hands keep us healthy!"
        }
      ]
    },

    // GAME 3: ROAD SAFETY (SAFETY DECISION GAME)
    {
      id: "road_safety",
      category: "SAFETY DECISION GAME",
      title: "Road Safety: Traffic Light",
      bgClass: "bg-street",
      interactiveType: "traffic_light",
      characters: { riya: "think", star: "point", john: "think", extra: null },
      dialogue: {
        speaker: "Little Star",
        avatar: "⭐",
        text: "The traffic light is RED. What should Riya and John do?"
      },
      choices: [
        {
          id: "wait_light",
          title: "WAIT for the Green Light 🛑",
          desc: "Stay safe on the sidewalk until it turns green!",
          icon: "🚦",
          isCorrect: true,
          voiceFeedback: "Good waiting! When the light turns green, it is safe to cross.",
          riyaAnim: "happy"
        },
        {
          id: "cross_red",
          title: "Cross the road right now 🏃",
          desc: "Run while light is red.",
          icon: "⚠️",
          isCorrect: false,
          gentleHint: "Always wait for the green light to cross safely!",
          voiceFeedback: "Wait for the green light! Red means stop."
        }
      ]
    },

    // GAME 4: SHARING (SOCIAL DECISION GAME)
    {
      id: "sharing_toys",
      category: "SOCIAL DECISION GAME",
      title: "Sharing with Friends",
      bgClass: "bg-playroom",
      characters: { riya: "think", star: "point", john: "idle", extra: null },
      dialogue: {
        speaker: "Little Star",
        avatar: "⭐",
        text: "Riya has two toys. John wants to play too. What should Riya do?"
      },
      choices: [
        {
          id: "share_toy",
          title: "Share a toy with John ❤️",
          desc: "Give John a toy so both friends can play together!",
          icon: "🧸",
          isCorrect: true,
          voiceFeedback: "Sharing is kind! Friends have more fun together.",
          riyaAnim: "happy",
          johnAnim: "happy"
        },
        {
          id: "keep_all",
          title: "Keep all toys to herself 🔒",
          desc: "Do not share with John.",
          icon: "🙅",
          isCorrect: false,
          gentleHint: "Sharing makes our friends happy and playtime fun!",
          voiceFeedback: "Let's think again. Sharing brings smiles!"
        }
      ]
    },

    // GAME 5: KEEP OUR WORLD CLEAN (CLEANLINESS PUZZLE)
    {
      id: "clean_world",
      category: "CLEANLINESS PUZZLE",
      title: "Keep Our World Clean",
      bgClass: "bg-park",
      interactiveType: "litter_bin",
      characters: { riya: "think", star: "point", john: null, extra: null },
      dialogue: {
        speaker: "Little Star",
        avatar: "⭐",
        text: "Riya finished her snack in the park. What should she do with the wrapper?"
      },
      choices: [
        {
          id: "put_in_bin",
          title: "Put it in the Recycle Bin 🗑️",
          desc: "Keep our park green, clean, and beautiful!",
          icon: "🗑️",
          isCorrect: true,
          voiceFeedback: "Great! Keep our world clean!",
          riyaAnim: "happy"
        },
        {
          id: "drop_ground",
          title: "Throw it on the ground 🍃",
          desc: "Leave trash on the grass.",
          icon: "🚯",
          isCorrect: false,
          gentleHint: "Litter belongs in the dustbin to protect nature!",
          voiceFeedback: "Let's think again. The green bin helps keep the park clean."
        }
      ]
    },

    // GAME 6: BE KIND TO ANIMALS (KINDNESS DECISION)
    {
      id: "kind_to_animals",
      category: "KINDNESS DECISION",
      title: "Be Kind to Animals",
      bgClass: "bg-park",
      characters: { riya: "think", star: "point", john: null, extra: { type: "dog", name: "Buddy 🐶" } },
      dialogue: {
        speaker: "Little Star",
        avatar: "⭐",
        text: "Riya meets a friendly puppy! What should Riya do?"
      },
      choices: [
        {
          id: "pet_gentle",
          title: "Gently pet and care for the puppy 🐶",
          desc: "Be soft, friendly, and kind to animal friends!",
          icon: "🐾",
          isCorrect: true,
          voiceFeedback: "Be kind to animals! Look how happy Buddy is!",
          riyaAnim: "happy"
        },
        {
          id: "pull_tail",
          title: "Pull the puppy's tail 🐕",
          desc: "Tease or pull gently.",
          icon: "⚠️",
          isCorrect: false,
          gentleHint: "Animals feel pain too. Always be gentle and loving!",
          voiceFeedback: "Let's think again. We must always be gentle with pets."
        }
      ]
    },

    // GAME 7: LISTENING TO TEACHER (SCHOOL BEHAVIOR)
    {
      id: "listening_teacher",
      category: "SCHOOL BEHAVIOR",
      title: "Listening to Teacher",
      bgClass: "bg-classroom",
      characters: { riya: "think", star: "point", john: null, extra: { type: "teacher", name: "Teacher 👩‍🏫" } },
      dialogue: {
        speaker: "Little Star",
        avatar: "⭐",
        text: "Teacher is teaching a fun lesson. What should Riya do?"
      },
      choices: [
        {
          id: "listen_teacher",
          title: "Listen carefully to Teacher 👂",
          desc: "Pay attention and learn exciting new things!",
          icon: "👩‍🏫",
          isCorrect: true,
          voiceFeedback: "Listening helps us learn and grow smarter!",
          riyaAnim: "happy"
        },
        {
          id: "play_toy_class",
          title: "Play with a toy and ignore 🧸",
          desc: "Distract herself during lesson.",
          icon: "🪀",
          isCorrect: false,
          gentleHint: "Listening to our teacher helps us do our best in school!",
          voiceFeedback: "Let's think again. Listening to teacher is the right choice."
        }
      ]
    },

    // GAME 8: WAITING FOR YOUR TURN (SOCIAL SKILLS)
    {
      id: "taking_turns",
      category: "SOCIAL SKILLS",
      title: "Waiting for Your Turn",
      bgClass: "bg-playroom",
      characters: { riya: "think", star: "point", john: "idle", extra: null },
      dialogue: {
        speaker: "Little Star",
        avatar: "⭐",
        text: "Riya and John are playing a game. John's turn is active. What should Riya do?"
      },
      choices: [
        {
          id: "wait_turn",
          title: "Wait patiently for her turn ⏳",
          desc: "Cheer for John and wait until it's her turn to play!",
          icon: "⏳",
          isCorrect: true,
          voiceFeedback: "Good waiting! Taking turns makes games fair and fun.",
          riyaAnim: "happy",
          johnAnim: "happy"
        },
        {
          id: "snatch_game",
          title: "Take the game away 🚫",
          desc: "Snatch the pieces right now.",
          icon: "🛑",
          isCorrect: false,
          gentleHint: "Taking turns ensures everyone has fun playing fairly!",
          voiceFeedback: "Let's think again. Waiting for our turn is fair and kind."
        }
      ]
    },

    // GAME 9: SAYING PLEASE AND THANK YOU (SOCIAL DECISION)
    {
      id: "please_thankyou",
      category: "SOCIAL DECISION",
      title: "Saying Please and Thank You",
      bgClass: "bg-classroom",
      characters: { riya: "think", star: "point", john: "happy", extra: null },
      dialogue: {
        speaker: "Little Star",
        avatar: "⭐",
        text: "John kindly gives Riya a pencil. What should Riya say?"
      },
      choices: [
        {
          id: "say_thankyou",
          title: 'Say "Thank you, John!" 💬',
          desc: "Use magic polite words with friends!",
          icon: "💬",
          isCorrect: true,
          voiceFeedback: "Kind words make everyone feel loved! Thank you, John!",
          riyaAnim: "happy",
          johnAnim: "happy"
        },
        {
          id: "walk_away",
          title: "Take it and walk away silently 🚶",
          desc: "Say nothing.",
          icon: "🤐",
          isCorrect: false,
          gentleHint: "Saying Thank You shows appreciation to kind friends!",
          voiceFeedback: "Let's think again. What magic word should we say?"
        }
      ]
    },

    // GAME 10: FIX THE WRONG (THE MAIN WOW MECHANIC)
    {
      id: "fix_the_wrong",
      category: "MAIN WOW MECHANIC",
      title: "Fix The Wrong: Room Makeover",
      bgClass: "bg-playroom",
      interactiveType: "fix_room",
      characters: { riya: "think", star: "point", john: "idle", extra: null },
      dialogue: {
        speaker: "Little Star",
        avatar: "⭐",
        text: "Something is not right in this room! Can you tap each messy thing to FIX IT?"
      },
      choices: [] // Choices rendered via interactive room items
    }
  ];

  // =========================================================================
  // CORE GAME ENGINE
  // =========================================================================
  class GameEngine {
    constructor() {
      this.sound = new SoundSynthesizer();
      this.voice = new VoiceNarrator();
      this.currentSceneIdx = 0;
      this.starsCount = 0;
      this.isProcessingChoice = false;
      this.completedScenes = new Set();
      this.handwashStep = 0;
      this.fixRoomItemsFixed = 0;

      // DOM Elements
      this.elStarCounter = document.getElementById('star-counter-val');
      this.elStarMiniDots = document.getElementById('star-mini-dots');
      this.elSceneContainer = document.getElementById('scene-container');
      this.elBgLayer = document.getElementById('bg-layer');
      this.elParticleContainer = document.getElementById('particle-container');
      this.elDialogueBox = document.getElementById('dialogue-box');
      this.elSpeakerAvatar = document.getElementById('speaker-avatar');
      this.elSpeakerName = document.getElementById('speaker-name');
      this.elDialogueText = document.getElementById('dialogue-text');
      this.elChoiceContainer = document.getElementById('choice-container');
      this.elInteractiveStage = document.getElementById('interactive-stage');
      this.elActionBanner = document.getElementById('action-banner');
      this.btnNextStep = document.getElementById('btn-next-step');

      // Character elements
      this.elCharRiya = document.getElementById('char-riya');
      this.elCharJohn = document.getElementById('char-john');
      this.elCharStar = document.getElementById('char-little-star');
      this.elCharExtra = document.getElementById('char-extra');
      this.elExtraSvgWrap = document.getElementById('extra-actor-svg-wrap');
      this.elExtraNameBadge = document.getElementById('extra-name-badge');

      // Modals
      this.modalMagicDoor = document.getElementById('modal-magic-door');
      this.modalCelebration = document.getElementById('modal-celebration');
      this.modalPlayground = document.getElementById('modal-playground');
      this.btnUnlockDoor = document.getElementById('btn-unlock-door');
      this.btnReplayAdventure = document.getElementById('btn-replay-adventure');
      this.btnOpenPlayground = document.getElementById('btn-open-playground');
      this.btnClosePlayground = document.getElementById('btn-close-playground');

      // HUD Buttons
      this.btnReplayVoice = document.getElementById('btn-replay-voice');
      this.btnMusicToggle = document.getElementById('btn-music-toggle');
      this.musicBtnIcon = document.getElementById('music-btn-icon');
      this.btnPlaygroundNav = document.getElementById('btn-playground-nav');
      this.btnFullscreen = document.getElementById('btn-fullscreen');
      this.dialogueSpeakBtn = document.getElementById('dialogue-speak-btn');

      this.confettiCanvas = document.getElementById('confetti-canvas');
      this.confettiCtx = this.confettiCanvas.getContext('2d');
      this.confettiParticles = [];
      this.isConfettiActive = false;

      this.initEvents();
      this.initStarMiniDots();
      this.initConfetti();
      this.loadScene(0);
    }

    initEvents() {
      // Voice Repeat
      this.btnReplayVoice.addEventListener('click', () => {
        this.sound.playBubblePop();
        this.voice.repeatLast();
      });
      this.dialogueSpeakBtn.addEventListener('click', () => {
        this.sound.playBubblePop();
        this.voice.repeatLast();
      });

      // Sound Toggle
      this.btnMusicToggle.addEventListener('click', () => {
        const enabled = this.sound.toggle();
        this.musicBtnIcon.textContent = enabled ? '🎵' : '🔇';
      });

      // Playground Nav
      this.btnPlaygroundNav.addEventListener('click', () => {
        this.sound.playBubblePop();
        this.showPlayground();
      });
      this.btnClosePlayground.addEventListener('click', () => {
        this.sound.playBubblePop();
        this.modalPlayground.style.display = 'none';
      });

      // Fullscreen Toggle
      this.btnFullscreen.addEventListener('click', () => {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(() => {});
        } else {
          document.exitFullscreen().catch(() => {});
        }
      });

      // Little Star Tap Interaction
      this.elCharStar.addEventListener('click', () => {
        this.sound.playSparkle();
        this.createParticleBurst(100, 100, '⭐', 8);
        this.voice.speak("I'm Little Star! You are doing great!");
      });

      // Riya Tap Interaction
      this.elCharRiya.addEventListener('click', () => {
        this.sound.playBubblePop();
        this.setActorState(this.elCharRiya, 'happy');
        this.voice.speak("Yay! Let's choose the right path!");
      });

      // Next Scene Button
      this.btnNextStep.addEventListener('click', () => {
        this.sound.playBubblePop();
        this.elActionBanner.style.display = 'none';
        this.nextScene();
      });

      // Magic Door Unlock
      this.btnUnlockDoor.addEventListener('click', () => {
        this.unlockMagicDoor();
      });

      // Replay Adventure
      this.btnReplayAdventure.addEventListener('click', () => {
        this.sound.playBubblePop();
        this.modalCelebration.style.display = 'none';
        this.starsCount = 0;
        this.completedScenes.clear();
        this.updateStarHUD();
        this.loadScene(0);
      });

      // Open Playground from celebration
      this.btnOpenPlayground.addEventListener('click', () => {
        this.sound.playBubblePop();
        this.modalCelebration.style.display = 'none';
        this.showPlayground();
      });
    }

    initStarMiniDots() {
      this.elStarMiniDots.innerHTML = '';
      for (let i = 0; i < 10; i++) {
        const dot = document.createElement('div');
        dot.className = 'mini-star-dot';
        dot.dataset.starIdx = i;
        this.elStarMiniDots.appendChild(dot);
      }
    }

    updateStarHUD() {
      this.elStarCounter.textContent = this.starsCount;
      const dots = this.elStarMiniDots.querySelectorAll('.mini-star-dot');
      dots.forEach((d, idx) => {
        if (idx < this.starsCount) {
          d.classList.add('active');
        } else {
          d.classList.remove('active');
        }
      });
    }

    setActorState(actorEl, state) {
      if (!actorEl) return;
      actorEl.className = actorEl.className.replace(/\bstate-\w+/g, '');
      actorEl.classList.add(`state-${state}`);
    }

    loadScene(sceneIdx) {
      if (sceneIdx < 0 || sceneIdx >= SCENES.length) return;
      this.currentSceneIdx = sceneIdx;
      const scene = SCENES[sceneIdx];

      this.isProcessingChoice = false;
      this.elActionBanner.style.display = 'none';
      this.elInteractiveStage.innerHTML = '';

      // Update Scene Background Class
      this.elSceneContainer.className = `scene-container ${scene.bgClass}`;

      // Configure Characters Visibility & State
      this.setActorState(this.elCharRiya, scene.characters.riya || 'idle');
      this.setActorState(this.elCharStar, scene.characters.star || 'float');

      if (scene.characters.john) {
        this.elCharJohn.style.display = 'block';
        this.setActorState(this.elCharJohn, scene.characters.john);
      } else {
        this.elCharJohn.style.display = 'none';
      }

      if (scene.characters.extra) {
        this.elCharExtra.style.display = 'block';
        this.elExtraNameBadge.textContent = scene.characters.extra.name;
        if (scene.characters.extra.type === 'teacher') {
          this.elExtraSvgWrap.innerHTML = getTeacherSVG();
        } else if (scene.characters.extra.type === 'dog') {
          this.elExtraSvgWrap.innerHTML = getDogSVG();
        }
        this.setActorState(this.elCharExtra, 'idle');
      } else {
        this.elCharExtra.style.display = 'none';
      }

      // Update Dialogue Box
      this.elSpeakerAvatar.textContent = scene.dialogue.avatar;
      this.elSpeakerName.textContent = scene.dialogue.speaker;
      this.elDialogueText.textContent = scene.dialogue.text;

      // Speak Dialogue
      this.voice.speak(scene.dialogue.text);

      // Render Choice Deck / Mini-game
      if (scene.interactiveType === 'fix_room') {
        this.renderFixRoomMiniGame();
      } else {
        this.renderChoiceDeck(scene.choices);
      }
    }

    renderChoiceDeck(choices) {
      this.elChoiceContainer.innerHTML = '';
      if (!choices || choices.length === 0) return;

      choices.forEach((c) => {
        const card = document.createElement('div');
        card.className = 'choice-card';
        card.innerHTML = `
          <div class="choice-icon-wrap">${c.icon}</div>
          <div class="choice-text-wrap">
            <div class="choice-title">${c.title}</div>
            <div class="choice-desc">${c.desc}</div>
          </div>
        `;
        card.addEventListener('click', () => this.handleChoiceClick(c, card));
        this.elChoiceContainer.appendChild(card);
      });
    }

    handleChoiceClick(choice, cardEl) {
      if (this.isProcessingChoice) return;

      if (choice.action === 'start_game') {
        this.sound.playSparkle();
        this.loadScene(1);
        return;
      }

      if (choice.isCorrect) {
        this.handleCorrectChoice(choice, cardEl);
      } else {
        this.handleGentleWrongChoice(choice, cardEl);
      }
    }

    handleCorrectChoice(choice, cardEl) {
      this.isProcessingChoice = true;
      cardEl.classList.add('is-correct');
      this.sound.playCorrect();

      // Spawn celebratory particles
      const rect = cardEl.getBoundingClientRect();
      this.createParticleBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, '✨', 10);
      this.createParticleBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, '🌟', 8);

      // Trigger character animations
      this.setActorState(this.elCharRiya, choice.riyaAnim || 'happy');
      this.setActorState(this.elCharStar, 'celebrate');
      if (choice.johnAnim) this.setActorState(this.elCharJohn, choice.johnAnim);

      // Extra special actions
      if (this.currentSceneIdx === 2 && choice.startMiniGame) {
        // Game 2: Launch Handwashing sequence
        this.launchHandwashSequence();
        return;
      }

      if (this.currentSceneIdx === 3) {
        // Game 3: Road Safety Green Light Animation
        this.renderTrafficAnimation();
      }

      if (this.currentSceneIdx === 4) {
        // Game 4: Sharing Heart Particles
        this.createParticleBurst(window.innerWidth / 2, window.innerHeight / 2, '💖', 12);
      }

      if (this.currentSceneIdx === 5) {
        // Game 5: Litter to Bin
        this.renderLitterBinSequence();
        return;
      }

      if (this.currentSceneIdx === 6) {
        // Game 6: Dog happy bark & wagging
        this.sound.playDogBark();
        this.createParticleBurst(window.innerWidth * 0.75, window.innerHeight * 0.5, '❤️', 8);
      }

      // Add star if not already completed
      if (!this.completedScenes.has(this.currentSceneIdx) && this.currentSceneIdx > 0) {
        this.completedScenes.add(this.currentSceneIdx);
        this.starsCount = Math.min(10, this.starsCount + 1);
        this.updateStarHUD();
      }

      // Voice Feedback
      this.elDialogueText.textContent = choice.voiceFeedback;
      this.voice.speak(choice.voiceFeedback, () => {
        this.showNextActionButton();
      });
    }

    handleGentleWrongChoice(choice, cardEl) {
      // Pedagogical gentle hint (NO red X, NO game over)
      this.sound.playGentleHint();
      cardEl.classList.add('is-gentle-hint');
      setTimeout(() => cardEl.classList.remove('is-gentle-hint'), 600);

      this.setActorState(this.elCharStar, 'think');
      this.setActorState(this.elCharRiya, 'think');

      this.elDialogueText.textContent = choice.gentleHint;
      this.voice.speak(choice.voiceFeedback);
    }

    showNextActionButton() {
      this.elActionBanner.style.display = 'block';
      if (this.currentSceneIdx === SCENES.length - 1) {
        this.btnNextStep.innerHTML = '<span>✨ The Magic Door! 🚪✨</span>';
      } else {
        this.btnNextStep.innerHTML = '<span>Next Adventure! 🚀</span>';
      }
    }

    nextScene() {
      if (this.currentSceneIdx < SCENES.length - 1) {
        this.loadScene(this.currentSceneIdx + 1);
      } else {
        // Final WOW Moment: Magic Choice Door!
        this.showMagicChoiceDoor();
      }
    }

    // =========================================================================
    // MINI-GAME: CLEAN HANDS 5-STEP SEQUENCE
    // =========================================================================
    launchHandwashSequence() {
      this.handwashStep = 1;
      this.elChoiceContainer.innerHTML = '';
      this.elInteractiveStage.innerHTML = `
        <div class="sink-game-wrap" id="sink-game-wrap">
          <div class="sink-faucet-box" id="sink-faucet-box">
            <div class="faucet-icon" id="faucet-icon">🚰</div>
            <div class="water-flow-stream" id="water-stream"></div>
          </div>
          <div class="handwash-steps-deck" id="handwash-steps-deck">
            <button class="hw-step-btn" id="hw-step-1"><span>1. Tap Faucet</span><span>🚰</span></button>
            <button class="hw-step-btn" id="hw-step-2" disabled><span>2. Use Soap</span><span>🧴</span></button>
            <button class="hw-step-btn" id="hw-step-3" disabled><span>3. Rub Suds</span><span>🫧</span></button>
            <button class="hw-step-btn" id="hw-step-4" disabled><span>4. Rinse</span><span>💧</span></button>
            <button class="hw-step-btn" id="hw-step-5" disabled><span>5. Sparkle Clean</span><span>✨</span></button>
          </div>
        </div>
      `;

      this.elDialogueText.textContent = "Step 1: Tap the faucet to turn on clean water!";
      this.voice.speak("Step 1: Turn on the water!");

      const btn1 = document.getElementById('hw-step-1');
      const btn2 = document.getElementById('hw-step-2');
      const btn3 = document.getElementById('hw-step-3');
      const btn4 = document.getElementById('hw-step-4');
      const btn5 = document.getElementById('hw-step-5');
      const waterStream = document.getElementById('water-stream');
      const faucetBox = document.getElementById('sink-faucet-box');

      const triggerStep1 = () => {
        if (this.handwashStep !== 1) return;
        this.handwashStep = 2;
        this.sound.playWaterSplash();
        waterStream.classList.add('flowing');
        btn1.classList.add('completed');
        btn1.disabled = true;
        btn2.disabled = false;
        this.elDialogueText.textContent = "Step 2: Tap the soap pump for bubbly lather!";
        this.voice.speak("Step 2: Use soap!");
      };

      btn1.addEventListener('click', triggerStep1);
      faucetBox.addEventListener('click', triggerStep1);

      btn2.addEventListener('click', () => {
        if (this.handwashStep !== 2) return;
        this.handwashStep = 3;
        this.sound.playBubblePop();
        this.createParticleBurst(window.innerWidth / 2, window.innerHeight * 0.35, '🫧', 8);
        btn2.classList.add('completed');
        btn2.disabled = true;
        btn3.disabled = false;
        this.elDialogueText.textContent = "Step 3: Rub your hands together with gentle bubbles!";
        this.voice.speak("Step 3: Rub your hands!");
      });

      btn3.addEventListener('click', () => {
        if (this.handwashStep !== 3) return;
        this.handwashStep = 4;
        this.sound.playBubblePop();
        this.createParticleBurst(window.innerWidth / 2, window.innerHeight * 0.35, '🧼', 8);
        btn3.classList.add('completed');
        btn3.disabled = true;
        btn4.disabled = false;
        this.elDialogueText.textContent = "Step 4: Rinse away all germs under clean water!";
        this.voice.speak("Step 4: Rinse your hands!");
      });

      btn4.addEventListener('click', () => {
        if (this.handwashStep !== 4) return;
        this.handwashStep = 5;
        this.sound.playWaterSplash();
        btn4.classList.add('completed');
        btn4.disabled = true;
        btn5.disabled = false;
        this.elDialogueText.textContent = "Step 5: Tap to see clean, sparkling hands!";
        this.voice.speak("Step 5: Clean sparkling hands!");
      });

      btn5.addEventListener('click', () => {
        if (this.handwashStep !== 5) return;
        this.handwashStep = 6;
        btn5.classList.add('completed');
        btn5.disabled = true;
        this.sound.playSparkle();
        this.createParticleBurst(window.innerWidth / 2, window.innerHeight * 0.35, '✨', 16);

        if (!this.completedScenes.has(2)) {
          this.completedScenes.add(2);
          this.starsCount = Math.min(10, this.starsCount + 1);
          this.updateStarHUD();
        }

        this.elDialogueText.textContent = "Clean hands! Now Riya can eat safely!";
        this.voice.speak("Clean hands! Wonderful job!", () => {
          this.showNextActionButton();
        });
      });
    }

    // =========================================================================
    // MINI-GAME: ROAD SAFETY GREEN LIGHT ANIMATION
    // =========================================================================
    renderTrafficAnimation() {
      this.elChoiceContainer.innerHTML = '';
      this.elInteractiveStage.innerHTML = `
        <div class="traffic-game-wrap">
          <div class="traffic-post">
            <div class="light-bulb red" id="light-red"></div>
            <div class="light-bulb yellow" id="light-yellow"></div>
            <div class="light-bulb green active" id="light-green"></div>
          </div>
          <div class="crossing-zebra">
            <div class="zebra-stripe"></div>
            <div class="zebra-stripe"></div>
            <div class="zebra-stripe"></div>
            <div class="zebra-stripe"></div>
          </div>
        </div>
      `;

      // Animate characters crossing
      this.setActorState(this.elCharRiya, 'walk');
      this.setActorState(this.elCharJohn, 'walk');
    }

    // =========================================================================
    // MINI-GAME: LITTER TO RECYCLE BIN
    // =========================================================================
    renderLitterBinSequence() {
      this.elChoiceContainer.innerHTML = '';
      this.elInteractiveStage.innerHTML = `
        <div class="bin-game-wrap" id="bin-game-wrap">
          <div class="litter-wrapper-item" id="litter-item" title="Tap or drag into bin!">🍬</div>
          <div class="recycle-bin-target" id="recycle-bin">
            <div class="bin-icon">🗑️</div>
            <div class="bin-label">Recycle Bin</div>
          </div>
        </div>
      `;

      this.elDialogueText.textContent = "Tap the candy wrapper to put it in the green recycle bin!";
      this.voice.speak("Tap the wrapper to put it in the bin!");

      const wrapper = document.getElementById('litter-item');
      const bin = document.getElementById('recycle-bin');

      const cleanUp = () => {
        if (!wrapper || wrapper.style.display === 'none') return;
        wrapper.style.transform = 'scale(0) rotate(180deg)';
        setTimeout(() => {
          wrapper.style.display = 'none';
        }, 300);

        this.sound.playSparkle();
        bin.classList.add('hovered');
        this.createParticleBurst(window.innerWidth / 2, window.innerHeight * 0.4, '🌸', 12);
        this.createParticleBurst(window.innerWidth / 2, window.innerHeight * 0.4, '🦋', 8);

        if (!this.completedScenes.has(5)) {
          this.completedScenes.add(5);
          this.starsCount = Math.min(10, this.starsCount + 1);
          this.updateStarHUD();
        }

        this.elDialogueText.textContent = "Great! The park is clean, blooming, and happy!";
        this.voice.speak("Great! Keep our world clean!", () => {
          this.showNextActionButton();
        });
      };

      wrapper.addEventListener('click', cleanUp);
      bin.addEventListener('click', cleanUp);
    }

    // =========================================================================
    // MINI-GAME 10: FIX THE WRONG (THE MAIN WOW MECHANIC)
    // =========================================================================
    renderFixRoomMiniGame() {
      this.fixRoomItemsFixed = 0;
      this.elChoiceContainer.innerHTML = '';
      this.elInteractiveStage.innerHTML = `
        <div class="fix-room-grid" id="fix-room-grid">
          <div class="messy-item-card" id="fix-item-1">
            <div class="messy-icon">🍬</div>
            <div class="messy-title">Wrapper on Floor</div>
            <button class="messy-fix-btn">Fix to Bin 🗑️</button>
          </div>
          <div class="messy-item-card" id="fix-item-2">
            <div class="messy-icon">✏️</div>
            <div class="messy-title">Pencil on Floor</div>
            <button class="messy-fix-btn">Fix to Desk ✏️</button>
          </div>
          <div class="messy-item-card" id="fix-item-3">
            <div class="messy-icon">🧸</div>
            <div class="messy-title">Toy in Walkway</div>
            <button class="messy-fix-btn">Fix to Toybox 📦</button>
          </div>
        </div>
      `;

      const item1 = document.getElementById('fix-item-1');
      const item2 = document.getElementById('fix-item-2');
      const item3 = document.getElementById('fix-item-3');

      const handleItemFix = (card, icon, title, fixedText) => {
        if (card.classList.contains('fixed')) return;
        card.classList.add('fixed');
        this.sound.playSparkle();
        this.fixRoomItemsFixed++;

        const rect = card.getBoundingClientRect();
        this.createParticleBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, '✨', 10);

        card.querySelector('.messy-title').textContent = fixedText;
        card.querySelector('.messy-fix-btn').textContent = '✅ Fixed!';

        if (this.fixRoomItemsFixed === 3) {
          // All 3 fixed! Room transformation WOW moment!
          this.sound.playFanfare();
          this.createParticleBurst(window.innerWidth / 2, window.innerHeight / 2, '🌟', 20);

          if (!this.completedScenes.has(9)) {
            this.completedScenes.add(9);
            this.starsCount = 10;
            this.updateStarHUD();
          }

          this.elDialogueText.textContent = "Hooray! You fixed everything! The room is shining clean!";
          this.voice.speak("Hooray! You fixed everything! Right choices make our world shine!", () => {
            this.showNextActionButton();
          });
        } else {
          this.voice.speak("Great fixing! Can you fix the next one?");
        }
      };

      item1.addEventListener('click', () => handleItemFix(item1, '🗑️', 'Wrapper on Floor', 'In the Bin! ✨'));
      item2.addEventListener('click', () => handleItemFix(item2, '📚', 'Pencil on Floor', 'On the Desk! ✨'));
      item3.addEventListener('click', () => handleItemFix(item3, '📦', 'Toy in Walkway', 'In Toy Box! ✨'));
    }

    // =========================================================================
    // FINAL WOW MOMENT: THE MAGIC CHOICE DOOR
    // =========================================================================
    showMagicChoiceDoor() {
      this.sound.playSparkle();
      this.modalMagicDoor.style.display = 'flex';

      const gems = document.querySelectorAll('.door-badge-gem');
      gems.forEach((gem, idx) => {
        setTimeout(() => {
          gem.classList.add('lit');
          this.sound.playSparkle();
        }, idx * 250);
      });

      this.voice.speak("Look at the Magic Choice Door! All your good choices have lit up the magical gems!");
    }

    unlockMagicDoor() {
      this.btnUnlockDoor.style.display = 'none';
      const doorFrame = document.getElementById('door-frame');
      doorFrame.classList.add('open');
      this.sound.playFanfare();

      this.startConfetti();

      this.voice.speak("The Magic Door is open! We made so many good choices! You are a Choice Champion!", () => {
        setTimeout(() => {
          this.modalMagicDoor.style.display = 'none';
          this.showCelebrationModal();
        }, 2200);
      });
    }

    showCelebrationModal() {
      this.modalCelebration.style.display = 'flex';
      this.sound.playFanfare();
      this.startConfetti();
    }

    // =========================================================================
    // CHOICE PLAYGROUND (FREE PLAY MODE)
    // =========================================================================
    showPlayground() {
      const grid = document.getElementById('playground-grid');
      grid.innerHTML = '';

      SCENES.forEach((s, idx) => {
        if (idx === 0) return; // Skip opening in free play grid
        const card = document.createElement('div');
        card.className = 'playground-scene-card';
        card.innerHTML = `
          <div class="pg-icon">${s.choices && s.choices[0] ? s.choices[0].icon : '✨'}</div>
          <div class="pg-title">${s.title}</div>
          <div class="pg-category">${s.category}</div>
        `;
        card.addEventListener('click', () => {
          this.sound.playBubblePop();
          this.modalPlayground.style.display = 'none';
          this.modalCelebration.style.display = 'none';
          this.loadScene(idx);
        });
        grid.appendChild(card);
      });

      this.modalPlayground.style.display = 'flex';
      this.voice.speak("Welcome to the Choice Playground! Pick any situation to practice your good choices!");
    }

    // =========================================================================
    // PARTICLE & CONFETTI ENGINE
    // =========================================================================
    createParticleBurst(x, y, emoji, count = 8) {
      for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'floating-sparkle';
        p.textContent = emoji;
        p.style.left = `${x + (Math.random() * 80 - 40)}px`;
        p.style.top = `${y + (Math.random() * 60 - 30)}px`;
        p.style.fontSize = `${1.4 + Math.random() * 1.2}rem`;
        this.elParticleContainer.appendChild(p);

        setTimeout(() => {
          if (p.parentNode) p.parentNode.removeChild(p);
        }, 2200);
      }
    }

    initConfetti() {
      const resize = () => {
        this.confettiCanvas.width = window.innerWidth;
        this.confettiCanvas.height = window.innerHeight;
      };
      window.addEventListener('resize', resize);
      resize();
    }

    startConfetti() {
      this.confettiParticles = [];
      const colors = ['#FF5E8E', '#FFD124', '#3FA9F5', '#00C853', '#B388FF', '#FF9800'];
      for (let i = 0; i < 120; i++) {
        this.confettiParticles.push({
          x: Math.random() * this.confettiCanvas.width,
          y: Math.random() * this.confettiCanvas.height - this.confettiCanvas.height,
          w: 8 + Math.random() * 10,
          h: 12 + Math.random() * 12,
          color: colors[Math.floor(Math.random() * colors.length)],
          vx: Math.random() * 4 - 2,
          vy: 3 + Math.random() * 6,
          rot: Math.random() * 360,
          vrot: Math.random() * 6 - 3
        });
      }

      if (!this.isConfettiActive) {
        this.isConfettiActive = true;
        this.renderConfetti();
      }

      setTimeout(() => {
        this.isConfettiActive = false;
      }, 6000);
    }

    renderConfetti() {
      if (!this.isConfettiActive) {
        this.confettiCtx.clearRect(0, 0, this.confettiCanvas.width, this.confettiCanvas.height);
        return;
      }

      this.confettiCtx.clearRect(0, 0, this.confettiCanvas.width, this.confettiCanvas.height);
      this.confettiParticles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vrot;

        if (p.y > this.confettiCanvas.height) {
          p.y = -20;
          p.x = Math.random() * this.confettiCanvas.width;
        }

        this.confettiCtx.save();
        this.confettiCtx.translate(p.x, p.y);
        this.confettiCtx.rotate((p.rot * Math.PI) / 180);
        this.confettiCtx.fillStyle = p.color;
        this.confettiCtx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        this.confettiCtx.restore();
      });

      requestAnimationFrame(() => this.renderConfetti());
    }
  }

  // =========================================================================
  // BOOTSTRAP GAME
  // =========================================================================
  window.addEventListener('DOMContentLoaded', () => {
    window.gameInstance = new GameEngine();
  });

})();
