import { withdrawButton } from "./withdrawButton.js";

export function withdrawInput() {
  const editBtns = document.querySelectorAll(".withdraw-btn");
  const editForm = document.getElementById("withdrawForm");
  const saveBtn = document.getElementById("withdrawSaveBtn");
  const cancelBtn = document.getElementById("withdrawCancelBtn");

  editBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      editForm.classList.toggle("hidden");
    });
  });

  saveBtn.addEventListener("click", async () => {
    await withdrawButton();
  });

  cancelBtn.addEventListener("click", () => {
    editForm.classList.add("hidden");
    document.getElementById("withdrawPassword").value = "";
  });
}