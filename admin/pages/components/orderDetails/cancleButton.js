export function cancleButton() {
    const cancle = document.getElementById("cancle");

    cancle.addEventListener("click", () => {
        window.close();
    })
}