# Portfolio Website

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 📱 Fully responsive design
- ⚡ Built with Next.js 14 and TypeScript
- 🎨 Styled with Tailwind CSS
- 🚀 Optimized for performance
- 📄 Static site generation
- 🔧 CI/CD with GitHub Actions
- ☁️ Deploy to GitHub Pages and Azure Static Web Apps

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: React Icons
- **Deployment**: GitHub Pages, Azure Static Web Apps

## Getting Started

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

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run export` - Export static files

## Project Structure

```
├── components/          # React components
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Projects.tsx
│   ├── Skills.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
├── data/               # Data files
│   ├── projects.ts
│   └── skills.ts
├── pages/              # Next.js pages
│   ├── _app.tsx
│   ├── _document.tsx
│   └── index.tsx
├── styles/             # Global styles
│   └── globals.css
├── .github/workflows/  # GitHub Actions
│   ├── deploy-github-pages.yml
│   └── deploy-azure.yml
└── staticwebapp.config.json  # Azure Static Web Apps config
```

## Deployment

### GitHub Pages

The site automatically deploys to GitHub Pages when you push to the main branch. Make sure to:

1. Enable GitHub Pages in your repository settings
2. Set the source to "GitHub Actions"

### Azure Static Web Apps

1. Create an Azure Static Web App resource
2. Add the `AZURE_STATIC_WEB_APPS_API_TOKEN` secret to your repository
3. Push to main branch to trigger deployment

## Customization

### Personal Information

Update the following files with your information:

- `components/Hero.tsx` - Name, title, and bio
- `components/About.tsx` - About section content
- `components/Footer.tsx` - Footer information
- `data/projects.ts` - Your projects
- `data/skills.ts` - Your skills

### Styling

- Colors and theme: `tailwind.config.js`
- Global styles: `styles/globals.css`
- Component styles: Individual component files

### SEO

Update meta tags in `pages/index.tsx` and `pages/_document.tsx`.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the MIT License.