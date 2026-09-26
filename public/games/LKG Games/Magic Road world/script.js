/**
 * JOHN'S LINE MAGIC ADVENTURE
 * Brand: CHOTAPLAY
 * Pure Vanilla JavaScript ES6+ Engine
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. GAME STATE & CONSTANTS
  // =========================================================================

  const STAGES = {
    INTRO: 'intro',
    STANDING: 'standing',
    SLEEPING: 'sleeping',
    LEFT_SLANT: 'left-slant',
    RIGHT_SLANT: 'right-slant',
    BRUSH: 'brush',
    CELEBRATION: 'celebration'
  };

  const state = {
    currentStage: STAGES.INTRO,
    soundEnabled: true,
    voiceEnabled: true,
    isDrawing: false,
    strokePoints: [],
    hintTimer: null,
    isAnimatingCutscene: false,
    activePointerId: null,
    unlockedItems: {
      tower: false,
      bridge: false,
      slide: false,
      rocket: false
    }
  };

  // DOM Elements Cache
  const elements = {
    container: document.getElementById('game-container'),
    stageBg: document.getElementById('stage-bg'),
    drawCanvas: document.getElementById('draw-canvas'),
    fxCanvas: document.getElementById('fx-canvas'),
    guideOverlay: document.getElementById('guide-overlay'),
    guidePath: document.getElementById('guide-path'),
    magicHand: document.getElementById('magic-hand'),
    successFlash: document.getElementById('success-flash'),
    
    // Characters & Dialogue
    charJohn: document.getElementById('char-john'),
    charStar: document.getElementById('char-star'),
    dialogueBubble: document.getElementById('dialogue-bubble'),
    speakerTag: document.getElementById('speaker-tag'),
    dialogueText: document.getElementById('dialogue-text'),
    toastFeedback: document.getElementById('toast-feedback'),
    toastMessage: document.getElementById('toast-message'),

    // Action Banner
    actionBanner: document.getElementById('action-banner'),
    bannerSymbol: document.getElementById('banner-symbol'),
    instructionTitle: document.getElementById('instruction-title'),
    instructionDesc: document.getElementById('instruction-desc'),
    btnHint: document.getElementById('btn-hint'),
    btnNextStage: document.getElementById('btn-next-stage'),

    // Controls & Navigation
    btnSound: document.getElementById('btn-sound'),
    soundIcon: document.getElementById('sound-icon'),
    btnVoice: document.getElementById('btn-voice'),
    voiceIcon: document.getElementById('voice-icon'),
    btnHome: document.getElementById('btn-home'),
    stageProgress: document.getElementById('stage-progress'),

    // Scene Specific
    btnStartMagic: document.getElementById('btn-start-magic'),
    towerMagical: document.getElementById('tower-magical'),
    towerSilhouette: document.getElementById('tower-silhouette'),
    bridgeMagical: document.getElementById('bridge-magical'),
    bridgeSilhouette: document.getElementById('bridge-silhouette'),
    slideMagical: document.getElementById('slide-magical'),
    slideSilhouette: document.getElementById('slide-silhouette'),
    rocketShip: document.getElementById('rocket-ship'),
    rocketFlame: document.getElementById('rocket-flame'),
    rocketSilhouette: document.getElementById('rocket-silhouette'),
    countdownOverlay: document.getElementById('countdown-overlay'),
    countdownNumber: document.getElementById('countdown-number'),
    sandboxObjects: document.getElementById('sandbox-objects'),
    btnClearBrush: document.getElementById('btn-clear-brush'),
    btnFinishAdventure: document.getElementById('btn-finish-adventure'),
    confettiContainer: document.getElementById('confetti-container'),
    btnPlayAgain: document.getElementById('btn-play-again'),
    btnSandboxMode: document.getElementById('btn-sandbox-mode')
  };

  // Canvas 2D contexts
  let drawCtx = null;
  let fxCtx = null;
  let particles = [];
  let confettiParticles = [];
  let animationFrameId = null;

  // =========================================================================
  // 2. WEB AUDIO API SYNTHESIZER (100% STANDALONE, NO AUDIO FILES NEEDED)
  // =========================================================================

  let audioCtx = null;

  function initAudio() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playTone(freq, duration = 0.15, type = 'sine', gainVal = 0.25) {
    if (!state.soundEnabled) return;
    initAudio();
    if (!audioCtx) return;

    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(gainVal, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      console.warn('Audio playTone error:', e);
    }
  }

  function playPop() {
    playTone(650, 0.08, 'triangle', 0.25);
  }

  function playMagicChime() {
    if (!state.soundEnabled) return;
    initAudio();
    if (!audioCtx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        playTone(freq, 0.35, 'sine', 0.2);
      }, idx * 60);
    });
  }

  function playSuccessFanfare() {
    if (!state.soundEnabled) return;
    initAudio();
    if (!audioCtx) return;

    const chords = [
      { notes: [523.25, 659.25, 783.99], time: 0 },
      { notes: [587.33, 739.99, 880.00], time: 180 },
      { notes: [659.25, 830.61, 987.77], time: 360 },
      { notes: [783.99, 987.77, 1174.66], time: 540 },
      { notes: [1046.50, 1318.51, 1567.98], time: 750 }
    ];

    chords.forEach((c) => {
      setTimeout(() => {
        c.notes.forEach((n) => playTone(n, 0.45, 'triangle', 0.15));
      }, c.time);
    });
  }

  function playSlideWoosh() {
    if (!state.soundEnabled) return;
    initAudio();
    if (!audioCtx) return;

    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(900, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, audioCtx.currentTime + 0.8);

      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.8);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.8);
    } catch (e) {}
  }

  function playRocketBlastOff() {
    if (!state.soundEnabled) return;
    initAudio();
    if (!audioCtx) return;

    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(100, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(600, audioCtx.currentTime + 1.8);

      gain.gain.setValueAtTime(0.35, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 2.0);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 2.0);
    } catch (e) {}
  }

  // =========================================================================
  // 3. WEB SPEECH SYNTHESIS (VOICEOVER)
  // =========================================================================

  let preferredVoice = null;

  function initSpeechVoices() {
    if (!('speechSynthesis' in window)) return;
    const updateVoices = () => {
      try {
        const voices = window.speechSynthesis.getVoices();
        preferredVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Female') || v.name.includes('Samantha') || v.name.includes('Google') || v.name.includes('Natural'))) || voices.find(v => v.lang.startsWith('en')) || null;
      } catch (e) {}
    };
    updateVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }
  }

  function speak(text) {
    if (!state.voiceEnabled) return;
    if (!('speechSynthesis' in window)) return;

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1.15;
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis error:', e);
    }
  }

  // =========================================================================
  // 4. DIALOGUE & TOAST HELPER
  // =========================================================================

  function setDialogue(speaker, text, shouldSpeak = true) {
    elements.speakerTag.textContent = speaker;
    elements.dialogueText.textContent = `"${text}"`;
    elements.dialogueBubble.style.transform = 'scale(1.05)';
    setTimeout(() => {
      elements.dialogueBubble.style.transform = 'scale(1)';
    }, 200);

    if (shouldSpeak) {
      speak(text);
    }
  }

  function showToast(message, icon = '✨') {
    elements.toastMessage.textContent = message;
    elements.toastFeedback.querySelector('.toast-icon').textContent = icon;
    elements.toastFeedback.classList.add('show');
    setTimeout(() => {
      elements.toastFeedback.classList.remove('show');
    }, 2200);
  }

  // =========================================================================
  // 5. CANVAS & PARTICLES ENGINE
  // =========================================================================

  function setupCanvases() {
    drawCtx = elements.drawCanvas.getContext('2d');
    fxCtx = elements.fxCanvas.getContext('2d');
    resizeCanvases();
    window.addEventListener('resize', resizeCanvases);
  }

  function resizeCanvases() {
    const parent = elements.drawCanvas.parentElement;
    if (!parent) return;
    const rect = parent.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    elements.drawCanvas.width = rect.width * dpr;
    elements.drawCanvas.height = rect.height * dpr;
    elements.fxCanvas.width = rect.width * dpr;
    elements.fxCanvas.height = rect.height * dpr;

    drawCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    fxCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function getCanvasCoords(e) {
    const rect = elements.drawCanvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }

  function addSparkle(x, y, color = '#FFE082') {
    for (let i = 0; i < 3; i++) {
      particles.push({
        x: x + (Math.random() - 0.5) * 12,
        y: y + (Math.random() - 0.5) * 12,
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.5) * 3 - 1,
        size: Math.random() * 6 + 3,
        color: color,
        life: 1,
        decay: Math.random() * 0.04 + 0.03
      });
    }
  }

  function addExplosion(x, y, count = 30) {
    const colors = ['#FFD54F', '#FF4081', '#00E676', '#00E5FF', '#D500F9', '#FFFFFF'];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 6 + 2;
      particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 1,
        decay: Math.random() * 0.02 + 0.015
      });
    }
  }

  function addConfettiBurst() {
    const colors = ['#FF1744', '#FFEA00', '#00E676', '#2979FF', '#FF4081', '#FF9100'];
    const w = elements.fxCanvas.width / (window.devicePixelRatio || 1);
    for (let i = 0; i < 40; i++) {
      confettiParticles.push({
        x: Math.random() * w,
        y: -20,
        vx: (Math.random() - 0.5) * 4,
        vy: Math.random() * 4 + 3,
        size: Math.random() * 10 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 10,
        life: 1
      });
    }
  }

  function loopFX() {
    if (!fxCtx) return;
    const w = elements.fxCanvas.width / (window.devicePixelRatio || 1);
    const h = elements.fxCanvas.height / (window.devicePixelRatio || 1);
    fxCtx.clearRect(0, 0, w, h);

    // Update drawing sparkles
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life -= p.decay;

      if (p.life <= 0) {
        particles.splice(i, 1);
        continue;
      }

      fxCtx.save();
      fxCtx.globalAlpha = p.life;
      fxCtx.fillStyle = p.color;
      fxCtx.shadowColor = p.color;
      fxCtx.shadowBlur = 8;
      fxCtx.beginPath();
      fxCtx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
      fxCtx.fill();
      fxCtx.restore();
    }

    // Update Celebration Confetti
    if (state.currentStage === STAGES.CELEBRATION && Math.random() < 0.25) {
      addConfettiBurst();
    }

    for (let i = confettiParticles.length - 1; i >= 0; i--) {
      const c = confettiParticles[i];
      c.x += c.vx;
      c.y += c.vy;
      c.rotation += c.rotSpeed;

      if (c.y > h + 20) {
        confettiParticles.splice(i, 1);
        continue;
      }

      fxCtx.save();
      fxCtx.translate(c.x, c.y);
      fxCtx.rotate((c.rotation * Math.PI) / 180);
      fxCtx.fillStyle = c.color;
      fxCtx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size * 0.6);
      fxCtx.restore();
    }

    animationFrameId = requestAnimationFrame(loopFX);
  }

  // =========================================================================
  // 6. DRAWING INTERACTION (POINTER EVENTS)
  // =========================================================================

  function initDrawing() {
    const canvas = elements.drawCanvas;

    canvas.addEventListener('pointerdown', handlePointerDown);
    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerup', handlePointerUp);
    canvas.addEventListener('pointercancel', handlePointerCancel);
  }

  function handlePointerDown(e) {
    if (state.isAnimatingCutscene) return;
    if (state.currentStage === STAGES.INTRO || state.currentStage === STAGES.CELEBRATION) return;

    initAudio();
    state.isDrawing = true;
    state.activePointerId = e.pointerId;
    state.strokePoints = [];

    try {
      elements.drawCanvas.setPointerCapture(e.pointerId);
    } catch (err) {}

    const coords = getCanvasCoords(e);
    state.strokePoints.push({ x: coords.x, y: coords.y, time: Date.now() });

    drawCtx.lineCap = 'round';
    drawCtx.lineJoin = 'round';
    drawCtx.lineWidth = 14;
    drawCtx.strokeStyle = '#FFD54F';
    drawCtx.shadowColor = '#FF9100';
    drawCtx.shadowBlur = 16;

    drawCtx.beginPath();
    drawCtx.arc(coords.x, coords.y, 7, 0, Math.PI * 2);
    drawCtx.fillStyle = '#FFD54F';
    drawCtx.fill();

    drawCtx.beginPath();
    drawCtx.moveTo(coords.x, coords.y);
    addSparkle(coords.x, coords.y, '#FFF59D');
    hideHintGuide();
  }

  function handlePointerMove(e) {
    if (!state.isDrawing) return;
    if (state.activePointerId !== null && e.pointerId !== state.activePointerId) return;

    const coords = getCanvasCoords(e);
    const lastPoint = state.strokePoints[state.strokePoints.length - 1];

    if (lastPoint) {
      const dist = Math.hypot(coords.x - lastPoint.x, coords.y - lastPoint.y);
      if (dist < 3) return;
    }

    state.strokePoints.push({ x: coords.x, y: coords.y, time: Date.now() });

    drawCtx.lineTo(coords.x, coords.y);
    drawCtx.stroke();

    addSparkle(coords.x, coords.y, '#FFD54F');
  }

  function handlePointerUp(e) {
    if (!state.isDrawing) return;
    state.isDrawing = false;
    state.activePointerId = null;

    try {
      elements.drawCanvas.releasePointerCapture(e.pointerId);
    } catch (err) {}

    if (state.strokePoints.length < 2) {
      clearDrawCanvas();
      return;
    }

    analyzeStroke();
  }

  function handlePointerCancel(e) {
    state.isDrawing = false;
    state.activePointerId = null;
    clearDrawCanvas();
  }

  function clearDrawCanvas() {
    const w = elements.drawCanvas.width / (window.devicePixelRatio || 1);
    const h = elements.drawCanvas.height / (window.devicePixelRatio || 1);
    drawCtx.clearRect(0, 0, w, h);
  }

  // =========================================================================
  // 7. LINE CLASSIFIER (CHILD-FRIENDLY & STAGE-AWARE FOR AGES 3–6)
  // =========================================================================

  function analyzeStroke() {
    const points = state.strokePoints;
    if (!points || points.length < 2) {
      clearDrawCanvas();
      return;
    }

    const start = points[0];
    const end = points[points.length - 1];

    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const totalDist = Math.hypot(dx, dy);

    // Filter tiny taps/jitters (<25px)
    if (totalDist < 25) {
      clearDrawCanvas();
      return;
    }

    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);
    const current = state.currentStage;

    // --- MAGIC BRUSH SANDBOX MODE ---
    if (current === STAGES.BRUSH) {
      handleBrushSandboxStroke(dx, dy, absDx, absDy);
      return;
    }

    // --- STAGE-AWARE CHILD FRIENDLY RECOGNITION ---
    let isCorrect = false;

    if (current === STAGES.STANDING) {
      // Standing Line (Vertical │): Primary vertical movement
      if (absDy >= 30 && (absDy >= absDx * 0.7 || absDx < 50)) {
        isCorrect = true;
        standingSuccess();
      }
    } else if (current === STAGES.SLEEPING) {
      // Sleeping Line (Horizontal ─): Primary horizontal movement
      if (absDx >= 30 && (absDx >= absDy * 0.7 || absDy < 50)) {
        isCorrect = true;
        sleepingSuccess();
      }
    } else if (current === STAGES.LEFT_SLANT) {
      // Left Slanting Line (╲): Top-Left to Bottom-Right or Bottom-Right to Top-Left
      // dx and dy have SAME sign: dx * dy > 0
      if (totalDist >= 35 && dx * dy > 0) {
        isCorrect = true;
        leftSlantingSuccess();
      }
    } else if (current === STAGES.RIGHT_SLANT) {
      // Right Slanting Line (╱): Bottom-Left to Top-Right or Top-Right to Bottom-Left
      // dx and dy have OPPOSITE signs: dx * dy < 0
      if (totalDist >= 35 && dx * dy < 0) {
        isCorrect = true;
        rightSlantingSuccess();
      }
    }

    if (!isCorrect) {
      handleIncorrectStroke(current);
    }
  }

  function handleIncorrectStroke(expectedStage) {
    playPop();
    clearDrawCanvas();

    // Warm encouragement — NEVER "Wrong!"
    if (expectedStage === STAGES.STANDING) {
      setDialogue('Little Star', 'Let\'s try drawing straight up and down!');
    } else if (expectedStage === STAGES.SLEEPING) {
      setDialogue('Little Star', 'Let\'s draw straight from side to side!');
    } else if (expectedStage === STAGES.LEFT_SLANT) {
      setDialogue('Little Star', 'Can you draw a slanting slide line down?');
    } else if (expectedStage === STAGES.RIGHT_SLANT) {
      setDialogue('Little Star', 'Draw a slanting line up to the stars!');
    }

    showHintGuide();
  }

  // =========================================================================
  // 8. STAGE IMPLEMENTATIONS & CUTSCENES
  // =========================================================================

  function flashSuccess() {
    elements.successFlash.classList.add('active');
    setTimeout(() => {
      elements.successFlash.classList.remove('active');
    }, 600);
  }

  // --- STAGE 1: STANDING LINE (TOWER) ---
  function standingSuccess() {
    state.isAnimatingCutscene = true;
    state.unlockedItems.tower = true;
    flashSuccess();
    playMagicChime();
    showToast('Standing Line! 🏰', '🏰');
    addExplosion(window.innerWidth / 2, window.innerHeight * 0.55, 40);

    clearDrawCanvas();
    hideHintGuide();

    // Transform line into Tower
    elements.towerSilhouette.style.opacity = '0';
    elements.towerMagical.classList.add('revealed');

    // John Celebrates
    elements.charJohn.classList.add('john-celebrate');
    elements.charStar.classList.add('star-spin');

    setTimeout(() => {
      playSuccessFanfare();
      setDialogue('John', 'Standing line! We built the magical tower!');
      markStageComplete('step-standing');
      enableNextStageButton(STAGES.SLEEPING);
      state.isAnimatingCutscene = false;
    }, 1000);
  }

  // --- STAGE 2: SLEEPING LINE (BRIDGE) ---
  function sleepingSuccess() {
    state.isAnimatingCutscene = true;
    state.unlockedItems.bridge = true;
    flashSuccess();
    playMagicChime();
    showToast('Sleeping Line! 🌉', '🌉');
    addExplosion(window.innerWidth / 2, window.innerHeight * 0.75, 40);

    clearDrawCanvas();
    hideHintGuide();

    // Reveal Bridge
    elements.bridgeSilhouette.style.opacity = '0';
    elements.bridgeMagical.classList.add('revealed');

    // John walks across the bridge to Little Star
    setTimeout(() => {
      elements.charJohn.classList.add('john-walk');
      elements.charJohn.style.left = '46%';
      elements.charJohn.style.bottom = '115px';

      setTimeout(() => {
        elements.charJohn.classList.remove('john-walk');
        elements.charJohn.classList.add('john-celebrate');
        elements.charStar.classList.add('star-spin');
        playSuccessFanfare();
        setDialogue('John', 'Sleeping line! We built the bridge and crossed over!');
        markStageComplete('step-sleeping');
        enableNextStageButton(STAGES.LEFT_SLANT);
        state.isAnimatingCutscene = false;
      }, 1600);
    }, 600);
  }

  // --- STAGE 3: LEFT SLANTING LINE (SLIDE) ---
  function leftSlantingSuccess() {
    state.isAnimatingCutscene = true;
    state.unlockedItems.slide = true;
    flashSuccess();
    playMagicChime();
    showToast('Left Slanting Line! 🛝', '🛝');
    addExplosion(window.innerWidth * 0.45, window.innerHeight * 0.55, 40);

    clearDrawCanvas();
    hideHintGuide();

    // Reveal Slide
    elements.slideSilhouette.style.opacity = '0';
    elements.slideMagical.classList.add('revealed');

    // John climbs to top and slides down!
    setTimeout(() => {
      elements.charJohn.style.left = '18%';
      elements.charJohn.style.bottom = '280px';
      elements.charJohn.style.transform = 'scale(0.85)';

      setTimeout(() => {
        playSlideWoosh();
        setDialogue('John', 'Wheeeee! Slanting lines make the best slides!');
        elements.charJohn.classList.add('john-slide');
        elements.charJohn.style.left = '52%';
        elements.charJohn.style.bottom = '90px';
        elements.charJohn.style.transform = 'scale(1) rotate(15deg)';

        setTimeout(() => {
          elements.charJohn.classList.remove('john-slide');
          elements.charJohn.classList.add('john-celebrate');
          elements.charStar.classList.add('star-spin');
          playSuccessFanfare();
          markStageComplete('step-left-slant');
          enableNextStageButton(STAGES.RIGHT_SLANT);
          state.isAnimatingCutscene = false;
        }, 1200);
      }, 900);
    }, 500);
  }

  // --- STAGE 4: RIGHT SLANTING LINE (ROCKET LAUNCH) ---
  function rightSlantingSuccess() {
    state.isAnimatingCutscene = true;
    state.unlockedItems.rocket = true;
    flashSuccess();
    playMagicChime();
    showToast('Right Slanting Line! 🚀', '🚀');
    addExplosion(window.innerWidth * 0.5, window.innerHeight * 0.5, 40);

    clearDrawCanvas();
    hideHintGuide();

    elements.rocketSilhouette.style.opacity = '0';

    // Countdown 3... 2... 1... BLAST OFF!
    elements.countdownOverlay.classList.add('active');
    let count = 3;
    elements.countdownNumber.textContent = count;
    playPop();
    speak('3');

    const countdownInterval = setInterval(() => {
      count--;
      if (count > 0) {
        elements.countdownNumber.textContent = count;
        playPop();
        speak(String(count));
      } else {
        clearInterval(countdownInterval);
        elements.countdownNumber.textContent = '🚀 BLAST OFF!';
        speak('Blast off!');
        elements.rocketFlame.classList.add('firing');
        playRocketBlastOff();

        setTimeout(() => {
          elements.countdownOverlay.classList.remove('active');
          elements.rocketShip.style.transition = 'transform 2.2s cubic-bezier(0.25, 1, 0.5, 1)';
          elements.rocketShip.style.transform = 'translate(600px, -700px) rotate(45deg) scale(0.4)';
          
          elements.charStar.style.transition = 'all 2.2s ease-out';
          elements.charStar.style.transform = 'translate(500px, -600px)';

          setTimeout(() => {
            playSuccessFanfare();
            setDialogue('John', 'Right slanting line! We launched to the stars!');
            markStageComplete('step-right-slant');
            enableNextStageButton(STAGES.BRUSH);
            state.isAnimatingCutscene = false;
          }, 2300);
        }, 800);
      }
    }, 1000);
  }

  // --- STAGE 5: MAGIC BRUSH SANDBOX (FREE PLAY) ---
  function handleBrushSandboxStroke(dx, dy, absDx, absDy) {
    const points = state.strokePoints;
    const midX = (points[0].x + points[points.length - 1].x) / 2;
    const midY = (points[0].y + points[points.length - 1].y) / 2;

    clearDrawCanvas();
    playMagicChime();
    addExplosion(midX, midY, 25);

    let icon = '✨';
    let name = 'Magic Wonder';

    if (absDy >= absDx * 1.3) {
      icon = '🏰';
      name = 'Tower!';
    } else if (absDx >= absDy * 1.3) {
      icon = '🌉';
      name = 'Bridge!';
    } else if (dx * dy > 0) {
      icon = '🛝';
      name = 'Slide!';
    } else {
      icon = '🚀';
      name = 'Rocket!';
    }

    showToast(`${name}`, icon);
    spawnSandboxObject(midX, midY, icon);
  }

  function spawnSandboxObject(x, y, icon) {
    const el = document.createElement('div');
    el.className = 'spawned-obj';
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.fontSize = '3.5rem';
    el.textContent = icon;

    el.addEventListener('click', () => {
      playTone(880, 0.2, 'triangle');
      addExplosion(x, y, 15);
      el.style.transform = 'translate(-50%, -50%) scale(1.4) rotate(15deg)';
      setTimeout(() => {
        el.style.transform = 'translate(-50%, -50%) scale(1)';
      }, 200);
    });

    elements.sandboxObjects.appendChild(el);
  }

  // =========================================================================
  // 9. STAGE TRANSITION MANAGER
  // =========================================================================

  function setStage(stageKey) {
    state.currentStage = stageKey;
    clearDrawCanvas();
    hideHintGuide();
    elements.btnNextStage.classList.add('hidden');

    // Manage container state classes
    elements.container.className = 'game-container';
    elements.container.classList.add(`stage-${stageKey}-active`);

    if (stageKey === STAGES.RIGHT_SLANT) {
      elements.container.classList.add('rocket-mode');
    }

    // Toggle drawing mode class for canvas container
    if (stageKey === STAGES.INTRO || stageKey === STAGES.CELEBRATION) {
      elements.container.classList.remove('drawing-mode');
    } else {
      elements.container.classList.add('drawing-mode');
    }

    // Activate target scene
    document.querySelectorAll('.scene').forEach(s => s.classList.remove('active'));
    const targetScene = document.getElementById(`scene-${stageKey}`);
    if (targetScene) {
      targetScene.classList.add('active');
    }

    // Reset Character Positions & Dialogue
    resetCharacters(stageKey);

    // Update Progress Step highlight
    updateProgressStep(stageKey);

    // Configure Action Banner & Prompts
    configureStageUI(stageKey);
  }

  function resetCharacters(stage) {
    elements.charJohn.className = 'character-john';
    elements.charStar.className = 'character-star';
    elements.charJohn.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
    elements.charStar.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
    elements.charJohn.style.transform = 'none';
    elements.charStar.style.transform = 'none';

    if (stage === STAGES.INTRO) {
      elements.charJohn.style.left = '12%';
      elements.charJohn.style.bottom = '80px';
      elements.charStar.style.left = '78%';
      elements.charStar.style.bottom = '240px';
      elements.dialogueBubble.style.left = '50%';
      elements.dialogueBubble.style.bottom = '300px';
      setDialogue('Little Star', 'John! The Magic Lines are missing from our land!', true);
    } else if (stage === STAGES.STANDING) {
      elements.charJohn.style.left = '16%';
      elements.charJohn.style.bottom = '80px';
      elements.charStar.style.left = '74%';
      elements.charStar.style.bottom = '260px';
      elements.dialogueBubble.style.left = '26%';
      elements.dialogueBubble.style.bottom = '320px';
      setDialogue('Little Star', 'Draw a standing line up and down to build the tower!', true);
    } else if (stage === STAGES.SLEEPING) {
      elements.charJohn.style.left = '8%';
      elements.charJohn.style.bottom = '110px';
      elements.charStar.style.left = '82%';
      elements.charStar.style.bottom = '220px';
      elements.dialogueBubble.style.left = '20%';
      elements.dialogueBubble.style.bottom = '320px';
      setDialogue('Little Star', 'Draw a sleeping line from side to side to build the bridge!', true);
    } else if (stage === STAGES.LEFT_SLANT) {
      elements.charJohn.style.left = '10%';
      elements.charJohn.style.bottom = '80px';
      elements.charStar.style.left = '75%';
      elements.charStar.style.bottom = '280px';
      elements.dialogueBubble.style.left = '20%';
      elements.dialogueBubble.style.bottom = '320px';
      setDialogue('John', 'The slide is missing! Draw the left slanting line!', true);
    } else if (stage === STAGES.RIGHT_SLANT) {
      elements.charJohn.style.left = '12%';
      elements.charJohn.style.bottom = '80px';
      elements.charStar.style.left = '78%';
      elements.charStar.style.bottom = '260px';
      elements.dialogueBubble.style.left = '22%';
      elements.dialogueBubble.style.bottom = '320px';
      elements.rocketShip.style.transform = 'rotate(35deg)';
      elements.rocketFlame.classList.remove('firing');
      setDialogue('John', 'The rocket needs a launch path! Draw the slanting line!', true);
    } else if (stage === STAGES.BRUSH) {
      elements.charJohn.style.left = '8%';
      elements.charJohn.style.bottom = '80px';
      elements.charStar.style.left = '84%';
      elements.charStar.style.bottom = '240px';
      elements.dialogueBubble.style.left = '24%';
      elements.dialogueBubble.style.bottom = '320px';
      setDialogue('Little Star', 'Draw any line you want to create magic!', true);
    } else if (stage === STAGES.CELEBRATION) {
      elements.charJohn.style.left = '18%';
      elements.charJohn.style.bottom = '90px';
      elements.charStar.style.left = '76%';
      elements.charStar.style.bottom = '250px';
      elements.charJohn.classList.add('john-celebrate');
      elements.charStar.classList.add('star-spin');
      playSuccessFanfare();
      setDialogue('John', 'You created the magic! You are a Line Magic Master!', true);
    }
  }

  function configureStageUI(stage) {
    if (stage === STAGES.INTRO || stage === STAGES.CELEBRATION || stage === STAGES.BRUSH) {
      elements.actionBanner.style.display = 'none';
    } else {
      elements.actionBanner.style.display = 'flex';

      if (stage === STAGES.STANDING) {
        elements.bannerSymbol.textContent = '│';
        elements.instructionTitle.textContent = 'Standing Line';
        elements.instructionDesc.textContent = 'Draw straight up and down!';
      } else if (stage === STAGES.SLEEPING) {
        elements.bannerSymbol.textContent = '─';
        elements.instructionTitle.textContent = 'Sleeping Line';
        elements.instructionDesc.textContent = 'Draw straight side to side!';
      } else if (stage === STAGES.LEFT_SLANT) {
        elements.bannerSymbol.textContent = '╲';
        elements.instructionTitle.textContent = 'Left Slanting Line';
        elements.instructionDesc.textContent = 'Draw slanting downwards!';
      } else if (stage === STAGES.RIGHT_SLANT) {
        elements.bannerSymbol.textContent = '╱';
        elements.instructionTitle.textContent = 'Right Slanting Line';
        elements.instructionDesc.textContent = 'Draw slanting upwards into the sky!';
      }

      resetHintTimer();
    }
  }

  function updateProgressStep(stage) {
    const steps = document.querySelectorAll('.progress-step');
    steps.forEach(s => s.classList.remove('active'));

    const activeEl = document.getElementById(`step-${stage}`);
    if (activeEl) {
      activeEl.classList.add('active');
    }
  }

  function markStageComplete(stepId) {
    const el = document.getElementById(stepId);
    if (el) {
      el.classList.add('completed');
    }
  }

  function enableNextStageButton(nextStageKey) {
    elements.btnNextStage.classList.remove('hidden');
    elements.btnNextStage.onclick = () => {
      playPop();
      setStage(nextStageKey);
    };
  }

  // =========================================================================
  // 10. GUIDED TRACING & HINT SYSTEM
  // =========================================================================

  function resetHintTimer() {
    if (state.hintTimer) clearTimeout(state.hintTimer);
    hideHintGuide();
    state.hintTimer = setTimeout(() => {
      showHintGuide();
    }, 6000);
  }

  function showHintGuide() {
    const stage = state.currentStage;
    const overlay = elements.guideOverlay;
    const path = elements.guidePath;
    const hand = elements.magicHand;

    overlay.classList.add('active');

    if (stage === STAGES.STANDING) {
      path.setAttribute('d', 'M 50 15 L 50 85');
      hand.style.top = '15%';
      hand.style.left = '50%';
      animateHandAlongLine(50, 15, 50, 85);
    } else if (stage === STAGES.SLEEPING) {
      path.setAttribute('d', 'M 20 50 L 80 50');
      hand.style.top = '50%';
      hand.style.left = '20%';
      animateHandAlongLine(20, 50, 80, 50);
    } else if (stage === STAGES.LEFT_SLANT) {
      path.setAttribute('d', 'M 30 20 L 70 80');
      hand.style.top = '20%';
      hand.style.left = '30%';
      animateHandAlongLine(30, 20, 70, 80);
    } else if (stage === STAGES.RIGHT_SLANT) {
      path.setAttribute('d', 'M 30 80 L 70 20');
      hand.style.top = '80%';
      hand.style.left = '30%';
      animateHandAlongLine(30, 80, 70, 20);
    }
  }

  let handInterval = null;

  function animateHandAlongLine(x1, y1, x2, y2) {
    if (handInterval) clearInterval(handInterval);
    let t = 0;
    handInterval = setInterval(() => {
      t += 0.03;
      if (t > 1) t = 0;
      const currentX = x1 + (x2 - x1) * t;
      const currentY = y1 + (y2 - y1) * t;
      elements.magicHand.style.left = `${currentX}%`;
      elements.magicHand.style.top = `${currentY}%`;
    }, 30);
  }

  function hideHintGuide() {
    elements.guideOverlay.classList.remove('active');
    if (handInterval) {
      clearInterval(handInterval);
      handInterval = null;
    }
  }

  // =========================================================================
  // 11. EVENT LISTENERS & SETUP
  // =========================================================================

  function initEventListeners() {
    // Start Magic Button
    elements.btnStartMagic.addEventListener('click', (e) => {
      e.stopPropagation();
      initAudio();
      playPop();
      setStage(STAGES.STANDING);
    });

    // Preview Cards on Intro
    document.querySelectorAll('.preview-card').forEach(card => {
      card.addEventListener('click', (e) => {
        e.stopPropagation();
        const stage = card.getAttribute('data-stage');
        if (stage) {
          initAudio();
          playPop();
          setStage(stage);
        }
      });
    });

    // Hint Button
    elements.btnHint.addEventListener('click', (e) => {
      e.stopPropagation();
      playPop();
      showHintGuide();
    });

    // Sound Toggle
    elements.btnSound.addEventListener('click', (e) => {
      e.stopPropagation();
      initAudio();
      state.soundEnabled = !state.soundEnabled;
      elements.soundIcon.textContent = state.soundEnabled ? '🔊' : '🔇';
      playPop();
    });

    // Voice Toggle
    elements.btnVoice.addEventListener('click', (e) => {
      e.stopPropagation();
      state.voiceEnabled = !state.voiceEnabled;
      elements.voiceIcon.textContent = state.voiceEnabled ? '🗣️' : '🤐';
      playPop();
      if (state.voiceEnabled) {
        speak('Voice turned on!');
      }
    });

    // Home / Restart Button
    elements.btnHome.addEventListener('click', (e) => {
      e.stopPropagation();
      playPop();
      setStage(STAGES.INTRO);
    });

    // Progress Step Clickable Nav
    document.querySelectorAll('.progress-step').forEach(stepEl => {
      stepEl.addEventListener('click', (e) => {
        e.stopPropagation();
        const stage = stepEl.getAttribute('data-stage');
        if (stage) {
          playPop();
          setStage(stage);
        }
      });
    });

    // Sandbox Clear
    elements.btnClearBrush.addEventListener('click', (e) => {
      e.stopPropagation();
      playPop();
      elements.sandboxObjects.innerHTML = '';
      clearDrawCanvas();
    });

    // Sandbox Finish Button
    elements.btnFinishAdventure.addEventListener('click', (e) => {
      e.stopPropagation();
      playPop();
      setStage(STAGES.CELEBRATION);
    });

    // Play Again Button
    elements.btnPlayAgain.addEventListener('click', (e) => {
      e.stopPropagation();
      playPop();
      setStage(STAGES.INTRO);
    });

    // Sandbox Mode from Celebration
    elements.btnSandboxMode.addEventListener('click', (e) => {
      e.stopPropagation();
      playPop();
      setStage(STAGES.BRUSH);
    });

    // Global audio unlock on first user action
    document.addEventListener('pointerdown', () => {
      initAudio();
    }, { once: true });
  }

  // =========================================================================
  // 12. INITIALIZATION
  // =========================================================================

  function init() {
    setupCanvases();
    initDrawing();
    initSpeechVoices();
    initEventListeners();
    loopFX();
    setStage(STAGES.INTRO);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
