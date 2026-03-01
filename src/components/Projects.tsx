'use client';

import { projects } from '@/data/portfolio';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FolderGit2, ChevronDown, ChevronUp } from 'lucide-react';

const Projects = () => {
  const [showAll, setShowAll] = useState(false);
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

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
    hidden: { opacity: 0.3, y: 50, filter: 'brightness(0.4)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'brightness(1)',
      transition: {
        duration: 0.5,
      },
    },
  };

  const ProjectCard = ({ project }: { project: typeof projects[0] }) => (
    <motion.div
      variants={itemVariants}
      className="bg-gray-900/50 backdrop-blur-sm border border-green-500/20 rounded-lg p-4 sm:p-6 flex flex-col"
    >
      <h3 className="text-xl sm:text-2xl font-bold text-orange-400 mb-3 flex items-center">
        <FolderGit2 className="w-5 h-5 sm:w-6 sm:h-6 mr-2 flex-shrink-0" />
        <span className="break-words">{project.name}</span>
      </h3>
      <p className="text-gray-300 text-sm sm:text-base leading-relaxed flex-grow mb-4">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="text-xs bg-green-900/50 text-green-300 px-2 py-1 rounded-full font-mono"
          >
            {tech}
          </span>
        ))}
      </div>
      <div className="flex items-center space-x-4 mt-auto">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 text-sm font-semibold transition-colors"
          >
            GitHub Repo
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-400 hover:text-orange-300 text-sm font-semibold transition-colors"
          >
            Live Demo
          </a>
        )}
      </div>
    </motion.div>
  );

  return (
    <section id="projects" className="py-12 sm:py-20 bg-black/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-500 mb-4 font-mono">
              {">"} Projects
            </h2>
            <p className="text-base sm:text-xl text-gray-300 max-w-2xl mx-auto">
              A selection of my work. More available on GitHub.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {/* Other Projects toggle */}
          {otherProjects.length > 0 && (
            <div className="mt-10">
              <button
                onClick={() => setShowAll(!showAll)}
                className="mx-auto flex items-center gap-2 text-gray-400 hover:text-green-500 transition-colors font-mono text-sm border border-green-500/20 px-4 py-2 rounded-lg hover:border-green-500/40"
              >
                {showAll ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                {showAll ? 'Show Less' : `Show ${otherProjects.length} More Projects`}
              </button>
              {showAll && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={containerVariants}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-8"
                >
                  {otherProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </motion.div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;