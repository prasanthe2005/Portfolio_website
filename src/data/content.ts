export type Project = {
  title: string
  period: string
  summary: string
  highlights: string[]
  tech: string[]
  link?: string
  repo?: string
}

export const profile = {
  name: 'Prasanth E',
  title: 'Aspiring Software Developer',
  location: 'Tiruppur, Tamil Nadu',
  phone: '9080951923',
  email: 'prasanth.cs23@bitsathy.ac.in',
  linkedin: 'https://www.linkedin.com/in/prasanth-e-6b990b2b8/',
  github: 'https://github.com/prasanthe2005',
  resumeUrl: '#', // Replace with your actual resume URL or use '/resume.pdf' if you add it to public folder
  headline:
    'Computer Science and Engineering student with strong programming fundamentals and practical full‑stack experience.',
  summary:
    'Computer Science and Engineering student with a strong foundation in programming, data structures, and core computer science principles. Experienced in building software solutions using modern web technologies, focused on writing clean, maintainable, and scalable code.',
  availability: 'Open to internships and entry-level software roles',
  about: `I am a Computer Science and Engineering student at Bannari Amman Institute of Technology. I have built full‑stack web applications using React, Node.js, Express, and both MongoDB and MySQL. I enjoy designing reliable systems, solving algorithmic problems, and creating intuitive user experiences.

My academic performance (CGPA: 8.49) and certifications such as NPTEL Java reflect my commitment to learning. I have solved hundreds of problems on LeetCode and actively participate in coding contests and community service through NSS. I am eager to contribute to impactful software projects and grow as an engineer.`,
}

export const stats = [
  { label: 'CGPA', value: '8.49' },
  { label: 'LeetCode', value: '300+ problems' },
  { label: 'Community', value: 'NSS Volunteer' },
]

export const skills = [
  {
    title: 'Languages',
    items: ['Java', 'Python', 'JavaScript', 'C'],
  },
  {
    title: 'Core CS',
    items: ['Data Structures & Algorithms', 'OOP', 'DBMS', 'Operating Systems'],
  },
  {
    title: 'Web & Backend',
    items: ['React', 'Node.js', 'Express.js', 'MongoDB', 'MySQL', 'REST APIs', 'HTML', 'CSS', 'Tailwind CSS', 'Vite'],
  },
  {
    title: 'Tools',
    items: ['GitHub', 'VS Code', 'MongoDB Compass', 'Postman'],
  },
]

export const projects: Project[] = [
  {
    title: 'Hospital Management System',
    period: 'Jul 2025 – Oct 2025',
    summary:
      'Built a full‑stack appointment booking and doctor scheduling system with role‑based access.',
    highlights: [
      'Implemented role‑based access for Admin, Doctor, and Patient with secure authentication.',
      'Designed RESTful APIs using Node.js and Express for appointments, doctors, and patients.',
      'Managed patient, doctor, and appointment data in MongoDB and implemented conflict resolution.',
      'Developed responsive UI using React and Tailwind CSS for smooth booking flows.',
    ],
    tech: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
  },
  {
    title: 'Hostel Management Portal',
    period: '2025',
    summary:
      'Web‑based hostel management system to automate student room allocation and administration.',
    highlights: [
      'Implemented role‑based access for Admin and Student to ensure secure operations.',
      'Designed room allocation logic using First Come First Serve (FCFS) and support for up to three preferences per request.',
      'Built request and approval workflows and persisted data in MySQL via Express APIs.',
    ],
    tech: ['Vite', 'JavaScript', 'Node.js', 'Express.js', 'MySQL'],
  },
  {
    title: 'E-Commerce Storefront',
    period: 'Oct 2025',
    summary:
      'React-based e-commerce experience with product listing, cart, and checkout flows.',
    highlights: [
      'Implemented dynamic routing, responsive layouts, and interactive UI for smooth shopping.',
      'Added client-side state management for cart updates and persisted selections.',
      'Deployed static build using GitHub Pages for quick access and feedback.',
    ],
    tech: ['React', 'JavaScript', 'Routing', 'State Management', 'GitHub Pages'],
  },
]

export const education = [
  {
    school: 'Bannari Amman Institute of Technology, Sathyamangalam',
    credential: 'B.E. Computer Science and Engineering',
    period: '2023 – 2027',
    detail: 'CGPA: 8.49',
  },
  {
    school: 'Government Boys Higher Secondary School, Avinashi',
    credential: '12th Class',
    period: '2022 – 2023',
    detail: 'Percentage: 89.5%',
  },
]

export const certifications = [
  'Programming in Java – NPTEL (12 weeks) | 96% | Top 5%',
  'The Joy of Computing Using Python – NPTEL (12 weeks) | 75%',
]

export const achievements = [
  'Solved 300+ problems on LeetCode covering Data Structures and Algorithms.',
  'Active NSS volunteer with participation in community programs.',
  'Regular participant in coding contests and technical events.',
]
