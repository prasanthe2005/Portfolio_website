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
    'Motivated IT fresher with strong programming fundamentals, hands-on projects, and a growth mindset.',
  summary:
    'Computer Science and Engineering student focused on clean, efficient application design. Comfortable with modern web stacks, problem-solving, and quickly learning new tools to deliver reliable solutions.',
  availability: 'Open to internships and entry-level software roles',
  about: `I am a passionate Computer Science student at Bannari Amman Institute of Technology with a strong foundation in programming and software development. My journey in tech has been driven by curiosity and a desire to create impactful solutions.

I have hands-on experience building full-stack applications using React, Node.js, and MongoDB. I enjoy tackling challenging problems, whether it's optimizing algorithms or designing intuitive user interfaces. My academic performance (CGPA: 8.51) and certifications (NPTEL Java - Top 5%) demonstrate my commitment to excellence.

Beyond academics, I actively participate in coding contests and community service through NSS. I believe in continuous learning and staying updated with the latest technologies. My goal is to contribute to innovative projects while growing as a software engineer.`,
}

export const stats = [
  { label: 'CGPA', value: '8.51' },
  { label: 'LeetCode', value: '200+ problems' },
  { label: 'Community', value: 'NSS Volunteer' },
]

export const skills = [
  {
    title: 'Languages',
    items: ['Java', 'Python', 'C', 'C++', 'JavaScript'],
  },
  {
    title: 'Core CS',
    items: ['Data Structures & Algorithms', 'OOP', 'DBMS', 'Operating Systems'],
  },
  {
    title: 'Web & Backend',
    items: ['React', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'HTML', 'CSS'],
  },
  {
    title: 'Tools',
    items: ['GitHub', 'VS Code', 'MongoDB Compass'],
  },
]

export const projects: Project[] = [
  {
    title: 'Hospital Management System',
    period: 'Jul 2025 – Oct 2025',
    summary:
      'Full-stack appointment booking and doctor scheduling platform with role-based access.',
    highlights: [
      'Designed RESTful APIs with Node.js and Express for appointments, doctors, and patients.',
      'Built responsive React UI with Tailwind for patients, doctors, and admin roles.',
      'Persisted schedules and bookings in MongoDB with validation and secure access control.',
    ],
    tech: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
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
    detail: 'CGPA: 8.51',
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
  'Solved 200+ problems on LeetCode covering DSA and algorithms.',
  'Active NSS volunteer with participation in community programs.',
  'Regular participant in coding contests and technical events.',
]
