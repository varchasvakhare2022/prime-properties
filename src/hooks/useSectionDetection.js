import { useState, useEffect, useRef } from 'react';

const useSectionDetection = (sections) => {
  const [activeSection, setActiveSection] = useState('default');
  const observerRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '-20% 0px -20% 0px',
      threshold: 0.5,
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionName = entry.target.dataset.section;
          if (sectionName) {
            setActiveSection(sectionName);
          }
        }
      });
    }, options);

    // Observe all sections
    sections.forEach((sectionId) => {
      const element = document.querySelector(`[data-section="${sectionId}"]`);
      if (element && observerRef.current) {
        observerRef.current.observe(element);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [sections]);

  return activeSection;
};

export default useSectionDetection;

