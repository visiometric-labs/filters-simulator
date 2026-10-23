import { eventBus } from '../core/event-bus.js';

/**
 * Joystick Virtual Táctil y de Puntero
 * Diseño suave y ergonómico para uso con pulgar o mouse
 */
export class VirtualJoystick {
  constructor(containerElement, onMoveCallback) {
    this.container = containerElement;
    this.onMove = onMoveCallback;

    this.isDragging = false;
    this.baseRadius = 50;  // Radio del contenedor
    this.maxDistance = 35; // Desplazamiento máximo del pomo
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
      <div class="joystick-knob">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
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

      // Ocultar hint de ayuda la primera vez que interactúa
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

      // Resorte suave al centro
      this.knob.style.transform = `translate(-50%, -50%)`;
      if (this.onMove) {
        this.onMove(0, 0);
      }
    };

    // Pointer events universales (touch y mouse unificados)
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

    // Limitar desplazamiento dentro del radio máximo
    const clampedDistance = Math.min(distance, this.maxDistance);
    const knobX = Math.cos(angle) * clampedDistance;
    const knobY = Math.sin(angle) * clampedDistance;

    this.knob.style.transform = `translate(calc(-50% + ${knobX}px), calc(-50% + ${knobY}px))`;

    // Normalizar vector entre -1.0 y 1.0
    const normalizedX = knobX / this.maxDistance;
    const normalizedY = knobY / this.maxDistance;

    if (this.onMove) {
      this.onMove(normalizedX, normalizedY);
    }
  }
}
