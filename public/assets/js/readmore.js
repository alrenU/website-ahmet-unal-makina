let textP = document.getElementById("detailsText");
let text = textP.innerHTML;
let readMore = document.createElement("p");

    
    if(text.length > 150){
        shrinkText();
        readMore.className = "read-more";
        readMore.onclick = () => handleLongText();
        document.getElementById("text-container").appendChild(readMore);
    }

function handleLongText() {
    if(readMore.innerHTML === "Read More!") expandText();
    else shrinkText();
}

function expandText() {
    textP.innerHTML = text;
    readMore.innerHTML = "Read Less!";
}

function shrinkText() {
    textP.innerHTML = text.slice(0, 150) + "...";
    readMore.innerHTML = "Read More!";
}

