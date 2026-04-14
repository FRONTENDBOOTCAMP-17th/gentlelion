export function loadProfile(data){
    const fn = document.getElementById("fn");
    const ln = document.getElementById("ln");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const address = document.getElementById("address");
    const addressDetail = document.getElementById("addressDetail");
    const addresButton = document.getElementById("addressEditBtn");

    fn.textContent = data.firstName;
    ln.textContent = data.lastName;
    email.textContent = data.email;
    phone.textContent = data.phone;
    address.textContent = data.address?? "주소가 등록되어있지 않습니다.";
    addressDetail.textContent = data.addressDetail?? "주소를 등록하시려면 등록하기 버튼을 눌러주세요.";
    if(data.address === undefined || addressDetail === undefined){
        addresButton.textContent = "등록하기";
    }
}