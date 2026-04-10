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
            body: JSON.stringify({ productId })
        });

        if (!response.ok) throw new Error("위시리스트 추가 실패");

        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
        return;
    }
}