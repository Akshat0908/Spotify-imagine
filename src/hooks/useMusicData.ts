import { useState, useEffect } from 'react';
import { spotifyService, lastfmService, geniusService } from '@/services/api';

export const useMusicData = () => {
  const [featuredPlaylists, setFeaturedPlaylists] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch featured playlists
        const playlistsData = await spotifyService.getFeaturedPlaylists();
        setFeaturedPlaylists(playlistsData.playlists?.items || []);

        // Fetch new releases
        const releasesData = await spotifyService.getNewReleases();
        setNewReleases(releasesData.albums?.items || []);

        // Fetch recommendations based on featured tracks
        if (playlistsData.playlists?.items?.[0]?.tracks?.items) {
          const seedTracks = playlistsData.playlists.items[0].tracks.items
            .slice(0, 5)
            .map(item => item.track.id);
          const recommendationsData = await spotifyService.getRecommendations(seedTracks);
          setRecommendations(recommendationsData.tracks || []);
        }

        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getTrackDetails = async (artist: string, track: string) => {
    try {
      const [trackInfo, similarTracks] = await Promise.all([
        lastfmService.getTrackInfo(artist, track),
        lastfmService.getSimilarTracks(artist, track)
      ]);

      const geniusResults = await geniusService.searchSongs(`${artist} ${track}`);
      
      return {
        trackInfo: trackInfo.track,
        similarTracks: similarTracks.similartracks.track,
        lyrics: geniusResults.response?.hits?.[0]?.result
      };
    } catch (err) {
      console.error('Error fetching track details:', err);
      return null;
    }
  };

  return {
    featuredPlaylists,
    newReleases,
    recommendations,
    loading,
    error,
    getTrackDetails
  };
}; 