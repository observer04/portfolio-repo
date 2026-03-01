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
  name: "Omm Prakash Tripathy",
  title: "AI Engineer & Security Enthusiast",
  location: "India",
  email: "tripathyomm09@gmail.com",
  phone: "+91-XXXXXXXXXX", // Replace with actual phone
  linkedin: "https://www.linkedin.com/in/omm-prakash",
  github: "https://github.com/observer04",
  summary: "Bit of a Generalist, I am an admirer of the current state of AI Applications, especially the state of agents. I am also interested in enumerating systems in CTFs in the field of Cybersecurity. When I'm free, I try to root machines in THM or HTB. Besides this, I dabble a bit in Backend and infra engineering.",
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
    id: 'proj-teatime',
    name: 'TeaTime',
    description:
      'A full-stack real-time chat application with direct messaging, group conversations, file sharing via Cloudflare R2, and WebRTC-based video/audio calls. Features JWT auth with token rotation, typing indicators, message receipts, and a self-hosted Coturn TURN server. Deployed on Azure with Caddy reverse proxy.',
    technologies: ['Go', 'React', 'WebSocket', 'WebRTC', 'PostgreSQL', 'Cloudflare R2', 'Docker'],
    githubUrl: 'https://github.com/observer04/teatime',
    liveUrl: 'https://teatime.ommprakash.cloud',
    featured: true,
  },
  {
    id: 'proj-disgo',
    name: 'Disgo — Redis Clone',
    description:
      'A Redis-compatible server built from scratch in Go. Supports RESP protocol, string/list/stream/sorted-set/geo commands, pub/sub, transactions (MULTI/EXEC), ACL/auth, RDB persistence on startup, and a replication subset (PSYNC, REPLCONF, WAIT).',
    technologies: ['Go', 'TCP', 'RESP Protocol', 'Redis'],
    githubUrl: 'https://github.com/observer04/disgo',
    featured: true,
  },
  {
    id: 'proj-medx',
    name: 'MedX v1',
    description:
      'A secure, mobile-first PDF delivery platform with encrypted storage, screenshot prevention, device-locked access, and a manual UPI payment workflow. Includes an admin dashboard for product/order management. Built with React Native (Expo), Firebase Auth, Supabase, and Cloudflare R2.',
    technologies: ['React Native', 'Expo', 'Firebase', 'Supabase', 'Cloudflare R2', 'TypeScript'],
    githubUrl: 'https://github.com/observer04/medx_v1',
    featured: true,
  },
  {
    id: 'proj-cs50ai',
    name: 'CS50 AI — 13 Projects',
    description:
      'Complete suite of 13 AI projects from Harvard\'s CS50AI: DFS/BFS search, Minimax game AI, Bayesian networks, constraint satisfaction, Q-learning, k-NN classification, CNN traffic sign recognition, NLP parsing, and BERT self-attention visualization.',
    technologies: ['Python', 'TensorFlow', 'NLTK', 'HuggingFace Transformers', 'OpenCV'],
    githubUrl: 'https://github.com/observer04/cs50ai',
    featured: true,
  },
  {
    id: 'proj-glacierhack',
    name: 'GlacierHack — Satellite Segmentation',
    description:
      'Glacier semantic segmentation from multispectral satellite imagery for the IEEE GRSS GlacierHack 2025 challenge. U-Net with ResNet34 encoder, channel-spatial attention, focal/dice/MCC/boundary loss, and test-time augmentation. Classifies glacier, debris, and glacial lake regions.',
    technologies: ['Python', 'PyTorch', 'U-Net', 'Albumentations', 'Rasterio'],
    githubUrl: 'https://github.com/observer04/gchack2_v2',
    featured: true,
  },
  {
    id: 'proj-http-server',
    name: 'HTTP Server',
    description:
      'An asynchronous HTTP/1.1 server built in Python using asyncio. Supports routing, file serving/uploading, gzip and deflate content encoding, persistent keep-alive connections, and a clean command-line interface.',
    technologies: ['Python', 'asyncio', 'HTTP/1.1'],
    githubUrl: 'https://github.com/observer04/http-server-python',
    featured: true,
  },
  {
    id: 'proj-dns-server',
    name: 'DNS Server',
    description:
      'A full DNS server in Go supporting standalone mode and query forwarding to upstream resolvers. Handles DNS message parsing/encoding, name compression (pointer-based), multiple question splitting/merging, and proper OPCODE/RCODE handling.',
    technologies: ['Go', 'UDP', 'DNS Protocol'],
    githubUrl: 'https://github.com/observer04/dns-server-go',
    featured: false,
  },
  {
    id: 'proj-shell',
    name: 'Python Custom Shell',
    description:
      'A custom POSIX-compliant shell built in Python. A lightweight, educational implementation exploring command parsing, process management, I/O redirection, and pipelines.',
    technologies: ['Python'],
    githubUrl: 'https://github.com/observer04/shell-python',
    featured: false,
  },
  {
    id: 'proj-analytics',
    name: 'Analytics API',
    description:
      'An API for time-series data analysis using FastAPI and TimescaleDB. Utilizes SQLModel on PostgreSQL for type-safe ORM operations.',
    technologies: ['FastAPI', 'TimescaleDB', 'PostgreSQL', 'SQLModel', 'Python'],
    githubUrl: 'https://github.com/observer04/analyticsApi',
    featured: false,
  },
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
  }
];

export const skills = [
  {
    category: 'Agents',
    items: ['OpenAI SDK', 'AutoGen', 'smol-agent', 'LangChain', 'LangGraph'],
  },
  {
    category: 'Cloud & DevOps',
    items: ['Azure', 'Docker', 'Git', 'Linux Sys-Admin'],
  },
  {
    category: 'Cybersecurity',
    items: [
      'Penetration Testing',
      'OWASP Top 10',
      'Nmap',
      'Wireshark',
      'Metasploit',
      'Burp Suite',
      
    ],
  },
  {
    category: 'Programming Languages',
    items: ['C', 'C++', 'Python', 'Go', 'JavaScript', 'TypeScript'],
  },
  {
    category: 'Frontend',
    items: ['HTML5', 'CSS3'],
  },
  {
    category: 'Backend',
    items: ['FastAPI', 'PostgreSQL', 'Redis', 'WebSockets', 'Docker'],
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