/**
 * ChotaPlay Particle & Celebration Engine
 * Handles full-screen magical sparkles, confetti bursts, and living word star trails.
 */

class ParticleEngine {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.animationId = null;
  }

  init(canvasElement) {
    this.canvas = canvasElement;
    this.ctx = this.canvas.getContext('2d');
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createSparkle(x, y, count = 25, colorList = ['#FFD166', '#06D6A0', '#118AB2', '#EF476F', '#FFBE0B', '#8338EC']) {
    if (!this.canvas) return;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 6;
      this.particles.push({
        x: x || this.canvas.width / 2,
        y: y || this.canvas.height / 2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 3 + Math.random() * 6,
        color: colorList[Math.floor(Math.random() * colorList.length)],
        alpha: 1,
        decay: 0.015 + Math.random() * 0.02,
        type: 'sparkle',
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 10
      });
    }
    this.startLoop();
  }

  createConfetti(count = 60) {
    if (!this.canvas) return;
    const colors = ['#FF4D4D', '#3A86FF', '#FFBE0B', '#06D6A0', '#8338EC', '#FB5607', '#FF70A6'];
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: -20 - Math.random() * 100,
        vx: (Math.random() - 0.5) * 4,
        vy: 3 + Math.random() * 5,
        width: 8 + Math.random() * 10,
        height: 12 + Math.random() * 12,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        decay: 0.006 + Math.random() * 0.006,
        type: 'confetti',
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 12
      });
    }
    this.startLoop();
  }

  startLoop() {
    if (this.animationId) return;
    const render = () => {
      if (!this.ctx || !this.canvas) return;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;
        p.rotation += p.rotSpeed || 0;

        if (p.type === 'confetti') {
          p.vy += 0.05; // gravity
        }

        if (p.alpha <= 0) {
          this.particles.splice(i, 1);
          continue;
        }

        this.ctx.save();
        this.ctx.globalAlpha = Math.max(0, p.alpha);
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate((p.rotation * Math.PI) / 180);

        if (p.type === 'sparkle') {
          this.ctx.fillStyle = p.color;
          this.ctx.beginPath();
          // Draw 4-point star
          const s = p.size;
          this.ctx.moveTo(0, -s * 1.6);
          this.ctx.lineTo(s * 0.4, -s * 0.4);
          this.ctx.lineTo(s * 1.6, 0);
          this.ctx.lineTo(s * 0.4, s * 0.4);
          this.ctx.lineTo(0, s * 1.6);
          this.ctx.lineTo(-s * 0.4, s * 0.4);
          this.ctx.lineTo(-s * 1.6, 0);
          this.ctx.lineTo(-s * 0.4, -s * 0.4);
          this.ctx.closePath();
          this.ctx.fill();
        } else if (p.type === 'confetti') {
          this.ctx.fillStyle = p.color;
          this.ctx.fillRect(-p.width / 2, -p.height / 2, p.width, p.height);
        }

        this.ctx.restore();
      }

      if (this.particles.length > 0) {
        this.animationId = requestAnimationFrame(render);
      } else {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.animationId = null;
      }
    };
    this.animationId = requestAnimationFrame(render);
  }
}

export const particles = new ParticleEngine();
