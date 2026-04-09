export function initTabCarousel(container, options = {}) {
  if (!container) return;

  const {
    buttonSelector = ".subnav-btn",
    activeClass = "bg-(--subTitle-button)",
    inactiveClass = "bg-white",
    dragThreshold = 5,
  } = options;

  let isPointerDown = false;
  let isDragging = false;
  let startX = 0;
  let startScrollLeft = 0;

  function getButtons() {
    return container.querySelectorAll(buttonSelector);
  }

  function setActiveButton(targetButton) {
    const buttons = getButtons();
    buttons.forEach((button) => {
      button.classList.remove(activeClass);
      button.classList.add(inactiveClass);
    });
    targetButton.classList.remove(inactiveClass);
    targetButton.classList.add(activeClass);
  }

  function handlePointerMove(e) {
    if (!isPointerDown) return;
    const deltaX = e.clientX - startX;
    if (Math.abs(deltaX) > dragThreshold) isDragging = true;
    if (!isDragging) return;
    container.scrollLeft = startScrollLeft - deltaX;
  }

  function handlePointerUp() {
    isPointerDown = false;
    window.removeEventListener("pointermove", handlePointerMove);
    window.removeEventListener("pointerup", handlePointerUp);
    window.removeEventListener("pointercancel", handlePointerUp);
    container.classList.remove("cursor-grabbing");
    container.classList.add("cursor-grab");
    requestAnimationFrame(() => {
      isDragging = false;
    });
  }

  container.addEventListener("pointerdown", (e) => {
    isPointerDown = true;
    isDragging = false;
    startX = e.clientX;
    startScrollLeft = container.scrollLeft;
    container.classList.remove("cursor-grab");
    container.classList.add("cursor-grabbing");
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);
  });

  container.addEventListener("click", (e) => {
    const button = e.target.closest(buttonSelector);
    if (!button) return;
    if (isDragging) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    setActiveButton(button);
  });

  container.addEventListener("dragstart", (e) => {
    e.preventDefault();
  });
}
