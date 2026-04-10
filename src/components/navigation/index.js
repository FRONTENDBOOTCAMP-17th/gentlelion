import { navButtonEvent } from "./navButtonEvent";
import { createNavigation } from "./createNavigation";

export function navigation() {
    const categories = [
        { label: "전체보기" },
        { label: "컬렉션" },
        { label: "썬글라스" },
        { label: "안경" }
    ];

    createNavigation(categories);
    navButtonEvent();
}