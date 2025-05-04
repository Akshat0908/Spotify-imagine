
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import GenreVisualizer from "@/components/GenreVisualizer";

const categories = [
  { id: 1, name: "Charts", color: "#3498db" },
  { id: 2, name: "New Releases", color: "#e74c3c" },
  { id: 3, name: "Podcasts", color: "#2ecc71" },
  { id: 4, name: "Discover", color: "#9b59b6" },
  { id: 5, name: "Live Events", color: "#f39c12" },
  { id: 6, name: "Made For You", color: "#1abc9c" },
  { id: 7, name: "At Home", color: "#34495e" },
  { id: 8, name: "COVID-19 Guide", color: "#7f8c8d" },
];

const genres = [
  { id: 1, name: "Pop", color: "#ff4757", imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=500" },
  { id: 2, name: "Rock", color: "#2ed573", imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=500" },
  { id: 3, name: "Hip-Hop", color: "#1e90ff", imageUrl: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?auto=format&fit=crop&q=80&w=500" },
  { id: 4, name: "R&B", color: "#ff6b81", imageUrl: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&q=80&w=500" },
  { id: 5, name: "Latin", color: "#ffa502", imageUrl: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&q=80&w=500" },
  { id: 6, name: "Electronic", color: "#5352ed", imageUrl: "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?auto=format&fit=crop&q=80&w=500" },
  { id: 7, name: "Country", color: "#ff6348", imageUrl: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&q=80&w=500" },
  { id: 8, name: "Jazz", color: "#747d8c", imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=500" },
  { id: 9, name: "Classical", color: "#2f3542", imageUrl: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=500" },
  { id: 10, name: "Metal", color: "#3742fa", imageUrl: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80&w=500" },
  { id: 11, name: "Folk & Acoustic", color: "#ff9ff3", imageUrl: "https://images.unsplash.com/photo-1519005218665-fa802a36af6f?auto=format&fit=crop&q=80&w=500" },
  { id: 12, name: "Indie", color: "#70a1ff", imageUrl: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?auto=format&fit=crop&q=80&w=500" }
];

const Browse = () => {
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
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
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-spotify-dark-gray to-spotify-black text-spotify-white">
      <Navbar />
      
      {/* 3D Genre Visualizer */}
      <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none">
        <GenreVisualizer 
          selectedGenre={selectedGenre !== null ? genres.find(g => g.id === selectedGenre)?.name || "" : ""} 
          mousePosition={mousePosition}
        />
      </div>
      
      <main className="container mx-auto px-4 py-8 pt-24 relative z-10">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Browse All
        </motion.h1>
        
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
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {genres.map((genre, index) => (
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
                        console.log(`Playing ${genre.name} music`);
                      }}
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* Mood Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Browse by Mood</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              className="relative rounded-lg overflow-hidden h-48 cursor-pointer"
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="text-2xl font-bold mb-2">Chill</h3>
                <p className="text-sm text-white/80">Kick back and relax</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="relative rounded-lg overflow-hidden h-48 cursor-pointer"
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-yellow-500 rounded-lg"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="text-2xl font-bold mb-2">Energetic</h3>
                <p className="text-sm text-white/80">Boost your energy</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="relative rounded-lg overflow-hidden h-48 cursor-pointer"
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="text-2xl font-bold mb-2">Focus</h3>
                <p className="text-sm text-white/80">Music to help you concentrate</p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Browse;
