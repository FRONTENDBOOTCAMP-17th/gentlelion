import { patch } from "../../../../shareApi/index.js";

export const orderPatchApi = (id, apidata) =>
  patch(`/admin/orders/${id}/status`, apidata);
