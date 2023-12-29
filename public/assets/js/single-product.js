const imgElems = document.querySelectorAll(".image");

function changeProductImg(imgIdx) {
    document.querySelector(".shown").classList.remove("shown");

    imgElems.forEach((element, index) => {
        if(index === imgIdx) {
            element.classList.add("shown");
        }

        element.style.left = `-${imgIdx * 100}%`;
    });
}