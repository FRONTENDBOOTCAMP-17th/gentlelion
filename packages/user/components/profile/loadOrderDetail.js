import { getOrderDetailsApi } from "../API/order/getOrderDetailsApi.js"

const statusMap = {
    pending: "주문 확인 중",
    CONFIRMED: "주문 확인됨",
    DELIVERED: "배송 완료",
};

export async function loadOrderDetail(token, orderId) {
    const res = await getOrderDetailsApi(token, orderId);
    const order = res.data;
    const container = document.querySelector(".order-section-card");
    const detailEl = document.querySelector(".order-detail");
    const detailContent = document.querySelector(".order-detail-content");
    const backBtn = document.querySelector(".order-back-btn");

    // HTML 템플릿 fetch
    const response = await fetch('/components/profile/orderDetails.html');
    if (!response.ok) return;
    const html = await response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const card = doc.body.firstElementChild;

    card.querySelector(".order-date").textContent = order.orderDate.split("T")[0];
    card.querySelector(".order-number").textContent = order.orderNumber;
    card.querySelector(".order-status").textContent = statusMap[order.status] ?? order.status;
    card.querySelector(".order-total-price").textContent = "₩" + order.totalPrice.toLocaleString();
    card.querySelector(".order-shipping-fee").textContent = order.shippingFee === 0 ? "무료" : "₩" + order.shippingFee.toLocaleString();
    card.querySelector(".order-points-used").textContent = "-₩" + order.pointsUsed.toLocaleString();
    card.querySelector(".order-final-price").textContent = "₩" + order.finalPrice.toLocaleString();
    card.querySelector(".order-recipient").textContent = order.shippingAddress.recipientName;
    card.querySelector(".order-address").textContent = order.shippingAddress.address + " " + order.shippingAddress.addressDetail;
    card.querySelector(".order-phone").textContent = order.shippingAddress.phone;

    const itemsContainer = card.querySelector(".order-items");
    order.items.forEach(item => {
        const itemEl = document.createElement("div");
        itemEl.className = "flex justify-between items-center";
        itemEl.innerHTML = `
            <div class="flex flex-col gap-1">
                <p class="text-[13px] font-bold">${item.productName}</p>
                <p class="text-[12px] text-[#858585]">${item.color} · ${item.quantity}개</p>
            </div>
            <p class="text-[13px]">₩${item.orderPrice.toLocaleString()}</p>
        `;
        itemsContainer.appendChild(itemEl);
    });

    detailContent.innerHTML = "";
    detailContent.appendChild(card);

    container.classList.add("hidden");
    detailEl.classList.remove("hidden");

    const newBackBtn = backBtn.cloneNode(true);
    backBtn.parentNode.replaceChild(newBackBtn, backBtn);
    newBackBtn.addEventListener("click", () => {
        container.classList.remove("hidden");
        detailEl.classList.add("hidden");
    });
}