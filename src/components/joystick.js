import { eventBus } from '../core/event-bus.js';

/**
 * Colimador de Orientación Óptica / Joystick Virtual Táctil
 * Inspirado en los mandos micrométricos de lámparas de hendidura y retinoscopios.
 */
export class VirtualJoystick {
  constructor(containerElement, onMoveCallback) {
    this.container = containerElement;
    this.onMove = onMoveCallback;

    this.isDragging = false;
    this.baseRadius = 50;
    this.maxDistance = 35;
    this.centerX = 0;
    this.centerY = 0;

    this.knob = null;
    this.element = null;

    this.render();
    this.bindEvents();
  }

  render() {
    this.element = document.createElement('div');
    this.element.className = 'virtual-joystick';
    this.element.innerHTML = `
      <div class="joystick-crosshair"></div>
      <div class="joystick-radial-ticks"></div>
      <div class="joystick-knob" title="Mando micrométrico de orientación">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="3.5"/>
          <line x1="12" y1="3" x2="12" y2="7"/>
          <line x1="12" y1="17" x2="12" y2="21"/>
          <line x1="3" y1="12" x2="7" y2="12"/>
          <line x1="17" y1="12" x2="21" y2="12"/>
          <circle cx="12" cy="12" r="1" fill="currentColor"/>
        </svg>
      </div>
    `;

    this.container.appendChild(this.element);
    this.knob = this.element.querySelector('.joystick-knob');
  }

  bindEvents() {
    const handleStart = (e) => {
      this.isDragging = true;
      this.element.classList.add('dragging');

      const rect = this.element.getBoundingClientRect();
      this.centerX = rect.left + rect.width / 2;
      this.centerY = rect.top + rect.height / 2;

      this.processMove(e);
      eventBus.emit('user-interacted');
    };

    const handleMove = (e) => {
      if (!this.isDragging) return;
      this.processMove(e);
    };

    const handleEnd = () => {
      if (!this.isDragging) return;
      this.isDragging = false;
      this.element.classList.remove('dragging');

      this.knob.style.transform = `translate(-50%, -50%)`;
      if (this.onMove) {
        this.onMove(0, 0);
      }
    };

    this.element.addEventListener('pointerdown', (e) => {
      this.element.setPointerCapture(e.pointerId);
      handleStart(e);
    });

    this.element.addEventListener('pointermove', handleMove);
    this.element.addEventListener('pointerup', handleEnd);
    this.element.addEventListener('pointercancel', handleEnd);
  }

  processMove(e) {
    const clientX = e.clientX;
    const clientY = e.clientY;

    const deltaX = clientX - this.centerX;
    const deltaY = clientY - this.centerY;

    const distance = Math.hypot(deltaX, deltaY);
    const angle = Math.atan2(deltaY, deltaX);

    const clampedDistance = Math.min(distance, this.maxDistance);
    const knobX = Math.cos(angle) * clampedDistance;
    const knobY = Math.sin(angle) * clampedDistance;

    this.knob.style.transform = `translate(calc(-50% + ${knobX}px), calc(-50% + ${knobY}px))`;

    const normalizedX = knobX / this.maxDistance;
    const normalizedY = knobY / this.maxDistance;

    if (this.onMove) {
      this.onMove(normalizedX, normalizedY);
    }
  }
}
