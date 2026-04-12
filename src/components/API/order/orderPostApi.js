export async function orderPostApi(token, items, shippingAddress, pointsToUse) {
    try {
        const API_URL = `https://api.fullstackfamily.com/api/gentlelion/v1/orders`;

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                items,
                shippingAddress,
                paymentMethod: "points",
                pointsToUse
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `error status: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error(error);
        throw error;
    }
}