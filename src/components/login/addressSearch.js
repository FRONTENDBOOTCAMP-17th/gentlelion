export function initAddressSearch() {
    const script = document.createElement("script");
    script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    document.head.appendChild(script);

    bindAddressSearch("addressSearchBtn", "address", "addressDetail");
    bindAddressSearch("profileAddressSearchBtn", "editAdress", "editAdressDetail");
}

function bindAddressSearch(btnId, addressId, detailId) {
    const btn = document.getElementById(btnId);
    const addressInput = document.getElementById(addressId);
    const detailInput = document.getElementById(detailId);

    if (!btn || !addressInput) return;

    const openPostcode = () => {
        new daum.Postcode({
            oncomplete(data) {
                addressInput.value = data.roadAddress || data.jibunAddress;
                detailInput.value = "";
                detailInput.focus();
            },
        }).open();
    };

    btn.addEventListener("click", openPostcode);
    addressInput.addEventListener("click", openPostcode);
}