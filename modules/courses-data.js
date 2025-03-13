// modules/courses-data.js
const courses = [
  {
    id: 3,
    folder: 'scrum', // Folder name for this course
    title: 'Scrum Simplified',
    description: 'A Beginners Guide to Agile Project Management',
    sections: [
      { title: 'FAQs', link: 'section1.html' },
      { title: 'Intro to Scrum', link: 'section2.html' },
      { title: 'Roles & Responsibilities', link: 'section3.html' },
      { title: 'Scrum Artifacts', link: 'section4.html' },
      { title: 'Sprint Cemermonies', link: 'section5.html' },
      { title: 'Sprint Planning', link: 'section6.html' },
      { title: 'Daily Stand-up', link: 'section7.html' },
      { title: 'Sprint Review', link: 'section8.html' },
      { title: 'Sprint Retro', link: 'section9.html' },
      { title: 'Refinement', link: 'section10.html' },
      { title: 'Scrum in Practice', link: 'section11.html' },
    ],
    link: 'courses/scrum/section1.html', // Link to the first section
  },  
  {
    id: 2,
    folder: 'git', // Folder name for this course
    title: 'Git - Beginners Guide',
    description: 'Understand the basics of git',
    sections: [
      { title: 'Overview', link: 'section1.html' },
      { title: 'About VCS', link: 'section2.html' },
      { title: 'Local VCS', link: 'section3.html' },
      { title: 'Centralized VCS', link: 'section4.html' },
      { title: 'Distributed VCS', link: 'section5.html' },
    ],
    link: 'courses/git/section1.html', // Link to the first section
  },  
  {
    id: 1,
    folder: 'sql', // Folder name for this course
    title: 'Introduction to SQL',
    description: 'Learn the basics of SQL and how to query databases.',
    sections: [
      { title: 'What is SQL?', link: 'section1.html' },
      { title: 'Basic Queries', link: 'section2.html' },
      { title: 'Filtering Data', link: 'section3.html' },
      { title: 'Joins and Relationships', link: 'section4.html' },
    ],
    link: 'courses/sql/section1.html', // Link to the first section
  },
  // Add more courses as needed
];