document.addEventListener("DOMContentLoaded", () => {
    // Banner carousel.
    let imgIndex = 0;
    let bannerImagesContainer = document.querySelector(".banners");

    if (!(bannerImagesContainer === null)) {
        let images = document.querySelectorAll(".banner-img");
        let bannerTexts = document.querySelectorAll(".banner-message");

        let imageSelectors = document.querySelectorAll(".img-selector");
        imageSelectors[0].style.backgroundColor = "rgb(255, 255, 255)";

        for (let i = 0; i < imageSelectors.length; i++) {
            imageSelectors[i].addEventListener("click", () => {
                showSelectedImage(i);
                updateBannerText(i);
                resetTimeInterval();
            });
        }

        const handleNextImage = () => {
            updateIndex((imgIndex + 1) % images.length);

            updateBannerImage();
            updateBannerText();
        };

        const updateIndex = (newIndex) => {
            imageSelectors[imgIndex].style.backgroundColor = "rgb(0, 0, 0)";
            imgIndex = newIndex;
            imageSelectors[imgIndex].style.backgroundColor = "rgb(255, 255, 255)";
        };

        const showSelectedImage = (index) => {
            updateIndex(index);

            updateBannerImage();
        };

        const updateBannerImage = () => {
            let displacement = -imgIndex * (100 / images.length);
            bannerImagesContainer.style.transform = 'translateX(' + displacement + '%)';
        };

        const updateBannerText = (selectedBannerTextIndex = null) => {
            let availableBannerTexts = bannerTexts.length;
            let currentlyDisplayedIndex = 0;

            for (let i = 0; i < availableBannerTexts; i++) {
                if (bannerTexts[i].classList.contains("display-message")) {
                    currentlyDisplayedIndex = i;
                    break;
                }
            }

            if (selectedBannerTextIndex === null) {
                bannerTexts[currentlyDisplayedIndex].classList.remove("display-message");
                bannerTexts[(currentlyDisplayedIndex + 1) % availableBannerTexts].classList.add("display-message");
            } else {
                bannerTexts[currentlyDisplayedIndex].classList.remove("display-message");
                bannerTexts[(selectedBannerTextIndex) % availableBannerTexts].classList.add("display-message");
            }
        }

        let interval = setInterval(handleNextImage, 5000);

        const resetTimeInterval = () => {
            clearInterval(interval);
            interval = setInterval(handleNextImage, 5000);
        }

        window.addEventListener('beforeunload', function () {
            clearInterval(interval);
        });
    }



    // Add background to the header after scrolling.
    const navWrapperElem = document.querySelector(".navigation-wrapper");
    const logoElem = document.querySelector(".logo");
    const hamburgerMenuElem = document.querySelector(".hamburger-menu");
    const languageSelectionCont = document.querySelectorAll(".language-selection-container");

    let changedStyle = false;

    window.addEventListener("scroll", () => {
        const scrollPositionY = window.scrollY;
        changeElemStyleAfterScroll(scrollPositionY);
    });

    const changeElemStyleAfterScroll = (scrollPositionY) => {
        if (scrollPositionY > 100) {
            if (!changedStyle) {
                navWrapperElem.classList.add("scrolled");
                logoElem.classList.add("scrolled");

                languageSelectionCont.forEach((element) => {
                    element.classList.add("scrolled");
                });

                changedStyle = true;
            }
        } else {
            if (changedStyle && !hamburgerMenuElem.classList.contains("activated")) {
                navWrapperElem.classList.remove("scrolled");
                logoElem.classList.remove("scrolled");

                languageSelectionCont.forEach((element) => {
                    element.classList.remove("scrolled");
                });

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

    for (let i = 0; i < navLinkElems.length; i++) {
        navLinkElems[i].addEventListener("click", () => {
            hamburgerMenuElem.classList.remove("activated");
            navElem.classList.remove("activated");
            backgroundBlurElem.classList.remove("activated");
            addOrRemoveAfterScrollStyle();
        });
    }

    const addOrRemoveAfterScrollStyle = () => {
        if (hamburgerMenuElem.classList.contains("activated")) {
            changeElemStyleAfterScroll(150);
        } else {
            changeElemStyleAfterScroll(window.scrollY);
        }
    }



    // Make language cohices syncronized for both desktop and mobile.
    const langMobileElem = document.querySelector("#select-language-mobile");
    const langDesktopElem = document.querySelector("#select-language-desktop");

    langMobileElem.addEventListener("change", function () {
        langDesktopElem.value = this.value;
        console.log(this.value);
    });

    langDesktopElem.addEventListener("change", function () {
        langMobileElem.value = this.value;
        console.log(this.value);
    });
});