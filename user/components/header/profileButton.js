import { goToMyPage } from "./goToMyPage";

export function profileButton() {
    const profileBtn = document.getElementById("myPageButton");

    profileBtn.addEventListener("click", goToMyPage);
}