import React from 'react';
import type { AppError } from '../../../types';
import './ErrorMessage.scss';

interface ErrorMessageProps {
  error: string | AppError;
  message?: string;
  onRetry?: () => void;
  onDismiss?: () => void;
  variant?: 'inline' | 'toast' | 'modal';
  size?: 'small' | 'medium' | 'large';
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  error,
  message,
  onRetry,
  onDismiss,
  variant = 'inline',
  size = 'medium'
}) => {
  const getErrorMessage = (error: string | AppError): string => {
    if (typeof error === 'string') {
      return message || error;
    }

    const errorMessages: Record<AppError, string> = {
      NETWORK_ERROR: 'Connection failed. Check your network and try again.',
      SPOTIFY_CONNECTION_ERROR: 'Unable to connect to Spotify. Please check your connection.',
      FORM_VALIDATION_ERROR: 'Please check your input and try again.',
      UNKNOWN_ERROR: 'An unexpected error occurred. Please try again.'
    };

    return message || errorMessages[error] || 'An error occurred';
  };

  const getErrorIcon = (error: string | AppError): string => {
    if (typeof error === 'string') {
      return '⚠';
    }

    const errorIcons: Record<AppError, string> = {
      NETWORK_ERROR: '📡',
      SPOTIFY_CONNECTION_ERROR: '🎵',
      FORM_VALIDATION_ERROR: '📝',
      UNKNOWN_ERROR: '⚠'
    };

    return errorIcons[error] || '⚠';
  };

  const errorMessage = getErrorMessage(error);
  const errorIcon = getErrorIcon(error);

  return (
    <div className={`error-message error-message--${variant} error-message--${size}`}>
      <div className="error-message__container">
        <div className="error-message__icon">
          <span className="error-message__icon-symbol">{errorIcon}</span>
        </div>
        
        <div className="error-message__content">
          <p className="error-message__text">
            {errorMessage}
          </p>
          
          {(onRetry || onDismiss) && (
            <div className="error-message__actions">
              {onRetry && (
                <button 
                  className="error-message__button error-message__button--retry"
                  onClick={onRetry}
                >
                  <span className="error-message__button-text">RETRY</span>
                  <span className="error-message__button-glow"></span>
                </button>
              )}
              
              {onDismiss && (
                <button 
                  className="error-message__button error-message__button--dismiss"
                  onClick={onDismiss}
                >
                  <span className="error-message__button-text">DISMISS</span>
                  <span className="error-message__button-glow"></span>
                </button>
              )}
            </div>
          )}
        </div>
        
        {variant === 'toast' && onDismiss && (
          <button 
            className="error-message__close"
            onClick={onDismiss}
            aria-label="Close error message"
          >
            ×
          </button>
        )}
      </div>
      
      <div className="error-message__effects">
        <div className="error-message__glitch-line"></div>
        <div className="error-message__scan-line"></div>
      </div>
    </div>
  );
};

export default ErrorMessage;