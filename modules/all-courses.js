// modules/all-courses.js
document.addEventListener('DOMContentLoaded', () => {
  console.log('All courses module loaded');
  const courseList = document.querySelector('.all-course-list');
  if (courseList) {
    console.log('Found all course list container');
    courses.forEach((course) => {
      const courseCard = `
        <div class="course-card">
          <h3>${course.title}</h3>
          <p>${course.description}</p>
          <a href="${course.link}" class="btn">Start Learning</a>
        </div>
      `;
      courseList.insertAdjacentHTML('beforeend', courseCard);
    });
  } else {
    console.error('All course list container not found');
  }
});