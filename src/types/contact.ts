// Contact-related interfaces and types

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export interface ContactFormState {
  values: ContactForm;
  errors: ContactFormErrors;
  isSubmitting: boolean;
  isSubmitted: boolean;
}