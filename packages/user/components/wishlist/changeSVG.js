export function changeSVG(button, isWishlisted) {
    const svg = button.querySelector("svg");
    if (!svg) return;

    if (isWishlisted) {
        svg.innerHTML = `
            <path d="M8.38236 14.9221L8 14.6059L7.61764 14.9221L0.599998 20.7253V3.59998H15.4V20.7253L8.38236 14.9221Z" fill="#111111" stroke="#111111" stroke-width="1.2"/>
        `;
    } else {
        svg.innerHTML = `
            <path d="M8.38236 11.9221L8 11.6059L7.61764 11.9221L0.6 17.7253V0.6H15.4V17.7253L8.38236 11.9221Z" stroke="#111111" stroke-width="1.2"></path>
        `;
    }
}