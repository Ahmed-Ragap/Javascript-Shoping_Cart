//select elements
const productsEl = document.querySelector('.products');
const productsItem = document.querySelector('.cart-items');
const subTotal  = document.querySelector('.subtotal');
const totalItemInCart  = document.querySelector('.total-items-in-cart');

//render product
function renderProducts(){
 products.forEach( (product) => {
    productsEl.innerHTML += `

     <div class="item">
        <div class="item-container">
            <div class="item-img">
                <img src="${product.imgSrc}" alt="${product.imgSrc}">
            </div>
            <div class="desc">
                <h2>${product.name} ${product.id}</h2>
                <h2><small>$</small>${product.price}</h2>
                <p>
                 ${product.description}
                </p>
            </div>
            <div class="add-to-wishlist">
                <img src="./icons/heart.png" alt="add to wish list">
            </div>
            <div class="add-to-cart" onClick="addToCart(${product.id})">
                <img src="./icons/bag-plus.png" alt="add to cart">
            </div>
        </div>
    </div>
    `
});
}
renderProducts()
//cart array
let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();
//add to cart 
function addToCart(id){
    if(cart.some((item) => item.id ===id)){
changeNumberOfUnit("plus", id)
    } else {
const item = products.find((product) => product.id === id);
cart.push({
    ...item,
    numberOfUnit:1,
});
// console.log(cart)
}
updateCart();
 }

 //update cart
 function updateCart(){
     renderCartItem()
     renderSubTitle()
     localStorage.setItem("CART", JSON.stringify(cart))
 }

 //renderCartItem
 function renderCartItem(){
    productsItem.innerHTML = '';
 cart.forEach((item)=> {
   
    productsItem.innerHTML += `
     <div class="cart-item">
              <div class="item-info" onClick=" removeItem(${item.id})">
                  <img src="${item.imgSrc}" alt="${item.imgSrc}">
                    <h4>${item.name}</h4>
                    </div>
                    <div class="unit-price">
                        <small>$</small>${item.price}
                    </div>
                    <div class="units">
                        <div class="btn minus" onClick="changeNumberOfUnit('minus', ${item.id} )">-</div>
                        <div class="number">${item.numberOfUnit}</div>
                        <div class="btn plus" onClick="changeNumberOfUnit('plus', ${item.id} )">+</div>           
                    </div>
                </div>
    `;
 })
 }

//remove item from cart 
function removeItem(id){
    cart = cart.filter((item) => item.id !== id);
    updateCart();
    }


 //  renderSubTitle

 function   renderSubTitle(){
     let totalPrice = 0;
     let totalItem = 0;
     cart.forEach((item) => {
        totalPrice += item.price * item.numberOfUnit;
        totalItem += item.numberOfUnit;
     })
     subTotal.innerHTML = `subtotal (${totalItem} item): ${totalPrice.toFixed(2)}`
     totalItemInCart.innerHTML = totalItem
 }


 //changeNumberOfUnit for item
 function changeNumberOfUnit(action, id){
     cart = cart.map((item) => {
         let numberOfUnit = item.numberOfUnit;
         if(item.id === id){
             if(action === 'minus' && numberOfUnit > 1){
                numberOfUnit--;
                // if(numberOfUnit.value > 0){
                //     alert('kdjjfdf')
                // }
             } else if(action === 'plus' && numberOfUnit < item.instock){
                numberOfUnit++;
             }
         }
         return {
             ...item,
             numberOfUnit,
         };

     });
     updateCart();
 }