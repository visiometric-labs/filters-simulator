/**
 * Escenario 1: Conducción Nocturna (Fotografía Multicapa Calibrada en Primera Persona)
 * Utiliza placas fotográficas reales alineadas píxel a píxel para cada tratamiento óptico:
 * - Lente Blanca: Deslumbramiento intenso, halos expansivos y velo lumínico sobre el asfalto.
 * - AR Verde: Reducción del 75-80% de destellos, faros contenidos, asfalto y carriles nítidos.
 * - Crizal Multicapa: Máxima claridad (99.5%), negros profundos, corte perfecto sin velo.
 * - Filtro Amarillo: Tinte ámbar de alto contraste que absorbe luz azul molesta de faros LED/xenón.
 */
export class NightDriveScene {
  constructor() {
    this.id = 'night-drive';
    this.name = 'Conducción Nocturna';
    this.time = 0;

    // Placas fotográficas reales calibradas (Definitiva: Mercedes-Benz Clase S en Avenida)
    this.currentProposal = '2';
    this.images = {
      'blanco': this.createImage('/scenes/night-blanco.jpg'),
      'ar-verde': this.createImage('/scenes/night-ar-verde.jpg'),
      'crizal': this.createImage('/scenes/night-crizal.jpg'),
      'amarillo': this.createImage('/scenes/night-amarillo.jpg'),
    };

    // Control de transición suave (cross-fade) entre lentes
    this.currentFilterId = 'blanco';
    this.targetFilterId = 'blanco';
    this.transitionProgress = 1.0;
    this.transitionSpeed = 0.006; // ~180 ms para transición sedosa

    this.currentDrawRect = null;
  }

  createImage(src) {
    const img = new Image();
    img.src = src;
    img.isLoaded = false;
    img.onload = () => {
      img.isLoaded = true;
    };
    return img;
  }

  setProposal(num) {
    this.currentProposal = String(num);
    const src = `/scenes/proposals/proposal-${num}.jpg`;
    this.images.blanco = this.createImage(src);
    this.images['ar-verde'] = this.createImage(src);
    this.images.crizal = this.createImage(src);
    this.images.amarillo = this.createImage(src);
  }

  update(deltaTime) {
    this.time += deltaTime * 0.001;

    if (this.transitionProgress < 1.0) {
      this.transitionProgress = Math.min(1.0, this.transitionProgress + deltaTime * this.transitionSpeed);
    }
  }

  /**
   * Resuelve la imagen correspondiente a un ID de filtro
   */
  getImageForFilter(filterId) {
    if (this.images[filterId]) {
      return this.images[filterId];
    }
    // Mapeos inteligentes para otros tratamientos del catálogo general
    if (filterId === 'blue-cut') {
      return this.images['ar-verde'];
    }
    if (filterId === 'transitions') {
      return this.images['crizal']; // En la noche Transitions está 100% transparente
    }
    if (filterId === 'polarizado') {
      return this.images['crizal'];
    }
    return this.images['blanco'];
  }

  /**
   * Calcula las dimensiones y posición del encuadre fotográfico manteniendo
   * rigurosamente la relación de aspecto sin deformación ni estiramiento.
   */
  computeDrawRect(width, height, camera) {
    const baseImg = this.images['blanco'];
    const naturalW = baseImg.naturalWidth || 2752;
    const naturalH = baseImg.naturalHeight || 1536;

    const imgAspect = naturalW / naturalH;
    const viewAspect = width / height;

    // Zoom suave óptimo (1.08x) para dar margen sutil de inercia de cabeza sin recortar el tablero
    const zoom = 1.08;

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

    const drawX = Math.round(-panRangeX - (normYaw * panRangeX));
    const drawY = Math.round(-panRangeY + (normPitch * panRangeY));

    return { x: drawX, y: drawY, w: destW, h: destH };
  }

  /**
   * PASE 1: Visión Periférica (Fuera de las gafas)
   * Muestra la visión natural sin tratamiento con deslumbramiento fotográfico real.
   */
  renderBase(ctx, width, height, camera) {
    const rect = this.computeDrawRect(width, height, camera);
    this.currentDrawRect = rect;

    const baseImg = this.images['blanco'];
    if (!baseImg.isLoaded) {
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, width, height);
      return;
    }

    ctx.save();
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(baseImg, rect.x, rect.y, rect.w, rect.h);
    ctx.restore();
  }

  /**
   * PASE 2: Visión a través de los Cristales Oftálmicos (Dentro del recorte de las lentes)
   * Muestra la placa fotográfica real correspondiente al filtro seleccionado,
   * con transición suave (cross-fade).
   */
  renderTreated(ctx, width, height, camera, activeFilter) {
    const rect = this.currentDrawRect || this.computeDrawRect(width, height, camera);
    const targetFilterId = activeFilter.id;

    if (targetFilterId !== this.targetFilterId) {
      this.currentFilterId = this.targetFilterId;
      this.targetFilterId = targetFilterId;
      this.transitionProgress = 0.0;
    }

    const currentImg = this.getImageForFilter(this.currentFilterId);
    const targetImg = this.getImageForFilter(this.targetFilterId);

    ctx.save();
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Si estamos en transición entre dos fotos de lentes
    if (this.transitionProgress < 1.0 && currentImg !== targetImg && currentImg.isLoaded) {
      ctx.drawImage(currentImg, rect.x, rect.y, rect.w, rect.h);
      ctx.globalAlpha = this.transitionProgress;
      if (targetImg.isLoaded) {
        ctx.drawImage(targetImg, rect.x, rect.y, rect.w, rect.h);
      }
    } else {
      // Estado estable
      const imgToDraw = targetImg.isLoaded ? targetImg : this.images['blanco'];
      if (imgToDraw.isLoaded) {
        ctx.drawImage(imgToDraw, rect.x, rect.y, rect.w, rect.h);
      }
    }

    ctx.restore();
  }

  /**
   * Las luces y destellos ahora están 100% integrados fotográficamente en las placas reales.
   * Se eliminan por completo las líneas geométricas y círculos artificiales de código.
   */
  renderLights() {
    // No-op: Calibración óptica fotográfica pura
  }
}
