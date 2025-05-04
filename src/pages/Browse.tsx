
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import GenreVisualizer from "@/components/GenreVisualizer";
import { Music, Headphones, Mic, Volume2, Disc, Play } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const categories = [
  { id: 1, name: "Charts", color: "#3498db", icon: Music },
  { id: 2, name: "New Releases", color: "#e74c3c", icon: Disc },
  { id: 3, name: "Podcasts", color: "#2ecc71", icon: Mic },
  { id: 4, name: "Discover", color: "#9b59b6", icon: Headphones },
  { id: 5, name: "Live Events", color: "#f39c12", icon: Volume2 },
  { id: 6, name: "Made For You", color: "#1abc9c", icon: Music },
  { id: 7, name: "At Home", color: "#34495e", icon: Headphones },
  { id: 8, name: "COVID-19 Guide", color: "#7f8c8d", icon: Mic },
];

const genres = [
  { id: 1, name: "Pop", color: "#ff4757", imageUrl: "https://images.unsplash.com/photo-1619983081563-430f63602796?auto=format&fit=crop&q=80&w=500" },
  { id: 2, name: "Rock", color: "#2ed573", imageUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=500" },
  { id: 3, name: "Hip-Hop", color: "#1e90ff", imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&q=80&w=500" },
  { id: 4, name: "R&B", color: "#ff6b81", imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=500" },
  { id: 5, name: "Latin", color: "#ffa502", imageUrl: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&q=80&w=500" },
  { id: 6, name: "Electronic", color: "#5352ed", imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=500" },
  { id: 7, name: "Country", color: "#ff6348", imageUrl: "https://images.unsplash.com/photo-1543857778-c4a1a9e0615f?auto=format&fit=crop&q=80&w=500" },
  { id: 8, name: "Jazz", color: "#747d8c", imageUrl: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80&w=500" },
  { id: 9, name: "Classical", color: "#2f3542", imageUrl: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&q=80&w=500" },
  { id: 10, name: "Metal", color: "#3742fa", imageUrl: "https://images.unsplash.com/photo-1499364615650-ec38552f4f34?auto=format&fit=crop&q=80&w=500" },
  { id: 11, name: "Folk & Acoustic", color: "#ff9ff3", imageUrl: "https://images.unsplash.com/photo-1485278537138-4e8911a13c02?auto=format&fit=crop&q=80&w=500" },
  { id: 12, name: "Indie", color: "#70a1ff", imageUrl: "https://images.unsplash.com/photo-1524650359799-842906ca1c06?auto=format&fit=crop&q=80&w=500" }
];

// New mood playlists - BONUS FEATURE
const moodPlaylists = [
  { 
    id: "chill", 
    name: "Chill", 
    description: "Kick back and relax", 
    gradient: "from-blue-500 to-purple-500",
    songs: 124,
    followers: "2.3M"
  },
  { 
    id: "energetic", 
    name: "Energetic", 
    description: "Boost your energy", 
    gradient: "from-red-500 to-yellow-500",
    songs: 98,
    followers: "1.8M"
  },
  { 
    id: "focus", 
    name: "Focus", 
    description: "Music to help you concentrate", 
    gradient: "from-green-500 to-teal-500",
    songs: 87,
    followers: "3.5M"
  },
];

const Browse = () => {
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [filterQuery, setFilterQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleGenreSelect = (id: number) => {
    setSelectedGenre(id === selectedGenre ? null : id);
    
    // BONUS FEATURE: Toast notification when genre is selected
    if (id !== selectedGenre) {
      const genre = genres.find(g => g.id === id);
      if (genre) {
        toast({
          title: `${genre.name} selected!`,
          description: `Exploring ${genre.name} music...`,
          duration: 3000,
        });
      }
    }
  };
  
  const handleMoodSelect = (mood: typeof moodPlaylists[0]) => {
    toast({
      title: `${mood.name} Playlist`,
      description: `${mood.songs} songs · ${mood.followers} followers`,
      duration: 3000,
    });
  };
  
  // BONUS FEATURE: Filter genres
  const filteredGenres = genres.filter(genre => 
    genre.name.toLowerCase().includes(filterQuery.toLowerCase())
  );
  
  // BONUS FEATURE: Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    toast({
      title: `${!darkMode ? "Dark" : "Light"} mode activated`,
      duration: 2000,
    });
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gradient-to-b from-gray-900 to-black' : 'bg-gradient-to-b from-spotify-dark-gray to-spotify-black'} text-spotify-white`}>
      <Navbar />
      
      {/* 3D Genre Visualizer */}
      <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none">
        <GenreVisualizer 
          selectedGenre={selectedGenre !== null ? genres.find(g => g.id === selectedGenre)?.name || "" : ""} 
          mousePosition={mousePosition}
        />
      </div>
      
      <main className="container mx-auto px-4 py-8 pt-24 relative z-10">
        <div className="flex items-center justify-between mb-8">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Browse All
          </motion.h1>
          
          {/* BONUS FEATURE: Dark mode toggle */}
          <motion.button
            className={`p-2 rounded-full ${darkMode ? 'bg-white text-black' : 'bg-gray-800 text-white'}`}
            onClick={toggleDarkMode}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {darkMode ? '☀️' : '🌙'}
          </motion.button>
        </div>
        
        {/* BONUS FEATURE: Search/Filter */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Filter genres..."
              className="w-full md:w-1/3 p-3 pl-10 rounded-full bg-white/10 border border-white/20 focus:outline-none focus:border-spotify-green"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
            />
            <span className="absolute left-3 top-3 text-white/60">🔍</span>
          </div>
        </motion.div>
        
        {/* Categories */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Categories</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                className="rounded-lg overflow-hidden relative h-32 cursor-pointer"
                style={{ backgroundColor: category.color }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)"
                }}
              >
                <div className="absolute inset-0 p-4 flex items-end">
                  <h3 className="text-white font-bold text-lg">{category.name}</h3>
                </div>
                
                {/* Category icon */}
                <div className="absolute top-4 right-4">
                  <category.icon size={24} className="text-white/80" />
                </div>
                
                {/* Abstract shape decoration */}
                <motion.div 
                  className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-30"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                    x: [0, 10, 0],
                    y: [0, -10, 0]
                  }}
                  transition={{ 
                    duration: 10,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  style={{ 
                    background: `radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)`,
                    transform: "translate(30%, -30%)",
                  }}
                />
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* Genres */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Genres & Moods</h2>
          
          {filterQuery && filteredGenres.length === 0 && (
            <p className="text-white/70 text-center py-10">No genres found matching "{filterQuery}"</p>
          )}
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredGenres.map((genre, index) => (
              <motion.div
                key={genre.id}
                className={`rounded-lg overflow-hidden relative cursor-pointer preserve-3d ${
                  selectedGenre === genre.id ? 'ring-2 ring-spotify-green' : ''
                }`}
                style={{ 
                  transformStyle: 'preserve-3d',
                  perspective: '1000px'
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                onClick={() => handleGenreSelect(genre.id)}
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative aspect-square">
                  <img 
                    src={genre.imageUrl} 
                    alt={genre.name}
                    className="w-full h-full object-cover"
                  />
                  
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4"
                    style={{ 
                      transform: `translateZ(10px) rotateX(${
                        selectedGenre === genre.id ? 0 : 
                        (mousePosition.y / window.innerHeight - 0.5) * 5
                      }deg) rotateY(${
                        selectedGenre === genre.id ? 0 : 
                        (mousePosition.x / window.innerWidth - 0.5) * -5
                      }deg)` 
                    }}
                  >
                    <h3 className="text-white font-bold text-lg">{genre.name}</h3>
                  </motion.div>
                </div>
                
                {selectedGenre === genre.id && (
                  <motion.div 
                    className="absolute bottom-4 right-4"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Button 
                      className="btn-spotify rounded-full w-12 h-12 p-0 flex items-center justify-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        toast({
                          title: "Playing Music",
                          description: `Now playing ${genre.name} music`,
                          duration: 3000,
                        });
                      }}
                    >
                      <Play className="w-6 h-6" />
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* Enhanced Mood Section - BONUS FEATURE */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Browse by Mood</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {moodPlaylists.map((mood, index) => (
              <motion.div 
                key={mood.id}
                className="relative rounded-lg overflow-hidden h-48 cursor-pointer group"
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, x: index === 0 ? -20 : index === 1 ? 0 : 20, y: index === 1 ? 20 : 0 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.5 }}
                onClick={() => handleMoodSelect(mood)}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${mood.gradient} rounded-lg`}></div>
                
                {/* Music wave animation - BONUS FEATURE */}
                <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-60 transition-opacity">
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((bar) => (
                      <motion.div
                        key={bar}
                        className="w-1 bg-white rounded-full"
                        animate={{ 
                          height: [15, 30, 15, 40, 15], 
                        }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 1.5, 
                          delay: bar * 0.2,
                          repeatType: "reverse"
                        }}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="text-2xl font-bold mb-2">{mood.name}</h3>
                  <p className="text-sm text-white/80">{mood.description}</p>
                  
                  {/* Stats - BONUS FEATURE */}
                  <div className="mt-2 flex items-center text-xs text-white/70">
                    <span>{mood.songs} songs</span>
                    <span className="mx-2">•</span>
                    <span>{mood.followers} followers</span>
                  </div>
                </div>
                
                {/* Play button - BONUS FEATURE */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    className="rounded-full w-10 h-10 p-0 bg-spotify-green hover:bg-spotify-green/90"
                    onClick={(e) => {
                      e.stopPropagation();
                      toast({
                        title: "Playing Mood",
                        description: `Now playing ${mood.name} playlist`,
                        duration: 3000,
                      });
                    }}
                  >
                    <Play className="w-5 h-5" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Browse;
