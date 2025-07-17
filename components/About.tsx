const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            About Me
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-700">
                I&apos;m a passionate Full Stack Developer with over 5 years of experience 
                creating digital solutions that make a difference. My journey in web 
                development started with a curiosity about how things work on the internet, 
                and it has evolved into a love for creating seamless user experiences.
              </p>
              
              <p className="text-lg text-gray-700">
                I specialize in modern web technologies including React, Next.js, Node.js, 
                and cloud platforms. I believe in writing clean, maintainable code and 
                following best practices to deliver high-quality applications.
              </p>
              
              <p className="text-lg text-gray-700">
                When I&apos;m not coding, you can find me exploring new technologies, 
                contributing to open-source projects, or sharing knowledge with the 
                developer community through blog posts and tutorials.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                What I Do
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <h4 className="font-medium text-gray-900">Frontend Development</h4>
                    <p className="text-gray-600">Building responsive and interactive user interfaces</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-secondary rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <h4 className="font-medium text-gray-900">Backend Development</h4>
                    <p className="text-gray-600">Creating robust APIs and server-side applications</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-accent rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <h4 className="font-medium text-gray-900">Full Stack Solutions</h4>
                    <p className="text-gray-600">End-to-end development from concept to deployment</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;