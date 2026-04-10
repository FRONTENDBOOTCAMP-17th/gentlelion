import { getProductList } from "../API/product/productListApi";
import { layout } from "../productCard/layout.js";
import { wishlist } from "../wishlist/index.js";

async function glasses() {
  const products = await getProductList("glasses", 24, 1);
  await layout(products, "glasses");
  wishlist();
}

glasses();