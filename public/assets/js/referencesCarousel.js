let currentIndex = 0;
const carouselContainer = document.querySelector('.carousel-container');
const totalItems = document.querySelectorAll('.carousel-item').length;
let translateXValue = -1800

function nextSlide() {
    if (currentIndex < totalItems - 1) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    updateCarousel();
}

function prevSlide() {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = totalItems - 1;
    }
    updateCarousel();
}

function updateCarousel() {
    translateXValue += 300 /*(carouselContainer.offsetWidth / 4)*/; 
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

let transitionEndEventListener = getTransitionEndEventListener();

document.addEventListener("DOMContentLoaded", () => {
    let interval = setInterval(updateCarousel, 2000);

    window.addEventListener('beforeunload', function () {
        clearInterval(interval);
    });
})