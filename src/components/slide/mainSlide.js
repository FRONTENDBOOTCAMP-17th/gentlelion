export function initSlide() {
  const wrapper = document.querySelector(".swiper");
  const items = document.querySelector(".swiper-wrapper");
  const item = document.querySelectorAll(".swiper-slide");
  const thumbs = document.querySelectorAll(".thumb-item");

  let currentIdx = 0;
  let positions = [];
  let startX = 0;
  let moveX = 0;
  const itemCount = item.length;

  if (!wrapper || !items || itemCount === 0) return;

  function initializeData() {
    const rect = wrapper.getBoundingClientRect();
    const paddingLeft = rect.left;
    const itemWidth = item[0].offsetWidth;
    const gap = 0;

    let pos = [];
    for (let i = 0; i < itemCount; i++) {
      const targetPos = -((itemWidth + gap) * i) + paddingLeft;
      pos.push(targetPos);
    }
    positions = pos;

    items.style.transition = "none";
    items.style.transform = `translateX(${positions[currentIdx]}px)`;
  }

  function goToSlide(index) {
    if (index < 0) index = 0;
    if (index >= itemCount) index = itemCount - 1;

    currentIdx = index;
    items.style.transition = "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)";
    items.style.transform = `translateX(${positions[currentIdx]}px)`;

    thumbs.forEach((thumb, i) => {
      if (i === currentIdx) {
        thumb.classList.add("opacity-100");
        thumb.classList.remove("opacity-50");
      } else {
        thumb.classList.remove("opacity-100");
        thumb.classList.add("opacity-50");
      }
    });
  }

  wrapper.onmousedown = (e) => {
    startX = e.clientX;
    items.style.transition = "none";

    const onMouseMove = (e) => {
      moveX = e.clientX - startX;
      const currentLeft = positions[currentIdx] + moveX;

      if (
        (currentIdx === 0 && moveX > 0) ||
        (currentIdx === itemCount - 1 && moveX < 0)
      ) {
        items.style.transform = `translateX(${positions[currentIdx] + moveX * 0.3}px)`;
      } else {
        items.style.transform = `translateX(${currentLeft}px)`;
      }
    };

    document.onmousemove = onMouseMove;

    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;

      items.style.transition = "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)";

      if (Math.abs(moveX) > 70) {
        moveX > 0 ? goToSlide(currentIdx - 1) : goToSlide(currentIdx + 1);
      } else {
        goToSlide(currentIdx);
      }
      moveX = 0;
    };
  };

  thumbs.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      const index = parseInt(thumb.getAttribute("data-index"));
      goToSlide(index);
    });
  });

  window.addEventListener("resize", initializeData);
  initializeData();
}
