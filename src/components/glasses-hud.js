import { eventBus } from '../core/event-bus.js';

/**
 * Montura Oftálmica en Primera Persona (HUD POV Binocular Realista)
 * Basada en la óptica fisiológica de la visión binocular humana (dos ojos):
 * - En la vida real, los campos visuales de ambos ojos se fusionan en una apertura panorámica continua.
 * - El puente nasal jamás divide la carretera con una viga vertical (diplopía fisiológica / punto ciego).
 * - El marco bordea naturalmente la periferia (cejas, pómulos y sienes) con desenfoque de profundidad (DoF).
 * - Incluye una sutil silueta nasal inferior anatómica donde el rostro se une al marco.
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

    // SVG en resolución 1920x1080 (16:9) con diseño óptico panorámico binocular
    this.element.innerHTML = `
      <svg id="glasses-svg" width="100%" height="100%" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <!-- Desenfoque de Profundidad de Campo (DoF): simula que el marco está a 14 mm de la córnea -->
          <filter id="dof-blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" />
          </filter>

          <!-- Sombra de oclusión periférica suave en contacto con el rostro -->
          <filter id="peripheral-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="10" />
          </filter>

          <!-- Acabado Titanio / Acetato Mate Ergonómico -->
          <linearGradient id="frameGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#1E293B" stop-opacity="0.95" />
            <stop offset="35%" stop-color="#0F172A" stop-opacity="0.98" />
            <stop offset="65%" stop-color="#090D16" stop-opacity="0.98" />
            <stop offset="100%" stop-color="#1E293B" stop-opacity="0.95" />
          </linearGradient>

          <!-- Bisel interno del cristal facetado de laboratorio -->
          <linearGradient id="bevelGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="rgba(255, 255, 255, 0.60)" />
            <stop offset="45%" stop-color="rgba(255, 255, 255, 0.08)" />
            <stop offset="100%" stop-color="rgba(255, 255, 255, 0.40)" />
          </linearGradient>

          <!-- Reflejo residual específico del tratamiento en el borde del cristal -->
          <linearGradient id="lensEdgeSheen" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="rgba(255, 255, 255, 0)" />
            <stop offset="85%" stop-color="rgba(255, 255, 255, 0)" />
            <stop offset="100%" stop-color="var(--edge-sheen-color, rgba(16, 185, 129, 0.40))" />
          </linearGradient>
        </defs>

        <!-- Sombra periférica de oclusión facial -->
        <g filter="url(#peripheral-shadow)" opacity="0.55">
          <path d="M 120 110 
                   C 600 75, 1320 75, 1800 110 
                   C 1880 480, 1870 780, 1760 950 
                   C 1420 1020, 1150 1010, 1020 930 
                   C 990 890, 960 875, 930 890 
                   C 900 930, 770 1010, 500 1020 
                   C 280 1020, 190 980, 160 950 
                   C 50 780, 40 480, 120 110 Z" 
                fill="none" stroke="#000000" stroke-width="28" />
        </g>

        <!-- Marco Oftálmico Panorámico de Alta Definición (Full HD Vectorial Nítido) -->
        <g id="glasses-frame-group">
          <!-- Silueta del Marco Panorámico (Borde externo) -->
          <path d="M 120 110 
                   C 600 75, 1320 75, 1800 110 
                   C 1880 480, 1870 780, 1760 950 
                   C 1420 1020, 1150 1010, 1020 930 
                   C 990 890, 960 875, 930 890 
                   C 900 930, 770 1010, 500 1020 
                   C 280 1020, 190 980, 160 950 
                   C 50 780, 40 480, 120 110 Z" 
                fill="none" 
                stroke="url(#frameGradient)" 
                stroke-width="16" 
                stroke-linejoin="round" />

          <!-- Bisel interno del cristal óptico -->
          <path d="M 128 118 
                   C 605 83, 1315 83, 1792 118 
                   C 1868 480, 1858 775, 1752 942 
                   C 1415 1010, 1148 1000, 1022 922 
                   C 992 882, 960 868, 928 882 
                   C 898 922, 772 1000, 505 1010 
                   C 285 1010, 195 972, 168 942 
                   C 60 775, 50 480, 128 118 Z" 
                fill="none" 
                stroke="url(#bevelGradient)" 
                stroke-width="3" />

          <!-- Sutil destello periférico del cristal (Edge Sheen dinámico) -->
          <path d="M 134 124 
                   C 610 90, 1310 90, 1786 124 
                   C 1860 480, 1850 770, 1746 935 
                   C 1410 1002, 1145 992, 1025 916 
                   C 995 876, 960 862, 925 876 
                   C 895 916, 775 992, 510 1002 
                   C 290 1002, 200 965, 174 935 
                   C 68 770, 58 480, 134 124 Z" 
                fill="none" 
                stroke="url(#lensEdgeSheen)" 
                stroke-width="4" />

          <!-- Patillas exteriores que conectan hacia las sienes -->
          <path d="M 120 140 L 0 115" stroke="url(#frameGradient)" stroke-width="16" stroke-linecap="round" />
          <path d="M 1800 140 L 1920 115" stroke="url(#frameGradient)" stroke-width="16" stroke-linecap="round" />
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
      sheenColor = 'rgba(16, 185, 129, 0.45)'; // Reflejo residual verde esmeralda característico
    } else if (filter.id === 'blue-cut') {
      sheenColor = 'rgba(59, 130, 246, 0.45)'; // Reflejo violeta / azul metálico
    } else if (filter.id === 'crizal') {
      sheenColor = 'rgba(224, 231, 255, 0.20)'; // Reflejo mínimo transparente puro de alta gama
    } else if (filter.id === 'amarillo') {
      sheenColor = 'rgba(245, 158, 11, 0.45)'; // Reflejo dorado / ámbar
    } else if (filter.id === 'blanco') {
      sheenColor = 'rgba(255, 255, 255, 0.70)'; // Reflejo blanco opaco parásito
    }

    this.element.style.setProperty('--edge-sheen-color', sheenColor);
  }

  /**
   * Recorta el Canvas para mostrar la imagen con tratamiento óptico
   * exactamente dentro de la apertura panorámica binocular de las lentes.
   */
  clipLensesOnCanvas(ctx, width, height) {
    if (!this.glassesEnabled) {
      return false;
    }

    const scale = Math.max(width / 1920, height / 1080);
    const ox = (width - 1920 * scale) / 2;
    const oy = (height - 1080 * scale) / 2;

    const tx = (x) => Math.round(ox + x * scale);
    const ty = (y) => Math.round(oy + y * scale);

    ctx.save();
    ctx.beginPath();

    // Apertura Panorámica Binocular Continua
    ctx.moveTo(tx(128), ty(118));
    ctx.bezierCurveTo(
      tx(605), ty(83),
      tx(1315), ty(83),
      tx(1792), ty(118)
    );
    ctx.bezierCurveTo(
      tx(1868), ty(480),
      tx(1858), ty(775),
      tx(1752), ty(942)
    );
    ctx.bezierCurveTo(
      tx(1415), ty(1010),
      tx(1148), ty(1000),
      tx(1022), ty(922)
    );
    ctx.bezierCurveTo(
      tx(992), ty(882),
      tx(960), ty(868),
      tx(928), ty(882)
    );
    ctx.bezierCurveTo(
      tx(898), ty(922),
      tx(772), ty(1000),
      tx(505), ty(1010)
    );
    ctx.bezierCurveTo(
      tx(285), ty(1010),
      tx(195), ty(972),
      tx(168), ty(942)
    );
    ctx.bezierCurveTo(
      tx(60), ty(775),
      tx(50), ty(480),
      tx(128), ty(118)
    );
    ctx.closePath();

    ctx.clip();
    return true;
  }
}
