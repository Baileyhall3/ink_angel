let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" slideshow_active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " slideshow_active";
}

// To allow mobile users to swipe the slideshow
let startX = 0;
let endX = 0;
const swipeThreshold = 50; // Minimum distance in pixels to qualify as a swipe

function handleTouchStart(event) {
    startX = event.touches[0].clientX;
    endX = startX; 
}

function handleTouchMove(event) {
    endX = event.touches[0].clientX;
}

function handleTouchEnd() {
    const diff = endX - startX;
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe right
            plusSlides(-1);
        } else {
            // Swipe left
            plusSlides(1);
        }
    }
}

const slideshowContainer = document.querySelector('.slideshow-container');
slideshowContainer.addEventListener('touchstart', handleTouchStart, false);
slideshowContainer.addEventListener('touchmove', handleTouchMove, false);
slideshowContainer.addEventListener('touchend', handleTouchEnd, false);
