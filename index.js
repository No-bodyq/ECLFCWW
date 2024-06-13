const h3List = document.querySelectorAll("nav h3");

document.addEventListener("DOMContentLoaded", function () {
  const thumbnails = document.querySelectorAll(".thumbnail");
  const mainImage = document.getElementById("current-image");
  const thumbnailContainer = document.querySelector(".thumbnails");
  let currentIndex = 0;
  let timer;

  function updateMainImage(index) {
    mainImage.classList.add("fade-out");
    setTimeout(() => {
      mainImage.src = thumbnails[index].src;
      mainImage.classList.remove("fade-out");
      highlightThumbnail(index);
      currentIndex = index;
      scrollToThumbnail(index);
    }, 700);
  }

  function highlightThumbnail(index) {
    thumbnails.forEach((thumbnail) => thumbnail.classList.remove("selected"));
    thumbnails[index].classList.add("selected");
  }

  function nextImage() {
    const nextIndex = (currentIndex + 1) % thumbnails.length;
    updateMainImage(nextIndex);
    resetTimer();
  }

  function prevImage() {
    const prevIndex =
      (currentIndex - 1 + thumbnails.length) % thumbnails.length;
    updateMainImage(prevIndex);
    resetTimer();
  }

  function selectImage(index) {
    updateMainImage(index);
    resetTimer();
  }

  function startTimer() {
    timer = setInterval(nextImage, 6000);
  }

  function resetTimer() {
    clearInterval(timer);
    startTimer();
  }

  function scrollToThumbnail(index) {
    const thumbnail = thumbnails[index];
    const containerRect = thumbnailContainer.getBoundingClientRect();
    const thumbnailRect = thumbnail.getBoundingClientRect();
    if (thumbnailRect.top < containerRect.top) {
      thumbnailContainer.scrollTop += thumbnailRect.top - containerRect.top;
    } else if (thumbnailRect.bottom > containerRect.bottom) {
      thumbnailContainer.scrollTop +=
        thumbnailRect.bottom - containerRect.bottom;
    }
  }

  window.nextImage = nextImage;
  window.prevImage = prevImage;
  window.selectImage = selectImage;

  updateMainImage(0);
  startTimer();
});
