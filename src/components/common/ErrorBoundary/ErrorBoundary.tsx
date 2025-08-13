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
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (import.meta.env.DEV) {
      console.error('ErrorBoundary detectó un error:', error, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="error-boundary">
          <div className="error-boundary__container">
            <div className="error-boundary__icon">
              <span className="error-boundary__glitch">⚠</span>
            </div>
            
            <h2 className="error-boundary__title">
              <span className="error-boundary__glitch" data-text="ERROR DEL SISTEMA">
                ERROR DEL SISTEMA
              </span>
            </h2>
            
            <p className="error-boundary__message">
              Algo salió mal en la red neuronal. 
              El sistema encontró un error inesperado en la matriz.
            </p>
            
            {import.meta.env.DEV && this.state.error && (
              <details className="error-boundary__details">
                <summary>Detalles del Error (Desarrollo)</summary>
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
                <span className="error-boundary__button-text">REINTENTAR CONEXIÓN</span>
                <span className="error-boundary__button-glow"></span>
              </button>
              
              <button 
                className="error-boundary__button error-boundary__button--secondary"
                onClick={() => window.location.reload()}
              >
                <span className="error-boundary__button-text">REINICIAR SISTEMA</span>
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