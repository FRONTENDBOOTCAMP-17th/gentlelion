export function checkRequired() {
    const agreeTerms = document.getElementById("agreeTerms");
    const agreeAge = document.getElementById("agreeAge");

    if (!agreeTerms.checked) {
        agreeTerms.style.outlineColor = "red";
        agreeTerms.style.outlineStyle = "solid";
        agreeTerms.style.outlineWidth = "1px";
        return false;
    }

    if (!agreeAge.checked) {
        agreeAge.style.outlineColor = "red";
        agreeAge.style.outlineStyle = "solid";
        agreeAge.style.outlineWidth = "1px";
        return false;
    }

    return true;
}