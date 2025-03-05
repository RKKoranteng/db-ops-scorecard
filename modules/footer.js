// modules/footer.js
document.addEventListener('DOMContentLoaded', () => {
    const footer = `
      <footer>
        <p>&copy; 2025 Learn with RK. All rights reserved.</p>
        <ul class="footer-links">
          <li><a href="#">Terms</a></li>
          <li><a href="#">Courses</a></li>
          <li><a href="contact.html">Contact Us</a></li>
        </ul>
      </footer>
    `;
    document.body.insertAdjacentHTML('beforeend', footer);
  });