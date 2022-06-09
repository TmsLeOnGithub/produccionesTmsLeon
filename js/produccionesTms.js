//OBJETOS

function Servicio (codigo,nombre,precio){
    this.codigo=codigo;
    this.nombre= nombre;
    this.precio= precio;
};

let servicio1= new Servicio (1, "Fotografia", 800);
let servicio2= new Servicio (2, "Video", 1200);
let servicio3= new Servicio (3,"Drone",3000);

let servicios = [servicio1,servicio2,servicio3]; //array

let tablaServicios = document.getElementById ("tabla-servicios");

console.log(tablaServicios)

for (const servicio of servicios) {
let fila = document.createElement("tr");
fila.innerHTML= `<td> ${servicio.codigo}</td> 
                <td> ${servicio.nombre} </td>
                <td> $${servicio.precio}</td>`;
  tablaServicios.append(fila);              
    
}


// CALCULAR COSTO DE SERVICIOS SELECCIONADOS

function calcularSubtotal (precioProducto, cantidadHoras){
    return (precioProducto * cantidadHoras);
 }

 function getPrecioProducto(productoDeseado) {

    const servicio = servicios.find(servicio => servicio.codigo === productoDeseado);

    if(servicio){
        return servicio.precio;
    }else  {
        alert("El codigo ingresado es inválido");
        solicitarCodigoProducto();
    }
}

//----------------------------------------------------------------------------------

function calcularPresupuesto() {
    let productoDeseado = parseInt(prompt("CODIGO 1 - FOTOS, CODIGO 2 - VIDEO, CODIGO 3 - DRONE"));
    let precioProducto = getPrecioProducto(productoDeseado);
    let cantidadHoras = parseInt(prompt("Ingrese cantidad de horas para el servicio elegido"));
    let subtotal = calcularSubtotal(precioProducto, cantidadHoras);
    return subtotal; 
}


    let total = 0;

let finalizado;

while(finalizado != "NO") {
    alert("A continuación ingrese el código del producto deseado");
    let subtotal = calcularPresupuesto();
    total = total + subtotal;

    finalizado = prompt("¿Desea sumar más servicios?").toUpperCase();
}

let divResumenPresupuesto= document.getElementById("resumenPresupuesto");
let h6TotalSinDescuento = document.createElement("h6");
h6TotalSinDescuento.innerText= `Total: $${total}`;
divResumenPresupuesto.append(h6TotalSinDescuento);

//cupon descuento

    let cuponDescuento= "tt"
    // let cuponIngresado=prompt("INGRESE CUPON DE DESCUENTO    (tt)");


function aplicarCupon() {
    const inputCupon = document.getElementById("cupon");
let cuponIngresado = inputCupon.value;    //'tt' ///TRAERLO DESDE EL VALUE DEL INPUT

    if(cuponIngresado == cuponDescuento){
        let descuento = 300;
        total = total- descuento    
        alert("se aplico el cupon de descuento")

        let h6TotalConDescuento = document.getElementById("montoConDescuento");
        h6TotalConDescuento.innerText= `Total con descuento: $${total}`;
    }else {
        alert("El cupón ingresado no existe")
    }
}

// CUOTAS

//let cuotas = parseInt(prompt("¿En cuantas cuotas queres pagar: 1,3,6,o 12?"))

function aplicarCuotas(){
    const selectCuotas = document.getElementById("cantidadCuotas");
    let cuotas = selectCuotas.value;
    let precioCuotas = Math.round(total / cuotas);
    let h6Cuotas = document.getElementById("montoCuota");
    h6Cuotas.innerHTML= `<strong>Serian ${cuotas} cuotas de $${precioCuotas}</strong>`;
}










// crear elementos Td q contengan lo que se guarda en los prompts
// con eventos de mouse habilitar/desabhilitar opciones 







