# GentleLion API 사용 가이드

> FullStackFamily에서 제공하는 젠틀몬스터 쇼핑몰 프로젝트용 백엔드 API
> 명세서 리뷰를 반영하여 구현 완료 (2026-04-03)

---

## Base URL

```
https://api.fullstackfamily.com/api/gentlelion/v1
```

## 테스트 계정

| email | password | 역할 | 포인트 |
|-------|----------|------|--------|
| admin@gentlemonster.com | admin123 | 관리자 | 100,000 |
| user@example.com | Test1234! | 일반 | 100,000 |

---

## API 목록 (28개)

### Auth (3개)

| Method | URL | 인증 | 설명 |
|--------|-----|------|------|
| POST | `/auth/signup` | X | 회원가입 (100,000pt 지급) |
| POST | `/auth/login` | X | 로그인 |
| POST | `/auth/logout` | O | 로그아웃 |

### User (3개)

| Method | URL | 인증 | 설명 |
|--------|-----|------|------|
| GET | `/user/profile` | O | 프로필 조회 |
| PUT | `/user/profile` | O | 프로필 수정 |
| POST | `/user/me/withdraw` | O | 회원 탈퇴 |

### Products (2개, 공개)

| Method | URL | 인증 | 설명 |
|--------|-----|------|------|
| GET | `/products?category=&page=&limit=` | X | 상품 목록 |
| GET | `/products/{id}` | X | 상품 상세 |

### Cart (4개)

| Method | URL | 인증 | 설명 |
|--------|-----|------|------|
| GET | `/cart` | O | 장바구니 조회 |
| POST | `/cart` | O | 장바구니 추가 |
| PUT | `/cart` | O | 수량 변경 |
| DELETE | `/cart/{cartItemId}` | O | 삭제 |

### Wishlist (3개)

| Method | URL | 인증 | 설명 |
|--------|-----|------|------|
| GET | `/wishlist` | O | 위시리스트 |
| POST | `/wishlist` | O | 추가 |
| DELETE | `/wishlist/{id}` | O | 삭제 |

### Orders (3개)

| Method | URL | 인증 | 설명 |
|--------|-----|------|------|
| POST | `/orders` | O | 주문 생성 (포인트 결제) |
| GET | `/orders?page=&limit=` | O | 주문 내역 |
| GET | `/orders/{orderId}` | O | 주문 상세 |

### Admin (13개, ADMIN 권한)

| Method | URL | 설명 |
|--------|-----|------|
| GET | `/admin/dashboard` | 대시보드 통계 |
| GET | `/admin/products` | 상품 목록 |
| POST | `/admin/products` | 상품 추가 |
| PUT | `/admin/products/{id}` | 상품 수정 |
| DELETE | `/admin/products/{id}` | 상품 삭제 |
| GET | `/admin/orders` | 주문 목록 |
| GET | `/admin/orders/{id}` | 주문 상세 |
| PATCH | `/admin/orders/{id}/status` | 주문 상태 변경 |
| GET | `/admin/users` | 사용자 목록 |
| GET | `/admin/users/{id}` | 사용자 상세 |
| PATCH | `/admin/users/{id}/points` | 포인트 수정 |
| DELETE | `/admin/users/{id}` | 사용자 삭제 |
| POST | `/admin/images` | 이미지 업로드 |

---

## colors / specifications / images 필드 설명

상품의 `colors`, `specifications`, `images`는 JSON 형태로 저장됩니다.

### colors (배열)

각 색상의 이름과 재고 여부를 나타냅니다.

```json
[
  { "name": "Black", "available": true },
  { "name": "Tortoise", "available": true },
  { "name": "Silver", "available": false }
]
```

### specifications (객체)

안경/선글라스의 규격 정보입니다.

```json
{
  "frameWidth": "140mm",
  "lensHeight": "50mm",
  "lensWidth": "52mm",
  "bridgeWidth": "21mm",
  "templeLength": "145mm"
}
```

### images (배열)

상품 이미지 URL 목록입니다.

```json
[
  "https://example.com/image1.jpg",
  "https://example.com/image2.jpg"
]
```

### 상품 등록/수정 시

관리자가 상품을 등록할 때 위 필드들을 JSON **객체/배열** 그대로 보내면 됩니다 (문자열로 감싸지 않음).

```javascript
await fetch(".../admin/products", {
  method: "POST",
  headers: { "Content-Type": "application/json", Authorization: `Bearer ${adminToken}` },
  body: JSON.stringify({
    name: "GENTLE MONSTER NEW",
    price: 350000,
    category: "sunglasses",
    stock: 20,
    inStock: true,
    colors: [
      { name: "Black", available: true },
      { name: "Tortoise", available: true }
    ],
    specifications: {
      frameWidth: "145mm",
      lensHeight: "52mm",
      lensWidth: "55mm",
      bridgeWidth: "22mm",
      templeLength: "148mm"
    },
    images: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg"
    ]
  })
});
```

---

## 주요 사용 예시

### 포인트 결제 주문

```javascript
// 주문 생성 (포인트로 결제)
await fetch(".../orders", {
  method: "POST",
  headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
  body: JSON.stringify({
    items: [
      { productId: 1, quantity: 1, color: "Black", price: 290000 }
    ],
    shippingAddress: {
      recipientName: "홍길동",
      phone: "010-1234-5678",
      address: "서울시 강남구",
      addressDetail: "123호",
      zipCode: "12345"
    },
    paymentMethod: "points",
    pointsToUse: 290000
  })
});
```

> `orderPrice`: 주문 시점의 가격이 기록됩니다. 나중에 상품 가격이 변해도 구매 당시 가격을 확인할 수 있습니다.

### 이미지 업로드 (관리자)

```javascript
const formData = new FormData();
formData.append("file", imageFile);
const res = await fetch(".../admin/images", {
  method: "POST",
  headers: { Authorization: `Bearer ${adminToken}` },
  body: formData
});
const { data: { imageUrl } } = await res.json();
```

---

## 테스트 결과 (2026-04-03)

| # | API | 결과 |
|---|-----|------|
| 1 | 회원가입 | PASS (201) |
| 2 | 로그인 | PASS (200) |
| 3 | 로그인 실패 | PASS (401) |
| 4 | 로그아웃 | PASS (200) |
| 5 | 프로필 조회 | PASS (200) |
| 6 | 프로필 수정 | PASS (200) |
| 7 | 상품 목록 | PASS (200) |
| 8 | 장바구니 조회 | PASS (200) |
| 9 | 위시리스트 조회 | PASS (200) |
| 10 | 주문 목록 | PASS (200) |
| 11 | 대시보드 | PASS (200) |
| 12 | 관리자 상품 목록 | PASS (200) |
| 13 | 상품 추가 | PASS (201) |
| 14 | 상품 삭제 | PASS (200) |
| 15 | 관리자 주문 목록 | PASS (200) |
| 16 | 관리자 사용자 목록 | PASS (200) |
| 17 | 이미지 업로드 | PASS (200) |
| 18 | 회원 탈퇴 | PASS (200) |
| 19 | API 문서 페이지 | PASS (200) |

**결과: 19/19 PASS**

---

## API 문서 페이지

온라인: https://www.fullstackfamily.com/gentlelion/api-docs
