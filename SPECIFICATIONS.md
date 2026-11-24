# 👓 Technical & Commercial Specifications: Optical Filters Simulator
> **Visiometric Labs Suite — JayzirTech**  
> *Clinical Demonstration & Counter-Top Pitching Platform for Optometric Practice and Retail Sales*

🌐 **[English]** • **[Español (ESPECIFICACIONES_FILTROS.md)](./ESPECIFICACIONES_FILTROS.md)**

---

## 📌 1. Introduction & Project Purpose

This project addresses a universal challenge faced by eye care professionals, optometrists, and optical retail store owners: **patients do not buy what they cannot see and understand**.

During optometric consultations and sales encounters, an untreated clear lens is often perceived as a "simple piece of transparent plastic". The commercial and educational gap lies in justifying to the patient why a premium multicoat lens (such as **Crizal** or **Transitions**) commands a significantly higher investment than an untreated basic lens or generic anti-reflective coating.

This software is engineered as a **real-time first-person POV (Point-of-View) optical simulation platform** for tablets and in-store touchscreens, enabling patients to experience directly through their own eyes the tangible visual benefits of each ophthalmic filter before manufacturing their glasses.

---

## 🔬 2. Detailed Treatments & Lens Taxonomy

Below is the complete classification of commercial optical treatments, their underlying physical principles, counter-top sales pitch scripts, and visual simulation specifications:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          OPTICAL TREATMENTS MATRIX                          │
│                                                                             │
│   CLARITY & DURABILITY  │       DIGITAL WORLD       │    LIGHT-SENSITIVE    │
│  • Normal Lens (Control)│  • Blue Cut HEV Filter    │  • Trinity (Standard) │
│  • Standard Green AR    │  • Reflective Blue AR     │  • Transitions        │
│  • Crizal Multicoat     │  • Mass Blue Block Monomer│    Signature (High-Sp)│
│─────────────────────────┼───────────────────────────┼───────────────────────│
│     SOLAR & EXTERIOR    │   CONTRAST & ROAD SAFETY  │      THERAPEUTIC      │
│  • Polarized (Brewster) │  • DriveSafe Yellow/Amber │  • FL-41 (Migraine)   │
│  • Flash Mirror Coated  │  • Night Contrast Filters │  • 100% UV400 Shield  │
│  • Graduated Tints      │  • Anti-Fog Hydrophilic   │  • Low Vision Filters │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### A. Everyday Clarity & Optical Performance

#### 1. Normal Untreated Lens (Baseline Control)
* **Optical Physics:** Standard organic materials (CR-39 index 1.50, Polycarbonate 1.59, or High Index 1.67) exhibit natural surface reflectance of 8% to 14%, transmitting only 86% to 92% of visible light.
* **Patient Pain Points:** Internal ghost reflections, blinding nighttime headlight halos, and cosmetic front-surface glare that conceals the wearer's eyes in person and in photos.
* **Role in Simulator:** Baseline control for immediate split-screen and peripheral contrast against treated lenses.

#### 2. Standard Green Anti-Reflective (Market Baseline AR)
* **Optical Physics:** Nanometric destructive interference layers tuned to the ~550 nm photopic sensitivity peak. Residual reflex is a soft emerald green. Visible transmission increased to **98.5% – 99%**.
* **Sales Dialogue:**
  * *"Eliminates annoying glare from light bulbs, street lamps, and night driving reflections."*
  * *"Significantly improves facial aesthetics: people see your eyes clearly instead of a white flash."*
* **Simulator Rendering:** Suppresses starburst flares around nighttime street lamps and headlights.

#### 3. Crizal Multicoat (Premium 5-in-1 Suite)
* **Concept:** Represents the gold standard in premium laboratory multicoats (benchmark: Essilor Crizal). It provides five distinct nanotechnological shields:
  1. **Ultimate Anti-Glare:** 99.5% luminous transmission with an imperceptible residual reflection.
  2. **Reinforced Scratch Resistance (Hard Coat):** Superior defense against everyday cleaning abrasions.
  3. **Super-Hydrophobic Shield:** High contact-angle surface tension causing water droplets to bead and roll off without leaving streaks (lotus effect).
  4. **Oleophobic Barrier:** Repels skin oils, makeup, and fingerprints, easily cleaned in a single swipe.
  5. **Anti-Static Layer:** Neutralizes static charges during micro-fiber wiping to repel dust particles.
  6. **Back-Surface UV (E-SPF):** Absorbs harmful UV rays bouncing from the back curve into the eye.
* **Sales Dialogue:** *"A long-term investment in durability and effortless maintenance: your lenses stay clear, clean in seconds, resist scratches, and shed water instantly."*
* **Simulator Rendering:** Positioned consistently at the far right of all scenes. Provides maximum contrast, razor-sharp typographic legibility, and deep velvety night blacks without fog or glare.

---

### B. Digital Protection & Screen Comfort

#### 4. Blue Cut Filter (HEV Blue Light Absorption)
* **Optical Physics:** Selectively filters **High-Energy Visible (HEV) Blue Light** in the **380 nm to 455 nm** band while preserving beneficial blue-turquoise light (465–495 nm) that governs circadian sleep cycles.
* **Sales Dialogue:**
  * *"Essential for professionals spending over 4 hours daily in front of monitors, smartphones, and cold office LED lighting."*
  * *"Drastically reduces digital eye strain, ocular dryness, burning sensation, and evening fatigue headaches."*
* **Simulator Rendering:** Calibrated warm white (~5000K) ivory tone that calms harsh LED backlighting while keeping spreadsheet cells, gridlines, and typography 100% crisp without chromatic distortion.

---

### C. Light-Sensitive & Photochromic Technology

#### 5. Photochromic Kinetics: Trinity vs. Transitions Signature
* **Optical Physics:** Organic photochromic molecules (naphthopyrans, spirooxazines) embedded within the matrix undergo three-dimensional conformational rotation upon exposure to ultraviolet (UV) radiation, absorbing visible light and darkening.
* **Dynamic Comparison in Simulator:**
  * **Fotocromático Trinity (ServiÓptica):** Traditional mass-monomer photochromic technology. Activates at standard speed, reaching a comfortable **Category 2 ceiling (up to 65% absorption)** in balanced neutral gray `rgba(45, 55, 72)`.
  * **Transitions Signature (EssilorLuxottica):** World-class fast-acting rotational dyes. Reaches **Category 3 sunglasses depth (88% absorption)** in graphite gray `rgba(38, 48, 62)` within ~3.6s, responding aggressively in the first 1.5 seconds.
  * **Interactive HUD Controls:**
    - Live absorption meter (%) and optical category badge (`Cat. 0` to `Cat. 3`).
    - Kinetic progress bar with customized gradient.
    - **Reactivar Sol (Retrigger Solar Activation)** button allowing the optometrist to reset the lens to 100% clear and replay the darkening demonstration repeatedly before the patient.
    - Manual scrubber bar for intermediate density demonstration.

---

### D. Outdoor, Driving & Polarized Optics

#### 6. Polarized Filter (Brewster Angle Cancellation)
* **Optical Physics:** Microscopic vertically oriented polyvinyl alcohol (PVA) molecular filter that blocks horizontally polarized light reflected off flat surfaces (wet asphalt, water, snow, sand).
* **Key Demonstration vs. Tinted Sunglasses:** Dark sunglasses merely dim all incoming light, leaving blinding reflections intact. The polarized filter **cancels the horizontal blinding glare completely**, restoring true color saturation and depth visibility beneath water surfaces.
* **Simulator Rendering:** Eradicates over 95% of the white specular lake reflection and highway pavement shimmer, enhancing pine greens and lake turquoise tones.

#### 7. DriveSafe Yellow / Amber Tint
* **Optical Physics:** Selectively cuts scattered short-wavelength blue light responsible for intraocular chromatic aberration and glare spread during rain, fog, and night driving.
* **Simulator Rendering:** Calibrated 45% amber blend over a Crizal high-definition foundation, accentuating road lane stripes and asphalt relief without excessive saturation.

---

## 🎨 3. System Architecture & Rendering Engine

```
Proyecto Filtros Opticos/
├── index.html                   # Clinical HUD shell & POV simulation container
├── package.json                 # Project dependencies & Vite bundler scripts
├── vite.config.js               # Build configuration with base: '/filters-simulator/'
├── README.md                    # English documentation (Default GitHub view)
├── README.es.md                 # Spanish documentation
├── SPECIFICATIONS.md            # Comprehensive English specifications
├── ESPECIFICACIONES_FILTROS.md  # Comprehensive Spanish specifications
│
├── .github/
│   └── workflows/
│       └── deploy.yml           # Multi-branch CI/CD deployment pipeline
│
├── branding/                    # High-resolution logos, avatars & social preview banners
│   ├── github-social-preview-3d.jpg
│   ├── github-social-preview.png
│   ├── visiometric-avatar-512.png
│   └── visiometric-avatar.svg
│
├── public/scenes/               # 2K Master Optical Photographic Plates (2752x1536)
│   ├── night-blanco.jpg         # Night: Untreated halo expansion and headlight flare
│   ├── night-ar-verde.jpg       # Night: Contained headlight glare with standard AR
│   ├── night-crizal.jpg         # Night: 99.5% transmission, deep blacks, zero reflections
│   ├── night-amarillo.jpg       # Night: DriveSafe amber high contrast for rain/dark
│   ├── office-blanco.jpg        # Office: Unfiltered cold LED monitor overexposure (~8500K)
│   ├── office-blue-cut.jpg      # Office: Soothing warm ivory anti-fatigue screen comfort
│   └── sun-real.jpg             # Sunny: Open coastal highway with water reflections
│
└── src/
    ├── main.js                  # Life-cycle coordinator & component mounting
    ├── core/
    │   ├── camera.js            # 360 subpixel camera kinematics with inertial damping
    │   ├── event-bus.js         # Decoupled reactive event broker
    │   ├── filters-data.js      # Commercial catalog, counter pitch scripts & optical physics
    │   └── asset-helper.js      # Universal asset path resolver for local Vite and GitHub Pages
    ├── scenes/
    │   ├── scene-renderer.js    # Master 60 FPS loop with dual-pass rendering
    │   ├── night-drive-scene.js # Mercedes-Benz S-Class night driving cabin
    │   ├── digital-office-scene.js # Corporate office with curved Dell ultrawide monitor
    │   └── outdoor-sun-scene.js # Coastal highway with real-time Transitions vs Trinity kinetics
    └── components/
        ├── glasses-hud.js       # Beveled titanium eyewear frame with SVG clipping
        ├── joystick.js          # Virtual touch joystick for 360 head-turn navigation
        ├── lens-selector.js     # Responsive lens treatment carousel
        ├── scene-selector.js    # Header clinical scenario switch
        ├── experience-card.js   # On-demand patient benefit card with metric progress bars
        └── uv-slider.js         # Real-time photochromic kinetics HUD controller
```

---

## 🔮 4. Upcoming Roadmap Milestone

### Dedicated Transitions Module (Dual 1st Person POV + 3rd Person Mirror View)
* **Goal:** Completely eliminate the two major buying objections for photochromic lenses:
  1. *How do I see through them?* (Visual comfort, glare adaptation).
  2. *How do I look to others with them on?* (Aesthetics, frame style, clear indoors vs. dark outdoors).
* **Planned Features:**
  * Interactive toggle between **POV Mode (1st person)** and **Mirror Mode (wearer's face with fashionable frames)**.
  * Full color palette: Classic portfolio (Neutral Gray, Contrast Brown, Graphite Green) and *Style Mirrors* (Silver, Blue, Bronze).

---

© 2026 Visiometric Labs — JayzirTech. All rights reserved.
