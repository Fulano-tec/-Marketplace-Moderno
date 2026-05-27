const cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartGrid = document.getElementById("cartGrid");
const cartTotal = document.getElementById("cartTotal");

// RENDERIZA O CARRINHO
function renderCart() {

    cartGrid.innerHTML = "";

    // CARRINHO VAZIO
    if (cart.length === 0) {

        cartGrid.innerHTML = `
            <h2 style="text-align:center; width:100%; color:#94a3b8;">
                Seu carrinho está vazio 🛒
            </h2>
        `;

        cartTotal.textContent = "Total: R$ 0";

        return;
    }

    // RENDERIZA PRODUTOS
    cart.forEach(product => {

        const card = document.createElement("div");
        card.classList.add("product-card");

        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">

            <h3>${product.name}</h3>

            <p>${product.desc || ""}</p>

            <h4 class="price">
                R$ ${Number(product.price || 0).toLocaleString("pt-BR")}
            </h4>

            <button class="btn remove-btn">
                Remover
            </button>
        `;

        // REMOVER ITEM
        const removeBtn = card.querySelector(".remove-btn");

        removeBtn.addEventListener("click", () => {

            const updatedCart = cart.filter(item => item.id !== product.id);

            localStorage.setItem("cart", JSON.stringify(updatedCart));

            // atualiza estado sem reload
            cart.length = 0;
            cart.push(...updatedCart);

            renderCart();
        });

        cartGrid.appendChild(card);
    });

    // TOTAL DO CARRINHO
    const total = cart.reduce((acc, product) => {
        return acc + (product.price || 0);
    }, 0);

    cartTotal.textContent = `Total: R$ ${total.toLocaleString("pt-BR")}`;
}

// INICIALIZA
renderCart();