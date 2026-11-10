# 🛒 Marketplace Moderno

E-commerce front-end premium feito com **HTML, CSS e JavaScript puro**.

## ✨ O que melhorou

### Design
- Design system com CSS variables (dark / light)
- Header sticky com blur, badge do carrinho e menu mobile
- Cards de produto com hover, badges coloridos e favoritos
- Tipografia Inter, espaçamentos consistentes e micro-animações
- Layout responsivo (desktop → mobile)

### Funcionalidades
- **Catálogo centralizado** (`products.js`) — uma fonte de verdade
- **Carrinho com quantidades** (+ / − / remover) e resumo de pedido
- **Favoritos** (wishlist) com LocalStorage
- **Busca + ordenação** na home e em cada categoria
- **Checkout** que grava pedidos e limpa o carrinho
- **Toast** unificado em todas as páginas
- **Tema claro/escuro** persistente
- **Admin** com métricas e histórico de pedidos locais
- Header e footer **compartilhados** (`common.js`)

## 📂 Estrutura

```
marketplace/
├── index.html
├── vehicles.html
├── electronics.html
├── furniture.html
├── cart.html
├── checkout.html
├── login.html
├── register.html
├── about.html
├── admin.html
├── products.js      # dados + helpers do carrinho
├── common.js        # header, footer, cards, tema
├── style.css
└── README.md
```

## 🚀 Como usar

Abra `index.html` no navegador (ou use um servidor local):

```bash
npx serve .
# ou
python -m http.server 5500
```

## 🧠 Tecnologias

- HTML5
- CSS3 (variáveis, grid, flex, animações)
- JavaScript Vanilla (LocalStorage, eventos customizados)

## 📌 Status

✔ Versão portfólio completa e funcional
