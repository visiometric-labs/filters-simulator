import { eventBus } from '../core/event-bus.js';

/**
 * Controlador de Demostración Solar Fotocromática (Trinity vs Transitions)
 * Muestra en tiempo real:
 * - Nombre de marca y tecnología (Transitions Signature vs Trinity Estándar)
 * - Nivel de oscurecimiento (%) y Categoría óptica (Cat. 0 a Cat. 3)
 * - Barra de progreso cinética en tiempo real
 * - Botón "Reactivar Prueba Solar" para repetir el ciclo desde 100% transparente
 * - Barra deslizadora para ajuste manual / consulta del óptico
 */
export class UVSlider {
  constructor(containerElement) {
    this.container = containerElement;
    this.currentFilterId = null;
    this.currentSceneId = 'night-drive'; // Inicializado en night-drive
    this.element = null;

    this.render();
    this.bindEvents();
  }

  render() {
    this.container.innerHTML = '';
    this.element = document.createElement('div');
    this.element.className = 'photochromic-card';
    this.element.innerHTML = `
      <div class="photo-card-header">
        <div class="photo-brand-name" id="photo-brand-name">
          <span id="photo-brand-icon">☀️</span>
          <span id="photo-brand-title">Transitions Signature</span>
        </div>
        <span class="photo-speed-tag" id="photo-speed-tag">⚡ Alta Velocidad • Cat. 3</span>
      </div>

      <div class="photo-status-row">
        <span class="photo-metric">
          Absorción Solar: <strong id="photo-percent-display">0%</strong>
        </span>
        <span class="photo-cat-pill" id="photo-cat-display">Cat. 0 (Claro)</span>
      </div>

      <div class="photo-progress-track">
        <div class="photo-progress-fill" id="photo-progress-bar"></div>
      </div>

      <div class="photo-actions-row">
        <button type="button" class="btn-reactivate-solar" id="btn-reactivate-solar" title="Reiniciar oscurecimiento desde 100% transparente">
          <span>🔄</span>
          <span>Reactivar Sol</span>
        </button>
        <div class="photo-manual-scrubber" title="Ajuste manual de exposición solar">
          <input 
            type="range" 
            id="photo-scrub-input" 
            class="photo-scrub-input" 
            min="0" 
            max="100" 
            value="0" 
          />
        </div>
      </div>
    `;

    this.container.appendChild(this.element);

    this.brandIcon = this.element.querySelector('#photo-brand-icon');
    this.brandTitle = this.element.querySelector('#photo-brand-title');
    this.speedTag = this.element.querySelector('#photo-speed-tag');
    this.percentDisplay = this.element.querySelector('#photo-percent-display');
    this.catDisplay = this.element.querySelector('#photo-cat-display');
    this.progressBar = this.element.querySelector('#photo-progress-bar');
    this.scrubInput = this.element.querySelector('#photo-scrub-input');
    this.btnReactivate = this.element.querySelector('#btn-reactivate-solar');

    // Botón Reactivar Prueba Solar
    this.btnReactivate.addEventListener('click', () => {
      eventBus.emit('restart-photochromic');
    });

    // Control manual (slider)
    this.scrubInput.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10) / 100;
      eventBus.emit('set-photochromic-manual', val);
      eventBus.emit('uv-changed', val);
    });
  }

  updateCardTheme(filterId) {
    if (filterId === 'transitions') {
      this.element.className = 'photochromic-card transitions-theme';
      this.brandIcon.textContent = '☀️';
      this.brandTitle.textContent = 'Transitions Signature';
      this.brandTitle.className = 'photo-brand-name transitions';
      this.speedTag.textContent = '⚡ Alta Velocidad • Cat. 3';
      this.speedTag.className = 'photo-speed-tag transitions';
      this.progressBar.className = 'photo-progress-fill transitions';
    } else if (filterId === 'trinity') {
      this.element.className = 'photochromic-card trinity-theme';
      this.brandIcon.textContent = '🌤️';
      this.brandTitle.textContent = 'Trinity Fotocromático';
      this.brandTitle.className = 'photo-brand-name trinity';
      this.speedTag.textContent = '⏱️ Estándar • Cat. 2';
      this.speedTag.className = 'photo-speed-tag trinity';
      this.progressBar.className = 'photo-progress-fill trinity';
    }
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
      this.currentFilterId = filter.id;
      this.checkVisibility();
      if (filter.id === 'transitions' || filter.id === 'trinity') {
        this.updateCardTheme(filter.id);
      }
    });

    eventBus.on('scene-changed', (scene) => {
      this.currentSceneId = scene.id;
      this.checkVisibility();
    });

    eventBus.on('photochromic-status', (status) => {
      if (this.currentSceneId !== 'outdoor-sun') return;
      if (status.filterId !== this.currentFilterId) return;

      const absorption = status.absorptionPercent;
      const relative = status.relativePercent;

      this.percentDisplay.textContent = `${absorption}%`;
      this.catDisplay.textContent = status.category;
      this.progressBar.style.width = `${relative}%`;

      // Si no está interactuando con el scrubber, sincronizar la perilla
      if (document.activeElement !== this.scrubInput) {
        this.scrubInput.value = relative;
      }
    });
  }

  checkVisibility() {
    const isSunScene = this.currentSceneId === 'outdoor-sun';
    const isPhotochromic = this.currentFilterId === 'transitions' || this.currentFilterId === 'trinity';

    if (isSunScene && isPhotochromic) {
      this.setVisible(true);
    } else {
      this.setVisible(false);
    }
  }
}
