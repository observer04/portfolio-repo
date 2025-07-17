import { FiGithub, FiLinkedin, FiMail, FiDownload } from 'react-icons/fi';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Hi, I&apos;m{' '}
            <span className="text-primary">John Doe</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Full Stack Developer & UI/UX Designer
          </p>
          <p className="text-lg text-gray-700 mb-12 max-w-2xl mx-auto">
            I create beautiful, functional, and user-friendly web applications 
            using modern technologies. Passionate about clean code and innovative solutions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a
              href="#contact"
              className="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200"
            >
              Get In Touch
            </a>
            <a
              href="/resume.pdf"
              className="flex items-center gap-2 border-2 border-primary text-primary px-8 py-3 rounded-lg font-medium hover:bg-primary hover:text-white transition-colors duration-200"
            >
              <FiDownload size={20} />
              Download Resume
            </a>
          </div>

          <div className="flex justify-center space-x-6">
            <a
              href="https://github.com/observer04"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary transition-colors duration-200"
            >
              <FiGithub size={24} />
            </a>
            <a
              href="https://linkedin.com/in/observer04"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary transition-colors duration-200"
            >
              <FiLinkedin size={24} />
            </a>
            <a
              href="mailto:contact@observer04.dev"
              className="text-gray-600 hover:text-primary transition-colors duration-200"
            >
              <FiMail size={24} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;