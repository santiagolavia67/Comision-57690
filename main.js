function carrito (){
let totalCarrito = 0
let iteracion = true

while(iteracion){
    let opcion = parseInt(prompt("Ingrese la opcion de bebida que quiere llevar: \n1-Fernet $ 10.000 \n2-Pack de cerveza $ 5.000 \n3-Agua mineral $ 500"))
    switch(opcion){
        case 1: 
            totalCarrito = totalCarrito + 10000;
            break;
        case 2:
            totalCarrito = totalCarrito + 5000;
            break;
        case 3:
            totalCarrito = totalCarrito + 500;
            break;
        default:
            alert("No ingreso ninguna opcion correcta");
            break;
    }
    iteracion = confirm("¿ Quiere agregar mas productos al carrito ?")

    if(iteracion == false && totalCarrito != 0){
        alert(`El total a pagar es de: ${totalCarrito}`)
    }

}
}

carrito()