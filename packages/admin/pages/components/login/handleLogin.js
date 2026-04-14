import { loginAPI } from "../../API/login/loginApi.js";

export async function handleLogin(e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const errorMsg = document.getElementById("errorMsg");
  const btn = document.getElementById("submitBtn");

  if (!email || !password) {
    errorMsg.textContent = "이메일과 비밀번호를 모두 입력해주세요";
    errorMsg.classList.remove("hidden");
    return;
  }

  errorMsg.classList.add("hidden");
  btn.disabled = true;

  try {
    const data = await loginAPI(email, password);

    if (data) {
      window.location.href = "dashboard.html";
    }
  } catch (error) {
    errorMsg.classList.remove("hidden");
    btn.disabled = false;
  }
}

window.handleLogin = handleLogin;
