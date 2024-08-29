class Shop {
    constructor() {
        this.products = fetch("./products.json")
            .then(response => response.json());
        this.cart = new Cart([]);
        this.cartDisplay = null;
    }

    static build(){
        const shop = new Shop();
        displayShop(shop);
        return shop;
    }
}

class Cart {
    constructor(products) {
        this.products = products;
    }
}


function displayProductInfo(shop, product) {
    const productInfo = createNode("div", {class: "product"},
        createNode("h3", {}, document.createTextNode(`${product.name}`)),
        createNode("img", {src: "images/box128x128.png", class: "product-img"}, document.createTextNode(`${product.name}`)),
        createNode("p", {class: "product-price"}, document.createTextNode(`$${product.price}`)),
        displayProductForm(shop, product),
        createNode("p", {class: "product-stock"}, document.createTextNode(
            `${(product.stock > 0) ? 'Stock: ' + product.stock : 'No stock'}`)),
    )
    return productInfo;
}


function displayProductForm(shop, product) {
    const addForm = createNode("form", {class: "add-product-form"},
        createNode("div", {class: "num-imput"}, 
            createNode("label", {for: "num-input"}, document.createTextNode("Order : ")),
            createNode("input", {
                id: "num-sel",
                name: "num-sel",
                type: "number",
                min: "1",
                max: `${product.stock}`,
                required: "true",
                value: "1"
            })
        ),
        createNode("button", {class: "add-btn", type: "submit"}, document.createTextNode("Add"))
    )


    addForm.addEventListener('submit', (event) => {
        // "En el JSON, cambiar el stock"
        event.preventDefault();
        shop.cart = new Cart([...shop.cart.products, 
            {
                name: product.name,
                amount: event.target['num-sel'].value,
                price: `$${product.price}` 
            }
        ])
    });

    return addForm;
}


async function displayShop(shop) {
    const container = document.querySelector('.products');
    const cartBtn = document.querySelector('.cart-btn');


    let products = await shop.products;

    for (const product of products) {
        const productInfo = displayProductInfo(shop, product);
        container.append(productInfo);
    }

    cartBtn.addEventListener('click', () => {
        const body = document.querySelector('body');

        if (shop.cartDisplay) {
            shop.cartDisplay.remove();
            shop.cartDisplay = null;
        } else {
            console.log(cartBtn.offsetHeight)
            shop.cartDisplay = createNode("div", {class: "cart", style: `top: ${cartBtn.offsetHeight}px`},
                ...shop.cart.products.map(product => {
                    return createNode("div", {class: "cart-product"}, 
                        createNode("button", {class: "delete-btn"}, document.createTextNode("X")),
                        createNode("h3", {}, document.createTextNode(product.name)),
                        createNode("p", {}, document.createTextNode(product.price)),
                        createNode("p", {}, document.createTextNode(product.amount)),
                    )
                })
            );

            if (shop.cart.products.length == 0) {
                shop.cartDisplay.textContent = "No products";
            }
            body.appendChild(shop.cartDisplay);
        }
    })
} 


function createNode(name, attrs, ...children) {
    let node = document.createElement(name);

    for (let attr of Object.keys(attrs)) {
        node.setAttribute(attr, attrs[attr]);
    }
    for (let child of children) {
        node.appendChild(child);
    }
    return node;
}


Shop.build();
