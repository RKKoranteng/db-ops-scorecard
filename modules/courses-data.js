// modules/courses-data.js
const courses = [
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
  {
    id: 2,
    folder: 'database-design', // Folder name for this course
    title: 'Database Design',
    description: 'Understand how to design efficient and scalable databases.',
    sections: [
      { title: 'Introduction to Database Design', link: 'section1.html' },
      { title: 'Normalization', link: 'section2.html' },
      { title: 'Entity-Relationship Diagrams', link: 'section3.html' },
    ],
    link: 'courses/database-design/section1.html', // Link to the first section
  },
  // Add more courses as needed
];