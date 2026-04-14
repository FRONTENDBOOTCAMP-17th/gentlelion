const BASE_URL = "https://api.fullstackfamily.com/api/gentlelion/v1";

function getToken() {
  return localStorage.getItem("token");
}

async function fetchAPI(
  endpoint,
  { body, isFormData = false, ...options } = {},
) {
  const token = getToken();

  const headers = {
    ...(token && { Authorization: `Bearer ${token}` }),
    ...(!isFormData && { "Content-Type": "application/json" }),
  };

  const res = await fetch(BASE_URL + endpoint, {
    headers,
    body: isFormData ? body : body ? JSON.stringify(body) : undefined,
    ...options,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    console.log(err);
    const messages = {
      401: "인증이 필요합니다.",
      403: "권한이 없습니다.",
      404: "리소스를 찾을 수 없습니다.",
    };
    throw Object.assign(
      new Error(messages[res.status] ?? err.message ?? "API 요청 실패"),
      { status: res.status },
    );
  }

  return res.json();
}

export const get = (url) => fetchAPI(url);
export const post = (url, body) => fetchAPI(url, { method: "POST", body });
export const put = (url, body) => fetchAPI(url, { method: "PUT", body });
export const patch = (url, body) => fetchAPI(url, { method: "PATCH", body });
export const del = (url) => fetchAPI(url, { method: "DELETE" });
export const upload = (url, formData) =>
  fetchAPI(url, { method: "POST", body: formData, isFormData: true });
