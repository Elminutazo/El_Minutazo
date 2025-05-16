const products = [
    {
        name: "Minuta de Fresa",
        category: "minutas",
        image: "img/minuta-fresa.jpeg",
        description: "Disponible en tamaño pequeño y grande."
    },
    {
        name: "Minuta de Tamarindo",
        category: "minutas",
        image: "img/minuta-tamarindo.jpg",
        description: "Ideal para los amantes de lo ácido."
    },
    {
        name: "Minuta de mango",
        category: "minutas",
        image: "img/minuta-tamarindo.jpg",
        description: "Ideal para los amantes de lo ácido/dulce."
    },
    {
        name: "Minuta de coco",
        category: "minutas",
        image: "img/minuta-tamarindo.jpg",
        description: "Ideal para los amantes de lo fresco."
    },
    {
        name: "Fresas con Crema",
        category: "fresas",
        image: "img/fresas-crema.jpg",
        description: "Fresas frescas con crema dulce casera."
    },
     {
        name: "Fresas con Crema y chispas",
        category: "fresas",
        image: "img/fresas-crema.jpg",
        description: "Fresas frescas con chispas y toppings a tu gusto."
    },
     {
        name: "Fresas con Crema y chocolate",
        category: "fresas",
        image: "img/fresas-crema.jpg",
        description: "Fresas frescas con chispas y toppings a tu gusto."
    },
    {
        name: "Churros preparados",
        category: "snacks",
        image: "img/churros.jpeg",
        description: "Ricos churros preparados a tu gusto."
    },
    {
        name: "Charamuscas",
        category: "snacks",
        image: "img/gomitas.jpg",
        description: "Te helan el palador con sus distintos sabores frutales."
    }
    // Producto duplicado eliminado
];

// Variables para el scroll
let lastScrollTop = 0;
const navbar = document.getElementById('navbar');
const logo = document.querySelector('.logo');
const header = document.querySelector('header');

// Evento para manejar el scroll
window.addEventListener('scroll', function () {
    if (!navbar || !logo || !header) return;

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        // Scroll hacia abajo
        navbar.style.top = '-80px';
        if (!logo.classList.contains('hidden')) logo.classList.add('hidden');
        if (!header.classList.contains('hidden')) header.classList.add('hidden');
    } else {
        // Scroll hacia arriba
        navbar.style.top = '0';
        logo.classList.remove('hidden');
        header.classList.remove('hidden');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Evitar valores negativos
});

// Función para crear la tarjeta de producto
function createProductCard(product) {
    return `
        <div class="card">
            <img src="${product.image}" alt="${product.name}" onerror="this.src='img/default-image.jpg'">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
        </div>
    `;
}

// Función para mostrar productos filtrados
function displayProducts(filtered = 'todos') {
    const catalog = document.getElementById("catalogo");
    if (!catalog) return;

    const filteredProducts = filtered === 'todos'
        ? products
        : products.filter(p => p.category === filtered);

    catalog.innerHTML = filteredProducts.map(createProductCard).join('');
}

// Función para filtrar productos por categoría
function filterProducts(category) {
    const validCategories = ['todos', 'minutas', 'fresas', 'snacks'];
    const aboutSection = document.querySelector('.about');
    const homeSection = document.getElementById('home');
    const menu = document.querySelector('#navbar ul');

    if (!validCategories.includes(category)) {
        console.error('Categoría no válida:', category);
        return;
    }

    if (aboutSection && homeSection) {
        if (category === 'todos') {
            aboutSection.style.display = 'block';
            homeSection.style.display = 'block';
        } else {
            aboutSection.style.display = 'none';
            homeSection.style.display = 'none';
        }
    }

    // Ocultar el menú hamburguesa si está visible
    if (menu && menu.classList.contains('show')) {
        menu.classList.remove('show');
    }

    displayProducts(category);
}


// Función para el menú responsive
function toggleMenu() {
    const menu = document.querySelector('#navbar ul');
    if (menu) {
        menu.classList.toggle('show');
    }
}

// Mostrar todos los productos al cargar la página
window.onload = () => displayProducts();
