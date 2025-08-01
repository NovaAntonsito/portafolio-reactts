import React, { useState } from 'react';
import { MusicPlayer } from './MusicPlayer';
import type { Track, SpotifyPlaylist } from '../../../types';
import './Music.scss';

const Music: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Track | undefined>(undefined);
  const [isConnected] = useState(false);

  const mockPlaylist: SpotifyPlaylist = {
    id: 'mock-playlist',
    name: 'Mix Cyberpunk de Marcos',
    tracks: [
      {
        id: '1',
        name: 'Cyberpunk 2077',
        artist: 'Varios Artistas',
        duration: 180,
        preview_url: undefined
      },
      {
        id: '2',
        name: 'Night City',
        artist: 'Synth Wave',
        duration: 240,
        preview_url: undefined
      }
    ]
  };

  const handlePlay = () => {
    if (!currentTrack && mockPlaylist.tracks.length > 0) {
      setCurrentTrack(mockPlaylist.tracks[0]);
    }
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleNext = () => {
    if (!mockPlaylist.tracks.length) return;
    
    const currentIndex = currentTrack 
      ? mockPlaylist.tracks.findIndex(track => track.id === currentTrack.id)
      : -1;
    
    const nextIndex = (currentIndex + 1) % mockPlaylist.tracks.length;
    setCurrentTrack(mockPlaylist.tracks[nextIndex]);
  };

  const handlePrevious = () => {
    if (!mockPlaylist.tracks.length) return;
    
    const currentIndex = currentTrack 
      ? mockPlaylist.tracks.findIndex(track => track.id === currentTrack.id)
      : -1;
    
    const prevIndex = currentIndex <= 0 
      ? mockPlaylist.tracks.length - 1 
      : currentIndex - 1;
    
    setCurrentTrack(mockPlaylist.tracks[prevIndex]);
  };

  return (
    <section id="music" className="music">
      <div className="music__container">
        <h2 className="music__title">Música</h2>
        <p className="music__description">
          Descubre mi gusto musical y los sonidos que inspiran mis sesiones de programación.
        </p>
        
        <MusicPlayer
          playlist={mockPlaylist}
          isConnected={isConnected}
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          onPlay={handlePlay}
          onPause={handlePause}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      </div>
    </section>
  );
};

export default Music;