'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { personalInfo } from '@/data/portfolio';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black/90 border-t border-green-500/20 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-green-500 text-lg font-bold mb-4 font-mono">
              Contact Info
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-orange-400" />
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="text-gray-300 hover:text-green-500 transition-colors duration-200"
                >
                  {personalInfo.email}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-orange-400" />
                <span className="text-gray-300">{personalInfo.location}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-green-500 text-lg font-bold mb-4 font-mono">
              Quick Links
            </h3>
            <div className="space-y-2">
              {['About', 'Experience', 'Projects', 'AI Agents', 'Skills', 'Contact'].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  whileHover={{ x: 5 }}
                  className="block text-gray-300 hover:text-green-500 transition-colors duration-200"
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Social & Info */}
          <div>
            <h3 className="text-green-500 text-lg font-bold mb-4 font-mono">
              Connect
            </h3>
            <div className="flex space-x-4 mb-4">
              <motion.a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="text-gray-300 hover:text-green-500 transition-colors duration-200"
              >
                <Github className="w-6 h-6" />
              </motion.a>
              <motion.a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="text-gray-300 hover:text-green-500 transition-colors duration-200"
              >
                <Linkedin className="w-6 h-6" />
              </motion.a>
              <motion.a
                href={`mailto:${personalInfo.email}`}
                whileHover={{ scale: 1.1 }}
                className="text-gray-300 hover:text-green-500 transition-colors duration-200"
              >
                <Mail className="w-6 h-6" />
              </motion.a>
            </div>
            <div className="text-gray-400 text-sm">
              <p>Built with Next.js, TypeScript, Tailwind CSS & Github Copilot</p>
              <p>Deployed on Azure Static Web Apps</p>
            </div>
          </div>
        </div>

        <div className="border-t border-green-500/20 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} {personalInfo.name}. All rights reserved.
          </p>
          <p className="text-green-500 text-xs mt-2 font-mono">
            {">"} System online. All systems operational.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;