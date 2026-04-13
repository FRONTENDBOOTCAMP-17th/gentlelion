export function formatPhoneNumber() {
    const input = document.getElementById("phoneNumber");

    input.addEventListener("input", (e) => {
        const digits = e.target.value.replace(/\D/g, "");

        let formatted = "";

        if (digits.length <= 3) {
            formatted = digits;
        } else if (digits.length <= 7) {
            formatted = `${digits.slice(0, 3)}-${digits.slice(3)}`;
        } else {
            formatted = `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
        }

        e.target.value = formatted;
    });
}