
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getTopTracks, Track } from '../utils/musicApi';
import { Play, ExternalLink, Music } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const TrendingTracks = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const topTracks = await getTopTracks(5);
        setTracks(topTracks);
      } catch (error) {
        console.error('Error fetching trending tracks:', error);
        toast({
          title: 'Error',
          description: 'Failed to load trending tracks',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTracks();
  }, [toast]);

  const handlePlay = (track: Track) => {
    toast({
      title: 'Playing Track',
      description: `Now playing ${track.name} by ${track.artist.name}`,
      duration: 3000,
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-8 bg-spotify-green rounded-full"
              animate={{
                height: [8, 32, 8],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-spotify-black/30 backdrop-blur-md rounded-xl p-4">
      <h3 className="text-xl font-bold mb-4">Trending Worldwide</h3>
      <div className="space-y-3">
        {tracks.map((track, index) => (
          <motion.div
            key={track.mbid || `${track.name}-${index}`}
            className="bg-white/5 rounded-lg p-3 flex items-center gap-3 group hover:bg-white/10 transition-all"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{
              scale: 1.01,
            }}
          >
            <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-spotify-green/20 rounded-md text-spotify-green">
              {track.image && track.image[1]["#text"] ? (
                <img
                  src={track.image[1]["#text"]}
                  alt={track.name}
                  className="w-full h-full object-cover rounded-md"
                />
              ) : (
                <Music className="w-5 h-5" />
              )}
            </div>
            <div className="flex-grow min-w-0">
              <p className="font-medium text-white truncate">{track.name}</p>
              <p className="text-sm text-gray-400 truncate">{track.artist.name}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handlePlay(track)}
              >
                <Play className="h-4 w-4" />
              </Button>
              <a
                href={track.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TrendingTracks;
