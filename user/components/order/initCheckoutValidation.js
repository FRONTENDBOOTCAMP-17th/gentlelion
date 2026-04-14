export function initCheckoutValidation() {
  const state = {
    address: false,
    shipping: false,
    payment: false,
  };

  const addressBtn = document.getElementById("addressBtn");
  const shippingBtn = document.getElementById("shippingBtn");
  const paymentBtn = document.getElementById("paymentBtn");
  const purchaseBtns = document.querySelectorAll(".order-checkout-btn");

  function updatePurchaseBtn() {
    const allSelected = state.address && state.shipping && state.payment;
    purchaseBtns.forEach((btn) => {
      btn.disabled = !allSelected;
      btn.classList.toggle("opacity-50", !allSelected);
      btn.classList.toggle("cursor-not-allowed", !allSelected);
    });
  }

  function toggleState(key, btn) {
    state[key] = !state[key];
    if (state[key]) {
      btn.classList.add("border-2", "border-black");
    } else {
      btn.classList.remove("border-2", "border-black");
    }
    updatePurchaseBtn();
  }

  addressBtn.addEventListener("click", () => toggleState("address", addressBtn));
  shippingBtn.addEventListener("click", () => toggleState("shipping", shippingBtn));
  paymentBtn.addEventListener("click", () => toggleState("payment", paymentBtn));

  purchaseBtns.forEach((btn) => {
    btn.disabled = true;
    btn.classList.add("opacity-50", "cursor-not-allowed");
  });
}