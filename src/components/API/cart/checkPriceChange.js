export async function checkPriceChange(token, product) {
    if (product.price === product.prevPrice) return true;

    const confirmed = confirm(
        `${product.name}의 가격이 변경되었습니다.\n담은 시점 가격: ₩${product.prevPrice.toLocaleString()} → 현재 가격: ₩${product.price.toLocaleString()}\n\n확인을 누르면 변경된 가격으로 업데이트됩니다.`
    );

    if (confirmed) {
        await fetch(`https://api.fullstackfamily.com/api/gentlelion/v1/cart/${product.cartItemId}/acknowledge-price`, {
            method: 'PATCH',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return true;
    } else {
        window.location.href = '/';
        return false;
    }
}