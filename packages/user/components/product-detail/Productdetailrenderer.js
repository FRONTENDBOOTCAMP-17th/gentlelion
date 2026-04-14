export async function loadProductInfo(container) {
  const res = await fetch("/components/product-detail/productInfo.html");
  if (!res.ok) return;
  const html = await res.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  container.appendChild(doc.body.firstElementChild);
}

export async function loadSimilarSection(container) {
  const res = await fetch("/components/product-detail/similarSection.html");
  if (!res.ok) return;
  const html = await res.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  doc.body.childNodes.forEach(function (node) {
    container.appendChild(node.cloneNode(true));
  });
}

export function renderDetailLines(el, lines) {
  lines.forEach(function (line) {
    const p = document.createElement("p");
    p.textContent = line;
    p.className = "text-[12px] leading-[17px] text-[#111111]";
    el.appendChild(p);
  });
}

export function renderSpecifications(el, specifications) {
  if (!specifications) return;
  const labels = {
    frameWidth: "프레임 너비",
    lensHeight: "렌즈 높이",
    lensWidth: "렌즈 너비",
    bridgeWidth: "브릿지 너비",
    templeLength: "템플 길이",
  };
  Object.entries(specifications).forEach(function ([key, value]) {
    const p = document.createElement("p");
    p.textContent = (labels[key] || key) + ": " + value;
    p.className = "text-[12px] leading-[17px] text-[#111111]";
    el.appendChild(p);
  });
}

export function initDesktopThumbs(desktopBox, images, productNameText) {
  images.forEach(function (src, i) {
    const wrap = document.createElement("div");
    wrap.className = "relative w-full h-[80vh] overflow-hidden bg-[#f3f4f6]";

    const img = document.createElement("img");
    img.src = src;
    img.alt = productNameText;
    img.loading = i === 0 ? "eager" : "lazy";
    img.className = "w-full h-full object-contain object-center block";
    wrap.appendChild(img);
    desktopBox.appendChild(wrap);
  });
}

export function renderSimilarProducts(
  similarProducts,
  similarSectionTitle,
  similarSectionTitleText,
) {
  if (similarProducts.length === 0) return;

  document.getElementById("similarSection").classList.remove("hidden");
  similarSectionTitle.textContent = similarSectionTitleText;

  const grid = document.getElementById("similarGrid");

  similarProducts.forEach(function (p) {
    const a = document.createElement("a");
    a.href = "./product-detail.html?productId=" + p.id;
    a.className = "block no-underline cursor-pointer";

    const imgWrap = document.createElement("div");
    imgWrap.className =
      "relative w-full pt-[138.1%] overflow-hidden bg-[#f3f4f6]";

    const img = document.createElement("img");
    img.src = (p.images && p.images[0]) || "";
    img.alt = p.name;
    img.loading = "lazy";
    img.className =
      "absolute inset-0 w-full h-full object-cover object-center block";
    imgWrap.appendChild(img);

    const info = document.createElement("div");
    info.className = "pt-[8px]";

    const pName = document.createElement("p");
    pName.textContent = p.name;
    pName.className = "text-[11px] leading-[16px] text-[#111111]";

    const pPrice = document.createElement("p");
    pPrice.textContent = p.price.toLocaleString() + "원";
    pPrice.className = "text-[11px] leading-[16px] text-[#111111]";

    info.appendChild(pName);
    info.appendChild(pPrice);
    a.appendChild(imgWrap);
    a.appendChild(info);
    grid.appendChild(a);
  });
}
