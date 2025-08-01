import React from 'react';
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaSpotify } from 'react-icons/fa';
import type { MusicPlayerProps } from '../../../types';
import './MusicPlayer.scss';

const LoadingIndicator: React.FC = () => (
  <div className="loading-indicator">
    <div className="loading-indicator__dot"></div>
    <div className="loading-indicator__dot"></div>
    <div className="loading-indicator__dot"></div>
  </div>
);

const EqualizerBars: React.FC = () => (
  <div className="equalizer">
    <div className="equalizer__bar"></div>
    <div className="equalizer__bar"></div>
    <div className="equalizer__bar"></div>
    <div className="equalizer__bar"></div>
  </div>
);

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  playlist,
  isConnected,
  currentTrack,
  isPlaying,
  onPlay,
  onPause,
  onNext,
  onPrevious
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = async () => {
    setIsLoading(true);
    
    // Simulate loading delay
    setTimeout(() => {
      if (isPlaying) {
        onPause?.();
      } else {
        onPlay?.();
      }
      setIsLoading(false);
    }, 300);
  };

  const handleNext = async () => {
    setIsLoading(true);
    setTimeout(() => {
      onNext?.();
      setIsLoading(false);
    }, 200);
  };

  const handlePrevious = async () => {
    setIsLoading(true);
    setTimeout(() => {
      onPrevious?.();
      setIsLoading(false);
    }, 200);
  };

  return (
    <div className="music-player">
      <div className="music-player__header">
        <div className="music-player__connection">
          <FaSpotify className="music-player__spotify-icon" />
          <span className={`music-player__status ${isConnected ? 'connected' : 'disconnected'}`}>
            {isConnected ? 'Connected to Spotify' : 'Spotify Disconnected'}
          </span>
        </div>
      </div>

      <div className="music-player__main">
        <div className="music-player__track-info">
          {currentTrack ? (
            <>
              <div className="music-player__track-header">
                <h3 className="music-player__track-name">{currentTrack.name}</h3>
                {isPlaying && <EqualizerBars />}
              </div>
              <p className="music-player__track-artist">{currentTrack.artist}</p>
              <span className="music-player__track-duration">
                {formatDuration(currentTrack.duration)}
              </span>
            </>
          ) : (
            <div className="music-player__no-track">
              <p>No track selected</p>
              {playlist && playlist.tracks.length > 0 && (
                <p className="music-player__playlist-info">
                  {playlist.tracks.length} tracks available
                </p>
              )}
            </div>
          )}
        </div>

        <div className="music-player__controls">
          <button
            className="music-player__control-btn music-player__control-btn--previous"
            onClick={handlePrevious}
            disabled={!playlist || playlist.tracks.length === 0}
            aria-label="Previous track"
          >
            <FaStepBackward />
          </button>

          <button
            className={`music-player__control-btn music-player__control-btn--play-pause ${
              isPlaying ? 'playing' : ''
            } ${isLoading ? 'loading' : ''}`}
            onClick={handlePlayPause}
            disabled={!playlist || playlist.tracks.length === 0 || isLoading}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isLoading ? (
              <LoadingIndicator />
            ) : isPlaying ? (
              <FaPause />
            ) : (
              <FaPlay />
            )}
          </button>

          <button
            className="music-player__control-btn music-player__control-btn--next"
            onClick={handleNext}
            disabled={!playlist || playlist.tracks.length === 0}
            aria-label="Next track"
          >
            <FaStepForward />
          </button>
        </div>
      </div>

      {playlist && (
        <div className="music-player__playlist">
          <h4 className="music-player__playlist-title">{playlist.name}</h4>
          <div className="music-player__track-list">
            {playlist.tracks.map((track, index) => (
              <div
                key={track.id}
                className={`music-player__track-item ${
                  currentTrack?.id === track.id ? 'active' : ''
                }`}
              >
                <span className="music-player__track-number">{index + 1}</span>
                <div className="music-player__track-details">
                  <span className="music-player__track-item-name">{track.name}</span>
                  <span className="music-player__track-item-artist">{track.artist}</span>
                </div>
                <span className="music-player__track-item-duration">
                  {formatDuration(track.duration)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {!isConnected && (
        <div className="music-player__disconnected-state">
          <p>Connect to Spotify to access your playlists</p>
          <button className="music-player__connect-btn" disabled>
            Connect to Spotify
          </button>
        </div>
      )}
    </div>
  );
};