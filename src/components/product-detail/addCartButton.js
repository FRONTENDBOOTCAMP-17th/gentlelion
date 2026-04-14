import { postCartApi } from "../API/cart/postCartApi";

export function addCartButton(productId, quantity, color){
    const button = document.getElementById("cartBtn");

    button.addEventListener("click", async() => {
        await postCartApi(productId, quantity, color)
        alert("카트에 추가되었습니다.");
    });
}