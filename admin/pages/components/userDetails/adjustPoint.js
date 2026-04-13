import { patch } from "../../../../shareApi/index.js";

export async function adjustPoint(type, currentUser) {
  const amount = parseInt(document.getElementById("point-input").value);
  if (!amount || amount <= 0) return alert("포인트 금액을 입력해주세요.");

  const points =
    type === "add" ? currentUser.points + amount : currentUser.points - amount;

  const data = await patch(`/admin/users/${currentUser.userId}/points`, {
    points,
  });
  currentUser.points = data.data.points;

  document.getElementById("user-points").textContent =
    currentUser.points.toLocaleString() + "P";
  document.getElementById("point-input").value = "";
}
