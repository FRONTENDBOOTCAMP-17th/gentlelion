const TRACK_WIDTH_MAP = {
  1: "w-full",
  2: "w-[200%]",
  3: "w-[300%]",
  4: "w-[400%]",
  5: "w-[500%]",
};

const SLIDE_WIDTH_MAP = {
  1: "w-full",
  2: "w-1/2",
  3: "w-1/3",
  4: "w-1/4",
  5: "w-1/5",
};

export function createImageCarousel(images = [], options = {}) {
  const { alt = "상품 이미지" } = options;

  const imageWrap = document.createElement("div");
  imageWrap.className =
    "carousel-wrap relative w-full overflow-hidden bg-[#F3F4F6] cursor-grab select-none md:aspect-[520/718] aspect-square";
  if (images.length === 0) {
    const empty = document.createElement("div");
    empty.className = "absolute inset-0 bg-[#e8e9eb]";
    imageWrap.appendChild(empty);
    return imageWrap;
  }

  const count = Math.min(images.length, 5);
  const trackWidthClass = TRACK_WIDTH_MAP[count] || "w-full";
  const slideWidthClass = SLIDE_WIDTH_MAP[count] || "w-full";

  const track = document.createElement("div");
  track.className = `absolute top-0 left-0 h-full flex ${trackWidthClass} transition-transform duration-300 ease-in-out`;

  images.forEach(function (src) {
    const slide = document.createElement("div");
    slide.className = `${slideWidthClass} h-full overflow-hidden flex-shrink-0`;

    const img = document.createElement("img");
    img.src = src;
    img.alt = alt;
    img.loading = "lazy";
    img.draggable = false;
    img.className =
      "w-full h-full object-cover object-center block pointer-events-none";

    slide.appendChild(img);
    track.appendChild(slide);
  });

  imageWrap.appendChild(track);

  if (images.length > 1) {
    const pagination = document.createElement("div");
    pagination.className =
      "absolute bottom-[10px] left-0 w-full flex justify-center gap-[4px] z-10 pointer-events-none";

    let curIdx = 0;
    const bullets = [];
    let startX = 0;
    let currentX = 0;
    let isDown = false;
    let isDragging = false;

    function updateBullets() {
      bullets.forEach(function (bullet, i) {
        if (i === curIdx) {
          bullet.classList.add("bg-[rgb(28,26,26)]");
          bullet.classList.remove("bg-[rgba(28,26,26,0.25)]");
        } else {
          bullet.classList.remove("bg-[rgb(28,26,26)]");
          bullet.classList.add("bg-[rgba(28,26,26,0.25)]");
        }
      });
    }

    function goTo(idx, animate) {
      if (animate === undefined) animate = true;
      curIdx = Math.max(0, Math.min(idx, images.length - 1));
      if (animate) {
        track.classList.add(
          "transition-transform",
          "duration-300",
          "ease-in-out",
        );
      } else {
        track.classList.remove(
          "transition-transform",
          "duration-300",
          "ease-in-out",
        );
      }
      track.style.transform = `translateX(-${curIdx * (100 / count)}%)`;
      updateBullets();
    }

    function onStart(clientX) {
      if (images.length <= 1) return;
      isDown = true;
      isDragging = false;
      startX = clientX;
      currentX = clientX;
      track.classList.remove(
        "transition-transform",
        "duration-300",
        "ease-in-out",
      );
      imageWrap.classList.remove("cursor-grab");
      imageWrap.classList.add("grabbing");
    }

    function onMove(clientX) {
      if (!isDown) return;
      currentX = clientX;
      const diff = currentX - startX;
      if (!isDragging && Math.abs(diff) > 5) isDragging = true;
      if (!isDragging) return;
      const step = 100 / count;
      const base = -(curIdx * step);
      let movePct = (diff / imageWrap.offsetWidth) * step;
      if (curIdx === 0 && diff > 0) movePct *= 0.2;
      if (curIdx === images.length - 1 && diff < 0) movePct *= 0.2;
      track.style.transform = `translateX(${base + movePct}%)`;
    }

    function onEnd() {
      if (!isDown) return;
      isDown = false;
      imageWrap.classList.add("cursor-grab");
      imageWrap.classList.remove("grabbing");
      const diff = currentX - startX;
      if (isDragging) {
        if (diff < -40 && curIdx < images.length - 1) goTo(curIdx + 1, true);
        else if (diff > 40 && curIdx > 0) goTo(curIdx - 1, true);
        else goTo(curIdx, true);
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
      bullet.className =
        "inline-block w-[8px] h-[1px] rounded-none cursor-pointer pointer-events-auto transition-colors duration-200 bg-[rgba(28,26,26,0.25)]";
      if (i === 0) {
        bullet.classList.add("bg-[rgb(28,26,26)]");
        bullet.classList.remove("bg-[rgba(28,26,26,0.25)]");
      }
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
      } catch (err) {}
    });
    imageWrap.addEventListener("pointermove", function (e) {
      onMove(e.clientX);
    });
    imageWrap.addEventListener("pointerup", function (e) {
      try {
        imageWrap.releasePointerCapture(e.pointerId);
      } catch (err) {}
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

  return imageWrap;
}
