export async function logoutAPI() {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("토큰이 없습니다.");
      return null;
    }

    const res = await fetch(
      "https://api.fullstackfamily.com/api/gentlelion/v1/auth/logout",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!res.ok) {
      throw new Error("API 요청 실패");
    }

    localStorage.removeItem("token");
    window.location.href = "./login.html";
  } catch (error) {
    console.error(error);
    return null;
  }
}
