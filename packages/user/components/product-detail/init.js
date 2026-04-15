import { wishlist } from "../wishlist/index.js";
import { createImageCarousel } from "../carousel/imageCarousel.js";
import { navigation } from "../navigation/index.js";
import { renderColorChips } from "../../data/colorChips.js";
import {
  fetchProduct,
  fetchSimilarProducts,
} from "../API/product/productDetailApi.js";
import {
  loadProductInfo,
  loadSimilarSection,
  renderDetailLines,
  renderSpecifications,
  initDesktopThumbs,
  renderSimilarProducts,
} from "./Productdetailrenderer.js";
import { loadAccordion, initAccordion } from "../accordion/accordion.js";
import { addCartButton } from "./addCartButton.js";

const UI_TEXT = {
  cartBtn: "쇼핑백에 추가하기",
  notifyBtn: "알림 받기",
  cartSuccess: "쇼핑백에 추가되었습니다.",
  notifySuccess: "재입고 알림이 등록되었습니다.",
  productNotFound: "존재하지 않는 상품입니다.",
  accDeliveryLabel: "무료 배송 & 반품",
  accDeliveryDesc:
    "젠틀라이온 공식 온라인 스토어는 무료 배송 및 반품 서비스를 제공합니다. 반품은 제품을 수령하신 날로부터 7일 이내에 접수해 주셔야 합니다. 제품은 사용되지 않은 상태여야 하며, 모든 구성품을 포함하고 있어야 합니다.",
  accDetailLabel: "세부 정보",
  accSizeLabel: "사이즈 및 핏",
  similarSectionTitle: "유사한 프레임",
};

export async function initProductDetail() {
  navigation();

  const params = new URLSearchParams(window.location.search);
  const productId = params.get("productId");
  if (!productId) return;

  const productInfoWrap = document.getElementById("productInfoWrap");
  const similarSection = document.getElementById("similarSection");
  const mobileCarouselWrap = document.getElementById("mobileCarouselWrap");
  const desktopBox = document.getElementById("desktopThumbBox");

  await loadProductInfo(productInfoWrap);
  await loadSimilarSection(similarSection);

  const accordionWrap = document.getElementById("accordionWrap");
  await loadAccordion(accordionWrap);
  initAccordion();

  const productNameEl = document.getElementById("productName");
  const productPriceEl = document.getElementById("productPrice");
  const colorChipsEl = document.getElementById("colorChips");
  const colorTextEl = document.getElementById("colorText");
  const cartBtn = document.getElementById("cartBtn");
  const bookmarkBtn = document.getElementById("bookmarkBtn");
  const detailsEl = document.getElementById("productDetails");
  const sizeEl = document.getElementById("productSize");
  const similarSectionTitle = document.getElementById("similarSectionTitle");
  const accDeliveryLabel = document.getElementById("accDeliveryLabel");
  const accDeliveryDesc = document.getElementById("accDeliveryDesc");
  const accDetailLabel = document.getElementById("accDetailLabel");
  const accSizeLabel = document.getElementById("accSizeLabel");

  accDeliveryLabel.textContent = UI_TEXT.accDeliveryLabel;
  accDeliveryDesc.textContent = UI_TEXT.accDeliveryDesc;
  accDetailLabel.textContent = UI_TEXT.accDetailLabel;
  accSizeLabel.textContent = UI_TEXT.accSizeLabel;

  let currentProduct;
  try {
    currentProduct = await fetchProduct(productId);
  } catch {
    productNameEl.textContent = UI_TEXT.productNotFound;
    return;
  }

  productNameEl.textContent = currentProduct.name;
  productPriceEl.textContent = currentProduct.price.toLocaleString() + "원";

  const images = currentProduct.images || [];

  const carousel = createImageCarousel(images, { alt: currentProduct.name });
  mobileCarouselWrap.appendChild(carousel);

  if (window.innerWidth > 768) {
    initDesktopThumbs(desktopBox, images, currentProduct.name);
  }

  renderColorChips({
    colors: currentProduct.colors,
    chipsEl: colorChipsEl,
    textEl: colorTextEl,
    wishBtn: bookmarkBtn,
  });

  renderDetailLines(
    detailsEl,
    currentProduct.description.split("\n").filter(Boolean),
  );

  renderSpecifications(sizeEl, currentProduct.specifications);

  const isSoldOut = !currentProduct.inStock;
  cartBtn.textContent = isSoldOut ? UI_TEXT.notifyBtn : UI_TEXT.cartBtn;

  if (!isSoldOut) {
    addCartButton(currentProduct.id, 1, currentProduct.colors?.[0]?.name);
  } else {
    cartBtn.addEventListener("click", function () {
      alert(UI_TEXT.notifySuccess);
    });
  }

  bookmarkBtn.dataset.productId = currentProduct.id;
  await wishlist();

  const similarProducts = await fetchSimilarProducts(
    currentProduct.category,
    productId,
  );
  renderSimilarProducts(
    similarProducts,
    similarSectionTitle,
    UI_TEXT.similarSectionTitle,
  );
}
