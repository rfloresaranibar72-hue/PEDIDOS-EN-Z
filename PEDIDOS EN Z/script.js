// WhatsApp de Pedidos en Z: Bolivia +591
const MI_WHATSAPP = "59175344376";

let carrito = [];

function agregarProducto(nombre, precio) {
    const producto = carrito.find(p => p.nombre === nombre);

    if (producto) {
        producto.cantidad++;
    } else {
        carrito.push({
            nombre: nombre,
            precio: precio,
            cantidad: 1
        });
    }

    mostrarCarrito();
}

function cambiarCantidad(nombre, cambio) {
    const producto = carrito.find(p => p.nombre === nombre);

    if (!producto) return;

    producto.cantidad += cambio;

    if (producto.cantidad <= 0) {
        eliminarProducto(nombre);
        return;
    }

    mostrarCarrito();
}

function eliminarProducto(nombre) {
    carrito = carrito.filter(p => p.nombre !== nombre);
    mostrarCarrito();
}

function mostrarCarrito() {
    const lista = document.getElementById("lista-carrito");
    const totalElemento = document.getElementById("total");

    lista.innerHTML = "";

    if (carrito.length === 0) {
        lista.innerHTML =
            '<p class="vacio">Todavía no agregaste productos.</p>';
    }

    let total = 0;

    carrito.forEach(producto => {
        const subtotal = producto.precio * producto.cantidad;
        total += subtotal;

        const item = document.createElement("div");
        item.className = "item-carrito";

        const informacion = document.createElement("div");

        const nombre = document.createElement("span");
        nombre.className = "item-nombre";
        nombre.textContent =
            `${producto.nombre} x ${producto.cantidad}`;

        const precio = document.createElement("span");
        precio.className = "item-subtotal";
        precio.textContent = `Subtotal: Bs ${subtotal}`;

        informacion.append(nombre, precio);

        const controles = document.createElement("div");
        controles.className = "controles";

        const menos = document.createElement("button");
        menos.textContent = "−";
        menos.setAttribute("aria-label", "Disminuir cantidad");
        menos.onclick = () =>
            cambiarCantidad(producto.nombre, -1);

        const cantidad = document.createElement("span");
        cantidad.textContent = producto.cantidad;

        const mas = document.createElement("button");
        mas.textContent = "+";
        mas.setAttribute("aria-label", "Aumentar cantidad");
        mas.onclick = () =>
            cambiarCantidad(producto.nombre, 1);

        const eliminar = document.createElement("button");
        eliminar.textContent = "Eliminar";
        eliminar.className = "eliminar";
        eliminar.onclick = () =>
            eliminarProducto(producto.nombre);

        controles.append(menos, cantidad, mas, eliminar);
        item.append(informacion, controles);
        lista.appendChild(item);
    });

    totalElemento.textContent = total;
}

function pedirPorWhatsApp() {
    if (carrito.length === 0) {
        alert("Agrega al menos un producto al carrito.");
        return;
    }

    const nombre = document.getElementById("nombre-cliente")
        .value.trim();

    const direccion = document.getElementById("direccion")
        .value.trim();

    const observaciones = document.getElementById("observaciones")
        .value.trim();

    if (!nombre) {
        alert("Por favor, escribe tu nombre.");
        document.getElementById("nombre-cliente").focus();
        return;
    }

    if (!direccion) {
        alert("Por favor, escribe tu dirección de entrega.");
        document.getElementById("direccion").focus();
        return;
    }

    let mensaje = "¡Hola! Quiero realizar un pedido en Pedidos en Z.\n\n";

    mensaje += `👤 Cliente: ${nombre}\n`;
    mensaje += `📍 Dirección: ${direccion}\n\n`;
    mensaje += "🛒 PRODUCTOS:\n";

    let total = 0;

    carrito.forEach(producto => {
        const subtotal = producto.precio * producto.cantidad;
        total += subtotal;

        mensaje += `• ${producto.nombre} x ${producto.cantidad}`;
        mensaje += ` = Bs ${subtotal}\n`;
    });

    mensaje += `\n💰 TOTAL: Bs ${total}\n`;

    if (observaciones) {
        mensaje += `\n📝 Observaciones: ${observaciones}\n`;
    }

    mensaje += "\nPor favor, confirmen mi pedido. ¡Gracias!";

    const enlace = "https://wa.me/" + MI_WHATSAPP +
        "?text=" + encodeURIComponent(mensaje);

    window.open(enlace, "_blank");
}

mostrarCarrito();