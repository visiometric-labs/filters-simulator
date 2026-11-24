import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const outDir = 'public/branding';
const brandingDir = 'branding';

async function generateGlassesAvatar() {
  console.log('Generating high-res official glasses avatar from user selection...');

  // 1024 x 1024 SVG de la montura oftálmica con destello
  const svg1024 = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024">
    <defs>
      <!-- Fondo oscuro de cabina con gradiente radial de profundidad -->
      <radialGradient id="avBg" cx="50%" cy="45%" r="65%">
        <stop offset="0%" stop-color="#0F172A"/>
        <stop offset="60%" stop-color="#070B14"/>
        <stop offset="100%" stop-color="#020617"/>
      </radialGradient>
      
      <!-- Gradiente de la montura: cian -> zafiro -> verde esmeralda Crizal -->
      <linearGradient id="frameGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#38BDF8"/>
        <stop offset="45%" stop-color="#60A5FA"/>
        <stop offset="75%" stop-color="#34D399"/>
        <stop offset="100%" stop-color="#10B981"/>
      </linearGradient>

      <!-- Gradiente del bisel exterior de titanio -->
      <linearGradient id="rimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#38BDF8" stop-opacity="0.8"/>
        <stop offset="50%" stop-color="#1E293B" stop-opacity="0.3"/>
        <stop offset="100%" stop-color="#10B981" stop-opacity="0.7"/>
      </linearGradient>

      <!-- Reflejo óptico / glint de corte en cristal izquierdo -->
      <linearGradient id="lensGlint" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.9"/>
        <stop offset="50%" stop-color="#38BDF8" stop-opacity="0.4"/>
        <stop offset="100%" stop-color="#38BDF8" stop-opacity="0"/>
      </linearGradient>

      <filter id="frameAura" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="24" result="blur"/>
        <feComposite in="SourceGraphic" in2="blur" operator="over"/>
      </filter>

      <filter id="softGlint" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="8" result="blur"/>
        <feComposite in="SourceGraphic" in2="blur" operator="over"/>
      </filter>
    </defs>

    <!-- Base Circular Oscura -->
    <rect width="1024" height="1024" fill="url(#avBg)"/>
    
    <!-- Bisel exterior de titanio satinado con retícula de calibración -->
    <circle cx="512" cy="512" r="465" fill="none" stroke="url(#rimGrad)" stroke-width="12"/>
    <circle cx="512" cy="512" r="440" fill="none" stroke="#1E293B" stroke-width="3" stroke-dasharray="10 14"/>
    <circle cx="512" cy="512" r="415" fill="#090D18" stroke="#334155" stroke-width="3" stroke-opacity="0.3"/>

    <!-- AURA LUMINOSA DE LA MONTURA -->
    <g filter="url(#frameAura)" opacity="0.45">
      <rect x="160" y="352" width="304" height="304" rx="112" fill="none" stroke="#38BDF8" stroke-width="40"/>
      <rect x="560" y="352" width="304" height="304" rx="112" fill="none" stroke="#10B981" stroke-width="40"/>
      <path d="M 464 448 Q 512 408 560 448" fill="none" stroke="#38BDF8" stroke-width="36" stroke-linecap="round"/>
    </g>

    <!-- CRISTALES INTERIORES OSCUROS CON TRATAMIENTO MULTICAPA -->
    <rect x="160" y="352" width="304" height="304" rx="112" fill="#070E20" stroke="url(#frameGrad)" stroke-width="36"/>
    <rect x="560" y="352" width="304" height="304" rx="112" fill="#070E20" stroke="url(#frameGrad)" stroke-width="36"/>

    <!-- PUENTE NASAL DE TITANIO -->
    <path d="M 464 448 Q 512 408 560 448" fill="none" stroke="url(#frameGrad)" stroke-width="32" stroke-linecap="round"/>

    <!-- VARILLAS LATERALES -->
    <line x1="80" y1="400" x2="160" y2="416" stroke="url(#frameGrad)" stroke-width="28" stroke-linecap="round"/>
    <line x1="864" y1="416" x2="944" y2="400" stroke="url(#frameGrad)" stroke-width="28" stroke-linecap="round"/>

    <!-- DESTELLO REFLECTIVO EN CRISTAL IZQUIERDO (Antirreflejo) -->
    <path d="M 192 400 L 384 400 L 256 592 Z" fill="url(#lensGlint)" opacity="0.75" filter="url(#softGlint)"/>
    <circle cx="272" cy="424" r="28" fill="#FFFFFF"/>
    <circle cx="272" cy="424" r="56" fill="#38BDF8" opacity="0.4" filter="url(#softGlint)"/>

    <!-- PUNTO REFLEX ESMERALDA EN CRISTAL DERECHO (Crizal Verde 520nm) -->
    <circle cx="752" cy="440" r="20" fill="#10B981" opacity="0.9" filter="url(#softGlint)"/>
    <circle cx="752" cy="440" r="8" fill="#FFFFFF"/>
    <circle cx="752" cy="440" r="44" fill="#10B981" opacity="0.35"/>

    <!-- RETÍCULA DE CENTRADO PUPILAR (CRUZ MÉDICA EN AMBOS OJOS) -->
    <line x1="312" y1="490" x2="312" y2="518" stroke="#38BDF8" stroke-width="3" stroke-opacity="0.5"/>
    <line x1="298" y1="504" x2="326" y2="504" stroke="#38BDF8" stroke-width="3" stroke-opacity="0.5"/>
    <circle cx="312" cy="504" r="3" fill="#38BDF8" opacity="0.7"/>

    <line x1="712" y1="490" x2="712" y2="518" stroke="#10B981" stroke-width="3" stroke-opacity="0.5"/>
    <line x1="698" y1="504" x2="726" y2="504" stroke="#10B981" stroke-width="3" stroke-opacity="0.5"/>
    <circle cx="712" cy="504" r="3" fill="#10B981" opacity="0.7"/>
  </svg>
  `;

  // Guardar SVG master
  fs.writeFileSync(path.join(brandingDir, 'chromatis-avatar-official.svg'), svg1024);
  fs.writeFileSync(path.join(outDir, 'favicon-opt1.svg'), svg1024);

  // Generar PNG 1024x1024 y 512x512
  await sharp(Buffer.from(svg1024))
    .resize(1024, 1024)
    .png()
    .toFile(path.join(brandingDir, 'chromatis-avatar-official-1024.png'));

  await sharp(Buffer.from(svg1024))
    .resize(512, 512)
    .png()
    .toFile(path.join(brandingDir, 'chromatis-avatar-official-512.png'));

  // Generar favicons en public/branding/
  await sharp(Buffer.from(svg1024))
    .resize(180, 180)
    .png()
    .toFile(path.join(outDir, 'apple-touch-icon.png'));

  await sharp(Buffer.from(svg1024))
    .resize(128, 128)
    .png()
    .toFile(path.join(outDir, 'favicon-opt1.png'));

  console.log('✓ Official Glasses Avatar generated successfully!');
}

generateGlassesAvatar().catch(console.error);
