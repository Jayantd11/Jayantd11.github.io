export const navLinks = [
    {
      id: 1,
      name: 'Home',
      href: '#home',
    },
    {
      id: 2,
      name: 'About',
      href: '#about',
    },
    {
      id: 3,
      name: 'Work',
      href: '#work',
    },
    {
      id: 4,
      name: 'Contact',
      href: '#contact',
    },
  ];
    
  export const myProjects = [
    {
      title: 'AndroidApiGallery',
      desc: 'Developed FancyGallery, an Android app featuring a Flickr-integrated photo gallery and interactive map view. Built with Kotlin, MVVM architecture, Jetpack components, Retrofit, Coil, OSMDroid, and Coroutines for seamless performance and user experience.',
      subdesc:
        'December 2024',
      href: 'https://github.com/Jayantd11/AndroidApiGallery',
      texture: '/textures/project/project1.mp4',
      logo: '/assets/android.png',
      logoStyle: {
        backgroundColor: '#2A1816',
        border: '0.2px solid #36201D',
        boxShadow: '0px 0px 60px 0px #AA3C304D',
      },
      spotlight: '/assets/spotlight1.png',
      tags: [
        {
          id: 1,
          name: 'React.js',
          path: '/assets/kotlin.png',
        },
        {
          id: 2,
          name: 'TailwindCSS',
          path: 'assets/java.png',
        },
      ],
    },
    {
      title: 'Personal Server',
      desc: 'Developed Personal Server, a secure HTTP/1.0 server supporting JWT-based authentication, static file serving, API endpoints, range requests, and robust defenses against path traversal and IDOR vulnerabilities. Designed with modularity, performance, and extensibility in mind.',
      subdesc:
        'December 2024',
      href: 'https://github.com/Jayantd11/Personal-Server',
      texture: '/textures/project/project2.mp4',
      logo: '/assets/server.png',
      logoStyle: {
        backgroundColor: '#13202F',
        border: '0.2px solid #17293E',
        boxShadow: '0px 0px 60px 0px #2F6DB54D',
      },
      spotlight: '/assets/spotlight2.png',
      tags: [
        {
          id: 1,
          name: 'React.js',
          path: '/assets/java.png',
        },
        {
          id: 2,
          name: 'TailwindCSS',
          path: 'assets/python.png',
        },
        {
          id: 3,
          name: 'TypeScript',
          path: '/assets/html.png',
        },
        {
          id: 4,
          name: 'Framer Motion',
          path: '/assets/css.png',
        },
      ],
    },
    {
      title: 'Personal Cush',
      desc: 'Designed and implemented cush, a customizable shell with job control (jobs, fg, bg, kill), I/O redirection, pipes, history, and exclusive terminal access. Includes built-in commands like cd and exit, with advanced features for robustness and optimized performance. Added error handling and signal management to improve reliability.',
      subdesc:
        'September 2024.',
      href: 'https://github.com/Jayantd11/PersonalCush',
      texture: '/textures/project/project3.mp4',
      logo: '/assets/cterminal.png',
      logoStyle: {
        backgroundColor: '#60f5a1',
        background:
          'linear-gradient(0deg, #60F5A150, #60F5A150), linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(208, 213, 221, 0.8) 100%)',
        border: '0.2px solid rgba(208, 213, 221, 1)',
        boxShadow: '0px 0px 60px 0px rgba(35, 131, 96, 0.3)',
      },
      spotlight: '/assets/spotlight3.png',
      tags: [
        {
          id: 1,
          name: 'React.js',
          path: '/assets/C.png',
        },
        {
          id: 2,
          name: 'TailwindCSS',
          path: 'assets/python.png',
        },
      ],
    },
    {
      title: 'SkipQuadtree',
      desc: 'Developed and combined skip lists and quadtree structures to enhance database search efficiency, significantly reducing time complexity. Utilized skip lists for precise entry retrieval, complemented by quadtree traversal for similar searches based on shared parameters. Applied in real-time applications like Google Maps for optimized search functionality.',
      subdesc:
        'February 2024',
      href: 'https://github.com/Jayantd11/SkipQuadTree',
      texture: '/textures/project/project4.mp4',
      logo: '/assets/tree.png',
      logoStyle: {
        backgroundColor: '#0E1F38',
        border: '0.2px solid #0E2D58',
        boxShadow: '0px 0px 60px 0px #2F67B64D',
      },
      spotlight: '/assets/spotlight4.png',
      tags: [
        {
          id: 1,
          name: 'React.js',
          path: '/assets/java.png',
        },
      ],
    },
  ];
  
  export const calculateSizes = (isSmall, isMobile, isTablet) => {
    return {
      deskScale: isSmall ? 0.05 : isMobile ? 0.06 : 0.065,
      deskPosition: isMobile ? [0.5, -4.5, 0] : [0.25, -5, 0],
      deskScale2: isSmall ? 0.05 : isMobile ? 0.06 : 0.165,
      deskPosition2: isMobile ? [0.5, -4.5, 0] : [6, -3.5, 0],
      deskPosition3: isMobile ? [0.5, -4.5, 0] : [-6.5, -3, 0],
      cubePosition: isSmall ? [4, -5, 0] : isMobile ? [5, -5, 0] : isTablet ? [5, -5, 0] : [0, 6.5, -1],
      reactLogoPosition: isSmall ? [3, 4, 0] : isMobile ? [5, 4, 0] : isTablet ? [5, 4, 0] : [10.5, 4, -2],
      ringPosition: isSmall ? [-5, 7, 0] : isMobile ? [-10, 10, 0] : isTablet ? [-12, 10, 0] : [-20, 10, 0],
      targetPosition: isSmall ? [-5, -10, -10] : isMobile ? [-9, -10, -10] : isTablet ? [-11, -7, -10] : [-17, -13, -12],
    };
  };
  
  export const workExperiences = [
    {
      id: 1,
      name: 'Virginia Tech',
      pos: 'Undergraduate Teaching Assistant CS3114',
      duration: '2025 Jan - Present',
      title: "Lead problem-solving for students, and facilitate group discussions to promote collaborative learning. Conducted office hours for 8+ hours weekly to reinforce key concepts such as object-oriented design, algorithm analysis, and complexity analysis, ensuring a clear understanding of foundational topics. Lead problem-solving for students, and facilitate group discussions to promote collaborative learning",
      icon: '/assets/vt.png',
      animation: 'victory',
    },
    {
      id: 2,
      name: 'Applica Solutions',
      pos: 'Data Research Analyst',
      duration: 'May 2024 - Dec 2022',
      title: "Coordinated logistics and procurement activities, ensuring efficient flow of IT resources and timely delivery. Supported the IT team, performing hardware and software debugging, maintenance, and troubleshooting tasks. Contributed significantly to website development projects by implementing dynamic content updates and enhancements using JavaScript and React frameworks. Designed and managed fillable forms, improving internal processes for enhanced efficiency and user interaction. Collaborated closely on complex IT projects, gaining practical experience in Java and Python development alongside seasoned professionals.",
      icon: '/assets/applica.png',
      animation: 'clapping',
    },
    {
      id: 3,
      name: 'A Round Entertainment',
      pos: 'Software Development Intern',
      duration: 'May 2024 - August 2024',
      title: "Created webpages using HTML and CSS, ensuring adherence to design specifications and optimizing for SEO. Developed responsive mobile views for iOS and Android platforms using React, enhancing user accessibility and engagement. Integrated front-end components with back-end systems, focusing on efficiency and seamless functionality. Implemented responsive design techniques to ensure consistent user experience across various screen sizes and devices. Engaged in 20+ weekly meetings, offering constructive feedback to peers, fostering continuous improvement, and enhancing collaboration. Demonstrated effective communication skills in providing valuable feedback during team meetings, contributing to a culture of continuous improvement and collaboration.",
      icon: '/assets/are.jpeg',
      animation: 'salute',
    },
  ];