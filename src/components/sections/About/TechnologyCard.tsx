import type { FC } from 'react';
import type { Technology } from '../../../types';

interface TechnologyCardProps {
  technology: Technology;
}

export const TechnologyCard: FC<TechnologyCardProps> = ({ technology }) => {
  const getProficiencyLevel = (proficiency: Technology['proficiency']) => {
    const levels = {
      beginner: 1,
      intermediate: 2, 
      advanced: 3,
      expert: 4
    };
    return levels[proficiency];
  };

  const proficiencyLevel = getProficiencyLevel(technology.proficiency);

  return (
    <div className="tech-card">
      <div className="tech-card__content">
        <h5 className="tech-card__name">{technology.name}</h5>
        
        <div className="tech-card__proficiency">
          <div className="tech-card__proficiency-bars">
            {[1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`tech-card__bar ${
                  level <= proficiencyLevel ? 'tech-card__bar--active' : ''
                }`}
              />
            ))}
          </div>
          <span className="tech-card__proficiency-label">
            {technology.proficiency}
          </span>
        </div>
      </div>
    </div>
  );
};