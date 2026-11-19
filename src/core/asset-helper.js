/**
 * Utilidad universal para resolución de assets tanto en Vite (build/dev)
 * como en GitHub Pages sirviendo estáticos directamente desde rama.
 */
export function getAssetUrl(path) {
  if (!path) return '';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  // 1. Si Vite inyectó BASE_URL
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.BASE_URL) {
      const base = import.meta.env.BASE_URL.replace(/\/$/, '');
      return `${base}/${cleanPath}`;
    }
  } catch (e) {
    // Entorno sin import.meta
  }

  // 2. Si corre directamente en GitHub Pages en subdirectorio /filters-simulator
  if (typeof window !== 'undefined' && window.location && window.location.pathname.includes('/filters-simulator')) {
    return `/filters-simulator/${cleanPath}`;
  }

  // 3. Fallback relativo local
  return `./${cleanPath}`;
}
