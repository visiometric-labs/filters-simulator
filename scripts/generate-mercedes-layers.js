import sharp from 'sharp';
import path from 'path';

async function generateMercedesLayers() {
  const rawProposal = 'public/scenes/proposals/proposal-2.jpg';
  const master2k = 'public/scenes/proposals/proposal-2-master.jpg';
  const outDir = 'public/scenes';

  console.log('Generating 2752x1536 Master Full HD calibrated optical layers for Mercedes-Benz...');

  // 1. Escalar propuesta cruda a Master 2752x1536 con Lanczos3 y máscara de enfoque
  await sharp(rawProposal)
    .resize(2752, 1536, {
      kernel: sharp.kernel.lanczos3,
      fit: 'fill'
    })
    .sharpen({
      sigma: 1.15,
      m1: 1.2,
      m2: 2.8,
      x1: 2,
      y2: 12,
      y3: 22
    })
    .jpeg({ quality: 98, chromaSubsampling: '4:4:4' })
    .toFile(master2k);

  const { width, height } = await sharp(master2k).metadata();

  // Extraer las fuentes de luz de los faros de los autos contrarios y farolas a 2752x1536
  const highlights = await sharp(master2k)
    .threshold(195)
    .toBuffer();

  // 1. CRIZAL MULTICAPA (Visión Pura Quirúrgica, Faros Nítidos Sin Nube, 99.5% Transmisión, Negros Puros)
  console.log('1/4 Creating Crizal Multicapa 2K Master...');
  await sharp(master2k)
    .linear(1.25, -20)
    .modulate({ brightness: 0.97, saturation: 1.12 })
    .sharpen({ sigma: 1.4, m1: 1.25, m2: 2.8 })
    .jpeg({ quality: 98, chromaSubsampling: '4:4:4' })
    .toFile(path.join(outDir, 'night-crizal.jpg'));

  // 2. ANTIRREFLEJO VERDE NORMAL (Estándar de Óptica: Controla destellos extremos pero conserva halo lechoso y reflejo verde residual)
  console.log('2/4 Creating AR Verde Normal 2K Master...');
  const diffuseBloom = await sharp(highlights)
    .blur(50)
    .modulate({ brightness: 0.85 })
    .toBuffer();

  const coreBloom = await sharp(highlights)
    .blur(18)
    .modulate({ brightness: 1.05 })
    .toBuffer();

  const greenResidual = await sharp(highlights)
    .blur(22)
    .recomb([
      [0.06, 0.0, 0.0],
      [0.15, 0.90, 0.10],
      [0.05, 0.12, 0.12]
    ])
    .modulate({ brightness: 0.80 })
    .toBuffer();

  const arBase = await sharp(master2k)
    .linear(0.95, 14) // Velo lumínico que eleva ligeramente las sombras (asfalto menos profundo)
    .sharpen({ sigma: 0.75, m1: 0.6, m2: 1.6 })
    .toBuffer();

  await sharp(arBase)
    .composite([
      { input: diffuseBloom, blend: 'screen' },
      { input: coreBloom, blend: 'screen' },
      { input: greenResidual, blend: 'screen' }
    ])
    .jpeg({ quality: 98, chromaSubsampling: '4:4:4' })
    .toFile(path.join(outDir, 'night-ar-verde.jpg'));

  // 3. LENTE BLANCA (SIN AR / DESLUMBRAMIENTO CEGADOR)
  console.log('3/4 Creating Lente Blanca 2K Master...');
  const wideGlow = await sharp(highlights)
    .blur(90)
    .modulate({ brightness: 1.55 })
    .toBuffer();

  const coreHalo = await sharp(highlights)
    .blur(30)
    .modulate({ brightness: 1.95 })
    .toBuffer();

  const horizontalStreak = await sharp(highlights)
    .resize(width, Math.round(height * 0.10), { fit: 'fill' })
    .blur(18)
    .resize(width, height, { fit: 'fill' })
    .modulate({ brightness: 0.90 })
    .toBuffer();

  // Reflejo fantasma en el cristal
  const ghostReflection = await sharp(highlights)
    .flip()
    .flop()
    .resize(width, height, { fit: 'inside' })
    .blur(10)
    .modulate({ brightness: 0.30 })
    .toBuffer();

  // Velo lumínico que lava el contraste del asfalto
  const washedBase = await sharp(master2k)
    .linear(0.85, 30)
    .toBuffer();

  await sharp(washedBase)
    .composite([
      { input: wideGlow, blend: 'screen' },
      { input: coreHalo, blend: 'screen' },
      { input: horizontalStreak, blend: 'screen' },
      { input: ghostReflection, blend: 'screen' },
    ])
    .jpeg({ quality: 98, chromaSubsampling: '4:4:4' })
    .toFile(path.join(outDir, 'night-blanco.jpg'));

  // 4. FILTRO AMARILLO / DRIVESAFE (Alto contraste, corta luz azul)
  console.log('4/4 Creating Filtro Amarillo 2K Master...');
  await sharp(master2k)
    .recomb([
      [1.08, 0.12, 0.0],
      [0.08, 1.12, 0.0],
      [0.0, 0.04, 0.38]
    ])
    .linear(1.22, -12)
    .sharpen({ sigma: 1.2, m1: 0.9, m2: 2.2 })
    .jpeg({ quality: 98, chromaSubsampling: '4:4:4' })
    .toFile(path.join(outDir, 'night-amarillo.jpg'));

  console.log('Mercedes 2K Master layers generated and saved successfully!');
}

generateMercedesLayers().catch(console.error);
