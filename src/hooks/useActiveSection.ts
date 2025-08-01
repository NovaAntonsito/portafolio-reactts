import { useState, useEffect } from 'react';

export const useActiveSection = (sections: string[] = ['home', 'about', 'music', 'contact']) => {
  const [activeSection, setActiveSection] = useState<string>('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    const hash = window.location.hash.replace('#', '');
    if (hash && sections.includes(hash)) {
      setActiveSection(hash);
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sections]);

  const navigateToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    
    window.history.pushState(null, '', `#${sectionId}`);
    
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 80;
      const elementPosition = element.offsetTop - navHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
      
      element.classList.add('section-enter');
      setTimeout(() => {
        element.classList.add('section-enter-active');
      }, 50);
      
      setTimeout(() => {
        element.classList.remove('section-enter', 'section-enter-active');
      }, 1000);
    }
  };

  return {
    activeSection,
    navigateToSection,
    setActiveSection
  };
};