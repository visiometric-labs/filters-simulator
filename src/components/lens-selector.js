import { FILTERS_DATA } from '../core/filters-data.js';
import { eventBus } from '../core/event-bus.js';

/**
 * Selector de Lentes y Tratamientos (Diseño amigable en tarjetas táctiles)
 */
export class LensSelector {
  constructor(containerElement, initialFilterId = 'blanco') {
    this.container = containerElement;
    this.currentFilterId = initialFilterId;
    this.buttons = [];

    this.render();
    this.bindEvents();
  }

  render() {
    this.container.innerHTML = '';
    const carousel = document.createElement('div');
    carousel.className = 'lens-carousel-container';

    Object.values(FILTERS_DATA).forEach((filter) => {
      const btn = document.createElement('button');
      btn.className = `lens-card-btn ${filter.id === this.currentFilterId ? 'active' : ''}`;
      btn.dataset.filter = filter.id;
      btn.type = 'button';

      btn.innerHTML = `
        <div class="lens-icon-circle">${filter.icon}</div>
        <span class="lens-title">${filter.name}</span>
        <span class="lens-subtitle">${filter.subtitle}</span>
      `;

      btn.addEventListener('click', () => {
        this.selectFilter(filter.id);
      });

      carousel.appendChild(btn);
      this.buttons.push(btn);
    });

    this.container.appendChild(carousel);
  }

  selectFilter(filterId) {
    if (!FILTERS_DATA[filterId]) return;
    this.currentFilterId = filterId;

    this.buttons.forEach((btn) => {
      if (btn.dataset.filter === filterId) {
        btn.classList.add('active');
        btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      } else {
        btn.classList.remove('active');
      }
    });

    eventBus.emit('filter-changed', FILTERS_DATA[filterId]);
    eventBus.emit('user-interacted');
  }

  bindEvents() {
    eventBus.on('set-filter', (filterId) => {
      this.selectFilter(filterId);
    });
  }
}
