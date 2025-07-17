'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { personalInfo } from '@/data/portfolio';

const Contact = () => {


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
    <section id="contact" className="py-20 bg-black/50">
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
              {">"} Contact
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Let&apos;s connect and discuss how we can work together
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div variants={itemVariants}>
              <div className="bg-gray-900/50 backdrop-blur-sm border border-green-500/20 rounded-lg p-8">
                <h3 className="text-2xl font-bold text-green-500 mb-6 font-mono">
                  Get In Touch
                </h3>
                
                <div className="space-y-6">
                  {/* Email */}
                  <div className="flex items-center space-x-4">
                    <div className="bg-green-500/20 p-3 rounded-lg">
                      <Mail className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-orange-400 font-mono">
                        Email
                      </h4>
                      <a
                        href={`mailto:${personalInfo.email}`}
                        className="text-gray-300 hover:text-green-500 transition-colors duration-200"
                      >
                        {personalInfo.email}
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center space-x-4">
                    <div className="bg-green-500/20 p-3 rounded-lg">
                      <Phone className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-orange-400 font-mono">
                        Phone
                      </h4>
                      <p className="text-gray-300">{personalInfo.phone}</p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center space-x-4">
                    <div className="bg-green-500/20 p-3 rounded-lg">
                      <MapPin className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-orange-400 font-mono">
                        Location
                      </h4>
                      <p className="text-gray-300">{personalInfo.location}</p>
                    </div>
                  </div>
                </div>

                {/* Response Time */}
                <div className="mt-8 bg-black/30 rounded-lg p-4 border border-green-500/20">
                  <h4 className="text-lg font-bold text-green-500 mb-2 font-mono">
                    Response Time
                  </h4>
                  <p className="text-gray-300 text-sm">
                    I typically respond to emails within 24-48 hours. For urgent matters, 
                    feel free to reach out via LinkedIn for a faster response.
                  </p>
                </div>

                {/* Terminal Display */}
                <div className="mt-8 bg-black/70 border border-green-500/20 rounded-lg p-4 font-mono text-sm">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="text-green-500">
                    <span className="text-gray-400">$</span> ping ommprakash.cloud
                  </div>
                  <div className="text-gray-400 mt-1">
                    PING ommprakash.cloud: 56 data bytes
                  </div>
                  <div className="text-green-500 mt-1">
                    64 bytes from ommprakash.cloud: icmp_seq=0 time=1ms
                  </div>
                  <div className="text-gray-400 mt-1">
                    --- Connection established ---
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <div className="bg-gray-900/50 backdrop-blur-sm border border-green-500/20 rounded-lg p-8">
                <h3 className="text-2xl font-bold text-green-500 mb-6 font-mono">
                  Send Message
                </h3>
                
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const data = new FormData(form);
                    const btn = form.querySelector('button[type="submit"]');
                    if (btn) btn.disabled = true;
                    try {
                      await fetch('https://formspree.io/f/xwpqplwo', {
                        method: 'POST',
                        body: data,
                        headers: { Accept: 'application/json' },
                      });
                      form.classList.add('submitted');
                      if (btn) btn.classList.add('submitted');
                    } catch {}
                  }}
                  className="space-y-6"
                >
                  {/* Name */}
                  <div>
                    <label className="block text-green-500 font-mono mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full bg-black/50 border border-green-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-green-500 focus:outline-none transition-colors duration-200"
                      placeholder="Your Name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-green-500 font-mono mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full bg-black/50 border border-green-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-green-500 focus:outline-none transition-colors duration-200"
                      placeholder="your@email.com"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-green-500 font-mono mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      required
                      className="w-full bg-black/50 border border-green-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-green-500 focus:outline-none transition-colors duration-200"
                      placeholder="Subject"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-green-500 font-mono mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={6}
                      className="w-full bg-black/50 border border-green-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-green-500 focus:outline-none transition-colors duration-200 resize-none"
                      placeholder="Your message..."
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-green-500 text-black px-6 py-3 rounded-lg font-mono font-bold hover:bg-green-400 transition-colors duration-200 flex items-center justify-center space-x-2 submit-btn"
                  >
                    <span className="btn-content flex items-center justify-center space-x-2">
                      <Send className="w-5 h-5 send-icon" />
                      <span>Send Message</span>
                    </span>
                    <span className="btn-success hidden items-center justify-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-white" />
                      <span>Submitted</span>
                    </span>
                  </motion.button>

                  {/* Status handled by button state, no redirect */}
                </form>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;