// modules/course-content.js
document.addEventListener('DOMContentLoaded', () => {
    console.log('Course content module loaded');
  
    // Check if the current page is a course page
    const isCoursePage = window.location.pathname.includes('course.html');
  
    if (isCoursePage) {
      // Get the course ID from the URL (e.g., course.html?id=1)
      const urlParams = new URLSearchParams(window.location.search);
      const courseId = urlParams.get('id');
  
      // Find the selected course
      const course = courses.find(course => course.id === parseInt(courseId));
  
      if (course) {
        // Update the page title and description
        document.getElementById('course-title').textContent = course.title;
        document.getElementById('course-description').textContent = course.description;
  
        // Render the course outline
        const courseOutline = document.getElementById('course-outline');
        course.outline.forEach(item => {
          const li = document.createElement('li');
          li.textContent = item;
          courseOutline.appendChild(li);
        });
  
        // Render the lessons
        const lessonsContainer = document.getElementById('lessons');
        course.lessons.forEach(lesson => {
          const lessonDiv = document.createElement('div');
          lessonDiv.className = 'lesson';
          lessonDiv.innerHTML = `
            <h3>${lesson.title}</h3>
            <p>${lesson.description}</p>
          `;
          lessonsContainer.appendChild(lessonDiv);
        });
  
        // Render the table of contents (TOC)
        const toc = document.getElementById('toc');
        course.sections.forEach((section, index) => {
          const li = document.createElement('li');
          const link = document.createElement('a');
          link.href = resolvePath(`section${index + 1}.html`);
          link.textContent = `Section ${index + 1}: ${section.title}`;
          li.appendChild(link);
          toc.appendChild(li);
        });
      } else {
        // If no course is found, show an error message
        document.getElementById('course-title').textContent = 'Course Not Found';
        document.getElementById('course-description').textContent = 'The requested course could not be found.';
      }
    }
  });