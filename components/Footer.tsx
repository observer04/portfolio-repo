import { FiHeart } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">John Doe</h3>
              <p className="text-gray-300">
                Full Stack Developer passionate about creating amazing web experiences.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <a href="#home" className="block text-gray-300 hover:text-white transition-colors">
                  Home
                </a>
                <a href="#about" className="block text-gray-300 hover:text-white transition-colors">
                  About
                </a>
                <a href="#projects" className="block text-gray-300 hover:text-white transition-colors">
                  Projects
                </a>
                <a href="#contact" className="block text-gray-300 hover:text-white transition-colors">
                  Contact
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <div className="space-y-2">
                <a 
                  href="https://github.com/observer04" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  GitHub
                </a>
                <a 
                  href="https://linkedin.com/in/observer04" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
                <a 
                  href="mailto:contact@observer04.dev"
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  Email
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-300 flex items-center justify-center space-x-2">
              <span>© 2024 John Doe. Made with</span>
              <FiHeart className="text-red-500" />
              <span>and Next.js</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;