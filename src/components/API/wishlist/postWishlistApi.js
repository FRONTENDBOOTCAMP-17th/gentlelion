export async function postWishlist(token, productId) {
    const API_URL =
        `https://api.fullstackfamily.com/api/gentlelion/v1/wishlist`;

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            // color값은 현재 임시로 되어있습니다.
            body: JSON.stringify({ productId, color: "Black" })
        });

        if (!response.ok) throw new Error("위시리스트 추가 실패");

        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
        return;
    }
}