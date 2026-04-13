import { putProfileApi } from "../API/profile/putProfileApi.js";

export async function editSaveButton() {
  const firstName = document.getElementById("editFn").value.trim();
  const lastName = document.getElementById("editLn").value.trim();
  const email = document.getElementById("editEmail").value.trim();
  const phone = document.getElementById("editPhone").value.trim();

  try {
    await putProfileApi({ firstName, lastName, email, phone });
  } catch (err) {
    alert(err.message);
  }
}