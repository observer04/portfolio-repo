'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Cloud, Shield, Brain, Wrench } from 'lucide-react';
import { skills } from '@/data/portfolio';

const Skills = () => {
  const categoryIcons = {
    'Agents': Brain,
    'Programming Languages': Code,
    'Frontend': Code,
    'Backend': Database,
    'Cloud & DevOps': Cloud,
    'Cybersecurity': Shield,
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0.3, y: 30, filter: 'brightness(0.4)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'brightness(1)',
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="skills" className="py-20 bg-black/50">
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
              {">"} Skills
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              My technical expertise and the tools I use to build amazing things
            </p>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skillCategory, index) => (
              <motion.div
                key={skillCategory.category}
                variants={itemVariants}
                className="bg-gray-900/50 backdrop-blur-sm border border-green-500/20 rounded-lg p-6 hover:border-green-500/40 transition-colors duration-300"
              >
                <div className="flex items-center space-x-3 mb-4">
                  {React.createElement(
                    categoryIcons[skillCategory.category as keyof typeof categoryIcons] || Wrench,
                    { className: "w-6 h-6 text-orange-400" }
                  )}
                  <h3 className="text-lg font-bold text-green-500 font-mono">
                    {skillCategory.category}
                  </h3>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {skillCategory.items.map((skill, skillIndex) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: skillIndex * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                      className="bg-black/50 border border-green-500/30 text-green-500 px-3 py-1 rounded-full text-sm font-mono hover:border-green-500/60 transition-colors duration-200"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Skills Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <div className="text-center">
              <div className="text-4xl font-bold text-green-500 mb-2">
                {skills.reduce((total, category) => total + category.items.length, 0)}+
              </div>
              <div className="text-gray-300 font-mono">Technologies</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-400 mb-2">
                {skills.length}
              </div>
              <div className="text-gray-300 font-mono">Categories</div>
            </div>
          </motion.div>

          {/* Terminal Display */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-12 bg-black/70 border border-green-500/20 rounded-lg p-4 font-mono text-sm"
          >
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="text-green-500">
              <span className="text-gray-400">$</span> whoami --skills
            </div>
            <div className="text-gray-400 mt-1">
              AI Engineer | Software Developer | CTF Player
            </div>
            <div className="text-green-500 mt-2">
              <span className="text-gray-400">$</span> echo &quot;Always learning, always growing&quot;
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;