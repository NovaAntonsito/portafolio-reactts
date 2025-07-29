// Application state and general types

import type { MusicPlayerState } from './music';
import type { ContactForm } from './contact';

export type AppError = 
  | 'NETWORK_ERROR'
  | 'SPOTIFY_CONNECTION_ERROR'
  | 'FORM_VALIDATION_ERROR'
  | 'UNKNOWN_ERROR';

export interface AppState {
  activeSection: string;
  isLoading: boolean;
  musicPlayer: MusicPlayerState;
  contactForm: ContactForm;
  error?: {
    type: AppError;
    message: string;
  };
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}