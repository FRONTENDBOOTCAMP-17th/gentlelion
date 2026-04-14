import { getCartListApi } from "../API/cart/cartListApi.js";
import { cartCard } from "./cartCard.js";
import { emptyCart } from "./emptyCart.js";
import { cartNavigation } from "./cartNavigation.js";

async function handlerCart() {
  const productContainer = document.getElementById("productContainer");
  const navigationContainer = document.getElementById(
    "cartNavigationContainer",
  );
  const data = await getCartListApi();
  const items = data.data.items;

  if (items.length > 0) {
    await cartCard(productContainer, navigationContainer, data);
    await cartNavigation(navigationContainer, data.data.totalPrice);
  } else {
    await emptyCart(productContainer);
  }
}

handlerCart();
