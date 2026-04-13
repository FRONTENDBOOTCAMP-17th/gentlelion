import { getOrderApi } from "../API/order/getOrderApi";
import { loadOrderDetail } from "./loadOrderDetail";

export async function loadRecent(token) {
    const data = await getOrderApi(token);

    const container = document.querySelector(".order-section-card");
    const emptyEl = document.querySelector(".order-no");

    if (!data.data.orders.length) {
        emptyEl.classList.remove("hidden");
        return;
    }

    const response = await fetch('/src/components/orderList/orderListCard.html');
    if (!response.ok) return;
    const html = await response.text();

    const statusMap = {
        pending: "주문 확인 중",
        CONFIRMED: "주문 확인됨",
        DELIVERED: "배송 완료",
    };

    data.data.orders.forEach((order) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const card = doc.body.firstElementChild;

        card.querySelector(".order-number").textContent = order.orderNumber;
        card.querySelector(".order-status").textContent = statusMap[order.status] ?? order.status;
        card.querySelector(".order-price").textContent = "₩" + order.totalPrice.toLocaleString();
        card.querySelector(".order-date").textContent = order.orderDate.split("T")[0];
        card.dataset.orderId = order.orderId;

        card.addEventListener("click", () => {
            loadOrderDetail(token, card.dataset.orderId);
        })

        container.appendChild(card);
    });
}