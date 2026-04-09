import { getProductList } from "../API/product/productListApi";
import { layout } from "../productCard/layout.js";

async function sunglasses() {
  const products = await getProductList("sunglasses", 24, 1);
  layout(products, "sunglasses");
}

sunglasses();