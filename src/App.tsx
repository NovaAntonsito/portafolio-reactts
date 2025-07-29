import type { FC } from 'react';
import { Router, Layout, Navigation } from './components/common';
import { Home, About } from './components/sections';
import { useActiveSection } from './hooks';
import type { Technology } from './types';
import './App.css';

const App: FC = () => {
  const { activeSection, navigateToSection } = useActiveSection();

  // About section data based on requirements
  const aboutContent = "Como desarrollador backend, me especializo en crear soluciones robustas y escalables. Mi experiencia abarca desde el desarrollo de APIs hasta la implementación de arquitecturas de microservicios. Además de mi pasión por la tecnología, tengo un gran amor por la música, que me inspira y me ayuda a mantener la creatividad en mis proyectos.";
  
  const technologies: Technology[] = [
    { name: 'Java (Spring Boot)', category: 'backend', proficiency: 'advanced' },
    { name: 'Node.JS (Nestjs)', category: 'backend', proficiency: 'advanced' },
    { name: 'Node.JS (Express)', category: 'backend', proficiency: 'advanced' },
    { name: '.NET (ASP.NET)', category: 'backend', proficiency: 'intermediate' },
    { name: 'Docker', category: 'devops', proficiency: 'advanced' },
    { name: 'Kubernetes', category: 'devops', proficiency: 'intermediate' },
    { name: 'SQL', category: 'database', proficiency: 'advanced' },
  ];

  return (
    <Router>
      <Layout>
        <Navigation 
          activeSection={activeSection}
          onSectionChange={navigateToSection}
        />
        
        <main className="main-content">
          <Home 
            name="Marcos Anton"
            title="Backend Developer"
            description="Hola!, soy Marcos Anton y soy un Backend developer. Siempre con ganas de aprender cosas nuevas, ya sean metodologías o nuevas tecnologías."
          />

          <About 
            content={aboutContent}
            technologies={technologies}
          />

          <section id="music" className="section">
            <div className="section__content">
              <h1>Música</h1>
              <p>Reproductor de música...</p>
            </div>
          </section>

          <section id="contact" className="section">
            <div className="section__content">
              <h1>Contacto</h1>
              <p>Formulario de contacto y redes sociales...</p>
            </div>
          </section>
        </main>
      </Layout>
    </Router>
  );
};

export default App
