'use client';

import { certifications } from '@/data/portfolio';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Certifications = () => {
  return (
    <section id="certifications" className="py-20 bg-black/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-6xl mx-auto"
        >
          <motion.div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-green-500 mb-4 font-mono">
              {">"} Certifications
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              My professional certifications and specializations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <motion.a
                key={cert.id}
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-900/50 backdrop-blur-sm border border-green-500/20 rounded-lg p-6 flex flex-col hover:border-green-400 transition-colors duration-300 group"
              >
                <div className="relative w-full h-40 mb-4 rounded-md overflow-hidden">
                  <Image
                    src={cert.image}
                    alt={`${cert.name} certificate`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-xl font-semibold text-orange-400 mb-2 flex-grow">{cert.name}</h3>
                <p className="text-gray-400 text-sm">{cert.issuer}</p>
                <p className="text-gray-500 text-xs mt-1">{cert.date}</p>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;
