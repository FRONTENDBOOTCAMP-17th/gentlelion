import { get } from "../../../../shareApi/index.js";

export async function getCartListApi() {
  try {
    return await get("/cart");
  } catch (e) {
    if (e.status === 401) {
      const isConfirm = confirm(
        "로그인이 필요합니다. \n로그인 페이지로 이동하시겠습니까?",
      );
      location.href = isConfirm ? "/src/components/login/login.html" : "/";
    }
    throw e;
  }
}
