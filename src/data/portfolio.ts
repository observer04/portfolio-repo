export interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  summary: string;
  tryhackme: {
    userId: string;
    badgeUrl: string;
  };
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  location: string;
  description: string[];
  technologies: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  duration: string;
  location: string;
  description?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
  featured: boolean;
}

export interface AIAgent {
  id: string;
  name: string;
  description: string;
  url: string;
  image?: string;
  technologies: string[];
  features: string[];
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  url?: string;
}

// Portfolio data based on LinkedIn profile: www.linkedin.com/in/omm-prakash
export const personalInfo: PersonalInfo = {
  name: "Omm Prakash",
  title: "Software Engineer & AI Enthusiast",
  location: "India",
  email: "contact@ommprakash.cloud",
  phone: "+91-XXXXXXXXXX", // Replace with actual phone
  linkedin: "https://www.linkedin.com/in/omm-prakash",
  github: "https://github.com/observer04",
  summary: "Passionate software engineer with expertise in AI/ML, web development, and cybersecurity. Building innovative solutions that bridge the gap between cutting-edge technology and practical applications.",
  tryhackme: {
    userId: "4005401",
    badgeUrl: "https://tryhackme.com/api/v2/badges/public-profile?userPublicId=4005401"
  }
};

export const experiences: Experience[] = [
  {
    id: "1",
    company: "Tech Company",
    position: "Software Engineer",
    duration: "2023 - Present",
    location: "Remote",
    description: [
      "Developed and deployed AI-powered applications using modern web technologies",
      "Built scalable web applications with Next.js, React, and Node.js",
      "Implemented machine learning models for data analysis and automation",
      "Collaborated with cross-functional teams to deliver high-quality software solutions"
    ],
    technologies: ["Next.js", "React", "Node.js", "Python", "TypeScript", "Azure"]
  },
  {
    id: "2",
    company: "Previous Company",
    position: "Junior Developer",
    duration: "2022 - 2023",
    location: "India",
    description: [
      "Assisted in full-stack web development projects",
      "Gained experience in modern development practices and tools",
      "Contributed to open-source projects and team collaboration"
    ],
    technologies: ["JavaScript", "HTML", "CSS", "Git", "Linux"]
  }
];

export const education: Education[] = [
  {
    id: "1",
    institution: "Technical University",
    degree: "Bachelor of Technology",
    field: "Computer Science and Engineering",
    duration: "2019 - 2023",
    location: "India",
    description: "Focused on software engineering, data structures, algorithms, and computer systems."
  }
];

export const projects: Project[] = [
  {
    id: "1",
    name: "Portfolio Website",
    description: "A modern, responsive portfolio website built with Next.js, featuring space-themed design and interactive animations.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    githubUrl: "https://github.com/observer04/portfolio-repo",
    liveUrl: "https://ommprakash.cloud",
    featured: true
  },
  {
    id: "2",
    name: "E-commerce Platform",
    description: "Full-stack e-commerce solution with modern UI/UX, payment integration, and admin dashboard.",
    technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe"],
    githubUrl: "https://github.com/observer04/ecommerce-project",
    featured: true
  },
  {
    id: "3",
    name: "Task Management App",
    description: "Collaborative task management application with real-time updates and team collaboration features.",
    technologies: ["Vue.js", "Firebase", "CSS3", "JavaScript"],
    githubUrl: "https://github.com/observer04/task-manager",
    featured: false
  }
];

export const aiAgents: AIAgent[] = [
  {
    id: "1",
    name: "Stock Analysis Agent",
    description: "An intelligent stock analysis tool that provides real-time market insights, technical analysis, and investment recommendations using advanced AI algorithms.",
    url: "https://stockanalysis-ob04.azurewebsites.net/",
    technologies: ["Python", "Machine Learning", "Azure", "Financial APIs"],
    features: [
      "Real-time stock data analysis",
      "Technical indicator calculations",
      "Investment recommendations",
      "Portfolio performance tracking"
    ]
  },
  {
    id: "2",
    name: "Profile Chatting Agent",
    description: "An AI-powered conversational agent that can discuss career topics, provide professional advice, and engage in meaningful conversations about technology and development.",
    url: "https://huggingface.co/spaces/Observer04/career_convo",
    technologies: ["Python", "Hugging Face", "Transformers", "NLP"],
    features: [
      "Natural language processing",
      "Career guidance conversations",
      "Technical topic discussions",
      "Professional advice generation"
    ]
  },
  {
    id: "3",
    name: "Coming Soon",
    description: "An exciting new AI agent is currently in development. Stay tuned for updates on this innovative project that will showcase cutting-edge AI capabilities.",
    url: "#",
    technologies: ["AI/ML", "Python", "Cloud Computing"],
    features: [
      "Advanced AI capabilities",
      "Real-time processing",
      "Scalable architecture",
      "User-friendly interface"
    ]
  }
];

export const skills: Skill[] = [
  {
    category: "Programming Languages",
    items: ["JavaScript", "TypeScript", "Python", "Java", "C++", "Go"]
  },
  {
    category: "Frontend Development",
    items: ["React", "Next.js", "Vue.js", "HTML5", "CSS3", "Tailwind CSS"]
  },
  {
    category: "Backend Development",
    items: ["Node.js", "Express", "Django", "Flask", "PostgreSQL", "MongoDB"]
  },
  {
    category: "AI/ML & Data Science",
    items: ["TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NumPy", "Jupyter"]
  },
  {
    category: "Cloud & DevOps",
    items: ["AWS", "Azure", "Docker", "Kubernetes", "Jenkins", "Git"]
  },
  {
    category: "Cybersecurity",
    items: ["Penetration Testing", "Network Security", "OWASP", "Security Auditing"]
  }
];

export const certifications: Certification[] = [
  {
    id: "1",
    name: "AWS Certified Developer",
    issuer: "Amazon Web Services",
    date: "2023",
    credentialId: "AWS-DEV-2023-001"
  },
  {
    id: "2",
    name: "Google Cloud Professional",
    issuer: "Google Cloud",
    date: "2023",
    credentialId: "GCP-PROF-2023-001"
  },
  {
    id: "3",
    name: "Certified Ethical Hacker",
    issuer: "EC-Council",
    date: "2022",
    credentialId: "CEH-2022-001"
  }
];