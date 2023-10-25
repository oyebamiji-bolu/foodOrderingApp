import { menuArray } from '/data.js';

const cartItems = [];
const cartSection = document.querySelector(".cart-section")
cartSection.style.display = "none"
const paymentForm = document.getElementById("form")
paymentForm.style.display = "none"


function handleAddToCart(foodId) {
   
    const targetFoodItemObj = menuArray.find(menu => menu.id == foodId);
    if (!cartItems.includes(targetFoodItemObj)) {
        
        cartItems.push(targetFoodItemObj);
    }
    
    renderCart()
}
function handleTotalSum(){
   return cartItems.reduce((total, currentItem)=> total + currentItem.price,0)
    
}
function handleRemoveBtn(foodId){
    const index = cartItems.findIndex(item => item.id == foodId)
    if(index !== -1){
        cartItems.splice(index, 1)
        renderCart()
    }

}
function renderCart(){
    let sum = handleTotalSum()
    document.getElementById("total").innerHTML = `
    <p id = "sum" class = "sum">Total price: <span>${sum}$</span>
    </p>`
    const cartContainer = document.getElementById("cart-container");
        cartContainer.innerHTML = cartHtml();
    if(cartItems.length > 0){
        cartSection.style.display = "block"
    }else {
        cartSection.style.display = "none"
    }
}

function cartHtml() {
   
    const itemsInCart = cartItems.map(function(item) {
        return `
            <div class="cart-item">
                <p class="item-name">${item.name}</p>
                <button data-remove = ${item.id} class = "remove-item">remove</button>
                <p class="item-price">${item.price}$</p>
            </div>
     `
    })
    return itemsInCart.join('');
}
document.addEventListener("submit", function(e){
    if(e.target.id === "payment-form"){
        e.preventDefault()
        paymentForm.style.display = "none"
       
        const paymentFormData = new FormData(document.getElementById("payment-form"))
        const name = paymentFormData.get("name")
        cartSection.innerHTML = `<div class = "confirmation">Thanks,${name}! Your order is on its way!</div>`  
    }
})
document.addEventListener("click", function(e) {
    if (e.target.dataset.add) {
        handleAddToCart(e.target.dataset.add) 
    }
    if(e.target.dataset.remove) {
        handleRemoveBtn(e.target.dataset.remove)
    }
    if(e.target.id === "cart-btn"){
       paymentForm.style.display = "flex" 
    }
})

function getMeals() {
       const mealsHtml = menuArray.map(function(menu) {
        const { id, name, ingredients, price, emoji } = menu;
        return `
            <div class="food-item-menu ">
                <div class="food-item-icon">${emoji}</div>
                <div class="details-container">
                    <p class="food-name">${name}</p>
                    <p class="small-text">${ingredients.join(', ')}</p>
                    <p class="price">${price}$</p>
                </div>
                <div class="add-item-icon" id="add-item-icon">
                    <i class="fa fa-circle-plus" data-add="${id}"></i>
                </div>
            </div>
        `;
    }).join(' ');

    return mealsHtml;
}

function renderMenu() {
    document.getElementById("food-item-menu").innerHTML = getMeals();
}

renderMenu()

