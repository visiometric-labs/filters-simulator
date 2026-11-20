import { eventBus } from '../core/event-bus.js';
import { getOpticalIcon } from '../core/optical-icons.js';

/**
 * Control Espectrofotométrico de Radiación UV y Activación Fotocromática
 */
export class UVSlider {
  constructor(containerElement) {
    this.container = containerElement;
    this.value = 0.85;
    this.element = null;

    this.render();
    this.bindEvents();
  }

  render() {
    this.element = document.createElement('div');
    this.element.className = 'uv-slider-card';
    this.element.innerHTML = `
      <div class="uv-slider-header">
        <div class="uv-slider-title">
          ${getOpticalIcon('slider-sun', 15)}
          <span>Irradiancia UV Solar (380–400 nm)</span>
        </div>
        <span class="uv-val" id="uv-val-display">${Math.round(this.value * 100)}%</span>
      </div>
      <div class="uv-slider-track-wrapper">
        <input 
          type="range" 
          id="uv-range-input" 
          class="uv-slider-input" 
          min="0" 
          max="100" 
          value="${Math.round(this.value * 100)}" 
        />
        <div class="uv-scale-markers">
          <span>0% (Interiores)</span>
          <span>50% (Sombra)</span>
          <span>100% (Sol Directo)</span>
        </div>
      </div>
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
      if (filter.id === 'transitions') {
        this.setVisible(true);
      } else {
        this.setVisible(false);
      }
    });

    eventBus.on('scene-changed', (scene) => {
      if (scene.id !== 'outdoor-sun') {
        this.setVisible(false);
      }
    });
  }
}
