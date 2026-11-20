---
phase: "1"
slug: "laboratorio-oftalmico-moderno"
status: approved
created: "2026-11-20"
---

# UI Design Contract — Laboratorio Oftálmico Moderno

## 1. Visual Identity & Brand Truth
- **Concept:** High-precision ophthalmic laboratory & optical metrology platform.
- **Inspiration:** Carl Zeiss Vision Meditec, Essilor R&D, ophthalmic slit lamps, laser interferometry consoles.
- **Design Core:**
  - Zero emojis across all views, controls, modals, and labels.
  - Bespoke inline SVG iconography for every optical entity (prisms, wave filters, photon scattering, AR multi-layer stacks, polarization grids, photochromic molecular lattices).
  - High-precision typography with distinct hierarchy: Plus Jakarta Sans for titles/body, clean tabular numerals for metrics and percentages.
  - Palette inspired by optical physics:
    - Base: Lab Deep Slate (`#0B0F17`, `#111827`, `#1F2937`) and Pure Optical Frosted White (`#FFFFFF`, `#F8FAFC`).
    - Laser & Coating Accents:
      - Crizal Sapphire Blue: `#2563EB` (450nm)
      - Antireflective Emerald: `#059669` (550nm fotópico)
      - Blue Cut Cobalt/Violet: `#4338CA` (420nm HEV)
      - DriveSafe Amber: `#D97706` (589nm)
      - Transitions Solar Gold: `#F59E0B` (380-400nm UV)
      - Polarized Carbon: `#334155`

## 2. Token Architecture (`:root`)
All visual styling strictly governed by semantic tokens:
```css
:root {
  /* Laboratory Surface Tokens */
  --lab-bg-canvas: #090D14;
  --lab-bg-panel: rgba(15, 23, 42, 0.88);
  --lab-bg-panel-border: rgba(255, 255, 255, 0.08);
  --lab-bg-glass: rgba(255, 255, 255, 0.04);
  --lab-bg-glass-active: rgba(255, 255, 255, 0.12);

  /* Light Interface Surfaces (Simulator HUD & Controls) */
  --lab-light-bg: #FFFFFF;
  --lab-light-surface: #F8FAFC;
  --lab-light-surface-subtle: #F1F5F9;
  --lab-light-border: #E2E8F0;
  --lab-light-border-active: #0284C7;

  /* Optical Laser / Coating Accents */
  --optical-ar-emerald: #059669;
  --optical-ar-emerald-bg: #ECFDF5;
  --optical-crizal-indigo: #4F46E5;
  --optical-crizal-indigo-bg: #EEF2FF;
  --optical-bluecut: #2563EB;
  --optical-bluecut-bg: #EFF6FF;
  --optical-amber: #D97706;
  --optical-amber-bg: #FFFBEB;
  --optical-neutral: #64748B;
  --optical-neutral-bg: #F8FAFC;

  /* Typography */
  --font-sans: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;

  /* Precision Radii */
  --radius-xs: 4px;
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 14px;
  --radius-pill: 9999px;

  /* Motion: explicit properties, never transition: all */
  --motion-fast: 160ms cubic-bezier(0.16, 1, 0.3, 1);
  --motion-normal: 240ms cubic-bezier(0.16, 1, 0.3, 1);
}
```

## 3. SVG Iconography Specifications
Instead of emojis, create a dedicated SVG icon generator/helper in `src/core/optical-icons.js`:
1. `lens-base` (Geometric double-convex lens profile)
2. `lens-ar-green` (Multi-wave destructive interference beam at 550nm)
3. `lens-crizal` (Nanometric 5-layer shield with anti-static and hydrophobic droplets)
4. `lens-blue-cut` (HEV 420nm ray reflected, safe spectrum transmitted)
5. `lens-amber` (Contrast enhancement wave / DriveSafe night spectrum)
6. `lens-transitions` (Dynamic photochromic molecular UV matrix)
7. `lens-polarized` (Vertical microscopic polarizing grid eliminating horizontal glare)
8. `scene-night` (Automotive headlight ray cone with collimation lines)
9. `scene-office` (LED monitor raster with spectral radiation lines)
10. `scene-sun` (Atmospheric solar UV angle with horizon)
11. `reticle-target` (Precision 360 optometric crosshair for joystick and viewport)
12. `spec-document` (Technical metrology sheet)
13. `physics-atom` (Thin-film vacuum physics)

## 4. Anti-Slop Enforcement
- No `transition: all` in any CSS rule.
- No `gradient-text`. Headlines use crisp, solid titanium or pure white text with optical subtitles.
- No glowing green dots. Status indicators use clean technical badges with monospace micro-tags (e.g. `[POV 2K]`, `[ISO 8980-4]`).
- Buttons use solid contrast with defined borders and hover states, without cartoonish drop-shadows.
