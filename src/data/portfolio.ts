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

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  duration: string;
  location: string;
  description?: string;
  notesUrl?: string;
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
  url: string;
  image: string;
}

// Portfolio data based on LinkedIn profile: www.linkedin.com/in/omm-prakash
export const personalInfo: PersonalInfo = {
  name: "Omm Prakash",
  title: "Software Engineer & AI Enthusiast",
  location: "India",
  email: "tripathyomm09@gmail.com",
  phone: "+91-XXXXXXXXXX", // Replace with actual phone
  linkedin: "https://www.linkedin.com/in/omm-prakash",
  github: "https://github.com/observer04",
  summary: "Passionate software engineer with expertise in AI/ML, web development, and cybersecurity. Building innovative solutions that bridge the gap between cutting-edge technology and practical applications.",
  tryhackme: {
    userId: "4005401",
    badgeUrl: "https://tryhackme.com/api/v2/badges/public-profile?userPublicId=4005401"
  }
};

export const education: Education[] = [
  {
    id: "1",
    institution: "IIIT Bhubaneswar",
    degree: "Bachelor of Technology",
    field: "Computer Science and Engineering",
    duration: "2023 - 2027",
    location: "Bhubaneswar, India",
    description: "Focused on software engineering, data structures, algorithms, and computer systems."
  },
  {
    id: "2",
    institution: "TryHackMe.com",
    degree: "Cybersecurity Training",
    field: "Ethical Hacking & Penetration Testing",
    duration: "2025 - Current",
    location: "Online",
    description: "Learning and practicing cybersecurity skills through hands-on labs and challenges."
  },
  {
    id: "3",
    institution: "HTB Academy",
    degree: "Cybersecurity Training",
    field: "Penetration Testing & Bug Bounty",
    duration: "2025 - Current",
    location: "Online",
    description: "Learning and practicing cybersecurity skills through hands-on labs and challenges. I pawn machines and learn on the CPTS path pentesting tasks.",
    notesUrl: "https://veil-condition-db3.notion.site/Labs-1f29e748e187805ebcffde6c77291aa6"
  }
];

export const projects: Project[] = [
  {
    id: 'proj-1',
    name: 'Python Custom Shell',
    description:
      "A custom POSIX-compliant shell built in Python. It's a lightweight, educational implementation that explores the core concepts behind how a command-line interface works, including command parsing, process management, I/O redirection, and pipelines.",
    technologies: ['Python'],
    githubUrl: 'https://github.com/observer04/shell-python',
    featured: true,
  },
  {
    id: 'proj-2',
    name: 'Analytics API',
    description:
      'An API development project using FastAPI and TimescaleDB for the analysis of time-series data. It utilizes SQLModel on PostgreSQL.',
    technologies: ['FastAPI', 'TimescaleDB', 'PostgreSQL', 'SQLModel', 'Python'],
    githubUrl: 'https://github.com/observer04/analyticsApi',
    featured: true,
  },
  {
    id: 'proj-3',
    name: 'AI-Powered Code Review Agent',
    description: 'An AI agent that reviews code for best practices, potential errors, and optimization opportunities. It provides feedback and suggestions to improve code quality and performance.',
    technologies: ['Python', 'Machine Learning', 'Flask', 'Docker'],
    githubUrl: 'https://github.com/observer04/ai-code-review',
    featured: true,
  },
  {
    id: 'proj-4',
    name: 'Coming Soon',
    description: 'An exciting new project is currently in development. Stay tuned for updates on this innovative project that will showcase cutting-edge technology and creative solutions.',
    technologies: ['AI/ML', 'Python', 'Cloud Computing'],
    featured: false,
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

export const skills = [
  {
    category: 'Agents',
    items: ['OpenAI SDK', 'AutoGen', 'smol-agent', 'LangChain', 'LangGraph'],
  },
  {
    category: 'Cloud & DevOps',
    items: ['Azure', 'Docker', 'Git'],
  },
  {
    category: 'Cybersecurity',
    items: [
      'Penetration Testing',
      'Vulnerability Assessment',
      'Nmap',
      'Wireshark',
      'Metasploit',
      'Burp Suite',
      'OWASP Top 10',
    ],
  },
  {
    category: 'Programming Languages',
    items: ['C', 'C++', 'Python', 'JavaScript'],
  },
  {
    category: 'Frontend',
    items: ['HTML5', 'CSS3'],
  },
  {
    category: 'Backend',
    items: ['FastAPI', 'PostgreSQL', 'MongoDB'],
  },
];

export const certifications: Certification[] = [
  {
    id: "cert-1",
    name: "Microsoft Certified: Azure AI Engineer Associate",
    issuer: "Microsoft",
    date: "2025-06-21",
    credentialId: "MS-AZURE-AI-2025",
    url: "https://learn.microsoft.com/api/credentials/share/en-us/OmmTripathy-7760/DD4F9AA885B4A3C9?sharingId",
    image: "/certs/azureaiengineerassociate.png"
  },
  {
    id: "cert-2",
    name: "Google Cybersecurity Specialization",
    issuer: "Google",
    date: "2025-03-10",
    credentialId: "GOOGLE-CYBER-2025",
    url: "https://www.coursera.org/account/accomplishments/specialization/69378FMHG2TG",
    image: "/certs/googlecybersecurity.jpeg"
  },
  {
    id: "cert-3",
    name: "Machine Learning Specialization",
    issuer: "Stanford Online",
    date: "2024-10-27",
    credentialId: "ML-SPEC-2024",
    url: "https://www.coursera.org/account/accomplishments/specialization/2V36OORW5D6E",
    image: "/certs/mlspecialization.jpeg"
  },
  {
    id: "cert-4",
    name: "Cyber Security 101",
    issuer: "TryHackMe",
    date: "2025-02-10",
    credentialId: "THM-1Y4CIFR1S8",
    url: "https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-1Y4CIFR1S8.pdf",
    image: "/certs/cybersecurity101.png"
  },
  {
    id: "cert-5",
    name: "Ethical Hacker",
    issuer: "Udacity",
    date: "2025-07-03",
    credentialId: "ea9ddb6e-f938-11ef-a68f-cf225e06a3c8",
    url: "https://www.udacity.com/certificate/e/ea9ddb6e-f938-11ef-a68f-cf225e06a3c8",
    image: "/certs/udacity.png"
  }
];