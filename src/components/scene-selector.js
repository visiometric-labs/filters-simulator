import { eventBus } from '../core/event-bus.js';

export const SCENES_DATA = [
  { id: 'night-drive', name: 'Conducción Nocturna', icon: '🚗', hint: 'Mueve la cabeza hacia los faros de los autos' },
  { id: 'digital-office', name: 'Oficina y Pantallas', icon: '💻', hint: 'Gira hacia el monitor LED para notar el filtro Blue' },
  { id: 'outdoor-sun', name: 'Día Soleado', icon: '☀️', hint: 'Usa el slider solar para ver oscurecer el Transitions' },
];

/**
 * Selector de Escenarios en el Header
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
