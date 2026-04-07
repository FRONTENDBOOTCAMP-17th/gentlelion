export async function orderDetailsAPI(id) {
    try {
        const token = localStorage.getItem("token");

        if (!token) {
            console.error("토큰이 없습니다.");
            return null;
        }

        const res = await fetch(
            `https://api.fullstackfamily.com/api/gentlelion/v1/admin/orders/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (!res.ok) {
            throw new Error("API 요청 실패");
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}