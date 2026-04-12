export async function postRegisterApi(email, password,firstName, lastName, phone, address, addressDetail) {
    try {
        const API_URL = `https://api.fullstackfamily.com/api/gentlelion/v1/auth/signup`;

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password,
                firstName,
                lastName,
                phone,
                address,
                addressDetail
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