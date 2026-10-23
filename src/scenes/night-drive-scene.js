/**
 * Escenario 1: Conducción Nocturna (Fotografía Realista 2K en Primera Persona)
 * Muestra el punto de vista real desde el asiento del conductor con asfalto mojado,
 * autos que vienen de frente con faros deslumbrantes y tablero iluminado.
 */
export class NightDriveScene {
  constructor() {
    this.id = 'night-drive';
    this.name = 'Conducción Nocturna';
    this.time = 0;

    this.img = new Image();
    this.img.src = '/scenes/night-real.jpg';
    this.isLoaded = false;
    this.img.onload = () => {
      this.isLoaded = true;
    };

    // Coordenadas normalizadas (0 a 1) de los faros principales en la foto real 2K
    this.lightSources = [
      { u: 0.21, v: 0.45, size: 30, color: '#FFFFFF', intensity: 1.0, isHeadlight: true },
      { u: 0.25, v: 0.45, size: 26, color: '#FFFFFF', intensity: 1.0, isHeadlight: true },
      { u: 0.31, v: 0.42, size: 18, color: '#FEF08A', intensity: 0.8, isHeadlight: true },
      { u: 0.36, v: 0.42, size: 16, color: '#FEF08A', intensity: 0.7, isHeadlight: true },
      { u: 0.18, v: 0.12, size: 34, color: '#FCD34D', intensity: 0.85, isStreetLamp: true },
    ];
  }

  update(deltaTime) {
    this.time += deltaTime * 0.001;
  }

  /**
   * Renderiza el fondo fotográfico real preservando rigurosamente su relación de aspecto
   * y alineando los píxeles para evitar desenfoque o pixelación.
   */
  renderBase(ctx, width, height, camera) {
    if (!this.isLoaded || !this.img.naturalWidth) {
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, width, height);
      return;
    }

    // Preservar la relación de aspecto nativa del archivo 2K (16:9)
    const imgAspect = this.img.naturalWidth / this.img.naturalHeight;
    const viewAspect = width / height;
    const zoom = 1.25; // Margen óptimo para permitir paneo sin deformar

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

    // Redondeo entero para nitidez pixel-perfect
    const drawX = Math.round(-panRangeX - (normYaw * panRangeX));
    const drawY = Math.round(-panRangeY + (normPitch * panRangeY));

    this.currentDrawRect = { x: drawX, y: drawY, w: destW, h: destH };

    ctx.save();
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(this.img, drawX, drawY, destW, destH);
    ctx.restore();
  }

  /**
   * Simulación física de difracción óptica, halos estrellados y reflejos sobre la fotografía real
   */
  renderLights(ctx, width, height, camera, optical) {
    if (!this.isLoaded || !this.currentDrawRect) return;

    const { x: imgX, y: imgY, w: imgW, h: imgH } = this.currentDrawRect;
    const flareFactor = optical.flareFactor; // 1.0 (Sin AR) a 0.05 (Crizal)

    this.lightSources.forEach((light) => {
      const px = Math.round(imgX + light.u * imgW);
      const py = Math.round(imgY + light.v * imgH);

      if (px < -150 || px > width + 150 || py < -150 || py > height + 150) return;

      ctx.save();

      // 1. Destello cegador sobre los faros de los autos (Sin AR)
      if (flareFactor > 0.08) {
        // Halo difuso envolvente que encandila la vista
        const haloRadius = light.size * (flareFactor * 7.5 + 1.2);
        const haloGrad = ctx.createRadialGradient(px, py, light.size * 0.3, px, py, haloRadius);
        haloGrad.addColorStop(0, `rgba(255, 255, 255, ${0.9 * flareFactor})`);
        haloGrad.addColorStop(0.25, `rgba(254, 240, 138, ${0.65 * flareFactor})`);
        haloGrad.addColorStop(0.65, `rgba(253, 186, 116, ${0.3 * flareFactor})`);
        haloGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = haloGrad;
        ctx.beginPath();
        ctx.arc(px, py, haloRadius, 0, Math.PI * 2);
        ctx.fill();

        // Destellos estrellados puntiagudos (Star-burst spikes característicos de la falta de AR)
        const spikeCount = light.isHeadlight ? 8 : 6;
        const spikeLength = light.size * (flareFactor * 16 + 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.75 * flareFactor})`;
        ctx.lineWidth = 2.2 * flareFactor;

        for (let s = 0; s < spikeCount; s++) {
          const angle = (s * (Math.PI / (spikeCount / 2))) + (this.time * 0.04);
          const x2 = px + Math.cos(angle) * spikeLength;
          const y2 = py + Math.sin(angle) * spikeLength;

          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
      }

      // 2. Reflejos parásitos internos (Ghost reflections característicos del lente blanco sin tratamiento)
      if (optical.ghostReflection > 0.04 && light.isHeadlight) {
        const centerDistX = (px - width / 2);
        const centerDistY = (py - height / 2);
        const gx = Math.round(width / 2 - centerDistX * 0.45);
        const gy = Math.round(height / 2 - centerDistY * 0.45);

        ctx.fillStyle = `rgba(254, 240, 138, ${optical.ghostReflection * 2.5})`;
        ctx.beginPath();
        ctx.arc(gx, gy, light.size * 0.8, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    });
  }
}
