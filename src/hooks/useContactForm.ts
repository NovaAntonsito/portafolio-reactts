import { useState, useCallback } from 'react';
import type { ContactForm, ContactFormErrors, ContactFormState } from '../types';

const initialFormValues: ContactForm = {
  name: '',
  email: '',
  message: ''
};

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateForm = (values: ContactForm): ContactFormErrors => {
  const errors: ContactFormErrors = {};

  // Name validation
  if (!values.name.trim()) {
    errors.name = 'El nombre es requerido';
  } else if (values.name.trim().length < 2) {
    errors.name = 'El nombre debe tener al menos 2 caracteres';
  }

  // Email validation
  if (!values.email.trim()) {
    errors.email = 'El email es requerido';
  } else if (!validateEmail(values.email)) {
    errors.email = 'Por favor ingresa un email válido';
  }

  // Message validation
  if (!values.message.trim()) {
    errors.message = 'El mensaje es requerido';
  } else if (values.message.trim().length < 10) {
    errors.message = 'El mensaje debe tener al menos 10 caracteres';
  }

  return errors;
};

export const useContactForm = (onSubmit?: (formData: ContactForm) => void) => {
  const [formState, setFormState] = useState<ContactFormState>({
    values: initialFormValues,
    errors: {},
    isSubmitting: false,
    isSubmitted: false
  });

  const updateField = useCallback((field: keyof ContactForm, value: string) => {
    setFormState(prev => ({
      ...prev,
      values: {
        ...prev.values,
        [field]: value
      },
      // Clear field error when user starts typing
      errors: {
        ...prev.errors,
        [field]: undefined
      }
    }));
  }, []);

  const validateField = useCallback((field: keyof ContactForm) => {
    const fieldErrors = validateForm(formState.values);
    setFormState(prev => ({
      ...prev,
      errors: {
        ...prev.errors,
        [field]: fieldErrors[field]
      }
    }));
  }, [formState.values]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors = validateForm(formState.values);
    const hasErrors = Object.keys(errors).length > 0;

    setFormState(prev => ({
      ...prev,
      errors,
      isSubmitting: !hasErrors
    }));

    if (!hasErrors) {
      try {
        if (onSubmit) {
          await onSubmit(formState.values);
        }
        
        // Simulate form submission delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setFormState(prev => ({
          ...prev,
          isSubmitting: false,
          isSubmitted: true
        }));

        // Reset form after successful submission
        setTimeout(() => {
          setFormState({
            values: initialFormValues,
            errors: {},
            isSubmitting: false,
            isSubmitted: false
          });
        }, 3000);
      } catch (error) {
        setFormState(prev => ({
          ...prev,
          isSubmitting: false,
          errors: {
            message: 'Error al enviar el mensaje. Por favor intenta nuevamente.'
          }
        }));
      }
    }
  }, [formState.values, onSubmit]);

  const resetForm = useCallback(() => {
    setFormState({
      values: initialFormValues,
      errors: {},
      isSubmitting: false,
      isSubmitted: false
    });
  }, []);

  return {
    values: formState.values,
    errors: formState.errors,
    isSubmitting: formState.isSubmitting,
    isSubmitted: formState.isSubmitted,
    updateField,
    validateField,
    handleSubmit,
    resetForm
  };
};