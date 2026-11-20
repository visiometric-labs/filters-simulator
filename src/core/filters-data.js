import { getOpticalIcon } from './optical-icons.js';

/**
 * Catálogo Completo de Tratamientos y Filtros Ópticos
 * Incluye parámetros ópticos para el motor de renderizado y textos de metrología clínica
 */
export const FILTERS_DATA = {
  'blanco': {
    id: 'blanco',
    name: 'Lente Neutro Base',
    subtitle: 'Orgánico CR-39 / Sin Tratar',
    iconKey: 'filter-blanco',
    get icon() { return getOpticalIcon('filter-blanco', 18); },
    color: '#64748B',
    bgLight: '#F1F5F9',
    tag: 'Control / Base',
    specCode: 'ISO 8980-1',
    headline: 'Transmisión estándar con reflectancia parásita natural',
    patientDescription: 'El polímero orgánico base refleja entre 8% y 14% de la radiación visible por efecto Fresnel. En condiciones de baja luminosidad genera halos de dispersión y destellos en fuentes LED.',
    benefits: {
      confort: 40,
      claridad: 60,
      proteccion: 30,
    },
    optical: {
      transmission: 0.88,
      flareFactor: 1.0,
      ghostReflection: 0.12,
      blueLightAbsorption: 0.05,
      tintRgba: [255, 255, 255, 0],
      tintIntensity: 0.0,
      polarizationCut: 0.0,
      photochromic: false,
      antiFog: false,
      contrastBoost: 1.0,
    },
    pitch: {
      dialogue: '“Sin recubrimiento antirreflejante de laboratorio, cada fuente de iluminación urbana o faro vehicular genera dobles imágenes y velos de contraste en la retina.”',
      physics: 'Superficie dieléctrica pulida sin recubrimiento antirreflejante. Presenta reflectancia residual de Fresnel calculada en R = [(n-1)/(n+1)]² (~8.5% bilateral en índice 1.50), induciendo dispersión luminosa no colimada.',
    }
  },

  'ar-verde': {
    id: 'ar-verde',
    name: 'Antirreflejo 550nm',
    subtitle: 'Recubrimiento Fotópico Estándar',
    iconKey: 'filter-ar-verde',
    get icon() { return getOpticalIcon('filter-ar-verde', 18); },
    color: '#059669',
    bgLight: '#D1FAE5',
    tag: 'AR Esmeralda',
    specCode: '550 nm λ-Peak',
    headline: 'Atenuación de halos parásitos nocturnos por interferencia',
    patientDescription: 'Capas microscópicas de óxidos metálicos que cancelan la reflexión en el pico fotópico (550 nm). Aumenta la transmisión lumínica útil al 98.5% reduciendo la fatiga corneal nocturna.',
    benefits: {
      confort: 85,
      claridad: 92,
      proteccion: 60,
    },
    optical: {
      transmission: 0.985,
      flareFactor: 0.18,
      ghostReflection: 0.015,
      blueLightAbsorption: 0.10,
      tintRgba: [16, 185, 129, 0.06],
      tintIntensity: 0.05,
      polarizationCut: 0.0,
      photochromic: false,
      antiFog: false,
      contrastBoost: 1.15,
    },
    pitch: {
      dialogue: '“Tratamiento esencial de laboratorio para transparentar la mirada del paciente y eliminar los destellos molestos de farolas y focos en conducción.”',
      physics: 'Interferencia destructiva de onda finita en película de un cuarto de longitud de onda (d = λ/4n) calibrada para 550 nm (curva de sensibilidad de conos fotópicos V(λ)), elevando la transmitancia neta al 98.5%.',
    }
  },

  'crizal': {
    id: 'crizal',
    name: 'Crizal Multicapa Nano',
    subtitle: 'Stack Nanométrico 99.5% Transmisión',
    iconKey: 'filter-crizal',
    get icon() { return getOpticalIcon('filter-crizal', 18); },
    color: '#4F46E5',
    bgLight: '#E0E7FF',
    tag: 'Alta Gama Essilor',
    specCode: '99.5% T-Pura',
    headline: 'Transparencia absoluta, blindaje hidrofóbico y dureza mineral',
    patientDescription: 'Matriz multicapa de alto vacío que deposita 10 estratos antirreflejantes, capa hidrofóbica con ángulo de contacto >110°, barrera oleofóbica y protección antiestática repelente de partículas.',
    benefits: {
      confort: 98,
      claridad: 99,
      proteccion: 95,
    },
    optical: {
      transmission: 0.995,
      flareFactor: 0.05,
      ghostReflection: 0.005,
      blueLightAbsorption: 0.15,
      tintRgba: [255, 255, 255, 0],
      tintIntensity: 0.0,
      polarizationCut: 0.0,
      photochromic: false,
      antiFog: false,
      contrastBoost: 1.25,
      hydrophobic: true,
    },
    pitch: {
      dialogue: '“Es la máxima inversión en ergonomía visual y durabilidad: el lente conserva su transparencia quirúrgica, el agua resbala sin condensarse y la lente permanece inmune al polvo.”',
      physics: 'Sistema de multicapas dieléctricas alternadas de alto y bajo índice de refracción (TiO₂/SiO₂) aplicadas por evaporación por haz de electrones (IAD), garantizando reflectancia residual <0.5% en todo el espectro visible.',
    }
  },

  'amarillo': {
    id: 'amarillo',
    name: 'Filtro Ámbar DriveSafe',
    subtitle: 'Corte Selectivo de Alta Frecuencia',
    iconKey: 'filter-amarillo',
    get icon() { return getOpticalIcon('filter-amarillo', 18); },
    color: '#D97706',
    bgLight: '#FEF3C7',
    tag: 'Alto Contraste',
    specCode: 'λ-Cut 450nm',
    headline: 'Definición de asfalto y neutralización de faros LED fríos',
    patientDescription: 'Filtro espectral de absorción selectiva que bloquea las longitudes de onda cortas dispersivas de fuentes LED y xenón, realzando la sensibilidad al contraste de los bordes viales bajo lluvia o niebla.',
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
      dialogue: '“Prescripción de alto rendimiento para pacientes que experimentan encandilamiento por luminarias LED modernas o fatiga severa en carretera nocturna y bajo precipitaciones.”',
      physics: 'Atenuación de la dispersión de Rayleigh (I ∝ 1/λ⁴) mediante el bloqueo del tercio azul del espectro visible. Esto minimiza el velo de deslumbramiento intraocular y mejora la función de transferencia de modulación (MTF).',
    }
  },

  'blue-cut': {
    id: 'blue-cut',
    name: 'Filtro Blue Cut HEV',
    subtitle: 'Absorción Selectiva en Masa 420nm',
    iconKey: 'filter-blue-cut',
    get icon() { return getOpticalIcon('filter-blue-cut', 18); },
    color: '#2563EB',
    bgLight: '#DBEAFE',
    tag: 'Protección Digital',
    specCode: 'HEV 420 nm',
    headline: 'Atenuación del pico de emisión de paneles LED y pantallas',
    patientDescription: 'Monómero polimérico enriquecido con nano-absorbentes de luz azul de alta energía visible (380-420 nm). Reduce la fatiga acomodativa ciliar y el estrés oxidativo fotoquímico en la mácula.',
    benefits: {
      confort: 95,
      claridad: 90,
      proteccion: 95,
    },
    optical: {
      transmission: 0.96,
      flareFactor: 0.20,
      ghostReflection: 0.015,
      blueLightAbsorption: 0.80,
      tintRgba: [251, 191, 36, 0.24],
      tintIntensity: 0.55,
      polarizationCut: 0.0,
      photochromic: false,
      antiFog: false,
      contrastBoost: 1.35,
    },
    pitch: {
      dialogue: '“Si la jornada laboral supera las 4 horas frente a monitores o dispositivos digitales, este filtro atenúa el ardor ocular, cefaleas tensionales y previene la degradación retiniana acumulativa.”',
      physics: 'Incorporación de cromóforos moleculares en la masa del polímero que absorben fotones de longitud de onda entre 380 y 420 nm sin generar distorsión cromática agresiva, preservando la percepción visual circadiana.',
    }
  },

  'transitions': {
    id: 'transitions',
    name: 'Fotocromático Dinámico',
    subtitle: 'Activación Molecular UV 380-400nm',
    iconKey: 'filter-transitions',
    get icon() { return getOpticalIcon('filter-transitions', 18); },
    color: '#D97706',
    bgLight: '#FEF3C7',
    tag: 'Modulación UV',
    specCode: 'Cat. 0 ➔ Cat. 3',
    headline: 'Claridad 100% en interior, tintado solar continuo en exterior',
    patientDescription: 'Matriz de colorantes fotoactivos que reaccionan isotrópicamente a la radiación UV solar. Modula dinámicamente el factor de transmitancia luminosa de Categoría 0 (interior) a Categoría 3 (pleno sol).',
    benefits: {
      confort: 95,
      claridad: 92,
      proteccion: 100,
    },
    optical: {
      transmission: 0.98,
      flareFactor: 0.2,
      ghostReflection: 0.02,
      blueLightAbsorption: 0.35,
      tintRgba: [51, 65, 85, 0.8],
      tintIntensity: 0.0,
      polarizationCut: 0.0,
      photochromic: true,
      antiFog: false,
      contrastBoost: 1.1,
    },
    pitch: {
      dialogue: '“Solución oftálmica 2 en 1: un lente diáfano para interiores y consultorio que se convierte en un cristal de sol homologado al exponerse a la luz natural del exterior.”',
      physics: 'Isomerización conformacional reversible de moléculas de naftopiranos bajo radiación UV (365–400 nm). La apertura del enlace molecular altera la conjugación electrónica y absorbe el espectro visible en microsegundos.',
    }
  },

  'polarizado': {
    id: 'polarizado',
    name: 'Filtro Polarizado Planar',
    subtitle: 'Bloqueo Lineal Brewster de Reflejos',
    iconKey: 'filter-polarizado',
    get icon() { return getOpticalIcon('filter-polarizado', 18); },
    color: '#334155',
    bgLight: '#E2E8F0',
    tag: 'Corte de Resplandor',
    specCode: 'Eje 90° ± 2°',
    headline: 'Eliminación del resplandor enceguecedor en asfalto y agua',
    patientDescription: 'Película de polivinilo alcohol (PVA) con micro-rejillas moleculares alineadas verticalmente que extinguen la luz oscilante horizontal reflejada por superficies dieléctricas reflectantes.',
    benefits: {
      confort: 100,
      claridad: 95,
      proteccion: 100,
    },
    optical: {
      transmission: 0.40,
      flareFactor: 0.05,
      ghostReflection: 0.01,
      blueLightAbsorption: 0.45,
      tintRgba: [30, 41, 59, 0.70],
      tintIntensity: 0.65,
      polarizationCut: 0.95,
      photochromic: false,
      antiFog: false,
      contrastBoost: 1.45,
    },
    pitch: {
      dialogue: '“A diferencia de una gafa polar o tintada ordinaria, el polarizado cancela físicamente el reflejo enceguecedor sobre el pavimento y parabrisas, devolviendo seguridad y fidelidad cromática.”',
      physics: 'Filtro dicroico de absorción selectiva. Al incidir la luz solar sobre el pavimento bajo el ángulo de polarización de Brewster (θB ≈ 53°), el haz reflejado queda linealmente polarizado en el plano horizontal; la matriz vertical lo neutraliza en un 99.8%.',
    }
  }
};
