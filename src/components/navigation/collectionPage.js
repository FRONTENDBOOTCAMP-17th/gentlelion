import { collections } from "../../data/collection.js";
import { renderNavigation } from "./utils/renderNavigation.js";
import { initTabCarousel } from "../carousel/tabCarousel.js";

const navigationList = document.getElementById("navigationList");

renderNavigation(navigationList, collections, {
  detailPath: "/src/pages/collection-detail.html",
  getLabel: (item) => item.name,
  getSlug: (item) => item.slug,
});

const tabsWrapper = document.getElementById("tabs-wrapper");
initTabCarousel(tabsWrapper);
