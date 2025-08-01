import React, { useState, useEffect } from 'react';
import type { NavigationProps } from '../../../types';
import UNSCLogo from '../../../assets/UNSC Logo.svg';
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

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
        onMobileMenuToggle?.();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const nav = document.querySelector('.navigation');
      if (isMenuOpen && nav && !nav.contains(e.target as Node)) {
        setIsMenuOpen(false);
        onMobileMenuToggle?.();
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('click', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isMenuOpen, onMobileMenuToggle]);

  const handleSectionClick = (sectionId: string) => {
    onSectionChange(sectionId);
    setIsMenuOpen(false);
    onMobileMenuToggle?.();
    
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 80;
      const elementPosition = element.offsetTop - navHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  const toggleMobileMenu = () => {
    const newState = !isMenuOpen;
    setIsMenuOpen(newState);
    onMobileMenuToggle?.();
  };

  return (
    <nav className="navigation">
      <div className="navigation__container">
        <div className="navigation__brand">
          <button 
            className="navigation__logo-button"
            onClick={() => handleSectionClick('home')}
            aria-label="Ir al inicio"
          >
            <img 
              src={UNSCLogo} 
              alt="UNSC Logo" 
              className="navigation__logo"
            />
          </button>
        </div>

        <button 
          className={`navigation__mobile-toggle ${isMenuOpen ? 'navigation__mobile-toggle--active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
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