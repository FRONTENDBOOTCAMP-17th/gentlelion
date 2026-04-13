import { postRegisterApi } from "../API/register/postRegisterApi";
import { checkPassword } from "./checkPassword";
import { checkKoreanName } from "./checkKoreanName";
import { formatPhoneNumber } from "./formatPhoneNumber";

async function handlerRegister() {
    formatPhoneNumber();
    const form = document.getElementById("loginForm");

    ["firstName", "lastName"].forEach((id) => {
        document.getElementById(id).addEventListener("input", () => {
            checkKoreanName(id);
        });
    });

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("emailInput").value.trim();
        const pw = document.getElementById("passwordInput").value.trim();
        const fn = document.getElementById("firstName").value.trim();
        const ln = document.getElementById("lastName").value.trim();
        const phone = document.getElementById("phoneNumber").value.trim();
        const address = document.getElementById("address").value.trim();
        const addressDetail = document.getElementById("addressDetail").value.trim();

        if (!checkPassword()) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        const isFirstNameValid = checkKoreanName("firstName");
        const isLastNameValid = checkKoreanName("lastName");

        if (!isFirstNameValid || !isLastNameValid) {
            alert("성과 이름은 한글만 입력 가능합니다.");
            return;
        }

        try {
            await postRegisterApi(email, pw, fn, ln, phone, address, addressDetail);
            alert("회원가입이 완료되었습니다.");
            window.location.href = "/src/components/login/login.html";
        } catch (error) {
            alert("회원가입에 실패했습니다. 다시 시도해주세요.");
        }
    });
}

handlerRegister();