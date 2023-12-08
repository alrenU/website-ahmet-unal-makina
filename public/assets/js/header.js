// Add background to the header after scrolling.
const navWrapperElem = document.querySelector(".navigation-wrapper");
const logoElem = document.querySelector(".logo");
const barElems = document.querySelectorAll(".bar");
const hamburgerMenuElem = document.querySelector(".hamburger-menu");
const languageSelectionCont = document.querySelector(".language-selection-container");

let changedStyle = false;

window.addEventListener("scroll", () => {
    const scrollPositionY = window.scrollY;
    changeElemStyleAfterScroll(scrollPositionY);
});

const changeElemStyleAfterScroll = (scrollPositionY) => {
    if(scrollPositionY > 100) {
        if(!changedStyle) {
            navWrapperElem.classList.add("scrolled");
            logoElem.classList.add("scrolled");

            barElems.forEach(element => {
                element.classList.add("scrolled");
            });

            languageSelectionCont.classList.add("scrolled");
            changedStyle = true;
        }
    } else {
        if (changedStyle && !hamburgerMenuElem.classList.contains("activated")) {
            navWrapperElem.classList.remove("scrolled");
            logoElem.classList.remove("scrolled");

            barElems.forEach(element => {
                element.classList.remove("scrolled");
            });

            languageSelectionCont.classList.remove("scrolled");
            changedStyle = false;
        }
    }
}

// Open and close hamburger menu behaviors.
const navElem = document.querySelector(".navigation");
const navLinkElems = document.querySelectorAll(".nav-link");
const backgroundBlurElem = document.querySelector(".background-blur");

hamburgerMenuElem.addEventListener("click", () => {
    hamburgerMenuElem.classList.toggle("activated");
    navElem.classList.toggle("activated");
    backgroundBlurElem.classList.toggle("activated");

    // If the hamburger menu is open, change the header style to as if it is being scrolled.
    addOrRemoveAfterScrollStyle();
});

for(let i = 0; i < navLinkElems.length; i++) {
    navLinkElems[i].addEventListener("click", () => {
        hamburgerMenuElem.classList.remove("activated");
        navElem.classList.remove("activated");
        addOrRemoveAfterScrollStyle();
    });
}

const addOrRemoveAfterScrollStyle = () => {
    if(hamburgerMenuElem.classList.contains("activated")) {
        changeElemStyleAfterScroll(150);
    } else {
        changeElemStyleAfterScroll(window.scrollY);
    }
}