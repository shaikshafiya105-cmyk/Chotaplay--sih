/**
 * ChotaPlay - LKG Alphabet Adventure Game Controller
 * Educational Focus: Letter Recognition (A-Z) & Fixed Associations
 */

import { ALPHABET_DATA } from '../data/alphabetData.js';
import { audio } from '../utils/audio.js';
import { particles } from '../utils/particles.js';

export class LKGGame {
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
