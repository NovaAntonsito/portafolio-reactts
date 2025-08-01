import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import type { ErrorBoundaryState } from '../../../types';
import './ErrorBoundary.scss';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
    
    // In production, you might want to log this to an error reporting service
    // logErrorToService(error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default cyberpunk-styled error UI
      return (
        <div className="error-boundary">
          <div className="error-boundary__container">
            <div className="error-boundary__icon">
              <span className="error-boundary__glitch">⚠</span>
            </div>
            
            <h2 className="error-boundary__title">
              <span className="error-boundary__glitch" data-text="SYSTEM ERROR">
                SYSTEM ERROR
              </span>
            </h2>
            
            <p className="error-boundary__message">
              Something went wrong in the neural network. 
              The system encountered an unexpected error.
            </p>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="error-boundary__details">
                <summary>Error Details (Development)</summary>
                <pre className="error-boundary__stack">
                  {this.state.error.toString()}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
            
            <div className="error-boundary__actions">
              <button 
                className="error-boundary__button"
                onClick={this.handleRetry}
              >
                <span className="error-boundary__button-text">RETRY CONNECTION</span>
                <span className="error-boundary__button-glow"></span>
              </button>
              
              <button 
                className="error-boundary__button error-boundary__button--secondary"
                onClick={() => window.location.reload()}
              >
                <span className="error-boundary__button-text">RELOAD SYSTEM</span>
                <span className="error-boundary__button-glow"></span>
              </button>
            </div>
          </div>
          
          <div className="error-boundary__bg-effects">
            <div className="error-boundary__grid"></div>
            <div className="error-boundary__scanlines"></div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;