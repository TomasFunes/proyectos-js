export const fetchProducts = async () => {
    const container = document.querySelector('.products-container');

    let response = await fetch('./products.json');
    let products = await response.json();

    console.log(products)
    for (const product of products) {
        const productContainer = document.createElement('div');
        const productName = document.createElement('h3');
        const productImg = document.createElement('img');
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

        numInput.className = 'num-input';
        btnDiv.className = 'add-btn';

        addForm.className = 'add-product-form';
        addForm.append(numInput, btnDiv);

        numInput.append(inputLabel, input);

        // Other setup
        productName.textContent = `${product.name}`;

        productImg.setAttribute('src', 'box.png');
        productImg.className = 'product-img';

        container.append(productName, productImg, addForm);
    }
} 