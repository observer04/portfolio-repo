'use client';

import { useState, useEffect, useRef } from 'react';
import About from '@/components/About';
import AIAgents from '@/components/AIAgents';
import Contact from '@/components/Contact';
import Certifications from '@/components/Certifications';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import TerminalHeader from '@/components/TerminalHeader';

export default function Home() {
  const [activeSection, setActiveSection] = useState('hero');
  const sectionRefs = {
    hero: useRef<HTMLDivElement>(null),
    'ai-agents': useRef<HTMLDivElement>(null),
    projects: useRef<HTMLDivElement>(null),
    certifications: useRef<HTMLDivElement>(null),
    skills: useRef<HTMLDivElement>(null),
    whoami: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -70% 0px' }
    );

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      Object.values(sectionRefs).forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  return (
    <main className="flex h-screen flex-col items-center justify-center p-8 bg-gray-900 text-white">
      <div className="terminal-container w-full h-full max-w-7xl flex flex-col">
        <TerminalHeader activeSection={activeSection} />
        <div className="terminal-content flex-grow overflow-y-auto">
          <div id="hero" ref={sectionRefs.hero}>
            <Hero />
          </div>
          <div id="ai-agents" ref={sectionRefs['ai-agents']}>
            <AIAgents />
          </div>
          <div id="projects" ref={sectionRefs.projects}>
            <Projects />
          </div>
          <div id="certifications" ref={sectionRefs.certifications}>
            <Certifications />
          </div>
          <div id="skills" ref={sectionRefs.skills}>
            <Skills />
          </div>
          <div id="whoami" ref={sectionRefs.whoami}>
            <About />
          </div>
          <div id="contact" ref={sectionRefs.contact}>
            <Contact />
          </div>
          <Footer />
        </div>
      </div>
    </main>
  );
}
