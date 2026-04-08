import { render } from "./render.js";
import { adjustPoint } from "./adjustPoint.js";
import { userDetailAPI } from "../../API/user/userDetailApi.js";

const id = new URLSearchParams(window.location.search).get("userId");

async function init() {
  try {
    const data = await userDetailAPI(id);

    if (!data) {
      console.error("데이터 없음");
      return;
    }

    render(data);

    window.adjustPoint = (type) => adjustPoint(type, data);
  } catch (error) {
    console.error(error);
  }
}

init();
