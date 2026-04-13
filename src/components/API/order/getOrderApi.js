export async function getOrderApi(token) {
  const API_URL =
    `https://api.fullstackfamily.com/api/gentlelion/v1/orders`;

  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if(response.status === 401){
      const isConfirm = confirm("로그인이 필요합니다. \n로그인 페이지로 이동하시겠습니까?");
      if(isConfirm){
        location.href = "/src/components/login/login.html"
      }
      else{
        location.href = "/"
      }
    }

    if (!response.ok) throw new Error("주문 목록 로드 실패");

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    return;
  }
}