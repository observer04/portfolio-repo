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
      <ul className="flex items-center space-x-6 text-base">
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
                className={`font-mono font-bold transition-colors duration-300 relative nav-link group px-2 py-1 overflow-hidden ${
                  isActive ? 'text-green-500' : 'text-gray-400 hover:text-green-500'
                }`}
              >
                <span className="relative z-10 transition-all duration-300 group-hover:brightness-150">{item}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default TerminalNav;
