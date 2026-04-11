import { getCartListApi } from "../API/cart/cartListApi.js";
import { getToken } from "../API/token/getToken.js";
import { cartCard } from "./cartCard.js";
import { emptyCart } from "./emptyCart.js";

async function handlerCart(){
    const productContainer = document.getElementById("productContainer");
    const data = await getCartListApi(getToken());
    const items = data.data.items;

    if(items.length > 0){
        await cartCard(getToken(), productContainer, data);
    }
    else{
        await emptyCart(productContainer);
    }

}
handlerCart();