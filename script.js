let carritoCount = 0;

const juegosEjemplo = [
    { id: 1, titulo: "Elden Ring", precio: 49990, img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400" },
    { id: 2, titulo: "Cyberpunk 2077", precio: 39990, img: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400" },
    { id: 3, titulo: "Hollow Knight", precio: 12990, img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400" },
    { id: 4, titulo: "Baldur's Gate 3", precio: 59990, img: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400" }
];

const formatterCLP = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
});

function renderJuegos(lista) {
    const container = document.getElementById('productos-container');
    if (!container) return;
    container.innerHTML = '';
    
    lista.forEach(juego => {
        const card = document.createElement('div');
        card.className = 'card-juego';
        card.style.cssText = 'background: #1f1f1f; border-radius: 8px; overflow: hidden; display: flex; flex-direction: column; border: 1px solid #333; transition: transform 0.2s, background-color 0.2s, border-color 0.2s; cursor: pointer;';
        
        card.innerHTML = `
            <img src="${juego.img}" alt="${juego.titulo}" style="width: 100%; height: 140px; object-fit: cover;">
            <div style="padding: 15px; display: flex; flex-direction: column; flex: 1; justify-content: space-between;">
                <div>
                    <h3 style="margin: 0 0 10px 0; font-size: 1.1rem; color: #fff;">${juego.titulo}</h3>
                    <p style="margin: 0; color: #00bcd4; font-weight: bold;">${formatterCLP.format(juego.precio)}</p>
                </div>
                <button class="btn-comprar" data-id="${juego.id}" style="margin-top: 15px; padding: 8px; background: #e91e63; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">Agregar al Carrito</button>
            </div>
        `;

        // Efecto hover y selección grisácea visual
        card.addEventListener('mouseenter', () => {
            card.style.backgroundColor = '#2a2a2a';
            card.style.borderColor = '#00bcd4';
            card.style.transform = 'translateY(-4px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.backgroundColor = '#1f1f1f';
            card.style.borderColor = '#333';
            card.style.transform = 'translateY(0)';
        });

        container.appendChild(card);
    });

    agregarEventosBotones();
}

function agregarEventosBotones() {
    document.querySelectorAll('.btn-comprar').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // Evita conflictos con la tarjeta
            carritoCount++;
            const contadorEl = document.getElementById('contador-carrito');
            if (contadorEl) contadorEl.textContent = `🛒 Carrito: ${carritoCount}`;
            const feedback = document.getElementById('feedback-compra');
            if (feedback) {
                feedback.textContent = '¡Juego agregado al carrito!';
                setTimeout(() => { feedback.textContent = ''; }, 2500);
            }
        });
    });
}

// Asegurar ejecución cuando carga el DOM
document.addEventListener('DOMContentLoaded', () => {
    const btnCargar = document.getElementById('btn-cargar');
    if (btnCargar) {
        btnCargar.addEventListener('click', () => {
            renderJuegos(juegosEjemplo);
        });
    }

    const formContacto = document.getElementById('form-contacto');
    if (formContacto) {
        formContacto.addEventListener('submit', (e) => {
            e.preventDefault();
            const nombreInput = document.getElementById('nombre');
            const msgForm = document.getElementById('msg-form');
            if (nombreInput && msgForm) {
                msgForm.textContent = `¡Gracias por suscribirte, ${nombreInput.value}!`;
                e.target.reset();
            }
        });
    }

    // Carga inicial obligatoria
    renderJuegos(juegosEjemplo);
});