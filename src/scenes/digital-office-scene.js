/**
 * Escenario 2: Oficina Digital & Pantallas (Digital Office)
 * Demuestra la fatiga visual por luz azul HEV de monitores LED vs la relajación con Filtro Blue Cut
 */
export class DigitalOfficeScene {
  constructor() {
    this.id = 'digital-office';
    this.name = 'Oficina y Pantallas';
    this.time = 0;

    // Elementos emisores de luz en la oficina
    this.lights = [
      // Lámpara de escritorio a la izquierda
      { type: 'desklamp', yaw: -0.38, pitch: 0.12, color: '#E0F2FE', intensity: 0.9, size: 20 },
      // Panel de techo fluorescente
      { type: 'ceiling', yaw: 0.05, pitch: 0.32, color: '#F8FAFC', intensity: 0.7, size: 30 },
      // Notificación del smartphone en la mesa
      { type: 'phone', yaw: 0.28, pitch: -0.16, color: '#60A5FA', intensity: 0.6, size: 6 },
    ];
  }

  update(deltaTime) {
    this.time += deltaTime * 0.001;
  }

  renderBase(ctx, width, height, camera) {
    const fovScale = width / camera.fov;

    // 1. Pared de la oficina moderna (Fondo claro agradable)
    const wallGrad = ctx.createLinearGradient(0, 0, 0, height);
    wallGrad.addColorStop(0, '#E2E8F0');
    wallGrad.addColorStop(0.6, '#CBD5E1');
    wallGrad.addColorStop(1, '#94A3B8');
    ctx.fillStyle = wallGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Ventana a la derecha con vista exterior iluminada
    this.drawWindow(ctx, width, height, camera, fovScale);

    // 3. Estructura del escritorio ejecutivo moderno
    this.drawDesk(ctx, width, height, camera, fovScale);

    // 4. Gran Monitor LED Curvo en el centro
    this.drawMonitor(ctx, width, height, camera, fovScale);

    // 5. Lámpara de diseño nórdico a la izquierda
    this.drawDeskLamp(ctx, width, height, camera, fovScale);
  }

  drawWindow(ctx, width, height, camera, fovScale) {
    const winPt = this.project(0.55, 0.08, camera, width, height, fovScale);
    if (!winPt.visible) return;

    ctx.save();
    const w = 240;
    const h = 320;
    // Marco de ventana
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(winPt.x - w / 2, winPt.y - h / 2, w, h);

    // Luz exterior diurna
    const extGrad = ctx.createLinearGradient(0, winPt.y - h / 2, 0, winPt.y + h / 2);
    extGrad.addColorStop(0, '#BAE6FD');
    extGrad.addColorStop(1, '#E0F2FE');
    ctx.fillStyle = extGrad;
    ctx.fillRect(winPt.x - w / 2 + 10, winPt.y - h / 2 + 10, w - 20, h - 20);

    // Persianas elegantes
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.lineWidth = 2;
    for (let y = winPt.y - h / 2 + 25; y < winPt.y + h / 2 - 10; y += 18) {
      ctx.beginPath();
      ctx.moveTo(winPt.x - w / 2 + 10, y);
      ctx.lineTo(winPt.x + w / 2 - 10, y);
      ctx.stroke();
    }
    ctx.restore();
  }

  drawDesk(ctx, width, height, camera, fovScale) {
    const deskY = height * 0.62 - camera.pitch * 200;
    ctx.save();

    // Tablero del escritorio (madera clara / roble cálido)
    const deskGrad = ctx.createLinearGradient(0, deskY, 0, height);
    deskGrad.addColorStop(0, '#D4B996');
    deskGrad.addColorStop(0.1, '#C7A77B');
    deskGrad.addColorStop(1, '#8C6D44');
    ctx.fillStyle = deskGrad;

    ctx.beginPath();
    ctx.moveTo(0, deskY);
    ctx.lineTo(width, deskY);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    // Borde biselado del escritorio
    ctx.fillStyle = '#F5EBE0';
    ctx.fillRect(0, deskY, width, 4);

    // Teclado y mouse en la mesa
    const kbPt = this.project(0.0, -0.15, camera, width, height, fovScale);
    if (kbPt.visible) {
      ctx.fillStyle = '#F1F5F9';
      ctx.fillRect(kbPt.x - 120, kbPt.y, 240, 50);

      // Teclas sutiles
      ctx.fillStyle = '#E2E8F0';
      ctx.fillRect(kbPt.x - 110, kbPt.y + 6, 220, 38);

      // Mouse
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.ellipse(kbPt.x + 160, kbPt.y + 25, 18, 30, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  drawMonitor(ctx, width, height, camera, fovScale) {
    const monPt = this.project(0.0, 0.05, camera, width, height, fovScale);
    if (!monPt.visible) return;

    ctx.save();
    const monW = 480;
    const monH = 270;

    // Soporte / Peana metálica
    ctx.fillStyle = '#64748B';
    ctx.fillRect(monPt.x - 15, monPt.y + monH / 2, 30, 60);
    ctx.fillRect(monPt.x - 80, monPt.y + monH / 2 + 50, 160, 12);

    // Marco exterior ultrafino del monitor
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(monPt.x - monW / 2 - 4, monPt.y - monH / 2 - 4, monW + 8, monH + 8);

    // Pantalla LED activa (muestra interfaz médica optométrica de alta resolución)
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(monPt.x - monW / 2, monPt.y - monH / 2, monW, monH);

    // Contenido en la pantalla (Gráficas de consulta, historia clínica y texto)
    // Barra superior azul del software
    ctx.fillStyle = '#0284C7';
    ctx.fillRect(monPt.x - monW / 2, monPt.y - monH / 2, monW, 26);

    ctx.font = '600 11px system-ui';
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'left';
    ctx.fillText('👁️ VISIOMETRIC SUITE 2026 — EXAMEN REFRACTIVO', monPt.x - monW / 2 + 12, monPt.y - monH / 2 + 18);

    // Gráfica de barras clínicas en la pantalla
    const barX = monPt.x - monW / 2 + 25;
    const barY = monPt.y - monH / 2 + 50;
    ctx.fillStyle = '#F8FAFC';
    ctx.fillRect(barX, barY, 200, 120);

    const barColors = ['#38BDF8', '#818CF8', '#34D399', '#F472B6'];
    for (let b = 0; b < 4; b++) {
      ctx.fillStyle = barColors[b];
      const h = 40 + b * 20;
      ctx.fillRect(barX + 20 + b * 42, barY + 110 - h, 26, h);
    }

    // Texto de alta densidad en la mitad derecha del monitor
    ctx.fillStyle = '#0F172A';
    ctx.font = '700 13px system-ui';
    ctx.fillText('Agudeza Visual: 20/20 (OD) - 20/25 (OI)', monPt.x + 20, barY + 25);

    ctx.font = '500 11px system-ui';
    ctx.fillStyle = '#475569';
    ctx.fillText('Esfera: -1.75 D   Cilindro: -0.75 D   Eje: 90°', monPt.x + 20, barY + 50);
    ctx.fillText('Recomendación: Protección Blue Cut y Crizal', monPt.x + 20, barY + 75);
    ctx.fillText('Tiempo frente a pantallas: 8.5 horas / día', monPt.x + 20, barY + 100);

    // Líneas de texto simuladas
    ctx.fillStyle = '#94A3B8';
    ctx.fillRect(monPt.x + 20, barY + 120, 180, 5);
    ctx.fillRect(monPt.x + 20, barY + 132, 140, 5);
    ctx.fillRect(monPt.x + 20, barY + 144, 160, 5);

    ctx.restore();
  }

  drawDeskLamp(ctx, width, height, camera, fovScale) {
    const lampPt = this.project(-0.38, 0.12, camera, width, height, fovScale);
    if (!lampPt.visible) return;

    ctx.save();
    // Brazo articulado metálico blanco
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(lampPt.x - 20, lampPt.y + 160);
    ctx.lineTo(lampPt.x - 30, lampPt.y + 60);
    ctx.lineTo(lampPt.x, lampPt.y);
    ctx.stroke();

    // Campana de la lámpara
    ctx.fillStyle = '#F1F5F9';
    ctx.beginPath();
    ctx.ellipse(lampPt.x, lampPt.y, 24, 14, Math.PI * 0.15, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  /**
   * Renderizado Óptico del Filtro Blue Cut y Antirreflejo en la Pantalla
   */
  renderLights(ctx, width, height, camera, optical) {
    const fovScale = width / camera.fov;
    const monPt = this.project(0.0, 0.05, camera, width, height, fovScale);

    if (monPt.visible) {
      // 1. Deslumbramiento de Luz Azul HEV de la Pantalla
      // Sin Blue Cut (optical.blueLightAbsorption bajo ~0.05): Halo azul frío cegador que cansa la vista
      // Con Blue Cut (optical.blueLightAbsorption alto ~0.65): Se absorbe el azul, el halo se esfuma y se suaviza
      const blueHazeIntensity = (1.0 - optical.blueLightAbsorption) * 0.45;

      if (blueHazeIntensity > 0.1) {
        ctx.save();
        const hazeGrad = ctx.createRadialGradient(monPt.x, monPt.y, 100, monPt.x, monPt.y, 450);
        hazeGrad.addColorStop(0, `rgba(59, 130, 246, ${blueHazeIntensity})`);
        hazeGrad.addColorStop(0.5, `rgba(96, 165, 250, ${blueHazeIntensity * 0.6})`);
        hazeGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = hazeGrad;
        ctx.beginPath();
        ctx.arc(monPt.x, monPt.y, 450, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 2. Reflejo de la lámpara en la pantalla (Sin AR rebota; con AR/Crizal se cancela)
      if (optical.flareFactor > 0.2) {
        const reflectX = monPt.x - 80;
        const reflectY = monPt.y - 30;
        ctx.save();
        const refGrad = ctx.createRadialGradient(reflectX, reflectY, 5, reflectX, reflectY, 60);
        refGrad.addColorStop(0, `rgba(255, 255, 255, ${optical.flareFactor * 0.7})`);
        refGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = refGrad;
        ctx.beginPath();
        ctx.arc(reflectX, reflectY, 60, 0, Math.PI * 2);
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
