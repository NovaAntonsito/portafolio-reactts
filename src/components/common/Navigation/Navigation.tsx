import React, { useState } from 'react';
import type { NavigationProps } from '../../../types';
import './Navigation.scss';

const Navigation: React.FC<NavigationProps> = ({ 
  activeSection, 
  onSectionChange,
  isMobileMenuOpen = false,
  onMobileMenuToggle
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(isMobileMenuOpen);

  const sections = [
    { id: 'home', label: 'Inicio' },
    { id: 'about', label: 'Acerca de mí' },
    { id: 'music', label: 'Música' },
    { id: 'contact', label: 'Contacto' }
  ];

  const handleSectionClick = (sectionId: string) => {
    onSectionChange(sectionId);
    setIsMenuOpen(false);
    
    // Smooth scroll to section
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    onMobileMenuToggle?.();
  };

  return (
    <nav className="navigation">
      <div className="navigation__container">
        {/* Logo/Brand */}
        <div className="navigation__brand">
          <span className="navigation__logo">MA</span>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className={`navigation__mobile-toggle ${isMenuOpen ? 'navigation__mobile-toggle--active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation Menu */}
        <ul className={`navigation__menu ${isMenuOpen ? 'navigation__menu--open' : ''}`}>
          {sections.map((section) => (
            <li key={section.id} className="navigation__item">
              <button
                className={`navigation__link ${
                  activeSection === section.id ? 'navigation__link--active' : ''
                }`}
                onClick={() => handleSectionClick(section.id)}
              >
                {section.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;