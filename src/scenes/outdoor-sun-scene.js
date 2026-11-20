import { getAssetUrl } from '../core/asset-helper.js';

/**
 * Escenario 3: Día Soleado y Exteriores (Fotografía Realista 2K en Primera Persona)
 * Muestra una carretera panorámica costera real con sol brillante y reflejo solar sobre el agua,
 * calibrada para comprobar:
 * 1. Lente Normal: Deslumbramiento solar directo, reflejos en el agua y asfalto lavado.
 * 2. Fotocromático (Transitions): Oscurecimiento fotoquímico gradual con el Slider UV (Cat. 0 a Cat. 3).
 * 3. Filtro Polarizado: Cancelación de la luz polarizada horizontal (Brewster), eliminando los reflejos
 *    del agua y asfalto, y saturando el color turquesa del lago y el verde de la vegetación.
 * 4. Crizal Multicapa: Máxima transmisión antirreflejante (99.5%) y protección trasera contra rayos UV.
 */
export class OutdoorSunScene {
  constructor() {
    this.id = 'outdoor-sun';
    this.name = 'Día Soleado';
    this.time = 0;

    this.img = new Image();
    this.img.src = getAssetUrl('scenes/sun-real.jpg');
    this.isLoaded = false;
    this.img.onload = () => {
      this.isLoaded = true;
    };

    // Coordenadas normalizadas (u, v) en la placa 2K maestra (2752x1536)
    this.sun = {
      u: 0.60,
      v: 0.08,
      size: 55,
    };

    // Sendero de destellos solares sobre el lago (Sun Glitter Path)
    this.waterGlitter = [
      { u: 0.56, v: 0.54, radiusX: 65, radiusY: 18, weight: 0.70 },
      { u: 0.54, v: 0.59, radiusX: 95, radiusY: 26, weight: 0.85 },
      { u: 0.52, v: 0.65, radiusX: 135, radiusY: 38, weight: 0.95 },
      { u: 0.50, v: 0.71, radiusX: 175, radiusY: 48, weight: 0.75 },
    ];

    // Resplandor especular sobre el asfalto de la carretera
    this.roadGlare = {
      u: 0.73,
      v: 0.69,
      radiusX: 90,
      radiusY: 45,
    };

    this.currentDrawRect = null;
  }

  update(deltaTime) {
    this.time += deltaTime * 0.001;
  }

  /**
   * Calcula las dimensiones y encuadre fotográfico manteniendo rigurosamente
   * la relación de aspecto sin deformación.
   */
  computeDrawRect(width, height, camera) {
    const naturalW = this.img.naturalWidth || 2752;
    const naturalH = this.img.naturalHeight || 1536;

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

    const normYaw = Math.max(-1, Math.min(1, camera.yaw / (camera.fov * 0.55)));
    const normPitch = Math.max(-1, Math.min(1, camera.pitch / camera.maxPitch));

    const drawX = -panRangeX - (normYaw * panRangeX);
    const drawY = -panRangeY + (normPitch * panRangeY);

    return { x: drawX, y: drawY, w: destW, h: destH };
  }

  /**
   * PASE 1: Visión Periférica (Fuera de las gafas)
   * Luz natural sin tratamiento con el resplandor solar ambiental completo.
   */
  renderBase(ctx, width, height, camera) {
    const rect = this.computeDrawRect(width, height, camera);
    this.currentDrawRect = rect;

    if (!this.isLoaded || !this.img.naturalWidth) {
      ctx.fillStyle = '#0284C7';
      ctx.fillRect(0, 0, width, height);
      return;
    }

    ctx.save();
    ctx.imageSmoothingEnabled = true;
    ctx.filter = 'none';
    ctx.drawImage(this.img, rect.x, rect.y, rect.w, rect.h);
    ctx.restore();
  }

  /**
   * PASE 2: Visión a través de los Cristales Oftálmicos (Dentro del recorte HUD)
   * Modula el tratamiento activo con calibración física de contraste, absorción y polarización.
   */
  renderTreated(ctx, width, height, camera, activeFilter, uvIntensity = 0.85) {
    const rect = this.currentDrawRect || this.computeDrawRect(width, height, camera);
    if (!this.isLoaded || !this.img.naturalWidth) return;

    const filterId = activeFilter.id;

    ctx.save();
    ctx.imageSmoothingEnabled = true;

    if (filterId === 'polarizado') {
      // -------------------------------------------------------------
      // FILTRO POLARIZADO (Cancelación de Luz Polarizada Horizontal)
      // Revela el turquesa profundo del agua y verdes ricos de los pinos
      // -------------------------------------------------------------
      ctx.filter = 'contrast(1.30) saturate(1.36) brightness(0.92)';
      ctx.drawImage(this.img, rect.x, rect.y, rect.w, rect.h);
      ctx.filter = 'none';

      // Tinte polarizado Categoría 3 (gris/grafito neutro con confort visual)
      ctx.fillStyle = 'rgba(22, 34, 48, 0.52)';
      ctx.fillRect(0, 0, width, height);

    } else if (filterId === 'transitions') {
      // -------------------------------------------------------------
      // FOTOCROMÁTICO TRANSITIONS (Modulado por Slider de Radiación UV)
      // -------------------------------------------------------------
      if (uvIntensity <= 0.05) {
        // En interiores (UV 0%): Cristal transparente y claro
        ctx.filter = 'contrast(1.02) brightness(1.01)';
        ctx.drawImage(this.img, rect.x, rect.y, rect.w, rect.h);
        ctx.filter = 'none';

        ctx.fillStyle = 'rgba(241, 245, 249, 0.03)';
        ctx.fillRect(0, 0, width, height);
      } else {
        // En exteriores: Oscurecimiento fotoquímico gradual (curva sigmoidal)
        const photoFactor = Math.pow(uvIntensity, 0.85);

        ctx.filter = `brightness(${1.0 - photoFactor * 0.26}) contrast(${1.0 + photoFactor * 0.12})`;
        ctx.drawImage(this.img, rect.x, rect.y, rect.w, rect.h);
        ctx.filter = 'none';

        // Tinte Transitions Gris Grafito
        const tintAlpha = photoFactor * 0.70;
        ctx.fillStyle = `rgba(38, 48, 62, ${tintAlpha})`;
        ctx.fillRect(0, 0, width, height);
      }

    } else if (filterId === 'crizal') {
      // -------------------------------------------------------------
      // CRIZAL MULTICAPA (Antirreflejante Ultra-Transparente 99.5%)
      // -------------------------------------------------------------
      ctx.filter = 'contrast(1.06) brightness(1.02)';
      ctx.drawImage(this.img, rect.x, rect.y, rect.w, rect.h);
      ctx.filter = 'none';

    } else {
      // -------------------------------------------------------------
      // LENTE NORMAL (Sin Tratamiento / Control)
      // -------------------------------------------------------------
      ctx.filter = 'none';
      ctx.drawImage(this.img, rect.x, rect.y, rect.w, rect.h);
    }

    ctx.restore();
  }

  /**
   * Renderizado de Fuentes de Luz y Destellos Ópticos
   * Modula el sol directo, los reflejos en el agua y el asfalto según el filtro activo.
   */
  renderLights(ctx, width, height, camera, optical, uvIntensity = 0.85) {
    if (!this.isLoaded || !this.currentDrawRect) return;

    const { x: imgX, y: imgY, w: imgW, h: imgH } = this.currentDrawRect;

    // 1. Sol Directo y Corona Atmosférica
    const sunX = Math.round(imgX + this.sun.u * imgW);
    const sunY = Math.round(imgY + this.sun.v * imgH);

    if (sunX > -250 && sunX < width + 250 && sunY > -250 && sunY < height + 250) {
      ctx.save();

      // Atenuación de la luminosidad del sol según transmisión del filtro
      const sunAlpha = Math.min(1.0, optical.transmission * (optical.photochromic ? (1.0 - uvIntensity * 0.5) : 1.0));

      // Corona solar brillante
      const sunGlow = ctx.createRadialGradient(sunX, sunY, 20, sunX, sunY, 260);
      sunGlow.addColorStop(0, `rgba(255, 255, 255, ${0.85 * sunAlpha})`);
      sunGlow.addColorStop(0.25, `rgba(254, 240, 138, ${0.45 * sunAlpha})`);
      sunGlow.addColorStop(0.60, `rgba(253, 224, 71, ${0.15 * sunAlpha})`);
      sunGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.fillStyle = sunGlow;
      ctx.beginPath();
      ctx.arc(sunX, sunY, 260, 0, Math.PI * 2);
      ctx.fill();

      // Destellos secundarios y aros Fresnel en Lente Normal (Reflejos internos parásitos)
      if (optical.flareFactor > 0.4) {
        const flareDistX = (width * 0.5 - sunX) * 0.45;
        const flareDistY = (height * 0.5 - sunY) * 0.45;
        const fx1 = sunX + flareDistX;
        const fy1 = sunY + flareDistY;

        const ringGrad = ctx.createRadialGradient(fx1, fy1, 8, fx1, fy1, 60);
        ringGrad.addColorStop(0, 'rgba(254, 215, 170, 0.28)');
        ringGrad.addColorStop(0.7, 'rgba(186, 230, 253, 0.14)');
        ringGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = ringGrad;
        ctx.beginPath();
        ctx.arc(fx1, fy1, 60, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }

    // 2. Reflejo Solar Especular en el Lago (Sun Glitter Path)
    // El polarizado elimina el 95%+ de esta luz polarizada horizontal
    const polCut = optical.polarizationCut || 0.0;
    const isPhotochromic = optical.photochromic || false;

    // Con Polarizado: corte drástico del resplandor (revelando la profundidad del agua)
    // Con Transitions: oscurecido proporcionalmente pero el resplandor sigue presente
    let glitterIntensity = (1.0 - polCut);
    if (isPhotochromic) {
      glitterIntensity *= (1.0 - uvIntensity * 0.60);
    }

    if (glitterIntensity > 0.06) {
      ctx.save();
      const waveShimmer = Math.sin(this.time * 2.5) * 0.08;

      this.waterGlitter.forEach((glint) => {
        const gx = Math.round(imgX + glint.u * imgW);
        const gy = Math.round(imgY + glint.v * imgH);

        if (gx > -100 && gx < width + 100 && gy > -100 && gy < height + 100) {
          const effectiveAlpha = Math.max(0, Math.min(1, (glint.weight + waveShimmer) * glitterIntensity));

          const grad = ctx.createRadialGradient(gx, gy, 6, gx, gy, glint.radiusX);
          grad.addColorStop(0, `rgba(255, 255, 255, ${effectiveAlpha * 0.85})`);
          grad.addColorStop(0.35, `rgba(254, 243, 199, ${effectiveAlpha * 0.48})`);
          grad.addColorStop(0.75, `rgba(224, 242, 254, ${effectiveAlpha * 0.18})`);
          grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.ellipse(gx, gy, glint.radiusX, glint.radiusY, -0.12, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      ctx.restore();
    }

    // 3. Resplandor Especular sobre el Asfalto (Pavimento de la carretera)
    // El polarizado elimina el deslumbramiento blanco del pavimento
    let roadGlareIntensity = (1.0 - polCut) * 0.70;
    if (isPhotochromic) {
      roadGlareIntensity *= (1.0 - uvIntensity * 0.55);
    }

    if (roadGlareIntensity > 0.06) {
      const rx = Math.round(imgX + this.roadGlare.u * imgW);
      const ry = Math.round(imgY + this.roadGlare.v * imgH);

      if (rx > -100 && rx < width + 100 && ry > -100 && ry < height + 100) {
        ctx.save();
        const roadGrad = ctx.createRadialGradient(rx, ry, 10, rx, ry, this.roadGlare.radiusX);
        roadGrad.addColorStop(0, `rgba(255, 255, 255, ${roadGlareIntensity * 0.65})`);
        roadGrad.addColorStop(0.5, `rgba(254, 243, 199, ${roadGlareIntensity * 0.32})`);
        roadGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = roadGrad;
        ctx.beginPath();
        ctx.ellipse(rx, ry, this.roadGlare.radiusX, this.roadGlare.radiusY, 0.35, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }
  }
}
