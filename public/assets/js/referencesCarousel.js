const carouselContainer = document.querySelector('.carousel-container');
const totalItems = document.querySelectorAll('.carousel-item').length;
let translateXValue = -1800
let transitionEndEventListener = getTransitionEndEventListener();
let interval
let isAnimating = false

function nextSlide() {
    if(isAnimating) return;
    isAnimating = true;

    updateCarousel(-300);

    setTimeout(function() {
        isAnimating = false;
    }, 550);

    resetInterval();
}

function prevSlide() {
    if(isAnimating) return;
    isAnimating = true;

    updateCarousel(300);

    setTimeout(function() {
        isAnimating = false;
    }, 550);

    resetInterval();
}

function updateCarousel(updateValue = -300) {
    translateXValue += updateValue; 
    carouselContainer.style.transform = `translate3d(${translateXValue}px, 0px, 0px)`;

    if(translateXValue === 0 || translateXValue === -3000){
        carouselContainer.addEventListener(transitionEndEventListener, resetCarousel);
    }
}

function resetCarousel() {
    carouselContainer.classList.add('notransition-carousel')
    translateXValue = -1500
    carouselContainer.style.transform = `translate3d(${translateXValue}px, 0px, 0px)`;
    carouselContainer.offsetWidth;
    carouselContainer.classList.remove('notransition-carousel');

    carouselContainer.removeEventListener(transitionEndEventListener, resetCarousel)
}

function getTransitionEndEventListener() {
    var transitions = {
        "transition"      : "transitionend",
        "OTransition"     : "oTransitionEnd",
        "MozTransition"   : "transitionend",
        "WebkitTransition": "webkitTransitionEnd"
     }
    let bodyStyle = document.body.style;
    for(let transition in transitions) {
        if(bodyStyle[transition] != undefined) {
            return transitions[transition];
        } 
    }
}

function resetInterval() {
    clearInterval(interval);
    interval = setInterval(updateCarousel, 2500);
}


document.addEventListener("DOMContentLoaded", () => {
    interval = setInterval(updateCarousel, 2500);

    window.addEventListener('beforeunload', function () {
        clearInterval(interval);
    });
})