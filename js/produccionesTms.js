//OBJETOS

function Servicio(codigo, nombre, precio, horas, subtotal) {
  this.codigo = codigo;
  this.nombre = nombre;
  this.precio = precio;
  this.horas = horas;
  this.subtotal = subtotal;
};

function Presupuesto(serviciosElegidos, total) {
  this.serviciosElegidos = serviciosElegidos
  this.total = total
}

let servicios;

fetch(`../js/servicios.json`)
  .then((res) => res.json())
  .then((data) => { 
    servicios = data;
   generarTabla()

  })

  function generarTabla(){
    
    let tablaServicios = document.getElementById("tabla-servicios");

    for (const servicio of servicios) {
      let fila = document.createElement("tr");
      fila.innerHTML = `<td> ${servicio.codigo}</td> 
                <td> ${servicio.nombre} </td>
                <td> $${servicio.precio}</td>
                <td> <input id="${servicio.codigo}" min="0" max="6" type="number"  value="${servicio.horas}"/></td>
                <td id="subtotal-${servicio.codigo}"> ${servicio.subtotal != null ? servicio.subtotal : ''}</td>`;

      tablaServicios.append(fila);

    }

    servicios.forEach(servicio => {
      document.getElementById(servicio.codigo).addEventListener('change', function (event) {
        servicio.horas = parseInt(event.target.value);
        calcularSubtotal(servicio)
      })
    })
    
  }

//desestructuración

const servicioFotografia = {
  codigo: 1,
  precio: 800,
}
const { codigo, precio } = servicioFotografia

//spread precios




// CALCULAR COSTO DE SERVICIOS SELECCIONADOS

function calcularSubtotal(servicio) {
  servicio.subtotal = (servicio.precio * servicio.horas);
  const tdSubtotal = document.getElementById(`subtotal-${servicio.codigo}`);
  tdSubtotal.innerHTML = `<strong>${servicio.subtotal}</strong>`;
  calcularTotal();
}

function getPrecioProducto(productoDeseado) {
  const servicio = servicios.find(servicio => servicio.codigo === productoDeseado);

  if (servicio) {
    return servicio.precio;
  } else {
    alert("El codigo ingresado es inválido");
    //solicitarCodigoProducto();
  }
}

//----------------------------------------------------------------------------------

let total = 0;

function calcularTotal() {
  total = 0;

  servicios.forEach(servicio => {
    total += servicio.subtotal;
  })

  let subtotales = servicios.map(servicio => servicio.subtotal)
  let subtotalMasCaro = Math.max(...subtotales)

  let h6subtotalMasCaro = document.getElementById("subtotalMasCaro");
  console.log(h6subtotalMasCaro)

  h6subtotalMasCaro.innerText = `el subtotal más caro es de ${subtotalMasCaro}`
  let h6Total = document.getElementById("total");
  h6Total.innerText = `Total: $${total}`;
}

//cupon descuento

let cuponDescuento = "tt"

function aplicarCupon() {
  const inputCupon = document.getElementById("cupon");
  let cuponIngresado = inputCupon.value;    //'tt' ///TRAERLO DESDE EL VALUE DEL INPUT

  if (cuponIngresado == cuponDescuento) {
    let descuento = 300;
    total = total - descuento
    //ALERT VALIDACION CUPON
    let timerInterval
    Swal.fire({
      title: 'Validando Cupón',
      html: 'I will close in <b></b> milliseconds.',
      timer: 1000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
        const b = Swal.getHtmlContainer().querySelector('b')
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft()
        }, 100)
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer')
      }
    })
    //ALERT CUPÓN INGRESADO
    setTimeout(() => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'CUPÓN INGRESADO',
        showConfirmButton: false,
        timer: 1500
      })
    }, 2000)

    let h6TotalConDescuento = document.getElementById("montoConDescuento");
    h6TotalConDescuento.innerText = `Total con descuento: $${total}`;
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'El cupón ingresado no existe',
    })

  }
}


// CUOTAS

//let cuotas = parseInt(prompt("¿En cuantas cuotas queres pagar: 1,3,6,o 12?"))

function aplicarCuotas() {
  const selectCuotas = document.getElementById("cantidadCuotas");
  let cuotas = selectCuotas.value;
  let precioCuotas = Math.round(total / cuotas);
  let h6Cuotas = document.getElementById("montoCuota");
  h6Cuotas.innerHTML = `<strong>Serian ${cuotas} cuotas de $${precioCuotas}</strong>`;
}



function guardarPresupuesto() {
  const presupuesto = new Presupuesto(servicios, total)
  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify(presupuesto),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) => {
      localStorage.setItem(`presupuesto`, JSON.stringify(presupuesto))
      Swal.fire({
        text: 'TU PRESUPUESTO FUE GUARDADO',
        width: 600,
        padding: '3em',
        color: '#716add',
        timer: 2000,
        backdrop: `
              rgba(0,0,123,0.4)
              url("/images-web/gatoTostada.gif")
              left top
              no-repeat
            `
      })

    });

 // 
 
}




// crear elementos Td q contengan lo que se guarda en los prompts
// con eventos de mouse habilitar/desabhilitar opciones 







