// modules/course-toc.js
document.addEventListener('DOMContentLoaded', () => {
    console.log('Course TOC script loaded');
  
    // Get the current course folder and section from the URL
    const currentPath = window.location.pathname; // e.g., "/courses/sql/section1.html"
    
    function getFolderName(filePath) {
      const parts = filePath.split('/');
      if (parts.length >= 2) {
        return parts[parts.length - 2];
      }
      return '';
    }
    const filePath = currentPath
    const courseFolder = getFolderName(filePath);
        
    const currentSection = currentPath.split('/').pop(); // e.g., "section1.html"
      
    // Find the course data
    const course = courses.find(course => course.folder === courseFolder);
    console.log(courses);
   
    if (course) {
      // Render the table of contents (TOC)
      const toc = document.getElementById('toc');
      course.sections.forEach((section, index) => {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.href = section.link;
        link.textContent = `Section ${index + 1}: ${section.title}`;
  
        // Highlight the current section
        if (section.link === currentSection) {
          link.classList.add('active');
        }
  
        li.appendChild(link);
        toc.appendChild(li);
      });
    } else {
      console.error('Course data not found for folder:', courseFolder);
    }
  });