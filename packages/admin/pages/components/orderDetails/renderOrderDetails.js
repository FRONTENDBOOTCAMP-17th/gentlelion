export function renderOrderDetails(data) {
    const d = data.data;
    const addr = d.shippingAddress;

    const orderPreset = {
        orderNumber: document.getElementById("orderNumber"),
        userId: document.getElementById("userId"),
        create: document.getElementById("create_At"),
        itemList: document.getElementById("itemList"),
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

    orderPreset.itemList.innerHTML = "";
    d.items.forEach((item) => {
        const itemEl = document.createElement("div");
        itemEl.className = "flex justify-between items-center bg-(--subTitle-button) rounded-xl p-4";

        const infoEl = document.createElement("div");
        infoEl.className = "flex flex-col";

        const nameEl = document.createElement("p");
        nameEl.className = "text-[16px] font-medium";
        nameEl.textContent = item.productName;

        const metaEl = document.createElement("div");
        metaEl.className = "flex gap-2 text-[14px] text-(--admin-gray)";

        const colorEl = document.createElement("p");
        colorEl.textContent = `색상: ${item.color}`;

        const dividerEl = document.createElement("p");
        dividerEl.textContent = "|";

        const quantityEl = document.createElement("p");
        quantityEl.textContent = `수량: ${item.quantity}개`;

        metaEl.appendChild(colorEl);
        metaEl.appendChild(dividerEl);
        metaEl.appendChild(quantityEl);

        infoEl.appendChild(nameEl);
        infoEl.appendChild(metaEl);

        const priceEl = document.createElement("p");
        priceEl.className = "text-[16px] font-medium";
        priceEl.textContent = "₩" + Number(item.orderPrice).toLocaleString();

        itemEl.appendChild(infoEl);
        itemEl.appendChild(priceEl);
        orderPreset.itemList.appendChild(itemEl);
    });

    orderPreset.recipientName.textContent = addr.recipientName;
    orderPreset.phone.textContent = addr.phone;
    orderPreset.address.textContent = addr.address;
    orderPreset.zipCode.textContent = addr.zipCode;
    orderPreset.addressDetail.textContent = addr.addressDetail;

    orderPreset.price.textContent = "₩" + d.finalPrice.toLocaleString();
    orderPreset.shippingFee.textContent = "₩" + d.shippingFee.toLocaleString();
    orderPreset.totalPrice.textContent = "₩" + d.totalPrice.toLocaleString();
}