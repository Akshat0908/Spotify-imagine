
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Music, Headphones, Mic, Volume2, Disc, Play } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AudioWaveBackground from "@/components/AudioWaveBackground";
import TrendingTracks from "@/components/TrendingTracks";
import MoodBasedRecommendations from "@/components/MoodBasedRecommendations";
import { getTopTags, Tag } from "@/utils/musicApi";

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

// Using music-related images from professional sources
const genres = [
  { id: 1, name: "Pop", color: "#ff4757", imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=500" },
  { id: 2, name: "Rock", color: "#2ed573", imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=500" },
  { id: 3, name: "Hip-Hop", color: "#1e90ff", imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&q=80&w=500" },
  { id: 4, name: "R&B", color: "#ff6b81", imageUrl: "https://images.unsplash.com/photo-1598387992619-f2e0a483fce1?auto=format&fit=crop&q=80&w=500" },
  { id: 5, name: "Latin", color: "#ffa502", imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=500" },
  { id: 6, name: "Electronic", color: "#5352ed", imageUrl: "https://images.unsplash.com/photo-1516223725307-6f76b9ec8742?auto=format&fit=crop&q=80&w=500" },
  { id: 7, name: "Country", color: "#ff6348", imageUrl: "https://images.unsplash.com/photo-1605457212633-d1f05305e2fe?auto=format&fit=crop&q=80&w=500" },
  { id: 8, name: "Jazz", color: "#747d8c", imageUrl: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?auto=format&fit=crop&q=80&w=500" },
  { id: 9, name: "Classical", color: "#2f3542", imageUrl: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&q=80&w=500" },
  { id: 10, name: "Metal", color: "#3742fa", imageUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=500" },
  { id: 11, name: "Folk & Acoustic", color: "#ff9ff3", imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=500" },
  { id: 12, name: "Indie", color: "#70a1ff", imageUrl: "https://images.unsplash.com/photo-1508608521275-e8dda563714c?auto=format&fit=crop&q=80&w=500" }
];

// Mood playlists
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
  const [filterQuery, setFilterQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [apiTags, setApiTags] = useState<Tag[]>([]);
  const [isTagsLoading, setIsTagsLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const tags = await getTopTags(10);
        setApiTags(tags);
      } catch (error) {
        console.error("Error fetching tags:", error);
      } finally {
        setIsTagsLoading(false);
      }
    };
    
    fetchTags();
  }, []);

  const handleGenreSelect = (id: number) => {
    setSelectedGenre(id === selectedGenre ? null : id);
    
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
  
  // Filter genres
  const filteredGenres = genres.filter(genre => 
    genre.name.toLowerCase().includes(filterQuery.toLowerCase())
  );
  
  // Toggle dark mode
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
      
      {/* Replace 3D Genre Visualizer with Audio Wave Background */}
      <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none">
        <AudioWaveBackground />
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
          
          {/* Dark mode toggle */}
          <motion.button
            className={`p-2 rounded-full ${darkMode ? 'bg-white text-black' : 'bg-gray-800 text-white'}`}
            onClick={toggleDarkMode}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {darkMode ? '☀️' : '🌙'}
          </motion.button>
        </div>
        
        {/* Search/Filter */}
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
        
        {/* Last.fm API Trending Tracks - NEW FEATURE */}
        <section className="mb-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <TrendingTracks />
          </motion.div>
          
          {/* Last.fm API Tags/Genres - NEW FEATURE */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-spotify-black/30 backdrop-blur-md rounded-xl p-4"
          >
            <h3 className="text-xl font-bold mb-4">Popular Tags</h3>
            {isTagsLoading ? (
              <div className="flex justify-center items-center h-40">
                <div className="flex space-x-1">
                  {[1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-8 bg-spotify-green rounded-full"
                      animate={{
                        height: [8, 32, 8],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {apiTags.map((tag, index) => (
                  <motion.button
                    key={tag.name}
                    className="bg-white/10 hover:bg-spotify-green/20 px-3 py-1 rounded-full text-sm transition-colors"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      toast({
                        title: tag.name,
                        description: `Exploring ${tag.name} music (${tag.count} listeners)`,
                        duration: 3000,
                      });
                    }}
                  >
                    {tag.name}
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>
        </section>
        
        {/* NEW FEATURE: Mood-based recommendations */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Music for Your Mood</h2>
          <MoodBasedRecommendations />
        </section>
        
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
                className={`rounded-lg overflow-hidden relative cursor-pointer ${
                  selectedGenre === genre.id ? 'ring-2 ring-spotify-green' : ''
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                onClick={() => handleGenreSelect(genre.id)}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)"
                }}
              >
                <motion.div
                  className="relative aspect-square overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img 
                    src={genre.imageUrl} 
                    alt={genre.name}
                    className="w-full h-full object-cover"
                  />
                  
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <h3 className="text-white font-bold text-lg">{genre.name}</h3>
                  </motion.div>
                </motion.div>
                
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
        
        {/* Enhanced Mood Section */}
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
                
                {/* Music wave animation */}
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
                  
                  {/* Stats */}
                  <div className="mt-2 flex items-center text-xs text-white/70">
                    <span>{mood.songs} songs</span>
                    <span className="mx-2">•</span>
                    <span>{mood.followers} followers</span>
                  </div>
                </div>
                
                {/* Play button */}
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
