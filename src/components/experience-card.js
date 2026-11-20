import { eventBus } from '../core/event-bus.js';
import { getOpticalIcon } from '../core/optical-icons.js';

/**
 * Ficha Técnica y de Respuesta Fisiológica (Laboratorio Oftálmico)
 * Muestra especificaciones espectrales y confort visual con rigor clínico
 */
export class ExperienceCard {
  constructor(containerElement, initialFilter) {
    this.container = containerElement;
    this.currentFilter = initialFilter;
    this.isCollapsed = true;
    this.element = null;

    this.render();
    this.container.classList.add('is-collapsed');
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
          <span class="card-tag" style="background-color: ${f.bgLight}; color: ${f.color}; border: 1px solid ${f.color}40;">
            ${f.tag} · ${f.specCode || 'REF-STD'}
          </span>
          <span class="card-lens-name">${f.name}</span>
        </div>
        <button type="button" class="btn-card-close" title="Ocultar ficha técnica" id="btn-collapse-card" aria-label="Cerrar ficha">
          ${getOpticalIcon('close', 14)}
        </button>
      </div>

      <div class="experience-card-body">
        <div class="patient-highlight-box" style="border-left-color: ${f.color};">
          <span class="highlight-icon">${getOpticalIcon('clinical-info', 16)}</span>
          <span class="highlight-text">${f.headline}</span>
        </div>

        <p class="patient-description">
          ${f.patientDescription}
        </p>

        <div class="benefits-metrics-list">
          <div class="metric-row">
            <span class="metric-label">Confort visual</span>
            <div class="metric-bar-bg">
              <div class="metric-bar-fill" style="transform: scaleX(${f.benefits.confort / 100}); background-color: ${f.color};"></div>
            </div>
            <span class="metric-val">${f.benefits.confort}%</span>
          </div>

          <div class="metric-row">
            <span class="metric-label">Claridad óptica</span>
            <div class="metric-bar-bg">
              <div class="metric-bar-fill" style="transform: scaleX(${f.benefits.claridad / 100}); background-color: ${f.color};"></div>
            </div>
            <span class="metric-val">${f.benefits.claridad}%</span>
          </div>

          <div class="metric-row">
            <span class="metric-label">Atenuación parásita</span>
            <div class="metric-bar-bg">
              <div class="metric-bar-fill" style="transform: scaleX(${f.benefits.proteccion / 100}); background-color: ${f.color};"></div>
            </div>
            <span class="metric-val">${f.benefits.proteccion}%</span>
          </div>
        </div>

        <button type="button" class="btn-show-pitch" id="btn-open-pitch">
          ${getOpticalIcon('protocol-doc', 15)}
          <span>Protocolo de prescripción y física óptica</span>
        </button>
      </div>
    `;

    this.element.querySelector('#btn-collapse-card').addEventListener('click', () => {
      this.collapse();
    });

    this.element.querySelector('#btn-open-pitch').addEventListener('click', () => {
      eventBus.emit('open-pitch-modal', this.currentFilter);
    });
  }

  collapse() {
    this.isCollapsed = true;
    this.container.classList.add('is-collapsed');
    eventBus.emit('experience-card-collapsed', true);
  }

  expand() {
    this.isCollapsed = false;
    this.container.classList.remove('is-collapsed');
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
    });
  }
}
