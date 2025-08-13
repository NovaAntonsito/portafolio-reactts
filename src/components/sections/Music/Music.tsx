import React from 'react';
import { MusicPlayer } from './MusicPlayer';
import './Music.scss';

const Music: React.FC = () => {
  return (
    <section id="music" className="music">
      <div className="music__container">
        <h2 className="music__title">Música</h2>
        <p className="music__description">
          Descubre mi gusto musical y los sonidos que inspiran mis sesiones de programación.
        </p>
        
        <MusicPlayer />
      </div>
    </section>
  );
};

export default Music;