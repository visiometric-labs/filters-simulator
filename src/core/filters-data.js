/**
 * Catálogo Completo de Tratamientos y Filtros Ópticos
 * Incluye parámetros ópticos para el motor de renderizado y textos amigables para el paciente
 */
export const FILTERS_DATA = {
  'blanco': {
    id: 'blanco',
    name: 'Lente Normal',
    subtitle: 'Sin tratamiento (Base)',
    icon: '⚪',
    color: '#94A3B8',
    bgLight: '#F1F5F9',
    tag: 'Control / Base',
    headline: 'Visión estándar con reflejos parásitos naturales',
    patientDescription: 'El material base refleja entre un 8% y 14% de la luz. En la noche produce molestos halos alrededor de las luces y en la oficina genera destellos.',
    benefits: {
      confort: 40,
      claridad: 60,
      proteccion: 30,
    },
    // Parámetros de renderizado óptico
    optical: {
      transmission: 0.88,        // 88% de transmisión de luz
      flareFactor: 1.0,           // Halos de luz al 100% (deslumbrantes)
      ghostReflection: 0.12,     // Reflejos parásitos internos
      blueLightAbsorption: 0.05, // Bloqueo mínimo de luz azul
      tintRgba: [255, 255, 255, 0], // Sin tinte
      tintIntensity: 0.0,
      polarizationCut: 0.0,      // No polarizado
      photochromic: false,
      antiFog: false,
      contrastBoost: 1.0,
    },
    pitch: {
      dialogue: '“Sin un tratamiento antirreflejante, cada foco de luz o faro de auto rebota en la superficie del lente creando halos y encandilamiento molesto.”',
      physics: 'El material orgánico o mineral sin recubrimiento antirreflejante tiene una reflectancia Fresnel natural del 8 al 14%, lo que disminuye la transmisión luminosa y crea imágenes secundarias que reducen el contraste visual.',
    }
  },

  'ar-verde': {
    id: 'ar-verde',
    name: 'Antirreflejo Verde',
    subtitle: 'Estándar de mercado',
    icon: '🟢',
    color: '#059669',
    bgLight: '#D1FAE5',
    tag: 'Confort Nocturno',
    headline: 'Elimina los destellos molestos de focos y faroles',
    patientDescription: 'Capas microscópicas que neutralizan los reflejos de luz. Al manejar de noche los faros se ven nítidos y sin destellos descontrolados.',
    benefits: {
      confort: 85,
      claridad: 92,
      proteccion: 60,
    },
    optical: {
      transmission: 0.985,       // 98.5% de transmisión de luz
      flareFactor: 0.18,          // Halos reducidos drásticamente
      ghostReflection: 0.015,
      blueLightAbsorption: 0.10,
      tintRgba: [16, 185, 129, 0.06], // Tenue tinte esmeralda en ángulos extremos
      tintIntensity: 0.05,
      polarizationCut: 0.0,
      photochromic: false,
      antiFog: false,
      contrastBoost: 1.15,
    },
    pitch: {
      dialogue: '“Es el tratamiento esencial para que la gente vea tus ojos con total transparencia y para que puedas manejar tranquilo de noche sin que las luces te encandilen.”',
      physics: 'Genera interferencia destructiva calibrada en ~550 nm (sensibilidad máxima del ojo humano fotópico), elevando la transmisión de luz hasta un 98.5% y cancelando los halos nocturnos.',
    }
  },

  'crizal': {
    id: 'crizal',
    name: 'Crizal Multicapa',
    subtitle: 'Protección Premium 5 en 1',
    icon: '💎',
    color: '#2563EB',
    bgLight: 'rgba(37, 99, 235, 0.18)',
    tag: 'Gama Alta Essilor',
    headline: 'Máxima nitidez, fácil de limpiar y resistente a rayas',
    patientDescription: 'No es solo antirreflejo: es un blindaje nanotecnológico. El agua resbala, no se mancha con las huellas, no atrae polvo y ofrece la máxima transparencia posible.',
    benefits: {
      confort: 98,
      claridad: 99,
      proteccion: 95,
    },
    optical: {
      transmission: 0.995,       // 99.5% transmisión pura
      flareFactor: 0.05,          // Halos prácticamente inexistentes
      ghostReflection: 0.005,
      blueLightAbsorption: 0.15,
      tintRgba: [255, 255, 255, 0], // Transparencia absoluta
      tintIntensity: 0.0,
      polarizationCut: 0.0,
      photochromic: false,
      antiFog: false,
      contrastBoost: 1.25,
      hydrophobic: true,
    },
    pitch: {
      dialogue: '“Es la inversión más inteligente en durabilidad: el lente dura años como nuevo porque no se raya fácil, se limpia en un segundo y el agua resbala sin taparte la visión.”',
      physics: 'Tratamiento multicapa que combina Anti-Glare Ultra (99.2%+ transmisión), barniz endurecedor SR Booster antirayas, barrera hidrofóbica/oleofóbica de alta tensión superficial y capa antiestática disipadora de cargas.',
    }
  },

  'amarillo': {
    id: 'amarillo',
    name: 'Filtro Amarillo',
    subtitle: 'DriveSafe Nocturno & Lluvia',
    icon: '🟡',
    color: '#D97706',
    bgLight: '#FEF3C7',
    tag: 'Alto Contraste',
    headline: 'Elimina el encandilamiento azul y resalta los carriles',
    patientDescription: 'Filtra las luces azules y blancas frías de los faros modernos LED y xenón. Aumenta drásticamente la definición del pavimento y líneas viales de noche o bajo lluvia.',
    benefits: {
      confort: 94,
      claridad: 96,
      proteccion: 88,
    },
    optical: {
      transmission: 0.94,
      flareFactor: 0.08,
      ghostReflection: 0.01,
      blueLightAbsorption: 0.85,
      tintRgba: [245, 158, 11, 0.22],
      tintIntensity: 0.25,
      polarizationCut: 0.0,
      photochromic: false,
      antiFog: false,
      contrastBoost: 1.40,
    },
    pitch: {
      dialogue: '“Especial para personas que sufren al manejar de noche con lluvia o encandiladas por los faros LED de otros autos: este filtro relaja la vista y hace resaltar el asfalto.”',
      physics: 'Tinte selectivo de corte ámbar que absorbe el extremo azul del espectro visible (responsable de la mayor aberración cromática y dispersión Rayleigh en el ojo), aumentando la agudeza visual y la sensibilidad al contraste.',
    }
  },

  'blue-cut': {
    id: 'blue-cut',
    name: 'Filtro Blue Cut',
    subtitle: 'Protección Pantallas LED',
    icon: '🔵',
    color: '#2563EB',
    bgLight: '#DBEAFE',
    tag: 'Mundo Digital',
    headline: 'Descanso total frente a computador y celular',
    patientDescription: 'Filtra la luz azul de alta energía que emiten las pantallas y luces LED. Reduce el ardor en los ojos, los dolores de cabeza y mejora el contraste al leer.',
    benefits: {
      confort: 95,
      claridad: 90,
      proteccion: 95,
    },
    optical: {
      transmission: 0.96,
      flareFactor: 0.20,
      ghostReflection: 0.015,
      blueLightAbsorption: 0.80, // Bloqueo selectivo de luz azul HEV de pantallas
      tintRgba: [251, 191, 36, 0.24], // Calidez relajante ámbar/crema de descanso
      tintIntensity: 0.55,
      polarizationCut: 0.0,
      photochromic: false,
      antiFog: false,
      contrastBoost: 1.35,       // Alto contraste y nitidez en textos
    },
    pitch: {
      dialogue: '“Si pasas más de 3 horas al día mirando pantallas o tu celular, este filtro evita que termines la jornada con ojos rojos, pesadez y dolor de cabeza.”',
      physics: 'Bloquea selectivamente el espectro de Luz Azul de Alta Energía Visible (HEV 380 - 455 nm) responsable del estrés oxidativo retiniano, permitiendo el paso del azul-turquesa regulador del ciclo circadiano.',
    }
  },

  'trinity': {
    id: 'trinity',
    name: 'Fotocromático Trinity',
    subtitle: 'Gris Neutro Tradicional',
    icon: '🌤️',
    color: '#64748B',
    bgLight: 'rgba(100, 116, 139, 0.18)',
    tag: 'Fotocromático Estándar',
    headline: 'Oscurecimiento solar balanceado para el día a día',
    patientDescription: 'Tecnología fotocromática tradicional de masa. Se adapta a la luz solar alcanzando una oscuridad media (Categoría 2, hasta 65% de absorción). Ideal para quienes buscan confort en exteriores a un precio accesible.',
    benefits: {
      confort: 82,
      claridad: 88,
      proteccion: 85,
    },
    optical: {
      transmission: 0.98,
      flareFactor: 0.22,
      ghostReflection: 0.03,
      blueLightAbsorption: 0.35,
      tintRgba: [45, 55, 72, 0.65],
      tintIntensity: 0.0,
      polarizationCut: 0.0,
      photochromic: true,
      maxDepth: 0.65,
      speedFactor: 0.55,
      antiFog: false,
      contrastBoost: 1.10,
    },
    pitch: {
      dialogue: '“Es la opción práctica y económica para protegerse del sol: una lente que se adapta a exteriores con un tinte gris cómodo sin pagar de más.”',
      physics: 'Monómero fotocromático estándar que absorbe radiación ultravioleta moderada, alcanzando una transmitancia de Categoría 2 (alrededor del 35% de transmisión remanente) con tiempo de respuesta estándar.',
    }
  },

  'transitions': {
    id: 'transitions',
    name: 'Transitions Signature',
    subtitle: 'Gris Grafito de Alta Velocidad',
    icon: '☀️',
    color: '#F59E0B',
    bgLight: 'rgba(245, 158, 11, 0.18)',
    tag: 'Gama Alta Fotosensible',
    headline: 'Oscurecimiento ultrarrápido y máxima profundidad solar',
    patientDescription: 'La tecnología fotosensible número 1 del mundo. Reacciona al instante bajo el sol alcanzando una oscuridad profunda de gafa de sol (Categoría 3 completa, hasta 88% de bloqueo). Máxima protección contra el sol intenso y rayos UV.',
    benefits: {
      confort: 98,
      claridad: 96,
      proteccion: 100,
    },
    optical: {
      transmission: 0.98,
      flareFactor: 0.12,
      ghostReflection: 0.015,
      blueLightAbsorption: 0.45,
      tintRgba: [38, 48, 62, 0.88],
      tintIntensity: 0.0,
      polarizationCut: 0.0,
      photochromic: true,
      maxDepth: 0.88,
      speedFactor: 1.0,
      antiFog: false,
      contrastBoost: 1.20,
    },
    pitch: {
      dialogue: '“Es la tecnología líder mundial: se oscurece al instante al salir a la calle, alcanza una oscuridad profunda de gafa de sol real y se aclara mucho más rápido bajo techo sin dejar marcas.”',
      physics: 'Moléculas fotosensibles orgánicas de última generación que reaccionan inmediatamente ante el espectro UV y luz natural intensa, pasando con rapidez de Categoría 0 a Categoría 3 (bloqueando hasta el 88% de la radiación visible y 100% de rayos UVA/UVB).',
    }
  },

  'polarizado': {
    id: 'polarizado',
    name: 'Filtro Polarizado',
    subtitle: 'Elimina el resplandor de asfalto y agua',
    icon: '🕶️',
    color: '#8B5CF6',
    bgLight: 'rgba(139, 92, 246, 0.18)',
    tag: 'Conducción y Sol',
    headline: 'Elimina por completo el resplandor blanco enceguecedor',
    patientDescription: 'Una gafa de sol común solo atenúa la luz. El polarizado bloquea el rebote horizontal del sol en el asfalto, autos y agua, revelando colores reales, gran contraste y descansando tus ojos al instante.',
    benefits: {
      confort: 100,
      claridad: 98,
      proteccion: 100,
    },
    optical: {
      transmission: 0.45,        // Categoría solar estándar
      flareFactor: 0.04,
      ghostReflection: 0.008,
      blueLightAbsorption: 0.50,
      tintRgba: [22, 34, 48, 0.52], // Tinte polarizado neutro de alta fidelidad
      tintIntensity: 0.65,
      polarizationCut: 0.95,     // Cancela el 95%+ del resplandor horizontal
      photochromic: false,
      antiFog: false,
      contrastBoost: 1.45,
    },
    pitch: {
      dialogue: '“Una gafa de sol común solo oscurece la molestia; el lente polarizado borra mágicamente el reflejo blanco del asfalto o del agua para que veas con total seguridad, colores vivos y sin forzar los ojos.”',
      physics: 'Filtro con eje de transmisión estrictamente vertical que bloquea por absorción la luz polarizada horizontal producida por reflexión en superficies brillantes (ángulo de Brewster en pavimento y agua), elevando drásticamente el contraste fotópico.',
    }
  }
};
