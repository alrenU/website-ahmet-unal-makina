// Shrink the header height after the page is being scrolled.
// window.addEventListener("scroll", function (event) {
//     const scrollPositionY = window.scrollY;
//     const headerElement = this.document.getElementsByClassName("header")[0];

//     if(scrollPositionY < 150) {
//         if(scrollPositionY < 100) {
//             headerElement.style.height = "100px";
//         }
//     } else {
//         headerElement.style.height = "80px";
//     }
//     console.log("scrollPositionY: ", scrollPositionY);
// });

// HAMBURGER MENU
let openHamburgerMenu = false;

const lineOne = document.getElementById("hamburger-line-one");
const lineTwo = document.getElementById("hamburger-line-two");
const lineThree = document.getElementById("hamburger-line-three");
const headerNav = document.getElementById("navigation");

function handleHamburgerMenuClick() {
    if (!openHamburgerMenu) {
        Object.assign(lineOne.style, {
            transform: "translate(0px, 8px) rotate(45deg)"
        });

        Object.assign(lineTwo.style, {
            opacity: "0",
            transform: "translate(-10px, 0px)"
        });

        Object.assign(lineThree.style, {
            transform: "translate(0px, -8px) rotate(-45deg)"
        });

        Object.assign(headerNav.style, {
            display: "block",
            right: "0px"
        });
    } else {
        Object.assign(lineOne.style, {
            transform: "translate(0px, 0px) rotate(0deg)"
        });

        Object.assign(lineTwo.style, {
            opacity: "1",
            transform: "translate(0px, 0px)"
        });

        Object.assign(lineThree.style, {
            transform: "translate(0px, 0px) rotate(0deg)"
        });

        Object.assign(headerNav.style, {
            display: "none",
            right: "-50px"
        });
    }

    openHamburgerMenu = !openHamburgerMenu;
}