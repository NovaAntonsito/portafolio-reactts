import { useState, useEffect } from 'react';

export const useActiveSection = (sections: string[] = ['home', 'about', 'music', 'contact']) => {
  const [activeSection, setActiveSection] = useState<string>('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Offset for navigation height

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

    // Set initial active section based on hash
    const hash = window.location.hash.replace('#', '');
    if (hash && sections.includes(hash)) {
      setActiveSection(hash);
    }

    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sections]);

  const navigateToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    
    // Update URL hash without triggering page reload
    window.history.pushState(null, '', `#${sectionId}`);
    
    // Scroll to section
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return {
    activeSection,
    navigateToSection,
    setActiveSection
  };
};