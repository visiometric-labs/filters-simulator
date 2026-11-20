# Plan — Rediseño Integral de Identidad Óptica ("Laboratorio Oftálmico Moderno")

## Objective
Transform the optical filter POV simulator interface from generic "AI-slop" (excessive emojis, purple gradients, generic SaaS cards, glowing pills, cartoonish joystick) into an authentic, high-precision **Modern Ophthalmic Laboratory** platform (ZEISS / Essilor clinical metrology standard).

## Execution Waves

### Wave 1: Optical Iconography & Data Architecture
- [ ] Create `src/core/optical-icons.js` containing precise, scalable SVG iconography for all optical filters, scenarios, HUD reticles, and clinical documents (eliminating 100% of emojis).
- [ ] Update `src/core/filters-data.js` to reference the new SVG icon system and enrich technical physics / clinical descriptions with authentic laboratory metrics.

### Wave 2: Modern Ophthalmic Design System & Tokens
- [ ] Refactor `src/styles/theme.css` to implement the Laboratory token architecture (`:root` tokens for surfaces, borders, typography, optical laser accents).
- [ ] Enforce Hallmark Floor rules: remove `transition: all`, replace with targeted property transitions (`transform`, `opacity`, `border-color`, `background-color`).
- [ ] Redesign `src/styles/landing.css`:
  - Replace generic gradient title and emoji badges with clinical metrology headline, technical standard indicators (`ISO 8980-4 • METROLOGÍA POV`), and precision action buttons.
  - Transform scenario cards into spectrophotometric test chambers with crisp SVG icons and laboratory micro-tags.
  - Fix footer to look like an authentic laboratory terminal.

### Wave 3: Simulator HUD & Clinical Component Modernization
- [ ] Modernize `src/styles/layout.css`:
  - Clinical Header: clean frosted instrumentation bar with technical breadcrumbs, SVG scene switches, and clinical action buttons.
  - Look-hint overlay: replace `🕹️` emoji pill with optometric reticle indicator.
  - Watermark & toggle glasses: clinical comparison pill (`VERIFICACIÓN: CON FILTRO / SIN FILTRO`).
- [ ] Modernize `src/styles/components.css`:
  - **Joystick Virtual:** transform from plastic gradient knob to a CNC-machined optical collimator dial with laser reticle, radial calibration ticks, and micro-machined knurled knob.
  - **Lens Selector:** nanocoating optical cassettes with crisp SVG layer icons, wavelength chips (`550 nm`, `420 nm HEV`, `99.5%`), and active state tactile feedback.
  - **Patient Experience Card:** "Ficha Metrológica y Fisiológica" with precision horizontal gauges, laboratory metrics, and consultation trigger.
  - **UV Solar Slider:** precision laser-etched spectrophotometric scale (380-400 nm).
  - **Pitch Modal:** "Protocolo Clínico de Prescripción" with dual clinical guidance and thin-film interference physics.

### Wave 4: Component Logic & Markup Integration
- [ ] Update `index.html` markup to remove all emojis and integrate SVG icons and clinical typography.
- [ ] Update JS components (`scene-selector.js`, `lens-selector.js`, `experience-card.js`, `pitch-modal.js`, `uv-slider.js`, `glasses-hud.js`, `main.js`) to use SVG icons and new DOM structures.

### Wave 5: Quality Audit, Sloplint & User Verification
- [ ] Run Hallmark `sloplint.mjs` against CSS and HTML to confirm elimination of AI slop defects.
- [ ] Run Vite dev build / preview to verify zero JS errors or styling regressions.
- [ ] Launch Vite server and open the frontend using the browser tool for inspection.
