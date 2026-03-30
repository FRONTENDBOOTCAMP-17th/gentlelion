import { initSubNav } from "../navigationEvent.js";

function createDetailUrl(basePath, slug) {
  const url = new URL(basePath, window.location.origin);
  url.searchParams.set("slug", String(slug ?? ""));
  return url.toString();
}

// http://localhost:5173/src/pages/sunglasses-detail.html?slug=sunglasses-2026-collection
function createNavigationItem(itemData, index, options = {}) {
  const {
    getLabel = (item) => item?.name ?? "",
    getSlug = (item) => item?.slug ?? "",
    detailPath = "/src/pages/collection-detail.html",
  } = options;

  const itemList = document.createElement("li");
  itemList.className = "shrink-0";

  const item = document.createElement("a");
  item.href = createDetailUrl(detailPath, getSlug(itemData));

  item.className = [
    "subnav-btn",
    "cursor-pointer",
    "flex",
    "items-center",
    "rounded-[20px]",
    "py-2",
    "px-3.25",
    "select-none",
    "border",
    "border-(--subTitle-button)",
    index === 0 ? "bg-(--subTitle-button)" : "bg-white",
    index === 0 ? "text-black" : "text-(--text-gray)",
  ].join(" ");

  const title = document.createElement("span");
  title.className =
    "text-center leading-3.5 text-[8.9px] text-(--text-primary)";
  title.textContent = String(getLabel(itemData));

  item.appendChild(title);
  itemList.appendChild(item);

  return itemList;
}

export function renderNavigation(targetElement, data, options = {}) {
  if (!targetElement) {
    throw new Error("렌더링할 대상 요소가 필요합니다.");
  }

  if (!Array.isArray(data)) {
    throw new TypeError("data는 배열이어야 합니다.");
  }

  const {
    buttonSelector = ".subnav-btn",
    activeClass = "bg-(--subTitle-button)",
    inactiveClass = "bg-white",
  } = options;

  targetElement.className =
    "flex gap-2.5 overflow-x-auto scrollbar-hide whitespace-nowrap text-[8.9px] select-none cursor-grab";

  const fragment = document.createDocumentFragment();

  data.forEach((item, index) => {
    fragment.appendChild(createNavigationItem(item, index, options));
  });

  targetElement.replaceChildren(fragment);

  initSubNav(targetElement, {
    buttonSelector,
    activeClass,
    inactiveClass,
  });
}