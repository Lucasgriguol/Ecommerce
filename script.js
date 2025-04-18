document.addEventListener("DOMContentLoaded", () => {
  // Leer carrito desde localStorage o inicializar vacío
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  // Función para guardar carrito
  function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }

  // Función para mostrar SweetAlert2 o alert como fallback
  function alertaAgregado(producto) {
    if (window.Swal) {
      Swal.fire({
        icon: 'success',
        title: '¡Producto agregado!',
        text: `${producto.nombre} se agregó al carrito con éxito.`,
        confirmButtonText: 'OK',
        background: '#222',
        color: '#fff',
        confirmButtonColor: '#00ff00'
      });
    } else {
      alert(`${producto.nombre} agregado al carrito con éxito.`);
    }
  }

  // Datos de productos
  const productos = [
    { nombre: "Need for Speed Underground 2", descripcion: "Tunea tu coche y dominá las calles nocturnas.", precio: "$7,500", img: "./recursos/Need For Speed Underground 2.jfif" },
    { nombre: "Transformers The Game", descripcion: "Autobots vs Decepticons en una guerra explosiva.", precio: "$6,000", img: "./recursos/Transformers The Game.jpg" },
    { nombre: "The Simpsons: Hit and Run", descripcion: "Springfield se convierte en tu patio de juegos.", precio: "$5,900", img: "./recursos/The Simpsons Hit and Run.jpg" },
    { nombre: "Cars", descripcion: "Viví la carrera con Rayo McQueen y sus amigos.", precio: "$6,200", img: "./recursos/Cars.jpg" },
    { nombre: "Dragon Ball Z: Budokai Tenkaichi 3", descripcion: "Más de 150 personajes en combates 3D brutales.", precio: "$8,000", img: "./recursos/Dragon Ball Z Budokai Tenkaichi 3.jpg" },
    { nombre: "God of War II", descripcion: "Kratos desata su furia contra los dioses del Olimpo.", precio: "$7,200", img: "./recursos/God Of War II.jfif" },
    { nombre: "Resident Evil 4", descripcion: "Leon Kennedy enfrenta el horror en una aldea maldita.", precio: "$7,100", img: "./recursos/Resident Evil 4.jpg" },
    { nombre: "GTA San Andreas", descripcion: "CJ vuelve a Los Santos para tomar el control del barrio.", precio: "$6,800", img: "./recursos/Gta San Andreas.jfif" },
    { nombre: "Lego Batman", descripcion: "Gotham necesita a un héroe… ¡de bloques!", precio: "$5,700", img: "./recursos/Lego batman.jpg" },
    { nombre: "Need for Speed Carbon", descripcion: "Conquistá la ciudad, una carrera callejera a la vez.", precio: "$6,400", img: "./recursos/Need for Speed Carbon.jpg" },
    { nombre: "God Of War", descripcion: "El inicio sangriento de la leyenda de Kratos.", precio: "$7,000", img: "./recursos/God Of War.jpg" },
    { nombre: "Ben 10", descripcion: "Usá el Omnitrix y salvá al mundo con tus alienígenas.", precio: "$5,500", img: "./recursos/Ben 10.jpg" },
    { nombre: "Toy Story 3", descripcion: "Unite a Woody y Buzz en una nueva aventura llena de nostalgia.", precio: "$6,400", img: "./recursos/Toy Story 3.jpg" },
    { nombre: "GTA III", descripcion: "La revolución del mundo abierto comenzó acá. Libertad total.", precio: "$7,400", img: "./recursos/Gta III.jpg" },
    { nombre: "Up", descripcion: "Viví la increíble aventura de Carl y Russell en los cielos.", precio: "$5,200", img: "./recursos/Up.jpg" },
    { nombre: "GTA Vice City", descripcion: "Estilo, neón y crimen en los años 80. Tommy Vercetti manda.", precio: "$6,600", img: "./recursos/GTA Vice City.jpg" },
    { nombre: "Madagascar", descripcion: "Escapá del zoológico y explorá la jungla con Alex y sus amigos.", precio: "$6,000", img: "./recursos/Madagascar.jpg" },
    { nombre: "Mortal Kombat Shaolin Monks", descripcion: "Reviví el torneo con Liu Kang y Kung Lao en modo cooperativo brutal.", precio: "$7,900", img: "./recursos/Mortal Kombat Shaolin Monks.jpg" }
  ];

  // Productos destacados (solo para index)
  const destacados = [productos[0], productos[1], productos[2]];

  // Función para renderizar productos
  function renderProductos(lista, containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    container.innerHTML = '';
    lista.forEach(p => {
      const div = document.createElement('div');
      div.classList.add('producto');
      div.innerHTML = `
        <img src="${p.img}" alt="${p.nombre}">
        <h3>${p.nombre}</h3>
        <p class="descripcion">${p.descripcion}</p>
        <p class="precio">${p.precio}</p>
        <button class="agregar">Agregar</button>
      `;
      container.appendChild(div);
      div.querySelector('.agregar').addEventListener('click', () => {
        carrito.push(p);
        guardarCarrito();
        alertaAgregado(p);
      });
    });
  }

  // Página de inicio
  if (window.location.pathname.includes('index.html')) {
    renderProductos(destacados, '.productos-destacados .productos');
  }

  // Página de catálogo
  if (window.location.pathname.includes('catalogo.html')) {
    renderProductos(productos, '.catalogo .productos');
  }

  // Página de carrito
  if (window.location.pathname.includes('carrito.html')) {
    const cartContainer = document.querySelector('.carrito-lista');
    if (cartContainer) {
      cartContainer.innerHTML = '';
      if (carrito.length === 0) {
        cartContainer.innerHTML = '<p>Tu carrito está vacío.</p>';
      } else {
        carrito.forEach((p, index) => {
          const item = document.createElement('div');
          item.classList.add('item-carrito');
          item.innerHTML = `
            <img src="${p.img}" alt="${p.nombre}">
            <h3>${p.nombre}</h3>
            <p class="precio">${p.precio}</p>
            <button class="eliminar">Eliminar</button>
          `;
          item.querySelector('.eliminar').addEventListener('click', () => {
            carrito.splice(index, 1);
            guardarCarrito();
            location.reload(); // recarga para actualizar la vista
          });
          cartContainer.appendChild(item);
        });

        // Calcular total
        let total = carrito.reduce((sum, p) => {
          return sum + parseFloat(p.precio.replace('$','').replace(',',''));
        }, 0);

        const totalElement = document.createElement('p');
        totalElement.innerHTML = `<strong>Total: $${total.toLocaleString()}</strong>`;
        totalElement.style.color = '#ffcc00';
        totalElement.style.fontSize = '1.2rem';
        totalElement.style.marginTop = '20px';
        cartContainer.appendChild(totalElement);
      }
    }
  }
});
