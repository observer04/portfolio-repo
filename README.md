# Portfolio Website - ommprakash.cloud

A modern, responsive portfolio website built with Next.js, featuring a space and Unix-themed design. This site showcases professional experience, projects, AI agents, and skills with interactive animations.

## 🚀 Features

- **Modern Design**: Space and Unix-themed interface with terminal aesthetics
- **Responsive Layout**: Fully responsive design that works on all devices
- **Interactive Animations**: Smooth animations powered by Framer Motion
- **LinkedIn Integration**: Displays professional data extracted from LinkedIn profile
- **TryHackMe Badge**: Embedded TryHackMe profile badge (User ID: 4005401)
- **AI Agents Showcase**: Features three AI agents including Stock Analysis and Profile Chatting agents
- **GitHub Projects**: Showcases featured projects with live links
- **Animated Skills**: Interactive skills display with matrix-style animations
- **Easy Content Management**: All content is managed through data files for easy updates

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Azure Static Web Apps
- **CI/CD**: GitHub Actions

## 📁 Project Structure

```
portfolio-repo/
├── src/
│   ├── app/
│   │   ├── globals.css       # Global styles with space theme
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Main page component
│   ├── components/
│   │   ├── Header.tsx        # Navigation header
│   │   ├── Hero.tsx          # Hero section with typing animation
│   │   ├── About.tsx         # About section with LinkedIn data
│   │   ├── Experience.tsx    # Professional experience timeline
│   │   ├── Projects.tsx      # GitHub projects showcase
│   │   ├── AIAgents.tsx      # AI agents showcase
│   │   ├── Skills.tsx        # Animated skills display
│   │   ├── Contact.tsx       # Contact form and information
│   │   └── Footer.tsx        # Footer with links
│   └── data/
│       └── portfolio.ts      # All portfolio data (easy to update)
├── .github/
│   └── workflows/
│       └── azure-static-web-apps-ommprakash-cloud.yml
├── staticwebapp.config.json  # Azure Static Web Apps configuration
└── next.config.ts           # Next.js configuration for static export
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/observer04/portfolio-repo.git
cd portfolio-repo
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Content Management

All portfolio content is managed through the `src/data/portfolio.ts` file. Update the following sections:

### Personal Information
```typescript
export const personalInfo: PersonalInfo = {
  name: "Your Name",
  title: "Your Title",
  email: "your@email.com",
  // ... other fields
};
```

### Experience
```typescript
export const experiences: Experience[] = [
  {
    company: "Company Name",
    position: "Your Position",
    duration: "2023 - Present",
    // ... other fields
  },
];
```

### Projects
```typescript
export const projects: Project[] = [
  {
    name: "Project Name",
    description: "Project description",
    technologies: ["Next.js", "TypeScript"],
    // ... other fields
  },
];
```

### AI Agents
```typescript
export const aiAgents: AIAgent[] = [
  {
    name: "Agent Name",
    description: "Agent description",
    url: "https://agent-url.com",
    // ... other fields
  },
];
```

## 🎨 Design Theme

The website features a space and Unix-themed design with:
- **Colors**: Green (#00ff00), Orange (#ff6b35), Black backgrounds
- **Typography**: Monospace fonts (Courier New)
- **Animations**: Terminal-style typing, matrix rain effects, glitch effects
- **Interactive Elements**: Hover effects, smooth transitions

## 🚀 Deployment

### Azure Static Web Apps

The site is configured for deployment on Azure Static Web Apps with automatic CI/CD via GitHub Actions.

#### Setup Instructions:

1. Create an Azure Static Web App resource in the Azure Portal
2. Connect it to your GitHub repository
3. Azure will automatically create the GitHub Actions workflow
4. Set up the following secret in your GitHub repository:
   - `AZURE_STATIC_WEB_APPS_API_TOKEN_OMMPRAKASH_CLOUD`

#### Manual Deploy:

```bash
# Build the project
npm run build

# The built files will be in the 'out' directory
# Upload the 'out' directory to your hosting provider
```

## 📱 Responsive Design

The website is fully responsive and optimized for:
- **Desktop**: Full-width layout with side-by-side sections
- **Tablet**: Adjusted grid layouts and spacing
- **Mobile**: Stacked layout with collapsible navigation

## 🔧 Customization

### Colors
Update the CSS variables in `src/app/globals.css`:
```css
:root {
  --background: #0a0a0a;
  --foreground: #00ff00;
  --accent: #ff6b35;
}
```

### Animations
Modify animations in individual components using Framer Motion:
```typescript
const variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};
```

## 🧪 Testing

```bash
# Run linting
npm run lint

# Build for production
npm run build

# Start production server
npm start
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Contact

- **Email**: contact@ommprakash.cloud
- **LinkedIn**: [linkedin.com/in/omm-prakash](https://linkedin.com/in/omm-prakash)
- **GitHub**: [github.com/observer04](https://github.com/observer04)

## 🔗 Live Demo

Visit the live site at: [ommprakash.cloud](https://ommprakash.cloud)

---

Built with ❤️ by Omm Prakash
