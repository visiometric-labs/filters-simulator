import { getAssetUrl } from '../core/asset-helper.js';

/**
 * Escenario 2: Oficina Digital & Pantallas (Fotografía Multicapa Calibrada 2K en Primera Persona)
 * Utiliza 4 placas fotográficas reales alineadas píxel a píxel para cada tratamiento óptico:
 * - Lente Blanca: Fatiga visual con luz LED fría dispersa, velo deslumbrante y reflejo de lámpara.
 * - AR Verde: Neutralización de reflejos parásitos de lámpara y ventana, claridad estándar.
 * - Filtro Blue Cut: Transformación natural del blanco LED agresivo en confort cálido descansado,
 *   con máximo contraste y nitidez en documentos, gráficos y números de hojas de cálculo.
 * - Crizal Multicapa: Máxima transmisión (99.5%), nitidez quirúrgica en caracteres y cero reflejos.
 */
export class DigitalOfficeScene {
  constructor() {
    this.id = 'digital-office';
    this.name = 'Oficina y Pantallas';
    this.time = 0;

    // Placas fotográficas reales calibradas 2K Master HD (2752x1536)
    this.images = {
      'blanco': this.createImage('/scenes/office-blanco.jpg?v=2'),
      'ar-verde': this.createImage('/scenes/office-ar-verde.jpg?v=2'),
      'blue-cut': this.createImage('/scenes/office-blue-cut.jpg?v=2'),
      'crizal': this.createImage('/scenes/office-crizal.jpg?v=2'),
    };

    // Control de transición suave (cross-fade) entre lentes
    this.currentFilterId = 'blue-cut';
    this.targetFilterId = 'blue-cut';
    this.transitionProgress = 1.0;
    this.transitionDuration = 260; // ms

    this.currentDrawRect = null;
  }

  createImage(src) {
    const fullPath = getAssetUrl(src);
    const img = new Image();
    img.src = fullPath;
    img.isLoaded = false;
    img.onload = () => {
      img.isLoaded = true;
    };
    return img;
  }

  update(deltaTime) {
    this.time += deltaTime * 0.001;

    if (this.transitionProgress < 1.0) {
      this.transitionProgress = Math.min(1.0, this.transitionProgress + deltaTime / this.transitionDuration);
    }
  }

  /**
   * Resuelve la imagen correspondiente al filtro activo
   */
  getImageForFilter(filterId) {
    if (this.images[filterId]) {
      return this.images[filterId];
    }
    return this.images['blanco'];
  }

  /**
   * Encuadre fotográfico con relación de aspecto exacta y libertad de mirada
   */
  computeDrawRect(width, height, camera) {
    const baseImg = this.images['blanco'];
    const naturalW = baseImg.naturalWidth || 2752;
    const naturalH = baseImg.naturalHeight || 1536;

    const imgAspect = naturalW / naturalH;
    const viewAspect = width / height;
    const zoom = 1.15;

    let destW, destH;
    if (viewAspect > imgAspect) {
      destW = width * zoom;
      destH = destW / imgAspect;
    } else {
      destH = height * zoom;
      destW = destH * imgAspect;
    }

    const panRangeX = (destW - width) * 0.5;
    const panRangeY = (destH - height) * 0.5;

    // Normalización de rotación de cabeza
    const normYaw = Math.max(-1, Math.min(1, camera.yaw / (camera.fov * 0.55)));
    const normPitch = Math.max(-1, Math.min(1, camera.pitch / camera.maxPitch));

    // Coordenadas flotantes subpíxel para interpolación 100% fluida a 60-144 FPS
    const drawX = -panRangeX - (normYaw * panRangeX);
    const drawY = -panRangeY + (normPitch * panRangeY);

    return { x: drawX, y: drawY, w: destW, h: destH };
  }

  /**
   * PASE 1: Visión Periférica (Fuera de las gafas)
   * Muestra la visión natural sin tratamiento con luz LED fría y reflejos.
   */
  renderBase(ctx, width, height, camera) {
    const rect = this.computeDrawRect(width, height, camera);
    this.currentDrawRect = rect;

    const baseImg = this.images['blanco'];
    if (!baseImg.isLoaded) {
      ctx.fillStyle = '#CBD5E1';
      ctx.fillRect(0, 0, width, height);
      return;
    }

    ctx.save();
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(baseImg, rect.x, rect.y, rect.w, rect.h);
    ctx.restore();
  }

  /**
   * Renderiza el cuadro de un filtro con soporte para calibración sutil de confort Blue Cut
   */
  drawFilterFrame(ctx, filterId, rect, opacity = 1.0) {
    if (opacity <= 0) return;
    ctx.save();
    ctx.globalAlpha = opacity;

    if (filterId === 'blue-cut') {
      // Base Crizal de máxima nitidez tipográfica y contraste clínico
      const crizalImg = this.images['crizal'] && this.images['crizal'].isLoaded ? this.images['crizal'] : this.images['blanco'];
      const blueCutImg = this.images['blue-cut'];

      if (crizalImg && crizalImg.isLoaded) {
        ctx.drawImage(crizalImg, rect.x, rect.y, rect.w, rect.h);
      }
      if (blueCutImg && blueCutImg.isLoaded) {
        // Tinte suave de reposo visual marfil (42% de opacidad para eliminar el exceso de amarillo y mantener el descanso)
        ctx.globalAlpha = opacity * 0.42;
        ctx.drawImage(blueCutImg, rect.x, rect.y, rect.w, rect.h);
      }
    } else {
      const img = this.getImageForFilter(filterId);
      const imgToDraw = (img && img.isLoaded) ? img : this.images['blanco'];
      if (imgToDraw && imgToDraw.isLoaded) {
        ctx.drawImage(imgToDraw, rect.x, rect.y, rect.w, rect.h);
      }
    }

    ctx.restore();
  }

  /**
   * PASE 2: Visión a través de los Cristales Oftálmicos (Dentro de la montura)
   * Muestra la placa fotográfica real con el tratamiento óptico activo sin pegatinas artificiales.
   */
  renderTreated(ctx, width, height, camera, activeFilter) {
    const rect = this.currentDrawRect || this.computeDrawRect(width, height, camera);
    const targetFilterId = activeFilter.id;

    if (targetFilterId !== this.targetFilterId) {
      this.currentFilterId = this.targetFilterId;
      this.targetFilterId = targetFilterId;
      this.transitionProgress = 0.0;
    }

    ctx.save();
    ctx.imageSmoothingEnabled = true;

    // Transición suave entre fotos de lentes
    if (this.transitionProgress < 1.0 && this.currentFilterId !== this.targetFilterId) {
      const t = this.transitionProgress;
      const smoothAlpha = t * t * (3 - 2 * t);
      this.drawFilterFrame(ctx, this.currentFilterId, rect, 1.0);
      this.drawFilterFrame(ctx, this.targetFilterId, rect, smoothAlpha);
    } else {
      // Estado estable
      this.drawFilterFrame(ctx, this.targetFilterId, rect, 1.0);
    }

    ctx.restore();
  }

  /**
   * Las propiedades ópticas están 100% integradas a nivel fotográfico.
   * Se eliminan por completo los rectángulos artificiales y gradientes de código.
   */
  renderLights() {
    // No-op: Calibración óptica fotográfica pura
  }
}
