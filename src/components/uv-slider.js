import { eventBus } from '../core/event-bus.js';

/**
 * Control Deslizante de Intensidad Solar y UV
 * Permite modular el oscurecimiento de lentes fotosensibles (Transitions)
 */
export class UVSlider {
  constructor(containerElement) {
    this.container = containerElement;
    this.value = 0.85; // 85% por defecto al probar Transitions
    this.element = null;

    this.render();
    this.bindEvents();
  }

  render() {
    this.element = document.createElement('div');
    this.element.className = 'uv-slider-card';
    this.element.innerHTML = `
      <div class="uv-slider-header">
        <span>☀️ Radiación UV / Luz Solar</span>
        <span class="uv-val" id="uv-val-display">${Math.round(this.value * 100)}%</span>
      </div>
      <input 
        type="range" 
        id="uv-range-input" 
        class="uv-slider-input" 
        min="0" 
        max="100" 
        value="${Math.round(this.value * 100)}" 
      />
    `;

    this.container.appendChild(this.element);

    const input = this.element.querySelector('#uv-range-input');
    const display = this.element.querySelector('#uv-val-display');

    input.addEventListener('input', (e) => {
      this.value = parseInt(e.target.value, 10) / 100;
      display.textContent = `${Math.round(this.value * 100)}%`;
      eventBus.emit('uv-changed', this.value);
    });
  }

  setVisible(visible) {
    if (visible) {
      this.container.classList.add('visible');
    } else {
      this.container.classList.remove('visible');
    }
  }

  bindEvents() {
    eventBus.on('filter-changed', (filter) => {
      // Mostrar si el filtro activo es fotocromático (Transitions)
      if (filter.id === 'transitions') {
        this.setVisible(true);
      } else {
        this.setVisible(false);
      }
    });

    eventBus.on('scene-changed', (scene) => {
      // Si la escena no es de sol exterior, ocultar de inmediato
      if (scene.id !== 'outdoor-sun') {
        this.setVisible(false);
      }
    });
  }
}
