import { postRegisterApi } from "../API/register/postRegisterApi";

async function handlerRegister() {
    const form = document.getElementById("loginForm");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("emailInput").value.trim();
        const pw = document.getElementById("passwordInput").value.trim();
        const fn = document.getElementById("firstName").value.trim();
        const ln = document.getElementById("lastName").value.trim();
        const phone = document.getElementById("phoneNumber").value.trim();
        const address = document.getElementById("address").value.trim();
        const addressDetail = document.getElementById("addressDetail").value.trim();

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