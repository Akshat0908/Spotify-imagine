import { API_CONFIG, API_ENDPOINTS } from '@/config/api';

// Spotify API Service
export const spotifyService = {
  async getAccessToken() {
    const response = await fetch(API_CONFIG.SPOTIFY.AUTH_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${btoa(
          `${API_CONFIG.SPOTIFY.CLIENT_ID}:${API_CONFIG.SPOTIFY.CLIENT_SECRET}`
        )}`,
      },
      body: 'grant_type=client_credentials',
    });
    return response.json();
  },

  async getFeaturedPlaylists() {
    const { access_token } = await this.getAccessToken();
    const response = await fetch(
      `${API_CONFIG.SPOTIFY.BASE_URL}${API_ENDPOINTS.SPOTIFY.FEATURED_PLAYLISTS}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return response.json();
  },

  async getNewReleases() {
    const { access_token } = await this.getAccessToken();
    const response = await fetch(
      `${API_CONFIG.SPOTIFY.BASE_URL}${API_ENDPOINTS.SPOTIFY.NEW_RELEASES}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return response.json();
  },

  async getRecommendations(seedTracks: string[]) {
    const { access_token } = await this.getAccessToken();
    const response = await fetch(
      `${API_CONFIG.SPOTIFY.BASE_URL}${API_ENDPOINTS.SPOTIFY.RECOMMENDATIONS}?seed_tracks=${seedTracks.join(',')}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return response.json();
  }
};

// Last.fm API Service
export const lastfmService = {
  async getTrackInfo(artist: string, track: string) {
    const response = await fetch(
      `${API_CONFIG.LASTFM.BASE_URL}${API_ENDPOINTS.LASTFM.TRACK_INFO}&api_key=${API_CONFIG.LASTFM.API_KEY}&artist=${artist}&track=${track}&format=json`
    );
    return response.json();
  },

  async getSimilarTracks(artist: string, track: string) {
    const response = await fetch(
      `${API_CONFIG.LASTFM.BASE_URL}${API_ENDPOINTS.LASTFM.SIMILAR_TRACKS}&api_key=${API_CONFIG.LASTFM.API_KEY}&artist=${artist}&track=${track}&format=json`
    );
    return response.json();
  }
};

// Genius API Service
export const geniusService = {
  async searchSongs(query: string) {
    const response = await fetch(
      `${API_CONFIG.GENIUS.BASE_URL}${API_ENDPOINTS.GENIUS.SEARCH}?q=${encodeURIComponent(query)}`,
      {
        headers: {
          Authorization: `Bearer ${API_CONFIG.GENIUS.ACCESS_TOKEN}`,
        },
      }
    );
    return response.json();
  },

  async getSongDetails(id: string) {
    const response = await fetch(
      `${API_CONFIG.GENIUS.BASE_URL}${API_ENDPOINTS.GENIUS.SONG}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${API_CONFIG.GENIUS.ACCESS_TOKEN}`,
        },
      }
    );
    return response.json();
  }
}; 