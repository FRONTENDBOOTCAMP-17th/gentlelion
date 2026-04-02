# GENTLE MONSTER API 프로토타입

## 개요
이 문서는 GENTLE MONSTER 쇼핑몰의 API 흐름과 데이터 구조를 정의합니다.

**API 응답 형식:**
- 모든 API는 `success` 필드를 포함합니다
  - `success: true` - 요청이 성공적으로 처리됨
  - `success: false` - 요청 처리 중 에러 발생 (에러 정보는 `error` 필드에 포함)

---

## 1. 인증 (Authentication)

### 1.1 회원가입
**Endpoint:** `POST /api/auth/signup`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "홍",
  "lastName": "길동",
  "phone": "010-1234-5678",
  "userId": "gentle_user",
  "address": "서울시 강남구 테헤란로 123",
  "addressDetail": "456호"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "userId": "gentle_user",
    "email": "user@example.com",
    "firstName": "홍",
    "lastName": "길동",
    "phone": "010-1234-5678",
    "address": "서울시 강남구 테헤란로 123",
    "addressDetail": "456호",
    "createdAt": "2026-03-31T10:00:00Z",
    "points": 100000,
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 1.2 로그인
**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "userId": "gentle_user",
    "email": "user@example.com",
    "firstName": "홍",
    "lastName": "길동",
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 1.3 로그아웃
**Endpoint:** `POST /api/auth/logout`

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "message": "로그아웃되었습니다."
}
```

---

## 2. 사용자 프로필 (User Profile)

### 2.1 프로필 조회
**Endpoint:** `GET /api/user/profile`

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "userId": "gentle_user",
    "email": "user@example.com",
    "firstName": "홍",
    "lastName": "길동",
    "phone": "010-1234-5678",
    "address": "서울시 강남구 테헤란로 123",
    "addressDetail": "456호",
    "points": 100000,
    "createdAt": "2026-03-31T10:00:00Z"
  }
}
```

### 2.2 프로필 수정
**Endpoint:** `PUT /api/user/profile`

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "firstName": "길동",
  "lastName": "김",
  "phone": "010-9876-5432",
  "address": "서울시 서초구 강남대로 456",
  "addressDetail": "789호"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "userId": "gentle_user",
    "email": "user@example.com",
    "firstName": "길동",
    "lastName": "김",
    "phone": "010-9876-5432",
    "address": "서울시 서초구 강남대로 456",
    "addressDetail": "789호",
    "updatedAt": "2026-03-31T11:00:00Z"
  }
}
```

---

## 3. 제품 (Products)

### 3.1 제품 목록 조회
**Endpoint:** `GET /api/products`

**Query Parameters:**
- `category` (optional): 제품 카테고리 (sunglasses, optical)
- `page` (optional): 페이지 번호 (default: 1)
- `limit` (optional): 페이지당 항목 수 (default: 20)

**Response:**
```json
{
  "success": true,
  "data": {
    "products": [
      {
        "productId": "prod_001",
        "name": "GENTLE MONSTER 01",
        "price": 290000,
        "images": [
          "https://example.com/image1.jpg",
          "https://example.com/image2.jpg"
        ],
        "category": "sunglasses",
        "description": "클래식한 디자인의 선글라스"
      },
      {
        "productId": "prod_002",
        "name": "GENTLE MONSTER 02",
        "price": 320000,
        "images": [
          "https://example.com/image3.jpg",
          "https://example.com/image4.jpg"
        ],
        "category": "optical",
        "description": "모던한 스타일의 안경"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 10,
      "totalItems": 200,
      "itemsPerPage": 20
    }
  }
}
```

### 3.2 제품 상세 조회
**Endpoint:** `GET /api/products/:productId`

**Response:**
```json
{
  "success": true,
  "data": {
    "productId": "prod_001",
    "name": "GENTLE MONSTER 01",
    "price": 290000,
    "images": [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg"
    ],
    "category": "sunglasses",
    "description": "클래식한 디자인의 선글라스",
    "stock": 10,
    "colors": [
      {
        "name": "Black",
        "available": true
      },
      {
        "name": "Tortoise",
        "available": true
      },
      {
        "name": "Silver",
        "available": false
      }
    ],
    "specifications": {
      "frameWidth": "140mm",
      "lensHeight": "50mm",
      "lensWidth": "52mm",
      "bridgeWidth": "21mm",
      "templeLength": "145mm"
    }
  }
}
```

**재고 시스템 참고:**
- `stock`: 현재 재고 수량
- 재고가 0일 경우 구매 불가
- 장바구니 담기 또는 수량 변경 시 재고 초과 여부 확인
- 주문 완료 시 재고가 자동으로 차감됨

---

## 4. 장바구니 (Cart)

### 4.1 장바구니 조회
**Endpoint:** `GET /api/cart`

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "cartItemId": "cart_001",
        "productId": "prod_001",
        "name": "GENTLE MONSTER 01",
        "price": 290000,
        "quantity": 1,
        "image": "https://example.com/image1.jpg",
        "color": "Black"
      },
      {
        "cartItemId": "cart_002",
        "productId": "prod_002",
        "name": "GENTLE MONSTER 02",
        "price": 320000,
        "quantity": 2,
        "image": "https://example.com/image3.jpg",
        "color": "Tortoise"
      }
    ],
    "totalPrice": 930000,
    "itemCount": 3
  }
}
```

### 4.2 장바구니 추가
**Endpoint:** `POST /api/cart`

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "productId": "prod_001",
  "quantity": 1,
  "color": "Black"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "cartItemId": "cart_001",
    "productId": "prod_001",
    "name": "GENTLE MONSTER 01",
    "price": 290000,
    "quantity": 1,
    "image": "https://example.com/image1.jpg",
    "color": "Black"
  }
}
```

### 4.3 장바구니 수정
**Endpoint:** `PUT /api/cart/:cartItemId`

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "quantity": 2
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "cartItemId": "cart_001",
    "productId": "prod_001",
    "name": "GENTLE MONSTER 01",
    "price": 290000,
    "quantity": 2,
    "image": "https://example.com/image1.jpg",
    "color": "Black"
  }
}
```

### 4.4 장바구니 삭제
**Endpoint:** `DELETE /api/cart/:cartItemId`

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "message": "장바구니에서 삭제되었습니다."
}
```

---

## 5. 위시리스트 (Wishlist)

### 5.1 위시리스트 조회
**Endpoint:** `GET /api/wishlist`

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "wishlistItemId": "wish_001",
        "productId": "prod_003",
        "name": "GENTLE MONSTER 03",
        "price": 350000,
        "image": "https://example.com/image5.jpg",
        "color": "Black",
        "addedAt": "2026-03-30T10:00:00Z"
      },
      {
        "wishlistItemId": "wish_002",
        "productId": "prod_004",
        "name": "GENTLE MONSTER 04",
        "price": 280000,
        "image": "https://example.com/image6.jpg",
        "color": "Tortoise",
        "addedAt": "2026-03-29T15:30:00Z"
      }
    ],
    "itemCount": 2
  }
}
```

### 5.2 위시리스트 추가
**Endpoint:** `POST /api/wishlist`

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "productId": "prod_003",
  "color": "Black"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "wishlistItemId": "wish_001",
    "productId": "prod_003",
    "name": "GENTLE MONSTER 03",
    "price": 350000,
    "image": "https://example.com/image5.jpg",
    "color": "Black",
    "addedAt": "2026-03-30T10:00:00Z"
  }
}
```

### 5.3 위시리스트 삭제
**Endpoint:** `DELETE /api/wishlist/:wishlistItemId`

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "message": "위시리스트에서 삭제되었습니다."
}
```

---

## 6. 주문 (Orders)

**참고:** 이 쇼핑몰은 실제 결제가 아닌 포인트 시스템을 사용합니다.
- 회원가입 시 기본 100,000 포인트가 지급됩니다.
- 주문 시 포인트로 결제하며, 포인트가 부족할 경우 주문이 거부됩니다.

### 6.1 주문 생성
**Endpoint:** `POST /api/orders`

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "items": [
    {
      "productId": "prod_001",
      "quantity": 1,
      "color": "Black"
    },
    {
      "productId": "prod_002",
      "quantity": 2,
      "color": "Tortoise"
    }
  ],
  "shippingAddress": {
    "recipientName": "홍길동",
    "phone": "010-1234-5678",
    "address": "서울시 강남구 테헤란로 123",
    "addressDetail": "456호",
    "zipCode": "12345"
  },
  "paymentMethod": "points",
  "pointsToUse": 930000
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "orderId": "order_001",
    "userId": "gentle_user",
    "orderNumber": "GM20260331001",
    "orderDate": "2026-03-31T12:00:00Z",
    "status": "pending",
    "items": [
      {
        "productId": "prod_001",
        "name": "GENTLE MONSTER 01",
        "price": 290000,
        "quantity": 1,
        "color": "Black",
        "image": "https://example.com/image1.jpg"
      },
      {
        "productId": "prod_002",
        "name": "GENTLE MONSTER 02",
        "price": 320000,
        "quantity": 2,
        "color": "Tortoise",
        "image": "https://example.com/image3.jpg"
      }
    ],
    "totalPrice": 930000,
    "shippingFee": 0,
    "finalPrice": 930000,
    "pointsUsed": 930000,
    "remainingPoints": 70000,
    "shippingAddress": {
      "recipientName": "홍길동",
      "phone": "010-1234-5678",
      "address": "서울시 강남구 테헤란로 123",
      "addressDetail": "456호",
      "zipCode": "12345"
    },
    "paymentMethod": "points"
  }
}
```

### 6.2 주문 내역 조회
**Endpoint:** `GET /api/orders`

**Headers:**
```
Authorization: Bearer {token}
```

**Query Parameters:**
- `page` (optional): 페이지 번호 (default: 1)
- `limit` (optional): 페이지당 항목 수 (default: 10)

**Response:**
```json
{
  "success": true,
  "data": {
    "orders": [
      {
        "orderId": "order_001",
        "userId": "gentle_user",
        "orderNumber": "GM20260331001",
        "orderDate": "2026-03-31T12:00:00Z",
        "status": "delivered",
        "items": [
          {
            "productId": "prod_001",
            "name": "GENTLE MONSTER 01",
            "price": 290000,
            "quantity": 1,
            "image": "https://example.com/image1.jpg"
          }
        ],
        "totalPrice": 290000,
        "deliveryDate": "2026-04-03T10:00:00Z"
      },
      {
        "orderId": "order_002",
        "userId": "gentle_user",
        "orderNumber": "GM20260330001",
        "orderDate": "2026-03-30T15:00:00Z",
        "status": "shipping",
        "items": [
          {
            "productId": "prod_002",
            "name": "GENTLE MONSTER 02",
            "price": 320000,
            "quantity": 2,
            "image": "https://example.com/image3.jpg"
          }
        ],
        "totalPrice": 640000,
        "trackingNumber": "1234567890"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 50,
      "itemsPerPage": 10
    }
  }
}
```

### 6.3 주문 상세 조회
**Endpoint:** `GET /api/orders/:orderId`

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "orderId": "order_001",
    "userId": "gentle_user",
    "orderNumber": "GM20260331001",
    "orderDate": "2026-03-31T12:00:00Z",
    "status": "delivered",
    "items": [
      {
        "productId": "prod_001",
        "name": "GENTLE MONSTER 01",
        "price": 290000,
        "quantity": 1,
        "color": "Black",
        "image": "https://example.com/image1.jpg"
      }
    ],
    "totalPrice": 290000,
    "shippingFee": 0,
    "finalPrice": 290000,
    "shippingAddress": {
      "recipientName": "홍길동",
      "phone": "010-1234-5678",
      "address": "서울시 강남구 테헤란로 123",
      "addressDetail": "456호",
      "zipCode": "12345"
    },
    "paymentMethod": "card",
    "trackingNumber": "1234567890",
    "deliveryDate": "2026-04-03T10:00:00Z",
    "statusHistory": [
      {
        "status": "pending",
        "timestamp": "2026-03-31T12:00:00Z"
      },
      {
        "status": "confirmed",
        "timestamp": "2026-03-31T13:00:00Z"
      },
      {
        "status": "shipping",
        "timestamp": "2026-04-01T09:00:00Z"
      },
      {
        "status": "delivered",
        "timestamp": "2026-04-03T10:00:00Z"
      }
    ]
  }
}
```

---

## 7. 에러 응답

모든 API는 에러 발생 시 다음과 같은 형식으로 응답합니다:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "에러 메시지"
  }
}
```

### 주요 에러 코드

| 코드 | HTTP 상태 | 설명 |
|------|-----------|------|
| `UNAUTHORIZED` | 401 | 인증 토큰이 없거나 유효하지 않음 |
| `FORBIDDEN` | 403 | 권한이 없음 |
| `NOT_FOUND` | 404 | 요청한 리소스를 찾을 수 없음 |
| `VALIDATION_ERROR` | 400 | 요청 데이터 검증 실패 |
| `DUPLICATE_EMAIL` | 400 | 이미 사용 중인 이메일 |
| `INVALID_CREDENTIALS` | 401 | 이메일 또는 비밀번호가 올바르지 않음 |
| `OUT_OF_STOCK` | 400 | 재고 부족 |
| `INSUFFICIENT_POINTS` | 400 | 포인트 부족 |
| `INTERNAL_ERROR` | 500 | 서버 내부 오류 |

---

## 8. API 흐름도

### 8.1 회원가입 및 로그인 흐름
```
사용자 → [회원가입 페이지] → POST /api/auth/signup
                          ↓
                    [토큰 발급]
                          ↓
사용자 ← [자동 로그인] ← [메인 페이지]


사용자 → [로그인 페이지] → POST /api/auth/login
                          ↓
                    [토큰 발급]
                          ↓
사용자 ← [메인 페이지]
```

### 8.2 제품 구매 흐름
```
사용자 → [메인 페이지] → GET /api/products
          ↓
    [제품 상세] → GET /api/products/:productId
          ↓
    [장바구니 추가] → POST /api/cart
          ↓
    [장바구니] → GET /api/cart
          ↓
    [주문하기] → POST /api/orders
          ↓
    [주문 완료]
```

### 8.3 마이페이지 흐름
```
사용자 → [마이페이지] → GET /api/user/profile
          ↓
    [구매 내역] → GET /api/orders
          ↓
    [위시리스트] → GET /api/wishlist
          ↓
    [프로필 수정] → PUT /api/user/profile
```

---

## 9. 데이터베이스 스키마

### 9.1 Users 테이블
```sql
CREATE TABLE users (
  user_id VARCHAR(50) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  phone VARCHAR(20),
  address VARCHAR(500),
  address_detail VARCHAR(200),
  points INT DEFAULT 100000,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 9.2 Products 테이블
```sql
CREATE TABLE products (
  product_id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price INT NOT NULL,
  category VARCHAR(50),
  description TEXT,
  in_stock BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 9.3 Product Images 테이블
```sql
CREATE TABLE product_images (
  image_id INT AUTO_INCREMENT PRIMARY KEY,
  product_id VARCHAR(50) NOT NULL,
  image_url VARCHAR(500) NOT NULL,
  display_order INT DEFAULT 0,
  FOREIGN KEY (product_id) REFERENCES products(product_id)
);
```

### 9.4 Cart 테이블
```sql
CREATE TABLE cart (
  cart_item_id VARCHAR(50) PRIMARY KEY,
  user_id VARCHAR(50) NOT NULL,
  product_id VARCHAR(50) NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  color VARCHAR(50),
  added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (product_id) REFERENCES products(product_id)
);
```

### 9.5 Wishlist 테이블
```sql
CREATE TABLE wishlist (
  wishlist_item_id VARCHAR(50) PRIMARY KEY,
  user_id VARCHAR(50) NOT NULL,
  product_id VARCHAR(50) NOT NULL,
  color VARCHAR(50),
  added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (product_id) REFERENCES products(product_id)
);
```

### 9.6 Orders 테이블
```sql
CREATE TABLE orders (
  order_id VARCHAR(50) PRIMARY KEY,
  order_number VARCHAR(50) UNIQUE NOT NULL,
  user_id VARCHAR(50) NOT NULL,
  status VARCHAR(20) NOT NULL,
  total_price INT NOT NULL,
  shipping_fee INT DEFAULT 0,
  final_price INT NOT NULL,
  payment_method VARCHAR(20),
  tracking_number VARCHAR(100),
  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  delivery_date TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);
```

### 9.7 Order Items 테이블
```sql
CREATE TABLE order_items (
  order_item_id INT AUTO_INCREMENT PRIMARY KEY,
  order_id VARCHAR(50) NOT NULL,
  product_id VARCHAR(50) NOT NULL,
  quantity INT NOT NULL,
  price INT NOT NULL,
  color VARCHAR(50),
  FOREIGN KEY (order_id) REFERENCES orders(order_id),
  FOREIGN KEY (product_id) REFERENCES products(product_id)
);
```

### 9.8 Shipping Addresses 테이블
```sql
CREATE TABLE shipping_addresses (
  address_id INT AUTO_INCREMENT PRIMARY KEY,
  order_id VARCHAR(50) NOT NULL,
  recipient_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  address VARCHAR(500) NOT NULL,
  address_detail VARCHAR(200),
  zip_code VARCHAR(10),
  FOREIGN KEY (order_id) REFERENCES orders(order_id)
);
```

---

## 10. 인증 및 보안

### 10.1 JWT 토큰
- 로그인 시 JWT 토큰 발급
- 토큰 유효기간: 24시간
- 모든 인증이 필요한 API는 `Authorization: Bearer {token}` 헤더 필요

### 10.2 비밀번호 암호화
- bcrypt를 사용한 비밀번호 해싱
- 최소 8자 이상, 영문/숫자/특수문자 조합 권장

### 10.3 HTTPS
- 모든 API 통신은 HTTPS를 통해 암호화

---

이 프로토타입은 GENTLE MONSTER 쇼핑몰의 기본적인 API 흐름을 정의합니다. 실제 구현 시 비즈니스 요구사항에 따라 조정될 수 있습니다.



# 관리자 API (Admin)

## 개요
관리자 전용 API를 제공합니다.

**인증 필수:**
모든 엔드포인트는 관리자 권한이 있는 JWT 토큰이 필요합니다.

**Headers:**
```
Authorization: Bearer {admin_token}
```

**관리자 계정:**
- 이메일: `admin@gentlemonster.com`
- 비밀번호: `admin123`

---

## 1. 대시보드 통계

### 1.1 대시보드 종합 정보
**Endpoint:** `GET /api/admin/dashboard`

**Response:**
```json
{
  "success": true,
  "data": {
    "summary": {
      "totalRevenue": 25000000,
      "totalOrders": 86,
      "totalProducts": 50,
      "totalUsers": 150,
      "averageOrderValue": 290697
    },
    "recentOrders": [
      {
        "orderId": "order_001",
        "orderNumber": "GM20260331001",
        "userName": "홍길동",
        "totalPrice": 290000,
        "status": "pending",
        "orderDate": "2026-03-31T12:00:00Z"
      }
    ]
  }
}
```

**참고:**
- `lowStockProducts`: 재고가 5개 이하인 제품 목록
- `recentOrders`: 최근 10개의 주문 내역

---

## 2. 제품 관리 (Product Management)

### 2.1 제품 추가
**Endpoint:** `POST /api/admin/products`

**Request Body:**
```json
{
  "name": "GENTLE MONSTER NEW",
  "price": 350000,
  "category": "sunglasses",
  "description": "새로운 디자인의 선글라스",
  "inStock": true,
  "stock": 20,
  "imageUrl": "https://example.com/new-image.jpg",
  "colors": [
    {
      "name": "Black",
      "available": true
    },
    {
      "name": "Tortoise",
      "available": true
    }
  ],
  "specifications": {
    "frameWidth": "145mm",
    "lensHeight": "52mm",
    "lensWidth": "55mm",
    "bridgeWidth": "22mm",
    "templeLength": "148mm"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "productId": "prod_051",
    "name": "GENTLE MONSTER NEW",
    "price": 350000,
    "category": "sunglasses",
    "description": "새로운 디자인의 선글라스",
    "inStock": true,
    "stock": 20,
    "imageUrl": "https://example.com/new-image.jpg",
    "colors": [
      {
        "name": "Black",
        "available": true
      },
      {
        "name": "Tortoise",
        "available": true
      }
    ],
    "specifications": {
      "frameWidth": "145mm",
      "lensHeight": "52mm",
      "lensWidth": "55mm",
      "bridgeWidth": "22mm",
      "templeLength": "148mm"
    },
    "createdAt": "2026-04-02T10:00:00Z"
  },
  "message": "제품이 추가되었습니다."
}
```

**에러 응답:**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "제품명은 필수 항목입니다."
  }
}
```

---

### 2.2 제품 수정
**Endpoint:** `PUT /api/admin/products/:productId`

**Request Body:**
```json
{
  "name": "GENTLE MONSTER 01 (Updated)",
  "price": 320000,
  "stock": 15,
  "colors": [
    {
      "name": "Black",
      "available": true
    },
    {
      "name": "Silver",
      "available": true
    }
  ],
  "specifications": {
    "frameWidth": "140mm",
    "lensHeight": "50mm",
    "lensWidth": "52mm",
    "bridgeWidth": "21mm",
    "templeLength": "145mm"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "productId": "prod_001",
    "name": "GENTLE MONSTER 01 (Updated)",
    "price": 320000,
    "stock": 15,
    "colors": [
      {
        "name": "Black",
        "available": true
      },
      {
        "name": "Silver",
        "available": true
      }
    ],
    "specifications": {
      "frameWidth": "140mm",
      "lensHeight": "50mm",
      "lensWidth": "52mm",
      "bridgeWidth": "21mm",
      "templeLength": "145mm"
    },
    "updatedAt": "2026-04-02T11:00:00Z"
  },
  "message": "제품이 수정되었습니다."
}
```

---

### 2.3 제품 삭제
**Endpoint:** `DELETE /api/admin/products/:productId`

**예시:**
```
DELETE /api/admin/products/prod_001
```

**Response:**
```json
{
  "success": true,
  "message": "제품이 삭제되었습니다."
}
```

**에러 응답:**
```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "제품을 찾을 수 없습니다."
  }
}
```

**참고:**
- 주문 내역이 있는 제품도 삭제 가능합니다.
- 삭제 시 해당 제품의 장바구니 및 위시리스트 항목도 함께 삭제됩니다.

---

### 2.4 재고 수정
**Endpoint:** `PATCH /api/admin/products/:productId/stock`

**Request Body:**
```json
{
  "stock": 30
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "productId": "prod_001",
    "stock": 30,
    "inStock": true
  },
  "message": "재고가 수정되었습니다."
}
```

**참고:**
- 재고가 0으로 설정되면 자동으로 `inStock: false`가 됩니다.
- 재고가 1 이상이면 자동으로 `inStock: true`가 됩니다.

---

## 3. 주문 관리 (Order Management)

### 3.1 전체 주문 조회
**Endpoint:** `GET /api/admin/orders`

**Query Parameters:**
- `page` (optional): 페이지 번호 (default: 1)
- `limit` (optional): 페이지당 항목 수 (default: 20)
- `status` (optional): 주문 상태 필터
- `startDate` (optional): 시작 날짜 (YYYY-MM-DD)
- `endDate` (optional): 종료 날짜 (YYYY-MM-DD)

**예시:**
```
GET /api/admin/orders?status=pending&page=1&limit=20
```

**Response:**
```json
{
  "success": true,
  "data": {
    "orders": [
      {
        "orderId": "order_001",
        "orderNumber": "GM20260331001",
        "userId": "gentle_user",
        "userName": "홍길동",
        "email": "user@example.com",
        "totalPrice": 290000,
        "status": "pending",
        "orderDate": "2026-03-31T12:00:00Z",
        "itemCount": 2
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 86,
      "itemsPerPage": 20
    },
    "summary": {
      "totalRevenue": 25000000,
      "totalOrders": 86
    }
  }
}
```

---

### 3.2 주문 상세 조회
**Endpoint:** `GET /api/admin/orders/:orderId`

**Response:**
```json
{
  "success": true,
  "data": {
    "orderId": "order_001",
    "orderNumber": "GM20260331001",
    "userId": "gentle_user",
    "userName": "홍길동",
    "email": "user@example.com",
    "phone": "010-1234-5678",
    "status": "pending",
    "orderDate": "2026-03-31T12:00:00Z",
    "items": [
      {
        "productId": "prod_001",
        "name": "GENTLE MONSTER 01",
        "price": 290000,
        "quantity": 1,
        "color": "Black"
      }
    ],
    "totalPrice": 290000,
    "shippingFee": 0,
    "finalPrice": 290000,
    "pointsUsed": 290000,
    "shippingAddress": {
      "recipientName": "홍길동",
      "phone": "010-1234-5678",
      "address": "서울시 강남구 테헤란로 123",
      "addressDetail": "456호",
      "zipCode": "12345"
    }
  }
}
```

## 4. 사용자 관리 (User Management)

### 4.1 사용자 목록 조회
**Endpoint:** `GET /api/admin/users`

**Query Parameters:**
- `page` (optional): 페이지 번호 (default: 1)
- `limit` (optional): 페이지당 항목 수 (default: 20)
- `search` (optional): 검색 키워드 (이름, 이메일, userId)

**예시:**
```
GET /api/admin/users?search=홍길동&page=1&limit=20
```

**Response:**
```json
{
  "success": true,
  "data": {
    "users": [
      {
        "userId": "gentle_user",
        "email": "user@example.com",
        "firstName": "홍",
        "lastName": "길동",
        "phone": "010-1234-5678",
        "points": 100000,
        "totalOrders": 5,
        "totalSpent": 1450000,
        "createdAt": "2026-03-31T10:00:00Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 8,
      "totalItems": 150,
      "itemsPerPage": 20
    }
  }
}
```

---

### 4.2 사용자 상세 조회
**Endpoint:** `GET /api/admin/users/:userId`

**Response:**
```json
{
  "success": true,
  "data": {
    "userId": "gentle_user",
    "email": "user@example.com",
    "firstName": "홍",
    "lastName": "길동",
    "phone": "010-1234-5678",
    "address": "서울시 강남구 테헤란로 123",
    "addressDetail": "456호",
    "points": 100000,
    "createdAt": "2026-03-31T10:00:00Z",
    "statistics": {
      "totalOrders": 5,
      "totalSpent": 1450000,
      "averageOrderValue": 290000,
      "lastOrderDate": "2026-03-31T12:00:00Z"
    },
    "recentOrders": [
      {
        "orderId": "order_001",
        "orderNumber": "GM20260331001",
        "totalPrice": 290000,
        "status": "delivered",
        "orderDate": "2026-03-31T12:00:00Z"
      }
    ]
  }
}
```

---

### 4.3 포인트 수정
**Endpoint:** `PATCH /api/admin/users/:userId/points`

**Request Body:**
```json
{
  "points": 150000,
  "reason": "이벤트 포인트 지급"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "userId": "gentle_user",
    "points": 150000,
    "previousPoints": 100000,
    "updatedAt": "2026-04-02T14:00:00Z"
  },
  "message": "포인트가 수정되었습니다."
}
```

**참고:**
- 포인트를 직접 설정합니다 (증가/감소가 아님)
- `reason` 필드는 선택사항이며, 포인트 이력에 기록됩니다.

---

### 4.4 사용자 삭제
**Endpoint:** `DELETE /api/admin/users/:userId`

**Response:**
```json
{
  "success": true,
  "message": "사용자가 삭제되었습니다."
}
```

**참고:**
- 사용자 삭제 시 해당 사용자의 모든 데이터가 삭제됩니다.
- 주문 내역은 통계를 위해 익명화되어 보관될 수 있습니다.

---

## 5. 통계 및 분석

### 5.1 매출 통계
**Endpoint:** `GET /api/admin/analytics/revenue`

**Query Parameters:**
- `period` (required): 기간 (daily, weekly, monthly, yearly)
- `startDate` (optional): 시작 날짜 (YYYY-MM-DD)
- `endDate` (optional): 종료 날짜 (YYYY-MM-DD)

**예시:**
```
GET /api/admin/analytics/revenue?period=monthly&startDate=2026-01-01&endDate=2026-03-31
```

**Response:**
```json
{
  "success": true,
  "data": {
    "period": "monthly",
    "totalRevenue": 75000000,
    "totalOrders": 250,
    "averageOrderValue": 300000,
    "breakdown": [
      {
        "date": "2026-01",
        "revenue": 20000000,
        "orders": 70
      },
      {
        "date": "2026-02",
        "revenue": 25000000,
        "orders": 80
      },
      {
        "date": "2026-03",
        "revenue": 30000000,
        "orders": 100
      }
    ]
  }
}
```



## 권한 및 보안

**관리자 권한 확인:**
- JWT 토큰의 `isAdmin` 필드로 권한 확인
- 관리자가 아닌 경우 `FORBIDDEN` 에러 반환

**보안 규칙:**
- 모든 관리자 API는 HTTPS 필수
- 관리자 계정은 별도 관리 (일반 회원가입 불가)
- 중요한 작업은 로그 기록 필수

---

## 에러 코드

| 코드 | HTTP 상태 | 설명 |
|------|-----------|------|
| `UNAUTHORIZED` | 401 | 인증 토큰이 없거나 유효하지 않음 |
| `FORBIDDEN` | 403 | 관리자 권한이 없음 |
| `NOT_FOUND` | 404 | 리소스를 찾을 수 없음 |
| `VALIDATION_ERROR` | 400 | 요청 데이터 검증 실패 |
| `INTERNAL_ERROR` | 500 | 서버 내부 오류 |

---
