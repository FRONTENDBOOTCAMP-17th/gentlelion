import { put } from "@gentlelion/share-api";

export const putAddressApi = async ({ address, addressDetail }) => {
  const data = await put("/user/profile", {
    address,
    addressDetail,
  });
  return data.data;
};