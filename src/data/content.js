// Single source of truth for site content.

export const profile = {
  name: 'Jayant Dulani',
  role: 'Software Engineer',
  role2: 'Full-Stack Developer',
  company: 'Aavya LLC',
  location: 'Boston, MA',
  tagline:
    'I build scalable backend systems, automation workflows, and distributed applications — from GPU perception pipelines to fault-tolerant servers.',
  email: 'jayantd11@vt.edu',
  links: {
    github: 'https://github.com/Jayantd11',
    linkedin: 'https://linkedin.com/in/jayantdulani',
  },
}

export const about = [
  `I'm a Software Engineer and Full-Stack Developer who likes working close to the metal — from GPU-accelerated perception pipelines and fault-tolerant servers to the APIs and automation that hold real products together. I'm just as comfortable in C++ and systems code as I am shipping product features in Python, Java, and JavaScript.`,
  `At Aavya I design and maintain automation workflows and scalable API integrations, cutting manual operational work and keeping data flowing reliably across systems. Day to day that means cloud infrastructure, Docker/Kubernetes, and CI/CD — and a lot of diagnosing why something is slow and making it fast.`,
  `Before Aavya I mentored 200+ students as a Data Structures & Algorithms TA at Virginia Tech and built backend services and CI/CD pipelines as an intern. I care about clean systems, measurable performance wins, and writing code other people can actually maintain.`,
]

export const aboutFacts = [
  { label: 'Currently', value: 'Jr. Software Engineer @ Aavya LLC' },
  { label: 'Education', value: 'B.S. Computer Science, Virginia Tech · 3.7 GPA' },
  { label: 'Based in', value: 'Boston, MA' },
  { label: 'Focus', value: 'Backend · Systems · Automation' },
  { label: 'Open to', value: 'Software Engineering roles' },
]

export const experience = [
  {
    role: 'Jr. Software Engineer',
    company: 'Aavya LLC',
    period: 'Feb 2026 — Present',
    points: [
      'Designed and maintained automation workflows in Python and n8n, cutting manual operational workload by 40%.',
      'Built scalable API integrations across databases and internal systems for reliable data synchronization.',
      'Diagnosed workflow failures and performance bottlenecks; documented 10+ production workflows with cross-functional teams.',
    ],
  },
  {
    role: 'Undergraduate Teaching Assistant — DSA',
    company: 'Virginia Tech',
    period: 'Jan 2025 — Dec 2025',
    points: [
      'Reviewed and debugged Java and Python programs in Linux, reinforcing error detection and audit-readiness practices.',
      'Led review sessions for 200+ students, emphasizing fundamentals, technical support, and clear documentation.',
    ],
  },
  {
    role: 'Software Development Intern',
    company: 'A Round Entertainment',
    period: 'May 2024 — Aug 2024',
    points: [
      'Developed scalable backend services in Java, Node.js, and C++ — microservices, REST APIs, and secure integrations.',
      'Integrated APIs with Angular dashboards to deliver analytics and visualization for better operational insight.',
      'Implemented CI/CD pipelines with GitHub Actions, Jenkins, Maven, and Gradle, plus automated testing.',
    ],
  },
]

export const projects = [
  {
    title: 'GPU Stereo Depth & Object Detection',
    blurb:
      'Real-time autonomous-perception system deriving depth and detecting obstacles from stereo cameras alone — no LiDAR. SGBM disparity, WLS filtering, Sobel edges, and YOLO11x fused on OAK-D Lite feeds.',
    metric: '1,380× speedup · 135 FPS · R²=0.9956',
    stack: ['C++', 'CUDA', 'OpenMP', 'Python'],
    href: 'https://github.com/Jayantd11/ComputerVision',
    accent: 'from-ember/30 to-magenta/10',
    art: 'gpu',
  },
  {
    title: 'SkipList-Quadtree',
    blurb:
      'A hybrid SkipList-Quadtree indexing engine for spatial search and 2D range queries, with memory-local layouts and pointer-based structures handling dynamic updates.',
    metric: '−30% query latency',
    stack: ['Java', 'Data Structures'],
    href: 'https://github.com/Jayantd11/SkipQuadTree',
    accent: 'from-magenta/30 to-slate2/10',
    art: 'quadtree',
  },
  {
    title: 'Personal Server',
    blurb:
      'A scalable, fault-tolerant HTTP server in C/Python with epoll-based concurrency and event-driven architecture, deployed with Docker and PostgreSQL on validated CI/CD pipelines.',
    metric: 'epoll concurrency · Docker · PostgreSQL',
    stack: ['Python', 'C'],
    href: 'https://github.com/Jayantd11/Personal-Server',
    accent: 'from-slate2/30 to-ember/10',
    art: 'server',
  },
  {
    title: 'Personal Terminal',
    blurb:
      'A POSIX-compliant shell implementing process scheduling, I/O management, and signal handling with a strong emphasis on memory safety, validated against production-grade Docker workflows.',
    metric: 'process scheduling · signals · memory-safe',
    stack: ['C', 'Docker'],
    href: 'https://github.com/Jayantd11',
    accent: 'from-magenta/25 to-ember/10',
    art: 'terminal',
  },
]

export const skills = {
  Languages: ['C++', 'C', 'Python', 'Java', 'Lua', 'SQL', 'JavaScript'],
  'Cloud & Databases': ['PostgreSQL', 'MySQL', 'SQL Server', 'AWS'],
  'Practices & Tools': [
    'Docker',
    'Kubernetes',
    'CI/CD',
    'Distributed Systems',
    'System Programming',
    'Agile / Scrum',
    'Git',
  ],
}

export const education = {
  degree: 'B.S. in Computer Science',
  school: 'Virginia Tech',
  detail: 'GPA 3.7 · Dean’s List with Distinction',
}

export const awards = [
  {
    title: 'HackViolet — Honorable Mention',
    detail:
      'Recognized for a fraud-detection system using AI/ML and blockchain logging, integrating Java/React with automated testing and secure data handling.',
  },
]

export const nav = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Work', href: '#work' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]
