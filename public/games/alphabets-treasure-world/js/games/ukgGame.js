/**
 * ChotaPlay - UKG Word Builder Game Controller
 * Educational Focus: Letter Combination & Living Word Transformation
 */

import { WORD_DATA } from '../data/wordData.js';
import { audio } from '../utils/audio.js';
import { particles } from '../utils/particles.js';

export class UKGGame {
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
