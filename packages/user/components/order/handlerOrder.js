import { getCartListApi } from "../API/cart/cartListApi.js";
import { orderCard } from "./orderCard.js";
import { orderNavigation } from "./orderNavigation.js";
import { orderSummation } from "./orderSummation.js";
import { orderButton } from "./orderButton.js";
import { getProfileApi } from "../API/profile/getProfileApi.js";
import { initCheckoutValidation } from "./initCheckoutValidation.js";

async function handlerOrder() {
  const navigationContainer = document.getElementById(
    "orderNavigationContainer",
  );
  const data = await getCartListApi();
  const items = data.data.items;

  if (!items || items.length === 0) {
    window.location.href = "/";
    return;
  }

  const userMeta = await getProfileApi();

  if (items.length > 0) {
    const mobileContainer = document.querySelector(".order-container");
    await orderCard(mobileContainer, data);

    await orderNavigation(navigationContainer, data.data.totalPrice);

    const allContainers = document.querySelectorAll(".order-container");
    const desktopContainer = allContainers[allContainers.length - 1];
    await orderCard(desktopContainer, data);
  }

  orderSummation();
  orderButton(items, data.data.totalPrice, userMeta);
  initCheckoutValidation();

  const mobilePriceSpan = document.querySelector("#orderSummation .order-summation-btn span");
  if (mobilePriceSpan) {
    mobilePriceSpan.textContent = "₩" + data.data.totalPrice.toLocaleString();
  }
}
handlerOrder();
