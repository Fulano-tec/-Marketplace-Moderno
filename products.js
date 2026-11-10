// Dados centralizados de produtos — fonte única da verdade
const PRODUCTS = [
  {
    id: 1,
    name: "Carro Esportivo",
    desc: "Alta performance, design aerodinâmico e tecnologia de ponta.",
    price: 250000,
    category: "vehicles",
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80"
  },
  {
    id: 2,
    name: "SUV Premium",
    desc: "Conforto, potência e segurança para qualquer terreno.",
    price: 320000,
    category: "vehicles",
    badge: "Luxo",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80"
  },
  {
    id: 3,
    name: "Moto Esportiva",
    desc: "Agilidade urbana e performance em alta velocidade.",
    price: 85000,
    category: "vehicles",
    badge: "Novo",
    image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&q=80"
  },
  {
    id: 4,
    name: "Pickup Off-road",
    desc: "Força e resistência para aventuras extremas.",
    price: 180000,
    category: "vehicles",
    badge: "Oferta",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80"
  },
  {
    id: 5,
    name: "Notebook Gamer",
    desc: "Alta performance para jogos e produtividade profissional.",
    price: 8500,
    category: "electronics",
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?w=800&q=80"
  },
  {
    id: 6,
    name: "Smartphone Premium",
    desc: "Câmera profissional, tela AMOLED e bateria de longa duração.",
    price: 4200,
    category: "electronics",
    badge: "Oferta",
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&q=80"
  },
  {
    id: 7,
    name: "Headset Gamer",
    desc: "Som imersivo 7.1 e microfone com cancelamento de ruído.",
    price: 650,
    category: "electronics",
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1599669454699-2488947186d2?w=800&q=80"
  },
  {
    id: 8,
    name: "Smartwatch Pro",
    desc: "Monitoramento completo de saúde, GPS e esportes.",
    price: 1200,
    category: "electronics",
    badge: "Novo",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80"
  },
  {
    id: 9,
    name: "Smart TV 4K",
    desc: "Imagem ultra realista, HDR e sistema inteligente.",
    price: 4800,
    category: "electronics",
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&q=80"
  },
  {
    id: 10,
    name: "Sofá Premium",
    desc: "Conforto sofisticado e design contemporâneo para sua sala.",
    price: 3200,
    category: "furniture",
    badge: "Oferta",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80"
  },
  {
    id: 11,
    name: "Mesa Minimalista",
    desc: "Design clean, madeira nobre e acabamento premium.",
    price: 2400,
    category: "furniture",
    badge: "Novo",
    image: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800&q=80"
  },
  {
    id: 12,
    name: "Cadeira Ergonômica",
    desc: "Ajuste total de postura para longas horas de trabalho.",
    price: 1800,
    category: "furniture",
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=80"
  },
  {
    id: 13,
    name: "Estante Moderna",
    desc: "Organização elegante e visual sofisticado.",
    price: 2900,
    category: "furniture",
    badge: "Luxo",
    image: "https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?w=800&q=80"
  }
];

function formatPrice(value) {
  return Number(value || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0
  });
}

function getCart() {
  return JSON.parse(localStorage.getItem("cart") || "[]");
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  window.dispatchEvent(new CustomEvent("cartUpdated"));
}

function getCartCount() {
  return getCart().reduce((sum, item) => sum + (item.qty || 1), 0);
}

function getCartTotal() {
  return getCart().reduce((sum, item) => sum + (item.price || 0) * (item.qty || 1), 0);
}

function addToCart(product, qty = 1) {
  const cart = getCart();
  const existing = cart.find((i) => i.id === product.id);

  if (existing) {
    existing.qty = (existing.qty || 1) + qty;
  } else {
    cart.push({ ...product, qty });
  }

  saveCart(cart);
  showToast(`${product.name} adicionado ao carrinho`);
}

function removeFromCart(id) {
  const cart = getCart().filter((i) => i.id !== id);
  saveCart(cart);
}

function updateQty(id, qty) {
  const cart = getCart();
  const item = cart.find((i) => i.id === id);
  if (!item) return;

  if (qty <= 0) {
    removeFromCart(id);
  } else {
    item.qty = qty;
    saveCart(cart);
  }
}

function getWishlist() {
  return JSON.parse(localStorage.getItem("wishlist") || "[]");
}

function toggleWishlist(id) {
  let list = getWishlist();
  if (list.includes(id)) {
    list = list.filter((x) => x !== id);
    showToast("Removido dos favoritos");
  } else {
    list.push(id);
    showToast("Adicionado aos favoritos");
  }
  localStorage.setItem("wishlist", JSON.stringify(list));
  window.dispatchEvent(new CustomEvent("wishlistUpdated"));
  return list.includes(id);
}

function isInWishlist(id) {
  return getWishlist().includes(id);
}

function showToast(message, type = "success") {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.className = `toast show ${type}`;
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove("show"), 2600);
}
