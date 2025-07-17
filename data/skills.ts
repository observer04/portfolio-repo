export interface Skill {
  name: string;
  level: number;
  category: string;
  icon: string;
}

export const skills: Skill[] = [
  // Frontend
  { name: "React", level: 90, category: "Frontend", icon: "SiReact" },
  { name: "Next.js", level: 85, category: "Frontend", icon: "SiNextdotjs" },
  { name: "Vue.js", level: 80, category: "Frontend", icon: "SiVuedotjs" },
  { name: "TypeScript", level: 85, category: "Frontend", icon: "SiTypescript" },
  { name: "JavaScript", level: 95, category: "Frontend", icon: "SiJavascript" },
  { name: "HTML/CSS", level: 90, category: "Frontend", icon: "SiHtml5" },
  { name: "Tailwind CSS", level: 85, category: "Frontend", icon: "SiTailwindcss" },
  
  // Backend
  { name: "Node.js", level: 85, category: "Backend", icon: "SiNodedotjs" },
  { name: "Python", level: 80, category: "Backend", icon: "SiPython" },
  { name: "Express.js", level: 85, category: "Backend", icon: "SiExpress" },
  { name: "MongoDB", level: 75, category: "Backend", icon: "SiMongodb" },
  { name: "PostgreSQL", level: 80, category: "Backend", icon: "SiPostgresql" },
  { name: "Redis", level: 70, category: "Backend", icon: "SiRedis" },
  
  // DevOps & Tools
  { name: "Git", level: 90, category: "Tools", icon: "SiGit" },
  { name: "Docker", level: 75, category: "Tools", icon: "SiDocker" },
  { name: "AWS", level: 70, category: "Tools", icon: "SiAmazonaws" },
  { name: "Vercel", level: 85, category: "Tools", icon: "SiVercel" },
  { name: "Netlify", level: 80, category: "Tools", icon: "SiNetlify" },
];