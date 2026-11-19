import sharp from 'sharp';
import path from 'path';

async function generateNightScenes() {
  const srcPath = 'public/scenes/night-real.jpg';
  const outDir = 'public/scenes';

  console.log('Generating perfected optical layers from:', srcPath);
  const metadata = await sharp(srcPath).metadata();
  const { width, height } = metadata;

  // Extraer las fuentes de luz intensas (faros de autos contrarios, farolas, letreros luminosos)
  const highlights = await sharp(srcPath)
    .threshold(185)
    .toBuffer();

  // -------------------------------------------------------------
  // 1. LENTE BLANCA (SIN AR / CONTROL):
  // Deslumbramiento cegador masivo, halos expansivos, niebla lumínica en el asfalto
  // -------------------------------------------------------------
  console.log('1/4 Creating Lente Blanca (Sin AR)...');
  const wideGlow = await sharp(highlights)
    .blur(50)
    .modulate({ brightness: 1.4 })
    .toBuffer();

  const coreHalo = await sharp(highlights)
    .blur(16)
    .modulate({ brightness: 1.8 })
    .toBuffer();

  const windshieldStreak = await sharp(highlights)
    .resize(width, Math.round(height * 0.12), { fit: 'fill' })
    .blur(10)
    .resize(width, height, { fit: 'fill' })
    .modulate({ brightness: 0.85 })
    .toBuffer();

  // Reflejo parásito interno (Ghost reflection)
  const ghostReflection = await sharp(highlights)
    .flip()
    .flop()
    .resize(width, height, {
      fit: 'inside'
    })
    .blur(5)
    .modulate({ brightness: 0.35 })
    .toBuffer();

  // Base deslavada (el rebote interno reduce el contraste del asfalto)
  const washedBase = await sharp(srcPath)
    .linear(0.85, 32)
    .toBuffer();

  await sharp(washedBase)
    .composite([
      { input: wideGlow, blend: 'screen' },
      { input: coreHalo, blend: 'screen' },
      { input: windshieldStreak, blend: 'screen' },
      { input: ghostReflection, blend: 'screen' },
    ])
    .jpeg({ quality: 95, chromaSubsampling: '4:4:4' })
    .toFile(path.join(outDir, 'night-blanco.jpg'));

  // -------------------------------------------------------------
  // 2. ANTIRREFLEJO VERDE NORMAL (Estándar de Óptica):
  // Reduce el 75-80% del deslumbramiento. Faros controlados, asfalto nítido.
  // -------------------------------------------------------------
  console.log('2/4 Creating AR Verde Normal...');
  const mildHalo = await sharp(highlights)
    .blur(12)
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

  // -------------------------------------------------------------
  // 3. CRIZAL MULTICAPA (Gama Alta Essilor / DriveSafe):
  // Claridad absoluta 99.5% de transmisión. Cero velo, negros puros.
  // -------------------------------------------------------------
  console.log('3/4 Creating Crizal Multicapa...');
  await sharp(srcPath)
    .linear(1.18, -14)
    .modulate({ brightness: 0.97, saturation: 1.10 })
    .sharpen({ sigma: 1.3, m1: 0.9, m2: 2.2 })
    .jpeg({ quality: 96, chromaSubsampling: '4:4:4' })
    .toFile(path.join(outDir, 'night-crizal.jpg'));

  // -------------------------------------------------------------
  // 4. FILTRO AMARILLO / DRIVESAFE (Visión Nocturna & Lluvia):
  // Absorción de longitudes de onda azules (faros xenón/LED molestos).
  // -------------------------------------------------------------
  console.log('4/4 Creating Filtro Amarillo...');
  await sharp(srcPath)
    .recomb([
      [1.08, 0.12, 0.0],
      [0.08, 1.12, 0.0],
      [0.0, 0.04, 0.38]
    ])
    .linear(1.22, -12)
    .sharpen({ sigma: 1.2 })
    .jpeg({ quality: 95, chromaSubsampling: '4:4:4' })
    .toFile(path.join(outDir, 'night-amarillo.jpg'));

  console.log('All night layers calibrated and saved!');
}

generateNightScenes().catch(console.error);
