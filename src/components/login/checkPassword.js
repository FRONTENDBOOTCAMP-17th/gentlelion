export function checkPassword() {
  const password = document.getElementById("passwordInput");
  const passwordCheck = document.getElementById("passwordCheck");

  if (password.value !== passwordCheck.value) {
    passwordCheck.style.borderColor = "red";
    return false;
  }

  passwordCheck.style.borderColor = "";
  return true;
}