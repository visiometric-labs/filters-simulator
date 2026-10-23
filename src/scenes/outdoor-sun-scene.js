/**
 * Escenario 3: Día Soleado y Exteriores (Outdoor Sun & Transitions)
 * Demuestra el oscurecimiento fotocromático con el slider UV y la cancelación de reflejos por Polarizado
 */
export class OutdoorSunScene {
  constructor() {
    this.id = 'outdoor-sun';
    this.name = 'Día Soleado';
    this.time = 0;

    this.lights = [
      // Sol brillante en lo alto a la derecha
      { type: 'sun', yaw: 0.28, pitch: 0.28, color: '#FEF08A', intensity: 1.0, size: 38 },
    ];
  }

  update(deltaTime) {
    this.time += deltaTime * 0.001;
  }

  renderBase(ctx, width, height, camera) {
    const fovScale = width / camera.fov;

    // 1. Cielo azul diurno radiante
    const skyGrad = ctx.createLinearGradient(0, 0, 0, height * 0.6);
    skyGrad.addColorStop(0, '#0284C7'); // Azul cielo vibrante
    skyGrad.addColorStop(0.5, '#38BDF8');
    skyGrad.addColorStop(1, '#BAE6FD');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Nubes blancas esponjosas
    this.drawClouds(ctx, width, height, camera, fovScale);

    // 3. Horizonte y parque con árboles verdes
    const horizPt = this.project(0, -0.05, camera, width, height, fovScale);
    const groundY = Math.max(0, horizPt.y);

    // Césped y parque
    const grassGrad = ctx.createLinearGradient(0, groundY, 0, height);
    grassGrad.addColorStop(0, '#15803D');
    grassGrad.addColorStop(0.2, '#16A34A');
    grassGrad.addColorStop(1, '#22C55E');
    ctx.fillStyle = grassGrad;
    ctx.fillRect(0, groundY, width, height - groundY);

    // 4. Árboles y siluetas del parque
    this.drawTrees(ctx, width, height, camera, fovScale);

    // 5. Lago / Estanque de agua a la derecha (ideal para probar polarizado)
    this.drawLake(ctx, width, height, camera, fovScale);

    // 6. Carretera / sendero peatonal en el centro
    this.drawPathway(ctx, width, height, camera, fovScale);
  }

  drawClouds(ctx, width, height, camera, fovScale) {
    ctx.save();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';

    const clouds = [
      { yaw: -0.4, pitch: 0.22, rx: 70, ry: 25 },
      { yaw: 0.0, pitch: 0.32, rx: 90, ry: 30 },
      { yaw: 0.6, pitch: 0.18, rx: 60, ry: 20 },
    ];

    clouds.forEach((c) => {
      const pt = this.project(c.yaw, c.pitch, camera, width, height, fovScale);
      if (pt.visible) {
        ctx.beginPath();
        ctx.ellipse(pt.x, pt.y, c.rx, c.ry, 0, 0, Math.PI * 2);
        ctx.ellipse(pt.x + c.rx * 0.3, pt.y - 10, c.rx * 0.6, c.ry * 0.8, 0, 0, Math.PI * 2);
        ctx.fill();
      }
    });
    ctx.restore();
  }

  drawTrees(ctx, width, height, camera, fovScale) {
    ctx.save();
    [-0.7, -0.45, -0.2, 0.5, 0.8].forEach((treeYaw, idx) => {
      const pt = this.project(treeYaw, -0.05, camera, width, height, fovScale);
      if (pt.visible) {
        // Tronco
        ctx.fillStyle = '#78350F';
        ctx.fillRect(pt.x - 8, pt.y - 60, 16, 60);

        // Copa del árbol
        ctx.fillStyle = idx % 2 === 0 ? '#15803D' : '#166534';
        ctx.beginPath();
        ctx.arc(pt.x, pt.y - 90, 45, 0, Math.PI * 2);
        ctx.fill();
      }
    });
    ctx.restore();
  }

  drawPathway(ctx, width, height, camera, fovScale) {
    ctx.save();
    const p1 = this.project(0.0, -0.05, camera, width, height, fovScale);
    const p2 = this.project(-0.35, -0.40, camera, width, height, fovScale);
    const p3 = this.project(0.15, -0.40, camera, width, height, fovScale);

    if (p1.visible && p2.visible && p3.visible) {
      ctx.fillStyle = '#94A3B8';
      ctx.beginPath();
      ctx.moveTo(p1.x - 15, p1.y);
      ctx.lineTo(p1.x + 15, p1.y);
      ctx.lineTo(p3.x, p3.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
  }

  drawLake(ctx, width, height, camera, fovScale) {
    const lakePt = this.project(0.35, -0.18, camera, width, height, fovScale);
    if (!lakePt.visible) return;

    ctx.save();
    // Superficie del agua profunda
    ctx.fillStyle = '#0369A1';
    ctx.beginPath();
    ctx.ellipse(lakePt.x, lakePt.y, 220, 80, 0, 0, Math.PI * 2);
    ctx.fill();

    // Peces visibles en el fondo (solo apreciables con polarizado cuando se quita el reflejo)
    ctx.fillStyle = '#F97316';
    ctx.beginPath();
    ctx.ellipse(lakePt.x - 30, lakePt.y + 10, 12, 5, 0.2, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(lakePt.x + 40, lakePt.y - 15, 10, 4, -0.3, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  /**
   * Renderizado Óptico del Sol, Destellos y Cancelación Polarizada en el Lago
   */
  renderLights(ctx, width, height, camera, optical, uvIntensity = 0.85) {
    const fovScale = width / camera.fov;

    // 1. Sol brillante en el cielo
    const sunPt = this.project(0.28, 0.28, camera, width, height, fovScale);
    if (sunPt.visible) {
      ctx.save();
      // Disco solar
      ctx.fillStyle = '#FEF08A';
      ctx.shadowColor = '#FDE047';
      ctx.shadowBlur = 40;
      ctx.beginPath();
      ctx.arc(sunPt.x, sunPt.y, 35, 0, Math.PI * 2);
      ctx.fill();

      // Corona de resplandor solar
      const sunGlow = ctx.createRadialGradient(sunPt.x, sunPt.y, 30, sunPt.x, sunPt.y, 180);
      sunGlow.addColorStop(0, 'rgba(254, 240, 138, 0.6)');
      sunGlow.addColorStop(0.5, 'rgba(253, 224, 71, 0.2)');
      sunGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = sunGlow;
      ctx.beginPath();
      ctx.arc(sunPt.x, sunPt.y, 180, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // 2. Resplandor Horizontal Cegador sobre el Lago (El caso estrella de Polarizado)
    const lakePt = this.project(0.35, -0.18, camera, width, height, fovScale);
    if (lakePt.visible) {
      // Sin polarizado (optical.polarizationCut === 0): Reflejo blanco cegador tapa los peces
      // Con polarizado (optical.polarizationCut > 0.8): El reflejo se cancela al 95%
      const glareIntensity = (1.0 - optical.polarizationCut) * 0.85;

      if (glareIntensity > 0.05) {
        ctx.save();
        const waterGlare = ctx.createRadialGradient(lakePt.x, lakePt.y, 10, lakePt.x, lakePt.y, 140);
        waterGlare.addColorStop(0, `rgba(255, 255, 255, ${glareIntensity})`);
        waterGlare.addColorStop(0.4, `rgba(254, 243, 199, ${glareIntensity * 0.7})`);
        waterGlare.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = waterGlare;
        ctx.beginPath();
        ctx.ellipse(lakePt.x, lakePt.y, 200, 70, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }
  }

  project(yaw, pitch, camera, width, height, fovScale) {
    let relYaw = yaw - camera.yaw;
    while (relYaw > Math.PI) relYaw -= Math.PI * 2;
    while (relYaw < -Math.PI) relYaw += Math.PI * 2;

    const relPitch = pitch - camera.pitch;

    if (Math.abs(relYaw) > camera.fov * 0.65) {
      return { visible: false, x: 0, y: 0 };
    }

    const x = width / 2 + relYaw * fovScale;
    const y = height / 2 - relPitch * fovScale;

    return { visible: true, x, y };
  }
}
