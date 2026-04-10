export async function getWishlist(token) {
    const API_URL =
        `https://api.fullstackfamily.com/api/gentlelion/v1/wishlist`;

    try {
        const response = await fetch(API_URL, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) throw new Error("위시리스트 로드 실패");

        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
        return;
    }
}