// Selecciona elementos del DOM
const carrito = document.querySelector("#carrito");
const listaProductos = document.querySelector("#galeria");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
let articulosCarrito = [];

// Cargar eventos
cargarEventosListeners();

function cargarEventosListeners() {
  // Agregar producto al carrito
  listaProductos.addEventListener("click", agregarProducto);

  // Eliminar productos del carrito
  carrito.addEventListener("click", eliminarProducto);

  // Vaciar el carrito
  vaciarCarritoBtn.addEventListener("click", () => {
    articulosCarrito = [];
    limpiarHTML(); // Limpiar el HTML del carrito
  });
}

// Función para agregar un producto al carrito
function agregarProducto(e) {
  e.preventDefault();

  if (e.target.classList.contains("agregar-carrito")) {
    const productoSeleccionado = e.target.parentElement.parentElement;
    leerDatosProducto(productoSeleccionado);
  }
}

// Leer los datos del producto seleccionado
function leerDatosProducto(producto) {
  // Crear un objeto con el contenido del producto
  const infoProducto = {
    imagen: producto.querySelector("img").src,
    titulo: producto.querySelector("h2").textContent,
    precio: producto.querySelector(".precio").textContent,
    id: producto.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  // Verificar si el producto ya existe en el carrito
  const existe = articulosCarrito.some((producto) => producto.id === infoProducto.id);

  if (existe) {
    // Actualizar cantidad
    const productos = articulosCarrito.map((producto) => {
      if (producto.id === infoProducto.id) {
        producto.cantidad++;
        return producto; // Retorna el producto actualizado
      } else {
        return producto; // Retorna los productos que no son duplicados
      }
    });
    articulosCarrito = [...productos];
  } else {
    // Agregar el producto al carrito
    articulosCarrito = [...articulosCarrito, infoProducto];
  }

  // Actualizar el carrito en HTML
  carritoHTML();
}

// Eliminar un producto del carrito
function eliminarProducto(e) {
  if (e.target.classList.contains("borrar-curso")) {
    const productoId = e.target.getAttribute("data-id");

    // Eliminar del arreglo de carrito
    articulosCarrito = articulosCarrito.filter((producto) => producto.id !== productoId);

    carritoHTML(); // Actualizar el HTML
  }
}

// Mostrar los productos en el carrito
function carritoHTML() {
  limpiarHTML(); // Limpiar el HTML previo

  // Recorre el carrito y genera el HTML
  articulosCarrito.forEach((producto) => {
    const { imagen, titulo, precio, cantidad, id } = producto;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img src="${imagen}" width="100"></td>
      <td>${titulo}</td>
      <td>${precio}</td>
      <td>${cantidad}</td>
      <td><a href="#" class="borrar-curso" data-id="${id}">Borrar</a></td>
    `;

    // Agrega el HTML del carrito en el tbody
    contenedorCarrito.appendChild(row);
  });
}

// Eliminar los productos del tbody
function limpiarHTML() {
  contenedorCarrito.innerHTML = "";
}
