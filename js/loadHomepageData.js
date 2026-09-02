async function loadPortfolioData() {
    try {
        const response = await fetch("./data/homepageData.json");
        const data = await response.json();
        document.getElementById("portfolio-name").textContent = data.name;
        document.getElementById("portfolio-bio").textContent = data.bio;
        document.getElementById("portfolio-img").src = data.image;
        document.getElementById("portfolio-img").alt = data.name + " — profile photo";
    } catch (error) {
        console.error("Error loading portfolio data:", error);
    }
}
window.addEventListener("DOMContentLoaded", loadPortfolioData);