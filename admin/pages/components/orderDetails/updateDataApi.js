export function updateDataApi(data) {
    const d = data.data;
    const item = d.items[0];
    const addr = d.shippingAddress;

    const orderPreset = {
        orderNumber: document.getElementById("orderNumber"),
        userId: document.getElementById("userId"),
        create: document.getElementById("create_At"),
        pName: document.getElementById("productName"),
        color: document.getElementById("color"),
        quantity: document.getElementById("quantity"),
        productPrice: document.getElementById("productPrice"),
        recipientName: document.getElementById("recipientName"),
        phone: document.getElementById("phone"),
        address: document.getElementById("address"),
        zipCode: document.getElementById("zipCode"),
        addressDetail: document.getElementById("addressDetail"),
        price: document.getElementById("price"),
        shippingFee: document.getElementById("shippingFee"),
        totalPrice: document.getElementById("totalPrice")
    };

    orderPreset.orderNumber.textContent = d.orderNumber;
    orderPreset.userId.textContent = d.user.userId;
    orderPreset.create.textContent = d.orderDate;

    orderPreset.pName.textContent = item.productName;
    orderPreset.color.textContent = item.color;
    orderPreset.quantity.textContent = item.quantity;
    orderPreset.productPrice.textContent = "₩" + item.price.toLocaleString();

    orderPreset.recipientName.textContent = addr.recipientName;
    orderPreset.phone.textContent = addr.phone;
    orderPreset.address.textContent = addr.address;
    orderPreset.zipCode.textContent = addr.zipCode;
    orderPreset.addressDetail.textContent = addr.addressDetail;

    orderPreset.price.textContent = "₩" + d.finalPrice.toLocaleString();
    orderPreset.shippingFee.textContent = "₩" + d.shippingFee.toLocaleString();
    orderPreset.totalPrice.textContent = "₩" + d.totalPrice.toLocaleString();
}