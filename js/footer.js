const footerContainer = document.getElementById('footer-container');
      fetch('footer.html')
      .then(response => response.text())
      .then(html => {
          footerContainer.innerHTML = html;
      });