'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Code, Star } from 'lucide-react';
import { projects } from '@/data/portfolio';

const Projects = () => {
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
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section id="projects" className="py-20 bg-black/50">
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
              {">"} Projects
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Showcasing my latest work and open-source contributions
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-gray-900/50 backdrop-blur-sm border border-green-500/20 rounded-lg p-6 hover:border-green-500/40 transition-colors duration-300 group"
              >
                {/* Project Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Code className="w-6 h-6 text-orange-400" />
                    {project.featured && (
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    {project.githubUrl && (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        className="text-gray-400 hover:text-green-500 transition-colors duration-200"
                      >
                        <Github className="w-5 h-5" />
                      </motion.a>
                    )}
                    {project.liveUrl && (
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        className="text-gray-400 hover:text-green-500 transition-colors duration-200"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Project Content */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-green-500 mb-3 font-mono group-hover:text-orange-400 transition-colors duration-200">
                    {project.name}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: techIndex * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                      className="bg-black/50 border border-green-500/30 text-green-500 px-2 py-1 rounded-md text-xs font-mono hover:border-green-500/60 transition-colors duration-200"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                {/* Featured Badge */}
                {project.featured && (
                  <div className="mt-4 pt-4 border-t border-green-500/20">
                    <span className="text-yellow-400 text-sm font-mono flex items-center">
                      <Star className="w-4 h-4 mr-1 fill-current" />
                      Featured Project
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* GitHub Profile Link */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-16"
          >
            <p className="text-gray-300 mb-6">
              Want to see more of my work? Check out my GitHub profile!
            </p>
            <motion.a
              href="https://github.com/observer04"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-2 bg-gray-900 border border-green-500/30 text-green-500 px-8 py-3 rounded-lg font-mono font-bold hover:border-green-500/60 hover:bg-gray-800 transition-colors duration-200"
            >
              <Github className="w-5 h-5" />
              <span>View GitHub Profile</span>
            </motion.a>
          </motion.div>

          {/* Terminal Command */}
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
              <span className="text-gray-400">$</span> git clone https://github.com/observer04/portfolio-repo.git
            </div>
            <div className="text-gray-400 mt-1">
              Cloning into &apos;portfolio-repo&apos;...
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;