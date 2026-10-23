import { eventBus } from '../core/event-bus.js';

/**
 * Montura Oftálmica en Primera Persona (HUD POV)
 * Genera el marco visual de las gafas y calcula las aperturas de las lentes
 */
export class GlassesHUD {
  constructor(containerElement) {
    this.container = containerElement;
    this.element = null;
    this.glassesEnabled = true;

    this.render();
    this.bindEvents();
  }

  render() {
    this.element = document.createElement('div');
    this.element.className = 'glasses-hud-layer';

    // SVG de alta definición que representa la montura oftálmica en primera persona
    this.element.innerHTML = `
      <svg id="glasses-svg" width="100%" height="100%" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <!-- Gradiente para el acetato/titanio de la montura -->
          <linearGradient id="frameGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#1E293B" />
            <stop offset="50%" stop-color="#0F172A" />
            <stop offset="100%" stop-color="#334155" />
          </linearGradient>

          <!-- Bisel interno del cristal -->
          <linearGradient id="bevelGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="rgba(255, 255, 255, 0.4)" />
            <stop offset="40%" stop-color="rgba(255, 255, 255, 0.05)" />
            <stop offset="100%" stop-color="rgba(255, 255, 255, 0.2)" />
          </linearGradient>

          <!-- Reflejo tenue residual en el borde del lente (cambia dinámicamente según el filtro) -->
          <linearGradient id="lensEdgeSheen" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="rgba(255, 255, 255, 0)" />
            <stop offset="85%" stop-color="rgba(255, 255, 255, 0)" />
            <stop offset="100%" stop-color="var(--edge-sheen-color, rgba(16, 185, 129, 0.25))" />
          </linearGradient>
        </defs>

        <!-- Silueta de la Montura Oftálmica Moderna -->
        <g id="glasses-frame-group">
          <!-- Puente Nasal Central -->
          <path d="M 740 370 Q 800 350 860 370 Q 855 385 800 378 Q 745 385 740 370 Z" fill="url(#frameGradient)" stroke="#0F172A" stroke-width="2" />

          <!-- Plaquetas nasales sutiles -->
          <ellipse cx="742" cy="420" rx="6" ry="18" fill="rgba(255, 255, 255, 0.4)" transform="rotate(-15 742 420)" />
          <ellipse cx="858" cy="420" rx="6" ry="18" fill="rgba(255, 255, 255, 0.4)" transform="rotate(15 858 420)" />

          <!-- ARO IZQUIERDO (Borde de acetato) -->
          <!-- Curva suave ergonómica oftálmica (Panto moderno) -->
          <path d="M 270 330 
                   C 360 310, 680 310, 740 350
                   C 760 440, 745 610, 670 665
                   C 570 720, 370 710, 290 645
                   C 230 580, 215 400, 270 330 Z" 
                fill="none" 
                stroke="url(#frameGradient)" 
                stroke-width="24" 
                stroke-linejoin="round" />

          <!-- Bisel interior del cristal izquierdo -->
          <path d="M 280 340 
                   C 365 322, 670 322, 728 358
                   C 746 442, 732 600, 662 652
                   C 568 704, 380 695, 304 635
                   C 248 574, 230 405, 280 340 Z" 
                fill="none" 
                stroke="url(#bevelGradient)" 
                stroke-width="4" />

          <!-- ARO DERECHO (Borde de acetato) -->
          <path d="M 1330 330 
                   C 1240 310, 920 310, 860 350
                   C 840 440, 855 610, 930 665
                   C 1030 720, 1230 710, 1310 645
                   C 1370 580, 1385 400, 1330 330 Z" 
                fill="none" 
                stroke="url(#frameGradient)" 
                stroke-width="24" 
                stroke-linejoin="round" />

          <!-- Bisel interior del cristal derecho -->
          <path d="M 1320 340 
                   C 1235 322, 930 322, 872 358
                   C 854 442, 868 600, 938 652
                   C 1032 704, 1220 695, 1296 635
                   C 1352 574, 1370 405, 1320 340 Z" 
                fill="none" 
                stroke="url(#bevelGradient)" 
                stroke-width="4" />

          <!-- Patillas exteriores que se pierden hacia los lados -->
          <path d="M 225 350 L 0 320" stroke="url(#frameGradient)" stroke-width="22" stroke-linecap="round" />
          <path d="M 1375 350 L 1600 320" stroke="url(#frameGradient)" stroke-width="22" stroke-linecap="round" />
        </g>
      </svg>
    `;

    this.container.appendChild(this.element);
  }

  bindEvents() {
    eventBus.on('filter-changed', (filter) => {
      this.updateEdgeSheen(filter);
    });

    eventBus.on('toggle-glasses', () => {
      this.toggle();
    });
  }

  toggle() {
    this.glassesEnabled = !this.glassesEnabled;
    if (this.glassesEnabled) {
      this.element.classList.remove('glasses-off');
    } else {
      this.element.classList.add('glasses-off');
    }
    eventBus.emit('glasses-state-changed', this.glassesEnabled);
  }

  updateEdgeSheen(filter) {
    if (!this.element) return;
    let sheenColor = 'rgba(255, 255, 255, 0)';

    if (filter.id === 'ar-verde') {
      sheenColor = 'rgba(16, 185, 129, 0.35)'; // Esmeralda suave
    } else if (filter.id === 'blue-cut') {
      sheenColor = 'rgba(59, 130, 246, 0.35)'; // Azul cobalto suave
    } else if (filter.id === 'crizal') {
      sheenColor = 'rgba(255, 255, 255, 0.15)'; // Reflejo mínimo puro
    } else if (filter.id === 'blanco') {
      sheenColor = 'rgba(255, 255, 255, 0.6)'; // Reflejo blanco opaco parásito
    }

    this.element.style.setProperty('--edge-sheen-color', sheenColor);
  }

  /**
   * Genera el Path de recorte en el Canvas para aplicar los filtros SOLO dentro de las dos lentes
   */
  clipLensesOnCanvas(ctx, width, height) {
    if (!this.glassesEnabled) {
      // Si el paciente se quita las gafas, no recortamos (todo es visión directa sin lente)
      return false;
    }

    const scaleX = width / 1600;
    const scaleY = height / 900;

    ctx.save();
    ctx.beginPath();

    // Lente Izquierda
    ctx.moveTo(280 * scaleX, 340 * scaleY);
    ctx.bezierCurveTo(
      365 * scaleX, 322 * scaleY,
      670 * scaleX, 322 * scaleY,
      728 * scaleX, 358 * scaleY
    );
    ctx.bezierCurveTo(
      746 * scaleX, 442 * scaleY,
      732 * scaleX, 600 * scaleY,
      662 * scaleX, 652 * scaleY
    );
    ctx.bezierCurveTo(
      568 * scaleX, 704 * scaleY,
      380 * scaleX, 695 * scaleY,
      304 * scaleX, 635 * scaleY
    );
    ctx.bezierCurveTo(
      248 * scaleX, 574 * scaleY,
      230 * scaleX, 405 * scaleY,
      280 * scaleX, 340 * scaleY
    );
    ctx.closePath();

    // Lente Derecha
    ctx.moveTo(1320 * scaleX, 340 * scaleY);
    ctx.bezierCurveTo(
      1235 * scaleX, 322 * scaleY,
      930 * scaleX, 322 * scaleY,
      872 * scaleX, 358 * scaleY
    );
    ctx.bezierCurveTo(
      854 * scaleX, 442 * scaleY,
      868 * scaleX, 600 * scaleY,
      938 * scaleX, 652 * scaleY
    );
    ctx.bezierCurveTo(
      1032 * scaleX, 704 * scaleY,
      1220 * scaleX, 695 * scaleY,
      1296 * scaleX, 635 * scaleY
    );
    ctx.bezierCurveTo(
      1352 * scaleX, 574 * scaleY,
      1370 * scaleX, 405 * scaleY,
      1320 * scaleX, 340 * scaleY
    );
    ctx.closePath();

    ctx.clip();
    return true;
  }
}
