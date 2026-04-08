import { loginAPI } from "../../API/login/loginApi.js";

export async function handleLogin(e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const errorMsg = document.getElementById("errorMsg");
  const btn = document.getElementById("submitBtn");

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
