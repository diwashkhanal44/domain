async function loadPortfolioData() {
  try {
    const response = await  fetch('../data/homepageData.json'); // Fetch the data
    const data =await response.json();

    // Map data to HTML elements using IDs
    document.getElementById('portfolio-name').textContent = data.name;
    document.getElementById('portfolio-bio').textContent = data.bio;
    document.getElementById('portfolio-img').src = data.image;
  } catch (error) {
    console.error('Error loading portfolio data:', error);
  }
}

// Run the function when the page loads
window.onload = loadPortfolioData;