// modules/footer.js
document.addEventListener('DOMContentLoaded', () => {
    const footer = `
      <footer>
        <p>&copy; 2023 Free DBA Learning. All rights reserved.</p>
        <ul class="footer-links">
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Terms of Service</a></li>
          <li><a href="contact.html">Contact Us</a></li>
        </ul>
      </footer>
    `;
    document.body.insertAdjacentHTML('beforeend', footer);
  });