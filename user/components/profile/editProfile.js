import { editProfileSaveButton } from "./editProfileSaveButton";
import { checkKoreanName } from "../login/checkKoreanName";

export function editProfile() {
    const editBtn = document.getElementById("profileEditBtn");
    const editForm = document.getElementById("profileEditForm");
    const saveBtn = document.getElementById("profileSaveBtn");
    const cancelBtn = document.getElementById("profileCancelBtn");

    editBtn.addEventListener("click", () => {
        const isHidden = editForm.classList.contains("hidden");

        if (isHidden) {
            document.getElementById("editFn").value = document.getElementById("fn").textContent;
            document.getElementById("editLn").value = document.getElementById("ln").textContent;
            document.getElementById("editPhone").value = document.getElementById("phone").textContent;

            editForm.classList.remove("hidden");
            editBtn.textContent = "편집 닫기";
        } else {
            editForm.classList.add("hidden");
            editBtn.textContent = "프로필 편집하기";
        }
    });

    saveBtn.addEventListener("click", async () => {
        if (!checkKoreanName("editFn") || !checkKoreanName("editLn")) {
            alert("성과 이름은 한글만 입력 가능합니다.");
            return;
        }

        try {
            await editProfileSaveButton();

            document.getElementById("fn").textContent = document.getElementById("editFn").value;
            document.getElementById("ln").textContent = document.getElementById("editLn").value;
            document.getElementById("phone").textContent = document.getElementById("editPhone").value;

            editForm.classList.add("hidden");
            editBtn.textContent = "프로필 편집하기";
        } catch (err) {
            alert("저장에 실패했습니다.");
        }
    });

    cancelBtn.addEventListener("click", () => {
        editForm.classList.add("hidden");
        editBtn.textContent = "프로필 편집하기";
    });
}