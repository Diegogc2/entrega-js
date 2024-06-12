// array de productos
const productos = [
    { nombre: 'pizza', precio: 800 },
    { nombre: 'empanadas', precio: 600 },
    { nombre: 'combo pizza y empanadas', precio: 1300 }
];

// Función para simular el proceso de compra de comida
const comprarComida = () => {
    let carrito = [];
    let seguirComprando;

    do {
        let productoSeleccionado = prompt("¿Querés comprar pizza, empanadas o combo pizza y empanadas?", "Ej: pizza").toLowerCase();
        let cantidad = parseInt(prompt("¿Cuántos querés comprar?"));

        cantidad = validarCantidad(cantidad);

        let producto = productos.find(p => p.nombre === productoSeleccionado);

        if (producto) {
            agregarProductoAlCarrito(carrito, producto, cantidad);
        } else {
            alert("El producto ingresado no es correcto");
        }

        seguirComprando = confirm("¿Querés agregar otro producto?");
    } while (seguirComprando);

    // Filtrar el carrito para eliminar elementos sin cantidad válida (seguridad extra)
    carrito = carrito.filter(item => item.cantidad > 0);

    // Permitir eliminar productos del carrito
    let deseaEliminar;
    do {
        let resumenCompra = generarResumenCompra(carrito, calcularTotal(carrito));
        deseaEliminar = confirm(`${resumenCompra}\n¿Querés eliminar algún producto del carrito?`);
        
        if (deseaEliminar) {
            let productoAEliminar = prompt(`Selecciona el producto a eliminar:\n${carrito.map((item, index) => `${index + 1}: ${item.nombre}`).join('\n')}`);
            productoAEliminar = parseInt(productoAEliminar) - 1;

            if (productoAEliminar >= 0 && productoAEliminar < carrito.length) {
                let cantidadAEliminar = parseInt(prompt(`¿Cuántos ${carrito[productoAEliminar].nombre} querés eliminar?`));
                cantidadAEliminar = validarCantidad(cantidadAEliminar);

                carrito = eliminarProducto(carrito, productoAEliminar, cantidadAEliminar);
            } else {
                alert("Selección inválida.");
            }
        }
        
        if (carrito.length > 0) {
            seguirComprando = confirm("¿Querés agregar otro producto?");
            if (seguirComprando) {
                let productoSeleccionado = prompt("¿Querés comprar pizza, empanadas o combo pizza y empanadas?", "Ej: pizza").toLowerCase();
                let cantidad = parseInt(prompt("¿Cuántos querés comprar?"));

                cantidad = validarCantidad(cantidad);

                let producto = productos.find(p => p.nombre === productoSeleccionado);

                if (producto) {
                    agregarProductoAlCarrito(carrito, producto, cantidad);
                } else {
                    alert("El producto ingresado no es correcto");
                }

                carrito = carrito.filter(item => item.cantidad > 0);
            }
        }
    } while (deseaEliminar && carrito.length > 0);

    let totalCompra = calcularTotal(carrito);
    let totalConDescuento = aplicarDescuento(totalCompra);

    let resumenCompraFinal = generarResumenCompra(carrito, totalConDescuento);

    const delivery = confirm("¿Querés que te lo enviemos por delivery? (Aceptar para delivery, Cancelar para retirar en el local)");

    if (delivery) {
        totalConDescuento += 300; // Cargo fijo por delivery
        const direccion = prompt("Por favor, ingresá tu dirección para el delivery:");
        resumenCompraFinal += `Cargo por delivery: $300\n`;
        resumenCompraFinal += `Dirección: ${direccion}\n`;
        resumenCompraFinal += `Total con delivery: $${totalConDescuento}\n`;
    }

    let dineroPagado = parseFloat(prompt(`El total es $${totalConDescuento}. ¿Con cuánto dinero vas a pagar?`));
    while (isNaN(dineroPagado) || dineroPagado < totalConDescuento) {
        alert('Debe ingresar una cantidad válida y mayor o igual al total de la compra.');
        dineroPagado = parseFloat(prompt(`El total es $${totalConDescuento}. ¿Con cuánto dinero vas a pagar?`));
    }

    let vuelto = dineroPagado - totalConDescuento;

    alert(`${resumenCompraFinal}\nTotal pagado: $${dineroPagado}\nVuelto: $${vuelto}\nGracias por su compra!`);

    return totalConDescuento;
};

// Función para validar la cantidad ingresada
const validarCantidad = (cantidad) => {
    while (Number.isNaN(cantidad) || cantidad <= 0) {
        alert('Debe ingresar un número válido y mayor que cero.');
        cantidad = parseInt(prompt("¿Cuántos querés comprar?"));
    }
    return cantidad;
};

// Función para calcular el total de la compra
const calcularTotal = (carrito) => {
    return carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
};

// Función para aplicar descuento si el total de la compra es mayor o igual a 5000
const aplicarDescuento = (totalCompra) => {
    const descuento = totalCompra >= 5000 ? 0.80 : 1;
    return totalCompra * descuento;
};

// Función para generar el resumen de la compra
const generarResumenCompra = (carrito, totalConDescuento) => {
    let resumen = carrito.map(item => {
        let subtotal = item.precio * item.cantidad;
        return `${item.cantidad} x ${item.nombre} - $${subtotal}`;
    }).join('\n');

    resumen += `\nDescuento aplicado: ${totalConDescuento < 5000 ? '0%' : '20%'}\n`;
    resumen += `Total: $${totalConDescuento}\n`;
    return resumen;
};

// Función para eliminar una cantidad específica de un producto del carrito
const eliminarProducto = (carrito, productoAEliminar, cantidadAEliminar) => {
    let producto = carrito[productoAEliminar];
    if (producto.cantidad > cantidadAEliminar) {
        producto.cantidad -= cantidadAEliminar;
    } else {
        carrito.splice(productoAEliminar, 1);
    }
    return carrito;
};

// Función para agregar producto al carrito o incrementar la cantidad si ya existe
const agregarProductoAlCarrito = (carrito, producto, cantidad) => {
    let itemEnCarrito = carrito.find(item => item.nombre === producto.nombre);
    if (itemEnCarrito) {
        itemEnCarrito.cantidad += cantidad;
    } else {
        carrito.push({ ...producto, cantidad });
    }
};

comprarComida();
