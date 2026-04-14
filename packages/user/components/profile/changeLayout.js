import { clickEvent } from "./clickEvent";

export function changeLayout() {
    const buttons = document.querySelectorAll(".tabBtn");
    const sections = {
        "구매한 제품": document.querySelector(".order-section"),
        "위시리스트": document.querySelector(".wishlist-section"),
        "프로필": document.querySelector(".profile-section"),
    };
    clickEvent();

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            Object.values(sections).forEach(section => section.classList.add("hidden"));

            const target = sections[button.textContent.trim()];
            if (target) target.classList.remove("hidden");
        });
    });
}