/**
 * colorChips.js
 * ─────────────────────────────────────────────
 * 상품 색상 칩 UI를 생성하는 모듈입니다.
 * colors.js에 데이터가 없는 상품은 칩이 생성되지 않습니다.
 *
 * ── 사용 방법 ──────────────────────────────────
 *
 * 1) import
 *    import { renderColorChips } from "../components/colorChips.js";
 *
 * 2) 호출
 *    renderColorChips({
 *      productId: currentProduct.id,
 *      chipsEl: document.getElementById("color-chips"),
 *      textEl: document.getElementById("color-text"),
 *    });
 */

import { productColors } from "./colors.js";

export function renderColorChips({ productId, chipsEl, textEl }) {
  const colorData = productColors[productId];

  // 색상 데이터가 없으면 아무것도 생성하지 않음
  if (!colorData || !colorData.chips || colorData.chips.length === 0) return;

  colorData.chips.forEach((color, i) => {
    const chip = document.createElement("button");
    chip.style.cssText =
      "background:none;border:none;cursor:pointer;padding:0;";

    const swatch = document.createElement("div");
    swatch.style.cssText = `width:24px;height:24px;background:${color.background};`;
    chip.appendChild(swatch);

    if (i === colorData.activeIndex) {
      const underline = document.createElement("span");
      underline.style.cssText =
        "display:block;width:100%;height:1px;background:#111;margin-top:2px;";
      chip.appendChild(underline);
      textEl.textContent = color.label;
    }

    chip.addEventListener("click", () => {
      textEl.textContent = color.label;

      // 기존 밑줄 모두 제거
      chipsEl.querySelectorAll("span").forEach((s) => s.remove());

      // 클릭한 칩에 밑줄 추가
      const underline = document.createElement("span");
      underline.style.cssText =
        "display:block;width:100%;height:1px;background:#111;margin-top:2px;";
      chip.appendChild(underline);
    });

    chipsEl.appendChild(chip);
  });
}
