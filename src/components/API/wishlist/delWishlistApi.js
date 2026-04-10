export async function delWishlist(token, wishlistItemId) {
    const API_URL =
        `https://api.fullstackfamily.com/api/gentlelion/v1/wishlist/${wishlistItemId}`;

    try {
        const response = await fetch(API_URL, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        if (!response.ok) throw new Error("위시리스트 삭제 실패");

        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
        return;
    }
}