import type { Track, SpotifyPlaylist } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL;


export class MusicService {
  private static instance: MusicService;
  private isLoading: boolean = false;
  private currentRequest: Promise<SpotifyPlaylist> | null = null;

  static getInstance(): MusicService {
    if (!MusicService.instance) {
      MusicService.instance = new MusicService();
    }
    return MusicService.instance;
  }

  async getPlaylist(): Promise<SpotifyPlaylist> {
    // Si ya hay una petición en curso, devolver la misma promesa
    if (this.isLoading && this.currentRequest) {
      console.log('🔄 Ya hay una petición en curso, esperando...');
      return this.currentRequest;
    }

    console.log('🎵 Iniciando conexión al backend...', API_BASE_URL);
    console.log('⏱️ El backend puede tardar 12-14 segundos (web scraping en proceso)');
    console.log('⏰ Timeout configurado a 30 segundos máximo');

    this.isLoading = true;
    const startTime = Date.now();

    // Crear la promesa y guardarla para evitar múltiples peticiones
    this.currentRequest = this.makeRequest(startTime);

    try {
      const result = await this.currentRequest;
      return result;
    } finally {
      this.isLoading = false;
      this.currentRequest = null;
    }
  }

  private async makeRequest(startTime: number): Promise<SpotifyPlaylist> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        console.log('⏰ Timeout alcanzado, abortando petición...');
        controller.abort();
      }, 30000);

      console.log('🔄 Haciendo petición a:', `${API_BASE_URL}/getMylist`);

      const response = await fetch(`${API_BASE_URL}/getMylist`, {
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
        }
      });

      clearTimeout(timeoutId);
      const endTime = Date.now();
      const duration = endTime - startTime;
      console.log(`✅ Respuesta recibida en ${duration}ms (${(duration / 1000).toFixed(1)}s)`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
      }

      const tracks: Track[] = await response.json();
      console.log('🎶 Tracks recibidos:', tracks.length);
      console.log('📋 Datos de tracks:', tracks);

      return {
        id: 'marcos-playlist',
        name: 'Playlist de Marcos',
        tracks: tracks
      };
    } catch (error) {
      const endTime = Date.now();
      const duration = endTime - startTime;
      console.error(`❌ Error después de ${duration}ms (${(duration / 1000).toFixed(1)}s):`, error);

      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          console.error('⏰ Timeout: El backend tardó más de 30 segundos');
        } else {
          console.error('🔥 Error de conexión:', error.message);
        }
      }

      throw error;
    }
  }

  // Método para limpiar el estado si es necesario
  public resetState(): void {
    console.log('🔄 Reseteando estado del servicio...');
    this.isLoading = false;
    this.currentRequest = null;
  }
}

export const musicService = MusicService.getInstance();