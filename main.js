const comprarComida = () => {
    const precios = {
        pizza: 800,
        empanadas: 600,
        'combo pizza y empanadas': 1300
    };

    let totalCompra = 0;
    let resumenCompra = '';
    let seguirComprando;

    do {
        let producto = prompt("¿Querés comprar pizza, empanadas o combo pizza y empanadas?", "Ej: pizza").toLowerCase();
        let cantidad = parseInt(prompt("¿Cuántos querés comprar?"));

        cantidad = validarCantidad(cantidad);

        if (precios[producto] !== undefined) {
            let subtotal = precios[producto] * cantidad;
            totalCompra += subtotal;
            resumenCompra += `${cantidad} x ${producto} - $${subtotal}\n`;
        } else {
            alert("El producto ingresado no es correcto");
        }

        seguirComprando = confirm("¿Querés agregar otro producto?");
    } while (seguirComprando);

    totalCompra = aplicarDescuento(totalCompra);
    resumenCompra += `Descuento aplicado: $${totalCompra >= 5000 ? '20%' : '0%'}\n`;
    resumenCompra += `Total: $${totalCompra}\n`;

    const delivery = confirm("¿Querés que te lo enviemos por delivery? (Aceptar para delivery, Cancelar para retirar en el local)");

    if (delivery) {
        totalCompra += 300; // Cargo fijo por delivery
        const direccion = prompt("Por favor, ingresá tu dirección para el delivery:");
        resumenCompra += `Cargo por delivery: $300\n`;
        resumenCompra += `Dirección: ${direccion}\n`;
        resumenCompra += `Total con delivery: $${totalCompra}\n`;
    }

    alert(`${resumenCompra}\nGracias por su compra!`);

    return totalCompra;
};

const validarCantidad = (cantidad) => {
    while (Number.isNaN(cantidad) || cantidad <= 0) {
        alert('Debe ingresar un número válido y mayor que cero.');
        cantidad = parseInt(prompt("¿Cuántos querés comprar?"));
    }
    return cantidad;
};

const aplicarDescuento = (totalCompra) => {
    const descuento = totalCompra >= 5000 ? 0.80 : 1;
    return totalCompra * descuento;
};

comprarComida();
