import { useState, useCallback, useEffect } from 'react';
import type { MusicPlayerState, Track, SpotifyPlaylist } from '../types';

const initialMusicPlayerState: MusicPlayerState = {
  isPlaying: false,
  currentTrack: undefined,
  playlist: undefined,
  isConnected: false
};

export const useMusicPlayer = () => {
  const [playerState, setPlayerState] = useState<MusicPlayerState>(initialMusicPlayerState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkSpotifyConnection = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));

        setPlayerState(prev => ({
          ...prev,
          isConnected: false
        }));
      } catch {
        setError('Failed to connect to Spotify');
      } finally {
        setIsLoading(false);
      }
    };

    checkSpotifyConnection();
  }, []);

  const play = useCallback(async (track?: Track) => {
    if (!playerState.isConnected) {
      setError('Spotify not connected');
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      setPlayerState(prev => ({
        ...prev,
        isPlaying: true,
        currentTrack: track || prev.currentTrack
      }));
      setError(null);
    } catch {
      setError('Failed to play track');
    } finally {
      setIsLoading(false);
    }
  }, [playerState.isConnected]);

  const pause = useCallback(async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 300));

      setPlayerState(prev => ({
        ...prev,
        isPlaying: false
      }));
      setError(null);
    } catch {
      setError('Failed to pause track');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const next = useCallback(async () => {
    if (!playerState.playlist || !playerState.currentTrack) {
      setError('No playlist available');
      return;
    }

    const currentIndex = playerState.playlist.tracks.findIndex(
      track => track.id === playerState.currentTrack?.id
    );

    if (currentIndex < playerState.playlist.tracks.length - 1) {
      const nextTrack = playerState.playlist.tracks[currentIndex + 1];
      await play(nextTrack);
    } else {
      setError('No next track available');
    }
  }, [playerState.playlist, playerState.currentTrack, play]);

  const previous = useCallback(async () => {
    if (!playerState.playlist || !playerState.currentTrack) {
      setError('No playlist available');
      return;
    }

    const currentIndex = playerState.playlist.tracks.findIndex(
      track => track.id === playerState.currentTrack?.id
    );

    if (currentIndex > 0) {
      const previousTrack = playerState.playlist.tracks[currentIndex - 1];
      await play(previousTrack);
    } else {
      setError('No previous track available');
    }
  }, [playerState.playlist, playerState.currentTrack, play]);

  const loadPlaylist = useCallback(async (playlist: SpotifyPlaylist) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));

      setPlayerState(prev => ({
        ...prev,
        playlist,
        currentTrack: playlist.tracks[0] || undefined
      }));
      setError(null);
    } catch {
      setError('Failed to load playlist');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const connectSpotify = useCallback(async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      setPlayerState(prev => ({
        ...prev,
        isConnected: true
      }));
      setError(null);
    } catch {
      setError('Failed to connect to Spotify');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const disconnect = useCallback(() => {
    setPlayerState(initialMusicPlayerState);
    setError(null);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    isPlaying: playerState.isPlaying,
    currentTrack: playerState.currentTrack,
    playlist: playerState.playlist,
    isConnected: playerState.isConnected,
    isLoading,
    error,
    play,
    pause,
    next,
    previous,
    loadPlaylist,
    connectSpotify,
    disconnect,
    clearError
  };
};