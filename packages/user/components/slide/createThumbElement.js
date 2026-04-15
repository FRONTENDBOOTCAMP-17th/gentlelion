export function createThumbElement(item, index) {
  const thumb = document.createElement("div");
  thumb.className = `thumb-item w-12 h-16 md:w-16 md:h-20 cursor-pointer border-b-2 border-transparent hover:border-gray-300 ${index === 0 ? "opacity-100" : ""}`;
  thumb.dataset.index = index;

  const img = document.createElement("img");
  img.src = item.images?.[1] ?? item.images?.[0] ?? "";
  img.className = `w-full h-full object-cover ${index === 0 ? "opacity-100" : "opacity-50 hover:opacity-100"}`;

  thumb.appendChild(img);

  return thumb;
}