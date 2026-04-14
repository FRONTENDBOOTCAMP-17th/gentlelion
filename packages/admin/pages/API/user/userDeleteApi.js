import { del } from "@gentlelion/share-api";

export const userDeleteApi = (id) => del(`/admin/users/${id}`);
