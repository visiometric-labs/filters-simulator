import { eventBus } from '../core/event-bus.js';

/**
 * Tarjeta de Experiencia del Paciente
 * Muestra beneficios tangibles en lenguaje humano y cercano
 */
export class ExperienceCard {
  constructor(containerElement, initialFilter) {
    this.container = containerElement;
    this.currentFilter = initialFilter;
    this.isCollapsed = false;
    this.element = null;

    this.render();
    this.bindEvents();
  }

  render() {
    this.container.innerHTML = '';
    this.element = document.createElement('div');
    this.element.className = 'patient-experience-card';

    this.updateContent();
    this.container.appendChild(this.element);
  }

  updateContent() {
    const f = this.currentFilter;
    if (!f || !this.element) return;

    this.element.innerHTML = `
      <div class="experience-card-header">
        <div class="card-title-group">
          <span class="card-tag" style="background-color: ${f.bgLight}; color: ${f.color};">${f.tag}</span>
          <span class="card-lens-name">${f.name}</span>
        </div>
        <button type="button" class="btn-card-close" title="Ocultar panel" id="btn-collapse-card">✕</button>
      </div>

      <div class="experience-card-body">
        <div class="patient-highlight-box" style="border-left-color: ${f.color};">
          💡 ${f.headline}
        </div>

        <p class="patient-description">
          ${f.patientDescription}
        </p>

        <div class="benefits-metrics-list">
          <div class="metric-row">
            <span>Confort Visual</span>
            <div class="metric-bar-bg">
              <div class="metric-bar-fill" style="width: ${f.benefits.confort}%; background-color: ${f.color};"></div>
            </div>
            <span>${f.benefits.confort}%</span>
          </div>

          <div class="metric-row">
            <span>Claridad Óptica</span>
            <div class="metric-bar-bg">
              <div class="metric-bar-fill" style="width: ${f.benefits.claridad}%; background-color: ${f.color};"></div>
            </div>
            <span>${f.benefits.claridad}%</span>
          </div>

          <div class="metric-row">
            <span>Protección</span>
            <div class="metric-bar-bg">
              <div class="metric-bar-fill" style="width: ${f.benefits.proteccion}%; background-color: ${f.color};"></div>
            </div>
            <span>${f.benefits.proteccion}%</span>
          </div>
        </div>

        <button type="button" class="btn-show-pitch" id="btn-open-pitch">
          <span>📋</span> Ver argumento de venta para mostrador
        </button>
      </div>
    `;

    // Eventos locales
    this.element.querySelector('#btn-collapse-card').addEventListener('click', () => {
      this.collapse();
    });

    this.element.querySelector('#btn-open-pitch').addEventListener('click', () => {
      eventBus.emit('open-pitch-modal', this.currentFilter);
    });
  }

  collapse() {
    this.isCollapsed = true;
    this.container.classList.add('collapsed');
    eventBus.emit('experience-card-collapsed', true);
  }

  expand() {
    this.isCollapsed = false;
    this.container.classList.remove('collapsed');
    eventBus.emit('experience-card-collapsed', false);
  }

  toggle() {
    if (this.isCollapsed) {
      this.expand();
    } else {
      this.collapse();
    }
  }

  bindEvents() {
    eventBus.on('filter-changed', (filter) => {
      this.currentFilter = filter;
      this.updateContent();
      // Si estaba colapsado y el usuario cambia de lente, reabrir suavemente
      if (this.isCollapsed) {
        this.expand();
      }
    });

    eventBus.on('toggle-info-card', () => {
      this.toggle();
    });
  }
}
