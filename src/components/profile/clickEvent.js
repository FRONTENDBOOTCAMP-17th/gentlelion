const tabButtons = document.querySelectorAll(".tabBtn");

const active = ["bg-[#dfe3e8]", "text-black", "border-transparent"];

const inactive = ["text-[#858585]", "border-[#858585]", "border"];

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    tabButtons.forEach((btn) => {
      btn.classList.remove(...active);
      btn.classList.add(...inactive);
    });

    button.classList.add(...active);
    button.classList.remove(...inactive);
  });
});
