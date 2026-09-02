document.addEventListener('DOMContentLoaded', () => {
  initDynamicTabs();
});

function initDynamicTabs() {
  const navButtons = document.querySelectorAll('.nav-options button');
  const contentArea = document.getElementById('content-area');

  // Automatically find the correct folder path for GitHub Pages or local server
  const basePath = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);

  async function loadTab(tabName) {
    try {
      const response = await fetch(`${basePath}tabs/${tabName}.html`);
      if (!response.ok) {
        throw new Error(`Failed to load tab: ${tabName}`);
      }
      const htmlContent = await response.text();
      contentArea.innerHTML = htmlContent;

      if (tabName === 'homepage') {
        await loadHomepageData();
      }
    } catch (error) {
      console.error(error);
      contentArea.innerHTML = `<p style="color:red;">Error loading tab. Press F12 to check Console.</p>`;
    }
  }

  navButtons.forEach(button => {
    button.addEventListener('click', async () => {
      const targetView = button.getAttribute('data-view');

      navButtons.forEach(b => b.classList.remove('active'));
      button.classList.add('active');

      await loadTab(targetView);
    });
  });

  loadTab('homepage');
}

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