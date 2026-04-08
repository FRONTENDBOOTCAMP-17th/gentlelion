export async function addProduct(productData) {
  const API_URL =
    "https://api.fullstackfamily.com/api/gentlelion/v1/admin/products";
  const TOKEN = localStorage.getItem("admin_token");

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "등록 실패");
    }

    return await response.json();
  } catch (error) {
    alert(error.message);
    throw error;
  }
}
