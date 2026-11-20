import { eventBus } from '../core/event-bus.js';
import { getOpticalIcon } from '../core/optical-icons.js';

export const SCENES_DATA = [
  {
    id: 'night-drive',
    name: 'Conducción Nocturna',
    iconKey: 'scene-night',
    get icon() { return getOpticalIcon('scene-night', 16); },
    code: 'CAM-01 / NOCTURNO',
    hint: 'Gira el colimador hacia los faros LED para observar el corte de interferencia'
  },
  {
    id: 'digital-office',
    name: 'Oficina y Pantallas',
    iconKey: 'scene-office',
    get icon() { return getOpticalIcon('scene-office', 16); },
    code: 'CAM-02 / SPECTRA LED',
    hint: 'Apunta al monitor para evaluar la atenuación de radiación azul HEV'
  },
  {
    id: 'outdoor-sun',
    name: 'Día Soleado y Ruta',
    iconKey: 'scene-sun',
    get icon() { return getOpticalIcon('scene-sun', 16); },
    code: 'CAM-03 / SOLAR UV',
    hint: 'Modula el potenciómetro UV para verificar la transición y polarización'
  },
];

/**
 * Selector de Escenarios Clínicos en el Header
 */
export class SceneSelector {
  constructor(containerElement, initialSceneId = 'night-drive') {
    this.container = containerElement;
    this.currentSceneId = initialSceneId;
    this.buttons = [];

    this.render();
  }

  render() {
    this.container.innerHTML = '';
    const nav = document.createElement('div');
    nav.className = 'scene-pills-nav';

    SCENES_DATA.forEach((scene) => {
      const btn = document.createElement('button');
      btn.className = `scene-pill ${scene.id === this.currentSceneId ? 'active' : ''}`;
      btn.dataset.scene = scene.id;
      btn.type = 'button';

      btn.innerHTML = `
        <span class="scene-icon">${scene.icon}</span>
        <span class="scene-text">${scene.name}</span>
      `;

      btn.addEventListener('click', () => {
        this.selectScene(scene.id);
      });

      nav.appendChild(btn);
      this.buttons.push(btn);
    });

    this.container.appendChild(nav);
  }

  selectScene(sceneId) {
    if (this.currentSceneId === sceneId) return;
    this.currentSceneId = sceneId;

    this.buttons.forEach((btn) => {
      if (btn.dataset.scene === sceneId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    const sceneInfo = SCENES_DATA.find((s) => s.id === sceneId);
    eventBus.emit('scene-changed', sceneInfo);
  }
}
