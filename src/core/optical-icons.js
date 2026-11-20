/**
 * Sistema de Iconografía Vectorial Oftálmica de Precisión
 * Diseñado específicamente para estética de Laboratorio Clínico y Metrología Óptica.
 * Reemplaza por completo emojis y pictogramas genéricos por vectores geométricos exactos.
 */

export const OPTICAL_ICONS = {
  // Logotipo: Retícula dióptrica con haz láser refractado
  logo: (size = 24, className = '') => `
    <svg class="${className}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke-opacity="0.35"/>
      <circle cx="12" cy="12" r="4.5" stroke-opacity="0.8"/>
      <line x1="12" y1="2" x2="12" y2="7"/>
      <line x1="12" y1="17" x2="12" y2="22"/>
      <line x1="2" y1="12" x2="7" y2="12"/>
      <line x1="17" y1="12" x2="22" y2="12"/>
      <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
    </svg>
  `,

  // Gafas / Montura oftálmica HUD
  glasses: (size = 20, className = '') => `
    <svg class="${className}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="6.5" cy="12" r="4"/>
      <circle cx="17.5" cy="12" r="4"/>
      <path d="M10.5 12h3"/>
      <path d="M2.5 12h-0.5"/>
      <path d="M22 12h-0.5"/>
      <path d="M6 10a2.5 2.5 0 0 1 2.5-1.5"/>
      <path d="M17 10a2.5 2.5 0 0 1 2.5-1.5"/>
    </svg>
  `,

  // Lente Blanco: Lente base con reflejo de superficie Fresnel
  'filter-blanco': (size = 20, className = '') => `
    <svg class="${className}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <ellipse cx="12" cy="12" rx="9" ry="8" stroke-opacity="0.4"/>
      <path d="M7 8c2.5-2 7.5-2 10 0" stroke-opacity="0.7"/>
      <path d="M9 16c1.5 1 4.5 1 6 0" stroke-opacity="0.3"/>
      <circle cx="12" cy="12" r="1" fill="currentColor" opacity="0.5"/>
    </svg>
  `,

  // AR Verde: Interferencia destructiva a 550nm
  'filter-ar-verde': (size = 20, className = '') => `
    <svg class="${className}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <ellipse cx="12" cy="12" rx="9" ry="8"/>
      <path d="M6 12c1.5-2 3.5-2 5 0s3.5 2 5 0" stroke="currentColor"/>
      <path d="M8 8.5c1-1 2.5-1 3.5 0s2.5 1 3.5 0" stroke-opacity="0.5"/>
      <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
    </svg>
  `,

  // Crizal Multicapa: Pila nanotecnológica de 5 capas y máxima pureza
  'filter-crizal': (size = 20, className = '') => `
    <svg class="${className}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M12 2l7 4v6c0 5-3.5 9.5-7 11-3.5-1.5-7-6-7-11V6l7-4z"/>
      <path d="M9 12l2 2 4-4" stroke-width="2"/>
    </svg>
  `,

  // Amarillo DriveSafe: Filtro de contraste nocturno y longitud de onda
  'filter-amarillo': (size = 20, className = '') => `
    <svg class="${className}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9"/>
      <path d="M12 3v18"/>
      <path d="M3 12h18"/>
      <circle cx="12" cy="12" r="5" stroke-dasharray="2 2"/>
    </svg>
  `,

  // Blue Cut: Reflexión de luz azul violeta dañina (420nm)
  'filter-blue-cut': (size = 20, className = '') => `
    <svg class="${className}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <ellipse cx="12" cy="12" rx="9" ry="8"/>
      <path d="M4 8l5 4-5 4" stroke-opacity="0.8"/>
      <line x1="9" y1="12" x2="20" y2="12" stroke-dasharray="2 2"/>
    </svg>
  `,

  // Transitions: Matriz molecular fotoactiva UV
  'filter-transitions': (size = 20, className = '') => `
    <svg class="${className}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9"/>
      <path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" fill-opacity="0.25"/>
      <circle cx="12" cy="12" r="4" stroke="currentColor"/>
    </svg>
  `,

  // Polarizado: Rejilla microscópica vertical anti-reflejo planar
  'filter-polarizado': (size = 20, className = '') => `
    <svg class="${className}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9"/>
      <line x1="8" y1="6" x2="8" y2="18"/>
      <line x1="12" y1="5" x2="12" y2="19"/>
      <line x1="16" y1="6" x2="16" y2="18"/>
    </svg>
  `,

  // Escenario 1: Conducción Nocturna (Haz de luz automotriz colimado)
  'scene-night': (size = 20, className = '') => `
    <svg class="${className}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M4 14l6-6h8l2 6"/>
      <circle cx="7.5" cy="17.5" r="2"/>
      <circle cx="16.5" cy="17.5" r="2"/>
      <path d="M19 14l3 1"/>
      <path d="M19 11l4-1"/>
      <path d="M19 17l4 3"/>
    </svg>
  `,

  // Escenario 2: Oficina y Pantallas (Matriz de emisión LED)
  'scene-office': (size = 20, className = '') => `
    <svg class="${className}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="13" rx="2"/>
      <path d="M8 21h8"/>
      <path d="M12 17v4"/>
      <line x1="7" y1="8" x2="17" y2="8" stroke-opacity="0.4"/>
      <line x1="7" y1="11" x2="13" y2="11" stroke-opacity="0.4"/>
    </svg>
  `,

  // Escenario 3: Día Soleado y Ruta (Radiación UV solar angular)
  'scene-sun': (size = 20, className = '') => `
    <svg class="${className}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  `,

  // Retícula / Colimador (Joystick y Navegación POV)
  'reticle-compass': (size = 20, className = '') => `
    <svg class="${className}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="2" x2="12" y2="6"/>
      <line x1="12" y1="18" x2="12" y2="22"/>
      <line x1="2" y1="12" x2="6" y2="12"/>
      <line x1="18" y1="12" x2="22" y2="12"/>
      <circle cx="12" cy="12" r="3"/>
      <circle cx="12" cy="12" r="0.8" fill="currentColor"/>
    </svg>
  `,

  // Ficha de Beneficios Clínicos
  'clinical-info': (size = 18, className = '') => `
    <svg class="${className}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <line x1="10" y1="9" x2="8" y2="9"/>
    </svg>
  `,

  // Argumentario Clínico / Protocolo
  'protocol-doc': (size = 18, className = '') => `
    <svg class="${className}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
      <path d="M9 12l2 2 4-4"/>
    </svg>
  `,

  // Física / Óptica
  'physics-wave': (size = 18, className = '') => `
    <svg class="${className}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
      <path d="M4.93 19.07a10 10 0 0 1 0-14.14"/>
      <path d="M16.24 7.76a6 6 0 0 1 0 8.48"/>
      <path d="M7.76 16.24a6 6 0 0 1 0-8.48"/>
    </svg>
  `,

  // Flecha técnica hacia adelante
  'arrow-forward': (size = 14, className = '') => `
    <svg class="${className}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  `,

  // Cerrar / Cancelar
  close: (size = 16, className = '') => `
    <svg class="${className}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  `,

  // Control deslizante UV
  'slider-sun': (size = 16, className = '') => `
    <svg class="${className}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4"/>
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
    </svg>
  `
};

export function getOpticalIcon(name, size = 20, className = '') {
  const iconFn = OPTICAL_ICONS[name];
  if (typeof iconFn === 'function') {
    return iconFn(size, className);
  }
  return OPTICAL_ICONS.logo(size, className);
}
