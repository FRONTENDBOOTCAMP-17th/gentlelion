import { getProductList } from "../API/product/productListApi.js";
import { layout } from "../productCard/layout.js";
import { wishlist } from "../wishlist/index.js";
import { navigation } from "../navigation/index.js";

async function collection() {
    navigation();
    const products = await getProductList("collection", 24, 1);
    await layout(products, "collection");
    wishlist();
}

collection();