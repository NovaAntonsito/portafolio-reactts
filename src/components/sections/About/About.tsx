import type { FC } from 'react';
import type { AboutProps } from '../../../types';
import { TechnologyCard } from './TechnologyCard';
import './About.scss';

export const About: FC<AboutProps> = ({ content, technologies }) => {
  // Group technologies by category
  const groupedTechnologies = technologies.reduce((acc, tech) => {
    if (!acc[tech.category]) {
      acc[tech.category] = [];
    }
    acc[tech.category].push(tech);
    return acc;
  }, {} as Record<string, typeof technologies>);

  const categoryLabels = {
    backend: 'Backend',
    frontend: 'Frontend', 
    devops: 'DevOps',
    database: 'Base de Datos'
  };

  return (
    <section id="about" className="about section">
      <div className="about__container">
        <div className="about__header">
          <h2 className="about__title">Acerca de mí</h2>
        </div>
        
        <div className="about__content">
          <div className="about__text">
            <p className="about__description">{content}</p>
          </div>
          
          <div className="about__technologies">
            <h3 className="about__technologies-title">Tecnologías</h3>
            
            <div className="about__tech-grid">
              {Object.entries(groupedTechnologies).map(([category, techs]) => (
                <div key={category} className="about__tech-category">
                  <h4 className="about__category-title">
                    {categoryLabels[category as keyof typeof categoryLabels]}
                  </h4>
                  
                  <div className="about__tech-list">
                    {techs.map((tech) => (
                      <TechnologyCard 
                        key={tech.name}
                        technology={tech}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};