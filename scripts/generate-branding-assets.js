import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const outDir = 'public/branding';

async function generateBranding() {
  console.log('Generating branding visual proposals...');

  // =========================================================================
  // 1. FAVICONS
  // =========================================================================

  // Opción 1: Montura de Titanio con Destello Cian/Esmeralda
  const svgOpt1 = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
    <defs>
      <linearGradient id="bgGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0F172A"/>
        <stop offset="100%" stop-color="#020617"/>
      </linearGradient>
      <linearGradient id="rimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#38BDF8"/>
        <stop offset="50%" stop-color="#818CF8"/>
        <stop offset="100%" stop-color="#10B981"/>
      </linearGradient>
      <linearGradient id="lensGlint" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#38BDF8" stop-opacity="0.6"/>
        <stop offset="100%" stop-color="#38BDF8" stop-opacity="0"/>
      </linearGradient>
      <filter id="glow1" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur"/>
        <feComposite in="SourceGraphic" in2="blur" operator="over"/>
      </filter>
    </defs>
    <!-- Fondo redondeado con borde sutil -->
    <rect width="128" height="128" rx="28" fill="url(#bgGrad1)"/>
    <rect width="124" height="124" x="2" y="2" rx="26" fill="none" stroke="#1E293B" stroke-width="2"/>
    
    <!-- Montura Oftálmica Vectorial -->
    <!-- Lente Izquierda -->
    <rect x="20" y="44" width="38" height="38" rx="14" fill="#0B132B" stroke="url(#rimGrad)" stroke-width="5" filter="url(#glow1)"/>
    <!-- Lente Derecha -->
    <rect x="70" y="44" width="38" height="38" rx="14" fill="#0B132B" stroke="url(#rimGrad)" stroke-width="5" filter="url(#glow1)"/>
    <!-- Puente nasal -->
    <path d="M 58 56 Q 64 51 70 56" fill="none" stroke="url(#rimGrad)" stroke-width="4.5" stroke-linecap="round"/>
    <!-- Varillas laterales -->
    <line x1="10" y1="50" x2="20" y2="52" stroke="url(#rimGrad)" stroke-width="4" stroke-linecap="round"/>
    <line x1="108" y1="52" x2="118" y2="50" stroke="url(#rimGrad)" stroke-width="4" stroke-linecap="round"/>
    
    <!-- Destello Óptico en Cristal Izquierdo -->
    <path d="M 24 50 L 48 50 L 32 74 Z" fill="url(#lensGlint)"/>
    <circle cx="34" cy="53" r="3.5" fill="#FFFFFF"/>
    <!-- Reflejo esmeralda sutil en derecho -->
    <circle cx="94" cy="55" r="2.5" fill="#10B981" opacity="0.8"/>
  </svg>
  `;

  // Opción 2: Lente Multicapa (Anillos de Interferencia Antirreflejo)
  const svgOpt2 = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
    <defs>
      <linearGradient id="bgGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#020617"/>
        <stop offset="100%" stop-color="#0F172A"/>
      </linearGradient>
      <linearGradient id="ringEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#10B981"/>
        <stop offset="100%" stop-color="#059669"/>
      </linearGradient>
      <linearGradient id="ringSapphire" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#38BDF8"/>
        <stop offset="100%" stop-color="#6366F1"/>
      </linearGradient>
      <filter id="glow2" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="4" result="blur"/>
        <feComposite in="SourceGraphic" in2="blur" operator="over"/>
      </filter>
    </defs>
    <rect width="128" height="128" rx="28" fill="url(#bgGrad2)"/>
    <circle cx="64" cy="64" r="54" fill="none" stroke="#1E293B" stroke-width="2"/>
    
    <!-- Anillos concéntricos antirreflejo multicapa -->
    <circle cx="64" cy="64" r="44" fill="#0B1329" stroke="url(#ringSapphire)" stroke-width="4.5" filter="url(#glow2)"/>
    <circle cx="64" cy="64" r="34" fill="none" stroke="url(#ringEmerald)" stroke-width="3" opacity="0.85"/>
    <circle cx="64" cy="64" r="23" fill="none" stroke="#818CF8" stroke-width="2.5" opacity="0.7"/>
    
    <!-- Pupila óptica central de precisión -->
    <circle cx="64" cy="64" r="10" fill="#38BDF8"/>
    <circle cx="64" cy="64" r="4" fill="#FFFFFF"/>
    
    <!-- Destello de corte de luz -->
    <path d="M 40 40 L 52 40 L 44 54 Z" fill="#FFFFFF" opacity="0.6"/>
  </svg>
  `;

  // Opción 3: Monograma "V" Oftálmico
  const svgOpt3 = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
    <defs>
      <linearGradient id="bgGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#090D16"/>
        <stop offset="100%" stop-color="#1E1B4B"/>
      </linearGradient>
      <linearGradient id="vGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#38BDF8"/>
        <stop offset="50%" stop-color="#818CF8"/>
        <stop offset="100%" stop-color="#C084FC"/>
      </linearGradient>
      <filter id="glow3" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="5" result="blur"/>
        <feComposite in="SourceGraphic" in2="blur" operator="over"/>
      </filter>
    </defs>
    <rect width="128" height="128" rx="28" fill="url(#bgGrad3)"/>
    <circle cx="64" cy="64" r="54" fill="none" stroke="#312E81" stroke-width="2"/>
    
    <!-- La "V" estilizada como montura y prisma óptico -->
    <path d="M 32 38 L 64 96 L 96 38" fill="none" stroke="url(#vGrad)" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" filter="url(#glow3)"/>
    <!-- Arco que une la montura -->
    <path d="M 40 48 Q 64 62 88 48" fill="none" stroke="#38BDF8" stroke-width="4" stroke-linecap="round" opacity="0.8"/>
    <circle cx="64" cy="40" r="5" fill="#FFFFFF"/>
  </svg>
  `;

  // Opción 4: Favicon Animado (Glint / Destello pasando por la lente)
  const svgOpt4Animated = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
    <defs>
      <linearGradient id="bgAnim" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0F172A"/>
        <stop offset="100%" stop-color="#020617"/>
      </linearGradient>
      <linearGradient id="frameRim" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#38BDF8"/>
        <stop offset="100%" stop-color="#10B981"/>
      </linearGradient>
      <clipPath id="lensClip">
        <rect x="20" y="44" width="38" height="38" rx="14"/>
      </clipPath>
    </defs>
    <rect width="128" height="128" rx="28" fill="url(#bgAnim)"/>
    
    <!-- Montura -->
    <rect x="20" y="44" width="38" height="38" rx="14" fill="#0B132B" stroke="url(#frameRim)" stroke-width="5"/>
    <rect x="70" y="44" width="38" height="38" rx="14" fill="#0B132B" stroke="url(#frameRim)" stroke-width="5"/>
    <path d="M 58 56 Q 64 51 70 56" fill="none" stroke="url(#frameRim)" stroke-width="4.5" stroke-linecap="round"/>
    
    <!-- Destello animado con SMIL que barre la lente cada 2.5 segundos -->
    <g clip-path="url(#lensClip)">
      <rect x="-40" y="30" width="20" height="70" fill="#FFFFFF" opacity="0.8" transform="rotate(25 35 60)">
        <animate attributeName="x" values="-50; 90; 90; -50" dur="2.8s" repeatCount="indefinite" keyTimes="0; 0.4; 0.9; 1"/>
        <animate attributeName="opacity" values="0; 0.85; 0; 0" dur="2.8s" repeatCount="indefinite" keyTimes="0; 0.2; 0.4; 1"/>
      </rect>
    </g>
    
    <!-- Punto de brillo que pulsa en la otra lente -->
    <circle cx="89" cy="63" r="3.5" fill="#10B981">
      <animate attributeName="r" values="3.5; 6; 3.5" dur="1.8s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.7; 1; 0.7" dur="1.8s" repeatCount="indefinite"/>
    </circle>
  </svg>
  `;

  // Guardar SVGs
  fs.writeFileSync(path.join(outDir, 'favicon-opt1.svg'), svgOpt1);
  fs.writeFileSync(path.join(outDir, 'favicon-opt2.svg'), svgOpt2);
  fs.writeFileSync(path.join(outDir, 'favicon-opt3.svg'), svgOpt3);
  fs.writeFileSync(path.join(outDir, 'favicon-animated.svg'), svgOpt4Animated);

  // Generar PNGs de alta resolución
  await sharp(Buffer.from(svgOpt1)).resize(128, 128).png().toFile(path.join(outDir, 'favicon-opt1.png'));
  await sharp(Buffer.from(svgOpt2)).resize(128, 128).png().toFile(path.join(outDir, 'favicon-opt2.png'));
  await sharp(Buffer.from(svgOpt3)).resize(128, 128).png().toFile(path.join(outDir, 'favicon-opt3.png'));

  // Apple Touch Icon (180x180 px estándar de iOS / iPadOS)
  await sharp(Buffer.from(svgOpt1))
    .resize(180, 180)
    .png()
    .toFile(path.join(outDir, 'apple-touch-icon.png'));

  console.log('Favicons and Apple Touch Icon generated successfully!');

  // =========================================================================
  // 2. PORTADAS DE WHATSAPP / SOCIAL MEDIA (1200 x 630 px)
  // =========================================================================

  // PORTADA 1: Cabina Nocturna Mercedes con Overlay Tipográfico Elegante
  console.log('Generating WhatsApp Cover 1 (Mercedes Night POV)...');
  const mercedesBase = 'public/scenes/proposals/proposal-2-master.jpg';

  const overlaySvg1 = `
  <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="darkGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#020617" stop-opacity="0.96"/>
        <stop offset="45%" stop-color="#020617" stop-opacity="0.88"/>
        <stop offset="75%" stop-color="#020617" stop-opacity="0.45"/>
        <stop offset="100%" stop-color="#020617" stop-opacity="0.15"/>
      </linearGradient>
      <linearGradient id="cyanAccent" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#38BDF8"/>
        <stop offset="100%" stop-color="#818CF8"/>
      </linearGradient>
    </defs>
    <!-- Fondo gradiente para legibilidad del texto sin tapar la cabina -->
    <rect width="1200" height="630" fill="url(#darkGrad1)"/>
    
    <!-- Barra superior de marca -->
    <rect x="70" y="60" width="180" height="34" rx="17" fill="#1E293B" stroke="#334155" stroke-width="1.5"/>
    <text x="92" y="82" fill="#38BDF8" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="800" letter-spacing="1.5">VISIOMETRIC LABS</text>
    
    <!-- Título Principal Impactante -->
    <text x="70" y="160" fill="#FFFFFF" font-family="'Plus Jakarta Sans', sans-serif" font-size="52" font-weight="800">
      EXPERIENCIA ÓPTICA
    </text>
    <text x="70" y="222" fill="url(#cyanAccent)" font-family="'Plus Jakarta Sans', sans-serif" font-size="52" font-weight="800">
      EN PRIMERA PERSONA
    </text>
    
    <!-- Bajada descriptiva para WhatsApp -->
    <text x="70" y="285" fill="#E2E8F0" font-family="'Plus Jakarta Sans', sans-serif" font-size="22" font-weight="500">
      Simulación interactiva de tratamientos oftálmicos de alta gama:
    </text>
    <text x="70" y="320" fill="#94A3B8" font-family="'Plus Jakarta Sans', sans-serif" font-size="20" font-weight="400">
      Antirreflejo Verde vs Crizal Multicapa • Blue Cut • Transitions
    </text>
    
    <!-- Badges de características -->
    <g transform="translate(70, 370)">
      <rect x="0" y="0" width="160" height="42" rx="10" fill="#0F172A" stroke="#0284C7" stroke-width="2"/>
      <text x="18" y="27" fill="#38BDF8" font-family="'Plus Jakarta Sans', sans-serif" font-size="15" font-weight="700">🚗 Visión 2K Noche</text>

      <rect x="175" y="0" width="165" height="42" rx="10" fill="#0F172A" stroke="#10B981" stroke-width="2"/>
      <text x="193" y="27" fill="#34D399" font-family="'Plus Jakarta Sans', sans-serif" font-size="15" font-weight="700">💎 Crizal Quirúrgico</text>

      <rect x="355" y="0" width="175" height="42" rx="10" fill="#0F172A" stroke="#F59E0B" stroke-width="2"/>
      <text x="373" y="27" fill="#FBBF24" font-family="'Plus Jakarta Sans', sans-serif" font-size="15" font-weight="700">💻 Confort Pantallas</text>
    </g>
    
    <!-- Footer con llamada a la acción -->
    <line x1="70" y1="520" x2="600" y2="520" stroke="#334155" stroke-width="1.5"/>
    <text x="70" y="560" fill="#F8FAFC" font-family="'Plus Jakarta Sans', sans-serif" font-size="18" font-weight="700">
      👉 Toca para abrir y probar en vivo en tu navegador
    </text>
    <text x="70" y="588" fill="#64748B" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="600">
      Suite Visiometric Labs — JayzirTech
    </text>
  </svg>
  `;

  await sharp(mercedesBase)
    .resize(1200, 630, { fit: 'cover' })
    .composite([
      { input: Buffer.from(overlaySvg1), blend: 'over' }
    ])
    .jpeg({ quality: 95 })
    .toFile(path.join(outDir, 'og-cover-opt1.jpg'));

  // PORTADA 2: Split-Screen Noche vs Oficina
  console.log('Generating WhatsApp Cover 2 (Split-Screen Noche vs Oficina)...');
  const officeBase = 'public/scenes/office-real.jpg';

  const leftHalf = await sharp(mercedesBase)
    .resize(600, 630, { fit: 'cover' })
    .toBuffer();

  const rightHalf = await sharp(officeBase)
    .resize(600, 630, { fit: 'cover' })
    .toBuffer();

  const splitCombined = await sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 3,
      background: { r: 15, g: 23, b: 42 }
    }
  })
    .composite([
      { input: leftHalf, left: 0, top: 0 },
      { input: rightHalf, left: 600, top: 0 }
    ])
    .png()
    .toBuffer();

  const overlaySvg2 = `
  <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="splitVignette" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#020617" stop-opacity="0.85"/>
        <stop offset="35%" stop-color="#020617" stop-opacity="0.2"/>
        <stop offset="70%" stop-color="#020617" stop-opacity="0.4"/>
        <stop offset="100%" stop-color="#020617" stop-opacity="0.95"/>
      </linearGradient>
      <linearGradient id="dividerGlow" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#38BDF8" stop-opacity="0"/>
        <stop offset="50%" stop-color="#38BDF8" stop-opacity="1"/>
        <stop offset="100%" stop-color="#38BDF8" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <!-- Viñeta superior e inferior para legibilidad -->
    <rect width="1200" height="630" fill="url(#splitVignette)"/>
    
    <!-- Línea divisoria central con resplandor -->
    <line x1="600" y1="0" x2="600" y2="630" stroke="url(#dividerGlow)" stroke-width="4"/>
    
    <!-- Etiquetas de cada escenario -->
    <rect x="50" y="40" width="220" height="38" rx="19" fill="#020617" fill-opacity="0.85" stroke="#0284C7" stroke-width="2"/>
    <text x="75" y="65" fill="#38BDF8" font-family="'Plus Jakarta Sans', sans-serif" font-size="15" font-weight="800">🚗 CONDUCCIÓN NOCTURNA</text>

    <rect x="930" y="40" width="220" height="38" rx="19" fill="#020617" fill-opacity="0.85" stroke="#10B981" stroke-width="2"/>
    <text x="955" y="65" fill="#34D399" font-family="'Plus Jakarta Sans', sans-serif" font-size="15" font-weight="800">💻 OFICINA &amp; PANTALLAS</text>

    <!-- Placa Central Flotante -->
    <rect x="250" y="430" width="700" height="150" rx="20" fill="#090D16" fill-opacity="0.94" stroke="#1E293B" stroke-width="2"/>
    
    <text x="600" y="475" text-anchor="middle" fill="#FFFFFF" font-family="'Plus Jakarta Sans', sans-serif" font-size="28" font-weight="800">
      VISIOMETRIC LABS
    </text>
    <text x="600" y="512" text-anchor="middle" fill="#38BDF8" font-family="'Plus Jakarta Sans', sans-serif" font-size="20" font-weight="700">
      Demostrador Clínico de Filtros Oftálmicos en Primera Persona
    </text>
    <text x="600" y="548" text-anchor="middle" fill="#94A3B8" font-family="'Plus Jakarta Sans', sans-serif" font-size="15" font-weight="500">
      Experimenta la diferencia real entre Antirreflejo Verde, Crizal y Blue Cut
    </text>
  </svg>
  `;

  await sharp(splitCombined)
    .composite([
      { input: Buffer.from(overlaySvg2), blend: 'over' }
    ])
    .jpeg({ quality: 95 })
    .toFile(path.join(outDir, 'og-cover-opt2.jpg'));

  // PORTADA 3: Minimalista Corporativa de Alta Gama
  console.log('Generating WhatsApp Cover 3 (Minimalist Luxury Branding)...');
  const overlaySvg3 = `
  <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="luxBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#020617"/>
        <stop offset="50%" stop-color="#0F172A"/>
        <stop offset="100%" stop-color="#020617"/>
      </linearGradient>
      <linearGradient id="luxAccent" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#38BDF8"/>
        <stop offset="50%" stop-color="#818CF8"/>
        <stop offset="100%" stop-color="#34D399"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#luxBg)"/>
    
    <!-- Cuadrícula sutil de fondo tecnológico -->
    <g stroke="#1E293B" stroke-width="1" opacity="0.4">
      <line x1="100" y1="0" x2="100" y2="630"/>
      <line x1="300" y1="0" x2="300" y2="630"/>
      <line x1="600" y1="0" x2="600" y2="630"/>
      <line x1="900" y1="0" x2="900" y2="630"/>
      <line x1="1100" y1="0" x2="1100" y2="630"/>
      <line x1="0" y1="150" x2="1200" y2="150"/>
      <line x1="0" y1="315" x2="1200" y2="315"/>
      <line x1="0" y1="480" x2="1200" y2="480"/>
    </g>
    
    <!-- Emblema Central de Montura -->
    <g transform="translate(600, 160) scale(1.6)">
      <!-- Lente Izquierda -->
      <rect x="-65" y="-30" width="55" height="55" rx="18" fill="#0B132B" stroke="#38BDF8" stroke-width="4.5"/>
      <!-- Lente Derecha -->
      <rect x="10" y="-30" width="55" height="55" rx="18" fill="#0B132B" stroke="#10B981" stroke-width="4.5"/>
      <!-- Puente -->
      <path d="M -10 -12 Q 0 -20 10 -12" fill="none" stroke="#818CF8" stroke-width="4.5" stroke-linecap="round"/>
      <!-- Destellos -->
      <circle cx="-38" cy="-10" r="5" fill="#FFFFFF"/>
      <circle cx="38" cy="-10" r="5" fill="#FFFFFF"/>
    </g>
    
    <!-- Textos Centrales -->
    <text x="600" y="320" text-anchor="middle" fill="#38BDF8" font-family="'Plus Jakarta Sans', sans-serif" font-size="18" font-weight="800" letter-spacing="4">
      SUITE VISIOMETRIC LABS
    </text>
    
    <text x="600" y="380" text-anchor="middle" fill="#FFFFFF" font-family="'Plus Jakarta Sans', sans-serif" font-size="44" font-weight="800">
      EXPERIMENTA LA DIFERENCIA
    </text>
    <text x="600" y="430" text-anchor="middle" fill="url(#luxAccent)" font-family="'Plus Jakarta Sans', sans-serif" font-size="40" font-weight="800">
      ANTES DE COMPRAR
    </text>
    
    <text x="600" y="490" text-anchor="middle" fill="#94A3B8" font-family="'Plus Jakarta Sans', sans-serif" font-size="20" font-weight="500">
      Herramienta clínica de demostración en primera persona para óptica y mostrador
    </text>
    
    <rect x="420" y="530" width="360" height="46" rx="23" fill="#1E293B" stroke="#38BDF8" stroke-width="1.5"/>
    <text x="600" y="560" text-anchor="middle" fill="#38BDF8" font-family="'Plus Jakarta Sans', sans-serif" font-size="16" font-weight="700">
      👉 Demostración Interactiva en Vivo
    </text>
  </svg>
  `;

  await sharp(Buffer.from(overlaySvg3))
    .jpeg({ quality: 95 })
    .toFile(path.join(outDir, 'og-cover-opt3.jpg'));

  console.log('All branding assets generated successfully in public/branding/ !');
}

generateBranding().catch(console.error);
