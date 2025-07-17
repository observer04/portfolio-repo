'use client';

import React from 'react';

interface TerminalNavProps {
  activeSection: string;
}

const TerminalNav: React.FC<TerminalNavProps> = ({ activeSection }) => {
  const menuItems = ['AI Agents', 'Projects', 'Certifications', 'Skills', 'whoami', 'Contact'];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav>
      <ul className="flex items-center space-x-6 text-sm">
        {menuItems.map((item) => {
          const sectionId = item.toLowerCase().replace(/\s+/g, '-');
          const isActive = activeSection === sectionId;
          return (
            <li key={item}>
              <a
                href={`#${sectionId}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(sectionId);
                }}
                className={`font-mono transition-colors duration-300 relative nav-link group px-2 py-1 overflow-hidden ${
                  isActive ? 'text-green-400' : 'text-gray-400 hover:text-gray-900'
                }`}
              >
                <span className="relative z-10">{item}</span>
                <span className="absolute inset-0 h-full w-full bg-green-400 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 z-0"></span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default TerminalNav;
