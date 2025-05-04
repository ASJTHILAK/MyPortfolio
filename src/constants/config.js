export const CAMERA = {
  DEFAULT_POSITION: [0, 4, 12],
  FOV: 50,
  LERP_FACTOR: 0.05,
  FOCUSED_LERP_FACTOR: 0.1
};

export const PLANET = {
  ORBIT_RADIUS: 3,
  ROTATION_SPEED: 0.0003,
  PLANET_ROTATION_SPEED: 0.2,
  CLOUD_ROTATION_SPEED: 0.15,
  TILT_ANGLE: 23.5,
  SCALE: {
    DEFAULT: 1,
    SHRINK: 0.01
  }
};

export const COLORS = {
  PRIMARY: "#4a90e2",
  DARK: "#1a1a1a",
  DARKER: "#2a2a2a",
  PLANET: "#2b85c7",
  ATMOSPHERE: "#93cfef",
  CLOUD: "#ffffff",
  GROUND: "#2d5a4f",
  RIVER: "#2b85c7",
  RIVER_GLOW: "#4a90e2",
  BIO_PLANT: "#50c878",
  BIO_PLANT_GLOW: "#7fff00",
  TEXT_PRIMARY: "#ffffff",
  TEXT_SECONDARY: "#cccccc"
};

export const SKY = {
  TOP_COLOR: "#001b4d",
  BOTTOM_COLOR: "#4a90e2",
  HEIGHT: 25,
  SUNLIGHT_POSITION: [10, 10, 10],
  SUNLIGHT_INTENSITY: 0.5
};

export const NAVIGATION = {
  PATH_POINTS: [
    { position: [-16, -0.4, 0], section: 'start', rotation: Math.PI / 2 },
    { position: [-8, -0.4, 0], section: 'about', rotation: Math.PI / 2 },
    { position: [0, -0.4, 0], section: 'skills', rotation: Math.PI / 2 },
    { position: [8, -0.4, 0], section: 'experience-qube', rotation: Math.PI / 2 },
    { position: [16, -0.4, 0], section: 'experience-zoho', rotation: Math.PI / 2 },
    { position: [24, -0.4, 0], section: 'education', rotation: Math.PI / 2 }
  ],
  BOAT_SPEED: 0.003, // Reduced from 0.005 for smoother movement
  CAMERA_HEIGHT: 4,           // Adjusted height of camera above the path
  CAMERA_DISTANCE: 6,         // Adjusted distance behind the target
  CAMERA_TILT: 1.5,           // Adjusted look down angle
  LERP_FACTOR: 0.03,         // Reduced from 0.03 for smoother transitions
  TRANSITION_DURATION: 2000,  // Increased from 1500 for smoother transitions
  STATIC_CAMERA: {
    POSITION: [0, 3.5, 7],     // Matched with height and distance
    TARGET: [0, 0, 0],
    FOV: 50
  }
};

export const TIMING = {
  ANIMATION_DURATION: 1500,
  LERP_SPEED: 0.05
};

export const EXPERIENCE_DETAILS = {
  qube: {
    title: "Junior Software Engineer",
    company: "QUBE CINEMA TECHNOLOGIES",
    location: "Chennai",
    duration: "Feb 2023 - Present",
    details: [
      "Working on low-level applications and drivers using Rust, C/C++, and GStreamer",
      "Implemented SNMP for playback servers with Prometheus and Grafana integration",
      "Developed front-end components with React.js",
      "Back-end development with GoLang for custom Linux-based playback servers using Yocto",
      "Experience with DRM, HDMI, FPGA, JTAG, Vitis, and Vivado",
      "Python back-end automation and UI automation using Puppeteer and Selenium",
      "Dockerized independent services for development"
    ]
  },
  zoho: {
    title: "Student Intern",
    company: "ZOHO CORPORATION",
    location: "Chennai",
    duration: "Apr 2022 - May 2022",
    details: [
      "Developed a supermarket billing system with Java",
      "Created survey forms and Cricket Web application",
      "Utilized Java, Servlets, JSP, MySQL, and Tomcat Server",
      "Worked under CRM core team supervision",
      "Gained experience in full-stack development"
    ]
  }
};

export const SKILLS = {
  "Languages": ["Rust", "C/C++", "GoLang", "Python", "HTML/CSS", "JavaScript"],
  "Technologies": ["ReactJS", "MySQL", "SQLite", "GStreamer", "Yocto"],
  "Tools": ["Git", "Docker", "Prometheus", "Grafana", "Vitis", "Vivado"],
};

export const EDUCATION = {
  university: {
    degree: "Bachelor of Engineering in Computer Science",
    institution: "St. Joseph's College of Engineering",
    duration: "Aug 2019 - May 2023",
    cgpa: "8.6"
  },
  highSchool: {
    degree: "Higher Secondary in Computer Science with Mathematics",
    institution: "St. Bede's Anglo Indian Higher Secondary School",
    duration: "Jun 2018 - May 2019",
    score: "73%"
  }
};

export const PERSONAL_INFO = {
  name: "JAGANATH THILAK A S",
  location: "Chennai, India",
  phone: "9176233658",
  email: "asjthilak@gmail.com",
  links: {
    linkedin: "https://www.linkedin.com/in/asj-thilak-t8055/",
    github: "https://github.com/ASJTHILAK"
  },
  summary: "A software engineer skilled in programming with a strong foundation in math, logic, data structures, and algorithms. I am a quick learner who loves to understand and learn new applications & technologies every day. I am interested in developing and computing contemporary applications on my own for the betterment of society, which makes my profile interesting. I am currently looking for the role of a Rust developer to pursue my career and incorporate my skills effectively."
};

export const SOFT_SKILLS = {
  skills: ["Teamwork", "Leadership", "Problem Solving", "Critical Thinking", "Adaptability", "Creativity"],
  languages: ["English", "Tamil", "Hindi", "French"]
};