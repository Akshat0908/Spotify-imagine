import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import HeroScene from "@/components/HeroScene";
import AlbumCarousel from "@/components/AlbumCarousel";
import AudioVisualizer from "@/components/AudioVisualizer";
import { toast } from "sonner";

const featuredPlaylists = [
  { 
    id: 1, 
    name: "Today's Top Hits", 
    coverUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    description: "Ed Sheeran is on top of the Hottest 50!" 
  },
  { 
    id: 2, 
    name: "RapCaviar", 
    coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    description: "New music from Drake, Travis Scott and more" 
  },
  { 
    id: 3, 
    name: "All Out 2010s", 
    coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    description: "The biggest songs of the 2010s." 
  },
  { 
    id: 4, 
    name: "Rock Classics", 
    coverUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    description: "Rock legends & epic songs that continue to inspire generations." 
  }
];

// Updated recentlyPlayed array with working image URLs
const recentlyPlayed = [
  { 
    id: 1, 
    name: "Chill Mix", 
    coverUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    type: "Mix" 
  },
  { 
    id: 2, 
    name: "Discover Weekly", 
    coverUrl: "https://images.unsplash.com/photo-1446057032654-9d8885db76c6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    type: "Playlist" 
  },
  { 
    id: 3, 
    name: "Your Top Songs 2023", 
    coverUrl: "https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    type: "Playlist" 
  },
  { 
    id: 4, 
    name: "Liked Songs", 
    coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    type: "Playlist" 
  }
];

// Added featured albums array for genre section with updated image URLs
const genrePlaylists = [
  { id: 1, name: "Pop", coverUrl: "https://images.unsplash.com/photo-1501612780327-45045538702b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", type: "Genre" },
  { id: 2, name: "Rock", coverUrl: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", type: "Genre" },
  { id: 3, name: "Hip-Hop", coverUrl: "https://images.unsplash.com/photo-1557787163-1635e2efb160?q=80&w=1073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", type: "Genre" },
  { id: 4, name: "R&B", coverUrl: "https://images.unsplash.com/photo-1485579149621-3123dd979885?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", type: "Genre" },
  { id: 5, name: "Jazz", coverUrl: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", type: "Genre" }
];

// Added featured albums array with updated image URLs
const featuredAlbums = [
  { id: 1, name: "After Hours", artist: "The Weeknd", coverUrl: "https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 2, name: "WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?", artist: "Billie Eilish", coverUrl: "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 3, name: "Planet Her", artist: "Doja Cat", coverUrl: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 4, name: "Lover", artist: "Taylor Swift", coverUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 5, name: "Scorpion", artist: "Drake", coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }
];

const Index = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    
    // Welcome notification
    setTimeout(() => {
      toast("Welcome to Spotify Reimagined", {
        description: "Experience music like never before in 3D",
        action: {
          label: "Explore",
          onClick: () => console.log("User clicked explore")
        }
      });
    }, 2000);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleAudio = () => {
    setIsAudioPlaying(!isAudioPlaying);
  };

  const parallaxValue = scrollY * 0.5;

  return (
    <div className="min-h-screen bg-gradient-to-b from-spotify-dark-gray to-spotify-black text-spotify-white">
      <Navbar />
      
      {/* Hero Section with 3D Scene */}
      <div className="relative h-[calc(100vh-80px)] overflow-hidden">
        <HeroScene />
        
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center max-w-4xl px-4">
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Music Comes To Life
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl mb-8 text-spotify-gray"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Experience your favorite songs in an immersive 3D environment
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Button className="btn-spotify" onClick={toggleAudio}>
                {isAudioPlaying ? "Pause" : "Play Demo"}
              </Button>
              
              <Button className="btn-spotify-outline" asChild>
                <Link to="/browse">Explore Library</Link>
              </Button>
            </motion.div>
          </div>
        </div>
        
        {/* Audio Visualizer */}
        <div className="absolute bottom-0 left-0 right-0 h-24">
          <AudioVisualizer isPlaying={isAudioPlaying} />
        </div>
      </div>
      
      {/* Featured Albums Section */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-b from-purple-900/20 to-spotify-black">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8">Featured Albums</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {featuredAlbums.map((album) => (
              <motion.div
                key={album.id}
                className="group relative rounded-lg p-4 transition-all duration-300 hover:bg-spotify-light-gray/10"
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="overflow-hidden rounded-md">
                  <img 
                    src={album.coverUrl} 
                    alt={album.name} 
                    className="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <h3 className="font-semibold text-lg mt-4 truncate">{album.name}</h3>
                <p className="text-spotify-gray text-sm">{album.artist}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Recently Played Section with Parallax */}
      <section className="py-16 px-4 md:px-8 relative">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-spotify-green/10 rounded-2xl"
          style={{
            transform: `translateY(${parallaxValue * 0.1}px)`,
          }}
        ></div>
        
        <div className="container mx-auto relative z-10">
          <h2 className="text-3xl font-bold mb-8">Recently Played</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {recentlyPlayed.map((item) => (
              <motion.div
                key={item.id}
                className="bg-spotify-dark-gray rounded-lg p-4 card-hover"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="preserve-3d mb-4">
                  <img 
                    src={item.coverUrl} 
                    alt={item.name} 
                    className="w-full h-40 md:h-48 object-cover rounded-md shadow-lg hover:shadow-2xl transition-shadow duration-300"
                    style={{ 
                      transform: `perspective(800px) rotateX(${scrollY * 0.02}deg) rotateY(${scrollY * 0.01}deg)` 
                    }}
                  />
                </div>
                <h3 className="font-semibold text-lg mt-2">{item.name}</h3>
                <p className="text-spotify-gray text-sm">{item.type}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Genre Section */}
      <section className="py-16 px-4 md:px-8 relative bg-gradient-to-b from-spotify-black to-spotify-dark-gray/80">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8">Genres & Moods</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {genrePlaylists.map((genre) => (
              <motion.div
                key={genre.id}
                className="relative h-48 md:h-56 rounded-lg overflow-hidden"
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <img 
                  src={genre.coverUrl} 
                  alt={genre.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                  <h3 className="text-2xl font-bold p-4">{genre.name}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Popular Playlists Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8">Popular Playlists</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredPlaylists.map((playlist) => (
              <motion.div
                key={playlist.id}
                className="bg-spotify-dark-gray hover:bg-spotify-light-gray transition-colors duration-300 rounded-lg p-4 card-hover"
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <img 
                  src={playlist.coverUrl} 
                  alt={playlist.name} 
                  className="w-full h-40 md:h-48 object-cover rounded-md shadow-md"
                />
                <h3 className="font-semibold text-lg mt-4">{playlist.name}</h3>
                <p className="text-spotify-gray text-sm mt-2">{playlist.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 px-4 md:px-8 bg-spotify-black border-t border-spotify-light-gray">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-spotify-green text-lg font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-spotify-gray hover:text-spotify-white transition-colors">About</a></li>
                <li><a href="#" className="text-spotify-gray hover:text-spotify-white transition-colors">Jobs</a></li>
                <li><a href="#" className="text-spotify-gray hover:text-spotify-white transition-colors">For the Record</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-spotify-green text-lg font-bold mb-4">Communities</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-spotify-gray hover:text-spotify-white transition-colors">For Artists</a></li>
                <li><a href="#" className="text-spotify-gray hover:text-spotify-white transition-colors">Developers</a></li>
                <li><a href="#" className="text-spotify-gray hover:text-spotify-white transition-colors">Advertising</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-spotify-green text-lg font-bold mb-4">Useful Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-spotify-gray hover:text-spotify-white transition-colors">Support</a></li>
                <li><a href="#" className="text-spotify-gray hover:text-spotify-white transition-colors">Web Player</a></li>
                <li><a href="#" className="text-spotify-gray hover:text-spotify-white transition-colors">Free Mobile App</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-spotify-green text-lg font-bold mb-4">Connect</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-spotify-gray hover:text-spotify-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-spotify-gray hover:text-spotify-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-spotify-gray hover:text-spotify-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.045-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-spotify-light-gray text-spotify-gray text-sm">
            <div className="flex flex-wrap gap-4 mb-4">
              <a href="#" className="hover:text-spotify-white transition-colors">Legal</a>
              <a href="#" className="hover:text-spotify-white transition-colors">Privacy Center</a>
              <a href="#" className="hover:text-spotify-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-spotify-white transition-colors">Cookies</a>
              <a href="#" className="hover:text-spotify-white transition-colors">About Ads</a>
            </div>
            <p>© 2023 Spotify Reimagined</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
