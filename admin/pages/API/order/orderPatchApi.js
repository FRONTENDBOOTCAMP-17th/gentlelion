export async function orderPatchApi(id, apidata) {
    try {
        const token = localStorage.getItem("token");

        if (!token) {
            console.error("토큰이 없습니다.");
            return null;
        }

        const res = await fetch(
            `https://api.fullstackfamily.com/api/gentlelion/v1/admin/orders/${id}/status`,
            {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(apidata)
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