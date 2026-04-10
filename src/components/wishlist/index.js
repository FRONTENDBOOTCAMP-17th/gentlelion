import { getWishlist } from "../API/wishlist/wishlistApi";
import { postWishlist } from "../API/wishlist/postWishlistApi";

export async function wishlist(productId, color) {
    const token = localStorage.getItem("token");
    const data = await getWishlist(token);
    const post = await postWishlist(token, productId, color)
    
    console.log(data);
}