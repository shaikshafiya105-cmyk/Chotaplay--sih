/**
 * ChotaPlay - Class 1 Jumbled Word Adventure Game Controller
 * Educational Focus: Letter Order, Spelling & Jumbled Resolution
 */

import { WORD_DATA } from '../data/wordData.js';
import { audio } from '../utils/audio.js';
import { particles } from '../utils/particles.js';

export class Class1Game {
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
