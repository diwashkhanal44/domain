document.addEventListener('DOMContentLoaded', () => {
  initDynamicTabs();
});

function initDynamicTabs() {
  const navLinks = document.querySelectorAll('.nav-options a');
  const contentArea = document.getElementById('content-area');

  async function loadTab(tabName) {
    try {
      const response = await fetch(`./tabs/${tabName}.html`);
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
      contentArea.innerHTML = `<p style="color:red;">Error loading content. Please check tab file path: ./tabs/${tabName}.html</p>`;
    }
  }

  navLinks.forEach(link => {
    link.addEventListener('click', async (e) => {
      e.preventDefault();
      const targetView = link.getAttribute('data-view');

      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      await loadTab(targetView);
    });
  });

  // Default initial load points to homepage.html
  loadTab('homepage');
}

async function loadHomepageData() {
  try {
    const response = await fetch('./data/homepageData.json');
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
      imgEl.src = data.image;
    }

  } catch (error) {
    console.error('Error loading homepage data:', error);
  }
}