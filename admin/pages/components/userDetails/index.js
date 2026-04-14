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

    const addPointBtn = document.getElementById("addPointBtn");
    const subPointBtn = document.getElementById("subPointBtn");

    if (addPointBtn) {
      addPointBtn.addEventListener("click", async () => {
        try {
          await adjustPoint("add", data);
        } catch (e) {
          alert(e.message);
        }
      });
    }

    if (subPointBtn) {
      subPointBtn.addEventListener("click", async () => {
        try {
          await adjustPoint("sub", data);
        } catch (e) {
          alert(e.message);
        }
      });
    }
  } catch (error) {
    console.error(error);
  }
}

init();
