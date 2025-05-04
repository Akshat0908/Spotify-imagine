// API Configuration
export const API_CONFIG = {
  // Spotify API
  SPOTIFY: {
    BASE_URL: 'https://api.spotify.com/v1',
    AUTH_URL: 'https://accounts.spotify.com/api/token',
    CLIENT_ID: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
    CLIENT_SECRET: import.meta.env.VITE_SPOTIFY_CLIENT_SECRET,
    SCOPES: [
      'user-read-private',
      'user-read-email',
      'user-read-playback-state',
      'user-modify-playback-state',
      'user-read-currently-playing',
      'user-read-recently-played',
      'user-top-read',
      'playlist-read-private',
      'playlist-read-collaborative'
    ].join(' ')
  },

  // Last.fm API
  LASTFM: {
    BASE_URL: 'https://ws.audioscrobbler.com/2.0',
    API_KEY: import.meta.env.VITE_LASTFM_API_KEY
  },

  // Genius API
  GENIUS: {
    BASE_URL: 'https://api.genius.com',
    ACCESS_TOKEN: import.meta.env.VITE_GENIUS_ACCESS_TOKEN
  }
};

// API Endpoints
export const API_ENDPOINTS = {
  SPOTIFY: {
    PROFILE: '/me',
    TOP_TRACKS: '/me/top/tracks',
    TOP_ARTISTS: '/me/top/artists',
    RECENTLY_PLAYED: '/me/player/recently-played',
    CURRENT_PLAYBACK: '/me/player/currently-playing',
    FEATURED_PLAYLISTS: '/browse/featured-playlists',
    NEW_RELEASES: '/browse/new-releases',
    RECOMMENDATIONS: '/recommendations'
  },
  LASTFM: {
    TRACK_INFO: '/?method=track.getInfo',
    ARTIST_INFO: '/?method=artist.getInfo',
    SIMILAR_TRACKS: '/?method=track.getSimilar',
    SIMILAR_ARTISTS: '/?method=artist.getSimilar'
  },
  GENIUS: {
    SEARCH: '/search',
    SONG: '/songs',
    ARTIST: '/artists'
  }
}; 