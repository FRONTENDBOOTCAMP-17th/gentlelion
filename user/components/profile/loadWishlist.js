import { getWishlist } from "../API/wishlist/wishlistApi";
import { productCard } from "../productCard/productCard";
import { wishbuttonEvent } from "../productCard/wishbuttonEvent";
import { changeSVG } from "../wishlist/changeSVG";

export async function loadWishlist(token) {
    const products = await getWishlist(token);

    const wishLength = document.getElementById("wishLength");
    wishLength.textContent = products.data.itemCount;

    const productContainer = document.getElementById("productContainer");

    const normalized = {
        ...products,
        data: products.data.items.map(item => ({
            ...item,
            id: item.productId
        }))
    };

    await productCard(productContainer, normalized);

    wishbuttonEvent(products);

    document.querySelectorAll(".wishButton").forEach(button => {
        button.dataset.wishlist = "1";
        changeSVG(button, true);
    });
}