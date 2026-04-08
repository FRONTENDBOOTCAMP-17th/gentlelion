export async function loginAPI(email, password) {
  try {
    const res = await fetch(
      "https://api.fullstackfamily.com/api/gentlelion/v1/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      },
    );

    if (!res.ok) {
      throw new Error("API 요청 실패");
    }

    const data = await res.json();
    localStorage.setItem("token", data.token);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
