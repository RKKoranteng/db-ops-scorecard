// modules/section-navigation.js
document.addEventListener('DOMContentLoaded', () => {
    console.log('Section navigation script loaded');
  
    // Get the current section number from the URL or file name
    const currentPage = window.location.pathname.split('/').pop(); // e.g., "section1.html"
    const currentSectionNumber = parseInt(currentPage.replace('section', '').replace('.html', ''));
  
    // Define the total number of sections for this course
    const totalSections = 5; // Update this for each course
  
    // Get the "next-section" container
    const nextSectionContainer = document.getElementById('next-section');
  
    // Create a container for navigation buttons
    const navButtons = document.createElement('div');
    navButtons.className = 'section-nav-buttons';
  
    // Add "Go to Previous Section" button (if not on the first section)
    if (currentSectionNumber > 1) {
      const prevSectionButton = document.createElement('a');
      prevSectionButton.href = `section${currentSectionNumber - 1}.html`;
      prevSectionButton.className = 'btn btn-prev';
      prevSectionButton.textContent = `Prev: Section ${currentSectionNumber - 1}`;
      navButtons.appendChild(prevSectionButton);
    }
  
    // Add "Go to Next Section" button (if not on the last section)
    if (currentSectionNumber < totalSections) {
      const nextSectionButton = document.createElement('a');
      nextSectionButton.href = `section${currentSectionNumber + 1}.html`;
      nextSectionButton.className = 'btn btn-next';
      nextSectionButton.textContent = `Next: Section ${currentSectionNumber + 1}`;
      navButtons.appendChild(nextSectionButton);
    } else {
      // Display a "Congratulations" message on the last section
      const congratsMessage = document.createElement('p');
      congratsMessage.className = 'btn btn-congrats';
      congratsMessage.textContent = 'Congratulations! You’ve completed the course.';
      navButtons.appendChild(congratsMessage);
    }
  
    // Append the navigation buttons to the container
    nextSectionContainer.appendChild(navButtons);
  });