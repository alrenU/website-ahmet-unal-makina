document.addEventListener("DOMContentLoaded", () => {
    // Banner carousel.
    let imgIndex = 0;
    let bannerImagesContainer = document.querySelector(".banners");

    if (!(bannerImagesContainer === null)) {
        let images = document.querySelectorAll(".banner-img");
        let bannerTexts = document.querySelectorAll(".banner-message");

        let imageSelectors = document.querySelectorAll(".img-selector");
        imageSelectors[imgIndex].className = "img-selector active";

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
            imageSelectors[imgIndex].className = "img-selector";
            imgIndex = newIndex;
            imageSelectors[imgIndex].className = "img-selector active";
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
    const hamburgerMenuElem = document.querySelector(".hamburger-menu");

    let changedStyle = false;

    window.addEventListener("scroll", () => {
        const scrollPositionY = window.scrollY;
        changeElemStyleAfterScroll(scrollPositionY);
    });

    const changeElemStyleAfterScroll = (scrollPositionY) => {
        if (scrollPositionY > 100) {
            if (!changedStyle) {
                navWrapperElem.classList.add("scrolled");
                changedStyle = true;
            }
        } else {
            if (changedStyle && !hamburgerMenuElem.classList.contains("activated")) {
                navWrapperElem.classList.remove("scrolled");
                changedStyle = false;
            }
        }
    }



    // Open and close hamburger menu behaviors.
    const navElem = document.querySelector(".navigation");
    const navLinkElems = document.querySelectorAll(".nav-link");
    const backgroundLayerElem = document.querySelector(".mobile-nav-background-layer");

    hamburgerMenuElem.addEventListener("click", () => {
        hamburgerMenuElem.classList.toggle("activated");
        navElem.classList.toggle("activated");
        backgroundLayerElem.classList.toggle("activated");

        // If the hamburger menu is open, change the header style to as if it is being scrolled.
        addOrRemoveAfterScrollStyle();
    });

    for (let i = 0; i < navLinkElems.length; i++) {
        navLinkElems[i].addEventListener("click", () => {
            hamburgerMenuElem.classList.remove("activated");
            navElem.classList.remove("activated");
            backgroundLayerElem.classList.remove("activated");
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



    // Change the website language.
    let clickCounter = 0;
    let trElems = document.querySelectorAll(".tr");
    let enElems = document.querySelectorAll(".en");
    let arrowElems = document.querySelectorAll(".triangular-arrow");
    let selectedElems, hiddenElems;

    // Add event listeners to the languages.
    trElems.forEach(element => {
        element.addEventListener("click", () => caseController("tr"));
    });

    enElems.forEach(element => {
        element.addEventListener("click", () => caseController("en"));
    });

    function caseController(selectedLang) {
        switch (++clickCounter) {
            case 1:
                [selectedElems, hiddenElems] = trElems[0].classList.contains("selected") ? [trElems, enElems] : [enElems, trElems];

                hiddenElems.forEach(element => {
                    element.classList.remove("hidden");
                });

                arrowElems.forEach(element => {
                    element.classList.remove("hidden");
                });

                break;

            case 2:
                clickCounter = 0;

                selectedElems.forEach(element => {
                    element.classList.remove("selected");
                });

                switch (selectedLang) {
                    case "tr":
                        setNewLanguage(trElems, enElems);
                        break;

                    case "en":
                        setNewLanguage(enElems, trElems);
                        break;

                    default:
                        console.error("Unknown language. The value must be either tr or en.");

                        // As a fallback set the previous value.
                        setNewLanguage(selectedElems, hiddenElems);
                        break;
                }

                break;

            default:
                console.error("Unknown case, clickCounter: ", clickCounter, ". It must be either 1 or two.");
                break;
        }
    }

    function setNewLanguage(selectedList, hiddenList) {
        selectedList.forEach(element => {
            element.classList.add("selected");
        });

        hiddenList.forEach(element => {
            element.classList.add("hidden");
        });

        arrowElems.forEach(element => {
            element.classList.add("hidden");
        });
    }
});