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

var carritoItems = [];
var totalPagar = 0;


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
  var filtroCategoria = document.getElementById("categoria").value;
  var catalogo = document.getElementById("catalogo");
  catalogo.innerHTML = "";

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
  carritoItems.push(producto);
  totalPagar += producto.precio;

  actualizarCarrito();
}

// Carrito: 
  var carrito = document.querySelector('.carrito');
  var ventana = document.querySelector('.ventanaModal');
  var fondo = document.querySelector('#carrito');
  ventana.style.visibility = 'hidden';

  var cerrar = document.querySelector('.cerrar');
  cerrar.style.marginLeft = '80%';

  carrito.addEventListener('click', (parametro) => {
  ventana.style.cssText = "margin-left: 70%; border: 1px solid #905E3D; border-radius: 5px; width: 400px; padding: 15px; visibility: show";
  ventana.style.background = "#F1EEE4";
});

function actualizarCarrito(){
  var carritoItemsDiv = document.getElementById("carrito-items");
  var totalDiv = document.getElementById("total");

  carritoItemsDiv.innerHTML = "";
  totalDiv.textContent = "$" + totalPagar.toFixed(2);

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

function eliminarDelCarrito(indice){
  var productoEliminado = carritoItems.splice(indice, 1)[0];
  totalPagar -= productoEliminado.precio;

  actualizarCarrito();
}

cargarCatalogo();

var  vaciar = document.querySelector('.vaciarcarrito');
vaciar.addEventListener ('click', () => {
  carritoItems = [];
  totalPagar = 0;
  actualizarCarrito();
});

cerrar.addEventListener('click', () => {
  ventana.style.visibility = 'hidden';
});








