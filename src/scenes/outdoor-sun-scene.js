/**
 * Escenario 3: Día Soleado y Exteriores (Fotografía Realista en Primera Persona)
 * Muestra una carretera panorámica costera real con sol brillante y reflejo solar sobre el agua,
 * ideal para comprobar el oscurecimiento de Transitions y la cancelación de reflejos del Polarizado.
 */
export class OutdoorSunScene {
  constructor() {
    this.id = 'outdoor-sun';
    this.name = 'Día Soleado';
    this.time = 0;

    this.img = new Image();
    this.img.src = '/scenes/sun-real.jpg';
    this.isLoaded = false;
    this.img.onload = () => {
      this.isLoaded = true;
    };

    // Coordenadas del sol en la fotografía real
    this.sun = {
      u: 0.60,
      v: 0.08,
      size: 45,
    };

    // Zona del reflejo horizontal sobre el agua
    this.waterGlare = {
      u: 0.52,
      v: 0.65,
      radiusX: 180,
      radiusY: 70,
    };
  }

  update(deltaTime) {
    this.time += deltaTime * 0.001;
  }

  renderBase(ctx, width, height, camera) {
    if (!this.isLoaded) {
      ctx.fillStyle = '#0284C7';
      ctx.fillRect(0, 0, width, height);
      return;
    }

    const zoom = 1.30;
    const destW = width * zoom;
    const destH = height * zoom;

    const panRangeX = (destW - width) * 0.5;
    const panRangeY = (destH - height) * 0.5;

    const normYaw = Math.max(-1, Math.min(1, camera.yaw / (camera.fov * 0.6)));
    const normPitch = Math.max(-1, Math.min(1, camera.pitch / camera.maxPitch));

    const drawX = -(panRangeX) - (normYaw * panRangeX * 0.85);
    const drawY = -(panRangeY) + (normPitch * panRangeY * 0.85);

    this.currentDrawRect = { x: drawX, y: drawY, w: destW, h: destH };

    ctx.drawImage(this.img, drawX, drawY, destW, destH);
  }

  /**
   * Renderizado de la corona solar y la cancelación del resplandor por Polarizado
   */
  renderLights(ctx, width, height, camera, optical, uvIntensity = 0.85) {
    if (!this.isLoaded || !this.currentDrawRect) return;

    const { x: imgX, y: imgY, w: imgW, h: imgH } = this.currentDrawRect;

    // 1. Corona del Sol en el cielo
    const sunX = imgX + this.sun.u * imgW;
    const sunY = imgY + this.sun.v * imgH;

    if (sunX > -100 && sunX < width + 100 && sunY > -100 && sunY < height + 100) {
      ctx.save();
      // Corona de resplandor solar
      const sunGlow = ctx.createRadialGradient(sunX, sunY, 35, sunX, sunY, 240);
      sunGlow.addColorStop(0, 'rgba(255, 255, 255, 0.7)');
      sunGlow.addColorStop(0.3, 'rgba(254, 240, 138, 0.4)');
      sunGlow.addColorStop(0.7, 'rgba(253, 224, 71, 0.15)');
      sunGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.fillStyle = sunGlow;
      ctx.beginPath();
      ctx.arc(sunX, sunY, 240, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // 2. Resplandor Horizontal Cegador sobre el Agua (Demostración de Polarizado)
    const glareX = imgX + this.waterGlare.u * imgW;
    const glareY = imgY + this.waterGlare.v * imgH;

    // Sin polarizado (optical.polarizationCut === 0): El reflejo blanco enceguece y tapa el agua
    // Con polarizado (optical.polarizationCut > 0.8): Se cancela el 95% del brillo blanco horizontal
    const glareIntensity = (1.0 - optical.polarizationCut) * 0.85;

    if (glareIntensity > 0.05) {
      ctx.save();
      const waterGlareGrad = ctx.createRadialGradient(glareX, glareY, 20, glareX, glareY, this.waterGlare.radiusX);
      waterGlareGrad.addColorStop(0, `rgba(255, 255, 255, ${glareIntensity * 0.95})`);
      waterGlareGrad.addColorStop(0.4, `rgba(254, 243, 199, ${glareIntensity * 0.6})`);
      waterGlareGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.fillStyle = waterGlareGrad;
      ctx.beginPath();
      ctx.ellipse(glareX, glareY, this.waterGlare.radiusX, this.waterGlare.radiusY, -0.15, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }
}
