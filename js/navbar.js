document.addEventListener("DOMContentLoaded", function () {
    fetch("./navbar.html")
        .then(function (response) { return response.text(); })
        .then(function (html) {
            document.getElementById("navbar-placeholder").innerHTML = html;
            var currentFile = window.location.pathname.split("/").pop() || "index.html";
            var currentPage = currentFile.replace(".html", "") || "index";
            var links = document.querySelectorAll(".nav-options a");
            links.forEach(function (link) {
                if (link.dataset.page === currentPage) {
                    link.classList.add("active");
                } else {
                    link.classList.remove("active");
                }
            });
        })
        .catch(function (error) { console.error("Error fetching navbar:", error); });
});