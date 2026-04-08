export function createItem(product, isActive, createBookmarkSvg) {
  const item = document.createElement("div");
  item.className = "product cursor-pointer";

  const imageWrap = document.createElement("div");
  imageWrap.style.cssText =
    "position:relative;width:100%;aspect-ratio:520 / 718;overflow:hidden;" +
    "background:#F3F4F6;cursor:grab;user-select:none;-webkit-user-select:none;";
  imageWrap.style.touchAction = "pan-y";

  const images =
    product.images && product.images.length > 0
      ? product.images
      : product.image
        ? [product.image]
        : [];

  if (images.length > 0) {
    const track = document.createElement("div");
    track.style.cssText =
      "position:absolute;top:0;left:0;height:100%;" +
      "display:flex;transition:transform 0.3s ease;will-change:transform;";
    track.style.width = `${images.length * 100}%`;
    track.style.touchAction = "pan-y";

    images.forEach(function (src) {
      const slide = document.createElement("div");
      slide.style.cssText = `flex:0 0 ${100 / images.length}%;max-width:${100 / images.length}%;height:100%;overflow:hidden;`;

      const img = document.createElement("img");
      img.src = src;
      img.alt = product.name;
      img.loading = "lazy";
      img.draggable = false;
      img.style.cssText =
        "width:100%;height:100%;object-fit:cover;object-position:center;" +
        "display:block;pointer-events:none;";

      slide.appendChild(img);
      track.appendChild(slide);
    });

    imageWrap.appendChild(track);

    if (images.length > 1) {
      const pagination = document.createElement("div");
      pagination.style.cssText =
        "position:absolute;bottom:10px;left:0;width:100%;" +
        "display:flex;justify-content:center;gap:4px;z-index:10;pointer-events:none;";

      let curIdx = 0;
      const bullets = [];

      let startX = 0;
      let currentX = 0;
      let isDown = false;
      let isDragging = false;
      let moved = false;

      function updateBullets() {
        bullets.forEach(function (bullet, i) {
          bullet.style.backgroundColor =
            i === curIdx ? "rgb(28,26,26)" : "rgba(28,26,26,0.25)";
        });
      }

      function goTo(idx, animate = true) {
        curIdx = Math.max(0, Math.min(idx, images.length - 1));
        track.style.transition = animate ? "transform 0.3s ease" : "none";
        track.style.transform = `translateX(-${curIdx * (100 / images.length)}%)`;
        updateBullets();
      }

      function onStart(clientX) {
        if (images.length <= 1) return;
        isDown = true;
        isDragging = false;
        moved = false;
        startX = clientX;
        currentX = clientX;
        track.style.transition = "none";
        imageWrap.style.cursor = "grabbing";
      }

      function onMove(clientX) {
        if (!isDown) return;

        currentX = clientX;
        const diff = currentX - startX;

        if (!isDragging && Math.abs(diff) > 5) {
          isDragging = true;
          moved = true;
        }

        if (!isDragging) return;

        const step = 100 / images.length;
        const base = -(curIdx * step);
        let movePct = (diff / imageWrap.offsetWidth) * step;

        if (curIdx === 0 && diff > 0) movePct *= 0.2;
        if (curIdx === images.length - 1 && diff < 0) movePct *= 0.2;

        track.style.transform = `translateX(${base + movePct}%)`;
      }

      function onEnd() {
        if (!isDown) return;

        isDown = false;
        imageWrap.style.cursor = "grab";

        const diff = currentX - startX;

        if (isDragging) {
          if (diff < -40 && curIdx < images.length - 1) {
            goTo(curIdx + 1, true);
          } else if (diff > 40 && curIdx > 0) {
            goTo(curIdx - 1, true);
          } else {
            goTo(curIdx, true);
          }

          setTimeout(function () {
            isDragging = false;
          }, 0);

          const blockClick = function (ev) {
            ev.preventDefault();
            ev.stopPropagation();
            imageWrap.removeEventListener("click", blockClick, true);
          };

          imageWrap.addEventListener("click", blockClick, true);
          return;
        }

        goTo(curIdx, true);
      }

      images.forEach(function (_, i) {
        const bullet = document.createElement("span");
        bullet.style.cssText =
          "display:inline-block;width:8px;height:1px;border-radius:0;" +
          "cursor:pointer;pointer-events:all;transition:background-color 0.2s;" +
          `background-color:${i === 0 ? "rgb(28,26,26)" : "rgba(28,26,26,0.25)"};`;

        bullet.addEventListener("click", function (e) {
          e.preventDefault();
          e.stopPropagation();
          goTo(i, true);
        });

        pagination.appendChild(bullet);
        bullets.push(bullet);
      });

      imageWrap.appendChild(pagination);

      imageWrap.addEventListener("pointerdown", function (e) {
        if (images.length <= 1) return;
        onStart(e.clientX);

        try {
          imageWrap.setPointerCapture(e.pointerId);
        } catch {}
      });

      imageWrap.addEventListener("pointermove", function (e) {
        onMove(e.clientX);
      });

      imageWrap.addEventListener("pointerup", function (e) {
        try {
          imageWrap.releasePointerCapture(e.pointerId);
        } catch {}
        onEnd();
      });

      imageWrap.addEventListener("pointercancel", function () {
        onEnd();
      });

      imageWrap.addEventListener("lostpointercapture", function () {
        onEnd();
      });

      imageWrap.addEventListener(
        "touchstart",
        function (e) {
          if (!e.touches || !e.touches[0]) return;
          onStart(e.touches[0].clientX);
        },
        { passive: true },
      );

      imageWrap.addEventListener(
        "touchmove",
        function (e) {
          if (!e.touches || !e.touches[0]) return;
          onMove(e.touches[0].clientX);
        },
        { passive: true },
      );

      imageWrap.addEventListener("touchend", function () {
        onEnd();
      });

      imageWrap.addEventListener("touchcancel", function () {
        onEnd();
      });

      goTo(0, false);
    }
  } else {
    const empty = document.createElement("div");
    empty.style.cssText =
      "position:absolute;top:0;left:0;width:100%;height:100%;background:#e8e9eb;";
    imageWrap.appendChild(empty);
  }

  const infoWrap = document.createElement("div");
  infoWrap.style.cssText =
    "display:flex;align-items:flex-start;justify-content:space-between;padding:8px 0 24px;";

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
    "margin-top:8px;margin-left:12px;flex-shrink:0;background:none;" +
    "border:none;cursor:pointer;padding:0;line-height:1;";
  button.setAttribute("aria-label", "찜하기");
  button.innerHTML = createBookmarkSvg(isActive);

  infoWrap.appendChild(textLink);
  infoWrap.appendChild(button);

  item.appendChild(imageWrap);
  item.appendChild(infoWrap);

  return item;
}
