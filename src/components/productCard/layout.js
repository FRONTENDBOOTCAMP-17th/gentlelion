import { productCard } from "./productCard.js"

function layout() {
    const productContainer = document.getElementById("productContainer");
    productCard(productContainer);
}

layout();