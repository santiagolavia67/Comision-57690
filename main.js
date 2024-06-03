const Producto = function(nombre, precio, stock) {
    this.nombre = nombre
    this.precio = precio
    this.stock = stock
}

let productos = [
    new Producto("fernet", 10000, 30),
    new Producto("cerveza", 5000, 25),
    new Producto("agua", 500, 10)
];

function filtrarProductos() {
    const body = document.querySelector("body")
    const input = document.getElementById("filtrarP").value
    const palabraClave = input.trim().toLowerCase()
    const resultado = productos.filter((producto) => producto.nombre.includes(palabraClave))

    const existingContainer = document.getElementById("result-container")
    if (existingContainer) {
        existingContainer.remove();
    }

    if (resultado.length > 0) {
        const container = document.createElement("div")
        container.id = "result-container"

        resultado.forEach((producto) => {
            const card = document.createElement("div")

            const nombre = document.createElement("h2")
            nombre.textContent = producto.nombre;
            card.appendChild(nombre)

            const precio = document.createElement("p")
            precio.innerHTML = `Precio: ${producto.precio}`
            card.appendChild(precio);

            const stock = document.createElement("p")
            stock.innerHTML = `Stock: ${producto.stock}`
            card.appendChild(stock)

            container.appendChild(card)
        })

        body.appendChild(container)
    } else {
        showNotification("No se encontró nada", "error")
    }
}

function agregarProducto() {
    const form = document.createElement("form")
    form.innerHTML = `
        <label for="nombre-input">Nombre:</label>
        <input id="nombre-input" type="text" required>
        
        <label for="precio-input">Precio:</label>
        <input id="precio-input" type="number" step="0.01" required>
        
        <label for="stock-input">Stock:</label>
        <input id="stock-input" type="number" step="1" required>
        
        <button type="submit">Agregar</button>
    `

    form.addEventListener("submit", function(event) {
        event.preventDefault()

        const nombreInput = document.getElementById("nombre-input").value.trim()
        const precioInput = parseFloat(document.getElementById("precio-input").value.trim())
        const stockInput = parseInt(document.getElementById("stock-input").value.trim())

        if (isNaN(precioInput) || isNaN(stockInput) || nombreInput === "") {
            showNotification("Por favor ingresa valores válidos", "error")
            return
        }

        const producto = new Producto(nombreInput, precioInput, stockInput)

        if (productos.some((elemento) => elemento.nombre === producto.nombre)) {
            showNotification("El producto ya está en la lista", "error")
            return
        }

        productos.push(producto)
        localStorage.setItem("x", JSON.stringify(productos));
        showNotification("Producto agregado exitosamente", "success")

        const existingContainer = document.getElementById("result-container")
        if (existingContainer) {
            existingContainer.remove()
        }

        const container = document.createElement("div")
        container.id = "result-container"

        productos.forEach((producto) => {
            const card = document.createElement("div")

            const nombre = document.createElement("h2")
            nombre.textContent = producto.nombre
            card.appendChild(nombre)

            const precio = document.createElement("p")
            precio.innerHTML = `Precio: ${producto.precio}`
            card.appendChild(precio)

            const stock = document.createElement("p")
            stock.innerHTML = `Stock: ${producto.stock}`
            card.appendChild(stock)
            container.appendChild(card)
        })

        document.querySelector("body").appendChild(container)
        form.reset()
    })

    document.querySelector("body").appendChild(form)
}

function showNotification(message, type) {
    const notification = document.createElement("div")
    notification.className = `notification ${type}`
    notification.textContent = message

    document.body.appendChild(notification)

    setTimeout(() => {
        notification.remove()}, 3000)
}

let btnGuardar = document.getElementById("buscar")
btnGuardar.addEventListener("click", filtrarProductos)

let btnAgregar = document.getElementById("agregar")
btnAgregar.addEventListener("click", agregarProducto)
