import { post } from "../../../../shareApi/index.js";

export const postRegisterApi = (
  email,
  password,
  firstName,
  lastName,
  phone,
  address,
  addressDetail,
) =>
  post("/auth/signup", {
    email,
    password,
    firstName,
    lastName,
    phone,
    address,
    addressDetail,
  });
