// Music-related interfaces and types

export interface Track {
  id: string;
  name: string;
  artist: string;
  album: string;
  previewUrl?: string;
  spotifyUrl: string;
}

export interface SpotifyPlaylist {
  id: string;
  name: string;
  tracks: Track[];
}

export interface MusicPlayerState {
  isPlaying: boolean;
  currentTrack?: Track;
  playlist?: SpotifyPlaylist;
  isConnected: boolean;
}