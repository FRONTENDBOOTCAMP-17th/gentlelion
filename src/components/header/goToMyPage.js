export async function goToMyPage() {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "/src/components/login/login.html";
        return;
    }

    try {
        const response = await fetch("https://api.fullstackfamily.com/api/gentlelion/v1/user/profile", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            localStorage.removeItem("token");
            window.location.href = "/src/components/login/login.html";
            return;
        }

        window.location.href = "/src/components/profile/profile.html";

    } catch (error) {
        console.error("인증 확인 실패:", error);
        localStorage.removeItem("token");
        window.location.href = "/src/components/login/login.html";
    }
}