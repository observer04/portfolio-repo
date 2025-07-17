export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution built with Next.js and Node.js, featuring user authentication, payment integration, and admin dashboard.",
    image: "/images/ecommerce.jpg",
    technologies: ["Next.js", "Node.js", "MongoDB", "Stripe", "Tailwind CSS"],
    githubUrl: "https://github.com/observer04/ecommerce-platform",
    liveUrl: "https://ecommerce-demo.vercel.app",
    featured: true,
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
    image: "/images/taskapp.jpg",
    technologies: ["React", "Firebase", "Material-UI", "Socket.io"],
    githubUrl: "https://github.com/observer04/task-manager",
    liveUrl: "https://task-manager-demo.netlify.app",
    featured: true,
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description: "A responsive weather application with location-based forecasts, interactive maps, and detailed weather analytics.",
    image: "/images/weather.jpg",
    technologies: ["Vue.js", "OpenWeather API", "Chart.js", "Vuetify"],
    githubUrl: "https://github.com/observer04/weather-dashboard",
    liveUrl: "https://weather-dashboard-demo.netlify.app",
    featured: false,
  },
  {
    id: 4,
    title: "Portfolio Website",
    description: "A modern portfolio website showcasing projects and skills with smooth animations and responsive design.",
    image: "/images/portfolio.jpg",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    githubUrl: "https://github.com/observer04/portfolio-website",
    liveUrl: "https://portfolio-demo.vercel.app",
    featured: false,
  },
];