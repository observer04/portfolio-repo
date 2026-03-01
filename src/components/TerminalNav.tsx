'use client';

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface TerminalNavProps {
  activeSection: string;
}

const TerminalNav: React.FC<TerminalNavProps> = ({ activeSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuItems = ['AI Agents', 'Projects', 'Certifications', 'Skills', 'whoami', 'Contact'];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="relative">
      {/* Hamburger button — visible on small screens */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden text-green-500 hover:text-green-400 transition-colors p-1"
        aria-label="Toggle navigation"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Desktop nav */}
      <ul className="hidden md:flex items-center space-x-6 text-base">
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

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-gray-900 border border-green-500/40 rounded-lg shadow-xl z-50 md:hidden overflow-hidden">
          <ul className="py-1">
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
                    className={`block px-4 py-2.5 font-mono text-sm font-bold transition-colors duration-200 ${
                      isActive
                        ? 'text-green-500 bg-green-500/10'
                        : 'text-gray-400 hover:text-green-500 hover:bg-green-500/5'
                    }`}
                  >
                    <span className="mr-2 text-green-500/50">$</span>{item}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default TerminalNav;
