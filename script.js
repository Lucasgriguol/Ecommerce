document.addEventListener("DOMContentLoaded", function () {
    const carrito = [];
    const carritoIcono = document.querySelector('.carrito');
    const carritoModal = document.createElement('div');
    carritoModal.classList.add('carrito-modal');
    carritoModal.style.display = 'none';
    document.body.appendChild(carritoModal);

    // Datos de productos
    const productos = [
        { id: 1, nombre: "Need for Speed Underground 2", precio: "$7500", img: "./recursos/Need For Speed Underground 2.jfif", descripcion: "Tunea tu coche y dominá las calles nocturnas." },
        { id: 2, nombre: "Transformers The Game", precio: "$6000", img: "./recursos/Transformers The Game.jpg", descripcion: "Autobots vs Decepticons en una guerra explosiva." },
        { id: 3, nombre: "The Simpsons: Hit and Run", precio: "$5900", img: "./recursos/The Simpsons Hit and Run.jpg", descripcion: "Springfield se convierte en tu patio de juegos." },
        { id: 4, nombre: "Cars", precio: "$6200", img: "./recursos/Cars.jpg", descripcion: "Viví la carrera con Rayo McQueen y sus amigos." },
        { id: 5, nombre: "Dragon Ball Z: Budokai Tenkaichi 3", precio: "$8000", img: "./recursos/Dragon Ball Z Budokai Tenkaichi 3.jpg", descripcion: "Más de 150 personajes en combates 3D brutales." },
        { id: 6, nombre: "God of War II", precio: "$7200", img: "./recursos/God Of War II.jfif", descripcion: "Kratos desata su furia contra los dioses del Olimpo." },
        { id: 7, nombre: "Resident Evil 4", precio: "$7100", img: "./recursos/Resident Evil 4.jpg", descripcion: "Leon Kennedy enfrenta el horror en una aldea maldita." },
        { id: 8, nombre: "GTA San Andreas", precio: "$6800", img: "./recursos/Gta San Andreas.jfif", descripcion: "CJ vuelve a Los Santos para tomar el control del barrio." },
        { id: 9, nombre: "Lego Batman", precio: "$5700", img: "./recursos/Lego batman.jpg", descripcion: "Gotham necesita a un héroe… ¡de bloques!" },
        { id: 10, nombre: "Need for Speed Carbon", precio:" $6400", img: "./recursos/Need for Speed Carbon.jpg", descripcion: "Conquistá la ciudad, una carrera callejera a la vez." },
        { id: 11, nombre: "God Of War", precio: "$7000", img: "./recursos/God Of War.jpg", descripcion: "El inicio sangriento de la leyenda de Kratos." },
        { id: 12, nombre: "Ben 10", precio: "$5500", img: "./recursos/Ben 10.jpg", descripcion: "Usá el Omnitrix y salvá al mundo con tus alienígenas." },
        { id: 13, nombre: "Toy Story 3", precio:" $6400", img: "./recursos/Toy Story 3.jpg", descripcion: "Unite a Woody y Buzz en una nueva aventura llena de nostalgia." },
        { id: 14, nombre: "GTA III", precio: "$7400", img: "./recursos/Gta III.jpg", descripcion: "La revolución del mundo abierto comenzó acá. Libertad total." },
        { id: 15, nombre: "Up", precio: "$5200", img: "./recursos/Up.jpg", descripcion: "Viví la increíble aventura de Carl y Russell en los cielos." },
        { id: 16, nombre: "GTA Vice City", precio: "$6600", img: "./recursos/GTA Vice City.jpg", descripcion: "Estilo, neón y crimen en los años 80. Tommy Vercetti manda." },
        { id: 17, nombre: "Madagascar", precio: "$6000", img: "./recursos/Madagascar.jpg", descripcion: "Escapá del zoológico y explorá la jungla con Alex y sus amigos." },
        { id: 18, nombre: "Mortal Kombat Shaolin Monks", precio: "$7900", img: "./recursos/Mortal Kombat Shaolin Monks.jpg", descripcion: "Reviví el torneo con Liu Kang y Kung Lao en modo cooperativo brutal." }
    ];
    // Productos destacados
    const productosDestacados = [
        productos[0], // Los primeros tres productos
        productos[1],
        productos[2]
    ];

    // Función para mostrar el carrito
    function mostrarCarrito() {
        if (carrito.length === 0) {
            carritoModal.innerHTML = "<p>El carrito está vacío</p>";
        } else {
            carritoModal.innerHTML = "<h3>Productos en tu carrito:</h3>";
            carrito.forEach(producto => {
                carritoModal.innerHTML += `
                    <div>
                        <p><strong>${producto.nombre}</strong> - ${producto.precio}</p>
                    </div>
                `;
            });
        }
        carritoModal.style.display = 'block';
    }

    // Ocultar el carrito
    carritoIcono.addEventListener('click', () => {
        carritoModal.style.display = carritoModal.style.display === 'none' ? 'block' : 'none';
    });

    // Función para agregar productos al carrito
    function agregarAlCarrito(producto) {
        carrito.push(producto);

        // Usando SweetAlert2 para mostrar un mensaje atractivo
        Swal.fire({
            icon: 'success',
            title: '¡Producto agregado!',
            text: `${producto.nombre} se ha agregado al carrito con éxito.`,
            confirmButtonText: '¡Genial!',
            background: '#222',
            color: '#fff',
            confirmButtonColor: '#00ff00'
        });
    }

    // Agregar productos destacados solo en la página de inicio
    if (window.location.pathname.includes("index.html")) {
        const productosDestacadosContainer = document.querySelector('.productos-destacados .productos');
        productosDestacados.forEach(producto => {
            const productoDiv = document.createElement('div');
            productoDiv.classList.add('producto');
            productoDiv.innerHTML = `
                <img src="${producto.img}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p class="descripcion">${producto.descripcion}</p>
                <p class="precio">${producto.precio}</p>
                <button class="agregar">Agregar</button>
            `;
            productosDestacadosContainer.appendChild(productoDiv);

            // Añadir evento a los botones de agregar
            const botonAgregar = productoDiv.querySelector('.agregar');
            botonAgregar.addEventListener('click', () => {
                agregarAlCarrito(producto);
            });
        });
    }

    // Agregar productos completos solo en la página de catálogo
    if (window.location.pathname.includes("catalogo.html")) {
        const productosContainer = document.querySelector('.catalogo .productos');
        productos.forEach(producto => {
            const productoDiv = document.createElement('div');
            productoDiv.classList.add('producto');
            productoDiv.innerHTML = `
                <img src="${producto.img}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p class="descripcion">${producto.descripcion}</p>
                <p class="precio">${producto.precio}</p>
                <button class="agregar">Agregar</button>
            `;
            productosContainer.appendChild(productoDiv);

            // Añadir evento a los botones de agregar
            const botonAgregar = productoDiv.querySelector('.agregar');
            botonAgregar.addEventListener('click', () => {
                agregarAlCarrito(producto);
            });
        });
    }
});
