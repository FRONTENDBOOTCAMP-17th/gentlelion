// 1. 필요한 요소 선택
const wrapper = document.querySelector(".swiper-wrapper");
const slides = document.querySelectorAll(".swiper-slide");
const thumbs = document.querySelectorAll(".thumb-item");

let isDown = false;
let startX;
let scrollLeft;
let currentIdx = 0;

// 슬라이드 이동 함수 (index를 받아 해당 위치로 이동)
function goToSlide(index) {
  if (index < 0) index = 0;
  if (index >= slides.length) index = slides.length - 1;

  currentIdx = index;
  const slideWidth = slides[0].offsetWidth;

  // 이동 애니메이션 적용
  wrapper.style.transition = "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)";
  wrapper.style.transform = `translateX(-${slideWidth * currentIdx}px)`;

  // 아이템 뷰(썸네일) 상태 업데이트
  thumbs.forEach((thumb, i) => {
    if (i === currentIdx) {
      thumb.classList.add("border-black", "opacity-100");
      thumb.classList.remove("border-transparent", "opacity-50");
    } else {
      thumb.classList.remove("border-black", "opacity-100");
      thumb.classList.add("border-transparent", "opacity-50");
    }
  });
}

// 2. 드래그 이벤트 리스너 등록
wrapper.addEventListener("mousedown", (e) => {
  isDown = true;
  wrapper.style.transition = "none"; // 드래그 중에는 애니메이션 끄기
  startX = e.pageX - wrapper.offsetLeft;
  // 현재 적용된 transform 값을 추출
  const style = window.getComputedStyle(wrapper);
  const matrix = new WebKitCSSMatrix(style.transform);
  scrollLeft = matrix.m41;
});

wrapper.addEventListener("mouseleave", () => {
  isDown = false;
});
wrapper.addEventListener("mouseup", (e) => {
  if (!isDown) return;
  isDown = false;

  // 마우스를 뗀 시점에 어느 방향으로 많이 밀었는지 계산해서 슬라이드 확정
  const endX = e.pageX - wrapper.offsetLeft;
  const diff = startX - endX;

  if (Math.abs(diff) > 100) {
    // 100px 이상 밀었을 때 이동
    diff > 0 ? goToSlide(currentIdx + 1) : goToSlide(currentIdx - 1);
  } else {
    goToSlide(currentIdx); // 조금만 밀었으면 제자리로
  }
});

wrapper.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - wrapper.offsetLeft;
  const walk = x - startX;
  wrapper.style.transform = `translateX(${scrollLeft + walk}px)`;
});

// 3. 아이템 뷰(썸네일) 클릭 이벤트
thumbs.forEach((thumb) => {
  thumb.addEventListener("click", () => {
    const index = parseInt(thumb.getAttribute("data-index"));
    goToSlide(index);
  });
});

// 초기 실행
goToSlide(0);
