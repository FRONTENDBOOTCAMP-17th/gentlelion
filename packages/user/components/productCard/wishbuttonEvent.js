import { postWishlist } from "../API/wishlist/postWishlistApi.js";
import { delWishlist } from "../API/wishlist/delWishlistApi.js";
import { changeSVG } from "../wishlist/changeSVG.js";

export async function wishbuttonEvent(data) {
  const buttons = document.querySelectorAll(".wishButton");

    buttons.forEach((button) => {
        button.addEventListener("click", async () => {
            const productId = Number(button.dataset.productId);
            const isWishlisted = button.dataset.wishlist === "1";

      if (!isWishlisted) {
        const result = await postWishlist(productId);
        if (result) {
          button.dataset.wishlist = "1";
          changeSVG(button, true);
        }
      } else {
        const item = data.data.items.find(
          (item) => item.productId === productId,
        );
        const wishlistItemId = item?.wishlistItemId;

        const result = await delWishlist(wishlistItemId);
        if (result) {
          button.dataset.wishlist = "0";
          changeSVG(button, false);
        }
      }
    });
  });
}
