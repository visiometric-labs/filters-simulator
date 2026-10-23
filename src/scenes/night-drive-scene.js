/**
 * Escenario 1: Conducción Nocturna (Fotografía Realista en Primera Persona)
 * Muestra el punto de vista real desde el asiento del conductor con asfalto mojado,
 * autos que vienen de frente con faros deslumbrantes y tablero iluminado.
 */
export class NightDriveScene {
  constructor() {
    this.id = 'night-drive';
    this.name = 'Conducción Nocturna';
    this.time = 0;

    // Cargar fotografía real
    this.img = new Image();
    this.img.src = '/scenes/night-real.jpg';
    this.isLoaded = false;
    this.img.onload = () => {
      this.isLoaded = true;
    };

    // Coordenadas normalizadas (0 a 1) de los faros principales en la foto real
    // En la foto, los autos que vienen de frente están en el carril izquierdo
    this.lightSources = [
      { u: 0.21, v: 0.45, size: 28, color: '#FFFFFF', intensity: 1.0, isHeadlight: true },
      { u: 0.25, v: 0.45, size: 24, color: '#FFFFFF', intensity: 1.0, isHeadlight: true },
      { u: 0.31, v: 0.42, size: 16, color: '#FEF08A', intensity: 0.8, isHeadlight: true },
      { u: 0.36, v: 0.42, size: 14, color: '#FEF08A', intensity: 0.7, isHeadlight: true },
      // Farola elevada en el poste izquierdo
      { u: 0.18, v: 0.12, size: 32, color: '#FCD34D', intensity: 0.85, isStreetLamp: true },
    ];
  }

  update(deltaTime) {
    this.time += deltaTime * 0.001;
  }

  /**
   * Renderiza el fondo fotográfico real con desplazamiento cinemático según giro de cabeza
   */
  renderBase(ctx, width, height, camera) {
    if (!this.isLoaded) {
      // Fondo provisional mientras carga
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, width, height);
      return;
    }

    // Escala para permitir paneo suave (1.35x para que al mover joystick no haya bordes negros)
    const zoom = 1.32;
    const destW = width * zoom;
    const destH = height * zoom;

    // Desplazamiento por Yaw (horizontal) y Pitch (vertical)
    const panRangeX = (destW - width) * 0.5;
    const panRangeY = (destH - height) * 0.5;

    // Factores normalizados de cámara
    const normYaw = Math.max(-1, Math.min(1, camera.yaw / (camera.fov * 0.6)));
    const normPitch = Math.max(-1, Math.min(1, camera.pitch / camera.maxPitch));

    const drawX = -(panRangeX) - (normYaw * panRangeX * 0.85);
    const drawY = -(panRangeY) + (normPitch * panRangeY * 0.85);

    // Guardar para cálculo de coordenadas de luces
    this.currentDrawRect = { x: drawX, y: drawY, w: destW, h: destH };

    ctx.drawImage(this.img, drawX, drawY, destW, destH);
  }

  /**
   * Simulación física de difracción óptica, halos estrellados y reflejos sobre la fotografía real
   */
  renderLights(ctx, width, height, camera, optical) {
    if (!this.isLoaded || !this.currentDrawRect) return;

    const { x: imgX, y: imgY, w: imgW, h: imgH } = this.currentDrawRect;
    const flareFactor = optical.flareFactor; // 1.0 (Sin AR) a 0.05 (Crizal)

    this.lightSources.forEach((light) => {
      // Coordenada exacta en pantalla de cada faro en la foto
      const px = imgX + light.u * imgW;
      const py = imgY + light.v * imgH;

      // Descartar si está fuera de pantalla
      if (px < -100 || px > width + 100 || py < -100 || py > height + 100) return;

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
        const gx = width / 2 - centerDistX * 0.45;
        const gy = height / 2 - centerDistY * 0.45;

        ctx.fillStyle = `rgba(254, 240, 138, ${optical.ghostReflection * 2.5})`;
        ctx.beginPath();
        ctx.arc(gx, gy, light.size * 0.8, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    });
  }
}
