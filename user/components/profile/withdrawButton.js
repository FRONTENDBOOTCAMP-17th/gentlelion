import { postWithdrawApi } from "../API/withdraw/postWithdrawApi";

export async function withdrawButton() {
  const password = document.getElementById("withdrawPassword").value.trim();

  if (!password) {
    alert("비밀번호를 입력해주세요.");
    return;
  }

  try {
    await postWithdrawApi(password);
    alert("계정이 탈퇴되었습니다.");
    localStorage.removeItem("token");
    window.location.href = "/";
  } catch (err) {
    alert(err.message);
  }
}