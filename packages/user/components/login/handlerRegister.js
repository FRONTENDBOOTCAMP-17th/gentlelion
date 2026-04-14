import { postRegisterApi } from "../API/register/postRegisterApi";
import { checkPassword } from "./checkPassword";
import { checkKoreanName } from "./checkKoreanName";
import { formatPhoneNumber } from "./formatPhoneNumber";
import { checkRequired } from "./checkRequired";
import { initAddressSearch } from "./addressSearch";

async function handlerRegister() {
    initAddressSearch();
    formatPhoneNumber();
    const form = document.getElementById("loginForm");

    ["firstName", "lastName"].forEach((id) => {
        document.getElementById(id).addEventListener("input", () => {
            checkKoreanName(id);
        });
    });

    document.getElementById("agreeAll").addEventListener("change", (e) => {
        ["agreeTerms", "agreeAge", "agreeNewsletter", "agreePrivacy"].forEach((id) => {
            document.getElementById(id).checked = e.target.checked;
        });
    });

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const userData = {
            email: document.getElementById("emailInput").value.trim(),
            password: document.getElementById("passwordInput").value.trim(),
            firstName: document.getElementById("firstName").value.trim(),
            lastName: document.getElementById("lastName").value.trim(),
            phone: document.getElementById("phoneNumber").value.trim(),
            address: document.getElementById("address").value.trim(),
            addressDetail: document.getElementById("addressDetail").value.trim(),
        }

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

        if (!checkRequired()) {
            alert("필수 항목에 동의해주세요.");
            return;
        }

        try {
            await postRegisterApi(userData);
            alert("회원가입이 완료되었습니다.");
            window.location.href = "/components/login/login.html";
        } catch (error) {
            alert("회원가입에 실패했습니다. 다시 시도해주세요.");
        }
    });
}

handlerRegister();