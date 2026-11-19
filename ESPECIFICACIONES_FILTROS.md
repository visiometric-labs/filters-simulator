# 👓 Documentación Técnica y Comercial: Simulador de Filtros Ópticos
> **Suite Visiometric Labs — JayzirTech**  
> *Módulo de Demostración Clínica y Comercial para la Consulta Optométrica y Venta en Mostrador*

---

## 📌 1. Introducción y Propósito del Proyecto

Este proyecto nace de la necesidad real manifestada por profesionales de la salud visual y dueños de ópticas: **el paciente no compra lo que no puede ver ni entender**. 

En la consulta optométrica y en el mostrador de ventas, la lente transparente suele percibirse como un "simple pedazo de plástico". La gran brecha comercial y pedagógica radica en justificar por qué una lente con tratamiento multicapa de gama alta (como **Crizal** o **Transitions**) cuesta significativamente más que una lente básica sin tratamiento o un antirreflejo convencional.

Este software está diseñado como una **herramienta interactiva de simulación en tiempo real (Canvas 2D / WebGL / CSS)** para tablets y pantallas táctiles de consultorio, permitiendo al paciente experimentar en primera persona los beneficios tangibles de cada filtro antes de mandar a fabricar sus lentes.

---

## 🔬 2. Catálogo Detallado de Filtros y Tratamientos

A continuación se detalla la clasificación completa de los tratamientos comerciales más relevantes del sector óptico, sus principios físicos, argumentos de venta en mostrador y cómo deben ser simulados visualmente.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       MATRIZ DE TRATAMIENTOS ÓPTICOS                        │
├───────────────────────┬─────────────────────────────┬───────────────────────┤
│    CLARIDAD Y CONFORT │        MUNDO DIGITAL        │  SENSIBLES A LA LUZ   │
│  • Lente Blanca       │  • Filtro Blue (Blue Cut)   │  • Fotocromático      │
│  • Antirreflejo Verde │  • AR Azul Reflectivo       │    (Transitions)      │
│  • Crizal Multicapa   │  • Blue Block en Masa       │  • Fotocromático Auto │
├───────────────────────┼─────────────────────────────┼───────────────────────┤
│     SOL Y EXTERIOR    │    CONDUCCIÓN Y CONTRASTE   │       TERAPÉUTICOS    │
│  • Polarizado         │  • Lente Amarillo / Ámbar   │  • FL-41 (Migraña)    │
│  • Espejado (Mirror)  │  • Lente de Visión Nocturna │  • Filtro UV400       │
│  • Tintes Degradados  │  • Tratamiento Antivaho     │  • Filtros Baja Visión│
└───────────────────────┴─────────────────────────────┴───────────────────────┘
```

---

### A. Línea de Uso Diario y Claridad Óptica

#### 1. Lente Blanca (Sin Tratamiento / Control)
* **Física Óptica:** El material base (CR-39, Policarbonato o Alto Índice) tiene una reflectancia natural del 8% al 14%. Solo transmite entre el 86% y el 92% de la luz visible.
* **Problema para el usuario:** Imágenes fantasma, halos de luz alrededor de lámparas, destellos molestos y pérdida de nitidez.
* **Estética:** Reflejo blanco opaco en la cara exterior del lente que tapa los ojos del usuario ante los demás (efecto espejo indeseado).
* **Rol en el simulador:** Punto de referencia (control) para contrastar todos los demás tratamientos mediante el comparador *split-screen*.

---

#### 2. Antirreflejo Verde Normal (AR Tradicional / Estándar de Mercado)
* **Física Óptica:** Capas nanométricas de interferencia destructiva calibradas en la región de ~550 nm (sensibilidad máxima del ojo humano fotópico). El reflejo residual visible es de color verde esmeralda suave. Transmisión de luz elevada al **98.5% - 99%**.
* **Argumento de Venta en Óptica:**
  * *"Es el tratamiento esencial para eliminar los destellos molestos de las bombillas y faroles de noche."*
  * *"Mejora la estética: permite que la gente vea tus ojos transparentes en persona y en fotografías."*
* **Simulación en el Software:**
  * **Modo Conducción Nocturna:** Reduce drásticamente los halos estrellados alrededor de las farolas y faros de automóviles.
  * **Modo Tercera Persona:** Muestra la lente transparente con un tenue destello verde esmeralda en el borde.

---

#### 3. Crizal / Tratamiento Multicapa Premium (5 en 1)
* **Concepto:** Representa la categoría más alta de tratamiento antirreflejante de laboratorio (marca de referencia: Essilor Crizal). No es solo antirreflejo; es un blindaje integral con 5 barreras protectoras nanotecnológicas:
  1. **Claridad Absoluta (Anti-Glare Ultra):** 99.2%+ de transmisión con reflejo residual mínimo casi invisible.
  2. **Capa Antirayas Reforzada (Hard Coat / SR Booster):** Resistencia al rayado por limpieza diaria con microfibra o ropa.
  3. **Capa Hidrofóbica (Water Repellent):** Tensión superficial modificada que hace que las gotas de agua formen esferas perfectas y resbalen sin dejar rastros (efecto hoja de loto).
  4. **Capa Oleofóbica (Smudge Resistant):** Repele la grasa dactilar, el sudor y los aceites faciales. Se limpia con una sola pasada suave.
  5. **Capa Antiestática:** Disipa la carga estática al frotar la lente, evitando la atracción de polvo y pelusas.
  6. **Protección UV Posterior (E-SPF):** Filtra los rayos UV que rebotan en la cara cóncava posterior de la lente hacia el ojo.
* **Argumento de Venta:** *"Una inversión en durabilidad: no se raya fácil, no se le pega el polvo, se limpia en un segundo y el agua resbala sin empañarlo."*
* **Simulación en el Software:**
  * **Modo Laboratorio de Estrés:**
    * Animación de gotas de lluvia deslizándose instantáneamente vs. lente sin AR donde el agua se aplasta y obstruye la visión.
    * Animación de prueba de huella dactilar (fácil limpieza) y resistencia a micro-rayas abrasivas.

---

### B. Línea Digital y Protección de Pantallas

#### 4. Filtro Blue (Blue Cut / Bloqueo de Luz Azul HEV)
* **Física Óptica:** Bloquea selectivamente la radiación de **Luz Azul de Alta Energía Visible (HEV)** en el rango de **380 nm a 455 nm**, permitiendo el paso de la luz azul turquesa beneficiosa (465-495 nm que regula el ciclo circadiano).
* **Mecanismos Comerciales:**
  * **Por Recubrimiento (AR Azul):** Reflejo residual color azul cobalto o violeta metálico en la superficie frontal.
  * **Por Absorción en Masa (Blue Block):** Monómero con pigmento que absorbe el espectro nocivo, aportando un tono cálido y mejorando el contraste.
* **Argumento de Venta en Óptica:**
  * *"Ideal para personas que pasan más de 4 horas al día frente al computador, smartphone o bajo iluminación LED fría."*
  * *"Reduce la fatiga visual, el ardor de ojos y los dolores de cabeza al final de la jornada laboral."*
* **Simulación en el Software:**
  * **Modo Oficina / Pantalla Digital:** Muestra un monitor con texto de alto contraste. Sin Blue Cut, se percibe un halo azul disperso y deslumbramiento frío. Con Blue Cut, el blanco se suaviza a un tono descansado y los caracteres tipográficos adquieren nitidez y contraste superior.

---

### C. Línea Sensible a la Luz (Interiores / Exteriores)

#### 5. Fotocromático (Transitions / Lentes Inteligentes a la Luz)
* **Física Óptica:** Moléculas orgánicas fotosensibles integradas (naftopiranos, oxazinas) que giran y cambian su estructura química tridimensional al absorber fotones ultravioleta (UV), absorbiendo la luz visible y oscureciéndose. En ausencia de UV, la agitación térmica devuelve las moléculas a su estado claro original.
* **Colores Comerciales:** Gris (neutro), Café/Marrón (alto contraste) y Verde Grafito (estilo clásico G-15).
* **Argumento de Venta en Óptica:**
  * *"Dos lentes en uno: una lente completamente transparente para trabajar dentro de la oficina y una gafa de sol oscura al salir a la calle."*
  * *"Protección 100% contra rayos UVA y UVB sin necesidad de cambiar de montura."*
* **El caso de uso en automóviles:** Las lunas de los autos bloquean el UV, por lo que el fotocromático convencional no oscurece al 100% dentro del coche (lo que abre paso a la venta de *Transitions XTRActive* o polarizados de sol).
* **Simulación en el Software:**
  * **Slider de Radiación Solar/UV (0% a 100%):** El usuario arrastra un control deslizante desde "Oficina" hasta "Pleno Sol". El lente responde dinámicamente oscureciéndose de cristalino a categoría 3 con animación progresiva suave.

---

### D. Línea Solar, Deportiva y Especializada

#### 6. Filtro Polarizado
* **Física Óptica:** Filtro con eje de transmisión estrictamente vertical que bloquea selectivamente la luz polarizada horizontalmente (la luz que rebota en superficies planas como asfalto, charcos, nieve, arena o agua).
* **Diferencia clave frente a una gafa de sol estándar:** Una gafa oscura común solo atenúa toda la luz (incluido el resplandor enceguecedor). El lente polarizado **cancela el reflejo blanco reflejado**, devolviendo los colores reales y la visibilidad bajo el agua o sobre el asfalto.
* **Simulación en el Software:**
  * **Escena de Carretera Mojada:** Muestra el asfalto con un resplandor cegador blanco que oculta las líneas de carril; al aplicar el filtro polarizado, el destello desaparece por completo y el asfalto se ve nítido.
  * **Escena del Lago / Agua:** El reflejo de la superficie del agua desaparece, permitiendo ver el fondo y peces.

---

#### 7. Tratamiento Espejado (Flash Mirror / Revo)
* **Física:** Depósito metálico de alta reflectancia en la cara externa de una lente oscura. Refleja un porcentaje extra de luz visible (10% al 60%).
* **Uso comercial:** Estética de moda deportiva (ciclismo, esquí, playa) y protección extrema en nieve o alta montaña. Oculta al 100% los ojos del usuario.

---

#### 8. Filtro Amarillo / Ámbar (DriveSafe & Visión Nocturna)
* **Física:** Tinte selectivo que absorbe las longitudes de onda azules cortas que causan mayor aberración cromática y dispersión intraocular.
* **Uso comercial:** Conducción en días nublados, lluvia, neblina o al atardecer. Realza drásticamente los contrastes de profundidad y las líneas del pavimento.

---

#### 9. Filtro UV400 Total
* **Física:** Bloqueo completo de radiación ultravioleta hasta los 400 nanómetros (UVA y UVB).
* **Argumento de Venta Crítico:** Evitar las gafas de sol de imitación o baratas: oscurecen la imagen, provocan la apertura (midriasis) de la pupila y permiten que una dosis masiva de radiación UV sin filtrar dañe la retina y el cristalino (cataratas precoces).

---

#### 10. Filtro Terapéutico FL-41
* **Física:** Filtro óptico con tinte rosado-ámbar calibrado para cortar entre 480 nm y 520 nm.
* **Uso:** Prescripción médica para pacientes con fotofobia severa, migrañas crónicas desencadenadas por luz artificial fluorescente o síndrome post-conmoción cerebral.

---

#### 11. Tratamiento Antivaho (Anti-Fog)
* **Física:** Polímero hidrofílico que reduce la tensión superficial para que el vapor de agua no forme microgotas (niebla difusa), sino una película delgada e imperceptible de agua uniforme.

---

## 🎨 3. Arquitectura Real Implementada en el Simulador

El software está implementado con una arquitectura orientada a componentes modulares en Vanilla ES6+ con empaquetador Vite 6, garantizando 60–144 FPS estables en navegadores móviles, tablets y PCs de escritorio:

```
Proyecto Filtros Opticos/
├── index.html                   # Shell HUD clínico con contenedor de simulación POV
├── package.json                 # Dependencias (Sharp para calibración, Vite 6)
├── vite.config.js               # Bundler con base: '/filters-simulator/' para GitHub Pages
├── docker-compose.yml           # Despliegue en 1 comando (Nginx Alpine)
├── Dockerfile                   # Imagen Nginx de producción ultraligera (~25 MB)
├── ESPECIFICACIONES_FILTROS.md  # Especificación clínica y técnica exhaustiva
├── README.md                    # Documentación general y guía rápida
├── .github/
│   └── workflows/
│       └── deploy.yml           # Despliegue continuo automático a GitHub Pages
│
├── public/
│   ├── preview.html             # Galería interactiva de propuestas de cabina
│   └── scenes/                  # Placas fotográficas maestras 2K (2752x1536)
│       ├── night-blanco.jpg     # Conducción nocturna: descontrol y halos expandidos
│       ├── night-ar-verde.jpg   # Conducción nocturna: faros contenidos y asfalto nítido
│       ├── night-crizal.jpg     # Conducción nocturna: 99.5% transmisión, negros profundos
│       ├── night-amarillo.jpg   # Conducción nocturna: DriveSafe ámbar alto contraste
│       ├── office-blanco.jpg    # Oficina: sobreexposición LED fría (~8500K) anti-astenopía
│       ├── office-ar-verde.jpg  # Oficina: supresión de reflejos de lámpara y ventana
│       ├── office-blue-cut.jpg  # Oficina: relajación a tono cálido descansado (~4500K)
│       ├── office-crizal.jpg    # Oficina: nitidez tipográfica quirúrgica en Excel/docs
│       └── sun-real.jpg         # Exteriores: carretera panorámica costera
│
├── scripts/                     # Herramientas de procesamiento y calibración fotográfica
│   ├── generate-mercedes-layers.js # Calibrador espectral 2K para noche
│   └── generate-office-layers.js   # Calibrador fotópico y anti-fatiga para oficina
│
└── src/
    ├── main.js                  # Orquestador del ciclo de vida y montaje de componentes
    │
    ├── core/
    │   ├── camera.js            # Cinemática de mirada 360 subpíxel con inercia y amortiguación
    │   ├── event-bus.js         # Bus de eventos reactivo desacoplado
    │   ├── filters-data.js      # Catálogo comercial, textos de mostrador y física óptica
    │   └── asset-helper.js      # Resolvedor universal de rutas para local y GitHub Pages
    │
    ├── scenes/                  # Motor de renderizado fotográfico en primera persona (POV)
    │   ├── scene-renderer.js    # Bucle maestro 60 FPS con doble pase (periferia vs montura)
    │   ├── night-drive-scene.js # Conducción nocturna en Mercedes-Benz Clase S
    │   ├── digital-office-scene.js # Oficina corporativa con monitor Dell ultrawide
    │   └── outdoor-sun-scene.js # Día soleado con Transitions y Polarizado
    │
    ├── components/              # Interfaz táctil y controles clínicos
    │   ├── glasses-hud.js       # Montura vectorial biselada de titanio en SVG ultra-nítido
    │   ├── joystick.js          # Joystick virtual ergonómico para giro de cabeza
    │   ├── lens-selector.js     # Carrusel centrado con aislamiento estricto de scroll
    │   ├── scene-selector.js    # Selector de escenas en la barra superior (Header)
    │   ├── experience-card.js   # Tarjeta de beneficios clínicos bajo demanda (💡 manual)
    │   ├── uv-slider.js         # Control deslizante de radiación solar (Transitions)
    │   └── pitch-modal.js       # Modal pedagógico con argumentos de venta
    │
    └── styles/                  # Sistema de diseño clínico amigable
        ├── theme.css            # Paleta de colores, tipografía médica y sombras suaves
        ├── layout.css           # Grid clínico, contención estricta y layout responsive
        └── components.css       # Estilos del HUD, carrusel, botones y joystick
```

---

## 🔬 4. Principios Clave de la Simulación Fotográfica 2K

1. **Cero Desenfoques de Graduación / Aumento:**
   Los filtros oftálmicos modifican transmisión espectral, absorción y reflexión parásita; **no corrigen dioptrías**. Todo texto y detalle en pantalla permanece 100% nítido, evitando que el paciente confunda la simulación de un filtro con un problema de aumento o refracción.
2. **Fotografía Multicapa Real vs. Parches Procedurales:**
   En lugar de pintar rectángulos o círculos artificiales sobre la imagen, se capturaron y calibraron placas maestras completas alineadas píxel a píxel (`2752x1536`) que reaccionan con un fundido cruzado óptico suave (*cross-fade* con interpolación hermite `smoothstep` de 260 ms).
3. **Doble Pase Óptico (Visión Binocular POV):**
   - **Pase 1 (Visión Periférica):** Fuera del marco de la gafa, el ojo percibe la luz cruda y sin tratar (deslumbramiento en noche, luz LED fría en oficina).
   - **Pase 2 (Visión a través de la Lente):** Dentro del bisel de la montura, se aprecia el efecto protector del tratamiento activo, permitiendo una comparación instantánea e intuitiva sin necesidad de cerrar o tapar la pantalla.
4. **Montura Vectorial Ultra-Definida:**
   Diseñada en SVG paramétrico con bordes biselados y reflejos especulares de titanio, libre de filtros de desenfoque DoF que degraden la calidad percibida en pantallas Full HD o 4K.

---

## 🚀 5. Despliegue y Sincronización Continua

* **Repositorio Central:** `https://github.com/visiometric-labs/filters-simulator`
* **Ramas Sincronizadas:**
  * `dev`: Rama de desarrollo y fuente de despliegue continuo.
  * `feature/mvp`: Rama de trabajo con paridad exacta respecto a `dev`.
* **Despliegue Público:** 
  * Hospedado en **GitHub Pages**: [https://visiometric-labs.github.io/filters-simulator/](https://visiometric-labs.github.io/filters-simulator/)
  * Automatizado mediante GitHub Actions (`.github/workflows/deploy.yml`).
* **Ejecución Local Rápida:**
  ```bash
  npm install
  npm run dev      # Servidor de desarrollo con Hot Module Reload
  npm run build    # Compilación optimizada en dist/
  ```

---
*Documento registrado y actualizado para JayzirTech / Visiometric Labs.*
