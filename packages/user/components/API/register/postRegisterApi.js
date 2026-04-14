import { post } from "@gentlelion/share-api";

export const postRegisterApi = ({ email, password, firstName, lastName, phone, address, addressDetail }) =>
  post("/auth/signup", { email, password, firstName, lastName, phone, address, addressDetail });