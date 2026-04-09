import { productCard } from "./productCard.js"
import { moreButton } from "./moreButton.js"

async function layout() {
    const productContainer = document.getElementById("productContainer");
    const main = document.querySelector("main");

    await productCard(productContainer);
    await moreButton(main);
}

layout();