export function createItem(product, isActive, createBookmarkSvg) {
  const item = document.createElement("div");
  item.className = "product cursor-pointer";

  // 이미지 슬라이더 - 공홈 비율 344:478 ≈ 0.72 (세로가 더 긴 형태)
  const imageWrap = document.createElement("div");
  imageWrap.style.cssText =
    "position:relative;width:100%;overflow:hidden;background:#F3F4F6;aspect-ratio:344/478;";

  const images =
    product.images && product.images.length > 0
      ? product.images
      : product.image
        ? [product.image]
        : [];

  if (images.length > 0) {
    // 슬라이드 컨테이너
    const track = document.createElement("div");
    track.style.cssText =
      "display:flex;width:100%;height:100%;transition:transform 0.3s ease;will-change:transform;user-select:none;";

    images.forEach(function (src) {
      const slide = document.createElement("div");
      slide.style.cssText = "min-width:100%;height:100%;flex-shrink:0;";
      const img = document.createElement("img");
      img.src = src;
      img.alt = product.name;
      img.loading = "lazy";
      img.draggable = false;
      img.style.cssText =
        "width:100%;height:100%;object-fit:cover;display:block;pointer-events:none;";
      slide.appendChild(img);
      track.appendChild(slide);
    });

    imageWrap.appendChild(track);

    // 공홈 스타일 슬라이더 바 (8×1px 직사각형, border-radius:0)
    const pagination = document.createElement("div");
    pagination.style.cssText =
      "position:absolute;bottom:10px;left:0;width:100%;display:flex;justify-content:center;gap:4px;z-index:10;";

    let curIdx = 0;
    const bullets = [];

    function goTo(idx, animate) {
      curIdx = Math.max(0, Math.min(idx, images.length - 1));
      track.style.transition =
        animate === false ? "none" : "transform 0.3s ease";
      track.style.transform = "translateX(-" + curIdx * 100 + "%)";
      bullets.forEach(function (b, i) {
        b.style.backgroundColor =
          i === curIdx ? "rgb(28,26,26)" : "rgba(28,26,26,0.25)";
      });
    }

    if (images.length > 1) {
      images.forEach(function (_, i) {
        const bullet = document.createElement("span");
        // 공홈: 8×1px, border-radius:0 (직사각형 바)
        bullet.style.cssText =
          "display:inline-block;width:8px;height:1px;border-radius:0;" +
          "background-color:" +
          (i === 0 ? "rgb(28,26,26)" : "rgba(28,26,26,0.25)") +
          ";cursor:pointer;transition:background 0.2s;";
        bullet.addEventListener("click", function (e) {
          e.stopPropagation();
          goTo(i, true);
        });
        pagination.appendChild(bullet);
        bullets.push(bullet);
      });
      imageWrap.appendChild(pagination);
    }

    // ── 드래그 슬라이드 (클릭&드래그 방식) ──
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    let isPointerDown = false;
    const DRAG_THRESHOLD = 5;

    imageWrap.addEventListener("pointerdown", function (e) {
      isPointerDown = true;
      isDragging = false;
      startX = e.clientX;
      currentX = e.clientX;
      imageWrap.setPointerCapture(e.pointerId);
      track.style.transition = "none";
    });

    imageWrap.addEventListener("pointermove", function (e) {
      if (!isPointerDown) return;
      const diff = e.clientX - startX;
      currentX = e.clientX;

      if (!isDragging && Math.abs(diff) > DRAG_THRESHOLD) {
        isDragging = true;
      }

      if (isDragging) {
        // 실시간으로 따라오기
        const baseOffset = -curIdx * 100;
        const dragPercent = (diff / imageWrap.offsetWidth) * 100;
        // 첫/마지막 경계에서 저항감
        let clampedPercent = dragPercent;
        if (curIdx === 0 && diff > 0) clampedPercent = dragPercent * 0.2;
        if (curIdx === images.length - 1 && diff < 0)
          clampedPercent = dragPercent * 0.2;
        track.style.transform =
          "translateX(" + (baseOffset + clampedPercent) + "%)";
      }
    });

    imageWrap.addEventListener("pointerup", function (e) {
      if (!isPointerDown) return;
      isPointerDown = false;

      if (isDragging) {
        isDragging = false;
        const diff = e.clientX - startX;
        if (diff < -40 && curIdx < images.length - 1) {
          goTo(curIdx + 1, true);
        } else if (diff > 40 && curIdx > 0) {
          goTo(curIdx - 1, true);
        } else {
          goTo(curIdx, true); // snap back
        }
        // 클릭 이벤트 차단 (드래그 후 카드 이동 방지)
        const blockClick = function (ev) {
          ev.stopPropagation();
          imageWrap.removeEventListener("click", blockClick, true);
        };
        imageWrap.addEventListener("click", blockClick, true);
      }

      imageWrap.releasePointerCapture(e.pointerId);
    });

    imageWrap.addEventListener("pointercancel", function (e) {
      isPointerDown = false;
      isDragging = false;
      goTo(curIdx, true);
    });
  } else {
    const empty = document.createElement("div");
    empty.style.cssText = "width:100%;height:100%;background:#e8e9eb;";
    imageWrap.appendChild(empty);
  }

  // 텍스트+북마크 영역
  const infoWrap = document.createElement("div");
  infoWrap.className =
    "product-txt flex items-start justify-between pt-[8px] pb-[24px]";
  infoWrap.style.padding = "8px 42px 24px";

  const textLink = document.createElement("a");
  textLink.style.cssText = "flex:1;text-decoration:none;";

  const name = document.createElement("p");
  name.textContent = product.name;
  name.style.cssText =
    "font-size:11px;line-height:16px;color:#111111;margin:0;";

  const price = document.createElement("p");
  let priceText = product.price || "";
  if (product.status) priceText += " - " + product.status;
  price.textContent = priceText;
  price.style.cssText =
    "font-size:11px;line-height:16px;color:#111111;margin:0;";

  textLink.appendChild(name);
  textLink.appendChild(price);

  const button = document.createElement("button");
  button.type = "button";
  button.className = "bookmark-button";
  button.style.cssText =
    "margin-top:8px;margin-left:12px;flex-shrink:0;background:none;border:none;cursor:pointer;padding:0;line-height:1;";
  button.setAttribute("aria-label", "찜하기");
  button.innerHTML = createBookmarkSvg(isActive);

  infoWrap.appendChild(textLink);
  infoWrap.appendChild(button);

  item.appendChild(imageWrap);
  item.appendChild(infoWrap);

  return item;
}
