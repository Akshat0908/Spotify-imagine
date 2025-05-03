
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

const AMBIENT_TRACKS = [
  {
    name: "Ambient Flow",
    src: "/audio/ambient1.mp3"
  },
  {
    name: "Cosmic Dreams",
    src: "/audio/ambient2.mp3"
  }
];

const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.1); // Start with low volume
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [showControls, setShowControls] = useState(false);
  
  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio(AMBIENT_TRACKS[currentTrackIndex].src);
    audioRef.current.loop = true;
    audioRef.current.volume = volume;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [currentTrackIndex]);
  
  // Handle play/pause
  useEffect(() => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      // Use a promise and handle potential errors (e.g., if user hasn't interacted with page)
      audioRef.current.play().catch(err => {
        console.error("Error playing ambient music:", err);
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);
  
  // Update volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);
  
  // Toggle play/pause
  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };
  
  // Change volume
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };
  
  // Switch tracks
  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % AMBIENT_TRACKS.length);
  };

  return (
    <motion.div 
      className="fixed top-4 right-4 z-50 flex items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
    >
      <motion.div 
        className={`flex items-center bg-spotify-dark-gray/80 backdrop-blur-lg rounded-full p-2 pr-4 shadow-xl ${
          showControls ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10 pointer-events-none'
        }`}
        transition={{ duration: 0.3 }}
      >
        <span className="text-xs text-spotify-gray mr-2">
          {AMBIENT_TRACKS[currentTrackIndex].name}
        </span>
        
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="w-16 h-1 bg-spotify-light-gray rounded-full accent-spotify-green mr-3"
        />
        
        <Button 
          variant="outline" 
          size="sm" 
          className="h-6 w-6 p-0 mr-2"
          onClick={nextTrack}
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"></path>
          </svg>
        </Button>
      </motion.div>
      
      <Button 
        variant="ghost" 
        size="icon" 
        className={`rounded-full ${isPlaying ? 'bg-spotify-green text-white hover:bg-spotify-green/90' : 'bg-spotify-dark-gray/80 backdrop-blur-lg'}`}
        onClick={togglePlayback}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        {isPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
      </Button>
    </motion.div>
  );
};

export default BackgroundMusic;
