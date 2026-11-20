# Research & Visual Audit — Modern Ophthalmic Laboratory

## 1. Executive Summary
- **Current State:** The application is functionally powerful (2K optical ray/glare simulation, POV HUD frame, realistic 360 panorama), but visually suffers from classic "AI slop" heuristics:
  1. Excessive emojis used as iconography (`👓`, `🚗`, `💻`, `☀️`, `💡`, `🕹️`, `⚪`, `🟢`, `💎`, `🔬`, `📋`, `🗣️`).
  2. Generic purple-to-blue-to-green gradient text (`gradient-text`).
  3. Stereotypical glowing green status dots and pill badges (`landing-badge-pill`, `landing-badge-dot`).
  4. SaaS template cards with `transition: all`, identical rounded corners, and amateur box shadows.
  5. Toy-like plastic joystick and generic progress bars.
  6. Emojis embedded in copy and call-to-actions (`Probar Noche →`, `💡 ${headline}`).
- **Target Identity:** **Laboratorio Oftálmico Moderno** (ZEISS / Essilor / Alcon medical metrology aesthetic).
  - Clean, clinical, surgical precision combined with high-tech optical engineering.
  - Custom geometric SVG iconography representing refraction prisms, laser interferometry, anti-reflective thin-film vacuum coatings, spectral curves, and reticles.
  - Technical typography: Clean monospace tabular values for metrology figures (nm, transmittance %, diopters), clean sans-serif (Plus Jakarta Sans) with disciplined weight hierarchy.
  - Refined clinical dark / frosted laboratory glass styling with titanium and clean sapphire/emerald/cobalt wavelength accents.
  - No emojis anywhere in the interface. Strict compliance with Hallmark Floor rules (no `transition: all`, no generic gradients, tokens at `:root`, focus rings, responsive viewport).

## 2. Component Slop Inventory & Redesign Matrix

| Component | Current AI-Slop Trait | Redesign: Laboratorio Oftálmico Moderno |
|---|---|---|
| **Cover Header & Logo** | `👓` emoji in gradient box, generic subtitle | Vectorial Diopter Reticle / Optical Beam Prism mark with hairline laboratory badge (`METROLOGÍA ÓPTICA • ISO 8980-4`). |
| **Pill Badges & Tags** | `landing-badge-pill` with pulsing green dot & emoji chip (`🔬 Demostración en Primera Persona`) | Precision technical chips with monochromatic borders, hairline crosshairs, and uppercase optical standard identifiers. |
| **Hero Title & Copy** | `gradient-text` (purple-to-green), marketing hype copy | Monochromatic high-contrast titanium display type with crisp optical subtitle. Clean clinical phrasing. |
| **Enter Experience CTA** | Bulky gradient pill with `👓` emoji, heavy glow | High-precision laboratory trigger button with custom SVG light-beam icon and micro-etched border. |
| **Scenario Cards** | Emojis (`🚗`, `💻`, `☀️`), cheap bottom tag chips, arrow glued to text | Technical scenario chambers: calibrated spectrophotometric cards with SVG optical wave icons, laboratory spec tags, and clean tactile affordances. |
| **Main Clinical Header** | Soft blue header with emojis, baby-blue badge | Clean laboratory instrumentation header in frosted quartz / slate with technical breadcrumb and scenario switchgear. |
| **HUD Viewport Hint** | Floating pill with `🕹️` emoji | Precision reticle overlay with subtle optical calibration compass. |
| **Toggle Glasses Button** | Rounded pill with glowing dot | Clinical comparison toggle: "FILTRO ACTIVO / REFERENCIA PURA" with crisp split-screen indicator. |
| **Virtual Joystick** | Plastic gradient knob with soft shadow | Precision optical collimator dial: calibrated radial tick marks, micro-machined knurled knob, laser crosshair. |
| **Lens Selector** | Cards with emoji circles (`⚪`, `🟢`, `💎`) | Nanocoating optical cassettes: custom SVG thin-film layer icons, spectral wavelength marks (e.g., `550 nm`, `420 nm HEV`, `λ-Polarized`), surgical laboratory active state. |
| **Patient Experience Card** | Emoji `💡`, amateur colored progress bars | "Ficha Técnica y Respuesta Fisiológica": clean bar gauges with metrology ticks (0% - 100%), technical clinical data, no emojis. |
| **Pitch Modal** | `📋`, `🗣️`, `🔬` emojis with generic cards | "Protocolo Clínico de Prescripción y Argumentación": split clinical consultation card with physics formula and patient communication guidance. |
| **UV Solar Slider** | `☀️` emoji with standard default HTML slider | "Control Espectral UV-A / UV-B (380–400 nm)": precision laser-etched graduated slider. |

## 3. Applicable Standards & References
- **Hallmark v2.0.0**: Floor rules strictly applied. `sloplint.mjs` verification.
- **Frontend Design Skill**: Grounded in ophthalmic laboratory subject matter, restraint, intentional typography, and high aesthetic craft.
