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

  // 3. FILTRO BLUE CUT (El alivio visual: transforma el blanco LED frío en confort cálido descansado tipo papel)
  console.log('3/4 office-blue-cut.jpg...');
  await sharp(src)
    .recomb([
      [1.06, 0.05, 0.0],
      [0.02, 1.06, 0.0],
      [0.0, 0.02, 0.68] // Absorbe la luz azul punzante de alta energía (HEV)
    ])
    .linear(1.02, -4) // Suaviza el deslumbramiento fotópico a un blanco descansado
    .sharpen({ sigma: 1.1, m1: 1.0, m2: 2.2 })
    .jpeg({ quality: 98, chromaSubsampling: '4:4:4' })
    .toFile(path.join(outDir, 'office-blue-cut.jpg'));

  // 4. LENTE BLANCA (Sin tratamiento: fatiga visual por luz LED fría agresiva y punzante, 100% nítido sin desenfoque ni aberración de aumento)
  console.log('4/4 office-blanco.jpg...');
  
  // Paso 4a: Base con tinte azul frío penetrante (8500K) y sobreexposición en blancos
  const harshLedBase = await sharp(src)
    .recomb([
      [0.96, 0.0, 0.0],
      [0.0, 1.0, 0.0],
      [0.02, 0.06, 1.28] // Tinte azul frío HEV punzante
    ])
    .linear(1.15, 6) // Blancos sobreexpuestos y punzantes que cansan la pupila
    .sharpen({ sigma: 1.1, m1: 1.0, m2: 2.5 }) // Texto 100% nítido, sin problemas de aumento
    .toBuffer();

  // Paso 4b: Deslumbramiento fotópico (halo de alta luminancia que cansa la vista sin desenfocar el texto)
  // Extraemos únicamente las zonas de brillo extremo (las hojas en blanco del monitor y la lámpara)
  const extremeWhites = await sharp(src)
    .threshold(215)
    .blur(18) // Halo difuso suave que simula la dispersión de luz en el ojo cansado
    .modulate({ brightness: 0.35 })
    .toBuffer();

  await sharp(harshLedBase)
    .composite([
      { input: extremeWhites, blend: 'screen' }
    ])
    .jpeg({ quality: 98, chromaSubsampling: '4:4:4' })
    .toFile(path.join(outDir, 'office-blanco.jpg'));

  console.log('All 4 digital office layers generated successfully!');
}

generateOfficeLayers().catch(console.error);
