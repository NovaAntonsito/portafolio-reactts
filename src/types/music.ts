// Music-related interfaces and types

export interface Track {
  id: string;
  name: string;
  artist: string;
  duration: number;
  preview_url?: string;
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