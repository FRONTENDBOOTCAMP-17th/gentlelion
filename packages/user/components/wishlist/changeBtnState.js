import { changeSVG } from "./changeSVG";

export async function changeBtnState(data) {
    if (!data) {
        return;
    }
    const wishlistedIds = new Set(data.data.items.map(item => item.productId));

    const buttons = document.querySelectorAll(".wishButton");

    buttons.forEach((button) => {
        const productId = Number(button.dataset.productId);

        if (wishlistedIds.has(productId)) {
            button.dataset.wishlist = "1";
            changeSVG(button, true);
        } else {
            button.dataset.wishlist = "0";
            changeSVG(button, false);
        }
    });
}