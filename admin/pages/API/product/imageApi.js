import { upload } from "../../../../shareApi/index.js";

export async function uploadImage(file) {
  const formData = new FormData();
  formData.append("file", file);
  const result = await upload("/admin/images", formData);
  return result.data.imageUrl;
}
