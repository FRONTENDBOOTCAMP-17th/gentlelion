import { getCartListApi } from "../API/cart/cartListApi.js";
import { getToken } from "../API/token/getToken.js";
import { orderCard } from "./orderCard.js";
import { orderNavigation } from "./orderNavigation.js";
import { orderSummation } from "./orderSummation.js";

async function handlerOrder(){
    const productContainer = document.getElementById("orderContainer");
    const navigationContainer = document.getElementById("orderNavigationContainer");
    const data = await getCartListApi(getToken());
    const items = data.data.items;

    if(items.length > 0){
        await orderCard(productContainer, data);
        await orderNavigation(navigationContainer, data.data.totalPrice)
    }

    orderSummation();
}
handlerOrder();