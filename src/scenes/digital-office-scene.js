/**
 * Escenario 2: Oficina Digital & Pantallas (Fotografía Realista 2K en Primera Persona)
 * Muestra un escritorio ejecutivo nórdico real con gran monitor curvo LED, teclado,
 * ventana con luz natural y lámpara de escritorio.
 */
export class DigitalOfficeScene {
  constructor() {
    this.id = 'digital-office';
    this.name = 'Oficina y Pantallas';
    this.time = 0;

    this.img = new Image();
    this.img.src = '/scenes/office-real.jpg';
    this.isLoaded = false;
    this.img.onload = () => {
      this.isLoaded = true;
    };

    // Coordenadas del monitor ultrawide en la fotografía real 2K
    this.monitorBounds = {
      uMin: 0.31,
      uMax: 0.82,
      vMin: 0.22,
      vMax: 0.62,
    };

    this.lamp = {
      u: 0.88,
      v: 0.38,
      size: 35,
    };
  }

  update(deltaTime) {
    this.time += deltaTime * 0.001;
  }

  renderBase(ctx, width, height, camera) {
    if (!this.isLoaded || !this.img.naturalWidth) {
      ctx.fillStyle = '#CBD5E1';
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

  renderLights(ctx, width, height, camera, optical) {
    if (!this.isLoaded || !this.currentDrawRect) return;

    const { x: imgX, y: imgY, w: imgW, h: imgH } = this.currentDrawRect;

    const monX = Math.round(imgX + this.monitorBounds.uMin * imgW);
    const monY = Math.round(imgY + this.monitorBounds.vMin * imgH);
    const monW = Math.round((this.monitorBounds.uMax - this.monitorBounds.uMin) * imgW);
    const monH = Math.round((this.monitorBounds.vMax - this.monitorBounds.vMin) * imgH);

    const monCenterX = monX + monW * 0.5;
    const monCenterY = monY + monH * 0.5;

    const blueHazeIntensity = (1.0 - optical.blueLightAbsorption) * 0.55;

    if (blueHazeIntensity > 0.08) {
      ctx.save();
      const hazeRadius = Math.max(monW, monH) * 0.85;
      const hazeGrad = ctx.createRadialGradient(monCenterX, monCenterY, monW * 0.25, monCenterX, monCenterY, hazeRadius);
      hazeGrad.addColorStop(0, `rgba(59, 130, 246, ${blueHazeIntensity * 0.7})`);
      hazeGrad.addColorStop(0.5, `rgba(96, 165, 250, ${blueHazeIntensity * 0.35})`);
      hazeGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = hazeGrad;
      ctx.beginPath();
      ctx.arc(monCenterX, monCenterY, hazeRadius, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = `rgba(219, 234, 254, ${blueHazeIntensity * 0.35})`;
      ctx.fillRect(monX, monY, monW, monH);
      ctx.restore();
    }

    if (optical.flareFactor > 0.2) {
      const lampX = Math.round(imgX + this.lamp.u * imgW);
      const lampY = Math.round(imgY + this.lamp.v * imgH);

      ctx.save();
      const lampGlow = ctx.createRadialGradient(lampX, lampY, 10, lampX, lampY, 120);
      lampGlow.addColorStop(0, `rgba(254, 243, 199, ${optical.flareFactor * 0.7})`);
      lampGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = lampGlow;
      ctx.beginPath();
      ctx.arc(lampX, lampY, 120, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }
}
