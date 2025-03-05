// modules/featured-courses.js
document.addEventListener('DOMContentLoaded', () => {
  const courseList = document.querySelector('.featured-course-list');
  if (courseList) {
    // Load the courses data
    const featuredCourses = courses.slice(0, 3); // Get the first 3 courses
    featuredCourses.forEach((course) => {
      const courseCard = `
        <div class="course-card">
          <h3>${course.title}</h3>
          <p>${course.description}</p>
          <a href="${course.link}" class="btn">Start Learning</a>
        </div>
      `;
      courseList.insertAdjacentHTML('beforeend', courseCard);
    });
  }
});