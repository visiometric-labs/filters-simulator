import { eventBus } from '../core/event-bus.js';

/**
 * Modal Clínico y Argumentario de Mostrador
 * Brinda al profesional de la salud visual las frases de valor para convencer al paciente
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
          <h3>
            <span>📋</span>
            <span id="pitch-modal-title">Guía de Mostrador</span>
          </h3>
          <button type="button" class="btn-card-close" id="btn-close-pitch-modal">✕</button>
        </div>

        <div class="pitch-modal-body">
          <div>
            <div class="pitch-section-title">🗣️ ¿Qué decirle al paciente para cerrar la venta?</div>
            <div class="pitch-dialogue-quote" id="pitch-dialogue-text">
              <!-- Frase clave -->
            </div>
          </div>

          <div>
            <div class="pitch-section-title">🔬 Fundamento Óptico y Físico</div>
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
    this.overlay.querySelector('#pitch-modal-title').textContent = `Ficha de Venta: ${filter.name}`;
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
