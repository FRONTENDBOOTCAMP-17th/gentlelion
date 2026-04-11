export async function putCartApi(token, cartItemId, quantity) {
    const API_URL =
        `https://api.fullstackfamily.com/api/gentlelion/v1/cart`;

    try {
        const response = await fetch(API_URL, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ cartItemId, quantity: Number(quantity)})
        });

        if (!response.ok) {
            throw new Error("장바구니 수정 실패");
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
        return;
    }
}