import { eventBus } from '../core/event-bus.js';
import { getOpticalIcon } from '../core/optical-icons.js';

/**
 * Modal Clínico y Protocolo de Prescripción
 * Proporciona al profesional de la salud visual las pautas de comunicación y la física óptica del tratamiento.
 */
export class PitchModal {
  constructor() {
    this.overlay = null;
    this.currentFilter = null;

    this.render();
    this.bindEvents();
  }

  render() {
    this.overlay = document.createElement('div');
    this.overlay.className = 'pitch-modal-overlay';
    this.overlay.innerHTML = `
      <div class="pitch-modal-content">
        <div class="pitch-modal-header">
          <div class="pitch-modal-title-group">
            <span class="pitch-icon-badge">${getOpticalIcon('protocol-doc', 18)}</span>
            <h3 id="pitch-modal-title">Ficha Técnica &amp; Prescripción</h3>
          </div>
          <button type="button" class="btn-card-close" id="btn-close-pitch-modal" title="Cerrar modal">
            ${getOpticalIcon('close', 16)}
          </button>
        </div>

        <div class="pitch-modal-body">
          <div class="pitch-section">
            <div class="pitch-section-title">
              <span class="section-title-icon">${getOpticalIcon('clinical-info', 15)}</span>
              <span>Pauta de Comunicación y Valor para el Paciente</span>
            </div>
            <div class="pitch-dialogue-quote" id="pitch-dialogue-text">
              <!-- Frase clínica -->
            </div>
          </div>

          <div class="pitch-section">
            <div class="pitch-section-title">
              <span class="section-title-icon">${getOpticalIcon('physics-wave', 15)}</span>
              <span>Fundamento Físico &amp; Espectrometría de Laboratorio</span>
            </div>
            <p class="pitch-physics-text" id="pitch-physics-text">
              <!-- Física explicada -->
            </p>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(this.overlay);

    this.overlay.querySelector('#btn-close-pitch-modal').addEventListener('click', () => {
      this.close();
    });

    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) {
        this.close();
      }
    });
  }

  open(filter) {
    this.currentFilter = filter;
    this.overlay.querySelector('#pitch-modal-title').textContent = `Prescripción de Laboratorio: ${filter.name}`;
    this.overlay.querySelector('#pitch-dialogue-text').textContent = filter.pitch.dialogue;
    this.overlay.querySelector('#pitch-physics-text').textContent = filter.pitch.physics;

    this.overlay.classList.add('open');
  }

  close() {
    this.overlay.classList.remove('open');
  }

  bindEvents() {
    eventBus.on('open-pitch-modal', (filter) => {
      this.open(filter);
    });
  }
}
