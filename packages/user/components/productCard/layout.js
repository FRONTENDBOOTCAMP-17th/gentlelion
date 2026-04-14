import { productCard } from "./productCard.js"
import { moreButton } from "./moreButton.js"

export async function layout(products, category) {
    const productContainer = document.getElementById("productContainer");
    const main = document.querySelector("main");

    await productCard(productContainer, products);
    await moreButton(main, products, category);
}