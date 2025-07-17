'use client';

import React from 'react';
import TerminalNav from './TerminalNav';

interface TerminalHeaderProps {
  activeSection: string;
}

const TerminalHeader: React.FC<TerminalHeaderProps> = ({ activeSection }) => {
  const scrollToTop = () => {
    const terminalContent = document.querySelector('.terminal-content');
    if (terminalContent) {
      terminalContent.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-gray-800 p-3 flex items-center justify-between sticky top-0 z-10 border-b border-gray-700 rounded-t-lg">
      <div className="flex items-center space-x-2">
        <div className="w-3.5 h-3.5 rounded-full bg-red-500"></div>
        <div className="w-3.5 h-3.5 rounded-full bg-yellow-500"></div>
        <div className="w-3.5 h-3.5 rounded-full bg-green-500"></div>
        <div
          className="text-sm text-gray-400 font-mono ml-2 cursor-pointer transition-colors duration-300 hover:text-green-400"
          onClick={scrollToTop}
        >
          op@cloud: ~
        </div>
      </div>
      <TerminalNav activeSection={activeSection} />
    </div>
  );
};

export default TerminalHeader;
