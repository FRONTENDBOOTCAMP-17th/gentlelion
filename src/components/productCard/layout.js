import { productCard } from "./productCard.js"
import { moreButton } from "./moreButton.js"

async function layout() {
    const productContainer = document.getElementById("productContainer");
    const buttonContainer = document.getElementById("moreButton");
    
    await productCard(productContainer);
    moreButton(buttonContainer);
}

layout();