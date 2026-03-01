'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Bot, ExternalLink, Zap, CheckCircle, Clock } from 'lucide-react';
import { aiAgents } from '@/data/portfolio';

const AIAgents = () => {
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
    <section id="ai-agents" className="py-12 sm:py-20 bg-black/50">
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
              {">"} AI Agents
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Intelligent solutions powered by artificial intelligence
            </p>
          </motion.div>

          {/* AI Agents Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {aiAgents.map((agent) => (
              <motion.div
                key={agent.id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-gray-900/50 backdrop-blur-sm border border-green-500/20 rounded-lg p-6 hover:border-green-500/40 transition-colors duration-300 group"
              >
                {/* Agent Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Bot className="w-8 h-8 text-orange-400" />
                    {agent.url === '#' && (
                      <Clock className="w-5 h-5 text-yellow-400" />
                    )}
                  </div>
                  {agent.url !== '#' && (
                    <motion.a
                      href={agent.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      className="text-gray-400 hover:text-green-500 transition-colors duration-200"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </motion.a>
                  )}
                </div>

                {/* Agent Content */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-green-500 mb-3 font-mono group-hover:text-orange-400 transition-colors duration-200">
                    {agent.name}
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    {agent.description}
                  </p>
                  
                  {/* Status Badge */}
                  {agent.url === '#' ? (
                    <div className="inline-flex items-center space-x-2 bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 px-3 py-1 rounded-full text-sm font-mono mb-4">
                      <Clock className="w-4 h-4" />
                      <span>Coming Soon</span>
                    </div>
                  ) : (
                    <div className="inline-flex items-center space-x-2 bg-green-500/20 border border-green-500/30 text-green-400 px-3 py-1 rounded-full text-sm font-mono mb-4">
                      <CheckCircle className="w-4 h-4" />
                      <span>Live</span>
                    </div>
                  )}
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-lg font-bold text-green-500 mb-3 font-mono">
                    Key Features:
                  </h4>
                  <ul className="space-y-2">
                    {agent.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: featureIndex * 0.1 }}
                        className="flex items-start space-x-2"
                      >
                        <Zap className="w-4 h-4 text-orange-400 mt-1 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">
                          {feature}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div className="mb-6">
                  <h4 className="text-lg font-bold text-green-500 mb-3 font-mono">
                    Technologies:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {agent.technologies.map((tech, techIndex) => (
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
                </div>

                {/* Action Button */}
                <div className="pt-4 border-t border-green-500/20">
                  {agent.url !== '#' ? (
                    <motion.a
                      href={agent.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center space-x-2 bg-green-500 text-black px-4 py-2 rounded-lg font-mono font-bold hover:bg-green-400 transition-colors duration-200"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Try Now</span>
                    </motion.a>
                  ) : (
                    <div className="inline-flex items-center space-x-2 bg-gray-600 text-gray-300 px-4 py-2 rounded-lg font-mono font-bold cursor-not-allowed">
                      <Clock className="w-4 h-4" />
                      <span>In Development</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Future Plans */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-16"
          >
            <div className="bg-gray-900/50 backdrop-blur-sm border border-green-500/20 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-green-500 mb-4 font-mono">
                Future AI Developments
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                I&apos;m constantly exploring new AI technologies and building innovative solutions. 
                Stay tuned for more exciting AI agents and tools!
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <span className="bg-black/50 border border-green-500/30 text-green-500 px-3 py-1 rounded-full font-mono">
                  Reinforcement Learning
                </span>
                <span className="bg-black/50 border border-green-500/30 text-green-500 px-3 py-1 rounded-full font-mono">
                  Adversarial AI
                </span>
                <span className="bg-black/50 border border-green-500/30 text-green-500 px-3 py-1 rounded-full font-mono">
                  LangGraph
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AIAgents;