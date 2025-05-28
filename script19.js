let currentUser = null;
let cart = [];

const sampleProducts = [
  { id: 1, name: "Camisa Azul", price: 125 },
  { id: 2, name: "Pantalón Jeans", price: 240 },
  { id: 3, name: "Zapatos Negros", price: 360 },
  { id: 4, name: "Chaqueta", price: 480 }
];

function showSection(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}

function navigate(section) {
  if (!currentUser) {
    alert("Debes iniciar sesión primero.");
    return;
  }
  showSection(section);
  if (section === 'products') loadProducts();
  if (section === 'cart') updateCart();
  if (section === 'payment') updatePaymentAmount();
  if (section === 'account') document.getElementById('account-info').innerText = `Bienvenido, ${currentUser.username}`;
}

function showRegister() {
  showSection('register');
}

function register() {
  const username = document.getElementById('new-username').value;
  const password = document.getElementById('new-password').value;
  const users = JSON.parse(localStorage.getItem('users') || "[]");

  if (users.find(u => u.username === username)) {
    alert("El usuario ya existe.");
    return;
  }

  users.push({ username, password });
  localStorage.setItem('users', JSON.stringify(users));
  alert("Usuario registrado con éxito.");
  showSection('login');
}

function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const users = JSON.parse(localStorage.getItem('users') || "[]");
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    currentUser = user;
    alert("¡Bienvenido!");
    navigate('products');
  } else {
    alert("Credenciales incorrectas.");
  }
}

function logout() {
  currentUser = null;
  cart = [];
  alert("Sesión cerrada.");
  showSection('login');
}

function loadProducts() {
  const container = document.getElementById('product-list');
  container.innerHTML = "";
  sampleProducts.forEach(p => {
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `<strong>${p.name}</strong><br>Precio: $${p.price}<br><button onclick="addToCart(${p.id})">Agregar al carrito</button>`;
    container.appendChild(div);
  });
}

function addToCart(productId) {
  const product = sampleProducts.find(p => p.id === productId);
  cart.push(product);
  alert(`${product.name} agregado al carrito.`);
}

function updateCart() {
  const container = document.getElementById('cart-list');
  container.innerHTML = "";

  cart.forEach((item, index) => {
    const div = document.createElement('div');
    div.innerHTML = `${item.name} - $${item.price} <button onclick="removeFromCart(${index})">Eliminar</button>`;
    container.appendChild(div);
  });

  const total = cart.reduce((acc, p) => acc + p.price, 0);
  document.getElementById('total').innerText = total;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

function updatePaymentAmount() {
  const total = cart.reduce((acc, p) => acc + p.price, 0);
  document.getElementById('payment-amount').innerText = total;
}

function simulatePayment() {
  if (cart.length === 0) {
    alert("El carrito está vacío.");
    return;
  }
  alert("Pago simulado exitosamente. Gracias por su compra.");
  cart = [];
  updateCart();
  updatePaymentAmount();
}