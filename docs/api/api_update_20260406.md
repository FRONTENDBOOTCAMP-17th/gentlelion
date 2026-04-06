# API 수정 완료 안내 (2026-04-06)

> `docs/api 수정 요청/api 수정 요청(26.03.06).md` 에서 요청하신 3건을 처리했습니다.

---

## 수정 내용

### 1. 관리자 주문 목록에 `userId` 추가

`GET /api/gentlelion/v1/admin/orders` 응답의 각 주문에 `userId`가 포함됩니다.

```json
{
  "data": {
    "orders": [
      {
        "orderId": 35,
        "userId": 1,
        "orderNumber": "GM20260406035",
        "status": "pending",
        "totalPrice": 290000,
        ...
      }
    ],
    "pagination": { "page": 1, "limit": 20, "totalCount": 35, "totalPages": 2 }
  }
}
```

이제 관리자 화면에서 주문 목록의 `userId`로 회원 상세(`GET /admin/users/{userId}`)를 조회할 수 있습니다.

### 2. 모든 목록 조회에 페이지네이션 지원

다음 API들이 `page`, `limit` 파라미터를 지원합니다 (이미 백엔드에 구현되어 있었으나 API 문서에 누락됨):

| API | 파라미터 | 기본값 |
|-----|---------|--------|
| `GET /orders` | page, limit | 1, 10 |
| `GET /admin/orders` | page, limit, status, startDate, endDate | 1, 20 |
| `GET /admin/users` | page, limit, search | 1, 10 |

사용 예:
```
GET /api/gentlelion/v1/admin/orders?page=2&limit=10&status=pending
GET /api/gentlelion/v1/admin/users?page=1&limit=20&search=홍길동
```

### 3. API 문서 Try it에서 page, limit 입력 가능

https://www.fullstackfamily.com/gentlelion/api-docs 페이지에서 관리자 주문 목록, 관리자 회원 목록의 queryParams가 추가되어 Try it에서 page, limit 등을 입력하고 테스트할 수 있습니다.

---

## API 문서 응답 예시 정정

API 문서의 응답 예시가 실제 API 응답과 다른 부분을 수정했습니다.

### 회원 주문 목록 (`GET /orders`)

```
변경 전: data: [{ orderId, status, itemCount, totalPrice, ... }], meta: { total, page, limit }
변경 후: data: { orders: [{ orderId, orderNumber, status, items: [...], shippingAddress: {...}, ... }], pagination: { page, limit, totalCount, totalPages } }
```

### 관리자 주문 목록 (`GET /admin/orders`)

```
변경 전: data: [{ orderId, userEmail, userName, status, itemCount, ... }]  (페이지네이션 없음)
변경 후: data: { orders: [{ orderId, userId, orderNumber, status, items: [...], ... }], pagination: {...} }
```

### 관리자 주문 상세 (`GET /admin/orders/{id}`)

```
변경 전: data: { orderId, userEmail, userName, shippingAddress: "문자열", ... }
변경 후: data: { orderId, ..., user: { userId, email, firstName, lastName }, shippingAddress: { recipientName, phone, address, addressDetail, zipCode } }
```

### 관리자 회원 목록 (`GET /admin/users`)

```
변경 전: data: [{ userId, email, ... }]  (페이지네이션 없음, queryParams 없음)
변경 후: data: { users: [...], pagination: {...} }  (page, limit, search 파라미터 지원)
```

---

## 확인 방법

- 인터랙티브 API 문서: https://www.fullstackfamily.com/gentlelion/api-docs
- 프로덕션 API에 이미 반영되었습니다. 바로 테스트 가능합니다.
