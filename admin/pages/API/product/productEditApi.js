export async function editProduct(id, productData) {
  const API_URL = `https://api.fullstackfamily.com/api/gentlelion/v1/admin/products/${id}`;
  const TOKEN = localStorage.getItem("admin_token");

  try {
    const response = await fetch(API_URL, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      if (response.status === 401)
        throw new Error("인증이 필요합니다. 다시 로그인해주세요.");
      if (response.status === 403) throw new Error("관리자 권한이 없습니다.");
      if (response.status === 404)
        throw new Error("수정하려는 상품을 찾을 수 없습니다.");
      throw new Error(errorData.message || "상품 수정 중 오류가 발생했습니다.");
    }

    return await response.json();
  } catch (error) {
    console.error("editProduct API Error:", error);
    throw error;
  }
}
