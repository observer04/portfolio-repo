'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, User, Calendar, ExternalLink } from 'lucide-react';
import { personalInfo, education } from '@/data/portfolio';

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0.3, y: 50, filter: 'brightness(0.4)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'brightness(1)',
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section id="whoami" className="py-20 bg-black/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-green-500 mb-4 font-mono">
              {">"} whoami
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Passionate about building innovative solutions that make a difference
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Personal Information */}
            <motion.div variants={itemVariants}>
              <div className="bg-gray-900/50 backdrop-blur-sm border border-green-500/20 rounded-lg p-8 h-full">
                <h3 className="text-2xl font-bold text-green-500 mb-6 font-mono flex items-center">
                  <User className="w-6 h-6 mr-2" />
                  Personal Info
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-orange-400" />
                    <span className="text-gray-300">
                      <strong className="text-green-500">Location:</strong> {personalInfo.location}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-orange-400" />
                    <span className="text-gray-300">
                      <strong className="text-green-500">Email:</strong>{' '}
                      <a
                        href={`mailto:${personalInfo.email}`}
                        className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                      >
                        {personalInfo.email}
                      </a>
                    </span>
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="text-lg font-bold text-green-500 mb-4 font-mono">
                    Summary
                  </h4>
                  <p className="text-gray-300 leading-relaxed">
                    {personalInfo.summary}
                  </p>
                </div>

                {/* TryHackMe Badge */}
                <div className="mt-8">
                  <h4 className="text-lg font-bold text-green-500 mb-4 font-mono">
                    TryHackMe Profile
                  </h4>
                  <div className="bg-black/50 rounded-lg p-4 border border-green-500/20">
                    <iframe
                      src={`https://tryhackme.com/api/v2/badges/public-profile?userPublicId=${personalInfo.tryhackme.userId}`}
                      width="100%"
                      height="200"
                      frameBorder="0"
                      className="rounded-lg"
                      title="TryHackMe Badge"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Education */}
            <motion.div variants={itemVariants}>
              <div className="bg-gray-900/50 backdrop-blur-sm border border-green-500/20 rounded-lg p-8 h-full">
                <h3 className="text-2xl font-bold text-green-500 mb-6 font-mono flex items-center">
                  <Calendar className="w-6 h-6 mr-2" />
                  Education
                </h3>
                
                {education.map((edu, index) => (
                  <motion.div
                    key={edu.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-l-2 border-green-500/30 pl-4 pb-6 last:pb-0"
                  >
                    <div className="flex flex-col space-y-2">
                      <h4 className="text-lg font-bold text-orange-400">
                        {edu.degree}
                      </h4>
                      <p className="text-green-500 font-mono">{edu.field}</p>
                      <p className="text-gray-300">{edu.institution}</p>
                      <p className="text-gray-400 text-sm">
                        {edu.duration} • {edu.location}
                      </p>
                      {edu.description && (
                        <p className="text-gray-300 text-sm mt-2">
                          {edu.description}
                        </p>
                      )}
                      {edu.notesUrl && (
                        <motion.a
                          href={edu.notesUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="inline-flex items-center space-x-2 bg-green-500/20 border border-green-500/40 text-green-500 px-4 py-2 rounded-lg text-sm font-mono hover:bg-green-500/30 hover:border-green-500/60 transition-colors duration-200 mt-3 w-fit"
                        >
                          <span>My Notes & Writeups</span>
                          <ExternalLink className="w-4 h-4" />
                        </motion.a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;