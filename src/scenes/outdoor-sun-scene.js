/**
 * Escenario 3: Día Soleado y Exteriores (Fotografía Realista 2K en Primera Persona)
 * Muestra una carretera panorámica costera real con sol brillante y reflejo solar sobre el agua,
 * ideal para comprobar el oscurecimiento de Transitions y la cancelación de reflejos del Polarizado.
 */
export class OutdoorSunScene {
  constructor() {
    this.id = 'outdoor-sun';
    this.name = 'Día Soleado';
    this.time = 0;

    const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
    this.img = new Image();
    this.img.src = `${base}/scenes/sun-real.jpg`;
    this.isLoaded = false;
    this.img.onload = () => {
      this.isLoaded = true;
    };

    this.sun = {
      u: 0.60,
      v: 0.08,
      size: 45,
    };

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
    if (!this.isLoaded || !this.img.naturalWidth) {
      ctx.fillStyle = '#0284C7';
      ctx.fillRect(0, 0, width, height);
      return;
    }

    const imgAspect = this.img.naturalWidth / this.img.naturalHeight;
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

    this.currentDrawRect = { x: drawX, y: drawY, w: destW, h: destH };

    ctx.save();
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(this.img, drawX, drawY, destW, destH);
    ctx.restore();
  }

  renderLights(ctx, width, height, camera, optical, uvIntensity = 0.85) {
    if (!this.isLoaded || !this.currentDrawRect) return;

    const { x: imgX, y: imgY, w: imgW, h: imgH } = this.currentDrawRect;

    const sunX = Math.round(imgX + this.sun.u * imgW);
    const sunY = Math.round(imgY + this.sun.v * imgH);

    if (sunX > -150 && sunX < width + 150 && sunY > -150 && sunY < height + 150) {
      ctx.save();
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

    const glareX = Math.round(imgX + this.waterGlare.u * imgW);
    const glareY = Math.round(imgY + this.waterGlare.v * imgH);

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
