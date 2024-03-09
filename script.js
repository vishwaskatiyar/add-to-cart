const openShopping = document.querySelector(".shopping");
const closeShopping = document.querySelector(".closeshopping");
const list = document.querySelector(".list");
const listCard = document.querySelector(".listCard");
const total = document.querySelector(".total");
const body = document.querySelector("body");
const quantity = document.querySelector(".quantity");

openShopping.addEventListener("click", () => {
    body.classList.add("active");
});
closeShopping.addEventListener("click", () => {
    body.classList.remove("active");
});

let products = [
    { id: 1, name: "Product 1", images: "photo-1.avif", price: 2000 },
    { id: 2, name: "Product 2", images: "photo-2.avif", price: 3000 },
    { id: 3, name: "Product 3", images: "photo-3.avif", price: 4000 },
    { id: 4, name: "Product 4", images: "photo-4.avif", price: 5000 },
    { id: 5, name: "Product 5", images: "photo-5.avif", price: 6000 },
    { id: 6, name: "Product 6", images: "photo-6.avif", price: 7000 },
    { id: 7, name: "Product 7", images: "photo-7.avif", price: 7000 },
    { id: 8, name: "Product 8", images: "photo-8.avif", price: 7000 },
    { id: 9, name: "Product 9", images: "photo-9.avif", price: 7000 },
];

const listCards = [];

const initApp = () => {
    products.forEach((value, key) => {
        let newDiv = document.createElement("div");
        newDiv.classList.add("items");
        newDiv.innerHTML = `

        <img src="asset/${value.images}">
        <div class="title">${value.name}</div>
        <div class="price">${value.price.toLocaleString()}</div>
        <button onclick="addToCard(${key})">Add to Cart</button>
        `;
        list.appendChild(newDiv);
    })
}
initApp();


const addToCard = (key) => {
    if (listCards[key] == null) {
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    } else {
        listCards[key].quantity++;
    }
    reloadCard();
}
const reloadCard = () => {
    listCard.innerHTML = "";
    let count = 0;
    let totalPrice = 0;

    if (listCards.length === 0) {
        listCard.innerHTML = "0";
        total.innerText = "0";
        quantity.innerText = "0";
        return;
    }

    listCards.forEach((value, key) => {
        totalPrice = totalPrice + (value.price * value.quantity);
        count = count + value.quantity;

        let newDiv = document.createElement("li");
        newDiv.innerHTML = `
            <div>
                <img src="asset/${value.images}">
            </div>
            <div class="cardTitle">${value.name} x ${value.quantity}</div>
            <div class="cardPrice">${(value.price * value.quantity).toLocaleString()}</div>
            <div>
                <button style="background-color: #560bad" class="cardButton" onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                <button style="background-color: #560bad" class="cardButton" onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
            </div>
        `;
        listCard.appendChild(newDiv);
    });

    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;

    if (totalPrice === 0) {
        total.innerHTML = "<p class='empty-cart'>Your cart is empty</p>";
    }
}
const changeQuantity = (key, quantity) => {
    if (quantity <= 0) {
        delete listCards[key];
    } else {
        listCards[key].quantity = quantity;
    }
    reloadCard();
}
