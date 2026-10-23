/**
 * Escenario 1: Conducción Nocturna (Night Drive)
 * Simula tráfico en carretera, faros de autos de frente, postes de luz y deslumbramiento
 */
export class NightDriveScene {
  constructor() {
    this.id = 'night-drive';
    this.name = 'Conducción Nocturna';
    this.time = 0;

    // Elementos lumínicos del entorno nocturno (coordenadas angulares Yaw, Pitch en radianes)
    this.lights = [
      // Faros del auto que viene de frente por el carril izquierdo
      { type: 'headlight', yaw: -0.22, pitch: -0.06, color: '#FFFFFF', intensity: 1.0, size: 14, isLeft: true },
      { type: 'headlight', yaw: -0.16, pitch: -0.06, color: '#FFFFFF', intensity: 1.0, size: 14, isLeft: false },

      // Faros de un segundo auto más lejano
      { type: 'headlight', yaw: -0.32, pitch: -0.03, color: '#FEF08A', intensity: 0.6, size: 8 },
      { type: 'headlight', yaw: -0.29, pitch: -0.03, color: '#FEF08A', intensity: 0.6, size: 8 },

      // Luces traseras rojas del auto que va adelante en nuestro carril
      { type: 'taillight', yaw: 0.08, pitch: -0.05, color: '#EF4444', intensity: 0.8, size: 7 },
      { type: 'taillight', yaw: 0.14, pitch: -0.05, color: '#EF4444', intensity: 0.8, size: 7 },

      // Farolas de alumbrado público a la derecha de la carretera
      { type: 'streetlamp', yaw: 0.35, pitch: 0.15, color: '#FCD34D', intensity: 0.8, size: 12 },
      { type: 'streetlamp', yaw: 0.65, pitch: 0.18, color: '#FCD34D', intensity: 0.7, size: 10 },
      { type: 'streetlamp', yaw: 1.05, pitch: 0.20, color: '#FCD34D', intensity: 0.5, size: 8 },

      // Farolas a la izquierda
      { type: 'streetlamp', yaw: -0.55, pitch: 0.16, color: '#FCD34D', intensity: 0.8, size: 12 },
      { type: 'streetlamp', yaw: -0.90, pitch: 0.19, color: '#FCD34D', intensity: 0.6, size: 9 },
    ];
  }

  update(deltaTime) {
    this.time += deltaTime * 0.001;
  }

  /**
   * Renderiza la escena base (fondo, asfalto, cielo, siluetas)
   */
  renderBase(ctx, width, height, camera) {
    const cx = width / 2;
    const cy = height / 2;
    const fovScale = width / camera.fov;

    // 1. Cielo Nocturno Profundo
    const skyGradient = ctx.createLinearGradient(0, 0, 0, height);
    skyGradient.addColorStop(0, '#020617'); // Azul noche abisal
    skyGradient.addColorStop(0.5, '#0B1329');
    skyGradient.addColorStop(1, '#111827');
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, width, height);

    // Estrellas sutiles en el cielo
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    for (let i = 0; i < 40; i++) {
      const starYaw = ((i * 37) % 360 - 180) * (Math.PI / 180);
      const starPitch = (((i * 23) % 40) + 10) * (Math.PI / 180);
      const pt = this.project(starYaw, starPitch, camera, width, height, fovScale);
      if (pt.visible) {
        ctx.fillRect(pt.x, pt.y, (i % 3 === 0) ? 2 : 1, (i % 3 === 0) ? 2 : 1);
      }
    }

    // 2. Horizonte y silueta de montañas / ciudad lejana
    const horizonPitch = 0.0;
    const horizonPt = this.project(0, horizonPitch, camera, width, height, fovScale);

    // Asfalto de la carretera (desde el horizonte hacia abajo)
    const roadY = Math.max(0, horizonPt.y);
    const roadGrad = ctx.createLinearGradient(0, roadY, 0, height);
    roadGrad.addColorStop(0, '#1E293B');
    roadGrad.addColorStop(0.3, '#0F172A');
    roadGrad.addColorStop(1, '#090D16');
    ctx.fillStyle = roadGrad;
    ctx.fillRect(0, roadY, width, height - roadY);

    // 3. Líneas de Carril de la Carretera
    this.drawRoadLines(ctx, width, height, camera, fovScale);

    // 4. Silueta del auto que viene de frente
    this.drawOncomingCar(ctx, width, height, camera, fovScale);

    // 5. Silueta de los postes de luz
    this.drawLampPosts(ctx, width, height, camera, fovScale);

    // 6. Tablero interior del auto (en la parte inferior de la vista)
    this.drawCarDashboard(ctx, width, height, camera);
  }

  drawRoadLines(ctx, width, height, camera, fovScale) {
    // Línea central discontinua amarilla
    ctx.save();
    ctx.strokeStyle = '#EAB308';
    ctx.lineWidth = 3;
    ctx.setLineDash([25, 25]);

    const ptStart = this.project(0.0, -0.03, camera, width, height, fovScale);
    const ptEnd = this.project(0.0, -0.40, camera, width, height, fovScale);

    if (ptStart.visible && ptEnd.visible) {
      ctx.beginPath();
      ctx.moveTo(ptStart.x, ptStart.y);
      ctx.lineTo(ptEnd.x, ptEnd.y);
      ctx.stroke();
    }

    // Líneas laterales blancas de arcén
    ctx.setLineDash([]);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = 4;

    const leftStart = this.project(-0.25, -0.03, camera, width, height, fovScale);
    const leftEnd = this.project(-0.55, -0.40, camera, width, height, fovScale);
    if (leftStart.visible && leftEnd.visible) {
      ctx.beginPath();
      ctx.moveTo(leftStart.x, leftStart.y);
      ctx.lineTo(leftEnd.x, leftEnd.y);
      ctx.stroke();
    }

    const rightStart = this.project(0.25, -0.03, camera, width, height, fovScale);
    const rightEnd = this.project(0.55, -0.40, camera, width, height, fovScale);
    if (rightStart.visible && rightEnd.visible) {
      ctx.beginPath();
      ctx.moveTo(rightStart.x, rightStart.y);
      ctx.lineTo(rightEnd.x, rightEnd.y);
      ctx.stroke();
    }
    ctx.restore();
  }

  drawOncomingCar(ctx, width, height, camera, fovScale) {
    const carPt = this.project(-0.19, -0.06, camera, width, height, fovScale);
    if (!carPt.visible) return;

    ctx.save();
    // Carrocería oscura del auto
    ctx.fillStyle = '#0F172A';
    const carW = 90;
    const carH = 45;
    ctx.fillRect(carPt.x - carW / 2, carPt.y - carH + 10, carW, carH);

    // Parabrisas con sutil reflejo nocturno
    ctx.fillStyle = '#1E293B';
    ctx.beginPath();
    ctx.moveTo(carPt.x - carW * 0.35, carPt.y - carH + 10);
    ctx.lineTo(carPt.x - carW * 0.25, carPt.y - carH - 12);
    ctx.lineTo(carPt.x + carW * 0.25, carPt.y - carH - 12);
    ctx.lineTo(carPt.x + carW * 0.35, carPt.y - carH + 10);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  drawLampPosts(ctx, width, height, camera, fovScale) {
    ctx.save();
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 3;

    [
      { yaw: 0.35, pitchBase: -0.03, pitchTop: 0.15 },
      { yaw: 0.65, pitchBase: -0.03, pitchTop: 0.18 },
      { yaw: -0.55, pitchBase: -0.03, pitchTop: 0.16 },
    ].forEach((post) => {
      const bPt = this.project(post.yaw, post.pitchBase, camera, width, height, fovScale);
      const tPt = this.project(post.yaw, post.pitchTop, camera, width, height, fovScale);
      if (bPt.visible && tPt.visible) {
        ctx.beginPath();
        ctx.moveTo(bPt.x, bPt.y);
        ctx.lineTo(tPt.x, tPt.y);
        ctx.stroke();
      }
    });
    ctx.restore();
  }

  drawCarDashboard(ctx, width, height, camera) {
    // El volante y el tablero se mueven levemente según el pitch
    const dashY = height - 110 + camera.pitch * 180;
    ctx.save();

    // Marco del tablero
    const dashGrad = ctx.createLinearGradient(0, dashY, 0, height);
    dashGrad.addColorStop(0, '#1E293B');
    dashGrad.addColorStop(0.1, '#0F172A');
    dashGrad.addColorStop(1, '#020617');
    ctx.fillStyle = dashGrad;

    ctx.beginPath();
    ctx.moveTo(0, height);
    ctx.lineTo(0, dashY + 40);
    ctx.quadraticCurveTo(width * 0.5, dashY - 15, width, dashY + 40);
    ctx.lineTo(width, height);
    ctx.closePath();
    ctx.fill();

    // Iluminación suave del cuadro de mandos / velocímetro
    const cx = width * 0.5;
    ctx.fillStyle = 'rgba(2, 132, 199, 0.15)';
    ctx.beginPath();
    ctx.arc(cx - 90, dashY + 50, 40, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'rgba(2, 132, 199, 0.15)';
    ctx.beginPath();
    ctx.arc(cx + 90, dashY + 50, 40, 0, Math.PI * 2);
    ctx.fill();

    // Dígitos verdes/azules del velocímetro
    ctx.font = '600 13px system-ui';
    ctx.fillStyle = '#38BDF8';
    ctx.textAlign = 'center';
    ctx.fillText('78 km/h', cx - 90, dashY + 55);

    ctx.fillStyle = '#34D399';
    ctx.fillText('ECO DRIVE', cx + 90, dashY + 55);

    ctx.restore();
  }

  /**
   * Renderiza los efectos ópticos de las luces (Halos estrellados vs Nitidez)
   * Aquí ocurre la magia visual de:
   * - Sin AR: halos estrellados gigantes, deslumbramiento difuso, reflejos parásitos
   * - AR Verde: halos reducidos un 82%, visión nítida
   * - Crizal: 99.5% nitidez, cero destellos
   */
  renderLights(ctx, width, height, camera, optical) {
    const fovScale = width / camera.fov;

    this.lights.forEach((light) => {
      const pt = this.project(light.yaw, light.pitch, camera, width, height, fovScale);
      if (!pt.visible) return;

      const flareFactor = optical.flareFactor; // 1.0 (Sin AR) a 0.05 (Crizal)

      // 1. Núcleo central de la bombilla / faro
      ctx.save();
      ctx.fillStyle = light.color;
      ctx.shadowColor = light.color;
      ctx.shadowBlur = 12 * (flareFactor * 1.5 + 0.5);

      ctx.beginPath();
      ctx.arc(pt.x, pt.y, light.size, 0, Math.PI * 2);
      ctx.fill();

      // 2. Deslumbramiento / Difracción (Halos estrellados)
      if (flareFactor > 0.1) {
        // Halo difuso exterior (cegador sin AR)
        const haloRadius = light.size * (flareFactor * 8 + 1.5);
        const haloGrad = ctx.createRadialGradient(pt.x, pt.y, light.size * 0.5, pt.x, pt.y, haloRadius);
        haloGrad.addColorStop(0, `rgba(255, 255, 255, ${0.8 * flareFactor})`);
        haloGrad.addColorStop(0.3, `rgba(254, 240, 138, ${0.5 * flareFactor})`);
        haloGrad.addColorStop(0.7, `rgba(254, 215, 170, ${0.2 * flareFactor})`);
        haloGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = haloGrad;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, haloRadius, 0, Math.PI * 2);
        ctx.fill();

        // Rayos de estrella puntiagudos (Star-burst spikes) típicos del lente sin tratamiento
        const spikeCount = 8;
        const spikeLength = light.size * (flareFactor * 14 + 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.65 * flareFactor})`;
        ctx.lineWidth = 2 * flareFactor;

        for (let s = 0; s < spikeCount; s++) {
          const angle = (s * (Math.PI / (spikeCount / 2))) + (this.time * 0.05);
          const x2 = pt.x + Math.cos(angle) * spikeLength;
          const y2 = pt.y + Math.sin(angle) * spikeLength;

          ctx.beginPath();
          ctx.moveTo(pt.x, pt.y);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
      }

      // 3. Imágenes fantasma secundarias (Ghost reflections producidas por caras anterior y posterior del lente blanco)
      if (optical.ghostReflection > 0.05 && light.type === 'headlight') {
        const ghostDistX = (pt.x - width / 2) * -0.3;
        const ghostDistY = (pt.y - height / 2) * -0.3;
        const gx = width / 2 + ghostDistX;
        const gy = height / 2 + ghostDistY;

        ctx.fillStyle = `rgba(254, 243, 199, ${optical.ghostReflection * 1.8})`;
        ctx.beginPath();
        ctx.arc(gx, gy, light.size * 0.7, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    });
  }

  /**
   * Proyección esférica de ángulo Yaw / Pitch al plano de pantalla 2D
   */
  project(yaw, pitch, camera, width, height, fovScale) {
    let relYaw = yaw - camera.yaw;
    // Normalizar a [-PI, PI]
    while (relYaw > Math.PI) relYaw -= Math.PI * 2;
    while (relYaw < -Math.PI) relYaw += Math.PI * 2;

    const relPitch = pitch - camera.pitch;

    // Fuera de campo de visión
    if (Math.abs(relYaw) > camera.fov * 0.65) {
      return { visible: false, x: 0, y: 0 };
    }

    const x = width / 2 + relYaw * fovScale;
    const y = height / 2 - relPitch * fovScale;

    return { visible: true, x, y };
  }
}
