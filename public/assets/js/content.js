document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll(".internal-navigation");

    links.forEach(link => {
        link.addEventListener("click", scrollToSection);
    });

    function scrollToSection(e) {
        e.preventDefault();

        const targetId = this.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: "smooth"
            });
        } else {
            window.scrollTo({
               top: 0,
               behavior: "smooth" 
            });
        }
    }
});