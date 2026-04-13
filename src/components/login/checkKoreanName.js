export function checkKoreanName(inputId) {
  const input = document.getElementById(inputId);
  const koreanOnly = /^[가-힣]+$/;

  if (!koreanOnly.test(input.value)) {
    input.style.borderColor = "red";
    return false;
  }

  input.style.borderColor = "";
  return true;
}