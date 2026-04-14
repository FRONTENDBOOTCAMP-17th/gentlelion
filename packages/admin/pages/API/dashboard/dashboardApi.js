import { get } from "@gentlelion/share-api";

export const dashboardAPI = async () => {
  const data = await get("/admin/dashboard");
  return data.data;
};
