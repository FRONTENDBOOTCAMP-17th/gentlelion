import { orderPatchApi } from "../../API/order/orderPatchApi.js"

export function chaseProductState(data){
    const button = {
        confirmed: document.getElementById("confirmed"),
        pending: document.getElementById("pending"),
        shipping: document.getElementById("shipping"),
        delivered: document.getElementById("delivered")
    };

    const id = data.data.orderId;
    const status = data.data.status;
    const trackingNum = data.data.trackingNumber;

    const buttons = Object.values(button);

    const activeBtn = button[status.toLowerCase()];
    if (activeBtn) {
        activeBtn.classList.remove("bg-(--cancle-button)");
        activeBtn.classList.add("bg-(--active-button)", "text-white");
    }

    buttons.forEach((btn) => {
        btn.addEventListener("click", async () => {
            buttons.forEach((b) => {
                b.classList.remove("bg-(--active-button)", "text-white");
                b.classList.add("bg-(--cancle-button)");
            });

            btn.classList.remove("bg-(--cancle-button)");
            btn.classList.add("bg-(--active-button)", "text-white");

            await orderPatchApi(id, {
                status: btn.id.toUpperCase(),
                trackingNumber : trackingNum
            });
        });
    });
}