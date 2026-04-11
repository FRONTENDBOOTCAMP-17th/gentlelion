import { getCartListApi } from "../API/cart/cartListApi.js";
import { getToken } from "../API/token/getToken.js";
import { cartCard } from "./cartCard.js";
import { emptyCart } from "./emptyCart.js";
import { cartNavigation } from "./cartNavigation.js";

async function handlerCart(){
    const productContainer = document.getElementById("productContainer");
    const navigationContainer = document.getElementById("cartNavigationContainer");
    const data = await getCartListApi(getToken());
    const items = data.data.items;

    if(items.length > 0){
        await cartCard(getToken(), productContainer, navigationContainer, data);
        await cartNavigation(navigationContainer, data.data.totalPrice)
    }
    else{
        await emptyCart(productContainer);
    }

}
handlerCart();