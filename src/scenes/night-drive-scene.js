/**
 * Escenario 1: Conducción Nocturna (Motor Vectorial Cinemático Full HD Master Edition)
 * Renderizado de alta definición a 60 FPS con estética de cabina de lujo moderna:
 * - Paisaje nocturno continuo sin cortes (terreno oscuro, colinas, skyline iluminado).
 * - Autopista interestatal de 4 carriles con perspectiva física, mediana y líneas fluidas a 65 mph.
 * - Autos vectoriales detallados (siluetas de crossover/sedanes, faros LED gemelos y barras traseras).
 * - Cuadro de instrumentos digital elevado y visible ("65 MPH", "10:48 PM", "ECO DRIVE", "LANE ASSIST").
 * - Control paramétrico milimétrico de la óptica de los faros:
 *     • Lente Blanca (Sin AR): Deslumbramiento cegador masivo, halos gigantescos y velo blanco en asfalto.
 *     • AR Verde: Destellos reducidos al 80%, faros contenidos y confort visual.
 *     • Crizal Multicapa: Faros reducidos a puntos LED quirúrgicos milimétricos (cero encandilamiento).
 *     • Filtro Amarillo: Tinte ámbar de alto contraste que cancela la luz azul de faros xenón/LED.
 */
export class NightDriveScene {
  constructor() {
    this.id = 'night-drive';
    this.name = 'Conducción Nocturna';
    this.time = 0;

    // Autos en tráfico en sentido contrario (Carriles izquierdos)
    this.oncomingCars = [
      { laneOffset: -0.16, dist: 0.38, color: '#FFFFFF', size: 10, model: 'sedan' },
      { laneOffset: -0.25, dist: 0.62, color: '#FEF08A', size: 7, model: 'suv' },
      { laneOffset: -0.32, dist: 0.88, color: '#FEF3C7', size: 4, model: 'sedan' },
    ];

    // Auto adelante en nuestro carril (Luces traseras rojas LED)
    this.trafficAhead = [
      { laneOffset: 0.12, dist: 0.48 },
    ];

    // Rascacielos del Skyline de la ciudad
    this.skylineBuildings = [
      { u: 0.18, w: 0.05, h: 0.28, lights: 8 },
      { u: 0.25, w: 0.06, h: 0.40, lights: 14, isSpire: true },
      { u: 0.33, w: 0.05, h: 0.25, lights: 6 },
      { u: 0.40, w: 0.08, h: 0.48, lights: 16, isSpire: true },
      { u: 0.50, w: 0.06, h: 0.35, lights: 10 },
      { u: 0.58, w: 0.05, h: 0.26, lights: 7 },
      { u: 0.65, w: 0.09, h: 0.44, lights: 15, isSpire: true },
      { u: 0.76, w: 0.06, h: 0.32, lights: 9 },
      { u: 0.84, w: 0.07, h: 0.28, lights: 8 },
    ];

    // Farolas de autopista (postes que iluminan sutilmente el horizonte)
    this.lampPosts = [
      { dist: 0.20 }, { dist: 0.40 }, { dist: 0.65 }, { dist: 0.90 }
    ];
  }

  update(deltaTime) {
    this.time += deltaTime * 0.001;
  }

  renderBase(ctx, width, height, camera) {
    this.renderScene(ctx, width, height, camera, {
      flareFactor: 1.0,
      ghostReflection: 0.12,
      blueLightAbsorption: 0.05,
      contrastBoost: 1.0,
      isCrizal: false,
      isYellow: false,
    });
  }

  renderTreated(ctx, width, height, camera, activeFilter) {
    const optical = activeFilter.optical || {};
    const isCrizal = activeFilter.id === 'crizal';
    const isYellow = activeFilter.id === 'amarillo';

    this.renderScene(ctx, width, height, camera, {
      ...optical,
      isCrizal,
      isYellow,
    });
  }

  renderScene(ctx, width, height, camera, optical) {
    ctx.save();

    // Parallax de rotación de cabeza
    const panX = Math.round(-camera.yaw * width * 0.22);
    const panY = Math.round(camera.pitch * height * 0.20);

    const horizonY = Math.round(height * 0.45 + panY * 0.7);
    const vanishX = Math.round(width * 0.49 + panX * 0.7);

    // -------------------------------------------------------------
    // 1. FONDO NOCTURNO COMPLETO: CIELO + TERRENO OSCURO
    // -------------------------------------------------------------
    // Cielo nocturno
    const skyGrad = ctx.createLinearGradient(0, 0, 0, horizonY);
    if (optical.isYellow) {
      skyGrad.addColorStop(0, '#060A14');
      skyGrad.addColorStop(0.6, '#0B1324');
      skyGrad.addColorStop(1, '#181C2C');
    } else {
      skyGrad.addColorStop(0, '#020617');
      skyGrad.addColorStop(0.5, '#0B1329');
      skyGrad.addColorStop(1, '#0F172A');
    }
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, horizonY);

    // Terreno oscuro a los lados de la autopista (adiós al corte gris)
    const groundGrad = ctx.createLinearGradient(0, horizonY, 0, height);
    groundGrad.addColorStop(0, '#090D16');
    groundGrad.addColorStop(0.4, '#05070D');
    groundGrad.addColorStop(1, '#020306');
    ctx.fillStyle = groundGrad;
    ctx.fillRect(0, horizonY, width, height - horizonY);

    // Luces distantes dispersas en el terreno (suburbios nocturnos)
    ctx.fillStyle = 'rgba(254, 240, 138, 0.4)';
    for (let i = 0; i < 24; i++) {
      const gx = ((i * 179) % width + panX * 0.4 + width) % width;
      const gy = horizonY + 8 + ((i * 37) % 35);
      if (Math.abs(gx - vanishX) > 120) {
        ctx.fillRect(Math.round(gx), Math.round(gy), 2, 2);
      }
    }

    // Estrellas fijas en el cielo
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    for (let i = 0; i < 40; i++) {
      const sx = ((i * 139) % width + panX * 0.2 + width) % width;
      const sy = (i * 73) % Math.max(10, horizonY - 40);
      ctx.fillRect(Math.round(sx), Math.round(sy), (i % 4 === 0) ? 2 : 1, (i % 4 === 0) ? 2 : 1);
    }

    // -------------------------------------------------------------
    // 2. SKYLINE DE RASCACIELOS & LETRERO VIAL
    // -------------------------------------------------------------
    this.drawSkyline(ctx, width, horizonY, panX, optical);

    // -------------------------------------------------------------
    // 3. AUTOPISTA DE 4 CARRILES CON MEDIANA
    // -------------------------------------------------------------
    this.drawHighway(ctx, width, height, horizonY, vanishX, optical);

    // -------------------------------------------------------------
    // 4. AUTOS & FUENTES LUMÍNICAS PARAMÉTRICAS (CONTROL TOTAL)
    // -------------------------------------------------------------
    this.drawTraffic(ctx, width, height, horizonY, vanishX, optical);

    // -------------------------------------------------------------
    // 5. CABINA DEL CONDUCTOR ELEVADA (FULL HD 1080P)
    // -------------------------------------------------------------
    this.drawCockpit(ctx, width, height, panX, panY, optical);

    ctx.restore();
  }

  drawSkyline(ctx, width, horizonY, panX, optical) {
    const skylineBaseY = horizonY;

    // Resplandor atmosférico de la metrópoli
    const cityGlow = ctx.createRadialGradient(
      width * 0.50 + panX * 0.4, skylineBaseY, 15,
      width * 0.50 + panX * 0.4, skylineBaseY, width * 0.45
    );
    const alpha = optical.isYellow ? 0.30 : 0.22;
    cityGlow.addColorStop(0, optical.isYellow ? `rgba(245, 158, 11, ${alpha})` : `rgba(56, 189, 248, ${alpha})`);
    cityGlow.addColorStop(0.5, 'rgba(15, 23, 42, 0.12)');
    cityGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = cityGlow;
    ctx.fillRect(0, horizonY - 180, width, 180);

    // Rascacielos
    this.skylineBuildings.forEach((b, idx) => {
      const bx = Math.round(width * b.u + panX * 0.4);
      const bw = Math.round(width * b.w);
      const bh = Math.round(horizonY * b.h * 1.15);
      const by = skylineBaseY - bh;

      // Silueta
      const bGrad = ctx.createLinearGradient(bx, by, bx, skylineBaseY);
      bGrad.addColorStop(0, '#0F172A');
      bGrad.addColorStop(1, '#050811');
      ctx.fillStyle = bGrad;
      ctx.fillRect(bx, by, bw, bh);

      // Antenas y balizas rojas de advertencia aérea
      if (b.isSpire) {
        ctx.strokeStyle = '#38BDF8';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(bx + bw * 0.5, by);
        ctx.lineTo(bx + bw * 0.5, by - 26);
        ctx.stroke();

        ctx.fillStyle = '#EF4444';
        ctx.beginPath();
        ctx.arc(bx + bw * 0.5, by - 26, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Ventanas iluminadas
      const cols = 3;
      const rows = b.lights;
      const padX = bw / (cols + 1);
      const padY = bh / (rows + 2);
      ctx.fillStyle = (idx % 2 === 0) ? 'rgba(254, 240, 138, 0.75)' : 'rgba(56, 189, 248, 0.65)';

      for (let r = 1; r <= rows; r++) {
        for (let c = 1; c <= cols; c++) {
          if ((r * 5 + c * 3 + idx) % 4 !== 0) {
            ctx.fillRect(Math.round(bx + c * padX), Math.round(by + r * padY), 2.5, 3.5);
          }
        }
      }
    });

    // Letrero vial reflectivo ("EXIT 23A | City Center ↗")
    const signX = Math.round(width * 0.72 + panX * 0.55);
    const signY = Math.round(horizonY - 75);
    const signW = 120;
    const signH = 44;

    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(signX + signW * 0.5, skylineBaseY);
    ctx.lineTo(signX + signW * 0.5, signY);
    ctx.stroke();

    ctx.fillStyle = '#065F46';
    ctx.fillRect(signX, signY, signW, signH);
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 1.8;
    ctx.strokeRect(signX + 2, signY + 2, signW - 4, signH - 4);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '800 10px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText('EXIT 23A', signX + signW * 0.5, signY + 15);
    ctx.font = '600 9px system-ui';
    ctx.fillText('City Center ↗', signX + signW * 0.5, signY + 31);
  }

  drawHighway(ctx, width, height, horizonY, vanishX, optical) {
    const roadTopY = horizonY;
    const roadBottomY = height;

    // Asfalto multicarril amplio
    const roadTopW = Math.max(160, width * 0.18);
    const roadBotW = width * 1.5;

    const roadLeftX = vanishX - roadTopW * 0.5;
    const roadRightX = vanishX + roadTopW * 0.5;
    const roadBotLeft = vanishX - roadBotW * 0.5;
    const roadBotRight = vanishX + roadBotW * 0.5;

    // Asfalto mojado oscuro con degradado
    const roadGrad = ctx.createLinearGradient(0, roadTopY, 0, roadBottomY);
    if (optical.isCrizal) {
      roadGrad.addColorStop(0, '#0F172A');
      roadGrad.addColorStop(0.3, '#070A12');
      roadGrad.addColorStop(1, '#020408');
    } else if (optical.isYellow) {
      roadGrad.addColorStop(0, '#1C1917');
      roadGrad.addColorStop(0.35, '#120F0D');
      roadGrad.addColorStop(1, '#080706');
    } else {
      const wash = optical.flareFactor > 0.5 ? '#20293A' : '#0F172A';
      roadGrad.addColorStop(0, wash);
      roadGrad.addColorStop(0.35, '#0E1626');
      roadGrad.addColorStop(1, '#070C16');
    }

    ctx.fillStyle = roadGrad;
    ctx.beginPath();
    ctx.moveTo(roadLeftX, roadTopY);
    ctx.lineTo(roadRightX, roadTopY);
    ctx.lineTo(roadBotRight, roadBottomY);
    ctx.lineTo(roadBotLeft, roadBottomY);
    ctx.closePath();
    ctx.fill();

    // Velo de deslumbramiento sobre el asfalto (Sólo en Lente Blanca sin AR)
    if (optical.flareFactor > 0.4) {
      const glareWash = ctx.createLinearGradient(0, roadTopY, 0, roadTopY + 240);
      glareWash.addColorStop(0, `rgba(255, 255, 255, ${0.30 * optical.flareFactor})`);
      glareWash.addColorStop(0.4, `rgba(254, 240, 138, ${0.12 * optical.flareFactor})`);
      glareWash.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glareWash;
      ctx.fillRect(0, roadTopY, width, 240);
    }

    // Mediana divisoria central con barrera de concreto
    const medTopX = vanishX - roadTopW * 0.05;
    const medBotX = vanishX - roadBotW * 0.05;

    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(medTopX, roadTopY);
    ctx.lineTo(medBotX, roadBottomY);
    ctx.stroke();

    // Delineadores reflectivos amarillos en la mediana
    for (let p = 0.15; p <= 1.0; p += 0.14) {
      const t = Math.pow(p, 2.2);
      const mx = medTopX + (medBotX - medTopX) * t;
      const my = roadTopY + (roadBottomY - roadTopY) * t;
      ctx.fillStyle = '#EAB308';
      ctx.fillRect(Math.round(mx - 2), Math.round(my - 4), 3, 5);
    }

    // Líneas discontinuas de carril animadas a 65 mph
    const laneLineCount = 10;
    const speed = this.time * 2.5;
    ctx.fillStyle = optical.isYellow ? '#FBBF24' : '#FFFFFF';

    for (let i = 0; i < laneLineCount; i++) {
      const p = ((i / laneLineCount) + (speed % (1 / laneLineCount))) % 1.0;
      const t = Math.pow(p, 2.5);

      const ly = roadTopY + (roadBottomY - roadTopY) * t;
      const lx = (vanishX + roadTopW * 0.22) + ((vanishX + roadBotW * 0.22) - (vanishX + roadTopW * 0.22)) * t;
      const lw = 2 + t * 6;
      const lh = 6 + t * 40;

      ctx.globalAlpha = Math.min(1.0, t * 1.8);
      ctx.fillRect(Math.round(lx - lw * 0.5), Math.round(ly), Math.round(lw), Math.round(lh));
    }
    ctx.globalAlpha = 1.0;

    // Línea continua de arcén derecho
    ctx.strokeStyle = optical.isYellow ? 'rgba(251, 191, 36, 0.9)' : 'rgba(255, 255, 255, 0.9)';
    ctx.lineWidth = optical.isCrizal ? 3.5 : 2.5;
    ctx.beginPath();
    ctx.moveTo(roadRightX, roadTopY);
    ctx.lineTo(roadBotRight - 50, roadBottomY);
    ctx.stroke();
  }

  drawTraffic(ctx, width, height, horizonY, vanishX, optical) {
    const flareFactor = optical.flareFactor; // 1.0 (Sin AR) a 0.05 (Crizal)

    // 1. AUTO ADELANTE EN NUESTRO CARRIL (LUCES TRASERAS ROJAS LED)
    this.trafficAhead.forEach((car) => {
      const t = car.dist;
      const cx = vanishX + width * car.laneOffset;
      const cy = horizonY + (height - horizonY) * t * 0.9;
      const scale = 0.45 + t * 0.85;

      const carW = 68 * scale;
      const carH = 28 * scale;

      ctx.save();
      // Silueta del crossover
      ctx.fillStyle = '#060A12';
      ctx.fillRect(Math.round(cx - carW * 0.5), Math.round(cy - carH), Math.round(carW), Math.round(carH));

      // Barra trasera LED Roja horizontal
      const barY = Math.round(cy - carH * 0.42);
      ctx.fillStyle = '#EF4444';
      ctx.shadowColor = '#EF4444';
      ctx.shadowBlur = optical.isCrizal ? 4 : 12 * flareFactor;
      ctx.fillRect(Math.round(cx - carW * 0.42), barY, Math.round(carW * 0.84), Math.round(5 * scale));

      // Reflejo en asfalto mojado
      ctx.fillStyle = `rgba(239, 68, 68, ${0.22 * flareFactor})`;
      ctx.fillRect(Math.round(cx - carW * 0.4), Math.round(cy + 2), Math.round(carW * 0.8), Math.round(16 * scale));
      ctx.restore();
    });

    // 2. AUTOS EN SENTIDO CONTRARIO (FAROS LED BLANCOS - CONTROL TOTAL DE DESLUMBRAMIENTO)
    this.oncomingCars.forEach((car) => {
      const t = car.dist;
      const cx = vanishX + width * car.laneOffset;
      const cy = horizonY + (height - horizonY) * t * 0.85;
      const scale = 0.38 + (1.0 - t) * 0.85;

      const carW = (car.model === 'suv' ? 64 : 54) * scale;
      const carH = (car.model === 'suv' ? 28 : 22) * scale;

      ctx.save();
      // Silueta del coche contrario
      ctx.fillStyle = '#04070F';
      ctx.fillRect(Math.round(cx - carW * 0.5), Math.round(cy - carH), Math.round(carW), Math.round(carH));

      // Posición de los faros gemelos
      const hLeftX = Math.round(cx - carW * 0.33);
      const hRightX = Math.round(cx + carW * 0.33);
      const hY = Math.round(cy - carH * 0.45);

      const lampRadius = Math.max(3, car.size * scale * (optical.isCrizal ? 0.70 : 1.0));

      [hLeftX, hRightX].forEach((hx) => {
        // NÚCLEO LED NÍTIDO
        ctx.fillStyle = optical.isYellow ? '#FEF08A' : '#FFFFFF';
        ctx.beginPath();
        ctx.arc(hx, hY, lampRadius, 0, Math.PI * 2);
        ctx.fill();

        // CONTROL EXACTO DE DESTELLOS SEGÚN TRATAMIENTO:
        if (optical.isCrizal) {
          // ========================================================
          // CRIZAL MULTICAPA: CERO ENCANDILAMIENTO, CONFORT TOTAL
          // Micro-aura contenida de 8-10px (visión descansada)
          // ========================================================
          const tightGlow = ctx.createRadialGradient(hx, hY, lampRadius * 0.5, hx, hY, lampRadius * 2.0);
          tightGlow.addColorStop(0, 'rgba(255, 255, 255, 0.40)');
          tightGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');
          ctx.fillStyle = tightGlow;
          ctx.beginPath();
          ctx.arc(hx, hY, lampRadius * 2.0, 0, Math.PI * 2);
          ctx.fill();
        } else if (optical.isYellow) {
          // ========================================================
          // FILTRO AMARILLO: Tinte cálido, neutraliza azul frío
          // ========================================================
          const yellowGlow = ctx.createRadialGradient(hx, hY, lampRadius * 0.5, hx, hY, lampRadius * 3.2);
          yellowGlow.addColorStop(0, 'rgba(254, 240, 138, 0.60)');
          yellowGlow.addColorStop(0.6, 'rgba(245, 158, 11, 0.20)');
          yellowGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = yellowGlow;
          ctx.beginPath();
          ctx.arc(hx, hY, lampRadius * 3.2, 0, Math.PI * 2);
          ctx.fill();
        } else if (flareFactor < 0.35) {
          // ========================================================
          // AR VERDE: Reducción del 75%, halo contenido
          // ========================================================
          const mildHalo = ctx.createRadialGradient(hx, hY, lampRadius, hx, hY, lampRadius * 5.0);
          mildHalo.addColorStop(0, 'rgba(255, 255, 255, 0.55)');
          mildHalo.addColorStop(0.4, 'rgba(254, 240, 138, 0.25)');
          mildHalo.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = mildHalo;
          ctx.beginPath();
          ctx.arc(hx, hY, lampRadius * 5.0, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // ========================================================
          // LENTE BLANCA (SIN AR): DESLUMBRAMIENTO CEGADOR MASIVO
          // ========================================================
          const hugeRadius = lampRadius * 16 * flareFactor;
          const hugeHalo = ctx.createRadialGradient(hx, hY, lampRadius * 0.4, hx, hY, hugeRadius);
          hugeHalo.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
          hugeHalo.addColorStop(0.25, 'rgba(254, 240, 138, 0.70)');
          hugeHalo.addColorStop(0.55, 'rgba(253, 186, 116, 0.30)');
          hugeHalo.addColorStop(1, 'rgba(0, 0, 0, 0)');

          ctx.fillStyle = hugeHalo;
          ctx.beginPath();
          ctx.arc(hx, hY, hugeRadius, 0, Math.PI * 2);
          ctx.fill();

          // Destellos horizontales sobre el parabrisas
          const streakW = hugeRadius * 2.6;
          const streakH = lampRadius * 2.2;
          const streakGrad = ctx.createLinearGradient(hx - streakW, hY, hx + streakW, hY);
          streakGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
          streakGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.65)');
          streakGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
          ctx.fillStyle = streakGrad;
          ctx.fillRect(Math.round(hx - streakW), Math.round(hY - streakH * 0.5), Math.round(streakW * 2), Math.round(streakH));

          // Imágenes fantasma secundarias (Ghosting en lente sin tratamiento)
          const gx = width * 0.5 - (hx - width * 0.5) * 0.4;
          const gy = height * 0.5 - (hY - height * 0.5) * 0.4;
          ctx.fillStyle = 'rgba(254, 240, 138, 0.35)';
          ctx.beginPath();
          ctx.arc(gx, gy, lampRadius * 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      ctx.restore();
    });
  }

  /**
   * Cabina del conductor en 1ra persona Full HD (ELEVADA Y TOTALMENTE VISIBLE)
   */
  drawCockpit(ctx, width, height, panX, panY, optical) {
    ctx.save();

    // Posición calibrada para que el velocímetro quede visible por encima del carrusel
    const dashTopY = Math.round(height * 0.68 + panY * 0.2);
    const centerX = Math.round(width * 0.5 + panX * 0.2);

    // Tablero curvo en acabado carbón mate
    const dashGrad = ctx.createLinearGradient(0, dashTopY, 0, height);
    dashGrad.addColorStop(0, '#1E293B');
    dashGrad.addColorStop(0.12, '#0F172A');
    dashGrad.addColorStop(0.6, '#060911');
    dashGrad.addColorStop(1, '#020408');

    ctx.fillStyle = dashGrad;
    ctx.beginPath();
    ctx.moveTo(0, height);
    ctx.lineTo(0, dashTopY + 30);
    ctx.quadraticCurveTo(centerX, dashTopY - 26, width, dashTopY + 30);
    ctx.lineTo(width, height);
    ctx.closePath();
    ctx.fill();

    // Línea de costura / pespunte
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, dashTopY + 30);
    ctx.quadraticCurveTo(centerX, dashTopY - 26, width, dashTopY + 30);
    ctx.stroke();

    // -----------------------------------------------------------
    // CUADRO DE INSTRUMENTOS DIGITAL ELEVADO (1080P RETINA)
    // -----------------------------------------------------------
    const clusterW = Math.min(width * 0.55, 480);
    const clusterH = 100;
    const clusterX = Math.round(centerX - clusterW * 0.5);
    const clusterY = Math.round(dashTopY + 2);

    ctx.fillStyle = '#050811';
    ctx.strokeStyle = '#1E293B';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(clusterX, clusterY, clusterW, clusterH, [18, 18, 0, 0]);
    ctx.fill();
    ctx.stroke();

    // Barra de estado superior
    ctx.fillStyle = '#94A3B8';
    ctx.font = '600 11px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText('10:48 PM  ·  D  ·  Temp 18°C', centerX, clusterY + 20);

    // VELOCÍMETRO "65 MPH"
    ctx.fillStyle = optical.isYellow ? '#FBBF24' : '#38BDF8';
    ctx.font = '800 36px system-ui, -apple-system, sans-serif';
    ctx.fillText('65', centerX, clusterY + 62);

    ctx.fillStyle = '#94A3B8';
    ctx.font = '700 11px system-ui';
    ctx.fillText('MPH', centerX, clusterY + 78);

    // Indicador Izquierdo
    ctx.fillStyle = '#34D399';
    ctx.font = '700 11px system-ui';
    ctx.fillText('ECO DRIVE', clusterX + clusterW * 0.22, clusterY + 50);
    ctx.fillStyle = '#64748B';
    ctx.font = '600 10px system-ui';
    ctx.fillText('1,850 RPM', clusterX + clusterW * 0.22, clusterY + 66);

    // Indicador Derecho
    ctx.fillStyle = '#38BDF8';
    ctx.font = '700 11px system-ui';
    ctx.fillText('LANE ASSIST', clusterX + clusterW * 0.78, clusterY + 50);
    ctx.fillStyle = '#34D399';
    ctx.fillText('ACTIVE', clusterX + clusterW * 0.78, clusterY + 66);

    // Volante de cuero
    const wheelCenterY = height + 130;
    const wheelRadius = Math.min(width * 0.32, 280);

    ctx.strokeStyle = '#0F172A';
    ctx.lineWidth = 30;
    ctx.beginPath();
    ctx.arc(centerX, wheelCenterY, wheelRadius, Math.PI * 1.15, Math.PI * 1.85);
    ctx.stroke();

    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(centerX, wheelCenterY, wheelRadius + 13, Math.PI * 1.16, Math.PI * 1.84);
    ctx.stroke();

    ctx.restore();
  }

  renderLights() {
    // No-op: Integrado en el motor vectorial paramétrico
  }
}
