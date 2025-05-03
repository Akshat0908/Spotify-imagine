
import { useState, useEffect, CSSProperties } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { Slider } from "@/components/ui/slider";

// Generate waveform values for visualization
const waveformValues = Array(40).fill(0).map(() => 
  Math.max(0.3, Math.random() * 0.7)
);

// Updated song list with high-quality album artwork and better audio sources
const songs = [
  { 
    id: 1, 
    title: "Blinding Lights", 
    artist: "The Weeknd", 
    album: "After Hours", 
    duration: "3:22", 
    cover: "https://i.scdn.co/image/ab67616d0000b273c8b444df094279e70d0ed856",
    audio: "/audio/sample1.mp3"
  },
  { 
    id: 2, 
    title: "Don't Start Now", 
    artist: "Dua Lipa", 
    album: "Future Nostalgia", 
    duration: "3:03", 
    cover: "https://i.scdn.co/image/ab67616d0000b273bd26ede1ae69327010d49946",
    audio: "/audio/sample2.mp3"
  },
  { 
    id: 3, 
    title: "Good As Hell", 
    artist: "Lizzo", 
    album: "Cuz I Love You", 
    duration: "2:39", 
    cover: "https://i.scdn.co/image/ab67616d0000b273e76c82c8ffdafaa96d9ddbc0",
    audio: "/audio/sample3.mp3"
  }
];

const Player = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(100);
  const [volume, setVolume] = useState(70);
  const [expanded, setExpanded] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  
  const currentSong = songs[currentSongIndex];
  
  useEffect(() => {
    // Create audio element
    const audio = new Audio();
    setAudioElement(audio);
    
    // Set up audio element
    audio.volume = volume / 100;
    
    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);
  
  useEffect(() => {
    if (!audioElement) return;
    
    // Update audio source when song changes
    audioElement.src = currentSong.audio;
    
    if (isPlaying) {
      audioElement.play().catch(err => console.error("Error playing audio:", err));
    }
    
    // Handle audio events
    const handleTimeUpdate = () => setCurrentTime(audioElement.currentTime);
    const handleLoadedMetadata = () => setDuration(audioElement.duration);
    const handleEnded = () => nextSong();
    
    audioElement.addEventListener("timeupdate", handleTimeUpdate);
    audioElement.addEventListener("loadedmetadata", handleLoadedMetadata);
    audioElement.addEventListener("ended", handleEnded);
    
    return () => {
      audioElement.removeEventListener("timeupdate", handleTimeUpdate);
      audioElement.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audioElement.removeEventListener("ended", handleEnded);
    };
  }, [currentSong, audioElement, currentSongIndex]);
  
  useEffect(() => {
    if (!audioElement) return;
    
    if (isPlaying) {
      audioElement.play().catch(err => console.error("Error playing audio:", err));
    } else {
      audioElement.pause();
    }
  }, [isPlaying, audioElement]);
  
  useEffect(() => {
    if (audioElement) {
      audioElement.volume = volume / 100;
    }
  }, [volume, audioElement]);
  
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  
  const nextSong = () => {
    setCurrentSongIndex((prev) => (prev + 1) % songs.length);
    setCurrentTime(0);
  };
  
  const prevSong = () => {
    setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
    setCurrentTime(0);
  };
  
  const handleSeek = (value: number[]) => {
    if (audioElement) {
      audioElement.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Fixed the type error by using a proper way to define custom CSS properties
  const getWaveStyle = (value: number, index: number): CSSProperties => {
    return {
      height: `${value * 100}%`,
      animationDuration: `${0.8 + Math.random() * 0.4}s`,
      animationDelay: `${Math.random() * 0.5}s`,
      backgroundColor: isPlaying 
        ? `rgba(29, 185, 84, ${0.7 + value * 0.3})` 
        : `rgba(255, 255, 255, ${0.2 + value * 0.3})`,
    };
  };

  return (
    <motion.div 
      className={`fixed bottom-0 left-0 right-0 bg-spotify-dark-gray backdrop-blur-lg z-40 border-t border-spotify-light-gray/20 transition-all ${
        expanded ? 'h-96' : 'h-20'
      }`}
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <div className="relative h-full">
        <button 
          className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-spotify-dark-gray p-2 rounded-t-lg border-t border-x border-spotify-light-gray/20 text-spotify-gray hover:text-spotify-white transition-colors"
          onClick={() => setExpanded(!expanded)}
        >
          <svg 
            className={`w-6 h-6 transform transition-transform ${expanded ? 'rotate-180' : ''}`} 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"></path>
          </svg>
        </button>
        
        <div className="container mx-auto h-full flex flex-col">
          {/* Basic Player (always visible) */}
          <div className="flex items-center justify-between h-20 px-4">
            {/* Song Info */}
            <div className="flex items-center">
              <motion.div 
                className="relative h-14 w-14 mr-4 rounded overflow-hidden"
                whileHover={{ scale: 1.05 }}
              >
                <img 
                  src={currentSong.cover} 
                  alt={`${currentSong.title} cover`}
                  className={`h-full w-full object-cover ${isPlaying ? 'album-rotate' : ''}`}
                />
              </motion.div>
              
              <div className="mr-4">
                <h4 className="font-semibold text-sm md:text-base">{currentSong.title}</h4>
                <p className="text-xs md:text-sm text-spotify-gray">{currentSong.artist}</p>
              </div>
              
              <button className="text-spotify-gray hover:text-spotify-white p-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                </svg>
              </button>
            </div>
            
            {/* Controls */}
            <div className="flex items-center justify-center flex-1 max-w-md">
              <div className="flex items-center space-x-4">
                <button 
                  className="text-spotify-gray hover:text-spotify-white p-1 hidden md:block"
                  onClick={() => console.log("Shuffle")}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm0.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z"></path>
                  </svg>
                </button>
                
                <button 
                  className="text-spotify-gray hover:text-spotify-white p-1"
                  onClick={prevSong}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"></path>
                  </svg>
                </button>
                
                <button 
                  className="bg-white text-spotify-black rounded-full p-2 hover:scale-105 transition-transform"
                  onClick={togglePlay}
                >
                  {isPlaying ? (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path>
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"></path>
                    </svg>
                  )}
                </button>
                
                <button 
                  className="text-spotify-gray hover:text-spotify-white p-1"
                  onClick={nextSong}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"></path>
                  </svg>
                </button>
                
                <button 
                  className="text-spotify-gray hover:text-spotify-white p-1 hidden md:block"
                  onClick={() => console.log("Repeat")}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"></path>
                  </svg>
                </button>
              </div>
              
              {/* Progress Bar (visible on desktop) */}
              <div className="hidden md:flex items-center w-full max-w-xs mx-4">
                <span className="text-xs text-spotify-gray mr-2">
                  {formatTime(currentTime)}
                </span>
                <Slider
                  value={[currentTime]}
                  min={0}
                  max={duration || 100}
                  step={1}
                  className="cursor-pointer"
                  onValueChange={handleSeek}
                />
                <span className="text-xs text-spotify-gray ml-2">
                  {formatTime(duration || 0)}
                </span>
              </div>
            </div>
            
            {/* Volume (visible on desktop) */}
            <div className="hidden md:flex items-center space-x-3">
              <button className="text-spotify-gray hover:text-spotify-white">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path>
                </svg>
              </button>
              <Slider 
                value={[volume]} 
                min={0} 
                max={100}
                className="w-24"
                onValueChange={(value) => setVolume(value[0])}
              />
            </div>
          </div>
          
          {/* Expanded Player */}
          <AnimatePresence>
            {expanded && (
              <motion.div 
                className="flex-1 px-4 py-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
                  {/* Album Artwork */}
                  <div className="flex flex-col items-center justify-center">
                    <motion.div 
                      className="w-64 h-64 rounded-lg overflow-hidden shadow-2xl"
                      initial={{ rotateY: 30 }}
                      animate={{ 
                        rotateY: isPlaying ? [30, -30, 30] : 30,
                        boxShadow: isPlaying ? 
                          ["0px 20px 50px rgba(29, 185, 84, 0.3)", "0px 20px 50px rgba(29, 185, 84, 0.5)", "0px 20px 50px rgba(29, 185, 84, 0.3)"] : 
                          "0px 20px 50px rgba(29, 185, 84, 0.3)"
                      }}
                      transition={{ 
                        duration: 10, 
                        repeat: Infinity, 
                        repeatType: "reverse", 
                        ease: "easeInOut" 
                      }}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <img 
                        src={currentSong.cover} 
                        alt={`${currentSong.title} cover`}
                        className={`w-full h-full object-cover ${isPlaying ? 'album-rotate' : ''}`}
                      />
                    </motion.div>
                    
                    <div className="mt-6 text-center">
                      <h3 className="text-2xl font-bold">{currentSong.title}</h3>
                      <p className="text-spotify-gray">{currentSong.artist} • {currentSong.album}</p>
                    </div>
                  </div>
                  
                  {/* Waveform & Lyrics */}
                  <div className="flex flex-col justify-between">
                    {/* Waveform */}
                    <div className="h-40 flex items-center justify-center">
                      <div className="flex items-end h-32 w-full space-x-1">
                        {waveformValues.map((value, index) => (
                          <motion.div 
                            key={`wave-${index}-${value.toFixed(3)}`}
                            className="spotify-wave"
                            style={getWaveStyle(value, index)}
                            animate={{
                              height: isPlaying 
                                ? [`${value * 70}%`, `${value * 100}%`, `${value * 70}%`]
                                : `${value * 70}%`,
                            }}
                            transition={{
                              duration: 0.8 + Math.random() * 0.4,
                              repeat: Infinity,
                              repeatType: "reverse",
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    
                    {/* Full Progress Bar */}
                    <div className="flex flex-col space-y-2 mt-4">
                      <Slider
                        value={[currentTime]}
                        min={0}
                        max={duration || 100}
                        step={1}
                        className="cursor-pointer"
                        onValueChange={handleSeek}
                      />
                      <div className="flex justify-between text-xs text-spotify-gray">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration || 0)}</span>
                      </div>
                    </div>
                    
                    {/* Full Controls */}
                    <div className="mt-8 flex justify-center items-center space-x-8">
                      <button className="text-spotify-gray hover:text-spotify-white">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm0.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z"></path>
                        </svg>
                      </button>
                      
                      <button 
                        className="text-spotify-gray hover:text-spotify-white"
                        onClick={prevSong}
                      >
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"></path>
                        </svg>
                      </button>
                      
                      <button 
                        className="bg-spotify-green text-white rounded-full p-4 hover:scale-105 transition-transform"
                        onClick={togglePlay}
                      >
                        {isPlaying ? (
                          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path>
                          </svg>
                        ) : (
                          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"></path>
                          </svg>
                        )}
                      </button>
                      
                      <button 
                        className="text-spotify-gray hover:text-spotify-white"
                        onClick={nextSong}
                      >
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"></path>
                        </svg>
                      </button>
                      
                      <button className="text-spotify-gray hover:text-spotify-white">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"></path>
                        </svg>
                      </button>
                    </div>
                    
                    {/* Additional Controls */}
                    <div className="mt-8 flex justify-between">
                      <button className="text-spotify-gray hover:text-spotify-white">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M7 18h2V6H7v12zm4-12v12h2V6h-2zm4 0v12h2V6h-2z"></path>
                        </svg>
                      </button>
                      
                      <button className="text-spotify-gray hover:text-spotify-white">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.5 10.7c0-.8-.7-1.5-1.5-1.5s-1.5.7-1.5 1.5.7 1.5 1.5 1.5 1.5-.7 1.5-1.5zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>
                          <path d="M13.25 14.52c-.15.27-.42.48-.72.48H11.5c-.31 0-.58-.21-.72-.48L9.8 11.4H9.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h1.27c.3 0 .57.21.71.48l.44 1.04.74-3.04c.09-.35.4-.59.76-.59.37 0 .68.25.76.61l.74 3.02.44-1.04c.15-.27.42-.48.72-.48h1.27c.28 0 .5.22.5.5s-.22.5-.5.5h-.3l-.98 3.12z"></path>
                        </svg>
                      </button>
                      
                      <button className="text-spotify-gray hover:text-spotify-white">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 5h-3v5.5c0 1.38-1.12 2.5-2.5 2.5S10 13.88 10 12.5s1.12-2.5 2.5-2.5c.57 0 1.08.19 1.5.51V5h4v2zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6z"></path>
                        </svg>
                      </button>
                      
                      <button className="text-spotify-gray hover:text-spotify-white">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"></path>
                        </svg>
                      </button>
                      
                      <div className="flex items-center">
                        <button className="text-spotify-gray hover:text-spotify-white mr-2">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path>
                          </svg>
                        </button>
                        <Slider 
                          value={[volume]} 
                          min={0} 
                          max={100}
                          className="w-24"
                          onValueChange={(value) => setVolume(value[0])}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default Player;
