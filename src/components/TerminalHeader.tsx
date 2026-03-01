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
    <div className="bg-gray-800 px-2 py-2 sm:p-3 flex items-center justify-between sticky top-0 z-10 border-b border-gray-700 rounded-t-lg">
      <div className="flex items-center space-x-1.5 sm:space-x-2 min-w-0">
        <div className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full bg-red-500 flex-shrink-0"></div>
        <div className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full bg-yellow-500 flex-shrink-0"></div>
        <div className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full bg-green-500 flex-shrink-0"></div>
        <div
          className="text-xs sm:text-base text-green-500 font-mono font-bold ml-1 sm:ml-2 cursor-pointer transition-all duration-300 hover:brightness-150 truncate"
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
