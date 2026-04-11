# 장바구니 가격 스냅샷 가이드 (`prevPrice` vs `price`)

장바구니에 담은 뒤 상품 가격이 바뀌었을 때 사용자에게 알림을 띄우고 확인을 받는 흐름입니다.

> API 기본 URL: `https://api.fullstackfamily.com/api/gentlelion/v1`

---

## 필드 의미

`GET /cart` 응답의 각 `items[]`에 포함되는 두 가지 가격 필드입니다.

| 필드 | 의미 | 변화 시점 |
|------|------|----------|
| `price` | **현재 상품 가격** | 관리자가 상품 가격을 수정하면 즉시 반영 |
| `prevPrice` | **장바구니에 담은 시점의 가격 스냅샷** | 담을 때 캡처되어 **자동으로 바뀌지 않음**. `acknowledge-price` API로 명시적으로 갱신 |

### 동작 규칙

| 상황 | `price` | `prevPrice` |
|------|---------|-------------|
| 방금 담았을 때 | 현재가 | 현재가 (같음) |
| 담은 뒤 상품 가격이 바뀌었을 때 | **새 가격** | 담을 때 가격 (고정) |
| 동일 상품을 추가로 담았을 때 (수량 +1) | 현재가 | **최초로 담은 시점의 가격 유지** |
| `acknowledge-price` API 호출 후 | 현재가 | 현재가 (동기화됨) |

> **정책**: 동일한 상품을 수량만 추가하는 경우 `prevPrice`는 **처음 담은 가격을 그대로 유지**합니다. 사용자가 최초로 결심한 가격을 보존하기 위해서입니다.

---

## 두 필드가 다를 때 알림 띄우기

학생(김도혁님) 요청 시나리오를 그대로 구현한 예시입니다.

```js
// 장바구니 페이지 진입 시 실행
async function checkCartPriceChanges() {
  const token = localStorage.getItem('token');
  const cart = await fetch('/api/gentlelion/v1/cart', {
    headers: { 'Authorization': `Bearer ${token}` }
  }).then(r => r.json());

  const changedItems = cart.data.items.filter(
    item => item.price !== item.prevPrice
  );

  for (const item of changedItems) {
    const ok = confirm(
      `${item.name}의 가격이 변했습니다. ${item.prevPrice}원 → ${item.price}원`
    );

    if (ok) {
      // 사용자가 확인 → 서버에 스냅샷 갱신 요청
      await fetch(
        `/api/gentlelion/v1/cart/${item.cartItemId}/acknowledge-price`,
        {
          method: 'PATCH',
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );
    } else {
      // 사용자가 취소 → 인덱스 페이지로 이동
      window.location.href = '/';
      return;
    }
  }

  // 모두 확인하고 나면 장바구니를 재렌더링
  await renderCart();
}
```

---

## 신규 API: 가격 변경 확인 (`acknowledge-price`)

- **Method**: PATCH
- **URL**: `/api/gentlelion/v1/cart/{cartItemId}/acknowledge-price`
- **인증**: 필수 (본인의 장바구니 아이템만)
- **Body**: 없음

해당 장바구니 아이템의 `prevPrice`(스냅샷)를 **현재 상품 가격**으로 갱신합니다. 갱신 이후에는 `price == prevPrice`가 되어 장바구니 조회 시 알림이 더 이상 뜨지 않습니다.

### Response

```json
{
  "success": true,
  "data": {
    "cartItemId": 28,
    "productId": 10,
    "name": "GENTLE MONSTER 10",
    "price": 400000,
    "prevPrice": 400000,
    "quantity": 2,
    "images": [
      "https://placehold.co/400x300?text=GM-10-1",
      "https://placehold.co/400x300?text=GM-10-2"
    ]
  }
}
```

### Status

| status | 설명 |
| ------ | ---- |
| 200 | 갱신 성공 |
| 401 | 인증 실패 |
| 404 | 본인 장바구니에 해당 아이템 없음 |

---

## curl 테스트 절차 (실서버 검증)

### 1. 로그인 후 토큰 획득

```bash
TOKEN=$(curl -s -X POST https://api.fullstackfamily.com/api/gentlelion/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"your@email.com","password":"YourPassword"}' \
  | python3 -c "import json,sys; print(json.load(sys.stdin)['token'])")
```

### 2. 상품을 장바구니에 담음

```bash
curl -X POST -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"productId":10,"quantity":1}' \
  https://api.fullstackfamily.com/api/gentlelion/v1/cart
```

응답: `price == prevPrice == 350000`

### 3. 관리자가 상품 가격 수정 (관리자 API 또는 DB)

`price`가 350000 → 400000으로 바뀐 상황을 만듭니다.

### 4. 장바구니 재조회

```bash
curl -H "Authorization: Bearer $TOKEN" \
  https://api.fullstackfamily.com/api/gentlelion/v1/cart
```

응답: `price == 400000`, `prevPrice == 350000` — **알림 조건 충족**

### 5. 가격 확인 처리

```bash
curl -X PATCH -H "Authorization: Bearer $TOKEN" \
  "https://api.fullstackfamily.com/api/gentlelion/v1/cart/{cartItemId}/acknowledge-price"
```

응답: `price == prevPrice == 400000`

### 6. 다시 조회

```bash
curl -H "Authorization: Bearer $TOKEN" \
  https://api.fullstackfamily.com/api/gentlelion/v1/cart
```

응답: `price == prevPrice == 400000` — **알림 조건 해제**

---

## 실서버 검증 결과

| 단계 | 기대값 | 실제값 |
|------|--------|--------|
| 장바구니에 담은 직후 | `price == prevPrice == 350000` | ✓ |
| 상품 가격 400000으로 변경 후 | `price=400000, prevPrice=350000` | ✓ |
| 동일 상품 수량 추가 후 | `price=400000, prevPrice=350000` (스냅샷 유지) | ✓ |
| `acknowledge-price` 호출 후 | `price == prevPrice == 400000` | ✓ |

---

## 프런트엔드 구현 팁

1. **재귀 알림 방지**: `acknowledge-price`를 호출하지 않고 프런트 로컬 state만 바꾸면, 페이지 새로고침 시 다시 알림이 뜹니다. 반드시 서버에 갱신 요청을 보내세요.

2. **가격 변경 아이템이 여러 개일 때**: 위 예시처럼 `for...of`로 순차 처리하면 사용자가 한 번에 하나씩 확인할 수 있습니다. `Promise.all`로 병렬 처리하면 confirm 창이 동시에 여러 개 뜨니 주의하세요.

3. **부분 취소**: 여러 아이템 중 일부만 확인하고 일부는 취소하고 싶다면, `continue` / `break` 로직을 조정하거나 선택 UI로 변경하는 것이 좋습니다.

4. **화면 이동 후 복귀 UX**: 알림에서 취소하고 인덱스로 나갔다가 다시 장바구니로 들어오면 동일한 알림이 다시 뜹니다. 이것이 의도된 동작입니다 — 사용자가 변경된 가격을 명시적으로 수락해야만 알림이 사라집니다.
