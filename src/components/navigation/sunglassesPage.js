import { sunglasses } from "../../data/sunglasses.js";
import { renderNavigation } from "./utils/renderNavigation.js";

const navigationList = document.getElementById("navigationList");

renderNavigation(navigationList, sunglasses, {
  detailPath: "/src/pages/sunglasses-detail.html",
  getLabel: (item) => item.name,
  getSlug: (item) => item.slug,
});