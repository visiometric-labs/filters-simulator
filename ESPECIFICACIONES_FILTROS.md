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

## 🎨 3. Arquitectura del Simulador de Filtros

Siguiendo el éxito del **Proyecto Experiencia Óptica**, este segundo proyecto debe estructurarse con una arquitectura moderna, rápida y sin sobrecarga de dependencias pesadas:

```
Proyecto Filtros Opticos/
├── index.html                   # Interfaz HUD clínica con panel de control táctil
├── package.json                 # Vite 6 + Scripts
├── vite.config.js               # Bundler de alta velocidad
├── docker-compose.yml           # Despliegue en 1 comando
├── Dockerfile                   # Nginx Alpine ultraligero (~25 MB)
├── ESPECIFICACIONES_FILTROS.md  # Este documento de especificación
├── README.md                    # Resumen ejecutivo bilingüe
│
└── src/
    ├── main.js                  # Orquestador de la aplicación y máquinas de estado
    │
    ├── core/
    │   ├── filter-manager.js    # Estado de filtros activos y combinaciones
    │   ├── scene-manager.js     # Cambio fluido entre escenarios de simulación
    │   └── events.js            # Bus de eventos desacoplado
    │
    ├── scenes/                  # Escenarios de prueba interactiva
    │   ├── night-drive.js       # Conducción nocturna: AR Verde vs Sin AR vs Crizal
    │   ├── digital-office.js    # Oficina con pantallas: Filtro Blue Cut vs Normal
    │   ├── outdoor-sun.js       # Exteriores soleados: Transitions / Fotocromático (Slider UV)
    │   ├── wet-road-lake.js     # Carretera mojada / Lago: Polarizado vs Gafa de Sol básica
    │   └── stress-lab.js        # Laboratorio Crizal: Gotas de agua, grasa, polvo y rayones
    │
    ├── components/
    │   ├── split-comparator.js  # Barra divisora deslizable Antes/Después
    │   ├── uv-slider.js         # Control táctil de intensidad lumínica y UV
    │   ├── lens-inspector.js    # Vista en 3ra persona: reflejo exterior de la lente
    │   └── filter-selector.js   # Menú táctil para elegir y acumular tratamientos
    │
    └── styles/
        ├── index.css            # Dark medical design system & variables
        └── components.css       # Estilos del HUD, tarjetas y controles táctiles
```

---

## 🚀 4. Guía para Continuar en Otro Computador

Para retomar este proyecto en otro equipo manteniendo exactamente el mismo contexto:

1. **Subir los cambios actuales al repositorio Git:**
   ```bash
   git add .
   git commit -m "docs: documentacion completa de filtros opticos y arquitectura"
   # Si tienes configurado un repositorio remoto (GitHub/GitLab):
   # git push origin main
   ```
2. **En el otro computador:**
   * Clona o abre la carpeta `Proyecto Filtros Opticos` en **Antigravity**.
   * Inicia el chat con la IA diciendo:
     > *"Hola, he abierto el repositorio de Proyecto Filtros Ópticos. Lee el archivo `ESPECIFICACIONES_FILTROS.md` para retomar el contexto y empecemos a implementar el simulador."*
   * La IA tendrá a su disposición toda la taxonomía de filtros, las escenas interactivas y la estructura técnica acordada.

---
*Documento registrado y generado para JayzirTech / Visiometric Labs.*
