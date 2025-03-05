// modules/header.js
document.addEventListener('DOMContentLoaded', () => {
    // Check if the user is logged in
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
  
    const nav = `
      <nav>
        <div class="logo">
          <a href="/index.html">Learn with RK</a>
        </div>
        <ul class="nav-links">
          <li><a href="file:///C:/Users/richa/OneDrive/Desktop/github/modern-dba-project/index.html">Home</a></li>
          <li><a href="file:///C:/Users/richa/OneDrive/Desktop/github/modern-dba-project/course.html">Courses</a></li>
          <li><a href="file:///C:/Users/richa/OneDrive/Desktop/github/modern-dba-project/about.html">About</a></li>
          <li><a href="file:///C:/Users/richa/OneDrive/Desktop/github/modern-dba-project/contact.html">Contact</a></li>
          <!-- <li><a href="login.html" class="login-btn">Login</a></li> -->
        </ul>
      </nav>
    `;
    document.body.insertAdjacentHTML('afterbegin', nav);
  
    // Add logout functionality
    const authButton = document.querySelector('.auth-btn');
    if (authButton) {
      authButton.addEventListener('click', (e) => {
        if (loggedInUser) {
          e.preventDefault(); // Prevent default link behavior
          sessionStorage.removeItem('loggedInUser'); // Clear the session
          window.location.href = '/index.html'; // Redirect to homepage
        }
      });
    }
  });