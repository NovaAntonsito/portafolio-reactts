import React from 'react';
import './Loading.scss';

interface LoadingProps {
  size?: 'small' | 'medium' | 'large';
  text?: string;
  variant?: 'spinner' | 'dots' | 'pulse' | 'glitch';
  fullScreen?: boolean;
}

const Loading: React.FC<LoadingProps> = ({
  size = 'medium',
  text = 'Loading...',
  variant = 'spinner',
  fullScreen = false
}) => {
  const renderSpinner = () => (
    <div className={`loading__spinner loading__spinner--${size}`}>
      <div className="loading__spinner-ring"></div>
      <div className="loading__spinner-ring"></div>
      <div className="loading__spinner-ring"></div>
    </div>
  );

  const renderDots = () => (
    <div className={`loading__dots loading__dots--${size}`}>
      <div className="loading__dot"></div>
      <div className="loading__dot"></div>
      <div className="loading__dot"></div>
    </div>
  );

  const renderPulse = () => (
    <div className={`loading__pulse loading__pulse--${size}`}>
      <div className="loading__pulse-circle"></div>
    </div>
  );

  const renderGlitch = () => (
    <div className={`loading__glitch loading__glitch--${size}`}>
      <div className="loading__glitch-text" data-text={text}>
        {text}
      </div>
    </div>
  );

  const renderLoader = () => {
    switch (variant) {
      case 'dots':
        return renderDots();
      case 'pulse':
        return renderPulse();
      case 'glitch':
        return renderGlitch();
      default:
        return renderSpinner();
    }
  };

  const containerClass = `loading ${fullScreen ? 'loading--fullscreen' : ''}`;

  return (
    <div className={containerClass}>
      <div className="loading__container">
        {renderLoader()}
        {variant !== 'glitch' && text && (
          <p className={`loading__text loading__text--${size}`}>
            {text}
          </p>
        )}
      </div>
      
      {fullScreen && (
        <div className="loading__bg-effects">
          <div className="loading__grid"></div>
          <div className="loading__scanlines"></div>
        </div>
      )}
    </div>
  );
};

export default Loading;