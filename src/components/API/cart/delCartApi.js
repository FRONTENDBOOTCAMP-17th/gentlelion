export async function delCartlist(token, cartItemId) {
    const API_URL =
        `https://api.fullstackfamily.com/api/gentlelion/v1/cart/${cartItemId}`;

    try {
        const response = await fetch(API_URL, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        if (!response.ok) {
            throw new Error("장바구니 삭제 실패");
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
        return;
    }
}