import { orderDetailsAPI } from "../../API/order/orderDetailsApi.js";
import { renderOrderDetails } from "./renderOrderDetails.js";
import { chaseProductState } from "./chaseProductState.js";
import { cancelButton } from "./cancelButton.js";

async function updateOrderDetails() {
  try {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("orderId");

    const data = await orderDetailsAPI(id);

        renderOrderDetails(data);
        chaseProductState(data);
        cancleButton();
    } catch (error) {
        if (error.status === 401) {
            window.location.href = "/pages/login.html";
            return;
        }
    }
    console.error(error);
  }
}

updateOrderDetails();
