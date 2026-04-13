export function loadProfile(data){
    const fn = document.getElementById("fn");
    const ln = document.getElementById("ln");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");

    fn.textContent = data.firstName;
    ln.textContent = data.lastName;
    email.textContent = data.email;
    phone.textContent = data.phone;
}