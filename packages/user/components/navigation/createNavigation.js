export function createNavigation(categories) {
    const aside = document.querySelector(".navigation");

    const nav = document.createElement("nav");
    nav.className = "flex flex-col md:flex-row md:items-center text-(--text-primary) gap-3 ml-3 mt-[19.5px]";

    const ul = document.createElement("ul");
    ul.className = "flex gap-2.5 overflow-x-auto whitespace-nowrap text-[8.9px]";

    const currentPath = window.location.pathname;

    categories.forEach((category, index) => {
        const li = document.createElement("li");

        const a = document.createElement("a");
        a.href = category.href ?? "#";

        const isActive = category.href
            ? currentPath.includes(category.href)
            : index === 0;

        a.className = `navigation-button cursor-pointer flex items-center rounded-[20px] py-2 px-3.25 border border-(--subTitle-button) ${
            isActive ? "bg-(--subTitle-button)" : "bg-white"
        }`;

        const span = document.createElement("span");
        span.className = "text-center leading-3.5";
        span.textContent = category.label;

        a.appendChild(span);
        li.appendChild(a);
        ul.appendChild(li);
    });

    nav.appendChild(ul);
    aside.appendChild(nav);
}