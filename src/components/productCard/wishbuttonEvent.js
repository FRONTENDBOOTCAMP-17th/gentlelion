import { postWishlist } from "../API/wishlist/postWishlistApi";

export async function wishbuttonEvent(token) {
    const buttons = document.querySelectorAll(".wishButton");

    buttons.forEach((button) => {

        button.addEventListener("click", () => {
            const productId = button.dataset.productId;
            console.log("클릭된 상품 ID:", productId);
            postWishlist(token, productId);
        });
    });
}