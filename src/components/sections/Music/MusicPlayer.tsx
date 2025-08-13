import React, { useEffect, useState } from 'react';
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaSpotify, FaVolumeUp, FaExternalLinkAlt } from 'react-icons/fa';
import { useAudioPlayer } from '../../../hooks/useAudioPlayer';
import { musicService } from '../../../services/musicService';
import type { Track, SpotifyPlaylist } from '../../../types';
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

export const MusicPlayer: React.FC = () => {
  const [playlist, setPlaylist] = useState<SpotifyPlaylist | null>(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isLoadingPlaylist, setIsLoadingPlaylist] = useState(true);
  const [playlistError, setPlaylistError] = useState<string | null>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [hasInitialized, setHasInitialized] = useState(false);
  
  const {
    isPlaying,
    currentTrack,
    currentTime,
    duration,
    volume,
    isLoading,
    error,
    loadTrack,
    togglePlayPause,
    seek,
    changeVolume,
    clearError
  } = useAudioPlayer();

  useEffect(() => {
    // Evitar múltiples inicializaciones
    if (hasInitialized) {
      console.log('🚫 MusicPlayer ya inicializado, evitando carga duplicada');
      return;
    }

    console.log('🎵 MusicPlayer montado - iniciando carga automática...');
    setHasInitialized(true);
    
    const loadPlaylist = async () => {
      console.log('🔄 Estableciendo estado de carga...');
      setIsLoadingPlaylist(true);
      setPlaylistError(null);
      
      // Progreso más realista para 14-30 segundos
      const progressInterval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 90) return 90; // No llegar al 100% hasta que termine
          return prev + Math.random() * 3; // Progreso más lento
        });
      }, 1000); // Cada segundo

      try {
        console.log('🎵 Iniciando carga de playlist...');
        const playlistData = await musicService.getPlaylist();
        
        clearInterval(progressInterval);
        setLoadingProgress(100);
        
        console.log('✅ Playlist cargada exitosamente:', playlistData);
        setPlaylist(playlistData);
        
        if (playlistData.tracks.length > 0) {
          loadTrack(playlistData.tracks[0]);
          setCurrentTrackIndex(0);
        }
      } catch (err) {
        clearInterval(progressInterval);
        console.error('❌ Error cargando playlist:', err);
        
        let errorMessage = 'Error desconocido';
        if (err instanceof Error) {
          if (err.name === 'AbortError') {
            errorMessage = 'Timeout: El backend tardó más de 20 segundos en responder';
          } else if (err.message.includes('Failed to fetch')) {
            errorMessage = 'No se pudo conectar al backend. ¿Está corriendo en el puerto correcto?';
          } else {
            errorMessage = err.message;
          }
        }
        
        setPlaylistError(errorMessage);
      } finally {
        setIsLoadingPlaylist(false);
        setLoadingProgress(0);
      }
    };

    loadPlaylist();
  }, []); // Sin dependencias para evitar re-ejecuciones

  const handleRetryPlaylist = () => {
    const loadPlaylist = async () => {
      setIsLoadingPlaylist(true);
      setPlaylistError(null);
      
      try {
        console.log('🔄 Reintentando cargar playlist...');
        const playlistData = await musicService.getPlaylist();
        setPlaylist(playlistData);
        
        if (playlistData.tracks.length > 0) {
          loadTrack(playlistData.tracks[0]);
          setCurrentTrackIndex(0);
        }
      } catch (err) {
        console.error('❌ Error reintentando playlist:', err);
        setPlaylistError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setIsLoadingPlaylist(false);
      }
    };

    loadPlaylist();
  };



  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleNext = () => {
    if (!playlist || playlist.tracks.length === 0) return;
    
    const nextIndex = (currentTrackIndex + 1) % playlist.tracks.length;
    setCurrentTrackIndex(nextIndex);
    loadTrack(playlist.tracks[nextIndex]);
  };

  const handlePrevious = () => {
    if (!playlist || playlist.tracks.length === 0) return;
    
    const prevIndex = currentTrackIndex === 0 ? playlist.tracks.length - 1 : currentTrackIndex - 1;
    setCurrentTrackIndex(prevIndex);
    loadTrack(playlist.tracks[prevIndex]);
  };

  const handleTrackSelect = (track: Track, index: number) => {
    setCurrentTrackIndex(index);
    loadTrack(track);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    seek(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    changeVolume(newVolume);
  };

  if (isLoadingPlaylist) {
    return (
      <div className="music-player">
        <div className="music-player__header">
          <div className="music-player__connection">
            <FaSpotify className="music-player__spotify-icon" />
            <span className="music-player__status connected">
              Conectando al Backend...
            </span>
          </div>
        </div>
        <div className="music-player__loading">
          <LoadingIndicator />
          <h3>Conectando al Backend...</h3>
          <p>El backend está haciendo web scraping de Spotify</p>
          <p>⏱️ Tiempo esperado: 12-14 segundos (máximo 30s)</p>
          <div className="music-player__progress-container">
            <div 
              className="music-player__progress-fill" 
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
          <p className="music-player__progress-text">{Math.round(loadingProgress)}%</p>
        </div>
      </div>
    );
  }

  if (playlistError) {
    return (
      <div className="music-player">
        <div className="music-player__header">
          <div className="music-player__connection">
            <FaSpotify className="music-player__spotify-icon" />
            <span className="music-player__status disconnected">
              Error de Conexión
            </span>
          </div>
        </div>
        <div className="music-player__error-state">
          <div className="music-player__error-icon">⚠️</div>
          <h3>Error de Conexión</h3>
          <p>{playlistError}</p>
          <button 
            className="music-player__retry-btn"
            onClick={handleRetryPlaylist}
          >
            Reintentar Conexión
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="music-player">
      <div className="music-player__header">
        <div className="music-player__connection">
          <FaSpotify className="music-player__spotify-icon" />
          <span className="music-player__status connected">
            Conectado al Backend
          </span>
        </div>
      </div>

      {error && (
        <div className="music-player__error">
          <p>{error}</p>
          <button onClick={clearError} className="music-player__error-close">
            ×
          </button>
        </div>
      )}

      <div className="music-player__main">
        <div className="music-player__track-info">
          {currentTrack ? (
            <>
              <div className="music-player__track-header">
                <h3 className="music-player__track-name">{currentTrack.name}</h3>
                {isPlaying && <EqualizerBars />}
                <a 
                  href={currentTrack.spotifyUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="music-player__spotify-link"
                  title="Abrir en Spotify"
                >
                  <FaExternalLinkAlt />
                </a>
              </div>
              <p className="music-player__track-artist">{currentTrack.artist}</p>
              <p className="music-player__track-album">{currentTrack.album}</p>
              
              <div className="music-player__progress">
                <span className="music-player__time">{formatTime(currentTime)}</span>
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  value={currentTime}
                  onChange={handleSeek}
                  className="music-player__progress-bar"
                />
                <span className="music-player__time">{formatTime(duration)}</span>
              </div>
            </>
          ) : (
            <div className="music-player__no-track">
              <p>No hay canción seleccionada</p>
              {playlist && playlist.tracks.length > 0 && (
                <p className="music-player__playlist-info">
                  {playlist.tracks.length} canciones disponibles
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
            aria-label="Canción anterior"
          >
            <FaStepBackward />
          </button>

          <button
            className={`music-player__control-btn music-player__control-btn--play-pause ${
              isPlaying ? 'playing' : ''
            } ${isLoading ? 'loading' : ''}`}
            onClick={togglePlayPause}
            disabled={!playlist || playlist.tracks.length === 0 || isLoading || !currentTrack?.previewUrl}
            aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
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
            aria-label="Siguiente canción"
          >
            <FaStepForward />
          </button>
        </div>

        <div className="music-player__volume">
          <FaVolumeUp className="music-player__volume-icon" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="music-player__volume-slider"
          />
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
                } ${!track.previewUrl ? 'no-preview' : ''}`}
                onClick={() => track.previewUrl && handleTrackSelect(track, index)}
              >
                <span className="music-player__track-number">{index + 1}</span>
                <div className="music-player__track-details">
                  <span className="music-player__track-item-name">{track.name}</span>
                  <span className="music-player__track-item-artist">{track.artist}</span>
                  <span className="music-player__track-item-album">{track.album}</span>
                </div>
                <div className="music-player__track-actions">
                  {!track.previewUrl && (
                    <span className="music-player__no-preview">Sin preview</span>
                  )}
                  <a 
                    href={track.spotifyUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="music-player__track-spotify-link"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaSpotify />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};