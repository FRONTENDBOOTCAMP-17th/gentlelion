export function checkKoreanName(inputId) {
  const input = document.getElementById(inputId);
  const koreanOnly = /^[가-힣]+$/;

  if (!koreanOnly.test(input.value)) {
    input.classList.add("border-red-500");
    input.classList.remove("border-white");
    return false;
  }

  input.classList.remove("border-red-500");
  input.classList.add("border-white");
  return true;
}