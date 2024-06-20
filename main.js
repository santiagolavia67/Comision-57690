async function cargarProductos() {
    try {
        const response = await fetch('productos.json');
        if (!response.ok) {
            throw new Error('Error al cargar el archivo JSON');
        }
        const productos = await response.json();
        console.log('Productos cargados:', productos);
        renderizarProductos(productos);
    } catch (error) {
        console.error('Error durante la carga de productos:', error.message);
    }
}
function renderizarProductos(productos) {
    const productosContainer = document.getElementById('productosContainer');
    productos.forEach(producto => {
        const productoHTML = `
            <div class="col-md-4 mb-3">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">Tipo: ${producto.tipo}</p>
                        <p class="card-text">Precio: $${producto.precio} / ${producto.unidad}</p>
                        <p class="card-text">Cantidad: ${producto.cantidad} ${producto.unidad}</p>
                        <button type="button" class="btn btn-primary" onclick="mostrarDetalle('${producto.nombre}', '${producto.tipo}', ${producto.precio}, '${producto.unidad}', ${producto.cantidad})">Ver Detalle</button>
                    </div>
                </div>
            </div>
        `;
        productosContainer.innerHTML += productoHTML;
    });
}
function mostrarDetalle(nombre, tipo, precio, unidad, cantidad) {
    document.getElementById('nombreProductoModal').textContent = nombre;
    document.getElementById('tipoProductoModal').textContent = `Tipo: ${tipo}`;
    document.getElementById('precioProductoModal').textContent = `Precio: $${precio} / ${unidad}`;
    document.getElementById('cantidadDisponibleModal').textContent = `Cantidad disponible: ${cantidad} ${unidad}`;
    cargarCarritoDesdeLocalStorage();

    $('#detalleProductoModal').modal('show');
}
function cargarCarritoDesdeLocalStorage() {
    const carrito = JSON.parse(localStorage.getItem('carrito'));
    const listaProductosCarrito = document.getElementById('listaProductosCarrito');
    listaProductosCarrito.innerHTML = '';
    if (carrito && carrito.length > 0) {
        carrito.forEach(producto => {
            const li = document.createElement('li');
            li.classList.add('list-group-item');
            li.textContent = `${producto.nombre} - Cantidad: ${producto.cantidad}`;
            listaProductosCarrito.appendChild(li);
        });
    } else {
        const li = document.createElement('li');
        li.classList.add('list-group-item', 'text-muted');
        li.textContent = 'No hay productos en el carrito';
        listaProductosCarrito.appendChild(li);
    }
}
function agregarAlCarrito() {
    const inputCantidad = document.getElementById('cantidadProducto').value;
    const producto = {
        nombre: document.getElementById('nombreProductoModal').textContent,
        cantidad: parseInt(inputCantidad)
    };
    let carrito = localStorage.getItem('carrito');
    if (carrito) {
        carrito = JSON.parse(carrito);
        const indice = carrito.findIndex(item => item.nombre === producto.nombre);
        if (indice !== -1) {
            carrito[indice].cantidad += producto.cantidad;
        } else {
            carrito.push(producto);
        }
    } else {
        carrito = [producto];
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));

    alert(`Producto agregado al carrito con cantidad: ${inputCantidad}`);
    $('#detalleProductoModal').modal('hide');
    cargarCarritoDesdeLocalStorage();
}
function realizarCompra() {
    Swal.fire({
        icon: 'success',
        title: '¡Compra realizada!',
        text: '¡Gracias por tu compra! Esperamos que disfrutes de tus productos.',
        showConfirmButton: false,
        timer: 2000
    });
}
let cantidadProducto = 1;
function sumarCantidad() {
    const inputCantidad = document.getElementById('cantidadProducto');
    cantidadProducto++;
    inputCantidad.value = cantidadProducto;
}
function restarCantidad() {
    const inputCantidad = document.getElementById('cantidadProducto');
    if (cantidadProducto > 1) {
        cantidadProducto--;
        inputCantidad.value = cantidadProducto;
    }
}
cargarProductos();