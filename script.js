// script.js

// Conectamos los elementos principales del HTML con el DOM para poder manipularlos
const contenedorProductos = document.getElementById('productos-container');
const formularioContacto = document.getElementById('form-contacto');
const btnCargar = document.getElementById('btn-cargar');
const contadorCarritoEl = document.getElementById('contador-carrito');
const feedbackCompraEl = document.getElementById('feedback-compra');

let cantidadCarrito = 0;
const TASA_CLP = 950; // Tasa referencial USD a pesos chilenos

// Diccionario para traducir los títulos de la API al español de manera limpia
const traduccionesEspanol = {
    1: "Mochila Fjallraven - Foldsack No. 1 (para 15 Laptops)",
    2: "Polera Casual Slim Fit Premium para Hombre",
    3: "Chaqueta de Algodón para Hombre",
    4: "Polera Casual Slim Fit"
};

/**
 * Función auxiliar para convertir USD a Pesos Chilenos (CLP)
 */
function convertirAPesosChilenos(precioUSD) {
    const valorCLP = Math.round(precioUSD * TASA_CLP);
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        minimumFractionDigits: 0
    }).format(valorCLP);
}

/**
 * Arma dinámicamente la tarjeta visual de un producto, aplicando traducción,
 * conversión a pesos chilenos, efectos de mouse (mouseover/mouseout) y la lógica del botón de compra.
 */
function crearTarjetaProducto(producto) {
    // Tomamos la traducción si existe, o dejamos el título original por seguridad
    const tituloFinal = traduccionesEspanol[producto.id] || producto.title;
    const precioCLP = convertirAPesosChilenos(producto.price);

    // Creación del elemento contenedor en el DOM
    const card = document.createElement('div');
    card.style.border = '1px solid #e0e0e0';
    card.style.borderRadius = '8px';
    card.style.background = '#fff';
    card.style.padding = '16px';
    card.style.display = 'flex';
    card.style.flexDirection = 'column';
    card.style.justifyContent = 'space-between';
    card.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
    card.style.transition = 'transform 0.2s ease, background-color 0.2s ease';

    // Eventos de mouse: realce visual al pasar el cursor (hover)
    card.addEventListener('mouseover', () => {
        card.style.backgroundColor = '#f4f6f8';
        card.style.transform = 'translateY(-4px)';
    });
    card.addEventListener('mouseout', () => {
        card.style.backgroundColor = '#fff';
        card.style.transform = 'translateY(0)';
    });

    // Inyectamos el contenido estructurado de la tarjeta con precio en CLP
    card.innerHTML = `
        <div style="text-align: center; margin-bottom: 12px;">
            <img src="${producto.image}" alt="${tituloFinal}" style="height: 110px; object-fit: contain; width: 100%;">
        </div>
        <div>
            <h4 style="font-size: 14px; margin: 0 0 8px 0; color: #222; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;" title="${tituloFinal}">${tituloFinal}</h4>
            <p style="font-size: 16px; color: #d32f2f; margin: 8px 0;"><strong>${precioCLP}</strong></p>
        </div>
        <button class="btn-comprar" style="width: 100%; padding: 8px; background: #1976d2; color: #fff; border: none; border-radius: 4px; font-weight: bold; cursor: pointer;">Comprar</button>
    `;

    // Manejo de eventos de clic para actualizar el carrito y dar feedback visual
    const btnComprar = card.querySelector('.btn-comprar');
    btnComprar.addEventListener('click', () => {
        cantidadCarrito++;
        contadorCarritoEl.textContent = `🛒 Carrito: ${cantidadCarrito}`;
        feedbackCompraEl.textContent = `✨ Agregado al carrito: ${tituloFinal.slice(0, 35)}...`;
        
        setTimeout(() => {
            feedbackCompraEl.textContent = '';
        }, 3500);
    });

    return card;
}

/**
 * Consulta la Fake Store API mediante Fetch, manejando promesas y errores de red,
 * y luego inserta los elementos resultantes en el DOM.
 */
function cargarDatosExternos() {
    if (!contenedorProductos) return;
    contenedorProductos.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #666;">Cargando catálogo dinámico...</p>';

    fetch('https://fakestoreapi.com/products?limit=4')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al conectar con la API');
            }
            return response.json();
        })
        .then(productos => {
            contenedorProductos.innerHTML = ''; // Limpiamos mensaje de carga
            productos.forEach(prod => {
                const tarjeta = crearTarjetaProducto(prod);
                contenedorProductos.appendChild(tarjeta); // Inserción en el DOM
            });
        })
        .catch(error => {
            console.error('Falló el fetch:', error);
            contenedorProductos.innerHTML = `<p style="color: red; grid-column: 1/-1;">No se pudieron cargar los datos externos.</p>`;
        });
}

/**
 * Configura el formulario de contacto interceptando el submit para validar
 * y evitar que la página se recargue por defecto.
 */
function configurarFormulario() {
    if (!formularioContacto) return;

    formularioContacto.addEventListener('submit', (event) => {
        event.preventDefault(); // Evitamos recarga por defecto
        const nombreInput = document.getElementById('nombre');
        const msgForm = document.getElementById('msg-form');

        if (nombreInput.value.trim() === '') {
            msgForm.textContent = 'Por favor, ingresa tu nombre válido.';
            msgForm.style.color = '#d32f2f';
            return;
        }

        msgForm.textContent = `¡Gracias, ${nombreInput.value}! Suscripción registrada con éxito.`;
        msgForm.style.color = '#2e7d32';
        formularioContacto.reset();
    });
}

// Inicializamos toda la lógica interactiva cuando el DOM termina de cargar
document.addEventListener('DOMContentLoaded', () => {
    configurarFormulario();
    if (btnCargar) {
        btnCargar.addEventListener('click', cargarDatosExternos);
    }
    cargarDatosExternos();
});