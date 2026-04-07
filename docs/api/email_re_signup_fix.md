# 회원탈퇴 후 이메일 재가입 버그 수정

> 2026-04-07: 회원탈퇴 후 같은 이메일로 재가입이 가능하도록 수정했습니다.

## 문제

회원탈퇴(soft delete) 후 같은 이메일로 재가입하면 "Email already exists." 에러가 발생했습니다.

**원인 2가지:**

1. 회원가입 시 이메일 중복 체크가 탈퇴 회원을 포함하여 검사
2. DB의 email 컬럼에 UNIQUE 제약이 있어, soft-deleted 행이 남아있으면 같은 이메일로 INSERT 불가

## 수정 내용

1. **이메일 중복 체크**: `existsByEmail()` → `existsByEmailAndIsDeletedFalse()` (활성 회원만 검사)
2. **탈퇴 시 이메일 변경**: 탈퇴 처리 시 이메일을 `withdrawn_{userId}_{원래이메일}` 형태로 변경하여 DB unique 슬롯 해제

## 동작 확인

```
1. 가입: retest@example.com → userId: 28 (성공)
2. 탈퇴 → DB에 withdrawn_28_retest@example.com으로 변경
3. 같은 이메일로 재가입: retest@example.com → userId: 29 (성공)
4. 재가입 계정 로그인: 성공
```

프로덕션에 이미 반영되었습니다.
