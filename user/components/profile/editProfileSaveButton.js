import { putProfileApi } from "../API/profile/putProfileApi.js";

export async function editProfileSaveButton() {
  const firstName = document.getElementById("editFn").value.trim();
  const lastName = document.getElementById("editLn").value.trim();
  const phone = document.getElementById("editPhone").value.trim();

  try {
    await putProfileApi({ firstName, lastName, phone });
  } catch (err) {
    alert(err.message);
  }
}