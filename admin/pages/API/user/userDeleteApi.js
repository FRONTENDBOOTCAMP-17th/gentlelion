import { del } from "../../../../shareApi/index.js";

export const userDeleteApi = (id) => del(`/admin/users/${id}`);
