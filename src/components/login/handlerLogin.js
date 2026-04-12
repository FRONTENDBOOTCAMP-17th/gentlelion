import { loginPostApi } from "../API/login/loginPostApi";

async function handlerLogin() {
    const form = document.getElementById("loginForm");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("emailInput").value.trim();
        const pw = document.getElementById("pwInput").value.trim();

        if (!email || !pw) return;

        try {
            const response = await loginPostApi(email, pw);
            localStorage.setItem("token", response.token);
            window.location.href = "/";
        } catch (error) {
            console.error("로그인 실패:", error);
            alert("이메일 또는 비밀번호를 확인해주세요.");
        }
    });
}

handlerLogin();