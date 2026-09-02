// 1. Trigger everything when the page loads
document.addEventListener('DOMContentLoaded', () => {
  initDynamicTabs();
});

// 2. Main function that controls the tab system
function initDynamicTabs() {
  const navButtons = document.querySelectorAll('.nav-options button');
  const contentArea = document.getElementById('content-area');
  const basePath = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);

  if (navButtons.length === 0) {
    console.warn("Nav buttons not found yet.");
    return;
  }

  // 3. LoadTab function lives here to fetch HTML partials
  async function loadTab(tabName) {
    try {
      const response = await fetch(`${basePath}tabs/${tabName}.html`);
      if (!response.ok) {
        throw new Error(`Failed to load tab: ${tabName} (Status: ${response.status})`);
      }
      const htmlContent = await response.text();
      contentArea.innerHTML = htmlContent;

      // If home tab loads, also fetch JSON data
      if (tabName === 'homepage') {
        await loadHomepageData();
      }
    } catch (error) {
      console.error(error);
      contentArea.innerHTML = `<p style="color:red; font-family:monospace;">Error loading tab '${tabName}'. Check if the 'tabs' folder is uploaded.</p>`;
    }
  }

  // Listen for clicks on nav buttons
  navButtons.forEach(button => {
    button.addEventListener('click', async () => {
      const targetView = button.getAttribute('data-view');
      if (!targetView) return;

      navButtons.forEach(b => b.classList.remove('active'));
      button.classList.add('active');

      await loadTab(targetView);
    });
  });

  // Load homepage by default on startup
  loadTab('homepage');
}

// 4. Separate function to load JSON data for the homepage
async function loadHomepageData() {
  try {
    const basePath = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
    const response = await fetch(`${basePath}data/homepageData.json`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    const nameEl = document.getElementById('hero-name');
    if (nameEl && data.name) {
      nameEl.textContent = data.name;
    }

    const bioEl = document.getElementById('hero-bio');
    if (bioEl && data.bio) {
      bioEl.textContent = data.bio;
    }

    const imgEl = document.querySelector('.hero-banner-img');
    if (imgEl && data.image) {
      const cleanPath = data.image.startsWith('./') ? data.image.substring(2) : data.image;
      imgEl.src = basePath + cleanPath;
    }

  } catch (error) {
    console.error('Error loading homepage data:', error);
  }
}