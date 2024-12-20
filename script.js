let cart = JSON.parse(localStorage.getItem('cart')) || [];
let total = parseInt(localStorage.getItem('total')) || 0;

function addToCart(productName, productPrice) {
    cart.push({ name: productName, price: productPrice });
    total += productPrice;
    updateCartDisplay();
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('total', total);
    alert(productName + " добавлений до кошика!");
}

function removeFromCart(index) {
    total -= cart[index].price;
    cart.splice(index, 1);
    updateCartDisplay();
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('total', total);
}

function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Очистити попередній список

    cart.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.textContent = item.name + ' - ' + item.price + ' грн ';

        // Додавання кнопки видалення
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Видалити';
        removeButton.onclick = () => removeFromCart(index);
        itemDiv.appendChild(removeButton);

        cartItemsContainer.appendChild(itemDiv);
    });

    document.getElementById('cart-total').textContent = 'Разом: ' + total + ' грн';
}

function checkout() {
    if (cart.length === 0) {
        alert("Ваш кошик порожній!");
        return;
    }

    alert("Дякуємо за покупку! Ваше замовлення оформлено.");
    cart = []; // Очищення кошика
    total = 0; // Скидання загальної суми
    localStorage.removeItem('cart');
    localStorage.removeItem('total');
    updateCartDisplay(); // Оновлення відображення кошика
}

// Для відображення деталей на окремій сторінці
function showDetails(smartphone) {
    window.location.href = `product.html?product=${smartphone}`;
}

// Скидання кошика при переході на іншу сторінку
function clearCart() {
    cart = [];
    total = 0;
}
