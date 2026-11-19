import sharp from 'sharp';
import path from 'path';

async function generateOfficeLayers() {
  const src = 'public/scenes/office-real.jpg';
  const outDir = 'public/scenes';

  console.log('Generating high-end calibrated optical layers for Digital Office...');
  const meta = await sharp(src).metadata();
  const { width, height } = meta;

  // 1. CRIZAL MULTICAPA (Máxima nitidez quirúrgica, negros profundos, 99.5% transmisión, cero velo)
  console.log('1/4 office-crizal.jpg...');
  await sharp(src)
    .linear(1.12, -10)
    .sharpen({ sigma: 1.15, m1: 0.9, m2: 2.2 })
    .jpeg({ quality: 98, chromaSubsampling: '4:4:4' })
    .toFile(path.join(outDir, 'office-crizal.jpg'));

  // 2. ANTIRREFLEJO VERDE (Estándar de mercado, neutraliza reflejos de lámpara y ventana)
  console.log('2/4 office-ar-verde.jpg...');
  await sharp(src)
    .linear(1.05, -4)
    .sharpen({ sigma: 0.75, m1: 0.6, m2: 1.8 })
    .jpeg({ quality: 97, chromaSubsampling: '4:4:4' })
    .toFile(path.join(outDir, 'office-ar-verde.jpg'));

  // 3. FILTRO BLUE CUT (El filtro estrella: transforma el blanco LED frío en confort cálido relajante sin pegatinas)
  console.log('3/4 office-blue-cut.jpg...');
  await sharp(src)
    .recomb([
      [1.08, 0.04, 0.0],
      [0.02, 1.05, 0.0],
      [0.0, 0.02, 0.70] // Absorción del espectro azul agresivo (HEV)
    ])
    .linear(1.10, -8)
    .sharpen({ sigma: 1.2, m1: 1.0, m2: 2.5 })
    .jpeg({ quality: 98, chromaSubsampling: '4:4:4' })
    .toFile(path.join(outDir, 'office-blue-cut.jpg'));

  // 4. LENTE BLANCA (Sin tratamiento: luz LED fría agresiva, velo lumínico de fatiga visual y reflejo de lámpara)
  console.log('4/4 office-blanco.jpg...');
  const lampHighlights = await sharp(src)
    .threshold(215)
    .toBuffer();

  const lampGlare = await sharp(lampHighlights)
    .blur(32)
    .modulate({ brightness: 1.25 })
    .toBuffer();

  const washedBase = await sharp(src)
    .recomb([
      [0.96, 0.0, 0.0],
      [0.0, 0.98, 0.0],
      [0.02, 0.05, 1.10] // Tinte azulado frío deslumbrante de LED sin filtro
    ])
    .linear(0.92, 18) // Velo que reduce el contraste
    .toBuffer();

  await sharp(washedBase)
    .composite([
      { input: lampGlare, blend: 'screen' }
    ])
    .jpeg({ quality: 96, chromaSubsampling: '4:4:4' })
    .toFile(path.join(outDir, 'office-blanco.jpg'));

  console.log('All 4 digital office layers generated successfully!');
}

generateOfficeLayers().catch(console.error);
