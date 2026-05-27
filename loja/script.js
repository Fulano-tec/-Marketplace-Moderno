document.addEventListener("DOMContentLoaded", () => {

    const products = [
        {
            id: 1,
            name: "Carro Esportivo",
            desc: "Alta performance e design moderno.",
            price: 250000,
            badge: "Novo",
            image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7"
        },

        {
            id: 2,
            name: "Notebook Gamer",
            desc: "Potência para jogos e trabalho.",
            price: 8500,
            badge: "Popular",
            image: "https://images.unsplash.com/photo-1517336714739-489689fd1ca8"
        },

        {
            id: 3,
            name: "Sofá Premium",
            desc: "Conforto e elegância para sua casa.",
            price: 3200,
            badge: "Popular",
            image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
        },

        {
            id: 4,
            name: "Smart TV 4K",
            desc: "Imagem ultra realista e qualidade superior.",
            price: 4800,
            badge: "Popular",
            image: "https://images.unsplash.com/photo-1593784991095-a205069470b6"
        }
    ];

    const grid = document.querySelector(".product-grid");

    const toast = document.getElementById("toast");

    const modal = document.getElementById("modal");

    const modalTitle = document.getElementById("modal-title");

    const modalDescription = document.getElementById("modal-description");

    const closeModal = document.querySelector(".close-modal");

    const searchInput = document.getElementById("searchInput");

    const cartBtn = document.querySelector(".cart");

    const themeToggle = document.getElementById("themeToggle");

    const nav = document.getElementById("nav");

    const menuToggle = document.getElementById("menuToggle");

    // FECHAR MODAL
    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {

        if (e.target === modal) {
            modal.style.display = "none";
        }

    });

    // ATUALIZAR CARRINHO
    function updateCartUI() {

        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        cartBtn.textContent = `Carrinho (${cart.length})`;

    }

    updateCartUI();

    // RENDERIZAR PRODUTOS
    function renderProducts(filteredProducts) {

        grid.innerHTML = "";

        filteredProducts.forEach(product => {

            const card = document.createElement("div");

            card.classList.add("product-card");

            card.innerHTML = `
                <div class="badge">
                    ${product.badge}
                </div>

                <img src="${product.image}" alt="${product.name}">

                <h3>${product.name}</h3>

                <p>${product.desc}</p>

                <h4 class="price">
                    R$ ${product.price.toLocaleString("pt-BR")}
                </h4>

                <button class="btn-primary">
                    Adicionar ao Carrinho
                </button>
            `;

            // MODAL
            card.addEventListener("click", () => {

                modal.style.display = "flex";

                modalTitle.textContent = product.name;

                modalDescription.textContent = product.desc;

            });

            // BOTÃO CARRINHO
            const addBtn = card.querySelector(".btn-primary");

            addBtn.addEventListener("click", (e) => {

                e.stopPropagation();

                let cart = JSON.parse(localStorage.getItem("cart")) || [];

                cart.push(product);

                localStorage.setItem("cart", JSON.stringify(cart));

                updateCartUI();

                toast.classList.add("show");

                setTimeout(() => {

                    toast.classList.remove("show");

                }, 2000);

            });

            grid.appendChild(card);

        });

    }

    renderProducts(products);

    // BUSCA
    searchInput.addEventListener("input", () => {

        const value = searchInput.value.toLowerCase();

        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(value)
        );

        renderProducts(filteredProducts);

    });

    // DARK MODE
    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("light-mode");

        if (document.body.classList.contains("light-mode")) {

            localStorage.setItem("theme", "light");

        } else {

            localStorage.setItem("theme", "dark");

        }

    });

    // CARREGAR TEMA
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {

        document.body.classList.add("light-mode");

    }

    // MENU MOBILE
    menuToggle.addEventListener("click", () => {

        nav.classList.toggle("active");

    });

});