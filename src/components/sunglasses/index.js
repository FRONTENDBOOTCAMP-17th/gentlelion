import { getProductList } from "../API/product/productListApi";
import { layout } from "../productCard/layout.js";
import { wishlist } from "../wishlist/index.js";
import { navigation } from "../navigation/index.js";

async function sunglasses() {
  navigation();
  const products = await getProductList("sunglasses", 24, 1);
  await layout(products, "sunglasses");
  wishlist();
}

sunglasses();