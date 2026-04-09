export async function uploadImage(file) {
  const API_URL =
    "https://api.fullstackfamily.com/api/gentlelion/v1/admin/images";
  const TOKEN = localStorage.getItem("admin_token");

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "이미지 업로드 실패");
    }

    const result = await response.json();
    return result.data.imageUrl;
  } catch (error) {
    console.error("Image Upload Error:", error);
    throw error;
  }
}
