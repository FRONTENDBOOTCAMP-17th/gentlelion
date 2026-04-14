const COLOR_MAP = {
  Black: "#111111",
  White: "#ffffff",
  Gray: "#888780",
  Brown: "#6B3A2A",
  Gold: "#C9A84C",
  Red: "#C20A40",
  Blue: "#1F46A4",
  Orange: "#E8590C",
  Green: "#2D6A2D",
  Tortoise: "#6B3A2A",
  Silver: "#C0C0C0",
  Yellow: "#F5C518",
};

export function renderColorChips({ colors, chipsEl, textEl }) {
  if (!colors || colors.length === 0) return;

  let activeIndex = 0;

  colors.forEach(function (color, i) {
    const chip = document.createElement("button");
    chip.className = "bg-transparent border-none cursor-pointer p-0";

    const swatch = document.createElement("div");
    swatch.className = "w-[24px] h-[24px]";
    swatch.style.background = COLOR_MAP[color.name] || "#cccccc";
    chip.appendChild(swatch);

    if (i === activeIndex) {
      const underline = document.createElement("span");
      underline.className = "block w-full h-[1px] bg-[#111111] mt-[2px]";
      chip.appendChild(underline);
      textEl.textContent = color.name;
    }

    chip.addEventListener("click", function () {
      textEl.textContent = color.name;

      chipsEl.querySelectorAll("span").forEach(function (s) {
        s.remove();
      });

      const underline = document.createElement("span");
      underline.className = "block w-full h-[1px] bg-[#111111] mt-[2px]";
      chip.appendChild(underline);
    });

    chipsEl.appendChild(chip);
  });
}
