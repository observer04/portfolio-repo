'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, Zap, Shield } from 'lucide-react';
import { personalInfo } from '@/data/portfolio';

const Hero = () => {
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const fullText = personalInfo.title;

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setText(fullText.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [fullText]);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center space-bg relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 space-bg"></div>
      
      {/* Matrix Rain Effect */}
      <div className="matrix-rain"></div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Terminal-style greeting */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-green-500 font-mono text-lg mb-4"
          >
            {">"} Initializing portfolio...
          </motion.div>

          {/* Name with glitch effect */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-6xl md:text-8xl font-bold text-green-500 mb-6"
            data-text={personalInfo.name}
          >
            <span className="glitch" data-text={personalInfo.name}>
              {personalInfo.name}
            </span>
          </motion.h1>

          {/* Typing animation for title */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-2xl md:text-3xl text-orange-400 font-mono mb-8"
          >
            {text}
            <span className={`cursor ${isTyping ? 'animate-pulse' : ''}`}>|</span>
          </motion.div>

          {/* Summary */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            {personalInfo.summary}
          </motion.p>

          {/* Feature Icons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex justify-center space-x-8 mb-12"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center"
            >
              <Code className="w-12 h-12 text-green-500 mb-2" />
              <span className="text-sm text-gray-400 font-mono">Development</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center"
            >
              <Zap className="w-12 h-12 text-orange-400 mb-2" />
              <span className="text-sm text-gray-400 font-mono">AI/ML</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center"
            >
              <Shield className="w-12 h-12 text-green-500 mb-2" />
              <span className="text-sm text-gray-400 font-mono">Security</span>
            </motion.div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-orange-400 text-orange-400 px-8 py-3 rounded-lg font-mono font-bold hover:bg-orange-400 hover:text-black transition-colors duration-200"
            >
              Connect with Me
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;