import { navButtonEvent } from "./navButtonEvent";
import { createNavigation } from "./createNavigation";

export function navigation() {
  const categories = [
    { label: "전체보기", href: "/src/pages/viewAll.html" },
    { label: "컬렉션", href: "/src/pages/collection.html" },
    { label: "썬글라스", href: "/src/pages/sunglasses.html" },
    { label: "안경", href: "/src/pages/glasses.html" },
  ];

  createNavigation(categories);
  navButtonEvent();
}
