'use client';

import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import About from '@/components/About';
import AIAgents from '@/components/AIAgents';
import Contact from '@/components/Contact';
import Certifications from '@/components/Certifications';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import TerminalHeader from '@/components/TerminalHeader';

const AccretionDisk = lazy(() => import('@/components/AccretionDisk'));

export default function Home() {
  const [activeSection, setActiveSection] = useState('hero');
  const terminalContentRef = useRef<HTMLDivElement>(null);
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
    const scrollContainer = terminalContentRef.current;
    if (!scrollContainer) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { root: scrollContainer, rootMargin: '-30% 0px -70% 0px' }
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
    <>
      {/* Three.js Accretion Disk Background */}
      <Suspense fallback={<div className="fixed inset-0 bg-black z-[-1]" />}>
        <AccretionDisk />
      </Suspense>

      <main className="flex h-screen flex-col items-center justify-center p-2 sm:p-4 md:p-8 bg-transparent text-white relative z-10">
        <div className="terminal-container w-full h-full max-w-7xl flex flex-col overflow-hidden">
          <TerminalHeader activeSection={activeSection} />
          <div
            ref={terminalContentRef}
            className="terminal-content flex-grow overflow-y-auto overflow-x-hidden"
          >
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
    </>
  );
}
