import { FILTERS_DATA } from '../core/filters-data.js';
import { eventBus } from '../core/event-bus.js';

/**
 * Matriz de Colocación de Filtros según la Escena Clínica
 * Cada escenario muestra rigurosamente los tratamientos que resuelven los problemas visuales de ese entorno:
 * - Conducción Nocturna: Lente Normal (deslumbramiento), AR Verde, Crizal Multicapa y Filtro Amarillo DriveSafe.
 * - Oficina y Pantallas: Lente Normal (fatiga LED), AR Verde, Filtro Blue Cut y Crizal Multicapa.
 * - Día Soleado: Lente Normal, Transitions Inteligente (con Slider Solar), Filtro Polarizado y Crizal Multicapa.
 */
export const SCENE_FILTERS = {
  'night-drive': ['blanco', 'ar-verde', 'amarillo', 'crizal'],
  'digital-office': ['blanco', 'ar-verde', 'blue-cut', 'crizal'],
  'outdoor-sun': ['blanco', 'trinity', 'transitions', 'polarizado', 'crizal'],
};

export const SCENE_DEFAULT_FILTERS = {
  'night-drive': 'blanco',
  'digital-office': 'blanco',
  'outdoor-sun': 'blanco',
};

/**
 * Selector de Lentes y Tratamientos Contextual
 */
export class LensSelector {
  constructor(containerElement, initialFilterId = 'blanco', initialSceneId = 'night-drive') {
    this.container = containerElement;
    this.currentSceneId = initialSceneId;
    this.currentFilterId = initialFilterId;
    this.buttons = [];

    this.render();
    this.bindEvents();

    // Emitir el filtro inicial para sincronizar el motor y la UI desde el primer fotograma
    if (FILTERS_DATA[this.currentFilterId]) {
      eventBus.emit('filter-changed', FILTERS_DATA[this.currentFilterId]);
    }
  }

  render() {
    this.container.innerHTML = '';
    const carousel = document.createElement('div');
    carousel.className = 'lens-carousel-container';

    // Obtener los filtros específicos colocados para la escena activa
    const filterIds = SCENE_FILTERS[this.currentSceneId] || Object.keys(FILTERS_DATA);

    // Asegurar que el filtro actual pertenece a la escena
    if (!filterIds.includes(this.currentFilterId)) {
      this.currentFilterId = SCENE_DEFAULT_FILTERS[this.currentSceneId] || filterIds[0];
    }

    this.buttons = [];

    filterIds.forEach((id) => {
      const filter = FILTERS_DATA[id];
      if (!filter) return;

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
        // Desplazamiento exclusivo dentro del carrusel interno (evita mover el canvas o viewport)
        const carousel = this.container.querySelector('.lens-carousel-container');
        if (carousel && carousel.scrollWidth > carousel.clientWidth) {
          const targetLeft = btn.offsetLeft - (carousel.clientWidth - btn.clientWidth) / 2;
          carousel.scrollTo({ left: targetLeft, behavior: 'smooth' });
        }
      } else {
        btn.classList.remove('active');
      }
    });

    eventBus.emit('filter-changed', FILTERS_DATA[filterId]);
    eventBus.emit('user-interacted');
  }

  setScene(sceneId) {
    if (this.currentSceneId === sceneId) return;
    this.currentSceneId = sceneId;

    const availableFilters = SCENE_FILTERS[sceneId] || Object.keys(FILTERS_DATA);
    if (!availableFilters.includes(this.currentFilterId)) {
      this.currentFilterId = SCENE_DEFAULT_FILTERS[sceneId] || availableFilters[0];
    }

    this.render();

    // Notificar el filtro colocado para la nueva escena
    eventBus.emit('filter-changed', FILTERS_DATA[this.currentFilterId]);
  }

  bindEvents() {
    eventBus.on('set-filter', (filterId) => {
      this.selectFilter(filterId);
    });

    eventBus.on('scene-changed', (sceneInfo) => {
      this.setScene(sceneInfo.id);
    });
  }
}
