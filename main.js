function Producto (nombre,precio,stock){
    this.nombre = nombre
    this.precio = precio
    this.stock = stock
}

let productos =[
    new Producto("fernet", 10000, 30),
    new Producto("cerveza", 5000, 25),
    new Producto("agua", 500, 10)
]

function agregarProducto(){
            let nombre = prompt("Ingrese el nombre del producto").toLocaleLowerCase().trim()
            let precio = parseFloat(prompt("Ingrese el precio del producto"))
            let stock = parseInt(prompt("Ingrese el numero de stock"))

        if(isNaN(precio) || isNaN(stock) || nombre==""){
            alert("Los datos ingresados son incorrectos")
            return
        }

        if(productos.some((x)=>x.nombre === nombre)){
            alert("Ya tenemos ese producto")
            return
        }
        
        productos.push(new Producto(nombre, precio, stock))
    }

function carrito (){
let totalCarrito = 0
let iteracion = true

if(confirm("¿Quiere agregar un producto a nuestra lista?")){
    agregarProducto()
}

while(iteracion){
    let palabraClave = prompt("Las opciones que tenemos son fernet cerveza agua. Escriba cual quiere").toLocaleLowerCase().trim()
    let resultado = productos.filter((x)=>x.nombre.includes(palabraClave))
   

    if(resultado.length >0){
        totalCarrito += resultado[0].precio
    }else{
        alert(`No tenemos el producto ${palabraClave}`)
    }
    
    
    iteracion = confirm("¿ Quiere agregar mas productos al carrito ?")

    if(iteracion == false && totalCarrito != 0){
        alert(`El total a pagar es de: ${totalCarrito}`)        
    }

}
}

carrito()


