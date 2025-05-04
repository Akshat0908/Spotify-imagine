
// API Key for Last.fm - this would typically be in an environment variable
const API_KEY = "452697fa8e9b98c0566bea69f2155bf0";
const BASE_URL = "https://ws.audioscrobbler.com/2.0/";

// Interface for top artists
export interface Artist {
  name: string;
  listeners: string;
  mbid: string;
  url: string;
  streamable: string;
  image: Array<{
    "#text": string;
    size: string;
  }>;
}

// Interface for top tracks
export interface Track {
  name: string;
  duration: string;
  listeners: string;
  mbid: string;
  url: string;
  artist: {
    name: string;
    mbid: string;
    url: string;
  };
  image: Array<{
    "#text": string;
    size: string;
  }>;
}

// Interface for tags/genres
export interface Tag {
  name: string;
  count: number;
  reach: number;
}

// Get top artists
export const getTopArtists = async (limit = 10): Promise<Artist[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}?method=chart.gettopartists&api_key=${API_KEY}&format=json&limit=${limit}`
    );
    const data = await response.json();
    return data.artists.artist;
  } catch (error) {
    console.error("Error fetching top artists:", error);
    return [];
  }
};

// Get top tracks
export const getTopTracks = async (limit = 10): Promise<Track[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}?method=chart.gettoptracks&api_key=${API_KEY}&format=json&limit=${limit}`
    );
    const data = await response.json();
    return data.tracks.track;
  } catch (error) {
    console.error("Error fetching top tracks:", error);
    return [];
  }
};

// Get track info by artist and track name
export const getTrackInfo = async (artist: string, track: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}?method=track.getInfo&api_key=${API_KEY}&artist=${encodeURIComponent(
        artist
      )}&track=${encodeURIComponent(track)}&format=json`
    );
    const data = await response.json();
    return data.track;
  } catch (error) {
    console.error("Error fetching track info:", error);
    return null;
  }
};

// Get similar tracks
export const getSimilarTracks = async (artist: string, track: string, limit = 5) => {
  try {
    const response = await fetch(
      `${BASE_URL}?method=track.getSimilar&api_key=${API_KEY}&artist=${encodeURIComponent(
        artist
      )}&track=${encodeURIComponent(track)}&limit=${limit}&format=json`
    );
    const data = await response.json();
    return data.similartracks?.track || [];
  } catch (error) {
    console.error("Error fetching similar tracks:", error);
    return [];
  }
};

// Get top tags (genres)
export const getTopTags = async (limit = 10): Promise<Tag[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}?method=tag.getTopTags&api_key=${API_KEY}&format=json&limit=${limit}`
    );
    const data = await response.json();
    return data.toptags.tag;
  } catch (error) {
    console.error("Error fetching top tags:", error);
    return [];
  }
};
