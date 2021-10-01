const removeCartItemButtons = document.querySelectorAll('.btn-danger');
const quantityInputs = document.querySelectorAll('.cart-quantity-input');
const addToCartButtons = document.querySelectorAll('.shop-item-btn');
const purchaseButton = document.querySelector('.btn-purchase');

removeCartItemButtons.forEach( btn => {
    btn.addEventListener('click',removeCartItem);
})

quantityInputs.forEach(input => {
    input.addEventListener('change',quantityChanged)
})

addToCartButtons.forEach(btn => {
    btn.addEventListener('click',addToCartClicked)
})

purchaseButton.addEventListener('click',purchaseClicked);

function purchaseClicked(e){
    alert('Thank You for your purchase.');
    const cartItems = document.querySelector('.cart-items');
    while(cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal();
}


function addToCartClicked(e){
    const btn = e.target;
    const shopItem = btn.parentNode.parentNode;
    const title = shopItem.querySelector('.shop-item-title').innerText;
    const imageSrc = shopItem.querySelector('.shop-item-image').getAttribute('src');
    const price = shopItem.querySelector('.shop-item-price').innerText;
    addShopItemToCart(title,imageSrc,price);
    updateCartTotal();
}


function addShopItemToCart(title,imageSrc,price){
    const cartItems = document.querySelector('.cart-items');
    const cartItemNames = document.querySelectorAll('.cart-item-title');
    for(let i =0;i < cartItemNames.length;i++){
        if(cartItemNames[i].innerText === title){
            alert('this item is already added to the cart');
            return;
        }
    }
    const cartRow = document.createElement('dive');
    cartRow.classList.add('cart-row');
    cartRow.innerHTML = `
                            <div class="cart-item cart-column">
                                <img class="cart-item-image" src="${imageSrc}" alt="the ${title} photo">
                                <span class="cart-item-title">${title}</span>
                            </div>
                            <span class="cart-price cart-column">${price}</span>
                            <div class="cart-quantity cart-column">
                                <input class="cart-quantity-input" type="number" value="1">
                                <button class="btn btn-danger">REMOVE</button>
                            </div>`;
                        
    cartRow.querySelector('.btn-danger').addEventListener('click',removeCartItem);
    cartRow.querySelector('.cart-quantity-input').addEventListener('change',quantityChanged);
    cartItems.appendChild(cartRow);
}

function quantityChanged(e){
    const input = e.target
    if(input.value <= 0 || isNaN(input.value)){
        input.value = 1
    }
    updateCartTotal()
}

function removeCartItem(e){
    const btn = e.target;
    cartRow = btn.parentNode.parentNode
    cartRow.remove()
    updateCartTotal();
}

function updateCartTotal(){
    const cartItems = document.querySelector('.cart-items')
    const cartRows = cartItems.querySelectorAll('.cart-row');
    let total = 0;
    cartRows.forEach(cartRow => {
        const price = cartRow.querySelector('.cart-price').innerText.replace('$','');
        const quantity = cartRow.querySelector('.cart-quantity-input').value
        total += price * quantity
    })
    
    total = Math.round(total * 100)/100
    const cartTotalPrice = document.querySelector('.cart-total-price');
    cartTotalPrice.textContent = '$' + total
}

