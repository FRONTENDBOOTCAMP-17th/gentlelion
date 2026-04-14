export async function loadAccordion(container) {
  const res = await fetch("/components/accordion/accordion.html");
  if (!res.ok) return;
  const html = await res.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  doc.body.childNodes.forEach(function (node) {
    container.appendChild(node.cloneNode(true));
  });
}

export function initAccordion() {
  document.querySelectorAll(".acc-trigger").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const targetId = btn.getAttribute("data-target");
      const content = document.getElementById(targetId);
      const icon = btn.querySelector(".acc-icon");
      const isOpen = content.classList.contains("max-h-[600px]");

      document
        .querySelectorAll("#accDelivery, #accDetail, #accSize")
        .forEach(function (c) {
          c.classList.remove("max-h-[600px]");
          c.classList.add("max-h-0");
        });
      document.querySelectorAll(".acc-icon").forEach(function (i) {
        i.textContent = "+";
      });

      if (!isOpen) {
        content.classList.remove("max-h-0");
        content.classList.add("max-h-[600px]");
        icon.textContent = "−";
      }
    });
  });
}
