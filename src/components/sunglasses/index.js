import { getProductList } from "../API/product/productListApi";
import { layout } from "../productCard/layout.js";
import { wishbuttonEvent } from "../productCard/wishbuttonEvent.js";
import { getToken } from "../API/token/getToken.js";

async function sunglasses() {
  const products = await getProductList("sunglasses", 24, 1);
  await layout(products, "sunglasses");
  wishbuttonEvent(getToken());
}

sunglasses();