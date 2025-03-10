// modules/footer.js
document.addEventListener('DOMContentLoaded', () => {
    const footer = `
      <footer>
        <p>&copy; 2025 <a href=https://rkkoranteng.com><font color="#007BFF">Richard Koranteng</a></font>. All rights reserved.</p>
        <ul class="footer-links">
          <li><a href="file:///C:/Users/richa/OneDrive/Desktop/github/modern-dba-project/terms.html">Terms</a></li>
          <li><a href="file:///C:/Users/richa/OneDrive/Desktop/github/modern-dba-project/course.html">Courses</a></li>
          <li><a href="file:///C:/Users/richa/OneDrive/Desktop/github/modern-dba-project/about.html">About</a></li>
        </ul>
      </footer>
    `;
    document.body.insertAdjacentHTML('beforeend', footer);
  });