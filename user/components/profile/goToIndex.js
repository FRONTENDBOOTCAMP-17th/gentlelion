export function goToIndex(){
    const button = document.getElementById("goIndexBtn");

    button.addEventListener("click", () => {
        location.href = "/";
    })
}