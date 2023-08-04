var productos = [
  {
    nombre: "Aceite de Jojoba",
    descripcion: "Aceite vegetal de jojoba para uso externo. Apto para veganos.",
    precio: 1500,
    imagen: "img/aceitedejojoba.png",
    categoria: "Faciales"
  },
  {
    nombre: "Aceite de Rosa Mosqueta",
    descripcion: "Aceite de rosa mosqueta 100% natural & orgánico. Extraído de las semillas del rosal silvestre.",
    precio: 1100,
    imagen: "img/aceitederosamosquetaIII.png",
    categoria: "Faciales"
  },
  {
    nombre: "Aceite esencial de Manzanilla",
    descripcion: "100% puro y natural. Ideal para calmar los nervios del sistema digestivo.",
    precio: 1541,
    imagen: "img/aceiteesencial.png",
    categoria: "Corporales"
  },
  {
    nombre: "Agua de rosas",
    descripcion: "El Agua de rosas es conocida por sus propiedades hidratantes y tonificantes.",
    precio: 1045,
    imagen: "img/aguaderosas.png",
    categoria: "Faciales"
  },
  {
    nombre: "Tote Bag",
    descripcion: "Tote bag ecológica con fibras 100% naturales.",
    precio: 420,
    imagen: "img/bolsa.png",
    categoria: "Accesorios"
  },

  {
    nombre: "Crema corporal",
    descripcion: "Con aceite de coco y manteca de karite, formula nutritiva.",
    precio: 1575,
    imagen: "img/cremacorporal.png",
    categoria: "Corporales"
  },
  {
    nombre: "Emulsion corporal",
    descripcion: "Con aloe vera, ideal para el verano.",
    precio: 420,
    imagen: "img/emulsióncorporalconaloeveraII.png",
    categoria: "Corporales"
  },
  {
    nombre: "Espuma limpiadora",
    descripcion: "El aliado perfecto para una limpieza suave y efectiva de tu piel.",
    precio: 450,
    imagen: "img/espumalimpiadora.png",
    categoria: "Corporales"
  },
  {
    nombre: "Peine",
    descripcion: "Elección consciente para el cuidado de tu cabello y del medio ambiente.",
    precio: 1575,
    imagen: "img/peine.png",
    categoria: "Accesorios"
  },
  {
    nombre: "Repuesto corporal",
    descripcion: "Repuesto ecologico de nuestra crema corporal con aceite de coco y manteca karite.",
    precio: 420,
    imagen: "img/repuestocorporal.png",
    categoria: "Corporales"
  },
  {
    nombre: "Vitamina C",
    descripcion: "La clave para una piel radiante y luminosa en todo tu cuerpo. Aroma a naranjas.",
    precio: 450,
    imagen: "img/vitaminaC.png",
    categoria: "Corporales"
  },
];

//almacenar los productos en el carrito de compras
var carritoItems = [];
var totalPagar = 0;

//funcion para cargar el catalogo de productos en la pagina
function cargarCatalogo() {
  var catalogo = document.getElementById("catalogo");
  catalogo.innerHTML = "";

  for (var i = 0; i < productos.length; i++) {
    var producto = productos[i];

    var productoHTML = `
      <div class="producto">
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <p class="descripcion">${producto.descripcion}</p>
        <p class="precio">Precio: $${producto.precio}</p>
        <button class="btn-agregar" onclick="agregarAlCarrito(${i})">Agregar al carrito</button>
      </div>`;

    catalogo.innerHTML += productoHTML;
  }
}

//Categorias: 
function filtrarProductosPorCategoria() {
  //obtiene el valor del filtro de categoria seleccionado
  var filtroCategoria = document.getElementById("categoria").value;
  var catalogo = document.getElementById("catalogo");
  catalogo.innerHTML = "";

  //muestra el banner flotante de oferta
  mostrarofertaEspecial();

  //itera a traves de los productos y muestra solo los que coinciden con la categoria seleccionada
  for (var i = 0; i < productos.length; i++) {
    var producto = productos[i];

    if (filtroCategoria === "" || producto.categoria === filtroCategoria) {
      var productoHTML = `
        <div class="producto">
          <img src="${producto.imagen}" alt="${producto.nombre}">
          <h3>${producto.nombre}</h3>
          <p class="descripcion">${producto.descripcion}</p>
          <p class="precio">Precio: $${producto.precio}</p>
          <button class="btn-agregar" onclick="agregarAlCarrito(${i})"> Agregar al carrito </button>
        </div>`;
      catalogo.innerHTML += productoHTML;
    }
  }
}

function agregarAlCarrito(indice) {
  var producto = productos[indice];

  var productoEnCarrito = carritoItems.find(item => item.nombre === producto.nombre);
  if (productoEnCarrito){
    productoEnCarrito.cantidad++; //si el producto esta en el carrito aumentar su cantidad
    } else {
    carritoItems.push({ ...producto, cantidad: 1}); //si el producto no esta en el carrito aumentar su cantidad 1
}

  totalPagar += producto.precio;//actualiza el total a pagar

  actualizarCarrito();
}

//Carrito: 
  var carrito = document.querySelector('.carrito');
  var ventana = document.querySelector('.ventanaModal');
  var fondo = document.querySelector('#carrito');
  ventana.style.visibility = 'hidden';

  var checkoutFormulario = document.querySelector('checkout-formulario');
  checkoutFormulario.style.visibility = 'hidden';

  var cerrar = document.querySelector('.cerrar');
  cerrar.style.marginLeft = '80%';

  //evento de clic al boton "carrito" para mostrar la ventana modal
  carrito.addEventListener('click', (parametro) => {
  ventana.style.cssText = "margin-left: 70%; border: 1px solid #905E3D; border-radius: 5px; width: 400px; padding: 15px; visibility: show";
  ventana.style.background = "#F1EEE4";
});

//actualiza la visualizacion del carrito en la pagina
function actualizarCarrito(){
  var carritoItemsDiv = document.getElementById("carrito-items");
  var totalDiv = document.getElementById("total");

  //limpiar el contenido actual del carrito
  carritoItemsDiv.innerHTML = "";

  //mostrar el total a pagar con dos decimales
  totalDiv.textContent = "$" + totalPagar.toFixed(2);

  //iterar a traves de los elementos en el carrito y generar el html correspondiente
  for (var i = 0; i < carritoItems.length; i++) {
    var carritoItem = carritoItems[i];

    var carritoItemHTML = `
      <div class="carrito-items">
        <p>${carritoItem.nombre}</p>
        <p>$${carritoItem.precio}</p>
        <button onclick="eliminarDelCarrito(${i})">Eliminar</button></div>`;

    carritoItemsDiv.innerHTML += carritoItemHTML;
  }
}

//funcion para aumentar la cantidad de un producto en el carrito
function sumarCantidad(indice) {
  carritoItems[indice].cantidad++;//aumenta la cantidad del prod en el carrito
  totalPagar += carritoItems[indice].precio;//aumenta el total a pagar sumando el precio del prod
  actualizarCarrito();
}

//funcion para restar la cantidad de un prod en el carrito
function restarCantidad(indice) {
  if (carritoItems[indice].cantidad > 1) {
      carritoItems[indice].cantidad--;//reduce la cantidad del prod en el carrito si es mayor a 1
      totalPagar -= carritoItems[indice].precio;//reduce el total a pagar restando el precio del producto
      actualizarCarrito(); 
  }
}

function eliminarDelCarrito(indice){
  var productoEliminado = carritoItems.splice(indice, 1)[0];
  totalPagar -= productoEliminado.precio;

  actualizarCarrito();
}

function mostrarVentanaModal() {
  ventana.style.visibility ='visible';
  document.addEventListener("keydown", cerrarVentanaConEsc);//agregamos evento para cerrar la ventana modal con tecla ESC
}

function cerrarVentanaModal() {
  ventana.style.visibility='hidden';
  document.removeEventListener("keydown", cerrarVentanaConEsc);//elimina el evento para cerrar la ventana modal 
}

function cerrarVentanaConEsc(event) {
  if (event.key === "Escape") {
    cerrarVentanaModal();//llama a la funcion para cerrar la ventana modal
  }
}

carrito.addEventListener('click',mostrarVentanaModal);

//funcion para mostrar el formulario de checkout y desplazarse suavemente hacia el
function mostrarFormularioCheckout() {
  ventana.style.visibility = 'hidden';
  checkoutFormulario.style.visibility = 'visible';
  var checkoutSection = document.getElementById("checkout-formulario");
  checkoutSection.scrollIntoView({ behavior: 'smooth' }); 
}

function cancelarCompra() {
  checkoutFormulario.style.visibility = 'hidden';
  ventana.style.visibility = 'visible';
}

function mostrarofertaEspecial() {
  var ofertaEspecial = document.getElementById("oferta-especial");
  ofertaEspecial.style.display = "block";

  setTimeout(function () {
    ofertaEspecial.style.display = "none";
  }, 10000);

}


cargarCatalogo();

var vaciarcarrito = document.querySelector('.vaciarcarrito');

vaciar.addEventListener ('click', () => {
  carritoItems = [];
  totalPagar = 0;
  actualizarCarrito();
});

cerrar.addEventListener('click', () => {
  ventana.style.visibility = 'hidden';
});








