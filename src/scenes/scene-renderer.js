import { NightDriveScene } from './night-drive-scene.js';
import { DigitalOfficeScene } from './digital-office-scene.js';
import { OutdoorSunScene } from './outdoor-sun-scene.js';
import { FILTERS_DATA } from '../core/filters-data.js';
import { eventBus } from '../core/event-bus.js';

/**
 * Orquestador y Renderizador Maestro de la Simulación POV
 * Maneja el ciclo de renderizado a 60 FPS con doble pase óptico (Periferia vs A través del Lente)
 */
export class SceneRenderer {
  constructor(canvasElement, camera, glassesHUD) {
    this.canvas = canvasElement;
    this.ctx = this.canvas.getContext('2d');
    this.camera = camera;
    this.glassesHUD = glassesHUD;

    // Escenas disponibles
    this.scenes = {
      'night-drive': new NightDriveScene(),
      'digital-office': new DigitalOfficeScene(),
      'outdoor-sun': new OutdoorSunScene(),
    };

    this.currentScene = this.scenes['night-drive'];
    this.currentFilter = FILTERS_DATA['blanco'];
    this.uvIntensity = 0.85;

    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.lastTime = performance.now();
    this.isRunning = false;

    this.init();
    this.bindEvents();
  }

  init() {
    this.handleResize();
    window.addEventListener('resize', () => this.handleResize());
  }

  handleResize() {
    this.dpr = Math.min(window.devicePixelRatio || 1, 2.0);
    const rect = this.canvas.getBoundingClientRect();
    this.width = rect.width;
    this.height = rect.height;

    this.canvas.width = Math.round(this.width * this.dpr);
    this.canvas.height = Math.round(this.height * this.dpr);

    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.scale(this.dpr, this.dpr);

    // Suavizado por GPU por hardware (60 FPS fluidos)
    this.ctx.imageSmoothingEnabled = true;
    this.ctx.imageSmoothingQuality = 'medium';
  }


  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.lastTime = performance.now();
    this.loop();
  }

  stop() {
    this.isRunning = false;
  }

  loop() {
    if (!this.isRunning) return;

    const now = performance.now();
    const deltaTime = Math.min(now - this.lastTime, 64);
    this.lastTime = now;

    // 1. Actualizar física de cámara (giro de cabeza)
    this.camera.update(deltaTime);

    // 2. Actualizar animación interna de la escena
    this.currentScene.update(deltaTime);

    // 3. Renderizar cuadro completo
    this.render();

    requestAnimationFrame(() => this.loop());
  }

  render() {
    const ctx = this.ctx;
    const width = this.width;
    const height = this.height;

    ctx.clearRect(0, 0, width, height);


    // -------------------------------------------------------------
    // PASE 1: Visión Periférica (Fuera de las gafas / Sin filtro)
    // -------------------------------------------------------------
    this.currentScene.renderBase(ctx, width, height, this.camera);

    // En la periferia, las luces se ven siempre con la óptica natural sin tratamiento
    const rawOptical = FILTERS_DATA['blanco'].optical;
    this.currentScene.renderLights(ctx, width, height, this.camera, rawOptical, this.uvIntensity);

    // -------------------------------------------------------------
    // PASE 2: Visión a través de los Cristales Oftálmicos (Recorte)
    // -------------------------------------------------------------
    if (this.glassesHUD.glassesEnabled) {
      const isClipped = this.glassesHUD.clipLensesOnCanvas(ctx, width, height);

      if (isClipped) {
        // Renderizar dentro de las lentes (fotográfico o procedural)
        if (this.currentScene.renderTreated) {
          this.currentScene.renderTreated(ctx, width, height, this.camera, this.currentFilter);
        } else {
          this.currentScene.renderBase(ctx, width, height, this.camera);
        }

        // Calcular propiedades ópticas activas del filtro
        const activeOptical = { ...this.currentFilter.optical };

        // Si es fotocromático, modular la absorción según el slider de radiación UV
        if (activeOptical.photochromic) {
          activeOptical.tintIntensity = this.uvIntensity * 0.85;
          activeOptical.transmission = 1.0 - (this.uvIntensity * 0.70);
        }

        // Renderizar las luces con la calibración del filtro activo
        this.currentScene.renderLights(ctx, width, height, this.camera, activeOptical, this.uvIntensity);

        // Aplicar tinte del cristal sólo si no es una escena fotográfica que ya incluye su propio tinte
        if (activeOptical.tintIntensity > 0.01 && !this.currentScene.renderTreated) {
          const [r, g, b, a] = activeOptical.tintRgba;
          const alpha = a * (activeOptical.tintIntensity / 0.85);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          ctx.fillRect(0, 0, width, height);
        }

        // Restaurar estado del canvas (deshacer el recorte)
        ctx.restore();
      }
    }
  }

  bindEvents() {
    eventBus.on('filter-changed', (filter) => {
      this.currentFilter = filter;
    });

    eventBus.on('scene-changed', (sceneInfo) => {
      if (this.scenes[sceneInfo.id]) {
        this.currentScene = this.scenes[sceneInfo.id];
      }
    });

    eventBus.on('uv-changed', (val) => {
      this.uvIntensity = val;
    });
  }
}
