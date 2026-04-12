import { getCartListApi } from "../API/cart/cartListApi.js";
import { getToken } from "../API/token/getToken.js";
import { orderCard } from "./orderCard.js";
import { orderNavigation } from "./orderNavigation.js";
import { orderSummation } from "./orderSummation.js";
import { orderButton } from "./orderButton.js";
import { getProfileApi } from "../API/profile/getProfileApi";

async function handlerOrder() {
    const navigationContainer = document.getElementById("orderNavigationContainer");
    const data = await getCartListApi(getToken());
    const items = data.data.items;

    if (!items || items.length === 0) {
        window.location.href = "/";
        return;
    }

    const userMeta = await getProfileApi(getToken());

    if (items.length > 0) {
        const mobileContainer = document.querySelector(".order-container");
        await orderCard(mobileContainer, data);

        await orderNavigation(navigationContainer, data.data.totalPrice);

        const allContainers = document.querySelectorAll(".order-container");
        const desktopContainer = allContainers[allContainers.length - 1];
        await orderCard(desktopContainer, data);
    }

    orderSummation();
    orderButton(getToken(), items, data.data.totalPrice, userMeta);
}
handlerOrder();
