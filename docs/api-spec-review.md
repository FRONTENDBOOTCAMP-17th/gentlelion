# Gentle Monster API 명세서 리뷰

> 리뷰어: FullStackFamily 강사
> 리뷰 일자: 2026-04-03

---

## 총평

젠틀몬스터 쇼핑몰의 API 명세서입니다. 전체적으로 매우 잘 작성되어 있습니다. 응답 형식이 일관되고(`{success, data}`), 에러 코드 체계가 명확하며, API 흐름도까지 포함되어 있어 이해하기 쉽습니다. 특히 주문 시 `orderPrice`(구매 당시 가격)를 별도로 기록하는 설계가 좋습니다.

아래는 구현 시 문제가 될 수 있는 항목들입니다.

---

## 1. 반드시 수정해야 할 문제 (Critical)

### 1.1 Base URL 누락

모든 엔드포인트가 `/api/auth/...`, `/api/products/...`로 되어 있어 다른 모듈과 충돌합니다.

**구현**: `/api/gentlelion/v1`로 래핑 (예: `/api/gentlelion/v1/auth/signup`)

### 1.2 이미지 업로드 설계 불완전

```
POST /api/admin/images/:imageId  ← 생성인데 path에 ID가 있음
Body: { "title": "파일명" }      ← 실제 파일이 아닌 제목만
```

**구현**: `POST /api/gentlelion/v1/admin/images` (multipart/form-data, 실제 파일 업로드) → imageUrl 반환

### 1.3 productId 타입 혼재

| 위치 | 값 | 타입 |
|------|-----|------|
| 사용자 API | `1` | number |
| 관리자 API | `"prod_051"` | string |
| 주문 상세 | `"prod_001"` | string |

**구현**: Long auto-increment 숫자로 통일

### 1.4 회원 탈퇴 API 없음

프로필 조회/수정만 있고 탈퇴가 없습니다.

**구현**: `POST /user/me/withdraw` 추가 (비밀번호 확인 후 soft delete)

---

## 2. 개선하면 좋은 항목 (Important)

### 2.1 colors, specifications 저장 방식 미정의

상품의 `colors` 배열과 `specifications` 객체를 DB에 어떻게 저장할지 정해지지 않았습니다.

**구현**: JSON 문자열로 DB 저장 (교육용 단순화)

### 2.2 관리자 주문 상태 변경 API 없음

주문 목록/상세 조회는 있지만, `pending→confirmed→shipping→delivered` 상태 변경 API가 없습니다.

**구현**: `PATCH /admin/orders/{id}/status` 추가

### 2.3 DUPLICATE_EMAIL이 400

이메일 중복은 REST 관례상 `409 Conflict`가 적합합니다.

**구현**: 409로 변경

### 2.4 prevPrice / price 혼란

장바구니: `prevPrice`(원래가격), `price`(현재가격)
주문: `price`(현재가격), `orderPrice`(구매가격)

**구현**: 장바구니에서도 `price`(정가), `currentPrice`(현재가) 또는 단순히 실시간 가격만 반환

---

## 3. 수정 요약표

| # | 우선순위 | 항목 | 구현 반영 |
|---|---------|------|----------|
| 1 | Critical | Base URL 없음 | `/api/gentlelion/v1` |
| 2 | Critical | 이미지 업로드 | multipart 실제 파일 업로드 |
| 3 | Critical | productId 타입 | Long 통일 |
| 4 | Critical | 회원 탈퇴 없음 | POST /user/me/withdraw 추가 |
| 5 | Important | colors/specs 저장 | JSON 문자열 |
| 6 | Important | 주문 상태 변경 | PATCH /admin/orders/{id}/status |
| 7 | Important | DUPLICATE_EMAIL | 409로 변경 |
