import { orderPostApi } from "../API/order/orderPostApi";

export async function orderButton(token, items, pointsToUse, userMeta) {
    const buttons = document.querySelectorAll(".order-checkout-btn");

    const shippingAddress = {
        recipientName: userMeta.firstName + userMeta.lastName,
        phone: userMeta.phone,
        address: userMeta.address,
        addressDetail: userMeta.addressDetail
    }

    buttons.forEach((button) => {
        button.addEventListener("click", () => handleCheckout(token, items, shippingAddress, pointsToUse));
    })
}

async function handleCheckout(token, items, shippingAddress, pointsToUse) {
    const success = await orderPostApi(token, items, shippingAddress, pointsToUse);
    if(success){
        window.location.href = "/";
    }
}