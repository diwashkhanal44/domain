const footerContainer = document.getElementById("footer-container");
fetch("./footer.html")
    .then(function (response) { return response.text(); })
    .then(function (html) { footerContainer.innerHTML = html; })
    .catch(function (error) { console.error("Error fetching footer:", error); });