var productos = [
  {
    nombre: "Aceite de Jojoba",
    descripcion: "Aceite vegetal de jojoba para uso externo. Apto para veganos.",
    precio: 1500,
    imagen: "img/aceitedejojoba.png",
    categoria: "Categoría 1"
  },
  {
    nombre: "Aceite de Rosa Mosqueta",
    descripcion: "Aceite de rosa mosqueta 100% natural & orgánico. Extraído de las semillas del rosal silvestre.",
    precio: 1100,
    imagen: "img/aceitederosamosquetaIII.png",
    categoria: "Categoría 1"
  },
  {
    nombre: "Aceite esencial de Manzanilla",
    descripcion: "100% puro y natural. Ideal para calmar los nervios del sistema digestivo.",
    precio: 1541,
    imagen: "img/aceiteesencial.png",
    categoria: "Categoría 2"
  },
  {
    nombre: "Agua de rosas",
    descripcion: "El Agua de rosas es conocida por sus propiedades hidratantes y tonificantes.",
    precio: 1045,
    imagen: "img/aguaderosas.png",
    categoria: "Categoría 1"
  },
  {
    nombre: "Tote Bag",
    descripcion: "Tote bag ecológica con fibras 100% naturales.",
    precio: 420,
    imagen: "img/bolsa.png",
    categoria: "Categoría 3"
  },

  {
    nombre: "Crema corporal",
    descripcion: "Con aceite de coco y manteca de karite, formula nutritiva.",
    precio: 1575,
    imagen: "img/cremacorporal.png",
    categoria: "Categoría 2"
  },
  {
    nombre: "Emulsion corporal",
    descripcion: "Con aloe vera, ideal para el verano.",
    precio: 420,
    imagen: "img/emulsióncorporalconaloeveraII.png",
    categoria: "Categoría 2"
  },
  {
    nombre: "Espuma limpiadora",
    descripcion: "El aliado perfecto para una limpieza suave y efectiva de tu piel.",
    precio: 450,
    imagen: "img/espumalimpiadora.png",
    categoria: "Categoría 2"
  },
  {
    nombre: "Peine",
    descripcion: "Elección consciente para el cuidado de tu cabello y del medio ambiente.",
    precio: 1575,
    imagen: "img/peine.png",
    categoria: "Categoría 3"
  },
  {
    nombre: "Repuesto corporal",
    descripcion: "Repuesto ecologico de nuestra crema corporal con aceite de coco y manteca karite.",
    precio: 420,
    imagen: "img/repuestocorporal.png",
    categoria: "Categoría 2"
  },
  {
    nombre: "Vitamina C",
    descripcion: "La clave para una piel radiante y luminosa en todo tu cuerpo. Aroma a naranjas.",
    precio: 450,
    imagen: "img/vitaminaC.png",
    categoria: "Categoría 2"
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
        <p>${producto.descripcion}</p>
        <p>Precio: $${producto.precio}</p>
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
          <p>${producto.descripcion}</p>
          <p>Precio: $${producto.precio}</p>
          <button class="btn-agregar" onclick="agregarAlCarrito(${i})">Agregar al carrito</button>
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
  ventana.style.cssText = "margin-left: 70%; border: 1px solid #000; width: 400px; padding: 15px; visibility: show"; 
});

function actualizarCarrito(){
  var carritoItemsDiv = document.getElementById("carrito-items");
  var totalDiv = document.getElementById("total");

  carritoItemsDiv.innerHTML = "";
  totalDiv.textContent = "$" + totalPagar.toFixed(2);

  for (var i = 0; i < carritoItems.length; i++) {
    var carritoItem = carritoItems[i];

    var carritoItemHTML = `
      <div>
        <p>${carritoItem.nombre}</p>
        <p>$${carritoItem.precio}</p>
        <button onclick="eliminarDelCarrito(${i})"> Eliminar </button>
      </div>`;

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



/*const open = document.getElementById('open');
const modal_container = document.getElementById('modal_container');
const close = document.getElementById('close');

open.addEventListener('click', () => {
  modal_container.classList.add('show');  
});

close.addEventListener('click', () => {
  modal_container.classList.remove('show');
});*/