# PFY2201 - Desarrollo Frontend I | Semana 5: Manipulación del DOM e Interactividad

Proyecto de comercio electrónico interactivo desarrollado para la **Semana 5 de Desarrollo Frontend I (PFY2201)** en Duoc UC.

## 🚀 Funcionalidades
- **Manipulación del DOM**: Creación y renderizado dinámico de tarjetas de productos mediante `createElement` y `appendChild`.
- **Eventos (`addEventListener`)**:
  - `mouseover` / `mouseout`: Efecto visual de elevación y cambio de fondo en los productos.
  - `click`: Actualización del contador del carrito y despliegue de feedback temporal de compra.
  - `submit`: Validación del formulario de suscripción/contacto previniendo recarga con `preventDefault()`.
- **Fetch API & Asincronía**: Consumo de datos desde `https://fakestoreapi.com/products?limit=4`, validación de respuesta (`response.ok`), manejo de promesas y captura de errores con `.catch()`.
- **Localización**: Traducción de títulos al español y formato de precios a Pesos Chilenos (`CLP`) con `Intl.NumberFormat`.

## 📁 Estructura
```text
C:.
    index.html
    script.js
    README.md
    
    
🛠️ Tecnologías
HTML5 / CSS3 (Inline/Styles estructurados)

JavaScript Vanilla (ES6+)

Fake Store API

🌐 Despliegue
Rama principal: main

Rama de despliegue GitHub Pages: gh-pages
"@ -Encoding UTF8