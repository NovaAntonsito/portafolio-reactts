import type { FC } from 'react';
import { Suspense, lazy, useEffect } from 'react';
import { Router, Layout, Navigation, ErrorBoundary } from './components/common';
import { Loading } from './components/ui';
import { useActiveSection } from './hooks';
import { logPerformanceMetrics } from './utils/performance';
import type { Technology, SocialLink, ContactForm } from './types';
import miFoto from './assets/mifoto.png';
import './App.css';

const Home = lazy(() => import('./components/sections/Home/Home'));
const About = lazy(() => import('./components/sections/About/About'));
const Music = lazy(() => import('./components/sections/Music/Music'));
const Contact = lazy(() => import('./components/sections/Contact/Contact'));

const App: FC = () => {
  const { activeSection, navigateToSection } = useActiveSection();

  useEffect(() => {
    const timer = setTimeout(() => {
      logPerformanceMetrics();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

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

  const socialLinks: SocialLink[] = [
    {
      platform: 'instagram',
      url: 'https://www.instagram.com/novaantonsito.16',
      username: 'novaantonsito.16'
    },
    {
      platform: 'linkedin',
      url: 'https://www.linkedin.com/in/marcos-ant%C3%B3n-b18b66239/',
      username: 'Marcos Anton'
    },
    {
      platform: 'github',
      url: 'https://github.com/NovaAntonsito',
      username: 'NovaAntonsito'
    }
  ];

  const handleContactFormSubmit = (formData: ContactForm) => {
    console.log('Contact form submitted:', formData);
    alert('¡Mensaje enviado correctamente! Te contactaré pronto.');
  };

  return (
    <ErrorBoundary>
      <Router>
        <Layout>
          <Navigation
            activeSection={activeSection}
            onSectionChange={navigateToSection}
          />

          <main className="main-content" data-active-section={activeSection}>
            <ErrorBoundary>
              <Suspense fallback={<Loading />}>
                <Home
                  name="Marcos Anton"
                  title="Backend Developer"
                  description="Hola!, soy Marcos Anton y soy un Backend developer. Siempre con ganas de aprender cosas nuevas, ya sean metodologías o nuevas tecnologías."
                  profileImage={miFoto}
                />
              </Suspense>
            </ErrorBoundary>

            <ErrorBoundary>
              <Suspense fallback={<Loading />}>
                <About
                  content={aboutContent}
                  technologies={technologies}
                />
              </Suspense>
            </ErrorBoundary>

            <ErrorBoundary>
              <Suspense fallback={<Loading />}>
                <Music />
              </Suspense>
            </ErrorBoundary>

            <ErrorBoundary>
              <Suspense fallback={<Loading />}>
                <Contact
                  socialLinks={socialLinks}
                  onFormSubmit={handleContactFormSubmit}
                />
              </Suspense>
            </ErrorBoundary>
          </main>
        </Layout>
      </Router>
    </ErrorBoundary>
  );
};

export default App
