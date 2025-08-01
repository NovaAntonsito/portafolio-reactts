import React from 'react';
import { FormInput, Button } from '../../ui';
import { useContactForm } from '../../../hooks/useContactForm';
import type { ContactForm as ContactFormData } from '../../../types';
import './ContactForm.scss';

interface ContactFormProps {
  onSubmit?: (formData: ContactFormData) => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({ onSubmit }) => {
  const {
    values,
    errors,
    isSubmitting,
    isSubmitted,
    updateField,
    handleSubmit
  } = useContactForm(onSubmit);

  if (isSubmitted) {
    return (
      <div className="contact-form contact-form--success">
        <div className="contact-form__success-message">
          <h3>¡Mensaje enviado!</h3>
          <p>Gracias por contactarme. Te responderé pronto.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-form">
      <div className="contact-form__header">
        <h2 className="contact-form__title">Envíame un mensaje</h2>
        <p className="contact-form__subtitle">
          ¿Tienes un proyecto en mente? ¡Hablemos!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="contact-form__form">
        <FormInput
          label="Nombre"
          name="name"
          type="text"
          value={values.name}
          onChange={(value) => updateField('name', value)}
          error={errors.name}
          placeholder="Tu nombre completo"
          required
        />

        <FormInput
          label="Email"
          name="email"
          type="email"
          value={values.email}
          onChange={(value) => updateField('email', value)}
          error={errors.email}
          placeholder="tu@email.com"
          required
        />

        <FormInput
          label="Mensaje"
          name="message"
          type="textarea"
          value={values.message}
          onChange={(value) => updateField('message', value)}
          error={errors.message}
          placeholder="Cuéntame sobre tu proyecto o idea..."
          required
        />

        <div className="contact-form__actions">
          <Button
            type="submit"
            variant="primary"
            size="large"
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
          </Button>
        </div>
      </form>
    </div>
  );
};