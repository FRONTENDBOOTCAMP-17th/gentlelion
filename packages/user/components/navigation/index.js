import { navButtonEvent } from "./navButtonEvent";
import { createNavigation } from "./createNavigation";

export function navigation() {
  const categories = [
    { label: "전체보기", href: "/pages/viewAll.html" },
    { label: "컬렉션", href: "/pages/collection.html" },
    { label: "썬글라스", href: "/pages/sunglasses.html" },
    { label: "안경", href: "/pages/glasses.html" },
  ];

  createNavigation(categories);
  navButtonEvent();
}
