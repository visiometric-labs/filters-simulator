# 👓 Filtros Ópticos — Simulador y Comparador Clínico Interactivo
> **Suite Visiometric Labs — JayzirTech**  
> *Plataforma en Primera Persona (POV) de Demostración Oftálmica y Argumentación en Mostrador*

[![GitHub Pages](https://img.shields.io/badge/Demo-GitHub%20Pages-success?logo=github)](https://visiometric-labs.github.io/filters-simulator/)
[![Vite](https://img.shields.io/badge/Bundler-Vite%206-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![JavaScript](https://img.shields.io/badge/Language-Vanilla%20JS%20(ES6+)-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-Proprietary-blue.svg)]()

---

## 🌐 Demo Pública en Vivo
Accede al simulador interactivo desplegado en producción:  
👉 **[https://visiometric-labs.github.io/filters-simulator/](https://visiometric-labs.github.io/filters-simulator/)**

---

## 📌 ¿Qué es este Simulador?
Una herramienta digital de consultorio y mostrador óptico diseñada para resolver la mayor objeción comercial en la venta de lentes: **el paciente no compra lo que no puede experimentar**.

Permite que el paciente experimente **en primera persona (POV)**, dentro de una montura oftálmica panorámica de alta definición, el efecto óptico real de los diferentes tratamientos comerciales del mercado:
- **Lente Normal (Sin tratamiento / Control):** Demuestra los reflejos parásitos de superficie, deslumbramiento descontrolado en noche y fatiga fotópica por luz LED fría en pantallas.
- **Antirreflejo Verde (Estándar de mercado):** Supresión de halos nocturnos y neutralización de reflejos de lámparas y ventanas.
- **Crizal Multicapa (Gama Premium 5 en 1):** Claridad quirúrgica con 99.5% de transmisión, negros profundos sin velo lumínico y corte nítido de faros.
- **Filtro Amarillo (DriveSafe Nocturno & Lluvia):** Realce dramático del contraste del pavimento y absorción de luz azul molesta de faros xenón/LED.
- **Filtro Blue Cut (Protección Pantallas LED):** Transformación del blanco LED frío y agresivo (~8500K) a un confort cálido descansado tipo papel (~4500K) sin perder nitidez tipográfica en hojas de cálculo y documentos.
- **Fotocromático Transitions:** Oscurecimiento dinámico continuo controlado por slider de radiación solar/UV.
- **Filtro Polarizado:** Cancelación total del resplandor enceguecedor horizontal en asfalto mojado y agua.

---

## 🚗 Escenarios Clínicos Calibrados (Fotografía Multicapa 2K Master HD)

### 1. 🚗 Conducción Nocturna (Avenida en Mercedes-Benz Clase S)
- **Perspectiva:** Cabina de lujo en primera persona con cuadro de instrumentos digital activo, volante multifunción, iluminación ambiental LED y tráfico real.
- **Placas Ópticas 2K:** Calibradas píxel a píxel (`night-blanco`, `night-ar-verde`, `night-crizal`, `night-amarillo`) con faros LED de tráfico que reaccionan inmediatamente al tratamiento seleccionado.

### 2. 💻 Oficina y Pantallas (Entorno Corporativo Ultrawide Dell)
- **Perspectiva:** Escritorio ergonómico de madera con teclado mecánico y monitor ultrawide curvo Dell con hojas de cálculo financieras ("Q3 Sales Performance") y documentos de texto.
- **Física Anti-Astenopía:**
  - **Lente Normal / Sin Gafas:** Emula la fatiga visual real por sobreexposición LED fría (~8500K) y halo de saturación fotópica, manteniendo el texto 100% nítido (cero aberraciones de aumento o dioptrías).
  - **Filtro Blue Cut:** Alivio visual inmediato, aumentando el contraste de los caracteres oscuros sobre un fondo relajante.

### 3. ☀️ Día Soleado y Exteriores (Carretera Panorámica Costera 2K)
- **Perspectiva:** Carretera abierta frente al mar bajo radiación solar intensa con destellos orgánicos multicapa sobre asfalto y oleaje.
- **Filtro Polarizado:** Cancelación de más del 95% del resplandor especular horizontal, realce del contraste de las marcas viales y saturación profunda de aguas turquesas.
- **Fotocromático Transitions:** Oscurecimiento sigmoidal continuo (de transparente Cat. 0 a gris grafito Cat. 3) regulado mediante el slider interactivo de radiación solar / UV, reteniendo los reflejos especulares del agua para evidenciar la diferencia clínica frente al Polarizado.

---

## 🎨 Experiencia de Usuario y Diseño Cyber-Clínico

- **Portada de Bienvenida (Welcome Landing):** Acceso introductorio al simulador con selector directo de escenarios y botón de inicio.
- **Transición Cinemática Diagonal (700ms):** Cierre orgánico de persianas oscuras desde las esquinas exteriores hacia el centro y apertura desde el centro hacia afuera, revelando los filtros sin líneas brillantes ni destellos artificiales.
- **Tema Unificado Dark Glass (Glassmorphism):** Barra superior (*headbar*) y selector de filtros armonizados con el tema de la portada (`#070B14`, cristales translúcidos `rgba(11, 17, 32, 0.88)` con `backdrop-filter: blur(16px)` y acentos luminiscentes de alto contraste: verde esmeralda para AR Verde, azul rey `#2563EB` para Crizal, morado vibrante `#8B5CF6` para Polarizado y ámbar para Conducción/Transitions).
- **Controles Táctiles y Joystick Virtual:** Pomo ergonómico para girar la cabeza 360°, botón de conmutación rápida *"Ver con Gafas / Ver sin Gafas"* y tarjeta flotante explicativa de beneficios del paciente con barras métricas visualmente diferenciadas por tratamiento.
- **Optimización de Pantalla Completa para Tablets:** Configuración `viewport-fit=cover`, meta `theme-color: #070B14` y llamada nativa con `{ navigationUI: 'hide' }` para eliminar franjas blancas en iPad y tablets Android.

---

## 🛠️ Arquitectura y Tecnologías
- **Motor Gráfico:** Canvas 2D + SVG binocular HUD con doble pase de renderizado (visión periférica fuera de gafas vs. visión a través de las lentes).
- **Cinemática:** Giro de cabeza continuo a 60-144 FPS con interpolación subpíxel suave, controlado por arrastre de pantalla y joystick virtual.
- **HUD Panorámico:** Marco de titanio vectorial ultra-nítido con biseles reflectivos sin desenfoque artificial.
- **Resolución Universal de Recursos:** Helper `asset-helper.js` compatible con Vite local, compilación de producción y despliegue estático en GitHub Pages (`/filters-simulator/`).
- **Arquitectura de Eventos:** Bus de eventos desacoplado (`event-bus.js`) para sincronizar selector de lentes, tarjeta de beneficios, slider UV y cámara.
- **Pre-calentamiento de Caché Óptica:** Precarga paralela de placas maestras 2K (`night-blanco`, `night-crizal`, `night-ar-verde`, `sun-real`, `office-blue-cut`) para conmutaciones instantáneas sin pantalla blanca ni parpadeos.

---

## 🚀 Despliegue y Ejecución Local

### Requisitos
- Node.js 18+ (o Docker)

### En Desarrollo
```bash
npm install
npm run dev
# Accede a http://localhost:5173/ (o el puerto indicado)
```

### Compilación para Producción
```bash
npm run build
# Genera los archivos optimizados en dist/
```

### Con Docker
```bash
docker compose up -d
# Servido con Nginx en http://localhost:8080/
```

---

## 📂 Especificación Completa
Para una revisión exhaustiva de la taxonomía clínica de los filtros, argumentos de venta para el mostrador, física óptica y estructura detallada de código, consulta:
👉 [**`ESPECIFICACIONES_FILTROS.md`**](./ESPECIFICACIONES_FILTROS.md)

---

© 2026 Visiometric Labs — JayzirTech. Todos los derechos reservados.
