import { collections } from "../data/collection.js";

const collectionList = document.getElementById("collection-list");

collections.forEach(function (collection) {
  const item = document.createElement("a");

  item.href = "/src/pages/collection-detail.html?slug=" + collection.slug;
  item.className = "block";

  let imageHtml = "";

  if (collection.banner) {
    imageHtml =
      '<img src="' +
      collection.banner +
      '" alt="' +
      collection.name +
      '" class="w-full h-full object-cover" />';
  } else {
    imageHtml = '<div class="w-full h-full bg-gray-100"></div>';
  }

  item.innerHTML =
    '<div class="flex flex-col gap-2">' +
    '<div class="aspect-square w-full overflow-hidden bg-gray-100">' +
    imageHtml +
    "</div>" +
    '<p style="font-size:12px; color:#111111; font-family:Arial,sans-serif;">' +
    collection.name +
    "</p>" +
    "</div>";

  collectionList.appendChild(item);
});
