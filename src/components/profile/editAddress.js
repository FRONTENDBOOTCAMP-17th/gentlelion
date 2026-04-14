import { editAddressSaveButton } from "./editAddressSaveButton";

export function editAddress(data) {
  const editBtn = document.getElementById("addressEditBtn");
  const editForm = document.getElementById("addressEditForm");
  const saveBtn = document.getElementById("addressSaveBtn");
  const cancelBtn = document.getElementById("addressCancelBtn");

  editBtn.addEventListener("click", () => {
    const isHidden = editForm.classList.contains("hidden");

    if (isHidden) {
      document.getElementById("editAdress").value = data.address ?? "";
      document.getElementById("editAdressDetail").value = data.addressDetail ?? "";

      editForm.classList.remove("hidden");
      editBtn.textContent = "편집 닫기";
    } else {
      editForm.classList.add("hidden");
      editBtn.textContent = data.address ? "편집하기" : "등록하기";
    }
  });

  saveBtn.addEventListener("click", async () => {
    const newAddress = document.getElementById("editAdress").value;
    const newAddressDetail = document.getElementById("editAdressDetail").value;

    document.getElementById("address").textContent = newAddress;
    document.getElementById("addressDetail").textContent = newAddressDetail;

    data.address = newAddress;
    data.addressDetail = newAddressDetail;

    editForm.classList.add("hidden");
    editBtn.textContent = "편집하기";
    await editAddressSaveButton();
  });

  cancelBtn.addEventListener("click", () => {
    editForm.classList.add("hidden");
    editBtn.textContent = data.address ? "편집하기" : "등록하기";
  });
}