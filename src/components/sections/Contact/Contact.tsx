import React from 'react';
import { ContactForm } from './ContactForm';
import { SocialLinks } from './SocialLinks';
import type { ContactProps } from '../../../types';
import './Contact.scss';

const Contact: React.FC<ContactProps> = ({ socialLinks, onFormSubmit }) => {
  return (
    <section id="contact" className="contact">
      <div className="contact__container">
        <div className="contact__header">
          <h1 className="contact__title">Contacto</h1>
          <p className="contact__subtitle">
            ¿Listo para crear algo increíble juntos?
          </p>
        </div>

        <div className="contact__content">
          <div className="contact__form-section">
            <ContactForm onSubmit={onFormSubmit} />
          </div>

          <div className="contact__social-section">
            <SocialLinks socialLinks={socialLinks} />
          </div>
        </div>

        <div className="contact__footer">
          <p className="contact__footer-text">
            Siempre estoy abierto a nuevas oportunidades y colaboraciones.
          </p>
        </div>
      </div>

      {/* Cyberpunk background effects */}
      <div className="contact__bg-effects">
        <div className="contact__bg-grid"></div>
        <div className="contact__bg-glow contact__bg-glow--top"></div>
        <div className="contact__bg-glow contact__bg-glow--bottom"></div>
      </div>
    </section>
  );
};

export default Contact;