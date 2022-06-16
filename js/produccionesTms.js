//OBJETOS

function Servicio (codigo,nombre,precio,horas,subtotal){
    this.codigo=codigo;
    this.nombre= nombre;
    this.precio= precio;
    this.horas= horas;
    this.subtotal=subtotal;
};

function Presupuesto (serviciosElegidos, total){
    this.serviciosElegidos=serviciosElegidos
    this.total=total
}

let servicio1= new Servicio (1, "Fotografia", 800, null,0);
let servicio2= new Servicio (2, "Video", 1200,null,0);
let servicio3= new Servicio (3,"Drone",3000,null,0);

let serviciosDisponibles = [servicio1,servicio2,servicio3]; //array

let servicios = JSON.parse(localStorage.getItem("servicios"));

if(servicios === null){
    localStorage.setItem("servicios", JSON.stringify (serviciosDisponibles));
    servicios = JSON.parse(localStorage.getItem("servicios"));
}




let tablaServicios = document.getElementById ("tabla-servicios");

for (const servicio of servicios) {
let fila = document.createElement("tr");
fila.innerHTML= `<td> ${servicio.codigo}</td> 
                <td> ${servicio.nombre} </td>
                <td> $${servicio.precio}</td>
                <td> <input id="${servicio.codigo}" type="number" value="${servicio.horas}"/></td>
                <td id="subtotal-${servicio.codigo}"> ${servicio.subtotal != null ? servicio.subtotal : '' }</td>`;
                
  tablaServicios.append(fila);              
    
}

servicios.forEach(servicio =>
    {
        document.getElementById(servicio.codigo).addEventListener('change', function(event) {
            servicio.horas = parseInt(event.target.value);
            calcularSubtotal(servicio)
        })
    })


// CALCULAR COSTO DE SERVICIOS SELECCIONADOS

function calcularSubtotal (servicio){
    servicio.subtotal = (servicio.precio * servicio.horas);
    const tdSubtotal =  document.getElementById(`subtotal-${servicio.codigo}`);
    tdSubtotal.innerHTML = `<strong>${servicio.subtotal}</strong>`;
    calcularTotal();
 }

 function getPrecioProducto(productoDeseado) {
    const servicio = servicios.find(servicio => servicio.codigo === productoDeseado);

    if(servicio){
        return servicio.precio;
    }else  {
        alert("El codigo ingresado es inválido");
        //solicitarCodigoProducto();
    }
}

//----------------------------------------------------------------------------------

let total = 0;

function calcularTotal(){
    total = 0;

    servicios.forEach(servicio => {
        total += servicio.subtotal;
    })

    let h6Total= document.getElementById("total");
    h6Total.innerText= `Total: $${total}`;
}

//cupon descuento

let cuponDescuento= "tt"

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



function guardarPresupuesto(){
    const presupuesto= new Presupuesto(servicios,total)
    localStorage.setItem (`presupuesto`, JSON.stringify(presupuesto))
}




// crear elementos Td q contengan lo que se guarda en los prompts
// con eventos de mouse habilitar/desabhilitar opciones 







