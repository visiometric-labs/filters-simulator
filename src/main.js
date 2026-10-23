import { CameraController } from './core/camera.js';
import { eventBus } from './core/event-bus.js';
import { FILTERS_DATA } from './core/filters-data.js';
import { GlassesHUD } from './components/glasses-hud.js';
import { VirtualJoystick } from './components/joystick.js';
import { LensSelector } from './components/lens-selector.js';
import { SceneSelector } from './components/scene-selector.js';
import { ExperienceCard } from './components/experience-card.js';
import { UVSlider } from './components/uv-slider.js';
import { PitchModal } from './components/pitch-modal.js';
import { SceneRenderer } from './scenes/scene-renderer.js';

/**
 * Orquestador Principal de la Aplicación
 */
class App {
  constructor() {
    this.camera = new CameraController();
    this.glassesHUD = null;
    this.joystick = null;
    this.renderer = null;
    this.lensSelector = null;
    this.sceneSelector = null;
    this.experienceCard = null;
    this.uvSlider = null;
    this.pitchModal = null;

    this.init();
  }

  init() {
    // 1. Montura oftálmica HUD POV
    const glassesContainer = document.getElementById('glasses-container');
    this.glassesHUD = new GlassesHUD(glassesContainer);

    // 2. Renderizador maestro de Canvas 360
    const canvas = document.getElementById('sim-canvas');
    this.renderer = new SceneRenderer(canvas, this.camera, this.glassesHUD);

    // 3. Joystick Virtual Táctil
    const joystickContainer = document.getElementById('joystick-container');
    this.joystick = new VirtualJoystick(joystickContainer, (dx, dy) => {
      this.camera.setJoystickInput(dx, dy);
    });

    // 4. Selectores de Lentes y Escenas
    const lensContainer = document.getElementById('lens-selector-container');
    this.lensSelector = new LensSelector(lensContainer, 'blanco');

    const sceneContainer = document.getElementById('scene-selector-container');
    this.sceneSelector = new SceneSelector(sceneContainer, 'night-drive');

    // 5. Tarjeta de Experiencia del Paciente
    const patientCardContainer = document.getElementById('patient-card-container');
    this.experienceCard = new ExperienceCard(patientCardContainer, FILTERS_DATA['blanco']);

    // 6. Slider UV para Transitions
    const uvContainer = document.getElementById('uv-slider-container');
    this.uvSlider = new UVSlider(uvContainer);

    // 7. Modal de Guía de Mostrador para el Óptico
    this.pitchModal = new PitchModal();

    // 8. Eventos de la Interfaz y Control Directo con Pantalla / Teclado
    this.bindDOMEvents(canvas);

    // Iniciar bucle de renderizado
    this.renderer.start();
  }

  bindDOMEvents(canvas) {
    // Arrastre directo en la pantalla táctil o mouse sobre el canvas
    let isPointerDown = false;
    let lastX = 0;
    let lastY = 0;

    canvas.addEventListener('pointerdown', (e) => {
      isPointerDown = true;
      lastX = e.clientX;
      lastY = e.clientY;
      canvas.setPointerCapture(e.pointerId);
      eventBus.emit('user-interacted');
    });

    canvas.addEventListener('pointermove', (e) => {
      if (!isPointerDown) return;
      const deltaX = e.clientX - lastX;
      const deltaY = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;

      // Invertir deltaX para rotación natural de cabeza
      this.camera.applyDelta(-deltaX, deltaY);
    });

    const handlePointerUp = () => {
      isPointerDown = false;
    };

    canvas.addEventListener('pointerup', handlePointerUp);
    canvas.addEventListener('pointercancel', handlePointerUp);

    // Controles con teclado (Flechas o WASD para girar la cabeza en desktop)
    window.addEventListener('keydown', (e) => {
      const step = 0.05;
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        this.camera.yaw += step;
        eventBus.emit('user-interacted');
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        this.camera.yaw -= step;
        eventBus.emit('user-interacted');
      } else if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        this.camera.pitch += step;
        this.camera.clampPitch();
        eventBus.emit('user-interacted');
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        this.camera.pitch -= step;
        this.camera.clampPitch();
        eventBus.emit('user-interacted');
      }
    });

    // Botón Con Gafas / Sin Gafas
    const toggleGlassesBtn = document.getElementById('btn-toggle-glasses');
    const toggleGlassesLabel = document.getElementById('glasses-toggle-label');

    toggleGlassesBtn.addEventListener('click', () => {
      this.glassesHUD.toggle();
    });

    eventBus.on('glasses-state-changed', (enabled) => {
      if (enabled) {
        toggleGlassesBtn.classList.remove('off');
        toggleGlassesLabel.textContent = 'Ver con Gafas';
      } else {
        toggleGlassesBtn.classList.add('off');
        toggleGlassesLabel.textContent = 'Ver sin Gafas';
      }
    });

    // Botón Beneficios del Header
    const toggleInfoBtn = document.getElementById('btn-toggle-info');
    toggleInfoBtn.addEventListener('click', () => {
      this.experienceCard.toggle();
    });

    // Botón Pantalla Completa
    const fullscreenBtn = document.getElementById('btn-fullscreen');
    fullscreenBtn.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    });

    // Ocultar hint de ayuda tras la primera interacción o 6 segundos
    const lookHint = document.getElementById('look-hint');
    eventBus.on('user-interacted', () => {
      if (lookHint) {
        lookHint.classList.add('hidden');
      }
    });

    setTimeout(() => {
      if (lookHint) {
        lookHint.classList.add('hidden');
      }
    }, 6000);
  }
}

// Iniciar aplicación al cargar el DOM
window.addEventListener('DOMContentLoaded', () => {
  new App();
});
