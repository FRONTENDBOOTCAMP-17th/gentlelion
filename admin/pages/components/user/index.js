import { userApi } from "../../API/user/userListApi.js";
import { paginationButton } from "../order/paginationButton.js";
import { calcListNum } from "../common/calcListNum.js";
import { search } from "../common/search.js";
import { renderUserRows } from "./renderUserRows.js";

async function user(page = 1) {
  try {
    const data = await userApi(page, 20);
    console.log(data);

    if (!data || !data.data) {
      console.error("데이터 없음");
      return;
    }

    const tbody = document.querySelector("tbody");
    if (!tbody) {
      throw new Error("tbody를 찾을 수 없습니다.");
    }

    const userSearch = document.getElementById("search");
    const buttonComponents = document.getElementById("listButtonComponents");
    const total = document.getElementById("ListTotal");
    const range = document.getElementById("ListNum");

    const users = Array.isArray(data.data.users) ? data.data.users : [];
    const pagination = data.data.pagination ?? {};
    const totalPages = pagination.totalPages ?? 1;
    const totalCount = pagination.totalCount ?? 0;
    const currentPage = pagination.page ?? page;

    if (buttonComponents) {
      buttonComponents.innerHTML = "";
    }

    if (total) {
      total.textContent = totalCount;
    }

    renderUserRows(tbody, users, user);

    paginationButton(buttonComponents, totalPages, currentPage, user);
    calcListNum(data, range, currentPage);

    const onSearch = (filteredUsers) => renderUserRows(tbody, filteredUsers);

    const filterFn = (item, keyword) => {
      const userId = String(item.userId ?? "").toLowerCase();
      const userName = String((item.firstName ?? "") + (item.lastName ?? "")).toLowerCase();
      const userEmail = String(item.email ?? "").toLowerCase();
      return userId.includes(keyword) || userEmail.includes(keyword) || userName.includes(keyword);
    };

    search(users, userSearch, onSearch, filterFn);

  } catch (error) {
    console.error(error);
  }
}

user(1);