//CALCULAR COSTO DE SERVICIOS SELECCIONADOS

function calcularSubtotal (precioProducto, cantidadHoras){
    return (precioProducto * cantidadHoras);
 }

 function getPrecioProducto(productoDeseado) {
    let precioProducto;

    switch(productoDeseado){
        case 1: 
            precioProducto = 800;
            break;
        case 2:
            precioProducto = 1200;
            break;
        case 3:
            precioProducto = 3000;
            break;
        default:
            alert("El codigo ingresado es inválido");
            solicitarCodigoProducto();
            break;
    };
    
   return precioProducto;
}

// //calcular valor final del servicio sumando iva y con descuento

// function calcularTotal (subtotalFoto,subtotalVideo,subtotalDrone,subtotalLuces,subtotalEdicion){
//     const subtotalDrone= (3000)
//     let costoTotal= ((subtotalFoto+subtotalVideo+subtotalDrone+subtotalLuces+subtotalEdicion)  * 0.21) //0.21 aca puede ser?
// }

// //sumar iva

// const iva = costoTotal => costoTotal * 0.21
// let descuento= costoTotal => costoTotal // menos x porciento


//cupon descuento


function calcularPresupuesto() {
    let productoDeseado = parseInt(prompt("CODIGO 1 - FOTOS, CODIGO 2 - VIDEO, CODIGO 3 - DRONE"));
    let precioProducto = getPrecioProducto(productoDeseado);
    let cantidadHoras = parseInt(prompt("Ingrese cantidad de horas para el servicio elegido"));
    let subtotal = calcularSubtotal(precioProducto, cantidadHoras);
    return subtotal;
}


let total = 0;

let finalizado;

while(finalizado != "NO"|| finalizado != "no") {
    alert("A continuación ingrese el código del producto deseado");
    let subtotal = calcularPresupuesto();
    total = total + subtotal;

    finalizado = prompt("¿Desea sumar más servicios?")
}

    let cuponDescuento= "KMP19Y22"
    let cuponIngresado=prompt("INGRESE CUPON DE DESCUENTO    (KMP19Y22)");
    if(cuponIngresado == cuponDescuento){
        total = total- 300    
        alert("se aplico el cupon de descuento")
    }

alert("el presupuesto total es: " + total);

//CUOTAS

let cuotas = parseInt(prompt("¿En cuantas cuotas queres pagar: 1,3,6,o 12?"))
if(cuotas===1||cuotas===3||cuotas===6||cuotas||12){
    let precioCuotas = total / cuotas
    alert("Serian " + cuotas + "cuotas de " + precioCuotas)
} else {
        alert ("Solo tenemos 1,3,6 y 12 cuotas")
}
    









