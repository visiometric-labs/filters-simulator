/**
 * Escenario 2: Oficina Digital & Pantallas (Fotografía Realista en Primera Persona)
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

    // Coordenadas del monitor ultrawide en la fotografía real
    this.monitorBounds = {
      uMin: 0.31,
      uMax: 0.82,
      vMin: 0.22,
      vMax: 0.62,
    };

    // Lámpara de escritorio a la derecha
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
    if (!this.isLoaded) {
      ctx.fillStyle = '#CBD5E1';
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
   * Renderizado de la radiación de Luz Azul HEV del monitor y su absorción por Blue Cut
   */
  renderLights(ctx, width, height, camera, optical) {
    if (!this.isLoaded || !this.currentDrawRect) return;

    const { x: imgX, y: imgY, w: imgW, h: imgH } = this.currentDrawRect;

    // Coordenadas de la pantalla del monitor en el canvas
    const monX = imgX + this.monitorBounds.uMin * imgW;
    const monY = imgY + this.monitorBounds.vMin * imgH;
    const monW = (this.monitorBounds.uMax - this.monitorBounds.uMin) * imgW;
    const monH = (this.monitorBounds.vMax - this.monitorBounds.vMin) * imgH;

    const monCenterX = monX + monW * 0.5;
    const monCenterY = monY + monH * 0.5;

    // 1. Simulación de la Luz Azul HEV dañina (380-455 nm)
    // Sin Blue Cut (optical.blueLightAbsorption ~0.05): Se emite un halo azul disperso envolvente y deslumbramiento
    // Con Blue Cut (optical.blueLightAbsorption > 0.60): Se neutraliza el resplandor azul y se suaviza la pantalla
    const blueHazeIntensity = (1.0 - optical.blueLightAbsorption) * 0.55;

    if (blueHazeIntensity > 0.08) {
      ctx.save();
      // Halo azul frío radiante que fatiga el ojo
      const hazeRadius = Math.max(monW, monH) * 0.85;
      const hazeGrad = ctx.createRadialGradient(monCenterX, monCenterY, monW * 0.25, monCenterX, monCenterY, hazeRadius);
      hazeGrad.addColorStop(0, `rgba(59, 130, 246, ${blueHazeIntensity * 0.7})`);
      hazeGrad.addColorStop(0.5, `rgba(96, 165, 250, ${blueHazeIntensity * 0.35})`);
      hazeGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = hazeGrad;
      ctx.beginPath();
      ctx.arc(monCenterX, monCenterY, hazeRadius, 0, Math.PI * 2);
      ctx.fill();

      // Destello blanquecino frío sobre las letras del monitor
      ctx.fillStyle = `rgba(219, 234, 254, ${blueHazeIntensity * 0.35})`;
      ctx.fillRect(monX, monY, monW, monH);
      ctx.restore();
    }

    // 2. Reflejo de la lámpara sobre la pantalla (Sin AR rebota; con AR/Crizal se cancela)
    if (optical.flareFactor > 0.2) {
      const lampX = imgX + this.lamp.u * imgW;
      const lampY = imgY + this.lamp.v * imgH;

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
