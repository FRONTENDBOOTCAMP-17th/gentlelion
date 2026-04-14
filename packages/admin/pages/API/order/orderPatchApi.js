import { patch } from "@gentlelion/share-api";

export const orderPatchApi = (id, apidata) =>
  patch(`/admin/orders/${id}/status`, apidata);
