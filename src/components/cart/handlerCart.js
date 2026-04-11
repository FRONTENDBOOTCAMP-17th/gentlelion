import { getCartListApi } from "../API/cart/cartListApi.js";
import { getToken } from "../API/token/getToken.js";
import { cartCard } from "./cartCard.js";

async function handlerCart(){
    const productContainer = document.getElementById("productContainer");
    const data = await getCartListApi(getToken());
    await cartCard(getToken(), productContainer, data);
}
handlerCart();