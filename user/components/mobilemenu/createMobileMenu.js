import { getWishlist } from "../API/wishlist/wishlistApi";
import { getProfileApi } from "../API/profile/getProfileApi";

export async function createMobileMenu() {
  let wishCount = 0;
  let hasItems = false;
  let userName = null;

  try {
    const wishdata = await getWishlist();
    wishCount = wishdata.data.items.length;
    hasItems = wishCount > 0;
  } catch {
    // 비로그인 또는 오류 시 기본값 유지
  }

  try {
    const profile = await getProfileApi();
    userName = profile.lastName;
  } catch {
    // 비로그인 상태
  }

  const menuData = {
    mainNav: [
      { label: "선글라스", href: "/src/pages/sunglasses.html" },
      { label: "안경", href: "/src/pages/glasses.html" },
      { label: "컬렉션", href: "/src/pages/collection.html" },
    ],
    subNav: [
      { label: "스토리", href: "/" },
      { label: "서비스", href: "/" },
    ],
    accountLinks: userName
      ? [{ label: `안녕하세요, ${userName}님`, href: "/src/components/profile/profile.html" }]
      : [{ label: "로그인 / 계정 생성", href: "/src/components/login/login.html" }],
    wishlist: {
      href: "/src/components/profile/profile.html",
      count: wishCount,
      emptyMessage: "아직 위시리스트에 추가된 제품이 없습니다.",
    },
    utilLinks: [
      { label: "고객 서비스", href: "/" },
      { label: "국가: South Korea", href: "/" },
    ],
  };

  const mobileMenu = document.createElement("div");
  mobileMenu.id = "mobileMenu";
  mobileMenu.className =
    "fixed opacity-0 pointer-events-none transition-all duration-500 top-0 z-49 left-0 bg-white w-screen h-full";

  const aside = document.createElement("aside");
  aside.className = "relative top-40 ml-5";

  const nav = document.createElement("nav");
  nav.append(
    createNavList(menuData.mainNav, "text-[22px]", "mb-3"),
    createNavList(menuData.subNav, "text-[18px]")
  );

  const accountDiv = document.createElement("div");
  accountDiv.className = "mt-35 text-[12px] flex flex-col";
  menuData.accountLinks.forEach(({ label, href }) => {
    accountDiv.appendChild(createLink(label, href));
  });

  const wishlistDiv = document.createElement("div");
  wishlistDiv.className = "mt-2 text-[12px] w-max";

  const wishlistLink = createLink("위시리스트", menuData.wishlist.href);
  const sup = document.createElement("sup");
  sup.textContent = menuData.wishlist.count;
  wishlistLink.appendChild(sup);
  wishlistDiv.appendChild(wishlistLink);

  if (!hasItems) {
    const emptyMsg = document.createElement("p");
    emptyMsg.className = "menu-animate font-medium mt-11";
    emptyMsg.textContent = menuData.wishlist.emptyMessage;
    wishlistDiv.appendChild(emptyMsg);
  }

  const utilDiv = document.createElement("div");
  utilDiv.className = "text-[12px] mt-12 font-medium flex flex-col gap-3";
  menuData.utilLinks.forEach(({ label, href }) => {
    utilDiv.appendChild(createLink(label, href));
  });

  aside.append(nav, accountDiv, wishlistDiv, utilDiv);
  mobileMenu.appendChild(aside);
  document.body.prepend(mobileMenu);
}

function createNavList(items, textClass, extraClass = "") {
  const ul = document.createElement("ul");
  ul.className = `font-medium flex flex-col gap-2 ${extraClass}`.trim();

  items.forEach(({ label, href }) => {
    const li = document.createElement("li");
    li.className = `menu-animate ${textClass}`;

    const a = document.createElement("a");
    a.href = href;
    a.className = "w-max";
    a.textContent = label;

    li.appendChild(a);
    ul.appendChild(li);
  });

  return ul;
}

function createLink(label, href) {
  const a = document.createElement("a");
  a.href = href;
  a.className = "menu-animate w-max";
  a.textContent = label;
  return a;
}