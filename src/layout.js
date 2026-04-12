import { loadHeader } from "./components/header/header.js";
import { loadFooter } from "./components/footer/footer.js";
import { headerEvent } from "./components/header/headerEvent.js";
import { profileButton } from "./components/header/profileButton.js";
import { initMenuAnimation } from "./components/mobilemenu/menuAnimation.js";
import "./components/style.css";

async function init() {
  await loadHeader();
  headerEvent();
  initMenuAnimation();
  if (document.body.dataset.footer !== "false") {
    loadFooter();
  }
  profileButton();
}

init();