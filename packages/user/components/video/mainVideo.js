const videoData = [
  {
    type: "video",
    src: "https://gm-prd-resource.gentlemonster.com/main/banner/816842143951433302/79761a11-80a4-4080-9eec-fc5780dc5d5f/main_pc_1920_990.mp4",
    title: "DISNEY x F1 COLLECTION",
  },
  {
    type: "video",
    src: "https://gm-prd-resource.gentlemonster.com/main/banner/798372671433820827/6fc4e780-c8ce-48bd-a8dd-3abff6ab7f8d/main_pc_1920*990.mp4",
    title: "2026 COLLECTION",
  },
  {
    type: "video",
    src: "https://gm-prd-resource.gentlemonster.com/main/banner/770800970997325499/acc3f823-6a91-4897-b629-3891b5632fe9/main_0_pc_1920*990.mp4",
    title: "FALL COLLECTION",
  },
  {
    type: "image",
    src: "https://gm-prd-resource.gentlemonster.com/main/banner/774598748925315310/6745aa4a-c010-4f46-957b-4f6b3d6c4b9d/MAIN_PC.jpg",
    title: "THE ROOM: ESCAPE THE HUNT",
    duration: 5000,
  },
  {
    type: "video",
    src: "https://gm-prd-resource.gentlemonster.com/main/banner/745797614844190277/dc673826-17a9-4253-b4e5-d0f681db7017/main_0_pc_1920*990.mp4",
    title: "BOLD COLLECTION",
  },
];

let currentIndex = 0;
let imageRequest;

const videoPlayer = document.getElementById("main-video-player");
const imagePlayer = document.getElementById("main-image-player");
const videoSource = document.getElementById("video-source");
const titleElement = document.getElementById("video-title");
const progressBars = document.querySelectorAll(".progress-fill");
const mainContainer = document.querySelector(".main-video");
const campaignBtn = document.getElementById("campaignBtn");

function loadContent(index) {
  currentIndex = index;
  const data = videoData[index];

  titleElement.textContent = data.title;
  cancelAnimationFrame(imageRequest);

  progressBars.forEach((bar, i) => {
    bar.style.transition = "none";
    bar.style.width = i < index ? "100%" : "0%";
  });

  if (data.type === "video") {
    imagePlayer.classList.add("hidden");
    videoPlayer.classList.remove("hidden");

    videoPlayer.pause();
    videoSource.src = data.src;

    videoPlayer.load();

    videoPlayer.play().catch((e) => {});
  } else {
    videoPlayer.pause();
    videoPlayer.classList.add("hidden");
    imagePlayer.classList.remove("hidden");
    imagePlayer.src = data.src;

    startImageProgress(data.duration);
  }
}

function startImageProgress(duration) {
  const startTime = Date.now();

  function frame() {
    const elapsed = Date.now() - startTime;
    const progress = (elapsed / duration) * 100;

    if (progressBars[currentIndex]) {
      progressBars[currentIndex].style.width = `${Math.min(progress, 100)}%`;
    }

    if (elapsed < duration) {
      imageRequest = requestAnimationFrame(frame);
    } else {
      nextContent();
    }
  }
  imageRequest = requestAnimationFrame(frame);
}

function nextContent() {
  cancelAnimationFrame(imageRequest);
  let nextIndex = (currentIndex + 1) % videoData.length;
  loadContent(nextIndex);
}

function prevContent() {
  cancelAnimationFrame(imageRequest);
  let prevIndex = (currentIndex - 1 + videoData.length) % videoData.length;
  loadContent(prevIndex);
}

videoPlayer.addEventListener("timeupdate", () => {
  if (videoData[currentIndex].type === "video" && videoPlayer.duration) {
    const progress = (videoPlayer.currentTime / videoPlayer.duration) * 100;
    progressBars[currentIndex].style.width = `${progress}%`;
  }
});

mainContainer.addEventListener("click", (e) => {
  if (e.target.closest("button") || e.target.closest("a")) return;

  const rect = mainContainer.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const containerWidth = rect.width;

  if (clickX < containerWidth / 2) {
    prevContent();
  } else {
    nextContent();
  }
});

videoPlayer.addEventListener("ended", nextContent);

loadContent(0);
