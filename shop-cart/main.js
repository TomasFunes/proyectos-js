const cartBtn = document.querySelector('.cart-btn');
const body = document.querySelector('body');
const container = document.querySelector('.products-container');


let cartProducts = [];

const fetchProducts = async () => {

    let response = await fetch('./products.json');
    let products = await response.json();

    console.log(products)
    for (const product of products) {
        const productContainer = document.createElement('div');
        const productName = document.createElement('h3');
        const productImg = document.createElement('img');
        const productPrice = document.createElement('p');
        const productStock = document.createElement('p');
        const addForm = document.createElement('form');

        // form elements
        const numInput = document.createElement('div');
        const inputLabel = document.createElement('label');
        const input = document.createElement('input');
        const btnDiv = document.createElement('div');
        const addBtn = document.createElement('button');

        // form setup
        inputLabel.setAttribute('for', 'num-input');
        inputLabel.textContent = 'Order: ';

        input.setAttribute('id', 'num-sel');
        input.setAttribute('name', 'num-sel');
        input.setAttribute('type', 'number');
        input.setAttribute('min', '1');
        input.setAttribute('max', `${product.stock}`);
        input.setAttribute('required', 'true');
        input.setAttribute('value', '1');

        addBtn.textContent = 'Add';

        numInput.className = 'num-input';
        btnDiv.className = 'add-btn';

        addForm.className = 'add-product-form';
        addForm.append(numInput, btnDiv);

        numInput.append(inputLabel, input);
        btnDiv.append(addBtn);

        addForm.addEventListener('submit', (event) => {
            event.preventDefault();

            cartProducts = cartProducts.filter(cartProduct => cartProduct.name !== product.name);

            cartProducts = [
                ...cartProducts,
                {
                    name: product.name,
                    amount: event.target['num-sel'].value,
                    price: `$${product.price}` 
                }
            ]
        })
        // Other setup
        productName.textContent = `${product.name}`;

        productImg.setAttribute('src', 'images/box128x128.png');
        productImg.className = 'product-img';

        productPrice.className = 'product-price';
        productPrice.textContent = `$${product.price}`;

        productStock.className = 'product-stock';
        productStock.textContent = `${(product.stock > 0) ? 'Stock: ' + product.stock : 'No stock'}`;

        productContainer.append(productName, productImg, productPrice, addForm, productStock);
        productContainer.className = 'product';

        container.append(productContainer);
    }
} 

fetchProducts();

cartBtn.addEventListener('click', () => {
    let cart = document.querySelector('.cart-container');

    if (cart === null) {
        cart = document.createElement('div');
        cart.className = 'cart-container';
        body.appendChild(cart);
    }

    if (!cart.classList.contains('active')) {
        for (const product of cartProducts) {
            const productContainer = document.createElement('div');
            productContainer.className = 'cart-product';
            const name = document.createElement('h3');
            const price = document.createElement('p');
            const amount = document.createElement('p');
            const deleteBtn = document.createElement('button');

            name.textContent = product.name;
            price.textContent = product.price;
            amount.textContent = product.amount;
            deleteBtn.textContent = 'X';

            name.className = 'product-name';
            price.className = 'product-price';
            amount.className = 'product-amount';
            deleteBtn.className = 'delete-btn';

            deleteBtn.addEventListener('click', () => {
                const productNode = deleteBtn.parentNode;
                productNode.remove();

                cartProducts = cartProducts.filter(cartProducts => cartProducts !== product);

                if (cartProducts.length === 0) {
                    cart.remove();
                    cartBtn.classList.remove('active');
                }


            })

            productContainer.appendChild(name);
            productContainer.appendChild(price);
            productContainer.appendChild(amount);
            productContainer.appendChild(deleteBtn);

            cart.appendChild(productContainer);
        }

        if(cartProducts.length === 0) {
            const msg = document.createElement('p');
            msg.textContent = 'You can see your chosen products here!';
            msg.className = 'msg';
            cart.appendChild(msg);
        }

        cart.classList.add('active');
        cartBtn.classList.add('active');

    } else {
       cart.remove(); 
       cartBtn.classList.remove('active');
    }


})


