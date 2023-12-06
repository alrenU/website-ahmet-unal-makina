document.addEventListener("DOMContentLoaded", function() {
    fetch("/public/header.html")
      .then(response => response.text())
      .then(html => document.getElementById("header-placeholder").innerHTML = html);
  
    fetch("/public/footer.html")
      .then(response => response.text())
      .then(html => document.getElementById("footer-placeholder").innerHTML = html);
  });