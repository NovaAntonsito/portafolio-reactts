import type { FC } from 'react';
import type { HomeProps } from '../../../types';
import './Home.scss';

const Home: FC<HomeProps> = ({ 
  profileImage, 
  description, 
  name, 
  title 
}) => {
  return (
    <section id="home" className="home section">
      <div className="container">
        <div className="home__content">
          <div className="home__image-container">
            <div className="home__image-wrapper">
              {profileImage ? (
                <img 
                  src={profileImage} 
                  alt={`${name} - ${title}`}
                  className="home__image"
                />
              ) : (
                <div className="home__image-placeholder">
                  <div className="home__image-placeholder-icon">
                    <svg 
                      width="80" 
                      height="80" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path 
                        d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" 
                        fill="currentColor"
                      />
                      <path 
                        d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z" 
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </div>
              )}
              <div className="home__image-glow"></div>
            </div>
          </div>
          
          <div className="home__text-content">
            <div className="home__greeting">
              <h1 className="home__title">
                <span className="home__title-greeting">Hola!</span>
                <span className="home__title-name">Soy {name}</span>
              </h1>
              <h2 className="home__subtitle">{title}</h2>
            </div>
            
            <div className="home__description">
              <p className="home__description-text">{description}</p>
            </div>
            
            <div className="home__cta">
              <button 
                className="home__cta-button" 
                type="button"
                onClick={() => {
                  const aboutSection = document.getElementById('about');
                  aboutSection?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span className="home__cta-text">Conoce más sobre mí</span>
                <div className="home__cta-glow"></div>
              </button>
            </div>
            
            <div className="home__social-preview">
              <div className="home__social-preview-text">Sígueme en:</div>
              <div className="home__social-preview-links">
                <a 
                  href="#contact" 
                  className="home__social-link"
                  onClick={(e) => {
                    e.preventDefault();
                    const contactSection = document.getElementById('contact');
                    contactSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <span className="home__social-link-text">LinkedIn</span>
                  <div className="home__social-link-glow"></div>
                </a>
                <a 
                  href="#contact" 
                  className="home__social-link"
                  onClick={(e) => {
                    e.preventDefault();
                    const contactSection = document.getElementById('contact');
                    contactSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <span className="home__social-link-text">GitHub</span>
                  <div className="home__social-link-glow"></div>
                </a>
                <a 
                  href="#contact" 
                  className="home__social-link"
                  onClick={(e) => {
                    e.preventDefault();
                    const contactSection = document.getElementById('contact');
                    contactSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <span className="home__social-link-text">Instagram</span>
                  <div className="home__social-link-glow"></div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Animated background elements */}
      <div className="home__bg-elements">
        <div className="home__bg-grid"></div>
        <div className="home__bg-particles">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className={`home__particle home__particle--${i + 1}`}></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;