document.addEventListener('DOMContentLoaded', () => {
  initDynamicTabs();
});

function initDynamicTabs() {
  const navButtons = document.querySelectorAll('.nav-options button');
  const contentArea = document.getElementById('content-area');

  if (navButtons.length === 0) {
    console.warn("Nav buttons not found yet, retrying...");
    return;
  }

  async function loadTab(tabName) {
    try {
      const response = await fetch(`tabs/${tabName}.html`);
      if (!response.ok) {
        throw new Error(`Failed to load tab: ${tabName} (Status: ${response.status})`);
      }
      const htmlContent = await response.text();
      contentArea.innerHTML = htmlContent;

      if (tabName === 'homepage') {
        await loadHomepageData();
      }
    } catch (error) {
      console.error(error);
      contentArea.innerHTML = `<p style="color:red; font-family:monospace;">Error loading tab '${tabName}'. Check console (F12).</p>`;
    }
  }

  navButtons.forEach(button => {
    button.addEventListener('click', async () => {
      const targetView = button.getAttribute('data-view');
      if (!targetView) return;

      navButtons.forEach(b => b.classList.remove('active'));
      button.classList.add('active');

      await loadTab(targetView);
    });
  });

  // Load default view
  loadTab('homepage');
}

async function loadHomepageData() {
  try {
    const response = await fetch('data/homepageData.json');
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
      imgEl.src = data.image.startsWith('./') ? data.image.substring(2) : data.image;
    }

  } catch (error) {
    console.error('Error loading homepage data:', error);
  }
}