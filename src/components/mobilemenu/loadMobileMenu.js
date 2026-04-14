export async function loadMobileMenu() {
  const response = await fetch("/src/components/mobilemenu/mobileMenu.html");
  if (!response.ok) return;

  const html = await response.text();
  document.body.insertAdjacentHTML("afterbegin", html);
}
