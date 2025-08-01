import { useState, useCallback } from 'react';
import type { AppError } from '../types';

interface ErrorState {
  error: AppError | string | null;
  message?: string;
  isVisible: boolean;
}

const initialErrorState: ErrorState = {
  error: null,
  message: undefined,
  isVisible: false
};

export const useErrorHandler = () => {
  const [errorState, setErrorState] = useState<ErrorState>(initialErrorState);

  const showError = useCallback((error: AppError | string, message?: string) => {
    setErrorState({
      error,
      message,
      isVisible: true
    });
  }, []);

  const clearError = useCallback(() => {
    setErrorState(initialErrorState);
  }, []);

  const handleError = useCallback((error: unknown, fallbackMessage?: string) => {
    if (error instanceof Error) {
      showError('UNKNOWN_ERROR', error.message);
    } else if (typeof error === 'string') {
      showError(error);
    } else {
      showError('UNKNOWN_ERROR', fallbackMessage || 'An unexpected error occurred');
    }
  }, [showError]);

  const handleNetworkError = useCallback((message?: string) => {
    showError('NETWORK_ERROR', message);
  }, [showError]);

  const handleSpotifyError = useCallback((message?: string) => {
    showError('SPOTIFY_CONNECTION_ERROR', message);
  }, [showError]);

  const handleFormError = useCallback((message?: string) => {
    showError('FORM_VALIDATION_ERROR', message);
  }, [showError]);

  return {
    error: errorState.error,
    message: errorState.message,
    isVisible: errorState.isVisible,
    showError,
    clearError,
    handleError,
    handleNetworkError,
    handleSpotifyError,
    handleFormError
  };
};