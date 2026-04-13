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

    window.adjustPoint = async (type) => {
      try {
        await adjustPoint(type, data);
      } catch (e) {
        alert(e.message);
      }
    };
  } catch (error) {
    console.error(error);
  }
}

init();
