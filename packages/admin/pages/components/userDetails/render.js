import { formatDate } from "../dashboard/formatters.js";

export function render(user) {
  document.getElementById("user-id").textContent = user.userId;
  document.getElementById("user-lastname").textContent = user.firstName;
  document.getElementById("user-firstname").textContent = user.lastName;
  document.getElementById("user-email").textContent = user.email;
  document.getElementById("user-phone").textContent = user.phone;
  document.getElementById("user-address").textContent = user.address;
  document.getElementById("user-address-detail").textContent =
    user.addressDetail;
  document.getElementById("user-created").textContent = formatDate(
    user.createdAt,
  );
  document.getElementById("user-points").textContent =
    user.points.toLocaleString() + "P";
}
