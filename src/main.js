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
    this.lensSelector = new LensSelector(lensContainer, 'crizal', 'night-drive');

    const sceneContainer = document.getElementById('scene-selector-container');
    this.sceneSelector = new SceneSelector(sceneContainer, 'night-drive');

    // 5. Tarjeta de Experiencia del Paciente (Inicializada con Crizal para sincronizar con el selector)
    const patientCardContainer = document.getElementById('patient-card-container');
    this.experienceCard = new ExperienceCard(patientCardContainer, FILTERS_DATA['crizal']);

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
    const viewport = document.getElementById('sim-viewport') || canvas;

    let activePointerId = null;
    let lastX = 0;
    let lastY = 0;

    // Ignorar toques sobre botones, joystick, carrusel o tarjeta de experiencia
    const isInteractiveElement = (target) => {
      if (!target || !target.closest) return false;
      return !!target.closest(
        'button, input, a, .virtual-joystick, .lens-card-btn, .scene-pill, .btn-clinic-action, .bottom-controls-bar, .patient-card-anchor, .patient-card-floating'
      );
    };

    const handlePointerDown = (e) => {
      if (isInteractiveElement(e.target)) return;
      if (activePointerId !== null) return; // Bloquear segundo dedo para evitar saltos bruscos

      activePointerId = e.pointerId;
      lastX = e.clientX;
      lastY = e.clientY;
      this.camera.stopDragMomentum();

      try {
        viewport.setPointerCapture(e.pointerId);
      } catch (err) {}

      eventBus.emit('user-interacted');
    };

    const handlePointerMove = (e) => {
      if (e.pointerId !== activePointerId) return;

      const deltaX = e.clientX - lastX;
      const deltaY = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;

      const rect = viewport.getBoundingClientRect();
      // -deltaX: arrastrar hacia la izquierda gira la cabeza hacia la derecha
      // -deltaY: arrastrar hacia arriba mira hacia arriba (sincronizado con el joystick e intuición natural)
      this.camera.applyDelta(-deltaX, -deltaY, rect.width, rect.height);
    };

    const handlePointerUp = (e) => {
      if (e.pointerId === activePointerId) {
        try {
          viewport.releasePointerCapture(e.pointerId);
        } catch (err) {}
        activePointerId = null;
      }
    };

    viewport.addEventListener('pointerdown', handlePointerDown);
    viewport.addEventListener('pointermove', handlePointerMove);
    viewport.addEventListener('pointerup', handlePointerUp);
    viewport.addEventListener('pointercancel', handlePointerUp);

    // Controles con teclado (Flechas o WASD para girar la cabeza con inercia cinematográfica)
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        this.camera.stepYaw(-1);
        eventBus.emit('user-interacted');
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        this.camera.stepYaw(1);
        eventBus.emit('user-interacted');
      } else if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        this.camera.stepPitch(1);
        eventBus.emit('user-interacted');
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        this.camera.stepPitch(-1);
        eventBus.emit('user-interacted');
      }
    });

    // Botón Con Gafas / Sin Gafas (Acción clara para el usuario)
    const toggleGlassesBtn = document.getElementById('btn-toggle-glasses');
    const toggleGlassesLabel = document.getElementById('glasses-toggle-label');

    toggleGlassesBtn.addEventListener('click', () => {
      this.glassesHUD.toggle();
    });

    eventBus.on('glasses-state-changed', (enabled) => {
      if (enabled) {
        toggleGlassesBtn.classList.remove('off');
        toggleGlassesLabel.textContent = 'Ver sin Gafas';
      } else {
        toggleGlassesBtn.classList.add('off');
        toggleGlassesLabel.textContent = 'Ver con Gafas';
      }
    });

    // Botón Beneficios del Header (Abre y cierra bajo demanda)
    const toggleInfoBtn = document.getElementById('btn-toggle-info');
    toggleInfoBtn.addEventListener('click', () => {
      this.experienceCard.toggle();
    });

    eventBus.on('experience-card-collapsed', (collapsed) => {
      if (collapsed) {
        toggleInfoBtn.classList.remove('active');
      } else {
        toggleInfoBtn.classList.add('active');
      }
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

    // 7. Control de la Portada de Bienvenida (Landing Cover) y Pantalla Completa Automática
    const landingCover = document.getElementById('landing-cover');
    const enterExpBtn = document.getElementById('btn-enter-exp');
    const backToLandingBtn = document.getElementById('btn-back-to-landing');
    const brandHomeBtn = document.getElementById('btn-brand-home');

    // Función segura para solicitar pantalla completa en navegadores móviles, tablets y desktop
    const requestFullscreenSafe = () => {
      try {
        const elem = document.documentElement;
        if (!document.fullscreenElement && !document.webkitFullscreenElement) {
          if (elem.requestFullscreen) {
            elem.requestFullscreen().catch(() => {});
          } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen().catch(() => {});
          } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen().catch(() => {});
          }
        }
      } catch (err) {
        // Ignorar si el navegador bloquea la llamada
      }
    };

    const openSimulator = (sceneId = null) => {
      // Activar pantalla completa inmediatamente al iniciar la experiencia
      requestFullscreenSafe();

      if (sceneId && this.sceneSelector) {
        this.sceneSelector.selectScene(sceneId);
      }
      if (landingCover) {
        landingCover.classList.add('hidden');
      }
    };

    const openLanding = () => {
      if (landingCover) {
        landingCover.classList.remove('hidden');
      }
    };

    if (enterExpBtn) {
      enterExpBtn.addEventListener('click', () => openSimulator());
    }

    // Botones de escenarios directos en la portada
    document.querySelectorAll('.scenario-card-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const scene = btn.dataset.scene;
        openSimulator(scene);
      });
    });

    if (backToLandingBtn) {
      backToLandingBtn.addEventListener('click', () => openLanding());
    }

    if (brandHomeBtn) {
      brandHomeBtn.addEventListener('click', () => openLanding());
    }
  }
}

// Iniciar aplicación al cargar el DOM
window.addEventListener('DOMContentLoaded', () => {
  new App();

  // Ocultar preloader suavemente
  const preloader = document.getElementById('clinic-preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('fade-out');
      setTimeout(() => preloader.remove(), 450);
    }, 350);
  }
});
