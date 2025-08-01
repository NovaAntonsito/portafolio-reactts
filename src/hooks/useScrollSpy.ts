import { useState, useEffect, useCallback } from 'react';

interface UseScrollSpyOptions {
  sectionIds: string[];
  offset?: number;
  rootMargin?: string;
  threshold?: number;
}

export const useScrollSpy = ({
  sectionIds,
  offset = 100,
  rootMargin = '0px 0px -50% 0px',
  threshold = 0.1
}: UseScrollSpyOptions) => {
  const [activeSection, setActiveSection] = useState<string>('');
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const newVisibleSections = new Set(visibleSections);
        
        entries.forEach((entry) => {
          const sectionId = entry.target.id;
          
          if (entry.isIntersecting) {
            newVisibleSections.add(sectionId);
          } else {
            newVisibleSections.delete(sectionId);
          }
        });
        
        setVisibleSections(newVisibleSections);
        
        for (const sectionId of sectionIds) {
          if (newVisibleSections.has(sectionId)) {
            setActiveSection(sectionId);
            break;
          }
        }
      },
      {
        rootMargin,
        threshold
      }
    );

    const elements = sectionIds
      .map(id => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    elements.forEach(element => observer.observe(element));

    return () => {
      elements.forEach(element => observer.unobserve(element));
    };
  }, [sectionIds, rootMargin, threshold, visibleSections]);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      const handleScroll = () => {
        const scrollPosition = window.scrollY + offset;
        
        for (const sectionId of sectionIds) {
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

      const globalWindow = window as Window & typeof globalThis;
      globalWindow.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();

      return () => {
        globalWindow.removeEventListener('scroll', handleScroll);
      };
    }
  }, [sectionIds, offset]);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && sectionIds.includes(hash)) {
      setActiveSection(hash);
    } else {
      if (sectionIds.length > 0) {
        setActiveSection(sectionIds[0]);
      }
    }
  }, [sectionIds]);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const elementPosition = element.offsetTop - offset;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
      
      window.history.pushState(null, '', `#${sectionId}`);
      setActiveSection(sectionId);
    }
  }, [offset]);

  const isVisible = useCallback((sectionId: string) => {
    return visibleSections.has(sectionId);
  }, [visibleSections]);

  const getProgress = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) return 0;

    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    if (rect.top > windowHeight) return 0;
    if (rect.bottom < 0) return 1;
    
    const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
    const totalHeight = rect.height;
    
    return Math.max(0, Math.min(1, visibleHeight / totalHeight));
  }, []);

  return {
    activeSection,
    visibleSections: Array.from(visibleSections),
    scrollToSection,
    isVisible,
    getProgress
  };
};