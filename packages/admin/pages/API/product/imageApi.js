import { upload } from "@gentlelion/share-api";

export async function uploadImages(files) {
  const tasks = Array.from(files).map((file) => {
    const formData = new FormData();
    formData.append("file", file);
    return upload("/admin/images", formData);
  });
  const results = await Promise.all(tasks);
  return results.map((r) => r.data.imageUrl);
}