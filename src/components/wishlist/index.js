import { getWishlist } from "../API/wishlist/wishlistApi";
import { getToken } from "../API/token/getToken";
import { wishbuttonEvent } from "../productCard/wishbuttonEvent";
import { changeBtnState } from "./changeBtnState";

export async function wishlist() {
    const data = await getWishlist(getToken());
    wishbuttonEvent(getToken(), data);
    changeBtnState(data);
}