import { skills } from '@/data/skills';

const Skills = () => {
  const categories = ['Frontend', 'Backend', 'Tools'];

  return (
    <section id="skills" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Skills & Technologies
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <div key={category} className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
                  {category}
                </h3>
                
                <div className="space-y-4">
                  {skills
                    .filter(skill => skill.category === category)
                    .map((skill) => (
                      <div key={skill.name} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700 font-medium">
                            {skill.name}
                          </span>
                          <span className="text-primary font-semibold">
                            {skill.level}%
                          </span>
                        </div>
                        
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-600 max-w-2xl mx-auto">
              I&apos;m always learning and exploring new technologies to stay current with 
              the latest trends in web development. These percentages represent my 
              current proficiency and comfort level with each technology.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;