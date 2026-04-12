export async function getProfileApi(token) {
    try {
        const API_URL = `https://api.fullstackfamily.com/api/gentlelion/v1/user/profile`;

        const response = await fetch(API_URL, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `error status: ${response.status}`);
        }

        const data = await response.json();
        return data.data;

    } catch (error) {
        console.error(error);
        throw error;
    }
}