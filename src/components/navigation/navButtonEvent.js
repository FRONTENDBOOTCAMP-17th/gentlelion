import { changeColor } from "./changeColor";

export function navButtonEvent(){
    const buttons = document.querySelectorAll(".navigation-button");

    buttons.forEach((button) => {
        changeColor(button, buttons);
    });
}