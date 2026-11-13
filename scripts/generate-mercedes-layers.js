import sharp from 'sharp';
import path from 'path';

async function generateMercedesLayers() {
  const srcPath = 'public/scenes/proposals/proposal-2.jpg';
  const outDir = 'public/scenes';

  console.log('Generating calibrated optical layers for Mercedes-Benz (Proposal 2)...');
  const metadata = await sharp(srcPath).metadata();
  const { width, height } = metadata;

  // Extraer las fuentes de luz de los faros de los autos contrarios y farolas
  const highlights = await sharp(srcPath)
    .threshold(195)
    .toBuffer();

  // 1. CRIZAL MULTICAPA (Visión Pura, Faros Nítidos, Alto Contraste, 99.5% Transmisión)
  console.log('1/4 Creating Crizal Multicapa for Mercedes...');
  await sharp(srcPath)
    .linear(1.16, -12) // Negros más profundos en asfalto y cabina, contraste quirúrgico
    .modulate({ brightness: 0.98, saturation: 1.08 })
    .sharpen({ sigma: 1.2, m1: 0.8, m2: 2.0 })
    .jpeg({ quality: 96, chromaSubsampling: '4:4:4' })
    .toFile(path.join(outDir, 'night-crizal.jpg'));

  // 2. ANTIRREFLEJO VERDE NORMAL (Estándar de Óptica: 75% reducción de halos)
  console.log('2/4 Creating AR Verde Normal for Mercedes...');
  const mildHalo = await sharp(highlights)
    .blur(14)
    .modulate({ brightness: 0.35 })
    .toBuffer();

  const arBase = await sharp(srcPath)
    .linear(1.05, -4)
    .sharpen({ sigma: 0.7, m1: 0.5, m2: 1.5 })
    .toBuffer();

  await sharp(arBase)
    .composite([
      { input: mildHalo, blend: 'screen' }
    ])
    .jpeg({ quality: 95, chromaSubsampling: '4:4:4' })
    .toFile(path.join(outDir, 'night-ar-verde.jpg'));

  // 3. LENTE BLANCA (SIN AR / DESLUMBRAMIENTO CEGADOR)
  console.log('3/4 Creating Lente Blanca (Sin AR) for Mercedes...');
  const wideGlow = await sharp(highlights)
    .blur(48)
    .modulate({ brightness: 1.5 })
    .toBuffer();

  const coreHalo = await sharp(highlights)
    .blur(16)
    .modulate({ brightness: 1.9 })
    .toBuffer();

  const horizontalStreak = await sharp(highlights)
    .resize(width, Math.round(height * 0.12), { fit: 'fill' })
    .blur(10)
    .resize(width, height, { fit: 'fill' })
    .modulate({ brightness: 0.85 })
    .toBuffer();

  // Reflejo fantasma en el cristal
  const ghostReflection = await sharp(highlights)
    .flip()
    .flop()
    .resize(width, height, { fit: 'inside' })
    .blur(6)
    .modulate({ brightness: 0.30 })
    .toBuffer();

  // Velo lumínico que lava el contraste del asfalto
  const washedBase = await sharp(srcPath)
    .linear(0.86, 28)
    .toBuffer();

  await sharp(washedBase)
    .composite([
      { input: wideGlow, blend: 'screen' },
      { input: coreHalo, blend: 'screen' },
      { input: horizontalStreak, blend: 'screen' },
      { input: ghostReflection, blend: 'screen' },
    ])
    .jpeg({ quality: 95, chromaSubsampling: '4:4:4' })
    .toFile(path.join(outDir, 'night-blanco.jpg'));

  // 4. FILTRO AMARILLO / DRIVESAFE (Alto contraste, corta luz azul)
  console.log('4/4 Creating Filtro Amarillo for Mercedes...');
  await sharp(srcPath)
    .recomb([
      [1.08, 0.12, 0.0],
      [0.08, 1.12, 0.0],
      [0.0, 0.04, 0.38]
    ])
    .linear(1.20, -10)
    .sharpen({ sigma: 1.1 })
    .jpeg({ quality: 95, chromaSubsampling: '4:4:4' })
    .toFile(path.join(outDir, 'night-amarillo.jpg'));

  console.log('Mercedes optical layers generated and saved successfully!');
}

generateMercedesLayers().catch(console.error);
