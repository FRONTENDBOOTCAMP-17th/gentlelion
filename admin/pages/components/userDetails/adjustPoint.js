export async function adjustPoint(type, currentUser) {
  const amount = parseInt(document.getElementById("point-input").value);
  if (!amount || amount <= 0) return alert("포인트 금액을 입력해주세요.");

  const points =
    type === "add" ? currentUser.points + amount : currentUser.points - amount;

  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("토큰이 없습니다.");
      return null;
    }

    const res = await fetch(
      `https://api.fullstackfamily.com/api/gentlelion/v1/admin/users/${currentUser.userId}/points`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ points }),
      },
    );

    if (!res.ok) {
      throw new Error("API 요청 실패");
    }

    const data = await res.json();
    currentUser.points = data.data.points;

    document.getElementById("user-points").textContent =
      currentUser.points.toLocaleString() + "P";
    document.getElementById("point-input").value = "";
  } catch (error) {
    console.error(error);
    return null;
  }
}
