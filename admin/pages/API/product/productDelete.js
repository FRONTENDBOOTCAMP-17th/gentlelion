export async function deleteProduct(id) {
  const API_URL = `https://api.fullstackfamily.com/api/gentlelion/v1/admin/products/${id}`;
  const TOKEN = localStorage.getItem("admin_token");

  try {
    const response = await fetch(API_URL, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      if (response.status === 401) throw new Error("인증이 필요합니다.");
      if (response.status === 403) throw new Error("관리자 권한이 필요합니다.");
      if (response.status === 404) throw new Error("상품을 찾을 수 없습니다.");
      throw new Error(errorData.message || "삭제 실패");
    }

    return await response.json();
  } catch (error) {
    console.error("deleteProduct API Error:", error);
    throw error;
  }
}
