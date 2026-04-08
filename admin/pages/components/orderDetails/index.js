import { orderDetailsAPI } from "../../API/order/orderDetailsApi.js";
import { renderOrderDetails } from "./renderOrderDetails.js";
import { chaseProductState } from "./chaseProductState.js";

async function updateOrderDetails() {
    try {
        const params = new URLSearchParams(window.location.search);
        const id = params.get("orderId");

        const data = await orderDetailsAPI(id);
        console.log(data);


        renderOrderDetails(data);
        chaseProductState(data);

    } catch (error) {
        console.error(error);
    }
}

updateOrderDetails();