import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const outDir = 'public/branding';
const brandingDir = 'branding';

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
if (!fs.existsSync(brandingDir)) fs.mkdirSync(brandingDir, { recursive: true });

async function run() {
  console.log('--- Generating Chromatis Branding Assets ---');

  // =========================================================================
  // 1. WHATSAPP / OPEN GRAPH CARD (1200 x 630 px)
  // =========================================================================
  console.log('1. Generating WhatsApp Link Preview Card (og-cover-opt1.jpg)...');
  const cockpitBase = 'public/scenes/proposals/proposal-2-master.jpg';

  const cardSvg = `
  <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="cardBg" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#030712" stop-opacity="0.97"/>
        <stop offset="48%" stop-color="#030712" stop-opacity="0.90"/>
        <stop offset="78%" stop-color="#030712" stop-opacity="0.45"/>
        <stop offset="100%" stop-color="#030712" stop-opacity="0.15"/>
      </linearGradient>
      <linearGradient id="cyanGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#38BDF8"/>
        <stop offset="60%" stop-color="#60A5FA"/>
        <stop offset="100%" stop-color="#818CF8"/>
      </linearGradient>
      <linearGradient id="pillGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#1E293B"/>
        <stop offset="100%" stop-color="#0F172A"/>
      </linearGradient>
    </defs>

    <!-- Fondo de gradiente oscuro para legibilidad sin ocultar la cabina -->
    <rect width="1200" height="630" fill="url(#cardBg)"/>

    <!-- Píldora Superior: Suite Visiometric Labs -->
    <g transform="translate(70, 52)">
      <rect width="210" height="34" rx="17" fill="url(#pillGrad)" stroke="#38BDF8" stroke-width="1.2" stroke-opacity="0.5"/>
      <circle cx="20" cy="17" r="4.5" fill="#38BDF8"/>
      <text x="34" y="22" fill="#E2E8F0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700" letter-spacing="1.2">VISIOMETRIC LABS</text>
    </g>

    <!-- Título Principal de la Aplicación: CHROMATIS -->
    <text x="70" y="162" fill="url(#cyanGradient)" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="68" font-weight="900" letter-spacing="-1.5">
      CHROMATIS
    </text>
    <text x="70" y="200" fill="#94A3B8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="600" letter-spacing="0.5">
      by Visiometric Labs • JayzirTech
    </text>

    <!-- Bajada Clínica Clara -->
    <text x="70" y="260" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="28" font-weight="800">
      Simulador Interactivo de Filtros Oftálmicos POV
    </text>
    <text x="70" y="296" fill="#94A3B8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="19" font-weight="500">
      Antirreflejo Verde vs Crizal Multicapa • Transitions Solar • Blue Cut
    </text>

    <!-- Badges de Tratamientos Clínicos -->
    <g transform="translate(70, 350)">
      <!-- Badge 1: Noche 2K -->
      <rect x="0" y="0" width="168" height="42" rx="10" fill="#0F172A" stroke="#0284C7" stroke-width="1.8"/>
      <text x="20" y="26" fill="#38BDF8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700">🚗 Visión 2K Noche</text>

      <!-- Badge 2: Crizal -->
      <rect x="182" y="0" width="175" height="42" rx="10" fill="#0F172A" stroke="#10B981" stroke-width="1.8"/>
      <text x="202" y="26" fill="#34D399" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700">💎 Crizal Quirúrgico</text>

      <!-- Badge 3: Transitions Kinetics -->
      <rect x="371" y="0" width="180" height="42" rx="10" fill="#0F172A" stroke="#F59E0B" stroke-width="1.8"/>
      <text x="391" y="26" fill="#FBBF24" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700">☀️ Kinetics Solar</text>

      <!-- Badge 4: Blue Cut -->
      <rect x="565" y="0" width="160" height="42" rx="10" fill="#0F172A" stroke="#818CF8" stroke-width="1.8"/>
      <text x="585" y="26" fill="#A5B4FC" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700">💻 Confort Digital</text>
    </g>

    <!-- Línea divisoria y llamada a la acción -->
    <line x1="70" y1="510" x2="650" y2="510" stroke="#334155" stroke-width="1.5" stroke-opacity="0.8"/>
    
    <text x="70" y="552" fill="#F8FAFC" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="700">
      👉 Toca para abrir y probar en vivo en tu navegador
    </text>
    <text x="70" y="582" fill="#64748B" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600">
      © 2026 JayzirTech. Todos los derechos reservados. • Chromatis by Visiometric Labs
    </text>
  </svg>
  `;

  await sharp(cockpitBase)
    .resize(1200, 630, { fit: 'cover' })
    .composite([
      { input: Buffer.from(cardSvg), blend: 'over' }
    ])
    .jpeg({ quality: 95 })
    .toFile(path.join(outDir, 'og-cover-opt1.jpg'));

  // Copia también a branding/ para archivo y GitHub
  fs.copyFileSync(path.join(outDir, 'og-cover-opt1.jpg'), path.join(brandingDir, 'chromatis-whatsapp-preview.jpg'));
  fs.copyFileSync(path.join(outDir, 'og-cover-opt1.jpg'), path.join(brandingDir, 'github-social-preview-3d.jpg'));

  console.log('✓ WhatsApp Card generated: public/branding/og-cover-opt1.jpg and branding/chromatis-whatsapp-preview.jpg');

  // =========================================================================
  // 2. AVATAR / PROFILE PICTURE OPCIÓN 1: MONOGRAMA "C" PRISMÁTICO (1024x1024)
  // =========================================================================
  console.log('2. Generating Avatar Option 1 (Prismatic "C" Monogram)...');
  const avatarCSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024">
    <defs>
      <!-- Fondos de profundidad cósmica / obsidiana -->
      <radialGradient id="avBg" cx="50%" cy="45%" r="65%">
        <stop offset="0%" stop-color="#0F172A"/>
        <stop offset="60%" stop-color="#070B14"/>
        <stop offset="100%" stop-color="#020617"/>
      </radialGradient>
      
      <!-- Gradientes ópticos de luz espectral -->
      <linearGradient id="prismGrad" x1="15%" y1="15%" x2="85%" y2="85%">
        <stop offset="0%" stop-color="#38BDF8"/>
        <stop offset="35%" stop-color="#60A5FA"/>
        <stop offset="70%" stop-color="#A78BFA"/>
        <stop offset="100%" stop-color="#34D399"/>
      </linearGradient>

      <linearGradient id="rimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#38BDF8" stop-opacity="0.9"/>
        <stop offset="50%" stop-color="#1E293B" stop-opacity="0.3"/>
        <stop offset="100%" stop-color="#38BDF8" stop-opacity="0.7"/>
      </linearGradient>

      <!-- Glow y blur de lente oftálmica -->
      <filter id="lensAura" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="28" result="blur"/>
        <feComposite in="SourceGraphic" in2="blur" operator="over"/>
      </filter>

      <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="12" result="blur"/>
        <feComposite in="SourceGraphic" in2="blur" operator="over"/>
      </filter>
    </defs>

    <!-- Base Circular Oscura -->
    <rect width="1024" height="1024" fill="url(#avBg)"/>
    
    <!-- Bisel exterior de titanio satinado con retícula de calibración -->
    <circle cx="512" cy="512" r="460" fill="none" stroke="url(#rimGrad)" stroke-width="12"/>
    <circle cx="512" cy="512" r="435" fill="none" stroke="#1E293B" stroke-width="3" stroke-dasharray="8 12"/>
    <circle cx="512" cy="512" r="410" fill="#090D18" stroke="#334155" stroke-width="4" stroke-opacity="0.4"/>

    <!-- Arco de apertura cromática de fondo -->
    <circle cx="512" cy="512" r="320" fill="none" stroke="#38BDF8" stroke-width="2" stroke-opacity="0.25"/>

    <!-- MONOGRAMA "C" ÓPTICO PRISMÁTICO ESCULPIDO -->
    <!-- Sombra/Glow del "C" -->
    <path d="M 680 320 A 240 240 0 1 0 680 704" fill="none" stroke="#38BDF8" stroke-width="96" stroke-linecap="round" opacity="0.3" filter="url(#lensAura)"/>
    
    <!-- Cuerpo del "C" en gradiente de prisma de luz -->
    <path d="M 680 320 A 240 240 0 1 0 680 704" fill="none" stroke="url(#prismGrad)" stroke-width="84" stroke-linecap="round" filter="url(#softGlow)"/>

    <!-- Núcleo de vidrio biselado ultra-brillante -->
    <path d="M 672 320 A 232 232 0 1 0 672 704" fill="none" stroke="#FFFFFF" stroke-width="16" stroke-linecap="round" opacity="0.85"/>

    <!-- Destellos ópticos de faceta mineral (interferometría) -->
    <!-- Destello superior derecho -->
    <circle cx="680" cy="320" r="14" fill="#FFFFFF"/>
    <circle cx="680" cy="320" r="28" fill="#38BDF8" opacity="0.5"/>

    <!-- Destello inferior derecho -->
    <circle cx="680" cy="704" r="14" fill="#FFFFFF"/>
    <circle cx="680" cy="704" r="28" fill="#34D399" opacity="0.5"/>

    <!-- Destello cenital en la cresta del C -->
    <circle cx="272" cy="512" r="18" fill="#FFFFFF"/>
    <circle cx="272" cy="512" r="40" fill="#60A5FA" opacity="0.4"/>

    <!-- Micro-retícula central de diagnóstico -->
    <circle cx="512" cy="512" r="24" fill="none" stroke="#38BDF8" stroke-width="3" stroke-opacity="0.6"/>
    <circle cx="512" cy="512" r="5" fill="#38BDF8"/>
    <line x1="512" y1="460" x2="512" y2="480" stroke="#38BDF8" stroke-width="2.5" stroke-opacity="0.7"/>
    <line x1="512" y1="544" x2="512" y2="564" stroke="#38BDF8" stroke-width="2.5" stroke-opacity="0.7"/>
  </svg>
  `;

  fs.writeFileSync(path.join(brandingDir, 'chromatis-avatar-c-prism.svg'), avatarCSvg);
  fs.writeFileSync(path.join(outDir, 'favicon-opt1.svg'), avatarCSvg); // Reemplaza favicon principal

  await sharp(Buffer.from(avatarCSvg))
    .resize(1024, 1024)
    .png()
    .toFile(path.join(brandingDir, 'chromatis-avatar-1024.png'));

  await sharp(Buffer.from(avatarCSvg))
    .resize(512, 512)
    .png()
    .toFile(path.join(brandingDir, 'chromatis-avatar-512.png'));

  await sharp(Buffer.from(avatarCSvg))
    .resize(180, 180)
    .png()
    .toFile(path.join(outDir, 'apple-touch-icon.png'));

  await sharp(Buffer.from(avatarCSvg))
    .resize(128, 128)
    .png()
    .toFile(path.join(outDir, 'favicon-opt1.png'));

  console.log('✓ Avatar Option 1 generated: chromatis-avatar-1024.png, chromatis-avatar-512.png, apple-touch-icon.png, favicon-opt1.png');

  // =========================================================================
  // 3. AVATAR OPCIÓN 2: APERTURA OFTÁLMICA MULTICAPA (1024x1024)
  // =========================================================================
  console.log('3. Generating Avatar Option 2 (Optical Aperture / Multicoat)...');
  const avatarApertureSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024">
    <defs>
      <radialGradient id="apBg" cx="50%" cy="50%" r="70%">
        <stop offset="0%" stop-color="#020617"/>
        <stop offset="70%" stop-color="#090D18"/>
        <stop offset="100%" stop-color="#000000"/>
      </radialGradient>
      <linearGradient id="crizalGreen" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#10B981"/>
        <stop offset="100%" stop-color="#059669"/>
      </linearGradient>
      <linearGradient id="sapphireBlue" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#38BDF8"/>
        <stop offset="100%" stop-color="#2563EB"/>
      </linearGradient>
      <linearGradient id="amberGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#F59E0B"/>
        <stop offset="100%" stop-color="#D97706"/>
      </linearGradient>
    </defs>

    <rect width="1024" height="1024" fill="url(#apBg)"/>
    
    <!-- Anillo exterior de titanio de precisión con marcas de grado oftálmico -->
    <circle cx="512" cy="512" r="455" fill="none" stroke="#334155" stroke-width="14"/>
    <circle cx="512" cy="512" r="425" fill="none" stroke="#64748B" stroke-width="2" stroke-dasharray="6 14"/>

    <!-- Anillos concéntricos de interferencia multicapa (Filtros de Luz) -->
    <!-- Capa 1: Zafiro / Antirreflejo Multiespectral -->
    <circle cx="512" cy="512" r="360" fill="#0B132B" stroke="url(#sapphireBlue)" stroke-width="12" opacity="0.9"/>
    
    <!-- Capa 2: Verde Quirúrgico Crizal -->
    <circle cx="512" cy="512" r="280" fill="none" stroke="url(#crizalGreen)" stroke-width="9" opacity="0.85"/>

    <!-- Capa 3: Ámbar Fotocromático / Blue Cut -->
    <circle cx="512" cy="512" r="200" fill="none" stroke="url(#amberGold)" stroke-width="7" opacity="0.8"/>

    <!-- Pupila y Retícula Focal Central -->
    <circle cx="512" cy="512" r="110" fill="#030712" stroke="#38BDF8" stroke-width="4"/>
    <circle cx="512" cy="512" r="30" fill="#38BDF8"/>
    <circle cx="512" cy="512" r="10" fill="#FFFFFF"/>

    <!-- Cruz de Calibración Óptica -->
    <line x1="512" y1="120" x2="512" y2="904" stroke="#38BDF8" stroke-width="2" stroke-opacity="0.25"/>
    <line x1="120" y1="512" x2="904" y2="512" stroke="#38BDF8" stroke-width="2" stroke-opacity="0.25"/>

    <!-- Destellos especulares -->
    <circle cx="340" cy="340" r="14" fill="#FFFFFF" opacity="0.8"/>
  </svg>
  `;

  fs.writeFileSync(path.join(brandingDir, 'chromatis-avatar-aperture.svg'), avatarApertureSvg);
  await sharp(Buffer.from(avatarApertureSvg))
    .resize(1024, 1024)
    .png()
    .toFile(path.join(brandingDir, 'chromatis-avatar-aperture-1024.png'));

  console.log('✓ Avatar Option 2 generated: chromatis-avatar-aperture-1024.png and .svg');
  console.log('--- All Chromatis Branding Assets Completed Successfully! ---');
}

run().catch(console.error);
